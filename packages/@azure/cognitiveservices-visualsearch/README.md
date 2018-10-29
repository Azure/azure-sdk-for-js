# An isomorphic javascript sdk for - VisualSearchAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-visualsearch
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-visualsearch/dist/cognitiveservices-visualsearch.js"></script>
```

## How to use

### nodejs - Authentication, client creation and visualSearch images as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { VisualSearchAPIClient, VisualSearchAPIModels, VisualSearchAPIMappers } from "@azure/cognitiveservices-visualsearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new VisualSearchAPIClient(creds, subscriptionId);
  const acceptLanguage = "testacceptLanguage";
  const contentType = "testcontentType";
  const userAgent = "testuserAgent";
  const clientId = "testclientId";
  const clientIp = "testclientIp";
  const location = "westus";
  const market = "testmarket";
  const safeSearch = "Off";
  const setLang = "testsetLang";
  const knowledgeRequest = "testknowledgeRequest";
  const image = new require("stream").Readable();
  client.images.visualSearch(acceptLanguage, contentType, userAgent, clientId, clientIp, location, market, safeSearch, setLang, knowledgeRequest, image).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and visualSearch images as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-visualsearch sample</title>
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-visualsearch/dist/cognitiveservices-visualsearch.js"></script>
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
        const client = new Azure.CognitiveservicesVisualsearch.VisualSearchAPIClient(res.creds, subscriptionId);
        const acceptLanguage = "testacceptLanguage";
        const contentType = "testcontentType";
        const userAgent = "testuserAgent";
        const clientId = "testclientId";
        const clientIp = "testclientIp";
        const location = "westus";
        const market = "testmarket";
        const safeSearch = "Off";
        const setLang = "testsetLang";
        const knowledgeRequest = "testknowledgeRequest";
        const image = new ReadableStream();
        client.images.visualSearch(acceptLanguage, contentType, userAgent, clientId, clientIp, location, market, safeSearch, setLang, knowledgeRequest, image).then((result) => {
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
