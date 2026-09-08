// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RequestPolicy,
  RequestPolicyOptionsLike as RequestPolicyOptions,
  WebResourceLike as WebResource,
} from "@azure/core-http-compat";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type { StorageSharedKeyCredential } from "#platform/credentials/StorageSharedKeyCredential";
import { HeaderConstants } from "../utils/constants.js";
import { CredentialPolicy } from "./CredentialPolicy.js";
import { buildStorageSharedKeyStringToSign } from "./SharedKeySigning.js";

/**
 * StorageSharedKeyCredentialPolicy is a policy used to sign HTTP request with a shared key.
 */
export class StorageSharedKeyCredentialPolicy extends CredentialPolicy {
  /**
   * Reference to StorageSharedKeyCredential which generates StorageSharedKeyCredentialPolicy
   */
  private readonly factory: StorageSharedKeyCredential;

  /**
   * Creates an instance of StorageSharedKeyCredentialPolicy.
   * @param nextPolicy -
   * @param options -
   * @param factory -
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    factory: StorageSharedKeyCredential,
  ) {
    super(nextPolicy, options);
    this.factory = factory;
  }

  /**
   * Signs request.
   *
   * @param request -
   */
  protected signRequest(request: WebResource): WebResource {
    request.headers.set(HeaderConstants.X_MS_DATE, new Date().toUTCString());

    if (
      request.body &&
      (typeof request.body === "string" || (request.body as Buffer) !== undefined) &&
      request.body.length > 0
    ) {
      request.headers.set(HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
    }

    // Shares the core-v2 signer so both credential paths canonicalize identically.
    const stringToSign: string = buildStorageSharedKeyStringToSign(
      createPipelineRequest({
        url: request.url,
        method: request.method,
        headers: createHttpHeaders(request.headers.toJson({ preserveCase: true })),
      }),
      this.factory.accountName,
    );

    const signature: string = this.factory.computeHMACSHA256(stringToSign);
    request.headers.set(
      HeaderConstants.AUTHORIZATION,
      `SharedKey ${this.factory.accountName}:${signature}`,
    );

    return request;
  }
}
