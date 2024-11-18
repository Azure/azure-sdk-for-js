// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type {
  OperationResultOutput,
  FaceErrorResponseOutput,
  FaceDetectionResultOutput,
  FindSimilarResultOutput,
  IdentificationResultOutput,
  VerificationResultOutput,
  GroupingResultOutput,
  FaceListOutput,
  FaceListItemOutput,
  AddFaceResultOutput,
  LargeFaceListOutput,
  TrainingResultOutput,
  LargeFaceListFaceOutput,
  PersonGroupOutput,
  CreatePersonResultOutput,
  PersonGroupPersonOutput,
  PersonGroupPersonFaceOutput,
  LargePersonGroupOutput,
  LargePersonGroupPersonOutput,
  LargePersonGroupPersonFaceOutput,
  CreateLivenessSessionResultOutput,
  LivenessSessionOutput,
  LivenessSessionItemOutput,
  LivenessSessionAuditEntryOutput,
  CreateLivenessWithVerifySessionResultOutput,
  LivenessWithVerifySessionOutput,
  PersonDirectoryPersonOutput,
  ListGroupReferenceResultOutput,
  PersonDirectoryFaceOutput,
  ListFaceResultOutput,
  DynamicPersonGroupOutput,
  ListPersonResultOutput,
} from "./outputModels.js";

/** A successful call returns the long running operation status. */
export interface GetOperationResult200Response extends HttpResponse {
  status: "200";
  body: OperationResultOutput;
}

export interface GetOperationResultDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetOperationResultDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetOperationResultDefaultHeaders;
}

/** A successful call returns an array of face entries ranked by face rectangle size in descending order. An empty response indicates no faces detected. */
export interface DetectFromUrl200Response extends HttpResponse {
  status: "200";
  body: Array<FaceDetectionResultOutput>;
}

export interface DetectFromUrlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DetectFromUrlDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DetectFromUrlDefaultHeaders;
}

/** A successful call returns an array of face entries ranked by face rectangle size in descending order. An empty response indicates no faces detected. */
export interface Detect200Response extends HttpResponse {
  status: "200";
  body: Array<FaceDetectionResultOutput>;
}

export interface DetectDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DetectDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DetectDefaultHeaders;
}

/** A successful call returns an array of face entries ranked by face rectangle size in descending order. An empty response indicates no faces detected. */
export interface DetectFromSessionImageId200Response extends HttpResponse {
  status: "200";
  body: Array<FaceDetectionResultOutput>;
}

export interface DetectFromSessionImageIdDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DetectFromSessionImageIdDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DetectFromSessionImageIdDefaultHeaders;
}

/** A successful call returns an array of the most similar faces represented in faceId if the input parameter is faceIds or persistedFaceId if the input parameter is faceListId or largeFaceListId. */
export interface FindSimilar200Response extends HttpResponse {
  status: "200";
  body: Array<FindSimilarResultOutput>;
}

export interface FindSimilarDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FindSimilarDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & FindSimilarDefaultHeaders;
}

/** A successful call returns an array of the most similar faces represented in faceId if the input parameter is faceIds or persistedFaceId if the input parameter is faceListId or largeFaceListId. */
export interface FindSimilarFromFaceList200Response extends HttpResponse {
  status: "200";
  body: Array<FindSimilarResultOutput>;
}

export interface FindSimilarFromFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FindSimilarFromFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & FindSimilarFromFaceListDefaultHeaders;
}

/** A successful call returns an array of the most similar faces represented in faceId if the input parameter is faceIds or persistedFaceId if the input parameter is faceListId or largeFaceListId. */
export interface FindSimilarFromLargeFaceList200Response extends HttpResponse {
  status: "200";
  body: Array<FindSimilarResultOutput>;
}

export interface FindSimilarFromLargeFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FindSimilarFromLargeFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & FindSimilarFromLargeFaceListDefaultHeaders;
}

/** A successful call returns the identified candidate person(s) for each query face. */
export interface IdentifyFromPersonGroup200Response extends HttpResponse {
  status: "200";
  body: Array<IdentificationResultOutput>;
}

