// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import {
  checkNameAvailability,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/clusterPrincipalAssignments/operations.js";
import type {
  ClusterPrincipalAssignmentsCheckNameAvailabilityOptionalParams,
  ClusterPrincipalAssignmentsListOptionalParams,
  ClusterPrincipalAssignmentsDeleteOptionalParams,
  ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
  ClusterPrincipalAssignmentsGetOptionalParams,
} from "../../api/clusterPrincipalAssignments/options.js";
import type {
  ClusterPrincipalAssignment,
  ClusterPrincipalAssignmentCheckNameRequest,
  CheckNameResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ClusterPrincipalAssignments operations. */
export interface ClusterPrincipalAssignmentsOperations {
  /** Checks that the principal assignment name is valid and is not already in use. */
  checkNameAvailability: (
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: ClusterPrincipalAssignmentCheckNameRequest,
    options?: ClusterPrincipalAssignmentsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameResult>;
  /** Lists all Kusto cluster principalAssignments. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClusterPrincipalAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterPrincipalAssignment>;
  /** Deletes a Kusto cluster principalAssignment. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    options?: ClusterPrincipalAssignmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    options?: ClusterPrincipalAssignmentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    options?: ClusterPrincipalAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a Kusto cluster principalAssignment. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    parameters: ClusterPrincipalAssignment,
    options?: ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterPrincipalAssignment>, ClusterPrincipalAssignment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    parameters: ClusterPrincipalAssignment,
    options?: ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ClusterPrincipalAssignment>, ClusterPrincipalAssignment>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    parameters: ClusterPrincipalAssignment,
    options?: ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<ClusterPrincipalAssignment>;
  /** Gets a Kusto cluster principalAssignment. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    options?: ClusterPrincipalAssignmentsGetOptionalParams,
  ) => Promise<ClusterPrincipalAssignment>;
}

function _getClusterPrincipalAssignments(context: KustoManagementContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      clusterName: string,
      principalAssignmentName: ClusterPrincipalAssignmentCheckNameRequest,
      options?: ClusterPrincipalAssignmentsCheckNameAvailabilityOptionalParams,
    ) =>
      checkNameAvailability(
        context,
        resourceGroupName,
        clusterName,
        principalAssignmentName,
        options,
      ),
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClusterPrincipalAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      principalAssignmentName: string,
      options?: ClusterPrincipalAssignmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, principalAssignmentName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      principalAssignmentName: string,
      options?: ClusterPrincipalAssignmentsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        principalAssignmentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      principalAssignmentName: string,
      options?: ClusterPrincipalAssignmentsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        principalAssignmentName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      principalAssignmentName: string,
      parameters: ClusterPrincipalAssignment,
      options?: ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        principalAssignmentName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      principalAssignmentName: string,
      parameters: ClusterPrincipalAssignment,
      options?: ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        principalAssignmentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      principalAssignmentName: string,
      parameters: ClusterPrincipalAssignment,
      options?: ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        principalAssignmentName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      principalAssignmentName: string,
      options?: ClusterPrincipalAssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, principalAssignmentName, options),
  };
}

export function _getClusterPrincipalAssignmentsOperations(
  context: KustoManagementContext,
): ClusterPrincipalAssignmentsOperations {
  return {
    ..._getClusterPrincipalAssignments(context),
  };
}
