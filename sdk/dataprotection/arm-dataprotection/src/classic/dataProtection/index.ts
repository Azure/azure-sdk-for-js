// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { checkFeatureSupport } from "../../api/dataProtection/operations.js";
import type { DataProtectionCheckFeatureSupportOptionalParams } from "../../api/dataProtection/options.js";
import type {
  FeatureValidationRequestBaseUnion,
  FeatureValidationResponseBaseUnion,
} from "../../models/models.js";

/** Interface representing a DataProtection operations. */
export interface DataProtectionOperations {
  /** Validates if a feature is supported */
  checkFeatureSupport: (
    location: string,
    parameters: FeatureValidationRequestBaseUnion,
    options?: DataProtectionCheckFeatureSupportOptionalParams,
  ) => Promise<FeatureValidationResponseBaseUnion>;
}

function _getDataProtection(context: DataProtectionContext) {
  return {
    checkFeatureSupport: (
      location: string,
      parameters: FeatureValidationRequestBaseUnion,
      options?: DataProtectionCheckFeatureSupportOptionalParams,
    ) => checkFeatureSupport(context, location, parameters, options),
  };
}

export function _getDataProtectionOperations(
  context: DataProtectionContext,
): DataProtectionOperations {
  return {
    ..._getDataProtection(context),
  };
}
