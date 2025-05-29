"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProject = generateProject;
const tslib_1 = require("tslib");
const scaffolding_js_1 = require("./scaffolding.js");
const sourceDir_js_1 = require("./sourceDir.js");
const node_path_1 = require("node:path");
const fs = tslib_1.__importStar(require("node:fs/promises"));
const getTemplates_js_1 = require("./getTemplates.js");
const mustache_1 = tslib_1.__importDefault(require("mustache"));
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
        openUrlParsed.searchParams.append(scaffolding_js_1.OVERRIDE_PORT_KEY, String(scaffolding_js_1.OVERRIDE_DEFAULT_PORT));
    }
    const name = (0, scaffolding_js_1.displayNameToName)(widgetConfig.displayName);
    const serverSettings = {
        port: scaffolding_js_1.OVERRIDE_DEFAULT_PORT,
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
            fileData = mustache_1.default.render(fileData, {
                name,
                displayName: widgetConfig.displayName,
                config: JSON.stringify(Object.assign(Object.assign({}, widgetConfig), { name }), null, "\t"),
                configDeploy: JSON.stringify(deploymentConfig, null, "\t"),
                configAdditional: JSON.stringify(configAdditional, null, "\t"),
                serverSettings: JSON.stringify(serverSettings, null, "\t"),
            });
        }
        let relativePath = file;
        if (sourceDir_js_1.sourceDir.includes("\\")) {
            relativePath = relativePath.replace(/\//g, "\\");
        }
        relativePath = relativePath
            .replace((0, node_path_1.join)(sourceDir_js_1.sourceDir, "..", "templates", "_shared"), "")
            .replace((0, node_path_1.join)(sourceDir_js_1.sourceDir, "..", "templates", widgetConfig.technology), "")
            .replace(templateSuffix, "");
        const newFilePath = (0, node_path_1.join)(process.cwd(), (0, scaffolding_js_1.widgetFolderName)(name), relativePath);
        const dir = (0, node_path_1.parse)(newFilePath).dir;
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(newFilePath, fileData, { encoding });
    };
    const templates = await (0, getTemplates_js_1.getTemplates)(widgetConfig.technology);
    for (const file of Object.values(templates)) {
        await renderTemplate(file);
    }
    return;
}
//# sourceMappingURL=generateProject.js.map