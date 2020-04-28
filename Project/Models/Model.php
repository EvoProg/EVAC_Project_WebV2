<?php
  abstract class Model
  {
    protected static $_bdd;

    private static function setBdd()
    {
        try
        {
            self::$_bdd = new PDO('mysql:host=localhost;dbname=evac;charset=utf8', 'root', '');
        }
        catch (Exception $e)
        {
            die('Erreur : ' . $e->getMessage());
        }
    }

    protected static function getBdd()
    {
        if (self::$_bdd == null)
            self::setBdd();
        return self::$_bdd;
  }
}
