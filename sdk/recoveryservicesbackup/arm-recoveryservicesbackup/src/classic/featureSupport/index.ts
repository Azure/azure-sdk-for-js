// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { validate } from "../../api/featureSupport/operations.js";
import type { FeatureSupportValidateOptionalParams } from "../../api/featureSupport/options.js";
import type {
  FeatureSupportRequestUnion,
  AzureVMResourceFeatureSupportResponse,
} from "../../models/models.js";

/** Interface representing a FeatureSupport operations. */
export interface FeatureSupportOperations {
  /** It will validate if given feature with resource properties is supported in service */
  validate: (
    azureRegion: string,
    parameters: FeatureSupportRequestUnion,
    options?: FeatureSupportValidateOptionalParams,
  ) => Promise<AzureVMResourceFeatureSupportResponse>;
}

function _getFeatureSupport(context: RecoveryServicesBackupContext) {
  return {
    validate: (
      azureRegion: string,
      parameters: FeatureSupportRequestUnion,
      options?: FeatureSupportValidateOptionalParams,
    ) => validate(context, azureRegion, parameters, options),
  };
}

export function _getFeatureSupportOperations(
  context: RecoveryServicesBackupContext,
): FeatureSupportOperations {
  return {
    ..._getFeatureSupport(context),
  };
}
