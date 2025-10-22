// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type {
  ContentAnalyzer,
  StringEncoding,
  ProcessingLocation,
  AnalyzeRequest,
  PersonDirectory,
  PersonDirectoryPerson,
  AddFaceParameters,
  PersonDirectoryFace,
  IdentifyPersonParameters,
  FindSimilarFacesParameters,
  VerifyPersonParameters,
  DetectFacesParameters,
  CompareFacesParameters,
  ContentClassifier,
  ClassifyRequest,
} from "./models.js";

export type ContentAnalyzersGetOperationStatusParameters = RequestParameters;

export interface ContentAnalyzersCreateOrReplaceHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentAnalyzersCreateOrReplaceBodyParam {
  /** The resource instance. */
  body: ContentAnalyzer;
}

export interface ContentAnalyzersCreateOrReplaceHeaderParam {
  headers?: RawHttpHeadersInput & ContentAnalyzersCreateOrReplaceHeaders;
}

export type ContentAnalyzersCreateOrReplaceParameters =
  ContentAnalyzersCreateOrReplaceHeaderParam &
    ContentAnalyzersCreateOrReplaceBodyParam &
    RequestParameters;

export interface ContentAnalyzersUpdateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The resource instance. */
export type ContentAnalyzerResourceMergeAndPatch = Partial<ContentAnalyzer>;

export interface ContentAnalyzersUpdateBodyParam {
  /** The resource instance. */
  body: ContentAnalyzerResourceMergeAndPatch;
}

export interface ContentAnalyzersUpdateHeaderParam {
  headers?: RawHttpHeadersInput & ContentAnalyzersUpdateHeaders;
}

export interface ContentAnalyzersUpdateMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type ContentAnalyzersUpdateParameters =
  ContentAnalyzersUpdateHeaderParam &
    ContentAnalyzersUpdateMediaTypesParam &
    ContentAnalyzersUpdateBodyParam &
    RequestParameters;

export interface ContentAnalyzersGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentAnalyzersGetHeaderParam {
  headers?: RawHttpHeadersInput & ContentAnalyzersGetHeaders;
}

export type ContentAnalyzersGetParameters = ContentAnalyzersGetHeaderParam &
  RequestParameters;

export interface ContentAnalyzersDeleteHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentAnalyzersDeleteHeaderParam {
  headers?: RawHttpHeadersInput & ContentAnalyzersDeleteHeaders;
}

export type ContentAnalyzersDeleteParameters =
  ContentAnalyzersDeleteHeaderParam & RequestParameters;

export interface ContentAnalyzersListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentAnalyzersListHeaderParam {
  headers?: RawHttpHeadersInput & ContentAnalyzersListHeaders;
}

export type ContentAnalyzersListParameters = ContentAnalyzersListHeaderParam &
  RequestParameters;

export interface ContentAnalyzersAnalyzeHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentAnalyzersAnalyzeBodyParam {
  body: AnalyzeRequest;
}

export interface ContentAnalyzersAnalyzeQueryParamProperties {
  /**
   * The encoding format for content spans in the response.
   *
   * Possible values: "codePoint", "utf16", "utf8"
   */
  stringEncoding?: StringEncoding;
  /**
   * The location where the data may be processed.
   *
   * Possible values: "geography", "dataZone", "global"
   */
  processingLocation?: ProcessingLocation;
}

export interface ContentAnalyzersAnalyzeQueryParam {
  queryParameters?: ContentAnalyzersAnalyzeQueryParamProperties;
}

export interface ContentAnalyzersAnalyzeHeaderParam {
  headers?: RawHttpHeadersInput & ContentAnalyzersAnalyzeHeaders;
}

export type ContentAnalyzersAnalyzeParameters =
  ContentAnalyzersAnalyzeQueryParam &
    ContentAnalyzersAnalyzeHeaderParam &
    ContentAnalyzersAnalyzeBodyParam &
    RequestParameters;

export interface ContentAnalyzersAnalyzeBinaryHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentAnalyzersAnalyzeBinaryBodyParam {
  /** The binary content of the document to analyze. */
  body: string;
}

