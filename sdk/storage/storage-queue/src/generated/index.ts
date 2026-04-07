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
  GeoReplicationStatus,
  KeyInfo,
  UserDelegationKey,
  ListQueuesResponse,
  QueueItem,
  SignedIdentifiers,
  SignedIdentifier,
  AccessPolicy,
  ReceivedMessages,
  ReceivedMessage,
  QueueMessage,
  ListOfSentMessage,
  SentMessage,
  PeekedMessages,
  PeekedMessage,
  ListQueuesIncludeType,
} from "./models/azure/storage/queues/index.js";
export { KnownVersions } from "./models/azure/storage/queues/index.js";
export type { QueuesClientOptionalParams } from "./api/index.js";
export type {
  QueueDeleteMessageOptionalParams,
  QueueUpdateMessageOptionalParams,
  QueuePeekMessagesOptionalParams,
  QueueSendMessageOptionalParams,
  QueueClearOptionalParams,
  QueueReceiveMessagesOptionalParams,
  QueueSetAccessPolicyOptionalParams,
  QueueGetAccessPolicyOptionalParams,
  QueueSetMetadataOptionalParams,
  QueueDeleteOptionalParams,
  QueueGetPropertiesOptionalParams,
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
