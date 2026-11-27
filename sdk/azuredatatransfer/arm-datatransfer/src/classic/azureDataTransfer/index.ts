// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext } from "../../api/azureDataTransferContext.js";
import {
  listPipelineMetadata,
  validateSchema,
  listFlowProfiles,
  listApprovedSchemas,
} from "../../api/azureDataTransfer/operations.js";
import type {
  AzureDataTransferListPipelineMetadataOptionalParams,
  AzureDataTransferValidateSchemaOptionalParams,
  AzureDataTransferListFlowProfilesOptionalParams,
  AzureDataTransferListApprovedSchemasOptionalParams,
} from "../../api/azureDataTransfer/options.js";
import type {
  Schema,
  SchemasListResult,
  ListApprovedSchemasRequest,
  ListFlowProfilesRequest,
  FlowProfilesListResult,
  ValidateSchemaResult,
  ListPipelineMetadataRequest,
  ListPipelineMetadataResult,
} from "../../models/models.js";

/** Interface representing a AzureDataTransfer operations. */
export interface AzureDataTransferOperations {
  /** Retrieves the pipeline metadata associated with a specified pipeline. */
  listPipelineMetadata: (
    body: ListPipelineMetadataRequest,
    options?: AzureDataTransferListPipelineMetadataOptionalParams,
  ) => Promise<ListPipelineMetadataResult>;
  /** Validates the structure and content of a schema for use in Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource. */
  validateSchema: (
    schema: Schema,
    options?: AzureDataTransferValidateSchemaOptionalParams,
  ) => Promise<ValidateSchemaResult>;
  /** Retrieves a list of FlowProfile resources associated with a specified pipeline. */
  listFlowProfiles: (
    body: ListFlowProfilesRequest,
    options?: AzureDataTransferListFlowProfilesOptionalParams,
  ) => Promise<FlowProfilesListResult>;
  /** Retrieves the list of approved schemas available for Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource. */
  listApprovedSchemas: (
    pipeline: ListApprovedSchemasRequest,
    options?: AzureDataTransferListApprovedSchemasOptionalParams,
  ) => Promise<SchemasListResult>;
}

function _getAzureDataTransfer(context: AzureDataTransferContext) {
  return {
    listPipelineMetadata: (
      body: ListPipelineMetadataRequest,
      options?: AzureDataTransferListPipelineMetadataOptionalParams,
    ) => listPipelineMetadata(context, body, options),
    validateSchema: (schema: Schema, options?: AzureDataTransferValidateSchemaOptionalParams) =>
      validateSchema(context, schema, options),
    listFlowProfiles: (
      body: ListFlowProfilesRequest,
      options?: AzureDataTransferListFlowProfilesOptionalParams,
    ) => listFlowProfiles(context, body, options),
    listApprovedSchemas: (
      pipeline: ListApprovedSchemasRequest,
      options?: AzureDataTransferListApprovedSchemasOptionalParams,
    ) => listApprovedSchemas(context, pipeline, options),
  };
}

export function _getAzureDataTransferOperations(
  context: AzureDataTransferContext,
): AzureDataTransferOperations {
  return {
    ..._getAzureDataTransfer(context),
  };
}
