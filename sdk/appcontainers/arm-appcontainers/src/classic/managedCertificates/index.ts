// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedCertificates/operations.js";
import {
  ManagedCertificatesListOptionalParams,
  ManagedCertificatesDeleteOptionalParams,
  ManagedCertificatesUpdateOptionalParams,
  ManagedCertificatesCreateOrUpdateOptionalParams,
  ManagedCertificatesGetOptionalParams,
} from "../../api/managedCertificates/options.js";
import { ManagedCertificate, ManagedCertificatePatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedCertificates operations. */
export interface ManagedCertificatesOperations {
  /** Get the Managed Certificates in a given managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedCertificatesListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedCertificate>;
  /** Deletes the specified Managed Certificate. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    managedCertificateName: string,
    options?: ManagedCertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a managed certificate. Oly patching of tags is supported */
  update: (
    resourceGroupName: string,
    environmentName: string,
    managedCertificateName: string,
    managedCertificateEnvelope: ManagedCertificatePatch,
    options?: ManagedCertificatesUpdateOptionalParams,
  ) => Promise<ManagedCertificate>;
  /** Create or Update a Managed Certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    managedCertificateName: string,
    options?: ManagedCertificatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedCertificate>, ManagedCertificate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    managedCertificateName: string,
    options?: ManagedCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedCertificate>, ManagedCertificate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    environmentName: string,
    managedCertificateName: string,
    options?: ManagedCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedCertificate>;
  /** Get the specified Managed Certificate. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    managedCertificateName: string,
    options?: ManagedCertificatesGetOptionalParams,
  ) => Promise<ManagedCertificate>;
}

function _getManagedCertificates(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedCertificatesListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      managedCertificateName: string,
      options?: ManagedCertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, managedCertificateName, options),
    update: (
      resourceGroupName: string,
      environmentName: string,
      managedCertificateName: string,
      managedCertificateEnvelope: ManagedCertificatePatch,
      options?: ManagedCertificatesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        environmentName,
        managedCertificateName,
        managedCertificateEnvelope,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      managedCertificateName: string,
      options?: ManagedCertificatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, environmentName, managedCertificateName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      environmentName: string,
      managedCertificateName: string,
      options?: ManagedCertificatesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        managedCertificateName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      managedCertificateName: string,
      options?: ManagedCertificatesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        managedCertificateName,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      environmentName: string,
      managedCertificateName: string,
      options?: ManagedCertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, managedCertificateName, options),
  };
}

export function _getManagedCertificatesOperations(
  context: ContainerAppsAPIContext,
): ManagedCertificatesOperations {
  return {
    ..._getManagedCertificates(context),
  };
}
