// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  ResourceOperationStatusContentAnalyzerContentAnalyzerErrorOutput,
  ContentAnalyzerOutput,
  PagedContentAnalyzerOutput,
  ResourceOperationStatusContentAnalyzerAnalyzeResultErrorOutput,
  OperationStatusAnalyzeResultErrorOutput,
  PersonDirectoryOutput,
  PagedPersonDirectoryOutput,
  PersonDirectoryPersonOutput,
  PagedPersonDirectoryPersonOutput,
  PersonDirectoryFaceOutput,
  PagedPersonDirectoryFaceOutput,
  IdentifyPersonResultOutput,
  FindSimilarFacesResultOutput,
  VerifyPersonResultOutput,
  DetectFacesResultOutput,
  CompareFacesResultOutput,
  ResourceOperationStatusContentClassifierContentClassifierErrorOutput,
  ContentClassifierOutput,
  PagedContentClassifierOutput,
  ResourceOperationStatusContentClassifierClassifyResultErrorOutput,
  OperationStatusClassifyResultErrorOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface ContentAnalyzersGetOperationStatus200Response
  extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusContentAnalyzerContentAnalyzerErrorOutput;
}

export interface ContentAnalyzersGetOperationStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentAnalyzersGetOperationStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentAnalyzersGetOperationStatusDefaultHeaders;
}

export interface ContentAnalyzersCreateOrReplace200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface ContentAnalyzersCreateOrReplace200Response
  extends HttpResponse {
  status: "200";
  body: ContentAnalyzerOutput;
  headers: RawHttpHeaders & ContentAnalyzersCreateOrReplace200Headers;
}

export interface ContentAnalyzersCreateOrReplace201Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface ContentAnalyzersCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: ContentAnalyzerOutput;
  headers: RawHttpHeaders & ContentAnalyzersCreateOrReplace201Headers;
}

export interface ContentAnalyzersCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentAnalyzersCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentAnalyzersCreateOrReplaceDefaultHeaders;
}

/** The final response for long-running createOrReplace operation */
export interface ContentAnalyzersCreateOrReplaceLogicalResponse
  extends HttpResponse {
  status: "200";
  body: ContentAnalyzerOutput;
}

export interface ContentAnalyzersUpdate200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ContentAnalyzersUpdate200Response extends HttpResponse {
  status: "200";
  body: ContentAnalyzerOutput;
  headers: RawHttpHeaders & ContentAnalyzersUpdate200Headers;
}

export interface ContentAnalyzersUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentAnalyzersUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentAnalyzersUpdateDefaultHeaders;
}

export interface ContentAnalyzersGet200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ContentAnalyzersGet200Response extends HttpResponse {
  status: "200";
  body: ContentAnalyzerOutput;
  headers: RawHttpHeaders & ContentAnalyzersGet200Headers;
}

export interface ContentAnalyzersGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentAnalyzersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentAnalyzersGetDefaultHeaders;
}

export interface ContentAnalyzersDelete204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface ContentAnalyzersDelete204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & ContentAnalyzersDelete204Headers;
}

export interface ContentAnalyzersDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentAnalyzersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentAnalyzersDeleteDefaultHeaders;
}

export interface ContentAnalyzersList200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ContentAnalyzersList200Response extends HttpResponse {
  status: "200";
  body: PagedContentAnalyzerOutput;
  headers: RawHttpHeaders & ContentAnalyzersList200Headers;
}

export interface ContentAnalyzersListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentAnalyzersListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentAnalyzersListDefaultHeaders;
}

export interface ContentAnalyzersAnalyze202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ContentAnalyzersAnalyze202Response extends HttpResponse {
  status: "202";
  body: ResourceOperationStatusContentAnalyzerAnalyzeResultErrorOutput;
  headers: RawHttpHeaders & ContentAnalyzersAnalyze202Headers;
}

export interface ContentAnalyzersAnalyzeDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentAnalyzersAnalyzeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentAnalyzersAnalyzeDefaultHeaders;
}

/** The final response for long-running analyze operation */
export interface ContentAnalyzersAnalyzeLogicalResponse extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusContentAnalyzerAnalyzeResultErrorOutput;
}

export interface ContentAnalyzersAnalyzeBinary202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ContentAnalyzersAnalyzeBinary202Response extends HttpResponse {
  status: "202";
  body: ResourceOperationStatusContentAnalyzerAnalyzeResultErrorOutput;
  headers: RawHttpHeaders & ContentAnalyzersAnalyzeBinary202Headers;
}

export interface ContentAnalyzersAnalyzeBinaryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentAnalyzersAnalyzeBinaryDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentAnalyzersAnalyzeBinaryDefaultHeaders;
}

/** The final response for long-running analyzeBinary operation */
export interface ContentAnalyzersAnalyzeBinaryLogicalResponse
  extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusContentAnalyzerAnalyzeResultErrorOutput;
}

/** The request has succeeded. */
export interface ContentAnalyzersGetResult200Response extends HttpResponse {
  status: "200";
  body: OperationStatusAnalyzeResultErrorOutput;
}

export interface ContentAnalyzersGetResultDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentAnalyzersGetResultDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentAnalyzersGetResultDefaultHeaders;
}

export interface PersonDirectoriesCreate201Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface PersonDirectoriesCreate201Response extends HttpResponse {
  status: "201";
  body: PersonDirectoryOutput;
  headers: RawHttpHeaders & PersonDirectoriesCreate201Headers;
}

export interface PersonDirectoriesCreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesCreateDefaultHeaders;
}

export interface PersonDirectoriesUpdate200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesUpdate200Response extends HttpResponse {
  status: "200";
  body: PersonDirectoryOutput;
  headers: RawHttpHeaders & PersonDirectoriesUpdate200Headers;
}

export interface PersonDirectoriesUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesUpdateDefaultHeaders;
}

export interface PersonDirectoriesGet200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesGet200Response extends HttpResponse {
  status: "200";
  body: PersonDirectoryOutput;
  headers: RawHttpHeaders & PersonDirectoriesGet200Headers;
}

export interface PersonDirectoriesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesGetDefaultHeaders;
}

export interface PersonDirectoriesDelete204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface PersonDirectoriesDelete204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & PersonDirectoriesDelete204Headers;
}

export interface PersonDirectoriesDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesDeleteDefaultHeaders;
}

export interface PersonDirectoriesList200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesList200Response extends HttpResponse {
  status: "200";
  body: PagedPersonDirectoryOutput;
  headers: RawHttpHeaders & PersonDirectoriesList200Headers;
}

export interface PersonDirectoriesListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesListDefaultHeaders;
}

export interface PersonDirectoriesUpdatePerson200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesUpdatePerson200Response extends HttpResponse {
  status: "200";
  body: PersonDirectoryPersonOutput;
  headers: RawHttpHeaders & PersonDirectoriesUpdatePerson200Headers;
}

export interface PersonDirectoriesUpdatePersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesUpdatePersonDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesUpdatePersonDefaultHeaders;
}

export interface PersonDirectoriesGetPerson200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesGetPerson200Response extends HttpResponse {
  status: "200";
  body: PersonDirectoryPersonOutput;
  headers: RawHttpHeaders & PersonDirectoriesGetPerson200Headers;
}

export interface PersonDirectoriesGetPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesGetPersonDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesGetPersonDefaultHeaders;
}

export interface PersonDirectoriesDeletePerson204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface PersonDirectoriesDeletePerson204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & PersonDirectoriesDeletePerson204Headers;
}

export interface PersonDirectoriesDeletePersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesDeletePersonDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesDeletePersonDefaultHeaders;
}

