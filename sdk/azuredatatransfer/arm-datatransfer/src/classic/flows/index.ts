// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext } from "../../api/azureDataTransferContext.js";
import {
  setSourceAddresses,
  setPassphrase,
  setDestinationEndpoints,
  setDestinationEndpointPorts,
  link,
  getStreamConnectionString,
  getSourceAddresses,
  getDestinationEndpoints,
  getDestinationEndpointPorts,
  generatePassphrase,
  enable,
  disable,
  listByConnection,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/flows/operations.js";
import type {
  FlowsSetSourceAddressesOptionalParams,
  FlowsSetPassphraseOptionalParams,
  FlowsSetDestinationEndpointsOptionalParams,
  FlowsSetDestinationEndpointPortsOptionalParams,
  FlowsLinkOptionalParams,
  FlowsGetStreamConnectionStringOptionalParams,
  FlowsGetSourceAddressesOptionalParams,
  FlowsGetDestinationEndpointsOptionalParams,
  FlowsGetDestinationEndpointPortsOptionalParams,
  FlowsGeneratePassphraseOptionalParams,
  FlowsEnableOptionalParams,
  FlowsDisableOptionalParams,
  FlowsListByConnectionOptionalParams,
  FlowsDeleteOptionalParams,
  FlowsUpdateOptionalParams,
  FlowsCreateOrUpdateOptionalParams,
  FlowsGetOptionalParams,
} from "../../api/flows/options.js";
import type {
  ResourceBody,
  Flow,
  StreamSourceAddresses,
  FlowsPatch,
  GetDestinationEndpointPortsResult,
  GetDestinationEndpointsResult,
  GetStreamConnectionStringResult,
  SetDestinationEndpointPorts,
  SetDestinationEndpoints,
  SetStreamPassphrase,
  SetSourceAddresses,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Flows operations. */
export interface FlowsOperations {
  /** Set the source addresses for the specified flow. */
  setSourceAddresses: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    sourceAddresses: SetSourceAddresses,
    options?: FlowsSetSourceAddressesOptionalParams,
  ) => PollerLike<OperationState<Flow>, Flow>;
  /** Sets the passphrase of the specified flow. */
  setPassphrase: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    passphrase: SetStreamPassphrase,
    options?: FlowsSetPassphraseOptionalParams,
  ) => PollerLike<OperationState<Flow>, Flow>;
  /** Set the destination endpoints for the specified flow. */
  setDestinationEndpoints: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    streamDestinationEndpoints: SetDestinationEndpoints,
    options?: FlowsSetDestinationEndpointsOptionalParams,
  ) => PollerLike<OperationState<Flow>, Flow>;
  /** Set the destination endpoint ports for the specified flow. */
  setDestinationEndpointPorts: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    streamDestinationEndpointPorts: SetDestinationEndpointPorts,
    options?: FlowsSetDestinationEndpointPortsOptionalParams,
  ) => PollerLike<OperationState<Flow>, Flow>;
  /** Links the specified flow. */
  link: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    flow: ResourceBody,
    options?: FlowsLinkOptionalParams,
  ) => PollerLike<OperationState<Flow>, Flow>;
  /** Get the connection string for the specified flow. */
  getStreamConnectionString: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    options?: FlowsGetStreamConnectionStringOptionalParams,
  ) => Promise<GetStreamConnectionStringResult>;
  /** Get the source addresses for the specified flow. */
  getSourceAddresses: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    options?: FlowsGetSourceAddressesOptionalParams,
  ) => Promise<StreamSourceAddresses>;
  /** Get the destination endpoints for the specified flow. */
  getDestinationEndpoints: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    options?: FlowsGetDestinationEndpointsOptionalParams,
  ) => Promise<GetDestinationEndpointsResult>;
  /** Get the destination endpoint ports for the specified flow. */
  getDestinationEndpointPorts: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    options?: FlowsGetDestinationEndpointPortsOptionalParams,
  ) => Promise<GetDestinationEndpointPortsResult>;
  /** Generate a compliant passphrase for the specified flow. */
  generatePassphrase: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    options?: FlowsGeneratePassphraseOptionalParams,
  ) => PollerLike<OperationState<Flow>, Flow>;
  /** Enables the specified flow. */
  enable: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    options?: FlowsEnableOptionalParams,
  ) => PollerLike<OperationState<Flow>, Flow>;
  /** Disables the specified flow */
  disable: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    options?: FlowsDisableOptionalParams,
  ) => PollerLike<OperationState<Flow>, Flow>;
  /** Gets flows in a connection. */
  listByConnection: (
    resourceGroupName: string,
    connectionName: string,
    options?: FlowsListByConnectionOptionalParams,
  ) => PagedAsyncIterableIterator<Flow>;
  /** Deletes the flow resource. */
  delete: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    options?: FlowsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the flow resource. */
  update: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    flow: FlowsPatch,
    options?: FlowsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates the flow resource. */
  createOrUpdate: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    flow: Flow,
    options?: FlowsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Flow>, Flow>;
  /** Gets flow resource. */
  get: (
    resourceGroupName: string,
    connectionName: string,
    flowName: string,
    options?: FlowsGetOptionalParams,
  ) => Promise<Flow>;
}

