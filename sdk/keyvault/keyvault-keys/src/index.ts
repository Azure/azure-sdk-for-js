// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint @typescript-eslint/member-ordering: 0 */
/// <reference lib="esnext.asynciterable" />

import {
  PipelineOptions,
  TokenCredential,
  createPipelineFromOptions,
  isTokenCredential,
  signingPolicy
} from "@azure/core-http";

import { logger } from "./log";

import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";

import {
  DeletionRecoveryLevel,
  KnownDeletionRecoveryLevel,
  KeyVaultClientGetKeysOptionalParams,
  KnownJsonWebKeyType
} from "./generated/models";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { SDK_VERSION } from "./constants";
import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";

import { DeleteKeyPoller } from "./lro/delete/poller";
import { RecoverDeletedKeyPoller } from "./lro/recover/poller";

import {
  BackupKeyOptions,
  CreateEcKeyOptions,
  CreateKeyOptions,
  CreateRsaKeyOptions,
  CryptographyOptions,
  DeletedKey,
  GetDeletedKeyOptions,
  GetKeyOptions,
  ImportKeyOptions,
  JsonWebKey,
  KeyOperation,
  KnownKeyOperations,
  KeyPollerOptions,
  KeyType,
  KnownKeyTypes,
  KnownKeyExportEncryptionAlgorithm,
  BeginDeleteKeyOptions,
  BeginRecoverDeletedKeyOptions,
  KeyProperties,
  KeyVaultKey,
  ListPropertiesOfKeysOptions,
  ListPropertiesOfKeyVersionsOptions,
  ListDeletedKeysOptions,
  PurgeDeletedKeyOptions,
  RestoreKeyBackupOptions,
  UpdateKeyPropertiesOptions,
  KeyClientOptions,
  CryptographyClientOptions,
  LATEST_API_VERSION,
  CreateOctKeyOptions,
  GetRandomBytesOptions,
  ReleaseKeyOptions,
  ReleaseKeyResult,
  KeyReleasePolicy,
  KeyExportEncryptionAlgorithm,
  GetCryptographyClientOptions,
  RotateKeyOptions,
  UpdateKeyRotationPolicyOptions,
  GetKeyRotationPolicyOptions,
  KeyRotationLifetimeAction,
  KeyRotationPolicy,
  KeyRotationPolicyProperties,
  KeyRotationPolicyAction
} from "./keysModels";

import { CryptographyClient } from "./cryptographyClient";

import {
  DecryptResult,
  KeyCurveName,
  KnownKeyCurveNames,
  EncryptionAlgorithm,
  KnownEncryptionAlgorithms,
  SignatureAlgorithm,
  KnownSignatureAlgorithms,
  KeyWrapAlgorithm,
  SignResult,
  UnwrapResult,
  VerifyResult,
  WrapResult,
  EncryptResult,
  DecryptOptions,
  EncryptOptions,
  SignOptions,
  UnwrapKeyOptions,
  VerifyOptions,
  WrapKeyOptions,
  EncryptParameters,
  DecryptParameters,
  RsaEncryptionAlgorithm,
  RsaEncryptParameters,
  AesGcmEncryptionAlgorithm,
  AesCbcEncryptionAlgorithm,
  AesCbcEncryptParameters,
  AesGcmEncryptParameters,
  AesCbcDecryptParameters,
  AesGcmDecryptParameters,
  RsaDecryptParameters,
  VerifyDataOptions
} from "./cryptographyClientModels";

import { KeyVaultKeyIdentifier, parseKeyVaultKeyIdentifier } from "./identifier";
import {
  getDeletedKeyFromDeletedKeyItem,
  getKeyFromKeyBundle,
  getKeyPropertiesFromKeyItem,
  keyRotationTransformations
} from "./transformations";
import { createTraceFunction } from "../../keyvault-common/src";

