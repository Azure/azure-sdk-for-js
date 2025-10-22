// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ContentAnalyzersGetOperationStatusParameters,
  ContentAnalyzersCreateOrReplaceParameters,
  ContentAnalyzersUpdateParameters,
  ContentAnalyzersGetParameters,
  ContentAnalyzersDeleteParameters,
  ContentAnalyzersListParameters,
  ContentAnalyzersAnalyzeParameters,
  ContentAnalyzersAnalyzeBinaryParameters,
  ContentAnalyzersGetResultParameters,
  PersonDirectoriesCreateParameters,
  PersonDirectoriesUpdateParameters,
  PersonDirectoriesGetParameters,
  PersonDirectoriesDeleteParameters,
  PersonDirectoriesListParameters,
  PersonDirectoriesUpdatePersonParameters,
  PersonDirectoriesGetPersonParameters,
  PersonDirectoriesDeletePersonParameters,
  PersonDirectoriesListPersonsParameters,
  PersonDirectoriesAddFaceParameters,
  PersonDirectoriesListFacesParameters,
  PersonDirectoriesUpdateFaceParameters,
  PersonDirectoriesGetFaceParameters,
  PersonDirectoriesDeleteFaceParameters,
  PersonDirectoriesIdentifyPersonParameters,
  PersonDirectoriesFindSimilarFacesParameters,
  PersonDirectoriesVerifyPersonParameters,
  FacesDetectParameters,
  FacesCompareParameters,
  ContentClassifiersGetOperationStatusParameters,
  ContentClassifiersCreateOrReplaceParameters,
  ContentClassifiersUpdateParameters,
  ContentClassifiersGetParameters,
  ContentClassifiersDeleteParameters,
  ContentClassifiersListParameters,
  ContentClassifiersClassifyParameters,
  ContentClassifiersClassifyBinaryParameters,
  ContentClassifiersGetResultParameters,
} from "./parameters.js";
import type {
  ContentAnalyzersGetOperationStatus200Response,
  ContentAnalyzersGetOperationStatusDefaultResponse,
  ContentAnalyzersCreateOrReplace200Response,
  ContentAnalyzersCreateOrReplace201Response,
  ContentAnalyzersCreateOrReplaceDefaultResponse,
  ContentAnalyzersUpdate200Response,
  ContentAnalyzersUpdateDefaultResponse,
  ContentAnalyzersGet200Response,
  ContentAnalyzersGetDefaultResponse,
  ContentAnalyzersDelete204Response,
  ContentAnalyzersDeleteDefaultResponse,
  ContentAnalyzersList200Response,
  ContentAnalyzersListDefaultResponse,
  ContentAnalyzersAnalyze202Response,
  ContentAnalyzersAnalyzeDefaultResponse,
  ContentAnalyzersAnalyzeBinary202Response,
  ContentAnalyzersAnalyzeBinaryDefaultResponse,
  ContentAnalyzersGetResult200Response,
  ContentAnalyzersGetResultDefaultResponse,
  PersonDirectoriesCreate201Response,
  PersonDirectoriesCreateDefaultResponse,
  PersonDirectoriesUpdate200Response,
  PersonDirectoriesUpdateDefaultResponse,
  PersonDirectoriesGet200Response,
  PersonDirectoriesGetDefaultResponse,
  PersonDirectoriesDelete204Response,
  PersonDirectoriesDeleteDefaultResponse,
  PersonDirectoriesList200Response,
  PersonDirectoriesListDefaultResponse,
  PersonDirectoriesUpdatePerson200Response,
  PersonDirectoriesUpdatePersonDefaultResponse,
  PersonDirectoriesGetPerson200Response,
  PersonDirectoriesGetPersonDefaultResponse,
  PersonDirectoriesDeletePerson204Response,
  PersonDirectoriesDeletePersonDefaultResponse,
  PersonDirectoriesListPersons200Response,
  PersonDirectoriesListPersonsDefaultResponse,
  PersonDirectoriesAddFace201Response,
  PersonDirectoriesAddFaceDefaultResponse,
  PersonDirectoriesListFaces200Response,
  PersonDirectoriesListFacesDefaultResponse,
  PersonDirectoriesUpdateFace200Response,
  PersonDirectoriesUpdateFaceDefaultResponse,
  PersonDirectoriesGetFace200Response,
  PersonDirectoriesGetFaceDefaultResponse,
  PersonDirectoriesDeleteFace204Response,
  PersonDirectoriesDeleteFaceDefaultResponse,
  PersonDirectoriesIdentifyPerson200Response,
  PersonDirectoriesIdentifyPersonDefaultResponse,
  PersonDirectoriesFindSimilarFaces200Response,
  PersonDirectoriesFindSimilarFacesDefaultResponse,
  PersonDirectoriesVerifyPerson200Response,
  PersonDirectoriesVerifyPersonDefaultResponse,
  FacesDetect200Response,
  FacesDetectDefaultResponse,
  FacesCompare200Response,
  FacesCompareDefaultResponse,
  ContentClassifiersGetOperationStatus200Response,
  ContentClassifiersGetOperationStatusDefaultResponse,
  ContentClassifiersCreateOrReplace200Response,
  ContentClassifiersCreateOrReplace201Response,
  ContentClassifiersCreateOrReplaceDefaultResponse,
  ContentClassifiersUpdate200Response,
  ContentClassifiersUpdateDefaultResponse,
  ContentClassifiersGet200Response,
  ContentClassifiersGetDefaultResponse,
  ContentClassifiersDelete204Response,
  ContentClassifiersDeleteDefaultResponse,
  ContentClassifiersList200Response,
  ContentClassifiersListDefaultResponse,
  ContentClassifiersClassify202Response,
  ContentClassifiersClassifyDefaultResponse,
  ContentClassifiersClassifyBinary202Response,
  ContentClassifiersClassifyBinaryDefaultResponse,
  ContentClassifiersGetResult200Response,
  ContentClassifiersGetResultDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ContentAnalyzersGetOperationStatus {
  /** Get the status of an analyzer creation operation. */
  get(
    options?: ContentAnalyzersGetOperationStatusParameters,
  ): StreamableMethod<
    | ContentAnalyzersGetOperationStatus200Response
    | ContentAnalyzersGetOperationStatusDefaultResponse
  >;
}

export interface ContentAnalyzersCreateOrReplace {
  /** Create a new analyzer asynchronously. */
  put(
    options: ContentAnalyzersCreateOrReplaceParameters,
  ): StreamableMethod<
    | ContentAnalyzersCreateOrReplace200Response
    | ContentAnalyzersCreateOrReplace201Response
    | ContentAnalyzersCreateOrReplaceDefaultResponse
  >;
  /** Update analyzer properties. */
  patch(
    options: ContentAnalyzersUpdateParameters,
  ): StreamableMethod<
    ContentAnalyzersUpdate200Response | ContentAnalyzersUpdateDefaultResponse
  >;
  /** Get analyzer properties. */
  get(
    options?: ContentAnalyzersGetParameters,
  ): StreamableMethod<
    ContentAnalyzersGet200Response | ContentAnalyzersGetDefaultResponse
  >;
  /** Delete analyzer. */
  delete(
    options?: ContentAnalyzersDeleteParameters,
  ): StreamableMethod<
    ContentAnalyzersDelete204Response | ContentAnalyzersDeleteDefaultResponse
  >;
}

export interface ContentAnalyzersList {
  /** List analyzers. */
  get(
    options?: ContentAnalyzersListParameters,
  ): StreamableMethod<
    ContentAnalyzersList200Response | ContentAnalyzersListDefaultResponse
  >;
}

export interface ContentAnalyzersAnalyze {
  /** Extract content and fields from input. */
  post(
    options: ContentAnalyzersAnalyzeParameters,
  ): StreamableMethod<
    ContentAnalyzersAnalyze202Response | ContentAnalyzersAnalyzeDefaultResponse
  >;
  /** Extract content and fields from input. */
  post(
    options: ContentAnalyzersAnalyzeBinaryParameters,
  ): StreamableMethod<
    | ContentAnalyzersAnalyzeBinary202Response
    | ContentAnalyzersAnalyzeBinaryDefaultResponse
  >;
}

export interface ContentAnalyzersGetResult {
  /** Get the result of an analysis operation. */
  get(
    options?: ContentAnalyzersGetResultParameters,
  ): StreamableMethod<
    | ContentAnalyzersGetResult200Response
    | ContentAnalyzersGetResultDefaultResponse
  >;
}

export interface PersonDirectoriesCreate {
  /** Create a new person directory. */
  put(
    options: PersonDirectoriesCreateParameters,
  ): StreamableMethod<
    PersonDirectoriesCreate201Response | PersonDirectoriesCreateDefaultResponse
  >;
  /** Update person directory properties. */
  patch(
    options: PersonDirectoriesUpdateParameters,
  ): StreamableMethod<
    PersonDirectoriesUpdate200Response | PersonDirectoriesUpdateDefaultResponse
  >;
  /** Get person directory properties. */
  get(
    options?: PersonDirectoriesGetParameters,
  ): StreamableMethod<
    PersonDirectoriesGet200Response | PersonDirectoriesGetDefaultResponse
  >;
  /** Delete person directory and all associated persons and faces. */
  delete(
    options?: PersonDirectoriesDeleteParameters,
  ): StreamableMethod<
    PersonDirectoriesDelete204Response | PersonDirectoriesDeleteDefaultResponse
  >;
}

export interface PersonDirectoriesList {
  /** List person directories. */
  get(
    options?: PersonDirectoriesListParameters,
  ): StreamableMethod<
    PersonDirectoriesList200Response | PersonDirectoriesListDefaultResponse
  >;
}

export interface PersonDirectoriesUpdatePerson {
  /** Update person properties. */
  patch(
    options: PersonDirectoriesUpdatePersonParameters,
  ): StreamableMethod<
    | PersonDirectoriesUpdatePerson200Response
    | PersonDirectoriesUpdatePersonDefaultResponse
  >;
  /** Get person properties. */
  get(
    options?: PersonDirectoriesGetPersonParameters,
  ): StreamableMethod<
    | PersonDirectoriesGetPerson200Response
    | PersonDirectoriesGetPersonDefaultResponse
  >;
  /** Delete person.  Any linked faces will be disassociated, but not deleted. */
  delete(
    options?: PersonDirectoriesDeletePersonParameters,
  ): StreamableMethod<
    | PersonDirectoriesDeletePerson204Response
    | PersonDirectoriesDeletePersonDefaultResponse
  >;
}

export interface PersonDirectoriesListPersons {
  /** List persons. */
  get(
    options?: PersonDirectoriesListPersonsParameters,
  ): StreamableMethod<
    | PersonDirectoriesListPersons200Response
    | PersonDirectoriesListPersonsDefaultResponse
  >;
}

export interface PersonDirectoriesAddFace {
  /** Add a new face. */
  post(
    options: PersonDirectoriesAddFaceParameters,
  ): StreamableMethod<
    | PersonDirectoriesAddFace201Response
    | PersonDirectoriesAddFaceDefaultResponse
  >;
  /** List faces. */
  get(
    options?: PersonDirectoriesListFacesParameters,
  ): StreamableMethod<
    | PersonDirectoriesListFaces200Response
    | PersonDirectoriesListFacesDefaultResponse
  >;
}

export interface PersonDirectoriesUpdateFace {
  /** Update face properties, such as modifying the association with a person. */
  patch(
    options: PersonDirectoriesUpdateFaceParameters,
  ): StreamableMethod<
    | PersonDirectoriesUpdateFace200Response
    | PersonDirectoriesUpdateFaceDefaultResponse
  >;
  /** Get face properties. */
  get(
    options?: PersonDirectoriesGetFaceParameters,
  ): StreamableMethod<
    | PersonDirectoriesGetFace200Response
    | PersonDirectoriesGetFaceDefaultResponse
  >;
  /** Delete face.  Any linked person will be disassociated, but not deleted. */
  delete(
    options?: PersonDirectoriesDeleteFaceParameters,
  ): StreamableMethod<
    | PersonDirectoriesDeleteFace204Response
    | PersonDirectoriesDeleteFaceDefaultResponse
  >;
}

export interface PersonDirectoriesIdentifyPerson {
  /** Identify the person from a face. */
  post(
    options: PersonDirectoriesIdentifyPersonParameters,
  ): StreamableMethod<
    | PersonDirectoriesIdentifyPerson200Response
    | PersonDirectoriesIdentifyPersonDefaultResponse
  >;
}

export interface PersonDirectoriesFindSimilarFaces {
  /** Find similar faces. */
  post(
    options: PersonDirectoriesFindSimilarFacesParameters,
  ): StreamableMethod<
    | PersonDirectoriesFindSimilarFaces200Response
    | PersonDirectoriesFindSimilarFacesDefaultResponse
  >;
}

export interface PersonDirectoriesVerifyPerson {
  /** Verify if a face matches the person. */
  post(
    options: PersonDirectoriesVerifyPersonParameters,
  ): StreamableMethod<
    | PersonDirectoriesVerifyPerson200Response
    | PersonDirectoriesVerifyPersonDefaultResponse
  >;
}

export interface FacesDetect {
  /** Detect faces in an image. */
  post(
    options: FacesDetectParameters,
  ): StreamableMethod<FacesDetect200Response | FacesDetectDefaultResponse>;
}

export interface FacesCompare {
  /** Compare the similarity between two faces. */
  post(
    options: FacesCompareParameters,
  ): StreamableMethod<FacesCompare200Response | FacesCompareDefaultResponse>;
}

export interface ContentClassifiersGetOperationStatus {
  /** Get the status of a classifier creation operation. */
  get(
    options?: ContentClassifiersGetOperationStatusParameters,
  ): StreamableMethod<
    | ContentClassifiersGetOperationStatus200Response
    | ContentClassifiersGetOperationStatusDefaultResponse
  >;
}

export interface ContentClassifiersCreateOrReplace {
  /** Create a new classifier asynchronously. */
  put(
    options: ContentClassifiersCreateOrReplaceParameters,
  ): StreamableMethod<
    | ContentClassifiersCreateOrReplace200Response
    | ContentClassifiersCreateOrReplace201Response
    | ContentClassifiersCreateOrReplaceDefaultResponse
  >;
  /** Update classifier properties. */
  patch(
    options: ContentClassifiersUpdateParameters,
  ): StreamableMethod<
    | ContentClassifiersUpdate200Response
    | ContentClassifiersUpdateDefaultResponse
  >;
  /** Get classifier properties. */
  get(
    options?: ContentClassifiersGetParameters,
  ): StreamableMethod<
    ContentClassifiersGet200Response | ContentClassifiersGetDefaultResponse
  >;
  /** Delete classifier. */
  delete(
    options?: ContentClassifiersDeleteParameters,
  ): StreamableMethod<
    | ContentClassifiersDelete204Response
    | ContentClassifiersDeleteDefaultResponse
  >;
}

export interface ContentClassifiersList {
  /** List classifiers. */
  get(
    options?: ContentClassifiersListParameters,
  ): StreamableMethod<
    ContentClassifiersList200Response | ContentClassifiersListDefaultResponse
  >;
}

export interface ContentClassifiersClassify {
  /** Classify content with optional splitting. */
  post(
    options: ContentClassifiersClassifyParameters,
  ): StreamableMethod<
    | ContentClassifiersClassify202Response
    | ContentClassifiersClassifyDefaultResponse
  >;
  /** Classify content with optional splitting. */
  post(
    options: ContentClassifiersClassifyBinaryParameters,
  ): StreamableMethod<
    | ContentClassifiersClassifyBinary202Response
    | ContentClassifiersClassifyBinaryDefaultResponse
  >;
}

export interface ContentClassifiersGetResult {
  /** Get the result of a classifier operation. */
  get(
    options?: ContentClassifiersGetResultParameters,
  ): StreamableMethod<
    | ContentClassifiersGetResult200Response
    | ContentClassifiersGetResultDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/analyzers/\{analyzerId\}/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/analyzers/{analyzerId}/operations/{operationId}",
    analyzerId: string,
    operationId: string,
  ): ContentAnalyzersGetOperationStatus;
  /** Resource for '/analyzers/\{analyzerId\}' has methods for the following verbs: put, patch, get, delete */
  (
    path: "/analyzers/{analyzerId}",
    analyzerId: string,
  ): ContentAnalyzersCreateOrReplace;
  /** Resource for '/analyzers' has methods for the following verbs: get */
  (path: "/analyzers"): ContentAnalyzersList;
  /** Resource for '/analyzers/\{analyzerId\}:analyze' has methods for the following verbs: post */
  (
    path: "/analyzers/{analyzerId}:analyze",
    analyzerId: string,
  ): ContentAnalyzersAnalyze;
  /** Resource for '/analyzerResults/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/analyzerResults/{operationId}",
    operationId: string,
  ): ContentAnalyzersGetResult;
  /** Resource for '/personDirectories/\{personDirectoryId\}' has methods for the following verbs: put, patch, get, delete */
  (
    path: "/personDirectories/{personDirectoryId}",
    personDirectoryId: string,
  ): PersonDirectoriesCreate;
  /** Resource for '/personDirectories' has methods for the following verbs: get */
  (path: "/personDirectories"): PersonDirectoriesList;
  /** Resource for '/personDirectories/\{personDirectoryId\}/persons/\{personId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/personDirectories/{personDirectoryId}/persons/{personId}",
    personDirectoryId: string,
    personId: string,
  ): PersonDirectoriesUpdatePerson;
  /** Resource for '/personDirectories/\{personDirectoryId\}/persons' has methods for the following verbs: get */
  (
    path: "/personDirectories/{personDirectoryId}/persons",
    personDirectoryId: string,
  ): PersonDirectoriesListPersons;
  /** Resource for '/personDirectories/\{personDirectoryId\}/faces' has methods for the following verbs: post, get */
  (
    path: "/personDirectories/{personDirectoryId}/faces",
    personDirectoryId: string,
  ): PersonDirectoriesAddFace;
  /** Resource for '/personDirectories/\{personDirectoryId\}/faces/\{faceId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/personDirectories/{personDirectoryId}/faces/{faceId}",
    personDirectoryId: string,
    faceId: string,
  ): PersonDirectoriesUpdateFace;
  /** Resource for '/personDirectories/\{personDirectoryId\}/persons:identify' has methods for the following verbs: post */
  (
    path: "/personDirectories/{personDirectoryId}/persons:identify",
    personDirectoryId: string,
  ): PersonDirectoriesIdentifyPerson;
  /** Resource for '/personDirectories/\{personDirectoryId\}/faces:find' has methods for the following verbs: post */
  (
    path: "/personDirectories/{personDirectoryId}/faces:find",
    personDirectoryId: string,
  ): PersonDirectoriesFindSimilarFaces;
  /** Resource for '/personDirectories/\{personDirectoryId\}/persons/\{personId\}:verify' has methods for the following verbs: post */
  (
    path: "/personDirectories/{personDirectoryId}/persons/{personId}:verify",
    personDirectoryId: string,
    personId: string,
  ): PersonDirectoriesVerifyPerson;
  /** Resource for '/faces:detect' has methods for the following verbs: post */
  (path: "/faces:detect"): FacesDetect;
  /** Resource for '/faces:compare' has methods for the following verbs: post */
  (path: "/faces:compare"): FacesCompare;
  /** Resource for '/classifiers/\{classifierId\}/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/classifiers/{classifierId}/operations/{operationId}",
    classifierId: string,
    operationId: string,
  ): ContentClassifiersGetOperationStatus;
  /** Resource for '/classifiers/\{classifierId\}' has methods for the following verbs: put, patch, get, delete */
  (
    path: "/classifiers/{classifierId}",
    classifierId: string,
  ): ContentClassifiersCreateOrReplace;
  /** Resource for '/classifiers' has methods for the following verbs: get */
  (path: "/classifiers"): ContentClassifiersList;
  /** Resource for '/classifiers/\{classifierId\}:classify' has methods for the following verbs: post */
  (
    path: "/classifiers/{classifierId}:classify",
    classifierId: string,
  ): ContentClassifiersClassify;
  /** Resource for '/classifierResults/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/classifierResults/{operationId}",
    operationId: string,
  ): ContentClassifiersGetResult;
}

export type ContentUnderstandingClient = Client & {
  path: Routes;
};
