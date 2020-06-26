// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

/**
 * The key create parameters.
 */
export interface KeyCreateParameters {
  /**
   * The type of key to create. For valid values, see JsonWebKeyType.
   */
  kty: JsonWebKeyType;
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA.
   */
  keySize?: number;
  /**
   * The public exponent for a RSA key.
   */
  publicExponent?: number;
  keyOps?: JsonWebKeyOperation[];
  /**
   * The attributes of a key managed by the key vault service.
   */
  keyAttributes?: KeyAttributes;
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * Elliptic curve name. For valid values, see JsonWebKeyCurveName.
   */
  curve?: JsonWebKeyCurveName;
  /**
   * The policy rules under which the key can be exported.
   */
  releasePolicy?: KeyReleasePolicy;
}

/**
 * The object attributes managed by the KeyVault service.
 */
export interface Attributes {
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * Expiry date in UTC.
   */
  expires?: Date;
  /**
   * Creation time in UTC.
   */
  readonly created?: Date;
  /**
   * Last updated time in UTC.
   */
  readonly updated?: Date;
}

/**
 * The attributes of a key managed by the key vault service.
 */
export type KeyAttributes = Attributes & {
  /**
   * softDelete data retention days. Value should be >=7 and <=90 when softDelete enabled, otherwise 0.
   */
  readonly recoverableDays?: number;
  /**
   * Reflects the deletion recovery level currently in effect for keys in the current vault. If it contains 'Purgeable' the key can be permanently deleted by a privileged user; otherwise, only the system can purge the key, at the end of the retention interval.
   */
  readonly recoveryLevel?: DeletionRecoveryLevel;
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: boolean;
};

export interface KeyReleasePolicy {
  /**
   * key release policy version
   */
  version?: "0.2";
  anyOf?: KeyReleaseAuthority[];
}

export interface KeyReleaseAuthority {
  /**
   * Base URL of the attestation service.
   */
  authorityURL?: string;
  allOf?: KeyReleaseCondition[];
}

export interface KeyReleaseCondition {
  /**
   * claim type name
   */
  claimType?: string;
  /**
   * condition to test
   */
  claimCondition?: "equals";
  value?: string;
}

/**
 * A KeyBundle consisting of a WebKey plus its attributes.
 */
export interface KeyBundle {
  /**
   * The Json web key.
   */
  key?: JsonWebKey;
  /**
   * The key management attributes.
   */
  attributes?: KeyAttributes;
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * True if the key's lifetime is managed by key vault. If this is a key backing a certificate, then managed will be true.
   */
  readonly managed?: boolean;
  /**
   * The policy rules under which the key can be exported.
   */
  releasePolicy?: KeyReleasePolicy;
}

/**
 * As of http://tools.ietf.org/html/draft-ietf-jose-json-web-key-18
 */
export interface JsonWebKey {
  /**
   * Key identifier.
   */
  kid?: string;
  /**
   * JsonWebKey Key Type (kty), as defined in https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40.
   */
  kty?: JsonWebKeyType;
  keyOps?: string[];
  /**
   * RSA modulus.
   */
  n?: Uint8Array;
  /**
   * RSA public exponent.
   */
  e?: Uint8Array;
  /**
   * RSA private exponent, or the D component of an EC private key.
   */
  d?: Uint8Array;
  /**
   * RSA private key parameter.
   */
  dp?: Uint8Array;
  /**
   * RSA private key parameter.
   */
  dq?: Uint8Array;
  /**
   * RSA private key parameter.
   */
  qi?: Uint8Array;
  /**
   * RSA secret prime.
   */
  p?: Uint8Array;
  /**
   * RSA secret prime, with p < q.
   */
  q?: Uint8Array;
  /**
   * Symmetric key.
   */
  k?: Uint8Array;
  /**
   * Protected Key, used with 'Bring Your Own Key'.
   */
  t?: Uint8Array;
  /**
   * Elliptic curve name. For valid values, see JsonWebKeyCurveName.
   */
  crv?: JsonWebKeyCurveName;
  /**
   * X component of an EC public key.
   */
  x?: Uint8Array;
  /**
   * Y component of an EC public key.
   */
  y?: Uint8Array;
}

/**
 * The key vault error exception.
 */
