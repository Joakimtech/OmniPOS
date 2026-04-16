import uvicorn
import socket

def get_ip():
    # This helper finds your local IP automatically
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

if __name__ == "__main__":
    local_ip = get_ip()
    print(f"--- OmniPOS Backend Launching on {local_ip} ---")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)