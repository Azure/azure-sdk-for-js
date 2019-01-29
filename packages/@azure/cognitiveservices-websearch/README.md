## An isomorphic javascript sdk for - WebSearchClient

This package contains an isomorphic SDK for WebSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-websearch
```

### How to use

#### nodejs - Authentication, client creation and search web as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { WebSearchClient, WebSearchModels, WebSearchMappers } from "@azure/cognitiveservices-websearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new WebSearchClient(creds, subscriptionId);
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
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and search web as an example written in JavaScript.

##### Install @azure/ms-rest-browserauth

```bash
npm install @azure/ms-rest-browserauth
```

##### Sample code

See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-websearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-websearch/dist/cognitiveservices-websearch.js"></script>
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
        const client = new Azure.CognitiveservicesWebsearch.WebSearchClient(res.creds, subscriptionId);
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
