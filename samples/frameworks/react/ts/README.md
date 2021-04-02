# Azure SDK samples for React (TypeScript)

This sample application shows how to use the TypeScript client libraries for Azure in some common scenarios.

In this sample, we build a simple Todo application in React using [create-react-app][react] and integrating with various Azure services.

- Integration with Azure Event Hubs to support real-time updates across multiple instances of the application.
- Integration with Azure Storage Blob for persisting ToDo attachments.

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript].

You need [an Azure subscription][freesub] and the following resources created to run this sample:

- An Azure Event Hubs namespace. Please refer to the [Event Hubs documentation][eventhubs] for additional information on Event Hubs.
- An Azure Storage Blob container. Please refer to the [Storage Blob documentation][storageblob] for additional information on Azure Storage Blob. This file will be fetched from Azure Storage Blob and displayed on the screen.
- Finally, you'll need a way to authenticate the application with Azure. Please refer to the [@azure/identity][identity] package for information on authentication. The instructions below will walk you through the necessary steps.

To quickly create the needed resources in Azure and to receive the necessary environment variables for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsamples%2Fframeworks%2Freact%2Farm-template.json)

The above template will create the necessary resources for you and the output tab will contain the exact environment variables that you'll need as soon as deployment succeeds. When the deployment is finished, head over to the "outputs" tab and copy the outputs to a local file - you'll need them in the next step.

### Register a new application in AAD and assign the "Azure Event Hubs Data Owner" and "Azure Storage Blob Data Contributor" role to it.

Authentication will still need to be set-up manually using the following instructions:

- See https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app
  to register a new application in the Azure Active Directory.
- Note down the client id and tenant id from the above step.
  You will need to set these in the .env file below.

By default we'll be using http://localhost:3000 to serve the app and handle redirects, so please go ahead and add that configuration with the following steps:

1. Click on Authentication in the app registration side bar
2. Select "Add a platform"
3. Select "Single-page application"
4. In the "Redirect URIs" field please enter: http://localhost:3000
5. Click "Configure"

Ensure your app registration has been configured properly to allow the [implicit grant flow][implicitgrantflow]
and allow both `Access tokens` and `ID tokens` to be issued by the authorization endpoint.
In your app registration, you will also need to add a permission for the `Microsoft.EventHubs` and `Azure Storage` apps.
When adding permission for `Microsoft.EventHubs` and `Azure Storage`, the type should be `delegated permissions` and the permission should be `user_impersonation`.

## Running the sample

Once the above created you'll want to ensure React has the necessary environment variables. To do this, copy `sample.env` as `.env` and provide the necessary environment variables to configure the application. You can get most values from the output tab of the deployment, and the client and tenant ID from the App registration step. Please note that environment variables should be upper case. For example: REACT_APP_TENANT_ID and REACT_APP_EVENT_HUBS_NAME.

Install the various packages as well as the TypeScript compiler using:

```bash
npm install
```

Run the sample app:

```bash
npm start
```

Since this is a contrived example, you can only create new Todos and complete existing Todos. As you interact with the application, you'll notice EventHubs messages get written out to the console in the browser's developer tools. You may attach a note which will get uploaded as Blobs or fetch an existing note to display it on the screen.

Additionally, you may open multiple instances of this sample application and watch as Todos synchronize in real-time.

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are avaiable.

[react]: https://create-react-app.dev/
[typescript]: https://www.typescriptlang.org/docs/home.html
[freesub]: https://azure.microsoft.com/free
[eventhubs]: https://docs.microsoft.com/javascript/api/@azure/event-hubs
[servicebus]: https://docs.microsoft.com/javascript/api/@azure/service-bus
[storageblob]: https://docs.microsoft.com/javascript/api/@azure/storage-blob
[identity]: https://docs.microsoft.com/javascript/api/@azure/identity
[apiref]: https://docs.microsoft.com/javascript/api/
[implicitgrantflow]: https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow
