// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type { ApplicationsAPIApplication } from "../../models/applicationsAPI/models.js";
import {
  applicationsAPIApplicationSerializer,
  applicationsAPIApplicationDeserializer,
} from "../../models/applicationsAPI/models.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecurityConnectorApplicationDeleteOptionalParams,
  SecurityConnectorApplicationCreateOrUpdateOptionalParams,
  SecurityConnectorApplicationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  applicationId: string,
  options: SecurityConnectorApplicationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/providers/Microsoft.Security/applications/{applicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      applicationId: applicationId,
      "api%2Dversion": "2022-07-01-preview",
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

/** Delete an Application over a given scope */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  applicationId: string,
  options: SecurityConnectorApplicationDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    securityConnectorName,
    applicationId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  applicationId: string,
  application: ApplicationsAPIApplication,
  options: SecurityConnectorApplicationCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/providers/Microsoft.Security/applications/{applicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      applicationId: applicationId,
      "api%2Dversion": "2022-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: applicationsAPIApplicationSerializer(application),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationsAPIApplication> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationsAPIApplicationDeserializer(result.body);
}

/** Creates or update a security Application on the given security connector. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  applicationId: string,
  application: ApplicationsAPIApplication,
  options: SecurityConnectorApplicationCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ApplicationsAPIApplication> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    securityConnectorName,
    applicationId,
    application,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  applicationId: string,
  options: SecurityConnectorApplicationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/providers/Microsoft.Security/applications/{applicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      applicationId: applicationId,
      "api%2Dversion": "2022-07-01-preview",
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
): Promise<ApplicationsAPIApplication> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationsAPIApplicationDeserializer(result.body);
}

/** Get a specific application for the requested scope by applicationId */
export async function get(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  applicationId: string,
  options: SecurityConnectorApplicationGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationsAPIApplication> {
  const result = await _getSend(
    context,
    resourceGroupName,
    securityConnectorName,
    applicationId,
    options,
  );
  return _getDeserialize(result);
}
