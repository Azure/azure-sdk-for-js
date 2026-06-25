// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { createOrUpdate } from "../../api/testRaiExternalSafetyProvider/operations.js";
import { TestRaiExternalSafetyProviderCreateOrUpdateOptionalParams } from "../../api/testRaiExternalSafetyProvider/options.js";
import { RaiExternalSafetyProviderSchema } from "../../models/models.js";

/** Interface representing a TestRaiExternalSafetyProvider operations. */
export interface TestRaiExternalSafetyProviderOperations {
  /** Test the rai safety provider associated with the subscription. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    safetyProviderName: string,
    safetyProvider: RaiExternalSafetyProviderSchema,
    options?: TestRaiExternalSafetyProviderCreateOrUpdateOptionalParams,
  ) => Promise<RaiExternalSafetyProviderSchema>;
}

function _getTestRaiExternalSafetyProvider(context: CognitiveServicesManagementContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      safetyProviderName: string,
      safetyProvider: RaiExternalSafetyProviderSchema,
      options?: TestRaiExternalSafetyProviderCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        safetyProviderName,
        safetyProvider,
        options,
      ),
  };
}

export function _getTestRaiExternalSafetyProviderOperations(
  context: CognitiveServicesManagementContext,
): TestRaiExternalSafetyProviderOperations {
  return {
    ..._getTestRaiExternalSafetyProvider(context),
  };
}
