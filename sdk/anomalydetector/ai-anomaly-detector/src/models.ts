// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";

/**
 * Client options used to configure Form Recognizer API requests.
 */
export interface AnomalyDetectorClientOptions extends PipelineOptions {}

export {
  GeneratedClientChangePointDetectResponse as AnomalyDetectorClientChangePointDetectResponse,
  GeneratedClientEntireDetectResponse as AnomalyDetectorClientEntireDetectResponse,
  GeneratedClientLastDetectResponse as AnomalyDetectorClientLastDetectResponse
} from "./generated/models";
