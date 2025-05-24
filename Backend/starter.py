import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
CREDENTIALS_FILE = os.path.join(os.path.dirname(__file__), 'config', 'client_secret_1web.json')
TOKEN_FILE = os.path.join(os.path.dirname(__file__), 'config', 'token.pickle')

def get_authenticated_service():
    creds = None

    # Load token if available
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'rb') as token:
            creds = pickle.load(token)

    # If credentials are invalid/expired, refresh or re-auth
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES,redirect_uri='http://localhost:4200' )
            creds = flow.run_local_server(port=0)
        # Save the token for reuse
        with open(TOKEN_FILE, 'wb') as token:
            pickle.dump(creds, token)

    return build('youtube', 'v3', credentials=creds)
