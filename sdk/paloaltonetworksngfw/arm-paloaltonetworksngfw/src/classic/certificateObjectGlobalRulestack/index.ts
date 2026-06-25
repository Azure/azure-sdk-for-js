// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/certificateObjectGlobalRulestack/operations.js";
import {
  CertificateObjectGlobalRulestackListOptionalParams,
  CertificateObjectGlobalRulestackDeleteOptionalParams,
  CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams,
  CertificateObjectGlobalRulestackGetOptionalParams,
} from "../../api/certificateObjectGlobalRulestack/options.js";
import { CertificateObjectGlobalRulestackResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CertificateObjectGlobalRulestack operations. */
export interface CertificateObjectGlobalRulestackOperations {
  /** List CertificateObjectGlobalRulestackResource resources by Tenant */
  list: (
    globalRulestackName: string,
    options?: CertificateObjectGlobalRulestackListOptionalParams,
  ) => PagedAsyncIterableIterator<CertificateObjectGlobalRulestackResource>;
  /** Delete a CertificateObjectGlobalRulestackResource */
  delete: (
    globalRulestackName: string,
    name: string,
    options?: CertificateObjectGlobalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    globalRulestackName: string,
    name: string,
    options?: CertificateObjectGlobalRulestackDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    globalRulestackName: string,
    name: string,
    options?: CertificateObjectGlobalRulestackDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a CertificateObjectGlobalRulestackResource */
  createOrUpdate: (
    globalRulestackName: string,
    name: string,
    resource: CertificateObjectGlobalRulestackResource,
    options?: CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<CertificateObjectGlobalRulestackResource>,
    CertificateObjectGlobalRulestackResource
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    globalRulestackName: string,
    name: string,
    resource: CertificateObjectGlobalRulestackResource,
    options?: CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CertificateObjectGlobalRulestackResource>,
      CertificateObjectGlobalRulestackResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    globalRulestackName: string,
    name: string,
    resource: CertificateObjectGlobalRulestackResource,
    options?: CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<CertificateObjectGlobalRulestackResource>;
  /** Get a CertificateObjectGlobalRulestackResource */
  get: (
    globalRulestackName: string,
    name: string,
    options?: CertificateObjectGlobalRulestackGetOptionalParams,
  ) => Promise<CertificateObjectGlobalRulestackResource>;
}

function _getCertificateObjectGlobalRulestack(context: PaloAltoNetworksCloudngfwContext) {
  return {
    list: (
      globalRulestackName: string,
      options?: CertificateObjectGlobalRulestackListOptionalParams,
    ) => list(context, globalRulestackName, options),
    delete: (
      globalRulestackName: string,
      name: string,
      options?: CertificateObjectGlobalRulestackDeleteOptionalParams,
    ) => $delete(context, globalRulestackName, name, options),
    beginDelete: async (
      globalRulestackName: string,
      name: string,
      options?: CertificateObjectGlobalRulestackDeleteOptionalParams,
    ) => {
      const poller = $delete(context, globalRulestackName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      globalRulestackName: string,
      name: string,
      options?: CertificateObjectGlobalRulestackDeleteOptionalParams,
    ) => {
      return await $delete(context, globalRulestackName, name, options);
    },
    createOrUpdate: (
      globalRulestackName: string,
      name: string,
      resource: CertificateObjectGlobalRulestackResource,
      options?: CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, name, resource, options),
    beginCreateOrUpdate: async (
      globalRulestackName: string,
      name: string,
      resource: CertificateObjectGlobalRulestackResource,
      options?: CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, globalRulestackName, name, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      globalRulestackName: string,
      name: string,
      resource: CertificateObjectGlobalRulestackResource,
      options?: CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, globalRulestackName, name, resource, options);
    },
    get: (
      globalRulestackName: string,
      name: string,
      options?: CertificateObjectGlobalRulestackGetOptionalParams,
    ) => get(context, globalRulestackName, name, options),
  };
}

export function _getCertificateObjectGlobalRulestackOperations(
  context: PaloAltoNetworksCloudngfwContext,
): CertificateObjectGlobalRulestackOperations {
  return {
    ..._getCertificateObjectGlobalRulestack(context),
  };
}
