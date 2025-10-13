// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { execute } from "../../api/getPrivateDnsZoneSuffix/operations.js";
import type { GetPrivateDnsZoneSuffixExecuteOptionalParams } from "../../api/getPrivateDnsZoneSuffix/options.js";
import type { GetPrivateDnsZoneSuffixResponse } from "../../models/models.js";

/** Interface representing a GetPrivateDnsZoneSuffix operations. */
export interface GetPrivateDnsZoneSuffixOperations {
  /** Get private DNS zone suffix in the cloud. */
  execute: (
    options?: GetPrivateDnsZoneSuffixExecuteOptionalParams,
  ) => Promise<GetPrivateDnsZoneSuffixResponse>;
}

function _getGetPrivateDnsZoneSuffix(context: MySQLManagementFlexibleServerContext) {
  return {
    execute: (options?: GetPrivateDnsZoneSuffixExecuteOptionalParams) => execute(context, options),
  };
}

export function _getGetPrivateDnsZoneSuffixOperations(
  context: MySQLManagementFlexibleServerContext,
): GetPrivateDnsZoneSuffixOperations {
  return {
    ..._getGetPrivateDnsZoneSuffix(context),
  };
}
