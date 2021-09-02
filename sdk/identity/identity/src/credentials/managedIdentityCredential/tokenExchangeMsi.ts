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
import { DefaultAuthorityHost } from "../../constants";

const logger = credentialLogger("ManagedIdentityCredential - Token Exchange");

const readFileAsync = promisify(fs.readFile);

function expiresInParser(requestBody: any): number {
  // Parses a string representation of the seconds since epoch into a number value
  return Number(requestBody.expires_on);
}

function prepareRequestOptions(
  scope: string,
  clientAssertion: string,
  clientId?: string
): PipelineRequestOptions {
  const queryParameters: any = {
    scope,
    client_assertion: clientAssertion,
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    client_id: clientId,
    grant_type: "client_credentials"
  };

  const params = new URLSearchParams(queryParameters);
  const url = new URL(
    `${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
    process.env.AZURE_AUTHORITY_HOST ?? DefaultAuthorityHost
  );

  return {
    url: url.toString(),
    method: "POST",
    body: params.toString(),
    headers: createHttpHeaders({
      Accept: "application/json"
    })
  };
}

export function tokenExchangeMsi(): MSI {
  const assertionCache: {
    [key: string]: { value: string; date: number };
  } = {};

  // Only reads from the assertion file once every 5 minutes
  async function readAssertion(path: string): Promise<string> {
    for (const key in assertionCache) {
      const cachedAssertion = assertionCache[key];
      // Cached assertions expire after 5 minutes
      if (Date.now() - cachedAssertion.date >= 1000 * 60 * 5) {
        delete assertionCache[key];
      }
    }
    if (!assertionCache[path]) {
      const file = await readFileAsync(path, "utf8");
      const value = file.trim();
      if (value) {
        assertionCache[path] = { value, date: Date.now() };
      } else {
        return value;
      }
    }
    return assertionCache[path].value;
  }

  return {
    async isAvailable(): Promise<boolean> {
      const env = process.env;
      const result = Boolean(
        env.AZURE_CLIENT_ID && env.AZURE_TENANT_ID && env.AZURE_FEDERATED_TOKEN_FILE
      );
      if (!result) {
        logger.info("The Token File Path MSI is unavailable.");
      }
      return result;
    },
    async getToken(
      identityClient: IdentityClient,
      resource: string,
      clientId?: string,
      getTokenOptions: GetTokenOptions = {}
    ): Promise<AccessToken | null> {
      logger.info(`Using the client assertion coming from environment variables.`);

      let assertion: string;

      try {
        assertion = await readAssertion(process.env.AZURE_FEDERATED_TOKEN_FILE!);
      } catch (err) {
        throw new Error(`Failed to read ${process.env.AZURE_FEDERATED_TOKEN_FILE}`);
      }

      return msiGenericGetToken(
        identityClient,
        prepareRequestOptions(resource, assertion, clientId),
        expiresInParser,
        getTokenOptions
      );
    }
  };
}
