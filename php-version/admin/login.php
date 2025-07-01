<?php
require_once '../config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = $_POST['password'] ?? '';

    if (!$username || !$password) {
        $error = 'Veuillez remplir tous les champs.';
    } else {
        // Récupérer l'utilisateur
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = $user['username'];
            header('Location: dashboard.php');
            exit;
        } else {
            $error = 'Identifiants invalides.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Connexion Admin - DD RENTAL CAR</title>
  <link rel="stylesheet" href="../public/css/style.css" />
</head>
<body>
  <main>
    <h1>Connexion Admin</h1>
    <?php if (!empty($error)): ?>
      <p class="error"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    <form method="POST" action="">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" name="username" required />

      <label for="password">Mot de passe</label>
      <input type="password" id="password" name="password" required />

      <button type="submit" class="btn-primary">Se connecter</button>
    </form>
  </main>
</body>
</html>
