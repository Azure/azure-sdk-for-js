## Azure AuthorizationManagementClient SDK for JavaScript

This package contains an isomorphic SDK for AuthorizationManagementClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/arm-authorization
```

### How to use

#### nodejs - Authentication, client creation and list classicAdministrators as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```javascript
const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { interactiveLogin } = require("@azure/ms-rest-nodeauth");

const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

interactiveLogin()
  .then((creds) => {
    const client = new AuthorizationManagementClient(creds, subscriptionId);
    client.classicAdministrators.list().then((result) => {
      console.log("The result is:");
      console.log(result);
    });
  })
  .catch((err) => {
    console.error(err);
  });
```

#### browser - Authentication, client creation and list classicAdministrators as an example written in JavaScript.

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
    <title>@azure/arm-authorization sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-authorization/dist/arm-authorization.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>",
      });
      authManager.finalizeLogin().then((res) => {
        if (!res.isLoggedIn) {
          // may cause redirects
          authManager.login();
        }
        const client = new Azure.ArmAuthorization.AuthorizationManagementClient(
          res.creds,
          subscriptionId
        );
        client.classicAdministrators
          .list()
          .then((result) => {
            console.log("The result is:");
            console.log(result);
          })
          .catch((err) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fauthorization%2Farm-authorization%2FREADME.png)
