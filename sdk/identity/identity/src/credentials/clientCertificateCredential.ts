// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";
import jws from "jws";
import { v4 as uuidV4 } from "uuid";
import { readFileSync } from "fs";
import { createHash } from "crypto";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { IdentityClient } from "../client/identityClient";
import { ClientCertificateCredentialOptions } from "./clientCertificateCredentialOptions";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/api";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";

const SelfSignedJwtLifetimeMins = 10;

function timestampInSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

function addMinutes(date: Date, minutes: number): Date {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

const logger = credentialLogger("ClientCertificateCredential");

/**
 * Enables authentication to Azure Active Directory using a PEM-encoded
 * certificate that is assigned to an App Registration.  More information
 * on how to configure certificate authentication can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-certificate-credentials#register-your-certificate-with-azure-ad
 *
 */
export class ClientCertificateCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private tenantId: string;
  private clientId: string;
  private certificateString: string;
  private certificateThumbprint: string;
  private certificateX5t: string;
  private certificateX5c?: Array<string>;

  /**
   * Creates an instance of the ClientCertificateCredential with the details
   * needed to authenticate against Azure Active Directory with a certificate.
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param certificatePath The path to a PEM-encoded public/private key certificate on the filesystem.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    certificatePath: string,
    options?: ClientCertificateCredentialOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.certificateString = readFileSync(certificatePath, "utf8");

    const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;

    const publicKeys: string[] = [];

    // Match all possible certificates, in the order they are in the file. These will form the chain that is used for x5c
    let match;
    do {
      match = certificatePattern.exec(this.certificateString);
      if (match) {
        publicKeys.push(match[3]);
      }
    } while (match);

    if (publicKeys.length === 0) {
      const error = new Error(
        "The file at the specified path does not contain a PEM-encoded certificate."
      );
      logger.info(formatError(error));
      throw error;
    }

    this.certificateThumbprint = createHash("sha1")
      .update(Buffer.from(publicKeys[0], "base64"))
      .digest("hex")
      .toUpperCase();

    this.certificateX5t = Buffer.from(this.certificateThumbprint, "hex").toString("base64");
    if (options && options.includeX5c) {
      this.certificateX5c = publicKeys;
    }
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span, options: newOptions } = createSpan(
      "ClientCertificateCredential-getToken",
      options
    );
    try {
      const tokenId = uuidV4();
      const audienceUrl = `${this.identityClient.authorityHost}/${this.tenantId}/oauth2/v2.0/token`;
      let header: jws.Header;

      if (this.certificateX5c) {
        header = {
          typ: "JWT",
          alg: "RS256",
          x5t: this.certificateX5t,
          x5c: this.certificateX5c
        };
      } else {
        header = {
          typ: "JWT",
          alg: "RS256",
          x5t: this.certificateX5t
        };
      };

      const payload = {
        iss: this.clientId,
        sub: this.clientId,
        aud: audienceUrl,
        jti: tokenId,
        nbf: timestampInSeconds(new Date()),
        exp: timestampInSeconds(addMinutes(new Date(), SelfSignedJwtLifetimeMins))
      };

      const clientAssertion = jws.sign({
        header,
        payload,
        secret: this.certificateString
      });

      const webResource = this.identityClient.createWebResource({
        url: audienceUrl,
        method: "POST",
        disableJsonStringifyOnBody: true,
        deserializationMapper: undefined,
        body: qs.stringify({
          response_type: "token",
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          client_assertion: clientAssertion,
          scope: typeof scopes === "string" ? scopes : scopes.join(" ")
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        abortSignal: options && options.abortSignal,
        spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions
      });

      const tokenResponse = await this.identityClient.sendTokenRequest(webResource);
      logger.getToken.info(formatSuccess(scopes));
      return (tokenResponse && tokenResponse.accessToken) || null;
    } catch (err) {
      const code =
        err.name === AuthenticationErrorName
          ? CanonicalCode.UNAUTHENTICATED
          : CanonicalCode.UNKNOWN;
      span.setStatus({
        code,
        message: err.message
      });
      logger.getToken.info(formatError(err));
      throw err;
    } finally {
      span.end();
    }
  }
}
