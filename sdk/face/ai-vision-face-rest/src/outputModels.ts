// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Response for detect API. */
export interface FaceDetectionResultOutput {
  /** Unique faceId of the detected face, created by detection API and it will expire 24 hours after the detection call. To return this, it requires 'returnFaceId' parameter to be true. */
  faceId?: string;
  /**
   * The 'recognitionModel' associated with this faceId. This is only returned when 'returnRecognitionModel' is explicitly set as true.
   *
   * Possible values: "recognition_01", "recognition_02", "recognition_03", "recognition_04"
   */
  recognitionModel?: RecognitionModelOutput;
  /** A rectangle area for the face location on image. */
  faceRectangle: FaceRectangleOutput;
  /** An array of 27-point face landmarks pointing to the important positions of face components. To return this, it requires 'returnFaceLandmarks' parameter to be true. */
  faceLandmarks?: FaceLandmarksOutput;
  /** Face attributes for detected face. */
  faceAttributes?: FaceAttributesOutput;
}

/** A rectangle within which a face can be found. */
export interface FaceRectangleOutput {
  /** The distance from the top edge if the image to the top edge of the rectangle, in pixels. */
  top: number;
  /** The distance from the left edge if the image to the left edge of the rectangle, in pixels. */
  left: number;
  /** The width of the rectangle, in pixels. */
  width: number;
  /** The height of the rectangle, in pixels. */
  height: number;
}

/** A collection of 27-point face landmarks pointing to the important positions of face components. */
export interface FaceLandmarksOutput {
  /** The coordinates of the left eye pupil. */
  pupilLeft: LandmarkCoordinateOutput;
  /** The coordinates of the right eye pupil. */
  pupilRight: LandmarkCoordinateOutput;
  /** The coordinates of the nose tip. */
  noseTip: LandmarkCoordinateOutput;
  /** The coordinates of the mouth left. */
  mouthLeft: LandmarkCoordinateOutput;
  /** The coordinates of the mouth right. */
  mouthRight: LandmarkCoordinateOutput;
  /** The coordinates of the left eyebrow outer. */
  eyebrowLeftOuter: LandmarkCoordinateOutput;
  /** The coordinates of the left eyebrow inner. */
  eyebrowLeftInner: LandmarkCoordinateOutput;
  /** The coordinates of the left eye outer. */
  eyeLeftOuter: LandmarkCoordinateOutput;
  /** The coordinates of the left eye top. */
  eyeLeftTop: LandmarkCoordinateOutput;
  /** The coordinates of the left eye bottom. */
  eyeLeftBottom: LandmarkCoordinateOutput;
  /** The coordinates of the left eye inner. */
  eyeLeftInner: LandmarkCoordinateOutput;
  /** The coordinates of the right eyebrow inner. */
  eyebrowRightInner: LandmarkCoordinateOutput;
  /** The coordinates of the right eyebrow outer. */
  eyebrowRightOuter: LandmarkCoordinateOutput;
  /** The coordinates of the right eye inner. */
  eyeRightInner: LandmarkCoordinateOutput;
  /** The coordinates of the right eye top. */
  eyeRightTop: LandmarkCoordinateOutput;
  /** The coordinates of the right eye bottom. */
  eyeRightBottom: LandmarkCoordinateOutput;
  /** The coordinates of the right eye outer. */
  eyeRightOuter: LandmarkCoordinateOutput;
  /** The coordinates of the nose root left. */
  noseRootLeft: LandmarkCoordinateOutput;
  /** The coordinates of the nose root right. */
  noseRootRight: LandmarkCoordinateOutput;
  /** The coordinates of the nose left alar top. */
  noseLeftAlarTop: LandmarkCoordinateOutput;
  /** The coordinates of the nose right alar top. */
  noseRightAlarTop: LandmarkCoordinateOutput;
  /** The coordinates of the nose left alar out tip. */
  noseLeftAlarOutTip: LandmarkCoordinateOutput;
  /** The coordinates of the nose right alar out tip. */
  noseRightAlarOutTip: LandmarkCoordinateOutput;
  /** The coordinates of the upper lip top. */
  upperLipTop: LandmarkCoordinateOutput;
  /** The coordinates of the upper lip bottom. */
  upperLipBottom: LandmarkCoordinateOutput;
  /** The coordinates of the under lip top. */
  underLipTop: LandmarkCoordinateOutput;
  /** The coordinates of the under lip bottom. */
  underLipBottom: LandmarkCoordinateOutput;
}

