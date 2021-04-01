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
  HubIsServiceHealthyOptions,
  HubRemoveUserFromAllGroupsOptions,
  HubSendToConnectionOptions,
  HubSendToUserOptions
} from "./hubClient";
export {
  WebPubsubGroup,
  GroupAddConnectionOptions,
  GroupAddUserOptions,
  GroupAdminClientOptions,
  GroupHasUserOptions,
  GroupRemoveConnectionOptions,
  GroupRemoveUserOptions
} from "./groupClient";
