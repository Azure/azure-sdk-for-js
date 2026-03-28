// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext as Client } from "./index.js";
import type { CheckResourceNameResult } from "../models/models.js";
import {
  resourceNameSerializer,
  checkResourceNameResultDeserializer,
  cloudErrorDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { CheckResourceNameOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkResourceNameSend(
  context: Client,
  options: CheckResourceNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/checkResourceName{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2022-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["resourceNameDefinition"]
      ? options["resourceNameDefinition"]
      : resourceNameSerializer(options["resourceNameDefinition"]),
  });
}

export async function _checkResourceNameDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckResourceNameResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return checkResourceNameResultDeserializer(result.body);
}

/** A resource name is valid if it is not a reserved word, does not contains a reserved word and does not start with a reserved word */
export async function checkResourceName(
  context: Client,
  options: CheckResourceNameOptionalParams = { requestOptions: {} },
): Promise<CheckResourceNameResult> {
  const result = await _checkResourceNameSend(context, options);
  return _checkResourceNameDeserialize(result);
}
