// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as PublicParameters from "./parameters.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import {
  convertVectorStoreChunkingStrategyRequest,
  convertVectorStoreDataSource,
} from "./convertModelsToWrite.js";

/**
 * Request options for list requests.
 */
interface ListQueryParameters {
  limit?: number;
  order?: "asc" | "desc";
  after?: string;
  before?: string;
}

export function convertCreateVectorStoreFileBatchParam(
  input: PublicParameters.CreateVectorStoreFileBatchBodyParam,
): GeneratedParameters.CreateVectorStoreFileBatchBodyParam {
  return {
    body: input.body && {
      ...(input.body.fileIds && { file_ids: input.body.fileIds }),
      ...(input.body.dataSources && {
        data_sources: input.body.dataSources.map(convertVectorStoreDataSource),
      }),
      ...(input.body.chunkingStrategy && {
        chunking_strategy: convertVectorStoreChunkingStrategyRequest(input.body.chunkingStrategy),
      }),
    },
  };
}

export function convertCreateVectorStoreFileParam(
  input: PublicParameters.CreateVectorStoreFileBodyParam,
): GeneratedParameters.CreateVectorStoreFileBodyParam {
  return {
    body: input.body && {
      ...(input.body.fileId && { file_id: input.body.fileId }),
      ...(input.body.dataSources && {
        data_sources: input.body.dataSources.map(convertVectorStoreDataSource),
      }),
      ...(input.body.chunkingStrategy && {
        chunking_strategy: convertVectorStoreChunkingStrategyRequest(input.body.chunkingStrategy),
      }),
    },
  };
}

export function convertToListQueryParameters<T extends ListQueryParameters>(
  options: T,
): Record<string, unknown> {
  return {
    ...(options.limit && { limit: options.limit }),
    ...(options.order && { order: options.order }),
    ...(options.after && { after: options.after }),
    ...(options.before && { before: options.before }),
  };
}

export function convertListVectorStoreFileBatchFilesQueryParamProperties(
  options: PublicParameters.ListVectorStoreFileBatchFilesQueryParamProperties,
): GeneratedParameters.ListVectorStoreFileBatchFilesQueryParamProperties {
  return {
    ...convertToListQueryParameters(options),
    ...(options.filter && { filter: options.filter }),
  };
}


interface ListFilesQueryParameters {
  /**
   * The purpose of the file.
   *
   * Possible values: "fine-tune", "fine-tune-results", "assistants", "assistants_output", "batch", "batch_output", "vision"
   */
  purpose?: string;
}
export function convertListFilesParameters<T extends ListFilesQueryParameters>(
  options: T
): Record<string, unknown> {
  return {
    ...(options && { purpose: options.purpose }),
  }
};

export function convertListFilesQueryParamProperties(
  options: PublicParameters.ListFilesQueryParamProperties
): GeneratedParameters.ListFilesQueryParamProperties {
  return {
    ...convertListFilesParameters(options),
    ...(options.purpose && { purpose: options.purpose }),
  }
}
