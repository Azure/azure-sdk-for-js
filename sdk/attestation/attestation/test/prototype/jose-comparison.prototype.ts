// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// THROWAWAY PROTOTYPE: answers whether a major-version async API allows @azure/attestation
// to replace its Noble + Forge JWS implementation with jose. The prototype skill normally
// recommends an interactive TUI, but a deterministic, noninteractive comparison harness is
// the useful shape for reproducible crypto, API-surface, and bundle-size evidence.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { build } from "esbuild";
import { AttestationTokenImpl } from "../../src/models/attestationToken.js";
import { createECDSKey, createRSAKey, createX509Certificate } from "../utils/cryptoUtils.js";

const baselineRef = "jeremymeng-replace-attestation-jsrsasign";
const prototypeDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(prototypeDirectory, "..", "..");
const repositoryRoot = resolve(packageRoot, "..", "..", "..");
const jwsPath = resolve(packageRoot, "src", "utils", "jws.ts");
const packageJsonPath = resolve(packageRoot, "package.json");
const repositoryJwsPath = relative(repositoryRoot, jwsPath).replaceAll("\\", "/");
const repositoryPackageJsonPath = relative(repositoryRoot, packageJsonPath).replaceAll("\\", "/");

function gitShow(path: string): string {
  return execFileSync("git", ["show", `${baselineRef}:${path}`], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
}

async function measureBrowserBundle(source: string): Promise<{
  minifiedBytes: number;
  gzipBytes: number;
}> {
  const result = await build({
    bundle: true,
    format: "esm",
    logLevel: "silent",
    minify: true,
    platform: "browser",
    stdin: {
      contents: source,
      loader: "ts",
      resolveDir: dirname(jwsPath),
      sourcefile: "jws.ts",
    },
    target: "es2022",
    treeShaking: true,
    write: false,
  });
  const output = result.outputFiles[0].contents;
  return {
    minifiedBytes: output.byteLength,
    gzipBytes: gzipSync(output, { level: 9 }).byteLength,
  };
}

function productionLineChanges(): { additions: number; deletions: number } {
  const output = execFileSync(
    "git",
    ["diff", "--numstat", baselineRef, "--", repositoryJwsPath, "sdk/attestation/attestation/src"],
    { cwd: repositoryRoot, encoding: "utf8" },
  );
  return output
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .reduce(
      (totals, line) => {
        const [additions, deletions] = line.split("\t");
        totals.additions += Number(additions);
        totals.deletions += Number(deletions);
        return totals;
      },
      { additions: 0, deletions: 0 },
    );
}

function runtimeCryptoDependencies(packageJson: {
  dependencies?: Record<string, string>;
}): Record<string, string> {
  return Object.fromEntries(
    ["@noble/curves", "jose", "node-forge"]
      .filter((name) => packageJson.dependencies?.[name])
      .map((name) => [name, packageJson.dependencies![name]]),
  );
}

async function exerciseSignedToken(
  algorithm: "RS256" | "ES256",
  createKey: typeof createRSAKey | typeof createECDSKey,
): Promise<void> {
  const [privateKey, publicKey] = createKey();
  const certificate = createX509Certificate(privateKey, publicKey, `${algorithm} certificate`);
  const token = await AttestationTokenImpl.create({
    body: JSON.stringify({ algorithm, prototype: true }),
    privateKey,
    certificate,
  });
  if (token.algorithm !== algorithm) {
    throw new Error(`${algorithm}: certificate key-type detection selected ${token.algorithm}.`);
  }
  const problems = await token.getTokenProblems([{ certificates: [certificate] }]);
  if (problems.length !== 0) {
    throw new Error(`${algorithm}: ${problems.join("; ")}`);
  }

  const nonCanonicalToken = new AttestationTokenImpl(`${token.serialize()}=`);
  if ((await nonCanonicalToken.getTokenProblems([{ certificates: [certificate] }])).length === 0) {
    throw new Error(`${algorithm}: a padded non-canonical signature was accepted.`);
  }
}

async function exerciseMismatchedKey(
  algorithm: "RS256" | "ES256",
  createKey: typeof createRSAKey | typeof createECDSKey,
): Promise<void> {
  const [privateKey, publicKey] = createKey();
  const [mismatchedPrivateKey] = createKey(1);
  const certificate = createX509Certificate(privateKey, publicKey, `${algorithm} certificate`);
  try {
    await AttestationTokenImpl.create({
      body: JSON.stringify({ algorithm, prototype: true }),
      privateKey: mismatchedPrivateKey,
      certificate,
    });
  } catch {
    return;
  }
  throw new Error(`${algorithm}: a mismatched private key was accepted.`);
}

async function main(): Promise<void> {
  await exerciseSignedToken("RS256", createRSAKey);
  await exerciseSignedToken("ES256", createECDSKey);

  const unsecuredToken = await AttestationTokenImpl.create({
    body: JSON.stringify({ algorithm: "none", prototype: true }),
  });
  if (
    unsecuredToken.algorithm !== "none" ||
    !unsecuredToken.serialize().endsWith(".") ||
    (await unsecuredToken.getTokenProblems()).length !== 0
  ) {
    throw new Error("none: unsecured compact JWS semantics were not preserved.");
  }

  await exerciseMismatchedKey("RS256", createRSAKey);
  await exerciseMismatchedKey("ES256", createECDSKey);

  const baselinePackageJson = JSON.parse(gitShow(repositoryPackageJsonPath)) as {
    dependencies?: Record<string, string>;
  };
  const prototypePackageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
    dependencies?: Record<string, string>;
  };
  const [baselineBundle, prototypeBundle] = await Promise.all([
    measureBrowserBundle(gitShow(repositoryJwsPath)),
    measureBrowserBundle(readFileSync(jwsPath, "utf8")),
  ]);

  process.stdout.write(
    `${JSON.stringify(
      {
        prototype: "THROWAWAY jose major-version exploration",
        cases: {
          "RS256 sign/verify": "passed",
          "ES256 sign/verify": "passed",
          "alg none": "passed",
          "RSA mismatched key": "rejected",
          "EC mismatched key": "rejected",
          "non-canonical signatures": "rejected",
        },
        publicApiChanges: [
          "AttestationToken.getTokenProblems(...): Promise<string[]> (was string[])",
          "createAttestationPolicyToken(...): Promise<AttestationPolicyToken> (was AttestationPolicyToken)",
        ],
        unchangedPublicClientMethods:
          "AttestationClient and AttestationAdministrationClient methods remain Promise-returning",
        runtimeCryptoDependencies: {
          baseline: runtimeCryptoDependencies(baselinePackageJson),
          prototype: runtimeCryptoDependencies(prototypePackageJson),
        },
        productionLineChanges: productionLineChanges(),
        browserCryptoBundle: {
          method: "esbuild browser ESM, tree-shaken, minified, then gzip -9",
          baseline: baselineBundle,
          prototype: prototypeBundle,
          gzipDeltaBytes: prototypeBundle.gzipBytes - baselineBundle.gzipBytes,
          reportedBaselineReferenceBytes: 51 * 1024,
        },
      },
      undefined,
      2,
    )}\n`,
  );
}

await main();
