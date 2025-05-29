"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtmiResolver = void 0;
const dtmiConventions_js_1 = require("./dtmiConventions.js");
const exceptions_js_1 = require("./exceptions.js");
const logger_js_1 = require("./logger.js");
/**
 * DtmiResolver handles reformatting the DTMIs to paths and passing options
 * down to the configured fetcher. It is almost like a middle man between the
 * user-facing API and the PsuedoParser (which identifies if there are sub-dependencies
 * to resolve), and the configured fetcher, which will go out to the endpoint,
 * either in the filesystem or through a URI, and actually get the model we want.
 *
 * @internal
 */
class DtmiResolver {
    constructor(fetcher) {
        this._fetcher = fetcher;
    }
    async resolve(dtmis, expandedModel, options) {
        const modelMap = {};
        const dtdlPromises = dtmis.map(async (dtmi) => {
            const dtdlPath = (0, dtmiConventions_js_1.convertDtmiToPath)(dtmi, expandedModel);
            logger_js_1.logger.info(`Model ${dtmi} located in repository at ${dtdlPath}`);
            const dtdl = await this._fetcher.fetch(dtdlPath, options);
            if (expandedModel) {
                if (Array.isArray(dtdl)) {
                    const modelIds = dtdl.map((model) => model["@id"]);
                    if (!modelIds.includes(dtmi)) {
                        throw new exceptions_js_1.ModelError(`DTMI mismatch on expanded DTDL - Request: ${dtmi}, Response: ${modelIds}`);
                    }
                    for (const model of dtdl) {
                        modelMap[model["@id"]] = model;
                    }
                }
                else {
                    throw new exceptions_js_1.ModelError("Expanded format should always return an array of models.");
                }
            }
            else {
                const model = dtdl;
                if (model["@id"] !== dtmi) {
                    throw new exceptions_js_1.ModelError(`DTMI mismatch - Request: ${dtmi}, Response ${model["@id"]}`);
                }
                modelMap[`${dtmi}`] = model;
            }
        });
        await Promise.all(dtdlPromises);
        return modelMap;
    }
}
exports.DtmiResolver = DtmiResolver;
//# sourceMappingURL=dtmiResolver.js.map