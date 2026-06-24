// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext as Client } from "../index.js";
import {
  AttributeNamespace,
  attributeNamespaceDeserializer,
  AttributeNamespaceCreateRequest,
  attributeNamespaceCreateRequestSerializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AttributeNamespacesCreateOptionalParams,
  AttributeNamespacesDeleteOptionalParams,
  AttributeNamespacesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createSend(
  context: Client,
  attributeNamespace: string,
  parameters: AttributeNamespaceCreateRequest,
  options: AttributeNamespacesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/attributeNamespaces/{attributeNamespace}/action{?api%2Dversion}",
    {
      attributeNamespace: attributeNamespace,
      "api%2Dversion": "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attributeNamespaceCreateRequestSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<AttributeNamespace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return attributeNamespaceDeserializer(result.body);
}

/** Creates a new attribute namespace. */
export async function create(
  context: Client,
  attributeNamespace: string,
  parameters: AttributeNamespaceCreateRequest,
  options: AttributeNamespacesCreateOptionalParams = { requestOptions: {} },
): Promise<AttributeNamespace> {
  const result = await _createSend(context, attributeNamespace, parameters, options);
  return _createDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  attributeNamespace: string,
  options: AttributeNamespacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/attributeNamespaces/{attributeNamespace}{?api%2Dversion}",
    {
      attributeNamespace: attributeNamespace,
      "api%2Dversion": "2025-12-01-preview",
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
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified attribute namespace. */
export async function $delete(
  context: Client,
  attributeNamespace: string,
  options: AttributeNamespacesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, attributeNamespace, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  attributeNamespace: string,
  options: AttributeNamespacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/attributeNamespaces/{attributeNamespace}{?api%2Dversion}",
    {
      attributeNamespace: attributeNamespace,
      "api%2Dversion": "2025-12-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AttributeNamespace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return attributeNamespaceDeserializer(result.body);
}

/** Gets the specified attribute namespace. */
export async function get(
  context: Client,
  attributeNamespace: string,
  options: AttributeNamespacesGetOptionalParams = { requestOptions: {} },
): Promise<AttributeNamespace> {
  const result = await _getSend(context, attributeNamespace, options);
  return _getDeserialize(result);
}
