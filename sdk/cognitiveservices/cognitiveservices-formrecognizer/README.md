## An isomorphic javascript sdk for - FormRecognizerClient

This package contains an isomorphic SDK for FormRecognizerClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-formrecognizer
```

### How to use

#### nodejs - Authentication, client creation and getExtractedKeys as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

- Please install minimum version of `"@azure/ms-rest-azure-js": "^2.0.0"`.

```bash
npm install @azure/ms-rest-azure-js@"^2.0.0"
```

##### Sample code

```typescript
import { FormRecognizerClient } from "@azure/cognitiveservices-formrecognizer";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";

async function main(): Promise<void> {
  const formRecognizerKey = process.env["formRecognizerKey"] || "<formRecognizerKey>";
  const endPoint = process.env["endPoint"] || "<endPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(formRecognizerKey);
  const client = new FormRecognizerClient(cognitiveServiceCredentials, endPoint);

  client
    .batchReadReceipt(
      "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-receipt.png"
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();
```

#### browser - Authentication, client creation and getExtractedKeys as an example written in JavaScript.

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
    <title>@azure/cognitiveservices-formrecognizer sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-formrecognizer/dist/cognitiveservices-formrecognizer.js"></script>
    <script type="text/javascript">
      const formRecognizerKey = "<YOUR_FORM_RECOGNIZER_KEY>";
      const endPoint = "<YOUR_FORM_RECOGNIZER_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": formRecognizerKey
        }
      });
      const client = new Azure.CognitiveservicesFormrecognizer.FormRecognizerClient(
        cognitiveServiceCredentials,
        endPoint
      );
      client
        .batchReadReceipt(
          "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-receipt.png"
        )
        .then((result) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/cognitiveservices/cognitiveservices-formrecognizer/README.png)