export interface PersonDirectoriesListPersons200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesListPersons200Response extends HttpResponse {
  status: "200";
  body: PagedPersonDirectoryPersonOutput;
  headers: RawHttpHeaders & PersonDirectoriesListPersons200Headers;
}

export interface PersonDirectoriesListPersonsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesListPersonsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesListPersonsDefaultHeaders;
}

export interface PersonDirectoriesAddFace201Headers {
  location: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface PersonDirectoriesAddFace201Response extends HttpResponse {
  status: "201";
  body: PersonDirectoryFaceOutput;
  headers: RawHttpHeaders & PersonDirectoriesAddFace201Headers;
}

export interface PersonDirectoriesAddFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesAddFaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesAddFaceDefaultHeaders;
}

export interface PersonDirectoriesUpdateFace200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesUpdateFace200Response extends HttpResponse {
  status: "200";
  body: PersonDirectoryFaceOutput;
  headers: RawHttpHeaders & PersonDirectoriesUpdateFace200Headers;
}

export interface PersonDirectoriesUpdateFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesUpdateFaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesUpdateFaceDefaultHeaders;
}

export interface PersonDirectoriesGetFace200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesGetFace200Response extends HttpResponse {
  status: "200";
  body: PersonDirectoryFaceOutput;
  headers: RawHttpHeaders & PersonDirectoriesGetFace200Headers;
}

export interface PersonDirectoriesGetFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesGetFaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesGetFaceDefaultHeaders;
}

export interface PersonDirectoriesDeleteFace204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface PersonDirectoriesDeleteFace204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & PersonDirectoriesDeleteFace204Headers;
}

export interface PersonDirectoriesDeleteFaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesDeleteFaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesDeleteFaceDefaultHeaders;
}

export interface PersonDirectoriesListFaces200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesListFaces200Response extends HttpResponse {
  status: "200";
  body: PagedPersonDirectoryFaceOutput;
  headers: RawHttpHeaders & PersonDirectoriesListFaces200Headers;
}

export interface PersonDirectoriesListFacesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesListFacesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesListFacesDefaultHeaders;
}

export interface PersonDirectoriesIdentifyPerson200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesIdentifyPerson200Response
  extends HttpResponse {
  status: "200";
  body: IdentifyPersonResultOutput;
  headers: RawHttpHeaders & PersonDirectoriesIdentifyPerson200Headers;
}

export interface PersonDirectoriesIdentifyPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesIdentifyPersonDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesIdentifyPersonDefaultHeaders;
}

export interface PersonDirectoriesFindSimilarFaces200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesFindSimilarFaces200Response
  extends HttpResponse {
  status: "200";
  body: FindSimilarFacesResultOutput;
  headers: RawHttpHeaders & PersonDirectoriesFindSimilarFaces200Headers;
}

export interface PersonDirectoriesFindSimilarFacesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesFindSimilarFacesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesFindSimilarFacesDefaultHeaders;
}

export interface PersonDirectoriesVerifyPerson200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PersonDirectoriesVerifyPerson200Response extends HttpResponse {
  status: "200";
  body: VerifyPersonResultOutput;
  headers: RawHttpHeaders & PersonDirectoriesVerifyPerson200Headers;
}

export interface PersonDirectoriesVerifyPersonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PersonDirectoriesVerifyPersonDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PersonDirectoriesVerifyPersonDefaultHeaders;
}

/** The request has succeeded. */
export interface FacesDetect200Response extends HttpResponse {
  status: "200";
  body: DetectFacesResultOutput;
}

export interface FacesDetectDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FacesDetectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FacesDetectDefaultHeaders;
}

/** The request has succeeded. */
export interface FacesCompare200Response extends HttpResponse {
  status: "200";
  body: CompareFacesResultOutput;
}

export interface FacesCompareDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FacesCompareDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FacesCompareDefaultHeaders;
}

/** The request has succeeded. */
export interface ContentClassifiersGetOperationStatus200Response
  extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusContentClassifierContentClassifierErrorOutput;
}

export interface ContentClassifiersGetOperationStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentClassifiersGetOperationStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentClassifiersGetOperationStatusDefaultHeaders;
}

export interface ContentClassifiersCreateOrReplace200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface ContentClassifiersCreateOrReplace200Response
  extends HttpResponse {
  status: "200";
  body: ContentClassifierOutput;
  headers: RawHttpHeaders & ContentClassifiersCreateOrReplace200Headers;
}

export interface ContentClassifiersCreateOrReplace201Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface ContentClassifiersCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: ContentClassifierOutput;
  headers: RawHttpHeaders & ContentClassifiersCreateOrReplace201Headers;
}

export interface ContentClassifiersCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentClassifiersCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentClassifiersCreateOrReplaceDefaultHeaders;
}

/** The final response for long-running createOrReplace operation */
export interface ContentClassifiersCreateOrReplaceLogicalResponse
  extends HttpResponse {
  status: "200";
  body: ContentClassifierOutput;
}

export interface ContentClassifiersUpdate200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ContentClassifiersUpdate200Response extends HttpResponse {
  status: "200";
  body: ContentClassifierOutput;
  headers: RawHttpHeaders & ContentClassifiersUpdate200Headers;
}

export interface ContentClassifiersUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentClassifiersUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentClassifiersUpdateDefaultHeaders;
}

export interface ContentClassifiersGet200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ContentClassifiersGet200Response extends HttpResponse {
  status: "200";
  body: ContentClassifierOutput;
  headers: RawHttpHeaders & ContentClassifiersGet200Headers;
}

export interface ContentClassifiersGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentClassifiersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentClassifiersGetDefaultHeaders;
}

export interface ContentClassifiersDelete204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface ContentClassifiersDelete204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & ContentClassifiersDelete204Headers;
}

export interface ContentClassifiersDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentClassifiersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentClassifiersDeleteDefaultHeaders;
}

export interface ContentClassifiersList200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ContentClassifiersList200Response extends HttpResponse {
  status: "200";
  body: PagedContentClassifierOutput;
  headers: RawHttpHeaders & ContentClassifiersList200Headers;
}

export interface ContentClassifiersListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentClassifiersListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentClassifiersListDefaultHeaders;
}

export interface ContentClassifiersClassify202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ContentClassifiersClassify202Response extends HttpResponse {
  status: "202";
  body: ResourceOperationStatusContentClassifierClassifyResultErrorOutput;
  headers: RawHttpHeaders & ContentClassifiersClassify202Headers;
}

export interface ContentClassifiersClassifyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentClassifiersClassifyDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentClassifiersClassifyDefaultHeaders;
}

/** The final response for long-running classify operation */
export interface ContentClassifiersClassifyLogicalResponse
  extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusContentClassifierClassifyResultErrorOutput;
}

export interface ContentClassifiersClassifyBinary202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ContentClassifiersClassifyBinary202Response
  extends HttpResponse {
  status: "202";
  body: ResourceOperationStatusContentClassifierClassifyResultErrorOutput;
  headers: RawHttpHeaders & ContentClassifiersClassifyBinary202Headers;
}

export interface ContentClassifiersClassifyBinaryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentClassifiersClassifyBinaryDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentClassifiersClassifyBinaryDefaultHeaders;
}

/** The final response for long-running classifyBinary operation */
export interface ContentClassifiersClassifyBinaryLogicalResponse
  extends HttpResponse {
  status: "200";
  body: ResourceOperationStatusContentClassifierClassifyResultErrorOutput;
}

/** The request has succeeded. */
export interface ContentClassifiersGetResult200Response extends HttpResponse {
  status: "200";
  body: OperationStatusClassifyResultErrorOutput;
}

export interface ContentClassifiersGetResultDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ContentClassifiersGetResultDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ContentClassifiersGetResultDefaultHeaders;
}
