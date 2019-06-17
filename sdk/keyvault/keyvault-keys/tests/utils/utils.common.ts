import { env } from "./recorder";

// Async iterator's polyfill for Node 8
if (!Symbol || !Symbol.asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}

export function getKeyvaultName(): string {
  const keyVaultEnvVarName = "KEYVAULT_NAME";
  let keyVaultName: string | undefined = env[keyVaultEnvVarName];

  if (!keyVaultName) {
    throw new Error(`${keyVaultEnvVarName} environment variable not specified.`);
  }

  return keyVaultName;
}

function padStart(currentString: string, targetLength: number, padString: string = " "): string {
  // To run the tests under ts-node the compiler option { module: "commonjs" } is needed,
  // which prevent the usage of `padStart()`.
  // if (String.prototype.padStart) {
  //   return currentString.padStart(targetLength, padString);
  // }

  padString = padString || " ";
  if (currentString.length > targetLength) {
    return currentString;
  } else {
    targetLength = targetLength - currentString.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + currentString;
  }
}
