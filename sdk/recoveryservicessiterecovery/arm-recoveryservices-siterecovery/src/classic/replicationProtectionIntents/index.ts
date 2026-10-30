// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { list, create, get } from "../../api/replicationProtectionIntents/operations.js";
import type {
  ReplicationProtectionIntentsListOptionalParams,
  ReplicationProtectionIntentsCreateOptionalParams,
  ReplicationProtectionIntentsGetOptionalParams,
} from "../../api/replicationProtectionIntents/options.js";
import type {
  ReplicationProtectionIntent,
  CreateProtectionIntentInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReplicationProtectionIntents operations. */
export interface ReplicationProtectionIntentsOperations {
  /** Gets the list of ASR replication protection intent objects in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationProtectionIntentsListOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationProtectionIntent>;
  /** The operation to create an ASR replication protection intent item. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    intentObjectName: string,
    input: CreateProtectionIntentInput,
    options?: ReplicationProtectionIntentsCreateOptionalParams,
  ) => Promise<ReplicationProtectionIntent>;
  /** Gets the details of an ASR replication protection intent. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    intentObjectName: string,
    options?: ReplicationProtectionIntentsGetOptionalParams,
  ) => Promise<ReplicationProtectionIntent>;
}

function _getReplicationProtectionIntents(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationProtectionIntentsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      intentObjectName: string,
      input: CreateProtectionIntentInput,
      options?: ReplicationProtectionIntentsCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, intentObjectName, input, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      intentObjectName: string,
      options?: ReplicationProtectionIntentsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, intentObjectName, options),
  };
}

export function _getReplicationProtectionIntentsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationProtectionIntentsOperations {
  return {
    ..._getReplicationProtectionIntents(context),
  };
}
