// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import {
  listForResource,
  deleteAtResource,
  createOrUpdateAtResource,
  getAtResource,
  listForResourceGroup,
  deleteAtResourceGroup,
  createOrUpdateAtResourceGroup,
  getAtResourceGroup,
  listForSubscription,
  deleteAtSubscription,
  createOrUpdateAtSubscription,
  getAtSubscription,
} from "../../api/attestations/operations.js";
import type {
  AttestationsListForResourceOptionalParams,
  AttestationsDeleteAtResourceOptionalParams,
  AttestationsCreateOrUpdateAtResourceOptionalParams,
  AttestationsGetAtResourceOptionalParams,
  AttestationsListForResourceGroupOptionalParams,
  AttestationsDeleteAtResourceGroupOptionalParams,
  AttestationsCreateOrUpdateAtResourceGroupOptionalParams,
  AttestationsGetAtResourceGroupOptionalParams,
  AttestationsListForSubscriptionOptionalParams,
  AttestationsDeleteAtSubscriptionOptionalParams,
  AttestationsCreateOrUpdateAtSubscriptionOptionalParams,
  AttestationsGetAtSubscriptionOptionalParams,
} from "../../api/attestations/options.js";
import type { Attestation } from "../../models/policyInsightsApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Attestations operations. */
export interface AttestationsOperations {
  /** Gets all attestations for a resource. */
  listForResource: (
    resourceId: string,
    options?: AttestationsListForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<Attestation>;
  /** Deletes an existing attestation at individual resource scope. */
  deleteAtResource: (
    resourceId: string,
    attestationName: string,
    options?: AttestationsDeleteAtResourceOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an attestation at resource scope. */
  createOrUpdateAtResource: (
    resourceId: string,
    attestationName: string,
    parameters: Attestation,
    options?: AttestationsCreateOrUpdateAtResourceOptionalParams,
  ) => PollerLike<OperationState<Attestation>, Attestation>;
  /** @deprecated use createOrUpdateAtResource instead */
  beginCreateOrUpdateAtResource: (
    resourceId: string,
    attestationName: string,
    parameters: Attestation,
    options?: AttestationsCreateOrUpdateAtResourceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Attestation>, Attestation>>;
  /** @deprecated use createOrUpdateAtResource instead */
  beginCreateOrUpdateAtResourceAndWait: (
    resourceId: string,
    attestationName: string,
    parameters: Attestation,
    options?: AttestationsCreateOrUpdateAtResourceOptionalParams,
  ) => Promise<Attestation>;
  /** Gets an existing attestation at resource scope. */
  getAtResource: (
    resourceId: string,
    attestationName: string,
    options?: AttestationsGetAtResourceOptionalParams,
  ) => Promise<Attestation>;
  /** Gets all attestations for the resource group. */
  listForResourceGroup: (
    resourceGroupName: string,
    options?: AttestationsListForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Attestation>;
  /** Deletes an existing attestation at resource group scope. */
  deleteAtResourceGroup: (
    resourceGroupName: string,
    attestationName: string,
    options?: AttestationsDeleteAtResourceGroupOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an attestation at resource group scope. */
  createOrUpdateAtResourceGroup: (
    resourceGroupName: string,
    attestationName: string,
    parameters: Attestation,
    options?: AttestationsCreateOrUpdateAtResourceGroupOptionalParams,
  ) => PollerLike<OperationState<Attestation>, Attestation>;
  /** @deprecated use createOrUpdateAtResourceGroup instead */
  beginCreateOrUpdateAtResourceGroup: (
    resourceGroupName: string,
    attestationName: string,
    parameters: Attestation,
    options?: AttestationsCreateOrUpdateAtResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Attestation>, Attestation>>;
  /** @deprecated use createOrUpdateAtResourceGroup instead */
  beginCreateOrUpdateAtResourceGroupAndWait: (
    resourceGroupName: string,
    attestationName: string,
    parameters: Attestation,
    options?: AttestationsCreateOrUpdateAtResourceGroupOptionalParams,
  ) => Promise<Attestation>;
  /** Gets an existing attestation at resource group scope. */
  getAtResourceGroup: (
    resourceGroupName: string,
    attestationName: string,
    options?: AttestationsGetAtResourceGroupOptionalParams,
  ) => Promise<Attestation>;
  /** Gets all attestations for the subscription. */
  listForSubscription: (
    options?: AttestationsListForSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Attestation>;
  /** Deletes an existing attestation at subscription scope. */
  deleteAtSubscription: (
    attestationName: string,
    options?: AttestationsDeleteAtSubscriptionOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an attestation at subscription scope. */
  createOrUpdateAtSubscription: (
    attestationName: string,
    parameters: Attestation,
    options?: AttestationsCreateOrUpdateAtSubscriptionOptionalParams,
  ) => PollerLike<OperationState<Attestation>, Attestation>;
  /** @deprecated use createOrUpdateAtSubscription instead */
  beginCreateOrUpdateAtSubscription: (
    attestationName: string,
    parameters: Attestation,
    options?: AttestationsCreateOrUpdateAtSubscriptionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Attestation>, Attestation>>;
  /** @deprecated use createOrUpdateAtSubscription instead */
  beginCreateOrUpdateAtSubscriptionAndWait: (
    attestationName: string,
    parameters: Attestation,
    options?: AttestationsCreateOrUpdateAtSubscriptionOptionalParams,
  ) => Promise<Attestation>;
  /** Gets an existing attestation at subscription scope. */
  getAtSubscription: (
    attestationName: string,
    options?: AttestationsGetAtSubscriptionOptionalParams,
  ) => Promise<Attestation>;
}

function _getAttestations(context: PolicyInsightsContext) {
  return {
    listForResource: (resourceId: string, options?: AttestationsListForResourceOptionalParams) =>
      listForResource(context, resourceId, options),
    deleteAtResource: (
      resourceId: string,
      attestationName: string,
      options?: AttestationsDeleteAtResourceOptionalParams,
    ) => deleteAtResource(context, resourceId, attestationName, options),
    createOrUpdateAtResource: (
      resourceId: string,
      attestationName: string,
      parameters: Attestation,
      options?: AttestationsCreateOrUpdateAtResourceOptionalParams,
    ) => createOrUpdateAtResource(context, resourceId, attestationName, parameters, options),
    beginCreateOrUpdateAtResource: async (
      resourceId: string,
      attestationName: string,
      parameters: Attestation,
      options?: AttestationsCreateOrUpdateAtResourceOptionalParams,
    ) => {
      const poller = createOrUpdateAtResource(
        context,
        resourceId,
        attestationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtResourceAndWait: async (
      resourceId: string,
      attestationName: string,
      parameters: Attestation,
      options?: AttestationsCreateOrUpdateAtResourceOptionalParams,
    ) => {
      return await createOrUpdateAtResource(
        context,
        resourceId,
        attestationName,
        parameters,
        options,
      );
    },
    getAtResource: (
      resourceId: string,
      attestationName: string,
      options?: AttestationsGetAtResourceOptionalParams,
    ) => getAtResource(context, resourceId, attestationName, options),
    listForResourceGroup: (
      resourceGroupName: string,
      options?: AttestationsListForResourceGroupOptionalParams,
    ) => listForResourceGroup(context, resourceGroupName, options),
    deleteAtResourceGroup: (
      resourceGroupName: string,
      attestationName: string,
      options?: AttestationsDeleteAtResourceGroupOptionalParams,
    ) => deleteAtResourceGroup(context, resourceGroupName, attestationName, options),
    createOrUpdateAtResourceGroup: (
      resourceGroupName: string,
      attestationName: string,
      parameters: Attestation,
      options?: AttestationsCreateOrUpdateAtResourceGroupOptionalParams,
    ) =>
      createOrUpdateAtResourceGroup(
        context,
        resourceGroupName,
        attestationName,
        parameters,
        options,
      ),
    beginCreateOrUpdateAtResourceGroup: async (
      resourceGroupName: string,
      attestationName: string,
      parameters: Attestation,
      options?: AttestationsCreateOrUpdateAtResourceGroupOptionalParams,
    ) => {
      const poller = createOrUpdateAtResourceGroup(
        context,
        resourceGroupName,
        attestationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtResourceGroupAndWait: async (
      resourceGroupName: string,
      attestationName: string,
      parameters: Attestation,
      options?: AttestationsCreateOrUpdateAtResourceGroupOptionalParams,
    ) => {
      return await createOrUpdateAtResourceGroup(
        context,
        resourceGroupName,
        attestationName,
        parameters,
        options,
      );
    },
    getAtResourceGroup: (
      resourceGroupName: string,
      attestationName: string,
      options?: AttestationsGetAtResourceGroupOptionalParams,
    ) => getAtResourceGroup(context, resourceGroupName, attestationName, options),
    listForSubscription: (options?: AttestationsListForSubscriptionOptionalParams) =>
      listForSubscription(context, options),
    deleteAtSubscription: (
      attestationName: string,
      options?: AttestationsDeleteAtSubscriptionOptionalParams,
    ) => deleteAtSubscription(context, attestationName, options),
    createOrUpdateAtSubscription: (
      attestationName: string,
      parameters: Attestation,
      options?: AttestationsCreateOrUpdateAtSubscriptionOptionalParams,
    ) => createOrUpdateAtSubscription(context, attestationName, parameters, options),
    beginCreateOrUpdateAtSubscription: async (
      attestationName: string,
      parameters: Attestation,
      options?: AttestationsCreateOrUpdateAtSubscriptionOptionalParams,
    ) => {
      const poller = createOrUpdateAtSubscription(context, attestationName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtSubscriptionAndWait: async (
      attestationName: string,
      parameters: Attestation,
      options?: AttestationsCreateOrUpdateAtSubscriptionOptionalParams,
    ) => {
      return await createOrUpdateAtSubscription(context, attestationName, parameters, options);
    },
    getAtSubscription: (
      attestationName: string,
      options?: AttestationsGetAtSubscriptionOptionalParams,
    ) => getAtSubscription(context, attestationName, options),
  };
}

export function _getAttestationsOperations(context: PolicyInsightsContext): AttestationsOperations {
  return {
    ..._getAttestations(context),
  };
}
