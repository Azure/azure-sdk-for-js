// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { SummaryResource, SummaryType } from "../../models/models.js";
import {
  SummariesListByFirmwareOptionalParams,
  SummariesGetOptionalParams,
} from "../../api/summaries/options.js";
import { listByFirmware, get } from "../../api/summaries/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Summaries operations. */
export interface SummariesOperations {
  /** Lists analysis result summary names of a firmware. To fetch the full summary data, get that summary by name. */
  listByFirmware: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: SummariesListByFirmwareOptionalParams,
  ) => PagedAsyncIterableIterator<SummaryResource>;
  /** Get an analysis result summary of a firmware by name. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    summaryType: SummaryType,
    options?: SummariesGetOptionalParams,
  ) => Promise<SummaryResource>;
}

function _getSummaries(context: IoTFirmwareDefenseContext) {
  return {
    listByFirmware: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: SummariesListByFirmwareOptionalParams,
    ) => listByFirmware(context, resourceGroupName, workspaceName, firmwareId, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      summaryType: SummaryType,
      options?: SummariesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, firmwareId, summaryType, options),
  };
}

export function _getSummariesOperations(context: IoTFirmwareDefenseContext): SummariesOperations {
  return {
    ..._getSummaries(context),
  };
}
