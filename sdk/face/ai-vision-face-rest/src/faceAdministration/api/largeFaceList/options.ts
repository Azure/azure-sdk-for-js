// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FaceRecognitionModel, FaceDetectionModel } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LargeFaceListGetFacesOptionalParams extends OperationOptions {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

/** Optional parameters. */
export interface LargeFaceListUpdateFaceOptionalParams extends OperationOptions {
  /** User-provided data attached to the face. The length limit is 1K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargeFaceListGetFaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargeFaceListDeleteFaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargeFaceListAddFaceOptionalParams extends OperationOptions {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /** The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'. */
  detectionModel?: FaceDetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargeFaceListAddFaceFromUrlOptionalParams extends OperationOptions {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /** The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'. */
  detectionModel?: FaceDetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargeFaceListTrainOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LargeFaceListGetTrainingStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargeFaceListGetLargeFaceListsOptionalParams extends OperationOptions {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

/** Optional parameters. */
export interface LargeFaceListUpdateOptionalParams extends OperationOptions {
  /** User defined name, maximum length is 128. */
  name?: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargeFaceListGetOptionalParams extends OperationOptions {
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

/** Optional parameters. */
export interface LargeFaceListDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargeFaceListCreateOptionalParams extends OperationOptions {
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /** The 'recognitionModel' associated with this face list. Supported 'recognitionModel' values include 'recognition_01', 'recognition_02, 'recognition_03', and 'recognition_04'. The default value is 'recognition_01'. 'recognition_04' is recommended since its accuracy is improved on faces wearing masks compared with 'recognition_03', and its overall accuracy is improved compared with 'recognition_01' and 'recognition_02'. */
  recognitionModel?: FaceRecognitionModel;
}
