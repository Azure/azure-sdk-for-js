// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { QueuesClient } from "./queuesClient.js";
export type {
  QueueServiceProperties,
  Logging,
  RetentionPolicy,
  Metrics,
  CorsRule,
  ErrorModel,
  StorageErrorCode,
  QueueServiceStats,
  GeoReplication,
  GeoReplicationStatusType,
  KeyInfo,
  UserDelegationKey,
  ListQueuesResponse,
  QueueItem,
  SignedIdentifiers,
  SignedIdentifier,
  AccessPolicy,
  ListOfReceivedMessage,
  ReceivedMessage,
  QueueMessage,
  ListOfSentMessage,
  SentMessage,
  ListOfPeekedMessage,
  PeekedMessage,
  ListQueuesIncludeType,
} from "./models/azure/storage/queues/index.js";
export { KnownVersions } from "./models/azure/storage/queues/index.js";
export type { QueuesClientOptionalParams } from "./api/index.js";
export type {
  QueueDeleteMessageOptionalParams,
  QueueUpdateOptionalParams,
  QueuePeekMessagesOptionalParams,
  QueueSendMessageOptionalParams,
  QueueClearOptionalParams,
  QueueReceiveMessagesOptionalParams,
  QueueSetAccessPolicyOptionalParams,
  QueueGetAccessPolicyOptionalParams,
  QueueSetMetadataOptionalParams,
  QueueDeleteOptionalParams,
  QueueGetMetadataOptionalParams,
  QueueCreateOptionalParams,
} from "./api/queue/index.js";
export type {
  ServiceGetQueuesOptionalParams,
  ServiceGetUserDelegationKeyOptionalParams,
  ServiceGetStatisticsOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "./api/service/index.js";
export type { QueueOperations, ServiceOperations } from "./classic/index.js";
