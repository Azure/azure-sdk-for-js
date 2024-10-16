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
 * Inline code:
 * ```typescript
 * import lib
 * import {ModelsRepositoryClient} from "../../../src";
 *
 * const repositoryEndpoint = "devicemodels.azure.com";
 * const dtmi = process.argv[2] || "dtmi:azure:DeviceManagement:DeviceInformation;1";
 *
 * console.log(repositoryEndpoint, dtmi);
 *
 * async function main() {
 *   const client = new ModelsRepositoryClient({repositoryLocation: repositoryEndpoint});
 *   const result = await client.getModels(dtmi, {dependencyResolution: 'tryFromExpanded'});
 *   console.log(result);
 * }
 *
 * main().catch((err) => {
 *   console.error("The sample encountered an error:", err);
 * });
 *
 * ```
 *
 * @packageDocumentation
 */

export { ModelsRepositoryClient } from "./modelsRepositoryClient";
export { GetModelsOptions } from "./interfaces/getModelsOptions";
export { ModelsRepositoryClientOptions } from "./interfaces/modelsRepositoryClientOptions";
export { dependencyResolutionType } from "./dependencyResolutionType";
export { ModelError } from "./exceptions";
export { getModelUri, isValidDtmi } from "./dtmiConventions";
