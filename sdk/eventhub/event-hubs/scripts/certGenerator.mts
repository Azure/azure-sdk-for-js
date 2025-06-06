// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { promises as fs } from "node:fs";
import { resolve as resolvePath } from "node:path";
import forge from "node-forge";

export interface GenerateCertsOptions {
  /** Directory to write certs to. */
  certsDirectory: string;
  /** Validity period in days. */
  days?: number;
  /** Subject for the root CA, in “/C=US/ST=State/L=Local/O=Org/CN=Name” form. */
  rootSubject?: string;
  /** Subject for the server cert, in the same form. */
  serverSubject?: string;
}

function parseDN(dn: string): forge.pki.CertificateField[] {
  const parts = dn
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter((p) => p.length > 0);

  const attrs: forge.pki.CertificateField[] = [];

  const keyMap: Record<string, string> = {
    C: "countryName",
    ST: "stateOrProvinceName",
    L: "localityName",
    O: "organizationName",
    OU: "organizationalUnitName",
    CN: "commonName",
  };

  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx < 0) {
      continue;
    }
    const shortKey = part.substring(0, idx).trim();
    const value = part.substring(idx + 1).trim();
    const fieldName = keyMap[shortKey];

    if (fieldName) {
      attrs.push({ name: fieldName, value });
    } else {
      attrs.push({ type: shortKey, value });
    }
  }

  return attrs;
}

async function certExpired(certPath: string): Promise<boolean> {
  try {
    const pem = await fs.readFile(certPath, "utf8");
    const cert = forge.pki.certificateFromPem(pem);
    const now = new Date();
    return now < cert.validity.notBefore || now > cert.validity.notAfter;
  } catch {
    return true;
  }
}

/**
 * Generates a root CA and a server certificate signed by it, writing PEM files to disk.
 * Only generates new certs if they don't exist or have expired.
 * @param options - Options for certificate generation.
 */
export async function generateCerts(options: GenerateCertsOptions): Promise<void> {
  const {
    certsDirectory,
    days = 5,
    rootSubject = "/C=US/ST=Washington/L=Seattle/O=Fake Signing Authority/CN=fake.foo",
    serverSubject = "/C=US/ST=Washington/L=Seattle/O=Fake Hubs/CN=localhost",
  } = options;

  await fs.mkdir(certsDirectory, { recursive: true });

  const rootKeyPath = resolvePath(certsDirectory, "my-private-root-ca.key.pem");
  const rootCertPath = resolvePath(certsDirectory, "my-private-root-ca.crt.pem");
  const serverKeyPath = resolvePath(certsDirectory, "my-server.key.pem");
  const serverCertPath = resolvePath(certsDirectory, "my-server.crt.pem");

  const rootCertNeedsUpdate = await certExpired(rootCertPath);
  const serverCertNeedsUpdate = await certExpired(serverCertPath);

  if (!rootCertNeedsUpdate && !serverCertNeedsUpdate) {
    return;
  }

  let rootKeys: forge.pki.KeyPair;
  let rootCert: forge.pki.Certificate;

  if (rootCertNeedsUpdate) {
    rootKeys = forge.pki.rsa.generateKeyPair(2048);
    rootCert = forge.pki.createCertificate();
    rootCert.publicKey = rootKeys.publicKey;
    rootCert.serialNumber = "01";
    rootCert.validity.notBefore = new Date();
    rootCert.validity.notAfter = new Date();
    rootCert.validity.notAfter.setDate(rootCert.validity.notBefore.getDate() + days);

    const rootAttrs = parseDN(rootSubject);
    rootCert.setSubject(rootAttrs);
    rootCert.setIssuer(rootAttrs); // self‐signed

    rootCert.setExtensions([
      { name: "basicConstraints", cA: true },
      { name: "keyUsage", keyCertSign: true, digitalSignature: true, cRLSign: true },
      { name: "subjectKeyIdentifier" },
    ]);

    rootCert.sign(rootKeys.privateKey, forge.md.sha256.create());

    await fs.writeFile(rootKeyPath, forge.pki.privateKeyToPem(rootKeys.privateKey));
    await fs.writeFile(rootCertPath, forge.pki.certificateToPem(rootCert));
  } else {
    const rootKeyPem = await fs.readFile(rootKeyPath, "utf8");
    rootKeys = {
      privateKey: forge.pki.privateKeyFromPem(rootKeyPem),
      publicKey: forge.pki.certificateFromPem(await fs.readFile(rootCertPath, "utf8")).publicKey,
    };
    rootCert = forge.pki.certificateFromPem(await fs.readFile(rootCertPath, "utf8"));
  }

  if (serverCertNeedsUpdate) {
    const serverKeys = forge.pki.rsa.generateKeyPair(2048);
    const serverCert = forge.pki.createCertificate();
    serverCert.publicKey = serverKeys.publicKey;
    serverCert.serialNumber = "02";
    serverCert.validity.notBefore = new Date();
    serverCert.validity.notAfter = new Date();
    serverCert.validity.notAfter.setDate(serverCert.validity.notBefore.getDate() + days);

    const serverAttrs = parseDN(serverSubject);
    serverCert.setSubject(serverAttrs);
    serverCert.setIssuer(rootCert.subject.attributes);

    serverCert.setExtensions([
      { name: "basicConstraints", cA: false },
      { name: "keyUsage", digitalSignature: true, keyEncipherment: true },
      {
        name: "subjectAltName",
        altNames: [{ type: 2, value: "localhost" }],
      },
    ]);

    serverCert.sign(rootKeys.privateKey, forge.md.sha256.create());

    await fs.writeFile(serverKeyPath, forge.pki.privateKeyToPem(serverKeys.privateKey));
    await fs.writeFile(serverCertPath, forge.pki.certificateToPem(serverCert));
  }
}
