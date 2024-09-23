// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-client";
import { DTDL } from "./psuedoDtdl";
import { convertDtmiToPath } from "./dtmiConventions";
import { ModelError } from "./exceptions";
import { Fetcher } from "./fetcherAbstract";
import { logger } from "./logger";

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
  private _fetcher: Fetcher;
  constructor(fetcher: Fetcher) {
    this._fetcher = fetcher;
  }

  async resolve(
    dtmis: string[],
    expandedModel: boolean,
    options?: OperationOptions,
  ): Promise<{ [dtmi: string]: DTDL }> {
    const modelMap: { [dtmi: string]: DTDL } = {};
    const dtdlPromises = dtmis.map(async (dtmi) => {
      const dtdlPath = convertDtmiToPath(dtmi, expandedModel);
      logger.info(`Model ${dtmi} located in repository at ${dtdlPath}`);
      const dtdl = await this._fetcher.fetch(dtdlPath, options);
      if (expandedModel) {
        if (Array.isArray(dtdl)) {
          const modelIds: string[] = (dtdl as DTDL[]).map((model: DTDL) => model["@id"]);
          if (!modelIds.includes(dtmi)) {
            throw new ModelError(
              `DTMI mismatch on expanded DTDL - Request: ${dtmi}, Response: ${modelIds}`,
            );
          }
          for (const model of dtdl) {
            modelMap[model["@id"]] = model;
          }
        } else {
          throw new ModelError("Expanded format should always return an array of models.");
        }
      } else {
        const model = dtdl as DTDL;
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
