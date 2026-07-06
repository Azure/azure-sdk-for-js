// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { classifyProblems } from "../../api/classifyProblemsNoSubscription/operations.js";
import type { ClassifyProblemsNoSubscriptionClassifyProblemsOptionalParams } from "../../api/classifyProblemsNoSubscription/options.js";
import type {
  ProblemClassificationsClassificationInput,
  ProblemClassificationsClassificationOutput,
} from "../../models/models.js";

/** Interface representing a ClassifyProblemsNoSubscription operations. */
export interface ClassifyProblemsNoSubscriptionOperations {
  /** Classify the right problem classifications (categories) available for a specific Azure service. */
  classifyProblems: (
    problemServiceName: string,
    problemClassificationsClassificationInput: ProblemClassificationsClassificationInput,
    options?: ClassifyProblemsNoSubscriptionClassifyProblemsOptionalParams,
  ) => Promise<ProblemClassificationsClassificationOutput>;
}

function _getClassifyProblemsNoSubscription(context: MicrosoftSupportContext) {
  return {
    classifyProblems: (
      problemServiceName: string,
      problemClassificationsClassificationInput: ProblemClassificationsClassificationInput,
      options?: ClassifyProblemsNoSubscriptionClassifyProblemsOptionalParams,
    ) =>
      classifyProblems(
        context,
        problemServiceName,
        problemClassificationsClassificationInput,
        options,
      ),
  };
}

export function _getClassifyProblemsNoSubscriptionOperations(
  context: MicrosoftSupportContext,
): ClassifyProblemsNoSubscriptionOperations {
  return {
    ..._getClassifyProblemsNoSubscription(context),
  };
}
