// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { list, $delete, createOrReplace, get } from "../../api/identityAssignments/operations.js";
import type {
  IdentityAssignmentsListOptionalParams,
  IdentityAssignmentsDeleteOptionalParams,
  IdentityAssignmentsCreateOrReplaceOptionalParams,
  IdentityAssignmentsGetOptionalParams,
} from "../../api/identityAssignments/options.js";
import type { IdentityAssignment, IdentityAssignmentCreateOrUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IdentityAssignments operations. */
export interface IdentityAssignmentsOperations {
  /** Lists identity assignments for a change data capture destination. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    options?: IdentityAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<IdentityAssignment>;
  /** Deletes an inactive change data capture identity assignment. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    assignmentName: string,
    options?: IdentityAssignmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    assignmentName: string,
    options?: IdentityAssignmentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    assignmentName: string,
    options?: IdentityAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or idempotently replaces a change data capture identity assignment. The identity resource ID is immutable and must reference a user-assigned managed identity already attached to the parent cluster. The service also validates destination permissions, which are not granted by attaching the identity to the cluster. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    assignmentName: string,
    resource: IdentityAssignmentCreateOrUpdate,
    options?: IdentityAssignmentsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<IdentityAssignment>, IdentityAssignment>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    assignmentName: string,
    resource: IdentityAssignmentCreateOrUpdate,
    options?: IdentityAssignmentsCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IdentityAssignment>, IdentityAssignment>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    assignmentName: string,
    resource: IdentityAssignmentCreateOrUpdate,
    options?: IdentityAssignmentsCreateOrReplaceOptionalParams,
  ) => Promise<IdentityAssignment>;
  /** Gets a change data capture identity assignment. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    destinationName: string,
    assignmentName: string,
    options?: IdentityAssignmentsGetOptionalParams,
  ) => Promise<IdentityAssignment>;
}

function _getIdentityAssignments(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      options?: IdentityAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, destinationName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      assignmentName: string,
      options?: IdentityAssignmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, destinationName, assignmentName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      assignmentName: string,
      options?: IdentityAssignmentsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        assignmentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      assignmentName: string,
      options?: IdentityAssignmentsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        assignmentName,
        options,
      );
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      assignmentName: string,
      resource: IdentityAssignmentCreateOrUpdate,
      options?: IdentityAssignmentsCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        assignmentName,
        resource,
        options,
      ),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      assignmentName: string,
      resource: IdentityAssignmentCreateOrUpdate,
      options?: IdentityAssignmentsCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        assignmentName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      assignmentName: string,
      resource: IdentityAssignmentCreateOrUpdate,
      options?: IdentityAssignmentsCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        assignmentName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      destinationName: string,
      assignmentName: string,
      options?: IdentityAssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, destinationName, assignmentName, options),
  };
}

export function _getIdentityAssignmentsOperations(
  context: HorizonDbContext,
): IdentityAssignmentsOperations {
  return {
    ..._getIdentityAssignments(context),
  };
}
