# Feature Flag Sample (TypeScript)

This sample application shows how to use the Feature Flags.

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and the following resources created to run this sample:

### Create an App Configuration resource

You can use the [Azure Portal](https://portal.azure.com) or the [Azure CLI](https://docs.microsoft.com/cli/azure) to create an Azure App Configuration resource.

Example (Azure CLI):

```
az appconfig create --name <app-configuration-resource-name> --resource-group <resource-group-name> --location eastus
```

### Create an AAD application

We recommend the [@azure/identity][identity] package which provides a set of credential implementations for both NodeJS and the browser. This sample imports `InteractiveBrowserCredential` from identity.

- Register a new AAD application and give permissions to access Azure App Configuration on behalf of the signed-in user

  - Register a new application in the Azure Active Directory(in the azure-portal) - https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app
  - In the `API permissions` section, select `Add a permission` and choose `APIs my organization uses`.
  - Pick `Azure App Configuration` and select the checkboxes and then click `Add permissions`. This would allow the application to access Azure App Configuration on behalf of the signed-in user.

- Grant access to Azure App Configuration data with RBAC in the Azure Portal

  - RBAC roles for azure-app-configuration - https://docs.microsoft.com/azure/azure-app-configuration/concept-enable-rbac#azure-built-in-roles-for-azure-app-configuration.
  - In the azure portal, go to your app-config account and assign **App Configuration Data Owner** role to the registered AAD application from `Access control (IAM)` tab (in the left-side-navbar of your app config account in the azure-portal).

## Running the sample

1. Have the environment variables in sample.env populated in the .env file.

2. Create the following feature flags using the portal.

   ```json
   // Feature flag 1
   {
      "id": "react-app-feature-1",
      "description": "",
      "enabled": false,
      "conditions": {
        "client_filters": []
      }
   }
   // Feature flag 2 // Make sure to update the Start and End times as you wish.
   {
      "id": "react-app-feature-2",
      "description": "",
      "enabled": true,
      "conditions": {
        "client_filters": [
          {
            "name": "Microsoft.TimeWindow",
            "parameters": {
              "Start": "Mon, 12 Apr 2021 07:00:00 GMT",
              "End": "Wed, 14 Apr 2021 07:00:00 GMT"
            }
          }
        ]
      }
   }
   ```

3. Install the various packages as well as the TypeScript compiler using:

   ```bash
   npm install
   ```

4. Run the sample app:

   ```bash
   npm start
   ```

## Caution

> > This sample retrieves feature flags from a client-side application, however scalability can become a problem.
>
> > Azure App Configuration has a request quota detailed [here](https://azure.microsoft.com/pricing/details/app-configuration/). Once the quota is exhausted, HTTP status code 429 will be returned for all requests until the end of the hour.
>
> > For production environments and for users with heavy loads(keeping Azure costs in mind), the recommendation is to use App Configuration on the server-side and let the server cache and pass feature-flags to the clients.

## Next Steps

Take a look at our [Samples][samples] for more information about the APIs that are available.

[react]: https://create-react-app.dev/
[typescript]: https://www.typescriptlang.org/docs/home.html
[freesub]: https://azure.microsoft.com/free
[samples]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/app-configuration/samples/v1/typescript
[identity]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md
