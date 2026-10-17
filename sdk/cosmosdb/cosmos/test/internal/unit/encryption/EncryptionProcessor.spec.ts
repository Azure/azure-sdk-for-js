// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, assert, describe, expect, it } from "vitest";
import type {
  ClientEncryptionOptions,
  EncryptionKeyResolver,
  JSONValue,
} from "../../../../src/index.js";
import {
  CosmosClient,
  EncryptionAlgorithm,
  EncryptionKeyResolverName,
  EncryptionType,
  KeyEncryptionAlgorithm,
} from "../../../../src/index.js";
import type { EncryptionProcessor } from "../../../../src/encryption/EncryptionProcessor.js";
import { TypeMarker } from "../../../../src/encryption/enums/TypeMarker.js";

type ExperimentalOptions = ClientEncryptionOptions["experimental"];

// In-memory key resolver and cached metadata keep these tests entirely offline.
const unitKeyResolver: EncryptionKeyResolver = {
  encryptionKeyResolverName: EncryptionKeyResolverName.AzureKeyVault,
  async wrapKey(_id, _algorithm, key) {
    return key;
  },
  async unwrapKey(_id, _algorithm, wrappedKey) {
    return wrappedKey;
  },
};

describe("EncryptionProcessor experimental authenticated type format", () => {
  const clients: CosmosClient[] = [];

  afterEach(() => {
    for (const client of clients) {
      client.dispose();
    }
    clients.length = 0;
  });

  function createClient(experimental?: ExperimentalOptions): CosmosClient {
    const client = new CosmosClient({
      endpoint: "https://localhost:8081",
      key: Buffer.alloc(64).toString("base64"),
      connectionPolicy: { enableEndpointDiscovery: false },
      clientEncryptionOptions: {
        keyEncryptionKeyResolver: unitKeyResolver,
        experimental,
      },
    });
    clients.push(client);
    return client;
  }

  async function createProcessor(
    experimental?: ExperimentalOptions,
    encryptionType = EncryptionType.DETERMINISTIC,
    policyFormatVersion = 2,
  ): Promise<EncryptionProcessor> {
    const client = createClient(experimental);
    const manager = client["encryptionManager"];
    const database = client.database("unit-database");
    database._rid = "unit-database-rid";
    const processor = database.container("unit-container").encryptionProcessor;
    processor.containerRid = "unit-container-rid";
    await manager.encryptionSettingsCache.create(
      `${database._rid}/${processor.containerRid}`,
      processor.containerRid,
      ["/partitionKey"],
      {
        policyFormatVersion,
        includedPaths: [
          {
            path: "/value",
            clientEncryptionKeyId: "unit-cek",
            encryptionType,
            encryptionAlgorithm: EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
          },
        ],
      },
    );
    manager.clientEncryptionKeyPropertiesCache.set(`${database._rid}/unit-cek`, {
      id: "unit-cek",
      encryptionAlgorithm: EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      wrappedDataEncryptionKey: new Uint8Array(
        Buffer.from("A5237E37726177F68CBC114F96B3B2DE4E792E701CC5AA955BEFF41BCF4862A8", "hex"),
      ),
      encryptionKeyWrapMetadata: {
        type: EncryptionKeyResolverName.AzureKeyVault,
        name: "unit-key",
        value: "unit-key",
        algorithm: KeyEncryptionAlgorithm.RSA_OAEP,
      },
      etag: "unit-etag",
    });
    return processor;
  }

  async function encryptValue(processor: EncryptionProcessor, value: JSONValue): Promise<string> {
    const encrypted = await processor.encryptProperty("/value", value);
    assert.typeOf(encrypted, "string");
    return encrypted;
  }

  async function decryptValue(processor: EncryptionProcessor, value: string): Promise<JSONValue> {
    const result = await processor.decrypt({ id: "unit-document", value });
    return result.body.value;
  }

  it.each([
    [undefined, "legacy", "allow"],
    [{}, "legacy", "allow"],
    [{ encryptedValueFormat: "legacy" }, "legacy", "allow"],
    [{ legacyValueReadPolicy: "allow" }, "legacy", "allow"],
    [{ encryptedValueFormat: "authenticatedType" }, "authenticatedType", "reject"],
    [
      { encryptedValueFormat: "authenticatedType", legacyValueReadPolicy: undefined },
      "authenticatedType",
      "reject",
    ],
    [
      { encryptedValueFormat: "authenticatedType", legacyValueReadPolicy: "allow" },
      "authenticatedType",
      "allow",
    ],
    [
      { encryptedValueFormat: "authenticatedType", legacyValueReadPolicy: "reject" },
      "authenticatedType",
      "reject",
    ],
  ] as const)(
    "should resolve rollout configuration %j to %s writes and %s legacy reads",
    (experimental, expectedFormat, expectedReadPolicy) => {
      const manager = createClient(experimental)["encryptionManager"];
      assert.strictEqual(manager.encryptedValueFormat, expectedFormat);
      assert.strictEqual(manager.legacyValueReadPolicy, expectedReadPolicy);
    },
  );

  it.each([EncryptionType.DETERMINISTIC, EncryptionType.RANDOMIZED])(
    "should default authenticated opt-in to strict reads with %s encryption",
    async (encryptionType) => {
      const legacyWriter = await createProcessor(undefined, encryptionType);
      const protectedClient = await createProcessor(
        { encryptedValueFormat: "authenticatedType" },
        encryptionType,
      );
      await expect(
        decryptValue(protectedClient, await encryptValue(legacyWriter, 42)),
      ).rejects.toThrow(/Legacy encrypted values are rejected by legacyValueReadPolicy/);
      assert.strictEqual(
        await decryptValue(protectedClient, await encryptValue(protectedClient, 42)),
        42,
      );
    },
  );

  it.each([EncryptionType.DETERMINISTIC, EncryptionType.RANDOMIZED])(
    "should migrate genuine legacy values through explicit compatible reads with %s encryption",
    async (encryptionType) => {
      const legacyWriter = await createProcessor(undefined, encryptionType);
      const migrationClient = await createProcessor(
        { encryptedValueFormat: "authenticatedType", legacyValueReadPolicy: "allow" },
        encryptionType,
      );
      const protectedClient = await createProcessor(
        { encryptedValueFormat: "authenticatedType" },
        encryptionType,
      );
      const document = {
        id: "unit-document",
        value: { amount: 42, ratio: 0.5, enabled: true, nested: ["text", null, -1] },
      };
      const legacy = await legacyWriter.encrypt(structuredClone(document));
      const source = await migrationClient.decrypt(legacy.body);
      assert.deepStrictEqual(source.body, document);
      const migrated = await migrationClient.encrypt(source.body);
      const verified = await protectedClient.decrypt(migrated.body);
      assert.deepStrictEqual(verified.body, document);
    },
  );

  it.each([
    [
      42,
      "BAFVxDerZuma64B9PCLLN/cKQbabR3Y4Z/uFVeYZc903goR6Z/H9NxkeX8HK/lMKqHuXNxJi+ROK3AjK51Qj947b",
    ],
    [
      -1,
      "BAEwNQcbDGv2EwlJmtUgniumkx4g8Eup/zsL5OrUWqgqcmePOvXHLXsa0Rc9eTcJ2LQ9agjvrz39pOacixyerM2t",
    ],
  ] as const)("should preserve legacy golden bytes for %s by default", async (value, golden) => {
    const processor = await createProcessor();
    assert.strictEqual(await encryptValue(processor, value), golden);
    assert.strictEqual(await decryptValue(processor, golden), value);
    const explicitLegacy = await createProcessor({
      encryptedValueFormat: "legacy",
      legacyValueReadPolicy: "allow",
    });
    assert.strictEqual(await encryptValue(explicitLegacy, value), golden);
    const emptyOptions = await createProcessor({});
    assert.strictEqual(await encryptValue(emptyOptions, value), golden);
  });

  it.each([EncryptionType.DETERMINISTIC, EncryptionType.RANDOMIZED])(
    "should roundtrip primitives and preserve null with %s encryption",
    async (encryptionType) => {
      const processor = await createProcessor(
        { encryptedValueFormat: "authenticatedType", legacyValueReadPolicy: "reject" },
        encryptionType,
      );
      for (const value of [null, true, false, "", "text", 0, 42, -1, 42.5, -0.5]) {
        const encrypted = await processor.encrypt({ id: "unit-document", value });
        assert.strictEqual(encrypted.propertiesEncryptedCount, 1);
        if (value === null) {
          assert.isNull(encrypted.body.value);
        } else {
          assert.strictEqual(Buffer.from(String(encrypted.body.value), "base64")[1], 2);
        }
        const decrypted = await processor.decrypt(encrypted.body);
        assert.strictEqual(decrypted.propertiesDecryptedCount, 1);
        assert.strictEqual(decrypted.body.value, value);
      }
    },
  );

  it.each([EncryptionType.DETERMINISTIC, EncryptionType.RANDOMIZED])(
    "should roundtrip nested numeric arrays and objects with %s encryption",
    async (encryptionType) => {
      const processor = await createProcessor(
        { encryptedValueFormat: "authenticatedType", legacyValueReadPolicy: "reject" },
        encryptionType,
      );
      const plaintext = {
        id: "unit-document",
        value: {
          balance: 42,
          negative: -1,
          fraction: 42.5,
          array: [0, -1, 0.5, null, { amount: 42, label: "nested", enabled: true }],
          empty: [],
        },
      };
      const encrypted = await processor.encrypt(structuredClone(plaintext));
      assert.strictEqual(Buffer.from(String(encrypted.body.value.balance), "base64")[1], 2);
      assert.isNull(encrypted.body.value.array[3]);
      const decrypted = await processor.decrypt(encrypted.body);
      assert.deepStrictEqual(decrypted.body, plaintext);
    },
  );

  it.each([42, -1])("should reject Long-to-Double tampering for %s", async (value) => {
    const processor = await createProcessor({ encryptedValueFormat: "authenticatedType" });
    const ciphertext = Buffer.from(await encryptValue(processor, value), "base64");
    assert.strictEqual(ciphertext[0], TypeMarker.Long);
    ciphertext[0] = TypeMarker.Double;
    await expect(decryptValue(processor, ciphertext.toString("base64"))).rejects.toThrow(
      /Invalid authentication tag/,
    );
  });

  it.each([TypeMarker.Boolean, TypeMarker.String, TypeMarker.Null, 0, 6, 255])(
    "should authenticate before accepting or validating tampered marker %s",
    async (marker) => {
      const processor = await createProcessor({ encryptedValueFormat: "authenticatedType" });
      const ciphertext = Buffer.from(await encryptValue(processor, 42), "base64");
      ciphertext[0] = marker;
      await expect(decryptValue(processor, ciphertext.toString("base64"))).rejects.toThrow(
        /Invalid authentication tag/,
      );
    },
  );

  it("should reject Double-to-Long tampering", async () => {
    const processor = await createProcessor({ encryptedValueFormat: "authenticatedType" });
    const ciphertext = Buffer.from(await encryptValue(processor, 42.5), "base64");
    assert.strictEqual(ciphertext[0], TypeMarker.Double);
    ciphertext[0] = TypeMarker.Long;
    await expect(decryptValue(processor, ciphertext.toString("base64"))).rejects.toThrow(
      /Invalid authentication tag/,
    );
  });

  it.each([2, 34, 50])(
    "should reject tag, IV, or ciphertext tampering at byte %s",
    async (index) => {
      const processor = await createProcessor({ encryptedValueFormat: "authenticatedType" });
      const ciphertext = Buffer.from(await encryptValue(processor, 42), "base64");
      ciphertext[index] ^= 1;
      await expect(decryptValue(processor, ciphertext.toString("base64"))).rejects.toThrow(
        /Invalid authentication tag/,
      );
    },
  );

  it("should support both formats in the same reader independently of its write format", async () => {
    const legacyWriter = await createProcessor();
    const typedWriter = await createProcessor({
      encryptedValueFormat: "authenticatedType",
      legacyValueReadPolicy: "allow",
    });
    const legacy = await encryptValue(legacyWriter, 42);
    const typed = await encryptValue(typedWriter, -1);
    for (const reader of [legacyWriter, typedWriter]) {
      const mixed = await reader.decrypt({
        id: "unit-document",
        value: [legacy, typed, null, legacy],
      });
      assert.deepStrictEqual(mixed.body.value, [42, -1, null, 42]);
    }
  });

  it("should reject legacy values when strict reads are selected", async () => {
    const legacyWriter = await createProcessor();
    const reader = await createProcessor({
      encryptedValueFormat: "authenticatedType",
      legacyValueReadPolicy: "reject",
    });
    const legacy = await encryptValue(legacyWriter, 42);
    await expect(decryptValue(reader, legacy)).rejects.toThrow(
      /Legacy encrypted values are rejected by legacyValueReadPolicy/,
    );
    const invalidMarker = Buffer.from(legacy, "base64");
    invalidMarker[0] = 0;
    await expect(decryptValue(reader, invalidMarker.toString("base64"))).rejects.toThrow(
      /Legacy encrypted values are rejected by legacyValueReadPolicy/,
    );
    const typed = await encryptValue(reader, 42);
    assert.strictEqual(await decryptValue(reader, typed), 42);
  });

  it("should accept whole-field legacy substitution when allowed and block it with strict reads", async () => {
    const legacyWriter = await createProcessor();
    const reader = await createProcessor({
      encryptedValueFormat: "authenticatedType",
      legacyValueReadPolicy: "allow",
    });
    const strictReader = await createProcessor({
      encryptedValueFormat: "authenticatedType",
      legacyValueReadPolicy: "reject",
    });
    const protectedDocument = await reader.encrypt({ id: "unit-document", value: 42 });
    const original = await strictReader.decrypt(structuredClone(protectedDocument.body));
    assert.strictEqual(original.body.value, 42);

    const replacement = await encryptValue(legacyWriter, -1);
    const substitutedDocument = { ...protectedDocument.body, value: replacement };
    const compatibleRead = await reader.decrypt(structuredClone(substitutedDocument));
    assert.strictEqual(compatibleRead.body.value, -1);
    await expect(strictReader.decrypt(substitutedDocument)).rejects.toThrow(
      /Legacy encrypted values are rejected by legacyValueReadPolicy/,
    );
  });

  it.each([42, -1])(
    "should retain the documented unauthenticated legacy marker risk for %s when allowed",
    async (value) => {
      const legacyWriter = await createProcessor();
      const reader = await createProcessor({
        encryptedValueFormat: "authenticatedType",
        legacyValueReadPolicy: "allow",
      });
      const ciphertext = Buffer.from(await encryptValue(legacyWriter, value), "base64");
      ciphertext[0] = TypeMarker.Double;
      const result = await decryptValue(reader, ciphertext.toString("base64"));
      if (value === -1) {
        assert.isNaN(result);
      } else {
        assert.strictEqual(result, 2.08e-322);
      }
    },
  );

  it.each(["legacy", "authenticatedType"] as const)(
    "should reject changed versions of %s values without authentication fallback",
    async (encryptedValueFormat) => {
      const processor = await createProcessor({
        encryptedValueFormat,
        legacyValueReadPolicy: "allow",
      });
      const ciphertext = Buffer.from(await encryptValue(processor, 42), "base64");
      ciphertext[1] = ciphertext[1] === 1 ? 2 : 1;
      await expect(decryptValue(processor, ciphertext.toString("base64"))).rejects.toThrow(
        /Invalid authentication tag/,
      );
    },
  );

  it.each([0, 3, 255])("should reject unknown inner version %s", async (version) => {
    const processor = await createProcessor({ encryptedValueFormat: "authenticatedType" });
    const ciphertext = Buffer.from(await encryptValue(processor, 42), "base64");
    ciphertext[1] = version;
    await expect(decryptValue(processor, ciphertext.toString("base64"))).rejects.toThrow(
      /Invalid cipher text version/,
    );
  });

  it.each(["legacy", "authenticatedType"] as const)(
    "should reject truncated %s values",
    async (encryptedValueFormat) => {
      const processor = await createProcessor({ encryptedValueFormat });
      const ciphertext = Buffer.from(
        await encryptValue(processor, "This is a test message"),
        "base64",
      );
      for (const length of [0, 1, 2, 33, 49, 65, ciphertext.length - 1, ciphertext.length - 16]) {
        await expect(
          decryptValue(processor, ciphertext.subarray(0, length).toString("base64")),
        ).rejects.toThrow(/Invalid (cipher text length|authentication tag)/);
      }
    },
  );

  it("should preserve deterministic bytes and ciphertext length for the experiment", async () => {
    const legacy = await createProcessor();
    const typed = await createProcessor({ encryptedValueFormat: "authenticatedType" });
    const legacyBytes = Buffer.from(await encryptValue(legacy, 42), "base64");
    const first = Buffer.from(await encryptValue(typed, 42), "base64");
    const second = Buffer.from(await encryptValue(typed, 42), "base64");
    assert.deepStrictEqual(first, second);
    assert.strictEqual(first.length, legacyBytes.length);
    assert.strictEqual(first[0], legacyBytes[0]);
    assert.deepStrictEqual(first.subarray(34), legacyBytes.subarray(34));
    assert.notDeepEqual(first.subarray(1, 34), legacyBytes.subarray(1, 34));
  });

  it("should compare randomized experimental ciphertext by Buffer content", async () => {
    const processor = await createProcessor(
      { encryptedValueFormat: "authenticatedType" },
      EncryptionType.RANDOMIZED,
    );
    const first = Buffer.from(await encryptValue(processor, 42), "base64");
    const second = Buffer.from(await encryptValue(processor, 42), "base64");
    assert.ok(!first.equals(second));
  });

  it.each([1, 2])(
    "should not reinterpret container policyFormatVersion %s as the value format",
    async (policyFormatVersion) => {
      const legacy = await createProcessor(
        undefined,
        EncryptionType.DETERMINISTIC,
        policyFormatVersion,
      );
      const typed = await createProcessor(
        { encryptedValueFormat: "authenticatedType" },
        EncryptionType.DETERMINISTIC,
        policyFormatVersion,
      );
      assert.strictEqual(Buffer.from(await encryptValue(legacy, 42), "base64")[1], 1);
      assert.strictEqual(Buffer.from(await encryptValue(typed, 42), "base64")[1], 2);
    },
  );

  it("should capture experimental options without retaining mutable caller configuration", async () => {
    const experimental: ExperimentalOptions = {
      encryptedValueFormat: "authenticatedType",
      legacyValueReadPolicy: "reject",
    };
    const processor = await createProcessor(experimental);
    experimental.encryptedValueFormat = "legacy";
    experimental.legacyValueReadPolicy = "allow";
    assert.strictEqual(Buffer.from(await encryptValue(processor, 42), "base64")[1], 2);
    const legacy = await createProcessor();
    await expect(decryptValue(processor, await encryptValue(legacy, 42))).rejects.toThrow(
      /Legacy encrypted values are rejected/,
    );
  });

  it.each(["future", "", null, 0])("should reject invalid runtime write format %s", (value) => {
    assert.throws(
      () => createClient({ encryptedValueFormat: value } as unknown as ExperimentalOptions),
      /encryptedValueFormat must be "legacy" or "authenticatedType"/,
    );
  });

  it.each(["future", "", null, false])("should reject invalid runtime read policy %s", (value) => {
    assert.throws(
      () => createClient({ legacyValueReadPolicy: value } as unknown as ExperimentalOptions),
      /legacyValueReadPolicy must be "allow" or "reject"/,
    );
  });

  it.each([undefined, "legacy"] as const)(
    "should reject legacy writes with strict reads when write format is %s",
    (encryptedValueFormat) => {
      assert.throws(
        () => createClient({ encryptedValueFormat, legacyValueReadPolicy: "reject" }),
        /legacyValueReadPolicy "reject" requires encryptedValueFormat "authenticatedType"/,
      );
    },
  );

  it.each([{ value: null }, { value: "authenticatedType" }, { value: [] }])(
    "should reject invalid runtime experimental options %s",
    ({ value }) => {
      assert.throws(
        () => createClient(value as unknown as ExperimentalOptions),
        /experimental must be an options object/,
      );
    },
  );
});
