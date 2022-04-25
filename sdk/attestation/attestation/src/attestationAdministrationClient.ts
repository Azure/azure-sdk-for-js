// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpanStatusCode } from "@azure/core-tracing";

import { GeneratedClient } from "./generated/generatedClient";

import { logger } from "./logger";
import { createSpan } from "./tracing";

import {
  AttestationCertificateManagementBody,
  GeneratedClientOptionalParams,
  JsonWebKey,
  PolicyCertificatesResult,
} from "./generated/models";

import { bytesToString } from "./utils/utf8";

import {
  AttestationResponse,
  AttestationSigner,
  AttestationTokenValidationOptions,
  AttestationType,
  PolicyCertificatesModificationResult,
  PolicyResult,
} from "./models";
import { StoredAttestationPolicy } from "./models/storedAttestationPolicy";

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { TokenCredential } from "@azure/core-auth";
import { TypeDeserializer } from "./utils/typeDeserializer";
import * as Mappers from "./generated/models/mappers";

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";
import { hexToBase64 } from "./utils/helpers";
import { _policyResultFromGenerated } from "./models/policyResult";
import { _attestationSignerFromGenerated } from "./models/attestationSigner";
import { verifyAttestationSigningKey } from "./utils/helpers";
import { createAttestationResponse } from "./models/attestationResponse";
import { AttestationTokenImpl } from "./models/attestationToken";

/**
 * Attestation Client Construction Options.
 */
export interface AttestationAdministrationClientOptions extends CommonClientOptions {
  /**
   * Options to be used globally to validate attestation tokens received from
   * the attestation service.
   */
  validationOptions?: AttestationTokenValidationOptions;
}

/**
 * Operation options for the Attestation Administration Client operations.
 */
export interface AttestationAdministrationClientOperationOptions extends OperationOptions {
  /**
   * Options to be used globally to validate attestation tokens received from
   * the attestation service.
   */
  validationOptions?: AttestationTokenValidationOptions;
}

/**
 * Operation options for the administration Policy operations.
 */
export interface AttestationAdministrationClientPolicyOperationOptions
  extends AttestationAdministrationClientOperationOptions {
  /**
   * Optional Private key used to sign the token sent to the attestation service.
   *
   * Required for Isolated Mode attestation instances.
   */
  privateKey?: string;

  /**
   * Optional certificate which can validate the token sent to the attestation service.
   *
   * Required for Isolated Mode attestation instances.
   *
   * If the service instance is in Isolated mode, the certificate *must* be one
   * of the configured policy management certificates.
   */
  certificate?: string;
}

/**
 * Operation options for the Policy Certificates operations.
 */
export interface AttestationAdministrationClientPolicyCertificateOperationOptions
  extends AttestationAdministrationClientOperationOptions {}

/**
 * Attestation Client class.
 *
 * The AttestationClient class enables access to the Attestation related APIs:
 *
 * - getPolicy
 * - setPolicy
 * - resetPolicy
 * - getPolicyManagementCertificates
 * - addPolicyManagementCertificate
 * - removePolicyManagementCertificate
 */
export class AttestationAdministrationClient {
  /**
   * Creates an instance of AttestationAdministrationClient.
   *
   * Example usage:
   * ```ts
   * import { AttestationAdministrationClient } from "@azure/attestation";
   *
   * const client = new AttestationAdministrationClient(
   *    "<service endpoint>",
   *    new TokenCredential("<>")
   * );
   * ```
   *
   * @param endpoint - The attestation instance endpoint, for example https://mytenant.attest.azure.net.
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Form Recognizer client.
   */

  constructor(
    endpoint: string,
    credentials: TokenCredential,
    options: AttestationAdministrationClientOptions = {}
  ) {
    this._validationOptions = options.validationOptions;

    const internalPipelineOptions: GeneratedClientOptionalParams = {
      ...options,
      ...{
        credential: credentials,
        credentialScopes: ["https://attest.azure.net/.default"],
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-request-id", "x-ms-maa-service-version"],
        },
      },
    };

