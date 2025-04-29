// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { BinaryHardeningResource } from "../../models/models.js";
import { BinaryHardeningListByFirmwareOptionalParams } from "../../api/binaryHardening/options.js";
import { listByFirmware } from "../../api/binaryHardening/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BinaryHardening operations. */
export interface BinaryHardeningOperations {
  /** Lists binary hardening analysis results of a firmware. */
  listByFirmware: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: BinaryHardeningListByFirmwareOptionalParams,
  ) => PagedAsyncIterableIterator<BinaryHardeningResource>;
}

function _getBinaryHardening(context: IoTFirmwareDefenseContext) {
  return {
    listByFirmware: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: BinaryHardeningListByFirmwareOptionalParams,
    ) => listByFirmware(context, resourceGroupName, workspaceName, firmwareId, options),
  };
}

export function _getBinaryHardeningOperations(
  context: IoTFirmwareDefenseContext,
): BinaryHardeningOperations {
  return {
    ..._getBinaryHardening(context),
  };
}
