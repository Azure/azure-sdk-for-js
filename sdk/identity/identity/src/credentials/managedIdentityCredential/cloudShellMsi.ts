// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHttpHeaders, PipelineRequestOptions } from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { MSI } from "./models";
import { credentialLogger } from "../../util/logging";
import { IdentityClient } from "../../client/identityClient";
import { msiGenericGetToken } from "./utils";

const logger = credentialLogger("ManagedIdentityCredential - CloudShellMSI");

// Cloud Shell MSI doesn't have a special expiresIn parser.
const expiresInParser = undefined;

function prepareRequestOptions(resource: string, clientId?: string): PipelineRequestOptions {
  const body: any = {
    resource
  };

  if (clientId) {
    body.client_id = clientId;
  }

  // This error should not bubble up, since we verify that this environment variable is defined in the isAvailable() method defined below.
  if (!process.env.MSI_ENDPOINT) {
    throw new Error("Missing environment variable: MSI_ENDPOINT");
  }
  const params = new URLSearchParams(body);
  return {
    url: process.env.MSI_ENDPOINT,
    method: "POST",
    body: params.toString(),
    headers: createHttpHeaders({
      Accept: "application/json",
      Metadata: "true",
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };
}

export const cloudShellMsi: MSI = {
  async isAvailable(): Promise<boolean> {
    const result = Boolean(process.env.MSI_ENDPOINT);
    if (!result) {
      logger.info("The Azure Cloud Shell MSI is unavailable.");
    }
    return result;
  },
  async getToken(
    identityClient: IdentityClient,
    resource: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    logger.info(
      `Using the endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the Cloud Shell to proceed with the authentication.`
    );

    return msiGenericGetToken(
      identityClient,
      prepareRequestOptions(resource, clientId),
      expiresInParser,
      getTokenOptions
    );
  }
};
