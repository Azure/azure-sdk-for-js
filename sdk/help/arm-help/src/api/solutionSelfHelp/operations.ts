// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SolutionResourceSelfHelp,
  solutionResourceSelfHelpDeserializer,
} from "../../models/models.js";
import { SolutionSelfHelpGetOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  solutionId: string,
  options: SolutionSelfHelpGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Help/selfHelp/{solutionId}{?api%2Dversion}",
    {
      solutionId: solutionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionResourceSelfHelp> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionResourceSelfHelpDeserializer(result.body);
}

/** Gets Self Help Solutions for a given solutionId. Self Help Solutions consist of rich instructional video tutorials, links and guides to public documentation related to a specific problem that enables users to troubleshoot Azure issues. */
export async function get(
  context: Client,
  solutionId: string,
  options: SolutionSelfHelpGetOptionalParams = { requestOptions: {} },
): Promise<SolutionResourceSelfHelp> {
  const result = await _getSend(context, solutionId, options);
  return _getDeserialize(result);
}
