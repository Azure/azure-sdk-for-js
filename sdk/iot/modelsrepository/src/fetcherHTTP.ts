// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { ServiceClient } from "@azure/core-client";
import { createPipelineRequest, PipelineRequest, PipelineResponse, RestError } from "@azure/core-rest-pipeline";
import { logger } from "./logger";
import { Fetcher } from "./fetcherAbstract";

export class HttpFetcher extends Fetcher {
  private _client: ServiceClient;
  private _baseURL: string;

  constructor(baseURL: string, client: ServiceClient) {
    super();
    this._client = client;
    this._baseURL = baseURL;
  }

  async fetch(path: string) {
    logger.info(`Fetching ${path} from remote endpoint`);
    const myURL = this._baseURL + '/' + path;
    const request: PipelineRequest = createPipelineRequest({
      url: myURL,
      method: "GET"
    });
    const res: PipelineResponse = await this._client.sendRequest(request);

    if (res.status >= 200 && res.status < 400) {
      const dtdlAsString = res.bodyAsText || "";
      const parsedDtdl = JSON.parse(dtdlAsString);
      return parsedDtdl;
    } else {
      // TODO: Validate with API Review Board that this is an accurate way to raise an error.
      throw new RestError("Error on HTTP Request in remote model fetcher", {statusCode: res.status, response: res, request: request});
    }
  }
}
