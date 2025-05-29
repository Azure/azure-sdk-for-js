"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDtmi = exports.getModelUri = exports.ModelError = exports.ModelsRepositoryClient = void 0;
/**
 * This is the ModelsRepositoryClient Library for JavaScript.
 *
 * @remarks
 * This ModelsRepositoryClient is built around getting DTDL Models from a user-specified
 * location. The two main variables are the repositoryLocation, which is a path or URI to either a remote
 * or local repository where the models are located, and the dtmis, which can be one or more dtmis that
 * will be mapped to specific models contained in the repository location that the user wishes to get.
 *
 * @example
 * ```ts snippet:ReadmeSampleGetModels
 * import { ModelsRepositoryClient } from "@azure/iot-modelsrepository";
 *
 * // Global endpoint client
 * const client = new ModelsRepositoryClient();
 *
 * // The output of getModels() will include at least the definition for the target dtmi.
 * // If the model dependency resolution configuration is not disabled, then models in which the
 * // target dtmi depends on will also be included in the returned object (mapping dtmis to model objects).
 * const dtmi = "dtmi:com:example:TemperatureController;1";
 * const models = await client.getModels(dtmi, { dependencyResolution: "tryFromExpanded" });
 *
 * // In this case the above dtmi has 2 model dependencies.
 * // dtmi:com:example:Thermostat;1 and dtmi:azure:DeviceManagement:DeviceInformation;1
 * console.log(`${dtmi} resolved in ${Object.keys(models).length} interfaces.`);
 * ```
 *
 * @packageDocumentation
 */
var modelsRepositoryClient_js_1 = require("./modelsRepositoryClient.js");
Object.defineProperty(exports, "ModelsRepositoryClient", { enumerable: true, get: function () { return modelsRepositoryClient_js_1.ModelsRepositoryClient; } });
var exceptions_js_1 = require("./exceptions.js");
Object.defineProperty(exports, "ModelError", { enumerable: true, get: function () { return exceptions_js_1.ModelError; } });
var dtmiConventions_js_1 = require("./dtmiConventions.js");
Object.defineProperty(exports, "getModelUri", { enumerable: true, get: function () { return dtmiConventions_js_1.getModelUri; } });
Object.defineProperty(exports, "isValidDtmi", { enumerable: true, get: function () { return dtmiConventions_js_1.isValidDtmi; } });
//# sourceMappingURL=index.js.map