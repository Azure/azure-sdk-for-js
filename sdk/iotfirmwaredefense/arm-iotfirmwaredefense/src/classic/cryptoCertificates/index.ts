// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { CryptoCertificateResource } from "../../models/models.js";
import { CryptoCertificatesListByFirmwareOptionalParams } from "../../api/cryptoCertificates/options.js";
import { listByFirmware } from "../../api/cryptoCertificates/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CryptoCertificates operations. */
export interface CryptoCertificatesOperations {
  /** Lists crypto certificate analysis results of a firmware. */
  listByFirmware: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: CryptoCertificatesListByFirmwareOptionalParams,
  ) => PagedAsyncIterableIterator<CryptoCertificateResource>;
}

function _getCryptoCertificates(context: IoTFirmwareDefenseContext) {
  return {
    listByFirmware: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: CryptoCertificatesListByFirmwareOptionalParams,
    ) => listByFirmware(context, resourceGroupName, workspaceName, firmwareId, options),
  };
}

export function _getCryptoCertificatesOperations(
  context: IoTFirmwareDefenseContext,
): CryptoCertificatesOperations {
  return {
    ..._getCryptoCertificates(context),
  };
}
