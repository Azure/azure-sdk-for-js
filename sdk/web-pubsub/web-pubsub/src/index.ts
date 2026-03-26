// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export { AzureKeyCredential } from "@azure/core-auth";
export {
  WebPubSubServiceClient,
  type HubSendToAllOptions,
  type ClientTokenResponse,
  type HubCloseConnectionOptions,
  type HubCloseAllConnectionsOptions,
  type HubCloseUserConnectionsOptions,
  type GenerateClientTokenOptions,
  type HasConnectionOptions,
  type HubHasGroupOptions,
  type HubHasUserOptions,
  type WebPubSubServiceClientOptions,
  type WebPubSubServiceClientLogOptions,
  type HubRemoveUserFromAllGroupsOptions,
  type HubSendToConnectionOptions,
  type HubSendToUserOptions,
  type HubGrantPermissionOptions,
  type HubRevokePermissionOptions,
  type HubHasPermissionOptions,
  type HubSendTextToAllOptions,
  type HubSendTextToConnectionOptions,
  type HubSendTextToUserOptions,
  type JSONTypes,
  type Permission,
  type WebPubSubClientProtocol,
} from "./hubClient.js";
export type {
  WebPubSubGroup,
  GroupAddConnectionOptions,
  GroupCloseAllConnectionsOptions,
  GroupAddUserOptions,
  GroupAdminClientOptions,
  GroupHasUserOptions,
  GroupRemoveConnectionOptions,
  GroupRemoveUserOptions,
  GroupSendTextToAllOptions,
  GroupSendToAllOptions,
  WebPubSubGroupMember,
  GroupListConnectionsOptions,
} from "./groupClient.js";
export { odata } from "./utils.js";
export type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
