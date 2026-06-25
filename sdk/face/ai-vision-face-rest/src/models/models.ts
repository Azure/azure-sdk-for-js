// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NodeReadableStream } from "#platform/static-helpers/platform-types";
import { FileContents, createFilePartDescriptor } from "../static-helpers/multipartHelpers.js";
import {
  HttpPart,
  httpPartSerializer,
  HttpPart1,
  httpPart1Deserializer,
  HttpPart2,
  httpPart2Deserializer,
} from "./typeSpec/http/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Response for detect API. */
export interface FaceDetectionResult {
  /** Unique faceId of the detected face, created by detection API and it will expire 24 hours after the detection call. To return this, it requires 'returnFaceId' parameter to be true. */
  faceId?: string;
  /** The 'recognitionModel' associated with this faceId. This is only returned when 'returnRecognitionModel' is explicitly set as true. */
  recognitionModel?: FaceRecognitionModel;
  /** A rectangle area for the face location on image. */
  faceRectangle: FaceRectangle;
  /** An array of 27-point face landmarks pointing to the important positions of face components. To return this, it requires 'returnFaceLandmarks' parameter to be true. */
  faceLandmarks?: FaceLandmarks;
  /** Face attributes for detected face. */
  faceAttributes?: FaceAttributes;
}

export function faceDetectionResultDeserializer(item: any): FaceDetectionResult {
  return {
    faceId: item["faceId"],
    recognitionModel: item["recognitionModel"],
    faceRectangle: faceRectangleDeserializer(item["faceRectangle"]),
    faceLandmarks: !item["faceLandmarks"]
      ? item["faceLandmarks"]
      : faceLandmarksDeserializer(item["faceLandmarks"]),
    faceAttributes: !item["faceAttributes"]
      ? item["faceAttributes"]
      : faceAttributesDeserializer(item["faceAttributes"]),
  };
}

/** The recognition model for the face. */
export type FaceRecognitionModel =
  | "recognition_01"
  | "recognition_02"
  | "recognition_03"
  | "recognition_04";

/** A rectangle within which a face can be found. */
export interface FaceRectangle {
  /** The distance from the top edge if the image to the top edge of the rectangle, in pixels. */
  top: number;
  /** The distance from the left edge if the image to the left edge of the rectangle, in pixels. */
  left: number;
  /** The width of the rectangle, in pixels. */
  width: number;
  /** The height of the rectangle, in pixels. */
  height: number;
}

export function faceRectangleDeserializer(item: any): FaceRectangle {
  return {
    top: item["top"],
    left: item["left"],
    width: item["width"],
    height: item["height"],
  };
}

/** A collection of 27-point face landmarks pointing to the important positions of face components. */
export interface FaceLandmarks {
  /** The coordinates of the left eye pupil. */
  pupilLeft: LandmarkCoordinate;
  /** The coordinates of the right eye pupil. */
  pupilRight: LandmarkCoordinate;
  /** The coordinates of the nose tip. */
  noseTip: LandmarkCoordinate;
  /** The coordinates of the mouth left. */
  mouthLeft: LandmarkCoordinate;
  /** The coordinates of the mouth right. */
  mouthRight: LandmarkCoordinate;
  /** The coordinates of the left eyebrow outer. */
  eyebrowLeftOuter: LandmarkCoordinate;
  /** The coordinates of the left eyebrow inner. */
  eyebrowLeftInner: LandmarkCoordinate;
  /** The coordinates of the left eye outer. */
  eyeLeftOuter: LandmarkCoordinate;
  /** The coordinates of the left eye top. */
  eyeLeftTop: LandmarkCoordinate;
  /** The coordinates of the left eye bottom. */
  eyeLeftBottom: LandmarkCoordinate;
  /** The coordinates of the left eye inner. */
  eyeLeftInner: LandmarkCoordinate;
  /** The coordinates of the right eyebrow inner. */
  eyebrowRightInner: LandmarkCoordinate;
  /** The coordinates of the right eyebrow outer. */
  eyebrowRightOuter: LandmarkCoordinate;
  /** The coordinates of the right eye inner. */
  eyeRightInner: LandmarkCoordinate;
  /** The coordinates of the right eye top. */
  eyeRightTop: LandmarkCoordinate;
  /** The coordinates of the right eye bottom. */
  eyeRightBottom: LandmarkCoordinate;
  /** The coordinates of the right eye outer. */
  eyeRightOuter: LandmarkCoordinate;
  /** The coordinates of the nose root left. */
  noseRootLeft: LandmarkCoordinate;
  /** The coordinates of the nose root right. */
  noseRootRight: LandmarkCoordinate;
  /** The coordinates of the nose left alar top. */
  noseLeftAlarTop: LandmarkCoordinate;
  /** The coordinates of the nose right alar top. */
  noseRightAlarTop: LandmarkCoordinate;
  /** The coordinates of the nose left alar out tip. */
  noseLeftAlarOutTip: LandmarkCoordinate;
  /** The coordinates of the nose right alar out tip. */
  noseRightAlarOutTip: LandmarkCoordinate;
  /** The coordinates of the upper lip top. */
  upperLipTop: LandmarkCoordinate;
  /** The coordinates of the upper lip bottom. */
  upperLipBottom: LandmarkCoordinate;
  /** The coordinates of the under lip top. */
  underLipTop: LandmarkCoordinate;
  /** The coordinates of the under lip bottom. */
  underLipBottom: LandmarkCoordinate;
}

