// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationManagementContext as Client } from "../index.js";
import {
  OperationList,
  operationListDeserializer,
  cloudErrorDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { OperationsListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Attestation/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<OperationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return operationListDeserializer(result.body);
}

/** List the operations for the provider */
export async function list(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): Promise<OperationList> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}
