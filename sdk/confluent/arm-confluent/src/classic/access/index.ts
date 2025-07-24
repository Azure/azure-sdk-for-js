// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import {
  listRoleBindingNameList,
  createRoleBinding,
  listRoleBindings,
  listClusters,
  listEnvironments,
  inviteUser,
  listInvitations,
  listServiceAccounts,
  listUsers,
  deleteRoleBinding,
} from "../../api/access/operations.js";
import {
  AccessListRoleBindingNameListOptionalParams,
  AccessCreateRoleBindingOptionalParams,
  AccessListRoleBindingsOptionalParams,
  AccessListClustersOptionalParams,
  AccessListEnvironmentsOptionalParams,
  AccessInviteUserOptionalParams,
  AccessListInvitationsOptionalParams,
  AccessListServiceAccountsOptionalParams,
  AccessListUsersOptionalParams,
  AccessDeleteRoleBindingOptionalParams,
} from "../../api/access/options.js";
import {
  ListAccessRequestModel,
  AccessListUsersSuccessResponse,
  AccessListServiceAccountsSuccessResponse,
  AccessListInvitationsSuccessResponse,
  InvitationRecord,
  AccessInviteUserAccountModel,
  AccessListEnvironmentsSuccessResponse,
  AccessListClusterSuccessResponse,
  AccessListRoleBindingsSuccessResponse,
  RoleBindingRecord,
  AccessCreateRoleBindingRequestModel,
  AccessRoleBindingNameListSuccessResponse,
} from "../../models/models.js";

/** Interface representing a Access operations. */
export interface AccessOperations {
  /** Organization role bindings */
  listRoleBindingNameList: (
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListRoleBindingNameListOptionalParams,
  ) => Promise<AccessRoleBindingNameListSuccessResponse>;
  /** Organization role bindings */
  createRoleBinding: (
    resourceGroupName: string,
    organizationName: string,
    body: AccessCreateRoleBindingRequestModel,
    options?: AccessCreateRoleBindingOptionalParams,
  ) => Promise<RoleBindingRecord>;
  /** Organization role bindings */
  listRoleBindings: (
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListRoleBindingsOptionalParams,
  ) => Promise<AccessListRoleBindingsSuccessResponse>;
  /** Cluster details */
  listClusters: (
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListClustersOptionalParams,
  ) => Promise<AccessListClusterSuccessResponse>;
  /** Environment list of an organization */
  listEnvironments: (
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListEnvironmentsOptionalParams,
  ) => Promise<AccessListEnvironmentsSuccessResponse>;
  /** Invite user to the organization */
  inviteUser: (
    resourceGroupName: string,
    organizationName: string,
    body: AccessInviteUserAccountModel,
    options?: AccessInviteUserOptionalParams,
  ) => Promise<InvitationRecord>;
  /** Organization accounts invitation details */
  listInvitations: (
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListInvitationsOptionalParams,
  ) => Promise<AccessListInvitationsSuccessResponse>;
  /** Organization service accounts details */
  listServiceAccounts: (
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListServiceAccountsOptionalParams,
  ) => Promise<AccessListServiceAccountsSuccessResponse>;
  /** Organization users details */
  listUsers: (
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: AccessListUsersOptionalParams,
  ) => Promise<AccessListUsersSuccessResponse>;
  /** Organization role bindings */
  deleteRoleBinding: (
    resourceGroupName: string,
    organizationName: string,
    roleBindingId: string,
    options?: AccessDeleteRoleBindingOptionalParams,
  ) => Promise<void>;
}

function _getAccess(context: ConfluentManagementContext) {
  return {
    listRoleBindingNameList: (
      resourceGroupName: string,
      organizationName: string,
      body: ListAccessRequestModel,
      options?: AccessListRoleBindingNameListOptionalParams,
    ) => listRoleBindingNameList(context, resourceGroupName, organizationName, body, options),
    createRoleBinding: (
      resourceGroupName: string,
      organizationName: string,
      body: AccessCreateRoleBindingRequestModel,
      options?: AccessCreateRoleBindingOptionalParams,
    ) => createRoleBinding(context, resourceGroupName, organizationName, body, options),
    listRoleBindings: (
      resourceGroupName: string,
      organizationName: string,
      body: ListAccessRequestModel,
      options?: AccessListRoleBindingsOptionalParams,
    ) => listRoleBindings(context, resourceGroupName, organizationName, body, options),
    listClusters: (
      resourceGroupName: string,
      organizationName: string,
      body: ListAccessRequestModel,
      options?: AccessListClustersOptionalParams,
    ) => listClusters(context, resourceGroupName, organizationName, body, options),
    listEnvironments: (
      resourceGroupName: string,
      organizationName: string,
      body: ListAccessRequestModel,
      options?: AccessListEnvironmentsOptionalParams,
    ) => listEnvironments(context, resourceGroupName, organizationName, body, options),
    inviteUser: (
      resourceGroupName: string,
      organizationName: string,
      body: AccessInviteUserAccountModel,
      options?: AccessInviteUserOptionalParams,
    ) => inviteUser(context, resourceGroupName, organizationName, body, options),
    listInvitations: (
      resourceGroupName: string,
      organizationName: string,
      body: ListAccessRequestModel,
      options?: AccessListInvitationsOptionalParams,
    ) => listInvitations(context, resourceGroupName, organizationName, body, options),
    listServiceAccounts: (
      resourceGroupName: string,
      organizationName: string,
      body: ListAccessRequestModel,
      options?: AccessListServiceAccountsOptionalParams,
    ) => listServiceAccounts(context, resourceGroupName, organizationName, body, options),
    listUsers: (
      resourceGroupName: string,
      organizationName: string,
      body: ListAccessRequestModel,
      options?: AccessListUsersOptionalParams,
    ) => listUsers(context, resourceGroupName, organizationName, body, options),
    deleteRoleBinding: (
      resourceGroupName: string,
      organizationName: string,
      roleBindingId: string,
      options?: AccessDeleteRoleBindingOptionalParams,
    ) => deleteRoleBinding(context, resourceGroupName, organizationName, roleBindingId, options),
  };
}

export function _getAccessOperations(context: ConfluentManagementContext): AccessOperations {
  return {
    ..._getAccess(context),
  };
}
