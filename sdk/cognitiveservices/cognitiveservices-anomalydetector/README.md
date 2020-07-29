## An isomorphic javascript sdk for - AnomalyDetectorClient

This package contains an isomorphic SDK for AnomalyDetectorClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-anomalydetector
```

### How to use

#### nodejs - Authentication, client creation and entireDetect as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample determines anamolies with the given time series. To know more, refer to the [Azure Documentation on Anomaly Detectors](https://docs.microsoft.com/en-us/azure/cognitive-services/anomaly-detector/)

```javascript
const { AnomalyDetectorClient } = require("@azure/cognitiveservices-anomalydetector");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const anomalyDetectorKey = process.env["anomalyDetectorKey"] || "<anomalyDetectorKey>";
  const anomalyDetectorEndPoint =
    process.env["anomalyDetectorEndPoint"] || "<anomalyDetectorEndPoint>";

  const cognitiveServiceCredentials = new CognitiveServicesCredentials(anomalyDetectorKey);

  const client = new AnomalyDetectorClient(cognitiveServiceCredentials, anomalyDetectorEndPoint);

  const body = {
    series: [
      {
        timestamp: new Date("December 15, 2018"),
        value: 1.01
      },
      {
        timestamp: new Date("December 16, 2018"),
        value: 1.02
      },
      {
        timestamp: new Date("December 17, 2018"),
        value: 1.03
      },
      {
        timestamp: new Date("December 18, 2018"),
        value: 1.04
      },
      {
        timestamp: new Date("December 19, 2018"),
        value: 1.05
      },
      {
        timestamp: new Date("December 20, 2018"),
        value: 1.06
      },
      {
        timestamp: new Date("December 21, 2018"),
        value: 1.07
      },
      {
        timestamp: new Date("December 22, 2018"),
        value: 1.08
      },
      {
        timestamp: new Date("December 23, 2018"),
        value: 1.09
      },
      {
        timestamp: new Date("December 24, 2018"),
        value: 1.1
      },
      {
        timestamp: new Date("December 25, 2018"),
        value: 1.11
      },
      {
        timestamp: new Date("December 26, 2018"),
        value: 1.12
      }
    ],
    granularity: "daily",
    customInterval: 1,
    period: 1,
    maxAnomalyRatio: 0.3,
    sensitivity: 1
  };

  client
    .entireDetect(body)
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

#### browser - Authentication, client creation and entireDetect as an example written in JavaScript.

##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-anomalydetector sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-anomalydetector/dist/cognitiveservices-anomalydetector.js"></script>
    <script type="text/javascript">
      const anomalyDetectorKey = "<YOUR_ANOMALY_DETECTOR_KEY>";
      const anomalyDetectorEndPoint = "<YOUR_ANOMALY_DETECTOR_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": anomalyDetectorKey
        }
      });
      const client = new Azure.CognitiveservicesAnomalydetector.AnomalyDetectorClient(
        cognitiveServiceCredentials,
        anomalyDetectorEndPoint
      );

      const body = {
        series: [
          {
            timestamp: new Date("December 15, 2018"),
            value: 1.01
          },
          {
            timestamp: new Date("December 16, 2018"),
            value: 1.02
          },
          {
            timestamp: new Date("December 17, 2018"),
            value: 1.03
          },
          {
            timestamp: new Date("December 18, 2018"),
            value: 1.04
          },
          {
            timestamp: new Date("December 19, 2018"),
            value: 1.05
          },
          {
            timestamp: new Date("December 20, 2018"),
            value: 1.06
          },
          {
            timestamp: new Date("December 21, 2018"),
            value: 1.07
          },
          {
            timestamp: new Date("December 22, 2018"),
            value: 1.08
          },
          {
            timestamp: new Date("December 23, 2018"),
            value: 1.09
          },
          {
            timestamp: new Date("December 24, 2018"),
            value: 1.1
          },
          {
            timestamp: new Date("December 25, 2018"),
            value: 1.11
          },
          {
            timestamp: new Date("December 26, 2018"),
            value: 1.12
          }
        ],
        granularity: "daily",
        customInterval: 1,
        period: 1,
        maxAnomalyRatio: 0.3,
        sensitivity: 1
      };

      client
        .entireDetect(body)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-anomalydetector%2FREADME.png)
