// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetLongRunning200Response,
  GetLongRunningDefaultResponse,
  CreateOrReplaceDiscovery200Response,
  CreateOrReplaceDiscovery201Response,
  CreateOrReplaceDiscoveryDefaultResponse,
  GetDiscovery200Response,
  GetDiscoveryDefaultResponse,
  CompleteDiscovery200Response,
  CompleteDiscovery202Response,
  CompleteDiscoveryDefaultResponse,
  CancelDiscovery200Response,
  CancelDiscovery202Response,
  CancelDiscoveryDefaultResponse,
  GetDiscoverySpecialFileUploadLocations200Response,
  GetDiscoverySpecialFileUploadLocationsDefaultResponse,
  GenerateDiscoverySpecialFileUploadLocations200Response,
  GenerateDiscoverySpecialFileUploadLocations202Response,
  GenerateDiscoverySpecialFileUploadLocationsDefaultResponse,
  GetAllDiscoveryUploads200Response,
  GetAllDiscoveryUploadsDefaultResponse,
  CreateOrReplaceUpload200Response,
  CreateOrReplaceUpload201Response,
  CreateOrReplaceUploadDefaultResponse,
  GetUpload200Response,
  GetUploadDefaultResponse,
  CompleteUpload200Response,
  CompleteUpload202Response,
  CompleteUploadDefaultResponse,
  CancelUpload200Response,
  CancelUpload202Response,
  CancelUploadDefaultResponse,
  GenerateUploadSpecialFiles200Response,
  GenerateUploadSpecialFiles202Response,
  GenerateUploadSpecialFilesDefaultResponse,
  GetUploadSpecialFiles200Response,
  GetUploadSpecialFilesDefaultResponse,
  GenerateUploadDataFiles200Response,
  GenerateUploadDataFiles202Response,
  GenerateUploadDataFilesDefaultResponse,
  GetUploadDataFiles200Response,
  GetUploadDataFilesDefaultResponse,
  ListMeasurements200Response,
  ListMeasurementsDefaultResponse,
  GetClassificationSchema200Response,
  GetClassificationSchemaDefaultResponse,
  DeleteClassificationSchema202Response,
  DeleteClassificationSchema204Response,
  DeleteClassificationSchemaDefaultResponse,
  CreateClassificationSchema200Response,
  CreateClassificationSchema202Response,
  CreateClassificationSchemaDefaultResponse,
  GetClassificationSchemas200Response,
  GetClassificationSchemasDefaultResponse,
  GetMeasurement200Response,
  GetMeasurementDefaultResponse,
  DeleteMeasurement202Response,
  DeleteMeasurement204Response,
  DeleteMeasurementDefaultResponse,
  GetMeasurements200Response,
  GetMeasurementsDefaultResponse,
  GetMeasurementsWithMetadata200Response,
  GetMeasurementsWithMetadataDefaultResponse,
  GetMeasurementsByIds200Response,
  GetMeasurementsByIdsDefaultResponse,
  GetMeasurementMetadata200Response,
  GetMeasurementMetadataDefaultResponse,
  GetMeasurementProcessingResults200Response,
  GetMeasurementProcessingResultsDefaultResponse,
  GetMeasurementStateMachine200Response,
  GetMeasurementStateMachineDefaultResponse,
  GetMeasurementStateMachines200Response,
  GetMeasurementStateMachinesDefaultResponse,
  ActMeasurementStateMachine200Response,
  ActMeasurementStateMachine202Response,
  ActMeasurementStateMachineDefaultResponse,
  GetMeasurementMetadataSchemaFileInfo200Response,
  GetMeasurementMetadataSchemaFileInfoDefaultResponse,
  GetMeasurementClassification200Response,
  GetMeasurementClassificationDefaultResponse,
  DeleteMeasurementClassification202Response,
  DeleteMeasurementClassification204Response,
  DeleteMeasurementClassificationDefaultResponse,
  GetMeasurementClassifications200Response,
  GetMeasurementClassificationsDefaultResponse,
  CreateMeasurementClassification200Response,
  CreateMeasurementClassification202Response,
  CreateMeasurementClassificationDefaultResponse,
  CreateDataStream200Response,
  CreateDataStream202Response,
  CreateDataStreamDefaultResponse,
  GetAllDataStream200Response,
  GetAllDataStreamDefaultResponse,
  GetDataStream200Response,
  GetDataStreamDefaultResponse,
  ClearContentOfDataStream200Response,
  ClearContentOfDataStream202Response,
  ClearContentOfDataStreamDefaultResponse,
  StageFilesForDataStream200Response,
  StageFilesForDataStreamDefaultResponse,
  CompleteDataStream200Response,
  CompleteDataStream202Response,
  CompleteDataStreamDefaultResponse,
  FailDataStream200Response,
  FailDataStream202Response,
  FailDataStreamDefaultResponse,
  GetDataStreamsByTags200Response,
  GetDataStreamsByTagsDefaultResponse,
  GetDataStreamsByLineage200Response,
  GetDataStreamsByLineageDefaultResponse,
  GetDataStreamLineageGraphsByLineage200Response,
  GetDataStreamLineageGraphsByLineageDefaultResponse,
  CreateOrReplaceDataStreamStorage200Response,
  CreateOrReplaceDataStreamStorage201Response,
  CreateOrReplaceDataStreamStorageDefaultResponse,
  GetDataStreamStorage200Response,
  GetDataStreamStorageDefaultResponse,
  CreateOrReplaceDataStreamTags200Response,
  CreateOrReplaceDataStreamTags201Response,
  CreateOrReplaceDataStreamTagsDefaultResponse,
  GetDataStreamTags200Response,
  GetDataStreamTagsDefaultResponse,
  GenerateDataStreamFiles200Response,
  GenerateDataStreamFiles202Response,
  GenerateDataStreamFilesDefaultResponse,
  GetDataStreamFiles200Response,
  GetDataStreamFilesDefaultResponse,
  GetDataStreamLogsContainerLocation200Response,
  GetDataStreamLogsContainerLocationDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /operations/{operationId}": ["200"],
  "PUT /discoveries/{discoveryId}": ["200", "201"],
  "GET /discoveries/{discoveryId}": ["200"],
  "POST /discoveries/{discoveryId}:complete": ["200", "202"],
  "GET /discoveries/{discoveryId}:complete": ["200", "202"],
  "POST /discoveries/{discoveryId}:cancel": ["200", "202"],
  "GET /discoveries/{discoveryId}:cancel": ["200", "202"],
  "POST /discoveries/{discoveryId}/specialFilesUploadInfo:listWritableUris": ["200"],
  "POST /discoveries/{discoveryId}/specialFilesUploadInfo:generate": ["200", "202"],
  "GET /discoveries/{discoveryId}/specialFilesUploadInfo:generate": ["200", "202"],
  "GET /discoveries/{discoveryId}/uploads": ["200"],
  "PUT /uploads/{uploadId}": ["200", "201"],
  "GET /uploads/{uploadId}": ["200"],
  "POST /uploads/{uploadId}:complete": ["200", "202"],
  "GET /uploads/{uploadId}:complete": ["200", "202"],
  "POST /uploads/{uploadId}:cancel": ["200", "202"],
  "GET /uploads/{uploadId}:cancel": ["200", "202"],
  "POST /uploads/{uploadId}/specialFilesUploadInfo:generate": ["200", "202"],
  "GET /uploads/{uploadId}/specialFilesUploadInfo:generate": ["200", "202"],
  "POST /uploads/{uploadId}/specialFilesUploadInfo:listWritableUris": ["200"],
  "POST /uploads/{uploadId}/dataFilesUploadInfo:generate": ["200", "202"],
  "GET /uploads/{uploadId}/dataFilesUploadInfo:generate": ["200", "202"],
  "POST /uploads/{uploadId}/dataFilesUploadInfo:listWritableUris": ["200"],
  "GET /uploads/{uploadId}/measurements": ["200"],
  "GET /classificationSchemas/{name}": ["200"],
  "DELETE /classificationSchemas/{name}": ["202", "204"],
  "POST /classificationSchemas": ["200", "202"],
  "GET /classificationSchemas": ["200"],
  "GET /measurements/{measurementId}": ["200"],
  "DELETE /measurements/{measurementId}": ["202", "204"],
  "GET /measurements": ["200"],
  "POST /measurements:queryMeasurementsWithMetadata": ["200"],
  "POST /measurements:findByIds": ["200"],
  "GET /measurements/{measurementId}/metadata": ["200"],
  "GET /measurements/{measurementId}/processingResults": ["200"],
  "GET /measurements/{measurementId}/stateMachines/{id}": ["200"],
  "GET /measurements/{measurementId}/stateMachines": ["200"],
  "POST /measurements/{measurementId}/stateMachines/{id}:act": ["200", "202"],
  "GET /measurements/{measurementId}/stateMachines/{id}:act": ["200", "202"],
  "GET /measurements/{measurementId}/metadataSchemaFileInfo": ["200"],
  "GET /measurements/{measurementId}/classifications/{schemaName}": ["200"],
  "DELETE /measurements/{measurementId}/classifications/{schemaName}": ["202", "204"],
  "GET /measurements/{measurementId}/classifications": ["200"],
  "POST /measurements/{measurementId}/classifications": ["200", "202"],
  "POST /measurements/{measurementId}/dataStreams": ["200", "202"],
  "GET /measurements/{measurementId}/dataStreams": ["200"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}": ["200"],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}:clearContent": ["200", "202"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}:clearContent": ["200", "202"],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}:stageFiles": ["200"],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}:complete": ["200", "202"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}:complete": ["200", "202"],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}:fail": ["200", "202"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}:fail": ["200", "202"],
  "POST /measurements/{measurementId}/dataStreams:findByTags": ["200"],
  "POST /measurements/{measurementId}/dataStreams:findByLineage": ["200"],
  "POST /measurements/{measurementId}/dataStreams:getLineageGraphsByLineage": ["200"],
  "PUT /measurements/{measurementId}/dataStreams/{dataStreamId}/storage": ["200", "201"],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}/storage:getWithWritableUris": [
    "200",
  ],
  "PUT /measurements/{measurementId}/dataStreams/{dataStreamId}/tags": ["200", "201"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}/tags": ["200"],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}/files:generate": ["200", "202"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}/files:generate": ["200", "202"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}/files": ["200"],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}/logs:getWritableUri": ["200"],
};