export function faceLandmarksDeserializer(item: any): FaceLandmarks {
  return {
    pupilLeft: landmarkCoordinateDeserializer(item["pupilLeft"]),
    pupilRight: landmarkCoordinateDeserializer(item["pupilRight"]),
    noseTip: landmarkCoordinateDeserializer(item["noseTip"]),
    mouthLeft: landmarkCoordinateDeserializer(item["mouthLeft"]),
    mouthRight: landmarkCoordinateDeserializer(item["mouthRight"]),
    eyebrowLeftOuter: landmarkCoordinateDeserializer(item["eyebrowLeftOuter"]),
    eyebrowLeftInner: landmarkCoordinateDeserializer(item["eyebrowLeftInner"]),
    eyeLeftOuter: landmarkCoordinateDeserializer(item["eyeLeftOuter"]),
    eyeLeftTop: landmarkCoordinateDeserializer(item["eyeLeftTop"]),
    eyeLeftBottom: landmarkCoordinateDeserializer(item["eyeLeftBottom"]),
    eyeLeftInner: landmarkCoordinateDeserializer(item["eyeLeftInner"]),
    eyebrowRightInner: landmarkCoordinateDeserializer(item["eyebrowRightInner"]),
    eyebrowRightOuter: landmarkCoordinateDeserializer(item["eyebrowRightOuter"]),
    eyeRightInner: landmarkCoordinateDeserializer(item["eyeRightInner"]),
    eyeRightTop: landmarkCoordinateDeserializer(item["eyeRightTop"]),
    eyeRightBottom: landmarkCoordinateDeserializer(item["eyeRightBottom"]),
    eyeRightOuter: landmarkCoordinateDeserializer(item["eyeRightOuter"]),
    noseRootLeft: landmarkCoordinateDeserializer(item["noseRootLeft"]),
    noseRootRight: landmarkCoordinateDeserializer(item["noseRootRight"]),
    noseLeftAlarTop: landmarkCoordinateDeserializer(item["noseLeftAlarTop"]),
    noseRightAlarTop: landmarkCoordinateDeserializer(item["noseRightAlarTop"]),
    noseLeftAlarOutTip: landmarkCoordinateDeserializer(item["noseLeftAlarOutTip"]),
    noseRightAlarOutTip: landmarkCoordinateDeserializer(item["noseRightAlarOutTip"]),
    upperLipTop: landmarkCoordinateDeserializer(item["upperLipTop"]),
    upperLipBottom: landmarkCoordinateDeserializer(item["upperLipBottom"]),
    underLipTop: landmarkCoordinateDeserializer(item["underLipTop"]),
    underLipBottom: landmarkCoordinateDeserializer(item["underLipBottom"]),
  };
}

/** Landmark coordinates within an image. */
export interface LandmarkCoordinate {
  /** The horizontal component, in pixels. */
  x: number;
  /** The vertical component, in pixels. */
  y: number;
}

export function landmarkCoordinateDeserializer(item: any): LandmarkCoordinate {
  return {
    x: item["x"],
    y: item["y"],
  };
}

/** Face attributes for the detected face. */
export interface FaceAttributes {
  /** Age in years. */
  age?: number;
  /** Smile intensity, a number between [0,1]. */
  smile?: number;
  /** Properties describing facial hair attributes. */
  facialHair?: FacialHair;
  /** Glasses type if any of the face. */
  glasses?: GlassesType;
  /** 3-D roll/yaw/pitch angles for face direction. */
  headPose?: HeadPose;
  /** Properties describing hair attributes. */
  hair?: HairProperties;
  /** Properties describing occlusions on a given face. */
  occlusion?: OcclusionProperties;
  /** Properties describing any accessories on a given face. */
  accessories?: AccessoryItem[];
  /** Properties describing any presence of blur within the image. */
  blur?: BlurProperties;
  /** Properties describing exposure level of the image. */
  exposure?: ExposureProperties;
  /** Properties describing noise level of the image. */
  noise?: NoiseProperties;
  /** Properties describing the presence of a mask on a given face. */
  mask?: MaskProperties;
  /** Properties describing the overall image quality regarding whether the image being used in the detection is of sufficient quality to attempt face recognition on. */
  qualityForRecognition?: QualityForRecognition;
}

export function faceAttributesDeserializer(item: any): FaceAttributes {
  return {
    age: item["age"],
    smile: item["smile"],
    facialHair: !item["facialHair"]
      ? item["facialHair"]
      : facialHairDeserializer(item["facialHair"]),
    glasses: item["glasses"],
    headPose: !item["headPose"] ? item["headPose"] : headPoseDeserializer(item["headPose"]),
    hair: !item["hair"] ? item["hair"] : hairPropertiesDeserializer(item["hair"]),
    occlusion: !item["occlusion"]
      ? item["occlusion"]
      : occlusionPropertiesDeserializer(item["occlusion"]),
    accessories: !item["accessories"]
      ? item["accessories"]
      : accessoryItemArrayDeserializer(item["accessories"]),
    blur: !item["blur"] ? item["blur"] : blurPropertiesDeserializer(item["blur"]),
    exposure: !item["exposure"]
      ? item["exposure"]
      : exposurePropertiesDeserializer(item["exposure"]),
    noise: !item["noise"] ? item["noise"] : noisePropertiesDeserializer(item["noise"]),
    mask: !item["mask"] ? item["mask"] : maskPropertiesDeserializer(item["mask"]),
    qualityForRecognition: item["qualityForRecognition"],
  };
}

/** Properties describing facial hair attributes. */
export interface FacialHair {
  /** A number ranging from 0 to 1 indicating a level of confidence associated with a property. */
  moustache: number;
  /** A number ranging from 0 to 1 indicating a level of confidence associated with a property. */
  beard: number;
  /** A number ranging from 0 to 1 indicating a level of confidence associated with a property. */
  sideburns: number;
}

export function facialHairDeserializer(item: any): FacialHair {
  return {
    moustache: item["moustache"],
    beard: item["beard"],
    sideburns: item["sideburns"],
  };
}

/** Glasses type of the face. */
export type GlassesType = "noGlasses" | "readingGlasses" | "sunglasses" | "swimmingGoggles";

/** 3-D roll/yaw/pitch angles for face direction. */
export interface HeadPose {
  /** Value of angles. */
  pitch: number;
  /** Value of angles. */
  roll: number;
  /** Value of angles. */
  yaw: number;
}