/** Landmark coordinates within an image. */
export interface LandmarkCoordinateOutput {
  /** The horizontal component, in pixels. */
  x: number;
  /** The vertical component, in pixels. */
  y: number;
}

/** Face attributes for the detected face. */
export interface FaceAttributesOutput {
  /** Age in years. */
  age?: number;
  /** Smile intensity, a number between [0,1]. */
  smile?: number;
  /** Properties describing facial hair attributes. */
  facialHair?: FacialHairOutput;
  /**
   * Glasses type if any of the face.
   *
   * Possible values: "noGlasses", "readingGlasses", "sunglasses", "swimmingGoggles"
   */
  glasses?: GlassesTypeOutput;
  /** 3-D roll/yaw/pitch angles for face direction. */
  headPose?: HeadPoseOutput;
  /** Properties describing hair attributes. */
  hair?: HairPropertiesOutput;
  /** Properties describing occlusions on a given face. */
  occlusion?: OcclusionPropertiesOutput;
  /** Properties describing any accessories on a given face. */
  accessories?: Array<AccessoryItemOutput>;
  /** Properties describing any presence of blur within the image. */
  blur?: BlurPropertiesOutput;
  /** Properties describing exposure level of the image. */
  exposure?: ExposurePropertiesOutput;
  /** Properties describing noise level of the image. */
  noise?: NoisePropertiesOutput;
  /** Properties describing the presence of a mask on a given face. */
  mask?: MaskPropertiesOutput;
  /**
   * Properties describing the overall image quality regarding whether the image being used in the detection is of sufficient quality to attempt face recognition on.
   *
   * Possible values: "low", "medium", "high"
   */
  qualityForRecognition?: QualityForRecognitionOutput;
}

/** Properties describing facial hair attributes. */
export interface FacialHairOutput {
  /** A number ranging from 0 to 1 indicating a level of confidence associated with a property. */
  moustache: number;
  /** A number ranging from 0 to 1 indicating a level of confidence associated with a property. */
  beard: number;
  /** A number ranging from 0 to 1 indicating a level of confidence associated with a property. */
  sideburns: number;
}

/** 3-D roll/yaw/pitch angles for face direction. */
export interface HeadPoseOutput {
  /** Value of angles. */
  pitch: number;
  /** Value of angles. */
  roll: number;
  /** Value of angles. */
  yaw: number;
}

/** Properties describing hair attributes. */
export interface HairPropertiesOutput {
  /** A number describing confidence level of whether the person is bald. */
  bald: number;
  /** A boolean value describing whether the hair is visible in the image. */
  invisible: boolean;
  /** An array of candidate colors and confidence level in the presence of each. */
  hairColor: Array<HairColorOutput>;
}

/** An array of candidate colors and confidence level in the presence of each. */
export interface HairColorOutput {
  /**
   * Name of the hair color.
   *
   * Possible values: "unknown", "white", "gray", "blond", "brown", "red", "black", "other"
   */
  color: HairColorTypeOutput;
  /** Confidence level of the color. Range between [0,1]. */
  confidence: number;
}

/** Properties describing occlusions on a given face. */
export interface OcclusionPropertiesOutput {
  /** A boolean value indicating whether forehead is occluded. */
  foreheadOccluded: boolean;
  /** A boolean value indicating whether eyes are occluded. */
  eyeOccluded: boolean;
  /** A boolean value indicating whether the mouth is occluded. */
  mouthOccluded: boolean;
}

/** Accessory item and corresponding confidence level. */
export interface AccessoryItemOutput {
  /**
   * Type of the accessory.
   *
   * Possible values: "headwear", "glasses", "mask"
   */
  type: AccessoryTypeOutput;
  /** Confidence level of the accessory type. Range between [0,1]. */
  confidence: number;
}

