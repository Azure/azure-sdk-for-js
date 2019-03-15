import * as Models from "./models";

export interface Secret extends ParsedKeyVaultEntityIdentifier {
  /**
   * @member {string} [value] The secret value.
   */
  value?: string;
  /**
   * @member {string} [id] The secret id.
   */
  id?: string;
  /**
   * @member {string} [contentType] The content type of the secret.
   */
  contentType?: string;
  /**
   * @member {SecretAttributes} [attributes] The secret management attributes.
   */
  attributes?: Models.SecretAttributes;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {string} [kid] If this is a secret backing a KV certificate, then
   * this field specifies the corresponding key backing the KV certificate.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly kid?: string;
  /**
   * @member {boolean} [managed] True if the secret's lifetime is managed by
   * key vault. If this is a secret backing a certificate, then managed will be
   * true.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly managed?: boolean;
}

export interface DeletedSecret extends Secret {
  /**
   * @member {string} [recoveryId] The url of the recovery object, used to
   * identify and recover the deleted secret.
   */
  recoveryId?: string;
  /**
   * @member {Date} [scheduledPurgeDate] The time when the secret is scheduled
   * to be purged, in UTC
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly scheduledPurgeDate?: Date;
  /**
   * @member {Date} [deletedDate] The time when the secret was deleted, in UTC
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly deletedDate?: Date;
}

export interface ParsedKeyVaultEntityIdentifier {
  /** 
   * @member {string} [vaultUrl] The vault URI.
   */
  vaultUrl: string;
  /** 
   * @member {string} [version] The version of key/secret/certificate. May be undefined.
   */
  version?: string;
  /** 
   * @member {string} [name] The name of key/secret/certificate.
   */
  name: string;
}
