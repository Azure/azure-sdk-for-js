// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LongRunningOperationsGetStatus200Response,
  LongRunningOperationsGetStatusDefaultResponse,
  DiscoveryOperationsCreateOrReplace200Response,
  DiscoveryOperationsCreateOrReplace201Response,
  DiscoveryOperationsCreateOrReplaceDefaultResponse,
  DiscoveryOperationsGet200Response,
  DiscoveryOperationsGetDefaultResponse,
  DiscoveryOperationsComplete200Response,
  DiscoveryOperationsComplete202Response,
  DiscoveryOperationsCompleteDefaultResponse,
  DiscoveryOperationsCancel200Response,
  DiscoveryOperationsCancel202Response,
  DiscoveryOperationsCancelDefaultResponse,
  DiscoverySpecialFileOperationsGenerate200Response,
  DiscoverySpecialFileOperationsGenerate202Response,
  DiscoverySpecialFileOperationsGenerateDefaultResponse,
  DiscoverySpecialFileOperationsListWritableUris200Response,
  DiscoverySpecialFileOperationsListWritableUrisDefaultResponse,
  DiscoveryResultUploadOperationsList200Response,
  DiscoveryResultUploadOperationsListDefaultResponse,
  UploadOperationsCreateOrReplace200Response,
  UploadOperationsCreateOrReplace201Response,
  UploadOperationsCreateOrReplaceDefaultResponse,
  UploadOperationsGet200Response,
  UploadOperationsGetDefaultResponse,
  UploadOperationsComplete200Response,
  UploadOperationsComplete202Response,
  UploadOperationsCompleteDefaultResponse,
  UploadOperationsCancel200Response,
  UploadOperationsCancel202Response,
  UploadOperationsCancelDefaultResponse,
  UploadSpecialFileOperationsList200Response,
  UploadSpecialFileOperationsListDefaultResponse,
  UploadSpecialFileOperationsGenerate200Response,
  UploadSpecialFileOperationsGenerate202Response,
  UploadSpecialFileOperationsGenerateDefaultResponse,
  UploadSpecialFileOperationsListWritableUris200Response,
  UploadSpecialFileOperationsListWritableUrisDefaultResponse,
  UploadDataFileOperationsGenerate200Response,
  UploadDataFileOperationsGenerate202Response,
  UploadDataFileOperationsGenerateDefaultResponse,
  UploadDataFileOperationsListWritableUris200Response,
  UploadDataFileOperationsListWritableUrisDefaultResponse,
  UploadResultMeasurementOperationsList200Response,
  UploadResultMeasurementOperationsListDefaultResponse,
  ClassificationSchemaOperationsGet200Response,
  ClassificationSchemaOperationsGetDefaultResponse,
  ClassificationSchemaOperationsDelete202Response,
  ClassificationSchemaOperationsDelete204Response,
  ClassificationSchemaOperationsDeleteDefaultResponse,
  ClassificationSchemaOperationsCreate200Response,
  ClassificationSchemaOperationsCreate202Response,
  ClassificationSchemaOperationsCreateDefaultResponse,
  ClassificationSchemaOperationsList200Response,
  ClassificationSchemaOperationsListDefaultResponse,
  MeasurementOperationsGet200Response,
  MeasurementOperationsGetDefaultResponse,
  MeasurementOperationsDelete202Response,
  MeasurementOperationsDelete204Response,
  MeasurementOperationsDeleteDefaultResponse,
  MeasurementOperationsList200Response,
  MeasurementOperationsListDefaultResponse,
  MeasurementOperationsQueryMeasurementsWithMetadata200Response,
  MeasurementOperationsQueryMeasurementsWithMetadataDefaultResponse,
  MeasurementOperationsFindByIds200Response,
  MeasurementOperationsFindByIdsDefaultResponse,
  MeasurementMetadataOperationsGet200Response,
  MeasurementMetadataOperationsGetDefaultResponse,
  MeasurementProcessingResultsOperationsGet200Response,
  MeasurementProcessingResultsOperationsGetDefaultResponse,
  MeasurementStateMachineOperationsGet200Response,
  MeasurementStateMachineOperationsGetDefaultResponse,
  MeasurementStateMachineOperationsList200Response,
  MeasurementStateMachineOperationsListDefaultResponse,
  MeasurementStateMachineOperationsAct200Response,
  MeasurementStateMachineOperationsAct202Response,
  MeasurementStateMachineOperationsActDefaultResponse,
  MeasurementMetadataFileInfoOperationsComplete200Response,
  MeasurementMetadataFileInfoOperationsComplete202Response,
  MeasurementMetadataFileInfoOperationsCompleteDefaultResponse,
  MeasurementMetadataFileInfoOperationsGetWritableUri200Response,
  MeasurementMetadataFileInfoOperationsGetWritableUriDefaultResponse,
  MeasurementMetadataSchemaFileInfoOperationsGet200Response,
  MeasurementMetadataSchemaFileInfoOperationsGetDefaultResponse,
  MeasurementClassificationOperationsGet200Response,
  MeasurementClassificationOperationsGetDefaultResponse,
  MeasurementClassificationOperationsDelete202Response,
  MeasurementClassificationOperationsDelete204Response,
  MeasurementClassificationOperationsDeleteDefaultResponse,
  MeasurementClassificationOperationsCreate200Response,
  MeasurementClassificationOperationsCreate202Response,
  MeasurementClassificationOperationsCreateDefaultResponse,
  MeasurementClassificationOperationsList200Response,
  MeasurementClassificationOperationsListDefaultResponse,
  DataStreamOperationsGet200Response,
  DataStreamOperationsGetDefaultResponse,
  DataStreamOperationsCreate200Response,
  DataStreamOperationsCreate202Response,
  DataStreamOperationsCreateDefaultResponse,
  DataStreamOperationsList200Response,
  DataStreamOperationsListDefaultResponse,
  DataStreamOperationsClearContent200Response,
  DataStreamOperationsClearContent202Response,
  DataStreamOperationsClearContentDefaultResponse,
  DataStreamOperationsStageFiles200Response,
  DataStreamOperationsStageFilesDefaultResponse,
  DataStreamOperationsComplete200Response,
  DataStreamOperationsComplete202Response,
  DataStreamOperationsCompleteDefaultResponse,
  DataStreamOperationsFail200Response,
  DataStreamOperationsFail202Response,
  DataStreamOperationsFailDefaultResponse,
  DataStreamOperationsFindByTags200Response,
  DataStreamOperationsFindByTagsDefaultResponse,
  DataStreamOperationsFindByLineage200Response,
  DataStreamOperationsFindByLineageDefaultResponse,
  DataStreamOperationsGetLineageGraphsByLineage200Response,
  DataStreamOperationsGetLineageGraphsByLineageDefaultResponse,
  DataStreamsStorageOperationsCreate200Response,
  DataStreamsStorageOperationsCreate201Response,
  DataStreamsStorageOperationsCreateDefaultResponse,
  DataStreamsStorageOperationsGetWritableUris200Response,
  DataStreamsStorageOperationsGetWritableUrisDefaultResponse,
  DataStreamTagsOperationsGet200Response,
  DataStreamTagsOperationsGetDefaultResponse,
  DataStreamTagsOperationsCreate200Response,
  DataStreamTagsOperationsCreate201Response,
  DataStreamTagsOperationsCreateDefaultResponse,
  DataStreamFileOperationsList200Response,
  DataStreamFileOperationsListDefaultResponse,
  DataStreamFileOperationsGenerate200Response,
  DataStreamFileOperationsGenerate202Response,
  DataStreamFileOperationsGenerateDefaultResponse,
  DataStreamLogsContainerOperationsGetWritableUri200Response,
  DataStreamLogsContainerOperationsGetWritableUriDefaultResponse,
  DataStreamClassificationOperationsGet200Response,
  DataStreamClassificationOperationsGetDefaultResponse,
  DataStreamClassificationOperationsDelete202Response,
  DataStreamClassificationOperationsDelete204Response,
  DataStreamClassificationOperationsDeleteDefaultResponse,
  DataStreamClassificationOperationsCreate200Response,
  DataStreamClassificationOperationsCreate202Response,
  DataStreamClassificationOperationsCreateDefaultResponse,
  DataStreamClassificationOperationsList200Response,
  DataStreamClassificationOperationsListDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /operations/{operationId}": ["200"],
  "PUT /discoveries/{discoveryId}": ["200", "201"],
  "GET /discoveries/{discoveryId}": ["200"],
  "POST /discoveries/{discoveryId}:complete": ["200", "202"],
  "GET /discoveries/{discoveryId}:complete": ["200", "202"],
  "POST /discoveries/{discoveryId}:cancel": ["200", "202"],
  "GET /discoveries/{discoveryId}:cancel": ["200", "202"],
  "POST /discoveries/{discoveryId}/specialFilesUploadInfo:generate": ["200", "202"],
  "GET /discoveries/{discoveryId}/specialFilesUploadInfo:generate": ["200", "202"],
  "POST /discoveries/{discoveryId}/specialFilesUploadInfo:listWritableUris": ["200"],
  "GET /discoveries/{discoveryId}/uploads": ["200"],
  "PUT /uploads/{uploadId}": ["200", "201"],
  "GET /uploads/{uploadId}": ["200"],
  "POST /uploads/{uploadId}:complete": ["200", "202"],
  "GET /uploads/{uploadId}:complete": ["200", "202"],
  "POST /uploads/{uploadId}:cancel": ["200", "202"],
  "GET /uploads/{uploadId}:cancel": ["200", "202"],
  "GET /uploads/{uploadId}/specialFilesUploadInfo": ["200"],
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
  "POST /measurements/{measurementId}/metadataFileInfo:complete": ["200", "202"],
  "GET /measurements/{measurementId}/metadataFileInfo:complete": ["200", "202"],
  "POST /measurements/{measurementId}/metadataFileInfo:getWritableUri": ["200"],
  "GET /measurements/{measurementId}/metadataSchemaFileInfo": ["200"],
  "GET /measurements/{measurementId}/classifications/{schemaName}": ["200"],
  "DELETE /measurements/{measurementId}/classifications/{schemaName}": ["202", "204"],
  "POST /measurements/{measurementId}/classifications": ["200", "202"],
  "GET /measurements/{measurementId}/classifications": ["200"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}": ["200"],
  "POST /measurements/{measurementId}/dataStreams": ["200", "202"],
  "GET /measurements/{measurementId}/dataStreams": ["200"],
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
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}/storage:getWritableUris": ["200"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}/tags": ["200"],
  "PUT /measurements/{measurementId}/dataStreams/{dataStreamId}/tags": ["200", "201"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}/files": ["200"],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}/files:generate": ["200", "202"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}/files:generate": ["200", "202"],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}/logs:getWritableUri": ["200"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}/classifications/{schemaName}": [
    "200",
  ],
  "DELETE /measurements/{measurementId}/dataStreams/{dataStreamId}/classifications/{schemaName}": [
    "202",
    "204",
  ],
  "POST /measurements/{measurementId}/dataStreams/{dataStreamId}/classifications": ["200", "202"],
  "GET /measurements/{measurementId}/dataStreams/{dataStreamId}/classifications": ["200"],
};

