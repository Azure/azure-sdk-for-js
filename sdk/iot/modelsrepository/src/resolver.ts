// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { convertDtmiToPath } from "./dtmiConventions";
import { logger } from "./logger";

export class FetcherError extends Error {
  cause: Error | undefined;

  constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;
  }
}

export class ResolverError extends Error {
  cause: Error | undefined;

  constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;
  }
}

export class DtmiResolver {
  private _fetcher;
  constructor(fetcher: any) {
    this._fetcher = fetcher;
  }

  resolve(dtmis: string[], expandedModel: boolean = false) {
    let modelMap: any = {};

    for (let dtmi of dtmis) {
      let dtdl: any[] | any;
      let dtdlPath = convertDtmiToPath(dtmi, expandedModel);
      logger.info(`Model ${dtmi} located in repository at ${dtdlPath}`);

      try {
        dtdl = this._fetcher.fetch(dtdlPath);
      } catch (e) {
        if (e instanceof FetcherError) {
          return Promise.reject(new ResolverError(`Failed to resolve dtmi: ${dtmi}`, e));
        } else {
          return Promise.reject(e);
        }
      }

      if (expandedModel) {
        for (let model of dtdl) {
          modelMap[model["@id"]] = model;
        }
      } else {
        let model = dtdl;
        if (model["@id"] != dtmi) {
          return Promise.reject(
            new ResolverError(`DTMI mismatch - Request: ${dtmi}, Response ${model["@id"]}`)
          );
        }

        modelMap[`${dtmi}`] = dtdl;
      }
    }

    return modelMap;
  }
}
