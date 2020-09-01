## An isomorphic javascript sdk for - CustomSearchClient

This package contains an isomorphic SDK for CustomSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-customsearch
```

### How to use

#### nodejs - Authentication, client creation and search customInstance as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs a search for given query on a custom configuration. The custom configuration can be setup using the Custom search portal. To know more, refer to the [Azure Documentation Bing Custom Search](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-custom-search/)

```javascript
const { CustomSearchClient } = require("@azure/cognitiveservices-customsearch");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const customSearchKey = process.env["customSearchKey"] || "<customSearchKey>";
  const customSearchEndPoint =
    process.env["customSearchEndPoint"] || "<customSearchEndPoint>";
  const customConfig = process.env["customConfig"] || "<customConfig>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    customSearchKey
  );
  const client = new CustomSearchClient(cognitiveServiceCredentials, {
    endpoint: customSearchEndPoint
  });
  const query = "World Peace";
  const options = {
    count: 10,
    safeSearch: "Moderate"
  };
  client.customInstance
    .search(customConfig, query, options)
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

#### browser - Authentication, client creation and search customInstance as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-customsearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-customsearch/dist/cognitiveservices-customsearch.js"></script>
    <script type="text/javascript">
      const customSearchKey = "<YOUR_CUSTOM_SEARCH_KEY>";
      const customSearchEndPoint = "<YOUR_CUSTOM_SEARCH_ENDPOINT>";
      const customConfig = "<YOUR_CUSTOM_CONFIG>";

      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": customSearchKey
        }
      });

      const client = new Azure.CognitiveservicesCustomsearch.CustomSearchClient(
        cognitiveServiceCredentials,
        {
          endpoint: customSearchEndPoint
        }
      );

      const query = "World Peace";
      const options = {
        count: 10,
        safeSearch: "Moderate"
      };
      client.customInstance
        .search(customConfig, query, options)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-customsearch%2FREADME.png)
