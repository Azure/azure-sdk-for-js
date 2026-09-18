// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listByCertificateAuthority,
  update,
  $delete,
  createOrReplace,
  get,
} from "../../api/certificatePolicies/operations.js";
import type {
  CertificatePoliciesListByCertificateAuthorityOptionalParams,
  CertificatePoliciesUpdateOptionalParams,
  CertificatePoliciesDeleteOptionalParams,
  CertificatePoliciesCreateOrReplaceOptionalParams,
  CertificatePoliciesGetOptionalParams,
} from "../../api/certificatePolicies/options.js";
import type { CertificatePolicy, CertificatePolicyUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CertificatePolicies operations. */
export interface CertificatePoliciesOperations {
  /** List CertificatePolicy resources by CertificateAuthority */
  listByCertificateAuthority: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    options?: CertificatePoliciesListByCertificateAuthorityOptionalParams,
  ) => PagedAsyncIterableIterator<CertificatePolicy>;
  /** Update a CertificatePolicy */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    certificatePolicyName: string,
    properties: CertificatePolicyUpdate,
    options?: CertificatePoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<CertificatePolicy>, CertificatePolicy>;
  /** Delete a CertificatePolicy */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    certificatePolicyName: string,
    options?: CertificatePoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a CertificatePolicy */
  createOrReplace: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    certificatePolicyName: string,
    resource: CertificatePolicy,
    options?: CertificatePoliciesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<CertificatePolicy>, CertificatePolicy>;
  /** Get a CertificatePolicy */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    certificateAuthorityName: string,
    certificatePolicyName: string,
    options?: CertificatePoliciesGetOptionalParams,
  ) => Promise<CertificatePolicy>;
}

function _getCertificatePolicies(context: DeviceRegistryManagementContext) {
  return {
    listByCertificateAuthority: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      options?: CertificatePoliciesListByCertificateAuthorityOptionalParams,
    ) =>
      listByCertificateAuthority(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        options,
      ),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      certificatePolicyName: string,
      properties: CertificatePolicyUpdate,
      options?: CertificatePoliciesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        certificatePolicyName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      certificatePolicyName: string,
      options?: CertificatePoliciesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        certificatePolicyName,
        options,
      ),
    createOrReplace: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      certificatePolicyName: string,
      resource: CertificatePolicy,
      options?: CertificatePoliciesCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        certificatePolicyName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      certificateAuthorityName: string,
      certificatePolicyName: string,
      options?: CertificatePoliciesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        certificatePolicyName,
        options,
      ),
  };
}

export function _getCertificatePoliciesOperations(
  context: DeviceRegistryManagementContext,
): CertificatePoliciesOperations {
  return {
    ..._getCertificatePolicies(context),
  };
}
