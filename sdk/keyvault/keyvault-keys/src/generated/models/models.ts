// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/** The key create parameters. */
export interface KeyCreateParameters {
  /** The type of key to create. For valid values, see JsonWebKeyType. */
  kty: JsonWebKeyType;
  /** The key size in bits. For example: 2048, 3072, or 4096 for RSA. */
  keySize?: number;
  /** The public exponent for a RSA key. */
  publicExponent?: number;
  /** Json web key operations. For more information on possible key operations, see JsonWebKeyOperation. */
  keyOps?: JsonWebKeyOperation[];
  /** The attributes of a key managed by the key vault service. */
  keyAttributes?: KeyAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Elliptic curve name. For valid values, see JsonWebKeyCurveName. */
  curve?: JsonWebKeyCurveName;
  /** The policy rules under which the key can be exported. */
  releasePolicy?: KeyReleasePolicy;
}

export function keyCreateParametersSerializer(item: KeyCreateParameters): any {
  return {
    kty: item["kty"],
    key_size: item["keySize"],
    public_exponent: item["publicExponent"],
    key_ops: !item["keyOps"]
      ? item["keyOps"]
      : item["keyOps"].map((p: any) => {
          return p;
        }),
    attributes: !item["keyAttributes"]
      ? item["keyAttributes"]
      : keyAttributesSerializer(item["keyAttributes"]),
    tags: item["tags"],
    crv: item["curve"],
    release_policy: !item["releasePolicy"]
      ? item["releasePolicy"]
      : keyReleasePolicySerializer(item["releasePolicy"]),
  };
}

/** JsonWebKey Key Type (kty), as defined in https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40. */
export enum KnownJsonWebKeyType {
  /** Elliptic Curve. */
  EC = "EC",
  /** Elliptic Curve with a private key which is stored in the HSM. */
  EC_HSM = "EC-HSM",
  /** RSA (https://tools.ietf.org/html/rfc3447) */
  RSA = "RSA",
  /** RSA with a private key which is stored in the HSM. */
  RSA_HSM = "RSA-HSM",
  /** Octet sequence (used to represent symmetric keys) */
  oct = "oct",
  /** Octet sequence (used to represent symmetric keys) which is stored the HSM. */
  oct_HSM = "oct-HSM",
}

/**
 * JsonWebKey Key Type (kty), as defined in https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40. \
 * {@link KnownJsonWebKeyType} can be used interchangeably with JsonWebKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EC**: Elliptic Curve. \
 * **EC-HSM**: Elliptic Curve with a private key which is stored in the HSM. \
 * **RSA**: RSA (https:\//tools.ietf.org\/html\/rfc3447) \
 * **RSA-HSM**: RSA with a private key which is stored in the HSM. \
 * **oct**: Octet sequence (used to represent symmetric keys) \
 * **oct-HSM**: Octet sequence (used to represent symmetric keys) which is stored the HSM.
 */
export type JsonWebKeyType = string;

/** JSON web key operations. For more information, see JsonWebKeyOperation. */
export enum KnownJsonWebKeyOperation {
  /** Indicates that the key can be used to encrypt. */
  encrypt = "encrypt",
  /** Indicates that the key can be used to decrypt. */
  decrypt = "decrypt",
  /** Indicates that the key can be used to sign. */
  sign = "sign",
  /** Indicates that the key can be used to verify. */
  verify = "verify",
  /** Indicates that the key can be used to wrap another key. */
  wrapKey = "wrapKey",
  /** Indicates that the key can be used to unwrap another key. */
  unwrapKey = "unwrapKey",
  /** Indicates that the key can be imported during creation. */
  "import" = "import",
  /** Indicates that the private component of the key can be exported. */
  "export" = "export",
}

/**
 * JSON web key operations. For more information, see JsonWebKeyOperation. \
 * {@link KnownJsonWebKeyOperation} can be used interchangeably with JsonWebKeyOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **encrypt**: Indicates that the key can be used to encrypt. \
 * **decrypt**: Indicates that the key can be used to decrypt. \
 * **sign**: Indicates that the key can be used to sign. \
 * **verify**: Indicates that the key can be used to verify. \
 * **wrapKey**: Indicates that the key can be used to wrap another key. \
 * **unwrapKey**: Indicates that the key can be used to unwrap another key. \
 * **import**: Indicates that the key can be imported during creation. \
 * **export**: Indicates that the private component of the key can be exported.
 */
export type JsonWebKeyOperation = string;

/** The attributes of a key managed by the key vault service. */
export interface KeyAttributes {
  /** Determines whether the object is enabled. */
  enabled?: boolean;
  /** Not before date in UTC. */
  notBefore?: Date;
  /** Expiry date in UTC. */
  expires?: Date;
  /** Creation time in UTC. */
  readonly created?: Date;
  /** Last updated time in UTC. */
  readonly updated?: Date;
  /** softDelete data retention days. Value should be >=7 and <=90 when softDelete enabled, otherwise 0. */
  readonly recoverableDays?: number;
  /** Reflects the deletion recovery level currently in effect for keys in the current vault. If it contains 'Purgeable' the key can be permanently deleted by a privileged user; otherwise, only the system can purge the key, at the end of the retention interval. */
  readonly recoveryLevel?: DeletionRecoveryLevel;
  /** Indicates if the private key can be exported. Release policy must be provided when creating the first version of an exportable key. */
  exportable?: boolean;
  /** The underlying HSM Platform. */
  readonly hsmPlatform?: string;
}

