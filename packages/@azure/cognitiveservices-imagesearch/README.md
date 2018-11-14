# An isomorphic javascript sdk for - ImageSearchAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-imagesearch
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-imagesearch/dist/cognitiveservices-imagesearch.js"></script>
```

## How to use

### nodejs - Authentication, client creation and search images as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { ImageSearchAPIClient, ImageSearchAPIModels, ImageSearchAPIMappers } from "@azure/cognitiveservices-imagesearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new ImageSearchAPIClient(creds, subscriptionId);
  const query = "testquery";
  const acceptLanguage = "testacceptLanguage";
  const userAgent = "testuserAgent";
  const clientId = "testclientId";
  const clientIp = "testclientIp";
  const location = "westus";
  const aspect = "All";
  const color = "ColorOnly";
  const countryCode = "testcountryCode";
  const count = 1;
  const freshness = "Day";
  const height = 1;
  const id = "testid";
  const imageContent = "Face";
  const imageType = "AnimatedGif";
  const license = "All";
  const market = "testmarket";
  const maxFileSize = 1;
  const maxHeight = 1;
  const maxWidth = 1;
  const minFileSize = 1;
  const minHeight = 1;
  const minWidth = 1;
  const offset = 1;
  const safeSearch = "Off";
  const size = "All";
  const setLang = "testsetLang";
  const width = 1;
  client.images.search(query, acceptLanguage, userAgent, clientId, clientIp, location, aspect, color, countryCode, count, freshness, height, id, imageContent, imageType, license, market, maxFileSize, maxHeight, maxWidth, minFileSize, minHeight, minWidth, offset, safeSearch, size, setLang, width).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and search images as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-imagesearch sample</title>
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-imagesearch/dist/cognitiveservices-imagesearch.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>"
      });
      authManager.finalizeLogin().then((res) => {
        if (!res.isLoggedIn) {
          // may cause redirects
          authManager.login();
        }
        const client = new Azure.CognitiveservicesImagesearch.ImageSearchAPIClient(res.creds, subscriptionId);
        const query = "testquery";
        const acceptLanguage = "testacceptLanguage";
        const userAgent = "testuserAgent";
        const clientId = "testclientId";
        const clientIp = "testclientIp";
        const location = "westus";
        const aspect = "All";
        const color = "ColorOnly";
        const countryCode = "testcountryCode";
        const count = 1;
        const freshness = "Day";
        const height = 1;
        const id = "testid";
        const imageContent = "Face";
        const imageType = "AnimatedGif";
        const license = "All";
        const market = "testmarket";
        const maxFileSize = 1;
        const maxHeight = 1;
        const maxWidth = 1;
        const minFileSize = 1;
        const minHeight = 1;
        const minWidth = 1;
        const offset = 1;
        const safeSearch = "Off";
        const size = "All";
        const setLang = "testsetLang";
        const width = 1;
        client.images.search(query, acceptLanguage, userAgent, clientId, clientIp, location, aspect, color, countryCode, count, freshness, height, id, imageContent, imageType, license, market, maxFileSize, maxHeight, maxWidth, minFileSize, minHeight, minWidth, offset, safeSearch, size, setLang, width).then((result) => {
          console.log("The result is:");
          console.log(result);
        }).catch((err) => {
          console.log("An error occurred:");
          console.error(err);
        });
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
