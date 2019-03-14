import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "./models";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { KeyVaultClientContext } from "./keyVaultClientContext";

export class Secrets extends KeyVaultClientContext {
  /**
   * Initializes a new instance of the KeyVaultClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param [options] The parameter options
   */
  constructor(
    credentials: msRest.ServiceClientCredentials,
    options?: msRestAzure.AzureServiceClientOptions
  ) {
    super(credentials, options);
  }

  /**
   * The SET operation adds a secret to the Azure Key Vault. If the named secret already exists,
   * Azure Key Vault creates a new version of that secret. This operation requires the secrets/set
   * permission.
   * @summary Sets a secret in a specified key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param value The value of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Models.SetSecretResponse>
   */
  setSecret(
    vaultBaseUrl: string,
    secretName: string,
    value: string,
    options?: Models.KeyVaultClientSetSecretOptionalParams
  ): Promise<Models.SetSecretResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretName,
        value,
        options
      },
      setSecretOperationSpec
    ) as Promise<Models.SetSecretResponse>;
  }

  /**
   * The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a secret. This operation requires the secrets/delete permission.
   * @summary Deletes a secret from a specified key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeleteSecretResponse>
   */
  deleteSecret(
    vaultBaseUrl: string,
    secretName: string,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.DeleteSecretResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretName,
        options
      },
      deleteSecretOperationSpec
    ) as Promise<Models.DeleteSecretResponse>;
  }

  /**
   * The UPDATE operation changes specified attributes of an existing stored secret. Attributes that
   * are not specified in the request are left unchanged. The value of a secret itself cannot be
   * changed. This operation requires the secrets/set permission.
   * @summary Updates the attributes associated with a specified secret in a given key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param secretVersion The version of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Models.UpdateSecretResponse>
   */
  updateSecret(
    vaultBaseUrl: string,
    secretName: string,
    secretVersion: string,
    options?: Models.KeyVaultClientUpdateSecretOptionalParams
  ): Promise<Models.UpdateSecretResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretName,
        secretVersion,
        options
      },
      updateSecretOperationSpec
    ) as Promise<Models.UpdateSecretResponse>;
  }

  /**
   * The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires
   * the secrets/get permission.
   * @summary Get a specified secret from a given key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param secretVersion The version of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetSecretResponse>
   */
  getSecret(
    vaultBaseUrl: string,
    secretName: string,
    secretVersion: string,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.GetSecretResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretName,
        secretVersion,
        options
      },
      getSecretOperationSpec
    ) as Promise<Models.GetSecretResponse>;
  }

  /**
   * The Get Secrets operation is applicable to the entire vault. However, only the base secret
   * identifier and its attributes are provided in the response. Individual secret versions are not
   * listed in the response. This operation requires the secrets/list permission.
   * @summary List secrets in a specified key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetSecretsResponse>
   */
  getSecrets(
    vaultBaseUrl: string,
    options?: Models.KeyVaultClientGetSecretsOptionalParams
  ): Promise<Models.GetSecretsResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        options
      },
      getSecretsOperationSpec
    ) as Promise<Models.GetSecretsResponse>;
  }

  /**
   * The full secret identifier and attributes are provided in the response. No values are returned
   * for the secrets. This operations requires the secrets/list permission.
   * @summary List all versions of the specified secret.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetSecretVersionsResponse>
   */
  getSecretVersions(
    vaultBaseUrl: string,
    secretName: string,
    options?: Models.KeyVaultClientGetSecretVersionsOptionalParams
  ): Promise<Models.GetSecretVersionsResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretName,
        options
      },
      getSecretVersionsOperationSpec
    ) as Promise<Models.GetSecretVersionsResponse>;
  }

  /**
   * The Get Deleted Secrets operation returns the secrets that have been deleted for a vault enabled
   * for soft-delete. This operation requires the secrets/list permission.
   * @summary Lists deleted secrets for the specified vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetDeletedSecretsResponse>
   */
  getDeletedSecrets(
    vaultBaseUrl: string,
    options?: Models.KeyVaultClientGetDeletedSecretsOptionalParams
  ): Promise<Models.GetDeletedSecretsResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        options
      },
      getDeletedSecretsOperationSpec
    ) as Promise<Models.GetDeletedSecretsResponse>;
  }

  /**
   * The Get Deleted Secret operation returns the specified deleted secret along with its attributes.
   * This operation requires the secrets/get permission.
   * @summary Gets the specified deleted secret.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Models.GetDeletedSecretResponse>
   */
  getDeletedSecret(
    vaultBaseUrl: string,
    secretName: string,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.GetDeletedSecretResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretName,
        options
      },
      getDeletedSecretOperationSpec
    ) as Promise<Models.GetDeletedSecretResponse>;
  }

  /**
   * The purge deleted secret operation removes the secret permanently, without the possibility of
   * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
   * requires the secrets/purge permission.
   * @summary Permanently deletes the specified secret.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  purgeDeletedSecret(
    vaultBaseUrl: string,
    secretName: string,
    options?: msRest.RequestOptionsBase
  ): Promise<msRest.RestResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretName,
        options
      },
      purgeDeletedSecretOperationSpec
    );
  }

  /**
   * Recovers the deleted secret in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault. This operation requires the secrets/recover permission.
   * @summary Recovers the deleted secret to the latest version.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the deleted secret.
   * @param [options] The optional parameters
   * @returns Promise<Models.RecoverDeletedSecretResponse>
   */
  recoverDeletedSecret(
    vaultBaseUrl: string,
    secretName: string,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.RecoverDeletedSecretResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretName,
        options
      },
      recoverDeletedSecretOperationSpec
    ) as Promise<Models.RecoverDeletedSecretResponse>;
  }

  /**
   * Requests that a backup of the specified secret be downloaded to the client. All versions of the
   * secret will be downloaded. This operation requires the secrets/backup permission.
   * @summary Backs up the specified secret.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Models.BackupSecretResponse>
   */
  backupSecret(
    vaultBaseUrl: string,
    secretName: string,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.BackupSecretResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretName,
        options
      },
      backupSecretOperationSpec
    ) as Promise<Models.BackupSecretResponse>;
  }

  /**
   * Restores a backed up secret, and all its versions, to a vault. This operation requires the
   * secrets/restore permission.
   * @summary Restores a backed up secret to a vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretBundleBackup The backup blob associated with a secret bundle.
   * @param [options] The optional parameters
   * @returns Promise<Models.RestoreSecretResponse>
   */
  restoreSecret(
    vaultBaseUrl: string,
    secretBundleBackup: Uint8Array,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.RestoreSecretResponse> {
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        secretBundleBackup,
        options
      },
      restoreSecretOperationSpec
    ) as Promise<Models.RestoreSecretResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);

const setSecretOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "secrets/{secret-name}",
  urlParameters: [Parameters.vaultBaseUrl, Parameters.secretName0],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: {
      value: "value",
      tags: ["options", "tags"],
      contentType: ["options", "contentType"],
      secretAttributes: ["options", "secretAttributes"]
    },
    mapper: {
      ...Mappers.SecretSetParameters,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.SecretBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const deleteSecretOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "secrets/{secret-name}",
  urlParameters: [Parameters.vaultBaseUrl, Parameters.secretName1],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedSecretBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const updateSecretOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "secrets/{secret-name}/{secret-version}",
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.secretName1,
    Parameters.secretVersion
  ],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: {
      contentType: ["options", "contentType"],
      secretAttributes: ["options", "secretAttributes"],
      tags: ["options", "tags"]
    },
    mapper: {
      ...Mappers.SecretUpdateParameters,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.SecretBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const getSecretOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "secrets/{secret-name}/{secret-version}",
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.secretName1,
    Parameters.secretVersion
  ],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.SecretBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const getSecretsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "secrets",
  urlParameters: [Parameters.vaultBaseUrl],
  queryParameters: [Parameters.maxresults, Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.SecretListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const getSecretVersionsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "secrets/{secret-name}/versions",
  urlParameters: [Parameters.vaultBaseUrl, Parameters.secretName1],
  queryParameters: [Parameters.maxresults, Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.SecretListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const getDeletedSecretsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "deletedsecrets",
  urlParameters: [Parameters.vaultBaseUrl],
  queryParameters: [Parameters.maxresults, Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedSecretListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const getDeletedSecretOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "deletedsecrets/{secret-name}",
  urlParameters: [Parameters.vaultBaseUrl, Parameters.secretName1],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedSecretBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const purgeDeletedSecretOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "deletedsecrets/{secret-name}",
  urlParameters: [Parameters.vaultBaseUrl, Parameters.secretName1],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const recoverDeletedSecretOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "deletedsecrets/{secret-name}/recover",
  urlParameters: [Parameters.vaultBaseUrl, Parameters.secretName1],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.SecretBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const backupSecretOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "secrets/{secret-name}/backup",
  urlParameters: [Parameters.vaultBaseUrl, Parameters.secretName1],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.BackupSecretResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};

const restoreSecretOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "secrets/restore",
  urlParameters: [Parameters.vaultBaseUrl],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: {
      secretBundleBackup: "secretBundleBackup"
    },
    mapper: {
      ...Mappers.SecretRestoreParameters,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.SecretBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  serializer
};
