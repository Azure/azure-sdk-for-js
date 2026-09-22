// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext } from "../../api/nginxManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/certificates/operations.js";
import type {
  CertificatesListOptionalParams,
  CertificatesDeleteOptionalParams,
  CertificatesCreateOrUpdateOptionalParams,
  CertificatesGetOptionalParams,
} from "../../api/certificates/options.js";
import type { NginxCertificate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Certificates operations. */
export interface CertificatesOperations {
  /** List all certificates of given NGINX deployment */
  list: (
    resourceGroupName: string,
    deploymentName: string,
    options?: CertificatesListOptionalParams,
  ) => PagedAsyncIterableIterator<NginxCertificate>;
  /** Deletes a certificate from the NGINX deployment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the NGINX certificates for given NGINX deployment */
  createOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NginxCertificate>, NginxCertificate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NginxCertificate>, NginxCertificate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesCreateOrUpdateOptionalParams,
  ) => Promise<NginxCertificate>;
  /** Get a certificate of given NGINX deployment */
  get: (
    resourceGroupName: string,
    deploymentName: string,
    certificateName: string,
    options?: CertificatesGetOptionalParams,
  ) => Promise<NginxCertificate>;
}

function _getCertificates(context: NginxManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      deploymentName: string,
      options?: CertificatesListOptionalParams,
    ) => list(context, resourceGroupName, deploymentName, options),
    delete: (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deploymentName, certificateName, options),
    beginDelete: async (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, deploymentName, certificateName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, deploymentName, certificateName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, deploymentName, certificateName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        deploymentName,
        certificateName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        deploymentName,
        certificateName,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      deploymentName: string,
      certificateName: string,
      options?: CertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, deploymentName, certificateName, options),
  };
}

export function _getCertificatesOperations(
  context: NginxManagementContext,
): CertificatesOperations {
  return {
    ..._getCertificates(context),
  };
}
