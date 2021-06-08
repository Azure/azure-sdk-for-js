// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SDK_VERSION } from "./constants";
import { PolicyCertificates } from "./operations";
import { GeneratedClient } from "./generated/generatedClient";

import {
  AttestationSigner,
  AttestationToken,
  AttestationTokenValidationOptions,
  AttestationResult,
  AttestationData
} from "./models";

import { logger } from "./logger";
import { createSpan } from "./tracing";
import { GeneratedClientOptionalParams } from "./generated/models";
import * as Mappers from "./generated/models/mappers";

import { SpanStatusCode } from "@azure/core-tracing";
import { AttestationResponse } from "./models/attestationResponse";

import { TypeDeserializer } from "./utils/typeDeserializer";
import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { bytesToString, stringToBytes } from "./utils/utf8";

/**
 * Attestation Client Construction Options.
 */
export interface AttestationClientOptions extends CommonClientOptions {
  /**
   * Validation options to be used to validate attestation tokens received
   * from the attestation service.
   */
  validationOptions?: AttestationTokenValidationOptions;
}

/**
 * Operation options for the Attestation Client operations.
 */
export interface AttestationClientOperationOptions extends OperationOptions {
  /**
   * Validation options to be used to validate attestation tokens received
   * from the attestation service for the individual operation.
   */
  validationOptions?: AttestationTokenValidationOptions;
}

/**
 * Optional parameters for the AttestOpenEnclave API.
 *
 * @param initTimeData - data provided at the time the enclave was initialized.
 * @param runTimeData - data provided at the time the SGX quote being attested was created.
 * @param draftPolicyForAttestation - If specified, the attestation policy to be used during the attestation request.
 */
export interface AttestOpenEnclaveOptions extends AttestationClientOperationOptions {
  /**
   *initTimeData : AttestationData - data provided at the time the enclave was initialized.
   *
   */
  initTimeData?: AttestationData;
  /**
   * runTimeData  - data provided at the time the SGX quote being attested was created.
   */
  runTimeData?: AttestationData;
  /**
   * draftPolicyForAttestation - If specified, the attestation policy to be used during the attestation request.
   */
  draftPolicyForAttestation?: string;
}

/**
 * Optional parameters for the AttestSgxEnclave API.
 *
 * @param initTimeData - data provided at the time the enclave was initialized.
 * @param runTimeData - data provided at the time the SGX quote being attested was created.
 * @param draftPolicyForAttestation - If specified, the attestation policy to be used during the attestation request.
 */
export interface AttestSgxEnclaveOptions extends AttestationClientOperationOptions {
  /**
   *initTimeData : AttestationData - data provided at the time the enclave was initialized.
   *
   */
  initTimeData?: AttestationData;

  /**
   * runTimeData - data provided at the time the SGX quote being attested was created.
   */
  runTimeData?: AttestationData;

  /**
   * draftPolicyForAttestation - If specified, the attestation policy to be used during the attestation request.
   */
  draftPolicyForAttestation?: string;
}

/**
 * Operation options for the AttestTpm API.
 */
export interface AttestTpmOptions extends AttestationClientOperationOptions {}

/**
 * Attestation Client class.
 *
 * The AttestationClient class enables access to the Attestation related APIs:
 *
 * - getOpenIdMetadata
 * - getAttestationSigners
 * - attestSgxEnclave
 * - attestOpenEnclave
 * - attestTpm
 */
export class AttestationClient {
  /**
   * Creates an instance of AttestationClient.
   *
   * Example usage:
   * ```ts
   * import { AttestationClient } from "@azure/attestation";
   *
   * const client = new AttestationClient(
   *    "<service endpoint>",
   *    new TokenCredential("<>")
   * );
   * ```
   *
   * @param instanceUrl - The attestation instance base URI, for example https://mytenant.attest.azure.net.
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Attestation Client.
   */