export function keyAttributesSerializer(item: KeyAttributes): any {
  return {
    enabled: item["enabled"],
    nbf: !item["notBefore"]
      ? item["notBefore"]
      : (item["notBefore"].getTime() / 1000) | 0,
    exp: !item["expires"]
      ? item["expires"]
      : (item["expires"].getTime() / 1000) | 0,
    exportable: item["exportable"],
  };
}

export function keyAttributesDeserializer(item: any): KeyAttributes {
  return {
    enabled: item["enabled"],
    notBefore: !item["nbf"] ? item["nbf"] : new Date(item["nbf"] * 1000),
    expires: !item["exp"] ? item["exp"] : new Date(item["exp"] * 1000),
    created: !item["created"]
      ? item["created"]
      : new Date(item["created"] * 1000),
    updated: !item["updated"]
      ? item["updated"]
      : new Date(item["updated"] * 1000),
    recoverableDays: item["recoverableDays"],
    recoveryLevel: item["recoveryLevel"],
    exportable: item["exportable"],
    hsmPlatform: item["hsmPlatform"],
  };
}

/** Reflects the deletion recovery level currently in effect for certificates in the current vault. If it contains 'Purgeable', the certificate can be permanently deleted by a privileged user; otherwise, only the system can purge the certificate, at the end of the retention interval. */
export enum KnownDeletionRecoveryLevel {
  /** Denotes a vault state in which deletion is an irreversible operation, without the possibility for recovery. This level corresponds to no protection being available against a Delete operation; the data is irretrievably lost upon accepting a Delete operation at the entity level or higher (vault, resource group, subscription etc.) */
  Purgeable = "Purgeable",
  /** Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval (90 days), unless a Purge operation is requested, or the subscription is cancelled. System wil permanently delete it after 90 days, if not recovered */
  RecoverablePurgeable = "Recoverable+Purgeable",
  /** Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval(90 days) and while the subscription is still available. System wil permanently delete it after 90 days, if not recovered */
  Recoverable = "Recoverable",
  /** Denotes a vault and subscription state in which deletion is recoverable within retention interval (90 days), immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself  cannot be permanently canceled. System wil permanently delete it after 90 days, if not recovered */
  RecoverableProtectedSubscription = "Recoverable+ProtectedSubscription",
  /** Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90). This level guarantees the recoverability of the deleted entity during the retention interval, unless a Purge operation is requested, or the subscription is cancelled. */
  CustomizedRecoverablePurgeable = "CustomizedRecoverable+Purgeable",
  /** Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90).This level guarantees the recoverability of the deleted entity during the retention interval and while the subscription is still available. */
  CustomizedRecoverable = "CustomizedRecoverable",
  /** Denotes a vault and subscription state in which deletion is recoverable, immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself cannot be permanently canceled when 7 <= SoftDeleteRetentionInDays < 90. This level guarantees the recoverability of the deleted entity during the retention interval, and also reflects the fact that the subscription itself cannot be cancelled. */
  CustomizedRecoverableProtectedSubscription = "CustomizedRecoverable+ProtectedSubscription",
}

/**
 * Reflects the deletion recovery level currently in effect for certificates in the current vault. If it contains 'Purgeable', the certificate can be permanently deleted by a privileged user; otherwise, only the system can purge the certificate, at the end of the retention interval. \
 * {@link KnownDeletionRecoveryLevel} can be used interchangeably with DeletionRecoveryLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Purgeable**: Denotes a vault state in which deletion is an irreversible operation, without the possibility for recovery. This level corresponds to no protection being available against a Delete operation; the data is irretrievably lost upon accepting a Delete operation at the entity level or higher (vault, resource group, subscription etc.) \
 * **Recoverable+Purgeable**: Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval (90 days), unless a Purge operation is requested, or the subscription is cancelled. System wil permanently delete it after 90 days, if not recovered \
 * **Recoverable**: Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval(90 days) and while the subscription is still available. System wil permanently delete it after 90 days, if not recovered \
 * **Recoverable+ProtectedSubscription**: Denotes a vault and subscription state in which deletion is recoverable within retention interval (90 days), immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself  cannot be permanently canceled. System wil permanently delete it after 90 days, if not recovered \
 * **CustomizedRecoverable+Purgeable**: Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90). This level guarantees the recoverability of the deleted entity during the retention interval, unless a Purge operation is requested, or the subscription is cancelled. \
 * **CustomizedRecoverable**: Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90).This level guarantees the recoverability of the deleted entity during the retention interval and while the subscription is still available. \
 * **CustomizedRecoverable+ProtectedSubscription**: Denotes a vault and subscription state in which deletion is recoverable, immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself cannot be permanently canceled when 7 <= SoftDeleteRetentionInDays < 90. This level guarantees the recoverability of the deleted entity during the retention interval, and also reflects the fact that the subscription itself cannot be cancelled.
 */
export type DeletionRecoveryLevel = string;

/** Elliptic curve name. For valid values, see JsonWebKeyCurveName. */
export enum KnownJsonWebKeyCurveName {
  /** The NIST P-256 elliptic curve, AKA SECG curve SECP256R1. */
  P256 = "P-256",
  /** The NIST P-384 elliptic curve, AKA SECG curve SECP384R1. */
  P384 = "P-384",
  /** The NIST P-521 elliptic curve, AKA SECG curve SECP521R1. */
  P521 = "P-521",
  /** The SECG SECP256K1 elliptic curve. */
  P256_K = "P-256K",
}

