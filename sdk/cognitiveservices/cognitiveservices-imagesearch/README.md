## An isomorphic javascript sdk for - ImageSearchClient

This package contains an isomorphic SDK for ImageSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-imagesearch
```

### How to use

#### nodejs - Authentication, client creation and search images as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs an image search for 'Microsoft Azure' with conditions such as the color has to be 'Monochrome', etc. To know more, refer to the [Azure Documentation on Bing Image Search](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-image-search/)

```javascript
const { ImageSearchClient } = require("@azure/cognitiveservices-imagesearch");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const imageSearchKey = process.env["imageSearchKey"] || "<imageSearchKey>";
  const imageSearchEndPoint =
    process.env["imageSearchEndPoint"] || "<imageSearchEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    imageSearchKey
  );
  const client = new ImageSearchClient(cognitiveServiceCredentials, {
    endpoint: imageSearchEndPoint
  });

  const query = "Microsoft Azure";
  const options = {
    color: "Monochrome",
    count: 10,
    imageType: "Photo",
    safeSearch: "Strict"
  };
  client.images
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

#### browser - Authentication, client creation and search images as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-imagesearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-imagesearch/dist/cognitiveservices-imagesearch.js"></script>
    <script type="text/javascript">
      const imageSearchKey = "<YOUR_IMAGE_SEARCH_KEY>";
      const imageSearchEndPoint = "<YOUR_IMAGE_SEARCH_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": imageSearchKey
        }
      });
      const client = new Azure.CognitiveservicesImagesearch.ImageSearchClient(
        cognitiveServiceCredentials,
        {
          endpoint: imageSearchEndPoint
        }
      );

      const query = "Microsoft Azure";
      const options = {
        color: "Monochrome",
        count: 10,
        imageType: "Photo",
        safeSearch: "Strict"
      };
      client.images
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-imagesearch%2FREADME.png)
