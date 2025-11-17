import subprocess
import time
import webbrowser
import tempfile
import os
from datetime import datetime
import sys, io
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Configurazione Email
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_USER = "adriano.ferrio@gmail.com"  # Sostituisci con la tua email
EMAIL_PASSWORD = "Yamantaka"  # Sostituisci con la tua password/app password
EMAIL_PASSWORD = "nzqy gklg ofki idbp"
TO_EMAIL = "adriano.ferrio@gmail.com"  # Sostituisci con l'email del destinatario

# Percorso della tua cartella di progetto (dove c'è playwright.config.ts)
PROJECT_DIR = "C:\\Users\\aferrio\\pocs\\playwright"
# File di log (facoltativo)
LOG_FILE = f"{PROJECT_DIR}/playwright_log.txt"

def send_email(subject, body, is_html=False):
    """Invia una email di notifica"""
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = TO_EMAIL
        msg['Subject'] = subject
        
        if is_html:
            msg.attach(MIMEText(body, 'html'))
        else:
            msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_USER, TO_EMAIL, text)
        server.quit()
        
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Email sent successfully")
        return True
        
    except Exception as e:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Failed to send email: {e}")
        return False

def create_error_page():
    """Crea una pagina HTML lampeggiante per gli errori"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>PLAYWRIGHT TEST FAILED!</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                font-family: Arial, sans-serif;
                animation: blink 0.5s infinite;
            }
            
            @keyframes blink {
                0% { background-color: red; color: white; }
                50% { background-color: white; color: red; }
                100% { background-color: red; color: white; }
            }
            
            .error-message {
                text-align: center;
                font-size: 3em;
                font-weight: bold;
                padding: 50px;
                border: 5px solid black;
                border-radius: 20px;
            }
            
            .timestamp {
                font-size: 0.5em;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="error-message">
            ⚠️ PLAYWRIGHT TEST FAILED! ⚠️
            <div class="timestamp">""" + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + """</div>
        </div>
    </body>
    </html>
    """
    
    return html_content

def run_playwright_test():
    """Esegue il test Playwright e restituisce True se ha successo"""
    try:
        # Esegue il comando npx playwright test senza aprire il report
        result = subprocess.run(['npx', 'playwright', 'test', '--reporter=list'], 
                              capture_output=True, 
                              cwd=PROJECT_DIR,
                              text=True, 
                              timeout=300,
                              shell=True)  # Timeout di 5 minuti
        
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Test output:")
        print(result.stdout)
        
        if result.stderr:
            print("Errors:")
            print(result.stderr)
        
        # Salva output per email
        test_output = result.stdout + "\n" + result.stderr if result.stderr else result.stdout
        
        # Restituisce True se il test è passato (exit code 0)
        return result.returncode == 0, test_output
        
    except subprocess.TimeoutExpired:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Test timeout!")
        return False, "Test timeout after 5 minutes"
    except Exception as e:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Error running test: {e}")
        return False, f"Error running test: {e}"

def main():
    print("Playwright Test Monitor Started")
    print("Running tests every 5 minutes...")
    print("Press Ctrl+C to stop")
    
    try:
        while True:
            print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Running Playwright tests...")
            
            success, test_output = run_playwright_test()
            
            if success:
                print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Tests PASSED")
                # Non inviare email per i test di successo
                
            else:
                print(f"[{datetime.now().strftime('%H:%M:%S')}] ❌ Tests FAILED - Sending email notification")
                
                # Crea il contenuto HTML per l'email
                error_html = create_error_page()
                
                # Invia email di errore solo quando i test falliscono
                subject = f"❌ PLAYWRIGHT TESTS FAILED - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
                body = f"""
<h1 style="color: red;">⚠️ PLAYWRIGHT TESTS FAILED ⚠️</h1>
<p><strong>Timestamp:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
<p><strong>Project:</strong> {PROJECT_DIR}</p>

<h2>Test Output:</h2>
<pre style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
{test_output}
</pre>

<hr>
{error_html}
                """
                
                send_email(subject, body, is_html=True)
            
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Waiting 5 minutes for next run...")
            time.sleep(300)  # Aspetta 5 minuti
            
    except KeyboardInterrupt:
        print("\n\nTest monitor stopped by user")
    except Exception as e:
        print(f"\nUnexpected error: {e}")

if __name__ == "__main__":
    main()