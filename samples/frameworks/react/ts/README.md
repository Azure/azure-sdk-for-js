# Azure SDK samples for React (TypeScript)

This sample application shows how to use the TypeScript client libraries for Azure in some common scenarios.

In this sample, we build a simple Todo application in React using [create-react-app][react] and integrating with various Azure services.

- Integration with Azure EventHubs showcases a mechanism for multiple instances to consume EventHub messages produced by any one of them.
- Integration with Azure ServiceBus showcases a mechanism for any single instance to consume ServiceBus messages. When multiple windows are open, only one of them will receive any given message.
- Integration with Azure Storage Blob showcases a mechanism for fetching Azure blobs and displaying them in the browser.

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript].

You need [an Azure subscription][freesub] and the following resources created to run this sample:

- An Azure EventHubs namespace. Please refer to the [EventHubs documentation][eventhubs] for additional information on EventHubs
- An Azure Storage Blob container, with a single text file uploaded called "todo.txt" to support the sample. Please refer to the [Storage Blob documentation][storageblob] for additional information on Azure Storage Blob. This file will be fetched from Azure Storage Blob and displayed on the screen.
- Finally, you'll need a way to authenticate the application with Azure. This requires some additional setup configuring the correct access permissions to the above resources using either a service principal or a role-based-authentication. Please refer to the [@azure/identity][identity] package for information on authentication.

## Running the sample

Once the above created you'll want to ensure React has the necessary environment variables. To do this, copy `sample.env` as `.env` and provide the necessary environment variables to configure the application.

Install the various packages as well as the TypeScript compiler using:

```bash
npm install
```

Run the sample app:

```bash
npm start
```

A new browser window will open containing a sample set of Todos that have been created. Since this is a contrived example, you can only create new Todos and complete existing Todos. As you interact with the application, you'll notice EventHubs and ServiceBus messages get written out to the console in the browser's developer tools.

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
