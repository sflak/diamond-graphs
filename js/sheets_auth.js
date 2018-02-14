function initClient (CLIENT_ID, API_KEY) {
    // ID and API keys from Jon's dev console
    let clientId = "442237768412-94tj9jaiggjddjqevjvqhevp9ssr81en.apps.googleusercontent.com"
    let apiKey = "AIzaSyBiTOphuNoHfLmC8u3rSdl5SmS3YfcA1XU"

    // Read-only access for google sheets documents
    let scope = "https://www.googleapis.com/auth/spreadsheets.readonly"

    gapi.client.init ({
        clientId: clientId,
        apiKey: apiKey,
        scope: scope,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus)
        updateSignInStatus(gapi.getAuthInstance().isSignedIn.get())
    })
}

function makeApiCall (folderName, sheetName, range) {
    
    let params = {
        // Id of spreadsheet to get data from, parse from link
        spreadsheetId: id,
        // Range to read from 
        range: range,
        // 	https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption
        valueRenderOption: 'UNFORMATTED_VALUE',   
    }

    let request = gapi.client.sheets.spreadsheets.values.get(params)
    request.then( function (response) {
        console.log(response.result)
    }, function (reason) {
        console.log(reason.result.error.message)
    })
}

function handleClientLoad () {
    gapi.load('client:auth2', initClient)
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCall()
    }
}

function handleSignInClick (event) {
    gapi.auth2.getAuthInstance().signIn()
}

function handleSignOutClick (event) {
    gapi.auth2.getAuthInstance().signOut()
}
