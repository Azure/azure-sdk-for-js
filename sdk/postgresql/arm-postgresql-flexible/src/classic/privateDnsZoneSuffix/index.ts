// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { get } from "../../api/privateDnsZoneSuffix/operations.js";
import { PrivateDnsZoneSuffixGetOptionalParams } from "../../api/privateDnsZoneSuffix/options.js";
import { PrivateDnsZoneSuffixGetResponse } from "../../models/models.js";

/** Interface representing a PrivateDnsZoneSuffix operations. */
export interface PrivateDnsZoneSuffixOperations {
  /** Gets the private DNS zone suffix. */
  get: (
    options?: PrivateDnsZoneSuffixGetOptionalParams,
  ) => Promise<PrivateDnsZoneSuffixGetResponse>;
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
