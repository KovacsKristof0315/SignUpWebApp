<?php

class Route {
    private $url;
    private $erkezettAdatok;

    public function __construct($teljesurl){
        $this->url = explode('/', $teljesurl);
        $this->erkezettAdatok = json_decode(file_get_contents('php://input'),false);
    }

    public function vizsgalat(){
        switch (end($this->url)) {
            // case 'getComment':
            //     $getComment = new Function_bolyai();
            //     echo $getComment->getComment($this->erkezettAdatok);
            //     break;

            case 'getNyitasData':
                $getNyitasData = new Function_bolyai();
                echo $getNyitasData->getNyitasData();
                break;
            case 'uploadNyitasData':
                $uploadNyitasData = new Function_bolyai();
                echo $uploadNyitasData->uploadNyitasData($this->erkezettAdatok);
                break;
            case 'uploadBevas':
                $uploadBevas = new Function_bolyai();
                echo $uploadBevas->uploadBevas($this->erkezettAdatok);
                break;
            case 'deleteBevas':
                $deleteBevas = new Function_bolyai();
                echo $deleteBevas->deleteBevas($this->erkezettAdatok);
                break;
            case 'getBevas':
                $getBevas = new Function_bolyai();
                echo $getBevas->getBevas($this->erkezettAdatok);
                break;
            case 'uploadTakker':
                $uploadTakker = new Function_bolyai();
                echo $uploadTakker->uploadTakker($this->erkezettAdatok);
                break;
            case 'deleteTakker':
                $deleteTakker = new Function_bolyai();
                echo $deleteTakker->deleteTakker($this->erkezettAdatok);
                break;
            case 'getTakker':
                $getTakker = new Function_bolyai();
                echo $getTakker->getTakker($this->erkezettAdatok);
                break;
            case 'deleteNyitasData':
                $deleteNyitasData = new Function_bolyai();
                echo $deleteNyitasData->deleteNyitasData($this->erkezettAdatok);
                break;
            
            default:
                echo 'Lezli';
                break;
        }
    }
}

?>