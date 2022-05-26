# Troubleshoot Event Hubs issues

This troubleshooting guide covers failure investigation techniques, common errors for the credential types in the Azure Event Hubs JavaScript client library, and mitigation steps to resolve these errors.

- [Handle Event Hubs errors](#handle-event-hubs-errors)
  - [Find relevant information in error messages](#find-relevant-information-in-error-messages)
  - [Commonly encountered exceptions](#commonly-encountered-exceptions)
- [Permission issues](#permission-issues)
- [Connectivity issues](#connectivity-issues)
  - [Timeout when connecting to service](#timeout-when-connecting-to-service)
  - [SSL handshake failures](#ssl-handshake-failures)
  - [Socket exhaustion errors](#socket-exhaustion-errors)
  - [Connect using an IoT connection string](#connect-using-an-iot-connection-string)
  - [Cannot add components to the connection string](#cannot-add-components-to-the-connection-string)
- [Enable and configure logging](#enable-and-configure-logging)
  - [Enable AMQP transport logging](#enable-amqp-transport-logging)
  - [Logging in the browser](#logging-in-the-browser)
  - [Reduce logging](#reduce-logging)
- [Troubleshoot EventProducerClient issues](#troubleshoot-eventproducerclient-issues)
  - [Cannot set multiple partition keys for events in EventDataBatch](#cannot-set-multiple-partition-keys-for-events-in-eventdatabatch)
  - [Setting partition key on EventData is not set in Kafka consumer](#setting-partition-key-on-eventdata-is-not-set-in-kafka-consumer)
- [Troubleshoot Subscription issues](#troubleshoot-subscription-issues)
  - [412 precondition failures when using a subscription](#412-precondition-failures-when-using-a-subscription)
  - [Partition ownership changes frequently](#partition-ownership-changes-frequently)
  - ["...current receiver '<RECEIVER_NAME>' with epoch '0' is getting disconnected"](#current-receiver-receiver_name-with-epoch-0-is-getting-disconnected)
  - [High CPU usage](#high-cpu-usage)
  - [Subscription stops receiving](#subscription-stops-receiving)
  - [Migrate from legacy to new client library](#migrate-from-legacy-to-new-client-library)
- [Get additional help](#get-additional-help)
  - [Filing GitHub issues](#filing-github-issues)

## Handle Event Hubs errors

Most Event Hubs errors are of type [MessagingError][messagingerror]. They often have an underlying AMQP error code which indicates the type of the error. In many cases, the application can recover from the error according to the error type. Furthermore, errors of type [MessagingError][messagingerror] carries a `retryable` property that indicates whether the error should be retried. For retryable errors (ie. `amqp:connection:forced` or `amqp:link:detach-forced`), the client libraries will attempt to recover from these errors based on the [retry options][amqpretryoptions] specified when instantiating the client. To configure retry options, follow the sample [Publish events to specific partition][publisheventstospecificpartition]. If the error is non-retryable, there is some configuration issue that needs to be resolved.

The recommended way to solve the specific exception the messaging error represents is to follow the
[Event Hubs Messaging Exceptions][eventhubsmessagingexceptions] guidance.

### Find relevant information in error messages

An [MessagingError][messagingerror] contains the following optional fields.

- **name**: The name of the error, defaults to "MessagingError".
- **code**: The error code that indicates the type of the error. A description of the errors can be found in the [error condition mapper][error_condition_mapper_docs] docs or the [OASIS AMQP 1.0 spec][amqpspec].
- **retryable**: Whether or not trying to perform the same operation is possible. The client library applies the configured retry policies when the error is retryable.
- **info**: Additional information about the error.
- **name**: The name of the error, defaults to "MessagingError".
- **address**: Address to where the network connection failed. Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.
- **errno**: System-provided error number. Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.
- **port**: The unavailable network connection port. Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.
- **syscall**: Name of the system call that triggered the error. Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.

### Commonly encountered exceptions

#### `amqp:connection:forced` and `amqp:link:detach-forced`

When the connection to Event Hubs is idle, the service will disconnect the client after some time. This is not a problem as the clients will re-establish a connection when a service operation is requested. More information can be found in the [AMQP troubleshooting documentation][amqptroubleshooting].

## Permission issues

A `MessagingError` with an error code of `AmqpResponseStatusCode.Unauthorized` means that the provided credentials do not allow performing the action (receiving or sending) with Event Hubs.

- [Double check you have the correct connection string][getconnectionstring]
- [Ensure your SAS token is generated correctly][authorizesas]
- [Check your RBAC roles][rbac_roles]

[Troubleshoot authentication and authorization issues with Event Hubs][troubleshoot_authentication_authorization] lists other possible solutions.

## Connectivity issues

### Timeout when connecting to service

- Verify that the connection string or fully qualified namespace name specified when creating the client is correct. [Get an Event Hubs connection string][getconnectionstring] demonstrates how to acquire a connection string.
- Check the firewall and port permissions in your hosting environment and that the AMQP ports 5671 and 5762 are open.
  - Make sure that the endpoint is allowed through the firewall.
- Try using WebSockets, which connects on port 443. See [configure web sockets][publisheventswithwebsockets] sample.
- See if your network is blocking specific IP addresses.
  - [What IP addresses do I need to allow?][eventhubsipaddresses]
- If applicable, check the proxy configuration. See [configure proxy][publisheventswithwebsockets] sample.
- For more information about troubleshooting network connectivity is at [Event Hubs troubleshooting][eventhubstroubleshooting]

### SSL handshake failures

This error can occur when an intercepting proxy is used. We recommend testing in your hosting environment with the proxy disabled to verify.

### Socket exhaustion errors

Applications should prefer treating the Event Hubs clients as a singleton, creating and using a single instance through the lifetime of their application. This is important as each client type manages its connection; creating a new Event Hub client results in a new AMQP connection, which uses a socket. Additionally, it is essential to be aware that your application is responsible for calling `close()` when it is finished using a client.

### Connect using an IoT connection string

Because translating an IoT connection string requires querying the IoT Hub service, the Event Hubs client library cannot use it directly. The [iothubConnectionString.js][iothubconnectionstring] sample describes how to query IoT Hub to translate an IoT connection string into one that can be used with Event Hubs.

Further reading:

- [Control access to IoT Hub using Shared Access Signatures][iothubsas]
- [Read device-to-cloud messages from the built-in endpoint][ioteventhubendpoint]

### Cannot add components to the connection string

The legacy Event Hub clients allowed customers to add components to the connection string retrieved from the portal. The legacy clients are in packages [@azure/event-hubs@2.0.0][event_hubs_v2] and [@azure/event-processor-host][event_processor_host]. The current generation supports connection strings only in the form published by the Azure portal.

#### Adding "TransportType=AmqpWebSockets"

To use web sockets, see the sample [websockets.js][publisheventswithwebsockets].

#### Adding "Authentication=Managed Identity"

To authenticate with Managed Identity, see the sample [usingAadAuth.js][publisheventswithazureidentity].

For more information about the `Azure.Identity` library, check out our [Authentication and the Azure SDK][authenticationandtheazuresdk] blog post.

## Enable and configure logging

The Azure SDK for JavaScript offers a consistent logging story to help troubleshoot application errors and expedite their resolution. The logs produced will capture the flow of an application before reaching the terminal state to help locate the root issue.

You can set the `AZURE_LOG_LEVEL` environment variable to enable logging to `stderr`:

```bash
export AZURE_LOG_LEVEL=verbose
```

For more detailed instructions on how to enable logs, you can look at the
[@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

### Enable AMQP transport logging

You can alternatively set the `DEBUG` environment variable to get logs when using this library.
This can be useful if you also want to emit logs from the dependencies `rhea-promise` and `rhea` as well.

**Note:** `AZURE_LOG_LEVEL`, if set, takes precedence over DEBUG.
Do not specify any `azure` libraries via DEBUG when also specifying
`AZURE_LOG_LEVEL` or calling setLogLevel.

- Getting only info level debug logs from the Event Hubs client library.

```bash
export DEBUG=azure:*:info
```

- Getting debug logs from the Event Hubs client library and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

### Logging in the browser

Logging can be enabled in the browser by setting `localStorage.debug`

```js
localStorage.debug = "azure:*:info";
```

Note that this is persisted in browser local storage, so to disable it, set it back to `undefined`

```js
localStorage.debug = undefined;
```

### Reduce logging

- If you are **not interested in viewing the raw event data** (which consumes a large amount of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message
```

- If you are interested only in **errors** and client **warnings**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:*:(error|warning),rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

## Troubleshoot EventProducerClient issues

### Cannot set multiple partition keys for events in EventDataBatch

When publishing messages, the Event Hubs service supports a single partition key for each EventDataBatch. Consider using the buffered producer client `EventHubBufferedProducerClient` instead if sending batch of events to multiple partitions is desired.

### Setting partition key on EventData is not set in Kafka consumer

The partition key of the EventHubs event is available in the Kafka record headers, the protocol specific key being "x-opt-partition-key" in the header.

By design, Event Hubs does not promote the Kafka message key to be the Event Hubs partition key nor the reverse because with the same value, the Kafka client and the Event Hub client likely send the message to two different partitions. It might cause some confusion if we set the value in the cross-protocol communication case. Exposing the properties with a protocol specific key to the other protocol client should be good enough.

## Troubleshoot Subscription issues

### 412 precondition failures when using a subscription

412 precondition errors occur when the subscription tries to take or renew ownership of a partition, but the local version of the ownership record is outdated. This occurs when another subscription instance steals partition ownership. See [Partition ownership changes frequently](#partition-ownership-changes-frequently) for more information.

### Partition ownership changes frequently

When the number of Subscription instances changes (i.e. added or removed), the running instances try to load-balance partitions between themselves. For a few minutes after the number of subscriptions changes, partitions are expected to change owners. Once balanced, partition ownership should be stable and change infrequently. If partition ownership is changing frequently when the number of subscriptions is constant, this likely indicates a problem. It is recommended that a GitHub issue with logs and a repro be filed in this case.

### "...current receiver '<RECEIVER_NAME>' with epoch '0' is getting disconnected"

The entire error message looks something like this:

> New receiver 'nil' with higher epoch of '0' is created hence current receiver 'nil' with epoch '0'
> is getting disconnected. If you are recreating the receiver, make sure a higher epoch is used.
> TrackingId:<GUID>, SystemTracker:<NAMESPACE>:eventhub:<EVENT_HUB_NAME>|<CONSUMER_GROUP>,
> Timestamp:2022-01-01T12:00:00}"}

This error is expected when load balancing occurs after Subscription instances are added or removed. Load balancing is an ongoing process. When using the BlobCheckpointStore with your consumer, every ~30 seconds (by default), the consumer will check to see which consumers have a claim for each partition, then run some logic to determine whether it needs to 'steal' a partition from another consumer. The service mechanism used to assert exclusive ownership over a partition is known as the [Epoch][epoch].

However, if no instances are being added or removed, there is an underlying issue that should be addressed. See [Partition ownership changes frequently](#partition-ownership-changes-frequently) for additional information and [Filing GitHub issues](#filing-github-issues).

### High CPU usage

High CPU usage is usually because an instance owns too many partitions. We recommend no more than three partitions for every 1 CPU core; better to start with 1.5 partitions for each CPU core and test increasing the number of partitions owned.

### Subscription stops receiving

The subscription often is continually running in a host application for days on end. Sometimes, they notice that Subscription is not processing one or more partitions. Usually, this is not enough information to determine why the error occurred. The Subscription stopping is the symptom of an underlying cause (i.e. race condition) that occurred while trying to recover from a transient error. Please see [Filing Github issues](#filing-github-issues) for the information we require.

### Migrate from legacy to new client library

The [migration guide][migrationguide] includes steps on migrating from the legacy client and migrating legacy checkpoints.

## Get additional help

Additional information on ways to reach out for support can be found in the [SUPPORT.md][support] at the repo's root.

### Filing GitHub issues

When filing GitHub issues, the following details are requested:

- Event Hub environment
  - How many partitions?
- Subscription environment
  - What is the machine(s) specs processing your Event Hub?
  - How many instances are running?
  - What is the max heap set (e.g. in NodeJS v18, the `--max-old-space-sizesize-in-megabytes` parameter can be used to set it)?
- What is the average size of each EventData?
- What is the traffic pattern like in your Event Hub? (i.e. # messages/minute and if the Subscription is always busy or has slow traffic periods.)
- Repro code and steps
  - This is important as we often cannot reproduce the issue in our environment.
- Logs. We need DEBUG logs, but if that is not possible, INFO at least. Error and warning level logs do not provide enough information. The period of at least +/- 10 minutes from when the issue occurred.

<!-- repo links -->

[iothubconnectionstring]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/javascript/iothubConnectionString.js
[migrationguide]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/migrationguide.md
[publisheventstospecificpartition]: https://github.com/Azure/azure-sdk-for-js/blob/3a2686448200fd2e961b6edaa3bc99557cd32093/sdk/eventhub/event-hubs/samples/v5/javascript/sendEventsToSpecificPartition.js
[publisheventswithazureidentity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/javascript/usingAadAuth.js
[publisheventswithwebsockets]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/javascript/websockets.js
[support]: https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md

<!-- docs.microsoft.com links -->

[error_condition_mapper_docs]: https://docs.microsoft.com/javascript/api/@azure/core-amqp/errornameconditionmapper
[messagingerror]: https://docs.microsoft.com/javascript/api/@azure/core-amqp/messagingerror
[amqptroubleshooting]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-amqp-troubleshoot
[authorizesas]: https://docs.microsoft.com/azure/event-hubs/authorize-access-shared-access-signature
[epoch]: https://docs.microsoft.com/azure/event-hubs/event-hubs-event-processor-host#epoch
[eventhubsipaddresses]: https://docs.microsoft.com/azure/event-hubs/troubleshooting-guide#what-ip-addresses-do-i-need-to-allow
[eventhubsmessagingexceptions]: https://docs.microsoft.com/azure/event-hubs/event-hubs-messaging-exceptions
[eventhubstroubleshooting]: https://docs.microsoft.com/azure/event-hubs/troubleshooting-guide
[getconnectionstring]: https://docs.microsoft.com/azure/event-hubs/event-hubs-get-connection-string
[ioteventhubendpoint]: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messages-read-builtin
[iothubsas]: https://docs.microsoft.com/azure/iot-hub/iot-hub-dev-guide-sas#security-tokens
[logging]: https://docs.microsoft.com/javascript/api/overview/azure/logger-readme
[troubleshoot_authentication_authorization]: https://docs.microsoft.com/azure/event-hubs/troubleshoot-authentication-authorization
[rbac_roles]: https://docs.microsoft.com/azure/event-hubs/authorize-access-azure-active-directory

<!-- external links -->

[authenticationandtheazuresdk]: https://devblogs.microsoft.com/azure-sdk/authentication-and-the-azure-sdk
[event_hubs_v2]: https://www.npmjs.com/package/@azure/event-hubs/v/2.0.0
[event_processor_host]: https://www.npmjs.com/package/@azure/event-processor-host
[amqpspec]: https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-types-v1.0-os.html
