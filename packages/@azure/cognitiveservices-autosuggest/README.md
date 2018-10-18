# An isomorphic javascript sdk for - AutoSuggestAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-autosuggest
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-autosuggest/dist/cognitiveservices-autosuggest.js"></script>
```

## How to use

### nodejs - Authentication, client creation and autoSuggest  as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { AutoSuggestAPIClient, AutoSuggestAPIModels, AutoSuggestAPIMappers } from "@azure/cognitiveservices-autosuggest";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new AutoSuggestAPIClient(creds, subscriptionId);
const query = "testquery";
const acceptLanguage = "testacceptLanguage";
const pragma = "testpragma";
const userAgent = "testuserAgent";
const clientId = "testclientId";
const clientIp = "testclientIp";
const location = "westus";
const countryCode = "testcountryCode";
const market = "testmarket";
const safeSearch = "Off";
const setLang = "testsetLang";
const responseFormat = ["Json"];
client.autoSuggest(query, acceptLanguage, pragma, userAgent, clientId, clientIp, location, countryCode, market, safeSearch, setLang, responseFormat).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and autoSuggest  as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-autosuggest sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-autosuggest.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesAutosuggest.AutoSuggestAPIClient(creds, subscriptionId);
      const query = "testquery";
      const acceptLanguage = "testacceptLanguage";
      const pragma = "testpragma";
      const userAgent = "testuserAgent";
      const clientId = "testclientId";
      const clientIp = "testclientIp";
      const location = "westus";
      const countryCode = "testcountryCode";
      const market = "testmarket";
      const safeSearch = "Off";
      const setLang = "testsetLang";
      const responseFormat = ["Json"];
      client.autoSuggest(query, acceptLanguage, pragma, userAgent, clientId, clientIp, location, countryCode, market, safeSearch, setLang, responseFormat).then((result) => {
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
