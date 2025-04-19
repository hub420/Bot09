import os
from dotenv import load_dotenv
import email
import imaplib
from email.header import decode_header

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

def recibir_correos(usuario, contrasena):
    try:
        # Conectar al servidor IMAP
        with imaplib.IMAP4_SSL('imap.gmail.com') as mail:
            mail.login(usuario, contrasena)  # Iniciar sesión
            mail.select('inbox')  # Seleccionar la bandeja de entrada

            # Buscar correos no leídos
            result, data = mail.search(None, 'UNSEEN')
            if result != 'OK':
                print("No se pudieron buscar correos.")
                return

            correos_ids = data[0].split()

            for correo_id in correos_ids:
                # Obtener el correo
                result, data = mail.fetch(correo_id, '(RFC822)')
                if result != 'OK':
                    print("No se pudo obtener el correo.")
                    continue

                mensaje = email.message_from_bytes(data[0][1])
                
                # Decodificar el asunto
                subject, encoding = decode_header(mensaje["subject"])[0]
                if isinstance(subject, bytes):
                    subject = subject.decode(encoding if encoding else 'utf-8')

                print(f'Asunto: {subject}')
                print(f'De: {mensaje["from"]}')

    except imaplib.IMAP4.error as e:
        print(f'Error de IMAP: {e}')
    except Exception as e:
        print(f'Ocurrió un error: {e}')

# Ejemplo de uso
if __name__ == "__main__":
    usuario = os.getenv('EMAIL_USER')  # Obtener el usuario del archivo .env
    contrasena = os.getenv('EMAIL_PASS')  # Obtener la contraseña del archivo .env
    recibir_correos(usuario, contrasena)
