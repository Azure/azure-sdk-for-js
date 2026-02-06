// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { get } from "../../api/privateDnsZoneSuffix/operations.js";
import type { PrivateDnsZoneSuffixGetOptionalParams } from "../../api/privateDnsZoneSuffix/options.js";

/** Interface representing a PrivateDnsZoneSuffix operations. */
export interface PrivateDnsZoneSuffixOperations {
  /** Gets the private DNS zone suffix. */
  get: (options?: PrivateDnsZoneSuffixGetOptionalParams) => Promise<string>;
}

function _getPrivateDnsZoneSuffix(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    get: (options?: PrivateDnsZoneSuffixGetOptionalParams) => get(context, options),
  };
}

export function _getPrivateDnsZoneSuffixOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): PrivateDnsZoneSuffixOperations {
  return {
    ..._getPrivateDnsZoneSuffix(context),
  };
}
