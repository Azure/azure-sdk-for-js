// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHmac } from "node:crypto";
import type {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";
import { HeaderConstants } from "../utils/constants.js";
import {
  buildStorageSharedKeyStringToSign,
  prepareSharedKeyHeaders,
} from "./SharedKeySigning.js";

/**
 * The programmatic identifier of the storageSharedKeyCredentialPolicy.
 */
export const storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";

/**
 * Options used to configure StorageSharedKeyCredentialPolicy.
 */
export interface StorageSharedKeyCredentialPolicyOptions {
  accountName: string;
  accountKey: Buffer;
}

/**
 * storageSharedKeyCredentialPolicy handles signing requests using storage account keys.
 */
export function storageSharedKeyCredentialPolicy(
  options: StorageSharedKeyCredentialPolicyOptions,
): PipelinePolicy {
  function signRequest(request: PipelineRequest): void {
    prepareSharedKeyHeaders(request);

    const stringToSign: string = buildStorageSharedKeyStringToSign(request, options.accountName);

    const signature: string = createHmac("sha256", options.accountKey)
      .update(stringToSign, "utf8")
      .digest("base64");
    request.headers.set(
      HeaderConstants.AUTHORIZATION,
      `SharedKey ${options.accountName}:${signature}`,
    );

    // console.log(`[URL]:${request.url}`);
    // console.log(`[HEADERS]:${request.headers.toString()}`);
    // console.log(`[STRING TO SIGN]:${JSON.stringify(stringToSign)}`);
    // console.log(`[KEY]: ${request.headers.get(HeaderConstants.AUTHORIZATION)}`);
  }

  return {
    name: storageSharedKeyCredentialPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      signRequest(request);
      return next(request);
    },
  };
}
