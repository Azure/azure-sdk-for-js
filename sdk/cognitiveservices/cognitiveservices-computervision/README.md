## An isomorphic javascript sdk for - ComputerVisionClient

This package contains an isomorphic SDK for ComputerVisionClient.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### How to Install

```bash
npm install @azure/cognitiveservices-computervision
```

### How to use

#### nodejs - Authentication, client creation and listModels as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample describes a given image using Computer Vision. To know more, refer to the [Azure Documentation on Computer Vision](https://docs.microsoft.com/azure/cognitive-services/computer-vision/home)

```javascript
const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const computerVisionKey = process.env["computerVisionKey"] || "<computerVisionKey>";
  const computerVisionEndPoint =
    process.env["computerVisionEndPoint"] || "<computerVisionEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(computerVisionKey);
  const client = new ComputerVisionClient(cognitiveServiceCredentials, computerVisionEndPoint);

  const url =
    "https://docs.microsoft.com/azure/includes/media/shared-image-galleries/shared-image-gallery.png";
  const options = {
    maxCandidates: 5,
    language: "en"
  };
  client
    .describeImage(url, options)
    .then((result) => {
      console.log("The result is:");
      console.log(result);
    })
    .catch((err) => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();
```

#### browser - Authentication, client creation and listModels as an example written in JavaScript.

##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-computervision sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-computervision/dist/cognitiveservices-computervision.js"></script>
    <script type="text/javascript">
      const computerVisionKey = "<YOUR_COMPUTER_VISION_KEY>";
      const computerVisionEndPoint = "<YOUR_COMPUTER_VISION_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": computerVisionKey
        }
      });
      const client = new Azure.CognitiveservicesComputervision.ComputerVisionClient(
        cognitiveServiceCredentials,
        computerVisionEndPoint
      );

      const url =
        "https://docs.microsoft.com/azure/includes/media/shared-image-galleries/shared-image-gallery.png";
      const options = {
        maxCandidates: 5,
        language: "en"
      };

      client
        .describeImage(url, options)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-computervision%2FREADME.png)
