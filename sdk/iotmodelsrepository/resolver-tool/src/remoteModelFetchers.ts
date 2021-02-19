// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict";

import * as dtmiConventions from "./dtmiConventions";
import * as modelMetadata from "./modelMetadata";
import * as coreHttp from "@azure/core-http";
import { DTDL } from "./DTDL";
import { flattenDtdlResponse } from "./modelFetcherHelper";

async function recursiveFetcher(
  dtmi: string,
  endpoint: string,
  tryFromExpanded: boolean
): Promise<{ [dtmi: string]: DTDL }> {
  let dependencyModels: { [x: string]: DTDL } = {};
  let fetchedModels: { [x: string]: DTDL };
  try {
    console.log(`Fetching: ${dtmi}`);
    fetchedModels = await fetcher(dtmi, endpoint, tryFromExpanded);
  } catch (error) {
    if (
      tryFromExpanded &&
      (error.code === "ENOENT" || !(error.statusCode >= 200 && error.statusCode < 400))
    ) {
      console.log("Fetching from expanded failed. Trying without.");
      console.log(`Fetching: ${dtmi}`);
      fetchedModels = await fetcher(dtmi, endpoint, false);
    } else {
      throw error;
    }
  }
  const dtmis = Object.keys(fetchedModels);
  for (let i = 0; i < dtmis.length; i++) {
    const currentDtdl = fetchedModels[dtmis[i]];
    const deps = modelMetadata.getModelMetadata(currentDtdl).componentSchemas;
    if (deps && deps.length > 0) {
      for (let j = 0; j < deps.length; j++) {
        if (
          Object.keys(dependencyModels).includes(deps[j]) ||
          Object.keys(fetchedModels).includes(deps[j])
        ) {
          // do nothing
        } else {
          const fetchedDependencies = await recursiveFetcher(deps[j], endpoint, tryFromExpanded);
          dependencyModels = { ...dependencyModels, ...fetchedDependencies };
        }
      }
    }
  }
  if (Object.keys(dependencyModels).length > 0) {
    fetchedModels = { ...fetchedModels, ...dependencyModels };
  }
  return fetchedModels;
}

async function fetcher(
  dtmi: string,
  endpoint: string,
  tryFromExpanded: boolean
): Promise<{ [dtmi: string]: any }> {
  const client = new coreHttp.ServiceClient();
  const req: coreHttp.RequestPrepareOptions = {
    url: dtmiConventions.dtmiToQualifiedPath(dtmi, endpoint, tryFromExpanded),
    method: "GET"
  };
  const res: coreHttp.HttpOperationResponse = await client.sendRequest(req);
  if (res.status >= 200 && res.status < 400) {
    const dtdlAsString = res.bodyAsText || "";
    const parsedDtdl = JSON.parse(dtdlAsString);
    if (Array.isArray(parsedDtdl)) {
      const result = flattenDtdlResponse(parsedDtdl as DTDL[]);
      return result;
    } else {
      const result = { [dtmi]: parsedDtdl as DTDL };
      return result;
    }
  } else {
    throw new coreHttp.RestError(
      "Error on HTTP Request in remote model fetcher",
      "404",
      404,
      undefined,
      res
    );
  }
}

export { fetcher, recursiveFetcher };
