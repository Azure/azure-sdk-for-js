// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  sync,
  handleApprovalDeletion,
  handleApprovalCreation,
  listBySubscription,
  listByCommunityResource,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  CommunityEndpointsSyncOptionalParams,
  CommunityEndpointsHandleApprovalDeletionOptionalParams,
  CommunityEndpointsHandleApprovalCreationOptionalParams,
  CommunityEndpointsListBySubscriptionOptionalParams,
  CommunityEndpointsListByCommunityResourceOptionalParams,
  CommunityEndpointsDeleteOptionalParams,
  CommunityEndpointsUpdateOptionalParams,
  CommunityEndpointsCreateOrUpdateOptionalParams,
  CommunityEndpointsGetOptionalParams,
} from "./options.js";
