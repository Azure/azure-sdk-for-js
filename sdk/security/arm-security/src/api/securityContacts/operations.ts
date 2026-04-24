// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type {
  AutomationsAPISecurityContact,
  AutomationsAPISecurityContactName,
  _AutomationsAPISecurityContactList,
} from "../../models/automationsAPI/models.js";
import {
  automationsAPISecurityContactSerializer,
  automationsAPISecurityContactDeserializer,
  _automationsAPISecurityContactListDeserializer,
} from "../../models/automationsAPI/models.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecurityContactsListOptionalParams,
  SecurityContactsDeleteOptionalParams,
  SecurityContactsCreateOptionalParams,
  SecurityContactsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SecurityContactsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/securityContacts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2023-12-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AutomationsAPISecurityContactList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _automationsAPISecurityContactListDeserializer(result.body);
}

/** List all security contact configurations for the subscription */
export function list(
  context: Client,
  options: SecurityContactsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AutomationsAPISecurityContact> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-12-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  securityContactName: AutomationsAPISecurityContactName,
  options: SecurityContactsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/securityContacts/{securityContactName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      securityContactName: securityContactName,
      "api%2Dversion": "2023-12-01-preview",
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
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete security contact configurations for the subscription */
export async function $delete(
  context: Client,
  securityContactName: AutomationsAPISecurityContactName,
  options: SecurityContactsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, securityContactName, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  securityContactName: AutomationsAPISecurityContactName,
  securityContact: AutomationsAPISecurityContact,
  options: SecurityContactsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/securityContacts/{securityContactName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      securityContactName: securityContactName,
      "api%2Dversion": "2023-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: automationsAPISecurityContactSerializer(securityContact),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<AutomationsAPISecurityContact> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return automationsAPISecurityContactDeserializer(result.body);
}

/** Create security contact configurations for the subscription */
export async function create(
  context: Client,
  securityContactName: AutomationsAPISecurityContactName,
  securityContact: AutomationsAPISecurityContact,
  options: SecurityContactsCreateOptionalParams = { requestOptions: {} },
): Promise<AutomationsAPISecurityContact> {
  const result = await _createSend(context, securityContactName, securityContact, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  securityContactName: AutomationsAPISecurityContactName,
  options: SecurityContactsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/securityContacts/{securityContactName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      securityContactName: securityContactName,
      "api%2Dversion": "2023-12-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AutomationsAPISecurityContact> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return automationsAPISecurityContactDeserializer(result.body);
}

/** Get Default Security contact configurations for the subscription */
export async function get(
  context: Client,
  securityContactName: AutomationsAPISecurityContactName,
  options: SecurityContactsGetOptionalParams = { requestOptions: {} },
): Promise<AutomationsAPISecurityContact> {
  const result = await _getSend(context, securityContactName, options);
  return _getDeserialize(result);
}
