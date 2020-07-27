## An isomorphic javascript sdk for - EntitySearchClient

This package contains an isomorphic SDK for EntitySearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-entitysearch
```

### How to use

#### nodejs - Authentication, client creation and search entities as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs a Bing entity search on the query 'Microsoft Azure'. To know more, refer to the [Azure Documentation on Bing Entities Search](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-entities-search/).

```javascript
const { EntitySearchClient } = require("@azure/cognitiveservices-entitysearch");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const entitySearchKey = process.env["entitySearchKey"] || "<entitySearchKey>";
  const entitySearchEndPoint =
    process.env["entitySearchEndPoint"] || "<entitySearchEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    entitySearchKey
  );
  const client = new EntitySearchClient(cognitiveServiceCredentials, {
    endpoint: entitySearchEndPoint
  });
  const query = "Microsoft Azure";
  client.entities
    .search(query)
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

#### browser - Authentication, client creation and search entities as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-entitysearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-entitysearch/dist/cognitiveservices-entitysearch.js"></script>
    <script type="text/javascript">
      const entitySearchKey = "<YOUR_ENTITY_SEARCH_KEY>";
      const entitySearchEndPoint = "<YOUR_ENTITY_SEARCH_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": entitySearchKey
        }
      });
      const client = new Azure.CognitiveservicesEntitysearch.EntitySearchClient(
        cognitiveServiceCredentials,
        {
          endpoint: entitySearchEndPoint
        }
      );

      const query = "Microsoft Azure";
      client.entities
        .search(query)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-entitysearch%2FREADME.png)
