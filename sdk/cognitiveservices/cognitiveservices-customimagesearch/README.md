## An isomorphic javascript sdk for - CustomImageSearchClient

This package contains an isomorphic SDK for CustomImageSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-customimagesearch
```

### How to use

#### nodejs - Authentication, client creation and imageSearch customInstance as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs an image search for given query on a custom configuration. The custom configuration can be setup using the Custom search portal. To know more, refer to the [Azure Documentation on Bing Custom Search](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-custom-search/)

```javascript
const { CustomImageSearchClient } = require("@azure/cognitiveservices-customimagesearch");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const customImageSearchKey =
    process.env["customImageSearchKey"] || "<customImageSearchKey>";
  const customImageSearchEndPoint =
    process.env["customImageSearchEndPoint"] || "<customImageSearchEndPoint>";
  const customImageConfig =
    process.env["customImageConfig"] || "<customImageConfig>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    customImageSearchKey
  );
  const client = new CustomImageSearchClient(cognitiveServiceCredentials, {
    endpoint: customImageSearchEndPoint
  });
  const query = "Olympics";
  const options = {
    count: 10,
    safeSearch: "Moderate"
  };
  client.customInstance
    .imageSearch(customImageConfig, query, options)
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

#### browser - Authentication, client creation and imageSearch customInstance as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-customimagesearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-customimagesearch/dist/cognitiveservices-customimagesearch.js"></script>
    <script type="text/javascript">
      const customImageSearchKey = "<YOUR_CUSTOM_IMAGE_SEARCH_KEY>";
      const customImageSearchEndPoint = "<YOUR_CUSTOM_IMAGE_SEARCH_ENDPOINT>";
      const customImageConfig = "<YOUR_CUSTOM_IMAGE_CONFIG>";

      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": customImageSearchKey
        }
      });

      const client = new Azure.CognitiveservicesCustomimagesearch.CustomImageSearchClient(
        cognitiveServiceCredentials,
        {
          endpoint: customImageSearchEndPoint
        }
      );

      const query = "Olympics";
      const options = {
        count: 10,
        safeSearch: "Moderate"
      };
      client.customInstance
        .imageSearch(customImageConfig, query, options)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-customimagesearch%2FREADME.png)
