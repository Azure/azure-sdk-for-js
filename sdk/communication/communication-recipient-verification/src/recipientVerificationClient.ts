// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
import { AcsVerification, VerificationConstantsResponse } from "./generated/src/models";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { RecipientVerificationClient as RecipientVerificationGeneratedClient } from "./generated/src";
import { logger } from "./utils";
import { tracingClient } from "./generated/src/tracing";

/**
 * Client options used to configure the RecipientVerificationGeneratedClient API requests.
 */
export interface RecipientVerificationClientOptions extends CommonClientOptions {}

const isRecipientVerificationClientOptions = (
  options: any,
): options is RecipientVerificationClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

/**
 * Client class for interacting with Azure Communication Services Recipient Verification.
 */
export class RecipientVerificationClient {
  /**
   * A reference to the auto-generated RecipientVerification HTTP client.
   */
  private readonly client: RecipientVerificationGeneratedClient;

  /**
   * Initializes a new instance of the RecipientVerificationClient class using a connection string.
   *
   * @param connectionString - Connection string to connect to an Azure Communication Service resource. (eg: endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret)
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: RecipientVerificationClientOptions);

  /**
   * Initializes a new instance of the RecipientVerificationClient class using an Azure KeyCredential.
   *
   * @param endpoint - The endpoint of the service (eg: https://contoso.eastus.communications.azure.net)
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: RecipientVerificationClientOptions,
  );

  /**
   * Initializes a new instance of the RecipientVerificationClient class using an Azure KeyCredential.
   *
   * @param endpoint - The endpoint of the service (eg: https://contoso.eastus.communications.azure.net)
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: RecipientVerificationClientOptions,
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | RecipientVerificationClientOptions,
    maybeOptions: RecipientVerificationClientOptions = {},
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isRecipientVerificationClientOptions(credentialOrOptions)
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

    this.client = new RecipientVerificationGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Returns list of verified/pending phone numbers.
   *
   * @param options - Additional request options.
   */
  public getVerifications(
    options: AcsVerificationGetVerificationsOptionalParams = {},
  ): Promise<AcsVerification[]> {
    return tracingClient.withSpan(
      "RecipientVerification.getVerifications",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.getVerifications(updatedOptions);
      },
    );
  }

  /**
   * Removes a pending/verified number.
   *
   * @param verificationId - Id that is used to reference users phone number.
   * @param options - Additional request options.
   */
  public deleteVerification(
    verificationId: string,
    options: AcsVerificationDeleteVerificationOptionalParams = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "RecipientVerification.deleteVerification",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.deleteVerification(
          verificationId,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Verifies a users phone number.
   *
   * @param verificationId - Id that is used to reference users phone number.
   * @param options - Additional request options.
   */
  public verifyIdentity(
    verificationId: string,
    options: AcsVerificationVerifyIdentityOptionalParams = {},
  ): Promise<AcsVerificationVerifyIdentityResponse> {
    return tracingClient.withSpan(
      "RecipientVerification.verifyIdentity",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.verifyIdentity(verificationId, updatedOptions);
      },
    );
  }

  /**
   * Returns information about a resource in relation to recipient verification.
   *
   * @param options - Additional request options.
   */
  public getVerificationConstants(
    options: AcsVerificationGetVerificationConstantsOptionalParams = {},
  ): Promise<VerificationConstantsResponse> {
    return tracingClient.withSpan(
      "RecipientVerification.getVerificationConstants",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.getVerificationConstants(updatedOptions);
      },
    );
  }

  /**
   * Sends a code to users phone number that will be used for verification.
   *
   * @param options - Additional request options.
   */
  public requestVerification(
    options: AcsVerificationRequestVerificationOptionalParams = {},
  ): Promise<AcsVerificationRequestVerificationResponse> {
    return tracingClient.withSpan(
      "RecipientVerification.requestVerification",
      options,
      (updatedOptions) => {
        return this.client.acsVerificationOperations.requestVerification(updatedOptions);
      },
    );
  }
}