  constructor(
    credentials: TokenCredential,
    instanceUrl: string,
    options: AttestationClientOptions = {}
  ) {
    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-api-security-attestation/${SDK_VERSION}`;
    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }
    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: GeneratedClientOptionalParams = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-request-id", "x-ms-maa-service-version"]
        }
      }
    };

    this._client = new GeneratedClient(credentials, instanceUrl, internalPipelineOptions);
    this._validationOptions = options.validationOptions;

    // Legacy compatibility classes functions which will be removed eventually.
    this.policyCertificates = new PolicyCertificates(this);
  }

  /**
   * @internal
   * Temporary function to access the generated client, used for the operations
   * TS files.
   * @returns The generated client for the attestation service.
   */
  public getGeneratedClient(): GeneratedClient {
    return this._client;
  }

  /** Attests an OpenEnclave report generated from an SGX Enclave using the OpenEnclave SDK.
   *
   * @param report - An OpenEnclave report generated by an SGX enclave.
   * @param options - Operation options for the attestOpenEnclave API call.
   * @returns Returns an AttestationResponse whose body is an AttestationResult describing
   *    the claims returned by the attestation service.
   */
  public async attestOpenEnclave(
    report: Uint8Array,
    options: AttestOpenEnclaveOptions = {}
  ): Promise<AttestationResponse<AttestationResult>> {
    const { span, updatedOptions } = createSpan("AttestationClient-attestOpenEnclave", options);
    try {
      const attestationResponse = await this._client.attestation.attestOpenEnclave(
        {
          report: report,
          initTimeData: options.initTimeData
            ? {
                data: options.initTimeData.data,
                dataType: options.initTimeData.isJson ? "JSON" : "Binary"
              }
            : undefined,
          runtimeData: options.runTimeData
            ? {
                data: options.runTimeData.data,
                dataType: options.runTimeData.isJson ? "JSON" : "Binary"
              }
            : undefined,
          draftPolicyForAttestation: options.draftPolicyForAttestation ?? undefined
        },
        updatedOptions
      );

      const token = new AttestationToken(attestationResponse.token);
      token.validateToken(
        await this._signingKeys,
        options.validationOptions ?? this._validationOptions
      );

      const attestationResult = TypeDeserializer.deserialize(
        token.getBody(),
        {
          AttestationResult: Mappers.AttestationResult,
          JsonWebKey: Mappers.JsonWebKey
        },
        "AttestationResult"
      ) as AttestationResult;

      return new AttestationResponse<AttestationResult>(token, attestationResult);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /** Attests a quote generated from SGX Enclave using the Intel SDK.
   *
   * @param quote - An SGX quote generated by an SGX enclave.
   * @param options - Operation options for the attestOpenEnclave API call.
   * @returns Returns an AttestationResponse whose body is an AttestationResult describing
   *    the claims returned by the attestation service.
   */
  public async attestSgxEnclave(
    quote: Uint8Array,
    options: AttestSgxEnclaveOptions = {}
  ): Promise<AttestationResponse<AttestationResult>> {
    const { span, updatedOptions } = createSpan("AttestationClient-attestSgxEnclave", options);
    try {
      const attestationResponse = await this._client.attestation.attestSgxEnclave(
        {
          quote: quote,
          initTimeData: options.initTimeData
            ? {
                data: options.initTimeData.data,
                dataType: options.initTimeData.isJson ? "JSON" : "Binary"
              }
            : undefined,
          runtimeData: options.runTimeData
            ? {
                data: options.runTimeData.data,
                dataType: options.runTimeData.isJson ? "JSON" : "Binary"
              }
            : undefined,
          draftPolicyForAttestation: options.draftPolicyForAttestation ?? undefined
        },
        updatedOptions
      );

      const token = new AttestationToken(attestationResponse.token);
      token.validateToken(
        await this._signingKeys,
        options.validationOptions ?? this._validationOptions
      );

      const attestationResult = TypeDeserializer.deserialize(
        token.getBody(),
        {
          AttestationResult: Mappers.AttestationResult,
          JsonWebKey: Mappers.JsonWebKey
        },
        "AttestationResult"
      ) as AttestationResult;

      return new AttestationResponse<AttestationResult>(token, attestationResult);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /** Attest a TPM based enclave.

   * See the  {@link https://docs.microsoft.com/en-us/azure/attestation/virtualization-based-security-protocol | TPM Attestation Protocol Reference} for more information.
   * 
   * @param request - Incoming request to send to the TPM attestation service, Utf8 encoded.
   * @param options - Pipeline options for TPM attestation request.
   * @returns A structure containing the response from the TPM attestation, Utf8 encoded.
   * 
   * @remarks
   * 
   * The incoming requests to the TPM attestation API are stringified JSON objects.
   * 
   * @example
   * For example, the initial call for a TPM attestation operation is:
   * 
   * ```js
   * const encodedPayload = JSON.stringify({ payload: { type: "aikcert" } });
   * const result = await client.attestTpm(encodedPayload);
   * ```
   * 
   * where stringToBytes converts the string to UTF8.
   */
  public async attestTpm(request: string, options: AttestTpmOptions = {}): Promise<string> {
    const { span, updatedOptions } = createSpan("AttestationClient-attestSgxEnclave", options);
    try {
      const response = await this._client.attestation.attestTpm(
        { data: stringToBytes(request) },
        updatedOptions
      );
      if (response.data) {
        return bytesToString(response.data);
      } else {
        throw Error("Internal error - response data cannot be undefined.");
      }
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns the list of attestation signers which can be used to sign attestation
   * service tokens.
   *
   * @param options - Client operation options.
   * @returns the set of AttestationSigners which may be used to sign attestation tokens.
   */
  public async getAttestationSigners(
    options: AttestationClientOperationOptions = {}
  ): Promise<AttestationSigner[]> {
    const { span, updatedOptions } = createSpan("AttestationClient-getAttestationSigners", options);
    try {
      const signingCertificates = await this._client.signingCertificates.get(updatedOptions);
      const signers: AttestationSigner[] = new Array();
      signingCertificates.keys?.forEach((element) => {
        signers.push(new AttestationSigner(element));
      });
      return signers;
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns the OpenID Metadata discovery document for the attestation service instance.
   * @param options - Client operation options.
   * @returns The OpenID metadata discovery document for the attestation service.
   */
  public async getOpenIdMetadata(options: AttestationClientOperationOptions = {}): Promise<any> {
    const { span, updatedOptions } = createSpan("AttestationClient-getOpenIdMetadata", options);
    try {
      const configs = await this._client.metadataConfiguration.get(updatedOptions);
      return configs;
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
    } finally {
      span.end();
    }
  }

  private _client: GeneratedClient;
  private _validationOptions?: AttestationTokenValidationOptions;
  private _signers?: Promise<AttestationSigner[]>;

  private get _signingKeys(): Promise<AttestationSigner[]> {
    if (this._signers !== undefined) {
      return Promise.resolve(this._signers);
    }
    this._signers = this.getAttestationSigners();
    return Promise.resolve(this._signers);
  }

  /**
   * Legacy property to access policy certificate management APIs.
   *
   * Will be removed.
   */
  policyCertificates: PolicyCertificates;
}
