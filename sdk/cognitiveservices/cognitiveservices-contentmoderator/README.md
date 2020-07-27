## An isomorphic javascript sdk for - ContentModeratorClient

This package contains an isomorphic SDK for ContentModeratorClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-contentmoderator
```

### How to use

#### nodejs - Authentication, client creation and getDetails listManagementImageLists as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample detects the langauge of text provided using text moderator APIs. To know more, refer to the [Azure Documentation on Content Moderator](https://docs.microsoft.com/en-us/azure/cognitive-services/content-moderator/overview)

```javascript
const { ContentModeratorClient } = require("@azure/cognitiveservices-contentmoderator");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const contentModeratorKey = process.env["contentModeratorKey"] || "<contentModeratorKey>";
  const contentModeratorEndPoint =
    process.env["contentModeratorEndPoint"] || "<contentModeratorEndPoint>";

  const cognitiveServiceCredentials = new CognitiveServicesCredentials(contentModeratorKey);
  const client = new ContentModeratorClient(cognitiveServiceCredentials, contentModeratorEndPoint);

  client.textModeration
    .detectLanguage("text/plain", "A Random Text")
    .then((result) => {
      console.log("The result is: ");
      console.log(result);
    })
    .catch((err) => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();
```

#### browser - Authentication, client creation and getDetails listManagementImageLists as an example written in JavaScript.

##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-contentmoderator sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-contentmoderator/dist/cognitiveservices-contentmoderator.js"></script>
    <script type="text/javascript">
      const contentModeratorKey = "<YOUR_CONTENT_MODERATOR_KEY>";
      const contentModeratorEndPoint = "<YOUR_CONTENT_MODERATOR_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": contentModeratorKey
        }
      });
      const client = new Azure.CognitiveservicesContentmoderator.ContentModeratorClient(
        cognitiveServiceCredentials,
        contentModeratorEndPoint
      );

      client.textModeration
        .detectLanguage("text/plain", "A Random Text")
        .then((result) => {
          console.log("The result is: ");
          console.log(result);
        })
        .catch((err) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-contentmoderator%2FREADME.png)
