// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementContext as Client } from "../index.js";
import {
  apiErrorDeserializer,
  RegionConfigurationRequest,
  regionConfigurationRequestSerializer,
  RegionConfigurationResponse,
  regionConfigurationResponseDeserializer,
  ValidateAddress,
  validateAddressSerializer,
  AddressValidationOutput,
  addressValidationOutputDeserializer,
  validationRequestUnionSerializer,
  ValidationRequestUnion,
  ValidationResponse,
  validationResponseDeserializer,
  AvailableSkuRequest,
  availableSkuRequestSerializer,
  _AvailableSkusResult,
  _availableSkusResultDeserializer,
  SkuInformation,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ServiceValidateInputsByResourceGroupOptionalParams,
  ServiceRegionConfigurationByResourceGroupOptionalParams,
  ServiceListAvailableSkusByResourceGroupOptionalParams,
  ServiceValidateInputsOptionalParams,
  ServiceValidateAddressOptionalParams,
  ServiceRegionConfigurationOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _validateInputsByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  validationRequest: ValidationRequestUnion,
  options: ServiceValidateInputsByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/locations/{location}/validateInputs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: validationRequestUnionSerializer(validationRequest),
    });
}

export async function _validateInputsByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return validationResponseDeserializer(result.body);
}

/** This method does all necessary pre-job creation validation under resource group. */
export async function validateInputsByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  validationRequest: ValidationRequestUnion,
  options: ServiceValidateInputsByResourceGroupOptionalParams = { requestOptions: {} },
): Promise<ValidationResponse> {
  const result = await _validateInputsByResourceGroupSend(
    context,
    resourceGroupName,
    location,
    validationRequest,
    options,
  );
  return _validateInputsByResourceGroupDeserialize(result);
}

export function _regionConfigurationByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  regionConfigurationRequest: RegionConfigurationRequest,
  options: ServiceRegionConfigurationByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/locations/{location}/regionConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: regionConfigurationRequestSerializer(regionConfigurationRequest),
    });
}

export async function _regionConfigurationByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<RegionConfigurationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return regionConfigurationResponseDeserializer(result.body);
}

/** This API provides configuration details specific to given region/location at Resource group level. */
export async function regionConfigurationByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  regionConfigurationRequest: RegionConfigurationRequest,
  options: ServiceRegionConfigurationByResourceGroupOptionalParams = { requestOptions: {} },
): Promise<RegionConfigurationResponse> {
  const result = await _regionConfigurationByResourceGroupSend(
    context,
    resourceGroupName,
    location,
    regionConfigurationRequest,
    options,
  );
  return _regionConfigurationByResourceGroupDeserialize(result);
}

export function _listAvailableSkusByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  availableSkuRequest: AvailableSkuRequest,
  options: ServiceListAvailableSkusByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/locations/{location}/availableSkus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: availableSkuRequestSerializer(availableSkuRequest),
    });
}

export async function _listAvailableSkusByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AvailableSkusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return _availableSkusResultDeserializer(result.body);
}

/** This method provides the list of available skus for the given subscription, resource group and location. */
export function listAvailableSkusByResourceGroup(
  context: Client,
  resourceGroupName: string,
  location: string,
  availableSkuRequest: AvailableSkuRequest,
  options: ServiceListAvailableSkusByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SkuInformation> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAvailableSkusByResourceGroupSend(
        context,
        resourceGroupName,
        location,
        availableSkuRequest,
        options,
      ),
    _listAvailableSkusByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _validateInputsSend(
  context: Client,
  location: string,
  validationRequest: ValidationRequestUnion,
  options: ServiceValidateInputsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataBox/locations/{location}/validateInputs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: validationRequestUnionSerializer(validationRequest),
    });
}

export async function _validateInputsDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return validationResponseDeserializer(result.body);
}

/** This method does all necessary pre-job creation validation under subscription. */
export async function validateInputs(
  context: Client,
  location: string,
  validationRequest: ValidationRequestUnion,
  options: ServiceValidateInputsOptionalParams = { requestOptions: {} },
): Promise<ValidationResponse> {
  const result = await _validateInputsSend(context, location, validationRequest, options);
  return _validateInputsDeserialize(result);
}

export function _validateAddressSend(
  context: Client,
  location: string,
  validateAddressParameter: ValidateAddress,
  options: ServiceValidateAddressOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataBox/locations/{location}/validateAddress{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: validateAddressSerializer(validateAddressParameter),
    });
}

export async function _validateAddressDeserialize(
  result: PathUncheckedResponse,
): Promise<AddressValidationOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return addressValidationOutputDeserializer(result.body);
}

/** [DEPRECATED NOTICE: This operation will soon be removed]. This method validates the customer shipping address and provide alternate addresses if any. */
export async function validateAddress(
  context: Client,
  location: string,
  validateAddressParameter: ValidateAddress,
  options: ServiceValidateAddressOptionalParams = { requestOptions: {} },
): Promise<AddressValidationOutput> {
  const result = await _validateAddressSend(context, location, validateAddressParameter, options);
  return _validateAddressDeserialize(result);
}

export function _regionConfigurationSend(
  context: Client,
  location: string,
  regionConfigurationRequest: RegionConfigurationRequest,
  options: ServiceRegionConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataBox/locations/{location}/regionConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: regionConfigurationRequestSerializer(regionConfigurationRequest),
    });
}

export async function _regionConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<RegionConfigurationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorDeserializer(result.body);
    }

    throw error;
  }

  return regionConfigurationResponseDeserializer(result.body);
}

/** This API provides configuration details specific to given region/location at Subscription level. */
export async function regionConfiguration(
  context: Client,
  location: string,
  regionConfigurationRequest: RegionConfigurationRequest,
  options: ServiceRegionConfigurationOptionalParams = { requestOptions: {} },
): Promise<RegionConfigurationResponse> {
  const result = await _regionConfigurationSend(
    context,
    location,
    regionConfigurationRequest,
    options,
  );
  return _regionConfigurationDeserialize(result);
}
