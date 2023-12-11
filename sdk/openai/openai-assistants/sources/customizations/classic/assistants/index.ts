// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListResponseOf } from "../../models/models.js";
import {
  AssistantCreationOptions,
  Assistant,
  AssistantModificationOptions,
  AssistantDeletionStatus,
  AssistantFile,
  AssistantFileDeletionStatus,
} from "../../../generated/src/models/models.js";
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
} from "../../../generated/src/models/options.js";

export interface AssistantsOperations {
  createAssistant: (
    body: AssistantCreationOptions,
    options?: AssistantsCreateAssistantOptions
  ) => Promise<Assistant>;
  listAssistants: (
    options?: AssistantsListAssistantsOptions
  ) => Promise<ListResponseOf<Assistant>>;
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
  ) => Promise<ListResponseOf<AssistantFile>>;
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