export interface KeyVaultError {
  /**
   * The key vault server error.
   */
  readonly error?: ErrorModel;
}

/**
 * The key vault server error.
 */
export interface ErrorModel {
  /**
   * The error code.
   */
  readonly code?: string;
  /**
   * The error message.
   */
  readonly message?: string;
  /**
   * The key vault server error.
   */
  readonly innerError?: ErrorModel;
}

/**
 * The key import parameters.
 */
export interface KeyImportParameters {
  /**
   * Whether to import as a hardware key (HSM) or software key.
   */
  hsm?: boolean;
  /**
   * The Json web key
   */
  key: JsonWebKey;
  /**
   * The key management attributes.
   */
  keyAttributes?: KeyAttributes;
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * The policy rules under which the key can be exported.
   */
  releasePolicy?: KeyReleasePolicy;
}

/**
 * A DeletedKeyBundle consisting of a WebKey plus its Attributes and deletion info
 */
export type DeletedKeyBundle = KeyBundle & {
  /**
   * The url of the recovery object, used to identify and recover the deleted key.
   */
  recoveryId?: string;
  /**
   * The time when the key is scheduled to be purged, in UTC
   */
  readonly scheduledPurgeDate?: Date;
  /**
   * The time when the key was deleted, in UTC
   */
  readonly deletedDate?: Date;
};

/**
 * The key update parameters.
 */
export interface KeyUpdateParameters {
  /**
   * Json web key operations. For more information on possible key operations, see JsonWebKeyOperation.
   */
  keyOps?: JsonWebKeyOperation[];
  /**
   * The attributes of a key managed by the key vault service.
   */
  keyAttributes?: KeyAttributes;
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * The policy rules under which the key can be exported.
   */
  releasePolicy?: KeyReleasePolicy;
}

/**
 * The key list result.
 */
export interface KeyListResult {
  /**
   * A response message containing a list of keys in the key vault along with a link to the next page of keys.
   */
  readonly value?: KeyItem[];
  /**
   * The URL to get the next set of keys.
   */
  readonly nextLink?: string;
}

/**
 * The key item containing key metadata.
 */
export interface KeyItem {
  /**
   * Key identifier.
   */
  kid?: string;
  /**
   * The key management attributes.
   */
  attributes?: KeyAttributes;
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * True if the key's lifetime is managed by key vault. If this is a key backing a certificate, then managed will be true.
   */
  readonly managed?: boolean;
}

/**
 * The backup key result, containing the backup blob.
 */
export interface BackupKeyResult {
  /**
   * The backup blob containing the backed up key.
   */
  readonly value?: Uint8Array;
}

/**
 * The key restore parameters.
 */
export interface KeyRestoreParameters {
  /**
   * The backup blob associated with a key bundle.
   */
  keyBundleBackup: Uint8Array;
}

/**
 * The key operations parameters.
 */
export interface KeyOperationsParameters {
  /**
   * algorithm identifier
   */
  algorithm: JsonWebKeyEncryptionAlgorithm;
  value: Uint8Array;
  /**
   * Initialization vector for symmetric algorithms.
   */
  iv?: Uint8Array;
  /**
   * Additional data to authenticate but not encrypt/decrypt when using authenticated crypto algorithms.
   */
  aad?: Uint8Array;
  /**
   * The tag to authenticate when performing decryption with an authenticated algorithm.
   */
  tag?: Uint8Array;
}

/**
 * The key operation result.
 */
export interface KeyOperationResult {
  /**
   * Key identifier
   */
  readonly kid?: string;
  readonly result?: Uint8Array;
}

/**
 * The key operations parameters.
 */
export interface KeySignParameters {
  /**
   * The signing/verification algorithm identifier. For more information on possible algorithm types, see JsonWebKeySignatureAlgorithm.
   */
  algorithm: JsonWebKeySignatureAlgorithm;
  value: Uint8Array;
}

/**
 * The key verify parameters.
 */
export interface KeyVerifyParameters {
  /**
   * The signing/verification algorithm. For more information on possible algorithm types, see JsonWebKeySignatureAlgorithm.
   */
  algorithm: JsonWebKeySignatureAlgorithm;
  /**
   * The digest used for signing.
   */
  digest: Uint8Array;
  /**
   * The signature to be verified.
   */
  signature: Uint8Array;
}

/**
 * The key verify result.
 */
