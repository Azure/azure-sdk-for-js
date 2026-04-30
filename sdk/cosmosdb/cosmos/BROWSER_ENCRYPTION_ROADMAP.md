# Cosmos Browser Encryption Roadmap

> **Status**: Future work (separate PR from platform imports migration)
> **Do NOT push this file** — local reference only.

## Current State

The cosmos encryption subsystem (`src/encryption/`) is Node-only. Browser stubs throw
"Client-side Encryption not supported in browser environment" in constructors or methods.

### Stubs that throw in constructors (block polyfills)

| File | Throws in |
|------|-----------|
| `DataEncryptionKey-browser.mts` | constructor |
| `AeadAes256CbcHmacSha256Algorithm-browser.mts` | constructor |
| `ProtectedDataEncryptionKeyCache-browser.mts` | constructor |
| `EncryptionKeyStoreProvider-browser.mts` | constructor |

### Stubs that throw only in methods (polyfill-friendly)

| File | Pattern |
|------|---------|
| `EncryptionProcessor-browser.mts` | constructor stores args, methods throw |
| `KeyEncryptionKey-browser.mts` | constructor stores args, methods throw |
| `Serializers/index-browser.mts` | all method exports throw |
| `ProtectedDataEncryptionKey-browser.mts` | extends DataEncryptionKey (inherits throw) |

## Making Stubs Polyfill-Friendly

### Easy (just remove constructor throw, store args)

1. **`EncryptionKeyStoreProvider`** — constructor only stores `keyEncryptionKeyResolver` and `cacheTimeToLive`. No crypto work.
2. **`ProtectedDataEncryptionKeyCache`** — constructor only stores `cacheTimeToLive`.
3. **`AeadAes256CbcHmacSha256Algorithm`** — constructor stores `dataEncryptionKey` + `encryptionType` and sets constants. No Node APIs.

### Medium (requires async refactor or lazy init)

4. **`DataEncryptionKey`** — The Node constructor **derives 3 sub-keys** using HMAC-SHA256:
   ```ts
   this.encryptionKeyBuffer = this.getHmacWithSha256(encKeySalt, rootKey); // uses node:crypto createHmac
   this.macKeyBuffer = this.getHmacWithSha256(macKeySalt, rootKey);
   this.ivKeyBuffer = this.getHmacWithSha256(ivKeySalt, rootKey);
   ```
   Browser SubtleCrypto has HMAC-SHA256 but it's **async-only**.

   **Options:**
   - **Static factory**: `static async create(rootKey, name)` — real browser support, requires refactoring all call sites
   - **Lazy derivation**: Derive keys on first `encrypt()`/`decrypt()` call (async)
   - **No-op constructor**: Store rootKey, leave derived keys undefined (user must subclass)

## Available Cross-Platform Crypto APIs

### From `@azure/core-util` (re-exported from `ts-http-runtime`)

```ts
computeSha256Hmac(key: string/*base64*/, stringToSign: string, encoding: "base64"|"hex"): Promise<string>
computeSha256Hash(content: string, encoding: "base64"|"hex"): Promise<string>
```

**Limitations:**
- Key must be base64 string (cosmos has raw bytes)
- Data must be UTF-8 string (cosmos uses UTF-16LE encoding for salt strings)
- Returns string (cosmos needs raw bytes)
- Async only

### Browser native (`SubtleCrypto`)

```ts
const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, {name: "HMAC", hash: "SHA-256"}, false, ["sign"]);
const signature = await crypto.subtle.sign("HMAC", cryptoKey, dataBytes);
```

**Capabilities:**
- Takes raw bytes as key ✓
- Takes raw bytes as data ✓
- Returns raw ArrayBuffer ✓
- Supports HMAC-SHA256 ✓
- Available in all modern browsers ✓
- **Async only** ✗ (can't use in sync constructor)

## Recommended Approach for Full Browser Encryption Support

1. Refactor `DataEncryptionKey` to use async factory pattern:
   ```ts
   abstract class DataEncryptionKey {
     static async create(rootKey: Uint8Array, name: string): Promise<DataEncryptionKey> { ... }
   }
   ```

2. Use SubtleCrypto directly in the browser variant for HMAC derivation
   (don't use core-util's wrapper since it doesn't support raw bytes or UTF-16LE)

3. Once `DataEncryptionKey` is async, the remaining stubs become trivially polyfill-friendly
   (they all depend on having a `DataEncryptionKey` instance)

4. Consider: should `AeadAes256CbcHmacSha256Algorithm.encrypt()`/`decrypt()` also use SubtleCrypto?
   - AES-256-CBC is available via SubtleCrypto
   - Would give real browser encryption support without polyfills

## UTF-16LE Encoding Note

The HMAC salt strings are encoded as UTF-16LE before being passed to HMAC:
```ts
hmac.update(Buffer.from(plainText, "utf16le"));
```

In browser, this can be done with:
```ts
const encoder = new TextEncoder(); // UTF-8
// For UTF-16LE, manually encode:
const utf16le = new Uint8Array(str.length * 2);
for (let i = 0; i < str.length; i++) {
  const code = str.charCodeAt(i);
  utf16le[i * 2] = code & 0xff;
  utf16le[i * 2 + 1] = (code >> 8) & 0xff;
}
```
