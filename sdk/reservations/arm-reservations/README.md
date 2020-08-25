## Azure AzureReservationAPI SDK for JavaScript

This package contains an isomorphic SDK for AzureReservationAPI.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/arm-reservations
```

### How to use

#### nodejs - Authentication, client creation and get quota as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

- Please install minimum version of `"@azure/ms-rest-nodeauth": "^3.0.0"`.
```bash
npm install @azure/ms-rest-nodeauth@"^3.0.0"
```

##### Sample code

```javascript
const { AzureReservationAPI } = require("@azure/arm-reservations");
const { interactiveLogin } = require("@azure/ms-rest-nodeauth");

interactiveLogin().then((creds) => {
  const client = new AzureReservationAPI(creds);
  const subscriptionId = "testsubscriptionId";
  const providerId = "testproviderId";
  const location = "westus";
  const resourceName = "testresourceName";
  client.quota.get(subscriptionId, providerId, location, resourceName).then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

#### browser - Authentication, client creation and get quota as an example written in JavaScript.

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
    <title>@azure/arm-reservations sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-reservations/dist/arm-reservations.js"></script>
    <script type="text/javascript">
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>"
      });
      authManager.finalizeLogin().then((res) => {
        if (!res.isLoggedIn) {
          // may cause redirects
          authManager.login();
        }
        const client = new Azure.ArmReservations.AzureReservationAPI(res.creds);
        const subscriptionId = "testsubscriptionId";
        const providerId = "testproviderId";
        const location = "westus";
        const resourceName = "testresourceName";
        client.quota.get(subscriptionId, providerId, location, resourceName).then((result) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/reservations/arm-reservations/README.png)