export interface IdentifyFromPersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IdentifyFromPersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & IdentifyFromPersonGroupDefaultHeaders;
}

/** A successful call returns the identified candidate person(s) for each query face. */
export interface IdentifyFromLargePersonGroup200Response extends HttpResponse {
  status: "200";
  body: Array<IdentificationResultOutput>;
}

export interface IdentifyFromLargePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IdentifyFromLargePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & IdentifyFromLargePersonGroupDefaultHeaders;
}

/** A successful call returns the identified candidate person(s) for each query face. */
export interface IdentifyFromPersonDirectory200Response extends HttpResponse {
  status: "200";
  body: Array<IdentificationResultOutput>;
}

export interface IdentifyFromPersonDirectoryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IdentifyFromPersonDirectoryDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & IdentifyFromPersonDirectoryDefaultHeaders;
}

/** A successful call returns the identified candidate person(s) for each query face. */
export interface IdentifyFromDynamicPersonGroup200Response extends HttpResponse {
  status: "200";
  body: Array<IdentificationResultOutput>;
}

export interface IdentifyFromDynamicPersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface IdentifyFromDynamicPersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & IdentifyFromDynamicPersonGroupDefaultHeaders;
}

/** A successful call returns the verification result. */
export interface VerifyFaceToFace200Response extends HttpResponse {
  status: "200";
  body: VerificationResultOutput;
}

export interface VerifyFaceToFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface VerifyFaceToFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & VerifyFaceToFaceDefaultHeaders;
}

/** A successful call returns the verification result. */
export interface VerifyFromPersonGroup200Response extends HttpResponse {
  status: "200";
  body: VerificationResultOutput;
}

export interface VerifyFromPersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface VerifyFromPersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & VerifyFromPersonGroupDefaultHeaders;
}

/** A successful call returns the verification result. */
export interface VerifyFromLargePersonGroup200Response extends HttpResponse {
  status: "200";
  body: VerificationResultOutput;
}

export interface VerifyFromLargePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface VerifyFromLargePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & VerifyFromLargePersonGroupDefaultHeaders;
}

/** A successful call returns the verification result. */
export interface VerifyFromPersonDirectory200Response extends HttpResponse {
  status: "200";
  body: VerificationResultOutput;
}

export interface VerifyFromPersonDirectoryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface VerifyFromPersonDirectoryDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & VerifyFromPersonDirectoryDefaultHeaders;
}

/** A successful call returns one or more groups of similar faces (rank by group size) and a messyGroup. */
export interface Group200Response extends HttpResponse {
  status: "200";
  body: GroupingResultOutput;
}

export interface GroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GroupDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateFaceList200Response extends HttpResponse {
  status: "200";
}

export interface CreateFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreateFaceListDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteFaceList200Response extends HttpResponse {
  status: "200";
}

export interface DeleteFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteFaceListDefaultHeaders;
}

/** A successful call returns the Face List's information. */
export interface GetFaceList200Response extends HttpResponse {
  status: "200";
  body: FaceListOutput;
}

export interface GetFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetFaceListDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateFaceList200Response extends HttpResponse {
  status: "200";
}

export interface UpdateFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdateFaceListDefaultHeaders;
}

/** A successful call returns an array of Face Lists. */
export interface GetFaceLists200Response extends HttpResponse {
  status: "200";
  body: Array<FaceListItemOutput>;
}

export interface GetFaceListsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetFaceListsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetFaceListsDefaultHeaders;
}

/** A successful call returns a new persistedFaceId. */
export interface AddFaceListFaceFromUrl200Response extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface AddFaceListFaceFromUrlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddFaceListFaceFromUrlDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddFaceListFaceFromUrlDefaultHeaders;
}

/** A successful call returns a new persistedFaceId. */
export interface AddFaceListFace200Response extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface AddFaceListFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddFaceListFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddFaceListFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteFaceListFace200Response extends HttpResponse {
  status: "200";
}

export interface DeleteFaceListFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteFaceListFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteFaceListFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateLargeFaceList200Response extends HttpResponse {
  status: "200";
}

export interface CreateLargeFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateLargeFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreateLargeFaceListDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteLargeFaceList200Response extends HttpResponse {
  status: "200";
}

