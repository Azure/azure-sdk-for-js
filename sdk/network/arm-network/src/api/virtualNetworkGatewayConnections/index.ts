// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  resetConnection,
  getIkeSas,
  stopPacketCapture,
  startPacketCapture,
  resetSharedKey,
  getSharedKey,
  setSharedKey,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  VirtualNetworkGatewayConnectionsResetConnectionOptionalParams,
  VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams,
  VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams,
  VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
  VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams,
  VirtualNetworkGatewayConnectionsGetSharedKeyOptionalParams,
  VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams,
  VirtualNetworkGatewayConnectionsListOptionalParams,
  VirtualNetworkGatewayConnectionsDeleteOptionalParams,
  VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams,
  VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams,
  VirtualNetworkGatewayConnectionsGetOptionalParams,
} from "./options.js";
