cd $PSScriptRoot

npm install file-system
npm install readline-sync
npm install request
npm install request-promise
dotnet tool install -g dotnet-nlu
node .\buildSettings.js
node .\buildUtterances.js
dotnet nlu test -s luis -u utterances.json -o results.json
dotnet nlu compare -e utterances.json -a results.json

[xml]$XmlDocument = Get-Content -Path .\TestResult.xml

If ($XmlDocument.'test-run'.result -eq 'Passed') {
    'Correct' } 
Else {
    throw "Test Failed"
}

Write-Host "Test End"

Read-Host -Prompt "Press Enter to exit"
