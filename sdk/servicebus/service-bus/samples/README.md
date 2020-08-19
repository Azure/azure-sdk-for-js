# Getting started with samples

**NOTE**: Samples for @azure/service-bus v1.1.x are available [here](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1)

## Install the library

There are three ways to work with the samples.

- Download the sample package from [docs.microsoft.com/samples](https://docs.microsoft.com/samples) by browsing to the Azure Service Bus product and choosing either JavaScript or TypeScript in the list of languages.
- Copy the sample file you want to a folder of your choice and use `npm` to install its requisite dependencies, then edit the file to add the necessary credentials and information, finally running it with NodeJS.
- In case you have cloned this repo, run `npm install` in either the `samples/javascript` or `samples/typescript` folder to install the library as well as other dependencies that are required by some of the samples.

## Get connection string for Service Bus & names for Queues/Topics/Subscriptions

- In the [Azure Portal](https://portal.azure.com), go to **Dashboard > Service Bus > _your-servicebus-namespace_**.
- If you don't have a Service Bus resource, then here are the docs which can help you create a Service Bus resource in the portal : [Service Bus - Node.js docs](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-nodejs-how-to-use-queues).
- Note down the "Primary Connection String" of **RootManageSharedAccessKey** at **Shared access policies** under **Settings** tab.
- To work with Queues, find the "Queues" tab right under "Entities" at **_your-servicebus-namespace_**, create a Queue and note down its name.
- To work with Topics, find the "Topics" tab right under "Entities" at **_your-servicebus-namespace_**, create a Topic. Go to **_your-servicebus-namespace_ > _your-topic_**, create subscriptions for the topic. Note down the names of the topic and subscriptions.

> _Note : **RootManageSharedAccessKey** is automatically created for the namespace and has permissions for the entire namespace. If you want to use restricted access, refer [Shared Access Signatures](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-sas), create the Access Keys exclusive to the specific created Queue/Topic._

Before running any of the samples, update it with the connection string and the queue/topic/subscription names you have noted down above, or follow the instructions in the README files referring to the `sample.env` file.

# Running the Samples

See the instructions in [`samples/javascript/README.md`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/) or [`samples/typescript/README.md`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/) for instructions on running the JavaScript samples or the TypeScript samples respectively.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2Fsamples%2FREADME.png)
