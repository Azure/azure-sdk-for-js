// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type { EmissionCalculationRequest } from "./models.js";

export interface ListFactorLibrariesQueryParamProperties {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListFactorLibrariesQueryParam {
  queryParameters?: ListFactorLibrariesQueryParamProperties;
}

export type ListFactorLibrariesParameters = ListFactorLibrariesQueryParam & RequestParameters;
export type GetFactorLibraryParameters = RequestParameters;

export interface ListEstimationFactorsByFactorLibraryQueryParamProperties {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListEstimationFactorsByFactorLibraryQueryParam {
  queryParameters?: ListEstimationFactorsByFactorLibraryQueryParamProperties;
}

export type ListEstimationFactorsByFactorLibraryParameters =
  ListEstimationFactorsByFactorLibraryQueryParam & RequestParameters;
export type GetEstimationFactorParameters = RequestParameters;

export interface ListEmissionFactorsByFactorLibraryQueryParamProperties {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListEmissionFactorsByFactorLibraryQueryParam {
  queryParameters?: ListEmissionFactorsByFactorLibraryQueryParamProperties;
}

export type ListEmissionFactorsByFactorLibraryParameters =
  ListEmissionFactorsByFactorLibraryQueryParam & RequestParameters;
export type GetEmissionFactorParameters = RequestParameters;

export interface ListFactorMappingsQueryParamProperties {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListFactorMappingsQueryParam {
  queryParameters?: ListFactorMappingsQueryParamProperties;
}

export type ListFactorMappingsParameters = ListFactorMappingsQueryParam & RequestParameters;
export type GetFactorMappingParameters = RequestParameters;

export interface ListCalculationModelsQueryParamProperties {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListCalculationModelsQueryParam {
  queryParameters?: ListCalculationModelsQueryParamProperties;
}

export type ListCalculationModelsParameters = ListCalculationModelsQueryParam & RequestParameters;
export type GetCalculationModelParameters = RequestParameters;

export interface ListReferenceEntitiesQueryParamProperties {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListReferenceEntitiesQueryParam {
  queryParameters?: ListReferenceEntitiesQueryParamProperties;
}

export type ListReferenceEntitiesParameters = ListReferenceEntitiesQueryParam & RequestParameters;

export interface ListReferenceEntityRecordsQueryParamProperties {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListReferenceEntityRecordsQueryParam {
  queryParameters?: ListReferenceEntityRecordsQueryParamProperties;
}

export type ListReferenceEntityRecordsParameters = ListReferenceEntityRecordsQueryParam &
  RequestParameters;
export type GetReferenceEntityRecordParameters = RequestParameters;

export interface CalculateEmissionsBodyParam {
  body: EmissionCalculationRequest;
}

export type CalculateEmissionsParameters = CalculateEmissionsBodyParam & RequestParameters;
