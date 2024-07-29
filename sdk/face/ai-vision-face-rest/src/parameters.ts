// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  DetectionModel,
  RecognitionModel,
  FaceAttributeType,
  FindSimilarMatchMode,
  CreateLivenessSessionContent,
  CreateLivenessWithVerifySessionContent,
} from "./models.js";

export type GetOperationResultParameters = RequestParameters;

export interface DetectFromUrlBodyParam {
  body?: { url: string };
}

export interface DetectFromUrlQueryParamProperties {
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /**
   * The 'recognitionModel' associated with the detected faceIds. Supported 'recognitionModel' values include 'recognition_01', 'recognition_02', 'recognition_03' or 'recognition_04'. The default value is 'recognition_01'. 'recognition_04' is recommended since its accuracy is improved on faces wearing masks compared with 'recognition_03', and its overall accuracy is improved compared with 'recognition_01' and 'recognition_02'.
   *
   * Possible values: "recognition_01", "recognition_02", "recognition_03", "recognition_04"
   */
  recognitionModel?: RecognitionModel;
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

export interface DetectFromUrlQueryParam {
  queryParameters?: DetectFromUrlQueryParamProperties;
}

export interface DetectFromUrlMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/json";
}

export type DetectFromUrlParameters = DetectFromUrlQueryParam &
  DetectFromUrlMediaTypesParam &
  DetectFromUrlBodyParam &
  RequestParameters;

export interface DetectBodyParam {
  /**
   * The input image binary.
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface DetectQueryParamProperties {
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /**
   * The 'recognitionModel' associated with the detected faceIds. Supported 'recognitionModel' values include 'recognition_01', 'recognition_02', 'recognition_03' or 'recognition_04'. The default value is 'recognition_01'. 'recognition_04' is recommended since its accuracy is improved on faces wearing masks compared with 'recognition_03', and its overall accuracy is improved compared with 'recognition_01' and 'recognition_02'.
   *
   * Possible values: "recognition_01", "recognition_02", "recognition_03", "recognition_04"
   */
  recognitionModel?: RecognitionModel;
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

export interface DetectQueryParam {
  queryParameters?: DetectQueryParamProperties;
}

export interface DetectMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/octet-stream";
}

export type DetectParameters = DetectQueryParam &
  DetectMediaTypesParam &
  DetectBodyParam &
  RequestParameters;

export interface FindSimilarBodyParam {
  body?: {
    faceId: string;
    maxNumOfCandidatesReturned?: number;
    mode?: FindSimilarMatchMode;
    faceIds: string[];
  };
}

export type FindSimilarParameters = FindSimilarBodyParam & RequestParameters;

export interface FindSimilarFromFaceListBodyParam {
  body?: {
    faceId: string;
    maxNumOfCandidatesReturned?: number;
    mode?: FindSimilarMatchMode;
    faceListId: string;
  };
}

export type FindSimilarFromFaceListParameters =
  FindSimilarFromFaceListBodyParam & RequestParameters;

export interface FindSimilarFromLargeFaceListBodyParam {
  body?: {
    faceId: string;
    maxNumOfCandidatesReturned?: number;
    mode?: FindSimilarMatchMode;
    largeFaceListId: string;
  };
}

export type FindSimilarFromLargeFaceListParameters =
  FindSimilarFromLargeFaceListBodyParam & RequestParameters;

export interface IdentifyFromPersonGroupBodyParam {
  body?: {
    faceIds: string[];
    personGroupId: string;
    maxNumOfCandidatesReturned?: number;
    confidenceThreshold?: number;
  };
}

export type IdentifyFromPersonGroupParameters =
  IdentifyFromPersonGroupBodyParam & RequestParameters;

export interface IdentifyFromLargePersonGroupBodyParam {
  body?: {
    faceIds: string[];
    largePersonGroupId: string;
    maxNumOfCandidatesReturned?: number;
    confidenceThreshold?: number;
  };
}

export type IdentifyFromLargePersonGroupParameters =
  IdentifyFromLargePersonGroupBodyParam & RequestParameters;

export interface IdentifyFromPersonDirectoryBodyParam {
  body?: {
    faceIds: string[];
    personIds: string[];
    maxNumOfCandidatesReturned?: number;
    confidenceThreshold?: number;
  };
}

