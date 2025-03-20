// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

export { ModelsRepositoryClient } from "./modelsRepositoryClient.js";
export { GetModelsOptions } from "./interfaces/getModelsOptions.js";
export { ModelsRepositoryClientOptions } from "./interfaces/modelsRepositoryClientOptions.js";
export { dependencyResolutionType } from "./dependencyResolutionType.js";
export { ModelError } from "./exceptions.js";
export { getModelUri, isValidDtmi } from "./dtmiConventions.js";
