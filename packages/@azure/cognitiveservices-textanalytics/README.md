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
import { TextAnalyticsClient, TextAnalyticsModels, TextAnalyticsMappers } from "@azure/cognitiveservices-textanalytics";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new TextAnalyticsClient(creds, subscriptionId);
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
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/cognitiveservices-textanalytics.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.CognitiveservicesTextanalytics.TextAnalyticsClient(creds, subscriptionId);
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
        console.error(err);
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
