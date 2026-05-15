// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  stopPacketCapture,
  startPacketCapture,
  reset,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  VpnGatewaysStopPacketCaptureOptionalParams,
  VpnGatewaysStartPacketCaptureOptionalParams,
  VpnGatewaysResetOptionalParams,
  VpnGatewaysListOptionalParams,
  VpnGatewaysListByResourceGroupOptionalParams,
  VpnGatewaysDeleteOptionalParams,
  VpnGatewaysUpdateTagsOptionalParams,
  VpnGatewaysCreateOrUpdateOptionalParams,
  VpnGatewaysGetOptionalParams,
} from "./options.js";
