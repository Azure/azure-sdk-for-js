// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { Fetcher } from "./fetcherAbstract";
import { convertDtmiToPath, DTDL, logger, ModelError } from "./internal";

/**
 * DtmiResolver handles reformatting the DTMIs to paths and passing options down to the configured fetcher.
 * @internal 
*/
export class DtmiResolver {
  private _fetcher: Fetcher;
  constructor(fetcher: Fetcher) {
    this._fetcher = fetcher;
  }

  async resolve(dtmis: string[], expandedModel: boolean, options?: OperationOptions): Promise<{[dtmi: string]: DTDL}> {
    const modelMap: any = {};
    const dtdlPromises = dtmis.map(async (dtmi) => {
      const dtdlPath = convertDtmiToPath(dtmi, expandedModel);
      logger.info(`Model ${dtmi} located in repository at ${dtdlPath}`);
      const dtdl = await this._fetcher.fetch(dtdlPath, options)
      if (expandedModel) {
        if (Array.isArray(dtdl)) {
          const modelIds: string[] = (dtdl as any[]).map((model:any) => model["@id"]);
          if (!modelIds.includes(dtmi)) {
            throw new ModelError(`DTMI mismatch on expanded DTDL - Request: ${dtmi}, Response: ${modelIds}`);
          }
          for (const model of dtdl) {
            modelMap[model["@id"]] = model;
          }
        } else {
          throw new ModelError('Expanded format should always return an array of models.');
        }
      } else {
        const model = dtdl as DTDL;
        if (model["@id"] != dtmi) {
          throw new ModelError(`DTMI mismatch - Request: ${dtmi}, Response ${model["@id"]}`);
        }

        modelMap[`${dtmi}`] = dtdl;
      }
    });

    await Promise.all(dtdlPromises);
    return modelMap;
  }
}
