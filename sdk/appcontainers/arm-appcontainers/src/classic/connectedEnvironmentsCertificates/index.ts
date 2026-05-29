// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/connectedEnvironmentsCertificates/operations.js";
import {
  ConnectedEnvironmentsCertificatesListOptionalParams,
  ConnectedEnvironmentsCertificatesDeleteOptionalParams,
  ConnectedEnvironmentsCertificatesUpdateOptionalParams,
  ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
  ConnectedEnvironmentsCertificatesGetOptionalParams,
} from "../../api/connectedEnvironmentsCertificates/options.js";
import { Certificate, CertificatePatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectedEnvironmentsCertificates operations. */
export interface ConnectedEnvironmentsCertificatesOperations {
  /** Get the Certificates in a given connected environment. */
  list: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsCertificatesListOptionalParams,
  ) => PagedAsyncIterableIterator<Certificate>;
  /** Deletes the specified Certificate. */
  delete: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a certificate. Currently only patching of tags is supported */
  update: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    certificateEnvelope: CertificatePatch,
    options?: ConnectedEnvironmentsCertificatesUpdateOptionalParams,
  ) => PollerLike<OperationState<Certificate>, Certificate>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    certificateEnvelope: CertificatePatch,
    options?: ConnectedEnvironmentsCertificatesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Certificate>, Certificate>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    certificateEnvelope: CertificatePatch,
    options?: ConnectedEnvironmentsCertificatesUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Create or Update a Certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Certificate>, Certificate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Certificate>, Certificate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Get the specified Certificate. */
  get: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    certificateName: string,
    options?: ConnectedEnvironmentsCertificatesGetOptionalParams,
  ) => Promise<Certificate>;
}

function _getConnectedEnvironmentsCertificates(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      options?: ConnectedEnvironmentsCertificatesListOptionalParams,
    ) => list(context, resourceGroupName, connectedEnvironmentName, options),
    delete: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      options?: ConnectedEnvironmentsCertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, connectedEnvironmentName, certificateName, options),
    beginDelete: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      options?: ConnectedEnvironmentsCertificatesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      options?: ConnectedEnvironmentsCertificatesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      certificateEnvelope: CertificatePatch,
      options?: ConnectedEnvironmentsCertificatesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        certificateEnvelope,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      certificateEnvelope: CertificatePatch,
      options?: ConnectedEnvironmentsCertificatesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        certificateEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      certificateEnvelope: CertificatePatch,
      options?: ConnectedEnvironmentsCertificatesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        certificateEnvelope,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      options?: ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      options?: ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      options?: ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      certificateName: string,
      options?: ConnectedEnvironmentsCertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, connectedEnvironmentName, certificateName, options),
  };
}

export function _getConnectedEnvironmentsCertificatesOperations(
  context: ContainerAppsAPIContext,
): ConnectedEnvironmentsCertificatesOperations {
  return {
    ..._getConnectedEnvironmentsCertificates(context),
  };
}
