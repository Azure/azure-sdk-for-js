// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import prompts, { PromptObject } from "prompts";
import fs from "fs";
import { Extensions, Languages, Messages } from "./constants";
import { OverridePromptResponse, PackageManager, PlaywrightServiceInitConfig } from "./types";
import { executeCommand, getFileReferenceForImport } from "./utils";
import { getPackageManager } from "./packageManager";

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
    return fs.existsSync(this.getServiceConfigFileName());
  };

  private displayAdditionalInformation = (): void => {
    const runCommandParallelWorkers = this._packageManager.runCommand(
      "playwright",
      `test -c ${this.getServiceConfigFileName()} --workers=20`,
    );

    console.log(`\n\nTo run playwrights tests using Playwright Service\n`);
    console.log(`\t${runCommandParallelWorkers}\n`);

    console.log("\nPlaywright Service Portal - https://playwright.microsoft.com/");
    console.log("Getting Started - https://aka.ms/mpt/quickstart\n");
  };

  private installServicePackage = async (): Promise<void> => {
    const command = this._packageManager.installDevDependencyCommand(
      "@azure/microsoft-playwright-testing",
    );
    console.log(`Installing Service package (${command})`);
    await executeCommand(command);
  };

  private createServiceConfig = async (): Promise<void> => {
    const serviceConfigFile = this.getServiceConfigFileName();
    const serviceConfigFileContent = this.getServiceConfigContent();
    await fs.promises.writeFile(serviceConfigFile, serviceConfigFileContent);
    console.log(`Success! Created service configuration file - ${serviceConfigFile}`);
  };

  private getServiceConfigContent = (): string => {
    const customerConfigFileName = getFileReferenceForImport(
      this._setupConfig.playwrightConfigFile,
    );

    const importCommandTypeScript = `import { defineConfig } from '@playwright/test';
import { getServiceConfig, ServiceOS } from '@azure/microsoft-playwright-testing';
import config from '${customerConfigFileName}';
`;

    const importCommandJavaScript = `const { defineConfig } = require('@playwright/test');
const { getServiceConfig, ServiceOS } = require('@azure/microsoft-playwright-testing');
const config = require('${customerConfigFileName}');
`;

    const importCommand =
      this._setupConfig.projectLanguage === Languages.TypeScript
        ? importCommandTypeScript
        : importCommandJavaScript;

    const content =
      importCommand +
      `
/* Learn more about service configuration at https://aka.ms/mpt/config */
export default defineConfig(
  config,
  getServiceConfig(config, {
    exposeNetwork: '<loopback>',
    timeout: 30000,
    os: ServiceOS.LINUX
  }),
  {
    /* 
    Playwright Testing service reporter is added by default.
    This will override any reporter options specified in the base playwright config.
    If you are using more reporters, please update your configuration accordingly.
    */
    reporter: [["list"], ['@azure/microsoft-playwright-testing/reporter']],
  }
);
`;
    return content;
  };

  private getServiceConfigFileName = (): string => {
    return "playwright.service.config" + Extensions[this._setupConfig.projectLanguage];
  };
}