export function headPoseDeserializer(item: any): HeadPose {
  return {
    pitch: item["pitch"],
    roll: item["roll"],
    yaw: item["yaw"],
  };
}

/** Properties describing hair attributes. */
export interface HairProperties {
  /** A number describing confidence level of whether the person is bald. */
  bald: number;
  /** A boolean value describing whether the hair is visible in the image. */
  invisible: boolean;
  /** An array of candidate colors and confidence level in the presence of each. */
  hairColor: HairColor[];
}

export function hairPropertiesDeserializer(item: any): HairProperties {
  return {
    bald: item["bald"],
    invisible: item["invisible"],
    hairColor: hairColorArrayDeserializer(item["hairColor"]),
  };
}

export function hairColorArrayDeserializer(result: Array<HairColor>): any[] {
  return result.map((item) => {
    return hairColorDeserializer(item);
  });
}

/** An array of candidate colors and confidence level in the presence of each. */
export interface HairColor {
  /** Name of the hair color. */
  color: HairColorType;
  /** Confidence level of the color. Range between [0,1]. */
  confidence: number;
}

export function hairColorDeserializer(item: any): HairColor {
  return {
    color: item["color"],
    confidence: item["confidence"],
  };
}

/** Name of the hair color. */
export type HairColorType =
  | "unknown"
  | "white"
  | "gray"
  | "blond"
  | "brown"
  | "red"
  | "black"
  | "other";

/** Properties describing occlusions on a given face. */
export interface OcclusionProperties {
  /** A boolean value indicating whether forehead is occluded. */
  foreheadOccluded: boolean;
  /** A boolean value indicating whether eyes are occluded. */
  eyeOccluded: boolean;
  /** A boolean value indicating whether the mouth is occluded. */
  mouthOccluded: boolean;
}

export function occlusionPropertiesDeserializer(item: any): OcclusionProperties {
  return {
    foreheadOccluded: item["foreheadOccluded"],
    eyeOccluded: item["eyeOccluded"],
    mouthOccluded: item["mouthOccluded"],
  };
}

export function accessoryItemArrayDeserializer(result: Array<AccessoryItem>): any[] {
  return result.map((item) => {
    return accessoryItemDeserializer(item);
  });
}

/** Accessory item and corresponding confidence level. */
export interface AccessoryItem {
  /** Type of the accessory. */
  type: AccessoryType;
  /** Confidence level of the accessory type. Range between [0,1]. */
  confidence: number;
}

export function accessoryItemDeserializer(item: any): AccessoryItem {
  return {
    type: item["type"],
    confidence: item["confidence"],
  };
}

/** Type of the accessory. */
export type AccessoryType = "headwear" | "glasses" | "mask";

/** Properties describing any presence of blur within the image. */
export interface BlurProperties {
  /** An enum value indicating level of blurriness. */
  blurLevel: BlurLevel;
  /** A number indicating level of blurriness ranging from 0 to 1. */
  value: number;
}

export function blurPropertiesDeserializer(item: any): BlurProperties {
  return {
    blurLevel: item["blurLevel"],
    value: item["value"],
  };
}

/** Indicates level of blurriness. */
export type BlurLevel = "low" | "medium" | "high";

/** Properties describing exposure level of the image. */
export interface ExposureProperties {
  /** An enum value indicating level of exposure. */
  exposureLevel: ExposureLevel;
  /** A number indicating level of exposure level ranging from 0 to 1. [0, 0.25) is under exposure. [0.25, 0.75) is good exposure. [0.75, 1] is over exposure. */
  value: number;
}

export function exposurePropertiesDeserializer(item: any): ExposureProperties {
  return {
    exposureLevel: item["exposureLevel"],
    value: item["value"],
  };
}

/** Indicates level of exposure. */
export type ExposureLevel = "underExposure" | "goodExposure" | "overExposure";

/** Properties describing noise level of the image. */
export interface NoiseProperties {
  /** An enum value indicating level of noise. */
  noiseLevel: NoiseLevel;
  /** A number indicating level of noise level ranging from 0 to 1. [0, 0.25) is under exposure. [0.25, 0.75) is good exposure. [0.75, 1] is over exposure. [0, 0.3) is low noise level. [0.3, 0.7) is medium noise level. [0.7, 1] is high noise level. */
  value: number;
}

export function noisePropertiesDeserializer(item: any): NoiseProperties {
  return {
    noiseLevel: item["noiseLevel"],
    value: item["value"],
  };
}

/** Indicates level of noise. */
export type NoiseLevel = "low" | "medium" | "high";

/** Properties describing the presence of a mask on a given face. */
export interface MaskProperties {
  /** A boolean value indicating whether nose and mouth are covered. */
  noseAndMouthCovered: boolean;
  /** Type of the mask. */
  type: MaskType;
}

export function maskPropertiesDeserializer(item: any): MaskProperties {
  return {
    noseAndMouthCovered: item["noseAndMouthCovered"],
    type: item["type"],
  };
}

/** Type of the mask. */
export type MaskType = "faceMask" | "noMask" | "otherMaskOrOcclusion" | "uncertain";
/** Indicates quality of image for recognition. */
export type QualityForRecognition = "low" | "medium" | "high";

/** A response containing error details. */
export interface FaceErrorResponse {
  /** The error object. */
  error: FaceError;
}

export function faceErrorResponseDeserializer(item: any): FaceErrorResponse {
  return {
    error: faceErrorDeserializer(item["error"]),
  };
}

