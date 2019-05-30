# Getting started with samples #

## Install the library

Run the below in your samples folder to install the npm package for Azure Service Bus library.
```bash
npm install @azure/service-bus
```

## Get connection string for Service Bus & names for Queues/Topics/Subscriptions
- In the [Azure Portal](https://portal.azure.com), go to **Dashboard > Service Bus > _your-servicebus-namespace_**.
- If you don't have a Service Bus resource, then here are the docs which can help you create a Service Bus resource in the portal : [Service Bus - Node.js docs](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-nodejs-how-to-use-queues).
- Note down the "Primary Connection String" of **RootManageSharedAccessKey** at **Shared access policies** under **Settings** tab.
- To work with Queues, find the "Queues" tab right under "Entities" at **_your-servicebus-namespace_**, create a Queue and note down its name.
- To work with Topics, find the "Topics" tab right under "Entities" at **_your-servicebus-namespace_**, create a Topic. Go to **_your-servicebus-namespace_ > _your-topic_**, create subscriptions for the topic. Note down the names of the topic and subscriptions.
> _Note : **RootManageSharedAccessKey** is automatically created for the namespace and has permissions for the entire namespace. If you want to use restricted access, refer [Shared Access Signatures](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-sas), create the Access Keys exclusive to the specific created Queue/Topic._

Before running any of the samples, update it with the connection string and the queue/topic/subscription names you have noted down above.

## Initializing the samples folder

Copy the samples folder somewhere in your computer, then run `npm
install` inside of it.

If you want to run just a specific sample, copy that file into a
separate folder and continue with the steps below. Remember to
install the library with `npm install @azure/service-bus`. Read the
sample's source code to verify any other dependency that you might
need (dependencies will be visible within the first lines of each
sample file).

## Running a Javascript sample

Copy the sample to your samples folder and use `node` to run it.
```bash
node sample.js
```

## Running a Typescript sample

If you don't have Typescript installed, then use `npm` to install it first.
```bash
npm install -g typescript
```

One way to run Typescript samples is to use `ts-node`. To install `ts-node`, run the below in your sample folder
```bash
npm install ts-node
```

Copy the sample to your samples folder and use `ts-node` to run it.
```bash
ts-node sample.ts
```


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/servicebus/service-bus/samples/README.png)