export interface ContentAnalyzersAnalyzeBinaryQueryParamProperties {
  /**
   * The encoding format for content spans in the response.
   *
   * Possible values: "codePoint", "utf16", "utf8"
   */
  stringEncoding?: StringEncoding;
  /**
   * The location where the data may be processed.
   *
   * Possible values: "geography", "dataZone", "global"
   */
  processingLocation?: ProcessingLocation;
}

export interface ContentAnalyzersAnalyzeBinaryQueryParam {
  queryParameters?: ContentAnalyzersAnalyzeBinaryQueryParamProperties;
}

export interface ContentAnalyzersAnalyzeBinaryHeaderParam {
  headers?: RawHttpHeadersInput & ContentAnalyzersAnalyzeBinaryHeaders;
}

export interface ContentAnalyzersAnalyzeBinaryMediaTypesParam {
  /** Request content type. */
  contentType: string;
}

export type ContentAnalyzersAnalyzeBinaryParameters =
  ContentAnalyzersAnalyzeBinaryQueryParam &
    ContentAnalyzersAnalyzeBinaryHeaderParam &
    ContentAnalyzersAnalyzeBinaryMediaTypesParam &
    ContentAnalyzersAnalyzeBinaryBodyParam &
    RequestParameters;
export type ContentAnalyzersGetResultParameters = RequestParameters;

export interface PersonDirectoriesCreateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesCreateBodyParam {
  /** The resource instance. */
  body: PersonDirectory;
}

export interface PersonDirectoriesCreateHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesCreateHeaders;
}

export type PersonDirectoriesCreateParameters =
  PersonDirectoriesCreateHeaderParam &
    PersonDirectoriesCreateBodyParam &
    RequestParameters;

export interface PersonDirectoriesUpdateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The resource instance. */
export type PersonDirectoryResourceMergeAndPatch = Partial<PersonDirectory>;

export interface PersonDirectoriesUpdateBodyParam {
  /** The resource instance. */
  body: PersonDirectoryResourceMergeAndPatch;
}

export interface PersonDirectoriesUpdateHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesUpdateHeaders;
}

export interface PersonDirectoriesUpdateMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type PersonDirectoriesUpdateParameters =
  PersonDirectoriesUpdateHeaderParam &
    PersonDirectoriesUpdateMediaTypesParam &
    PersonDirectoriesUpdateBodyParam &
    RequestParameters;

export interface PersonDirectoriesGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesGetHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesGetHeaders;
}

export type PersonDirectoriesGetParameters = PersonDirectoriesGetHeaderParam &
  RequestParameters;

export interface PersonDirectoriesDeleteHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesDeleteHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesDeleteHeaders;
}

export type PersonDirectoriesDeleteParameters =
  PersonDirectoriesDeleteHeaderParam & RequestParameters;

export interface PersonDirectoriesListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesListHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesListHeaders;
}

export type PersonDirectoriesListParameters = PersonDirectoriesListHeaderParam &
  RequestParameters;

export interface PersonDirectoriesUpdatePersonHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The resource instance. */
export type PersonDirectoryPersonResourceMergeAndPatch =
  Partial<PersonDirectoryPerson>;

export interface PersonDirectoriesUpdatePersonBodyParam {
  /** The resource instance. */
  body: PersonDirectoryPersonResourceMergeAndPatch;
}

export interface PersonDirectoriesUpdatePersonHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesUpdatePersonHeaders;
}

export interface PersonDirectoriesUpdatePersonMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type PersonDirectoriesUpdatePersonParameters =
  PersonDirectoriesUpdatePersonHeaderParam &
    PersonDirectoriesUpdatePersonMediaTypesParam &
    PersonDirectoriesUpdatePersonBodyParam &
    RequestParameters;

export interface PersonDirectoriesGetPersonHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesGetPersonHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesGetPersonHeaders;
}

export type PersonDirectoriesGetPersonParameters =
  PersonDirectoriesGetPersonHeaderParam & RequestParameters;

export interface PersonDirectoriesDeletePersonHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesDeletePersonHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesDeletePersonHeaders;
}

export type PersonDirectoriesDeletePersonParameters =
  PersonDirectoriesDeletePersonHeaderParam & RequestParameters;

export interface PersonDirectoriesListPersonsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesListPersonsHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesListPersonsHeaders;
}

export type PersonDirectoriesListPersonsParameters =
  PersonDirectoriesListPersonsHeaderParam & RequestParameters;

export interface PersonDirectoriesAddFaceHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesAddFaceBodyParam {
  body: AddFaceParameters;
}

export interface PersonDirectoriesAddFaceHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesAddFaceHeaders;
}

export type PersonDirectoriesAddFaceParameters =
  PersonDirectoriesAddFaceHeaderParam &
    PersonDirectoriesAddFaceBodyParam &
    RequestParameters;

export interface PersonDirectoriesUpdateFaceHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The resource instance. */
export type PersonDirectoryFaceResourceMergeAndPatch =
  Partial<PersonDirectoryFace>;

export interface PersonDirectoriesUpdateFaceBodyParam {
  /** The resource instance. */
  body: PersonDirectoryFaceResourceMergeAndPatch;
}

export interface PersonDirectoriesUpdateFaceHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesUpdateFaceHeaders;
}

export interface PersonDirectoriesUpdateFaceMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type PersonDirectoriesUpdateFaceParameters =
  PersonDirectoriesUpdateFaceHeaderParam &
    PersonDirectoriesUpdateFaceMediaTypesParam &
    PersonDirectoriesUpdateFaceBodyParam &
    RequestParameters;

export interface PersonDirectoriesGetFaceHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesGetFaceHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesGetFaceHeaders;
}

export type PersonDirectoriesGetFaceParameters =
  PersonDirectoriesGetFaceHeaderParam & RequestParameters;

export interface PersonDirectoriesDeleteFaceHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesDeleteFaceHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesDeleteFaceHeaders;
}

export type PersonDirectoriesDeleteFaceParameters =
  PersonDirectoriesDeleteFaceHeaderParam & RequestParameters;

export interface PersonDirectoriesListFacesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesListFacesHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesListFacesHeaders;
}

export type PersonDirectoriesListFacesParameters =
  PersonDirectoriesListFacesHeaderParam & RequestParameters;

export interface PersonDirectoriesIdentifyPersonHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesIdentifyPersonBodyParam {
  body: IdentifyPersonParameters;
}

export interface PersonDirectoriesIdentifyPersonHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesIdentifyPersonHeaders;
}

export type PersonDirectoriesIdentifyPersonParameters =
  PersonDirectoriesIdentifyPersonHeaderParam &
    PersonDirectoriesIdentifyPersonBodyParam &
    RequestParameters;

export interface PersonDirectoriesFindSimilarFacesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesFindSimilarFacesBodyParam {
  body: FindSimilarFacesParameters;
}

export interface PersonDirectoriesFindSimilarFacesHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesFindSimilarFacesHeaders;
}

export type PersonDirectoriesFindSimilarFacesParameters =
  PersonDirectoriesFindSimilarFacesHeaderParam &
    PersonDirectoriesFindSimilarFacesBodyParam &
    RequestParameters;

export interface PersonDirectoriesVerifyPersonHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PersonDirectoriesVerifyPersonBodyParam {
  body: VerifyPersonParameters;
}

export interface PersonDirectoriesVerifyPersonHeaderParam {
  headers?: RawHttpHeadersInput & PersonDirectoriesVerifyPersonHeaders;
}

export type PersonDirectoriesVerifyPersonParameters =
  PersonDirectoriesVerifyPersonHeaderParam &
    PersonDirectoriesVerifyPersonBodyParam &
    RequestParameters;

export interface FacesDetectHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface FacesDetectBodyParam {
  body: DetectFacesParameters;
}

export interface FacesDetectHeaderParam {
  headers?: RawHttpHeadersInput & FacesDetectHeaders;
}

export type FacesDetectParameters = FacesDetectHeaderParam &
  FacesDetectBodyParam &
  RequestParameters;

export interface FacesCompareHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface FacesCompareBodyParam {
  body: CompareFacesParameters;
}

export interface FacesCompareHeaderParam {
  headers?: RawHttpHeadersInput & FacesCompareHeaders;
}

export type FacesCompareParameters = FacesCompareHeaderParam &
  FacesCompareBodyParam &
  RequestParameters;
export type ContentClassifiersGetOperationStatusParameters = RequestParameters;

export interface ContentClassifiersCreateOrReplaceHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentClassifiersCreateOrReplaceBodyParam {
  /** The resource instance. */
  body: ContentClassifier;
}

export interface ContentClassifiersCreateOrReplaceHeaderParam {
  headers?: RawHttpHeadersInput & ContentClassifiersCreateOrReplaceHeaders;
}

