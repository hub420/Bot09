<<<<<<< HEAD
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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
enviar_correo('apoyo2765@gmail.com', 'allen@allenweb.click', 'Asunto Test', 'HolaMundo', '')
#proceso de contrasenas de aplicacion  hay que generar ya que no deja enviar los correos, en apoyo hay que crear
=======
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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
enviar_correo('apoyo2765@gmail.com', 'allen@allenweb.click', 'Asunto Test', 'HolaMundo', '')
#proceso de contrasenas de aplicacion  hay que generar ya que no deja enviar los correos, en apoyo hay que crear
>>>>>>> cc3d95d0eee7da62574546d16eee47362da6dedb
#un passwordapp 