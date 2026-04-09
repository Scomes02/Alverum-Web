<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Sanitización de datos (Seguridad fundamental)
    $nombre = htmlspecialchars(strip_tags(trim($_POST["nombre"])));
    $contacto = htmlspecialchars(strip_tags(trim($_POST["contacto"])));
    $seguro = htmlspecialchars(strip_tags(trim($_POST["tipo_seguro"])));
    $mensaje = htmlspecialchars(strip_tags(trim($_POST["mensaje"])));

    // 2. Configuración del correo
    $destinatario = "correo@gmail.com"; // <-- Coloca el mail de la empresa aquí
    $asunto = "Nueva consulta web: " . $seguro;
    
    $cuerpoMensaje = "Has recibido una nueva consulta desde la web de Alverum.\n\n";
    $cuerpoMensaje .= "Nombre: " . $nombre . "\n";
    $cuerpoMensaje .= "Contacto: " . $contacto . "\n";
    $cuerpoMensaje .= "Seguro de interés: " . $seguro . "\n\n";
    $cuerpoMensaje .= "Mensaje del cliente:\n" . $mensaje . "\n";

    // Cabeceras básicas
    $headers = "From: web@alverum.com" . "\r\n" .
               "Reply-To: " . $contacto . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // 3. Envío y redirección
    if (mail($destinatario, $asunto, $cuerpoMensaje, $headers)) {
        // Redirigir de vuelta con un parámetro de éxito
        header("Location: index.html?status=success");
        exit;
    } else {
        header("Location: index.html?status=error");
        exit;
    }
} else {
    // Si alguien intenta acceder al PHP directamente por URL
    header("Location: index.html");
    exit;
}
?>