export interface DeleteLargeFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteLargeFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteLargeFaceListDefaultHeaders;
}

/** A successful call returns the Large Face List's information. */
export interface GetLargeFaceList200Response extends HttpResponse {
  status: "200";
  body: LargeFaceListOutput;
}

export interface GetLargeFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargeFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargeFaceListDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateLargeFaceList200Response extends HttpResponse {
  status: "200";
}

export interface UpdateLargeFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateLargeFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdateLargeFaceListDefaultHeaders;
}

/** A successful call returns an array of Large Face Lists and their information (largeFaceListId, name and userData). */
export interface GetLargeFaceLists200Response extends HttpResponse {
  status: "200";
  body: Array<LargeFaceListOutput>;
}

export interface GetLargeFaceListsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargeFaceListsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargeFaceListsDefaultHeaders;
}

/** A successful call returns the Large Face List's training status. */
export interface GetLargeFaceListTrainingStatus200Response extends HttpResponse {
  status: "200";
  body: TrainingResultOutput;
}

export interface GetLargeFaceListTrainingStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargeFaceListTrainingStatusDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargeFaceListTrainingStatusDefaultHeaders;
}

export interface TrainLargeFaceList202Headers {
  "operation-location": string;
}

/** A successful call returns an empty response body. */
export interface TrainLargeFaceList202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & TrainLargeFaceList202Headers;
}

export interface TrainLargeFaceListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TrainLargeFaceListDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & TrainLargeFaceListDefaultHeaders;
}

/** The final response for long-running trainLargeFaceList operation */
export interface TrainLargeFaceListLogicalResponse extends HttpResponse {
  status: "200";
}

/** A successful call returns a new persistedFaceId. */
export interface AddLargeFaceListFaceFromUrl200Response extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface AddLargeFaceListFaceFromUrlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddLargeFaceListFaceFromUrlDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddLargeFaceListFaceFromUrlDefaultHeaders;
}

/** A successful call returns a new persistedFaceId. */
export interface AddLargeFaceListFace200Response extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface AddLargeFaceListFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddLargeFaceListFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddLargeFaceListFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteLargeFaceListFace200Response extends HttpResponse {
  status: "200";
}

export interface DeleteLargeFaceListFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteLargeFaceListFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteLargeFaceListFaceDefaultHeaders;
}

/** A successful call returns target persisted face's information (persistedFaceId and userData). */
export interface GetLargeFaceListFace200Response extends HttpResponse {
  status: "200";
  body: LargeFaceListFaceOutput;
}

export interface GetLargeFaceListFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargeFaceListFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargeFaceListFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateLargeFaceListFace200Response extends HttpResponse {
  status: "200";
}

export interface UpdateLargeFaceListFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateLargeFaceListFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdateLargeFaceListFaceDefaultHeaders;
}

/** A successful call returns an array of persisted faces and their information (persistedFaceId and userData). */
export interface GetLargeFaceListFaces200Response extends HttpResponse {
  status: "200";
  body: Array<LargeFaceListFaceOutput>;
}

export interface GetLargeFaceListFacesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargeFaceListFacesDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargeFaceListFacesDefaultHeaders;
}

/** The request has succeeded. */
export interface CreatePersonGroup200Response extends HttpResponse {
  status: "200";
}

export interface CreatePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreatePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreatePersonGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface DeletePersonGroup200Response extends HttpResponse {
  status: "200";
}

export interface DeletePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeletePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeletePersonGroupDefaultHeaders;
}

/** A successful call returns the Person Group's information. */
export interface GetPersonGroup200Response extends HttpResponse {
  status: "200";
  body: PersonGroupOutput;
}

export interface GetPersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdatePersonGroup200Response extends HttpResponse {
  status: "200";
}

export interface UpdatePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdatePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdatePersonGroupDefaultHeaders;
}

/** A successful call returns an array of Person Groups and their information (personGroupId, name and userData). */
export interface GetPersonGroups200Response extends HttpResponse {
  status: "200";
  body: Array<PersonGroupOutput>;
}

export interface GetPersonGroupsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonGroupsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonGroupsDefaultHeaders;
}