/** The error object. For comprehensive details on error codes and messages returned by the Face Service, please refer to the following link: https://aka.ms/face-error-codes-and-messages. */
export interface FaceError {
  /** One of a server-defined set of error codes. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
}

export function faceErrorDeserializer(item: any): FaceError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Similar face searching mode. */
export type FindSimilarMatchMode = "matchPerson" | "matchFace";

/** Response body for find similar face operation. */
export interface FaceFindSimilarResult {
  /** Confidence value of the candidate. The higher confidence, the more similar. Range between [0,1]. */
  confidence: number;
  /** faceId of candidate face when find by faceIds. faceId is created by "Detect" and will expire 24 hours after the detection call. */
  faceId?: string;
  /** persistedFaceId of candidate face when find by faceListId or largeFaceListId. persistedFaceId in face list/large face list is persisted and will not expire. */
  persistedFaceId?: string;
}

export function faceFindSimilarResultDeserializer(item: any): FaceFindSimilarResult {
  return {
    confidence: item["confidence"],
    faceId: item["faceId"],
    persistedFaceId: item["persistedFaceId"],
  };
}

/** Verify result. */
export interface FaceVerificationResult {
  /** True if the two faces belong to the same person or the face belongs to the person, otherwise false. */
  isIdentical: boolean;
  /** A number indicates the similarity confidence of whether two faces belong to the same person, or whether the face belongs to the person. By default, isIdentical is set to True if similarity confidence is greater than or equal to 0.5. This is useful for advanced users to override 'isIdentical' and fine-tune the result on their own data. */
  confidence: number;
}

export function faceVerificationResultDeserializer(item: any): FaceVerificationResult {
  return {
    isIdentical: item["isIdentical"],
    confidence: item["confidence"],
  };
}

/** Response body for group face operation. */
export interface FaceGroupingResult {
  /** A partition of the original faces based on face similarity. Groups are ranked by number of faces. */
  groups: string[][];
  /** Face ids array of faces that cannot find any similar faces from original faces. */
  messyGroup: string[];
}

export function faceGroupingResultDeserializer(item: any): FaceGroupingResult {
  return {
    groups: item["groups"].map((p: any) => {
      return p.map((p1: any) => {
        return p1;
      });
    }),
    messyGroup: item["messyGroup"].map((p: any) => {
      return p;
    }),
  };
}

/** Identify result. */
export interface FaceIdentificationResult {
  /** faceId of the query face. */
  faceId: string;
  /** Identified person candidates for that face (ranked by confidence). Array size should be no larger than input maxNumOfCandidatesReturned. If no person is identified, will return an empty array. */
  candidates: FaceIdentificationCandidate[];
}

export function faceIdentificationResultDeserializer(item: any): FaceIdentificationResult {
  return {
    faceId: item["faceId"],
    candidates: faceIdentificationCandidateArrayDeserializer(item["candidates"]),
  };
}

export function faceIdentificationCandidateArrayDeserializer(
  result: Array<FaceIdentificationCandidate>,
): any[] {
  return result.map((item) => {
    return faceIdentificationCandidateDeserializer(item);
  });
}

/** Candidate for identify call. */
export interface FaceIdentificationCandidate {
  /** personId of candidate person. */
  personId: string;
  /** Confidence value of the candidate. The higher confidence, the more similar. Range between [0,1]. */
  confidence: number;
}

export function faceIdentificationCandidateDeserializer(item: any): FaceIdentificationCandidate {
  return {
    personId: item["personId"],
    confidence: item["confidence"],
  };
}

/** Request model for creating liveness session. */
export interface CreateLivenessSessionContent {
  /** Type of liveness mode the client should follow. */
  livenessOperationMode: LivenessOperationMode;
  /** Whether or not to allow client to set their own 'deviceCorrelationId' via the Vision SDK. Default is false, and 'deviceCorrelationId' must be set in this request body. */
  deviceCorrelationIdSetInClient?: boolean;
  /** Whether or not store the session image. */
  enableSessionImage?: boolean;
  /** The model version used for liveness classification. This is an optional parameter, and if this is not specified, then the latest supported model version will be chosen */
  livenessModelVersion?: LivenessModel;
  /** Unique Guid per each end-user device. This is to provide rate limiting and anti-hammering. If 'deviceCorrelationIdSetInClient' is true in this request, this 'deviceCorrelationId' must be null. */
  deviceCorrelationId?: string;
  /** Seconds the session should last for. Range is 60 to 86400 seconds. Default value is 600. */
  authTokenTimeToLiveInSeconds?: number;
  /** The number of times a client can attempt a liveness check using the same authToken. Default value is 1. Maximum value is 3. */
  numberOfClientAttemptsAllowed?: HttpPart;
  /** Unique Guid per each end-user. This is to provide rate limiting and anti-hammering. If 'userCorrelationIdSetInClient' is true in this request, this 'userCorrelationId' must be null. */
  userCorrelationId?: string;
  /** Whether or not to allow client to set their own 'userCorrelationId' via the Vision SDK. Default is false, and 'userCorrelationId' must be set in this request body. */
  userCorrelationIdSetInClient?: boolean;
  /** Specify the expected IP address or CIDR block of the client that runs the liveness check. */
  expectedClientIpAddress?: string;
}

export function createLivenessSessionContentSerializer(item: CreateLivenessSessionContent): any {
  return {
    livenessOperationMode: item["livenessOperationMode"],
    deviceCorrelationIdSetInClient: item["deviceCorrelationIdSetInClient"],
    enableSessionImage: item["enableSessionImage"],
    livenessModelVersion: item["livenessModelVersion"],
    deviceCorrelationId: item["deviceCorrelationId"],
    authTokenTimeToLiveInSeconds: item["authTokenTimeToLiveInSeconds"],
    numberOfClientAttemptsAllowed: !item["numberOfClientAttemptsAllowed"]
      ? item["numberOfClientAttemptsAllowed"]
      : httpPartSerializer(item["numberOfClientAttemptsAllowed"]),
    userCorrelationId: item["userCorrelationId"],
    userCorrelationIdSetInClient: item["userCorrelationIdSetInClient"],
    expectedClientIpAddress: item["expectedClientIpAddress"],
  };
}

/** The liveness operation mode to drive the client's end-user experience. */
export type LivenessOperationMode = "Passive" | "PassiveActive";
/** The model version used for liveness classification. */
export type LivenessModel = "2024-11-15";

/** Session result of detect liveness. */
export interface LivenessSession {
  /** The unique ID to reference this session. */
  readonly sessionId: string;
  /** Bearer token to provide authentication for the Vision SDK running on a client application. This Bearer token has limited permissions to perform only the required action and expires after the TTL time. It is also auditable. */
  authToken: string;
  /** The current status of the session. */
  status: OperationState;
  /** The model version used for liveness classification. This is an optional parameter, and if this is not specified, then the latest supported model version will be chosen */
  modelVersion?: LivenessModel;
  /** Denotes if the abuse monitoring feature was enabled during this session. */
  isAbuseMonitoringEnabled?: HttpPart1;
  /** The expected IP address or CIDR block of the client that runs the liveness check. */
  expectedClientIpAddress?: string;
  /** The results of the liveness session. */
  results: LivenessSessionResults;
}

export function livenessSessionDeserializer(item: any): LivenessSession {
  return {
    sessionId: item["sessionId"],
    authToken: item["authToken"],
    status: item["status"],
    modelVersion: item["modelVersion"],
    isAbuseMonitoringEnabled: !item["isAbuseMonitoringEnabled"]
      ? item["isAbuseMonitoringEnabled"]
      : httpPart1Deserializer(item["isAbuseMonitoringEnabled"]),
    expectedClientIpAddress: item["expectedClientIpAddress"],
    results: livenessSessionResultsDeserializer(item["results"]),
  };
}

/** Enum describing allowed operation states. */
export type OperationState = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";

/** The results of the liveness session. */
export interface LivenessSessionResults {
  /** The attempts data of underlying liveness call with the session. */
  attempts: LivenessSessionAttempt[];
}

export function livenessSessionResultsDeserializer(item: any): LivenessSessionResults {
  return {
    attempts: livenessSessionAttemptArrayDeserializer(item["attempts"]),
  };
}

export function livenessSessionAttemptArrayDeserializer(
  result: Array<LivenessSessionAttempt>,
): any[] {
  return result.map((item) => {
    return livenessSessionAttemptDeserializer(item);
  });
}

/** The liveness session attempt. */
export interface LivenessSessionAttempt {
  /** The attempt ID, start from 1. */
  attemptId: number;
  /** The status of the attempt. */
  attemptStatus: OperationState;
  /** The result of the liveness call, will be null if there is error. */
  result?: LivenessResult;
  /** The error of the liveness call, will be null if there is result. */
  error?: LivenessError;
  /** The client information gathered during the liveness attempt. */
  clientInformation?: ClientInformation[];
  /** The abuse monitoring result for the liveness attempt. */
  abuseMonitoringResult?: AbuseMonitoringResult;
}

export function livenessSessionAttemptDeserializer(item: any): LivenessSessionAttempt {
  return {
    attemptId: item["attemptId"],
    attemptStatus: item["attemptStatus"],
    result: !item["result"] ? item["result"] : livenessResultDeserializer(item["result"]),
    error: !item["error"] ? item["error"] : livenessErrorDeserializer(item["error"]),
    clientInformation: !item["clientInformation"]
      ? item["clientInformation"]
      : clientInformationArrayDeserializer(item["clientInformation"]),
    abuseMonitoringResult: !item["abuseMonitoringResult"]
      ? item["abuseMonitoringResult"]
      : abuseMonitoringResultDeserializer(item["abuseMonitoringResult"]),
  };
}

/** The results of the liveness classification. */
export interface LivenessResult {
  /** The liveness classification for the target face. */
  livenessDecision?: FaceLivenessDecision;
  /** Targets used for liveness classification. */
  targets: LivenessDecisionTargets;
  /** The server calculated digest for this request. If the client reported digest differs from the server calculated digest, then the message integrity between the client and service has been compromised and the result should not be trusted. For more information, see how to guides on how to leverage this value to secure your end-to-end solution. */
  digest: string;
  /** The image ID of the session request. */
  sessionImageId?: string;
}

export function livenessResultDeserializer(item: any): LivenessResult {
  return {
    livenessDecision: item["livenessDecision"],
    targets: livenessDecisionTargetsDeserializer(item["targets"]),
    digest: item["digest"],
    sessionImageId: item["sessionImageId"],
  };
}

/** The outcome of the liveness classification. */
export type FaceLivenessDecision = "uncertain" | "realface" | "spoofface";

/** The targets used for liveness classification. */
export interface LivenessDecisionTargets {
  /** The target from color image used for liveness classification. */
  color: LivenessColorDecisionTarget;
}

export function livenessDecisionTargetsDeserializer(item: any): LivenessDecisionTargets {
  return {
    color: livenessColorDecisionTargetDeserializer(item["color"]),
  };
}

/** The target from color image used for liveness classification. */
export interface LivenessColorDecisionTarget {
  /** The face region where the liveness classification was made on. */
  faceRectangle: FaceRectangle;
}

export function livenessColorDecisionTargetDeserializer(item: any): LivenessColorDecisionTarget {
  return {
    faceRectangle: faceRectangleDeserializer(item["faceRectangle"]),
  };
}

/** The error of the liveness classification. */
export interface LivenessError {
  /** The error code. */
  code: string;
  /** The error message. */
  message: string;
  /** Targets used for liveness classification. */
  targets: LivenessDecisionTargets;
}

export function livenessErrorDeserializer(item: any): LivenessError {
  return {
    code: item["code"],
    message: item["message"],
    targets: livenessDecisionTargetsDeserializer(item["targets"]),
  };
}

export function clientInformationArrayDeserializer(result: Array<ClientInformation>): any[] {
  return result.map((item) => {
    return clientInformationDeserializer(item);
  });
}

/** The client information gathered during the liveness attempt. */
export interface ClientInformation {
  /** The client ip address seen during the liveness attempt. */
  ip: string;
}

export function clientInformationDeserializer(item: any): ClientInformation {
  return {
    ip: item["ip"],
  };
}

/** The abuse monitoring result for the liveness attempt. */
export interface AbuseMonitoringResult {
  /** Denotes if abuse detection triggered during this liveness attempt. */
  isAbuseDetected: HttpPart2;
  /** Denotes if abuse detection triggered during this liveness attempt. */
  otherFlaggedSessions: OtherFlaggedSessions[];
}

export function abuseMonitoringResultDeserializer(item: any): AbuseMonitoringResult {
  return {
    isAbuseDetected: httpPart2Deserializer(item["isAbuseDetected"]),
    otherFlaggedSessions: otherFlaggedSessionsArrayDeserializer(item["otherFlaggedSessions"]),
  };
}

export function otherFlaggedSessionsArrayDeserializer(result: Array<OtherFlaggedSessions>): any[] {
  return result.map((item) => {
    return otherFlaggedSessionsDeserializer(item);
  });
}

/** The other sessions flagged as abuse based on the information gathered during this attempt. */
export interface OtherFlaggedSessions {
  /** The attempt ID, start from 1. */
  attemptId: number;
  /** The unique session ID of the flagged session. */
  sessionId: string;
  /** The image ID from the flagged session. */
  sessionImageId?: string;
}

export function otherFlaggedSessionsDeserializer(item: any): OtherFlaggedSessions {
  return {
    attemptId: item["attemptId"],
    sessionId: item["sessionId"],
    sessionImageId: item["sessionImageId"],
  };
}

/** Request of liveness with verify session creation. */
export interface CreateLivenessWithVerifySessionContent {
  /** Type of liveness mode the client should follow. */
  livenessOperationMode: LivenessOperationMode;
  /** Whether or not to allow client to set their own 'deviceCorrelationId' via the Vision SDK. Default is false, and 'deviceCorrelationId' must be set in this request body. */
  deviceCorrelationIdSetInClient?: boolean;
  /** Whether or not store the session image. */
  enableSessionImage?: boolean;
  /** The model version used for liveness classification. This is an optional parameter, and if this is not specified, then the latest supported model version will be chosen */
  livenessModelVersion?: LivenessModel;
  /** Whether or not return the verify image hash. */
  returnVerifyImageHash?: boolean;
  /** Threshold for confidence of the face verification. Please refer to the documentation for more details. https://learn.microsoft.com/legal/cognitive-services/face/characteristics-and-limitations?context=%2Fazure%2Fai-services%2Fcomputer-vision%2Fcontext%2Fcontext#recognition-confidence-score */
  verifyConfidenceThreshold?: number;
  /** The image stream for verify. Content-Disposition header field for this part must have filename. */
  verifyImage: FileContents | { contents: FileContents; contentType?: string; filename?: string };
  /** Unique Guid per each end-user device. This is to provide rate limiting and anti-hammering. If 'deviceCorrelationIdSetInClient' is true in this request, this 'deviceCorrelationId' must be null. */
  deviceCorrelationId?: string;
  /** Seconds the session should last for. Range is 60 to 86400 seconds. Default value is 600. */
  authTokenTimeToLiveInSeconds?: number;
  /** The number of times a client can attempt a liveness check using the same authToken. Default value is 1. Maximum value is 3. */
  numberOfClientAttemptsAllowed?: number;
}

export function createLivenessWithVerifySessionContentSerializer(
  item: CreateLivenessWithVerifySessionContent,
): any {
  return [
    { name: "livenessOperationMode", body: item["livenessOperationMode"] },
    ...(item["deviceCorrelationIdSetInClient"] === undefined
      ? []
      : [{ name: "deviceCorrelationIdSetInClient", body: item["deviceCorrelationIdSetInClient"] }]),
    ...(item["enableSessionImage"] === undefined
      ? []
      : [{ name: "enableSessionImage", body: item["enableSessionImage"] }]),
    ...(item["livenessModelVersion"] === undefined
      ? []
      : [{ name: "livenessModelVersion", body: item["livenessModelVersion"] }]),
    ...(item["returnVerifyImageHash"] === undefined
      ? []
      : [{ name: "returnVerifyImageHash", body: item["returnVerifyImageHash"] }]),
    ...(item["verifyConfidenceThreshold"] === undefined
      ? []
      : [{ name: "verifyConfidenceThreshold", body: item["verifyConfidenceThreshold"] }]),
    createFilePartDescriptor("verifyImage", item["verifyImage"], "application/octet-stream"),
    ...(item["deviceCorrelationId"] === undefined
      ? []
      : [{ name: "deviceCorrelationId", body: item["deviceCorrelationId"] }]),
    ...(item["authTokenTimeToLiveInSeconds"] === undefined
      ? []
      : [{ name: "authTokenTimeToLiveInSeconds", body: item["authTokenTimeToLiveInSeconds"] }]),
    ...(item["numberOfClientAttemptsAllowed"] === undefined
      ? []
      : [{ name: "numberOfClientAttemptsAllowed", body: item["numberOfClientAttemptsAllowed"] }]),
  ];
}

/** Session result of detect liveness with verify. */
export interface LivenessWithVerifySession {
  /** The unique ID to reference this session. */
  readonly sessionId: string;
  /** Bearer token to provide authentication for the Vision SDK running on a client application. This Bearer token has limited permissions to perform only the required action and expires after the TTL time. It is also auditable. */
  authToken: string;
  /** The current status of the session. */
  status: OperationState;
  /** The model version used for liveness classification. This is an optional parameter, and if this is not specified, then the latest supported model version will be chosen */
  modelVersion?: LivenessModel;
  /** Denotes if the abuse monitoring feature was enabled during this session. */
  isAbuseMonitoringEnabled?: HttpPart1;
  /** The expected IP address or CIDR block of the client that runs the liveness check. */
  expectedClientIpAddress?: string;
  /** The results of the liveness with verify session. */
  results: LivenessWithVerifySessionResults;
}

export function livenessWithVerifySessionDeserializer(item: any): LivenessWithVerifySession {
  return {
    sessionId: item["sessionId"],
    authToken: item["authToken"],
    status: item["status"],
    modelVersion: item["modelVersion"],
    isAbuseMonitoringEnabled: !item["isAbuseMonitoringEnabled"]
      ? item["isAbuseMonitoringEnabled"]
      : httpPart1Deserializer(item["isAbuseMonitoringEnabled"]),
    expectedClientIpAddress: item["expectedClientIpAddress"],
    results: livenessWithVerifySessionResultsDeserializer(item["results"]),
  };
}

/** The results of the liveness with verify session. */
export interface LivenessWithVerifySessionResults {
  /** The references used for face verification. */
  verifyReferences: LivenessWithVerifyReference[];
  /** The attempts data of underlying liveness with verify call with the session. */
  attempts: LivenessWithVerifySessionAttempt[];
}

export function livenessWithVerifySessionResultsDeserializer(
  item: any,
): LivenessWithVerifySessionResults {
  return {
    verifyReferences: livenessWithVerifyReferenceArrayDeserializer(item["verifyReferences"]),
    attempts: livenessWithVerifySessionAttemptArrayDeserializer(item["attempts"]),
  };
}

export function livenessWithVerifyReferenceArrayDeserializer(
  result: Array<LivenessWithVerifyReference>,
): any[] {
  return result.map((item) => {
    return livenessWithVerifyReferenceDeserializer(item);
  });
}

/** The detail of face for verification. */
export interface LivenessWithVerifyReference {
  /** The image type which contains the face rectangle where the liveness classification was made on. */
  referenceType: FaceImageType;
  /** The face region where the comparison image's classification was made. */
  faceRectangle: FaceRectangle;
  /** Quality of face image for recognition. */
  qualityForRecognition: QualityForRecognition;
}

export function livenessWithVerifyReferenceDeserializer(item: any): LivenessWithVerifyReference {
  return {
    referenceType: item["referenceType"],
    faceRectangle: faceRectangleDeserializer(item["faceRectangle"]),
    qualityForRecognition: item["qualityForRecognition"],
  };
}

/** The type of image. */
export type FaceImageType = "Color" | "Infrared" | "Depth";

export function livenessWithVerifySessionAttemptArrayDeserializer(
  result: Array<LivenessWithVerifySessionAttempt>,
): any[] {
  return result.map((item) => {
    return livenessWithVerifySessionAttemptDeserializer(item);
  });
}

/** The liveness with verify session attempt. */
export interface LivenessWithVerifySessionAttempt {
  /** The attempt ID, start from 1. */
  attemptId: number;
  /** The status of the attempt. */
  attemptStatus: OperationState;
  /** The result of the liveness with verify call, will be null if there is error. */
  result?: LivenessWithVerifyResult;
  /** The error of the liveness with verify call, will be null if there is result. */
  error?: LivenessError;
  /** The client information gathered during the liveness attempt. */
  clientInformation?: ClientInformation[];
  /** The abuse monitoring result for the liveness attempt. */
  abuseMonitoringResult?: AbuseMonitoringResult;
}

export function livenessWithVerifySessionAttemptDeserializer(
  item: any,
): LivenessWithVerifySessionAttempt {
  return {
    attemptId: item["attemptId"],
    attemptStatus: item["attemptStatus"],
    result: !item["result"] ? item["result"] : livenessWithVerifyResultDeserializer(item["result"]),
    error: !item["error"] ? item["error"] : livenessErrorDeserializer(item["error"]),
    clientInformation: !item["clientInformation"]
      ? item["clientInformation"]
      : clientInformationArrayDeserializer(item["clientInformation"]),
    abuseMonitoringResult: !item["abuseMonitoringResult"]
      ? item["abuseMonitoringResult"]
      : abuseMonitoringResultDeserializer(item["abuseMonitoringResult"]),
  };
}

/** The results of the liveness with verify call. */
export interface LivenessWithVerifyResult {
  /** The liveness classification for the target face. */
  livenessDecision?: FaceLivenessDecision;
  /** Targets used for liveness classification. */
  targets: LivenessDecisionTargets;
  /** The server calculated digest for this request. If the client reported digest differs from the server calculated digest, then the message integrity between the client and service has been compromised and the result should not be trusted. For more information, see how to guides on how to leverage this value to secure your end-to-end solution. */
  digest: string;
  /** The image ID of the session request. */
  sessionImageId?: string;
  /** The face verification output. Only available when the request is liveness with verify. */
  verifyResult?: LivenessWithVerifyOutputs;
  /** The sha256 hash of the verify-image in the request. */
  verifyImageHash?: string;
}

export function livenessWithVerifyResultDeserializer(item: any): LivenessWithVerifyResult {
  return {
    livenessDecision: item["livenessDecision"],
    targets: livenessDecisionTargetsDeserializer(item["targets"]),
    digest: item["digest"],
    sessionImageId: item["sessionImageId"],
    verifyResult: !item["verifyResult"]
      ? item["verifyResult"]
      : livenessWithVerifyOutputsDeserializer(item["verifyResult"]),
    verifyImageHash: item["verifyImageHash"],
  };
}

/** The face verification output. */
export interface LivenessWithVerifyOutputs {
  /** The target face liveness face and comparison image face verification confidence. */
  matchConfidence: number;
  /** Whether the target liveness face and comparison image face match. */
  isIdentical: boolean;
}

export function livenessWithVerifyOutputsDeserializer(item: any): LivenessWithVerifyOutputs {
  return {
    matchConfidence: item["matchConfidence"],
    isIdentical: item["isIdentical"],
  };
}

/** Large face list is a list of faces, up to 1,000,000 faces. */
export interface LargeFaceList {
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /** Name of recognition model. Recognition model is used when the face features are extracted and associated with detected faceIds. */
  recognitionModel?: FaceRecognitionModel;
  /** Valid character is letter in lower case or digit or '-' or '_', maximum length is 64. */
  readonly largeFaceListId: string;
}

export function largeFaceListDeserializer(item: any): LargeFaceList {
  return {
    name: item["name"],
    userData: item["userData"],
    recognitionModel: item["recognitionModel"],
    largeFaceListId: item["largeFaceListId"],
  };
}

/** Training result of a container */
export interface FaceTrainingResult {
  /** Training status of the container. */
  status: FaceOperationStatus;
  /** A combined UTC date and time string that describes the created time of the person group, large person group or large face list. */
  createdDateTime: Date;
  /** A combined UTC date and time string that describes the last modify time of the person group, large person group or large face list, could be null value when the group is not successfully trained. */
  lastActionDateTime: Date;
  /** A combined UTC date and time string that describes the last successful training time of the person group, large person group or large face list. */
  lastSuccessfulTrainingDateTime: Date;
  /** Show failure message when training failed (omitted when training succeed). */
  message?: string;
}

export function faceTrainingResultDeserializer(item: any): FaceTrainingResult {
  return {
    status: item["status"],
    createdDateTime: new Date(item["createdDateTime"]),
    lastActionDateTime: new Date(item["lastActionDateTime"]),
    lastSuccessfulTrainingDateTime: new Date(item["lastSuccessfulTrainingDateTime"]),
    message: item["message"],
  };
}

/** The status of long running operation. */
export type FaceOperationStatus = "notStarted" | "running" | "succeeded" | "failed";

/** Response body for adding face. */
export interface AddFaceResult {
  /** Persisted Face ID of the added face, which is persisted and will not expire. Different from faceId which is created in "Detect" and will expire in 24 hours after the detection call. */
  persistedFaceId: string;
}

export function addFaceResultDeserializer(item: any): AddFaceResult {
  return {
    persistedFaceId: item["persistedFaceId"],
  };
}

/** Face resource for large face list. */
export interface LargeFaceListFace {
  /** Face ID of the face. */
  readonly persistedFaceId: string;
  /** User-provided data attached to the face. The length limit is 1K. */
  userData?: string;
}

export function largeFaceListFaceDeserializer(item: any): LargeFaceListFace {
  return {
    persistedFaceId: item["persistedFaceId"],
    userData: item["userData"],
  };
}

/** The container of the uploaded person data, including face recognition feature, and up to 1,000,000 people. */
export interface LargePersonGroup {
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /** Name of recognition model. Recognition model is used when the face features are extracted and associated with detected faceIds. */
  recognitionModel?: FaceRecognitionModel;
  /** ID of the container. */
  readonly largePersonGroupId: string;
}

export function largePersonGroupDeserializer(item: any): LargePersonGroup {
  return {
    name: item["name"],
    userData: item["userData"],
    recognitionModel: item["recognitionModel"],
    largePersonGroupId: item["largePersonGroupId"],
  };
}

/** Response of create person. */
export interface CreatePersonResult {
  /** Person ID of the person. */
  personId: string;
}

export function createPersonResultDeserializer(item: any): CreatePersonResult {
  return {
    personId: item["personId"],
  };
}

/** The person in a specified large person group. To add face to this person, please call "Add Large Person Group Person Face". */
export interface LargePersonGroupPerson {
  /** ID of the person. */
  readonly personId: string;
  /** User defined name, maximum length is 128. */
  name: string;
  /** Optional user defined data. Length should not exceed 16K. */
  userData?: string;
  /** Face ids of registered faces in the person. */
  persistedFaceIds?: string[];
}

export function largePersonGroupPersonDeserializer(item: any): LargePersonGroupPerson {
  return {
    personId: item["personId"],
    name: item["name"],
    userData: item["userData"],
    persistedFaceIds: !item["persistedFaceIds"]
      ? item["persistedFaceIds"]
      : item["persistedFaceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Face resource for large person group person. */
export interface LargePersonGroupPersonFace {
  /** Face ID of the face. */
  readonly persistedFaceId: string;
  /** User-provided data attached to the face. The length limit is 1K. */
  userData?: string;
}

export function largePersonGroupPersonFaceDeserializer(item: any): LargePersonGroupPersonFace {
  return {
    persistedFaceId: item["persistedFaceId"],
    userData: item["userData"],
  };
}

/** The detection model for the face. */
export type FaceDetectionModel = "detection_01" | "detection_02" | "detection_03";
/** Available options for detect face with attribute. */
export type FaceAttributeType =
  | "headPose"
  | "glasses"
  | "occlusion"
  | "accessories"
  | "blur"
  | "exposure"
  | "noise"
  | "mask"
  | "qualityForRecognition"
  | "age"
  | "smile"
  | "facialHair"
  | "hair";
/** API versions for Azure AI Face API. */
export type Versions = "v1.1-preview.1" | "v1.2-preview.1" | "v1.2" | "v1.3-preview.1";

export function faceDetectionResultArrayDeserializer(result: Array<FaceDetectionResult>): any[] {
  return result.map((item) => {
    return faceDetectionResultDeserializer(item);
  });
}

export function faceFindSimilarResultArrayDeserializer(
  result: Array<FaceFindSimilarResult>,
): any[] {
  return result.map((item) => {
    return faceFindSimilarResultDeserializer(item);
  });
}

export function faceIdentificationResultArrayDeserializer(
  result: Array<FaceIdentificationResult>,
): any[] {
  return result.map((item) => {
    return faceIdentificationResultDeserializer(item);
  });
}

export function largePersonGroupArrayDeserializer(result: Array<LargePersonGroup>): any[] {
  return result.map((item) => {
    return largePersonGroupDeserializer(item);
  });
}

export function largePersonGroupPersonArrayDeserializer(
  result: Array<LargePersonGroupPerson>,
): any[] {
  return result.map((item) => {
    return largePersonGroupPersonDeserializer(item);
  });
}

export function largeFaceListArrayDeserializer(result: Array<LargeFaceList>): any[] {
  return result.map((item) => {
    return largeFaceListDeserializer(item);
  });
}

export function largeFaceListFaceArrayDeserializer(result: Array<LargeFaceListFace>): any[] {
  return result.map((item) => {
    return largeFaceListFaceDeserializer(item);
  });
}

export type GetSessionImageResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};
