// // Copyright (c) Microsoft Corporation. All rights reserved.
// // Licensed under the MIT License.

// import { ServiceBusClientReceiverOptions } from "../receiverClient";

// import { NonSessionReceiverClient, SessionReceiverClient, TokenCredential } from "..";
// import { Session } from "./models";
// import { SubscriptionRuleManagement } from './receiverClient';

// export interface ReceiverClient {
//   // queue, service bus connection string
//   new (
//     serviceBusConnectionString: string,
//     queueName: string,
//     receiveMode?: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"PeekLock">;
//   new (
//     serviceBusConnectionString: string,
//     queueName: string,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"ReceiveAndDelete">;

//   // queue, service bus connection string, with sessions
//   new (
//     serviceBusConnectionString: string,
//     queueName: string,
//     session: Session,
//     receiveMode?: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"PeekLock">;
//   new (
//     serviceBusConnectionString: string,
//     queueName: string,
//     session: Session,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"ReceiveAndDelete">;

//   // queue, entity connection string, without sessions
//   new (
//     queueConnectionString: string,
//     receiveMode?: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"PeekLock">;
//   new (
//     queueConnectionString: string,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"ReceiveAndDelete">;

//   // queue, entity connection string, with sessions
//   new (
//     queueConnectionString: string,
//     session: Session,
//     receiveMode?: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): SessionReceiverClient<"PeekLock">;
//   new (
//     queueConnectionString: string,
//     session: Session,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): SessionReceiverClient<"ReceiveAndDelete">;

//   // queue, token credential
//   new (
//     hostName: string,
//     queueName: string,
//     tokenCredential: TokenCredential,
//     receiveMode: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"PeekLock">;
//   new (
//     hostName: string,
//     queueName: string,
//     tokenCredential: TokenCredential,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"ReceiveAndDelete">;

//   // queue, token credential, with sessions
//   new (
//     hostName: string,
//     queueName: string,
//     tokenCredential: TokenCredential,
//     session: Session,
//     receiveMode: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): SessionReceiverClient<"PeekLock">;
//   new (
//     hostName: string,
//     queueName: string,
//     tokenCredential: TokenCredential,
//     session: Session,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): SessionReceiverClient<"ReceiveAndDelete">;
// }

// export interface ReceiverClient {
//   // subscription, service bus connection string
//   new (
//     serviceBusConnectionString: string,
//     topicName: string,
//     subscriptionName: string,
//     receiveMode?: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"PeekLock"> & SubscriptionRuleManagement;
//   new (
//     serviceBusConnectionString: string,
//     topicName: string,
//     subscriptionName: string,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"ReceiveAndDelete"> & SubscriptionRuleManagement;

//   // subscription, service bus connection string, with sessions
//   new (
//     serviceBusConnectionString: string,
//     topicName: string,
//     subscriptionName: string,
//     session: Session,
//     receiveMode?: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"PeekLock"> & SubscriptionRuleManagement;
//   new (
//     serviceBusConnectionString: string,
//     topicName: string,
//     subscriptionName: string,
//     session: Session,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"ReceiveAndDelete"> & SubscriptionRuleManagement;

//   // subscription, entity connection string, without sessions
//   new (
//     topicConnectionString: string,
//     subscriptionName: string,
//     receiveMode?: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"PeekLock"> & SubscriptionRuleManagement;
//   new (
//     topicConnectionString: string,
//     subscriptionName: string,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"ReceiveAndDelete"> & SubscriptionRuleManagement;

//   // subscription, entity connection string, with sessions
//   new (
//     topicConnectionString: string,
//     subscriptionName: string,
//     session: Session,
//     receiveMode?: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): SessionReceiverClient<"PeekLock"> & SubscriptionRuleManagement;
//   new (
//     topicConnectionString: string,
//     subscriptionName: string,
//     session: Session,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): SessionReceiverClient<"ReceiveAndDelete"> & SubscriptionRuleManagement;

//   // subscription, token credential
//   new (
//     hostName: string,
//     topicName: string,
//     subscriptionName: string,
//     tokenCredential: TokenCredential,
//     receiveMode: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"PeekLock"> & SubscriptionRuleManagement;
//   new (
//     hostName: string,
//     topicName: string,
//     subscriptionName: string,
//     tokenCredential: TokenCredential,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): NonSessionReceiverClient<"ReceiveAndDelete"> & SubscriptionRuleManagement;

//   // subscription, token credential, with sessions
//   new (
//     hostName: string,
//     topicName: string,
//     subscriptionName: string,
//     tokenCredential: TokenCredential,
//     session: Session,
//     receiveMode: "PeekLock",
//     options?: ServiceBusClientReceiverOptions
//   ): SessionReceiverClient<"PeekLock"> & SubscriptionRuleManagement;
//   new (
//     hostName: string,
//     topicName: string,
//     subscriptionName: string,
//     tokenCredential: TokenCredential,
//     session: Session,
//     receiveMode: "ReceiveAndDelete",
//     options?: ServiceBusClientReceiverOptions
//   ): SessionReceiverClient<"ReceiveAndDelete"> & SubscriptionRuleManagement;
// }
