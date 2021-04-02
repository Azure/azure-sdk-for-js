## Azure UsageManagementClient SDK for JavaScript

This package contains an isomorphic SDK for UsageManagementClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/arm-commerce-profile-2020-09-01-hybrid
```

### How to use

#### nodejs - Authentication, client creation and list usageAggregates as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

- Please install minimum version of `"@azure/ms-rest-nodeauth": "^3.0.0"`.
```bash
npm install @azure/ms-rest-nodeauth@"^3.0.0"
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { UsageManagementClient, UsageManagementModels, UsageManagementMappers } from "@azure/arm-commerce-profile-2020-09-01-hybrid";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new UsageManagementClient(creds, subscriptionId);
  const reportedStartTime = new Date().toISOString();
  const reportedEndTime = new Date().toISOString();
  const showDetails = true;
  const aggregationGranularity = "Daily";
  const continuationToken = "testcontinuationToken";
  client.usageAggregates.list(reportedStartTime, reportedEndTime, showDetails, aggregationGranularity, continuationToken).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and list usageAggregates as an example written in JavaScript.

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
    <title>@azure/arm-commerce-profile-2020-09-01-hybrid sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-commerce-profile-2020-09-01-hybrid/dist/arm-commerce-profile-2020-09-01-hybrid.js"></script>
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
        const client = new Azure.ArmCommerceProfile20200901Hybrid.UsageManagementClient(res.creds, subscriptionId);
        const reportedStartTime = new Date().toISOString();
        const reportedEndTime = new Date().toISOString();
        const showDetails = true;
        const aggregationGranularity = "Daily";
        const continuationToken = "testcontinuationToken";
        client.usageAggregates.list(reportedStartTime, reportedEndTime, showDetails, aggregationGranularity, continuationToken).then((result) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/commerce/arm-commerce-profile-2020-09-01-hybrid/README.png)
