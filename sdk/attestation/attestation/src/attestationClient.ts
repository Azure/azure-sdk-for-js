// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GeneratedClient } from "./generated/generatedClient";

import { AttestationResult, AttestationSigner, AttestationTokenValidationOptions } from "./models";

import {
  GeneratedAttestationResult,
  InitTimeData,
  KnownDataType,
  RuntimeData,
} from "./generated/models";

import { logger } from "./logger";
import { createSpan } from "./tracing";
import { GeneratedClientOptionalParams } from "./generated/models";
import * as Mappers from "./generated/models/mappers";

import { SpanStatusCode } from "@azure/core-tracing";
import { AttestationResponse, createAttestationResponse } from "./models/attestationResponse";

import { TypeDeserializer } from "./utils/typeDeserializer";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { bytesToString, stringToBytes } from "./utils/utf8";
import { _attestationResultFromGenerated } from "./models/attestationResult";
import { _attestationSignerFromGenerated } from "./models/attestationSigner";
import { AttestationTokenImpl } from "./models/attestationToken";
import { Uint8ArrayFromInput } from "./utils/buffer";
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
   *initTimeData : data provided at the time the enclave was initialized, to be interpreted as binary data.
   *
   */
  initTimeData?: Uint8Array | Buffer | Blob;

  /**
   * inittimeJson : data provided at the time the enclave was initialized, to be interpreted as JSON data.
   */
  initTimeJson?: Uint8Array | Buffer | Blob;

  /**
   * runTimeData  - data provided at the time the OpenEnclave report being attested was created to be interpreted as binary data.
   */
  runTimeData?: Uint8Array | Buffer | Blob;

  /**
   * runTimeJson  - data provided at the time the OpenEnclave report being attested was created to be interpreted as JSON data.
   */
  runTimeJson?: Uint8Array | Buffer | Blob;

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
   *initTimeData : data provided at the time the enclave was initialized, to be interpreted as binary data.
   *
   */
  initTimeData?: Uint8Array | Buffer | Blob;

  /**
   * inittimeJson : data provided at the time the enclave was initialized, to be interpreted as JSON data.
   */
  initTimeJson?: Uint8Array | Buffer | Blob;

  /**
   * runTimeData  - data provided at the time the OpenEnclave report being attested was created to be interpreted as binary data.
   */
  runTimeData?: Uint8Array | Buffer | Blob;

  /**
   * runTimeJson  - data provided at the time the OpenEnclave report being attested was created to be interpreted as JSON data.
   */
  runTimeJson?: Uint8Array | Buffer | Blob;

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
   *    "<service endpoint>"
   * );
   * ```
   *
   * @param endpoint - The attestation instance base URI, for example https://mytenant.attest.azure.net.
   * @param options - Options used to configure the Attestation Client.
   *
   */
  public constructor(endpoint: string, options?: AttestationClientOptions);

  /**
   * Creates an instance of AttestationClient with options and credentials.
   *
   * Example usage:
   * ```ts
   * import { AttestationClient } from "@azure/attestation";
   *
   * const client = new AttestationClient(
   *    "<service endpoint>",
   *    new TokenCredential("<>"),
   *    { tokenValidationOptions: { validateToken: false } }
   * );
   * ```
   *
   * Note that credentials are required to call the `attestTpm` API.
   *
   * @param endpoint - The attestation instance base URI, for example https://mytenant.attest.azure.net.
   * @param credentials - Credentials used to configure the attestation client.
   *
   */
  public constructor(
    endpoint: string,
    credentials: TokenCredential,
    options?: AttestationClientOptions
  );
  public constructor(
    endpoint: string,
    credentialsOrOptions?: TokenCredential | AttestationClientOptions,
    clientOptions: AttestationClientOptions = {}
  ) {
    let credentialScopes: string[] | undefined = undefined;
    let credential: TokenCredential | undefined = undefined;
    let options: AttestationClientOptions;

    if (credentialsOrOptions && isTokenCredential(credentialsOrOptions)) {
      credential = credentialsOrOptions;
      credentialScopes = ["https://attest.azure.net/.default"];
      options = clientOptions;
    } else {
      options = credentialsOrOptions || {};
    }

    const internalPipelineOptions: GeneratedClientOptionalParams = {
      ...options,
      ...{
        credentialScopes: credentialScopes,
        credential: credential,
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-request-id", "x-ms-maa-service-version"],
        },
      },
    };

    this._client = new GeneratedClient(endpoint, internalPipelineOptions);
    this._validationOptions = options.validationOptions;
  }

  /** Attests an OpenEnclave report generated from an SGX Enclave using the OpenEnclave SDK.
   *
   * @param report - An OpenEnclave report generated by an SGX enclave.
   * @param options - Operation options for the attestOpenEnclave API call.
   * @returns Returns an AttestationResponse whose body is an AttestationResult describing
   *    the claims returned by the attestation service.
   *
   * @throws {@link Error} if the `initTimeData` option and `initTimeJson` option is provided.
   * @throws {@link Error} if the `runTimeData` option and `runTimeJson` option is provided.
   * @throws {@link Error} if the `initTimeJson` option is provided and the value of `initTimeJson` is not JSON.
   * @throws {@link Error} if the `runTimeJson` option is provided and the value of `runTimeJson` is not JSON.
   */
  public async attestOpenEnclave(
    report: Uint8Array | Buffer | Blob,
    options: AttestOpenEnclaveOptions = {}
  ): Promise<AttestationResponse<AttestationResult>> {
    const { span, updatedOptions } = createSpan("AttestationClient-attestOpenEnclave", options);

    try {
      if (options.initTimeData !== undefined && options.initTimeJson !== undefined) {
        throw new Error("Cannot provide both initTimeData and initTimeJson.");
      }

      if (options.runTimeData !== undefined && options.runTimeJson !== undefined) {
        throw new Error("Cannot provide both runTimeData and runTimeJson.");
      }

      const initData = await Uint8ArrayFromInput(options.initTimeData ?? options.initTimeJson);

      const initTimeData: InitTimeData | undefined = initData
        ? {
            data: initData,
            dataType:
              options.initTimeJson !== undefined ? KnownDataType.Json : KnownDataType.Binary,
          }
        : undefined;

      const runData = await Uint8ArrayFromInput(options.runTimeData ?? options.runTimeJson);

      const runTimeData: RuntimeData | undefined = runData
        ? {
            data: runData,
            dataType: options.runTimeJson !== undefined ? KnownDataType.Json : KnownDataType.Binary,
          }
        : undefined;

      const attestationResponse = await this._client.attestation.attestOpenEnclave(
        {
          report: await Uint8ArrayFromInput(report),
          initTimeData: initTimeData,
          runtimeData: runTimeData,
          draftPolicyForAttestation: options.draftPolicyForAttestation ?? undefined,
        },
        updatedOptions
      );

      const token = new AttestationTokenImpl(attestationResponse.token);
      const problems = token.getTokenProblems(
        await this._signingKeys(),
        options.validationOptions ?? this._validationOptions
      );
      if (problems.length) {
        throw new Error(problems.join(";"));
      }

      const attestationResult = TypeDeserializer.deserialize(
        token.getBody(),
        {
          GeneratedAttestationResult: Mappers.GeneratedAttestationResult,
          JsonWebKey: Mappers.JsonWebKey,
        },
        "GeneratedAttestationResult"
      ) as GeneratedAttestationResult;

      return createAttestationResponse<AttestationResult>(
        token,
        _attestationResultFromGenerated(attestationResult)
      );
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
   * @throws {@link Error} if the `initTimeData` option and `initTimeJson` option is provided.
   * @throws {@link Error} if the `runTimeData` option and `runTimeJson` option is provided.
   */
  public async attestSgxEnclave(
    quote: Uint8Array | Buffer | Blob,
    options: AttestSgxEnclaveOptions = {}
  ): Promise<AttestationResponse<AttestationResult>> {
    const { span, updatedOptions } = createSpan("AttestationClient-attestSgxEnclave", options);
    try {
      if (options.initTimeData !== undefined && options.initTimeJson !== undefined) {
        throw new Error("Cannot provide both initTimeData and initTimeJson.");
      }

      if (options.runTimeData !== undefined && options.runTimeJson !== undefined) {
        throw new Error("Cannot provide both runTimeData and runTimeJson.");
      }

      const initData = await Uint8ArrayFromInput(options.initTimeData ?? options.initTimeJson);

      const initTimeData: InitTimeData | undefined = initData
        ? {
            data: initData,
            dataType:
              options.initTimeJson !== undefined ? KnownDataType.Json : KnownDataType.Binary,
          }
        : undefined;

      const runData = await Uint8ArrayFromInput(options.runTimeData ?? options.runTimeJson);
      const runTimeData: RuntimeData | undefined = runData
        ? {
            data: runData,
            dataType: options.runTimeJson !== undefined ? KnownDataType.Json : KnownDataType.Binary,
          }
        : undefined;

      const attestationResponse = await this._client.attestation.attestSgxEnclave(
        {
          quote: await Uint8ArrayFromInput(quote),
          initTimeData: initTimeData,
          runtimeData: runTimeData,
          draftPolicyForAttestation: options.draftPolicyForAttestation ?? undefined,
        },
        updatedOptions
      );

      const token = new AttestationTokenImpl(attestationResponse.token);
      const problems = token.getTokenProblems(
        await this._signingKeys(),
        options.validationOptions ?? this._validationOptions
      );
      if (problems.length) {
        throw new Error(problems.join(";"));
      }

      const attestationResult = TypeDeserializer.deserialize(
        token.getBody(),
        {
          GeneratedAttestationResult: Mappers.GeneratedAttestationResult,
          JsonWebKey: Mappers.JsonWebKey,
        },
        "GeneratedAttestationResult"
      ) as GeneratedAttestationResult;

      return createAttestationResponse<AttestationResult>(
        token,
        _attestationResultFromGenerated(attestationResult)
      );
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
   * 
   * Note that the attestTpm requires an attestation client which is configured with
   * authentication credentials.
   * 
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
        signers.push(_attestationSignerFromGenerated(element));
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
  public async getOpenIdMetadata(
    options: AttestationClientOperationOptions = {}
  ): Promise<Record<string, unknown>> {
    const { span, updatedOptions } = createSpan("AttestationClient-getOpenIdMetadata", options);
    try {
      const configs = await this._client.metadataConfiguration.get(updatedOptions);
      return configs;
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  private _client: GeneratedClient;
  private _validationOptions?: AttestationTokenValidationOptions;
  private _signers?: AttestationSigner[];

  private async _signingKeys(): Promise<AttestationSigner[]> {
    if (this._signers !== undefined) {
      return this._signers;
    }
    const jwks = await this._client.signingCertificates.get();
    const signers: AttestationSigner[] = new Array();
    jwks.keys?.forEach((element) => {
      signers.push(_attestationSignerFromGenerated(element));
    });
    this._signers = signers;
    return this._signers;
  }
}
