// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { PasswordHashResource } from "../../models/models.js";
import { PasswordHashesListByFirmwareOptionalParams } from "../../api/passwordHashes/options.js";
import { listByFirmware } from "../../api/passwordHashes/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PasswordHashes operations. */
export interface PasswordHashesOperations {
  /** Lists password hash analysis results of a firmware. */
  listByFirmware: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: PasswordHashesListByFirmwareOptionalParams,
  ) => PagedAsyncIterableIterator<PasswordHashResource>;
}

function _getPasswordHashes(context: IoTFirmwareDefenseContext) {
  return {
    listByFirmware: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: PasswordHashesListByFirmwareOptionalParams,
    ) => listByFirmware(context, resourceGroupName, workspaceName, firmwareId, options),
  };
}

export function _getPasswordHashesOperations(
  context: IoTFirmwareDefenseContext,
): PasswordHashesOperations {
  return {
    ..._getPasswordHashes(context),
  };
}
