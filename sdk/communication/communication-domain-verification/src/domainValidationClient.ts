// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CreateDomainOwnershipChallengeOptions,
  DomainOwnershipChallenge,
  VerifyDomainOwnershipOptions,
  DomainOwnership,
} from "./models";
import { ConvertToDomainOwnership } from "./mappers";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { tracingClient, logger } from "./utils";
import {
  CommunicationError,
  DomainVerificationClient as DomainVerificationGeneratedClient,
} from "./generated/src";
import { KnownChallengeType } from "./generated/src/models";

/**
 * Client options used to configure DomainVerification Client API requests.
 */
export interface DomainVerificationClientOptions extends CommonClientOptions {}

/**
 * Checks whether the type of a value is DomainVerificationClientOptions or not.
 *
 * @param options - The value being checked.
 * @returns
 */
const isDomainVerificationClientOptions = (
  options: any
): options is DomainVerificationClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

/**
 * A DomainVerificationClient represents a Client to the Azure Communication Domain Verification service allowing you
 * to verify domain.
 */
export class DomainVerificationClient {
  private client: DomainVerificationGeneratedClient;

  /**
   * Initializes a new instance of the DomainVerificationClient class
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: DomainVerificationClientOptions);

  /**
   * Initializes a new instance of the DomainVerificationClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: DomainVerificationClientOptions
  );

  /**
   * Initializes a new instance of the DomainVerificationClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: DomainVerificationClientOptions
  );

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | DomainVerificationClientOptions,
    maybeOptions: DomainVerificationClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isDomainVerificationClientOptions(credentialOrOptions)
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

    this.client = new DomainVerificationGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Create Domain ownership challenge
   * @param domain - Domain uri (ex: contoso.com)
   * @param options - Additional request options
   * @returns - Returns challenge value of DNS record as string (ex: MS12345)
   */
  public async createDomainOwnershipChallenge(
    domain: string,
    options: CreateDomainOwnershipChallengeOptions = {}
  ): Promise<DomainOwnershipChallenge> {
    return tracingClient.withSpan(
      "DomainVerificationClient-createDomainOwnershipChallenge",
      options,
      async (updatedOptions) => {
        try {
          return await this.client.createDomainOwnershipChallenge.post(domain, updatedOptions);
        } catch (e: any) {
          throw {
            code: e.code,
            message: e.message,
          } as CommunicationError;
        }
      }
    );
  }

  /**
   * Verify domain ownership
   * @param domain - Domain uri (ex: contoso.com)
   * @param challengeType - Type of DNS record, now only TXT is supported
   * @param options - Additional request options
   * @returns - Returns Status of verification (ex: Verified | NotVerified | VerificationPending)
   */
  public async verifyDomainOwnership(
    domain: string,
    options: VerifyDomainOwnershipOptions = {}
  ): Promise<DomainOwnership> {
    return tracingClient.withSpan(
      "DomainVerificationClient-verifyDomainOwnership",
      options,
      async (updatedOptions) => {
        try {
          const result = await this.client.verifyDomainOwnership.post(
            domain,
            KnownChallengeType.TXT,
            updatedOptions
          );
          return ConvertToDomainOwnership(result);
        } catch (e: any) {
          throw {
            code: e.code,
            message: e.message,
          } as CommunicationError;
        }
      }
    );
  }
}
