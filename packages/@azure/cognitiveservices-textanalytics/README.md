## An isomorphic javascript sdk for - TextAnalyticsClient

This package contains an isomorphic SDK for TextAnalyticsClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```
npm install @azure/cognitiveservices-textanalytics
```

### How to use

#### nodejs - Authentication, client creation and keyPhrases  as an example written in TypeScript.

##### Install ms-rest-nodeauth

```
npm install ms-rest-nodeauth
```

##### Sample code

```ts
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { TextAnalyticsClient, TextAnalyticsModels, TextAnalyticsMappers } from "@azure/cognitiveservices-textanalytics";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new TextAnalyticsClient(creds, subscriptionId);
  const input: TextAnalyticsModels.MultiLanguageBatchInput = {
    documents: [{
      language: "testlanguage",
      id: "testid",
      text: "testtext"
    }]
  };
  client.keyPhrases(input).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and keyPhrases  as an example written in JavaScript.

##### Install ms-rest-browserauth

```
npm install ms-rest-browserauth
```

##### Sample code

See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-textanalytics sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-textanalytics/dist/cognitiveservices-textanalytics.js"></script>
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
        const client = new Azure.CognitiveservicesTextanalytics.TextAnalyticsClient(res.creds, subscriptionId);
        const input = {
          documents: [{
            language: "testlanguage",
            id: "testid",
            text: "testtext"
          }]
        };
        client.keyPhrases(input).then((result) => {
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
