<<<<<<< HEAD
## Azure AuthorizationManagementClient SDK for JavaScript

This package contains an isomorphic SDK for AuthorizationManagementClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

=======
# Azure AuthorizationManagementClient SDK for JavaScript
This package contains an isomorphic SDK for AuthorizationManagementClient.

## Currently supported environments
- Node.js version 6.x.x or higher
- Browser JavaScript

## How to Install
>>>>>>> 55b3d24971fa003132a460694968d0c527f8d850
```
npm install @azure/arm-authorization
```

<<<<<<< HEAD
### How to use

#### nodejs - Authentication, client creation and list classicAdministrators as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```ts
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
=======

## How to use

### nodejs - Authentication, client creation and list classicAdministrators as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
>>>>>>> 55b3d24971fa003132a460694968d0c527f8d850
import { AuthorizationManagementClient, AuthorizationManagementModels, AuthorizationManagementMappers } from "@azure/arm-authorization";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new AuthorizationManagementClient(creds, subscriptionId);
  client.classicAdministrators.list().then((result) => {
    console.log("The result is:");
    console.log(result);
  });
}).catch((err) => {
  console.error(err);
});
```

<<<<<<< HEAD
#### browser - Authentication, client creation and list classicAdministrators as an example written in JavaScript.

##### Install @azure/ms-rest-browserauth

```
npm install @azure/ms-rest-browserauth
```

##### Sample code

=======
### browser - Authentication, client creation and list classicAdministrators as an example written in JavaScript.
>>>>>>> 55b3d24971fa003132a460694968d0c527f8d850
See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-authorization sample</title>
<<<<<<< HEAD
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-authorization/dist/arm-authorization.js"></script>
    <script type="text/javascript">
=======
    <script src="node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-authorization/dist/arm-authorization.js"></script>
    <script>
>>>>>>> 55b3d24971fa003132a460694968d0c527f8d850
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
        const client = new Azure.ArmAuthorization.AuthorizationManagementClient(res.creds, subscriptionId);
        client.classicAdministrators.list().then((result) => {
          console.log("The result is:");
          console.log(result);
        }).catch((err) => {
          console.log("An error occurred:");
          console.error(err);
        });
      });
    </script>
  </head>
<<<<<<< HEAD
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
=======
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
>>>>>>> 55b3d24971fa003132a460694968d0c527f8d850
