// import { EncryptionKeyStoreProvider } from './EncryptionKeyStoreProvider';
import { wrapKey } from '@azure/keyvault-keys';
import { DataEncryptionAlgorithm } from './DataEncryptionAlgorithm';

const encryptionKeyCache = new Map<string, ProtectedDataEncryptionKey>();
const keyEncryptionKeyCache = new Map<string, KeyEncryptionKey>();

function GetOrCreate<T>(cache: Map<string, T>, key: string, createItem: () => T): T {
  let item = cache.get(key);
  if (!item) {
    item = createItem();
    cache.set(key, item);
  }
  return item;
}

function bytesToHexString(bytes: Uint8Array): string {
  const buffer = Buffer.from(bytes);
  return buffer.toString('hex');
}

export class ProtectedDataEncryptionKey {
  public static GetOrCreate(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    encryptedKey: Uint8Array
  ): ProtectedDataEncryptionKey {
    if (!name || !name.trim()) {
      throw new Error('name parameter must not be null or whitespace.');
    }

    if (!keyEncryptionKey) {
      throw new Error('keyEncryptionKey parameter must not be null.');
    }

    if (!encryptedKey || encryptedKey.length === 0) {
      throw new Error('encryptedKey parameter must not be null or empty.');
    }

    return GetOrCreate<ProtectedDataEncryptionKey>(
      encryptionKeyCache,
      [name, keyEncryptionKey, bytesToHexString(encryptedKey)].join('-'),
      () => new ProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedKey)
    );
  }

  public readonly Name: string;
  public readonly KeyEncryptionKey: KeyEncryptionKey;
  public readonly EncryptedKey: Uint8Array;

  constructor(name: string, keyEncryptionKey: KeyEncryptionKey, encryptedKey?: Uint8Array) {
    if (!name || !name.trim()) {
      throw new Error('name parameter must not be null or whitespace.');
    }

    if (!keyEncryptionKey) {
      throw new Error('keyEncryptionKey parameter must not be null.');
    }

    this.Name = name;
    this.KeyEncryptionKey = keyEncryptionKey;
    this.EncryptedKey = encryptedKey || this.GenerateNewColumnEncryptionKey();
  }

  public GenerateNewColumnEncryptionKey(): Uint8Array {
    const plainTextColumnEncryptionKey = new Uint8Array(32);
    window.crypto.getRandomValues(plainTextColumnEncryptionKey);

    return this.KeyEncryptionKey.EncryptEncryptionKey(plainTextColumnEncryptionKey);
  }
}

export class KeyEncryptionKey {
  private static readonly encryptionAlgorithm: DataEncryptionAlgorithm = DataEncryptionAlgorithm.RsaOaepValue;

  public static GetOrCreate(
    name: string,
    path: string,
    keyStoreProvider: EncryptionKeyStoreProvider
  ): KeyEncryptionKey {
    if (!validateNotNullOrWhitespace(name)) {
      throw new Error('name parameter must not be null or whitespace.');
    }

    if (!validateNotNullOrWhitespace(path)) {
      throw new Error('path parameter must not be null or whitespace.');
    }

    if (!keyStoreProvider) {
      throw new Error('keyStoreProvider parameter must not be null.');
    }

    return GetOrCreate<KeyEncryptionKey>(
      keyEncryptionKeyCache,
      [name, path, keyStoreProvider].join('-'),
      () => new KeyEncryptionKey(name, path, keyStoreProvider)
    );
  }

  public readonly Name: string;
  public readonly Path: string;
  public readonly KeyStoreProvider: EncryptionKeyStoreProvider;

  constructor(name: string, path: string, keyStoreProvider: EncryptionKeyStoreProvider) {
    if (!validateNotNullOrWhitespace(name)) {
      throw new Error('name parameter must not be null or whitespace.');
    }

    if (!validateNotNullOrWhitespace(path)) {
      throw new Error('path parameter must not be null or whitespace.');
    }

    if (!keyStoreProvider) {
      throw new Error('keyStoreProvider parameter must not be null.');
    }

    this.Name = name;
    this.Path = path;
    this.KeyStoreProvider = keyStoreProvider;
  }

  public EncryptEncryptionKey(plaintextEncryptionKey: Uint8Array): Uint8Array {
    return this.KeyStoreProvider.wrapKey(
      this.Path,
      this.Name,
      KeyEncryptionKey.encryptionAlgorithm,
      plaintextEncryptionKey
    );
  }
}

function validateNotNullOrWhitespace(value: string): boolean {
  return value && value.trim() !== '';
}
