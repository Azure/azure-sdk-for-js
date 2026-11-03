// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  listByLocalRulestacks,
  $delete,
  createOrUpdate,
  get,
} from "../../api/certificateObjectLocalRulestack/operations.js";
import type {
  CertificateObjectLocalRulestackListByLocalRulestacksOptionalParams,
  CertificateObjectLocalRulestackDeleteOptionalParams,
  CertificateObjectLocalRulestackCreateOrUpdateOptionalParams,
  CertificateObjectLocalRulestackGetOptionalParams,
} from "../../api/certificateObjectLocalRulestack/options.js";
import type { CertificateObjectLocalRulestackResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CertificateObjectLocalRulestack operations. */
export interface CertificateObjectLocalRulestackOperations {
  /** List CertificateObjectLocalRulestackResource resources by LocalRulestacks */
  listByLocalRulestacks: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: CertificateObjectLocalRulestackListByLocalRulestacksOptionalParams,
  ) => PagedAsyncIterableIterator<CertificateObjectLocalRulestackResource>;
  /** Delete a CertificateObjectLocalRulestackResource */
  delete: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: CertificateObjectLocalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: CertificateObjectLocalRulestackDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: CertificateObjectLocalRulestackDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a CertificateObjectLocalRulestackResource */
  createOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: CertificateObjectLocalRulestackResource,
    options?: CertificateObjectLocalRulestackCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<CertificateObjectLocalRulestackResource>,
    CertificateObjectLocalRulestackResource
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: CertificateObjectLocalRulestackResource,
    options?: CertificateObjectLocalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CertificateObjectLocalRulestackResource>,
      CertificateObjectLocalRulestackResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    resource: CertificateObjectLocalRulestackResource,
    options?: CertificateObjectLocalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<CertificateObjectLocalRulestackResource>;
  /** Get a CertificateObjectLocalRulestackResource */
  get: (
    resourceGroupName: string,
    localRulestackName: string,
    name: string,
    options?: CertificateObjectLocalRulestackGetOptionalParams,
  ) => Promise<CertificateObjectLocalRulestackResource>;
}

function _getCertificateObjectLocalRulestack(context: PaloAltoNetworksCloudngfwContext) {
  return {
    listByLocalRulestacks: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: CertificateObjectLocalRulestackListByLocalRulestacksOptionalParams,
    ) => listByLocalRulestacks(context, resourceGroupName, localRulestackName, options),
    delete: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: CertificateObjectLocalRulestackDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, localRulestackName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: CertificateObjectLocalRulestackDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, localRulestackName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: CertificateObjectLocalRulestackDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, localRulestackName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      resource: CertificateObjectLocalRulestackResource,
      options?: CertificateObjectLocalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, localRulestackName, name, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      resource: CertificateObjectLocalRulestackResource,
      options?: CertificateObjectLocalRulestackCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        localRulestackName,
        name,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      resource: CertificateObjectLocalRulestackResource,
      options?: CertificateObjectLocalRulestackCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        localRulestackName,
        name,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      localRulestackName: string,
      name: string,
      options?: CertificateObjectLocalRulestackGetOptionalParams,
    ) => get(context, resourceGroupName, localRulestackName, name, options),
  };
}

export function _getCertificateObjectLocalRulestackOperations(
  context: PaloAltoNetworksCloudngfwContext,
): CertificateObjectLocalRulestackOperations {
  return {
    ..._getCertificateObjectLocalRulestack(context),
  };
}