export {
  CryptographyClientOptions,
  KeyClientOptions,
  BackupKeyOptions,
  CreateEcKeyOptions,
  CreateKeyOptions,
  CreateRsaKeyOptions,
  CreateOctKeyOptions,
  CryptographyClient,
  CryptographyOptions,
  RsaEncryptionAlgorithm,
  RsaDecryptParameters,
  AesGcmEncryptionAlgorithm,
  AesGcmDecryptParameters,
  AesCbcEncryptionAlgorithm,
  AesCbcDecryptParameters,
  DecryptParameters,
  DecryptOptions,
  DecryptResult,
  DeletedKey,
  DeletionRecoveryLevel,
  KnownDeletionRecoveryLevel,
  RsaEncryptParameters,
  AesGcmEncryptParameters,
  AesCbcEncryptParameters,
  EncryptParameters,
  EncryptOptions,
  EncryptResult,
  GetDeletedKeyOptions,
  GetKeyOptions,
  GetRandomBytesOptions,
  ImportKeyOptions,
  JsonWebKey,
  KeyCurveName,
  KnownKeyCurveNames,
  KnownKeyExportEncryptionAlgorithm,
  EncryptionAlgorithm,
  KnownEncryptionAlgorithms,
  KeyOperation,
  KnownKeyOperations,
  KeyType,
  KnownKeyTypes,
  KeyPollerOptions,
  BeginDeleteKeyOptions,
  BeginRecoverDeletedKeyOptions,
  KeyProperties,
  SignatureAlgorithm,
  KnownSignatureAlgorithms,
  KeyVaultKey,
  KeyWrapAlgorithm,
  ListPropertiesOfKeysOptions,
  ListPropertiesOfKeyVersionsOptions,
  ListDeletedKeysOptions,
  PageSettings,
  PagedAsyncIterableIterator,
  KeyVaultKeyIdentifier,
  parseKeyVaultKeyIdentifier,
  PipelineOptions,
  PollOperationState,
  PollerLike,
  PurgeDeletedKeyOptions,
  RestoreKeyBackupOptions,
  RotateKeyOptions,
  SignOptions,
  SignResult,
  UnwrapKeyOptions,
  UnwrapResult,
  UpdateKeyPropertiesOptions,
  VerifyOptions,
  VerifyDataOptions,
  VerifyResult,
  WrapKeyOptions,
  WrapResult,
  ReleaseKeyOptions,
  ReleaseKeyResult,
  KeyReleasePolicy,
  KeyExportEncryptionAlgorithm,
  GetCryptographyClientOptions,
  KeyRotationPolicyAction,
  KeyRotationPolicyProperties,
  KeyRotationPolicy,
  KeyRotationLifetimeAction,
  UpdateKeyRotationPolicyOptions,
  GetKeyRotationPolicyOptions,
  logger
};

const withTrace = createTraceFunction("Azure.KeyVault.Keys.KeyClient");

/**
 * The KeyClient provides methods to manage {@link KeyVaultKey} in the
 * Azure Key Vault. The client supports creating, retrieving, updating,
 * deleting, purging, backing up, restoring and listing KeyVaultKeys. The
 * client also supports listing {@link DeletedKey} for a soft-delete enabled Azure Key
 * Vault.
 */
export class KeyClient {
  /**
   * The base URL to the vault
   */
  public readonly vaultUrl: string;

  /**
   * @internal
   * @hidden
   * A reference to the auto-generated Key Vault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * @internal
   * A reference to the credential that was used to construct this client.
   * Later used to instantiate a {@link CryptographyClient} with the same credential.
   */
  private readonly credential: TokenCredential;

