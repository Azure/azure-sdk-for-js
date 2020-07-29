## An isomorphic javascript sdk for - LUISAuthoringClient

This package contains an isomorphic SDK for LUISAuthoringClient.

Package version | LUIS Authoring API version
--------------- | --------------------------
3.0.0           |  /luis/api/v2.0
4.0.0-preview.3 |  /luis/authoring/v3.0-preview

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-luis-authoring
```

### How to use

#### nodejs - Authentication, client creation and listPhraseLists features as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code

```javascript
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");
const { LUISAuthoringClient } = require("@azure/cognitiveservices-luis-authoring");

let authoringKey = process.env["luis-authoring-key"];
const creds = new CognitiveServicesCredentials(authoringKey);

// check the following link to find your region
// https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-reference-regions
const region = "<your-region>";
const client = new LUISAuthoringClient(
  creds,
  "https://" + region + ".api.cognitive.microsoft.com/"
);

const appId = "<your-app-id>"; // replace this with your appId.
const versionId = "0.1"; // replace with version of your luis application. Initial value will be 0.1

const skip = 1;
const take = 1;

client.features
  .listPhraseLists(appId, versionId, { skip, take })
  .then((result) => {
    console.log("The result is:");
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
```

#### browser - Authentication, client creation and listPhraseLists features as an example written in JavaScript.


##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-luis-authoring sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-luis-authoring/dist/cognitiveservices-luis-authoring.js"></script>
    <script type="text/javascript">
      let authoringKey = process.env["luis-authoring-key"];
      const creds = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': authoringKey } });

      const region = "<your-region>";
      const client = new Azure.CognitiveservicesLuisAuthoring.LUISAuthoringClient(
        creds,
        "https://" + region + ".api.cognitive.microsoft.com/"
      );
      const appId = "<your-app-id>"; // replace this with your appId.
      const versionId = "0.1"; // replace with version of your luis application. Initial value will be 0.1
      const skip = 1;
      const take = 1;
      client.features
        .listPhraseLists(appId, versionId, { skip, take })
        .then((result) => {
          console.log("The result is:");
          console.log(result);
        })
        .catch((err) => {
          console.log("An error occurred:");
          console.error(err);
        });
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-luis-authoring%2FREADME.png)
