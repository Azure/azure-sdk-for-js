// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getIkeSas,
  resetConnection,
  listByVpnConnection,
  listDefaultSharedKey,
  listAllSharedKeys,
  setOrInitDefaultSharedKey,
  getDefaultSharedKey,
} from "./operations.js";
export type {
  VpnLinkConnectionsGetIkeSasOptionalParams,
  VpnLinkConnectionsResetConnectionOptionalParams,
  VpnLinkConnectionsListByVpnConnectionOptionalParams,
  VpnLinkConnectionsListDefaultSharedKeyOptionalParams,
  VpnLinkConnectionsListAllSharedKeysOptionalParams,
  VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams,
  VpnLinkConnectionsGetDefaultSharedKeyOptionalParams,
} from "./options.js";
