// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityClient } from "./identityClient.js";
import { TokenCredentialOptions } from "../tokenCredentialOptions.js";
import { NetworkRequestOptions, NetworkResponse } from "@azure/msal-node";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { promises as fs } from 'fs';
import * as forge from "node-forge";

export class sniIdentityClient extends IdentityClient {
  private caFileorData: "file" | "data";
  private caContent: string; // This can be a file path or a string containing the CA certificate data
  constructor(caFileorData: "file" | "data", caContent: string, options?: TokenCredentialOptions) {
    super(options);
    this.caFileorData = caFileorData;
    this.caContent = caContent;
  }
  async sendGetRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions,
  ): Promise<NetworkResponse<T>> {
    if (!url.includes("/token")) {
      return super.sendGetRequestAsync(url, options);
    } else {
      const certPool = forge.pki.createCaStore();
      let caData: string | undefined;
      if (this.caFileorData === "data") {
        // do something with `this.caContent`
        caData = this.caContent;
      } else if (this.caFileorData === "file") {
        let fileData: Buffer;
        try {
          fileData = await fs.readFile(this.caContent);
          // Convert the file data to a string and add it to the cert pool
          caData = fileData.toString();
          certPool.addCert(forge.pki.certificateFromPem(caData));
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(`Error reading CA file: ${err.message}`);
          } else {
            throw new Error("Error reading CA file");
          }
        }             
      }
      const request = createPipelineRequest({
        url,
        method: "GET",
        body: options?.body,
        headers: createHttpHeaders(options?.headers),
        abortSignal: this.generateAbortSignal("noCorrelationId"),
        tlsSettings: {
          servername: this.tokenCredentialOptions?.tlsOptions?.servername, // Use the provided server name if available
          ca: caData, // Use the provided CA certificate if available
        },
      });
      const response = await this.sendRequest(request);
      return {
        body: response.bodyAsText ? JSON.parse(response.bodyAsText) : undefined,
        headers: response.headers.toJSON(),
        status: response.status,
      };
    }
  }
}