/** A successful call returns the Person Group's training status. */
export interface GetPersonGroupTrainingStatus200Response extends HttpResponse {
  status: "200";
  body: TrainingResultOutput;
}

export interface GetPersonGroupTrainingStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonGroupTrainingStatusDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonGroupTrainingStatusDefaultHeaders;
}

export interface TrainPersonGroup202Headers {
  "operation-location": string;
}

/** A successful call returns an empty response body. */
export interface TrainPersonGroup202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & TrainPersonGroup202Headers;
}

export interface TrainPersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TrainPersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & TrainPersonGroupDefaultHeaders;
}

/** The final response for long-running trainPersonGroup operation */
export interface TrainPersonGroupLogicalResponse extends HttpResponse {
  status: "200";
}

/** A successful call returns a new personId created. */
export interface CreatePersonGroupPerson200Response extends HttpResponse {
  status: "200";
  body: CreatePersonResultOutput;
}

export interface CreatePersonGroupPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreatePersonGroupPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreatePersonGroupPersonDefaultHeaders;
}

/** The request has succeeded. */
export interface DeletePersonGroupPerson200Response extends HttpResponse {
  status: "200";
}

export interface DeletePersonGroupPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeletePersonGroupPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeletePersonGroupPersonDefaultHeaders;
}

/** A successful call returns the person's information. */
export interface GetPersonGroupPerson200Response extends HttpResponse {
  status: "200";
  body: PersonGroupPersonOutput;
}

export interface GetPersonGroupPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonGroupPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonGroupPersonDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdatePersonGroupPerson200Response extends HttpResponse {
  status: "200";
}

export interface UpdatePersonGroupPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdatePersonGroupPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdatePersonGroupPersonDefaultHeaders;
}

/** A successful call returns an array of person information that belong to the Person Group. */
export interface GetPersonGroupPersons200Response extends HttpResponse {
  status: "200";
  body: Array<PersonGroupPersonOutput>;
}

export interface GetPersonGroupPersonsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonGroupPersonsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonGroupPersonsDefaultHeaders;
}

/** A successful call returns a new persistedFaceId. */
export interface AddPersonGroupPersonFaceFromUrl200Response extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface AddPersonGroupPersonFaceFromUrlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddPersonGroupPersonFaceFromUrlDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddPersonGroupPersonFaceFromUrlDefaultHeaders;
}

/** A successful call returns a new persistedFaceId. */
export interface AddPersonGroupPersonFace200Response extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface AddPersonGroupPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddPersonGroupPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddPersonGroupPersonFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface DeletePersonGroupPersonFace200Response extends HttpResponse {
  status: "200";
}

export interface DeletePersonGroupPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeletePersonGroupPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeletePersonGroupPersonFaceDefaultHeaders;
}

/** A successful call returns target persisted face's information (persistedFaceId and userData). */
export interface GetPersonGroupPersonFace200Response extends HttpResponse {
  status: "200";
  body: PersonGroupPersonFaceOutput;
}

export interface GetPersonGroupPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonGroupPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonGroupPersonFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdatePersonGroupPersonFace200Response extends HttpResponse {
  status: "200";
}

export interface UpdatePersonGroupPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdatePersonGroupPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdatePersonGroupPersonFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateLargePersonGroup200Response extends HttpResponse {
  status: "200";
}

export interface CreateLargePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateLargePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreateLargePersonGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteLargePersonGroup200Response extends HttpResponse {
  status: "200";
}

export interface DeleteLargePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteLargePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteLargePersonGroupDefaultHeaders;
}

/** A successful call returns the Large Person Group's information. */
export interface GetLargePersonGroup200Response extends HttpResponse {
  status: "200";
  body: LargePersonGroupOutput;
}

export interface GetLargePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargePersonGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateLargePersonGroup200Response extends HttpResponse {
  status: "200";
}

export interface UpdateLargePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateLargePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdateLargePersonGroupDefaultHeaders;
}

/** A successful call returns an array of Large Person Groups and their information (largePersonGroupId, name and userData). */
export interface GetLargePersonGroups200Response extends HttpResponse {
  status: "200";
  body: Array<LargePersonGroupOutput>;
}

