// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, RequestPrepareOptions } from "@azure/core-http";
import { MSI } from "./models";
import { credentialLogger } from "../../util/logging";
import { IdentityClient } from "../../client/identityClient";
import { msiGenericGetToken } from "./utils";
import { ImdsApiVersion, ImdsEndpoint } from "./constants";

const logger = credentialLogger("ManagedIdentityCredential - ArcMSI");

function expiresInParser(requestBody: any) {
  if (requestBody.expires_on) {
    // Use the expires_on timestamp if it's available
    const expires = +requestBody.expires_on * 1000;
    logger.info(`IMDS using expires_on: ${expires} (original value: ${requestBody.expires_on})`);
    return expires;
  } else {
    // If these aren't possible, use expires_in and calculate a timestamp
    const expires = Date.now() + requestBody.expires_in * 1000;
    logger.info(`IMDS using expires_in: ${expires} (original value: ${requestBody.expires_in})`);
    return expires;
  }
}

function prepareRequestOptions(resource?: string, clientId?: string): RequestPrepareOptions {
  const queryParameters: any = {
    resource,
    "api-version": ImdsApiVersion
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }

  return {
    url: ImdsEndpoint,
    method: "GET",
    queryParameters,
    headers: {
      Accept: "application/json",
      Metadata: true
    }
  };
}

export const arcMsi: MSI = {
  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.IMDS_ENDPOINT);
  },
  async getToken(
    identityClient: IdentityClient,
    resource?: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    logger.info(
      `Using the IMDS endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`
    );

    // Get secret:
    // https://github.com/Azure/azure-sdk-for-go/pull/12832/files#diff-ec817e0d52328190fda9625f65109e9a81c279c3e3ebcc503d153dbaeaa7dc4bR206

    // Send secret.

    return msiGenericGetToken(
      identityClient,
      prepareRequestOptions(resource, clientId),
      expiresInParser,
      getTokenOptions
    );
  }
};
