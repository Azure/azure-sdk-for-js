// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env, retry } from "./recorder";
import { KeysClient } from '../../src'

// Async iterator's polyfill for Node 8
if (!Symbol || !(Symbol as any).asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}

export function getKeyvaultName(): string {
  const keyVaultEnvVarName = "KEYVAULT_NAME";
  const keyVaultName: string | undefined = env[keyVaultEnvVarName];

  if (!keyVaultName) {
    throw new Error(`${keyVaultEnvVarName} environment variable not specified.`);
  }

  return keyVaultName;
}

export class TestClient {
  public readonly client: KeysClient;
  constructor(client: KeysClient) {
   	this.client = client
  }
	public async checkPurged(keyName: string): Promise<void> {
		try {
		  this.client.getKey(keyName);
		} catch(e) {
		  console.log('checkPurged error', e)
		}
	}
  public async purgeKey(keyName: string): Promise<void> {
		const that = this
    await that.client.purgeDeletedKey(keyName);
		await retry(async () => that.checkPurged(keyName), {});
  }
  public async flushKey(keyName: string): Promise<void> {
    await this.client.deleteKey(keyName);
    await this.purgeKey(keyName);
  }
}
