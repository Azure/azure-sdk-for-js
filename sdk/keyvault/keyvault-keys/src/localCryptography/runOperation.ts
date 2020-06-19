// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LocalCryptographyUnsupportedError } from "./models";
import {
  localSupportedAlgorithms,
  LocalSupportedAlgorithm,
  LocalSupportedAlgorithmName,
  LocalCryptographyOperationName
} from "./algorithms";
import { JsonWebKey } from "../keysModels";
import { convertJWKtoPEM } from './conversions';

export async function runOperation(
  key: JsonWebKey,
  operationName: LocalCryptographyOperationName,
  algorithmName: LocalSupportedAlgorithmName,
  ...params: Buffer[]
): Promise<Buffer | boolean> {
  const algorithm: LocalSupportedAlgorithm = localSupportedAlgorithms[algorithmName];
  if (!algorithm) {
    throw new LocalCryptographyUnsupportedError(`Unsupported algorithm ${algorithm}`);
  }
  algorithm.validate(key, operationName, algorithmName)

  const operation = algorithm.operations[operationName];
  if (!operation) {
    throw new LocalCryptographyUnsupportedError(`Operation ${operationName} is not supported for algorithm ${algorithm}`);
  }

  const keyPEM = convertJWKtoPEM(key);
  return operation(keyPEM, ...params);
}
