// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import colors from "colors/safe";
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
    console.log();
    if (response.canOverride) return true;
    // eslint-disable-next-line no-return-await
    if (!response.confirmationForExit) return await this.checkIfServiceConfigCanBeAdded();

    console.log(colors.yellow(Messages.SETUP_PROCESS_EXIT_MESSAGE));
    return false;
  };

  private promptOnCancel = (): never => {
    process.exit(0);
  };

  private isServiceConfigFileAlreadyPresent = (): boolean => {
    return fs.existsSync(this.getServiceConfigFileName());
  };

  private displayAdditionalInformation = (): void => {
    const runCommand = this._packageManager.runCommand(
      "playwright",
      `test -c ${this.getServiceConfigFileName()}`,
    );
    const runCommandParallelWorkers = this._packageManager.runCommand(
      "playwright",
      `test -c ${this.getServiceConfigFileName()} --workers=20`,
    );

    console.log();

    console.log(`\nTo run playwrights tests using Playwright Service\n`);
    console.log(`\t${colors.cyan(`${runCommand}`)}\n`);

    console.log(`\nTo run playwrights tests using Playwright Service with high parallelism\n`);
    console.log(`\t${colors.cyan(`${runCommandParallelWorkers}`)}\n`);
    console.log();

    console.log("Playwright Service Portal - https://playwright.microsoft.com/");
    console.log("Getting Started - https://aka.ms/mpt/quickstart");
    console.log();
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
    console.log(
      `${colors.green("Success! ")} Created service configuration file - ${serviceConfigFile}`,
    );
  };

  private getServiceConfigContent = (): string => {
    const customerConfigFileName = getFileReferenceForImport(
      this._setupConfig.playwrightConfigFile,
    );

    const importCommandTypeScript = `import { defineConfig } from '@playwright/test';
import { getServiceConfig } from '@azure/microsoft-playwright-testing';
import config from '${customerConfigFileName}';
`;

    const importCommandJavaScript = `const { defineConfig } = require('@playwright/test');
const { getServiceConfig } = require('@azure/microsoft-playwright-testing');
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
export default defineConfig(config, getServiceConfig(config), {
	/* Service reporter is added by default. This will override any reporter options specified in the base playwright config */
	reporter: [['@azure/microsoft-playwright-testing/reporter']]
});
`;

    return content;
  };

  private getServiceConfigFileName = (): string => {
    return "playwright.service.config" + Extensions[this._setupConfig.projectLanguage];
  };
}
