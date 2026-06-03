// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ObservabilityContext } from "../../api/observabilityContext.js";
import { get, list } from "../../api/creationSupported/operations.js";
import type {
  CreationSupportedGetOptionalParams,
  CreationSupportedListOptionalParams,
} from "../../api/creationSupported/options.js";
import type { CreateResourceSupportedResponse } from "../../models/models.js";

/** Interface representing a CreationSupported operations. */
export interface CreationSupportedOperations {
  /** Informs if the current subscription is being already monitored for selected Dynatrace environment. */
  get: (
    dynatraceEnvironmentId: string,
    options?: CreationSupportedGetOptionalParams,
  ) => Promise<CreateResourceSupportedResponse>;
  /** Informs if the current subscription is being already monitored for selected Dynatrace environment. */
  list: (
    dynatraceEnvironmentId: string,
    options?: CreationSupportedListOptionalParams,
  ) => Promise<CreateResourceSupportedResponse>;
}

function _getCreationSupported(context: ObservabilityContext) {
  return {
    get: (dynatraceEnvironmentId: string, options?: CreationSupportedGetOptionalParams) =>
      get(context, dynatraceEnvironmentId, options),
    list: (dynatraceEnvironmentId: string, options?: CreationSupportedListOptionalParams) =>
      list(context, dynatraceEnvironmentId, options),
  };
}

export function _getCreationSupportedOperations(
  context: ObservabilityContext,
): CreationSupportedOperations {
  return {
    ..._getCreationSupported(context),
  };
}
