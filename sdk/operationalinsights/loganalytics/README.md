## An isomorphic javascript sdk for - LogAnalyticsClient

This package contains an isomorphic SDK for LogAnalyticsClient.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### How to Install

```
npm install @azure/loganalytics
```

### How to use

#### nodejs - Authentication, client creation and execute query as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```
npm install @azure/ms-rest-nodeauth
```

##### Sample code
```ts
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { LogAnalyticsClient, LogAnalyticsModels, LogAnalyticsMappers } from "@azure/loganalytics";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin({
  tokenAudience: "https://api.loganalytics.io"
}).then((creds) => {
  const client = new LogAnalyticsClient(creds, subscriptionId);
  const workspaceId = "testworkspaceId";
  const body: LogAnalyticsModels.QueryBody = {
    query: "testquery",
    timespan: "testtimespan",
    workspaces: ["testworkspaces"]
  };
  client.query.execute(workspaceId, body).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and execute query as an example written in JavaScript.

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
    <title>@azure/loganalytics sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/loganalytics/dist/loganalytics.js"></script>
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
        const client = new Azure.Loganalytics.LogAnalyticsClient(res.creds, subscriptionId);
        const workspaceId = "testworkspaceId";
        const body = {
          query: "testquery",
          timespan: "testtimespan",
          workspaces: ["testworkspaces"]
        };
        client.query.execute(workspaceId, body).then((result) => {
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


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Foperationalinsights%2Floganalytics%2FREADME.png)
