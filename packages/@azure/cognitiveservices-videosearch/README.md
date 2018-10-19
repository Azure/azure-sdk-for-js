# An isomorphic javascript sdk for - VideoSearchAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-videosearch
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-videosearch/dist/cognitiveservices-videosearch.js"></script>
```

## How to use

### nodejs - Authentication, client creation and search videos as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { VideoSearchAPIClient, VideoSearchAPIModels, VideoSearchAPIMappers } from "@azure/cognitiveservices-videosearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new VideoSearchAPIClient(creds, subscriptionId);
const query = "testquery";
const acceptLanguage = "testacceptLanguage";
const userAgent = "testuserAgent";
const clientId = "testclientId";
const clientIp = "testclientIp";
const location = "westus";
const countryCode = "testcountryCode";
const count = 1;
const freshness = "Day";
const id = "testid";
const length = "All";
const market = "testmarket";
const offset = 1;
const pricing = "All";
const resolution = "All";
const safeSearch = "Off";
const setLang = "testsetLang";
const textDecorations = true;
const textFormat = "Raw";
client.videos.search(query, acceptLanguage, userAgent, clientId, clientIp, location, countryCode, count, freshness, id, length, market, offset, pricing, resolution, safeSearch, setLang, textDecorations, textFormat).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and search videos as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-videosearch sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-videosearch.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesVideosearch.VideoSearchAPIClient(creds, subscriptionId);
      const query = "testquery";
      const acceptLanguage = "testacceptLanguage";
      const userAgent = "testuserAgent";
      const clientId = "testclientId";
      const clientIp = "testclientIp";
      const location = "westus";
      const countryCode = "testcountryCode";
      const count = 1;
      const freshness = "Day";
      const id = "testid";
      const length = "All";
      const market = "testmarket";
      const offset = 1;
      const pricing = "All";
      const resolution = "All";
      const safeSearch = "Off";
      const setLang = "testsetLang";
      const textDecorations = true;
      const textFormat = "Raw";
      client.videos.search(query, acceptLanguage, userAgent, clientId, clientIp, location, countryCode, count, freshness, id, length, market, offset, pricing, resolution, safeSearch, setLang, textDecorations, textFormat).then((result) => {
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
