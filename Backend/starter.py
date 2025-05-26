import os
import pickle
from flask import session, request, redirect
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

SCOPES = [
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/userinfo.email',   # Add this
    'openid'                                             # And this for identity
]
CREDENTIALS_FILE = os.path.join(os.path.dirname(__file__), 'config', 'client_secret_1web.json')
REDIRECT_URI = 'http://localhost:5000/oauth2callback'
TOKEN_DIR = os.path.join(os.path.dirname(__file__), 'tokens')

os.makedirs(TOKEN_DIR, exist_ok=True)

def get_token_path(email):
    return os.path.join(TOKEN_DIR, f'{email}.pickle')

def get_user_email(creds):
    if not creds or not creds.valid:
        raise Exception("❌ Invalid or missing credentials.")
    oauth2_client = build('oauth2', 'v2', credentials=creds)
    user_info = oauth2_client.userinfo().get().execute()
    return user_info['email']

def start_auth_flow():
    flow = Flow.from_client_secrets_file(CREDENTIALS_FILE, scopes=SCOPES, redirect_uri=REDIRECT_URI)
    auth_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
    session['state'] = state
    print(auth_url)
    return redirect(auth_url)

def handle_auth_callback():
    flow = Flow.from_client_secrets_file(CREDENTIALS_FILE, scopes=SCOPES, redirect_uri=REDIRECT_URI)
    flow.fetch_token(authorization_response=request.url)
    if not flow.credentials:
        raise Exception("❌ Failed to fetch credentials.")
    creds = flow.credentials
    email = get_user_email(creds)
    session['user_email'] = email
    print("👤 Logged in as:", email)

    with open(get_token_path(email), 'wb') as token:
        pickle.dump(creds, token)

    return redirect('http://localhost:4200'),creds ,email # send user back to frontend

def get_authenticated_service():
    email = session.get('user_email')
    if not email:
        return None
    
    token_path = get_token_path(email)
    if not os.path.exists(token_path):
        return None

    with open(token_path, 'rb') as token:
        creds = pickle.load(token)

    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        with open(token_path, 'wb') as token_file:
            pickle.dump(creds, token_file)

    return build('youtube', 'v3', credentials=creds)
