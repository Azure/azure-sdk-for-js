// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";

/**
 * Client options used to configure Form Recognizer API requests.
 */
export interface AnomalyDetectorClientOptions extends PipelineOptions {}

export {
  GeneratedClientDetectChangePointResponse as AnomalyDetectorClientChangePointDetectResponse,
  GeneratedClientDetectEntireSeriesResponse as AnomalyDetectorClientEntireDetectResponse,
  GeneratedClientDetectLastPointResponse as AnomalyDetectorClientLastDetectResponse,
  LastDetectResponse,
  ChangePointDetectResponse,
  TimeGranularity,
  DetectRequest,
  EntireDetectResponse,
  ChangePointDetectRequest,
  TimeSeriesPoint
} from "./generated/models";
