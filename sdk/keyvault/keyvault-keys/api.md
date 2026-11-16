# API review: `@azure/keyvault-keys`

## Entry points

| Export path | Conditions |
| --- | --- |
| `.` | `import`, `require`, `browser` |

## Dependencies

Only Hashed version is part of the review hash.

| Package | Version specifier | Resolved version | Hashed version | Type |
| --- | --- | --- | --- | --- |
| `@azure-rest/core-client` | `^2.3.3` | `^2.3.3` | `2` | runtime |
| `@azure/abort-controller` | `^2.1.2` | `^2.1.2` | `2` | runtime |
| `@azure/core-auth` | `^1.9.0` | `^1.9.0` | `1` | runtime |
| `@azure/core-lro` | `^2.7.2` | `^2.7.2` | `2` | runtime |
| `@azure/core-paging` | `^1.6.2` | `^1.6.2` | `1` | runtime |
| `@azure/core-rest-pipeline` | `^1.19.0` | `^1.19.0` | `1` | runtime |
| `@azure/core-tracing` | `^1.2.0` | `^1.2.0` | `1` | runtime |
| `@azure/core-util` | `^1.11.0` | `^1.11.0` | `1` | runtime |
| `@azure/keyvault-common` | `^2.1.0` | `^2.1.0` | `2` | runtime |
| `@azure/logger` | `^1.1.4` | `^1.1.4` | `1` | runtime |
| `tslib` | `^2.8.1` | `^2.8.1` | `2` | runtime |

## References

```ts
import { OperationOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import {
    PollerLike,
    PollOperationState,
} from "@azure/core-lro";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExtendedCommonClientOptions } from "@azure/keyvault-common";
import { AzureLogger } from "@azure/logger";
```

## Export `.`