  /**
   * Creates an instance of KeyClient.
   *
   * Example usage:
   * ```ts
   * import { KeyClient } from "@azure/keyvault-keys";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let vaultUrl = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new KeyClient(vaultUrl, credentials);
   * ```
   * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param pipelineOptions - Pipeline options used to configure Key Vault API requests. Omit this parameter to use the default pipeline configuration.
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    pipelineOptions: KeyClientOptions = {}
  ) {
    this.vaultUrl = vaultUrl;

    const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = isTokenCredential(credential)
      ? challengeBasedAuthenticationPolicy(credential)
      : signingPolicy(credential);

    const internalPipelineOptions = {
      ...pipelineOptions,
      loggingOptions: {
        logger: logger.info,
        allowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version"
        ]
      }
    };

    this.credential = credential;
    this.client = new KeyVaultClient(
      pipelineOptions.serviceVersion || LATEST_API_VERSION,
      createPipelineFromOptions(internalPipelineOptions, authPolicy)
    );
  }

  /**
   * The create key operation can be used to create any key type in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * // Create an elliptic-curve key:
   * let result = await client.createKey("MyKey", "EC");
   * ```
   * Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param name - The name of the key.
   * @param keyType - The type of the key. One of the following: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'.
   * @param options - The optional parameters.
   */
  public createKey(
    name: string,
    keyType: KeyType,
    options?: CreateKeyOptions
  ): Promise<KeyVaultKey> {
    let unflattenedOptions = {};

    if (options) {
      const { enabled, notBefore, expiresOn: expires, exportable, ...remainingOptions } = options;
      unflattenedOptions = {
        ...remainingOptions,
        keyAttributes: {
          enabled,
          notBefore,
          expires,
          exportable
        }
      };
    }
    return withTrace("createKey", unflattenedOptions, async (updatedOptions) => {
      const response = await this.client.createKey(this.vaultUrl, name, keyType, updatedOptions);
      return getKeyFromKeyBundle(response);
    });
  }

  /**
   * The createEcKey method creates a new elliptic curve key in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let result = await client.createEcKey("MyKey", { curve: "P-256" });
   * ```
   * Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async createEcKey(name: string, options?: CreateEcKeyOptions): Promise<KeyVaultKey> {
    const keyType = options?.hsm ? KnownJsonWebKeyType.ECHSM : KnownJsonWebKeyType.EC;
    return this.createKey(name, keyType, options);
  }

  /**
   * The createRSAKey method creates a new RSA key in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let result = await client.createRsaKey("MyKey", { keySize: 2048 });
   * ```
   * Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async createRsaKey(name: string, options?: CreateRsaKeyOptions): Promise<KeyVaultKey> {
    const keyType = options?.hsm ? KnownJsonWebKeyType.RSAHSM : KnownJsonWebKeyType.RSA;
    return this.createKey(name, keyType, options);
  }

  /**
   * The createOctKey method creates a new OCT key in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let result = await client.createOctKey("MyKey", { hsm: true });
   * ```
   * Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async createOctKey(name: string, options?: CreateOctKeyOptions): Promise<KeyVaultKey> {
    const keyType = options?.hsm ? KnownJsonWebKeyType.OctHSM : KnownJsonWebKeyType.Oct;
    return this.createKey(name, keyType, options);
  }

  /**
   * The import key operation may be used to import any key type into an Azure Key Vault. If the
   * named key already exists, Azure Key Vault creates a new version of the key. This operation
   * requires the keys/import permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * // Key contents in myKeyContents
   * let result = await client.importKey("MyKey", myKeyContents);
   * ```
   * Imports an externally created key, stores it, and returns key parameters and properties
   * to the client.
   * @param name - Name for the imported key.
   * @param key - The JSON web key.
   * @param options - The optional parameters.
   */
  public importKey(
    name: string,
    key: JsonWebKey,
    options?: ImportKeyOptions
  ): Promise<KeyVaultKey> {
    let unflattenedOptions = {};

    if (options) {
      const {
        enabled,
        notBefore,
        exportable,
        expiresOn: expires,
        hardwareProtected: hsm,
        ...remainingOptions
      } = options;
      unflattenedOptions = {
        ...remainingOptions,
        keyAttributes: {
          enabled,
          notBefore,
          expires,
          hsm,
          exportable
        }
      };
    }

    return withTrace(`importKey`, unflattenedOptions, async (updatedOptions) => {
      const response = await this.client.importKey(this.vaultUrl, name, key, updatedOptions);
      return getKeyFromKeyBundle(response);
    });
  }

