import type { AttestationResult, AttestationSigner, AttestationTokenValidationOptions } from "./models/index.js";
import type { AttestationResponse } from "./models/attestationResponse.js";
import type { TokenCredential } from "@azure/core-auth";
import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
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
export interface AttestTpmOptions extends AttestationClientOperationOptions {
}
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
export declare class AttestationClient {
    /**
     * Creates an instance of AttestationClient.
     *
     * Example usage:
     * ```ts snippet:Attestation_Constructor_NoCreds
     * import { AttestationClient } from "@azure/attestation";
     *
     * const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
     * const client = new AttestationClient(endpoint);
     * ```
     *
     * @param endpoint - The attestation instance base URI, for example https://mytenant.attest.azure.net.
     * @param options - Options used to configure the Attestation Client.
     *
     */
    constructor(endpoint: string, options?: AttestationClientOptions);
    /**
     * Creates an instance of AttestationClient with options and credentials.
     *
     * Example usage:
     * ```ts snippet:Attestation_Constructor_Creds
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { AttestationClient } from "@azure/attestation";
     *
     * const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
     * const credentials = new DefaultAzureCredential();
     * const client = new AttestationClient(endpoint, credentials);
     * ```
     *
     * Note that credentials are required to call the `attestTpm` API.
     *
     * @param endpoint - The attestation instance base URI, for example https://mytenant.attest.azure.net.
     * @param credentials - Credentials used to configure the attestation client.
     *
     */
    constructor(endpoint: string, credentials: TokenCredential, options?: AttestationClientOptions);
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
    attestOpenEnclave(report: Uint8Array | Buffer | Blob, options?: AttestOpenEnclaveOptions): Promise<AttestationResponse<AttestationResult>>;
    /** Attests a quote generated from SGX Enclave using the Intel SDK.
     *
     * @param quote - An SGX quote generated by an SGX enclave.
     * @param options - Operation options for the attestOpenEnclave API call.
     * @returns Returns an AttestationResponse whose body is an AttestationResult describing
     *    the claims returned by the attestation service.
     * @throws {@link Error} if the `initTimeData` option and `initTimeJson` option is provided.
     * @throws {@link Error} if the `runTimeData` option and `runTimeJson` option is provided.
     */
    attestSgxEnclave(quote: Uint8Array | Buffer | Blob, options?: AttestSgxEnclaveOptions): Promise<AttestationResponse<AttestationResult>>;
    /** Attest a TPM based enclave.
  
     * See the  {@link https://learn.microsoft.com/en-us/azure/attestation/virtualization-based-security-protocol | TPM Attestation Protocol Reference} for more information.
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
     * ```snippet:AttestationClient_AttestTpm
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
    attestTpm(request: string, options?: AttestTpmOptions): Promise<string>;
    /**
     * Returns the list of attestation signers which can be used to sign attestation
     * service tokens.
     *
     * @param options - Client operation options.
     * @returns the set of AttestationSigners which may be used to sign attestation tokens.
     */
    getAttestationSigners(options?: AttestationClientOperationOptions): Promise<AttestationSigner[]>;
    /**
     * Returns the OpenID Metadata discovery document for the attestation service instance.
     * @param options - Client operation options.
     * @returns The OpenID metadata discovery document for the attestation service.
     */
    getOpenIdMetadata(options?: AttestationClientOperationOptions): Promise<Record<string, unknown>>;
    private _client;
    private _validationOptions?;
    private _signers?;
    private _signingKeys;
}
//# sourceMappingURL=attestationClient.d.ts.map