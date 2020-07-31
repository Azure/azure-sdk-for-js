## An isomorphic javascript sdk for - WebSearchClient

This package contains an isomorphic SDK for WebSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-websearch
```

### How to use

#### nodejs - Authentication, client creation and search web as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs a web search on the text 'Microsoft Azure'. To know more, refer to the [Azure Documentation on Bing Web Search](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-web-search/)

```javascript
const { WebSearchClient } = require("@azure/cognitiveservices-websearch");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const webSearchKey = process.env["webSearchKey"] || "<webSearchKey>";
  const webSearchEndPoint =
    process.env["webSearchEndPoint"] || "<webSearchEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    webSearchKey
  );
  const client = new WebSearchClient(cognitiveServiceCredentials, {
    endpoint: webSearchEndPoint
  });
  const query = "Microsoft Azure";
  const options = {
    acceptLanguage: "en-US",
    pragma: "no-cache",
    location: "westus2"
  };
  client.web
    .search(query, options)
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

#### browser - Authentication, client creation and search web as an example written in JavaScript.

##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-websearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-websearch/dist/cognitiveservices-websearch.js"></script>
    <script type="text/javascript">
      const webSearchKey = "<YOUR_WEB_SEARCH_KEY>";
      const webSearchEndPoint = "<YOUR_WEB_SEARCH_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": webSearchKey
        }
      });
      const client = new Azure.CognitiveservicesWebsearch.WebSearchClient(
        cognitiveServiceCredentials,
        {
          endpoint: webSearchEndPoint
        }
      );

      const query = "Microsoft Azure";
      const options = {
        acceptLanguage: "en-US",
        pragma: "no-cache",
        location: "westus2"
      };
      client.web
        .search(query, options)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-websearch%2FREADME.png)
