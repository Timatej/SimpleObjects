<?php
namespace SimpleObjects\Modules;

class SimpleControllers
{
    private $_so = null;

    private $_action = 'listAll';

    public $type = null;
    public $id = null;

    public function __construct(\SimpleObjects\SimpleObjects $so, $urlPrefix = '/api/'){
        //save simple objects model
        $this->_so = $so;
        //parse URL in the way /prefix/action/param1/value1/param2/value2/...
        $uri = $_SERVER['REQUEST_URI'];
        //remove prefix to get the result: $uri = action/param1/value1/param2/value2/...
        $uri = str_replace($urlPrefix, '', $uri);
        $parts = explode('/', $uri);
        //convert dashes to camelCase for Action param
        $action  = array_shift($parts);
        if (!empty($action)) $this->_action = str_replace(' ', '', ucwords(str_replace('-', ' ', $action)));

        while (!empty($parts)) {
            $param = array_shift($parts);
            $value = array_shift($parts);
            $this->$param = $value;
        }
    }

    public function run(){
        return $this->{$this->_action}();
    }

    public function listAll(){
        if (empty($this->type))
            return $this->_so->search();
        else
            return $this->_so->search(array('type' => $this->type));
    }

    public function byId(){
        return $this->_so->getById($this->id);
    }

    public function save(){
        //getting raw post data.
        $data = file_get_contents('php://input');
        $this->_so->save($data);
    }
}