export type IdentifyFromPersonDirectoryParameters =
  IdentifyFromPersonDirectoryBodyParam & RequestParameters;

export interface IdentifyFromDynamicPersonGroupBodyParam {
  body?: {
    faceIds: string[];
    dynamicPersonGroupId: string;
    maxNumOfCandidatesReturned?: number;
    confidenceThreshold?: number;
  };
}

export type IdentifyFromDynamicPersonGroupParameters =
  IdentifyFromDynamicPersonGroupBodyParam & RequestParameters;

export interface VerifyFaceToFaceBodyParam {
  body?: { faceId1: string; faceId2: string };
}

export type VerifyFaceToFaceParameters = VerifyFaceToFaceBodyParam &
  RequestParameters;

export interface VerifyFromPersonGroupBodyParam {
  body?: { faceId: string; personGroupId: string; personId: string };
}

export type VerifyFromPersonGroupParameters = VerifyFromPersonGroupBodyParam &
  RequestParameters;

export interface VerifyFromLargePersonGroupBodyParam {
  body?: { faceId: string; largePersonGroupId: string; personId: string };
}

export type VerifyFromLargePersonGroupParameters =
  VerifyFromLargePersonGroupBodyParam & RequestParameters;

export interface VerifyFromPersonDirectoryBodyParam {
  body?: { faceId: string; personId: string };
}

export type VerifyFromPersonDirectoryParameters =
  VerifyFromPersonDirectoryBodyParam & RequestParameters;

export interface GroupBodyParam {
  body?: { faceIds: string[] };
}

export type GroupParameters = GroupBodyParam & RequestParameters;

export interface CreateLivenessSessionBodyParam {
  body?: CreateLivenessSessionContent;
}

export type CreateLivenessSessionParameters = CreateLivenessSessionBodyParam &
  RequestParameters;
export type DeleteLivenessSessionParameters = RequestParameters;
export type GetLivenessSessionResultParameters = RequestParameters;

export interface GetLivenessSessionsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetLivenessSessionsQueryParam {
  queryParameters?: GetLivenessSessionsQueryParamProperties;
}

export type GetLivenessSessionsParameters = GetLivenessSessionsQueryParam &
  RequestParameters;

export interface GetLivenessSessionAuditEntriesQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetLivenessSessionAuditEntriesQueryParam {
  queryParameters?: GetLivenessSessionAuditEntriesQueryParamProperties;
}

export type GetLivenessSessionAuditEntriesParameters =
  GetLivenessSessionAuditEntriesQueryParam & RequestParameters;

export interface CreateLivenessWithVerifySessionWithVerifyImageBodyParam {
  body?: CreateLivenessWithVerifySessionContent;
}

export interface CreateLivenessWithVerifySessionWithVerifyImageMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type CreateLivenessWithVerifySessionWithVerifyImageParameters =
  CreateLivenessWithVerifySessionWithVerifyImageMediaTypesParam &
    CreateLivenessWithVerifySessionWithVerifyImageBodyParam &
    RequestParameters;

export interface CreateLivenessWithVerifySessionBodyParam {
  body?: CreateLivenessSessionContent;
}

export type CreateLivenessWithVerifySessionParameters =
  CreateLivenessWithVerifySessionBodyParam & RequestParameters;
export type DeleteLivenessWithVerifySessionParameters = RequestParameters;
export type GetLivenessWithVerifySessionResultParameters = RequestParameters;

export interface GetLivenessWithVerifySessionsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetLivenessWithVerifySessionsQueryParam {
  queryParameters?: GetLivenessWithVerifySessionsQueryParamProperties;
}

export type GetLivenessWithVerifySessionsParameters =
  GetLivenessWithVerifySessionsQueryParam & RequestParameters;

export interface GetLivenessWithVerifySessionAuditEntriesQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetLivenessWithVerifySessionAuditEntriesQueryParam {
  queryParameters?: GetLivenessWithVerifySessionAuditEntriesQueryParamProperties;
}

export type GetLivenessWithVerifySessionAuditEntriesParameters =
  GetLivenessWithVerifySessionAuditEntriesQueryParam & RequestParameters;

export interface CreateFaceListBodyParam {
  body?: {
    name: string;
    userData?: string;
    recognitionModel?: RecognitionModel;
  };
}

