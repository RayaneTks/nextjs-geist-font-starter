<?php
require_once '../config.php';
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// Récupérer le nombre de véhicules
$stmt = $pdo->query("SELECT COUNT(*) AS total FROM vehicles");
$vehicleCount = $stmt->fetchColumn();

// Récupérer le nombre de réservations en attente
$stmt = $pdo->query("SELECT COUNT(*) AS total FROM reservations WHERE status = 'pending'");
$pendingReservations = $stmt->fetchColumn();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dashboard - Admin DD RENTAL CAR</title>
  <link rel="stylesheet" href="../public/css/style.css" />
</head>
<body>
  <?php include '../includes/header.php'; ?>

  <main>
    <h1>Tableau de bord</h1>
    <div class="dashboard-summary">
      <div class="summary-item">
        <h2>Véhicules</h2>
        <p><?= (int)$vehicleCount ?></p>
      </div>
      <div class="summary-item">
        <h2>Réservations en attente</h2>
        <p><?= (int)$pendingReservations ?></p>
      </div>
    </div>
    <a href="vehicles.php" class="btn-primary">Gérer les véhicules</a>
    <a href="reservations.php" class="btn-primary">Gérer les réservations</a>
  </main>

  <?php include '../includes/footer.php'; ?>
</body>
</html>
