// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByServer,
  createOrUpdate,
  get,
} from "../../api/extendedServerBlobAuditingPolicies/operations.js";
import type {
  ExtendedServerBlobAuditingPoliciesListByServerOptionalParams,
  ExtendedServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ExtendedServerBlobAuditingPoliciesGetOptionalParams,
} from "../../api/extendedServerBlobAuditingPolicies/options.js";
import type {
  ExtendedServerBlobAuditingPolicy,
  BlobAuditingPolicyName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExtendedServerBlobAuditingPolicies operations. */
export interface ExtendedServerBlobAuditingPoliciesOperations {
  /** Lists extended auditing settings of a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ExtendedServerBlobAuditingPoliciesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ExtendedServerBlobAuditingPolicy>;
  /** Creates or updates an extended server's blob auditing policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    blobAuditingPolicyName: BlobAuditingPolicyName,
    parameters: ExtendedServerBlobAuditingPolicy,
    options?: ExtendedServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ExtendedServerBlobAuditingPolicy>,
    ExtendedServerBlobAuditingPolicy
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    blobAuditingPolicyName: BlobAuditingPolicyName,
    parameters: ExtendedServerBlobAuditingPolicy,
    options?: ExtendedServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExtendedServerBlobAuditingPolicy>,
      ExtendedServerBlobAuditingPolicy
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    blobAuditingPolicyName: BlobAuditingPolicyName,
    parameters: ExtendedServerBlobAuditingPolicy,
    options?: ExtendedServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ExtendedServerBlobAuditingPolicy>;
  /** Gets an extended server's blob auditing policy. */
  get: (
    resourceGroupName: string,
    serverName: string,
    blobAuditingPolicyName: BlobAuditingPolicyName,
    options?: ExtendedServerBlobAuditingPoliciesGetOptionalParams,
  ) => Promise<ExtendedServerBlobAuditingPolicy>;
}

function _getExtendedServerBlobAuditingPolicies(context: SqlContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ExtendedServerBlobAuditingPoliciesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      blobAuditingPolicyName: BlobAuditingPolicyName,
      parameters: ExtendedServerBlobAuditingPolicy,
      options?: ExtendedServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        blobAuditingPolicyName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      blobAuditingPolicyName: BlobAuditingPolicyName,
      parameters: ExtendedServerBlobAuditingPolicy,
      options?: ExtendedServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        blobAuditingPolicyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      blobAuditingPolicyName: BlobAuditingPolicyName,
      parameters: ExtendedServerBlobAuditingPolicy,
      options?: ExtendedServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        blobAuditingPolicyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      blobAuditingPolicyName: BlobAuditingPolicyName,
      options?: ExtendedServerBlobAuditingPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, blobAuditingPolicyName, options),
  };
}

export function _getExtendedServerBlobAuditingPoliciesOperations(
  context: SqlContext,
): ExtendedServerBlobAuditingPoliciesOperations {
  return {
    ..._getExtendedServerBlobAuditingPolicies(context),
  };
}
