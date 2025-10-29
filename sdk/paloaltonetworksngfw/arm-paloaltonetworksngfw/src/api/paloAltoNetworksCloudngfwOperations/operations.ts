// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  ProductSerialNumberRequestStatus,
  CloudManagerTenantList,
  ProductSerialNumberStatus,
  SupportInfoModel,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  productSerialNumberRequestStatusDeserializer,
  cloudManagerTenantListDeserializer,
  productSerialNumberStatusDeserializer,
  supportInfoModelDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PaloAltoNetworksCloudngfwOperationsListSupportInfoOptionalParams,
  PaloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusOptionalParams,
  PaloAltoNetworksCloudngfwOperationsListCloudManagerTenantsOptionalParams,
  PaloAltoNetworksCloudngfwOperationsCreateProductSerialNumberOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSupportInfoSend(
  context: Client,
  options: PaloAltoNetworksCloudngfwOperationsListSupportInfoOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/PaloAltoNetworks.Cloudngfw/listSupportInfo{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listSupportInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<SupportInfoModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return supportInfoModelDeserializer(result.body);
}

export async function listSupportInfo(
  context: Client,
  options: PaloAltoNetworksCloudngfwOperationsListSupportInfoOptionalParams = {
    requestOptions: {},
  },
): Promise<SupportInfoModel> {
  const result = await _listSupportInfoSend(context, options);
  return _listSupportInfoDeserialize(result);
}

export function _listProductSerialNumberStatusSend(
  context: Client,
  options: PaloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/PaloAltoNetworks.Cloudngfw/listProductSerialNumberStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listProductSerialNumberStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<ProductSerialNumberStatus> {
  const expectedStatuses = ["200", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return productSerialNumberStatusDeserializer(result.body);
}

export async function listProductSerialNumberStatus(
  context: Client,
  options: PaloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<ProductSerialNumberStatus | null> {
  const result = await _listProductSerialNumberStatusSend(context, options);
  return _listProductSerialNumberStatusDeserialize(result);
}

export function _listCloudManagerTenantsSend(
  context: Client,
  options: PaloAltoNetworksCloudngfwOperationsListCloudManagerTenantsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/PaloAltoNetworks.Cloudngfw/listCloudManagerTenants{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listCloudManagerTenantsDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudManagerTenantList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudManagerTenantListDeserializer(result.body);
}

export async function listCloudManagerTenants(
  context: Client,
  options: PaloAltoNetworksCloudngfwOperationsListCloudManagerTenantsOptionalParams = {
    requestOptions: {},
  },
): Promise<CloudManagerTenantList> {
  const result = await _listCloudManagerTenantsSend(context, options);
  return _listCloudManagerTenantsDeserialize(result);
}

export function _createProductSerialNumberSend(
  context: Client,
  options: PaloAltoNetworksCloudngfwOperationsCreateProductSerialNumberOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/PaloAltoNetworks.Cloudngfw/createProductSerialNumber{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _createProductSerialNumberDeserialize(
  result: PathUncheckedResponse,
): Promise<ProductSerialNumberRequestStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return productSerialNumberRequestStatusDeserializer(result.body);
}

export async function createProductSerialNumber(
  context: Client,
  options: PaloAltoNetworksCloudngfwOperationsCreateProductSerialNumberOptionalParams = {
    requestOptions: {},
  },
): Promise<ProductSerialNumberRequestStatus> {
  const result = await _createProductSerialNumberSend(context, options);
  return _createProductSerialNumberDeserialize(result);
}
