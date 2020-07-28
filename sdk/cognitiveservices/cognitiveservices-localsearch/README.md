## An isomorphic javascript sdk for - LocalSearchClient

This package contains an isomorphic SDK for LocalSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-localsearch
```

### How to use

#### nodejs - Authentication, client creation and search local as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs an local business search with the query 'Coffee 98052'. To know more, refer to the [Azure Documentation on Bing Local Search](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-local-business-search/)

```javascript
const { LocalSearchClient } = require("@azure/cognitiveservices-localsearch");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const localSearchKey = process.env["localSearchKey"] || "<localSearchKey>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    localSearchKey
  );
  const client = new LocalSearchClient(cognitiveServiceCredentials, {
    baseUri: "https://api.cognitive.microsoft.com/"
  });

  client.local
    .search("Coffee 98052")
    .then(result => {
      console.log("The result is: ");
      result.places.value.forEach(place => {
        console.log(place);
      });
    })
    .catch(err => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();

```

#### browser - Authentication, client creation and search local as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-localsearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-localsearch/dist/cognitiveservices-localsearch.js"></script>
    <script type="text/javascript">
      const localsearchKey = "<YOUR_LOCAL_SEARCH_KEY>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": localsearchKey
        }
      });
      const client = new Azure.CognitiveservicesLocalsearch.LocalSearchClient(
        cognitiveServiceCredentials,
        {
          baseUri: "https://api.cognitive.microsoft.com/"
        }
      );

      client.local
        .search("Coffee 98052")
        .then(result => {
          console.log("The result is: ");
          result.places.value.forEach(place => {
            console.log(place);
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-localsearch%2FREADME.png)
