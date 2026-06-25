// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FaceRecognitionModel,
  FaceDetectionModel,
  FaceAttributeType,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GetSessionImageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DetectFromSessionImageOptionalParams extends OperationOptions {
  /** The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'. 'detection_03' is recommended since its accuracy is improved on smaller faces (64x64 pixels) and rotated face orientations. */
  detectionModel?: FaceDetectionModel;
  /** The 'recognitionModel' associated with the detected faceIds. Supported 'recognitionModel' values include 'recognition_01', 'recognition_02', 'recognition_03' or 'recognition_04'. The default value is 'recognition_01'. 'recognition_04' is recommended since its accuracy is improved on faces wearing masks compared with 'recognition_03', and its overall accuracy is improved compared with 'recognition_01' and 'recognition_02'. */
  recognitionModel?: FaceRecognitionModel;
  /** Return faceIds of the detected faces or not. The default value is true. */
  returnFaceId?: boolean;
  /** Analyze and return the one or more specified face attributes in the comma-separated string like 'returnFaceAttributes=headPose,glasses'. Face attribute analysis has additional computational and time cost. */
  returnFaceAttributes?: FaceAttributeType[];
  /** Return face landmarks of the detected faces or not. The default value is false. */
  returnFaceLandmarks?: boolean;
  /** Return 'recognitionModel' or not. The default value is false. This is only applicable when returnFaceId = true. */
  returnRecognitionModel?: boolean;
  /** The number of seconds for the face ID being cached. Supported range from 60 seconds up to 86400 seconds. The default value is 86400 (24 hours). */
  faceIdTimeToLive?: number;
}

/** Optional parameters. */
export interface GetLivenessWithVerifySessionResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteLivenessWithVerifySessionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateLivenessWithVerifySessionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetLivenessSessionResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteLivenessSessionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateLivenessSessionOptionalParams extends OperationOptions {}
