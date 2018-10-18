# An isomorphic javascript sdk for - WebSearchAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-websearch
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-websearch/dist/cognitiveservices-websearch.js"></script>
```

## How to use

### nodejs - Authentication, client creation and search web as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { WebSearchAPIClient, WebSearchAPIModels, WebSearchAPIMappers } from "@azure/cognitiveservices-websearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new WebSearchAPIClient(creds, subscriptionId);
const query = "testquery";
const acceptLanguage = "testacceptLanguage";
const pragma = "testpragma";
const userAgent = "testuserAgent";
const clientId = "testclientId";
const clientIp = "testclientIp";
const location = "westus";
const answerCount = 1;
const countryCode = "testcountryCode";
const count = 1;
const freshness = "Day";
const market = "testmarket";
const offset = 1;
const promote = ["WebPages"];
const responseFilter = ["WebPages"];
const safeSearch = "Off";
const setLang = "testsetLang";
const textDecorations = true;
const textFormat = "Raw";
client.web.search(query, acceptLanguage, pragma, userAgent, clientId, clientIp, location, answerCount, countryCode, count, freshness, market, offset, promote, responseFilter, safeSearch, setLang, textDecorations, textFormat).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and search web as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-websearch sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-websearch.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesWebsearch.WebSearchAPIClient(creds, subscriptionId);
      const query = "testquery";
      const acceptLanguage = "testacceptLanguage";
      const pragma = "testpragma";
      const userAgent = "testuserAgent";
      const clientId = "testclientId";
      const clientIp = "testclientIp";
      const location = "westus";
      const answerCount = 1;
      const countryCode = "testcountryCode";
      const count = 1;
      const freshness = "Day";
      const market = "testmarket";
      const offset = 1;
      const promote = ["WebPages"];
      const responseFilter = ["WebPages"];
      const safeSearch = "Off";
      const setLang = "testsetLang";
      const textDecorations = true;
      const textFormat = "Raw";
      client.web.search(query, acceptLanguage, pragma, userAgent, clientId, clientIp, location, answerCount, countryCode, count, freshness, market, offset, promote, responseFilter, safeSearch, setLang, textDecorations, textFormat).then((result) => {
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
