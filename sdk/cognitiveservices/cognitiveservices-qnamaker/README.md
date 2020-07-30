## An isomorphic javascript sdk for - QnAMakerClient

This package contains an isomorphic SDK for editing and creating Knowledge Bases, its endpoints and keys.
For interacting with QnAMaker such as training and asking questions please see @azure/cognitiveservices-qnamaker-runtime.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-qnamaker
```

### How to use

#### nodejs - Authentication, client creation and getSettings endpointSettings as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code

```javascript
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");  
const { QnAMakerClient } = require("@azure/cognitiveservices-qnamaker");

async function main() {
  const QNAMAKER_KEY = process.env["QNAMAKER_KEY"] || "<QNAMAKER_KEY>";
  const QNAMAKER_ENDPOINT = process.env["QNAMAKER_ENDPOINT"] || "<QNAMAKER_ENDPOINT>";

  const cognitiveServicesCredentials = new CognitiveServicesCredentials(QNAMAKER_KEY);
  const client = new QnAMakerClient(cognitiveServicesCredentials, QNAMAKER_ENDPOINT);

  const settings = await client.endpointSettings.getSettings();

  console.log(`The result is: ${JSON.stringify(settings)}`);
}

main();
```

#### browser - Authentication, client creation and getSettings endpointSettings as an example written in JavaScript.

##### Install @azure/ms-rest-browserauth

```bash
npm install @azure/ms-rest-browserauth
```

##### Sample code

See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-qnamaker sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-qnamaker/dist/cognitiveservices-qnamaker.js"></script>
    <script type="text/javascript">
      async function main() {
        const QNAMAKER_KEY = "<QNAMAKER_KEY>";
        const QNAMAKER_ENDPOINT = "<QNAMAKER_ENDPOINT>";
        const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
          inHeader: {
            "Ocp-Apim-Subscription-Key": QNAMAKER_KEY
          }
        });

        const client = new Azure.CognitiveservicesQnamaker.QnAMakerClient(
          cognitiveServiceCredentials,
          QNAMAKER_ENDPOINT
        );

        const settings = client.endpointSettings.getSettings();
        console.log(`The result is: ${settings}`);
      }

      main();
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/README.png)
