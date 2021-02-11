// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LocalCryptographyOperationName,
  LocalCryptographyUnsupportedError,
  LocalSupportedAlgorithm,
  LocalSupportedAlgorithmName
} from "./models";
import { localSupportedAlgorithms } from "./algorithms";
import { JsonWebKey } from "../keysModels";
import { convertJWKtoPEM } from "./conversions";

export async function runOperation(
  key: JsonWebKey,
  operationName: LocalCryptographyOperationName,
  algorithmName: LocalSupportedAlgorithmName,
  data: Buffer,
  signature?: Buffer
): Promise<Buffer | boolean> {
  const algorithm: LocalSupportedAlgorithm | undefined = localSupportedAlgorithms[algorithmName];
  if (!algorithm) {
    throw new LocalCryptographyUnsupportedError(`Unsupported algorithm ${algorithm}`);
  }
  algorithm.validate(key, operationName);

  const operation = algorithm.operations[operationName];
  if (!operation) {
    throw new LocalCryptographyUnsupportedError(
      `Operation ${operationName} is not supported for algorithm ${algorithm}`
    );
  }

  const keyPEM = convertJWKtoPEM(key);
  return operation(keyPEM, data, signature!);
}
