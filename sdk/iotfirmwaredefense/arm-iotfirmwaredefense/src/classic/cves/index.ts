// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { CveResource } from "../../models/models.js";
import { CvesListByFirmwareOptionalParams } from "../../api/cves/options.js";
import { listByFirmware } from "../../api/cves/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Cves operations. */
export interface CvesOperations {
  /** Lists CVE analysis results of a firmware. */
  listByFirmware: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: CvesListByFirmwareOptionalParams,
  ) => PagedAsyncIterableIterator<CveResource>;
}

function _getCves(context: IoTFirmwareDefenseContext) {
  return {
    listByFirmware: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: CvesListByFirmwareOptionalParams,
    ) => listByFirmware(context, resourceGroupName, workspaceName, firmwareId, options),
  };
}

export function _getCvesOperations(context: IoTFirmwareDefenseContext): CvesOperations {
  return {
    ..._getCves(context),
  };
}