```ts
export interface AesCbcDecryptParameters {
    algorithm: AesCbcEncryptionAlgorithm;
    ciphertext: Uint8Array;
    iv: Uint8Array;
}

export type AesCbcEncryptionAlgorithm = "A128CBC" | "A192CBC" | "A256CBC" | "A128CBCPAD" | "A192CBCPAD" | "A256CBCPAD";

export interface AesCbcEncryptParameters {
    algorithm: AesCbcEncryptionAlgorithm;
    plaintext: Uint8Array;
    iv?: Uint8Array;
}

export interface AesGcmDecryptParameters {
    algorithm: AesGcmEncryptionAlgorithm;
    ciphertext: Uint8Array;
    iv: Uint8Array;
    authenticationTag: Uint8Array;
    additionalAuthenticatedData?: Uint8Array;
}

export type AesGcmEncryptionAlgorithm = "A128GCM" | "A192GCM" | "A256GCM";

export interface AesGcmEncryptParameters {
    algorithm: AesGcmEncryptionAlgorithm;
    plaintext: Uint8Array;
    additionalAuthenticatedData?: Uint8Array;
}

export interface BackupKeyOptions extends OperationOptions {
}

export interface BeginDeleteKeyOptions extends KeyPollerOptions {
}

export interface BeginRecoverDeletedKeyOptions extends KeyPollerOptions {
}

export interface CreateEcKeyOptions extends CreateKeyOptions {
}

export interface CreateKeyOptions extends OperationOptions {
    tags?: {
        [propertyName: string]: string;
    };
    keyOps?: KeyOperation[];
    enabled?: boolean;
    notBefore?: Date;
    readonly expiresOn?: Date;
    keySize?: number;
    curve?: KeyCurveName;
    hsm?: boolean;
    exportable?: boolean;
    releasePolicy?: KeyReleasePolicy;
}

export interface CreateOctKeyOptions extends CreateKeyOptions {
}

export interface CreateRsaKeyOptions extends CreateKeyOptions {
    publicExponent?: number;
}

export class CryptographyClient {
    constructor(key: string | KeyVaultKey, credential: TokenCredential, pipelineOptions?: CryptographyClientOptions);
    constructor(key: JsonWebKey);
    get vaultUrl(): string;
    get keyID(): string | undefined;
    encrypt(encryptParameters: EncryptParameters, options?: EncryptOptions): Promise<EncryptResult>;
    // @deprecated
    encrypt(algorithm: EncryptionAlgorithm, plaintext: Uint8Array, options?: EncryptOptions): Promise<EncryptResult>;
    decrypt(decryptParameters: DecryptParameters, options?: DecryptOptions): Promise<DecryptResult>;
    // @deprecated
    decrypt(algorithm: EncryptionAlgorithm, ciphertext: Uint8Array, options?: DecryptOptions): Promise<DecryptResult>;
    wrapKey(algorithm: KeyWrapAlgorithm, key: Uint8Array, options?: WrapKeyOptions): Promise<WrapResult>;
    unwrapKey(algorithm: KeyWrapAlgorithm, encryptedKey: Uint8Array, options?: UnwrapKeyOptions): Promise<UnwrapResult>;
    sign(algorithm: SignatureAlgorithm, digest: Uint8Array, options?: SignOptions): Promise<SignResult>;
    verify(algorithm: SignatureAlgorithm, digest: Uint8Array, signature: Uint8Array, options?: VerifyOptions): Promise<VerifyResult>;
    signData(algorithm: SignatureAlgorithm, data: Uint8Array, options?: SignOptions): Promise<SignResult>;
    verifyData(algorithm: SignatureAlgorithm, data: Uint8Array, signature: Uint8Array, options?: VerifyOptions): Promise<VerifyResult>;
}

export interface CryptographyClientOptions extends KeyClientOptions {
}

export interface CryptographyOptions extends OperationOptions {
}

export interface DecryptOptions extends CryptographyOptions {
}

export type DecryptParameters = RsaDecryptParameters | AesGcmDecryptParameters | AesCbcDecryptParameters;

export interface DecryptResult {
    result: Uint8Array;
    keyID?: string;
    algorithm: EncryptionAlgorithm;
}

export interface DeletedKey {
    key?: JsonWebKey;
    name: string;
    id?: string;
    keyType?: KeyType;
    keyOperations?: KeyOperation[];
    properties: KeyProperties & {
        readonly recoveryId?: string;
        readonly scheduledPurgeDate?: Date;
        deletedOn?: Date;
    };
}

export type DeletionRecoveryLevel = string;

export type EncryptionAlgorithm = string;

export interface EncryptOptions extends CryptographyOptions {
}

export type EncryptParameters = RsaEncryptParameters | AesGcmEncryptParameters | AesCbcEncryptParameters;

export interface EncryptResult {
    result: Uint8Array;
    algorithm: EncryptionAlgorithm;
    keyID?: string;
    iv?: Uint8Array;
    authenticationTag?: Uint8Array;
    additionalAuthenticatedData?: Uint8Array;
}

export interface ExternalKey {
    id: string;
}

export interface GetCryptographyClientOptions {
    keyVersion?: string;
}

export interface GetDeletedKeyOptions extends OperationOptions {
}

export interface GetKeyAttestationOptions extends OperationOptions {
    version?: string;
}

export interface GetKeyOptions extends OperationOptions {
    version?: string;
}

export interface GetKeyRotationPolicyOptions extends OperationOptions {
}

export interface GetRandomBytesOptions extends OperationOptions {
}

export interface ImportKeyOptions extends OperationOptions {
    tags?: {
        [propertyName: string]: string;
    };
    hardwareProtected?: boolean;
    enabled?: boolean;
    notBefore?: Date;
    expiresOn?: Date;
    exportable?: boolean;
    releasePolicy?: KeyReleasePolicy;
}

export interface JsonWebKey {
    kid?: string;
    kty?: KeyType;
    keyOps?: KeyOperation[];
    n?: Uint8Array;
    e?: Uint8Array;
    d?: Uint8Array;
    dp?: Uint8Array;
    dq?: Uint8Array;
    qi?: Uint8Array;
    p?: Uint8Array;
    q?: Uint8Array;
    k?: Uint8Array;
    t?: Uint8Array;
    crv?: KeyCurveName;
    x?: Uint8Array;
    y?: Uint8Array;
}

export interface KeyAttestation {
    certificatePemFile?: Uint8Array;
    privateKeyAttestation?: Uint8Array;
    publicKeyAttestation?: Uint8Array;
    version?: string;
}

export class KeyClient {
    readonly vaultUrl: string;
    constructor(vaultUrl: string, credential: TokenCredential, pipelineOptions?: KeyClientOptions);
    createKey(name: string, keyType: KeyType, options?: CreateKeyOptions): Promise<KeyVaultKey>;
    createEcKey(name: string, options?: CreateEcKeyOptions): Promise<KeyVaultKey>;
    createRsaKey(name: string, options?: CreateRsaKeyOptions): Promise<KeyVaultKey>;
    createOctKey(name: string, options?: CreateOctKeyOptions): Promise<KeyVaultKey>;
    createExternalKey(name: string, externalKey: ExternalKey, options?: CreateKeyOptions): Promise<KeyVaultKey>;
    importKey(name: string, key: JsonWebKey, options?: ImportKeyOptions): Promise<KeyVaultKey>;
    getCryptographyClient(keyName: string, options?: GetCryptographyClientOptions): CryptographyClient;
    beginDeleteKey(name: string, options?: BeginDeleteKeyOptions): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>>;
    updateKeyProperties(name: string, keyVersion: string, options?: UpdateKeyPropertiesOptions): Promise<KeyVaultKey>;
    updateKeyProperties(name: string, options?: UpdateKeyPropertiesOptions): Promise<KeyVaultKey>;
    getKey(name: string, options?: GetKeyOptions): Promise<KeyVaultKey>;
    getKeyAttestation(name: string, options?: GetKeyAttestationOptions): Promise<KeyVaultKey>;
    getDeletedKey(name: string, options?: GetDeletedKeyOptions): Promise<DeletedKey>;
    purgeDeletedKey(name: string, options?: PurgeDeletedKeyOptions): Promise<void>;
    beginRecoverDeletedKey(name: string, options?: BeginRecoverDeletedKeyOptions): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>>;
    backupKey(name: string, options?: BackupKeyOptions): Promise<Uint8Array | undefined>;
    restoreKeyBackup(backup: Uint8Array, options?: RestoreKeyBackupOptions): Promise<KeyVaultKey>;
    getRandomBytes(count: number, options?: GetRandomBytesOptions): Promise<Uint8Array>;
    rotateKey(name: string, options?: RotateKeyOptions): Promise<KeyVaultKey>;
    releaseKey(name: string, targetAttestationToken: string, options?: ReleaseKeyOptions): Promise<ReleaseKeyResult>;
    secureWrapKey(name: string, algorithm: SecureKeyWrapAlgorithm, options?: SecureWrapKeyOptions): Promise<SecureKeyOperationResult>;
    secureUnwrapKey(name: string, algorithm: SecureKeyWrapAlgorithm, value: Uint8Array, targetAttestationToken: string, options?: SecureUnwrapKeyOptions): Promise<SecureKeyOperationResult>;
    getKeyRotationPolicy(keyName: string, options?: GetKeyRotationPolicyOptions): Promise<KeyRotationPolicy>;
    updateKeyRotationPolicy(keyName: string, policy: KeyRotationPolicyProperties, options?: UpdateKeyRotationPolicyOptions): Promise<KeyRotationPolicy>;
    listPropertiesOfKeyVersions(name: string, options?: ListPropertiesOfKeyVersionsOptions): PagedAsyncIterableIterator<KeyProperties>;
    listPropertiesOfKeys(options?: ListPropertiesOfKeysOptions): PagedAsyncIterableIterator<KeyProperties>;
    listDeletedKeys(options?: ListDeletedKeysOptions): PagedAsyncIterableIterator<DeletedKey>;
}

export interface KeyClientOptions extends ExtendedCommonClientOptions {
    serviceVersion?: string;
    disableChallengeResourceVerification?: boolean;
}

export type KeyCurveName = string;

export type KeyExportEncryptionAlgorithm = string;

export type KeyOperation = string;

export interface KeyPollerOptions extends OperationOptions {
    intervalInMs?: number;
    resumeFrom?: string;
}

export interface KeyProperties {
    id?: string;
    name: string;
    vaultUrl: string;
    version?: string;
    enabled?: boolean;
    notBefore?: Date;
    expiresOn?: Date;
    tags?: {
        [propertyName: string]: string;
    };
    readonly createdOn?: Date;
    readonly updatedOn?: Date;
    readonly recoveryLevel?: DeletionRecoveryLevel;
    recoverableDays?: number;
    readonly managed?: boolean;
    exportable?: boolean;
    releasePolicy?: KeyReleasePolicy;
    readonly hsmPlatform?: string;
    attestation?: KeyAttestation;
    externalKey?: ExternalKey;
    readonly keySize?: number;
}

export interface KeyReleasePolicy {
    contentType?: string;
    encodedPolicy?: Uint8Array;
    immutable?: boolean;
}

export interface KeyRotationLifetimeAction {
    timeAfterCreate?: string;
    timeBeforeExpiry?: string;
    action: KeyRotationPolicyAction;
}

export interface KeyRotationPolicy extends KeyRotationPolicyProperties {
    readonly id?: string;
    readonly createdOn?: Date;
    readonly updatedOn?: Date;
}

export type KeyRotationPolicyAction = "Rotate" | "Notify";

export interface KeyRotationPolicyProperties {
    expiresIn?: string;
    lifetimeActions?: KeyRotationLifetimeAction[];
}

export type KeyType = string;

export interface KeyVaultKey {
    key?: JsonWebKey;
    name: string;
    id?: string;
    keyType?: KeyType;
    keyOperations?: KeyOperation[];
    properties: KeyProperties;
}

export interface KeyVaultKeyIdentifier {
    sourceId: string;
    vaultUrl: string;
    version?: string;
    name: string;
}

export type KeyWrapAlgorithm = "A128KW" | "A192KW" | "A256KW" | "RSA-OAEP" | "RSA-OAEP-256" | "RSA1_5" | "CKM_AES_KEY_WRAP" | "CKM_AES_KEY_WRAP_PAD";

export declare enum KnownDeletionRecoveryLevel {
    Purgeable = "Purgeable",
    RecoverablePurgeable = "Recoverable+Purgeable",
    Recoverable = "Recoverable",
    RecoverableProtectedSubscription = "Recoverable+ProtectedSubscription",
    CustomizedRecoverablePurgeable = "CustomizedRecoverable+Purgeable",
    CustomizedRecoverable = "CustomizedRecoverable",
    CustomizedRecoverableProtectedSubscription = "CustomizedRecoverable+ProtectedSubscription"
}

export declare enum KnownEncryptionAlgorithms {
    RSAOaep = "RSA-OAEP",
    RSAOaep256 = "RSA-OAEP-256",
    RSA15 = "RSA1_5",
    A128GCM = "A128GCM",
    A192GCM = "A192GCM",
    A256GCM = "A256GCM",
    A128KW = "A128KW",
    A192KW = "A192KW",
    A256KW = "A256KW",
    A128CBC = "A128CBC",
    A192CBC = "A192CBC",
    A256CBC = "A256CBC",
    A128Cbcpad = "A128CBCPAD",
    A192Cbcpad = "A192CBCPAD",
    A256Cbcpad = "A256CBCPAD",
    CkmAesKeyWrap = "CKM_AES_KEY_WRAP",
    CkmAesKeyWrapPad = "CKM_AES_KEY_WRAP_PAD"
}

export declare enum KnownKeyCurveNames {
    P256 = "P-256",
    P384 = "P-384",
    P521 = "P-521",
    P256K = "P-256K"
}

export declare enum KnownKeyExportEncryptionAlgorithm {
    CkmRsaAesKeyWrap = "CKM_RSA_AES_KEY_WRAP",
    RsaAesKeyWrap256 = "RSA_AES_KEY_WRAP_256",
    RsaAesKeyWrap384 = "RSA_AES_KEY_WRAP_384"
}

export declare enum KnownKeyOperations {
    Encrypt = "encrypt",
    Decrypt = "decrypt",
    Sign = "sign",
    Verify = "verify",
    WrapKey = "wrapKey",
    UnwrapKey = "unwrapKey",
    Import = "import",
    SecureWrapKey = "secureWrapKey",
    SecureUnwrapKey = "secureUnwrapKey"
}

export declare enum KnownKeyTypes {
    EC = "EC",
    ECHSM = "EC-HSM",
    RSA = "RSA",
    RSAHSM = "RSA-HSM",
    Oct = "oct",
    OctHSM = "oct-HSM"
}

export declare enum KnownSignatureAlgorithms {
    PS256 = "PS256",
    PS384 = "PS384",
    PS512 = "PS512",
    RS256 = "RS256",
    RS384 = "RS384",
    RS512 = "RS512",
    HS256 = "HS256",
    HS384 = "HS384",
    HS512 = "HS512",
    Rsnull = "RSNULL",
    ES256 = "ES256",
    ES384 = "ES384",
    ES512 = "ES512",
    ES256K = "ES256K"
}

export interface ListDeletedKeysOptions extends OperationOptions {
}

export interface ListPropertiesOfKeysOptions extends OperationOptions {
}

export interface ListPropertiesOfKeyVersionsOptions extends OperationOptions {
}

export declare const logger: AzureLogger;

export declare function parseKeyVaultKeyIdentifier(id: string): KeyVaultKeyIdentifier;

export interface PurgeDeletedKeyOptions extends OperationOptions {
}

export interface ReleaseKeyOptions extends OperationOptions {
    nonce?: string;
    algorithm?: KeyExportEncryptionAlgorithm;
    version?: string;
}

export interface ReleaseKeyResult {
    value: string;
}

export interface RestoreKeyBackupOptions extends OperationOptions {
}

export interface RotateKeyOptions extends OperationOptions {
}

export interface RsaDecryptParameters {
    algorithm: RsaEncryptionAlgorithm;
    ciphertext: Uint8Array;
}

export type RsaEncryptionAlgorithm = "RSA1_5" | "RSA-OAEP" | "RSA-OAEP-256";

export interface RsaEncryptParameters {
    algorithm: RsaEncryptionAlgorithm;
    plaintext: Uint8Array;
}

export interface SecureKeyOperationResult {
    keyID: string;
    algorithm: SecureKeyWrapAlgorithm;
    result: Uint8Array;
}

export type SecureKeyWrapAlgorithm = "RSA-OAEP-256" | "A128KW" | "A192KW" | "A256KW" | "A128KWPAD" | "A192KWPAD" | "A256KWPAD" | "CKM_AES_KEY_WRAP" | "CKM_AES_KEY_WRAP_PAD";

export interface SecureUnwrapKeyOptions extends OperationOptions {
    version?: string;
}

export interface SecureWrapKeyOptions extends OperationOptions {
    version?: string;
}

export type SignatureAlgorithm = string;

export interface SignOptions extends CryptographyOptions {
}

export interface SignResult {
    result: Uint8Array;
    keyID?: string;
    algorithm: SignatureAlgorithm;
}

export interface UnwrapKeyOptions extends CryptographyOptions {
}

export interface UnwrapResult {
    result: Uint8Array;
    keyID?: string;
    algorithm: KeyWrapAlgorithm;
}

export interface UpdateKeyPropertiesOptions extends OperationOptions {
    keyOps?: KeyOperation[];
    enabled?: boolean;
    notBefore?: Date;
    expiresOn?: Date;
    tags?: {
        [propertyName: string]: string;
    };
    releasePolicy?: KeyReleasePolicy;
}

export interface UpdateKeyRotationPolicyOptions extends OperationOptions {
}

export interface VerifyDataOptions extends CryptographyOptions {
}

export interface VerifyOptions extends CryptographyOptions {
}

export interface VerifyResult {
    result: boolean;
    keyID?: string;
}

export interface WrapKeyOptions extends CryptographyOptions {
}

export interface WrapResult {
    result: Uint8Array;
    keyID?: string;
    algorithm: KeyWrapAlgorithm;
}

export {
    isRestError,
    RestError,
} from "@azure/core-rest-pipeline";
export {
    type PagedAsyncIterableIterator,
    type PageSettings,
} from "@azure/core-paging";
export {
    type PollerLike,
    type PollOperationState,
} from "@azure/core-lro";
```

## Runtime differences

Identical to the ESM view: `require`, `browser`.