function _getFlows(context: AzureDataTransferContext) {
  return {
    setSourceAddresses: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      sourceAddresses: SetSourceAddresses,
      options?: FlowsSetSourceAddressesOptionalParams,
    ) =>
      setSourceAddresses(
        context,
        resourceGroupName,
        connectionName,
        flowName,
        sourceAddresses,
        options,
      ),
    setPassphrase: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      passphrase: SetStreamPassphrase,
      options?: FlowsSetPassphraseOptionalParams,
    ) => setPassphrase(context, resourceGroupName, connectionName, flowName, passphrase, options),
    setDestinationEndpoints: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      streamDestinationEndpoints: SetDestinationEndpoints,
      options?: FlowsSetDestinationEndpointsOptionalParams,
    ) =>
      setDestinationEndpoints(
        context,
        resourceGroupName,
        connectionName,
        flowName,
        streamDestinationEndpoints,
        options,
      ),
    setDestinationEndpointPorts: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      streamDestinationEndpointPorts: SetDestinationEndpointPorts,
      options?: FlowsSetDestinationEndpointPortsOptionalParams,
    ) =>
      setDestinationEndpointPorts(
        context,
        resourceGroupName,
        connectionName,
        flowName,
        streamDestinationEndpointPorts,
        options,
      ),
    link: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      flow: ResourceBody,
      options?: FlowsLinkOptionalParams,
    ) => link(context, resourceGroupName, connectionName, flowName, flow, options),
    getStreamConnectionString: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      options?: FlowsGetStreamConnectionStringOptionalParams,
    ) => getStreamConnectionString(context, resourceGroupName, connectionName, flowName, options),
    getSourceAddresses: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      options?: FlowsGetSourceAddressesOptionalParams,
    ) => getSourceAddresses(context, resourceGroupName, connectionName, flowName, options),
    getDestinationEndpoints: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      options?: FlowsGetDestinationEndpointsOptionalParams,
    ) => getDestinationEndpoints(context, resourceGroupName, connectionName, flowName, options),
    getDestinationEndpointPorts: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      options?: FlowsGetDestinationEndpointPortsOptionalParams,
    ) => getDestinationEndpointPorts(context, resourceGroupName, connectionName, flowName, options),
    generatePassphrase: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      options?: FlowsGeneratePassphraseOptionalParams,
    ) => generatePassphrase(context, resourceGroupName, connectionName, flowName, options),
    enable: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      options?: FlowsEnableOptionalParams,
    ) => enable(context, resourceGroupName, connectionName, flowName, options),
    disable: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      options?: FlowsDisableOptionalParams,
    ) => disable(context, resourceGroupName, connectionName, flowName, options),
    listByConnection: (
      resourceGroupName: string,
      connectionName: string,
      options?: FlowsListByConnectionOptionalParams,
    ) => listByConnection(context, resourceGroupName, connectionName, options),
    delete: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      options?: FlowsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, connectionName, flowName, options),
    update: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      flow: FlowsPatch,
      options?: FlowsUpdateOptionalParams,
    ) => update(context, resourceGroupName, connectionName, flowName, flow, options),
    createOrUpdate: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      flow: Flow,
      options?: FlowsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, connectionName, flowName, flow, options),
    get: (
      resourceGroupName: string,
      connectionName: string,
      flowName: string,
      options?: FlowsGetOptionalParams,
    ) => get(context, resourceGroupName, connectionName, flowName, options),
  };
}

export function _getFlowsOperations(context: AzureDataTransferContext): FlowsOperations {
  return {
    ..._getFlows(context),
  };
}
