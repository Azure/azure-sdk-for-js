// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectorConfigurationValidationRequest,
  connectorConfigurationValidationRequestSerializer,
  ValidationResult,
  validationResultDeserializer,
  DataPreviewConfigurationValidationRequest,
  dataPreviewConfigurationValidationRequestSerializer,
} from "../../models/azure/mgmt/placeholder/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConfigOperationsDataPreviewValidationOptionalParams,
  ConfigOperationsConnectorValidationOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _dataPreviewValidationSend(
  context: Client,
  location: string,
  body: DataPreviewConfigurationValidationRequest,
  options: ConfigOperationsDataPreviewValidationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.MessagingConnectors/locations/{location}/validation/default/dataPreviewValidation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: dataPreviewConfigurationValidationRequestSerializer(body),
    });
}

export async function _dataPreviewValidationDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidationResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validationResultDeserializer(result.body);
}

/** create one validation task for datapreview config */
export function dataPreviewValidation(
  context: Client,
  location: string,
  body: DataPreviewConfigurationValidationRequest,
  options: ConfigOperationsDataPreviewValidationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ValidationResult>, ValidationResult> {
  return getLongRunningPoller(
    context,
    _dataPreviewValidationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _dataPreviewValidationSend(context, location, body, options),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<ValidationResult>, ValidationResult>;
}

export function _connectorValidationSend(
  context: Client,
  location: string,
  body: ConnectorConfigurationValidationRequest,
  options: ConfigOperationsConnectorValidationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.MessagingConnectors/locations/{location}/validation/default/connectorValidation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: connectorConfigurationValidationRequestSerializer(body),
    });
}

export async function _connectorValidationDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidationResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validationResultDeserializer(result.body);
}

/** create one validation task for connector config */
export function connectorValidation(
  context: Client,
  location: string,
  body: ConnectorConfigurationValidationRequest,
  options: ConfigOperationsConnectorValidationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ValidationResult>, ValidationResult> {
  return getLongRunningPoller(
    context,
    _connectorValidationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _connectorValidationSend(context, location, body, options),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<ValidationResult>, ValidationResult>;
}
