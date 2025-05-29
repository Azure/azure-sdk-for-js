#!/usr/bin/env node
"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const execute_helpers_js_1 = require("./execute-helpers.js");
const execute_configs_js_1 = require("./execute-configs.js");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const generateProject_js_1 = require("../generateProject.js");
const log = console.log;
const white = (msg) => log(chalk_1.default.white(msg));
const green = (msg) => log(chalk_1.default.green(msg));
const red = (msg) => log(chalk_1.default.red(msg));
const gray = (msg) => log(chalk_1.default.gray(msg));
async function main() {
    green("\nThis tool generates code scaffold for custom widgets in the Azure API Management’s developer portal. Learn more at https://aka.ms/apimdocs/portal/customwidgets.\n");
    const getConfig = (0, execute_helpers_js_1.buildGetConfig)(gray, red);
    white("Specify the custom widget configuration.");
    const widgetConfig = await getConfig(execute_configs_js_1.promptWidgetConfig, execute_configs_js_1.validateWidgetConfig);
    white("Specify the Azure API Management service configuration.");
    const serviceInformation = await getConfig(execute_configs_js_1.promptServiceInformation, execute_configs_js_1.validateDeployConfig);
    white("Specify other options");
    const miscConfig = await getConfig(execute_configs_js_1.promptMiscConfig, execute_configs_js_1.validateMiscConfig);
    if (serviceInformation.resourceId[0] === "/") {
        serviceInformation.resourceId = serviceInformation.resourceId.slice(1);
    }
    if (serviceInformation.resourceId.slice(-1) === "/") {
        serviceInformation.resourceId = serviceInformation.resourceId.slice(0, -1);
    }
    if (serviceInformation.apiVersion === "") {
        delete serviceInformation.apiVersion;
    }
    serviceInformation.managementApiEndpoint = (0, execute_configs_js_1.prefixUrlProtocol)(serviceInformation.managementApiEndpoint);
    miscConfig.openUrl = miscConfig.openUrl
        ? (0, execute_configs_js_1.prefixUrlProtocol)(miscConfig.openUrl)
        : miscConfig.openUrl;
    return (0, generateProject_js_1.generateProject)(widgetConfig, serviceInformation, miscConfig)
        .then(() => green("\nThe custom widget’s code scaffold has been successfully generated.\n"))
        .catch(console.error);
}
main()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=execute.js.map