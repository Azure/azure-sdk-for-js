---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-service-bus
  - azure-storage
urlFragment: electron-typescript
---

# Azure SDK samples for Electron (TypeScript)

This sample application shows how to use the TypeScript client libraries for Azure in some common scenarios.

In this sample, we build a simple [Electron][electron] application and integrating with various
Azure services.

- Integration with Azure ServiceBus showcases a mechanism for any single instance to consume ServiceBus messages.
- Integration with Azure Storage Blob showcases a mechanism for fetching Azure blobs and displaying them in the renderer.

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following resources created to run this sample:

- An Azure ServiceBus namespace and queue. Please refer to the [ServiceBus documentation][servicebus] for additional information on ServiceBus.
- An Azure Storage Blob container, with a single text file uploaded to it to support the sample. You'll want to Please refer to the [Storage Blob documentation][storageblob] for additional information on Azure Storage Blob. This file will be fetched from Azure Storage Blob and displayed on the screen.
- Finally, you'll need a way to authenticate the application with Azure. This requires some additional setup configuring the correct access permissions to the above resources using either a service principal or a role-based-authentication. Please refer to the [@azure/identity][identity] package for information on authentication.

## Running the sample

Once the above created you'll want to ensure React has the necessary environment variables. To do this, copy `sample.env` as `.env` and provide the necessary environment variables to configure the application.

Install the dependencies:

```bash
npm install
```

Run the sample app:

```bash
npm start
```

A new electron window will open containing a single Log In button. Once you login you'll be able to send
and receive Service Bus messages as well as fetch and display a text file from Azure Blob Storage.

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are avaiable.

[electron]: https://www.electronjs.org/
[typescript]: https://www.typescriptlang.org/docs/home.html
[freesub]: https://azure.microsoft.com/free
[servicebus]: https://docs.microsoft.com/javascript/api/@azure/service-bus
[storageblob]: https://docs.microsoft.com/javascript/api/@azure/storage-blob
[identity]: https://docs.microsoft.com/javascript/api/@azure/identity
[apiref]: https://docs.microsoft.com/javascript/api/
