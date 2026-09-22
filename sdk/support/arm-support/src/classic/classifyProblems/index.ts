// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { classifyProblems } from "../../api/classifyProblems/operations.js";
import { ClassifyProblemsClassifyProblemsOptionalParams } from "../../api/classifyProblems/options.js";
import {
  ProblemClassificationsClassificationInput,
  ProblemClassificationsClassificationOutput,
} from "../../models/models.js";

/** Interface representing a ClassifyProblems operations. */
export interface ClassifyProblemsOperations {
  /** Classify the right problem classifications (categories) available for a specific Azure service. */
  classifyProblems: (
    problemServiceName: string,
    problemClassificationsClassificationInput: ProblemClassificationsClassificationInput,
    options?: ClassifyProblemsClassifyProblemsOptionalParams,
  ) => Promise<ProblemClassificationsClassificationOutput>;
}

function _getClassifyProblems(context: MicrosoftSupportContext) {
  return {
    classifyProblems: (
      problemServiceName: string,
      problemClassificationsClassificationInput: ProblemClassificationsClassificationInput,
      options?: ClassifyProblemsClassifyProblemsOptionalParams,
    ) =>
      classifyProblems(
        context,
        problemServiceName,
        problemClassificationsClassificationInput,
        options,
      ),
  };
}

export function _getClassifyProblemsOperations(
  context: MicrosoftSupportContext,
): ClassifyProblemsOperations {
  return {
    ..._getClassifyProblems(context),
  };
}
