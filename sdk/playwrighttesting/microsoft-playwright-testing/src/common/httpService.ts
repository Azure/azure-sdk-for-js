// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { randomUUID } from "crypto";
import { Agent } from "https";

const httpsAgent = new Agent({
  keepAlive: true,
  timeout: 60000,
});

export class HttpService {
  public async callAPI(
    method: Method,
    url: string,
    data: any | null,
    token: string,
    correlationId: string,
  ): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "x-ms-client-request-id": `${randomUUID()}`,
        "x-correlation-id": correlationId,
      },
      httpsAgent: httpsAgent,
    };
    if (data) {
      config.data = data;
    }
    // eslint-disable-next-line no-return-await
    return await axios(config);
  }
}
