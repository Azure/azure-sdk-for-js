// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Model for creating face collection. */
export interface CreateCollectionRequest {
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /**
   * The 'recognitionModel' associated with this face list. Supported 'recognitionModel' values include 'recognition_01', 'recognition_02, 'recognition_03', and 'recognition_04'. The default value is 'recognition_01'. 'recognition_04' is recommended since its accuracy is improved on faces wearing masks compared with 'recognition_03', and its overall accuracy is improved compared with 'recognition_01' and 'recognition_02'.
   *
   * Possible values: "recognition_01", "recognition_02", "recognition_03", "recognition_04"
   */
  recognitionModel?: RecognitionModel;
}

/** User defined fields for object update. */
export interface UserDefinedFieldsForUpdate {
  /** User defined name, maximum length is 128. */
  name?: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
}

/** Add face from url request. */
export interface AddFaceFromUrlRequest {
  /** URL of input image. */
  url: string;
}

/** User defined data for persisted face. */
export interface FaceUserData {
  /** User-provided data attached to the face. The length limit is 1K. */
  userData?: string;
}

/** User defined fields for object creation. */
export interface UserDefinedFields {
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
}

/** Request model for creating liveness session. */
export interface CreateLivenessSessionContent {
  /**
   * Type of liveness mode the client should follow.
   *
   * Possible values: "Passive", "PassiveActive"
   */
  livenessOperationMode: LivenessOperationMode;
  /** Whether or not to allow client to set their own 'deviceCorrelationId' via the Vision SDK. Default is false, and 'deviceCorrelationId' must be set in this request body. */
  deviceCorrelationIdSetInClient?: boolean;
  /** Whether or not store the session image. */
  enableSessionImage?: boolean;
  /**
   * The model version used for liveness classification. This is an optional parameter, and if this is not specified, then the latest supported model version will be chosen
   *
   * Possible values: "2024-11-15"
   */
  livenessModelVersion?: LivenessModel;
  /** Unique Guid per each end-user device. This is to provide rate limiting and anti-hammering. If 'deviceCorrelationIdSetInClient' is true in this request, this 'deviceCorrelationId' must be null. */
  deviceCorrelationId?: string;
  /** Seconds the session should last for. Range is 60 to 86400 seconds. Default value is 600. */
  authTokenTimeToLiveInSeconds?: number;
}

export interface CreateLivenessWithVerifySessionContentLivenessOperationModePartDescriptor {
  name: "livenessOperationMode";
  body: LivenessOperationMode;
}

export interface CreateLivenessWithVerifySessionContentDeviceCorrelationIdSetInClientPartDescriptor {
  name: "deviceCorrelationIdSetInClient";
  body: boolean;
}

export interface CreateLivenessWithVerifySessionContentEnableSessionImagePartDescriptor {
  name: "enableSessionImage";
  body: boolean;
}

export interface CreateLivenessWithVerifySessionContentLivenessModelVersionPartDescriptor {
  name: "livenessModelVersion";
  body: LivenessModel;
}

export interface CreateLivenessWithVerifySessionContentReturnVerifyImageHashPartDescriptor {
  name: "returnVerifyImageHash";
  body: boolean;
}

export interface CreateLivenessWithVerifySessionContentVerifyConfidenceThresholdPartDescriptor {
  name: "verifyConfidenceThreshold";
  body: number;
}

export interface CreateLivenessWithVerifySessionContentVerifyImagePartDescriptor {
  name: "verifyImage";
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream | File;
  filename?: string;
  contentType?: string;
}

export interface CreateLivenessWithVerifySessionContentDeviceCorrelationIdPartDescriptor {
  name: "deviceCorrelationId";
  body: string;
}

export interface CreateLivenessWithVerifySessionContentAuthTokenTimeToLiveInSecondsPartDescriptor {
  name: "authTokenTimeToLiveInSeconds";
  body: number;
}

/** Alias for DetectionModel */
export type DetectionModel = string;
/** Alias for RecognitionModel */
export type RecognitionModel = string;
/** Alias for FaceAttributeType */
export type FaceAttributeType = string;
/** Alias for FindSimilarMatchMode */
export type FindSimilarMatchMode = string;
/** Alias for LivenessOperationMode */
export type LivenessOperationMode = string;
/** Alias for LivenessModel */
export type LivenessModel = string;
/** Request of liveness with verify session creation. */
export type CreateLivenessWithVerifySessionContent =
  | FormData
  | Array<
      | CreateLivenessWithVerifySessionContentLivenessOperationModePartDescriptor
      | CreateLivenessWithVerifySessionContentDeviceCorrelationIdSetInClientPartDescriptor
      | CreateLivenessWithVerifySessionContentEnableSessionImagePartDescriptor
      | CreateLivenessWithVerifySessionContentLivenessModelVersionPartDescriptor
      | CreateLivenessWithVerifySessionContentReturnVerifyImageHashPartDescriptor
      | CreateLivenessWithVerifySessionContentVerifyConfidenceThresholdPartDescriptor
      | CreateLivenessWithVerifySessionContentVerifyImagePartDescriptor
      | CreateLivenessWithVerifySessionContentDeviceCorrelationIdPartDescriptor
      | CreateLivenessWithVerifySessionContentAuthTokenTimeToLiveInSecondsPartDescriptor
    >;
/** API versions for Azure AI Face API. */
export type Versions = "v1.1-preview.1" | "v1.2-preview.1" | "v1.2";