  /**
   * Gets a {@link CryptographyClient} for the given key.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * // get a cryptography client for a given key
   * let cryptographyClient = client.getCryptographyClient("MyKey");
   * ```
   * @param name - The name of the key used to perform cryptographic operations.
   * @param version - Optional version of the key used to perform cryptographic operations.
   * @returns - A {@link CryptographyClient} using the same options, credentials, and http client as this {@link KeyClient}
   */
  public getCryptographyClient(
    keyName: string,
    options?: GetCryptographyClientOptions
  ): CryptographyClient {
    const keyUrl = new URL(
      ["keys", keyName, options?.keyVersion].filter(Boolean).join("/"),
      this.vaultUrl
    );

    // The goals of this method are discoverability and performance (by sharing a client and pipeline).
    // The existing cryptography client does not accept a pipeline as an argument, nor does it expose it.
    // In order to avoid publicly exposing the pipeline we will pass in the underlying client as an undocumented
    // property to the constructor so that crypto providers downstream can use it.
    const constructorOptions: CryptographyClientOptions & { generatedClient: KeyVaultClient } = {
      generatedClient: this.client
    };
    const cryptoClient = new CryptographyClient(
      keyUrl.toString(),
      this.credential,
      constructorOptions
    );
    return cryptoClient;
  }

  /**
   * The delete operation applies to any key stored in Azure Key Vault. Individual versions
   * of a key can not be deleted, only all versions of a given key at once.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the key is deleted.
   *
   * This operation requires the keys/delete permission.
   *
   * Example usage:
   * ```ts
   * const client = new KeyClient(url, credentials);
   * await client.createKey("MyKey", "EC");
   * const poller = await client.beginDeleteKey("MyKey");
   *
   * // Serializing the poller
   * const serialized = poller.toString();
   * // A new poller can be created with:
   * // await client.beginDeleteKey("MyKey", { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const deletedKey = await poller.pollUntilDone();
   * console.log(deletedKey);
   * ```
   * Deletes a key from a specified key vault.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async beginDeleteKey(
    name: string,
    options: BeginDeleteKeyOptions = {}
  ): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>> {
    const poller = new DeleteKeyPoller({
      name,
      vaultUrl: this.vaultUrl,
      client: this.client,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      operationOptions: options
    });

    // This will initialize the poller's operation (the deletion of the key).
    await poller.poll();

    return poller;
  }

  /**
   * The updateKeyProperties method changes specified properties of an existing stored key. Properties that
   * are not specified in the request are left unchanged. The value of a key itself cannot be
   * changed. This operation requires the keys/set permission.
   *
   * Example usage:
   * ```ts
   * let keyName = "MyKey";
   * let client = new KeyClient(vaultUrl, credentials);
   * let key = await client.getKey(keyName);
   * let result = await client.updateKeyProperties(keyName, key.properties.version, { enabled: false });
   * ```
   * Updates the properties associated with a specified key in a given key vault.
   * @param name - The name of the key.
   * @param keyVersion - The version of the key.
   * @param options - The optional parameters.
   */
  public updateKeyProperties(
    name: string,
    keyVersion: string,
    options?: UpdateKeyPropertiesOptions
  ): Promise<KeyVaultKey>;
  /**
   * The updateKeyProperties method changes specified properties of the latest version of an existing stored key. Properties that
   * are not specified in the request are left unchanged. The value of a key itself cannot be
   * changed. This operation requires the keys/set permission.
   *
   * Example usage:
   * ```ts
   * let keyName = "MyKey";
   * let client = new KeyClient(vaultUrl, credentials);
   * let key = await client.getKey(keyName);
   * let result = await client.updateKeyProperties(keyName, { enabled: false });
   * ```
   * Updates the properties associated with a specified key in a given key vault.
   * @param name - The name of the key.
   * @param keyVersion - The version of the key.
   * @param options - The optional parameters.
   */
  public updateKeyProperties(
    name: string,
    options?: UpdateKeyPropertiesOptions
  ): Promise<KeyVaultKey>;
  public updateKeyProperties(
    ...args: [string, string, UpdateKeyPropertiesOptions?] | [string, UpdateKeyPropertiesOptions?]
  ): Promise<KeyVaultKey> {
    const [name, keyVersion, options] = this.disambiguateUpdateKeyPropertiesArgs(args);
    return withTrace(`updateKeyProperties`, options, async (updatedOptions) => {
      const { enabled, notBefore, expiresOn: expires, ...remainingOptions } = updatedOptions;
      const unflattenedOptions = {
        ...remainingOptions,
        keyAttributes: {
          enabled,
          notBefore,
          expires
        }
      };
      const response = await this.client.updateKey(
        this.vaultUrl,
        name,
        keyVersion,
        unflattenedOptions
      );
      return getKeyFromKeyBundle(response);
    });
  }

