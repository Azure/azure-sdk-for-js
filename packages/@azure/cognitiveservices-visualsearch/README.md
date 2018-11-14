## An isomorphic javascript sdk for - VisualSearchAPIClient

This package contains an isomorphic SDK for VisualSearchAPIClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```
npm install @azure/cognitiveservices-visualsearch
```

### How to use

#### nodejs - Authentication, client creation and visualSearch images as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```ts
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
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

#### browser - Authentication, client creation and visualSearch images as an example written in JavaScript.

##### Install @azure/ms-rest-browserauth

```
npm install @azure/ms-rest-browserauth
```

##### Sample code

See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-visualsearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
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
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
