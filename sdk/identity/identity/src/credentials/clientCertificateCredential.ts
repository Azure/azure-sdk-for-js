// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "fs";
import { createHash } from "crypto";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { IdentityClientOptions, IdentityClient } from "../client/identityClient";

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
  private _tenantId: string;
  private _clientId: string;
  private _certificateString: string;

  public certificateThumbprint: string;
  public certificateX5t: string;

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
    options?: IdentityClientOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this._tenantId = tenantId;
    this._clientId = clientId;

    this._certificateString = readFileSync(certificatePath, "utf8");

    const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/;
    const matchCert = this._certificateString.match(certificatePattern);
    const publicKey = matchCert ? matchCert[3] : "";
    if (!publicKey) {
      throw new Error(
        "The file at the specified path does not contain a PEM-encoded certificate."
      );
    }

    this.certificateThumbprint = createHash("sha1")
      .update(Buffer.from(publicKey, "base64"))
      .digest("hex")
      .toUpperCase();

    this.certificateX5t = Buffer.from(this.certificateThumbprint, "hex").toString("base64");
  }

  /**
   * Authenticates with Azure Active Directory and returns an {@link AccessToken} if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   * 
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return this.identityClient.authenticateClientCertificate(
      this._tenantId,
      this._clientId,
      this._certificateString,
      this.certificateX5t,
      scopes,
      options
    );
  }
}
