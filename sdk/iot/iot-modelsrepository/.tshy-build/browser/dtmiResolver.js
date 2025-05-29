// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { convertDtmiToPath } from "./dtmiConventions.js";
import { ModelError } from "./exceptions.js";
import { logger } from "./logger.js";
/**
 * DtmiResolver handles reformatting the DTMIs to paths and passing options
 * down to the configured fetcher. It is almost like a middle man between the
 * user-facing API and the PsuedoParser (which identifies if there are sub-dependencies
 * to resolve), and the configured fetcher, which will go out to the endpoint,
 * either in the filesystem or through a URI, and actually get the model we want.
 *
 * @internal
 */
export class DtmiResolver {
    constructor(fetcher) {
        this._fetcher = fetcher;
    }
    async resolve(dtmis, expandedModel, options) {
        const modelMap = {};
        const dtdlPromises = dtmis.map(async (dtmi) => {
            const dtdlPath = convertDtmiToPath(dtmi, expandedModel);
            logger.info(`Model ${dtmi} located in repository at ${dtdlPath}`);
            const dtdl = await this._fetcher.fetch(dtdlPath, options);
            if (expandedModel) {
                if (Array.isArray(dtdl)) {
                    const modelIds = dtdl.map((model) => model["@id"]);
                    if (!modelIds.includes(dtmi)) {
                        throw new ModelError(`DTMI mismatch on expanded DTDL - Request: ${dtmi}, Response: ${modelIds}`);
                    }
                    for (const model of dtdl) {
                        modelMap[model["@id"]] = model;
                    }
                }
                else {
                    throw new ModelError("Expanded format should always return an array of models.");
                }
            }
            else {
                const model = dtdl;
                if (model["@id"] !== dtmi) {
                    throw new ModelError(`DTMI mismatch - Request: ${dtmi}, Response ${model["@id"]}`);
                }
                modelMap[`${dtmi}`] = model;
            }
        });
        await Promise.all(dtdlPromises);
        return modelMap;
    }
}
//# sourceMappingURL=dtmiResolver.js.map