/** Properties describing any presence of blur within the image. */
export interface BlurPropertiesOutput {
  /**
   * An enum value indicating level of blurriness.
   *
   * Possible values: "low", "medium", "high"
   */
  blurLevel: BlurLevelOutput;
  /** A number indicating level of blurriness ranging from 0 to 1. */
  value: number;
}

/** Properties describing exposure level of the image. */
export interface ExposurePropertiesOutput {
  /**
   * An enum value indicating level of exposure.
   *
   * Possible values: "underExposure", "goodExposure", "overExposure"
   */
  exposureLevel: ExposureLevelOutput;
  /** A number indicating level of exposure level ranging from 0 to 1. [0, 0.25) is under exposure. [0.25, 0.75) is good exposure. [0.75, 1] is over exposure. */
  value: number;
}

/** Properties describing noise level of the image. */
export interface NoisePropertiesOutput {
  /**
   * An enum value indicating level of noise.
   *
   * Possible values: "low", "medium", "high"
   */
  noiseLevel: NoiseLevelOutput;
  /** A number indicating level of noise level ranging from 0 to 1. [0, 0.25) is under exposure. [0.25, 0.75) is good exposure. [0.75, 1] is over exposure. [0, 0.3) is low noise level. [0.3, 0.7) is medium noise level. [0.7, 1] is high noise level. */
  value: number;
}

/** Properties describing the presence of a mask on a given face. */
export interface MaskPropertiesOutput {
  /** A boolean value indicating whether nose and mouth are covered. */
  noseAndMouthCovered: boolean;
  /**
   * Type of the mask.
   *
   * Possible values: "faceMask", "noMask", "otherMaskOrOcclusion", "uncertain"
   */
  type: MaskTypeOutput;
}

/** A response containing error details. */
export interface FaceErrorResponseOutput {
  /** The error object. */
  error: FaceErrorOutput;
}

