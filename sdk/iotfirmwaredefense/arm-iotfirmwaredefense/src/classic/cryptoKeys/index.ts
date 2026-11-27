// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { listByFirmware } from "../../api/cryptoKeys/operations.js";
import type { CryptoKeysListByFirmwareOptionalParams } from "../../api/cryptoKeys/options.js";
import type { CryptoKeyResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CryptoKeys operations. */
export interface CryptoKeysOperations {
  /** Lists crypto key analysis results of a firmware. */
  listByFirmware: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: CryptoKeysListByFirmwareOptionalParams,
  ) => PagedAsyncIterableIterator<CryptoKeyResource>;
}

function _getCryptoKeys(context: IoTFirmwareDefenseContext) {
  return {
    listByFirmware: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: CryptoKeysListByFirmwareOptionalParams,
    ) => listByFirmware(context, resourceGroupName, workspaceName, firmwareId, options),
  };
}

export function _getCryptoKeysOperations(context: IoTFirmwareDefenseContext): CryptoKeysOperations {
  return {
    ..._getCryptoKeys(context),
  };
}
