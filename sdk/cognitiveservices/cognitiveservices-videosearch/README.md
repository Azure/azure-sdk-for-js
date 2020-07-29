## An isomorphic javascript sdk for - VideoSearchClient

This package contains an isomorphic SDK for VideoSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-videosearch
```

### How to use

#### nodejs - Authentication, client creation and search videos as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs a video search on 'Microsoft Azure' with conditions such as the length must be Short, pricing must be Free, etc. To know more, refer to the [Azure Documentation on Bing Video Search](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-video-search/)

```javascript
const { VideoSearchClient } = require("@azure/cognitiveservices-videosearch");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const videoSearchKey = process.env["videoSearchKey"] || "<videoSearchKey>";
  const videoSearchEndPoint =
    process.env["videoSearchEndPoint"] || "<videoSearchEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    videoSearchKey
  );
  const client = new VideoSearchClient(cognitiveServiceCredentials, {
    endpoint: videoSearchEndPoint
  });
  const query = "Microsoft Azure";
  const options = {
    acceptLanguage: "en-US",
    location: "westus2",
    length: "Short",
    pricing: "Free",
    resolution: "HD720p"
  };
  client.videos
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

#### browser - Authentication, client creation and search videos as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-videosearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-videosearch/dist/cognitiveservices-videosearch.js"></script>
    <script type="text/javascript">
      const videoSearchKey = "<YOUR_VIDEO_SEARCH_KEY>";
      const videoSearchEndPoint = "<YOUR_VIDEO_SEARCH_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": videoSearchKey
        }
      });
      const client = new Azure.CognitiveservicesVideosearch.VideoSearchClient(
        cognitiveServiceCredentials,
        {
          endpoint: videoSearchEndPoint
        }
      );

      const query = "Microsoft Azure";
      const options = {
        acceptLanguage: "en-US",
        location: "westus2",
        length: "Short",
        pricing: "Free",
        resolution: "HD720p"
      };
      client.videos
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-videosearch%2FREADME.png)
