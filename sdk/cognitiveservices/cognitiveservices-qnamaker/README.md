## An isomorphic javascript sdk for - QnAMakerClient

This package contains an isomorphic SDK for QnAMakerClient.

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

```typescript
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { QnAMakerClient } from "@azure/cognitiveservices-qnamaker";

async function main() {
  const qnaMakerKey = process.env["qnaMakerKey"] || "<qnaMakerKey>";
  const qnaMakerEndpoint = process.env["qnaMakerEndpoint"] || "<qnaMakerEndpoint>";

  const cognitiveServicesCredentials = new CognitiveServicesCredentials(qnaMakerKey);
  const client = new QnAMakerClient(cognitiveServicesCredentials, qnaMakerEndpoint);

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
      const qnaMakerKey = "<QnAMaker_Key>";
      const qnaMakerEndpoint = "<QnAMaler_Endpoin>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": qnaMakerKey
        }
      });

      const client = new Azure.CognitiveservicesQnamaker.QnAMakerClient(
        cognitiveServiceCredentials,
        qnaMakerEndpoint
      );

      client.endpointSettings
        .getSettings()
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/cognitiveservices/cognitiveservices-qnamaker/README.png)