export function isUnexpected(
  response: GetLongRunning200Response | GetLongRunningDefaultResponse
): response is GetLongRunningDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrReplaceDiscovery200Response
    | CreateOrReplaceDiscovery201Response
    | CreateOrReplaceDiscoveryDefaultResponse
): response is CreateOrReplaceDiscoveryDefaultResponse;
export function isUnexpected(
  response: GetDiscovery200Response | GetDiscoveryDefaultResponse
): response is GetDiscoveryDefaultResponse;
export function isUnexpected(
  response:
    | CompleteDiscovery200Response
    | CompleteDiscovery202Response
    | CompleteDiscoveryDefaultResponse
): response is CompleteDiscoveryDefaultResponse;
export function isUnexpected(
  response: CancelDiscovery200Response | CancelDiscovery202Response | CancelDiscoveryDefaultResponse
): response is CancelDiscoveryDefaultResponse;
export function isUnexpected(
  response:
    | GetDiscoverySpecialFileUploadLocations200Response
    | GetDiscoverySpecialFileUploadLocationsDefaultResponse
): response is GetDiscoverySpecialFileUploadLocationsDefaultResponse;
export function isUnexpected(
  response:
    | GenerateDiscoverySpecialFileUploadLocations200Response
    | GenerateDiscoverySpecialFileUploadLocations202Response
    | GenerateDiscoverySpecialFileUploadLocationsDefaultResponse
): response is GenerateDiscoverySpecialFileUploadLocationsDefaultResponse;
export function isUnexpected(
  response: GetAllDiscoveryUploads200Response | GetAllDiscoveryUploadsDefaultResponse
): response is GetAllDiscoveryUploadsDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrReplaceUpload200Response
    | CreateOrReplaceUpload201Response
    | CreateOrReplaceUploadDefaultResponse
): response is CreateOrReplaceUploadDefaultResponse;
export function isUnexpected(
  response: GetUpload200Response | GetUploadDefaultResponse
): response is GetUploadDefaultResponse;
export function isUnexpected(
  response: CompleteUpload200Response | CompleteUpload202Response | CompleteUploadDefaultResponse
): response is CompleteUploadDefaultResponse;
export function isUnexpected(
  response: CancelUpload200Response | CancelUpload202Response | CancelUploadDefaultResponse
): response is CancelUploadDefaultResponse;
export function isUnexpected(
  response:
    | GenerateUploadSpecialFiles200Response
    | GenerateUploadSpecialFiles202Response
    | GenerateUploadSpecialFilesDefaultResponse
): response is GenerateUploadSpecialFilesDefaultResponse;
export function isUnexpected(
  response: GetUploadSpecialFiles200Response | GetUploadSpecialFilesDefaultResponse
): response is GetUploadSpecialFilesDefaultResponse;
export function isUnexpected(
  response:
    | GenerateUploadDataFiles200Response
    | GenerateUploadDataFiles202Response
    | GenerateUploadDataFilesDefaultResponse
): response is GenerateUploadDataFilesDefaultResponse;
export function isUnexpected(
  response: GetUploadDataFiles200Response | GetUploadDataFilesDefaultResponse
): response is GetUploadDataFilesDefaultResponse;
export function isUnexpected(
  response: ListMeasurements200Response | ListMeasurementsDefaultResponse
): response is ListMeasurementsDefaultResponse;
export function isUnexpected(
  response: GetClassificationSchema200Response | GetClassificationSchemaDefaultResponse
): response is GetClassificationSchemaDefaultResponse;
export function isUnexpected(
  response:
    | DeleteClassificationSchema202Response
    | DeleteClassificationSchema204Response
    | DeleteClassificationSchemaDefaultResponse
): response is DeleteClassificationSchemaDefaultResponse;
export function isUnexpected(
  response:
    | CreateClassificationSchema200Response
    | CreateClassificationSchema202Response
    | CreateClassificationSchemaDefaultResponse
): response is CreateClassificationSchemaDefaultResponse;
export function isUnexpected(
  response: GetClassificationSchemas200Response | GetClassificationSchemasDefaultResponse
): response is GetClassificationSchemasDefaultResponse;
export function isUnexpected(
  response: GetMeasurement200Response | GetMeasurementDefaultResponse
): response is GetMeasurementDefaultResponse;
export function isUnexpected(
  response:
    | DeleteMeasurement202Response
    | DeleteMeasurement204Response
    | DeleteMeasurementDefaultResponse
): response is DeleteMeasurementDefaultResponse;
export function isUnexpected(
  response: GetMeasurements200Response | GetMeasurementsDefaultResponse
): response is GetMeasurementsDefaultResponse;
export function isUnexpected(
  response: GetMeasurementsWithMetadata200Response | GetMeasurementsWithMetadataDefaultResponse
): response is GetMeasurementsWithMetadataDefaultResponse;
export function isUnexpected(
  response: GetMeasurementsByIds200Response | GetMeasurementsByIdsDefaultResponse
): response is GetMeasurementsByIdsDefaultResponse;
export function isUnexpected(
  response: GetMeasurementMetadata200Response | GetMeasurementMetadataDefaultResponse
): response is GetMeasurementMetadataDefaultResponse;
export function isUnexpected(
  response:
    | GetMeasurementProcessingResults200Response
    | GetMeasurementProcessingResultsDefaultResponse
): response is GetMeasurementProcessingResultsDefaultResponse;
export function isUnexpected(
  response: GetMeasurementStateMachine200Response | GetMeasurementStateMachineDefaultResponse
): response is GetMeasurementStateMachineDefaultResponse;
export function isUnexpected(
  response: GetMeasurementStateMachines200Response | GetMeasurementStateMachinesDefaultResponse
): response is GetMeasurementStateMachinesDefaultResponse;
export function isUnexpected(
  response:
    | ActMeasurementStateMachine200Response
    | ActMeasurementStateMachine202Response
    | ActMeasurementStateMachineDefaultResponse
): response is ActMeasurementStateMachineDefaultResponse;
export function isUnexpected(
  response:
    | GetMeasurementMetadataSchemaFileInfo200Response
    | GetMeasurementMetadataSchemaFileInfoDefaultResponse
): response is GetMeasurementMetadataSchemaFileInfoDefaultResponse;
export function isUnexpected(
  response: GetMeasurementClassification200Response | GetMeasurementClassificationDefaultResponse
): response is GetMeasurementClassificationDefaultResponse;
export function isUnexpected(
  response:
    | DeleteMeasurementClassification202Response
    | DeleteMeasurementClassification204Response
    | DeleteMeasurementClassificationDefaultResponse
): response is DeleteMeasurementClassificationDefaultResponse;
export function isUnexpected(
  response: GetMeasurementClassifications200Response | GetMeasurementClassificationsDefaultResponse
): response is GetMeasurementClassificationsDefaultResponse;
export function isUnexpected(
  response:
    | CreateMeasurementClassification200Response
    | CreateMeasurementClassification202Response
    | CreateMeasurementClassificationDefaultResponse
): response is CreateMeasurementClassificationDefaultResponse;
export function isUnexpected(
  response:
    | CreateDataStream200Response
    | CreateDataStream202Response
    | CreateDataStreamDefaultResponse
): response is CreateDataStreamDefaultResponse;
export function isUnexpected(
  response: GetAllDataStream200Response | GetAllDataStreamDefaultResponse
): response is GetAllDataStreamDefaultResponse;
export function isUnexpected(
  response: GetDataStream200Response | GetDataStreamDefaultResponse
): response is GetDataStreamDefaultResponse;
export function isUnexpected(
  response:
    | ClearContentOfDataStream200Response
    | ClearContentOfDataStream202Response
    | ClearContentOfDataStreamDefaultResponse
): response is ClearContentOfDataStreamDefaultResponse;
export function isUnexpected(
  response: StageFilesForDataStream200Response | StageFilesForDataStreamDefaultResponse
): response is StageFilesForDataStreamDefaultResponse;
export function isUnexpected(
  response:
    | CompleteDataStream200Response
    | CompleteDataStream202Response
    | CompleteDataStreamDefaultResponse
): response is CompleteDataStreamDefaultResponse;
export function isUnexpected(
  response: FailDataStream200Response | FailDataStream202Response | FailDataStreamDefaultResponse
): response is FailDataStreamDefaultResponse;
export function isUnexpected(
  response: GetDataStreamsByTags200Response | GetDataStreamsByTagsDefaultResponse
): response is GetDataStreamsByTagsDefaultResponse;
export function isUnexpected(
  response: GetDataStreamsByLineage200Response | GetDataStreamsByLineageDefaultResponse
): response is GetDataStreamsByLineageDefaultResponse;
export function isUnexpected(
  response:
    | GetDataStreamLineageGraphsByLineage200Response
    | GetDataStreamLineageGraphsByLineageDefaultResponse
): response is GetDataStreamLineageGraphsByLineageDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrReplaceDataStreamStorage200Response
    | CreateOrReplaceDataStreamStorage201Response
    | CreateOrReplaceDataStreamStorageDefaultResponse
): response is CreateOrReplaceDataStreamStorageDefaultResponse;
export function isUnexpected(
  response: GetDataStreamStorage200Response | GetDataStreamStorageDefaultResponse
): response is GetDataStreamStorageDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrReplaceDataStreamTags200Response
    | CreateOrReplaceDataStreamTags201Response
    | CreateOrReplaceDataStreamTagsDefaultResponse
): response is CreateOrReplaceDataStreamTagsDefaultResponse;
export function isUnexpected(
  response: GetDataStreamTags200Response | GetDataStreamTagsDefaultResponse
): response is GetDataStreamTagsDefaultResponse;
export function isUnexpected(
  response:
    | GenerateDataStreamFiles200Response
    | GenerateDataStreamFiles202Response
    | GenerateDataStreamFilesDefaultResponse
): response is GenerateDataStreamFilesDefaultResponse;
export function isUnexpected(
  response: GetDataStreamFiles200Response | GetDataStreamFilesDefaultResponse
): response is GetDataStreamFilesDefaultResponse;
export function isUnexpected(
  response:
    | GetDataStreamLogsContainerLocation200Response
    | GetDataStreamLogsContainerLocationDefaultResponse
): response is GetDataStreamLogsContainerLocationDefaultResponse;
export function isUnexpected(
  response:
    | GetLongRunning200Response
    | GetLongRunningDefaultResponse
    | CreateOrReplaceDiscovery200Response
    | CreateOrReplaceDiscovery201Response
    | CreateOrReplaceDiscoveryDefaultResponse
    | GetDiscovery200Response
    | GetDiscoveryDefaultResponse
    | CompleteDiscovery200Response
    | CompleteDiscovery202Response
    | CompleteDiscoveryDefaultResponse
    | CancelDiscovery200Response
    | CancelDiscovery202Response
    | CancelDiscoveryDefaultResponse
    | GetDiscoverySpecialFileUploadLocations200Response
    | GetDiscoverySpecialFileUploadLocationsDefaultResponse
    | GenerateDiscoverySpecialFileUploadLocations200Response
    | GenerateDiscoverySpecialFileUploadLocations202Response
    | GenerateDiscoverySpecialFileUploadLocationsDefaultResponse
    | GetAllDiscoveryUploads200Response
    | GetAllDiscoveryUploadsDefaultResponse
    | CreateOrReplaceUpload200Response
    | CreateOrReplaceUpload201Response
    | CreateOrReplaceUploadDefaultResponse
    | GetUpload200Response
    | GetUploadDefaultResponse
    | CompleteUpload200Response
    | CompleteUpload202Response
    | CompleteUploadDefaultResponse
    | CancelUpload200Response
    | CancelUpload202Response
    | CancelUploadDefaultResponse
    | GenerateUploadSpecialFiles200Response
    | GenerateUploadSpecialFiles202Response
    | GenerateUploadSpecialFilesDefaultResponse
    | GetUploadSpecialFiles200Response
    | GetUploadSpecialFilesDefaultResponse
    | GenerateUploadDataFiles200Response
    | GenerateUploadDataFiles202Response
    | GenerateUploadDataFilesDefaultResponse
    | GetUploadDataFiles200Response
    | GetUploadDataFilesDefaultResponse
    | ListMeasurements200Response
    | ListMeasurementsDefaultResponse
    | GetClassificationSchema200Response
    | GetClassificationSchemaDefaultResponse
    | DeleteClassificationSchema202Response
    | DeleteClassificationSchema204Response
    | DeleteClassificationSchemaDefaultResponse
    | CreateClassificationSchema200Response
    | CreateClassificationSchema202Response
    | CreateClassificationSchemaDefaultResponse
    | GetClassificationSchemas200Response
    | GetClassificationSchemasDefaultResponse
    | GetMeasurement200Response
    | GetMeasurementDefaultResponse
    | DeleteMeasurement202Response
    | DeleteMeasurement204Response
    | DeleteMeasurementDefaultResponse
    | GetMeasurements200Response
    | GetMeasurementsDefaultResponse
    | GetMeasurementsWithMetadata200Response
    | GetMeasurementsWithMetadataDefaultResponse
    | GetMeasurementsByIds200Response
    | GetMeasurementsByIdsDefaultResponse
    | GetMeasurementMetadata200Response
    | GetMeasurementMetadataDefaultResponse
    | GetMeasurementProcessingResults200Response
    | GetMeasurementProcessingResultsDefaultResponse
    | GetMeasurementStateMachine200Response
    | GetMeasurementStateMachineDefaultResponse
    | GetMeasurementStateMachines200Response
    | GetMeasurementStateMachinesDefaultResponse
    | ActMeasurementStateMachine200Response
    | ActMeasurementStateMachine202Response
    | ActMeasurementStateMachineDefaultResponse
    | GetMeasurementMetadataSchemaFileInfo200Response
    | GetMeasurementMetadataSchemaFileInfoDefaultResponse
    | GetMeasurementClassification200Response
    | GetMeasurementClassificationDefaultResponse
    | DeleteMeasurementClassification202Response
    | DeleteMeasurementClassification204Response
    | DeleteMeasurementClassificationDefaultResponse
    | GetMeasurementClassifications200Response
    | GetMeasurementClassificationsDefaultResponse
    | CreateMeasurementClassification200Response
    | CreateMeasurementClassification202Response
    | CreateMeasurementClassificationDefaultResponse
    | CreateDataStream200Response
    | CreateDataStream202Response
    | CreateDataStreamDefaultResponse
    | GetAllDataStream200Response
    | GetAllDataStreamDefaultResponse
    | GetDataStream200Response
    | GetDataStreamDefaultResponse
    | ClearContentOfDataStream200Response
    | ClearContentOfDataStream202Response
    | ClearContentOfDataStreamDefaultResponse
    | StageFilesForDataStream200Response
    | StageFilesForDataStreamDefaultResponse
    | CompleteDataStream200Response
    | CompleteDataStream202Response
    | CompleteDataStreamDefaultResponse
    | FailDataStream200Response
    | FailDataStream202Response
    | FailDataStreamDefaultResponse
    | GetDataStreamsByTags200Response
    | GetDataStreamsByTagsDefaultResponse
    | GetDataStreamsByLineage200Response
    | GetDataStreamsByLineageDefaultResponse
    | GetDataStreamLineageGraphsByLineage200Response
    | GetDataStreamLineageGraphsByLineageDefaultResponse
    | CreateOrReplaceDataStreamStorage200Response
    | CreateOrReplaceDataStreamStorage201Response
    | CreateOrReplaceDataStreamStorageDefaultResponse
    | GetDataStreamStorage200Response
    | GetDataStreamStorageDefaultResponse
    | CreateOrReplaceDataStreamTags200Response
    | CreateOrReplaceDataStreamTags201Response
    | CreateOrReplaceDataStreamTagsDefaultResponse
    | GetDataStreamTags200Response
    | GetDataStreamTagsDefaultResponse
    | GenerateDataStreamFiles200Response
    | GenerateDataStreamFiles202Response
    | GenerateDataStreamFilesDefaultResponse
    | GetDataStreamFiles200Response
    | GetDataStreamFilesDefaultResponse
    | GetDataStreamLogsContainerLocation200Response
    | GetDataStreamLogsContainerLocationDefaultResponse
): response is
  | GetLongRunningDefaultResponse
  | CreateOrReplaceDiscoveryDefaultResponse
  | GetDiscoveryDefaultResponse
  | CompleteDiscoveryDefaultResponse
  | CancelDiscoveryDefaultResponse
  | GetDiscoverySpecialFileUploadLocationsDefaultResponse
  | GenerateDiscoverySpecialFileUploadLocationsDefaultResponse
  | GetAllDiscoveryUploadsDefaultResponse
  | CreateOrReplaceUploadDefaultResponse
  | GetUploadDefaultResponse
  | CompleteUploadDefaultResponse
  | CancelUploadDefaultResponse
  | GenerateUploadSpecialFilesDefaultResponse
  | GetUploadSpecialFilesDefaultResponse
  | GenerateUploadDataFilesDefaultResponse
  | GetUploadDataFilesDefaultResponse
  | ListMeasurementsDefaultResponse
  | GetClassificationSchemaDefaultResponse
  | DeleteClassificationSchemaDefaultResponse
  | CreateClassificationSchemaDefaultResponse
  | GetClassificationSchemasDefaultResponse
  | GetMeasurementDefaultResponse
  | DeleteMeasurementDefaultResponse
  | GetMeasurementsDefaultResponse
  | GetMeasurementsWithMetadataDefaultResponse
  | GetMeasurementsByIdsDefaultResponse
  | GetMeasurementMetadataDefaultResponse
  | GetMeasurementProcessingResultsDefaultResponse
  | GetMeasurementStateMachineDefaultResponse
  | GetMeasurementStateMachinesDefaultResponse
  | ActMeasurementStateMachineDefaultResponse
  | GetMeasurementMetadataSchemaFileInfoDefaultResponse
  | GetMeasurementClassificationDefaultResponse
  | DeleteMeasurementClassificationDefaultResponse
  | GetMeasurementClassificationsDefaultResponse
  | CreateMeasurementClassificationDefaultResponse
  | CreateDataStreamDefaultResponse
  | GetAllDataStreamDefaultResponse
  | GetDataStreamDefaultResponse
  | ClearContentOfDataStreamDefaultResponse
  | StageFilesForDataStreamDefaultResponse
  | CompleteDataStreamDefaultResponse
  | FailDataStreamDefaultResponse
  | GetDataStreamsByTagsDefaultResponse
  | GetDataStreamsByLineageDefaultResponse
  | GetDataStreamLineageGraphsByLineageDefaultResponse
  | CreateOrReplaceDataStreamStorageDefaultResponse
  | GetDataStreamStorageDefaultResponse
  | CreateOrReplaceDataStreamTagsDefaultResponse
  | GetDataStreamTagsDefaultResponse
  | GenerateDataStreamFilesDefaultResponse
  | GetDataStreamFilesDefaultResponse
  | GetDataStreamLogsContainerLocationDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || ""
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
