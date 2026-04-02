// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  listAssociations,
  deleteAssociation,
  createOrUpdateAssociation,
  getAssociation,
  listPlansBySubscription,
  listPlansByResourceGroup,
  deletePlan,
  updatePlan,
  createOrUpdatePlan,
  getPlan,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/commitmentPlans/operations.js";
import type {
  CommitmentPlansListAssociationsOptionalParams,
  CommitmentPlansDeleteAssociationOptionalParams,
  CommitmentPlansCreateOrUpdateAssociationOptionalParams,
  CommitmentPlansGetAssociationOptionalParams,
  CommitmentPlansListPlansBySubscriptionOptionalParams,
  CommitmentPlansListPlansByResourceGroupOptionalParams,
  CommitmentPlansDeletePlanOptionalParams,
  CommitmentPlansUpdatePlanOptionalParams,
  CommitmentPlansCreateOrUpdatePlanOptionalParams,
  CommitmentPlansGetPlanOptionalParams,
  CommitmentPlansListOptionalParams,
  CommitmentPlansDeleteOptionalParams,
  CommitmentPlansCreateOrUpdateOptionalParams,
  CommitmentPlansGetOptionalParams,
} from "../../api/commitmentPlans/options.js";
import type {
  PatchResourceTagsAndSku,
  CommitmentPlan,
  CommitmentPlanAccountAssociation,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CommitmentPlans operations. */
export interface CommitmentPlansOperations {
  /** Gets the associations of the Cognitive Services commitment plan. */
  listAssociations: (
    resourceGroupName: string,
    commitmentPlanName: string,
    options?: CommitmentPlansListAssociationsOptionalParams,
  ) => PagedAsyncIterableIterator<CommitmentPlanAccountAssociation>;
  /** Deletes the association of the Cognitive Services commitment plan. */
  deleteAssociation: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlanAssociationName: string,
    options?: CommitmentPlansDeleteAssociationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteAssociation instead */
  beginDeleteAssociation: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlanAssociationName: string,
    options?: CommitmentPlansDeleteAssociationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAssociation instead */
  beginDeleteAssociationAndWait: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlanAssociationName: string,
    options?: CommitmentPlansDeleteAssociationOptionalParams,
  ) => Promise<void>;
  /** Create or update the association of the Cognitive Services commitment plan. */
  createOrUpdateAssociation: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlanAssociationName: string,
    association: CommitmentPlanAccountAssociation,
    options?: CommitmentPlansCreateOrUpdateAssociationOptionalParams,
  ) => PollerLike<
    OperationState<CommitmentPlanAccountAssociation>,
    CommitmentPlanAccountAssociation
  >;
  /** @deprecated use createOrUpdateAssociation instead */
  beginCreateOrUpdateAssociation: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlanAssociationName: string,
    association: CommitmentPlanAccountAssociation,
    options?: CommitmentPlansCreateOrUpdateAssociationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommitmentPlanAccountAssociation>,
      CommitmentPlanAccountAssociation
    >
  >;
  /** @deprecated use createOrUpdateAssociation instead */
  beginCreateOrUpdateAssociationAndWait: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlanAssociationName: string,
    association: CommitmentPlanAccountAssociation,
    options?: CommitmentPlansCreateOrUpdateAssociationOptionalParams,
  ) => Promise<CommitmentPlanAccountAssociation>;
  /** Gets the association of the Cognitive Services commitment plan. */
  getAssociation: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlanAssociationName: string,
    options?: CommitmentPlansGetAssociationOptionalParams,
  ) => Promise<CommitmentPlanAccountAssociation>;
  /** Returns all the resources of a particular type belonging to a subscription. */
  listPlansBySubscription: (
    options?: CommitmentPlansListPlansBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CommitmentPlan>;
  /** Returns all the resources of a particular type belonging to a resource group */
  listPlansByResourceGroup: (
    resourceGroupName: string,
    options?: CommitmentPlansListPlansByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CommitmentPlan>;
  /** Deletes a Cognitive Services commitment plan from the resource group. */
  deletePlan: (
    resourceGroupName: string,
    commitmentPlanName: string,
    options?: CommitmentPlansDeletePlanOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deletePlan instead */
  beginDeletePlan: (
    resourceGroupName: string,
    commitmentPlanName: string,
    options?: CommitmentPlansDeletePlanOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deletePlan instead */
  beginDeletePlanAndWait: (
    resourceGroupName: string,
    commitmentPlanName: string,
    options?: CommitmentPlansDeletePlanOptionalParams,
  ) => Promise<void>;
  /** Create Cognitive Services commitment plan. */
  updatePlan: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlan: PatchResourceTagsAndSku,
    options?: CommitmentPlansUpdatePlanOptionalParams,
  ) => PollerLike<OperationState<CommitmentPlan>, CommitmentPlan>;
  /** @deprecated use updatePlan instead */
  beginUpdatePlan: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlan: PatchResourceTagsAndSku,
    options?: CommitmentPlansUpdatePlanOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CommitmentPlan>, CommitmentPlan>>;
  /** @deprecated use updatePlan instead */
  beginUpdatePlanAndWait: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlan: PatchResourceTagsAndSku,
    options?: CommitmentPlansUpdatePlanOptionalParams,
  ) => Promise<CommitmentPlan>;
  /** Create Cognitive Services commitment plan. */
  createOrUpdatePlan: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlan: CommitmentPlan,
    options?: CommitmentPlansCreateOrUpdatePlanOptionalParams,
  ) => PollerLike<OperationState<CommitmentPlan>, CommitmentPlan>;
  /** @deprecated use createOrUpdatePlan instead */
  beginCreateOrUpdatePlan: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlan: CommitmentPlan,
    options?: CommitmentPlansCreateOrUpdatePlanOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CommitmentPlan>, CommitmentPlan>>;
  /** @deprecated use createOrUpdatePlan instead */
  beginCreateOrUpdatePlanAndWait: (
    resourceGroupName: string,
    commitmentPlanName: string,
    commitmentPlan: CommitmentPlan,
    options?: CommitmentPlansCreateOrUpdatePlanOptionalParams,
  ) => Promise<CommitmentPlan>;
  /** Returns a Cognitive Services commitment plan specified by the parameters. */
  getPlan: (
    resourceGroupName: string,
    commitmentPlanName: string,
    options?: CommitmentPlansGetPlanOptionalParams,
  ) => Promise<CommitmentPlan>;
  /** Gets the commitmentPlans associated with the Cognitive Services account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: CommitmentPlansListOptionalParams,
  ) => PagedAsyncIterableIterator<CommitmentPlan>;
  /** Deletes the specified commitmentPlan associated with the Cognitive Services account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    commitmentPlanName: string,
    options?: CommitmentPlansDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    commitmentPlanName: string,
    options?: CommitmentPlansDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    commitmentPlanName: string,
    options?: CommitmentPlansDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified commitmentPlans associated with the Cognitive Services account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    commitmentPlanName: string,
    commitmentPlan: CommitmentPlan,
    options?: CommitmentPlansCreateOrUpdateOptionalParams,
  ) => Promise<CommitmentPlan>;
  /** Gets the specified commitmentPlans associated with the Cognitive Services account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    commitmentPlanName: string,
    options?: CommitmentPlansGetOptionalParams,
  ) => Promise<CommitmentPlan>;
}

function _getCommitmentPlans(context: CognitiveServicesManagementContext) {
  return {
    listAssociations: (
      resourceGroupName: string,
      commitmentPlanName: string,
      options?: CommitmentPlansListAssociationsOptionalParams,
    ) => listAssociations(context, resourceGroupName, commitmentPlanName, options),
    deleteAssociation: (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlanAssociationName: string,
      options?: CommitmentPlansDeleteAssociationOptionalParams,
    ) =>
      deleteAssociation(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlanAssociationName,
        options,
      ),
    beginDeleteAssociation: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlanAssociationName: string,
      options?: CommitmentPlansDeleteAssociationOptionalParams,
    ) => {
      const poller = deleteAssociation(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlanAssociationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAssociationAndWait: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlanAssociationName: string,
      options?: CommitmentPlansDeleteAssociationOptionalParams,
    ) => {
      return await deleteAssociation(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlanAssociationName,
        options,
      );
    },
    createOrUpdateAssociation: (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlanAssociationName: string,
      association: CommitmentPlanAccountAssociation,
      options?: CommitmentPlansCreateOrUpdateAssociationOptionalParams,
    ) =>
      createOrUpdateAssociation(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlanAssociationName,
        association,
        options,
      ),
    beginCreateOrUpdateAssociation: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlanAssociationName: string,
      association: CommitmentPlanAccountAssociation,
      options?: CommitmentPlansCreateOrUpdateAssociationOptionalParams,
    ) => {
      const poller = createOrUpdateAssociation(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlanAssociationName,
        association,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAssociationAndWait: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlanAssociationName: string,
      association: CommitmentPlanAccountAssociation,
      options?: CommitmentPlansCreateOrUpdateAssociationOptionalParams,
    ) => {
      return await createOrUpdateAssociation(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlanAssociationName,
        association,
        options,
      );
    },
    getAssociation: (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlanAssociationName: string,
      options?: CommitmentPlansGetAssociationOptionalParams,
    ) =>
      getAssociation(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlanAssociationName,
        options,
      ),
    listPlansBySubscription: (options?: CommitmentPlansListPlansBySubscriptionOptionalParams) =>
      listPlansBySubscription(context, options),
    listPlansByResourceGroup: (
      resourceGroupName: string,
      options?: CommitmentPlansListPlansByResourceGroupOptionalParams,
    ) => listPlansByResourceGroup(context, resourceGroupName, options),
    deletePlan: (
      resourceGroupName: string,
      commitmentPlanName: string,
      options?: CommitmentPlansDeletePlanOptionalParams,
    ) => deletePlan(context, resourceGroupName, commitmentPlanName, options),
    beginDeletePlan: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      options?: CommitmentPlansDeletePlanOptionalParams,
    ) => {
      const poller = deletePlan(context, resourceGroupName, commitmentPlanName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeletePlanAndWait: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      options?: CommitmentPlansDeletePlanOptionalParams,
    ) => {
      return await deletePlan(context, resourceGroupName, commitmentPlanName, options);
    },
    updatePlan: (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlan: PatchResourceTagsAndSku,
      options?: CommitmentPlansUpdatePlanOptionalParams,
    ) => updatePlan(context, resourceGroupName, commitmentPlanName, commitmentPlan, options),
    beginUpdatePlan: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlan: PatchResourceTagsAndSku,
      options?: CommitmentPlansUpdatePlanOptionalParams,
    ) => {
      const poller = updatePlan(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlan,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdatePlanAndWait: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlan: PatchResourceTagsAndSku,
      options?: CommitmentPlansUpdatePlanOptionalParams,
    ) => {
      return await updatePlan(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlan,
        options,
      );
    },
    createOrUpdatePlan: (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlan: CommitmentPlan,
      options?: CommitmentPlansCreateOrUpdatePlanOptionalParams,
    ) =>
      createOrUpdatePlan(context, resourceGroupName, commitmentPlanName, commitmentPlan, options),
    beginCreateOrUpdatePlan: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlan: CommitmentPlan,
      options?: CommitmentPlansCreateOrUpdatePlanOptionalParams,
    ) => {
      const poller = createOrUpdatePlan(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlan,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdatePlanAndWait: async (
      resourceGroupName: string,
      commitmentPlanName: string,
      commitmentPlan: CommitmentPlan,
      options?: CommitmentPlansCreateOrUpdatePlanOptionalParams,
    ) => {
      return await createOrUpdatePlan(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlan,
        options,
      );
    },
    getPlan: (
      resourceGroupName: string,
      commitmentPlanName: string,
      options?: CommitmentPlansGetPlanOptionalParams,
    ) => getPlan(context, resourceGroupName, commitmentPlanName, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: CommitmentPlansListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      commitmentPlanName: string,
      options?: CommitmentPlansDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, commitmentPlanName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      commitmentPlanName: string,
      options?: CommitmentPlansDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, commitmentPlanName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      commitmentPlanName: string,
      options?: CommitmentPlansDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, commitmentPlanName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      commitmentPlanName: string,
      commitmentPlan: CommitmentPlan,
      options?: CommitmentPlansCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        commitmentPlanName,
        commitmentPlan,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      commitmentPlanName: string,
      options?: CommitmentPlansGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, commitmentPlanName, options),
  };
}

export function _getCommitmentPlansOperations(
  context: CognitiveServicesManagementContext,
): CommitmentPlansOperations {
  return {
    ..._getCommitmentPlans(context),
  };
}
