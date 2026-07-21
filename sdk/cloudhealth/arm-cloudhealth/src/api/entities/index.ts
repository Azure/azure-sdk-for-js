// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getSignalRecommendations,
  getDataAnnotations,
  addDataAnnotation,
  ingestHealthReport,
  getSignalHistory,
  getHistory,
  listByHealthModel,
  $delete,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  EntitiesGetSignalRecommendationsOptionalParams,
  EntitiesGetDataAnnotationsOptionalParams,
  EntitiesAddDataAnnotationOptionalParams,
  EntitiesIngestHealthReportOptionalParams,
  EntitiesGetSignalHistoryOptionalParams,
  EntitiesGetHistoryOptionalParams,
  EntitiesListByHealthModelOptionalParams,
  EntitiesDeleteOptionalParams,
  EntitiesCreateOrUpdateOptionalParams,
  EntitiesGetOptionalParams,
} from "./options.js";
