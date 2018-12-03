# An isomorphic javascript sdk for - ApplicationInsightsDataClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/applicationinsights-query
```
- browser
```html
<script type="text/javascript" src="@azure/applicationinsights-query/dist/applicationinsights-query.js"></script>
```

## How to use

### nodejs - Authentication, client creation and get metrics as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { ApplicationInsightsDataClient, ApplicationInsightsDataModels, ApplicationInsightsDataMappers } from "@azure/applicationinsights-query";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new ApplicationInsightsDataClient(creds, subscriptionId);
  const appId = "testappId";
  const metricId = "requests/count";
  const timespan = "testtimespan";
  const interval = "P1Y2M3DT4H5M6S";
  const aggregation = ["min"];
  const segment = ["applicationBuild"];
  const top = 1;
  const orderby = "testorderby";
  const filter = "testfilter";
  client.metrics.get(appId, metricId, timespan, interval, aggregation, segment, top, orderby, filter).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and get metrics as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/applicationinsights-query sample</title>
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/applicationinsights-query/dist/applicationinsights-query.js"></script>
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
        const client = new Azure.ApplicationinsightsQuery.ApplicationInsightsDataClient(res.creds, subscriptionId);
        const appId = "testappId";
        const metricId = "requests/count";
        const timespan = "testtimespan";
        const interval = "P1Y2M3DT4H5M6S";
        const aggregation = ["min"];
        const segment = ["applicationBuild"];
        const top = 1;
        const orderby = "testorderby";
        const filter = "testfilter";
        client.metrics.get(appId, metricId, timespan, interval, aggregation, segment, top, orderby, filter).then((result) => {
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
