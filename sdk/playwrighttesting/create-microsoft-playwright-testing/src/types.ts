// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

export type PackageManager = {
  installDevDependencyCommand: (packageName: string) => string;
  runCommand: (command: string, args: string) => string;
};
