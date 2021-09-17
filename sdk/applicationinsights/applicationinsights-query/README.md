## An isomorphic javascript sdk for - ApplicationInsightsDataClient

This package contains an isomorphic SDK for ApplicationInsightsDataClient.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### How to Install

```
npm install @azure/applicationinsights-query
```

### How to use

#### nodejs - Authentication, client creation and get metrics as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```ts
import * as msRest from "@azure/ms-rest-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
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

#### browser - Authentication, client creation and get metrics as an example written in JavaScript.

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
    <title>@azure/applicationinsights-query sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
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
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fapplicationinsights%2Fapplicationinsights-query%2FREADME.png)
