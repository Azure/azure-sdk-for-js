// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Agent } from "https";
import { PipelinePolicy } from "@azure/core-rest-pipeline";
import { KeyObject, PxfObject } from "tls";

/**
 * Represents a certificate credential for authentication.
 */
export interface CertificateCredential {
  /**
   * Optionally override the trusted CA certificates. Default is to trust
   * the well-known CAs curated by Mozilla. Mozilla's CAs are completely
   * replaced when CAs are explicitly specified using this option.
   */
  ca?: string | Buffer | Array<string | Buffer> | undefined;
  /**
   *  Cert chains in PEM format. One cert chain should be provided per
   *  private key. Each cert chain should consist of the PEM formatted
   *  certificate for a provided private key, followed by the PEM
   *  formatted intermediate certificates (if any), in order, and not
   *  including the root CA (the root CA must be pre-known to the peer,
   *  see ca). When providing multiple cert chains, they do not have to
   *  be in the same order as their private keys in key. If the
   *  intermediate certificates are not provided, the peer will not be
   *  able to validate the certificate, and the handshake will fail.
   */
  cert?: string | Buffer | Array<string | Buffer> | undefined;
  /**
   * Private keys in PEM format. PEM allows the option of private keys
   * being encrypted. Encrypted keys will be decrypted with
   * options.passphrase. Multiple keys using different algorithms can be
   * provided either as an array of unencrypted key strings or buffers,
   * or an array of objects in the form {pem: <string|buffer>[,
   * passphrase: <string>]}. The object form can only occur in an array.
   * object.passphrase is optional. Encrypted keys will be decrypted with
   * object.passphrase if provided, or options.passphrase if it is not.
   */
  certKey?: string | Buffer | Array<Buffer | KeyObject> | undefined;
  /**
   * Shared passphrase used for a single private key and/or a PFX.
   */
  passphrase?: string | undefined;
  /**
   * PFX or PKCS12 encoded private key and certificate chain. pfx is an
   * alternative to providing key and cert individually. PFX is usually
   * encrypted, if it is, passphrase will be used to decrypt it. Multiple
   * PFX can be provided either as an array of unencrypted PFX buffers,
   * or an array of objects in the form {buf: <string|buffer>[,
   * passphrase: <string>]}. The object form can only occur in an array.
   * object.passphrase is optional. Encrypted PFX will be decrypted with
   * object.passphrase if provided, or options.passphrase if it is not.
   */
  pfx?: string | Buffer | Array<string | Buffer | PxfObject> | undefined;
}

/**
 * Gets a pipeline policy that adds the client certificate to the HttpClient agent for authentication.
 */
export function getClientCertificatePolicy(certificate?: CertificateCredential): PipelinePolicy {
  return {
    name: "ClientCertificatePolicy",
    sendRequest: async (req, next) => {
      if (!certificate) {
        return next(req);
      }

      const { cert, certKey: key, pfx, ca, passphrase } = certificate;
      const agent = new Agent({ cert, key, pfx, ca, passphrase });
      req.agent = agent;

      return next(req);
    },
  };
}
