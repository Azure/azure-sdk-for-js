## An isomorphic javascript sdk for - CustomSearchClient

This package contains an isomorphic SDK for CustomSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-customsearch
```

### How to use

#### nodejs - Authentication, client creation and search customInstance as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { CustomSearchClient, CustomSearchModels, CustomSearchMappers } from "@azure/cognitiveservices-customsearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new CustomSearchClient(creds, subscriptionId);
  const customConfig = "testcustomConfig";
  const query = "testquery";
  const acceptLanguage = "testacceptLanguage";
  const userAgent = "testuserAgent";
  const clientId = "testclientId";
  const clientIp = "testclientIp";
  const location = "westus";
  const countryCode = "testcountryCode";
  const count = 1;
  const market = "testmarket";
  const offset = 1;
  const safeSearch = "Off";
  const setLang = "testsetLang";
  const textDecorations = true;
  const textFormat = "Raw";
  client.customInstance.search(customConfig, query, acceptLanguage, userAgent, clientId, clientIp, location, countryCode, count, market, offset, safeSearch, setLang, textDecorations, textFormat).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and search customInstance as an example written in JavaScript.

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
    <title>@azure/cognitiveservices-customsearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-customsearch/dist/cognitiveservices-customsearch.js"></script>
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
        const client = new Azure.CognitiveservicesCustomsearch.CustomSearchClient(res.creds, subscriptionId);
        const customConfig = "testcustomConfig";
        const query = "testquery";
        const acceptLanguage = "testacceptLanguage";
        const userAgent = "testuserAgent";
        const clientId = "testclientId";
        const clientIp = "testclientIp";
        const location = "westus";
        const countryCode = "testcountryCode";
        const count = 1;
        const market = "testmarket";
        const offset = 1;
        const safeSearch = "Off";
        const setLang = "testsetLang";
        const textDecorations = true;
        const textFormat = "Raw";
        client.customInstance.search(customConfig, query, acceptLanguage, userAgent, clientId, clientIp, location, countryCode, count, market, offset, safeSearch, setLang, textDecorations, textFormat).then((result) => {
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
