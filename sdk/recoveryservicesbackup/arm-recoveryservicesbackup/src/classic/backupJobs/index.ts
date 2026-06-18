// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/backupJobs/operations.js";
import { BackupJobsListOptionalParams } from "../../api/backupJobs/options.js";
import { JobResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupJobs operations. */
export interface BackupJobsOperations {
  /** Provides a pageable list of jobs. */
  list: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<JobResource>;
}

function _getBackupJobs(context: RecoveryServicesBackupContext) {
  return {
    list: (vaultName: string, resourceGroupName: string, options?: BackupJobsListOptionalParams) =>
      list(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupJobsOperations(
  context: RecoveryServicesBackupContext,
): BackupJobsOperations {
  return {
    ..._getBackupJobs(context),
  };
}
