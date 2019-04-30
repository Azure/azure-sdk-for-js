## An isomorphic javascript sdk for - InkRecognizerClient

This package contains an isomorphic SDK for InkRecognizerClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-inkrecognizer
```

### How to use

#### nodejs - Authentication, client creation and recognize inkRecognizer as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { InkRecognizerClient, InkRecognizerModels, InkRecognizerMappers } from "@azure/cognitiveservices-inkrecognizer";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new InkRecognizerClient(creds, subscriptionId);
  const body: InkRecognizerModels.AnalysisRequest = {
    applicationType: "drawing",
    unit: "mm",
    unitMultiple: 1.01,
    language: "testlanguage",
    strokes: [{
      id: 1,
      language: "testlanguage",
      points: "testpoints",
      drawingAttributes: {
        width: 1.01,
        color: {
          r: 1.01,
          g: 1.01,
          b: 1.01,
          a: 1.01
        },
        height: 1.01,
        fitToCurve: true,
        rasterOp: "noOperation",
        ignorePressure: true,
        tip: "ellipse"
      },
      kind: "inkDrawing"
    }]
  };
  const xMsClientRequestId = "testxMsClientRequestId";
  client.inkRecognizer.recognize(body, xMsClientRequestId).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and recognize inkRecognizer as an example written in JavaScript.

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
    <title>@azure/cognitiveservices-inkrecognizer sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/cognitiveservices-inkrecognizer/dist/cognitiveservices-inkrecognizer.js"></script>
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
        const client = new Azure.CognitiveservicesInkrecognizer.InkRecognizerClient(res.creds, subscriptionId);
        const body = {
          applicationType: "drawing",
          unit: "mm",
          unitMultiple: 1.01,
          language: "testlanguage",
          strokes: [{
            id: 1,
            language: "testlanguage",
            points: "testpoints",
            drawingAttributes: {
              width: 1.01,
              color: {
                r: 1.01,
                g: 1.01,
                b: 1.01,
                a: 1.01
              },
              height: 1.01,
              fitToCurve: true,
              rasterOp: "noOperation",
              ignorePressure: true,
              tip: "ellipse"
            },
            kind: "inkDrawing"
          }]
        };
        const xMsClientRequestId = "testxMsClientRequestId";
        client.inkRecognizer.recognize(body, xMsClientRequestId).then((result) => {
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
