var fs = require("fs");
const request = require('request-promise');

var appSettings = fs.readFileSync("appsettings.local.json");
var appSet = JSON.parse(appSettings);
var versionId = appSet.luisVersionId;
var appId = appSet.luisAppId;

console.log(versionId);
console.log(appId)
url = 'https://westeurope.api.cognitive.microsoft.com/luis/api/v2.0/apps/'+appId+'/versions/'+versionId+'/export';
console.log(url);

const options = {
    method: 'GET',
    uri: url,
    headers: {
        'Ocp-Apim-Subscription-Key': '26e6d63e026a45469043dae0c4ebb33b'
    },
    json: true
  }

request(options)
  .then(function (response) {
    // Request was successful, use the response object at will
    apiResponse = response;
    data = apiResponse.utterances

    var jsonData = JSON.stringify(data);

    fs.writeFileSync('utterances.json', jsonData);

    console.log(data)

  })
  .catch(function (err) {
    // Something bad happened, handle the error
    console.log("Error due to API call failure - URL or auth");
})
