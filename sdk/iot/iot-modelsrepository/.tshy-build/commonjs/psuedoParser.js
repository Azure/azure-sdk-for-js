"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PseudoParser = void 0;
const logger_js_1 = require("./logger.js");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
/**
 * The PsuedoParser is an interesting implementation. Essentially, this
 * codebase works in tandem with a Digital Twins Parser, which simultaneously
 * defines the DTDL structure and validates models match the correct DTDL format.
 * In lieu of using that Parser as a dependency (for a complex network of reasons),
 * we implement this class, which kind of parses. Because it uses the resovler too,
 * we can, during psuedo-parsing, identify any times we should resolve a dependency,
 * and then resolve the dependencies until the dependency tree is fully resolved.
 *
 * @internal
 */
class PseudoParser {
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    constructor(resolver) {
        this._resolver = resolver;
    }
    async expand(models, tryFromExpanded) {
        const expandedMap = {};
        for (let i = 0; i < models.length; i++) {
            const model = models[i];
            if (model["@id"] !== undefined) {
                expandedMap[model["@id"]] = model;
            }
            else {
                throw Error(`model ${model} does not contain @id member`);
            }
            await this._expand(model, expandedMap, tryFromExpanded);
        }
        return expandedMap;
    }
    async _expand(model, modelMap, tryFromExpanded) {
        logger_js_1.logger.info(`Expanding model: ${model["@id"]}`);
        const dependencies = this._getModelDependencies(model);
        const dependenciesToResolve = dependencies.filter((dependency) => {
            return !(dependency in modelMap);
        });
        if (dependenciesToResolve.length !== 0) {
            logger_js_1.logger.info(`Outstanding dependencies found: ${dependenciesToResolve}`);
            let resolvedDependenciesMap;
            try {
                resolvedDependenciesMap = await this._resolver.resolve(dependenciesToResolve, tryFromExpanded);
            }
            catch (e) {
                if (e instanceof core_rest_pipeline_1.RestError) {
                    resolvedDependenciesMap = await this._resolver.resolve(dependenciesToResolve, false);
                }
                else {
                    throw e;
                }
            }
            Object.keys(resolvedDependenciesMap).forEach((key) => {
                modelMap[key] = resolvedDependenciesMap[key];
            });
            const promiseList = [];
            Object.values(resolvedDependenciesMap).forEach((dependencyModel) => {
                promiseList.push(this._expand(dependencyModel, modelMap, tryFromExpanded));
            });
            await Promise.all(promiseList);
        }
    }
    _getModelDependencies(model) {
        const dependencies = [];
        if (model.contents !== undefined) {
            const contents = model.contents;
            contents.forEach((element) => {
                if (element["@type"] &&
                    typeof element["@type"] === "string" &&
                    element["@type"] === "Component") {
                    if (element.schema && typeof element.schema === "string") {
                        dependencies.push(element.schema);
                    }
                }
            });
        }
        if (model.extends !== undefined) {
            if (typeof model.extends === "string") {
                dependencies.push(model.extends);
            }
            else if (Array.isArray(model.extends)) {
                model.extends.forEach((element) => {
                    if (typeof element === "string") {
                        dependencies.push(element);
                    }
                    else if (typeof element === "object") {
                        dependencies.push(this._getModelDependencies(element));
                    }
                });
            }
        }
        const noDuplicates = Array.from(new Set(dependencies));
        return noDuplicates;
    }
}
exports.PseudoParser = PseudoParser;
//# sourceMappingURL=psuedoParser.js.map