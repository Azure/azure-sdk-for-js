## An isomorphic javascript sdk for - LUISRuntimeClient

This package contains an isomorphic SDK for LUISRuntimeClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-luis-runtime
```

### How to use

#### nodejs - Authentication, client creation and getVersionPrediction prediction as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code

```javascript
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");
const { LUISRuntimeClient } = require("@azure/cognitiveservices-luis-runtime");

let authoringKey = process.env["luis-authoring-key"];
const creds = new CognitiveServicesCredentials(authoringKey);

// check the following link to find your region
// https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-reference-regions
const region = "<your-region>";
const client = new LUISRuntimeClient(creds, "https://" + region + ".api.cognitive.microsoft.com/");

const appId = "<your-app-id>"; // replace this with your appId.
const versionId = "0.1"; // replace with version of your luis application. Initial value will be 0.1

const predictionRequest = {
  query: "testquery",
  options: {
    datetimeReference: new Date(),
    preferExternalEntities: true
  },
  externalEntities: [
    {
      entityName: "testentityName",
      startIndex: 1,
      entityLength: 1,
	    score: 0.86,
      resolution: {}
    }
  ],
  dynamicLists: [
    {
      listEntityName: "testlistEntityName",
      requestLists: [
        {
          name: "testname",
          canonicalForm: "testcanonicalForm",
          synonyms: ["testsynonyms"]
        }
      ]
    }
  ]
};
const verbose = true;
const showAllIntents = true;

client.prediction
  .getVersionPrediction(appId, versionId, predictionRequest, { verbose, showAllIntents })
  .then((result) => {
    console.log("The result is:");
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
```

#### browser - Authentication, client creation and getVersionPrediction prediction as an example written in JavaScript.



##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-luis-runtime sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-luis-runtime/dist/cognitiveservices-luis-runtime.js"></script>
    <script type="text/javascript">
      let authoringKey = process.env["luis-authoring-key"];
      const creds = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': authoringKey } });


      // check the following link to find your region
      // https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-reference-regions
      const region = "<your-region>";
      const client = new Azure.CognitiveservicesLuisRuntime.LUISRuntimeClient(
        creds,
        "https://" + region + ".api.cognitive.microsoft.com/"
      );

      const appId = "<your-app-id>"; // replace this with your appId.
      const versionId = "0.1"; // replace with version of your luis application. Initial value will be 0.1

      const predictionRequest = {
        query: "testquery",
        options: {
          datetimeReference: new Date(),
          preferExternalEntities: true
        },
        externalEntities: [
          {
            entityName: "testentityName",
            startIndex: 1,
            entityLength: 1,
			      score: 0.9,
            resolution: {}
          }
        ],
        dynamicLists: [
          {
            listEntityName: "testlistEntityName",
            requestLists: [
              {
                name: "testname",
                canonicalForm: "testcanonicalForm",
                synonyms: ["testsynonyms"]
              }
            ]
          }
        ]
      };
      const verbose = true;
      const showAllIntents = true;

      client.prediction
        .getVersionPrediction(appId, versionId, predictionRequest, { verbose, showAllIntents })
        .then((result) => {
          console.log("The result is:");
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-luis-runtime%2FREADME.png)
