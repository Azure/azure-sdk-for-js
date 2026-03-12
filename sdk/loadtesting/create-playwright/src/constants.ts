// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Language } from "./types.js";

export const Languages = {
  TypeScript: "TypeScript" as Language,
  JavaScript: "JavaScript" as Language,
};

export const Extensions = {
  TypeScript: ".ts",
  JavaScript: ".js",
};

export const ErrorMessages = {
  NO_CONFIGURATION_FILE_FOUND:
    "Could not find a playwright configuration file in the current directory. Please use --config parameter to specify the configuration file.",
  UNSUPPORTED_CONFIGURATION_FILE: "The playwright configuration file passed is not supported.",
};

export const Messages = {
  CAN_OVERRIDE_MESSAGE:
    "There's already a playwright workspaces configuration file present. Do you want to overwrite it?",
  CONFIRMATION_FOR_EXIT_MESSAGE:
    "You won't be able to install and setup up the service without overwriting the existing configuration file. Do you still want to exit the setup process?",
  SETUP_PROCESS_EXIT_MESSAGE: "Exiting the service setup process.",
};
