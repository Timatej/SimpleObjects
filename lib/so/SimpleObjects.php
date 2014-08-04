<?php
namespace SimpleObjects;
class SimpleObjects {
    private $_db = null;
    public function __construct($connectionString = 'mongodb://localhost:27017', $db = 'test', $collection = 'items'){
        $m = new \MongoClient($connectionString);
        $this->_db = $m->selectCollection($db, $collection);
    }

    public function getById($id){
        $item = $this->_db->findOne(array('_id' => new \MongoId($id)));

        return $this->_prepareItem($item);
    }

    public function search($query = array()){
        return $this->getAllByCursor($this->_db->find($query));
    }

    public function getAllByCursor($cursor){
        $result = array();
        foreach ($cursor as $item){
            $result[] = $this->_prepareItem($item);
        }

        return $result;
    }

    public function save($item){
        if (is_string($item))
            $item = json_decode($item);

        $id = @$item->_id;
        unset($item->_id);

        if (!empty($id) && strlen((string)$id) == 24) {
            $id = new \MongoId($id);
            $this->_db->update(
                array('_id' => $id),
                $item
            );
        } else {
            $this->_db->insert($item);
            $id = (string)$item->_id;
        }

        return $id;
    }

    public function removeById($id){
        $this->_db->remove(array('_id' => new \MongoId($id)));
    }

    public function getCollection(){
        return $this->_db;
    }

    private function _prepareItem($item){
        $item = (object)$item;

        $item->_id = (string)$item->_id;
        unset($item->__v);

        return $item;
    }

    public function echoJSON($value){
        echo json_encode($value);
    }
}