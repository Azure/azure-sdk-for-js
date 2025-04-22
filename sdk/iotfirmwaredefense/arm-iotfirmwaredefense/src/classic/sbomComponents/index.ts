// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { SbomComponentResource } from "../../models/models.js";
import { SbomComponentsListByFirmwareOptionalParams } from "../../api/sbomComponents/options.js";
import { listByFirmware } from "../../api/sbomComponents/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SbomComponents operations. */
export interface SbomComponentsOperations {
  /** Lists sbom analysis results of a firmware. */
  listByFirmware: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: SbomComponentsListByFirmwareOptionalParams,
  ) => PagedAsyncIterableIterator<SbomComponentResource>;
}

function _getSbomComponents(context: IoTFirmwareDefenseContext) {
  return {
    listByFirmware: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: SbomComponentsListByFirmwareOptionalParams,
    ) => listByFirmware(context, resourceGroupName, workspaceName, firmwareId, options),
  };
}

export function _getSbomComponentsOperations(
  context: IoTFirmwareDefenseContext,
): SbomComponentsOperations {
  return {
    ..._getSbomComponents(context),
  };
}
