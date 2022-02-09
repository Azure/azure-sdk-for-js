## An isomorphic javascript sdk for - FormRecognizerClient

This package contains an isomorphic SDK for FormRecognizerClient.

> Please note, this package is deprecated and not functional as it uses a version of the Form Recognizer service (`v1.0-preview`) that is no longer available. As of August 2020, you can instead use [@azure/ai-form-recognizer](https://www.npmjs.com/package/@azure/ai-form-recognizer).

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### How to Install

```bash
npm install @azure/cognitiveservices-formrecognizer
```

### How to use

#### nodejs - Authentication, client creation and getExtractedKeys as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js


```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample reads the scanned copy of a sample receipt. To know more, refer to the [Azure Documentation on Form Recognizer](https://docs.microsoft.com/azure/cognitive-services/form-recognizer/overview)

```javascript
const { FormRecognizerClient } = require("@azure/cognitiveservices-formrecognizer");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
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

##### Sample code

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-formrecognizer%2FREADME.png)