export interface GetLargePersonGroupsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargePersonGroupsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargePersonGroupsDefaultHeaders;
}

/** A successful call returns the Large Person Group's training status. */
export interface GetLargePersonGroupTrainingStatus200Response extends HttpResponse {
  status: "200";
  body: TrainingResultOutput;
}

export interface GetLargePersonGroupTrainingStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargePersonGroupTrainingStatusDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargePersonGroupTrainingStatusDefaultHeaders;
}

export interface TrainLargePersonGroup202Headers {
  "operation-location": string;
}

/** A successful call returns an empty response body. */
export interface TrainLargePersonGroup202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & TrainLargePersonGroup202Headers;
}

export interface TrainLargePersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TrainLargePersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & TrainLargePersonGroupDefaultHeaders;
}

/** The final response for long-running trainLargePersonGroup operation */
export interface TrainLargePersonGroupLogicalResponse extends HttpResponse {
  status: "200";
}

/** A successful call returns a new personId created. */
export interface CreateLargePersonGroupPerson200Response extends HttpResponse {
  status: "200";
  body: CreatePersonResultOutput;
}

export interface CreateLargePersonGroupPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateLargePersonGroupPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreateLargePersonGroupPersonDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteLargePersonGroupPerson200Response extends HttpResponse {
  status: "200";
}

export interface DeleteLargePersonGroupPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteLargePersonGroupPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteLargePersonGroupPersonDefaultHeaders;
}

/** A successful call returns the person's information. */
export interface GetLargePersonGroupPerson200Response extends HttpResponse {
  status: "200";
  body: LargePersonGroupPersonOutput;
}

export interface GetLargePersonGroupPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargePersonGroupPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargePersonGroupPersonDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateLargePersonGroupPerson200Response extends HttpResponse {
  status: "200";
}

export interface UpdateLargePersonGroupPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateLargePersonGroupPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdateLargePersonGroupPersonDefaultHeaders;
}

/** A successful call returns an array of person information that belong to the Large Person Group. */
export interface GetLargePersonGroupPersons200Response extends HttpResponse {
  status: "200";
  body: Array<LargePersonGroupPersonOutput>;
}

export interface GetLargePersonGroupPersonsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargePersonGroupPersonsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargePersonGroupPersonsDefaultHeaders;
}

/** A successful call returns a new persistedFaceId. */
export interface AddLargePersonGroupPersonFaceFromUrl200Response extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface AddLargePersonGroupPersonFaceFromUrlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddLargePersonGroupPersonFaceFromUrlDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddLargePersonGroupPersonFaceFromUrlDefaultHeaders;
}

/** A successful call returns a new persistedFaceId. */
export interface AddLargePersonGroupPersonFace200Response extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface AddLargePersonGroupPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddLargePersonGroupPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddLargePersonGroupPersonFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteLargePersonGroupPersonFace200Response extends HttpResponse {
  status: "200";
}

export interface DeleteLargePersonGroupPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteLargePersonGroupPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteLargePersonGroupPersonFaceDefaultHeaders;
}

/** A successful call returns target persisted face's information (persistedFaceId and userData). */
export interface GetLargePersonGroupPersonFace200Response extends HttpResponse {
  status: "200";
  body: LargePersonGroupPersonFaceOutput;
}

export interface GetLargePersonGroupPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLargePersonGroupPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLargePersonGroupPersonFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateLargePersonGroupPersonFace200Response extends HttpResponse {
  status: "200";
}

export interface UpdateLargePersonGroupPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateLargePersonGroupPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdateLargePersonGroupPersonFaceDefaultHeaders;
}

/** A successful call create a session for a client device and provide an authorization token for use by the client application for a limited purpose and time. */
export interface CreateLivenessSession200Response extends HttpResponse {
  status: "200";
  body: CreateLivenessSessionResultOutput;
}

export interface CreateLivenessSessionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateLivenessSessionDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreateLivenessSessionDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteLivenessSession200Response extends HttpResponse {
  status: "200";
}

export interface DeleteLivenessSessionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteLivenessSessionDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteLivenessSessionDefaultHeaders;
}

