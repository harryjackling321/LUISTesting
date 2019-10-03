# LUISTesting
Microsoft LUIS Batch Regression Test (beta)

Microsoft LUIS Batch Regression Test (beta)

To-do: test usage with entity apps

Requirements:

LUIS	- App must be in production slot on LUIS,

SYSTEM	- .NET Core 3.0 runtime and SDK must be installed,

SYSTEM	- Node.js and NPM must be installed

Files:

    buildSettings.js   - Based the supplied name of the app to be tested, will construct a appsettings.local.json file:
		{
        		luisAuthoringKey: '26e6d63e026a45469043dae0c4ebb33b', --> hardcoded for chatforge
        		luisAuthoringRegion: "westeurope",		      --> hardcoded for chatforge
        		luisAppId: appId,				      --> taken from API
        		luisAppName: appName,				      --> taken from API
        		luisVersionId: versionId			      --> taken from API
    		}
			 - API ocp-apim subsciption key is hardcoded for chatforge

    buildUtterances.js - Uses appsettings.local.json info with LUIS API to construct generic utterances file for app.

    testingScript.ps1  - Installs necessary packages and tools. Uses LUIS CLI to run test on utterances then analyze 
			 results against expected intents. Any failures result in an error while correct results give
			 no error.  
			   
