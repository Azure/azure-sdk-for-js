// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext as Client } from "../index.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  OrganizationResource,
  organizationResourceSerializer,
  organizationResourceDeserializer,
  ValidationResponse,
  validationResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ValidationsValidateOrganizationV2OptionalParams,
  ValidationsValidateOrganizationOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _validateOrganizationV2Send(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: OrganizationResource,
  options: ValidationsValidateOrganizationV2OptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/validations/{organizationName}/orgvalidateV2{?api%2Dversion}",
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
    body: organizationResourceSerializer(body),
  });
}

export async function _validateOrganizationV2Deserialize(
  result: PathUncheckedResponse,
): Promise<ValidationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return validationResponseDeserializer(result.body);
}

/** Organization Validate proxy resource */
export async function validateOrganizationV2(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: OrganizationResource,
  options: ValidationsValidateOrganizationV2OptionalParams = {
    requestOptions: {},
  },
): Promise<ValidationResponse> {
  const result = await _validateOrganizationV2Send(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _validateOrganizationV2Deserialize(result);
}

export function _validateOrganizationSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: OrganizationResource,
  options: ValidationsValidateOrganizationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/validations/{organizationName}/orgvalidate{?api%2Dversion}",
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
    body: organizationResourceSerializer(body),
  });
}

export async function _validateOrganizationDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return organizationResourceDeserializer(result.body);
}

/** Organization Validate proxy resource */
export async function validateOrganization(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: OrganizationResource,
  options: ValidationsValidateOrganizationOptionalParams = {
    requestOptions: {},
  },
): Promise<OrganizationResource> {
  const result = await _validateOrganizationSend(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _validateOrganizationDeserialize(result);
}
