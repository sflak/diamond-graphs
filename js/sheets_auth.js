// ID and API keys from Jon's dev console
let CLIENT_ID = "442237768412-94tj9jaiggjddjqevjvqhevp9ssr81en.apps.googleusercontent.com"
let API_KEY = "AIzaSyBiTOphuNoHfLmC8u3rSdl5SmS3YfcA1XU"

// Read-only access for google sheets documents
let SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly"

function handleClientLoad () {
    gapi.load('client:auth2', initClient);
}