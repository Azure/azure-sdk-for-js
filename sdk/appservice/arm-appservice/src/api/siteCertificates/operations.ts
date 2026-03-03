// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  Certificate,
  CertificatePatchResource,
  _CertificateCollection,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  certificateSerializer,
  certificateDeserializer,
  certificatePatchResourceSerializer,
  _certificateCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SiteCertificatesListSlotOptionalParams,
  SiteCertificatesDeleteSlotOptionalParams,
  SiteCertificatesUpdateSlotOptionalParams,
  SiteCertificatesCreateOrUpdateSlotOptionalParams,
  SiteCertificatesGetSlotOptionalParams,
  SiteCertificatesListOptionalParams,
  SiteCertificatesDeleteOptionalParams,
  SiteCertificatesUpdateOptionalParams,
  SiteCertificatesCreateOrUpdateOptionalParams,
  SiteCertificatesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: SiteCertificatesListSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/certificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_CertificateCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _certificateCollectionDeserializer(result.body);
}

/** Get all certificates in a resource group for a given site and a deployment slot. */
export function listSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: SiteCertificatesListSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Certificate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSlotSend(context, resourceGroupName, name, slot, options),
    _listSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  certificateName: string,
  options: SiteCertificatesDeleteSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a certificate for a given site and deployment slot. */
export async function deleteSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  certificateName: string,
  options: SiteCertificatesDeleteSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    certificateName,
    options,
  );
  return _deleteSlotDeserialize(result);
}

export function _updateSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  certificateName: string,
  certificateEnvelope: CertificatePatchResource,
  options: SiteCertificatesUpdateSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: certificatePatchResourceSerializer(certificateEnvelope),
  });
}

export async function _updateSlotDeserialize(result: PathUncheckedResponse): Promise<Certificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Create or update a certificate for a site and deployment slot. */
export async function updateSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  certificateName: string,
  certificateEnvelope: CertificatePatchResource,
  options: SiteCertificatesUpdateSlotOptionalParams = { requestOptions: {} },
): Promise<Certificate> {
  const result = await _updateSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    certificateName,
    certificateEnvelope,
    options,
  );
  return _updateSlotDeserialize(result);
}

export function _createOrUpdateSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  certificateName: string,
  certificateEnvelope: Certificate,
  options: SiteCertificatesCreateOrUpdateSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: certificateSerializer(certificateEnvelope),
  });
}

export async function _createOrUpdateSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<Certificate> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Create or update a certificate in a given site and deployment slot. */
export async function createOrUpdateSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  certificateName: string,
  certificateEnvelope: Certificate,
  options: SiteCertificatesCreateOrUpdateSlotOptionalParams = { requestOptions: {} },
): Promise<Certificate> {
  const result = await _createOrUpdateSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    certificateName,
    certificateEnvelope,
    options,
  );
  return _createOrUpdateSlotDeserialize(result);
}

export function _getSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  certificateName: string,
  options: SiteCertificatesGetSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getSlotDeserialize(result: PathUncheckedResponse): Promise<Certificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Get a certificate for a given site and deployment slot. */
export async function getSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  certificateName: string,
  options: SiteCertificatesGetSlotOptionalParams = { requestOptions: {} },
): Promise<Certificate> {
  const result = await _getSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    certificateName,
    options,
  );
  return _getSlotDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: SiteCertificatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/certificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
): Promise<_CertificateCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _certificateCollectionDeserializer(result.body);
}

/** Get all certificates in a resource group under a site. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: SiteCertificatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Certificate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, name, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  certificateName: string,
  options: SiteCertificatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a certificate from the site. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  certificateName: string,
  options: SiteCertificatesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, certificateName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  certificateName: string,
  certificateEnvelope: CertificatePatchResource,
  options: SiteCertificatesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: certificatePatchResourceSerializer(certificateEnvelope),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Certificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Create or update a certificate under a given site. */
export async function update(
  context: Client,
  resourceGroupName: string,
  name: string,
  certificateName: string,
  certificateEnvelope: CertificatePatchResource,
  options: SiteCertificatesUpdateOptionalParams = { requestOptions: {} },
): Promise<Certificate> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    name,
    certificateName,
    certificateEnvelope,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  certificateName: string,
  certificateEnvelope: Certificate,
  options: SiteCertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: certificateSerializer(certificateEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Certificate> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Create or update a certificate under a given site. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  certificateName: string,
  certificateEnvelope: Certificate,
  options: SiteCertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Certificate> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    name,
    certificateName,
    certificateEnvelope,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  certificateName: string,
  options: SiteCertificatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Certificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Get a certificate belonging to a given site. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  certificateName: string,
  options: SiteCertificatesGetOptionalParams = { requestOptions: {} },
): Promise<Certificate> {
  const result = await _getSend(context, resourceGroupName, name, certificateName, options);
  return _getDeserialize(result);
}
