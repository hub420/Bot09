import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

def enviar_correo(remitente, destinatario, asunto, cuerpo, contrasena):
    """
    Envía un correo electrónico.
    """
    mensaje = MIMEMultipart()
    mensaje['From'] = remitente
    mensaje['To'] = destinatario
    mensaje['Subject'] = asunto

    # Adjuntar el cuerpo del mensaje
    mensaje.attach(MIMEText(cuerpo, 'plain'))

    # Conectar al servidor SMTP
    with smtplib.SMTP('smtp.gmail.com', 587) as servidor:
        servidor.starttls()  # Iniciar la conexión segura
        servidor.login(remitente, contrasena)  # Iniciar sesión
        servidor.send_message(mensaje)  # Enviar el mensaje

# Ejemplo de uso
if __name__ == "__main__":
    remitente = os.getenv('EMAIL_USER')  # Obtener el usuario del archivo .env
    destinatario = 'apoyo2765@gmail.com'
    asunto = 'Asunto Test'
    cuerpo = 'Hola Mundo'
    contrasena = os.getenv('EMAIL_PASS')  # Obtener la contraseña del archivo .env

    enviar_correo(remitente, destinatario, asunto, cuerpo, contrasena)
