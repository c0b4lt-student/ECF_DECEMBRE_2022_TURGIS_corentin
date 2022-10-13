<?php
// classe abstraite qui instencie un seul pdo et le retourne
abstract class Model {
  private static $pdo;

  private static function connectDB() {
    self::$pdo = new PDO('pgsql:host=ec2-54-157-74-211.compute-1.amazonaws.com;port=5432;dbname=d12hj5ehfh4ghq;user=wouywzmllzfyhu;password=126d71bb17473c27a83380cbd5cd2578f014b7b84ec17277a3128b608d1570be');
    self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
  }

  protected function getDB() {
    if (self::$pdo === null)
      self::connectDB();
    return self::$pdo;
  }

  public static function sendJSON($data) {
    header("Access-Control-Allow-Origin: *");//Remplacer l'etoile une fois en production
    header("Content-Type: application/json");
    echo json_encode($data);
  }
}