export type CreateFaceListParameters = CreateFaceListBodyParam &
  RequestParameters;
export type DeleteFaceListParameters = RequestParameters;

export interface GetFaceListQueryParamProperties {
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

export interface GetFaceListQueryParam {
  queryParameters?: GetFaceListQueryParamProperties;
}

export type GetFaceListParameters = GetFaceListQueryParam & RequestParameters;

export interface UpdateFaceListBodyParam {
  body?: { name?: string; userData?: string };
}

export type UpdateFaceListParameters = UpdateFaceListBodyParam &
  RequestParameters;

export interface GetFaceListsQueryParamProperties {
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

export interface GetFaceListsQueryParam {
  queryParameters?: GetFaceListsQueryParamProperties;
}

export type GetFaceListsParameters = GetFaceListsQueryParam & RequestParameters;

export interface AddFaceListFaceFromUrlBodyParam {
  body?: { url: string };
}

export interface AddFaceListFaceFromUrlQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddFaceListFaceFromUrlQueryParam {
  queryParameters?: AddFaceListFaceFromUrlQueryParamProperties;
}

export type AddFaceListFaceFromUrlParameters =
  AddFaceListFaceFromUrlQueryParam &
    AddFaceListFaceFromUrlBodyParam &
    RequestParameters;

export interface AddFaceListFaceBodyParam {
  /**
   * The image to be analyzed
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface AddFaceListFaceQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddFaceListFaceQueryParam {
  queryParameters?: AddFaceListFaceQueryParamProperties;
}

export interface AddFaceListFaceMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/octet-stream";
}

export type AddFaceListFaceParameters = AddFaceListFaceQueryParam &
  AddFaceListFaceMediaTypesParam &
  AddFaceListFaceBodyParam &
  RequestParameters;
export type DeleteFaceListFaceParameters = RequestParameters;

export interface CreateLargeFaceListBodyParam {
  body?: {
    name: string;
    userData?: string;
    recognitionModel?: RecognitionModel;
  };
}

export type CreateLargeFaceListParameters = CreateLargeFaceListBodyParam &
  RequestParameters;
export type DeleteLargeFaceListParameters = RequestParameters;

export interface GetLargeFaceListQueryParamProperties {
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

export interface GetLargeFaceListQueryParam {
  queryParameters?: GetLargeFaceListQueryParamProperties;
}

export type GetLargeFaceListParameters = GetLargeFaceListQueryParam &
  RequestParameters;

export interface UpdateLargeFaceListBodyParam {
  body?: { name?: string; userData?: string };
}

export type UpdateLargeFaceListParameters = UpdateLargeFaceListBodyParam &
  RequestParameters;

export interface GetLargeFaceListsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

export interface GetLargeFaceListsQueryParam {
  queryParameters?: GetLargeFaceListsQueryParamProperties;
}

export type GetLargeFaceListsParameters = GetLargeFaceListsQueryParam &
  RequestParameters;
export type GetLargeFaceListTrainingStatusParameters = RequestParameters;
export type TrainLargeFaceListParameters = RequestParameters;

export interface AddLargeFaceListFaceFromUrlBodyParam {
  body?: { url: string };
}

export interface AddLargeFaceListFaceFromUrlQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddLargeFaceListFaceFromUrlQueryParam {
  queryParameters?: AddLargeFaceListFaceFromUrlQueryParamProperties;
}

export type AddLargeFaceListFaceFromUrlParameters =
  AddLargeFaceListFaceFromUrlQueryParam &
    AddLargeFaceListFaceFromUrlBodyParam &
    RequestParameters;

export interface AddLargeFaceListFaceBodyParam {
  /**
   * The image to be analyzed
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface AddLargeFaceListFaceQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddLargeFaceListFaceQueryParam {
  queryParameters?: AddLargeFaceListFaceQueryParamProperties;
}

export interface AddLargeFaceListFaceMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/octet-stream";
}

export type AddLargeFaceListFaceParameters = AddLargeFaceListFaceQueryParam &
  AddLargeFaceListFaceMediaTypesParam &
  AddLargeFaceListFaceBodyParam &
  RequestParameters;
export type DeleteLargeFaceListFaceParameters = RequestParameters;
export type GetLargeFaceListFaceParameters = RequestParameters;

export interface UpdateLargeFaceListFaceBodyParam {
  body?: { userData?: string };
}

export type UpdateLargeFaceListFaceParameters =
  UpdateLargeFaceListFaceBodyParam & RequestParameters;

export interface GetLargeFaceListFacesQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetLargeFaceListFacesQueryParam {
  queryParameters?: GetLargeFaceListFacesQueryParamProperties;
}

export type GetLargeFaceListFacesParameters = GetLargeFaceListFacesQueryParam &
  RequestParameters;

export interface CreatePersonBodyParam {
  body?: { name: string; userData?: string };
}

export type CreatePersonParameters = CreatePersonBodyParam & RequestParameters;
export type DeletePersonParameters = RequestParameters;
export type GetPersonParameters = RequestParameters;

export interface UpdatePersonBodyParam {
  body?: { name?: string; userData?: string };
}

export type UpdatePersonParameters = UpdatePersonBodyParam & RequestParameters;

export interface GetPersonsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetPersonsQueryParam {
  queryParameters?: GetPersonsQueryParamProperties;
}

export type GetPersonsParameters = GetPersonsQueryParam & RequestParameters;

export interface GetDynamicPersonGroupReferencesQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetDynamicPersonGroupReferencesQueryParam {
  queryParameters?: GetDynamicPersonGroupReferencesQueryParamProperties;
}

export type GetDynamicPersonGroupReferencesParameters =
  GetDynamicPersonGroupReferencesQueryParam & RequestParameters;

export interface AddPersonFaceBodyParam {
  /**
   * The image to be analyzed
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface AddPersonFaceQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddPersonFaceQueryParam {
  queryParameters?: AddPersonFaceQueryParamProperties;
}

export interface AddPersonFaceMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/octet-stream";
}

export type AddPersonFaceParameters = AddPersonFaceQueryParam &
  AddPersonFaceMediaTypesParam &
  AddPersonFaceBodyParam &
  RequestParameters;

export interface AddPersonFaceFromUrlBodyParam {
  body?: { url: string };
}

export interface AddPersonFaceFromUrlQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddPersonFaceFromUrlQueryParam {
  queryParameters?: AddPersonFaceFromUrlQueryParamProperties;
}

export type AddPersonFaceFromUrlParameters = AddPersonFaceFromUrlQueryParam &
  AddPersonFaceFromUrlBodyParam &
  RequestParameters;
export type DeletePersonFaceParameters = RequestParameters;
export type GetPersonFaceParameters = RequestParameters;

export interface UpdatePersonFaceBodyParam {
  body?: { userData?: string };
}

export type UpdatePersonFaceParameters = UpdatePersonFaceBodyParam &
  RequestParameters;
export type GetPersonFacesParameters = RequestParameters;

export interface CreateDynamicPersonGroupWithPersonBodyParam {
  body?: { name: string; userData?: string; addPersonIds: string[] };
}

export type CreateDynamicPersonGroupWithPersonParameters =
  CreateDynamicPersonGroupWithPersonBodyParam & RequestParameters;

export interface CreateDynamicPersonGroupBodyParam {
  body?: { name: string; userData?: string };
}

export type CreateDynamicPersonGroupParameters =
  CreateDynamicPersonGroupBodyParam & RequestParameters;
export type DeleteDynamicPersonGroupParameters = RequestParameters;
export type GetDynamicPersonGroupParameters = RequestParameters;

export interface UpdateDynamicPersonGroupWithPersonChangesBodyParam {
  body?: {
    name?: string;
    userData?: string;
    addPersonIds?: string[];
    removePersonIds?: string[];
  };
}

export type UpdateDynamicPersonGroupWithPersonChangesParameters =
  UpdateDynamicPersonGroupWithPersonChangesBodyParam & RequestParameters;

export interface UpdateDynamicPersonGroupBodyParam {
  body?: { name?: string; userData?: string };
}

export type UpdateDynamicPersonGroupParameters =
  UpdateDynamicPersonGroupBodyParam & RequestParameters;

export interface GetDynamicPersonGroupsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetDynamicPersonGroupsQueryParam {
  queryParameters?: GetDynamicPersonGroupsQueryParamProperties;
}

export type GetDynamicPersonGroupsParameters =
  GetDynamicPersonGroupsQueryParam & RequestParameters;

export interface GetDynamicPersonGroupPersonsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetDynamicPersonGroupPersonsQueryParam {
  queryParameters?: GetDynamicPersonGroupPersonsQueryParamProperties;
}

export type GetDynamicPersonGroupPersonsParameters =
  GetDynamicPersonGroupPersonsQueryParam & RequestParameters;

export interface CreatePersonGroupBodyParam {
  body?: {
    name: string;
    userData?: string;
    recognitionModel?: RecognitionModel;
  };
}

export type CreatePersonGroupParameters = CreatePersonGroupBodyParam &
  RequestParameters;
export type DeletePersonGroupParameters = RequestParameters;

export interface GetPersonGroupQueryParamProperties {
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

export interface GetPersonGroupQueryParam {
  queryParameters?: GetPersonGroupQueryParamProperties;
}

export type GetPersonGroupParameters = GetPersonGroupQueryParam &
  RequestParameters;

export interface UpdatePersonGroupBodyParam {
  body?: { name?: string; userData?: string };
}

export type UpdatePersonGroupParameters = UpdatePersonGroupBodyParam &
  RequestParameters;

export interface GetPersonGroupsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

export interface GetPersonGroupsQueryParam {
  queryParameters?: GetPersonGroupsQueryParamProperties;
}

export type GetPersonGroupsParameters = GetPersonGroupsQueryParam &
  RequestParameters;
export type GetPersonGroupTrainingStatusParameters = RequestParameters;
export type TrainPersonGroupParameters = RequestParameters;

export interface CreatePersonGroupPersonBodyParam {
  body?: { name: string; userData?: string };
}

export type CreatePersonGroupPersonParameters =
  CreatePersonGroupPersonBodyParam & RequestParameters;
export type DeletePersonGroupPersonParameters = RequestParameters;
export type GetPersonGroupPersonParameters = RequestParameters;

export interface UpdatePersonGroupPersonBodyParam {
  body?: { name?: string; userData?: string };
}

export type UpdatePersonGroupPersonParameters =
  UpdatePersonGroupPersonBodyParam & RequestParameters;

export interface GetPersonGroupPersonsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetPersonGroupPersonsQueryParam {
  queryParameters?: GetPersonGroupPersonsQueryParamProperties;
}

export type GetPersonGroupPersonsParameters = GetPersonGroupPersonsQueryParam &
  RequestParameters;

export interface AddPersonGroupPersonFaceFromUrlBodyParam {
  body?: { url: string };
}

export interface AddPersonGroupPersonFaceFromUrlQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddPersonGroupPersonFaceFromUrlQueryParam {
  queryParameters?: AddPersonGroupPersonFaceFromUrlQueryParamProperties;
}

export type AddPersonGroupPersonFaceFromUrlParameters =
  AddPersonGroupPersonFaceFromUrlQueryParam &
    AddPersonGroupPersonFaceFromUrlBodyParam &
    RequestParameters;

export interface AddPersonGroupPersonFaceBodyParam {
  /**
   * The image to be analyzed
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface AddPersonGroupPersonFaceQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddPersonGroupPersonFaceQueryParam {
  queryParameters?: AddPersonGroupPersonFaceQueryParamProperties;
}

export interface AddPersonGroupPersonFaceMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/octet-stream";
}

export type AddPersonGroupPersonFaceParameters =
  AddPersonGroupPersonFaceQueryParam &
    AddPersonGroupPersonFaceMediaTypesParam &
    AddPersonGroupPersonFaceBodyParam &
    RequestParameters;
export type DeletePersonGroupPersonFaceParameters = RequestParameters;
export type GetPersonGroupPersonFaceParameters = RequestParameters;

export interface UpdatePersonGroupPersonFaceBodyParam {
  body?: { userData?: string };
}

export type UpdatePersonGroupPersonFaceParameters =
  UpdatePersonGroupPersonFaceBodyParam & RequestParameters;

export interface CreateLargePersonGroupBodyParam {
  body?: {
    name: string;
    userData?: string;
    recognitionModel?: RecognitionModel;
  };
}

export type CreateLargePersonGroupParameters = CreateLargePersonGroupBodyParam &
  RequestParameters;
export type DeleteLargePersonGroupParameters = RequestParameters;

export interface GetLargePersonGroupQueryParamProperties {
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

export interface GetLargePersonGroupQueryParam {
  queryParameters?: GetLargePersonGroupQueryParamProperties;
}

export type GetLargePersonGroupParameters = GetLargePersonGroupQueryParam &
  RequestParameters;

export interface UpdateLargePersonGroupBodyParam {
  body?: { name?: string; userData?: string };
}

export type UpdateLargePersonGroupParameters = UpdateLargePersonGroupBodyParam &
  RequestParameters;

export interface GetLargePersonGroupsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
  /** Return 'recognitionModel' or not. The default value is false. */
  returnRecognitionModel?: boolean;
}

export interface GetLargePersonGroupsQueryParam {
  queryParameters?: GetLargePersonGroupsQueryParamProperties;
}

export type GetLargePersonGroupsParameters = GetLargePersonGroupsQueryParam &
  RequestParameters;
export type GetLargePersonGroupTrainingStatusParameters = RequestParameters;
export type TrainLargePersonGroupParameters = RequestParameters;

export interface CreateLargePersonGroupPersonBodyParam {
  body?: { name: string; userData?: string };
}

export type CreateLargePersonGroupPersonParameters =
  CreateLargePersonGroupPersonBodyParam & RequestParameters;
export type DeleteLargePersonGroupPersonParameters = RequestParameters;
export type GetLargePersonGroupPersonParameters = RequestParameters;

export interface UpdateLargePersonGroupPersonBodyParam {
  body?: { name?: string; userData?: string };
}

export type UpdateLargePersonGroupPersonParameters =
  UpdateLargePersonGroupPersonBodyParam & RequestParameters;

export interface GetLargePersonGroupPersonsQueryParamProperties {
  /** List resources greater than the "start". It contains no more than 64 characters. Default is empty. */
  start?: string;
  /** The number of items to list, ranging in [1, 1000]. Default is 1000. */
  top?: number;
}

export interface GetLargePersonGroupPersonsQueryParam {
  queryParameters?: GetLargePersonGroupPersonsQueryParamProperties;
}

export type GetLargePersonGroupPersonsParameters =
  GetLargePersonGroupPersonsQueryParam & RequestParameters;

export interface AddLargePersonGroupPersonFaceFromUrlBodyParam {
  body?: { url: string };
}

export interface AddLargePersonGroupPersonFaceFromUrlQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddLargePersonGroupPersonFaceFromUrlQueryParam {
  queryParameters?: AddLargePersonGroupPersonFaceFromUrlQueryParamProperties;
}

export type AddLargePersonGroupPersonFaceFromUrlParameters =
  AddLargePersonGroupPersonFaceFromUrlQueryParam &
    AddLargePersonGroupPersonFaceFromUrlBodyParam &
    RequestParameters;

export interface AddLargePersonGroupPersonFaceBodyParam {
  /**
   * The image to be analyzed
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface AddLargePersonGroupPersonFaceQueryParamProperties {
  /** A face rectangle to specify the target face to be added to a person, in the format of 'targetFace=left,top,width,height'. */
  targetFace?: number[];
  /**
   * The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include 'detection_01', 'detection_02' and 'detection_03'. The default value is 'detection_01'.
   *
   * Possible values: "detection_01", "detection_02", "detection_03"
   */
  detectionModel?: DetectionModel;
  /** User-provided data attached to the face. The size limit is 1K. */
  userData?: string;
}

export interface AddLargePersonGroupPersonFaceQueryParam {
  queryParameters?: AddLargePersonGroupPersonFaceQueryParamProperties;
}

export interface AddLargePersonGroupPersonFaceMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/octet-stream";
}

export type AddLargePersonGroupPersonFaceParameters =
  AddLargePersonGroupPersonFaceQueryParam &
    AddLargePersonGroupPersonFaceMediaTypesParam &
    AddLargePersonGroupPersonFaceBodyParam &
    RequestParameters;
export type DeleteLargePersonGroupPersonFaceParameters = RequestParameters;
export type GetLargePersonGroupPersonFaceParameters = RequestParameters;

export interface UpdateLargePersonGroupPersonFaceBodyParam {
  body?: { userData?: string };
}

export type UpdateLargePersonGroupPersonFaceParameters =
  UpdateLargePersonGroupPersonFaceBodyParam & RequestParameters;