  /**
   * Standardizes an overloaded arguments collection for the updateKeyProperties method.
   *
   * @param args - The arguments collection.
   * @returns - The standardized arguments collection.
   * @internal
   */
  private disambiguateUpdateKeyPropertiesArgs(
    args: [string, string, UpdateKeyPropertiesOptions?] | [string, UpdateKeyPropertiesOptions?]
  ): [string, string, UpdateKeyPropertiesOptions] {
    if (typeof args[1] === "string") {
      // [name, keyVersion, options?] => [name, keyVersion, options || {}]
      return [args[0], args[1], args[2] || {}];
    } else {
      // [name, options?] => [name , "", options || {}]
      return [args[0], "", args[1] || {}];
    }
  }

  /**
   * The getKey method gets a specified key and is applicable to any key stored in Azure Key Vault.
   * This operation requires the keys/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let key = await client.getKey("MyKey");
   * ```
   * Get a specified key from a given key vault.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public getKey(name: string, options: GetKeyOptions = {}): Promise<KeyVaultKey> {
    return withTrace(`getKey`, options, async (updatedOptions) => {
      const response = await this.client.getKey(
        this.vaultUrl,
        name,
        options && options.version ? options.version : "",
        updatedOptions
      );
      return getKeyFromKeyBundle(response);
    });
  }

  /**
   * The getDeletedKey method returns the specified deleted key along with its properties.
   * This operation requires the keys/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let key = await client.getDeletedKey("MyDeletedKey");
   * ```
   * Gets the specified deleted key.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public getDeletedKey(name: string, options: GetDeletedKeyOptions = {}): Promise<DeletedKey> {
    return withTrace(`getDeletedKey`, options, async (updatedOptions) => {
      const response = await this.client.getDeletedKey(this.vaultUrl, name, updatedOptions);
      return getKeyFromKeyBundle(response);
    });
  }

  /**
   * The purge deleted key operation removes the key permanently, without the possibility of
   * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
   * requires the keys/purge permission.
   *
   * Example usage:
   * ```ts
   * const client = new KeyClient(url, credentials);
   * const deletePoller = await client.beginDeleteKey("MyKey")
   * await deletePoller.pollUntilDone();
   * await client.purgeDeletedKey("MyKey");
   * ```
   * Permanently deletes the specified key.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public purgeDeletedKey(name: string, options: PurgeDeletedKeyOptions = {}): Promise<void> {
    return withTrace(`purgeDeletedKey`, options, async (updatedOptions) => {
      await this.client.purgeDeletedKey(this.vaultUrl, name, updatedOptions);
    });
  }

  /**
   * Recovers the deleted key in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the deleted key is recovered.
   *
   * This operation requires the keys/recover permission.
   *
   * Example usage:
   * ```ts
   * const client = new KeyClient(url, credentials);
   * await client.createKey("MyKey", "EC");
   * const deletePoller = await client.beginDeleteKey("MyKey");
   * await deletePoller.pollUntilDone();
   * const poller = await client.beginRecoverDeletedKey("MyKey");
   *
   * // Serializing the poller
   * const serialized = poller.toString();
   * // A new poller can be created with:
   * // await client.beginRecoverDeletedKey("MyKey", { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const key = await poller.pollUntilDone();
   * console.log(key);
   * ```
   * Recovers the deleted key to the latest version.
   * @param name - The name of the deleted key.
   * @param options - The optional parameters.
   */
  public async beginRecoverDeletedKey(
    name: string,
    options: BeginRecoverDeletedKeyOptions = {}
  ): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>> {
    const poller = new RecoverDeletedKeyPoller({
      name,
      vaultUrl: this.vaultUrl,
      client: this.client,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      operationOptions: options
    });
    // This will initialize the poller's operation (the deletion of the key).
    await poller.poll();
    return poller;
  }

