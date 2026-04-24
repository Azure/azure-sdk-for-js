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
  ApplicationDeleteOptionalParams,
  ApplicationCreateOrUpdateOptionalParams,
  ApplicationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  applicationId: string,
  options: ApplicationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/applications/{applicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
  applicationId: string,
  options: ApplicationDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, applicationId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  applicationId: string,
  application: ApplicationsAPIApplication,
  options: ApplicationCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/applications/{applicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

/** Creates or update a security application on the given subscription. */
export async function createOrUpdate(
  context: Client,
  applicationId: string,
  application: ApplicationsAPIApplication,
  options: ApplicationCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ApplicationsAPIApplication> {
  const result = await _createOrUpdateSend(context, applicationId, application, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  applicationId: string,
  options: ApplicationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/applications/{applicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
  applicationId: string,
  options: ApplicationGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationsAPIApplication> {
  const result = await _getSend(context, applicationId, options);
  return _getDeserialize(result);
}
