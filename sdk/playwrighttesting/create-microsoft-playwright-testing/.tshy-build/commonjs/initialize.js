"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaywrightServiceInitialize = void 0;
const tslib_1 = require("tslib");
const prompts_1 = tslib_1.__importDefault(require("prompts"));
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const constants_js_1 = require("./constants.js");
const utils_js_1 = require("./utils.js");
const packageManager_js_1 = require("./packageManager.js");
const questions = [
    {
        type: "confirm",
        name: "canOverride",
        message: constants_js_1.Messages.CAN_OVERRIDE_MESSAGE,
        initial: true,
    },
    {
        type: (prev) => (prev ? null : "confirm"),
        name: "confirmationForExit",
        message: constants_js_1.Messages.CONFIRMATION_FOR_EXIT_MESSAGE,
        initial: true,
    },
];
class PlaywrightServiceInitialize {
    constructor(setupConfig) {
        this.addServiceSupportToTestSuite = async () => {
            const canProceedWithServiceInitialization = await this.checkIfServiceConfigCanBeAdded(); // if service config already present, ask user for overwrite permission
            if (!canProceedWithServiceInitialization)
                return;
            await this.installServicePackage(); // install service packages
            await this.createServiceConfig(); // create service config file
            this.displayAdditionalInformation(); // display additional information
        };
        this.checkIfServiceConfigCanBeAdded = async () => {
            if (!this.isServiceConfigFileAlreadyPresent())
                return true;
            const response = (await prompts_1.default.prompt(questions, {
                onCancel: this.promptOnCancel,
            }));
            if (response.canOverride)
                return true;
            if (!response.confirmationForExit)
                return this.checkIfServiceConfigCanBeAdded();
            console.log(`\n${constants_js_1.Messages.SETUP_PROCESS_EXIT_MESSAGE}`);
            return false;
        };
        this.promptOnCancel = () => {
            process.exit(0);
        };
        this.isServiceConfigFileAlreadyPresent = () => {
            return node_fs_1.default.existsSync(this.getServiceConfigFileName());
        };
        this.displayAdditionalInformation = () => {
            const runCommandParallelWorkers = this._packageManager.runCommand("playwright", `test -c ${this.getServiceConfigFileName()} --workers=20`);
            console.log(`\n\nTo run playwrights tests using Playwright Service\n`);
            console.log(`\t${runCommandParallelWorkers}\n`);
            console.log("\nPlaywright Service Portal - https://playwright.microsoft.com/");
            console.log("Getting Started - https://aka.ms/mpt/quickstart\n");
            console.log("If you're already using the Microsoft Playwright Testing service, please review the quickstart guide [https://aka.ms/mpt/quickstart] to ensure your tests continue running smoothly.");
            console.log("We've introduced changes related to authentication. You'll need to update the new config file to align with these changes.");
        };
        this.installServicePackage = async () => {
            const command = this._packageManager.installDevDependencyCommand("@azure/microsoft-playwright-testing");
            console.log(`Installing Service package (${command})`);
            await (0, utils_js_1.executeCommand)(command);
        };
        this.createServiceConfig = async () => {
            const serviceConfigFile = this.getServiceConfigFileName();
            const serviceConfigFileContent = this.getServiceConfigContent();
            await node_fs_1.default.promises.writeFile(serviceConfigFile, serviceConfigFileContent);
            console.log(`Success! Created service configuration file - ${serviceConfigFile}`);
        };
        this.getServiceConfigContent = () => {
            const customerConfigFileName = (0, utils_js_1.getFileReferenceForImport)(this._setupConfig.playwrightConfigFile);
            const importCommandTypeScript = `import { defineConfig } from '@playwright/test';
import { getServiceConfig, ServiceOS } from '@azure/microsoft-playwright-testing';
import config from '${customerConfigFileName}';
`;
            const importCommandJavaScript = `const { defineConfig } = require('@playwright/test');
const { getServiceConfig, ServiceOS } = require('@azure/microsoft-playwright-testing');
const config = require('${customerConfigFileName}');
`;
            const importCommand = this._setupConfig.projectLanguage === constants_js_1.Languages.TypeScript
                ? importCommandTypeScript
                : importCommandJavaScript;
            const content = importCommand +
                `
/* Learn more about service configuration at https://aka.ms/mpt/config */
export default defineConfig(
  config,
  getServiceConfig(config, {
    exposeNetwork: '<loopback>',
    timeout: 30000,
    os: ServiceOS.LINUX,
    useCloudHostedBrowsers: true // Set to false if you want to only use reporting and not cloud hosted browsers
  }),
  {
    /* 
    Playwright Testing service reporter is added by default.
    This will override any reporter options specified in the base playwright config.
    If you are using more reporters, please update your configuration accordingly.
    */
    reporter: [['list'], ['@azure/microsoft-playwright-testing/reporter']],
  }
);
`;
            return content;
        };
        this.getServiceConfigFileName = () => {
            return "playwright.service.config" + constants_js_1.Extensions[this._setupConfig.projectLanguage];
        };
        this._setupConfig = setupConfig;
        this._packageManager = (0, packageManager_js_1.getPackageManager)();
    }
}
exports.PlaywrightServiceInitialize = PlaywrightServiceInitialize;
//# sourceMappingURL=initialize.js.map