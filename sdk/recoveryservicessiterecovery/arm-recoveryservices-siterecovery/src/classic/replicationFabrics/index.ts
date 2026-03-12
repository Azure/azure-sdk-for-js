// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  removeInfra,
  renewCertificate,
  $delete,
  reassociateGateway,
  migrateToAad,
  checkConsistency,
  list,
  purge,
  create,
  get,
} from "../../api/replicationFabrics/operations.js";
import type {
  ReplicationFabricsRemoveInfraOptionalParams,
  ReplicationFabricsRenewCertificateOptionalParams,
  ReplicationFabricsDeleteOptionalParams,
  ReplicationFabricsReassociateGatewayOptionalParams,
  ReplicationFabricsMigrateToAadOptionalParams,
  ReplicationFabricsCheckConsistencyOptionalParams,
  ReplicationFabricsListOptionalParams,
  ReplicationFabricsPurgeOptionalParams,
  ReplicationFabricsCreateOptionalParams,
  ReplicationFabricsGetOptionalParams,
} from "../../api/replicationFabrics/options.js";
import type {
  Fabric,
  FabricCreationInput,
  FailoverProcessServerRequest,
  RenewCertificateInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationFabrics operations. */
export interface ReplicationFabricsOperations {
  /** Removes the appliance's infrastructure under the fabric. */
  removeInfra: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsRemoveInfraOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use removeInfra instead */
  beginRemoveInfra: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsRemoveInfraOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use removeInfra instead */
  beginRemoveInfraAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsRemoveInfraOptionalParams,
  ) => Promise<void>;
  /** Renews the connection certificate for the ASR replication fabric. */
  renewCertificate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    renewCertificateParameter: RenewCertificateInput,
    options?: ReplicationFabricsRenewCertificateOptionalParams,
  ) => PollerLike<OperationState<Fabric>, Fabric>;
  /** @deprecated use renewCertificate instead */
  beginRenewCertificate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    renewCertificateParameter: RenewCertificateInput,
    options?: ReplicationFabricsRenewCertificateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Fabric>, Fabric>>;
  /** @deprecated use renewCertificate instead */
  beginRenewCertificateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    renewCertificateParameter: RenewCertificateInput,
    options?: ReplicationFabricsRenewCertificateOptionalParams,
  ) => Promise<Fabric>;
  /** The operation to delete or remove an Azure Site Recovery fabric. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to move replications from a process server to another process server. */
  reassociateGateway: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    failoverProcessServerRequest: FailoverProcessServerRequest,
    options?: ReplicationFabricsReassociateGatewayOptionalParams,
  ) => PollerLike<OperationState<Fabric>, Fabric>;
  /** @deprecated use reassociateGateway instead */
  beginReassociateGateway: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    failoverProcessServerRequest: FailoverProcessServerRequest,
    options?: ReplicationFabricsReassociateGatewayOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Fabric>, Fabric>>;
  /** @deprecated use reassociateGateway instead */
  beginReassociateGatewayAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    failoverProcessServerRequest: FailoverProcessServerRequest,
    options?: ReplicationFabricsReassociateGatewayOptionalParams,
  ) => Promise<Fabric>;
  /** The operation to migrate an Azure Site Recovery fabric to AAD. */
  migrateToAad: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsMigrateToAadOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use migrateToAad instead */
  beginMigrateToAad: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsMigrateToAadOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use migrateToAad instead */
  beginMigrateToAadAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsMigrateToAadOptionalParams,
  ) => Promise<void>;
  /** The operation to perform a consistency check on the fabric. */
  checkConsistency: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsCheckConsistencyOptionalParams,
  ) => PollerLike<OperationState<Fabric>, Fabric>;
  /** @deprecated use checkConsistency instead */
  beginCheckConsistency: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsCheckConsistencyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Fabric>, Fabric>>;
  /** @deprecated use checkConsistency instead */
  beginCheckConsistencyAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsCheckConsistencyOptionalParams,
  ) => Promise<Fabric>;
  /** Gets a list of the Azure Site Recovery fabrics in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationFabricsListOptionalParams,
  ) => PagedAsyncIterableIterator<Fabric>;
  /** The operation to purge(force delete) an Azure Site Recovery fabric. */
  purge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purge instead */
  beginPurge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsPurgeOptionalParams,
  ) => Promise<void>;
  /** The operation to create an Azure Site Recovery fabric (for e.g. Hyper-V site). */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    input: FabricCreationInput,
    options?: ReplicationFabricsCreateOptionalParams,
  ) => PollerLike<OperationState<Fabric>, Fabric>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    input: FabricCreationInput,
    options?: ReplicationFabricsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Fabric>, Fabric>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    input: FabricCreationInput,
    options?: ReplicationFabricsCreateOptionalParams,
  ) => Promise<Fabric>;
  /** Gets the details of an Azure Site Recovery fabric. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationFabricsGetOptionalParams,
  ) => Promise<Fabric>;
}

function _getReplicationFabrics(context: SiteRecoveryManagementContext) {
  return {
    removeInfra: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsRemoveInfraOptionalParams,
    ) => removeInfra(context, resourceGroupName, resourceName, fabricName, options),
    beginRemoveInfra: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsRemoveInfraOptionalParams,
    ) => {
      const poller = removeInfra(context, resourceGroupName, resourceName, fabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRemoveInfraAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsRemoveInfraOptionalParams,
    ) => {
      return await removeInfra(context, resourceGroupName, resourceName, fabricName, options);
    },
    renewCertificate: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      renewCertificateParameter: RenewCertificateInput,
      options?: ReplicationFabricsRenewCertificateOptionalParams,
    ) =>
      renewCertificate(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        renewCertificateParameter,
        options,
      ),
    beginRenewCertificate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      renewCertificateParameter: RenewCertificateInput,
      options?: ReplicationFabricsRenewCertificateOptionalParams,
    ) => {
      const poller = renewCertificate(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        renewCertificateParameter,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRenewCertificateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      renewCertificateParameter: RenewCertificateInput,
      options?: ReplicationFabricsRenewCertificateOptionalParams,
    ) => {
      return await renewCertificate(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        renewCertificateParameter,
        options,
      );
    },
    delete: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, fabricName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, fabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, fabricName, options);
    },
    reassociateGateway: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      failoverProcessServerRequest: FailoverProcessServerRequest,
      options?: ReplicationFabricsReassociateGatewayOptionalParams,
    ) =>
      reassociateGateway(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        failoverProcessServerRequest,
        options,
      ),
    beginReassociateGateway: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      failoverProcessServerRequest: FailoverProcessServerRequest,
      options?: ReplicationFabricsReassociateGatewayOptionalParams,
    ) => {
      const poller = reassociateGateway(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        failoverProcessServerRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReassociateGatewayAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      failoverProcessServerRequest: FailoverProcessServerRequest,
      options?: ReplicationFabricsReassociateGatewayOptionalParams,
    ) => {
      return await reassociateGateway(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        failoverProcessServerRequest,
        options,
      );
    },
    migrateToAad: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsMigrateToAadOptionalParams,
    ) => migrateToAad(context, resourceGroupName, resourceName, fabricName, options),
    beginMigrateToAad: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsMigrateToAadOptionalParams,
    ) => {
      const poller = migrateToAad(context, resourceGroupName, resourceName, fabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateToAadAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsMigrateToAadOptionalParams,
    ) => {
      return await migrateToAad(context, resourceGroupName, resourceName, fabricName, options);
    },
    checkConsistency: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsCheckConsistencyOptionalParams,
    ) => checkConsistency(context, resourceGroupName, resourceName, fabricName, options),
    beginCheckConsistency: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsCheckConsistencyOptionalParams,
    ) => {
      const poller = checkConsistency(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCheckConsistencyAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsCheckConsistencyOptionalParams,
    ) => {
      return await checkConsistency(context, resourceGroupName, resourceName, fabricName, options);
    },
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationFabricsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    purge: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsPurgeOptionalParams,
    ) => purge(context, resourceGroupName, resourceName, fabricName, options),
    beginPurge: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsPurgeOptionalParams,
    ) => {
      const poller = purge(context, resourceGroupName, resourceName, fabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsPurgeOptionalParams,
    ) => {
      return await purge(context, resourceGroupName, resourceName, fabricName, options);
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      input: FabricCreationInput,
      options?: ReplicationFabricsCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, fabricName, input, options),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      input: FabricCreationInput,
      options?: ReplicationFabricsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, resourceName, fabricName, input, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      input: FabricCreationInput,
      options?: ReplicationFabricsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, resourceName, fabricName, input, options);
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationFabricsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, fabricName, options),
  };
}

export function _getReplicationFabricsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationFabricsOperations {
  return {
    ..._getReplicationFabrics(context),
  };
}
