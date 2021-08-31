// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export { AzureKeyCredential } from "@azure/core-auth";
export {
  WebPubSubServiceClient,
  GetAuthenticationTokenOptions,
  GetAuthenticationTokenResponse,
  HubSendToAllOptions,
  CloseConnectionOptions,
  GenerateClientTokenOptions,
  HasConnectionOptions,
  HubHasGroupOptions,
  HubHasUserOptions,
  WebPubSubServiceClientOptions as HubAdminClientOptions,
  HubRemoveUserFromAllGroupsOptions,
  HubSendToConnectionOptions,
  HubSendToUserOptions,
  HubGrantPermissionOptions,
  HubRevokePermissionOptions,
  HubHasPermissionOptions,
  HubSendTextToAllOptions,
  HubSendTextToConnectionOptions,
  HubSendTextToUserOptions,
  JSONTypes,
  Permission
} from "./hubClient";
export {
  WebPubSubGroup,
  GroupAddConnectionOptions,
  GroupAddUserOptions,
  GroupAdminClientOptions,
  GroupHasUserOptions,
  GroupRemoveConnectionOptions,
  GroupRemoveUserOptions,
  GroupSendTextToAllOptions,
  GroupSendToAllOptions
} from "./groupClient";
