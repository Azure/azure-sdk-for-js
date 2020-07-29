## An isomorphic javascript sdk for - PersonalizerClient

This package contains an isomorphic SDK for PersonalizerClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-personalizer
```

### How to use

#### nodejs - Authentication, client creation and reward events as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample ranks a personalized request object. To know more, refer to the [Azure Documentation on Personalizer](https://docs.microsoft.com/en-us/azure/cognitive-services/personalizer/)

```javascript
const { PersonalizerClient } = require("@azure/cognitiveservices-personalizer");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const personalizerKey = process.env["personalizerKey"] || "<personalizerKey>";
  const personalizerEndPoint =
    process.env["personalizerEndPoint"] || "<personalizerEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    personalizerKey
  );

  const client = new PersonalizerClient(
    cognitiveServiceCredentials,
    personalizerEndPoint
  );

  const rankRequest = {
    contextFeatures: [
      {
        timeOfDay: "Morning"
      }
    ],
    actions: [
      {
        id: "NewsArticle",
        features: [
          {
            type: "News"
          }
        ]
      },
      {
        id: "SportsArticle",
        features: [
          {
            type: "Sports"
          }
        ]
      },
      {
        id: "EntertainmentArticle",
        features: [
          {
            type: "Entertainment"
          }
        ]
      }
    ],
    excludedActions: ["SportsArticle"],
    eventId: "75269AD0-BFEE-4598-8196-C57383D38E10",
    deferActivation: false
  };

  client
    .rank(rankRequest)
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

#### browser - Authentication, client creation and reward events as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-personalizer sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-personalizer/dist/cognitiveservices-personalizer.js"></script>
    <script type="text/javascript">
      const personalizerKey = "<YOUR_PERSONALIZER_KEY>";
      const personalizerEndPoint = "<YOUR_PERSONALIZER_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": personalizerKey
        }
      });
      const client = new Azure.CognitiveservicesPersonalizer.PersonalizerClient(
        cognitiveServiceCredentials,
        personalizerEndPoint
      );

      const rankRequest = {
        contextFeatures: [
          {
            timeOfDay: "Morning"
          }
        ],
        actions: [
          {
            id: "NewsArticle",
            features: [
              {
                type: "News"
              }
            ]
          },
          {
            id: "SportsArticle",
            features: [
              {
                type: "Sports"
              }
            ]
          },
          {
            id: "EntertainmentArticle",
            features: [
              {
                type: "Entertainment"
              }
            ]
          }
        ],
        excludedActions: ["SportsArticle"],
        eventId: "75269AD0-BFEE-4598-8196-C57383D38E10",
        deferActivation: false
      };

      client
        .rank(rankRequest)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-personalizer%2FREADME.png)
