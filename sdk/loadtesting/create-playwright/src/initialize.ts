// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PromptObject } from "prompts";
import prompts from "prompts";
import fs from "node:fs";
import { Extensions, Languages, Messages } from "./constants.js";
import type {
  OverridePromptResponse,
  PackageManager,
  PlaywrightServiceInitConfig,
} from "./types.js";
import { executeCommand, getFileReferenceForImport } from "./utils.js";
import { getPackageManager } from "./packageManager.js";

const questions: PromptObject[] = [
  {
    type: "confirm",
    name: "canOverride",
    message: Messages.CAN_OVERRIDE_MESSAGE,
    initial: true,
  },
  {
    type: (prev: boolean) => (prev ? null : "confirm"),
    name: "confirmationForExit",
    message: Messages.CONFIRMATION_FOR_EXIT_MESSAGE,
    initial: true,
  },
];

export class PlaywrightServiceInitialize {
  private _setupConfig: PlaywrightServiceInitConfig;
  private _packageManager: PackageManager;

  constructor(setupConfig: PlaywrightServiceInitConfig) {
    this._setupConfig = setupConfig;
    this._packageManager = getPackageManager();
  }

  public addServiceSupportToTestSuite = async (): Promise<void> => {
    const canProceedWithServiceInitialization = await this.checkIfServiceConfigCanBeAdded(); // if service config already present, ask user for overwrite permission
    if (!canProceedWithServiceInitialization) return;
    await this.installServicePackage(); // install service packages
    await this.createServiceConfig(); // create service config file
    this.displayAdditionalInformation(); // display additional information
  };

  private checkIfServiceConfigCanBeAdded = async (): Promise<boolean> => {
    if (!this.isServiceConfigFileAlreadyPresent()) return true;
    const response = (await prompts.prompt(questions, {
      onCancel: this.promptOnCancel,
    })) as OverridePromptResponse;
    if (response.canOverride) return true;
    if (!response.confirmationForExit) return this.checkIfServiceConfigCanBeAdded();

    console.log(`\n${Messages.SETUP_PROCESS_EXIT_MESSAGE}`);
    return false;
  };

  private promptOnCancel = (): never => {
    process.exit(0);
  };

  private isServiceConfigFileAlreadyPresent = (): boolean => {
    return fs.existsSync(this.createAzurePlaywrightConfigFileName());
  };

  private displayAdditionalInformation = (): void => {
    const runCommandParallelWorkers = this._packageManager.runCommand(
      "playwright",
      `test -c ${this.createAzurePlaywrightConfigFileName()} --workers=20`,
    );

    console.log(`\n\nTo run playwrights tests using Playwright Workspaces\n`);
    console.log(`\t${runCommandParallelWorkers}\n`);

    console.log("Getting Started - https://aka.ms/pww/docs/quickstart\n");

    console.log(
      "If you're already using the Playwright Workspaces, please review the quickstart guide [https://aka.ms/pww/docs/quickstart] to ensure your tests continue running smoothly.",
    );
  };

  private installServicePackage = async (): Promise<void> => {
    const command = this._packageManager.installDevDependencyCommand(
      "@azure/playwright @azure/identity",
    );
    console.log(`Installing Service package (${command})`);
    await executeCommand(command);
  };

  private createServiceConfig = async (): Promise<void> => {
    const serviceConfigFile = this.createAzurePlaywrightConfigFileName();
    const serviceConfigFileContent = this.createAzurePlaywrightConfigContent();
    await fs.promises.writeFile(serviceConfigFile, serviceConfigFileContent);
    console.log(`Success! Created service configuration file - ${serviceConfigFile}`);
  };

  private createAzurePlaywrightConfigContent = (): string => {
    const customerConfigFileName = getFileReferenceForImport(
      this._setupConfig.playwrightConfigFile,
    );

    const importCommandTypeScript = `import { defineConfig } from '@playwright/test';
import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright';
import { DefaultAzureCredential } from '@azure/identity';
import config from '${customerConfigFileName}';
`;

    const importCommandJavaScript = `const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const config = require('${customerConfigFileName}');
`;

    const importCommand =
      this._setupConfig.projectLanguage === Languages.TypeScript
        ? importCommandTypeScript
        : importCommandJavaScript;

    const content =
      importCommand +
      `
/* Learn more about service configuration at https://aka.ms/pww/docs/config */
export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  })
);
`;
    return content;
  };

  private createAzurePlaywrightConfigFileName = (): string => {
    return "playwright.service.config" + Extensions[this._setupConfig.projectLanguage];
  };
}