/** The request has succeeded. */
export interface GetLivenessSessionResult200Response extends HttpResponse {
  status: "200";
  body: LivenessSessionOutput;
}

export interface GetLivenessSessionResultDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLivenessSessionResultDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLivenessSessionResultDefaultHeaders;
}

/** The request has succeeded. */
export interface GetLivenessSessions200Response extends HttpResponse {
  status: "200";
  body: Array<LivenessSessionItemOutput>;
}

export interface GetLivenessSessionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLivenessSessionsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLivenessSessionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetLivenessSessionAuditEntries200Response extends HttpResponse {
  status: "200";
  body: Array<LivenessSessionAuditEntryOutput>;
}

export interface GetLivenessSessionAuditEntriesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLivenessSessionAuditEntriesDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLivenessSessionAuditEntriesDefaultHeaders;
}

/** A successful call create a session for a client device and provide an authorization token for use by the client application for a limited purpose and time. */
export interface CreateLivenessWithVerifySessionWithVerifyImage200Response extends HttpResponse {
  status: "200";
  body: CreateLivenessWithVerifySessionResultOutput;
}

export interface CreateLivenessWithVerifySessionWithVerifyImageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateLivenessWithVerifySessionWithVerifyImageDefaultResponse
  extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreateLivenessWithVerifySessionWithVerifyImageDefaultHeaders;
}

/** A successful call create a session for a client device and provide an authorization token for use by the client application for a limited purpose and time. */
export interface CreateLivenessWithVerifySession200Response extends HttpResponse {
  status: "200";
  body: CreateLivenessWithVerifySessionResultOutput;
}

export interface CreateLivenessWithVerifySessionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateLivenessWithVerifySessionDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreateLivenessWithVerifySessionDefaultHeaders;
}

/** The request has succeeded. */
export interface DeleteLivenessWithVerifySession200Response extends HttpResponse {
  status: "200";
}

export interface DeleteLivenessWithVerifySessionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteLivenessWithVerifySessionDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteLivenessWithVerifySessionDefaultHeaders;
}

/** The request has succeeded. */
export interface GetLivenessWithVerifySessionResult200Response extends HttpResponse {
  status: "200";
  body: LivenessWithVerifySessionOutput;
}

export interface GetLivenessWithVerifySessionResultDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLivenessWithVerifySessionResultDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLivenessWithVerifySessionResultDefaultHeaders;
}

/** The request has succeeded. */
export interface GetLivenessWithVerifySessions200Response extends HttpResponse {
  status: "200";
  body: Array<LivenessSessionItemOutput>;
}

export interface GetLivenessWithVerifySessionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLivenessWithVerifySessionsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLivenessWithVerifySessionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetLivenessWithVerifySessionAuditEntries200Response extends HttpResponse {
  status: "200";
  body: Array<LivenessSessionAuditEntryOutput>;
}

export interface GetLivenessWithVerifySessionAuditEntriesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetLivenessWithVerifySessionAuditEntriesDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetLivenessWithVerifySessionAuditEntriesDefaultHeaders;
}

export interface GetSessionImage200Headers {
  /** The format of the HTTP payload. */
  "content-type": "application/octet-stream";
}

/** The request has succeeded. */
export interface GetSessionImage200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetSessionImage200Headers;
}

export interface GetSessionImageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSessionImageDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetSessionImageDefaultHeaders;
}

export interface CreatePerson202Headers {
  "operation-location": string;
  location: string;
}

/** A successful call returns an empty response body. The service has accepted the request and will start processing soon. The client can query the operation status and result using the URL specified in the 'Operation-Location' response header. The URL expires in 48 hours. */
export interface CreatePerson202Response extends HttpResponse {
  status: "202";
  body: CreatePersonResultOutput;
  headers: RawHttpHeaders & CreatePerson202Headers;
}

export interface CreatePersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreatePersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreatePersonDefaultHeaders;
}

/** The final response for long-running createPerson operation */
export interface CreatePersonLogicalResponse extends HttpResponse {
  status: "200";
  body: CreatePersonResultOutput;
}

export interface DeletePerson202Headers {
  "operation-location": string;
}