export interface KeyVerifyResult {
  /**
   * True if the signature is verified, otherwise false.
   */
  readonly value?: boolean;
}

/**
 * The export key parameters.
 */
export interface KeyExportParameters {
  /**
   * The target environment assertion.
   */
  environment: string;
}

/**
 * A list of keys that have been deleted in this vault.
 */
export interface DeletedKeyListResult {
  /**
   * A response message containing a list of deleted keys in the vault along with a link to the next page of deleted keys
   */
  readonly value?: DeletedKeyItem[];
  /**
   * The URL to get the next set of deleted keys.
   */
  readonly nextLink?: string;
}

/**
 * The deleted key item containing the deleted key metadata and information about deletion.
 */
export type DeletedKeyItem = KeyItem & {
  /**
   * The url of the recovery object, used to identify and recover the deleted key.
   */
  recoveryId?: string;
  /**
   * The time when the key is scheduled to be purged, in UTC
   */
  readonly scheduledPurgeDate?: Date;
  /**
   * The time when the key was deleted, in UTC
   */
  readonly deletedDate?: Date;
};

/**
 * Properties of the key pair backing a certificate.
 */
export interface KeyProperties {
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: boolean;
  /**
   * The type of key pair to be used for the certificate.
   */
  keyType?: JsonWebKeyType;
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA.
   */
  keySize?: number;
  /**
   * Indicates if the same key pair will be used on certificate renewal.
   */
  reuseKey?: boolean;
  /**
   * Elliptic curve name. For valid values, see JsonWebKeyCurveName.
   */
  curve?: JsonWebKeyCurveName;
}

/**
 * Defines values for JsonWebKeyType.
 */
export type JsonWebKeyType =
  | "EC"
  | "EC-HSM"
  | "RSA"
  | "RSA-HSM"
  | "oct"
  | "oct-HSM";
/**
 * Defines values for JsonWebKeyOperation.
 */
export type JsonWebKeyOperation =
  | "encrypt"
  | "decrypt"
  | "sign"
  | "verify"
  | "wrapKey"
  | "unwrapKey"
  | "import"
  | "export";
/**
 * Defines values for DeletionRecoveryLevel.
 */
export type DeletionRecoveryLevel =
  | "Purgeable"
  | "Recoverable+Purgeable"
  | "Recoverable"
  | "Recoverable+ProtectedSubscription"
  | "CustomizedRecoverable+Purgeable"
  | "CustomizedRecoverable"
  | "CustomizedRecoverable+ProtectedSubscription";
/**
 * Defines values for JsonWebKeyCurveName.
 */
export type JsonWebKeyCurveName = "P-256" | "P-384" | "P-521" | "P-256K";
/**
 * Defines values for JsonWebKeyEncryptionAlgorithm.
 */
export type JsonWebKeyEncryptionAlgorithm =
  | "RSA-OAEP"
  | "RSA-OAEP-256"
  | "RSA1_5"
  | "A128GCM"
  | "A192GCM"
  | "A256GCM"
  | "A128KW"
  | "A192KW"
  | "A256KW"
  | "A128CBC"
  | "A192CBC"
  | "A256CBC"
  | "A128CBCPAD"
  | "A192CBCPAD"
  | "A256CBCPAD";
/**
 * Defines values for JsonWebKeySignatureAlgorithm.
 */
export type JsonWebKeySignatureAlgorithm =
  | "PS256"
  | "PS384"
  | "PS512"
  | "RS256"
  | "RS384"
  | "RS512"
  | "RSNULL"
  | "ES256"
  | "ES384"
  | "ES512"
  | "ES256K";

/**
 * Contains response data for the createKey operation.
 */
export type KeyVaultClientCreateKeyResponse = KeyBundle & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyBundle;
  };
};

/**
 * Contains response data for the importKey operation.
 */
export type KeyVaultClientImportKeyResponse = KeyBundle & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyBundle;
  };
};

/**
 * Contains response data for the deleteKey operation.
 */
export type KeyVaultClientDeleteKeyResponse = DeletedKeyBundle & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: DeletedKeyBundle;
  };
};

/**
 * Contains response data for the updateKey operation.
 */
export type KeyVaultClientUpdateKeyResponse = KeyBundle & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyBundle;
  };
};

/**
 * Contains response data for the getKey operation.
 */
