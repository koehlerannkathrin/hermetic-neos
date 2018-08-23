<?php
require '../Packages/Libraries/autoload.php';

error_reporting(E_ERROR | E_WARNING | E_PARSE);

# Read SMTP settings from environment
$smtp_host = getenv('SMTP_HOST');
$smtp_user = getenv('SMTP_USER');
$smtp_password = getenv('SMTP_PASSWORD');

# Assert SMTP credentials
if (empty($smtp_host) || empty($smtp_user) || empty($smtp_password)) {
  header('HTTP/1.0 500 Internal Server Error');
  echo 'Missing SMTP credentials';
  exit;
}

# Determine sender domain from host name
preg_match('/[\w-]+\.\w+$/', (getenv('HOST') ?: getenv('HTTP_HOST')), $domain);
$domain = empty($domain) ? $_SERVER['SERVER_NAME'] : $domain[0];

# Read variables from form
$firstname = filter_var($_POST['firstname'], FILTER_SANITIZE_STRING);
$lastname = filter_var($_POST['lastname'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$company = filter_var($_POST['company'], FILTER_SANITIZE_STRING);
$telephone = filter_var($_POST['telephone'], FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

# Check parameters
if (empty($firstname) || empty($lastname) || empty($email)) {
  header('HTTP/1.0 400 Bad Request');
  echo 'Invalid parameters';
  exit;
}

# Ticket id
$id = mt_rand(0,9) . substr(str_shuffle('abcdefghijklmnopqrstuvwxyz'), 0, 3);

# Recipient
if (empty(getenv('CONTACT_TO'))) {
  $to = 'kontakt@' . $domain;
} else {
  $to = getenv('CONTACT_TO');
}

# Body
$body =
  "Vorname: " . $firstname . "\n" .
  "Nachname: " . $lastname . "\n" .
  "E-Mail: " . $email . "\n" .
  "Unternehmen: " . $company . "\n" .
  "Telefon: " . $telephone . "\n" .
  "Ticket: " . $id . "\n\n" .
  $message;

# Compose mail
$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = $smtp_host;
$mail->Username = $smtp_user;
$mail->Password = $smtp_password;
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'tls';
$mail->Port = 587;
$mail->setFrom($to);
$mail->addAddress($to);
$mail->addReplyTo($email, $firstname . ' ' . $lastname);
$mail->CharSet = 'UTF-8';
$mail->Subject = 'Kontaktformular ' . $domain . ' (Ticket #' . $id . ')';
$mail->Body = $body;

# Send mail
if ($mail->send()) {
  echo $id;
} else {
  header('HTTP/1.0 500 Internal Server Error');
  echo 'Failed to send mail to ' . $to . ' (' . $mail->ErrorInfo . ')';
}
