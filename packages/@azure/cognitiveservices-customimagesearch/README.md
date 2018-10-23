# An isomorphic javascript sdk for - CustomImageSearchAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-customimagesearch
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-customimagesearch/dist/cognitiveservices-customimagesearch.js"></script>
```

## How to use

### nodejs - Authentication, client creation and imageSearch customInstance as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { CustomImageSearchAPIClient, CustomImageSearchAPIModels, CustomImageSearchAPIMappers } from "@azure/cognitiveservices-customimagesearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new CustomImageSearchAPIClient(creds, subscriptionId);
const customConfig = "testcustomConfig";
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
client.customInstance.imageSearch(customConfig, query, acceptLanguage, userAgent, clientId, clientIp, location, aspect, color, countryCode, count, freshness, height, id, imageContent, imageType, license, market, maxFileSize, maxHeight, maxWidth, minFileSize, minHeight, minWidth, offset, safeSearch, size, setLang, width).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and imageSearch customInstance as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-customimagesearch sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-customimagesearch.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesCustomimagesearch.CustomImageSearchAPIClient(creds, subscriptionId);
      const customConfig = "testcustomConfig";
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
      client.customInstance.imageSearch(customConfig, query, acceptLanguage, userAgent, clientId, clientIp, location, aspect, color, countryCode, count, freshness, height, id, imageContent, imageType, license, market, maxFileSize, maxHeight, maxWidth, minFileSize, minHeight, minWidth, offset, safeSearch, size, setLang, width).then((result) => {
        console.log("The result is:");
        console.log(result);
      }).catch((err) => {
        console.error(err);
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