export type KeyVaultClientGetKeyResponse = KeyBundle & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyBundle;
  };
};

/**
 * Optional parameters.
 */
export interface KeyVaultClientGetKeyVersionsOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Maximum number of results to return in a page. If not specified the service will return up to 25 results.
   */
  maxresults?: number;
}

/**
 * Contains response data for the getKeyVersions operation.
 */
export type KeyVaultClientGetKeyVersionsResponse = KeyListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyListResult;
  };
};

/**
 * Optional parameters.
 */
export interface KeyVaultClientGetKeysOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Maximum number of results to return in a page. If not specified the service will return up to 25 results.
   */
  maxresults?: number;
}

/**
 * Contains response data for the getKeys operation.
 */
export type KeyVaultClientGetKeysResponse = KeyListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyListResult;
  };
};

/**
 * Contains response data for the backupKey operation.
 */
export type KeyVaultClientBackupKeyResponse = BackupKeyResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: BackupKeyResult;
  };
};

/**
 * Contains response data for the restoreKey operation.
 */
export type KeyVaultClientRestoreKeyResponse = KeyBundle & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyBundle;
  };
};

/**
 * Contains response data for the encrypt operation.
 */
export type KeyVaultClientEncryptResponse = KeyOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyOperationResult;
  };
};

/**
 * Contains response data for the decrypt operation.
 */
export type KeyVaultClientDecryptResponse = KeyOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyOperationResult;
  };
};

/**
 * Contains response data for the sign operation.
 */
export type KeyVaultClientSignResponse = KeyOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyOperationResult;
  };
};

/**
 * Contains response data for the verify operation.
 */
export type KeyVaultClientVerifyResponse = KeyVerifyResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyVerifyResult;
  };
};

/**
 * Contains response data for the wrapKey operation.
 */
export type KeyVaultClientWrapKeyResponse = KeyOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyOperationResult;
  };
};

/**
 * Contains response data for the unwrapKey operation.
 */
export type KeyVaultClientUnwrapKeyResponse = KeyOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyOperationResult;
  };
};

/**
 * Contains response data for the exportKey operation.
 */
export type KeyVaultClientExportKeyResponse = KeyBundle & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyBundle;
  };
};

/**
 * Optional parameters.
 */
export interface KeyVaultClientGetDeletedKeysOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Maximum number of results to return in a page. If not specified the service will return up to 25 results.
   */
  maxresults?: number;
}

/**
 * Contains response data for the getDeletedKeys operation.
 */
export type KeyVaultClientGetDeletedKeysResponse = DeletedKeyListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: DeletedKeyListResult;
  };
};

/**
 * Contains response data for the getDeletedKey operation.
 */
export type KeyVaultClientGetDeletedKeyResponse = DeletedKeyBundle & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: DeletedKeyBundle;
  };
};

/**
 * Contains response data for the recoverDeletedKey operation.
 */
export type KeyVaultClientRecoverDeletedKeyResponse = KeyBundle & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyBundle;
  };
};

/**
 * Optional parameters.
 */
export interface KeyVaultClientGetKeyVersionsNextOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Maximum number of results to return in a page. If not specified the service will return up to 25 results.
   */
  maxresults?: number;
}

/**
 * Contains response data for the getKeyVersionsNext operation.
 */
export type KeyVaultClientGetKeyVersionsNextResponse = KeyListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyListResult;
  };
};

/**
 * Optional parameters.
 */
export interface KeyVaultClientGetKeysNextOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Maximum number of results to return in a page. If not specified the service will return up to 25 results.
   */
  maxresults?: number;
}

/**
 * Contains response data for the getKeysNext operation.
 */
export type KeyVaultClientGetKeysNextResponse = KeyListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: KeyListResult;
  };
};

/**
 * Optional parameters.
 */
export interface KeyVaultClientGetDeletedKeysNextOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Maximum number of results to return in a page. If not specified the service will return up to 25 results.
   */
  maxresults?: number;
}

/**
 * Contains response data for the getDeletedKeysNext operation.
 */
export type KeyVaultClientGetDeletedKeysNextResponse = DeletedKeyListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: DeletedKeyListResult;
  };
};

/**
 * Optional parameters.
 */
export interface KeyVaultClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * Api Version
   */
  apiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