export type ContentClassifiersCreateOrReplaceParameters =
  ContentClassifiersCreateOrReplaceHeaderParam &
    ContentClassifiersCreateOrReplaceBodyParam &
    RequestParameters;

export interface ContentClassifiersUpdateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The resource instance. */
export type ContentClassifierResourceMergeAndPatch = Partial<ContentClassifier>;

export interface ContentClassifiersUpdateBodyParam {
  /** The resource instance. */
  body: ContentClassifierResourceMergeAndPatch;
}

export interface ContentClassifiersUpdateHeaderParam {
  headers?: RawHttpHeadersInput & ContentClassifiersUpdateHeaders;
}

export interface ContentClassifiersUpdateMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type ContentClassifiersUpdateParameters =
  ContentClassifiersUpdateHeaderParam &
    ContentClassifiersUpdateMediaTypesParam &
    ContentClassifiersUpdateBodyParam &
    RequestParameters;

export interface ContentClassifiersGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentClassifiersGetHeaderParam {
  headers?: RawHttpHeadersInput & ContentClassifiersGetHeaders;
}

export type ContentClassifiersGetParameters = ContentClassifiersGetHeaderParam &
  RequestParameters;

export interface ContentClassifiersDeleteHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentClassifiersDeleteHeaderParam {
  headers?: RawHttpHeadersInput & ContentClassifiersDeleteHeaders;
}

export type ContentClassifiersDeleteParameters =
  ContentClassifiersDeleteHeaderParam & RequestParameters;

export interface ContentClassifiersListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentClassifiersListHeaderParam {
  headers?: RawHttpHeadersInput & ContentClassifiersListHeaders;
}

export type ContentClassifiersListParameters =
  ContentClassifiersListHeaderParam & RequestParameters;

export interface ContentClassifiersClassifyHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentClassifiersClassifyBodyParam {
  body: ClassifyRequest;
}

export interface ContentClassifiersClassifyQueryParamProperties {
  /**
   * The encoding format for content spans in the response.
   *
   * Possible values: "codePoint", "utf16", "utf8"
   */
  stringEncoding?: StringEncoding;
  /**
   * The location where the data may be processed.
   *
   * Possible values: "geography", "dataZone", "global"
   */
  processingLocation?: ProcessingLocation;
}

export interface ContentClassifiersClassifyQueryParam {
  queryParameters?: ContentClassifiersClassifyQueryParamProperties;
}

export interface ContentClassifiersClassifyHeaderParam {
  headers?: RawHttpHeadersInput & ContentClassifiersClassifyHeaders;
}

export type ContentClassifiersClassifyParameters =
  ContentClassifiersClassifyQueryParam &
    ContentClassifiersClassifyHeaderParam &
    ContentClassifiersClassifyBodyParam &
    RequestParameters;

export interface ContentClassifiersClassifyBinaryHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ContentClassifiersClassifyBinaryBodyParam {
  /** The binary content of the document to classify. */
  body: string;
}

export interface ContentClassifiersClassifyBinaryQueryParamProperties {
  /**
   * The encoding format for content spans in the response.
   *
   * Possible values: "codePoint", "utf16", "utf8"
   */
  stringEncoding?: StringEncoding;
  /**
   * The location where the data may be processed.
   *
   * Possible values: "geography", "dataZone", "global"
   */
  processingLocation?: ProcessingLocation;
}

export interface ContentClassifiersClassifyBinaryQueryParam {
  queryParameters?: ContentClassifiersClassifyBinaryQueryParamProperties;
}

export interface ContentClassifiersClassifyBinaryHeaderParam {
  headers?: RawHttpHeadersInput & ContentClassifiersClassifyBinaryHeaders;
}

export interface ContentClassifiersClassifyBinaryMediaTypesParam {
  /** Request content type. */
  contentType: string;
}

export type ContentClassifiersClassifyBinaryParameters =
  ContentClassifiersClassifyBinaryQueryParam &
    ContentClassifiersClassifyBinaryHeaderParam &
    ContentClassifiersClassifyBinaryMediaTypesParam &
    ContentClassifiersClassifyBinaryBodyParam &
    RequestParameters;
export type ContentClassifiersGetResultParameters = RequestParameters;
