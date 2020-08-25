## An isomorphic javascript sdk for - TextAnalyticsClient

This package contains an isomorphic SDK for TextAnalyticsClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-textanalytics
```

### How to use

#### nodejs - Authentication, client creation and detectLanguage  as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample detects the langauge in the provided text. In addition, it provides data such as Characters count, transaction count, etc. To know more, refer to the [Azure Documentation on Text Analytics](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/overview)

```javascript
const { TextAnalyticsClient } = require("@azure/cognitiveservices-textanalytics");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const textAnalyticsKey =
    process.env["textAnalyticsKey"] || "<textAnalyticsKey>";
  const textAnalyticsEndPoint =
    process.env["textAnalyticsEndPoint"] || "<textAnalyticsEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    textAnalyticsKey
  );
  const client = new TextAnalyticsClient(
    cognitiveServiceCredentials,
    textAnalyticsEndPoint
  );
  const options = {
    showStats: true,
    languageBatchInput: {
      documents: [
        {
          id: "1",
          text: "Sample Text"
        },
        {
          id: "2",
          text: "Texto de ejemplo"
        }
      ]
    }
  };
  client
    .detectLanguage(options)
    .then(result => {
      console.log("The result is:");
      result.documents.forEach(document => {
        console.log(`Id: ${document.id}`);
        console.log("Detected Languages:");
        document.detectedLanguages.forEach(dl => {
          console.log(dl.name);
        });
        console.log(
          `Characters Count: ${document.statistics.charactersCount}`
        );
        console.log(
          `Transactions Count: ${document.statistics.transactionsCount}`
        );
      });
    })
    .catch(err => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();

```

#### browser - Authentication, client creation and detectLanguage  as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-textanalytics sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-textanalytics/dist/cognitiveservices-textanalytics.js"></script>
    <script type="text/javascript">
      const textAnalyticsKey = "<YOUR_TEXT_ANALYTICS_KEY>";
      const textAnalyticsEndPoint = "<YOUR_TEXT_ANALYTICS_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": textAnalyticsKey
        }
      });
      const client = new Azure.CognitiveservicesTextanalytics.TextAnalyticsClient(
        cognitiveServiceCredentials,
        textAnalyticsEndPoint
      );

      const options = {
        showStats: true,
        languageBatchInput: {
          documents: [
            {
              id: "1",
              text: "Sample Text"
            },
            {
              id: "2",
              text: "Texto de ejemplo"
            }
          ]
        }
      };

      client
        .detectLanguage(options)
        .then(result => {
          console.log("The result is:");
          result.documents.forEach(document => {
            console.log(`Id: ${document.id}`);
            console.log("Detected Languages:");
            document.detectedLanguages.forEach(dl => {
              console.log(dl.name);
            });
            console.log(
              `Characters Count: ${document.statistics.charactersCount}`
            );
            console.log(
              `Transactions Count: ${document.statistics.transactionsCount}`
            );
          });
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-textanalytics%2FREADME.png)
