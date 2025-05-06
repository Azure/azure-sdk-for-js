// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ListFactorLibrariesParameters,
  GetFactorLibraryParameters,
  ListEstimationFactorsByFactorLibraryParameters,
  GetEstimationFactorParameters,
  ListEmissionFactorsByFactorLibraryParameters,
  GetEmissionFactorParameters,
  ListFactorMappingsParameters,
  GetFactorMappingParameters,
  ListCalculationModelsParameters,
  GetCalculationModelParameters,
  ListReferenceEntitiesParameters,
  ListReferenceEntityRecordsParameters,
  GetReferenceEntityRecordParameters,
  CalculateEmissionsParameters,
} from "./parameters.js";
import type {
  ListFactorLibraries200Response,
  ListFactorLibrariesDefaultResponse,
  GetFactorLibrary200Response,
  GetFactorLibraryDefaultResponse,
  ListEstimationFactorsByFactorLibrary200Response,
  ListEstimationFactorsByFactorLibraryDefaultResponse,
  GetEstimationFactor200Response,
  GetEstimationFactorDefaultResponse,
  ListEmissionFactorsByFactorLibrary200Response,
  ListEmissionFactorsByFactorLibraryDefaultResponse,
  GetEmissionFactor200Response,
  GetEmissionFactorDefaultResponse,
  ListFactorMappings200Response,
  ListFactorMappingsDefaultResponse,
  GetFactorMapping200Response,
  GetFactorMappingDefaultResponse,
  ListCalculationModels200Response,
  ListCalculationModelsDefaultResponse,
  GetCalculationModel200Response,
  GetCalculationModelDefaultResponse,
  ListReferenceEntities200Response,
  ListReferenceEntitiesDefaultResponse,
  ListReferenceEntityRecords200Response,
  ListReferenceEntityRecordsDefaultResponse,
  GetReferenceEntityRecord200Response,
  GetReferenceEntityRecordDefaultResponse,
  CalculateEmissions200Response,
  CalculateEmissionsDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListFactorLibraries {
  /** Lists factor libraries. */
  get(
    options?: ListFactorLibrariesParameters,
  ): StreamableMethod<ListFactorLibraries200Response | ListFactorLibrariesDefaultResponse>;
}

export interface GetFactorLibrary {
  /** Gets factor library by id. */
  get(
    options?: GetFactorLibraryParameters,
  ): StreamableMethod<GetFactorLibrary200Response | GetFactorLibraryDefaultResponse>;
}

export interface ListEstimationFactorsByFactorLibrary {
  /** Lists estimation factors within the given factor library id. */
  get(
    options?: ListEstimationFactorsByFactorLibraryParameters,
  ): StreamableMethod<
    | ListEstimationFactorsByFactorLibrary200Response
    | ListEstimationFactorsByFactorLibraryDefaultResponse
  >;
}

export interface GetEstimationFactor {
  /** Gets estimation factor by id. */
  get(
    options?: GetEstimationFactorParameters,
  ): StreamableMethod<GetEstimationFactor200Response | GetEstimationFactorDefaultResponse>;
}

export interface ListEmissionFactorsByFactorLibrary {
  /** Lists emission factors within the given factor library id. */
  get(
    options?: ListEmissionFactorsByFactorLibraryParameters,
  ): StreamableMethod<
    | ListEmissionFactorsByFactorLibrary200Response
    | ListEmissionFactorsByFactorLibraryDefaultResponse
  >;
}

export interface GetEmissionFactor {
  /** Gets emission factor by id. */
  get(
    options?: GetEmissionFactorParameters,
  ): StreamableMethod<GetEmissionFactor200Response | GetEmissionFactorDefaultResponse>;
}

export interface ListFactorMappings {
  /** Lists factor mappings belonging to the factor library. */
  get(
    options?: ListFactorMappingsParameters,
  ): StreamableMethod<ListFactorMappings200Response | ListFactorMappingsDefaultResponse>;
}

export interface GetFactorMapping {
  /** Gets factor mapping by id. */
  get(
    options?: GetFactorMappingParameters,
  ): StreamableMethod<GetFactorMapping200Response | GetFactorMappingDefaultResponse>;
}

export interface ListCalculationModels {
  /** Lists calculation models for the given activity source. */
  get(
    options?: ListCalculationModelsParameters,
  ): StreamableMethod<ListCalculationModels200Response | ListCalculationModelsDefaultResponse>;
}

export interface GetCalculationModel {
  /** Gets calculation model by id. */
  get(
    options?: GetCalculationModelParameters,
  ): StreamableMethod<GetCalculationModel200Response | GetCalculationModelDefaultResponse>;
}

export interface ListReferenceEntities {
  /** Lists reference data entities. */
  get(
    options?: ListReferenceEntitiesParameters,
  ): StreamableMethod<ListReferenceEntities200Response | ListReferenceEntitiesDefaultResponse>;
}

export interface ListReferenceEntityRecords {
  /** Fetch records of the given reference data entity. */
  get(
    options?: ListReferenceEntityRecordsParameters,
  ): StreamableMethod<
    ListReferenceEntityRecords200Response | ListReferenceEntityRecordsDefaultResponse
  >;
}

export interface GetReferenceEntityRecord {
  /** Gets reference data entity record by id. */
  get(
    options?: GetReferenceEntityRecordParameters,
  ): StreamableMethod<
    GetReferenceEntityRecord200Response | GetReferenceEntityRecordDefaultResponse
  >;
}

export interface CalculateEmissions {
  /** Calculate emissions. */
  post(
    options: CalculateEmissionsParameters,
  ): StreamableMethod<CalculateEmissions200Response | CalculateEmissionsDefaultResponse>;
}

export interface Routes {
  /** Resource for '/sustainability/factor-libraries' has methods for the following verbs: get */
  (path: "/sustainability/factor-libraries"): ListFactorLibraries;
  /** Resource for '/sustainability/factor-libraries/\{factorLibraryId\}' has methods for the following verbs: get */
  (
    path: "/sustainability/factor-libraries/{factorLibraryId}",
    factorLibraryId: string,
  ): GetFactorLibrary;
  /** Resource for '/sustainability/factor-libraries/\{factorLibraryId\}/estimation-factors' has methods for the following verbs: get */
  (
    path: "/sustainability/factor-libraries/{factorLibraryId}/estimation-factors",
    factorLibraryId: string,
  ): ListEstimationFactorsByFactorLibrary;
  /** Resource for '/sustainability/factor-libraries/\{factorLibraryId\}/estimation-factors/\{estimationFactorId\}' has methods for the following verbs: get */
  (
    path: "/sustainability/factor-libraries/{factorLibraryId}/estimation-factors/{estimationFactorId}",
    factorLibraryId: string,
    estimationFactorId: string,
  ): GetEstimationFactor;
  /** Resource for '/sustainability/factor-libraries/\{factorLibraryId\}/emission-factors' has methods for the following verbs: get */
  (
    path: "/sustainability/factor-libraries/{factorLibraryId}/emission-factors",
    factorLibraryId: string,
  ): ListEmissionFactorsByFactorLibrary;
  /** Resource for '/sustainability/factor-libraries/\{factorLibraryId\}/emission-factors/\{emissionFactorId\}' has methods for the following verbs: get */
  (
    path: "/sustainability/factor-libraries/{factorLibraryId}/emission-factors/{emissionFactorId}",
    factorLibraryId: string,
    emissionFactorId: string,
  ): GetEmissionFactor;
  /** Resource for '/sustainability/factor-libraries/\{factorLibraryId\}/factor-mappings' has methods for the following verbs: get */
  (
    path: "/sustainability/factor-libraries/{factorLibraryId}/factor-mappings",
    factorLibraryId: string,
  ): ListFactorMappings;
  /** Resource for '/sustainability/factor-libraries/\{factorLibraryId\}/factor-mappings/\{factorMappingId\}' has methods for the following verbs: get */
  (
    path: "/sustainability/factor-libraries/{factorLibraryId}/factor-mappings/{factorMappingId}",
    factorLibraryId: string,
    factorMappingId: string,
  ): GetFactorMapping;
  /** Resource for '/sustainability/calculation-models' has methods for the following verbs: get */
  (path: "/sustainability/calculation-models"): ListCalculationModels;
  /** Resource for '/sustainability/calculation-models/\{calculationModelId\}' has methods for the following verbs: get */
  (
    path: "/sustainability/calculation-models/{calculationModelId}",
    calculationModelId: string,
  ): GetCalculationModel;
  /** Resource for '/sustainability/reference-data' has methods for the following verbs: get */
  (path: "/sustainability/reference-data"): ListReferenceEntities;
  /** Resource for '/sustainability/reference-data/\{entityName\}/entity-records' has methods for the following verbs: get */
  (
    path: "/sustainability/reference-data/{entityName}/entity-records",
    entityName: string,
  ): ListReferenceEntityRecords;
  /** Resource for '/sustainability/reference-data/\{entityName\}/entity-records/\{id\}' has methods for the following verbs: get */
  (
    path: "/sustainability/reference-data/{entityName}/entity-records/{id}",
    entityName: string,
    id: string,
  ): GetReferenceEntityRecord;
  /** Resource for '/sustainability/activities:calculateEmissions' has methods for the following verbs: post */
  (path: "/sustainability/activities:calculateEmissions"): CalculateEmissions;
}

export type SustainabilityServicesClient = Client & {
  path: Routes;
};
