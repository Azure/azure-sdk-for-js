// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { sliSignalPreview } from "../../api/sloView/operations.js";
import type { SloViewSliSignalPreviewOptionalParams } from "../../api/sloView/options.js";
import type { SignalPreviewSliProperties, KqlmQueryResult } from "../../models/models.js";

/** Interface representing a SloView operations. */
export interface SloViewOperations {
  /** Returns preview data for the signal. */
  sliSignalPreview: (
    serviceGroupName: string,
    body: SignalPreviewSliProperties,
    options?: SloViewSliSignalPreviewOptionalParams,
  ) => Promise<KqlmQueryResult>;
}

function _getSloView(context: MonitorContext) {
  return {
    sliSignalPreview: (
      serviceGroupName: string,
      body: SignalPreviewSliProperties,
      options?: SloViewSliSignalPreviewOptionalParams,
    ) => sliSignalPreview(context, serviceGroupName, body, options),
  };
}

export function _getSloViewOperations(context: MonitorContext): SloViewOperations {
  return {
    ..._getSloView(context),
  };
}
