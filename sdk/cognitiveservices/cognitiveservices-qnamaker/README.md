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

#### nodejs - Authentication, client creation and getKeys endpointKeys as an example written in TypeScript.

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { QnAMakerClient, QnAMakerModels, QnAMakerMappers } from "@azure/cognitiveservices-qnamaker";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];
const endpoint = "https://westus.api.cognitive.microsoft.com"; // OR some other endpoint.
const creds = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscriptionId }});
const client = new QnAMakerClient(creds, endpoint);
client.endpointKeys.getKeys().then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and getKeys endpointKeys as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-qnamaker sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-qnamaker/dist/cognitiveservices-qnamaker.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const creds = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscriptionId }});
      const endpoint = "https://westus.api.cognitive.microsoft.com"; // OR some other endpoint.
      const client = new Azure.CognitiveservicesQnamaker.QnAMakerClient(creds, endpoint);
      client.endpointKeys.getKeys().then((result) => {
        console.log("The result is:");
        console.log(result);
      }).catch((err) => {
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
