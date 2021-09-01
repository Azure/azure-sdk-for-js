// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import { createHttpHeaders, PipelineRequestOptions } from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { promisify } from "util";
import { IdentityClient } from "../../client/identityClient";
import { credentialLogger } from "../../util/logging";
import { MSI } from "./models";
import { msiGenericGetToken } from "./utils";
import { imdsEndpointPath, imdsHost } from "./constants";

const logger = credentialLogger("ManagedIdentityCredential - AppServiceMSI 2017");

const readFileAsync = promisify(fs.readFile);

function expiresInParser(requestBody: any): number {
  // Parses a string representation of the seconds since epoch into a number value
  return Number(requestBody.expires_on);
}

function prepareRequestOptions(resource: string, clientAssertion: string): PipelineRequestOptions {
  const queryParameters: any = {
    resource,
    client_assertion: clientAssertion,
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
  };

  const params = new URLSearchParams(queryParameters);
  const query = params.toString();
  const url = new URL(imdsEndpointPath, imdsHost);

  return {
    url: `${url}?${query}`,
    method: "GET",
    headers: createHttpHeaders({
      Accept: "application/json",
      Metadata: "true"
    })
  };
}

export const tokenFilePathMsi: MSI = {
  async isAvailable(): Promise<boolean> {
    const env = process.env;
    const result = Boolean(env.AZURE_CLIENT_ID && env.AZURE_TENANT_ID && env.TOKEN_FILE_PATH);
    if (!result) {
      logger.info("The Token File Path MSI is unavailable.");
    }
    return result;
  },
  async getToken(
    identityClient: IdentityClient,
    resource: string,
    _clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    logger.info(`Using the client assertion coming from environment variables.`);

    let assertion: string;

    try {
      assertion = await readFileAsync(process.env.TOKEN_FILE_PATH!, { encoding: "utf-8" });
    } catch (err) {
      throw new Error(`Failed to read ${process.env.TOKEN_FILE_PATH}`);
    }

    return msiGenericGetToken(
      identityClient,
      prepareRequestOptions(resource, assertion),
      expiresInParser,
      getTokenOptions
    );
  }
};
