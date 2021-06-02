// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpanStatusCode } from "@azure/core-tracing";

import { SDK_VERSION } from "./constants";
import { GeneratedClient } from "./generated/generatedClient";

import { logger } from "./logger";
import { createSpan } from "./tracing";

import { GeneratedClientOptionalParams } from "./generated/models";

import { bytesToString } from "./utils/utf8.browser";

import {
  AttestationResponse,
  AttestationToken,
  AttestationType,
  AttestationSigningKey,
  StoredAttestationPolicy,
  PolicyResult
} from "./models";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { TokenCredential } from "@azure/core-auth";

/**
 * Attestation Client Construction Options.
 */
export interface AttestationAdministrationClientOptions extends CommonClientOptions {}

/**
 * Operation options for the Attestation Administration Client operations.
 */
export interface AttestationAdministrationClientOperationOptions extends OperationOptions {}

/**
 * Operation options for the AttestTpm API.
 */
export interface GetPolicyOptions extends AttestationAdministrationClientOperationOptions {}

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
   * @param instanceUrl - The attestation instance base URI, for example https://mytenant.attest.azure.net.
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Form Recognizer client.
   */

  constructor(
    credentials: TokenCredential,
    instanceUrl: string,
    options: AttestationAdministrationClientOptions = {}
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
    options: GetPolicyOptions = {}
  ): Promise<AttestationResponse<string>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-getPolicy",
      options
    );
    try {
      const getPolicyResult = await this._client.policy.get(attestationType, updatedOptions);

      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationToken(getPolicyResult.token);

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const policyResult = PolicyResult.create(token.getBody());

      // The policyResult.policy value will be a JSON Web Signature representing
      // the actual policy object being retrieved. Serialize the token to an
      // AttestationToken object so we can access the body properties on the token.
      if (!policyResult.policy) {
        throw Error("Server returned an invalid getPolicy response!");
      }

      const policyToken = new AttestationToken(policyResult.policy);
      const storedPolicy = StoredAttestationPolicy.deserialize(policyToken.getBody());

      // Finally, retrieve the stored attestationPolicy value and return that
      // as the AttestationResponse to the caller.
      if (storedPolicy.attestationPolicy) {
        return new AttestationResponse<string>(
          token,
          bytesToString(storedPolicy.attestationPolicy)
        );
      } else {
        throw Error("Server returned an empty attestationPolicy??!");
      }
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  public async setPolicy(
    attestationType: AttestationType,
    newPolicyDocument: string,
    signingKey?: AttestationSigningKey,
    options: GetPolicyOptions = {}
  ): Promise<AttestationResponse<PolicyResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-setPolicy",
      options
    );
    try {
      const storedAttestationPolicy = new StoredAttestationPolicy(newPolicyDocument).serialize();
      const setPolicyToken = AttestationToken.create({
        body: storedAttestationPolicy,
        signer: signingKey
      });

      const setPolicyResult = await this._client.policy.set(
        attestationType,
        setPolicyToken.serialize(),
        updatedOptions
      );

      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationToken(setPolicyResult.token);

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const policyResult = PolicyResult.create(token.getBody());

      // The policyResult.policy value will be a JSON Web Signature representing
      // the actual policy object being retrieved. Serialize the token to an
      // AttestationToken object so we can access the body properties on the token.
      return new AttestationResponse<PolicyResult>(token, policyResult);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  public async resetPolicy(
    attestationType: AttestationType,
    signingKey?: AttestationSigningKey,
    options: GetPolicyOptions = {}
  ): Promise<AttestationResponse<PolicyResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-setPolicy",
      options
    );
    try {
      const resetPolicyToken = AttestationToken.create({ signer: signingKey });

      const resetPolicyResult = await this._client.policy.reset(
        attestationType,
        resetPolicyToken.serialize(),
        updatedOptions
      );

      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationToken(resetPolicyResult.token);

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const policyResult = PolicyResult.create(token.getBody());

      // The policyResult.policy value will be a JSON Web Signature representing
      // the actual policy object being retrieved. Serialize the token to an
      // AttestationToken object so we can access the body properties on the token.
      return new AttestationResponse<PolicyResult>(token, policyResult);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  private _client: GeneratedClient;
}