/**
 * Elliptic curve name. For valid values, see JsonWebKeyCurveName. \
 * {@link KnownJsonWebKeyCurveName} can be used interchangeably with JsonWebKeyCurveName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P-256**: The NIST P-256 elliptic curve, AKA SECG curve SECP256R1. \
 * **P-384**: The NIST P-384 elliptic curve, AKA SECG curve SECP384R1. \
 * **P-521**: The NIST P-521 elliptic curve, AKA SECG curve SECP521R1. \
 * **P-256K**: The SECG SECP256K1 elliptic curve.
 */
export type JsonWebKeyCurveName = string;

/** The policy rules under which the key can be exported. */
export interface KeyReleasePolicy {
  /** Content type and version of key release policy */
  contentType?: string;
  /** Defines the mutability state of the policy. Once marked immutable, this flag cannot be reset and the policy cannot be changed under any circumstances. */
  immutable?: boolean;
  /** Blob encoding the policy rules under which the key can be released. Blob must be base64 URL encoded. */
  encodedPolicy?: Uint8Array;
}

export function keyReleasePolicySerializer(item: KeyReleasePolicy): any {
  return {
    contentType: item["contentType"],
    immutable: item["immutable"],
    data: !item["encodedPolicy"]
      ? item["encodedPolicy"]
      : uint8ArrayToString(item["encodedPolicy"], "base64url"),
  };
}

export function keyReleasePolicyDeserializer(item: any): KeyReleasePolicy {
  return {
    contentType: item["contentType"],
    immutable: item["immutable"],
    encodedPolicy: !item["data"]
      ? item["data"]
      : typeof item["data"] === "string"
        ? stringToUint8Array(item["data"], "base64url")
        : item["data"],
  };
}

/** A KeyBundle consisting of a WebKey plus its attributes. */
export interface KeyBundle {
  /** The Json web key. */
  key?: JsonWebKey;
  /** The key management attributes. */
  attributes?: KeyAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** True if the key's lifetime is managed by key vault. If this is a key backing a certificate, then managed will be true. */
  readonly managed?: boolean;
  /** The policy rules under which the key can be exported. */
  releasePolicy?: KeyReleasePolicy;
}

