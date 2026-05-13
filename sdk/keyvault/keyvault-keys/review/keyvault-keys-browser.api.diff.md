# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -92,9 +92,9 @@
 
 // @public
 export class CryptographyClient {
     constructor(key: string | KeyVaultKey, credential: TokenCredential, pipelineOptions?: CryptographyClientOptions);
-    constructor(key: JsonWebKey);
+    constructor(key: JsonWebKey_2);
     decrypt(decryptParameters: DecryptParameters, options?: DecryptOptions): Promise<DecryptResult>;
     // @deprecated
     decrypt(algorithm: EncryptionAlgorithm, ciphertext: Uint8Array, options?: DecryptOptions): Promise<DecryptResult>;
     encrypt(encryptParameters: EncryptParameters, options?: EncryptOptions): Promise<EncryptResult>;
@@ -134,11 +134,11 @@
 
 // @public
 export interface DeletedKey {
     id?: string;
-    key?: JsonWebKey;
+    key?: JsonWebKey_2;
     keyOperations?: KeyOperation[];
-    keyType?: KeyType;
+    keyType?: KeyType_2;
     name: string;
     properties: KeyProperties & {
         readonly recoveryId?: string;
         readonly scheduledPurgeDate?: Date;
@@ -209,26 +209,27 @@
     };
 }
 
 // @public
-export interface JsonWebKey {
+interface JsonWebKey_2 {
     crv?: KeyCurveName;
     d?: Uint8Array;
     dp?: Uint8Array;
     dq?: Uint8Array;
     e?: Uint8Array;
     k?: Uint8Array;
     keyOps?: KeyOperation[];
     kid?: string;
-    kty?: KeyType;
+    kty?: KeyType_2;
     n?: Uint8Array;
     p?: Uint8Array;
     q?: Uint8Array;
     qi?: Uint8Array;
     t?: Uint8Array;
     x?: Uint8Array;
     y?: Uint8Array;
 }
+export { JsonWebKey_2 as JsonWebKey }
 
 // @public
 export interface KeyAttestation {
     certificatePemFile?: Uint8Array;
@@ -243,18 +244,18 @@
     backupKey(name: string, options?: BackupKeyOptions): Promise<Uint8Array | undefined>;
     beginDeleteKey(name: string, options?: BeginDeleteKeyOptions): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>>;
     beginRecoverDeletedKey(name: string, options?: BeginRecoverDeletedKeyOptions): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>>;
     createEcKey(name: string, options?: CreateEcKeyOptions): Promise<KeyVaultKey>;
-    createKey(name: string, keyType: KeyType, options?: CreateKeyOptions): Promise<KeyVaultKey>;
+    createKey(name: string, keyType: KeyType_2, options?: CreateKeyOptions): Promise<KeyVaultKey>;
     createOctKey(name: string, options?: CreateOctKeyOptions): Promise<KeyVaultKey>;
     createRsaKey(name: string, options?: CreateRsaKeyOptions): Promise<KeyVaultKey>;
     getCryptographyClient(keyName: string, options?: GetCryptographyClientOptions): CryptographyClient;
     getDeletedKey(name: string, options?: GetDeletedKeyOptions): Promise<DeletedKey>;
     getKey(name: string, options?: GetKeyOptions): Promise<KeyVaultKey>;
     getKeyAttestation(name: string, options?: GetKeyAttestationOptions): Promise<KeyVaultKey>;
     getKeyRotationPolicy(keyName: string, options?: GetKeyRotationPolicyOptions): Promise<KeyRotationPolicy>;
     getRandomBytes(count: number, options?: GetRandomBytesOptions): Promise<Uint8Array>;
-    importKey(name: string, key: JsonWebKey, options?: ImportKeyOptions): Promise<KeyVaultKey>;
+    importKey(name: string, key: JsonWebKey_2, options?: ImportKeyOptions): Promise<KeyVaultKey>;
     listDeletedKeys(options?: ListDeletedKeysOptions): PagedAsyncIterableIterator<DeletedKey>;
     listPropertiesOfKeys(options?: ListPropertiesOfKeysOptions): PagedAsyncIterableIterator<KeyProperties>;
     listPropertiesOfKeyVersions(name: string, options?: ListPropertiesOfKeyVersionsOptions): PagedAsyncIterableIterator<KeyProperties>;
     purgeDeletedKey(name: string, options?: PurgeDeletedKeyOptions): Promise<void>;
@@ -341,16 +342,17 @@
     lifetimeActions?: KeyRotationLifetimeAction[];
 }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultKey {
     id?: string;
-    key?: JsonWebKey;
+    key?: JsonWebKey_2;
     keyOperations?: KeyOperation[];
-    keyType?: KeyType;
+    keyType?: KeyType_2;
     name: string;
     properties: KeyProperties;
 }
 

```