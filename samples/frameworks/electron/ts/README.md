# Azure SDK samples for Electron (TypeScript)

This sample application shows how to use the TypeScript client libraries for Azure in some common scenarios.

In this sample, we build a simple [Electron][electron] application and integrating with various Azure services.

- Integration with Azure Service Bus to support a single instance publishing and receiving Service Bus messages.
- Integration with Azure Storage Blob for persisting notes.

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript].

You need [an Azure subscription][freesub] and the following resources created to run this sample:

- An Azure Service Bus namespace and queue. Please refer to the [ServiceBus documentation][servicebus] for additional information on Service Bus.
- An Azure Storage Blob container. Please refer to the [Storage Blob documentation][storageblob] for additional information on Azure Storage Blob. This file will be fetched from Azure Storage Blob and displayed on the screen.
- Finally, you'll need a way to authenticate the application with Azure. Please refer to the [@azure/identity][identity] package for information on authentication. The instructions below will walk you through the necessary steps.

To quickly create the needed resources in Azure and to receive the necessary environment variables for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsamples%2Fframeworks%2Felectron%2Farm-template.json)

The above template will create the necessary resources for you and the output tab will contain the exact environment variables that you'll need as soon as deployment succeeds. When the deployment is finished, head over to the "outputs" tab and copy the outputs to a local file - you'll need them in the next step.

### Register a new application in AAD and assign the "Azure Service Bus Data Owner" and "Azure Storage Blob Data Contributor" role to it.

Authentication will still need to be set-up manually using the following instructions:

- See https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app
  to register a new application in the Azure Active Directory.
- Note down the client id and tenant id from the above step.
  You will need to set these in the constants.ts file later.

For Electron we also need to configure platform settings correctly, and we will use `msal://` as the custom scheme. To set that up in your app registration:

1. Click on Authentication in the app registration side bar
2. Select "Add a platform"
3. Select "Mobile and Desktop Application"
4. In the "Custom redirect URIs" field please enter: msal://redirect
5. Click "Configure"

In your app registration, you will also need to add a permission for the `Microsoft.ServiceBus` and `Azure Storage` apps.
When adding permission for `Microsoft.ServiceBus` and `Azure Storage`, the type should be `delegated permissions` and the permission should be `user_impersonation`.

Finally, as mentioned in the header you'll need to make sure your application has the "Azure Service Bus Data Owner" and the "Azure Storage Blob Data Contributor" roles assigned to it. Please refer to the [Service Bus Role Assignment][servicebusaad] and [Azure Storage Role Assignment][storageaad] for up-to-date instructions on how to configure those.

## Running the sample

Once the above steps are completed you'll want to ensure Electron has the necessary constants defined. To do this, open `src/constants.ts` and provide the necessary values to configre the application. Only empty strings need to be replaced with actual values.

Install the various packages as well as the TypeScript compiler using:

```bash
npm install
```

Run the sample app:

```bash
npm start
```

A new electron window will open containing a single Log In button. Once you login you'll be able to send and receive Service Bus messages as well as fetch and display a text file from Azure Blob Storage.

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are avaiable.

[electron]: https://www.electronjs.org/
[typescript]: https://www.typescriptlang.org/docs/home.html
[freesub]: https://azure.microsoft.com/free
[servicebus]: https://docs.microsoft.com/javascript/api/@azure/service-bus
[storageblob]: https://docs.microsoft.com/javascript/api/@azure/storage-blob
[identity]: https://docs.microsoft.com/javascript/api/@azure/identity
[apiref]: https://docs.microsoft.com/javascript/api/
[servicebusaad]: https://docs.microsoft.com/en-us/azure/service-bus-messaging/authenticate-application
[storageaad]: https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-portal
