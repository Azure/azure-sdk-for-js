"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.widgetFolderName = exports.displayNameToName = exports.TECHNOLOGIES = exports.OVERRIDE_DEFAULT_PORT = exports.OVERRIDE_PORT_KEY = void 0;
/**
 * Unique identifier under which is specified which port to use for injecting locally hosted custom widget to a running DevPortal instance.
 */
exports.OVERRIDE_PORT_KEY = "MS_APIM_CW_localhost_port";
/**
 * Default port for running local dev server on.
 */
exports.OVERRIDE_DEFAULT_PORT = 3000;
/** List of all supported technologies to scaffold a widget in. */
exports.TECHNOLOGIES = ["typescript", "react", "vue"];
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
exports.displayNameToName = displayNameToName;
/**
 * Returns name of the folder for widget project.
 *
 * @param name - name of the widget
 */
const widgetFolderName = (name) => `azure-api-management-widget-${name}`;
exports.widgetFolderName = widgetFolderName;
//# sourceMappingURL=scaffolding.js.map