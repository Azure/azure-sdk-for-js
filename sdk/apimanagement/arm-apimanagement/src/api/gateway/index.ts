// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listTrace,
  listDebugCredentials,
  invalidateDebugCredentials,
  generateToken,
  regenerateKey,
  listKeys,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "./operations.js";
export type {
  GatewayListTraceOptionalParams,
  GatewayListDebugCredentialsOptionalParams,
  GatewayInvalidateDebugCredentialsOptionalParams,
  GatewayGenerateTokenOptionalParams,
  GatewayRegenerateKeyOptionalParams,
  GatewayListKeysOptionalParams,
  GatewayListByServiceOptionalParams,
  GatewayDeleteOptionalParams,
  GatewayUpdateOptionalParams,
  GatewayCreateOrUpdateOptionalParams,
  GatewayGetEntityTagOptionalParams,
  GatewayGetOptionalParams,
} from "./options.js";
