// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, HttpResponse, StreamableMethod } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  FileDeletionStatusOutput,
  FileListResponseOutput,
  OpenAIFileOutput,
} from "../customization/outputModels.js";
import type {
  OpenAIFileOutput as WireOpenAIFileOutput,
} from "../generated/src/outputModels.js";
import type { FilePurpose as CustomizedFilePurpose } from "../customization/models.js";
import type {
  DeleteFileOptionalParams,
  GetFileContentOptionalParams,
  GetFileOptionalParams,
  ListFilesOptionalParams,
  UploadFileOptionalParams,
  UploadFileResponse,
} from "./customModels.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import * as ConvertParameters from "../customization/convertParametersToWire.js";
import { randomUUID } from "@azure/core-util";
import { createOpenAIError } from "./openAIError.js";
import type { RunningOperation} from "@azure/core-lro";
import { createHttpPoller, type OperationResponse, type OperationState, type RawRequest } from "@azure/core-lro";
import type { AbortSignalLike } from "@azure/abort-controller";
const expectedStatuses = ["200"];

enum FilePurpose {
  FineTune = "fine-tune",
  FineTuneResults = "fine-tune-results",
  Assistants = "assistants",
  AssistantsOutput = "assistants_output",
  Batch = "batch",
  BatchOutput = "batch_output",
  Vision = "vision",
}

/** Gets a list of previously uploaded files. */
export async function listFiles(
  context: Client,
  options: ListFilesOptionalParams = {},
): Promise<FileListResponseOutput> {
  const listOptions: GeneratedParameters.ListFilesParameters = {
    ...operationOptionsToRequestParameters(options),
    queryParameters: ConvertParameters.convertListFilesQueryParamProperties(options),
  };
  validateListFilesParameters(listOptions);
  const result = await context.path("/files").get(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertFileListResponseOutput(result.body);
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  content: ReadableStream | NodeJS.ReadableStream,
  purpose: CustomizedFilePurpose,
  options: UploadFileOptionalParams = {},
): Promise<UploadFileResponse> {
  const uploadFileOptions: GeneratedParameters.UploadFileParameters = {
    ...operationOptionsToRequestParameters(options),
    body: [
      { name: "file" as const, body: content, filename: options.fileName ?? randomUUID() },
      { name: "purpose" as const, body: purpose },
    ],
    contentType: "multipart/form-data",
  };

  const initialResponse = await context.path("/files").post(uploadFileOptions);
  if (!expectedStatuses.includes(initialResponse.status)) {
    throw createOpenAIError(initialResponse);
  }

  const abortController = new AbortController();
  const poller: RunningOperation<OpenAIFileOutput> = {
    sendInitialRequest: async () => generateLroResponse(initialResponse),
    sendPollRequest: async (_path: string, pollOptions?: { abortSignal?: AbortSignalLike }) => {
      function abortListener(): void {
        abortController.abort();
      }
      const inputAbortSignal = pollOptions?.abortSignal;
      const abortSignal = abortController.signal;
      if (inputAbortSignal?.aborted) {
        abortController.abort();
      } else if (!abortSignal.aborted) {
        inputAbortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
      }
      let response;
      try {
        response = await context
          .path("/files/{fileId}", initialResponse.body.id)
          .get({ ...operationOptionsToRequestParameters(options), abortSignal });
        if (!expectedStatuses.includes(response.status)) {
          throw createOpenAIError(response);
        }
      } finally {
        inputAbortSignal?.removeEventListener("abort", abortListener);
      }
      return generateLroResponse(response);
    },
  }
  
  return {
    ...ConvertFromWire.convertOpenAIFileOutput(initialResponse.body),
    poller: createHttpPoller<OpenAIFileOutput, OperationState<OpenAIFileOutput>>(poller, {
      ...options.pollingOptions,
    }),
  }
}

function generateLroResponse(response: HttpResponse) : OperationResponse<OpenAIFileOutput, RawRequest> {
  const body = response.body as WireOpenAIFileOutput;
  let statusCode;
  // Possible values: "uploaded", "pending", "running", "processed", "error", "deleting", "deleted"
  switch (body.status) {
    case "uploaded":
    case "processed":
      statusCode = 200;
      break;
    case "pending":
    case "running":
      statusCode = 202;
      break;
    default:
      statusCode = 500;
      break;
  }
  const convertedBody = ConvertFromWire.convertOpenAIFileOutput(body);
  return {
    flatResponse: convertedBody,
    rawResponse: {
      ...response,
      statusCode: statusCode,
      body: convertedBody,
    }
  };
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options: DeleteFileOptionalParams = {},
): Promise<FileDeletionStatusOutput> {
  const deleteOptions: GeneratedParameters.ListFilesParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  validateFileId(fileId);
  const result = await context.path("/files/{fileId}", fileId).delete(deleteOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return result.body;
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function getFile(
  context: Client,
  fileId: string,
  options: GetFileOptionalParams = {},
): Promise<OpenAIFileOutput> {
  validateFileId(fileId);
  const getFileOptions: GeneratedParameters.ListFilesParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  const result = await context.path("/files/{fileId}", fileId).get(getFileOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertOpenAIFileOutput(result.body);
}

/** Returns file content. */
export function getFileContent(
  context: Client,
  fileId: string,
  options: GetFileContentOptionalParams = {},
): StreamableMethod<string | Uint8Array> {
  validateFileId(fileId);
  const getFileContentOptions: GeneratedParameters.ListFilesParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  return context.path("/files/{fileId}/content", fileId).get(getFileContentOptions);
}

function validateListFilesParameters(options?: GeneratedParameters.ListFilesParameters): void {
  if (options?.queryParameters?.purpose) {
    if (!Object.values(FilePurpose).includes(options?.queryParameters?.purpose as FilePurpose)) {
      throw new Error(
        "Purpose must be one of 'fine-tune', 'fine-tune-results', 'assistants', 'assistants_output', 'batch', 'batch_output', 'vision'",
      );
    }
  }
}

function validateFileId(fileId: string): void {
  if (!fileId) {
    throw new Error("File ID is required");
  }
}
