import imaplib
import email

def recibir_correos(usuario, contrasena):
    # Conectar al servidor IMAP
    with imaplib.IMAP4_SSL('imap.gmail.com') as mail:
        mail.login(usuario, contrasena)  # Iniciar sesión
        mail.select('inbox')  # Seleccionar la bandeja de entrada

        # Buscar correos no leídos
        result, data = mail.search(None, 'UNSEEN')
        correos_ids = data[0].split()

        for correo_id in correos_ids:
            # Obtener el correo
            result, data = mail.fetch(correo_id, '(RFC822)')
            mensaje = email.message_from_bytes(data[0][1])
            print(f'Asunto: {mensaje["subject"]}')
            print(f'De: {mensaje["from"]}')

# Ejemplo de uso
recibir_correos('tu_email@gmail.com', 'tu_contrasena')
