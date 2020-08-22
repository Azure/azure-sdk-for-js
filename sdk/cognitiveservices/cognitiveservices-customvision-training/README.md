## An isomorphic javascript sdk for - TrainingAPIClient

This package contains an isomorphic SDK for TrainingAPIClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-customvision-training
```

### How to use

#### nodejs - Authentication, client creation and getDomains  as an example written in TypeScript.

##### Sample code
The following sample performs a quick test of the given image based on your custom vision training. To know more, refer to the [Azure Documentation on Custom Vision Services](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/home).

```javascript
const { TrainingAPIClient } = require("@azure/cognitiveservices-customvision-training");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");

async function main() {
  const customVisionTrainingKey =
    process.env["customVisionTrainingKey"] || "<customVisionTrainingKey>";
  const customVisionTrainingEndPoint =
    process.env["customVisionTrainingEndPoint"] ||
    "<customVisionTrainingEndPoint>";
  const projectId = process.env["projectId"] || "<projectId>";
  const iterationId = process.env["iterationId"] || "<iterationId>";

  const credentials = new ApiKeyCredentials({ inHeader: { "Training-key": customVisionTrainingKey } });
  const client = new TrainingAPIClient(credentials, customVisionTrainingEndPoint);

  const imageURL =
    "https://www.atlantatrails.com/wp-content/uploads/2019/02/north-georgia-waterfalls-1024x683.jpg";

  const options = {
    iterationId: iterationId
  };

  client
    .quickTestImageUrl(
      projectId,
      {
        url: imageURL
      },
      options
    )
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

#### browser - Authentication, client creation and getDomains  as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-customvision-training sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-customvision-training/dist/cognitiveservices-customvision-training.js"></script>
    <script type="text/javascript">
      const customVisionTrainingKey = "<YOUR_CUSTOM_VISION_TRAINING_KEY>";
      const customVisionTrainingEndPoint =
        "<YOUR_CUSTOM_VISION_TRAINING_ENDPOINT>";
      const projectId = "<YOUR_PROJECT_ID>";
      const iterationId = "<YOUR_ITERATION_ID>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": customVisionTrainingKey
        }
      });

      const imageURL =
        "https://www.atlantatrails.com/wp-content/uploads/2019/02/north-georgia-waterfalls-1024x683.jpg";

      const client = new Azure.CognitiveservicesCustomvisionTraining.TrainingAPIClient(
        cognitiveServiceCredentials,
        customVisionTrainingEndPoint
      );

      const options = {
        iterationId: iterationId
      };

      client
        .quickTestImageUrl(
          projectId,
          {
            url: imageURL
          },
          options
        )
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-customvision-training%2FREADME.png)