    this._client = new GeneratedClient(endpoint, internalPipelineOptions);
  }

  /**
   * Retrieves the attestation policy document from the server, and returns it
   * to the caller.
   *
   * @param attestationType - AttestationType for which to retrieve policy.
   * @param options - Pipeline and client options for the `getPolicy` call.
   * @returns `AttestationResponse<string>` - the `value` property is the
   *      attestation policy,  the `token` property will be the actual token
   *      returned by the attestation service.
   */
  public async getPolicy(
    attestationType: AttestationType,
    options: AttestationAdministrationClientPolicyOperationOptions = {}
  ): Promise<AttestationResponse<string>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-getPolicy",
      options
    );
    try {
      const getPolicyResult = await this._client.policy.get(attestationType, updatedOptions);

      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(getPolicyResult.token);

      // Validate the token returned from the service.
      const problems = token.getTokenProblems(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );
      if (problems.length) {
        throw new Error(problems.join(";"));
      }

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const policyResult = _policyResultFromGenerated(token.getBody());

      // The policyResult.policy value will be a JSON Web Signature representing
      // the actual policy object being retrieved. Serialize the token to an
      // AttestationToken object so we can access the body properties on the token.
      if (!policyResult.policy) {
        throw Error("Server returned an invalid getPolicy response!");
      }

      const policyToken = new AttestationTokenImpl(policyResult.policy);

      const storedPolicy = StoredAttestationPolicy.deserialize(policyToken.getBody());

      // Finally, retrieve the stored attestationPolicy value and return that
      // as the AttestationResponse to the caller.
      return createAttestationResponse<string>(
        token,
        bytesToString(storedPolicy.attestationPolicy)
      );
    } catch (e: any) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets the attestation policy for the specified {@link attestationType}.
   *
   * @param attestationType - Attestation Type for which to set policy.
   * @param newPolicyDocument - Policy document to be set.
   * @param options - call options.
   * @returns An {@link AttestationResponse} wrapping a {@link PolicyResult}.
   *  Clients can use the PolicyResult to validate that the policy was actually
   *  set by the attestation service.
   *
   * @remarks
   *
   * Please note that if the attestation service instance is running in "Isolated"
   * mode, the {@link signingKey} must be one of the signing keys configured for the
   * service instance.
   *
   * @throws {@link Error} when a private key is specified without a certificate and vice versa.
   * @throws {@link Error} when the key in the certificate provided does not match the private key.
   */
  public async setPolicy(
    attestationType: AttestationType,
    newPolicyDocument: string,
    options: AttestationAdministrationClientPolicyOperationOptions = {}
  ): Promise<AttestationResponse<PolicyResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-setPolicy",
      options
    );
    try {
      if (
        (!options.privateKey && options.certificate) ||
        (options.privateKey && !options.certificate)
      ) {
        throw new Error(
          "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided."
        );
      }

      if (options.privateKey && options.certificate) {
        verifyAttestationSigningKey(options.privateKey, options.certificate);
      }

      const storedAttestationPolicy = new StoredAttestationPolicy(newPolicyDocument).serialize();
      const setPolicyToken = AttestationTokenImpl.create({
        body: storedAttestationPolicy,
        ...options,
      });

      const setPolicyResult = await this._client.policy.set(
        attestationType,
        setPolicyToken.serialize(),
        updatedOptions
      );

      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(setPolicyResult.token);
      const problems = token.getTokenProblems(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );
      if (problems.length) {
        throw new Error(problems.join(";"));
      }

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const policyResult = _policyResultFromGenerated(token.getBody());

      // The policyResult.policy value will be a JSON Web Signature representing
      // the actual policy object being retrieved. Serialize the token to an
      // AttestationToken object so we can access the body properties on the token.
      return createAttestationResponse<PolicyResult>(token, policyResult);
    } catch (e: any) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Resets the attestation policy for the specified {@link attestationType} to
   * the default value.
   *
   * @param attestationType - Attestation Type for which to set policy.
   * @param options - call options.
   * @returns An {@link AttestationResponse} wrapping a {@link PolicyResult}.
   *  Clients can use the PolicyResult to validate that the policy was actually
   *  reset by the attestation service.
   *
   * @remarks
   *
   * Please note that if the attestation service instance is running in "Isolated"
   * mode, the {@link signingKey} must be one of the signing keys configured for the
   * service instance.
   *
   * @throws {@link Error} when a private key is specified without a certificate and vice versa.
   * @throws {@link Error} when the key in the certificate provided does not match the private key.
   */

  public async resetPolicy(
    attestationType: AttestationType,
    options: AttestationAdministrationClientPolicyOperationOptions = {}
  ): Promise<AttestationResponse<PolicyResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-setPolicy",
      options
    );
    try {
      if (
        (!options.privateKey && options.certificate) ||
        (options.privateKey && !options.certificate)
      ) {
        throw new Error(
          "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided."
        );
      }

      if (options.privateKey && options.certificate) {
        verifyAttestationSigningKey(options.privateKey, options.certificate);
      }

      const resetPolicyToken = AttestationTokenImpl.create({
        privateKey: options.privateKey,
        certificate: options.certificate,
      });

      const resetPolicyResult = await this._client.policy.reset(
        attestationType,
        resetPolicyToken.serialize(),
        updatedOptions
      );

      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(resetPolicyResult.token);
      const problems = token.getTokenProblems(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );
      if (problems.length) {
        throw new Error(problems.join(";"));
      }

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const policyResult = _policyResultFromGenerated(token.getBody());

      // The policyResult.policy value will be a JSON Web Signature representing
      // the actual policy object being retrieved. Serialize the token to an
      // AttestationToken object so we can access the body properties on the token.
      return createAttestationResponse<PolicyResult>(token, policyResult);
    } catch (e: any) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /** Returns the set of policy management certificates for this attestation instance.
   *
   * @remarks If the attestation instance is not in `Isolated` mode, this list will
   *    always be empty.
   *
   * @param options - Options for the call to the attestation service.
   * @returns AttestationResponse wrapping a list of Attestation Signers.
   */
  public async getPolicyManagementCertificates(
    options: AttestationAdministrationClientPolicyCertificateOperationOptions = {}
  ): Promise<AttestationResponse<AttestationSigner[]>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-getPolicyManagementCertificates",
      options
    );
    try {
      const getCertificatesResult = await this._client.policyCertificates.get(updatedOptions);
      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(getCertificatesResult.token);
      const problems = token.getTokenProblems(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );
      if (problems.length) {
        throw new Error(problems.join(";"));
      }

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const jwks = TypeDeserializer.deserialize(
        token.getBody(),
        {
          PolicyCertificatesResult: Mappers.PolicyCertificatesResult,
          JsonWebKeySet: Mappers.JsonWebKeySet,
          JsonWebKey: Mappers.JsonWebKey,
        },
        "PolicyCertificatesResult"
      ) as PolicyCertificatesResult;

      const policyCertificates = new Array<AttestationSigner>();
      jwks.policyCertificates.keys.forEach((jwk) => {
        policyCertificates.push(_attestationSignerFromGenerated(jwk));
      });

      return createAttestationResponse<AttestationSigner[]>(token, policyCertificates);
    } catch (e: any) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /** Add a new certificate chain to the set of policy management certificates.
   *
   * @param pemCertificate - PEM encoded certificate to add to the set of policy management certificates.
   * @param privateKey - Existing attestation private key used to sign the incoming request.
   * @param certificate - Existing attestation certificate used to verify the incoming request.
   * @param options - Options used in the call to the service.
   * @returns An attestation response including a PolicyCertificatesModificationResult
   *
   * @remarks This API is only supported on `isolated` attestation instances.
   *
   * The signing key MUST be one of the existing attestation signing certificates. The
   * new pemCertificate is signed using the signingKey and the service will validate the
   * signature before allowing the addition.
   *
   * @throws {@link Error} when a private key is specified without a certificate and vice versa.
   * @throws {@link Error} when the key in the certificate provided does not match the private key.
   *
   */
  public async addPolicyManagementCertificate(
    pemCertificate: string,
    privateKey: string,
    certificate: string,
    options: AttestationAdministrationClientPolicyCertificateOperationOptions = {}
  ): Promise<AttestationResponse<PolicyCertificatesModificationResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-addPolicyManagementCertificate",
      options
    );
    try {
      if ((!privateKey && certificate) || (privateKey && !certificate)) {
        throw new Error(
          "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided."
        );
      }

      if (privateKey && certificate) {
        verifyAttestationSigningKey(privateKey, certificate);
      }

      const cert = new jsrsasign.X509();
      cert.readCertPEM(pemCertificate);
      const kty = this.keyTypeFromCertificate(cert);

      const jwk: JsonWebKey = {
        x5C: [hexToBase64(cert.hex)],
        kty: kty,
      };

      const addBody: AttestationCertificateManagementBody = {
        policyCertificate: jwk,
      };

      const addCertToken = AttestationTokenImpl.create({
        body: TypeDeserializer.serialize(
          addBody,
          {
            AttestationCertificateManagementBody: Mappers.AttestationCertificateManagementBody,
            JsonWebKey: Mappers.JsonWebKey,
          },
          Mappers.AttestationCertificateManagementBody
        ),
        privateKey: privateKey,
        certificate: certificate,
      });

      const addCertificateResult = await this._client.policyCertificates.add(
        addCertToken.serialize(),
        updatedOptions
      );
      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(addCertificateResult.token);
      const problems = token.getTokenProblems(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );
      if (problems.length) {
        throw new Error(problems.join(";"));
      }

      // Deserialize the PolicyCertificatesModificationResult object.
      const result = TypeDeserializer.deserialize(
        token.getBody(),
        {
          PolicyCertificatesModificationResult: Mappers.PolicyCertificatesModificationResult,
          JsonWebKeySet: Mappers.JsonWebKeySet,
          JsonWebKey: Mappers.JsonWebKey,
        },
        "PolicyCertificatesModificationResult"
      ) as PolicyCertificatesModificationResult;

      return createAttestationResponse<PolicyCertificatesModificationResult>(token, result);
    } catch (e: any) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  private keyTypeFromCertificate(cert: any): string {
    let kty: string;
    switch (cert.getSignatureAlgorithmName()) {
      case "SHA256withRSA":
      case "SHA384withRSA":
      case "SHA512withRSA":
        kty = "RSA";
        break;
      case "SHA256withECDSA":
      case "SHA384withECDSA":
        kty = "EC";
        break;
      default:
        kty = "RSA";
        break;
    }
    return kty;
  }

  /** Add a new certificate chain to the set of policy management certificates.
   *
   * @param pemCertificate - PEM encoded certificate to add to the set of policy management certificates.
   * @param privateKey - Existing attestation private key used to sign the incoming request.
   * @param certificate - Existing attestation certificate used to verify the incoming request.
   * @param options - Options used in the call to the service.
   * @returns An attestation response including a PolicyCertificatesModificationResult
   *
   * @remarks This API is only supported on `isolated` attestation instances.
   *
   * The signing key MUST be one of the existing attestation signing certificates. The
   * new pemCertificate is signed using the signingKey and the service will validate the
   * signature before allowing the addition.
   *
   * @throws {@link Error} when a private key is specified without a certificate and vice versa.
   * @throws {@link Error} when the key in the certificate provided does not match the private key.
   */
  public async removePolicyManagementCertificate(
    pemCertificate: string,
    privateKey: string,
    certificate: string,
    options: AttestationAdministrationClientPolicyCertificateOperationOptions = {}
  ): Promise<AttestationResponse<PolicyCertificatesModificationResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-removePolicyManagementCertificate",
      options
    );
    try {
      if ((!privateKey && certificate) || (privateKey && !certificate)) {
        throw new Error(
          "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided."
        );
      }

      if (privateKey && certificate) {
        verifyAttestationSigningKey(privateKey, certificate);
      }

      const cert = new jsrsasign.X509();
      cert.readCertPEM(pemCertificate);
      const kty = this.keyTypeFromCertificate(cert);

      const jwk: JsonWebKey = {
        x5C: [hexToBase64(cert.hex)],
        kty: kty,
      };

      const addBody: AttestationCertificateManagementBody = {
        policyCertificate: jwk,
      };

      const removeCertToken = AttestationTokenImpl.create({
        body: TypeDeserializer.serialize(
          addBody,
          {
            AttestationCertificateManagementBody: Mappers.AttestationCertificateManagementBody,
            JsonWebKey: Mappers.JsonWebKey,
          },
          Mappers.AttestationCertificateManagementBody
        ),
        privateKey: privateKey,
        certificate: certificate,
      });

      const removeCertificateResult = await this._client.policyCertificates.remove(
        removeCertToken.serialize(),
        updatedOptions
      );
      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(removeCertificateResult.token);
      const problems = token.getTokenProblems(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );
      if (problems.length) {
        throw new Error(problems.join(";"));
      }

      // Deserialize the PolicyCertificatesModificationResult object.
      const result = TypeDeserializer.deserialize(
        token.getBody(),
        {
          PolicyCertificatesModificationResult: Mappers.PolicyCertificatesModificationResult,
          JsonWebKeySet: Mappers.JsonWebKeySet,
          JsonWebKey: Mappers.JsonWebKey,
        },
        "PolicyCertificatesModificationResult"
      ) as PolicyCertificatesModificationResult;

      return createAttestationResponse<PolicyCertificatesModificationResult>(token, result);
    } catch (e: any) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  private async signingKeys(): Promise<AttestationSigner[]> {
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

  private _client: GeneratedClient;
  private _signers?: AttestationSigner[];
  private _validationOptions?: AttestationTokenValidationOptions;
}
