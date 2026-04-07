// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByInstance,
  $delete,
  createOrUpdate,
  get,
} from "../../api/serverTrustCertificates/operations.js";
import type {
  ServerTrustCertificatesListByInstanceOptionalParams,
  ServerTrustCertificatesDeleteOptionalParams,
  ServerTrustCertificatesCreateOrUpdateOptionalParams,
  ServerTrustCertificatesGetOptionalParams,
} from "../../api/serverTrustCertificates/options.js";
import type { ServerTrustCertificate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerTrustCertificates operations. */
export interface ServerTrustCertificatesOperations {
  /** Gets a list of the server trust certificates used to secure communication between SQL Server and the specified SQL Managed Instance */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ServerTrustCertificatesListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ServerTrustCertificate>;
  /** Deletes a server trust certificate that was uploaded from SQL Server to SQL Managed Instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    certificateName: string,
    options?: ServerTrustCertificatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    certificateName: string,
    options?: ServerTrustCertificatesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    certificateName: string,
    options?: ServerTrustCertificatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Uploads a server trust certificate from SQL Server to SQL Managed Instance. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    certificateName: string,
    parameters: ServerTrustCertificate,
    options?: ServerTrustCertificatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerTrustCertificate>, ServerTrustCertificate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    certificateName: string,
    parameters: ServerTrustCertificate,
    options?: ServerTrustCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerTrustCertificate>, ServerTrustCertificate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    certificateName: string,
    parameters: ServerTrustCertificate,
    options?: ServerTrustCertificatesCreateOrUpdateOptionalParams,
  ) => Promise<ServerTrustCertificate>;
  /** Gets a server trust certificate that was uploaded from SQL Server to SQL Managed Instance. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    certificateName: string,
    options?: ServerTrustCertificatesGetOptionalParams,
  ) => Promise<ServerTrustCertificate>;
}

function _getServerTrustCertificates(context: SqlContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ServerTrustCertificatesListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      certificateName: string,
      options?: ServerTrustCertificatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, managedInstanceName, certificateName, options),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      certificateName: string,
      options?: ServerTrustCertificatesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        certificateName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      certificateName: string,
      options?: ServerTrustCertificatesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        certificateName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      certificateName: string,
      parameters: ServerTrustCertificate,
      options?: ServerTrustCertificatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        certificateName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      certificateName: string,
      parameters: ServerTrustCertificate,
      options?: ServerTrustCertificatesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        certificateName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      certificateName: string,
      parameters: ServerTrustCertificate,
      options?: ServerTrustCertificatesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        certificateName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      certificateName: string,
      options?: ServerTrustCertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, certificateName, options),
  };
}

export function _getServerTrustCertificatesOperations(
  context: SqlContext,
): ServerTrustCertificatesOperations {
  return {
    ..._getServerTrustCertificates(context),
  };
}
