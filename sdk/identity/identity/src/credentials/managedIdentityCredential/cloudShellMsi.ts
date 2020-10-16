// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";
import { RequestPrepareOptions } from "@azure/core-http";
import { MSI, MSIExpiresInParser, MSIOptions, MSIRequestPreparations } from "./models";
import { credentialLogger } from "../../util/logging";

const logger = credentialLogger("ManagedIdentityCredential - CloudShellMSI");

export const cloudShellMsi: MSI = {
  isAvailable(): boolean {
    return Boolean(process.env.MSI_ENDPOINT);
  },
  prepareRequestOptions(options: MSIOptions): RequestPrepareOptions {
    const { resource, clientId } = options;

    logger.info(
      `Using the endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`
    );

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
  },
  getExpiresInParser(): MSIExpiresInParser {
    return;
  },
  prepareRequest(options: MSIOptions): MSIRequestPreparations {
    return {
      options: cloudShellMsi.prepareRequestOptions(options),
      expiresInParser: cloudShellMsi.getExpiresInParser()
    };
  }
};
