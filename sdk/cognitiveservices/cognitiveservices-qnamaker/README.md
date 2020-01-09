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

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample lists the keys of the QnAMaker endpoint. To know more, refer to the [Azure Documentation on QnAMaker](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/)

```typescript
import { QnAMakerClient } from "@azure/cognitiveservices-qnamaker";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";

const qnaMakerKey = process.env["YOUR_QNAMAKER_KEY"] || "<YOUR_QNAMAKER_KEY>";
const endpoint =
  process.env["YOUR_QNAMAKER_ENDPOINT"] || "<YOUR_QNAMAKER_ENDPOINT>";

const creds = new CognitiveServicesCredentials(qnaMakerKey);

const client = new QnAMakerClient(creds, endpoint);
client.endpointKeys
  .getKeys()
  .then(result => {
    console.log("The result is:");
    console.log(result);
  })
  .catch(err => {
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
    <script src="node_modules/@azure/cognitiveservices-qnamaker/dist/cognitiveservices-qnamaker.js"></script>
    <script type="text/javascript">
      const qnaMakerKey = "<YOUR_QNAMAKER_KEY>";
      const endpoint = "<YOUR_QNAMAKER_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": qnaMakerKey
        }
      });
      const client = new Azure.CognitiveservicesQnamaker.QnAMakerClient(
        cognitiveServiceCredentials,
        endpoint
      );

      client.endpointKeys
        .getKeys()
        .then(result => {
          console.log("The result is:");
          console.log(result);
        })
        .catch(err => {
          console.error(err);
        });
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-qnamaker%2FREADME.png)
