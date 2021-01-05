# Azure Core Client Libraries

The core set of packages provide common functionality for interacting with Azure services in a way that follows our [design guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html).

These packages are generally not used directly by consumers, but are used as dependencies by service-specific packages. However, as many of the concepts implemented in core are exposed in service packages, so understanding these concepts will help in advanced scenarios of service interaction.

## Common Patterns for REST

Many of the service packages interact with REST-based service APIs. This means they use standard HTTP verbs to communicate with Azure servers to perform operations against a particular service.

### HTTP Request Pipeline

### ServiceClient

### Accessing raw HTTP responses

### Authentication

### Pagination

### Long Running Operations

### Tracing

### Logging

## AutoRest and Generated Clients

[AutoRest](https://github.com/Azure/autorest) is a generation tool for creating a client library using an [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) (formerly known as "Swagger".)

AutoRest is used in conjunction with the [autorest.typescript extension](https://github.com/Azure/autorest.typescript) to generate client libraries for JS/TS consumers. While the generated code tries as much as possible to fulfill the [TS design guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html), it is often necessary to wrap the generated client classes in what are known as "convenience clients."

A convenience client extends the shape of a generated client in ways that make it more approachable to the consumer, such as simplifying the return shape of methods or adding helper functions for common operations.

## AMQP and Message-based Clients

More information can be found in [@azure/amqp](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/core-amqp)
