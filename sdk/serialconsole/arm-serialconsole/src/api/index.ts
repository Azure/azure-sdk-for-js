// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  MicrosoftSerialConsoleContext,
  MicrosoftSerialConsoleClientOptionalParams,
} from "./microsoftSerialConsoleContext.js";
export { createMicrosoftSerialConsole } from "./microsoftSerialConsoleContext.js";
export { enableConsole, disableConsole, listOperations, getConsoleStatus } from "./operations.js";
export type {
  EnableConsoleOptionalParams,
  DisableConsoleOptionalParams,
  ListOperationsOptionalParams,
  GetConsoleStatusOptionalParams,
} from "./options.js";
