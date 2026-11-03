// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ProblemClassificationsClassificationInput,
  problemClassificationsClassificationInputSerializer,
  ProblemClassificationsClassificationOutput,
  problemClassificationsClassificationOutputDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ClassifyProblemsClassifyProblemsOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _classifyProblemsSend(
  context: Client,
  problemServiceName: string,
  problemClassificationsClassificationInput: ProblemClassificationsClassificationInput,
  options: ClassifyProblemsClassifyProblemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/services/{problemServiceName}/classifyProblems{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      problemServiceName: problemServiceName,
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
    body: problemClassificationsClassificationInputSerializer(
      problemClassificationsClassificationInput,
    ),
  });
}

export async function _classifyProblemsDeserialize(
  result: PathUncheckedResponse,
): Promise<ProblemClassificationsClassificationOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return problemClassificationsClassificationOutputDeserializer(result.body);
}

/** Classify the right problem classifications (categories) available for a specific Azure service. */
export async function classifyProblems(
  context: Client,
  problemServiceName: string,
  problemClassificationsClassificationInput: ProblemClassificationsClassificationInput,
  options: ClassifyProblemsClassifyProblemsOptionalParams = { requestOptions: {} },
): Promise<ProblemClassificationsClassificationOutput> {
  const result = await _classifyProblemsSend(
    context,
    problemServiceName,
    problemClassificationsClassificationInput,
    options,
  );
  return _classifyProblemsDeserialize(result);
}
