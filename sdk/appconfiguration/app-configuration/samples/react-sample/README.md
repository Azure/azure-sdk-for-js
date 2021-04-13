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

## Running the sample

1. Have `REACT_APP_APPCONFIG_CONNECTION_STRING` populated in the .env file.
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
   // Feature flag 2 // Make sure to update the Start and End times as you wish .
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

## Next Steps

Take a look at our [Samples][samples] for more information about the APIs that are available.

[react]: https://create-react-app.dev/
[typescript]: https://www.typescriptlang.org/docs/home.html
[freesub]: https://azure.microsoft.com/free
[samples]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/app-configuration/samples/v1/typescript
