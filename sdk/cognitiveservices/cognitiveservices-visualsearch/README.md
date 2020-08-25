## An isomorphic javascript sdk for - VisualSearchClient

This package contains an isomorphic SDK for VisualSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-visualsearch
```

### How to use

#### nodejs - Authentication, client creation and visualSearch images as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs a visual search, i.e. perform a search with a image. To know more, refer to the [Azure Documentation on Bing Visual Search](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-visual-search/).

```javascript
const { VisualSearchClient } = require("@azure/cognitiveservices-visualsearch");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const visualSearchKey = process.env["visualSearchKey"] || "<visualSearchKey>";
  const visualSearchEndPoint =
    process.env["visualSearchEndPoint"] || "<visualSearchEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    visualSearchKey
  );
  const client = new VisualSearchClient(cognitiveServiceCredentials, {
    endpoint: visualSearchEndPoint
  });

  const insightsToken =
    process.env["insights_token"] || "<insights_token>";;

  const knowledgeRequest = JSON.stringify({
    imageInfo: {
      imageInsightsToken: insightsToken
    }
  });

  const options = {
    acceptLanguage: "en-US",
    knowledgeRequest: knowledgeRequest
  };

  client.images
    .visualSearch(options)
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

#### browser - Authentication, client creation and visualSearch images as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-visualsearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-visualsearch/dist/cognitiveservices-visualsearch.js"></script>
    <script type="text/javascript">
      const visualSearchKey = "<YOUR_VISUAL_SEARCH_KEY>";
      const visualSearchEndPoint = "<YOUR_VISUAL_SEARCH_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": visualSearchKey
        }
      });
      const client = new Azure.CognitiveservicesVisualsearch.VisualSearchClient(
        cognitiveServiceCredentials,
        {
          endpoint: visualSearchEndPoint
        }
      );

      const insightsToken = "<YOUR_INSIGHTS_TOKEN>";

      const knowledgeRequest = JSON.stringify({
        imageInfo: {
          imageInsightsToken: insightsToken
        }
      });

      const options = {
        acceptLanguage: "en-US",
        knowledgeRequest: knowledgeRequest
      };

      client.images
        .visualSearch(options)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-visualsearch%2FREADME.png)