/** The error object. For comprehensive details on error codes and messages returned by the Face Service, please refer to the following link: https://aka.ms/face-error-codes-and-messages. */
export interface FaceErrorOutput {
  /** One of a server-defined set of error codes. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
}

/** Response body for find similar face operation. */
export interface FindSimilarResultOutput {
  /** Confidence value of the candidate. The higher confidence, the more similar. Range between [0,1]. */
  confidence: number;
  /** faceId of candidate face when find by faceIds. faceId is created by "Detect" and will expire 24 hours after the detection call. */
  faceId?: string;
  /** persistedFaceId of candidate face when find by faceListId or largeFaceListId. persistedFaceId in face list/large face list is persisted and will not expire. */
  persistedFaceId?: string;
}

/** Identify result. */
export interface IdentificationResultOutput {
  /** faceId of the query face. */
  faceId: string;
  /** Identified person candidates for that face (ranked by confidence). Array size should be no larger than input maxNumOfCandidatesReturned. If no person is identified, will return an empty array. */
  candidates: Array<IdentificationCandidateOutput>;
}

/** Candidate for identify call. */
export interface IdentificationCandidateOutput {
  /** personId of candidate person. */
  personId: string;
  /** Confidence value of the candidate. The higher confidence, the more similar. Range between [0,1]. */
  confidence: number;
}

/** Verify result. */
export interface VerificationResultOutput {
  /** True if the two faces belong to the same person or the face belongs to the person, otherwise false. */
  isIdentical: boolean;
  /** A number indicates the similarity confidence of whether two faces belong to the same person, or whether the face belongs to the person. By default, isIdentical is set to True if similarity confidence is greater than or equal to 0.5. This is useful for advanced users to override 'isIdentical' and fine-tune the result on their own data. */
  confidence: number;
}

/** Response body for group face operation. */
export interface GroupingResultOutput {
  /** A partition of the original faces based on face similarity. Groups are ranked by number of faces. */
  groups: string[][];
  /** Face ids array of faces that cannot find any similar faces from original faces. */
  messyGroup: string[];
}

/** Face list is a list of faces, up to 1,000 faces. */
export interface FaceListOutput {
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /**
   * Name of recognition model. Recognition model is used when the face features are extracted and associated with detected faceIds.
   *
   * Possible values: "recognition_01", "recognition_02", "recognition_03", "recognition_04"
   */
  recognitionModel?: RecognitionModelOutput;
  /** Valid character is letter in lower case or digit or '-' or '_', maximum length is 64. */
  readonly faceListId: string;
  /** Face ids of registered faces in the face list. */
  persistedFaces?: Array<FaceListFaceOutput>;
}

/** Face resource for face list. */
export interface FaceListFaceOutput {
  /** Face ID of the face. */
  readonly persistedFaceId: string;
  /** User-provided data attached to the face. The length limit is 1K. */
  userData?: string;
}

/** Face list item for list face list. */
export interface FaceListItemOutput {
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /**
   * Name of recognition model. Recognition model is used when the face features are extracted and associated with detected faceIds.
   *
   * Possible values: "recognition_01", "recognition_02", "recognition_03", "recognition_04"
   */
  recognitionModel?: RecognitionModelOutput;
  /** Valid character is letter in lower case or digit or '-' or '_', maximum length is 64. */
  faceListId: string;
}

/** Response body for adding face. */
export interface AddFaceResultOutput {
  /** Persisted Face ID of the added face, which is persisted and will not expire. Different from faceId which is created in "Detect" and will expire in 24 hours after the detection call. */
  persistedFaceId: string;
}

/** Large face list is a list of faces, up to 1,000,000 faces. */
export interface LargeFaceListOutput {
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /**
   * Name of recognition model. Recognition model is used when the face features are extracted and associated with detected faceIds.
   *
   * Possible values: "recognition_01", "recognition_02", "recognition_03", "recognition_04"
   */
  recognitionModel?: RecognitionModelOutput;
  /** Valid character is letter in lower case or digit or '-' or '_', maximum length is 64. */
  readonly largeFaceListId: string;
}

/** Training result of a container */
export interface TrainingResultOutput {
  /**
   * Training status of the container.
   *
   * Possible values: "notStarted", "running", "succeeded", "failed"
   */
  status: OperationStatusOutput;
  /** A combined UTC date and time string that describes the created time of the person group, large person group or large face list. */
  createdDateTime: string;
  /** A combined UTC date and time string that describes the last modify time of the person group, large person group or large face list, could be null value when the group is not successfully trained. */
  lastActionDateTime: string;
  /** A combined UTC date and time string that describes the last successful training time of the person group, large person group or large face list. */
  lastSuccessfulTrainingDateTime: string;
  /** Show failure message when training failed (omitted when training succeed). */
  message?: string;
}

/** Face resource for large face list. */
export interface LargeFaceListFaceOutput {
  /** Face ID of the face. */
  readonly persistedFaceId: string;
  /** User-provided data attached to the face. The length limit is 1K. */
  userData?: string;
}

/** The container of the uploaded person data, including face recognition feature, and up to 10,000 persons. To handle larger scale face identification problem, please consider using Large Person Group. */
export interface PersonGroupOutput {
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /**
   * Name of recognition model. Recognition model is used when the face features are extracted and associated with detected faceIds.
   *
   * Possible values: "recognition_01", "recognition_02", "recognition_03", "recognition_04"
   */
  recognitionModel?: RecognitionModelOutput;
  /** ID of the container. */
  readonly personGroupId: string;
}

/** Response of create person. */
export interface CreatePersonResultOutput {
  /** Person ID of the person. */
  personId: string;
}

/** The person in a specified person group. To add face to this person, please call "Add Large Person Group Person Face". */
export interface PersonGroupPersonOutput {
  /** ID of the person. */
  readonly personId: string;
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /** Face ids of registered faces in the person. */
  persistedFaceIds?: string[];
}

/** Face resource for person group person. */
export interface PersonGroupPersonFaceOutput {
  /** Face ID of the face. */
  readonly persistedFaceId: string;
  /** User-provided data attached to the face. The length limit is 1K. */
  userData?: string;
}

/** The container of the uploaded person data, including face recognition feature, and up to 1,000,000 people. */
export interface LargePersonGroupOutput {
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /**
   * Name of recognition model. Recognition model is used when the face features are extracted and associated with detected faceIds.
   *
   * Possible values: "recognition_01", "recognition_02", "recognition_03", "recognition_04"
   */
  recognitionModel?: RecognitionModelOutput;
  /** ID of the container. */
  readonly largePersonGroupId: string;
}

/** The person in a specified large person group. To add face to this person, please call "Add Large Person Group Person Face". */
export interface LargePersonGroupPersonOutput {
  /** ID of the person. */
  readonly personId: string;
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /** Face ids of registered faces in the person. */
  persistedFaceIds?: string[];
}

/** Face resource for large person group person. */
export interface LargePersonGroupPersonFaceOutput {
  /** Face ID of the face. */
  readonly persistedFaceId: string;
  /** User-provided data attached to the face. The length limit is 1K. */
  userData?: string;
}

/** Session result of detect liveness. */
export interface LivenessSessionOutput {
  /** The unique ID to reference this session. */
  readonly sessionId: string;
  /** Bearer token to provide authentication for the Vision SDK running on a client application. This Bearer token has limited permissions to perform only the required action and expires after the TTL time. It is also auditable. */
  authToken: string;
  /**
   * The current status of the session.
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /**
   * The model version used for liveness classification. This is an optional parameter, and if this is not specified, then the latest supported model version will be chosen
   *
   * Possible values: "2024-11-15"
   */
  modelVersion?: LivenessModelOutput;
  /** The results of the liveness session. */
  results: LivenessSessionResultsOutput;
}

/** The results of the liveness session. */
export interface LivenessSessionResultsOutput {
  /** The attempts data of underlying liveness call with the session. */
  attempts: Array<LivenessSessionAttemptOutput>;
}

/** The liveness session attempt. */
export interface LivenessSessionAttemptOutput {
  /** The attempt ID, start from 1. */
  attemptId: number;
  /**
   * The status of the attempt.
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  attemptStatus: OperationStateOutput;
  /** The result of the liveness call, will be null if there is error. */
  result?: LivenessResultOutput;
  /** The error of the liveness call, will be null if there is result. */
  error?: LivenessErrorOutput;
}

/** The results of the liveness classification. */
export interface LivenessResultOutput {
  /**
   * The liveness classification for the target face.
   *
   * Possible values: "uncertain", "realface", "spoofface"
   */
  livenessDecision?: LivenessDecisionOutput;
  /** Targets used for liveness classification. */
  targets: LivenessDecisionTargetsOutput;
  /** The server calculated digest for this request. If the client reported digest differs from the server calculated digest, then the message integrity between the client and service has been compromised and the result should not be trusted. For more information, see how to guides on how to leverage this value to secure your end-to-end solution. */
  digest: string;
  /** The image ID of the session request. */
  sessionImageId?: string;
}

/** The targets used for liveness classification. */
export interface LivenessDecisionTargetsOutput {
  /** The target from color image used for liveness classification. */
  color: LivenessColorDecisionTargetOutput;
}

/** The target from color image used for liveness classification. */
export interface LivenessColorDecisionTargetOutput {
  /** The face region where the liveness classification was made on. */
  faceRectangle: FaceRectangleOutput;
}

/** The error of the liveness classification. */
export interface LivenessErrorOutput {
  /** The error code. */
  code: string;
  /** The error message. */
  message: string;
  /** Targets used for liveness classification. */
  targets: LivenessDecisionTargetsOutput;
}

/** Session result of detect liveness with verify. */
export interface LivenessWithVerifySessionOutput {
  /** The unique ID to reference this session. */
  readonly sessionId: string;
  /** Bearer token to provide authentication for the Vision SDK running on a client application. This Bearer token has limited permissions to perform only the required action and expires after the TTL time. It is also auditable. */
  authToken: string;
  /**
   * The current status of the session.
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /**
   * The model version used for liveness classification. This is an optional parameter, and if this is not specified, then the latest supported model version will be chosen
   *
   * Possible values: "2024-11-15"
   */
  modelVersion?: LivenessModelOutput;
  /** The results of the liveness with verify session. */
  results: LivenessWithVerifySessionResultsOutput;
}

/** The results of the liveness with verify session. */
export interface LivenessWithVerifySessionResultsOutput {
  /** The references used for face verification. */
  verifyReferences: Array<LivenessWithVerifyReferenceOutput>;
  /** The attempts data of underlying liveness with verify call with the session. */
  attempts: Array<LivenessWithVerifySessionAttemptOutput>;
}

/** The detail of face for verification. */
export interface LivenessWithVerifyReferenceOutput {
  /**
   * The image type which contains the face rectangle where the liveness classification was made on.
   *
   * Possible values: "Color", "Infrared", "Depth"
   */
  referenceType: ImageTypeOutput;
  /** The face region where the comparison image's classification was made. */
  faceRectangle: FaceRectangleOutput;
  /**
   * Quality of face image for recognition.
   *
   * Possible values: "low", "medium", "high"
   */
  qualityForRecognition: QualityForRecognitionOutput;
}

/** The liveness with verify session attempt. */
export interface LivenessWithVerifySessionAttemptOutput {
  /** The attempt ID, start from 1. */
  attemptId: number;
  /**
   * The status of the attempt.
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  attemptStatus: OperationStateOutput;
  /** The result of the liveness with verify call, will be null if there is error. */
  result?: LivenessWithVerifyResultOutput;
  /** The error of the liveness with verify call, will be null if there is result. */
  error?: LivenessErrorOutput;
}

/** The results of the liveness with verify call. */
export interface LivenessWithVerifyResultOutput {
  /**
   * The liveness classification for the target face.
   *
   * Possible values: "uncertain", "realface", "spoofface"
   */
  livenessDecision?: LivenessDecisionOutput;
  /** Targets used for liveness classification. */
  targets: LivenessDecisionTargetsOutput;
  /** The server calculated digest for this request. If the client reported digest differs from the server calculated digest, then the message integrity between the client and service has been compromised and the result should not be trusted. For more information, see how to guides on how to leverage this value to secure your end-to-end solution. */
  digest: string;
  /** The image ID of the session request. */
  sessionImageId?: string;
  /** The face verification output. Only available when the request is liveness with verify. */
  verifyResult?: LivenessWithVerifyOutputsOutput;
  /** The sha256 hash of the verify-image in the request. */
  verifyImageHash?: string;
}

/** The face verification output. */
export interface LivenessWithVerifyOutputsOutput {
  /** The target face liveness face and comparison image face verification confidence. */
  matchConfidence: number;
  /** Whether the target liveness face and comparison image face match. */
  isIdentical: boolean;
}

/** Alias for RecognitionModelOutput */
export type RecognitionModelOutput = string;
/** Alias for GlassesTypeOutput */
export type GlassesTypeOutput = string;
/** Alias for HairColorTypeOutput */
export type HairColorTypeOutput = string;
/** Alias for AccessoryTypeOutput */
export type AccessoryTypeOutput = string;
/** Alias for BlurLevelOutput */
export type BlurLevelOutput = string;
/** Alias for ExposureLevelOutput */
export type ExposureLevelOutput = string;
/** Alias for NoiseLevelOutput */
export type NoiseLevelOutput = string;
/** Alias for MaskTypeOutput */
export type MaskTypeOutput = string;
/** Alias for QualityForRecognitionOutput */
export type QualityForRecognitionOutput = string;
/** Alias for OperationStatusOutput */
export type OperationStatusOutput = string;
/** Alias for LivenessModelOutput */
export type LivenessModelOutput = string;
/** Alias for OperationStateOutput */
export type OperationStateOutput = string;
/** Alias for LivenessDecisionOutput */
export type LivenessDecisionOutput = string;
/** Alias for ImageTypeOutput */
export type ImageTypeOutput = string;
