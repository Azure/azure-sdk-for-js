# Service Bus: reason codes or equivalent

## Proposal

Each language should provide:

- [ ] Aconceptual equivalent to a reason code (a programatically readable field describing the reason for the failure)
- [ ] A sample that shows how to use it.

## Current state

This is what we have:

| Language   | Error class name                          | Has 'reason'                              | Samples link                                             |
| ---------- | ----------------------------------------- | ----------------------------------------- | -------------------------------------------------------- |
| JavaScript | [ServiceBusError][js_exception]           | yes                                       | [receiveMessagesStreaming.ts][js_sample]                 |
| C#         | [ServiceBusException][csharp_exception]   | yes                                       | [ServiceBusProcessor(maybe, but not yet)][csharp_sample] |
| Python     | [ServiceBusError(base)][python_exception] | yes, via the type of the exception itself |                                                          |
| Java       | [ServiceBusException][java_exception]     | no                                        |                                                          |

## Additional questions

- [ ] Are users expected to react to these errors? If so, what other flags/information might we need?
- [ ] Is Java going with a base-class so users distinguish via types (like Python) or with an enum?
- [ ] Here's the current list of Reasons and their descriptions. Do we like these? Can we sync names in our code?

```csharp
  public enum ServiceBusFailureReason
    {
        /// <summary>
        /// The exception was the result of a general error within the client library.
        /// </summary>
        GeneralError,

        /// <summary>
        /// A Service Bus resource cannot be found by the Service Bus service.
        /// </summary>
        MessagingEntityNotFound,

        /// <summary>
        /// The lock on the message is lost. Callers should call attempt to receive and process the message again.
        /// </summary>
        MessageLockLost,

        /// <summary>
        /// The requested message was not found.
        /// </summary>
        MessageNotFound,

        /// <summary>
        /// A message is larger than the maximum size allowed for its transport.
        /// </summary>
        MessageSizeExceeded,

        /// <summary>
        /// The Messaging Entity is disabled. Enable the entity again using Portal.
        /// </summary>
        MessagingEntityDisabled,

        /// <summary>
        /// The quota applied to an Service Bus resource has been exceeded while interacting with the Azure Service Bus service.
        /// </summary>
        QuotaExceeded,

        /// <summary>
        /// The Azure Service Bus service reports that it is busy in response to a client request to perform an operation.
        /// </summary>
        ServiceBusy,

        /// <summary>
        /// An operation or other request timed out while interacting with the Azure Service Bus service.
        /// </summary>
        ServiceTimeout,

        /// <summary>
        /// There was a general communications error encountered when interacting with the Azure Service Bus service.
        /// </summary>
        ServiceCommunicationProblem,

        /// <summary>
        /// The requested session cannot be locked.
        /// </summary>
        SessionCannotBeLocked,

        /// <summary>
        /// The lock on the session has expired. Callers should request the session again.
        /// </summary>
        SessionLockLost,

        /// <summary>
        /// The user doesn't have access to the entity.
        /// </summary>
        Unauthorized,

        /// <summary>
        /// An entity with the same name exists under the same namespace.
        /// </summary>
        MessagingEntityAlreadyExists
    }
```

[js_exception]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/src/serviceBusError.ts
[js_sample]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples/typescript/src/receiveMessagesStreaming.ts#L53
[csharp_failurereason]: https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/servicebus/Azure.Messaging.ServiceBus/src/Primitives/ServiceBusFailureReason.cs#L9
[csharp_exception]: https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/servicebus/Azure.Messaging.ServiceBus/src/Primitives/ServiceBusException.cs
[csharp_sample]: https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/servicebus/Azure.Messaging.ServiceBus/samples/Sample04_Processor.md
[java_exception]: https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/servicebus/azure-messaging-servicebus/src/main/java/com/azure/messaging/servicebus/ServiceBusReceiverException.java
[python_exception]: https://github.com/Azure/azure-sdk-for-python/blob/master/sdk/servicebus/azure-servicebus/azure/servicebus/exceptions.py#L213
