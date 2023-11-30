// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  AssistantCreationOptions,
  Assistant,
  ListResponseOf,
  AssistantModificationOptions,
  AssistantDeletionStatus,
  AssistantFile,
  AssistantFileDeletionStatus,
} from "../../models/models.js";
import {
  createAssistant,
  listAssistants,
  retrieveAssistant,
  modifyAssistant,
  deleteAssistant,
  createAssistantFile,
  listAssistantFiles,
  retrieveAssistantFile,
  deleteAssistantFile,
} from "../../api/assistants/index.js";
import {
  AssistantsCreateAssistantOptions,
  AssistantsListAssistantsOptions,
  AssistantsRetrieveAssistantOptions,
  AssistantsModifyAssistantOptions,
  AssistantsDeleteAssistantOptions,
  AssistantsCreateAssistantFileOptions,
  AssistantsListAssistantFilesOptions,
  AssistantsRetrieveAssistantFileOptions,
  AssistantsDeleteAssistantFileOptions,
} from "../../models/options.js";

export interface AssistantsOperations {
  createAssistant: (
    body: AssistantCreationOptions,
    options?: AssistantsCreateAssistantOptions
  ) => Promise<Assistant>;
  listAssistants: (
    options?: AssistantsListAssistantsOptions
  ) => Promise<ListResponseOf>;
  retrieveAssistant: (
    assistantId: string,
    options?: AssistantsRetrieveAssistantOptions
  ) => Promise<Assistant>;
  modifyAssistant: (
    assistantId: string,
    modificationOptions: AssistantModificationOptions,
    options?: AssistantsModifyAssistantOptions
  ) => Promise<Assistant>;
  deleteAssistant: (
    assistantId: string,
    options?: AssistantsDeleteAssistantOptions
  ) => Promise<AssistantDeletionStatus>;
  createAssistantFile: (
    assistantId: string,
    fileId: string,
    options?: AssistantsCreateAssistantFileOptions
  ) => Promise<AssistantFile>;
  listAssistantFiles: (
    assistantId: string,
    options?: AssistantsListAssistantFilesOptions
  ) => Promise<ListResponseOf>;
  retrieveAssistantFile: (
    assistantId: string,
    fileId: string,
    options?: AssistantsRetrieveAssistantFileOptions
  ) => Promise<AssistantFile>;
  deleteAssistantFile: (
    assistantId: string,
    fileId: string,
    options?: AssistantsDeleteAssistantFileOptions
  ) => Promise<AssistantFileDeletionStatus>;
}

export function getAssistants(context: AssistantsContext) {
  return {
    createAssistant: (
      body: AssistantCreationOptions,
      options?: AssistantsCreateAssistantOptions
    ) => createAssistant(context, body, options),
    listAssistants: (options?: AssistantsListAssistantsOptions) =>
      listAssistants(context, options),
    retrieveAssistant: (
      assistantId: string,
      options?: AssistantsRetrieveAssistantOptions
    ) => retrieveAssistant(context, assistantId, options),
    modifyAssistant: (
      assistantId: string,
      modificationOptions: AssistantModificationOptions,
      options?: AssistantsModifyAssistantOptions
    ) => modifyAssistant(context, assistantId, modificationOptions, options),
    deleteAssistant: (
      assistantId: string,
      options?: AssistantsDeleteAssistantOptions
    ) => deleteAssistant(context, assistantId, options),
    createAssistantFile: (
      assistantId: string,
      fileId: string,
      options?: AssistantsCreateAssistantFileOptions
    ) => createAssistantFile(context, assistantId, fileId, options),
    listAssistantFiles: (
      assistantId: string,
      options?: AssistantsListAssistantFilesOptions
    ) => listAssistantFiles(context, assistantId, options),
    retrieveAssistantFile: (
      assistantId: string,
      fileId: string,
      options?: AssistantsRetrieveAssistantFileOptions
    ) => retrieveAssistantFile(context, assistantId, fileId, options),
    deleteAssistantFile: (
      assistantId: string,
      fileId: string,
      options?: AssistantsDeleteAssistantFileOptions
    ) => deleteAssistantFile(context, assistantId, fileId, options),
  };
}

export function getAssistantsOperations(
  context: AssistantsContext
): AssistantsOperations {
  return {
    ...getAssistants(context),
  };
}
