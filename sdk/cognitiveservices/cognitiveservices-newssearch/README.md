## An isomorphic javascript sdk for - NewsSearchClient

This package contains an isomorphic SDK for NewsSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-newssearch
```

### How to use

#### nodejs - Authentication, client creation and search news as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs a news search on 'Microsoft Azure' with conditions such as the freshness must be within a Month, etc. To know more, refer to the [Azure Documentation on Bing News Search](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-news-search/)

```javascript
const { NewsSearchClient } = require("@azure/cognitiveservices-newssearch");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const newsSearchKey = process.env["newsSearchKey"] || "<newsSearchKey>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    newsSearchKey
  );
  const client = new NewsSearchClient(cognitiveServiceCredentials);
  const query = "Microsoft Azure";
  const options = {
    count: 10,
    freshness: "Month",
    safeSearch: "Strict"
  };
  client.news
    .search(query, options)
    .then(result => {
      console.log("The result is:");
      console.log(result);
    })
    .catch(err => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();
```

#### browser - Authentication, client creation and search news as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-newssearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-newssearch/dist/cognitiveservices-newssearch.js"></script>
    <script type="text/javascript">
      const newsSearchKey = "<YOUR_NEWS_SEARCH_KEY>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": newsSearchKey
        }
      });
      const client = new Azure.CognitiveservicesNewssearch.NewsSearchClient(
        cognitiveServiceCredentials
      );

      const query = "Microsoft Azure";
      const options = {
        count: 10,
        freshness: "Month",
        safeSearch: "Strict"
      };
      client.news
        .search(query, options)
        .then(result => {
          console.log("The result is:");
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-newssearch%2FREADME.png)
