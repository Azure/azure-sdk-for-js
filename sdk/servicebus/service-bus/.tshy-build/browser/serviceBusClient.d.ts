import type { TokenCredential, NamedKeyCredential, SASCredential } from "@azure/core-auth";
import type { ServiceBusClientOptions } from "./constructorHelpers.js";
import type { ServiceBusReceiverOptions, ServiceBusSessionReceiverOptions, ReceiveMode, ServiceBusSenderOptions } from "./models.js";
import type { ServiceBusReceiver } from "./receivers/receiver.js";
import type { ServiceBusSessionReceiver } from "./receivers/sessionReceiver.js";
import type { ServiceBusRuleManager } from "./serviceBusRuleManager.js";
import type { ServiceBusSender } from "./sender.js";
/**
 * A client that can create Sender instances for sending messages to queues and
 * topics as well as Receiver instances to receive messages from queues and subscriptions.
 */
export declare class ServiceBusClient {
    private _connectionContext;
    private _clientOptions;
    /**
     * The fully qualified namespace of the Service Bus instance for which this client is created.
     * This is likely to be similar to <yournamespace>.servicebus.windows.net.
     */
    fullyQualifiedNamespace: string;
    /**
     * The name used to identify this ServiceBusClient.
     * If not specified or empty, a random unique one will be generated.
     */
    identifier: string;
    /**
     * Creates an instance of the ServiceBusClient class which can be used to create senders and receivers to
     * the Azure Service Bus namespace provided in the connection string. No connection is made to the service
     * until the senders/receivers created with the client are used to send/receive messages.
     * @param connectionString - A connection string for Azure Service Bus namespace.
     * NOTE: this connection string can contain an EntityPath, which is ignored.
     * @param options - Options for the service bus client.
     */
    constructor(connectionString: string, options?: ServiceBusClientOptions);
    /**
     * Creates an instance of the ServiceBusClient class which can be used to create senders and receivers to
     * the Azure Service Bus namespace provided. No connection is made to the service until
     * the senders/receivers created with the client are used to send/receive messages.
     * @param fullyQualifiedNamespace - The full namespace of your Service Bus instance which is
     * likely to be similar to <yournamespace>.servicebus.windows.net.
     * @param credential - A credential object used by the client to get the token to authenticate the connection
     * with the Azure Service Bus. See &commat;azure/identity for creating the credentials.
     * If you're using an own implementation of the `TokenCredential` interface against AAD, then set the "scopes" for service-bus
     * to be `["https://servicebus.azure.net//user_impersonation"]` to get the appropriate token.
     * Use the `AzureNamedKeyCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessKeyName`
     * and `SharedAccessKey` without using a connection string. These fields map to the `name` and `key` field respectively
     * in `AzureNamedKeyCredential`.
     * Use the `AzureSASCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessSignature`
     * without using a connection string. This field maps to `signature` in `AzureSASCredential`.
     * @param options - A set of options to apply when configuring the client.
     * - `retryOptions`   : Configures the retry policy for all the operations on the client.
     * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
     * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
     */
    constructor(fullyQualifiedNamespace: string, credential: TokenCredential | NamedKeyCredential | SASCredential, options?: ServiceBusClientOptions);
    /**
     * Creates a receiver for an Azure Service Bus queue. No connection is made
     * to the service until one of the methods on the receiver is called.
     *
     * To target sub queues like the dead letter queue or the transfer dead letter queue, provide the
     * `subQueue` in the options. To learn more about dead letter queues, see
     * https://learn.microsoft.com/azure/service-bus-messaging/service-bus-dead-letter-queues
     *
     * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
     * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
     * queue.
     * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
     *
     * Messages that are not settled within the lock duration will be redelivered as many times as
     * the max delivery count set on the queue, after which they get sent to a separate dead letter
     * queue.
     *
     * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
     * deadletterMessage() methods on the receiver.
     *
     * More information about how peekLock and message settlement works here:
     * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
     *
     * @param queueName - The name of the queue to receive from.
     * @param options - Options to pass the receiveMode, defaulted to peekLock.
     * @returns A receiver that can be used to receive, peek and settle messages.
     */
    createReceiver(queueName: string, options?: ServiceBusReceiverOptions): ServiceBusReceiver;
    /**
     * Creates a receiver for an Azure Service Bus subscription. No connection is made
     * to the service until one of the methods on the receiver is called.
     *
     * To target sub queues like the dead letter queue or the transfer dead letter queue, provide the
     * `subQueue` in the options. To learn more about dead letter queues, see
     * https://learn.microsoft.com/azure/service-bus-messaging/service-bus-dead-letter-queues
     *
     * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
     * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
     * queue.
     * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
     *
     * Messages that are not settled within the lock duration will be redelivered as many times as
     * the max delivery count set on the subscription, after which they get sent to a separate dead letter
     * queue.
     *
     * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
     * deadletterMessage() methods on the receiver.
     *
     * More information about how peekLock and message settlement works here:
     * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
     *
     * @param topicName - Name of the topic for the subscription we want to receive from.
     * @param subscriptionName - Name of the subscription (under the `topic`) that we want to receive from.
     * @param options - Options to pass the receiveMode, defaulted to peekLock.
     * @returns A receiver that can be used to receive, peek and settle messages.
     */
    createReceiver(topicName: string, subscriptionName: string, options?: ServiceBusReceiverOptions): ServiceBusReceiver;
    /**
     * Creates an instance of {@link ServiceBusRuleManager} that is used to manage
     * the rules for a subscription.
     *
     * @param topicName - the topic to create {@link ServiceBusRuleManager}
     * @param subscriptionName - the subscription specific to the specified topic to create a {@link ServiceBusRuleManager} for.
     * @returns a {@link ServiceBusRuleManager} scoped to the specified subscription and topic.
     */
    createRuleManager(topicName: string, subscriptionName: string): ServiceBusRuleManager;
    /**
     * Creates a receiver for a session enabled Azure Service Bus queue.
     *
     * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
     * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
     * queue.
     * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
     *
     * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
     * deadletterMessage() methods on the receiver.
     *
     * More information about how peekLock and message settlement works here:
     * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
     *
     * @param queueName - The name of the queue to receive from.
     * @param sessionId - The id of the session from which messages need to be received
     * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
     * @returns A receiver that can be used to receive, peek and settle messages.
     */
    acceptSession(queueName: string, sessionId: string, options?: ServiceBusSessionReceiverOptions): Promise<ServiceBusSessionReceiver>;
    /**
     * Creates a receiver for a session enabled Azure Service Bus subscription.
     *
     * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
     * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
     * queue.
     * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
     *
     * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
     * deadletterMessage() methods on the receiver.
     *
     * More information about how peekLock and message settlement works here:
     * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
     *
     * @param topicName - Name of the topic for the subscription we want to receive from.
     * @param subscriptionName - Name of the subscription (under the `topic`) that we want to receive from.
     * @param sessionId - The id of the session from which messages need to be received
     * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
     * @returns A receiver that can be used to receive, peek and settle messages.
     */
    acceptSession(topicName: string, subscriptionName: string, sessionId: string, options?: ServiceBusSessionReceiverOptions): Promise<ServiceBusSessionReceiver>;
    /**
     * Creates a receiver for the next available session in a session-enabled Azure Service Bus queue.
     *
     * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
     * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
     * queue.
     * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
     *
     * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
     * deadletterMessage() methods on the receiver.
     *
     * More information about how peekLock and message settlement works here:
     * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
     *
     * @param queueName - The name of the queue to receive from.
     * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
     * @returns A receiver that can be used to receive, peek and settle messages.
     */
    acceptNextSession(queueName: string, options?: ServiceBusSessionReceiverOptions): Promise<ServiceBusSessionReceiver>;
    /**
     * Creates a receiver for the next available session in a session-enabled Azure Service Bus subscription.
     *
     * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
     * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
     * queue.
     * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
     *
     * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
     * deadletterMessage() methods on the receiver.
     *
     * More information about how peekLock and message settlement works here:
     * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
     *
     * @param topicName - Name of the topic for the subscription we want to receive from.
     * @param subscriptionName - Name of the subscription (under the `topic`) that we want to receive from.
     * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
     * @returns A receiver that can be used to receive, peek and settle messages.
     */
    acceptNextSession(topicName: string, subscriptionName: string, options?: ServiceBusSessionReceiverOptions): Promise<ServiceBusSessionReceiver>;
    /**
     * Creates a Sender which can be used to send messages, schedule messages to be
     * sent at a later time and cancel such scheduled messages. No connection is made
     * to the service until one of the methods on the sender is called.
     * @param queueOrTopicName - The name of a queue or topic to send messages to.
     */
    createSender(queueOrTopicName: string, options?: ServiceBusSenderOptions): ServiceBusSender;
    /**
     * Closes the underlying AMQP connection.
     * NOTE: this will also disconnect any Receiver or Sender instances created from this
     * instance.
     */
    close(): Promise<void>;
}
/**
 * Helper to validate and extract the common arguments from both the create*Receiver() overloads that
 * have this pattern:
 *
 * queue, options
 * topic, subscription, options
 *
 * @internal
 */
export declare function extractReceiverArguments<OptionsT extends {
    receiveMode?: ReceiveMode;
}>(queueOrTopicName1: string, optionsOrSubscriptionName2: string | OptionsT | undefined, definitelyOptions3?: OptionsT): {
    entityPath: string;
    receiveMode: ReceiveMode;
    options?: Omit<OptionsT, "receiveMode">;
};
//# sourceMappingURL=serviceBusClient.d.ts.map