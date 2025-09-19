// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import type { ExternalUserCreationResponse } from "../../models/models.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  externalUserInfoSerializer,
  externalUserCreationResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ExternalUserCreateOrUpdateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: ExternalUserCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/createOrUpdateExternalUser{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
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
    body: !options["body"] ? options["body"] : externalUserInfoSerializer(options["body"]),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExternalUserCreationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return externalUserCreationResponseDeserializer(result.body);
}

/** Create or update external user configurations for your Elastic monitor resource, enabling access and management by external users. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: ExternalUserCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ExternalUserCreationResponse> {
  const result = await _createOrUpdateSend(context, resourceGroupName, monitorName, options);
  return _createOrUpdateDeserialize(result);
}
