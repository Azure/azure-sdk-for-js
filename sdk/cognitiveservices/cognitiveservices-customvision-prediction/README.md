## An isomorphic javascript sdk for - PredictionAPIClient

This package contains an isomorphic SDK for PredictionAPIClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-customvision-prediction
```

### How to use

##### Sample code
The following sample predicts and classifies the given image based on your custom vision training. To know more, refer to the [Azure Documentation on Custom Vision Services](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/home).

```typescript
import { PredictionAPIClient } from "@azure/cognitiveservices-customvision-prediction";

async function main(): Promise<void> {
  const customVisionPredictionKey =
    process.env["customVisionPredictionKey"] || "<customVisionPredictionKey>";
  const customVisionPredictionEndPoint =
    process.env["customVisionPredictionEndPoint"] ||
    "<customVisionPredictionEndPoint>";
  const projectId = process.env["projectId"] || "<projectId>";

  const imageURL =
    "https://www.atlantatrails.com/wp-content/uploads/2019/02/north-georgia-waterfalls-1024x683.jpg";

  const client = new PredictionAPIClient(
    customVisionPredictionKey,
    customVisionPredictionEndPoint
  );

  client
    .classifyImageUrl(projectId, "Iteration1", { url: imageURL })
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

#### browser - Authentication, client creation and classifyImageUrl  as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-customvision-prediction sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-customvision-prediction/dist/cognitiveservices-customvision-prediction.js"></script>
    <script type="text/javascript">
      const customVisionPredictionKey = "<YOUR_CUSTOM_VISION_PREDICTION_KEY>";
      const customVisionPredictionEndPoint =
        "<YOUR_CUSTOM_VISION_PREDICTION_ENDPOINT>";
      const projectId = "<YOUR_CUSTOM_VISION_PREDICTION_PROJECTID>";

      const imageURL =
        "https://www.atlantatrails.com/wp-content/uploads/2019/02/north-georgia-waterfalls-1024x683.jpg";

      const client = new Azure.CognitiveservicesCustomvisionPrediction.PredictionAPIClient(
        customVisionPredictionKey,
        customVisionPredictionEndPoint
      );

      client
        .classifyImageUrl(projectId, "Iteration1", { url: imageURL })
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/cognitiveservices/cognitiveservices-customvision-prediction/README.png)
