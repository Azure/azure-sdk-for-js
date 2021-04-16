// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export { AzureKeyCredential } from "@azure/core-auth";
export {
  WebPubSubServiceClient,
  GetAuthenticationTokenOptions,
  GetAuthenticationTokenResponse,
  HubSendToAllOptions,
  CloseConnectionOptions,
  HasConnectionOptions,
  HubHasGroupOptions,
  HubHasUserOptions,
  HubAdminClientOptions,
  HubRemoveUserFromAllGroupsOptions,
  HubSendToConnectionOptions,
  HubSendToUserOptions
} from "./hubClient";
export {
  WebPubSubGroup,
  GroupAddConnectionOptions,
  GroupAddUserOptions,
  GroupAdminClientOptions,
  GroupHasUserOptions,
  GroupRemoveConnectionOptions,
  GroupRemoveUserOptions
} from "./groupClient";