  /**
   * Requests that a backup of the specified key be downloaded to the client. All versions of the
   * key will be downloaded. This operation requires the keys/backup permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let backupContents = await client.backupKey("MyKey");
   * ```
   * Backs up the specified key.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public backupKey(name: string, options: BackupKeyOptions = {}): Promise<Uint8Array | undefined> {
    return withTrace(`backupKey`, options, async (updatedOptions) => {
      const response = await this.client.backupKey(this.vaultUrl, name, updatedOptions);
      return response.value;
    });
  }

  /**
   * Restores a backed up key, and all its versions, to a vault. This operation requires the
   * keys/restore permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let backupContents = await client.backupKey("MyKey");
   * // ...
   * let key = await client.restoreKeyBackup(backupContents);
   * ```
   * Restores a backed up key to a vault.
   * @param backup - The backup blob associated with a key bundle.
   * @param options - The optional parameters.
   */
  public async restoreKeyBackup(
    backup: Uint8Array,
    options: RestoreKeyBackupOptions = {}
  ): Promise<KeyVaultKey> {
    return withTrace(`restoreKeyBackup`, options, async (updatedOptions) => {
      const response = await this.client.restoreKey(this.vaultUrl, backup, updatedOptions);
      return getKeyFromKeyBundle(response);
    });
  }

  /**
   * Gets the requested number of bytes containing random values from a managed HSM.
   * This operation requires the managedHsm/rng permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(vaultUrl, credentials);
   * let { bytes } = await client.getRandomBytes(10);
   * ```
   * @param count - The number of bytes to generate between 1 and 128 inclusive.
   * @param options - The optional parameters.
   */
  public getRandomBytes(count: number, options: GetRandomBytesOptions = {}): Promise<Uint8Array> {
    return withTrace("getRandomBytes", options, async (updatedOptions) => {
      const response = await this.client.getRandomBytes(this.vaultUrl, count, updatedOptions);
      return response.value!;
    });
  }

  /**
   * Rotates the key based on the key policy by generating a new version of the key. This operation requires the keys/rotate permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(vaultUrl, credentials);
   * let key = await client.rotateKey("MyKey");
   * ```
   *
   * @param name - The name of the key to rotate.
   * @param options - The optional parameters.
   */
  public rotateKey(name: string, options: RotateKeyOptions = {}): Promise<KeyVaultKey> {
    return withTrace("rotateKey", options, async (updatedOptions) => {
      const key = await this.client.rotateKey(this.vaultUrl, name, updatedOptions);
      return getKeyFromKeyBundle(key);
    });
  }

  /**
   * Releases a key from a managed HSM.
   *
   * The release key operation is applicable to all key types. The operation requires the key to be marked exportable and the keys/release permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(vaultUrl, credentials);
   * let result = await client.releaseKey("myKey", target)
   * ```
   *
   * @param name - The name of the key.
   * @param targetAttestationToken - The attestation assertion for the target of the key release.
   * @param options - The optional parameters.
   */
  public releaseKey(
    name: string,
    targetAttestationToken: string,
    options: ReleaseKeyOptions = {}
  ): Promise<ReleaseKeyResult> {
    return withTrace("releaseKey", options, async (updatedOptions) => {
      const { nonce, algorithm, ...rest } = updatedOptions;
      const result = await this.client.release(
        this.vaultUrl,
        name,
        options?.version || "",
        targetAttestationToken,
        {
          enc: algorithm,
          nonce,
          ...rest
        }
      );

      return { value: result.value! };
    });
  }

