// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FaceRecognitionModel, FaceDetectionModel } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LargePersonGroupUpdateFaceOptionalParams extends OperationOptions {
  /** User-provided data attached to the face. The length limit is 1K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargePersonGroupGetFaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargePersonGroupDeleteFaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargePersonGroupAddFaceOptionalParams extends OperationOptions {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /** The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'. */
  detectionModel?: FaceDetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargePersonGroupAddFaceFromUrlOptionalParams extends OperationOptions {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /** The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'. */
  detectionModel?: FaceDetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargePersonGroupGetPersonsOptionalParams extends OperationOptions {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

/** Optional parameters. */
export interface LargePersonGroupUpdatePersonOptionalParams extends OperationOptions {
  /** User defined name, maximum length is 128. */
  name?: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargePersonGroupGetPersonOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargePersonGroupDeletePersonOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargePersonGroupCreatePersonOptionalParams extends OperationOptions {
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargePersonGroupTrainOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LargePersonGroupGetTrainingStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargePersonGroupGetLargePersonGroupsOptionalParams extends OperationOptions {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

/** Optional parameters. */
export interface LargePersonGroupUpdateOptionalParams extends OperationOptions {
  /** User defined name, maximum length is 128. */
  name?: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
}

/** Optional parameters. */
export interface LargePersonGroupGetOptionalParams extends OperationOptions {
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

/** Optional parameters. */
export interface LargePersonGroupDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LargePersonGroupCreateOptionalParams extends OperationOptions {
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /** The 'recognitionModel' associated with this face list. Supported 'recognitionModel' values include 'recognition_01', 'recognition_02, 'recognition_03', and 'recognition_04'. The default value is 'recognition_01'. 'recognition_04' is recommended since its accuracy is improved on faces wearing masks compared with 'recognition_03', and its overall accuracy is improved compared with 'recognition_01' and 'recognition_02'. */
  recognitionModel?: FaceRecognitionModel;
}
