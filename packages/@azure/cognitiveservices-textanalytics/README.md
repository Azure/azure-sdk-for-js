# An isomorphic javascript sdk for - TextAnalyticsClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-textanalytics
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-textanalytics/dist/cognitiveservices-textanalytics.js"></script>
```

## How to use

### nodejs - Authentication, client creation and keyPhrases  as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
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

### browser - Authentication, client creation and keyPhrases  as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-textanalytics sample</title>
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
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
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
