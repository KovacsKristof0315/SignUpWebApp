<?php
// --- config ---
$SALT   = 'CHANGE_ME_TO_A_LONG_RANDOM_STRING'; // keep private
$PARAM  = 't';             // query key: ?t=...
$COOKIE = 'qpass_sess';    // cookie name
$TTL    = 2 * 60 * 60;     // 2 hours cookie lifetime
$TZ     = 'Europe/Budapest';

// --- helpers ---
function is_https(): bool {
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
}

function currentToken(string $salt, string $tz): string {
    $dt = new DateTime('now', new DateTimeZone($tz));
    $year = $dt->format('o');  // ISO year
    $week = $dt->format('W');  // ISO week number
    return substr(hash('sha256', "$salt:$year:$week"), 0, 32);
}

function isValidToken(?string $t, string $salt, string $tz): bool {
    if (!$t) return false;
    return hash_equals(currentToken($salt, $tz), $t);
}

// --- auth logic ---
$token = $_GET[$PARAM] ?? '';

// 1) Cookie already valid?
if (!empty($_COOKIE[$COOKIE]) && isValidToken($_COOKIE[$COOKIE], $SALT, $TZ)) {
    include "supersecret.html";
    exit;
}

// 2) Check query
if (isValidToken($token, $SALT, $TZ)) {
    // Set session cookie
    setcookie($COOKIE, $token, [
        'expires'  => time() + $TTL,
        'path'     => '/',
        'secure'   => is_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    // Redirect to same URL without ?t=
    $qs = $_GET; unset($qs[$PARAM]);
    $scheme = is_https() ? 'https' : 'http';
    $path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
    $clean  = $scheme.'://'.$_SERVER['HTTP_HOST'].$path.( $qs ? '?'.http_build_query($qs) : '' );
    header("Location: $clean", true, 302);
    exit;
}

// 3) Unauthorized
http_response_code(403);
header('Content-Type: text/plain; charset=utf-8');
echo "Unauthorized";
