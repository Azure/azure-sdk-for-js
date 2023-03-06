// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  AcsVerificationGetVerificationsOptionalParams,
  AcsVerificationRequestVerificationOptionalParams,
  AcsVerificationRequestVerificationResponse,
  AcsVerificationVerifyIdentityOptionalParams,
  AcsVerificationVerifyIdentityResponse,
  AcsVerificationDeleteVerificationOptionalParams,
  AcsVerificationGetVerificationConstantsOptionalParams,
} from "./models";
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { AcsVerification, VerificationConstantsResponse } from "./generated/src/models/";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { VerifiedRecipientsClient as VerifiedRecipientsGeneratedClient } from "./generated/src";
import { logger } from "./utils";
import { tracingClient } from "./generated/src/tracing";
/**
 * Client options used to configure the VerifiedRecipientsClient API requests.
 */
export interface VerifiedRecipientsClientOptions extends CommonClientOptions {}

const isVerifiedRecipientsClientOptions = (
  options: any
): options is VerifiedRecipientsClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

export class VerifiedRecipientsClient {
  /**
   * A reference to the auto-generated VerifiedRecipients HTTP client.
   */
  private readonly client: VerifiedRecipientsGeneratedClient;

  public constructor(connectionString: string, options?: VerifiedRecipientsClientOptions);

  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: VerifiedRecipientsClientOptions
  );

  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: VerifiedRecipientsClientOptions
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | VerifiedRecipientsClientOptions,
    maybeOptions: VerifiedRecipientsClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isVerifiedRecipientsClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new VerifiedRecipientsGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  public getVerifications(
    options: AcsVerificationGetVerificationsOptionalParams = {}
  ): Promise<AcsVerification[]> {
    return tracingClient.withSpan(
      "VerifiedRecipients.getVerifications",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.getVerifications(updatedOptions);
      }
    );
  }

  public deleteVerification(
    verificationId: string,
    options: AcsVerificationDeleteVerificationOptionalParams = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "VerifiedRecipients.deleteVerification",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.deleteVerification(
          verificationId,
          updatedOptions
        );
      }
    );
  }

  public verifyIdentity(
    verificationId: string,
    options: AcsVerificationVerifyIdentityOptionalParams = {}
  ): Promise<AcsVerificationVerifyIdentityResponse> {
    return tracingClient.withSpan(
      "VerifiedRecipients.verifyIdentity",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.verifyIdentity(verificationId, updatedOptions);
      }
    );
  }

  public getVerificationConstants(
    options: AcsVerificationGetVerificationConstantsOptionalParams = {}
  ): Promise<VerificationConstantsResponse> {
    return tracingClient.withSpan(
      "VerifiedRecipients.getVerificationConstants",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.getVerificationConstants(updatedOptions);
      }
    );
  }

  public requestVerification(
    options: AcsVerificationRequestVerificationOptionalParams = {}
  ): Promise<AcsVerificationRequestVerificationResponse> {
    return tracingClient.withSpan(
      "VerifiedRecipients.requestVerification",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.requestVerification(updatedOptions);
      }
    );
  }
}
