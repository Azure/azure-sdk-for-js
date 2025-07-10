// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary, PerfTest } from "@azure-tools/test-perf";
import { CryptographyClient, KeyClient } from "@azure/keyvault-keys";
import { randomUUID } from "node:crypto";
import { credential, keyVaultUri } from "../utils.js";

interface CryptographyPerfTestOptions {
  keySize: number;
}

export abstract class CryptographyTest extends PerfTest<CryptographyPerfTestOptions> {
  options: PerfOptionDictionary<CryptographyPerfTestOptions> = {
    keySize: {
      required: false,
      description: "The size of the key to be created",
      shortName: "ks",
      longName: "key-size",
      defaultValue: 2048,
    },
  };

  keyClient: KeyClient;
  static cryptoClient?: CryptographyClient;
  static keyName = `k-${randomUUID()}`;

  constructor() {
    super();
    this.keyClient = new KeyClient(keyVaultUri, credential);
  }

  async globalSetup() {
    // Create a single shared key for all tests
    const key = await this.keyClient.createRsaKey(CryptographyTest.keyName, {
      keySize: this.parsedOptions.keySize.value!,
    });
    CryptographyTest.cryptoClient = new CryptographyClient(key, credential);
  }

  async globalCleanup() {
    const poller = await this.keyClient.beginDeleteKey(CryptographyTest.keyName);
    const result = await poller.pollUntilDone();
    if (result.properties.recoveryId) {
      await this.keyClient.purgeDeletedKey(CryptographyTest.keyName);
    }
  }
}
