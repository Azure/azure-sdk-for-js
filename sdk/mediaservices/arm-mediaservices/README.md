## Azure AzureMediaServices SDK for JavaScript

This package contains an isomorphic SDK for AzureMediaServices.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/arm-mediaservices
```

### How to use

#### nodejs - Authentication, client creation and list accountFilters as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

- Please install minimum version of `"@azure/ms-rest-nodeauth": "^3.0.0"`.
```bash
npm install @azure/ms-rest-nodeauth@"^3.0.0"
```

##### Create a .env file to use with the sample code

- Create a .env file in your project root to use with the "dotenv" module in the sample code block. 
- Values for this file can be obtained in the Azure Media Services API Access page in the portal. 

```
# copy the content of this file to a file named ".env". It should be stored at the root of the repo.
# The values can be obtained from the API Access page for your Media Services account in the portal.
AZURE_CLIENT_ID=""
AZURE_CLIENT_SECRET= ""
AZURE_TENANT_ID= ""

# Change this to match your AAD Tenant domain name. 
AAD_TENANT_DOMAIN = "microsoft.onmicrosoft.com"

# Set this to your Media Services Account name, resource group it is contained in, and location
AZURE_MEDIA_ACCOUNT_NAME = ""
AZURE_LOCATION= ""
AZURE_RESOURCE_GROUP= ""

# Set this to your Azure Subscription ID
AZURE_SUBSCRIPTION_ID= ""

# You must change these if you are using Gov Cloud, China, or other non standard cloud regions
AZURE_ARM_AUDIENCE= "https://management.core.windows.net"
AZURE_ARM_ENDPOINT="https://management.azure.com"
```

##### Sample code

```typescript
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers } from "@azure/arm-mediaservices";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Copy the samples.env file and rename it to .env first, then populate it's values with the values obtained 
  // from your Media Services account's API Access page in the Azure portal.
  const clientId = process.env.AZURE_CLIENT_ID as string;
  const secret  = process.env.AZURE_CLIENT_SECRET as string;
  const tenantId = process.env.AZURE_TENANT_ID as string;
  const tenantDomain = process.env.AAD_TENANT_DOMAIN as string;
  const subscriptionId= process.env.AZURE_SUBSCRIPTION_ID as string;
  const resourceGroup = process.env.AZURE_RESOURCE_GROUP as string;
  const accountName = process.env.AZURE_MEDIA_ACCOUNT_NAME as string;


  msRestNodeAuth.loginWithServicePrincipalSecret(clientId,secret,tenantDomain).then((creds) =>
  {
    const mediaClient = new AzureMediaServices(creds, subscriptionId);

    // List Assets in Account
    console.log("Listing Assets Names in account:")
    mediaClient.assets.list(resourceGroup,accountName).then((assets) => {
      assets.forEach(asset => {
        console.log(asset.name);
      });
    });

  }).catch((err) => {
    console.error("Error logging in with Service Principal:", err.message);
  });;

}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
```

#### browser - Authentication, client creation and list accountFilters as an example written in JavaScript.

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
    <title>@azure/arm-mediaservices sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-mediaservices/dist/arm-mediaservices.js"></script>
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
        const client = new Azure.ArmMediaservices.AzureMediaServices(res.creds, subscriptionId);
        const resourceGroupName = "testresourceGroupName";
        const accountName = "testaccountName";
        client.accountFilters.list(resourceGroupName, accountName).then((result) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/mediaservices/arm-mediaservices/README.png)
