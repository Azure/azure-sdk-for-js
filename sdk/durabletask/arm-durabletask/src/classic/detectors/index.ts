// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext } from "../../api/durableTaskContext.js";
import { listByScheduler, get } from "../../api/detectors/operations.js";
import type {
  DetectorsListBySchedulerOptionalParams,
  DetectorsGetOptionalParams,
} from "../../api/detectors/options.js";
import type { Detector } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Detectors operations. */
export interface DetectorsOperations {
  /** Lists the diagnostic detectors belonging to a scheduler. */
  listByScheduler: (
    resourceGroupName: string,
    schedulerName: string,
    options?: DetectorsListBySchedulerOptionalParams,
  ) => PagedAsyncIterableIterator<Detector>;
  /** Gets a diagnostic detector. */
  get: (
    resourceGroupName: string,
    schedulerName: string,
    detectorId: string,
    options?: DetectorsGetOptionalParams,
  ) => Promise<Detector>;
}

function _getDetectors(context: DurableTaskContext) {
  return {
    listByScheduler: (
      resourceGroupName: string,
      schedulerName: string,
      options?: DetectorsListBySchedulerOptionalParams,
    ) => listByScheduler(context, resourceGroupName, schedulerName, options),
    get: (
      resourceGroupName: string,
      schedulerName: string,
      detectorId: string,
      options?: DetectorsGetOptionalParams,
    ) => get(context, resourceGroupName, schedulerName, detectorId, options),
  };
}

export function _getDetectorsOperations(context: DurableTaskContext): DetectorsOperations {
  return {
    ..._getDetectors(context),
  };
}
