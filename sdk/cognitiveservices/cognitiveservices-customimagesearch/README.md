## An isomorphic javascript sdk for - CustomImageSearchClient

This package contains an isomorphic SDK for CustomImageSearchClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-customimagesearch
```

### How to use

#### nodejs - Authentication, client creation and imageSearch customInstance as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { CustomImageSearchClient, CustomImageSearchModels, CustomImageSearchMappers } from "@azure/cognitiveservices-customimagesearch";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new CustomImageSearchClient(creds, subscriptionId);
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
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and imageSearch customInstance as an example written in JavaScript.

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
    <title>@azure/cognitiveservices-customimagesearch sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-customimagesearch/dist/cognitiveservices-customimagesearch.js"></script>
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
        const client = new Azure.CognitiveservicesCustomimagesearch.CustomImageSearchClient(res.creds, subscriptionId);
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


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/cognitiveservices/cognitiveservices-customimagesearch/README.png)
