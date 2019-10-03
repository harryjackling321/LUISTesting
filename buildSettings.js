//Askes for the app name from the user then uses an API call to obtain the app ID.
//Based on hardcoded region and auth key outputs local settings for CLI use.
const request = require('request-promise');
const readline = require('readline-sync');
const fs = require('fs');

var apiResponse;
var appName = readline.question("What is your app Name (exactly)? ");
//var appName = "TestingStuff";
var appId;
var versionId;

const options = {
    method: 'GET',
    uri: 'https://westeurope.api.cognitive.microsoft.com/luis/api/v2.0/apps/',
    headers: {
        'Ocp-Apim-Subscription-Key': '26e6d63e026a45469043dae0c4ebb33b'
    },
    json: true
  }

request(options)
  .then(function (response) {
    // Request was successful, use the response object at will
    apiResponse = response;
    console.log("API call successful");

    var i;
    
    for (i = 0; i < apiResponse.length; i++) {
        if (apiResponse[i].name == appName) {
            appId = apiResponse[i].id;
            versionId = apiResponse[i].activeVersion;
        }
    }

    console.log(appId + ' ' + appName);

    let appSettings = {
        luisAuthoringKey: '26e6d63e026a45469043dae0c4ebb33b',
        luisAuthoringRegion: "westeurope",
        luisAppId: appId,
        luisAppName: appName,
        luisVersionId: versionId
    }

    var data = JSON.stringify(appSettings);

    fs.writeFileSync('appsettings.local.json', data);

    console.log(appSettings);

  })
  .catch(function (err) {
    // Something bad happened, handle the error
    console.log("Error due to API call failure - URL or auth");
  })

