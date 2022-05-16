# Azure Core Client Libraries

The core set of packages provide common functionality for interacting with Azure services in a way that follows our [design guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html).

These packages are generally not used directly by consumers, but are used as dependencies by service-specific packages. However, as many of the concepts implemented in core are exposed in service packages, so understanding these concepts will help in advanced scenarios of service interaction.

## Core "v1" and Core "v2"

The package `@azure/core-http` is heavily based on `@azure/ms-rest-js` and inherited legacy API surface and concepts that sometimes conflicted with our design principles. A full explanation is available here: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md

For the purposes of this document, understand that "core v1" refers to the package `@azure/core-http` and is considered legacy. "Core v2" refers to the packages `@azure/core-rest-pipeline`, `@azure/core-client`, and `@azure/core-xml`.

## Common Patterns for REST

Many of the service packages interact with REST-based service APIs. This means they use standard HTTP verbs to communicate with Azure servers to perform operations against a particular service.

### HTTP Request Pipeline

Many service operations require client libraries to make one or more HTTP calls to the service. While each request is unique, there are common behaviors that need to be applied to each call, such as serialization and retry logic.

The `Pipeline` is what manages these common behaviors, which are grouped into items called `PipelinePolicy`s. Each client library configures its own `Pipeline` using a set of standard `PipelineOptions`.

For more information, refer to https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-rest-pipeline#key-concepts

### ServiceClient

Client libraries come in two flavors: authored and generated. Generated clients are produced by [AutoRest](#autorest-and-generated-clients) whereas authored clients are written by hand. Typically, authored clients wrap generated clients and extend them with custom API surface.

`ServiceClient` is the base class of all generated clients. It builds on top of the HTTP Pipeline in order to make requests to services.

For more information, refer to https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-client#key-concepts

### Accessing raw HTTP responses

Usually all the information necessary to interact with a service is returned from each operation method on a client. However, sometimes developers may wish to look at additional information on the raw request object, such as headers, for debugging purposes.

This is done by passing a `onResponse` callback in the operation call:

```ts
function logResponseHeaders(response: FullOperationResponse) {
  console.log(response.parsedHeaders);
  // You can also access the original request inside response.request
}
const item = await client.getItemById(id, { onResponse: logResponseHeaders });
```

#### Legacy `_response` property

For packages that are still using `@azure/core-http` you can access the raw response by looking at a special non-enumerable `_response` property on the returned items:

```ts
const item = await client.getItemById(id);
console.log(item._response.parsedHeaders);
```

### Authentication

Authentication is handled by [@azure/identity](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/). In most cases this is as simple as passing `DefaultAzureCredential` to a client that takes a `TokenCredential` as a means of authentication.

```ts
const { KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential();
const client = new KeyClient(vaultUrl, credential);
```

Note that `DefaultAzureCredential` does not work for applications that are running locally in a web browser. For such applications, consider using `InteractiveBrowserCredential` instead.

### Pagination

Client libraries follow our [design guidelines for pagination](https://azure.github.io/azure-sdk/typescript_design.html#ts-pagination). This is largely hand-authored today in convenience clients, but code generation is improving to support this pattern inside generated clients as well.

The standard interfaces for pagination are provided by [@azure/core-paging](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-paging).

Basic code for iterating through all entries of a paged API looks something like:

```ts
for await (let secret of client.listSecrets()) {
  console.log("secret: ", secret);
}
```

In cases where more control is needed (or there are too many pages to iterate over), pagination can done explicitly:

```ts
for await (let page of client.listSecrets().byPage({ maxPageSize: 2 })) {
  for (const secret of page) {
    console.log("secret: ", secret);
  }
}
```

### Long Running Operations

Client libraries follow our [design guidelines for Long Running Operations (LROs)](https://azure.github.io/azure-sdk/typescript_design.html#ts-lro). This ensures all LROs follow a similar pattern to remain **consistent** across clients.

To assist with implementing pollers correctly, primitives are provided by [@azure/core-lro](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-lro). These primitives help implement `Poller` objects which are used to manage `PollOperation`s that contain `PollOperationState`.

In essence, a `Poller` handles the work of continously checking the server for updates to the LRO on a developer's behalf. `Poller`s are highly customizable, and consumers are able to decide when to poll manually if needed.

The simplest contract for a poller is to simply wait until it is finished:

```ts
const poller = await client.beginDeleteKey(keyName);
await poller.pollUntilDone();
```

`Poller`s are also capable of being serialized via the standard `toString()` method:

```ts
const poller = await client.beginDeleteKey(keyName);
const serializedPoller = poller.toString();
// some time later
const rehydratedPoller = await client.beginDeleteKey(keyName, { resumeFrom: serializedPoller });
```

### Tracing

#### Azure Application Insights

Azure Application Insights, a feature of Azure Monitor, is an extensible Application Performance Management (APM) service for developers and DevOps professionals. Use it to monitor your live applications. It will automatically detect performance anomalies, and includes powerful analytics tools to help you diagnose issues and to understand what users actually do with your application.

> If your application already uses ApplicationInsights, automatic collection of Azure SDK traces is supported in versions 1.8.0 and later.

To setup Application Insights tracking for your application follow the [Start Monitoring your Node.js Application](https://docs.microsoft.com/azure/azure-monitor/app/nodejs-quick-start) quickstart guide.

#### Open Telemetry

Client libraries have preliminary support for [OpenTelemetry](https://opentelemetry.io/). This functionality is mostly managed by [@azure/core-tracing](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-tracing)

Each client library internally does the work to create a new OpenTelemetry `Span` for each service operation, making sure to end the `Span` after the result is returned back to the consumer. Many clients use a helper method called [withSpan](https://github.com/Azure/azure-sdk-for-js/blob/b697907427cb2332bf362742ace450524019dc96/sdk/textanalytics/ai-text-analytics/src/textAnalysisClient.ts#L495) to manage the new `Span` and automatically handle closing it.

When `tracingOptions.tracingContext` is set on an operation, a default request policy will automatically create a span for each HTTP request that is issued.

Consumers are expected to pass in the `Context` of the parent `Span` when calling an operation, such as:

```ts
const result = await blobClient.download(undefined, undefined, {
  tracingOptions: {
    tracingContext: activeContext
  },
});
```

### Logging

Logging in client libraries is provided by [@azure/logger](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

AzureLogger provides the ability to easily set a global log level (either programmatically or through an environment variable) and log output can be redirected by simply overriding the default `log` method:

```ts
const { AzureLogger, setLogLevel } = require("@azure/logger");

setLogLevel("verbose");

// override logging to output to console.log (default location is stderr)
AzureLogger.log = (...args) => {
  console.log(...args);
};
```

## AutoRest and Generated Clients

[AutoRest](https://github.com/Azure/autorest) is a generation tool for creating a client library using an [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) (formerly known as "Swagger".)

AutoRest is used in conjunction with the [autorest.typescript extension](https://github.com/Azure/autorest.typescript) to generate client libraries for JS/TS consumers. While the generated code tries as much as possible to fulfill the [TS design guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html), it is often necessary to wrap the generated client classes in what are known as "convenience clients."

A convenience client extends the shape of a generated client in ways that make it more approachable to the consumer, such as simplifying the return shape of methods or adding helper functions for common operations.

## AMQP and Message-based Clients

More information can be found in [@azure/amqp](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-amqp)