/** A successful call returns an empty response body. The service has accepted the request and will start processing soon. The client can query the operation status and result using the URL specified in the 'Operation-Location' response header. The URL expires in 48 hours. */
export interface DeletePerson202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeletePerson202Headers;
}

export interface DeletePersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeletePersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeletePersonDefaultHeaders;
}

/** The final response for long-running deletePerson operation */
export interface DeletePersonLogicalResponse extends HttpResponse {
  status: "200";
}

/** A successful call returns the person's information. */
export interface GetPerson200Response extends HttpResponse {
  status: "200";
  body: PersonDirectoryPersonOutput;
}

export interface GetPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdatePerson200Response extends HttpResponse {
  status: "200";
}

export interface UpdatePersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdatePersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdatePersonDefaultHeaders;
}

/** A successful call returns an array of Person Directory Persons contained in the Dynamic Person Group. */
export interface GetPersons200Response extends HttpResponse {
  status: "200";
  body: Array<PersonDirectoryPersonOutput>;
}

export interface GetPersonsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonsDefaultHeaders;
}

/** A successful call returns an array of dynamicPersonGroups information that reference the provided personId. */
export interface GetDynamicPersonGroupReferences200Response extends HttpResponse {
  status: "200";
  body: ListGroupReferenceResultOutput;
}

export interface GetDynamicPersonGroupReferencesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDynamicPersonGroupReferencesDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetDynamicPersonGroupReferencesDefaultHeaders;
}

export interface AddPersonFace202Headers {
  "operation-location": string;
  location: string;
}

/** A successful call returns an empty response body. The service has accepted the request and will start processing soon. The client can query the operation status and result using the URL specified in the 'Operation-Location' response header. The URL expires in 48 hours. */
export interface AddPersonFace202Response extends HttpResponse {
  status: "202";
  body: AddFaceResultOutput;
  headers: RawHttpHeaders & AddPersonFace202Headers;
}

export interface AddPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddPersonFaceDefaultHeaders;
}

/** The final response for long-running addPersonFace operation */
export interface AddPersonFaceLogicalResponse extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface AddPersonFaceFromUrl202Headers {
  "operation-location": string;
  location: string;
}

/** A successful call returns an empty response body. The service has accepted the request and will start processing soon. The client can query the operation status and result using the URL specified in the 'Operation-Location' response header. The URL expires in 48 hours. */
export interface AddPersonFaceFromUrl202Response extends HttpResponse {
  status: "202";
  body: AddFaceResultOutput;
  headers: RawHttpHeaders & AddPersonFaceFromUrl202Headers;
}

export interface AddPersonFaceFromUrlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddPersonFaceFromUrlDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & AddPersonFaceFromUrlDefaultHeaders;
}

/** The final response for long-running addPersonFaceFromUrl operation */
export interface AddPersonFaceFromUrlLogicalResponse extends HttpResponse {
  status: "200";
  body: AddFaceResultOutput;
}

export interface DeletePersonFace202Headers {
  "operation-location": string;
}

/** A successful call returns an empty response body. The service has accepted the request and will start processing soon. The client can query the operation status and result using the URL specified in the 'Operation-Location' response header. The URL expires in 48 hours. */
export interface DeletePersonFace202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeletePersonFace202Headers;
}

export interface DeletePersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeletePersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeletePersonFaceDefaultHeaders;
}

/** The final response for long-running deletePersonFace operation */
export interface DeletePersonFaceLogicalResponse extends HttpResponse {
  status: "200";
}

/** A successful call returns target persisted face's information (persistedFaceId and userData). */
export interface GetPersonFace200Response extends HttpResponse {
  status: "200";
  body: PersonDirectoryFaceOutput;
}

export interface GetPersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonFaceDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdatePersonFace200Response extends HttpResponse {
  status: "200";
}

export interface UpdatePersonFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdatePersonFaceDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdatePersonFaceDefaultHeaders;
}

/** A successful call returns an array of persistedFaceIds and and a person ID. */
export interface GetPersonFaces200Response extends HttpResponse {
  status: "200";
  body: ListFaceResultOutput;
}

