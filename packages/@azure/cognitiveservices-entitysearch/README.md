# An isomorphic javascript sdk for - EntitySearchAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-entitysearch
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-entitysearch/dist/cognitiveservices-entitysearch.js"></script>
```

## How to use

### nodejs - Authentication, client creation and search entities as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { EntitySearchAPIClient, EntitySearchAPIModels, EntitySearchAPIMappers } from "@azure/cognitiveservices-entitysearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new EntitySearchAPIClient(creds, subscriptionId);
  const query = "testquery";
  const acceptLanguage = "testacceptLanguage";
  const pragma = "testpragma";
  const userAgent = "testuserAgent";
  const clientId = "testclientId";
  const clientIp = "testclientIp";
  const location = "westus";
  const countryCode = "testcountryCode";
  const market = "testmarket";
  const responseFilter = ["Entities"];
  const responseFormat = ["Json"];
  const safeSearch = "Off";
  const setLang = "testsetLang";
  client.entities.search(query, acceptLanguage, pragma, userAgent, clientId, clientIp, location, countryCode, market, responseFilter, responseFormat, safeSearch, setLang).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and search entities as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-entitysearch sample</title>
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-entitysearch/dist/cognitiveservices-entitysearch.js"></script>
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
        const client = new Azure.CognitiveservicesEntitysearch.EntitySearchAPIClient(res.creds, subscriptionId);
        const query = "testquery";
        const acceptLanguage = "testacceptLanguage";
        const pragma = "testpragma";
        const userAgent = "testuserAgent";
        const clientId = "testclientId";
        const clientIp = "testclientIp";
        const location = "westus";
        const countryCode = "testcountryCode";
        const market = "testmarket";
        const responseFilter = ["Entities"];
        const responseFormat = ["Json"];
        const safeSearch = "Off";
        const setLang = "testsetLang";
        client.entities.search(query, acceptLanguage, pragma, userAgent, clientId, clientIp, location, countryCode, market, responseFilter, responseFormat, safeSearch, setLang).then((result) => {
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
