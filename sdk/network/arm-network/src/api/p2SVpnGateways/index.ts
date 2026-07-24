// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  disconnectP2SVpnConnections,
  getP2SVpnConnectionHealthDetailed,
  getP2SVpnConnectionHealth,
  generateVpnProfile,
  reset,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams,
  P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams,
  P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams,
  P2SVpnGatewaysGenerateVpnProfileOptionalParams,
  P2SVpnGatewaysResetOptionalParams,
  P2SVpnGatewaysListOptionalParams,
  P2SVpnGatewaysListByResourceGroupOptionalParams,
  P2SVpnGatewaysDeleteOptionalParams,
  P2SVpnGatewaysUpdateTagsOptionalParams,
  P2SVpnGatewaysCreateOrUpdateOptionalParams,
  P2SVpnGatewaysGetOptionalParams,
} from "./options.js";