export function keyBundleDeserializer(item: any): KeyBundle {
  return {
    key: !item["key"] ? item["key"] : jsonWebKeyDeserializer(item["key"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    managed: item["managed"],
    releasePolicy: !item["release_policy"]
      ? item["release_policy"]
      : keyReleasePolicyDeserializer(item["release_policy"]),
  };
}

/** As of http://tools.ietf.org/html/draft-ietf-jose-json-web-key-18 */
export interface JsonWebKey {
  /** Key identifier. */
  kid?: string;
  /** JsonWebKey Key Type (kty), as defined in https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40. */
  kty?: JsonWebKeyType;
  /** Json web key operations. For more information on possible key operations, see JsonWebKeyOperation. */
  keyOps?: string[];
  /** RSA modulus. */
  n?: Uint8Array;
  /** RSA public exponent. */
  e?: Uint8Array;
  /** RSA private exponent, or the D component of an EC private key. */
  d?: Uint8Array;
  /** RSA private key parameter. */
  dp?: Uint8Array;
  /** RSA private key parameter. */
  dq?: Uint8Array;
  /** RSA private key parameter. */
  qi?: Uint8Array;
  /** RSA secret prime. */
  p?: Uint8Array;
  /** RSA secret prime, with p < q. */
  q?: Uint8Array;
  /** Symmetric key. */
  k?: Uint8Array;
  /** Protected Key, used with 'Bring Your Own Key'. */
  t?: Uint8Array;
  /** Elliptic curve name. For valid values, see JsonWebKeyCurveName. */
  crv?: JsonWebKeyCurveName;
  /** X component of an EC public key. */
  x?: Uint8Array;
  /** Y component of an EC public key. */
  y?: Uint8Array;
}

export function jsonWebKeySerializer(item: JsonWebKey): any {
  return {
    kid: item["kid"],
    kty: item["kty"],
    key_ops: !item["keyOps"]
      ? item["keyOps"]
      : item["keyOps"].map((p: any) => {
          return p;
        }),
    n: !item["n"] ? item["n"] : uint8ArrayToString(item["n"], "base64url"),
    e: !item["e"] ? item["e"] : uint8ArrayToString(item["e"], "base64url"),
    d: !item["d"] ? item["d"] : uint8ArrayToString(item["d"], "base64url"),
    dp: !item["dp"] ? item["dp"] : uint8ArrayToString(item["dp"], "base64url"),
    dq: !item["dq"] ? item["dq"] : uint8ArrayToString(item["dq"], "base64url"),
    qi: !item["qi"] ? item["qi"] : uint8ArrayToString(item["qi"], "base64url"),
    p: !item["p"] ? item["p"] : uint8ArrayToString(item["p"], "base64url"),
    q: !item["q"] ? item["q"] : uint8ArrayToString(item["q"], "base64url"),
    k: !item["k"] ? item["k"] : uint8ArrayToString(item["k"], "base64url"),
    key_hsm: !item["t"]
      ? item["t"]
      : uint8ArrayToString(item["t"], "base64url"),
    crv: item["crv"],
    x: !item["x"] ? item["x"] : uint8ArrayToString(item["x"], "base64url"),
    y: !item["y"] ? item["y"] : uint8ArrayToString(item["y"], "base64url"),
  };
}

export function jsonWebKeyDeserializer(item: any): JsonWebKey {
  return {
    kid: item["kid"],
    kty: item["kty"],
    keyOps: !item["key_ops"]
      ? item["key_ops"]
      : item["key_ops"].map((p: any) => {
          return p;
        }),
    n: !item["n"]
      ? item["n"]
      : typeof item["n"] === "string"
        ? stringToUint8Array(item["n"], "base64url")
        : item["n"],
    e: !item["e"]
      ? item["e"]
      : typeof item["e"] === "string"
        ? stringToUint8Array(item["e"], "base64url")
        : item["e"],
    d: !item["d"]
      ? item["d"]
      : typeof item["d"] === "string"
        ? stringToUint8Array(item["d"], "base64url")
        : item["d"],
    dp: !item["dp"]
      ? item["dp"]
      : typeof item["dp"] === "string"
        ? stringToUint8Array(item["dp"], "base64url")
        : item["dp"],
    dq: !item["dq"]
      ? item["dq"]
      : typeof item["dq"] === "string"
        ? stringToUint8Array(item["dq"], "base64url")
        : item["dq"],
    qi: !item["qi"]
      ? item["qi"]
      : typeof item["qi"] === "string"
        ? stringToUint8Array(item["qi"], "base64url")
        : item["qi"],
    p: !item["p"]
      ? item["p"]
      : typeof item["p"] === "string"
        ? stringToUint8Array(item["p"], "base64url")
        : item["p"],
    q: !item["q"]
      ? item["q"]
      : typeof item["q"] === "string"
        ? stringToUint8Array(item["q"], "base64url")
        : item["q"],
    k: !item["k"]
      ? item["k"]
      : typeof item["k"] === "string"
        ? stringToUint8Array(item["k"], "base64url")
        : item["k"],
    t: !item["key_hsm"]
      ? item["key_hsm"]
      : typeof item["key_hsm"] === "string"
        ? stringToUint8Array(item["key_hsm"], "base64url")
        : item["key_hsm"],
    crv: item["crv"],
    x: !item["x"]
      ? item["x"]
      : typeof item["x"] === "string"
        ? stringToUint8Array(item["x"], "base64url")
        : item["x"],
    y: !item["y"]
      ? item["y"]
      : typeof item["y"] === "string"
        ? stringToUint8Array(item["y"], "base64url")
        : item["y"],
  };
}

/** The key import parameters. */
export interface KeyImportParameters {
  /** Whether to import as a hardware key (HSM) or software key. */
  hsm?: boolean;
  /** The Json web key */
  key: JsonWebKey;
  /** The key management attributes. */
  keyAttributes?: KeyAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** The policy rules under which the key can be exported. */
  releasePolicy?: KeyReleasePolicy;
}

export function keyImportParametersSerializer(item: KeyImportParameters): any {
  return {
    Hsm: item["hsm"],
    key: jsonWebKeySerializer(item["key"]),
    attributes: !item["keyAttributes"]
      ? item["keyAttributes"]
      : keyAttributesSerializer(item["keyAttributes"]),
    tags: item["tags"],
    release_policy: !item["releasePolicy"]
      ? item["releasePolicy"]
      : keyReleasePolicySerializer(item["releasePolicy"]),
  };
}

/** A DeletedKeyBundle consisting of a WebKey plus its Attributes and deletion info */
export interface DeletedKeyBundle {
  /** The Json web key. */
  key?: JsonWebKey;
  /** The key management attributes. */
  attributes?: KeyAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** True if the key's lifetime is managed by key vault. If this is a key backing a certificate, then managed will be true. */
  readonly managed?: boolean;
  /** The policy rules under which the key can be exported. */
  releasePolicy?: KeyReleasePolicy;
  /** The url of the recovery object, used to identify and recover the deleted key. */
  recoveryId?: string;
  /** The time when the key is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: Date;
  /** The time when the key was deleted, in UTC */
  readonly deletedDate?: Date;
}

export function deletedKeyBundleDeserializer(item: any): DeletedKeyBundle {
  return {
    key: !item["key"] ? item["key"] : jsonWebKeyDeserializer(item["key"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    managed: item["managed"],
    releasePolicy: !item["release_policy"]
      ? item["release_policy"]
      : keyReleasePolicyDeserializer(item["release_policy"]),
    recoveryId: item["recoveryId"],
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"] * 1000),
    deletedDate: !item["deletedDate"]
      ? item["deletedDate"]
      : new Date(item["deletedDate"] * 1000),
  };
}

/** The key update parameters. */
export interface KeyUpdateParameters {
  /** Json web key operations. For more information on possible key operations, see JsonWebKeyOperation. */
  keyOps?: JsonWebKeyOperation[];
  /** The attributes of a key managed by the key vault service. */
  keyAttributes?: KeyAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** The policy rules under which the key can be exported. */
  releasePolicy?: KeyReleasePolicy;
}

export function keyUpdateParametersSerializer(item: KeyUpdateParameters): any {
  return {
    key_ops: !item["keyOps"]
      ? item["keyOps"]
      : item["keyOps"].map((p: any) => {
          return p;
        }),
    attributes: !item["keyAttributes"]
      ? item["keyAttributes"]
      : keyAttributesSerializer(item["keyAttributes"]),
    tags: item["tags"],
    release_policy: !item["releasePolicy"]
      ? item["releasePolicy"]
      : keyReleasePolicySerializer(item["releasePolicy"]),
  };
}

/** The key list result. */
export interface _KeyListResult {
  /** A response message containing a list of keys in the key vault along with a link to the next page of keys. */
  readonly value?: KeyItem[];
  /** The URL to get the next set of keys. */
  readonly nextLink?: string;
}

export function _keyListResultDeserializer(item: any): _KeyListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : keyItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function keyItemArrayDeserializer(result: Array<KeyItem>): any[] {
  return result.map((item) => {
    return keyItemDeserializer(item);
  });
}

/** The key item containing key metadata. */
export interface KeyItem {
  /** Key identifier. */
  kid?: string;
  /** The key management attributes. */
  attributes?: KeyAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** True if the key's lifetime is managed by key vault. If this is a key backing a certificate, then managed will be true. */
  readonly managed?: boolean;
}

export function keyItemDeserializer(item: any): KeyItem {
  return {
    kid: item["kid"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    managed: item["managed"],
  };
}

/** The backup key result, containing the backup blob. */
export interface BackupKeyResult {
  /** The backup blob containing the backed up key. */
  readonly value?: Uint8Array;
}

export function backupKeyResultDeserializer(item: any): BackupKeyResult {
  return {
    value: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64url")
        : item["value"],
  };
}

/** The key restore parameters. */
export interface KeyRestoreParameters {
  /** The backup blob associated with a key bundle. */
  keyBundleBackup: Uint8Array;
}

export function keyRestoreParametersSerializer(
  item: KeyRestoreParameters,
): any {
  return { value: uint8ArrayToString(item["keyBundleBackup"], "base64url") };
}

/** The key operations parameters. */
export interface KeyOperationsParameters {
  /** algorithm identifier */
  algorithm: JsonWebKeyEncryptionAlgorithm;
  /** The value to operate on. */
  value: Uint8Array;
  /** Cryptographically random, non-repeating initialization vector for symmetric algorithms. */
  iv?: Uint8Array;
  /** Additional data to authenticate but not encrypt/decrypt when using authenticated crypto algorithms. */
  aad?: Uint8Array;
  /** The tag to authenticate when performing decryption with an authenticated algorithm. */
  tag?: Uint8Array;
}

export function keyOperationsParametersSerializer(
  item: KeyOperationsParameters,
): any {
  return {
    alg: item["algorithm"],
    value: uint8ArrayToString(item["value"], "base64url"),
    iv: !item["iv"] ? item["iv"] : uint8ArrayToString(item["iv"], "base64url"),
    aad: !item["aad"]
      ? item["aad"]
      : uint8ArrayToString(item["aad"], "base64url"),
    tag: !item["tag"]
      ? item["tag"]
      : uint8ArrayToString(item["tag"], "base64url"),
  };
}

/** An algorithm used for encryption and decryption. */
export enum KnownJsonWebKeyEncryptionAlgorithm {
  /** RSAES using Optimal Asymmetric Encryption Padding (OAEP), as described in https://tools.ietf.org/html/rfc3447, with the default parameters specified by RFC 3447 in Section A.2.1. Those default parameters are using a hash function of SHA-1 and a mask generation function of MGF1 with SHA-1. */
  RSA_OAEP = "RSA-OAEP",
  /** RSAES using Optimal Asymmetric Encryption Padding with a hash function of SHA-256 and a mask generation function of MGF1 with SHA-256. */
  RSA_OAEP256 = "RSA-OAEP-256",
  /** RSAES-PKCS1-V1_5 key encryption, as described in https://tools.ietf.org/html/rfc3447. */
  RSA1_5 = "RSA1_5",
  /** 128-bit AES-GCM. */
  A128_GCM = "A128GCM",
  /** 192-bit AES-GCM. */
  A192_GCM = "A192GCM",
  /** 256-bit AES-GCM. */
  A256_GCM = "A256GCM",
  /** 128-bit AES key wrap. */
  A128_KW = "A128KW",
  /** 192-bit AES key wrap. */
  A192_KW = "A192KW",
  /** 256-bit AES key wrap. */
  A256_KW = "A256KW",
  /** 128-bit AES-CBC. */
  A128_CBC = "A128CBC",
  /** 192-bit AES-CBC. */
  A192_CBC = "A192CBC",
  /** 256-bit AES-CBC. */
  A256_CBC = "A256CBC",
  /** 128-bit AES-CBC with PKCS padding. */
  A128_CBCPAD = "A128CBCPAD",
  /** 192-bit AES-CBC with PKCS padding. */
  A192_CBCPAD = "A192CBCPAD",
  /** 256-bit AES-CBC with PKCS padding. */
  A256_CBCPAD = "A256CBCPAD",
  /** CKM AES key wrap. */
  CKM_AES_KEY_WRAP = "CKM_AES_KEY_WRAP",
  /** CKM AES key wrap with padding. */
  CKM_AES_KEY_WRAP_PAD = "CKM_AES_KEY_WRAP_PAD",
}

/**
 * An algorithm used for encryption and decryption. \
 * {@link KnownJsonWebKeyEncryptionAlgorithm} can be used interchangeably with JsonWebKeyEncryptionAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RSA-OAEP**: RSAES using Optimal Asymmetric Encryption Padding (OAEP), as described in https:\//tools.ietf.org\/html\/rfc3447, with the default parameters specified by RFC 3447 in Section A.2.1. Those default parameters are using a hash function of SHA-1 and a mask generation function of MGF1 with SHA-1. \
 * **RSA-OAEP-256**: RSAES using Optimal Asymmetric Encryption Padding with a hash function of SHA-256 and a mask generation function of MGF1 with SHA-256. \
 * **RSA1_5**: RSAES-PKCS1-V1_5 key encryption, as described in https:\//tools.ietf.org\/html\/rfc3447. \
 * **A128GCM**: 128-bit AES-GCM. \
 * **A192GCM**: 192-bit AES-GCM. \
 * **A256GCM**: 256-bit AES-GCM. \
 * **A128KW**: 128-bit AES key wrap. \
 * **A192KW**: 192-bit AES key wrap. \
 * **A256KW**: 256-bit AES key wrap. \
 * **A128CBC**: 128-bit AES-CBC. \
 * **A192CBC**: 192-bit AES-CBC. \
 * **A256CBC**: 256-bit AES-CBC. \
 * **A128CBCPAD**: 128-bit AES-CBC with PKCS padding. \
 * **A192CBCPAD**: 192-bit AES-CBC with PKCS padding. \
 * **A256CBCPAD**: 256-bit AES-CBC with PKCS padding. \
 * **CKM_AES_KEY_WRAP**: CKM AES key wrap. \
 * **CKM_AES_KEY_WRAP_PAD**: CKM AES key wrap with padding.
 */
export type JsonWebKeyEncryptionAlgorithm = string;

/** The key operation result. */
export interface KeyOperationResult {
  /** Key identifier */
  readonly kid?: string;
  /** The result of the operation. */
  readonly result?: Uint8Array;
  /** Cryptographically random, non-repeating initialization vector for symmetric algorithms. */
  readonly iv?: Uint8Array;
  /** The tag to authenticate when performing decryption with an authenticated algorithm. */
  readonly authenticationTag?: Uint8Array;
  /** Additional data to authenticate but not encrypt/decrypt when using authenticated crypto algorithms. */
  readonly additionalAuthenticatedData?: Uint8Array;
}

export function keyOperationResultDeserializer(item: any): KeyOperationResult {
  return {
    kid: item["kid"],
    result: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64url")
        : item["value"],
    iv: !item["iv"]
      ? item["iv"]
      : typeof item["iv"] === "string"
        ? stringToUint8Array(item["iv"], "base64url")
        : item["iv"],
    authenticationTag: !item["tag"]
      ? item["tag"]
      : typeof item["tag"] === "string"
        ? stringToUint8Array(item["tag"], "base64url")
        : item["tag"],
    additionalAuthenticatedData: !item["aad"]
      ? item["aad"]
      : typeof item["aad"] === "string"
        ? stringToUint8Array(item["aad"], "base64url")
        : item["aad"],
  };
}

/** The key operations parameters. */
export interface KeySignParameters {
  /** The signing/verification algorithm identifier. For more information on possible algorithm types, see JsonWebKeySignatureAlgorithm. */
  algorithm: JsonWebKeySignatureAlgorithm;
  /** The value to operate on. */
  value: Uint8Array;
}

export function keySignParametersSerializer(item: KeySignParameters): any {
  return {
    alg: item["algorithm"],
    value: uint8ArrayToString(item["value"], "base64url"),
  };
}

/** The signing/verification algorithm identifier. For more information on possible algorithm types, see JsonWebKeySignatureAlgorithm. */
export enum KnownJsonWebKeySignatureAlgorithm {
  /** RSASSA-PSS using SHA-256 and MGF1 with SHA-256, as described in https://tools.ietf.org/html/rfc7518 */
  PS256 = "PS256",
  /** RSASSA-PSS using SHA-384 and MGF1 with SHA-384, as described in https://tools.ietf.org/html/rfc7518 */
  PS384 = "PS384",
  /** RSASSA-PSS using SHA-512 and MGF1 with SHA-512, as described in https://tools.ietf.org/html/rfc7518 */
  PS512 = "PS512",
  /** RSASSA-PKCS1-v1_5 using SHA-256, as described in https://tools.ietf.org/html/rfc7518 */
  RS256 = "RS256",
  /** RSASSA-PKCS1-v1_5 using SHA-384, as described in https://tools.ietf.org/html/rfc7518 */
  RS384 = "RS384",
  /** RSASSA-PKCS1-v1_5 using SHA-512, as described in https://tools.ietf.org/html/rfc7518 */
  RS512 = "RS512",
  /** Reserved */
  RSNULL = "RSNULL",
  /** ECDSA using P-256 and SHA-256, as described in https://tools.ietf.org/html/rfc7518. */
  ES256 = "ES256",
  /** ECDSA using P-384 and SHA-384, as described in https://tools.ietf.org/html/rfc7518 */
  ES384 = "ES384",
  /** ECDSA using P-521 and SHA-512, as described in https://tools.ietf.org/html/rfc7518 */
  ES512 = "ES512",
  /** ECDSA using P-256K and SHA-256, as described in https://tools.ietf.org/html/rfc7518 */
  ES256_K = "ES256K",
}

/**
 * The signing/verification algorithm identifier. For more information on possible algorithm types, see JsonWebKeySignatureAlgorithm. \
 * {@link KnownJsonWebKeySignatureAlgorithm} can be used interchangeably with JsonWebKeySignatureAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PS256**: RSASSA-PSS using SHA-256 and MGF1 with SHA-256, as described in https:\//tools.ietf.org\/html\/rfc7518 \
 * **PS384**: RSASSA-PSS using SHA-384 and MGF1 with SHA-384, as described in https:\//tools.ietf.org\/html\/rfc7518 \
 * **PS512**: RSASSA-PSS using SHA-512 and MGF1 with SHA-512, as described in https:\//tools.ietf.org\/html\/rfc7518 \
 * **RS256**: RSASSA-PKCS1-v1_5 using SHA-256, as described in https:\//tools.ietf.org\/html\/rfc7518 \
 * **RS384**: RSASSA-PKCS1-v1_5 using SHA-384, as described in https:\//tools.ietf.org\/html\/rfc7518 \
 * **RS512**: RSASSA-PKCS1-v1_5 using SHA-512, as described in https:\//tools.ietf.org\/html\/rfc7518 \
 * **RSNULL**: Reserved \
 * **ES256**: ECDSA using P-256 and SHA-256, as described in https:\//tools.ietf.org\/html\/rfc7518. \
 * **ES384**: ECDSA using P-384 and SHA-384, as described in https:\//tools.ietf.org\/html\/rfc7518 \
 * **ES512**: ECDSA using P-521 and SHA-512, as described in https:\//tools.ietf.org\/html\/rfc7518 \
 * **ES256K**: ECDSA using P-256K and SHA-256, as described in https:\//tools.ietf.org\/html\/rfc7518
 */
export type JsonWebKeySignatureAlgorithm = string;

/** The key verify parameters. */
export interface KeyVerifyParameters {
  /** The signing/verification algorithm. For more information on possible algorithm types, see JsonWebKeySignatureAlgorithm. */
  algorithm: JsonWebKeySignatureAlgorithm;
  /** The digest used for signing. */
  digest: Uint8Array;
  /** The signature to be verified. */
  signature: Uint8Array;
}

export function keyVerifyParametersSerializer(item: KeyVerifyParameters): any {
  return {
    alg: item["algorithm"],
    digest: uint8ArrayToString(item["digest"], "base64url"),
    value: uint8ArrayToString(item["signature"], "base64url"),
  };
}

/** The key verify result. */
export interface KeyVerifyResult {
  /** True if the signature is verified, otherwise false. */
  readonly value?: boolean;
}

export function keyVerifyResultDeserializer(item: any): KeyVerifyResult {
  return {
    value: item["value"],
  };
}

/** The release key parameters. */
export interface KeyReleaseParameters {
  /** The attestation assertion for the target of the key release. */
  targetAttestationToken: string;
  /** A client provided nonce for freshness. */
  nonce?: string;
  /** The encryption algorithm to use to protected the exported key material */
  enc?: KeyEncryptionAlgorithm;
}

export function keyReleaseParametersSerializer(
  item: KeyReleaseParameters,
): any {
  return {
    target: item["targetAttestationToken"],
    nonce: item["nonce"],
    enc: item["enc"],
  };
}

/** The encryption algorithm to use to protected the exported key material */
export enum KnownKeyEncryptionAlgorithm {
  /** The CKM_RSA_AES_KEY_WRAP key wrap mechanism. */
  CKM_RSA_AES_KEY_WRAP = "CKM_RSA_AES_KEY_WRAP",
  /** The RSA_AES_KEY_WRAP_256 key wrap mechanism. */
  RSA_AES_KEY_WRAP_256 = "RSA_AES_KEY_WRAP_256",
  /** The RSA_AES_KEY_WRAP_384 key wrap mechanism. */
  RSA_AES_KEY_WRAP_384 = "RSA_AES_KEY_WRAP_384",
}

/**
 * The encryption algorithm to use to protected the exported key material \
 * {@link KnownKeyEncryptionAlgorithm} can be used interchangeably with KeyEncryptionAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CKM_RSA_AES_KEY_WRAP**: The CKM_RSA_AES_KEY_WRAP key wrap mechanism. \
 * **RSA_AES_KEY_WRAP_256**: The RSA_AES_KEY_WRAP_256 key wrap mechanism. \
 * **RSA_AES_KEY_WRAP_384**: The RSA_AES_KEY_WRAP_384 key wrap mechanism.
 */
export type KeyEncryptionAlgorithm = string;

/** The release result, containing the released key. */
export interface KeyReleaseResult {
  /** A signed object containing the released key. */
  readonly value?: string;
}

export function keyReleaseResultDeserializer(item: any): KeyReleaseResult {
  return {
    value: item["value"],
  };
}

/** A list of keys that have been deleted in this vault. */
export interface _DeletedKeyListResult {
  /** A response message containing a list of deleted keys in the key vault along with a link to the next page of deleted keys. */
  readonly value?: DeletedKeyItem[];
  /** The URL to get the next set of deleted keys. */
  readonly nextLink?: string;
}

export function _deletedKeyListResultDeserializer(
  item: any,
): _DeletedKeyListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : deletedKeyItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedKeyItemArrayDeserializer(
  result: Array<DeletedKeyItem>,
): any[] {
  return result.map((item) => {
    return deletedKeyItemDeserializer(item);
  });
}

/** The deleted key item containing the deleted key metadata and information about deletion. */
export interface DeletedKeyItem {
  /** Key identifier. */
  kid?: string;
  /** The key management attributes. */
  attributes?: KeyAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** True if the key's lifetime is managed by key vault. If this is a key backing a certificate, then managed will be true. */
  readonly managed?: boolean;
  /** The url of the recovery object, used to identify and recover the deleted key. */
  recoveryId?: string;
  /** The time when the key is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: Date;
  /** The time when the key was deleted, in UTC */
  readonly deletedDate?: Date;
}

export function deletedKeyItemDeserializer(item: any): DeletedKeyItem {
  return {
    kid: item["kid"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    managed: item["managed"],
    recoveryId: item["recoveryId"],
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"] * 1000),
    deletedDate: !item["deletedDate"]
      ? item["deletedDate"]
      : new Date(item["deletedDate"] * 1000),
  };
}

/** Management policy for a key. */
export interface KeyRotationPolicy {
  /** The key policy id. */
  readonly id?: string;
  /** Actions that will be performed by Key Vault over the lifetime of a key. For preview, lifetimeActions can only have two items at maximum: one for rotate, one for notify. Notification time would be default to 30 days before expiry and it is not configurable. */
  lifetimeActions?: LifetimeActions[];
  /** The key rotation policy attributes. */
  attributes?: KeyRotationPolicyAttributes;
}

export function keyRotationPolicySerializer(item: KeyRotationPolicy): any {
  return {
    lifetimeActions: !item["lifetimeActions"]
      ? item["lifetimeActions"]
      : lifetimeActionsArraySerializer(item["lifetimeActions"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyRotationPolicyAttributesSerializer(item["attributes"]),
  };
}

export function keyRotationPolicyDeserializer(item: any): KeyRotationPolicy {
  return {
    id: item["id"],
    lifetimeActions: !item["lifetimeActions"]
      ? item["lifetimeActions"]
      : lifetimeActionsArrayDeserializer(item["lifetimeActions"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyRotationPolicyAttributesDeserializer(item["attributes"]),
  };
}

export function lifetimeActionsArraySerializer(
  result: Array<LifetimeActions>,
): any[] {
  return result.map((item) => {
    return lifetimeActionsSerializer(item);
  });
}

export function lifetimeActionsArrayDeserializer(
  result: Array<LifetimeActions>,
): any[] {
  return result.map((item) => {
    return lifetimeActionsDeserializer(item);
  });
}

/** Action and its trigger that will be performed by Key Vault over the lifetime of a key. */
export interface LifetimeActions {
  /** The condition that will execute the action. */
  trigger?: LifetimeActionsTrigger;
  /** The action that will be executed. */
  action?: LifetimeActionsType;
}

export function lifetimeActionsSerializer(item: LifetimeActions): any {
  return {
    trigger: !item["trigger"]
      ? item["trigger"]
      : lifetimeActionsTriggerSerializer(item["trigger"]),
    action: !item["action"]
      ? item["action"]
      : lifetimeActionsTypeSerializer(item["action"]),
  };
}

export function lifetimeActionsDeserializer(item: any): LifetimeActions {
  return {
    trigger: !item["trigger"]
      ? item["trigger"]
      : lifetimeActionsTriggerDeserializer(item["trigger"]),
    action: !item["action"]
      ? item["action"]
      : lifetimeActionsTypeDeserializer(item["action"]),
  };
}

/** A condition to be satisfied for an action to be executed. */
export interface LifetimeActionsTrigger {
  /** Time after creation to attempt to rotate. It only applies to rotate. It will be in ISO 8601 duration format. Example: 90 days : "P90D" */
  timeAfterCreate?: string;
  /** Time before expiry to attempt to rotate or notify. It will be in ISO 8601 duration format. Example: 90 days : "P90D" */
  timeBeforeExpiry?: string;
}

export function lifetimeActionsTriggerSerializer(
  item: LifetimeActionsTrigger,
): any {
  return {
    timeAfterCreate: item["timeAfterCreate"],
    timeBeforeExpiry: item["timeBeforeExpiry"],
  };
}

export function lifetimeActionsTriggerDeserializer(
  item: any,
): LifetimeActionsTrigger {
  return {
    timeAfterCreate: item["timeAfterCreate"],
    timeBeforeExpiry: item["timeBeforeExpiry"],
  };
}

/** The action that will be executed. */
export interface LifetimeActionsType {
  /** The type of the action. The value should be compared case-insensitively. */
  type?: KeyRotationPolicyAction;
}

export function lifetimeActionsTypeSerializer(item: LifetimeActionsType): any {
  return { type: item["type"] };
}

export function lifetimeActionsTypeDeserializer(
  item: any,
): LifetimeActionsType {
  return {
    type: item["type"],
  };
}

/** The type of the action. The value should be compared case-insensitively. */
export type KeyRotationPolicyAction = "Rotate" | "Notify";

/** The key rotation policy attributes. */
export interface KeyRotationPolicyAttributes {
  /** The expiryTime will be applied on the new key version. It should be at least 28 days. It will be in ISO 8601 Format. Examples: 90 days: P90D, 3 months: P3M, 48 hours: PT48H, 1 year and 10 days: P1Y10D */
  expiryTime?: string;
  /** The key rotation policy created time in UTC. */
  readonly created?: Date;
  /** The key rotation policy's last updated time in UTC. */
  readonly updated?: Date;
}

export function keyRotationPolicyAttributesSerializer(
  item: KeyRotationPolicyAttributes,
): any {
  return { expiryTime: item["expiryTime"] };
}

export function keyRotationPolicyAttributesDeserializer(
  item: any,
): KeyRotationPolicyAttributes {
  return {
    expiryTime: item["expiryTime"],
    created: !item["created"]
      ? item["created"]
      : new Date(item["created"] * 1000),
    updated: !item["updated"]
      ? item["updated"]
      : new Date(item["updated"] * 1000),
  };
}

/** The get random bytes request object. */
export interface GetRandomBytesRequest {
  /** The requested number of random bytes. */
  count: number;
}

export function getRandomBytesRequestSerializer(
  item: GetRandomBytesRequest,
): any {
  return { count: item["count"] };
}

/** The get random bytes response object containing the bytes. */
export interface RandomBytes {
  /** The bytes encoded as a base64url string. */
  value: Uint8Array;
}

export function randomBytesDeserializer(item: any): RandomBytes {
  return {
    value:
      typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64url")
        : item["value"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 7.5 API version. */
  "v7.5" = "7.5",
  /** The 7.6-preview.1 API version. */
  "v7.6_preview.1" = "7.6-preview.1",
}
