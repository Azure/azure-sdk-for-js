// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { DTDL } from "./DTDL";
import { logger } from "./logger";
import { DtmiResolver } from "./dtmiResolver";

export class PseudoParser {
  private _resolver: DtmiResolver;

  constructor(resolver: DtmiResolver) {
    this._resolver = resolver;
  }

  async expand(models: DTDL[]) {
    let expandedMap: any = {};
    for (let i=0; i<models.length; i++) {
      const model: DTDL = models[i];
      expandedMap[model["@id"]] = model;
      await this._expand(model, expandedMap);
    }
    return expandedMap;
  }

  private async _expand(model: DTDL, modelMap: any) {
    logger.info(`Expanding model: ${model["@id"]}`);
    let dependencies = this._getModelDependencies(model);
    let dependenciesToResolve = dependencies.filter((dependency: string) => {
      return !(dependency in modelMap);
    });
    if (dependenciesToResolve.length !== 0) {
      logger.info(`Outstanding dependencies found: ${dependenciesToResolve}`);
      let resolvedDependenciesMap = await this._resolver.resolve(dependenciesToResolve);
      modelMap = { ...modelMap, ...resolvedDependenciesMap };
      for (let dependencyModel of resolvedDependenciesMap.values()) {
        await this._expand(dependencyModel, modelMap);
      }
    }
  }

  private _getModelDependencies(model: DTDL) {
    let dependencies = [];

    if (model.contents !== undefined) {
      const contents = model.contents;
      contents.forEach((element) => {
        if (
          element["@type"] &&
          typeof element["@type"] === "string" &&
          element["@type"] === "Component"
        ) {
          if (element.schema && typeof element.schema === "string") {
            dependencies.push(element.schema);
          }
        }
      });
    }

    if (model.extends !== undefined) {
      if (typeof model.extends === "string") {
        dependencies.push(model.extends);
      } else if (Array.isArray(model.extends)) {
        model.extends.forEach((element) => {
          if (typeof element === "string") {
            dependencies.push(element);
          } else if (typeof element === "object") {
            dependencies.push(this._getModelDependencies(element));
          }
        });
      }
    }

    dependencies = Array.from(new Set(dependencies));
    return dependencies;
  }
}
