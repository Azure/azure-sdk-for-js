// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext as Client } from "../index.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  ListAccessRequestModel,
  listAccessRequestModelSerializer,
  AccessListUsersSuccessResponse,
  accessListUsersSuccessResponseDeserializer,
  AccessListServiceAccountsSuccessResponse,
  accessListServiceAccountsSuccessResponseDeserializer,
  AccessListInvitationsSuccessResponse,
  accessListInvitationsSuccessResponseDeserializer,
  InvitationRecord,
  invitationRecordDeserializer,
  AccessInviteUserAccountModel,
  accessInviteUserAccountModelSerializer,
  AccessListEnvironmentsSuccessResponse,
  accessListEnvironmentsSuccessResponseDeserializer,
  AccessListClusterSuccessResponse,
  accessListClusterSuccessResponseDeserializer,
  AccessListRoleBindingsSuccessResponse,
  accessListRoleBindingsSuccessResponseDeserializer,
  RoleBindingRecord,
  roleBindingRecordDeserializer,
  AccessCreateRoleBindingRequestModel,
  accessCreateRoleBindingRequestModelSerializer,
  AccessRoleBindingNameListSuccessResponse,
  accessRoleBindingNameListSuccessResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listRoleBindingNameListSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListRoleBindingNameListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listRoleBindingNameList{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: listAccessRequestModelSerializer(body),
  });
}

export async function _listRoleBindingNameListDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessRoleBindingNameListSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return accessRoleBindingNameListSuccessResponseDeserializer(result.body);
}

/** Organization role bindings */
export async function listRoleBindingNameList(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListRoleBindingNameListOptionalParams = { requestOptions: {} },
): Promise<AccessRoleBindingNameListSuccessResponse> {
  const result = await _listRoleBindingNameListSend(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _listRoleBindingNameListDeserialize(result);
}

export function _createRoleBindingSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: AccessCreateRoleBindingRequestModel,
  options: AccessCreateRoleBindingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/createRoleBinding{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: accessCreateRoleBindingRequestModelSerializer(body),
  });
}

export async function _createRoleBindingDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleBindingRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return roleBindingRecordDeserializer(result.body);
}

/** Organization role bindings */
export async function createRoleBinding(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: AccessCreateRoleBindingRequestModel,
  options: AccessCreateRoleBindingOptionalParams = { requestOptions: {} },
): Promise<RoleBindingRecord> {
  const result = await _createRoleBindingSend(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _createRoleBindingDeserialize(result);
}

export function _listRoleBindingsSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListRoleBindingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listRoleBindings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: listAccessRequestModelSerializer(body),
  });
}

export async function _listRoleBindingsDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessListRoleBindingsSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return accessListRoleBindingsSuccessResponseDeserializer(result.body);
}

/** Organization role bindings */
export async function listRoleBindings(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListRoleBindingsOptionalParams = { requestOptions: {} },
): Promise<AccessListRoleBindingsSuccessResponse> {
  const result = await _listRoleBindingsSend(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _listRoleBindingsDeserialize(result);
}

export function _listClustersSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListClustersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: listAccessRequestModelSerializer(body),
  });
}

export async function _listClustersDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessListClusterSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return accessListClusterSuccessResponseDeserializer(result.body);
}

/** Cluster details */
export async function listClusters(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListClustersOptionalParams = { requestOptions: {} },
): Promise<AccessListClusterSuccessResponse> {
  const result = await _listClustersSend(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _listClustersDeserialize(result);
}

export function _listEnvironmentsSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListEnvironmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listEnvironments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: listAccessRequestModelSerializer(body),
  });
}

export async function _listEnvironmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessListEnvironmentsSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return accessListEnvironmentsSuccessResponseDeserializer(result.body);
}

/** Environment list of an organization */
export async function listEnvironments(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListEnvironmentsOptionalParams = { requestOptions: {} },
): Promise<AccessListEnvironmentsSuccessResponse> {
  const result = await _listEnvironmentsSend(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _listEnvironmentsDeserialize(result);
}

export function _inviteUserSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: AccessInviteUserAccountModel,
  options: AccessInviteUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/createInvitation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: accessInviteUserAccountModelSerializer(body),
  });
}

export async function _inviteUserDeserialize(
  result: PathUncheckedResponse,
): Promise<InvitationRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return invitationRecordDeserializer(result.body);
}

/** Invite user to the organization */
export async function inviteUser(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: AccessInviteUserAccountModel,
  options: AccessInviteUserOptionalParams = { requestOptions: {} },
): Promise<InvitationRecord> {
  const result = await _inviteUserSend(context, resourceGroupName, organizationName, body, options);
  return _inviteUserDeserialize(result);
}

export function _listInvitationsSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListInvitationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listInvitations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: listAccessRequestModelSerializer(body),
  });
}

export async function _listInvitationsDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessListInvitationsSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return accessListInvitationsSuccessResponseDeserializer(result.body);
}

/** Organization accounts invitation details */
export async function listInvitations(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListInvitationsOptionalParams = { requestOptions: {} },
): Promise<AccessListInvitationsSuccessResponse> {
  const result = await _listInvitationsSend(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _listInvitationsDeserialize(result);
}

export function _listServiceAccountsSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListServiceAccountsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listServiceAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: listAccessRequestModelSerializer(body),
  });
}

export async function _listServiceAccountsDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessListServiceAccountsSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return accessListServiceAccountsSuccessResponseDeserializer(result.body);
}

/** Organization service accounts details */
export async function listServiceAccounts(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListServiceAccountsOptionalParams = { requestOptions: {} },
): Promise<AccessListServiceAccountsSuccessResponse> {
  const result = await _listServiceAccountsSend(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _listServiceAccountsDeserialize(result);
}

export function _listUsersSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListUsersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listUsers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: listAccessRequestModelSerializer(body),
  });
}

export async function _listUsersDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessListUsersSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return accessListUsersSuccessResponseDeserializer(result.body);
}

/** Organization users details */
export async function listUsers(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: AccessListUsersOptionalParams = { requestOptions: {} },
): Promise<AccessListUsersSuccessResponse> {
  const result = await _listUsersSend(context, resourceGroupName, organizationName, body, options);
  return _listUsersDeserialize(result);
}

export function _deleteRoleBindingSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  roleBindingId: string,
  options: AccessDeleteRoleBindingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/deleteRoleBinding/{roleBindingId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      roleBindingId: roleBindingId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteRoleBindingDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Organization role bindings */
export async function deleteRoleBinding(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  roleBindingId: string,
  options: AccessDeleteRoleBindingOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteRoleBindingSend(
    context,
    resourceGroupName,
    organizationName,
    roleBindingId,
    options,
  );
  return _deleteRoleBindingDeserialize(result);
}
