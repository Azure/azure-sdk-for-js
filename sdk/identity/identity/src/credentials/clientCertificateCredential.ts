// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { readFileSync } from "fs";
import { createHash } from "crypto";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { IdentityClientOptions, IdentityClient } from "../client/identityClient";

export class ClientCertificateCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private _tenantId: string;
  private _clientId: string;
  private _certificateString: string;

  public certificateThumbprint: string;
  public certificateX5t: string;

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
        "The file at the specified path does not contain a PEM-formatted certificate."
      );
    }

    this.certificateThumbprint = createHash("sha1")
      .update(Buffer.from(publicKey, "base64"))
      .digest("hex")
      .toUpperCase();

    this.certificateX5t = Buffer.from(this.certificateThumbprint, "hex").toString("base64");
  }

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
