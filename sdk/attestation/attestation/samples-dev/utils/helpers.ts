// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function write_banner(banner: string): void {
  const separator = "*".repeat(80);

  console.log("\n");
  console.log(separator);
  console.log(`        ${banner}`);
  console.log(separator);
}


export enum PemType { Certificate="CERTIFICATE", PrivateKey="PRIVATE KEY" };
/**
 * 
 * @param base64 - Base64 encoded DER object to encode as PEM.
 * @param pemType - PEM object type - typically "CERTIFICATE" | 
 */
export function pemFromBase64(base64: string, pemType: PemType ) : string {
  let pem = "-----BEGIN " + pemType + "-----\n";
  while (base64 !== "") {
    pem += base64.substr(0, 64) + "\n";
    base64 = base64.substr(64);
  }
  pem += "-----END " + pemType + "-----\n";

  return pem;
}
