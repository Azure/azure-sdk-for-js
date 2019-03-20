## An isomorphic javascript sdk for - EntitySearchClient

This package contains an isomorphic SDK for EntitySearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-entitysearch
```

### How to use

#### nodejs - Authentication, client creation and search entities as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { EntitySearchClient, EntitySearchModels, EntitySearchMappers } from "@azure/cognitiveservices-entitysearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new EntitySearchClient(creds, subscriptionId);
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

#### browser - Authentication, client creation and search entities as an example written in JavaScript.

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
    <title>@azure/cognitiveservices-entitysearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
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
        const client = new Azure.CognitiveservicesEntitysearch.EntitySearchClient(res.creds, subscriptionId);
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
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fpackages%2F%40azure%2Fcognitiveservices-entitysearch%2FREADME.png)
