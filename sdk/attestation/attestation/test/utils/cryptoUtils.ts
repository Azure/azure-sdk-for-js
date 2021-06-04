// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KJUR, KEYUTIL } from "jsrsasign";
import { hexToByteArray } from "../../src/utils/base64";

export function createECDSKey(): string {
  const keyPair = KEYUTIL.generateKeypair("EC", "secp256r1");
  return KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV");
}

export function createRSAKey(): string {
  const keyPair = KEYUTIL.generateKeypair("RSA", 2048);
  return KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV");
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
export function createX509Certificate(key: string, subject_name: string): string {
  const signing_key = KEYUTIL.getKey(key);

  const tbs = new KJUR.asn1.x509.TBSCertificate();
  tbs.setSerialNumberByParam({ int: 4 });
  tbs.setSignatureAlgByParam({ name: "SHA1withRSA" });

  const timeEnd = new Date();
  timeEnd.setFullYear(timeEnd.getFullYear() + 1);

  tbs.setNotBeforeByParam({ str: formatDateString(timeEnd) });
  tbs.setNotAfterByParam({ str: formatDateString(new Date()) });
  tbs.setSubjectPublicKey(signing_key);
  tbs.appendExtension(new KJUR.asn1.x509.BasicConstraints({ cA: false, pathLen: 0 }));
  tbs.setSubjectByParam({ str: "/CN=" + subject_name });
  tbs.setIssuerByParam({ str: "/CN=" + subject_name });

  const cert = new KJUR.asn1.x509.Certificate({
    tbscertobj: tbs,
    prvkeyobj: signing_key
  });
  cert.sign();

  return cert.getPEMString();

  //    builder = builder.add_extension(SubjectAlternativeName([x509.DNSName(subject_name)]), critical=False)
}

/**
 * Generate the SHA256 hash of the specified buffer.
 */
export function generateSha256Hash(buffer: string): Uint8Array {
  return hexToByteArray(KJUR.crypto.Util.hashString(buffer, "sha256"));
}
