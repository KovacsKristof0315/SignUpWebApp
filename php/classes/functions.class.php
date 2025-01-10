<?php

require_once("Storage.php");




class Function_bolyai
{
    public function getNyitasData()
    {
        $NyitasStorage = new Storage(new JsonIO('nyitas.json'), false);

      
        $NyitasAdatok = $NyitasStorage->findAll();
        
        return json_encode($NyitasAdatok, JSON_UNESCAPED_UNICODE);
    }

    public function getBevas()
    {
        $BevasStorage = new Storage(new JsonIO('bevas.json'), false);

      
        $BevasStorage = $BevasStorage->findAll();
        
        return json_encode($BevasStorage, JSON_UNESCAPED_UNICODE);
    }


    public function uploadNyitasData($erkezettAdatok)
    {
        $NyitasStorage = new Storage(new JsonIO('nyitas.json'), false);

        $name = $erkezettAdatok->name;
        $start = $erkezettAdatok->start;
        $end = $erkezettAdatok->end;

        $NyitasStorage->add([
            "name" => $name,
            "start" => $start,
            "end" => $end,
        ]);
    }


    public function deleteNyitasData($erkezettAdatok)
    {
        $NyitasStorage = new Storage(new JsonIO('nyitas.json'), false);

        $NyitasStorage->delete($erkezettAdatok->name);
    }

    public function deleteBevas($erkezettAdatok)
    {
        $BevasStorage = new Storage(new JsonIO('bevas.json'), false);

        $BevasStorage->delete($erkezettAdatok->name);
    }

    public function uploadBevas($erkezettAdatok)
    {
        $BevasStorage = new Storage(new JsonIO('bevas.json'), false);

        
        $BevasStorage->add([
            "name" => $erkezettAdatok->name,
        ]);
    }
    
}
?>