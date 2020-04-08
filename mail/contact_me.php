<?php
// Check for empty fields
if (
   empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['subject'])   ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
   echo "No arguments Provided!";
   return false;
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));


/*Configuracion de variables para enviar el correo*/
$mail_username="martin.gira@sondeos.com.ar";//Correo electronico saliente ejemplo: tucorreo@gmail.com
$mail_userpassword="utnsondeos99";//Tu contraseña de gmail
$mail_addAddress="martingira1999@gmail.com";//correo electronico que recibira el mensaje
$template="email_template.html";//Ruta de la plantilla HTML para enviar nuestro mensaje

// Create the email and send the message
$to = 'martin.gira@sondeos.com.ar'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = $subject . " - Website Contact Form: " . $name;
$email_body = "You have received a new message from your website contact form.\n\n" . "Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";
$headers = "From: noreply@newlogic.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
mail($to, $email_subject, $email_body, $headers);
return true;