  /**
   * Gets the rotation policy of a Key Vault Key.
   * By default, all keys have a policy that will notify 30 days before expiry.
   *
   * This operation requires the keys/get permission.
   * Example usage:
   * ```ts
   * let client = new KeyClient(vaultUrl, credentials);
   * let result = await client.getKeyRotationPolicy("myKey");
   * ```
   *
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public getKeyRotationPolicy(
    name: string,
    options: GetKeyRotationPolicyOptions = {}
  ): Promise<KeyRotationPolicy> {
    return withTrace("getKeyRotationPolicy", options, async () => {
      const policy = await this.client.getKeyRotationPolicy(this.vaultUrl, name);
      return keyRotationTransformations.generatedToPublic(policy);
    });
  }

  /**
   * Updates the rotation policy of a Key Vault Key.
   * This operation requires the keys/update permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(vaultUrl, credentials);
   * const setPolicy = await client.updateKeyRotationPolicy("MyKey", myPolicy);
   * ```
   *
   * @param name - The name of the key.
   * @param policyProperties - The {@link KeyRotationPolicyProperties} for the policy.
   * @param options - The optional parameters.
   */
  public updateKeyRotationPolicy(
    name: string,
    policy: KeyRotationPolicyProperties,
    options: UpdateKeyRotationPolicyOptions = {}
  ): Promise<KeyRotationPolicy> {
    return withTrace("updateKeyRotationPolicy", options, async (updatedOptions) => {
      const result = await this.client.updateKeyRotationPolicy(
        this.vaultUrl,
        name,
        keyRotationTransformations.propertiesToGenerated(policy),
        updatedOptions
      );
      return keyRotationTransformations.generatedToPublic(result);
    });
  }

  /**
   * @internal
   * @hidden
   * Deals with the pagination of {@link listPropertiesOfKeyVersions}.
   * @param name - The name of the Key Vault Key.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listPropertiesOfKeyVersionsPage(
    name: string,
    continuationState: PageSettings,
    options?: ListPropertiesOfKeyVersionsOptions
  ): AsyncIterableIterator<KeyProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetKeysOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await withTrace(
        "listPropertiesOfKeyVersionsPage",
        optionsComplete,
        async (updatedOptions) => this.client.getKeyVersions(this.vaultUrl, name, updatedOptions)
      );

      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getKeyPropertiesFromKeyItem, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await withTrace(
        "listPropertiesOfKeyVersionsPage",
        options || {},
        async (updatedOptions) =>
          this.client.getKeyVersions(continuationState.continuationToken!, name, updatedOptions)
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getKeyPropertiesFromKeyItem, this);
      } else {
        break;
      }
    }
  }

  /**
   * @internal
   * @hidden
   * Deals with the iteration of all the available results of {@link listPropertiesOfKeyVersions}.
   * @param name - The name of the Key Vault Key.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listPropertiesOfKeyVersionsAll(
    name: string,
    options?: ListPropertiesOfKeyVersionsOptions
  ): AsyncIterableIterator<KeyProperties> {
    const f = {};

    for await (const page of this.listPropertiesOfKeyVersionsPage(name, f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates all versions of the given key in the vault. The full key identifier, properties, and tags are provided
   * in the response. This operation requires the keys/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * for await (const keyProperties of client.listPropertiesOfKeyVersions("MyKey")) {
   *   const key = await client.getKey(keyProperties.name);
   *   console.log("key version: ", key);
   * }
   * ```
   * @param name - Name of the key to fetch versions for
   * @param options - The optional parameters.
   */
  public listPropertiesOfKeyVersions(
    name: string,
    options: ListPropertiesOfKeyVersionsOptions = {}
  ): PagedAsyncIterableIterator<KeyProperties> {
    const iter = this.listPropertiesOfKeyVersionsAll(name, options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPropertiesOfKeyVersionsPage(name, settings, options)
    };
  }

