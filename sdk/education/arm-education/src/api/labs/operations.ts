// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext as Client } from "../index.js";
import {
  errorResponseBodyDeserializer,
  LabDetails,
  labDetailsSerializer,
  labDetailsDeserializer,
  _LabListResult,
  _labListResultDeserializer,
  InviteCodeGenerateRequest,
  inviteCodeGenerateRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  LabsGenerateInviteCodeOptionalParams,
  LabsListAllOptionalParams,
  LabsListOptionalParams,
  LabsDeleteOptionalParams,
  LabsCreateOrUpdateOptionalParams,
  LabsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _generateInviteCodeSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: InviteCodeGenerateRequest,
  options: LabsGenerateInviteCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default/generateInviteCode{?api%2Dversion,onlyUpdateStudentCountParameter}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
      onlyUpdateStudentCountParameter: options?.onlyUpdateStudentCountParameter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: inviteCodeGenerateRequestSerializer(parameters),
  });
}

export async function _generateInviteCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<LabDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return labDetailsDeserializer(result.body);
}

/** Generate invite code for a lab */
export async function generateInviteCode(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: InviteCodeGenerateRequest,
  options: LabsGenerateInviteCodeOptionalParams = { requestOptions: {} },
): Promise<LabDetails> {
  const result = await _generateInviteCodeSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    parameters,
    options,
  );
  return _generateInviteCodeDeserialize(result);
}

export function _listAllSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: LabsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/providers/Microsoft.Education/labs{?api%2Dversion,includeBudget,includeDeleted}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
      includeBudget: options?.includeBudget,
      includeDeleted: options?.includeDeleted,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAllDeserialize(result: PathUncheckedResponse): Promise<_LabListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return _labListResultDeserializer(result.body);
}

/** Get a list of labs associated with the provided billing account name and billing profile name. */
export function listAll(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: LabsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LabDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, billingAccountName, billingProfileName, options),
    _listAllDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-12-01-preview",
    },
  );
}

export function _listSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: LabsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs{?api%2Dversion,includeBudget}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
      includeBudget: options?.includeBudget,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_LabListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return _labListResultDeserializer(result.body);
}

/** Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. */
export function list(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: LabsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LabDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, billingAccountName, billingProfileName, invoiceSectionName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-12-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: LabsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a specific lab associated with the provided billing account name, billing profile name, and invoice section name. Note all students must be removed from the lab in order to delete the lab. */
export async function $delete(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: LabsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: LabDetails,
  options: LabsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: labDetailsSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LabDetails> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return labDetailsDeserializer(result.body);
}

/** Create a new lab or update a previously created lab. */
export async function createOrUpdate(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: LabDetails,
  options: LabsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<LabDetails> {
  const result = await _createOrUpdateSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: LabsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default{?api%2Dversion,includeBudget}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
      includeBudget: options?.includeBudget,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LabDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return labDetailsDeserializer(result.body);
}

/** Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. */
export async function get(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: LabsGetOptionalParams = { requestOptions: {} },
): Promise<LabDetails> {
  const result = await _getSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    options,
  );
  return _getDeserialize(result);
}