export interface GetPersonFacesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPersonFacesDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetPersonFacesDefaultHeaders;
}

export interface CreateDynamicPersonGroupWithPerson202Headers {
  "operation-location": string;
}

/** A successful call returns an empty response body. The service has accepted the request and will start processing soon. The client can query the operation status and result using the URL specified in the 'Operation-Location' response header. The URL expires in 48 hours. The URL provides the status of when Person Directory "Get Dynamic Person Group References" will return the changes made in this request. */
export interface CreateDynamicPersonGroupWithPerson202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & CreateDynamicPersonGroupWithPerson202Headers;
}

export interface CreateDynamicPersonGroupWithPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateDynamicPersonGroupWithPersonDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreateDynamicPersonGroupWithPersonDefaultHeaders;
}

/** The final response for long-running createDynamicPersonGroupWithPerson operation */
export interface CreateDynamicPersonGroupWithPersonLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface CreateDynamicPersonGroup200Response extends HttpResponse {
  status: "200";
}

export interface CreateDynamicPersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateDynamicPersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & CreateDynamicPersonGroupDefaultHeaders;
}

export interface DeleteDynamicPersonGroup202Headers {
  "operation-location": string;
}

/** A successful call returns an empty response body. The service has accepted the request and will start processing soon. The client can query the operation status and result using the URL specified in the 'Operation-Location' response header. The URL expires in 48 hours. The URL provides the status of when Person Directory "Get Dynamic Person Group References" will return the changes made in this request. */
export interface DeleteDynamicPersonGroup202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeleteDynamicPersonGroup202Headers;
}

export interface DeleteDynamicPersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteDynamicPersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & DeleteDynamicPersonGroupDefaultHeaders;
}

/** The final response for long-running deleteDynamicPersonGroup operation */
export interface DeleteDynamicPersonGroupLogicalResponse extends HttpResponse {
  status: "200";
}

/** A successful call returns the Dynamic Person Group's information. */
export interface GetDynamicPersonGroup200Response extends HttpResponse {
  status: "200";
  body: DynamicPersonGroupOutput;
}

export interface GetDynamicPersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDynamicPersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetDynamicPersonGroupDefaultHeaders;
}

export interface UpdateDynamicPersonGroupWithPersonChanges202Headers {
  "operation-location": string;
}

/** A successful call returns an empty response body. The service has accepted the request and will start processing soon. The client can query the operation status and result using the URL specified in the 'Operation-Location' response header. The URL expires in 48 hours. The URL provides the status of when Person Directory "Get Dynamic Person Group References" will return the changes made in this request. */
export interface UpdateDynamicPersonGroupWithPersonChanges202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & UpdateDynamicPersonGroupWithPersonChanges202Headers;
}

export interface UpdateDynamicPersonGroupWithPersonChangesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateDynamicPersonGroupWithPersonChangesDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdateDynamicPersonGroupWithPersonChangesDefaultHeaders;
}

/** The final response for long-running updateDynamicPersonGroupWithPersonChanges operation */
export interface UpdateDynamicPersonGroupWithPersonChangesLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface UpdateDynamicPersonGroup200Response extends HttpResponse {
  status: "200";
}

export interface UpdateDynamicPersonGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateDynamicPersonGroupDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & UpdateDynamicPersonGroupDefaultHeaders;
}

/** A successful call returns an array of Dynamic Person Groups and their information (dynamicPersonGroupId, name and userData). */
export interface GetDynamicPersonGroups200Response extends HttpResponse {
  status: "200";
  body: Array<DynamicPersonGroupOutput>;
}

export interface GetDynamicPersonGroupsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDynamicPersonGroupsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetDynamicPersonGroupsDefaultHeaders;
}

/** A successful call returns an array of person information in the Person Directory. */
export interface GetDynamicPersonGroupPersons200Response extends HttpResponse {
  status: "200";
  body: ListPersonResultOutput;
}

export interface GetDynamicPersonGroupPersonsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDynamicPersonGroupPersonsDefaultResponse extends HttpResponse {
  status: string;
  body: FaceErrorResponseOutput;
  headers: RawHttpHeaders & GetDynamicPersonGroupPersonsDefaultHeaders;
}
