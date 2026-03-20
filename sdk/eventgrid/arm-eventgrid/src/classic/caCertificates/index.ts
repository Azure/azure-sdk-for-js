// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  listByNamespace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/caCertificates/operations.js";
import type {
  CaCertificatesListByNamespaceOptionalParams,
  CaCertificatesDeleteOptionalParams,
  CaCertificatesCreateOrUpdateOptionalParams,
  CaCertificatesGetOptionalParams,
} from "../../api/caCertificates/options.js";
import type { CaCertificate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CaCertificates operations. */
export interface CaCertificatesOperations {
  /** Get all the CA certificates under a namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: CaCertificatesListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<CaCertificate>;
  /** Delete an existing CA certificate. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    caCertificateName: string,
    options?: CaCertificatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    namespaceName: string,
    caCertificateName: string,
    options?: CaCertificatesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    caCertificateName: string,
    options?: CaCertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a CA certificate with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    caCertificateName: string,
    caCertificateInfo: CaCertificate,
    options?: CaCertificatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CaCertificate>, CaCertificate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    caCertificateName: string,
    caCertificateInfo: CaCertificate,
    options?: CaCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CaCertificate>, CaCertificate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    caCertificateName: string,
    caCertificateInfo: CaCertificate,
    options?: CaCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<CaCertificate>;
  /** Get properties of a CA certificate. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    caCertificateName: string,
    options?: CaCertificatesGetOptionalParams,
  ) => Promise<CaCertificate>;
}

function _getCaCertificates(context: EventGridManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: CaCertificatesListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      caCertificateName: string,
      options?: CaCertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, caCertificateName, options),
    beginDelete: async (
      resourceGroupName: string,
      namespaceName: string,
      caCertificateName: string,
      options?: CaCertificatesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, namespaceName, caCertificateName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      caCertificateName: string,
      options?: CaCertificatesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, namespaceName, caCertificateName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      caCertificateName: string,
      caCertificateInfo: CaCertificate,
      options?: CaCertificatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        caCertificateName,
        caCertificateInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      caCertificateName: string,
      caCertificateInfo: CaCertificate,
      options?: CaCertificatesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        caCertificateName,
        caCertificateInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      caCertificateName: string,
      caCertificateInfo: CaCertificate,
      options?: CaCertificatesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        caCertificateName,
        caCertificateInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      namespaceName: string,
      caCertificateName: string,
      options?: CaCertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, caCertificateName, options),
  };
}

export function _getCaCertificatesOperations(
  context: EventGridManagementContext,
): CaCertificatesOperations {
  return {
    ..._getCaCertificates(context),
  };
}
