# An isomorphic javascript sdk for - SpellCheckAPIClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/cognitiveservices-spellcheck
```
- browser
```html
<script type="text/javascript" src="@azure/cognitiveservices-spellcheck/dist/cognitiveservices-spellcheck.js"></script>
```

## How to use

### nodejs - Authentication, client creation and spellChecker  as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { SpellCheckAPIClient, SpellCheckAPIModels, SpellCheckAPIMappers } from "@azure/cognitiveservices-spellcheck";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new SpellCheckAPIClient(creds, subscriptionId);
  const text = "testtext";
  const acceptLanguage = "testacceptLanguage";
  const pragma = "testpragma";
  const userAgent = "testuserAgent";
  const clientId = "testclientId";
  const clientIp = "testclientIp";
  const location = "westus";
  const actionType = "Edit";
  const appName = "testappName";
  const countryCode = "testcountryCode";
  const clientMachineName = "testclientMachineName";
  const docId = "testdocId";
  const market = "testmarket";
  const sessionId = "testsessionId";
  const setLang = "testsetLang";
  const userId = "testuserId";
  const mode = "proof";
  const preContextText = "testpreContextText";
  const postContextText = "testpostContextText";
  client.spellChecker(text, acceptLanguage, pragma, userAgent, clientId, clientIp, location, actionType, appName, countryCode, clientMachineName, docId, market, sessionId, setLang, userId, mode, preContextText, postContextText).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and spellChecker  as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-spellcheck sample</title>
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-spellcheck/dist/cognitiveservices-spellcheck.js"></script>
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
        const client = new Azure.CognitiveservicesSpellcheck.SpellCheckAPIClient(res.creds, subscriptionId);
        const text = "testtext";
        const acceptLanguage = "testacceptLanguage";
        const pragma = "testpragma";
        const userAgent = "testuserAgent";
        const clientId = "testclientId";
        const clientIp = "testclientIp";
        const location = "westus";
        const actionType = "Edit";
        const appName = "testappName";
        const countryCode = "testcountryCode";
        const clientMachineName = "testclientMachineName";
        const docId = "testdocId";
        const market = "testmarket";
        const sessionId = "testsessionId";
        const setLang = "testsetLang";
        const userId = "testuserId";
        const mode = "proof";
        const preContextText = "testpreContextText";
        const postContextText = "testpostContextText";
        client.spellChecker(text, acceptLanguage, pragma, userAgent, clientId, clientIp, location, actionType, appName, countryCode, clientMachineName, docId, market, sessionId, setLang, userId, mode, preContextText, postContextText).then((result) => {
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