export function isUnexpected(
  response:
    | LongRunningOperationsGetStatus200Response
    | LongRunningOperationsGetStatusDefaultResponse
): response is LongRunningOperationsGetStatusDefaultResponse;
export function isUnexpected(
  response:
    | DiscoveryOperationsCreateOrReplace200Response
    | DiscoveryOperationsCreateOrReplace201Response
    | DiscoveryOperationsCreateOrReplaceDefaultResponse
): response is DiscoveryOperationsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: DiscoveryOperationsGet200Response | DiscoveryOperationsGetDefaultResponse
): response is DiscoveryOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | DiscoveryOperationsComplete200Response
    | DiscoveryOperationsComplete202Response
    | DiscoveryOperationsCompleteDefaultResponse
): response is DiscoveryOperationsCompleteDefaultResponse;
export function isUnexpected(
  response:
    | DiscoveryOperationsCancel200Response
    | DiscoveryOperationsCancel202Response
    | DiscoveryOperationsCancelDefaultResponse
): response is DiscoveryOperationsCancelDefaultResponse;
export function isUnexpected(
  response:
    | DiscoverySpecialFileOperationsGenerate200Response
    | DiscoverySpecialFileOperationsGenerate202Response
    | DiscoverySpecialFileOperationsGenerateDefaultResponse
): response is DiscoverySpecialFileOperationsGenerateDefaultResponse;
export function isUnexpected(
  response:
    | DiscoverySpecialFileOperationsListWritableUris200Response
    | DiscoverySpecialFileOperationsListWritableUrisDefaultResponse
): response is DiscoverySpecialFileOperationsListWritableUrisDefaultResponse;
export function isUnexpected(
  response:
    | DiscoveryResultUploadOperationsList200Response
    | DiscoveryResultUploadOperationsListDefaultResponse
): response is DiscoveryResultUploadOperationsListDefaultResponse;
export function isUnexpected(
  response:
    | UploadOperationsCreateOrReplace200Response
    | UploadOperationsCreateOrReplace201Response
    | UploadOperationsCreateOrReplaceDefaultResponse
): response is UploadOperationsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: UploadOperationsGet200Response | UploadOperationsGetDefaultResponse
): response is UploadOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | UploadOperationsComplete200Response
    | UploadOperationsComplete202Response
    | UploadOperationsCompleteDefaultResponse
): response is UploadOperationsCompleteDefaultResponse;
export function isUnexpected(
  response:
    | UploadOperationsCancel200Response
    | UploadOperationsCancel202Response
    | UploadOperationsCancelDefaultResponse
): response is UploadOperationsCancelDefaultResponse;
export function isUnexpected(
  response:
    | UploadSpecialFileOperationsList200Response
    | UploadSpecialFileOperationsListDefaultResponse
): response is UploadSpecialFileOperationsListDefaultResponse;
export function isUnexpected(
  response:
    | UploadSpecialFileOperationsGenerate200Response
    | UploadSpecialFileOperationsGenerate202Response
    | UploadSpecialFileOperationsGenerateDefaultResponse
): response is UploadSpecialFileOperationsGenerateDefaultResponse;
export function isUnexpected(
  response:
    | UploadSpecialFileOperationsListWritableUris200Response
    | UploadSpecialFileOperationsListWritableUrisDefaultResponse
): response is UploadSpecialFileOperationsListWritableUrisDefaultResponse;
export function isUnexpected(
  response:
    | UploadDataFileOperationsGenerate200Response
    | UploadDataFileOperationsGenerate202Response
    | UploadDataFileOperationsGenerateDefaultResponse
): response is UploadDataFileOperationsGenerateDefaultResponse;
export function isUnexpected(
  response:
    | UploadDataFileOperationsListWritableUris200Response
    | UploadDataFileOperationsListWritableUrisDefaultResponse
): response is UploadDataFileOperationsListWritableUrisDefaultResponse;
export function isUnexpected(
  response:
    | UploadResultMeasurementOperationsList200Response
    | UploadResultMeasurementOperationsListDefaultResponse
): response is UploadResultMeasurementOperationsListDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationSchemaOperationsGet200Response
    | ClassificationSchemaOperationsGetDefaultResponse
): response is ClassificationSchemaOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationSchemaOperationsDelete202Response
    | ClassificationSchemaOperationsDelete204Response
    | ClassificationSchemaOperationsDeleteDefaultResponse
): response is ClassificationSchemaOperationsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationSchemaOperationsCreate200Response
    | ClassificationSchemaOperationsCreate202Response
    | ClassificationSchemaOperationsCreateDefaultResponse
): response is ClassificationSchemaOperationsCreateDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationSchemaOperationsList200Response
    | ClassificationSchemaOperationsListDefaultResponse
): response is ClassificationSchemaOperationsListDefaultResponse;
export function isUnexpected(
  response: MeasurementOperationsGet200Response | MeasurementOperationsGetDefaultResponse
): response is MeasurementOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementOperationsDelete202Response
    | MeasurementOperationsDelete204Response
    | MeasurementOperationsDeleteDefaultResponse
): response is MeasurementOperationsDeleteDefaultResponse;
export function isUnexpected(
  response: MeasurementOperationsList200Response | MeasurementOperationsListDefaultResponse
): response is MeasurementOperationsListDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementOperationsQueryMeasurementsWithMetadata200Response
    | MeasurementOperationsQueryMeasurementsWithMetadataDefaultResponse
): response is MeasurementOperationsQueryMeasurementsWithMetadataDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementOperationsFindByIds200Response
    | MeasurementOperationsFindByIdsDefaultResponse
): response is MeasurementOperationsFindByIdsDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementMetadataOperationsGet200Response
    | MeasurementMetadataOperationsGetDefaultResponse
): response is MeasurementMetadataOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementProcessingResultsOperationsGet200Response
    | MeasurementProcessingResultsOperationsGetDefaultResponse
): response is MeasurementProcessingResultsOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementStateMachineOperationsGet200Response
    | MeasurementStateMachineOperationsGetDefaultResponse
): response is MeasurementStateMachineOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementStateMachineOperationsList200Response
    | MeasurementStateMachineOperationsListDefaultResponse
): response is MeasurementStateMachineOperationsListDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementStateMachineOperationsAct200Response
    | MeasurementStateMachineOperationsAct202Response
    | MeasurementStateMachineOperationsActDefaultResponse
): response is MeasurementStateMachineOperationsActDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementMetadataFileInfoOperationsComplete200Response
    | MeasurementMetadataFileInfoOperationsComplete202Response
    | MeasurementMetadataFileInfoOperationsCompleteDefaultResponse
): response is MeasurementMetadataFileInfoOperationsCompleteDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementMetadataFileInfoOperationsGetWritableUri200Response
    | MeasurementMetadataFileInfoOperationsGetWritableUriDefaultResponse
): response is MeasurementMetadataFileInfoOperationsGetWritableUriDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementMetadataSchemaFileInfoOperationsGet200Response
    | MeasurementMetadataSchemaFileInfoOperationsGetDefaultResponse
): response is MeasurementMetadataSchemaFileInfoOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementClassificationOperationsGet200Response
    | MeasurementClassificationOperationsGetDefaultResponse
): response is MeasurementClassificationOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementClassificationOperationsDelete202Response
    | MeasurementClassificationOperationsDelete204Response
    | MeasurementClassificationOperationsDeleteDefaultResponse
): response is MeasurementClassificationOperationsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementClassificationOperationsCreate200Response
    | MeasurementClassificationOperationsCreate202Response
    | MeasurementClassificationOperationsCreateDefaultResponse
): response is MeasurementClassificationOperationsCreateDefaultResponse;
export function isUnexpected(
  response:
    | MeasurementClassificationOperationsList200Response
    | MeasurementClassificationOperationsListDefaultResponse
): response is MeasurementClassificationOperationsListDefaultResponse;
export function isUnexpected(
  response: DataStreamOperationsGet200Response | DataStreamOperationsGetDefaultResponse
): response is DataStreamOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamOperationsCreate200Response
    | DataStreamOperationsCreate202Response
    | DataStreamOperationsCreateDefaultResponse
): response is DataStreamOperationsCreateDefaultResponse;
export function isUnexpected(
  response: DataStreamOperationsList200Response | DataStreamOperationsListDefaultResponse
): response is DataStreamOperationsListDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamOperationsClearContent200Response
    | DataStreamOperationsClearContent202Response
    | DataStreamOperationsClearContentDefaultResponse
): response is DataStreamOperationsClearContentDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamOperationsStageFiles200Response
    | DataStreamOperationsStageFilesDefaultResponse
): response is DataStreamOperationsStageFilesDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamOperationsComplete200Response
    | DataStreamOperationsComplete202Response
    | DataStreamOperationsCompleteDefaultResponse
): response is DataStreamOperationsCompleteDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamOperationsFail200Response
    | DataStreamOperationsFail202Response
    | DataStreamOperationsFailDefaultResponse
): response is DataStreamOperationsFailDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamOperationsFindByTags200Response
    | DataStreamOperationsFindByTagsDefaultResponse
): response is DataStreamOperationsFindByTagsDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamOperationsFindByLineage200Response
    | DataStreamOperationsFindByLineageDefaultResponse
): response is DataStreamOperationsFindByLineageDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamOperationsGetLineageGraphsByLineage200Response
    | DataStreamOperationsGetLineageGraphsByLineageDefaultResponse
): response is DataStreamOperationsGetLineageGraphsByLineageDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamsStorageOperationsCreate200Response
    | DataStreamsStorageOperationsCreate201Response
    | DataStreamsStorageOperationsCreateDefaultResponse
): response is DataStreamsStorageOperationsCreateDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamsStorageOperationsGetWritableUris200Response
    | DataStreamsStorageOperationsGetWritableUrisDefaultResponse
): response is DataStreamsStorageOperationsGetWritableUrisDefaultResponse;
export function isUnexpected(
  response: DataStreamTagsOperationsGet200Response | DataStreamTagsOperationsGetDefaultResponse
): response is DataStreamTagsOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamTagsOperationsCreate200Response
    | DataStreamTagsOperationsCreate201Response
    | DataStreamTagsOperationsCreateDefaultResponse
): response is DataStreamTagsOperationsCreateDefaultResponse;
export function isUnexpected(
  response: DataStreamFileOperationsList200Response | DataStreamFileOperationsListDefaultResponse
): response is DataStreamFileOperationsListDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamFileOperationsGenerate200Response
    | DataStreamFileOperationsGenerate202Response
    | DataStreamFileOperationsGenerateDefaultResponse
): response is DataStreamFileOperationsGenerateDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamLogsContainerOperationsGetWritableUri200Response
    | DataStreamLogsContainerOperationsGetWritableUriDefaultResponse
): response is DataStreamLogsContainerOperationsGetWritableUriDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamClassificationOperationsGet200Response
    | DataStreamClassificationOperationsGetDefaultResponse
): response is DataStreamClassificationOperationsGetDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamClassificationOperationsDelete202Response
    | DataStreamClassificationOperationsDelete204Response
    | DataStreamClassificationOperationsDeleteDefaultResponse
): response is DataStreamClassificationOperationsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamClassificationOperationsCreate200Response
    | DataStreamClassificationOperationsCreate202Response
    | DataStreamClassificationOperationsCreateDefaultResponse
): response is DataStreamClassificationOperationsCreateDefaultResponse;
export function isUnexpected(
  response:
    | DataStreamClassificationOperationsList200Response
    | DataStreamClassificationOperationsListDefaultResponse
): response is DataStreamClassificationOperationsListDefaultResponse;
export function isUnexpected(
  response:
    | LongRunningOperationsGetStatus200Response
    | LongRunningOperationsGetStatusDefaultResponse
    | DiscoveryOperationsCreateOrReplace200Response
    | DiscoveryOperationsCreateOrReplace201Response
    | DiscoveryOperationsCreateOrReplaceDefaultResponse
    | DiscoveryOperationsGet200Response
    | DiscoveryOperationsGetDefaultResponse
    | DiscoveryOperationsComplete200Response
    | DiscoveryOperationsComplete202Response
    | DiscoveryOperationsCompleteDefaultResponse
    | DiscoveryOperationsCancel200Response
    | DiscoveryOperationsCancel202Response
    | DiscoveryOperationsCancelDefaultResponse
    | DiscoverySpecialFileOperationsGenerate200Response
    | DiscoverySpecialFileOperationsGenerate202Response
    | DiscoverySpecialFileOperationsGenerateDefaultResponse
    | DiscoverySpecialFileOperationsListWritableUris200Response
    | DiscoverySpecialFileOperationsListWritableUrisDefaultResponse
    | DiscoveryResultUploadOperationsList200Response
    | DiscoveryResultUploadOperationsListDefaultResponse
    | UploadOperationsCreateOrReplace200Response
    | UploadOperationsCreateOrReplace201Response
    | UploadOperationsCreateOrReplaceDefaultResponse
    | UploadOperationsGet200Response
    | UploadOperationsGetDefaultResponse
    | UploadOperationsComplete200Response
    | UploadOperationsComplete202Response
    | UploadOperationsCompleteDefaultResponse
    | UploadOperationsCancel200Response
    | UploadOperationsCancel202Response
    | UploadOperationsCancelDefaultResponse
    | UploadSpecialFileOperationsList200Response
    | UploadSpecialFileOperationsListDefaultResponse
    | UploadSpecialFileOperationsGenerate200Response
    | UploadSpecialFileOperationsGenerate202Response
    | UploadSpecialFileOperationsGenerateDefaultResponse
    | UploadSpecialFileOperationsListWritableUris200Response
    | UploadSpecialFileOperationsListWritableUrisDefaultResponse
    | UploadDataFileOperationsGenerate200Response
    | UploadDataFileOperationsGenerate202Response
    | UploadDataFileOperationsGenerateDefaultResponse
    | UploadDataFileOperationsListWritableUris200Response
    | UploadDataFileOperationsListWritableUrisDefaultResponse
    | UploadResultMeasurementOperationsList200Response
    | UploadResultMeasurementOperationsListDefaultResponse
    | ClassificationSchemaOperationsGet200Response
    | ClassificationSchemaOperationsGetDefaultResponse
    | ClassificationSchemaOperationsDelete202Response
    | ClassificationSchemaOperationsDelete204Response
    | ClassificationSchemaOperationsDeleteDefaultResponse
    | ClassificationSchemaOperationsCreate200Response
    | ClassificationSchemaOperationsCreate202Response
    | ClassificationSchemaOperationsCreateDefaultResponse
    | ClassificationSchemaOperationsList200Response
    | ClassificationSchemaOperationsListDefaultResponse
    | MeasurementOperationsGet200Response
    | MeasurementOperationsGetDefaultResponse
    | MeasurementOperationsDelete202Response
    | MeasurementOperationsDelete204Response
    | MeasurementOperationsDeleteDefaultResponse
    | MeasurementOperationsList200Response
    | MeasurementOperationsListDefaultResponse
    | MeasurementOperationsQueryMeasurementsWithMetadata200Response
    | MeasurementOperationsQueryMeasurementsWithMetadataDefaultResponse
    | MeasurementOperationsFindByIds200Response
    | MeasurementOperationsFindByIdsDefaultResponse
    | MeasurementMetadataOperationsGet200Response
    | MeasurementMetadataOperationsGetDefaultResponse
    | MeasurementProcessingResultsOperationsGet200Response
    | MeasurementProcessingResultsOperationsGetDefaultResponse
    | MeasurementStateMachineOperationsGet200Response
    | MeasurementStateMachineOperationsGetDefaultResponse
    | MeasurementStateMachineOperationsList200Response
    | MeasurementStateMachineOperationsListDefaultResponse
    | MeasurementStateMachineOperationsAct200Response
    | MeasurementStateMachineOperationsAct202Response
    | MeasurementStateMachineOperationsActDefaultResponse
    | MeasurementMetadataFileInfoOperationsComplete200Response
    | MeasurementMetadataFileInfoOperationsComplete202Response
    | MeasurementMetadataFileInfoOperationsCompleteDefaultResponse
    | MeasurementMetadataFileInfoOperationsGetWritableUri200Response
    | MeasurementMetadataFileInfoOperationsGetWritableUriDefaultResponse
    | MeasurementMetadataSchemaFileInfoOperationsGet200Response
    | MeasurementMetadataSchemaFileInfoOperationsGetDefaultResponse
    | MeasurementClassificationOperationsGet200Response
    | MeasurementClassificationOperationsGetDefaultResponse
    | MeasurementClassificationOperationsDelete202Response
    | MeasurementClassificationOperationsDelete204Response
    | MeasurementClassificationOperationsDeleteDefaultResponse
    | MeasurementClassificationOperationsCreate200Response
    | MeasurementClassificationOperationsCreate202Response
    | MeasurementClassificationOperationsCreateDefaultResponse
    | MeasurementClassificationOperationsList200Response
    | MeasurementClassificationOperationsListDefaultResponse
    | DataStreamOperationsGet200Response
    | DataStreamOperationsGetDefaultResponse
    | DataStreamOperationsCreate200Response
    | DataStreamOperationsCreate202Response
    | DataStreamOperationsCreateDefaultResponse
    | DataStreamOperationsList200Response
    | DataStreamOperationsListDefaultResponse
    | DataStreamOperationsClearContent200Response
    | DataStreamOperationsClearContent202Response
    | DataStreamOperationsClearContentDefaultResponse
    | DataStreamOperationsStageFiles200Response
    | DataStreamOperationsStageFilesDefaultResponse
    | DataStreamOperationsComplete200Response
    | DataStreamOperationsComplete202Response
    | DataStreamOperationsCompleteDefaultResponse
    | DataStreamOperationsFail200Response
    | DataStreamOperationsFail202Response
    | DataStreamOperationsFailDefaultResponse
    | DataStreamOperationsFindByTags200Response
    | DataStreamOperationsFindByTagsDefaultResponse
    | DataStreamOperationsFindByLineage200Response
    | DataStreamOperationsFindByLineageDefaultResponse
    | DataStreamOperationsGetLineageGraphsByLineage200Response
    | DataStreamOperationsGetLineageGraphsByLineageDefaultResponse
    | DataStreamsStorageOperationsCreate200Response
    | DataStreamsStorageOperationsCreate201Response
    | DataStreamsStorageOperationsCreateDefaultResponse
    | DataStreamsStorageOperationsGetWritableUris200Response
    | DataStreamsStorageOperationsGetWritableUrisDefaultResponse
    | DataStreamTagsOperationsGet200Response
    | DataStreamTagsOperationsGetDefaultResponse
    | DataStreamTagsOperationsCreate200Response
    | DataStreamTagsOperationsCreate201Response
    | DataStreamTagsOperationsCreateDefaultResponse
    | DataStreamFileOperationsList200Response
    | DataStreamFileOperationsListDefaultResponse
    | DataStreamFileOperationsGenerate200Response
    | DataStreamFileOperationsGenerate202Response
    | DataStreamFileOperationsGenerateDefaultResponse
    | DataStreamLogsContainerOperationsGetWritableUri200Response
    | DataStreamLogsContainerOperationsGetWritableUriDefaultResponse
    | DataStreamClassificationOperationsGet200Response
    | DataStreamClassificationOperationsGetDefaultResponse
    | DataStreamClassificationOperationsDelete202Response
    | DataStreamClassificationOperationsDelete204Response
    | DataStreamClassificationOperationsDeleteDefaultResponse
    | DataStreamClassificationOperationsCreate200Response
    | DataStreamClassificationOperationsCreate202Response
    | DataStreamClassificationOperationsCreateDefaultResponse
    | DataStreamClassificationOperationsList200Response
    | DataStreamClassificationOperationsListDefaultResponse
): response is
  | LongRunningOperationsGetStatusDefaultResponse
  | DiscoveryOperationsCreateOrReplaceDefaultResponse
  | DiscoveryOperationsGetDefaultResponse
  | DiscoveryOperationsCompleteDefaultResponse
  | DiscoveryOperationsCancelDefaultResponse
  | DiscoverySpecialFileOperationsGenerateDefaultResponse
  | DiscoverySpecialFileOperationsListWritableUrisDefaultResponse
  | DiscoveryResultUploadOperationsListDefaultResponse
  | UploadOperationsCreateOrReplaceDefaultResponse
  | UploadOperationsGetDefaultResponse
  | UploadOperationsCompleteDefaultResponse
  | UploadOperationsCancelDefaultResponse
  | UploadSpecialFileOperationsListDefaultResponse
  | UploadSpecialFileOperationsGenerateDefaultResponse
  | UploadSpecialFileOperationsListWritableUrisDefaultResponse
  | UploadDataFileOperationsGenerateDefaultResponse
  | UploadDataFileOperationsListWritableUrisDefaultResponse
  | UploadResultMeasurementOperationsListDefaultResponse
  | ClassificationSchemaOperationsGetDefaultResponse
  | ClassificationSchemaOperationsDeleteDefaultResponse
  | ClassificationSchemaOperationsCreateDefaultResponse
  | ClassificationSchemaOperationsListDefaultResponse
  | MeasurementOperationsGetDefaultResponse
  | MeasurementOperationsDeleteDefaultResponse
  | MeasurementOperationsListDefaultResponse
  | MeasurementOperationsQueryMeasurementsWithMetadataDefaultResponse
  | MeasurementOperationsFindByIdsDefaultResponse
  | MeasurementMetadataOperationsGetDefaultResponse
  | MeasurementProcessingResultsOperationsGetDefaultResponse
  | MeasurementStateMachineOperationsGetDefaultResponse
  | MeasurementStateMachineOperationsListDefaultResponse
  | MeasurementStateMachineOperationsActDefaultResponse
  | MeasurementMetadataFileInfoOperationsCompleteDefaultResponse
  | MeasurementMetadataFileInfoOperationsGetWritableUriDefaultResponse
  | MeasurementMetadataSchemaFileInfoOperationsGetDefaultResponse
  | MeasurementClassificationOperationsGetDefaultResponse
  | MeasurementClassificationOperationsDeleteDefaultResponse
  | MeasurementClassificationOperationsCreateDefaultResponse
  | MeasurementClassificationOperationsListDefaultResponse
  | DataStreamOperationsGetDefaultResponse
  | DataStreamOperationsCreateDefaultResponse
  | DataStreamOperationsListDefaultResponse
  | DataStreamOperationsClearContentDefaultResponse
  | DataStreamOperationsStageFilesDefaultResponse
  | DataStreamOperationsCompleteDefaultResponse
  | DataStreamOperationsFailDefaultResponse
  | DataStreamOperationsFindByTagsDefaultResponse
  | DataStreamOperationsFindByLineageDefaultResponse
  | DataStreamOperationsGetLineageGraphsByLineageDefaultResponse
  | DataStreamsStorageOperationsCreateDefaultResponse
  | DataStreamsStorageOperationsGetWritableUrisDefaultResponse
  | DataStreamTagsOperationsGetDefaultResponse
  | DataStreamTagsOperationsCreateDefaultResponse
  | DataStreamFileOperationsListDefaultResponse
  | DataStreamFileOperationsGenerateDefaultResponse
  | DataStreamLogsContainerOperationsGetWritableUriDefaultResponse
  | DataStreamClassificationOperationsGetDefaultResponse
  | DataStreamClassificationOperationsDeleteDefaultResponse
  | DataStreamClassificationOperationsCreateDefaultResponse
  | DataStreamClassificationOperationsListDefaultResponse {
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
