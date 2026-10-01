// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ServiceClassificationRequest,
  serviceClassificationRequestSerializer,
  ServiceClassificationOutput,
  serviceClassificationOutputDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ClassifyServicesNoSubscriptionClassifyServicesOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _classifyServicesSend(
  context: Client,
  serviceClassificationRequest: ServiceClassificationRequest,
  options: ClassifyServicesNoSubscriptionClassifyServicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/classifyServices{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceClassificationRequestSerializer(serviceClassificationRequest),
  });
}

export async function _classifyServicesDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceClassificationOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serviceClassificationOutputDeserializer(result.body);
}

/** Classify the list of right Azure services. */
export async function classifyServices(
  context: Client,
  serviceClassificationRequest: ServiceClassificationRequest,
  options: ClassifyServicesNoSubscriptionClassifyServicesOptionalParams = { requestOptions: {} },
): Promise<ServiceClassificationOutput> {
  const result = await _classifyServicesSend(context, serviceClassificationRequest, options);
  return _classifyServicesDeserialize(result);
}
