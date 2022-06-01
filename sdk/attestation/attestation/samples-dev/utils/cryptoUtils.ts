// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";

import { hexToByteArray } from "../../src/utils/base64";

export function createECDSKey(): [string, string] {
  const keyPair = jsrsasign.KEYUTIL.generateKeypair("EC", "secp256r1");
  return [
    jsrsasign.KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV"),
    jsrsasign.KEYUTIL.getPEM(keyPair.pubKeyObj, "PKCS8PUB"),
  ];
}

export function createRSAKey(): [string, string] {
  const keyPair = jsrsasign.KEYUTIL.generateKeypair("RSA", 1024);
  return [
    jsrsasign.KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV"),
    jsrsasign.KEYUTIL.getPEM(keyPair.pubKeyObj, "PKCS8PUB"),
  ];
}

function localDateToUtc(d: Date): Date {
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  return new Date(utc);
}

function zeroPadding(s: string, len: number): any {
  if (s.length >= len) return s;
  return new Array(len - s.length + 1).join("0") + s;
}

function formatDateString(dateObject: Date): string {
  const pad = zeroPadding;
  const d = localDateToUtc(dateObject);
  let year = String(d.getFullYear());
  // Extract first two digits of year for UTC encoding.
  year = year.substr(2, 2);
  const month = pad(String(d.getMonth() + 1), 2);
  const day = pad(String(d.getDate()), 2);
  const hour = pad(String(d.getHours()), 2);
  const min = pad(String(d.getMinutes()), 2);
  const sec = pad(String(d.getSeconds()), 2);
  const s = year + month + day + hour + min + sec;
  return s + "Z";
}

// Create a self-signed X.509 certificZTe
export function createX509Certificate(
  privKeyPEM: string,
  pubKeyPEM: string,
  subject_name: string
): string {
  const pubKey = jsrsasign.KEYUTIL.getKey(pubKeyPEM);
  const privKey = jsrsasign.KEYUTIL.getKey(privKeyPEM);

  const timeEnd = new Date();
  timeEnd.setFullYear(timeEnd.getFullYear() + 1);

  const cert = new jsrsasign.KJUR.asn1.x509.Certificate({
    //    tbsobj: tbs,
    serial: { int: 4 },
    issuer: { str: "/CN=" + subject_name },
    subject: { str: "/CN=" + subject_name },
    notafter: { str: formatDateString(timeEnd) },
    sbjpubkey: pubKey,
    ext: [
      { extname: "basicConstraints", critical: false, cA: false, pathLen: 0 },
      { extname: "subjectAltName", critical: false, array: [{ uri: "https://" + subject_name }] },
      { extname: "keyUsage", critical: true, names: ["digitalSignature"] },
    ],
    sigalg: { name: "SHA256withRSA" },
    cakey: privKey,
  });

  const x509 = new jsrsasign.X509();
  x509.readCertPEM(cert.getPEM());

  return cert.getPEM();
}

/**
 * Generate the SHA256 hash of the specified buffer.
 */
export function generateSha256Hash(buffer: string): Uint8Array {
  return hexToByteArray(jsrsasign.KJUR.crypto.Util.hashString(buffer, "sha256"));
}

/** Generate the SHA1 hash of the specified buffer.
 *
 * @param buffer - HEX encoded buffer to be hashed.
 * @returns SHA1 hash of the buffer.
 */
export function generateSha1Hash(buffer: string): Uint8Array {
  return hexToByteArray(jsrsasign.KJUR.crypto.Util.hashHex(buffer, "sha1"));
}
