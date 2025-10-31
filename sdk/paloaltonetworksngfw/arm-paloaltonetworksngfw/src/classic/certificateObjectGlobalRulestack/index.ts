// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/certificateObjectGlobalRulestack/operations.js";
import type {
  CertificateObjectGlobalRulestackListOptionalParams,
  CertificateObjectGlobalRulestackDeleteOptionalParams,
  CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams,
  CertificateObjectGlobalRulestackGetOptionalParams,
} from "../../api/certificateObjectGlobalRulestack/options.js";
import type { CertificateObjectGlobalRulestackResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CertificateObjectGlobalRulestack operations. */
export interface CertificateObjectGlobalRulestackOperations {
  /** List CertificateObjectGlobalRulestackResource resources by Tenant */
  list: (
    globalRulestackName: string,
    options?: CertificateObjectGlobalRulestackListOptionalParams,
  ) => PagedAsyncIterableIterator<CertificateObjectGlobalRulestackResource>;
  /** Delete a CertificateObjectGlobalRulestackResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    globalRulestackName: string,
    name: string,
    options?: CertificateObjectGlobalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
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
    createOrUpdate: (
      globalRulestackName: string,
      name: string,
      resource: CertificateObjectGlobalRulestackResource,
      options?: CertificateObjectGlobalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, name, resource, options),
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
