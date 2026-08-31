// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// THROWAWAY PROTOTYPE: this jose implementation exists only to measure the async API,
// security, runtime, and bundle-size tradeoffs of a possible major-version redesign.

import type { CryptoKey } from "jose";
import { base64DecodeString, base64EncodeByteArray } from "./base64.js";
import { stringToBytes } from "./utf8.js";

type KeyType = "RSA" | "EC";
type SupportedAlgorithm = "RS256" | "ES256";

interface CertificateInfo {
  algorithm: SupportedAlgorithm;
  base64: string;
  keyType: KeyType;
  publicKey: CryptoKey;
}

const jose = Promise.all([
  import("jose/decode/protected_header"),
  import("jose/jws/compact/sign"),
  import("jose/jws/compact/verify"),
  import("jose/key/import"),
  import("jose/base64url"),
]).then(([protectedHeader, compactSign, compactVerify, keyImport, base64url]) => ({
  CompactSign: compactSign.CompactSign,
  base64UrlDecode: base64url.decode,
  base64UrlEncode: base64url.encode,
  compactVerify: compactVerify.compactVerify,
  decodeProtectedHeader: protectedHeader.decodeProtectedHeader,
  importPKCS8: keyImport.importPKCS8,
  importX509: keyImport.importX509,
}));

function validateCertificateDer(base64: string): void {
  const der = base64DecodeString(base64);
  if (der.length < 2 || der[0] !== 0x30 || base64EncodeByteArray(der) !== base64) {
    throw new Error("Invalid DER encoded certificate.");
  }

  let contentOffset = 2;
  let contentLength = der[1];
  if ((contentLength & 0x80) !== 0) {
    const lengthBytes = contentLength & 0x7f;
    if (
      lengthBytes === 0 ||
      lengthBytes > 4 ||
      contentOffset + lengthBytes > der.length ||
      der[contentOffset] === 0
    ) {
      throw new Error("Invalid DER encoded certificate.");
    }
    contentLength = 0;
    for (let index = 0; index < lengthBytes; index++) {
      contentLength = contentLength * 256 + der[contentOffset + index];
    }
    if (contentLength < 0x80) {
      throw new Error("Invalid DER encoded certificate.");
    }
    contentOffset += lengthBytes;
  }

  if (contentOffset + contentLength !== der.length) {
    throw new Error("Invalid DER encoded certificate.");
  }
}

function normalizeCertificate(certificate: string): { base64: string; pem: string } {
  const match =
    /^-----BEGIN CERTIFICATE-----\s+([A-Za-z0-9+/=\r\n]+?)\s+-----END CERTIFICATE-----$/.exec(
      certificate.trim(),
    );
  if (!match) {
    throw new TypeError("Invalid PEM encoded certificate.");
  }

  const base64 = match[1].replace(/\s/g, "");
  validateCertificateDer(base64);
  return {
    base64,
    pem: `-----BEGIN CERTIFICATE-----\n${base64}\n-----END CERTIFICATE-----`,
  };
}

async function getCertificateInfo(certificate: string): Promise<CertificateInfo> {
  const { base64, pem } = normalizeCertificate(certificate);
  const { importX509 } = await jose;
  try {
    return {
      algorithm: "RS256",
      base64,
      keyType: "RSA",
      publicKey: await importX509(pem, "RS256"),
    };
  } catch {
    try {
      return {
        algorithm: "ES256",
        base64,
        keyType: "EC",
        publicKey: await importX509(pem, "ES256"),
      };
    } catch (ecError: unknown) {
      throw new Error("The certificate is not a supported RSA or P-256 X.509 certificate.", {
        cause: ecError,
      });
    }
  }
}

async function signAndVerify(
  body: string,
  privateKey: string,
  certificateInfo: CertificateInfo,
): Promise<string> {
  const { CompactSign, compactVerify, importPKCS8 } = await jose;
  let signingKey: CryptoKey;
  try {
    signingKey = await importPKCS8(privateKey, certificateInfo.algorithm);
  } catch (error: unknown) {
    throw new Error("Invalid PEM encoded private key.", { cause: error });
  }
  const token = await new CompactSign(stringToBytes(body))
    .setProtectedHeader({
      alg: certificateInfo.algorithm,
      x5c: [certificateInfo.base64],
    })
    .sign(signingKey);

  try {
    await compactVerify(token, certificateInfo.publicKey, {
      algorithms: [certificateInfo.algorithm],
    });
  } catch {
    throw new Error("verifyAttestationSigningKey: Key does not match Certificate.");
  }
  return token;
}

export async function createAttestationJws(
  body: string,
  privateKey?: string,
  certificate?: string,
): Promise<string> {
  if (!privateKey && !certificate) {
    // jose intentionally does not sign with "none"; use its base64url primitive so the
    // exact raw and empty payload semantics of the existing AttestationToken are retained.
    const { base64UrlEncode } = await jose;
    const protectedHeader = base64UrlEncode(JSON.stringify({ alg: "none" }));
    return `${protectedHeader}.${base64UrlEncode(stringToBytes(body))}.`;
  }
  if (!privateKey || !certificate) {
    throw new Error(
      "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided.",
    );
  }

  return signAndVerify(body, privateKey, await getCertificateInfo(certificate));
}

export async function verifyAttestationJws(token: string, certificate: string): Promise<boolean> {
  try {
    const { base64UrlDecode, base64UrlEncode, compactVerify, decodeProtectedHeader, importX509 } =
      await jose;
    const pieces = token.split(".");
    if (
      pieces.length !== 3 ||
      pieces[2].length === 0 ||
      pieces.some((piece) => base64UrlEncode(base64UrlDecode(piece)) !== piece)
    ) {
      return false;
    }

    const { alg } = decodeProtectedHeader(token);
    if (alg !== "RS256" && alg !== "ES256") {
      return false;
    }

    const { pem } = normalizeCertificate(certificate);
    const publicKey = await importX509(pem, alg);
    await compactVerify(token, publicKey, { algorithms: [alg] });
    return true;
  } catch {
    return false;
  }
}

export async function validateAttestationSigningKey(
  privateKey: string,
  certificate: string,
): Promise<void> {
  await signAndVerify("", privateKey, await getCertificateInfo(certificate));
}

export function certificateToBase64(certificate: string): string {
  return normalizeCertificate(certificate).base64;
}

export async function keyTypeFromCertificate(certificate: string): Promise<KeyType> {
  return (await getCertificateInfo(certificate)).keyType;
}
