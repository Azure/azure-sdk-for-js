"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptMiscConfig = exports.promptServiceInformation = exports.promptWidgetConfig = exports.validateMiscConfig = exports.validateDeployConfig = exports.validateWidgetConfig = exports.prefixUrlProtocol = exports.fieldIdToName = void 0;
const scaffolding_js_1 = require("../scaffolding.js");
exports.fieldIdToName = {
    displayName: "Widget display name",
    technology: "Technology",
    iconUrl: "iconUrl",
    resourceId: "Azure API Management resource ID (following format: subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ApiManagement/service/<api-management service-name>)",
    managementApiEndpoint: "Management API hostname",
    apiVersion: "Management API version",
    openUrl: "Developer portal URL",
    configAdvancedTenantId: "Tenant ID",
    configAdvancedRedirectUri: "Redirect URI",
};
const prefixUrlProtocol = (value) => /https?:\/\//.test(value) ? value : `https://${value}`;
exports.prefixUrlProtocol = prefixUrlProtocol;
const validateRequired = (name, msg = `The “${name}” parameter is required.`) => (input) => (input != null && input !== "") || msg;
const validateUrl = (name, msg = (input) => `Provided “${name}” parameter value (“${(0, exports.prefixUrlProtocol)(input)}”) isn’t a valid URL. Use the correct URL format, e.g., https://contoso.com.`) => (input) => {
    try {
        new URL((0, exports.prefixUrlProtocol)(input));
        return true;
    }
    catch (e) {
        return msg((0, exports.prefixUrlProtocol)(input));
    }
};
exports.validateWidgetConfig = {
    displayName: validateRequired(exports.fieldIdToName.displayName),
    technology: (input) => {
        const required = validateRequired(exports.fieldIdToName.technology)(input);
        if (required !== true)
            return required;
        if (scaffolding_js_1.TECHNOLOGIES.includes(input)) {
            return true;
        }
        else {
            return ("Provided “technology” parameter value isn’t correct. Use one of the following: " +
                scaffolding_js_1.TECHNOLOGIES.join(", "));
        }
    },
};
exports.validateDeployConfig = {
    resourceId: (input) => {
        const required = validateRequired(exports.fieldIdToName.resourceId)(input);
        if (required !== true)
            return required;
        const regex = /^\/?subscriptions\/[^/]+\/resourceGroups\/[^/]+\/providers\/Microsoft\.ApiManagement\/service\/[^/]+\/?$/;
        return input === "test" || regex.test(input)
            ? true
            : "Resource ID needs to be a valid Azure resource ID. For example, subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-group/providers/Microsoft.ApiManagement/service/contoso-apis.";
    },
    managementApiEndpoint: (input) => validateRequired(exports.fieldIdToName.managementApiEndpoint)(input),
};
exports.validateMiscConfig = {
    openUrl: (input) => {
        if (!input)
            return true;
        return validateUrl(exports.fieldIdToName.openUrl)(input);
    },
    configAdvancedTenantId: () => {
        return true;
    },
    configAdvancedRedirectUri: (input) => {
        if (!input)
            return true;
        return validateUrl(exports.fieldIdToName.openUrl)(input);
    },
};
const promptWidgetConfig = async (partial) => {
    const inquirerImport = await import("inquirer");
    const inquirer = inquirerImport.default;
    return inquirer.prompt([
        {
            name: "displayName",
            type: "input",
            message: exports.fieldIdToName.displayName,
            validate: exports.validateWidgetConfig.displayName,
        },
        {
            name: "technology",
            type: "list",
            message: exports.fieldIdToName.technology,
            choices: [
                { name: "React", value: "react" },
                { name: "Vue", value: "vue" },
                { name: "TypeScript", value: "typescript" },
            ],
        },
    ], partial);
};
exports.promptWidgetConfig = promptWidgetConfig;
const promptServiceInformation = async (partial) => {
    const inquirerImport = await import("inquirer");
    const inquirer = inquirerImport.default;
    return inquirer.prompt([
        {
            name: "resourceId",
            type: "input",
            message: exports.fieldIdToName.resourceId,
            validate: exports.validateDeployConfig.resourceId,
        },
        {
            name: "managementApiEndpoint",
            type: "list",
            message: exports.fieldIdToName.managementApiEndpoint,
            choices: [
                {
                    name: "management.azure.com (if you're not sure what to select, use this option)",
                    value: "management.azure.com",
                },
                { name: "management.usgovcloudapi.net", value: "management.usgovcloudapi.net" },
                { name: "management.chinacloudapi.cn", value: "management.chinacloudapi.cn" },
            ],
            transformer: exports.prefixUrlProtocol,
            validate: exports.validateDeployConfig.managementApiEndpoint,
        },
        {
            name: "apiVersion",
            type: "input",
            message: exports.fieldIdToName.apiVersion + " (optional; e.g., 2021-08-01)",
        },
    ], partial);
};
exports.promptServiceInformation = promptServiceInformation;
const promptMiscConfig = async (partial) => {
    const inquirerImport = await import("inquirer");
    const inquirer = inquirerImport.default;
    return inquirer.prompt([
        {
            name: "openUrl",
            type: "input",
            message: exports.fieldIdToName.openUrl +
                " for widget development and testing (optional; e.g., https://contoso.developer.azure-api.net/ or http://localhost:8080)",
            transformer: exports.prefixUrlProtocol,
            validate: exports.validateMiscConfig.openUrl,
        },
        {
            name: "configAdvancedTenantId",
            type: "input",
            message: exports.fieldIdToName.configAdvancedTenantId +
                " to be used in Azure Identity InteractiveBrowserCredential class (optional)",
            validate: exports.validateMiscConfig.openUrl,
        },
        {
            name: "configAdvancedRedirectUri",
            type: "input",
            message: exports.fieldIdToName.configAdvancedRedirectUri +
                " to be used in Azure Identity InteractiveBrowserCredential class (optional; default is http://localhost:1337)",
            validate: exports.validateMiscConfig.openUrl,
        },
    ], partial);
};
exports.promptMiscConfig = promptMiscConfig;
//# sourceMappingURL=execute-configs.js.map