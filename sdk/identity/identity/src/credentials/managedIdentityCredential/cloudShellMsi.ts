// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";
import { AccessToken, GetTokenOptions, RequestPrepareOptions } from "@azure/core-http";
import { MSI } from "./models";
import { credentialLogger } from "../../util/logging";
import { IdentityClient } from "../../client/identityClient";
import { msiGenericGetToken } from "./utils";

const logger = credentialLogger("ManagedIdentityCredential - CloudShellMSI");

// Cloud Shell MSI doesn't have a special expiresIn parser.
const expiresInParser = undefined;

function prepareRequestOptions(resource: string, clientId?: string): RequestPrepareOptions {
  const body: any = {
    resource
  };

  if (clientId) {
    body.client_id = clientId;
  }

  return {
    url: process.env.MSI_ENDPOINT,
    method: "POST",
    body: qs.stringify(body),
    headers: {
      Accept: "application/json",
      Metadata: true,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
}

export const cloudShellMsi: MSI = {
  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.MSI_ENDPOINT);
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
