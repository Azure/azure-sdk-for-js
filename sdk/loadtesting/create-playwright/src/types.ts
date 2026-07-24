// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type Language = "TypeScript" | "JavaScript";

export type PlaywrightServiceInitConfig = {
  projectLanguage: Language;
  playwrightConfigFile: string;
};

export type CLIArguments = {
  config: string;
};

export type OverridePromptResponse = {
  canOverride: boolean;
  confirmationForExit: boolean;
};

export type ProcessCommand = {
  command: string;
  args: string[];
};

export type PackageManager = {
  installDevDependencyCommand: (packageNames: string[]) => ProcessCommand;
  runCommand: (command: string, args: string[]) => ProcessCommand;
};
