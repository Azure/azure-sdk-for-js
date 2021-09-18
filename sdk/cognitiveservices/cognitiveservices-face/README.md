## An isomorphic javascript sdk for - FaceClient

This package contains an isomorphic SDK for FaceClient.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### How to Install

```bash
npm install @azure/cognitiveservices-face
```

### How to use

#### nodejs - Authentication, client creation and list personGroupPerson as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample detects the facial features on the given image. To know more, refer to the [Azure Documentation on Face APIs](https://docs.microsoft.com/azure/cognitive-services/face/overview)

```javascript
const { FaceClient, FaceModels } = require("@azure/cognitiveservices-face");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const faceKey = process.env["faceKey"] || "<faceKey>";
  const faceEndPoint = process.env["faceEndPoint"] || "<faceEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(faceKey);
  const client = new FaceClient(cognitiveServiceCredentials, faceEndPoint);
  const url =
    "https://pbs.twimg.com/profile_images/3354326900/3a5168f2b45c07d0965098be1a4e3007.jpeg";
  const options = {
    returnFaceLandmarks: true
  };
  client.face
    .detectWithUrl(url, options)
    .then(result => {
      console.log("The result is: ");
      console.log(result);
    })
    .catch(err => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();
```

#### browser - Authentication, client creation and list personGroupPerson as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-face sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-face/dist/cognitiveservices-face.js"></script>
    <script type="text/javascript">
      const faceKey = "<YOUR_FACE_KEY>";
      const faceEndPoint = "<YOUR_FACE_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": faceKey
        }
      });
      const client = new Azure.CognitiveservicesFace.FaceClient(
        cognitiveServiceCredentials,
        faceEndPoint
      );

      const url =
        "https://pbs.twimg.com/profile_images/3354326900/3a5168f2b45c07d0965098be1a4e3007.jpeg";
      const options = {
        returnFaceLandmarks: true
      };
      client.face
        .detectWithUrl(url, options)
        .then(result => {
          console.log("The result is: ");
          console.log(result);
        })
        .catch(err => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-face%2FREADME.png)
