// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConfigurationsRequest,
  configurationsRequestSerializer,
  _Configurations,
  _configurationsDeserializer,
  Configuration,
  ProductFamiliesRequest,
  productFamiliesRequestSerializer,
  _ProductFamilies,
  _productFamiliesDeserializer,
  ProductFamily,
  _ProductFamiliesMetadata,
  _productFamiliesMetadataDeserializer,
  ProductFamiliesMetadataDetails,
} from "../../models/models.js";
import {
  ProductsAndConfigurationsListProductFamiliesMetadataOptionalParams,
  ProductsAndConfigurationsListProductFamiliesOptionalParams,
  ProductsAndConfigurationsListConfigurationsOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listProductFamiliesMetadataSend(
  context: Client,
  options: ProductsAndConfigurationsListProductFamiliesMetadataOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOrder/productFamiliesMetadata{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24skipToken": options?.skipToken,
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

export async function _listProductFamiliesMetadataDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProductFamiliesMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _productFamiliesMetadataDeserializer(result.body);
}

/** List product families metadata for the given subscription. */
export function listProductFamiliesMetadata(
  context: Client,
  options: ProductsAndConfigurationsListProductFamiliesMetadataOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ProductFamiliesMetadataDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listProductFamiliesMetadataSend(context, options),
    _listProductFamiliesMetadataDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listProductFamiliesSend(
  context: Client,
  productFamiliesRequest: ProductFamiliesRequest,
  options: ProductsAndConfigurationsListProductFamiliesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOrder/listProductFamilies{?api%2Dversion,%24expand,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24expand": options?.expand,
      "%24skipToken": options?.skipToken,
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
    body: productFamiliesRequestSerializer(productFamiliesRequest),
  });
}

export async function _listProductFamiliesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProductFamilies> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _productFamiliesDeserializer(result.body);
}

/** List product families for the given subscription. */
export function listProductFamilies(
  context: Client,
  productFamiliesRequest: ProductFamiliesRequest,
  options: ProductsAndConfigurationsListProductFamiliesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ProductFamily> {
  return buildPagedAsyncIterator(
    context,
    () => _listProductFamiliesSend(context, productFamiliesRequest, options),
    _listProductFamiliesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listConfigurationsSend(
  context: Client,
  configurationsRequest: ConfigurationsRequest,
  options: ProductsAndConfigurationsListConfigurationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOrder/listConfigurations{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24skipToken": options?.skipToken,
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
    body: configurationsRequestSerializer(configurationsRequest),
  });
}

export async function _listConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_Configurations> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _configurationsDeserializer(result.body);
}

/** List configurations for the given product family, product line and product for the given subscription. */
export function listConfigurations(
  context: Client,
  configurationsRequest: ConfigurationsRequest,
  options: ProductsAndConfigurationsListConfigurationsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Configuration> {
  return buildPagedAsyncIterator(
    context,
    () => _listConfigurationsSend(context, configurationsRequest, options),
    _listConfigurationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
