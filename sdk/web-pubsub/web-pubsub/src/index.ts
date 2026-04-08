// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WebPubSubServiceClient } from "./webPubSubServiceClient.js";
export type {
  AddToGroupsRequest,
  ClientTokenResponse,
  RemoveFromGroupsRequest,
  GroupMember,
  WebPubSubClientType,
  ResponseContentType,
  MessageContentType,
  WebPubSubPermission,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type {
  AddUserToGroupOptionalParams,
  RemoveUserFromGroupOptionalParams,
  RemoveUserFromAllGroupsOptionalParams,
  SendToUserOptionalParams,
  CloseUserConnectionsOptionalParams,
  UserExistsOptionalParams,
  GrantPermissionOptionalParams,
  CheckPermissionOptionalParams,
  RevokePermissionOptionalParams,
  AddConnectionToGroupOptionalParams,
  RemoveConnectionFromGroupOptionalParams,
  ListConnectionsInGroupOptionalParams,
  SendToGroupOptionalParams,
  CloseGroupConnectionsOptionalParams,
  GroupExistsOptionalParams,
  RemoveConnectionFromAllGroupsOptionalParams,
  SendToConnectionOptionalParams,
  ConnectionExistsOptionalParams,
  CloseConnectionOptionalParams,
  SendToAllOptionalParams,
  RemoveConnectionsFromGroupsOptionalParams,
  GenerateClientTokenOptionalParams,
  CloseAllConnectionsOptionalParams,
  AddConnectionsToGroupsOptionalParams,
  GetServiceStatusOptionalParams,
  WebPubSubServiceClientOptionalParams,
} from "./api/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
