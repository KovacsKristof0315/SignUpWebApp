#!/usr/bin/env python3
"""
Generate a weekly rotating URL of the form:
  {base_url}/{path}?t={token}

Token = SHA256("{SALT}:{ISO_YEAR}:{ISO_WEEK}")[:32]
Week boundary is computed in the Europe/Budapest timezone to match your PHP.

Usage:
  python weekly_url.py --base-url https://yourdomain --path secure.php --salt 'YOUR_LONG_RANDOM_SALT'
  # or with env: WEEKLY_SALT=... python weekly_url.py --base-url https://yourdomain --path secure.php
"""

import argparse
import hashlib
import os
from datetime import datetime
try:
    # Python 3.9+ recommended
    from zoneinfo import ZoneInfo
except ImportError:
    raise SystemExit("This script requires Python 3.9+ (zoneinfo).")

DEFAULT_TZ = "Europe/Budapest"

def current_iso_year_week(tz: str):
    now_local = datetime.now(ZoneInfo(tz))
    iso = now_local.isocalendar()  # (iso_year, iso_week, iso_weekday)
    # Works across Python versions: iso[0]=year, iso[1]=week
    return iso[0], iso[1]

def weekly_token(salt: str, iso_year: int, iso_week: int, length: int = 32) -> str:
    data = f"{salt}:{iso_year}:{iso_week}".encode("utf-8")
    return hashlib.sha256(data).hexdigest()[:max(8, length)]

def build_url(base_url: str, path: str, token_param: str, token_value: str) -> str:
    base = base_url.rstrip("/")
    if not path:
        path = ""
    elif not path.startswith("/"):
        path = "/" + path
    return f"{base}{path}?{token_param}={token_value}"

def main():
    parser = argparse.ArgumentParser(description="Generate weekly rotating URL compatible with PHP gate.")
    parser.add_argument("--base-url", required=True, help="Public base URL, e.g., https://example.com")
    parser.add_argument("--path", help="Path to protected script (default: secure.php)")
    parser.add_argument("--salt", help="Secret salt (or set env WEEKLY_SALT)")
    parser.add_argument("--tz", default=DEFAULT_TZ, help=f"IANA timezone (default: {DEFAULT_TZ})")
    parser.add_argument("--param", default="t", help="Query parameter name (default: t)")
    parser.add_argument("--length", type=int, default=32, help="Token length in hex chars (default: 32)")
    parser.add_argument("--print-token", action="store_true", help="Also print the token separately")
    args = parser.parse_args()

    salt = args.salt or os.environ.get("WEEKLY_SALT")
    if not salt:
        raise SystemExit("Missing salt: pass --salt or set WEEKLY_SALT environment variable.")

    iso_year, iso_week = current_iso_year_week(args.tz)
    token = weekly_token(salt, iso_year, iso_week, args.length)
    url = build_url(args.base_url, args.path, args.param, token)

    print(url)
    if args.print_token:
        print(f"# token: {token}  (ISO {iso_year}-W{iso_week:02d}, tz={args.tz})")

if __name__ == "__main__":
    main()