  /**
   * @internal
   * @hidden
   * Deals with the pagination of {@link listPropertiesOfKeys}.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listPropertiesOfKeysPage(
    continuationState: PageSettings,
    options?: ListPropertiesOfKeysOptions
  ): AsyncIterableIterator<KeyProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetKeysOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await withTrace(
        "listPropertiesOfKeysPage",
        optionsComplete,
        async (updatedOptions) => this.client.getKeys(this.vaultUrl, updatedOptions)
      );

      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getKeyPropertiesFromKeyItem, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await withTrace(
        "KeysClient.listPropertiesOfKeysPage",
        options || {},
        async (updatedOptions) =>
          this.client.getKeys(continuationState.continuationToken!, updatedOptions)
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getKeyPropertiesFromKeyItem, this);
      } else {
        break;
      }
    }
  }

  /**
   * @internal
   * @hidden
   * Deals with the iteration of all the available results of {@link listPropertiesOfKeys}.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listPropertiesOfKeysAll(
    options?: ListPropertiesOfKeysOptions
  ): AsyncIterableIterator<KeyProperties> {
    const f = {};

    for await (const page of this.listPropertiesOfKeysPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the latest version of all keys in the vault.  The full key identifier and properties are provided
   * in the response. No values are returned for the keys. This operations requires the keys/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * for await (const keyProperties of client.listPropertiesOfKeys()) {
   *   const key = await client.getKey(keyProperties.name);
   *   console.log("key: ", key);
   * }
   * ```
   * List all keys in the vault
   * @param options - The optional parameters.
   */
  public listPropertiesOfKeys(
    options: ListPropertiesOfKeysOptions = {}
  ): PagedAsyncIterableIterator<KeyProperties> {
    const iter = this.listPropertiesOfKeysAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listPropertiesOfKeysPage(settings, options)
    };
  }

  /**
   * @internal
   * @hidden
   * Deals with the pagination of {@link listDeletedKeys}.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listDeletedKeysPage(
    continuationState: PageSettings,
    options?: ListDeletedKeysOptions
  ): AsyncIterableIterator<DeletedKey[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetKeysOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await withTrace(
        "listDeletedKeysPage",
        optionsComplete,
        async (updatedOptions) => this.client.getDeletedKeys(this.vaultUrl, updatedOptions)
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getDeletedKeyFromDeletedKeyItem, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await withTrace(
        "listDeletedKeysPage",
        options || {},
        async (updatedOptions) =>
          this.client.getDeletedKeys(continuationState.continuationToken!, updatedOptions)
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(getDeletedKeyFromDeletedKeyItem, this);
      } else {
        break;
      }
    }
  }

  /**
   * @internal
   * @hidden
   * Deals with the iteration of all the available results of {@link listDeletedKeys}.
   * @param options - Common options for the iterative endpoints.
   */
  private async *listDeletedKeysAll(
    options?: ListDeletedKeysOptions
  ): AsyncIterableIterator<DeletedKey> {
    const f = {};

    for await (const page of this.listDeletedKeysPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the deleted keys in the vault.  The full key identifier and properties are provided
   * in the response. No values are returned for the keys. This operations requires the keys/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * for await (const deletedKey of client.listDeletedKeys()) {
   *   console.log("deleted key: ", deletedKey);
   * }
   * ```
   * List all keys in the vault
   * @param options - The optional parameters.
   */
  public listDeletedKeys(
    options: ListDeletedKeysOptions = {}
  ): PagedAsyncIterableIterator<DeletedKey> {
    const iter = this.listDeletedKeysAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listDeletedKeysPage(settings, options)
    };
  }
}
