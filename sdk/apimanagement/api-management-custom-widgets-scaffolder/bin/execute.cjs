#!/usr/bin/env node
'use strict';

var yargsParser = require('yargs-parser');
var chalk = require('chalk');
var node_path = require('node:path');
var node_url = require('node:url');
var fs = require('node:fs/promises');
var glob = require('glob');
var mustache = require('mustache');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Unique identifier under which is specified which port to use for injecting locally hosted custom widget to a running DevPortal instance.
 */
const OVERRIDE_PORT_KEY = "MS_APIM_CW_localhost_port";
/**
 * Default port for running local dev server on.
 */
const OVERRIDE_DEFAULT_PORT = 3000;
/** List of all supported technologies to scaffold a widget in. */
const TECHNOLOGIES = ["typescript", "react", "vue"];
/**
 * Converts user defined name of a custom widget to a unique ID, which is in context of Dev Portal known as "name".
 * Prefix "cw-" to avoid conflicts with existing widgets.
 *
 * @param displayName - User defined name of the custom widget.
 */
const displayNameToName = (displayName) => encodeURIComponent(("cw-" + displayName)
    .normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-"));
/**
 * Returns name of the folder for widget project.
 *
 * @param name - name of the widget
 */
const widgetFolderName = (name) => `azure-api-management-widget-${name}`;

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const fieldIdToName = {
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
const validateRequired = (name, msg = `The “${name}” parameter is required.`) => (input) => (input != null && input !== "") || msg;
const validateUrl = (name, msg = (input) => `Provided “${name}” parameter value (“${prefixUrlProtocol(input)}”) isn’t a valid URL. Use the correct URL format, e.g., https://contoso.com.`) => (input) => {
    try {
        new URL(prefixUrlProtocol(input));
        return true;
    }
    catch (e) {
        return msg(prefixUrlProtocol(input));
    }
};
const validateWidgetConfig = {
    displayName: validateRequired(fieldIdToName.displayName),
    technology: (input) => {
        const required = validateRequired(fieldIdToName.technology)(input);
        if (required !== true)
            return required;
        if (TECHNOLOGIES.includes(input)) {
            return true;
        }
        else {
            return ("Provided “technology” parameter value isn’t correct. Use one of the following: " +
                TECHNOLOGIES.join(", "));
        }
    },
};
const validateDeployConfig = {
    resourceId: (input) => {
        const required = validateRequired(fieldIdToName.resourceId)(input);
        if (required !== true)
            return required;
        const regex = /^\/?subscriptions\/[^/]+\/resourceGroups\/[^/]+\/providers\/Microsoft\.ApiManagement\/service\/[^/]+\/?$/;
        return input === "test" || regex.test(input)
            ? true
            : "Resource ID needs to be a valid Azure resource ID. For example, subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-group/providers/Microsoft.ApiManagement/service/contoso-apis.";
    },
    managementApiEndpoint: (input) => validateRequired(fieldIdToName.managementApiEndpoint)(input),
};
const validateMiscConfig = {
    openUrl: (input) => {
        if (!input)
            return true;
        return validateUrl(fieldIdToName.openUrl)(input);
    },
    configAdvancedTenantId: () => {
        return true;
    },
    configAdvancedRedirectUri: (input) => {
        if (!input)
            return true;
        return validateUrl(fieldIdToName.openUrl)(input);
    },
};
const promptWidgetConfig = async (partial) => {
    const prefilledAnswers = {
        ...partial,
        displayName: partial.displayName ?? "",
    };
    const inquirerImport = await import('inquirer');
    const inquirer = inquirerImport.default;
    return inquirer.prompt([
        {
            name: "displayName",
            type: "input",
            message: fieldIdToName.displayName,
            validate: validateWidgetConfig.displayName,
        },
        {
            name: "technology",
            type: "select",
            message: fieldIdToName.technology,
            choices: [
                { name: "React", value: "react" },
                { name: "Vue", value: "vue" },
                { name: "TypeScript", value: "typescript" },
            ],
        },
    ], prefilledAnswers);
};
const promptServiceInformation = async (partial) => {
    const prefilledAnswers = {
        ...partial,
        managementApiEndpoint: partial.managementApiEndpoint ?? "",
    };
    const inquirerImport = await import('inquirer');
    const inquirer = inquirerImport.default;
    return inquirer.prompt([
        {
            name: "resourceId",
            type: "input",
            message: fieldIdToName.resourceId,
            validate: validateDeployConfig.resourceId,
        },
        {
            name: "managementApiEndpoint",
            type: "select",
            message: fieldIdToName.managementApiEndpoint,
            choices: [
                {
                    name: "https://management.azure.com (if you're not sure what to select, use this option)",
                    value: "https://management.azure.com",
                },
                {
                    name: "https://management.usgovcloudapi.net",
                    value: "https://management.usgovcloudapi.net",
                },
                {
                    name: "https://management.chinacloudapi.cn",
                    value: "https://management.chinacloudapi.cn",
                },
            ],
        },
        {
            name: "apiVersion",
            type: "input",
            message: fieldIdToName.apiVersion + " (optional; e.g., 2021-08-01)",
        },
    ], prefilledAnswers);
};
const promptMiscConfig = async (partial) => {
    const inquirerImport = await import('inquirer');
    const inquirer = inquirerImport.default;
    return inquirer.prompt([
        {
            name: "openUrl",
            type: "input",
            message: fieldIdToName.openUrl +
                " for widget development and testing (optional; e.g., https://contoso.developer.azure-api.net/ or http://localhost:8080)",
            transformer: prefixUrlProtocol,
            validate: validateMiscConfig.openUrl,
        },
        {
            name: "configAdvancedTenantId",
            type: "input",
            message: fieldIdToName.configAdvancedTenantId +
                " to be used in Azure Identity InteractiveBrowserCredential class (optional)",
            validate: validateMiscConfig.openUrl,
        },
        {
            name: "configAdvancedRedirectUri",
            type: "input",
            message: fieldIdToName.configAdvancedRedirectUri +
                " to be used in Azure Identity InteractiveBrowserCredential class (optional; default is http://localhost:1337)",
            validate: validateMiscConfig.openUrl,
        },
    ], partial);
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
function hideBin(argv) {
    // Strip the first two elements from process.argv (node and script path)
    return argv.slice(2);
}
const extractConfigFromArgs = (argv, validateConfig, red) => {
    const configPartial = {};
    let missing = false;
    Object.entries(validateConfig).forEach(([key, v]) => {
        const validate = v;
        const value = argv[key];
        const response = validate(value);
        if (response === true) {
            if (value !== null && value !== undefined) {
                configPartial[key] = value;
            }
        }
        else if (value === null || value === undefined) {
            missing = true;
        }
        else {
            missing = true;
            red(`"${value}" is not a valid value for "${key}"`);
            if (typeof response === "string")
                red(response);
        }
    });
    return { configPartial, missing };
};
const buildGetConfig = (gray, red) => {
    const argv = yargsParser(hideBin(process.argv));
    return async (promptForConfig, validateConfig) => {
        const { configPartial, missing } = extractConfigFromArgs(argv, validateConfig, red);
        if (missing || !Object.values(configPartial).length) {
            return promptForConfig(configPartial);
        }
        else {
            gray("Retrieved from the command parameters");
            Object.entries(configPartial).forEach(([key, value]) => value != null && gray(`${fieldIdToName[key] ?? key}: ${value}`));
            return configPartial;
        }
    };
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const sourceDir = node_path.dirname(node_url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('execute.cjs', document.baseURI).href))));

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
async function getTemplates(template) {
    const sharedFiles = await getFiles(node_path.join(sourceDir, "..", "templates", "_shared", "**", "**", "*.*"));
    const templateFiles = await getFiles(node_path.join(sourceDir, "..", "templates", template, "**", "**", "*.*"));
    return [...sharedFiles, ...templateFiles];
}
async function getFiles(path) {
    // Starting from glob v8 `\` is only used as an escape character, and never as a path separator in glob patterns.
    // Glob pattern paths must use forward-slashes as path separators.
    // See https://github.com/isaacs/node-glob/blob/af57da21c7722bb6edb687ccd4ad3b99d3e7a333/changelog.md#80
    const normalizedPath = path.replace(/\\/g, "/");
    return glob.glob(normalizedPath, { dot: true });
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const templateSuffix = ".mustache";
/**
 * Generates a scaffold project of Custom widget for API Managements' Dev Portal.
 *
 * @param widgetConfig - JSON object with data required by DevPortal to handle a widget integration.
 * @param deploymentConfig - JSON object with data for deployment.
 * @param options - JSON object with other data, which will not be stored in the DevPortal.
 */
async function generateProject(widgetConfig, deploymentConfig, options = {}) {
    const { openUrl, configAdvancedTenantId, configAdvancedRedirectUri } = options;
    const openUrlParsed = openUrl ? new URL(openUrl) : null;
    if (openUrlParsed) {
        openUrlParsed.searchParams.append(OVERRIDE_PORT_KEY, String(OVERRIDE_DEFAULT_PORT));
    }
    const name = displayNameToName(widgetConfig.displayName);
    const serverSettings = {
        port: OVERRIDE_DEFAULT_PORT,
        open: openUrlParsed ? openUrlParsed.toString() : true,
    };
    const configAdditional = {
        interactiveBrowserCredentialOptions: { redirectUri: "http://localhost:1337" },
    };
    if (configAdvancedTenantId) {
        configAdditional.interactiveBrowserCredentialOptions.tenantId = configAdvancedTenantId;
    }
    if (configAdvancedRedirectUri) {
        configAdditional.interactiveBrowserCredentialOptions.redirectUri = configAdvancedRedirectUri;
    }
    const renderTemplate = async (file) => {
        const isTemplate = file.endsWith(templateSuffix);
        const encoding = file.endsWith(".ttf") ? "binary" : "utf8";
        let fileData = await fs.readFile(file, { encoding });
        if (isTemplate) {
            fileData = mustache.render(fileData, {
                name,
                displayName: widgetConfig.displayName,
                config: JSON.stringify({ ...widgetConfig, name }, null, "\t"),
                configDeploy: JSON.stringify(deploymentConfig, null, "\t"),
                configAdditional: JSON.stringify(configAdditional, null, "\t"),
                serverSettings: JSON.stringify(serverSettings, null, "\t"),
            });
        }
        let relativePath = file;
        if (sourceDir.includes("\\")) {
            relativePath = relativePath.replace(/\//g, "\\");
        }
        relativePath = relativePath
            .replace(node_path.join(sourceDir, "..", "templates", "_shared"), "")
            .replace(node_path.join(sourceDir, "..", "templates", widgetConfig.technology), "")
            .replace(templateSuffix, "");
        const newFilePath = node_path.join(process.cwd(), widgetFolderName(name), relativePath);
        const dir = node_path.parse(newFilePath).dir;
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(newFilePath, fileData, { encoding });
    };
    const templates = await getTemplates(widgetConfig.technology);
    for (const file of Object.values(templates)) {
        await renderTemplate(file);
    }
    return;
}

const log = console.log;
const white = (msg) => log(chalk.white(msg));
const green = (msg) => log(chalk.green(msg));
const red = (msg) => log(chalk.red(msg));
const gray = (msg) => log(chalk.gray(msg));
async function main() {
    green("\nThis tool generates code scaffold for custom widgets in the Azure API Management’s developer portal. Learn more at https://aka.ms/apimdocs/portal/customwidgets.\n");
    const getConfig = buildGetConfig(gray, red);
    white("Specify the custom widget configuration.");
    const widgetConfig = await getConfig(promptWidgetConfig, validateWidgetConfig);
    white("Specify the Azure API Management service configuration.");
    const serviceInformation = await getConfig(promptServiceInformation, validateDeployConfig);
    white("Specify other options");
    const miscConfig = await getConfig(promptMiscConfig, validateMiscConfig);
    if (serviceInformation.resourceId[0] === "/") {
        serviceInformation.resourceId = serviceInformation.resourceId.slice(1);
    }
    if (serviceInformation.resourceId.slice(-1) === "/") {
        serviceInformation.resourceId = serviceInformation.resourceId.slice(0, -1);
    }
    if (serviceInformation.apiVersion === "") {
        delete serviceInformation.apiVersion;
    }
    serviceInformation.managementApiEndpoint = prefixUrlProtocol(serviceInformation.managementApiEndpoint);
    miscConfig.openUrl = miscConfig.openUrl
        ? prefixUrlProtocol(miscConfig.openUrl)
        : miscConfig.openUrl;
    return generateProject(widgetConfig, serviceInformation, miscConfig)
        .then(() => green("\nThe custom widget’s code scaffold has been successfully generated.\n"))
        .catch(console.error);
}
main()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=execute.cjs.map
