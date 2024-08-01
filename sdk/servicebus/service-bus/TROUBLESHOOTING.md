# Troubleshooting Service Bus issues

This troubleshooting guide covers failure investigation techniques, common errors in the Azure Service Bus JavaScript client library, and mitigation steps to resolve these errors.

## Table of contents

- [Handle Service Bus Errors](#handle-service-bus-errors)
  - [Find information about a ServiceBusError](#find-information-about-a-servicebuserror)
  - [Other common errors](#other-common-errors)
- [Permissions issues](#permissions-issues)
- [Connectivity issues](#connectivity-issues)
  - [Timeout when connecting to service](#timeout-when-connecting-to-service)
  - [SSL handshake failures](#ssl-handshake-failures)
  - [Socket exhaustion errors](#socket-exhaustion-errors)
  - [Adding components to the connection string does not work](#adding-components-to-the-connection-string-does-not-work)
    - ["TransportType=AmqpWebSockets" Alternative](#transporttypeamqpwebsockets-alternative)
    - ["Authentication=Managed Identity" Alternative](#authenticationmanaged-identity-alternative)
- [Logging and diagnostics](#logging-and-diagnostics)
  - [Enable logging](#enable-logging)
  - [Logging to a file](#logging-to-a-file)
  - [Distributed tracing](#distributed-tracing)
- [Troubleshoot sender issues](#troubleshoot-sender-issues)
  - [Cannot send batch with multiple partition keys](#cannot-send-batch-with-multiple-partition-keys)
  - [Batch fails to send](#batch-fails-to-send)
- [Troubleshoot receiver issues](#troubleshoot-receiver-issues)
  - [Number of messages returned does not match number requested in batch receive](#number-of-messages-returned-does-not-match-number-requested-in-batch-receive)
  - [Message or session lock is lost before lock expiration time](#message-or-session-lock-is-lost-before-lock-expiration-time)
  - [How to browse scheduled or deferred messages](#how-to-browse-scheduled-or-deferred-messages)
  - [How to browse session messages across all sessions](#how-to-browse-session-messages-across-all-sessions)
- [Troubleshoot receiver issues when streaming messages via `subscribe()` methods](#troubleshoot-receiver-issues-when-streaming-messages-via-subscribe-methods)
  - [Autolock renewal is not working](#autolock-renewal-is-not-working)
- [Quotas](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-quotas)

## Handle Service Bus Errors
The Service Bus client library will surface errors when an error is encountered by a service operation or within the client. For scenarios specific to Service Bus, a [ServiceBusError][ServiceBusError] is thrown; this is the most common error type that applications will encounter.

The Service Bus clients will automatically retry errors that are considered transient, following the configured [retry options][CoreAmqpRetryOptions]. When an error is surfaced to the application, either all retries were applied unsuccessfully, or the error was considered non-transient. More information on configuring retry options can be found in the [Customizing the retry options][RetryOptionsSample] sample.

### Find information about a ServiceBusError

The error includes some contextual information inherited from [MessagingError][MessagingError] to assist in understanding the context of the error and its relative severity.  These are:

- `address`	: Address to which the network connection failed. Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.

- `errno`: System-provided error number. Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.

- `info`: Extra details about the error.

- `name`: The error name. Default value: "MessagingError".

- `port`: The unavailable network connection port. Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.

- `retryable`: Describes whether the error is retryable. Default: true.

- `stack`: call stack trace when the error is thrown.

- `syscall`: Name of the system call that triggered the error. Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.

- `code`: The error also has a `code` property that provides the reason of the failure. It contains a value from a set of well-known reasons for the failure that help to categorize and clarify the root cause. Some key failure reasons are:

  - **ServiceTimeout**: An operation or other request timed out while interacting with the Azure Service Bus service. This indicates that the Service Bus service did not respond to an operation within the expected amount of time. This may have been caused by a transient network issue or service problem. The Service Bus service may or may not have successfully completed the request; the status is not known. In the case of accepting the next available session, this error indicates that there were no unlocked sessions available in the entity. These are transient errors that will be automatically retried.

  - **QuotaExceeded**: The quota applied to an Service Bus resource has been exceeded while interacting with the Azure Service Bus service.  This typically indicates that there are too many active receive operations for a single entity. In order to avoid this error, reduce the number of potential concurrent receives. You can use batch receives to attempt to receive multiple messages per receive request. Please see [Service Bus quotas][ServiceBusQuotas] for more information.

  - **MessageSizeExceeded**: A message is larger than the maximum size allowed for its transport. This indicates that the max message size has been exceeded. The message size includes the body of the message, as well as any associated metadata and system overhead. The best approach for resolving this error is to reduce the number of messages being sent in a batch or the size of the body included in the message. Because size limits are subject to change, please refer to [Service Bus quotas][ServiceBusQuotas] for specifics.

  - **MessageLockLost**: The lock on the message is lost. Callers should attempt to receive and process the message again. This only applies to non-session entities. This error occurs if processing takes longer than the lock duration and the message lock is not renewed. Note that this error can also occur when the link is detached due to a transient network issue or when the link is idle for 10 minutes. See [Message or session lock is lost before lock expiration time](#message-or-session-lock-is-lost-before-lock-expiration-time) for more information.

  - **SessionLockLost**: The lock on the session has expired. Callers should request the session again.  This only applies to session-enabled entities. This error occurs if processing takes longer than the lock duration and the session lock is not renewed. Note that this error can also occur when the link is detached due to a transient network issue or when the link is idle for 10 minutes. See [Message or session lock is lost before lock expiration time](#message-or-session-lock-is-lost-before-lock-expiration-time) for more information.

  - **MessageNotFound**: The requested message was not found. This occurs when attempting to receive a deferred message by sequence number for a message that either doesn't exist in the entity, or is currently locked.

  - **SessionCannotBeLocked**: This indicates that the requested session cannot be locked because the lock is already held elsewhere. Once the lock expires, the session can be accepted.

  - **GeneralError**: This indicates that the Service Bus service encountered an error while processing the request. This is often caused by service upgrades and restarts. These are transient errors that will be automatically retried.

  - **ServiceCommunicationProblem**: This indicates that there was an error communicating with the service. The issue may stem from a transient network problem, or a service problem. These are transient errors that will be automatically retried.

### Other common errors

  - **TypeError**: Thrown by clients when a parameter provided when interacting with the client is invalid. Information about the specific parameter and the nature of the problem can be found in the `message`.

  - **Error**: generic errors that are thrown for unexpected error case in the client.  More information can be found in the error's `message` property.

## Permissions issues

An `ServiceBusError` with **UnauthorizedAccess** error code indicates that the provided credentials do not allow for the requested action to be performed. The `message` property contains details about the failure.

The following verification steps are recommended, depending on the type of authorization provided when constructing the [ServiceBusClient][ServiceBusClient]:

- [Verify the connection string is correct][GetConnectionString]
- [Verify the SAS token was generated correctly][AuthorizeSAS]
- [Verify the correct RBAC roles were granted][RBAC]

For more possible solutions, see: [Troubleshooting guide for Azure Service Bus][TroubleshootingGuide].

## Connectivity issues

### Timeout when connecting to service

Depending on the host environment and network, this may present to applications as either a `Error`  or a `ServiceBusError` with `code` of `ServiceTimeout` and most often occurs when the client cannot find a network path to the service.

To troubleshoot:

- Verify that the connection string or fully qualified domain name specified when creating the client is correct. For information on how to acquire a connection string, see: [Get a Service Bus connection string][GetConnectionString].

- Check the firewall and port permissions in your hosting environment and that the AMQP ports 5671 and 5762 are open and that the endpoint is allowed through the firewall.

- Try using the Web Socket transport option, which connects using port 443. For details, see: [Use Proxy sample][ProxySample] where web socket connection is used.

- See if your network is blocking specific IP addresses. For details, see: [What IP addresses do I need to allow?][ServiceBusIPAddresses].

- If applicable, verify the proxy configuration. For details, see:  [Use Proxy sample][ProxySample].

- For more information about troubleshooting network connectivity, see: [Troubleshooting guide for Azure Service Bus][TroubleshootingGuide].

### SSL handshake failures

This error can occur when an intercepting proxy is used. To verify, it is recommended that the application be tested in the host environment with the proxy disabled.

### Socket exhaustion errors

Applications should prefer treating the Service Bus types as singletons, creating and using a single instance through the lifetime of the application. Each new [ServiceBusClient][ServiceBusClient] created results in a new AMQP connection, which uses a socket. The [ServiceBusClient][ServiceBusClient] type manages the connection for all types created from that instance. Each [ServiceBusReceiver][ServiceBusReceiver], [ServiceBusSessionReceiver][ServiceBusSessionReceiver], and [ServiceBusSender][ServiceBusSender] manages its own AMQP link for the associated Service Bus entity.

The clients are safe to cache when idle; they will ensure efficient management of network, CPU, and memory use, minimizing their impact during periods of inactivity. It is also important that `close` should be called when a client is no longer needed to ensure that network resources are properly cleaned up.

### Adding components to the connection string does not work

The current generation of the Service Bus client library supports connection strings only in the form published by the Azure portal. These are intended to provide basic location and shared key information only; configuring behavior of the clients is done through its options.

Previous generations of the Service Bus clients allowed for some behavior to be configured by adding key/value components to a connection string. These components are no longer recognized and have no effect on client behavior.

#### "TransportType=AmqpWebSockets" Alternative

To configure web socket use, see: [Use Proxy sample][ProxySample].

#### "Authentication=Managed Identity" Alternative

To authenticate with Managed Identity, see: [Send Messages sample][IdentitySample]

For more information about the `Azure.Identity` library, see: [Authentication and the Azure SDK][AuthenticationAndTheAzureSDK].

## Logging and diagnostics

The Service Bus client library is fully instrumented for logging information at various levels of detail.  Logging is performed for each operation and follows the pattern of marking the starting point of the operation, it's completion, and any errors encountered. Additional information that may offer insight is also logged in the context of the associated operation.

### Enable logging

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Service Bus SDK

```bash
export DEBUG=azure*
```

- Getting debug logs from the Service Bus SDK and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

- If you are **not interested in viewing the message transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:core-amqp:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:service-bus:error,azure:core-amqp:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

### Logging to a file

1. Set the `DEBUG` environment variable as shown above
2. Run your test script as follows:

- Logging statements from your test script go to `out.log` and logging statements from the sdk go to `debug.log`.
  ```bash
  node your-test-script.js > out.log 2>debug.log
  ```
- Logging statements from your test script and the sdk go to the same file `out.log` by redirecting stderr to stdout (&1), and then redirect stdout to a file:
  ```bash
  node your-test-script.js >out.log 2>&1
  ```
- Logging statements from your test script and the sdk go to the same file `out.log`.
  ```bash
    node your-test-script.js &> out.log
  ```
### Distributed tracing

The Service Bus client library has **experimental** support for the the OpenTelemetry specification via the [`@azure/opentelemetry-instrumentation-azure-sdk` package](https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk).

The library creates the following spans:

`message`  
`ServiceBusSender.send`  
`StreamReceiver.process`  
`BatchingReceiverLite.process`  
`SessionReceiver.process`  
`ServiceBusReceiver.renewMessageLock`  
`ServiceBusReceiver.complete`  
`ServiceBusReceiver.abandon`  
`ServiceBusReceiver.defer`  
`ServiceBusReceiver.deadLetter`  
`ServiceBusSessionReceiver.renewSessionLock`  
`ServiceBusSessionReceiver.setSessionState`  
`ServiceBusSessionReceiver.getSessionState`  
`ServiceBusRuleManager.createRule`  
`ServiceBusRuleManager.deleteRule`  
`ServiceBusRuleManager.getRules`  

Most of the spans are self-explanatory and are started and stopped during the operation that bears its name. The span that ties the others together is `message`. The way that the message is traced is via the the `Diagnostic-Id` that is set in the [ServiceBusMessage.applicationProperties][ApplicationProperties] property by the library during send and schedule operations. In Application Insights, `message` spans will be displayed as linking out to the various other spans that were used to interact with the message, e.g. the `**Receiver.process` span, the `ServiceBusSender.send` span.

## Troubleshoot sender issues

### Cannot send batch with multiple partition keys

When sending to a partition-enabled entity, all messages included in a single send operation must have the same `partitionKey`. If your entity is session-enabled, the same requirement holds true for the `sessionId` property. In order to send messages with different `partitionKey` or `sessionId` values, group the messages in separate [ServiceBusMessageBatch][ServiceBusMessageBatch] instances or include them in separate calls to the [sendMessages][SendMessages] methods.

### Batch fails to send

We define a message batch as either [ServiceBusMessageBatch][ServiceBusMessageBatch] containing 2 or more messages, or a call to [sendMessages][SendMessages] where 2 or more messages are passed in. The service does not allow a message batch to exceed 1MB. This is true whether or not the [Premium large message support][LargeMessageSupport] feature is enabled. If you intend to send a message greater than 1MB, it must be sent individually rather than grouped with other messages.

## Troubleshoot receiver issues

### Number of messages returned does not match number requested in batch receive

When attempting to do a batch receive, i.e. passing a `maxMessageCount` value of 2 or greater to the [receiveMessages][ReceiveMessages] method, you are not guaranteed to receive the number of messages requested, even if the queue or subscription has that many messages available at that time, and even if the entire configured `maxWaitTimeInMs` has not yet elapsed. To maximize throughput and avoid lock expiration, once the first message comes over the wire, the receiver will wait an additional 1000ms for any additional messages before dispatching the messages for processing.  The `maxWaitTimeInMs` controls how long the receiver will wait to receive the *first* message - subsequent messages will be waited for 1000ms. Therefore, your application should not assume that all messages available will be received in one call.

### Message or session lock is lost before lock expiration time

The Service Bus service leverages the AMQP protocol, which is stateful. Due to the nature of the protocol, if the link that connects the client and the service is detached after a message is received, but before the message is settled, the message is not able to be settled on reconnecting the link. Links can be detached due to a short-term transient network failure, a network outage, or due to the service enforced 10-minute idle timeout. The reconnection of the link happens automatically as a part of any operation that requires the link, i.e. settling or receiving messages. Because of this, you may encounter `ServiceBusError` with `code` of `MessageLockLost` or `SessionLockLost` even if the lock expiration time has not yet passed.

### How to browse scheduled or deferred messages

Scheduled and deferred messages are included when peeking messages. They can be identified by the [ServiceBusReceivedMessage.state][MessageState] property. Once you have the [sequenceNumber][SequenceNumber] of a deferred message, you can receive it with a lock via the [receiveDeferredMessages][ReceiveDeferredMessages] method.

When working with topics, you cannot peek scheduled messages on the subscription, as the messages remain in the topic until the scheduled enqueue time. As a workaround, you can construct a [ServiceBusReceiver][ServiceBusReceiver] passing in the topic name in order to peek such messages. Note that no other operations with the receiver will work when using a topic name.

### How to browse session messages across all sessions

You can use a regular [ServiceBusReceiver][ServiceBusReceiver] to peek across all sessions. To peek for a specific session you can use the [ServiceBusSessionReceiver][ServiceBusSessionReceiver], but you will need to obtain a session lock.

## Troubleshoot receiver issues when streaming messages via `subscribe()` methods

### Autolock renewal is not working

Autolock renewal relies on the system time to determine when to renew a lock for a message or session. If your system time is not accurate, e.g. your clock is slow, then lock renewal may not happen before the lock is lost. Ensure that your system time is accurate if autolock renewal is not working.

## Quotas

Information about Service Bus quotas can be found [here][ServiceBusQuotas].

[ServiceBusError]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebuserror
[CoreAmqpRetryOptions]: https://learn.microsoft.com/javascript/api/@azure/core-amqp/retryoptions
[ServiceBusQuotas]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-quotas
[MessingError]: https://learn.microsoft.com/javascript/api/@azure/core-amqp/messagingerror
[ServiceBusClient]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusclient
[GetConnectionString]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-quickstart-portal#get-the-connection-string
[AuthorizeSAS]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-sas
[RBAC]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-managed-service-identity
[TroubleshootingGuide]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-troubleshooting-guide
[ProxySample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples-dev/useProxy.ts
[ServiceBusIPAddresses]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-faq#what-ip-addresses-do-i-need-to-add-to-allowlist-
[ServiceBusReceiver]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver
[ServiceBusSessionReceiver]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebussessionreceiver
[ServiceBusSender]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebussender
[IdentitySample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples-dev/sendMessages.ts
[AuthenticationAndTheAzureSDK]: https://devblogs.microsoft.com/azure-sdk/authentication-and-the-azure-sdk
[ServiceBusMessageBatch]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusmessagebatch
[SendMessages]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebussender#@azure-service-bus-servicebussender-sendmessages
[LargeMessageSupport]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-premium-messaging#large-messages-support
[ReceiveMessages]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver#@azure-service-bus-servicebusreceiver-receivemessages
[MessageState]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusreceivedmessage#@azure-service-bus-servicebusreceivedmessage-state
[SequenceNumber]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusreceivedmessage#@azure-service-bus-servicebusreceivedmessage-sequencenumber
[ReceiveDeferredMessages]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver#@azure-service-bus-servicebusreceiver-receivedeferredmessages
[ApplicationProperties]: https://learn.microsoft.com/javascript/api/@azure/service-bus/servicebusmessage#@azure-service-bus-servicebusmessage-applicationproperties
