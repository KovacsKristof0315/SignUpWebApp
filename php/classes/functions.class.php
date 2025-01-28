<?php

require_once("Storage.php");




class Function_bolyai
{
    //Nyitás
    public function getNyitasData()
    {
        $NyitasStorage = new Storage(new JsonIO('nyitas.json'), false);

      
        $NyitasAdatok = $NyitasStorage->findAll();
        
        return json_encode($NyitasAdatok, JSON_UNESCAPED_UNICODE);
    }

    public function uploadNyitasData($erkezettAdatok)
    {
        
        $name = $erkezettAdatok->name;
        $start = $erkezettAdatok->start;
        $end = $erkezettAdatok->end;
        
        if (strlen($name) == 0) {
            $valasz = array('response' => "fail");
            return json_encode($valasz, JSON_UNESCAPED_UNICODE);
        } 
        
        
        $NyitasStorage = new Storage(new JsonIO('nyitas.json'), false);
        $nyitok = $NyitasStorage->findAll();
        $unique = true;
        foreach ($nyitok as $nyito)
        {
            if ($nyito->name == $name) {
                $unique = false;
            }
        }
        if (!$unique) {
            $valasz = array('response' => "fail-unique");
            return json_encode($valasz, JSON_UNESCAPED_UNICODE);
        }

        $NyitasStorage->add([
            "name" => $name,
            "start" => $start,
            "end" => $end,
        ]);
        
        $response = array('response' => "success");
        return json_encode($response, JSON_UNESCAPED_UNICODE);
        
    }

    public function deleteNyitasData($erkezettAdatok)
    {
        $NyitasStorage = new Storage(new JsonIO('nyitas.json'), false);

        $NyitasStorage->delete($erkezettAdatok->name);
        $response = array('response' => "success");
        return json_encode($response, JSON_UNESCAPED_UNICODE);   
    }

    //Bevás
    public function getBevas()
    {
        $BevasStorage = new Storage(new JsonIO('bevas.json'), false);

      
        $BevasStorage = $BevasStorage->findAll();
        
        return json_encode($BevasStorage, JSON_UNESCAPED_UNICODE);
    }

    public function uploadBevas($erkezettAdatok)
    {    
        if (strlen($erkezettAdatok->name) == 0) {
            $valasz = array('response' => "fail");
            return json_encode($valasz, JSON_UNESCAPED_UNICODE);
        } else
        {
            $BevasStorage = new Storage(new JsonIO('bevas.json'), false);
    
            
            $BevasStorage->add([
                "name" => $erkezettAdatok->name,
            ]);
    
            $response = array('response' => "success");
            return json_encode($response, JSON_UNESCAPED_UNICODE);   
        }
    }

    public function deleteBevas($erkezettAdatok)
    {
        $BevasStorage = new Storage(new JsonIO('bevas.json'), false);

        $BevasStorage->delete($erkezettAdatok->name);
        $response = array('response' => "success");
        return json_encode($response, JSON_UNESCAPED_UNICODE);   
    }
    
    //Takker
    public function getTakker()
    {
        $TakkerStorage = new Storage(new JsonIO('takker.json'), false);

      
        $TakkerStorage = $TakkerStorage->findAll();
        
        return json_encode($TakkerStorage, JSON_UNESCAPED_UNICODE);
    }

    public function uploadTakker($erkezettAdatok)
    {
        if (strlen($erkezettAdatok->name) == 0) {
            $valasz = array('response' => "fail");
            return json_encode($valasz, JSON_UNESCAPED_UNICODE);
        } else
        {
            $TakkerStorage = new Storage(new JsonIO('takker.json'), false);
            $TakkerStorage->add([
                "name" => $erkezettAdatok->name,
            ]);
    
            $response = array('response' => "success");
            return json_encode($response, JSON_UNESCAPED_UNICODE);   
        }
    }
    

    public function deleteTakker($erkezettAdatok)
    {
        $TakkerStorage = new Storage(new JsonIO('takker.json'), false);

        $TakkerStorage->delete($erkezettAdatok->name);
        $response = array('response' => "success");
            return json_encode($response, JSON_UNESCAPED_UNICODE);   
    }

    //Kifli
    public function getKifli()
    {
        $KifliStorage = new Storage(new JsonIO('kifli.json'), false);

      
        $KifliStorage = $KifliStorage->findAll();
        
        return json_encode($KifliStorage, JSON_UNESCAPED_UNICODE);
    }

    public function uploadKifli($erkezettAdatok)
    {
        if (strlen($erkezettAdatok->name) == 0) {
            $valasz = array('response' => "fail");
            return json_encode($valasz, JSON_UNESCAPED_UNICODE);
        } else
        {
            $KifliStorage = new Storage(new JsonIO('kifli.json'), false);

        
            $KifliStorage->add([
                "name" => $erkezettAdatok->name,
            ]);
            $response = array('response' => "success");
            return json_encode($response, JSON_UNESCAPED_UNICODE);   
        }
    }

    public function deleteKifli($erkezettAdatok)
    {
        $KifliStorage = new Storage(new JsonIO('kifli.json'), false);

        $KifliStorage->delete($erkezettAdatok->name);
        $response = array('response' => "success");
            return json_encode($response, JSON_UNESCAPED_UNICODE);   
    }

    //DeleteAll
    private function deleteFileData($file) {
        if (file_exists($file)) {
            
            $handle = fopen($file, 'w');

            if ($handle) {
                fclose($handle); 
                $valasz = array('valasz' => "Sikeres törlés");
            } else {
                $valasz = array('valasz' => "Hiba a fájl elérés során");
            }
        } 
        else
        {
            $valasz = array('valasz' => "A fájl nem létezik");
        }
        return $valasz;
    }
    
    public function deleteAllData()
    {
        $valasz = array(
            'takker' => $this->deleteFileData("takker.json"),
            'bevas' => $this->deleteFileData("bevas.json"),
            'nyitas' => $this->deleteFileData("nyitas.json")
        );
        
        return json_encode($valasz, JSON_UNESCAPED_UNICODE);
    }


}
?>