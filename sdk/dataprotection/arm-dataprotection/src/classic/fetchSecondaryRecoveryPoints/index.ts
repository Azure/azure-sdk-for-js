// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list } from "../../api/fetchSecondaryRecoveryPoints/operations.js";
import type { FetchSecondaryRecoveryPointsListOptionalParams } from "../../api/fetchSecondaryRecoveryPoints/options.js";
import type {
  AzureBackupRecoveryPointResource,
  FetchSecondaryRPsRequestParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FetchSecondaryRecoveryPoints operations. */
export interface FetchSecondaryRecoveryPointsOperations {
  /** Returns a list of Secondary Recovery Points for a DataSource in a vault, that can be used for Cross Region Restore. */
  list: (
    resourceGroupName: string,
    location: string,
    parameters: FetchSecondaryRPsRequestParameters,
    options?: FetchSecondaryRecoveryPointsListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureBackupRecoveryPointResource>;
}

function _getFetchSecondaryRecoveryPoints(context: DataProtectionContext) {
  return {
    list: (
      resourceGroupName: string,
      location: string,
      parameters: FetchSecondaryRPsRequestParameters,
      options?: FetchSecondaryRecoveryPointsListOptionalParams,
    ) => list(context, resourceGroupName, location, parameters, options),
  };
}

export function _getFetchSecondaryRecoveryPointsOperations(
  context: DataProtectionContext,
): FetchSecondaryRecoveryPointsOperations {
  return {
    ..._getFetchSecondaryRecoveryPoints(context),
  };
}
