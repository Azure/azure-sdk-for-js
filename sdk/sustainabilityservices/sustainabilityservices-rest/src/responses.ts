// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  VersionsOutput,
  PagedFactorLibraryOutput,
  FactorLibraryOutput,
  PagedEstimationFactorOutput,
  EstimationFactorOutput,
  PagedEmissionFactorOutput,
  EmissionFactorOutput,
  PagedFactorMappingOutput,
  FactorMappingOutput,
  PagedCalculationModelOutput,
  CalculationModelOutput,
  PagedReferenceDataEntitiesOutput,
  PagedEntityRecordOutput,
  EntityRecordOutput,
  EmissionCalculationResultOutput,
} from "./outputModels.js";

export interface ListFactorLibraries200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface ListFactorLibraries200Response extends HttpResponse {
  status: "200";
  body: PagedFactorLibraryOutput;
  headers: RawHttpHeaders & ListFactorLibraries200Headers;
}

export interface ListFactorLibrariesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListFactorLibrariesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListFactorLibrariesDefaultHeaders;
}

export interface GetFactorLibrary200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface GetFactorLibrary200Response extends HttpResponse {
  status: "200";
  body: FactorLibraryOutput;
  headers: RawHttpHeaders & GetFactorLibrary200Headers;
}

export interface GetFactorLibraryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetFactorLibraryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetFactorLibraryDefaultHeaders;
}

export interface ListEstimationFactorsByFactorLibrary200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface ListEstimationFactorsByFactorLibrary200Response extends HttpResponse {
  status: "200";
  body: PagedEstimationFactorOutput;
  headers: RawHttpHeaders & ListEstimationFactorsByFactorLibrary200Headers;
}

export interface ListEstimationFactorsByFactorLibraryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListEstimationFactorsByFactorLibraryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListEstimationFactorsByFactorLibraryDefaultHeaders;
}

export interface GetEstimationFactor200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface GetEstimationFactor200Response extends HttpResponse {
  status: "200";
  body: EstimationFactorOutput;
  headers: RawHttpHeaders & GetEstimationFactor200Headers;
}

export interface GetEstimationFactorDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetEstimationFactorDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetEstimationFactorDefaultHeaders;
}

export interface ListEmissionFactorsByFactorLibrary200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface ListEmissionFactorsByFactorLibrary200Response extends HttpResponse {
  status: "200";
  body: PagedEmissionFactorOutput;
  headers: RawHttpHeaders & ListEmissionFactorsByFactorLibrary200Headers;
}

export interface ListEmissionFactorsByFactorLibraryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListEmissionFactorsByFactorLibraryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListEmissionFactorsByFactorLibraryDefaultHeaders;
}

export interface GetEmissionFactor200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface GetEmissionFactor200Response extends HttpResponse {
  status: "200";
  body: EmissionFactorOutput;
  headers: RawHttpHeaders & GetEmissionFactor200Headers;
}

export interface GetEmissionFactorDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetEmissionFactorDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetEmissionFactorDefaultHeaders;
}

export interface ListFactorMappings200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface ListFactorMappings200Response extends HttpResponse {
  status: "200";
  body: PagedFactorMappingOutput;
  headers: RawHttpHeaders & ListFactorMappings200Headers;
}

export interface ListFactorMappingsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListFactorMappingsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListFactorMappingsDefaultHeaders;
}

export interface GetFactorMapping200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface GetFactorMapping200Response extends HttpResponse {
  status: "200";
  body: FactorMappingOutput;
  headers: RawHttpHeaders & GetFactorMapping200Headers;
}

export interface GetFactorMappingDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetFactorMappingDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetFactorMappingDefaultHeaders;
}

export interface ListCalculationModels200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface ListCalculationModels200Response extends HttpResponse {
  status: "200";
  body: PagedCalculationModelOutput;
  headers: RawHttpHeaders & ListCalculationModels200Headers;
}

export interface ListCalculationModelsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListCalculationModelsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListCalculationModelsDefaultHeaders;
}

export interface GetCalculationModel200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface GetCalculationModel200Response extends HttpResponse {
  status: "200";
  body: CalculationModelOutput;
  headers: RawHttpHeaders & GetCalculationModel200Headers;
}

export interface GetCalculationModelDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCalculationModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCalculationModelDefaultHeaders;
}

export interface ListReferenceEntities200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface ListReferenceEntities200Response extends HttpResponse {
  status: "200";
  body: PagedReferenceDataEntitiesOutput;
  headers: RawHttpHeaders & ListReferenceEntities200Headers;
}

export interface ListReferenceEntitiesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListReferenceEntitiesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListReferenceEntitiesDefaultHeaders;
}

export interface ListReferenceEntityRecords200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface ListReferenceEntityRecords200Response extends HttpResponse {
  status: "200";
  body: PagedEntityRecordOutput;
  headers: RawHttpHeaders & ListReferenceEntityRecords200Headers;
}

export interface ListReferenceEntityRecordsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListReferenceEntityRecordsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListReferenceEntityRecordsDefaultHeaders;
}

export interface GetReferenceEntityRecord200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface GetReferenceEntityRecord200Response extends HttpResponse {
  status: "200";
  body: EntityRecordOutput;
  headers: RawHttpHeaders & GetReferenceEntityRecord200Headers;
}

export interface GetReferenceEntityRecordDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetReferenceEntityRecordDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetReferenceEntityRecordDefaultHeaders;
}

export interface CalculateEmissions200Headers {
  /** Correlation id. */
  "correlation-id": string;
  /** List of api supported versions. */
  "api-supported-versions"?: VersionsOutput[];
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
}

/** The request has succeeded. */
export interface CalculateEmissions200Response extends HttpResponse {
  status: "200";
  body: EmissionCalculationResultOutput;
  headers: RawHttpHeaders & CalculateEmissions200Headers;
}

export interface CalculateEmissionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CalculateEmissionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CalculateEmissionsDefaultHeaders;
}
