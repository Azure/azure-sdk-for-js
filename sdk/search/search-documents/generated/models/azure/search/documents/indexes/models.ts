// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { buildNewlineCollection } from "../../../../../static-helpers/serialization/build-newline-collection.js";
import { buildPipeCollection } from "../../../../../static-helpers/serialization/build-pipe-collection.js";
import { areAllPropsUndefined } from "../../../../../static-helpers/serialization/check-prop-undefined.js";
import { parseNewlineCollection } from "../../../../../static-helpers/serialization/parse-newline-collection.js";
import { parsePipeCollection } from "../../../../../static-helpers/serialization/parse-pipe-collection.js";
import { serializeRecord } from "../../../../../static-helpers/serialization/serialize-record.js";
import {
  knowledgeRetrievalReasoningEffortUnionSerializer,
  knowledgeRetrievalReasoningEffortUnionDeserializer,
  KnowledgeRetrievalReasoningEffortUnion,
  KnowledgeRetrievalOutputMode,
  KnowledgeSourceIngestionParameters,
  knowledgeSourceIngestionParametersSerializer,
  knowledgeSourceIngestionParametersDeserializer,
} from "../knowledgeBases/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Represents a synonym map definition. */
export interface SynonymMap {
  /** The name of the synonym map. */
  name: string;
  /** The format of the synonym map. Only the 'solr' format is currently supported. */
  format: "solr";
  /** A series of synonym rules in the specified synonym map format. The rules must be separated by newlines. */
  synonyms: string[];
  /** A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your data when you want full assurance that no one, not even Microsoft, can decrypt your data. Once you have encrypted your data, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your data will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019. */
  encryptionKey?: SearchResourceEncryptionKey;
  /** The ETag of the synonym map. */
  eTag?: string;
}

export function synonymMapSerializer(item: SynonymMap): any {
  return {
    name: item["name"],
    format: item["format"],
    synonyms: buildNewlineCollection(
      item["synonyms"].map((p: any) => {
        return p;
      }),
    ),
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    "@odata.etag": item["eTag"],
  };
}

export function synonymMapDeserializer(item: any): SynonymMap {
  return {
    name: item["name"],
    format: item["format"],
    synonyms: parseNewlineCollection(item["synonyms"]),
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    eTag: item["@odata.etag"],
  };
}

/** A customer-managed encryption key in Azure Key Vault. Keys that you create and manage can be used to encrypt or decrypt data-at-rest, such as indexes and synonym maps. */
export interface SearchResourceEncryptionKey {
  /** The name of your Azure Key Vault key to be used to encrypt your data at rest. */
  keyName: string;
  /** The version of your Azure Key Vault key to be used to encrypt your data at rest. */
  keyVersion?: string;
  /** The URI of your Azure Key Vault, also referred to as DNS name, that contains the key to be used to encrypt your data at rest. An example URI might be `https://my-keyvault-name.vault.azure.net`. */
  vaultUri: string;
  /** An explicit managed identity to use for this encryption key. If not specified and the access credentials property is null, the system-assigned managed identity is used. On update to the resource, if the explicit identity is unspecified, it remains unchanged. If "none" is specified, the value of this property is cleared. */
  identity?: SearchIndexerDataIdentityUnion;
  /** An AAD Application ID that was granted the required access permissions to the Azure Key Vault that is to be used when encrypting your data at rest. The Application ID should not be confused with the Object ID for your AAD Application. */
  applicationId?: string;
  /** The authentication key of the specified AAD application. */
  applicationSecret?: string;
}

export function searchResourceEncryptionKeySerializer(item: SearchResourceEncryptionKey): any {
  return {
    keyVaultKeyName: item["keyName"],
    keyVaultKeyVersion: item["keyVersion"],
    keyVaultUri: item["vaultUri"],
    accessCredentials: areAllPropsUndefined(item, ["applicationId", "applicationSecret"])
      ? undefined
      : _searchResourceEncryptionKeyAccessCredentialsSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionSerializer(item["identity"]),
  };
}

export function searchResourceEncryptionKeyDeserializer(item: any): SearchResourceEncryptionKey {
  return {
    keyName: item["keyVaultKeyName"],
    keyVersion: item["keyVaultKeyVersion"],
    vaultUri: item["keyVaultUri"],
    ...(!item["accessCredentials"]
      ? item["accessCredentials"]
      : _searchResourceEncryptionKeyAccessCredentialsDeserializer(item["accessCredentials"])),
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
  };
}

/** Credentials of a registered application created for your search service, used for authenticated access to the encryption keys stored in Azure Key Vault. */
export interface AzureActiveDirectoryApplicationCredentials {
  /** An AAD Application ID that was granted the required access permissions to the Azure Key Vault that is to be used when encrypting your data at rest. The Application ID should not be confused with the Object ID for your AAD Application. */
  applicationId: string;
  /** The authentication key of the specified AAD application. */
  applicationSecret?: string;
}

export function azureActiveDirectoryApplicationCredentialsSerializer(
  item: AzureActiveDirectoryApplicationCredentials,
): any {
  return { applicationId: item["applicationId"], applicationSecret: item["applicationSecret"] };
}

export function azureActiveDirectoryApplicationCredentialsDeserializer(
  item: any,
): AzureActiveDirectoryApplicationCredentials {
  return {
    applicationId: item["applicationId"],
    applicationSecret: item["applicationSecret"],
  };
}

/** Abstract base type for data identities. */
export interface SearchIndexerDataIdentity {
  /** A URI fragment specifying the type of identity. */
  /** The discriminator possible values: #Microsoft.Azure.Search.DataNoneIdentity, #Microsoft.Azure.Search.DataUserAssignedIdentity */
  odatatype: string;
}

export function searchIndexerDataIdentitySerializer(item: SearchIndexerDataIdentity): any {
  return { "@odata.type": item["odatatype"] };
}

export function searchIndexerDataIdentityDeserializer(item: any): SearchIndexerDataIdentity {
  return {
    odatatype: item["@odata.type"],
  };
}

/** Alias for SearchIndexerDataIdentityUnion */
export type SearchIndexerDataIdentityUnion =
  | SearchIndexerDataNoneIdentity
  | SearchIndexerDataUserAssignedIdentity
  | SearchIndexerDataIdentity;

export function searchIndexerDataIdentityUnionSerializer(
  item: SearchIndexerDataIdentityUnion,
): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.DataNoneIdentity":
      return searchIndexerDataNoneIdentitySerializer(item as SearchIndexerDataNoneIdentity);

    case "#Microsoft.Azure.Search.DataUserAssignedIdentity":
      return searchIndexerDataUserAssignedIdentitySerializer(
        item as SearchIndexerDataUserAssignedIdentity,
      );

    default:
      return searchIndexerDataIdentitySerializer(item);
  }
}

export function searchIndexerDataIdentityUnionDeserializer(
  item: any,
): SearchIndexerDataIdentityUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.DataNoneIdentity":
      return searchIndexerDataNoneIdentityDeserializer(item as SearchIndexerDataNoneIdentity);

    case "#Microsoft.Azure.Search.DataUserAssignedIdentity":
      return searchIndexerDataUserAssignedIdentityDeserializer(
        item as SearchIndexerDataUserAssignedIdentity,
      );

    default:
      return searchIndexerDataIdentityDeserializer(item);
  }
}

/** Clears the identity property of a datasource. */
export interface SearchIndexerDataNoneIdentity extends SearchIndexerDataIdentity {
  /** The discriminator for derived types. */
  odatatype: "#Microsoft.Azure.Search.DataNoneIdentity";
}

export function searchIndexerDataNoneIdentitySerializer(item: SearchIndexerDataNoneIdentity): any {
  return { "@odata.type": item["odatatype"] };
}

export function searchIndexerDataNoneIdentityDeserializer(
  item: any,
): SearchIndexerDataNoneIdentity {
  return {
    odatatype: item["@odata.type"],
  };
}

/** Specifies the identity for a datasource to use. */
export interface SearchIndexerDataUserAssignedIdentity extends SearchIndexerDataIdentity {
  /** The fully qualified Azure resource Id of a user assigned managed identity typically in the form "/subscriptions/12345678-1234-1234-1234-1234567890ab/resourceGroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId" that should have been assigned to the search service. */
  resourceId: string;
  /** A URI fragment specifying the type of identity. */
  odatatype: "#Microsoft.Azure.Search.DataUserAssignedIdentity";
}

export function searchIndexerDataUserAssignedIdentitySerializer(
  item: SearchIndexerDataUserAssignedIdentity,
): any {
  return { "@odata.type": item["odatatype"], userAssignedIdentity: item["resourceId"] };
}

export function searchIndexerDataUserAssignedIdentityDeserializer(
  item: any,
): SearchIndexerDataUserAssignedIdentity {
  return {
    odatatype: item["@odata.type"],
    resourceId: item["userAssignedIdentity"],
  };
}

/** Response from a List SynonymMaps request. If successful, it includes the full definitions of all synonym maps. */
export interface ListSynonymMapsResult {
  /** The synonym maps in the Search service. */
  readonly synonymMaps: SynonymMap[];
}

export function listSynonymMapsResultDeserializer(item: any): ListSynonymMapsResult {
  return {
    synonymMaps: synonymMapArrayDeserializer(item["value"]),
  };
}

export function synonymMapArraySerializer(result: Array<SynonymMap>): any[] {
  return result.map((item) => {
    return synonymMapSerializer(item);
  });
}

export function synonymMapArrayDeserializer(result: Array<SynonymMap>): any[] {
  return result.map((item) => {
    return synonymMapDeserializer(item);
  });
}

/** Represents a search index definition, which describes the fields and search behavior of an index. */
export interface SearchIndex {
  /** The name of the index. */
  name: string;
  /** The description of the index. */
  description?: string;
  /** The fields of the index. */
  fields: SearchField[];
  /** The scoring profiles for the index. */
  scoringProfiles?: ScoringProfile[];
  /** The name of the scoring profile to use if none is specified in the query. If this property is not set and no scoring profile is specified in the query, then default scoring (tf-idf) will be used. */
  defaultScoringProfile?: string;
  /** Options to control Cross-Origin Resource Sharing (CORS) for the index. */
  corsOptions?: CorsOptions;
  /** The suggesters for the index. */
  suggesters?: SearchSuggester[];
  /** The analyzers for the index. */
  analyzers?: LexicalAnalyzerUnion[];
  /** The tokenizers for the index. */
  tokenizers?: LexicalTokenizerUnion[];
  /** The token filters for the index. */
  tokenFilters?: TokenFilterUnion[];
  /** The character filters for the index. */
  charFilters?: CharFilterUnion[];
  /** The normalizers for the index. */
  normalizers?: LexicalNormalizerUnion[];
  /** A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your data when you want full assurance that no one, not even Microsoft, can decrypt your data. Once you have encrypted your data, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your data will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019. */
  encryptionKey?: SearchResourceEncryptionKey;
  /** The type of similarity algorithm to be used when scoring and ranking the documents matching a search query. The similarity algorithm can only be defined at index creation time and cannot be modified on existing indexes. If null, the ClassicSimilarity algorithm is used. */
  similarity?: SimilarityAlgorithmUnion;
  /** Defines parameters for a search index that influence semantic capabilities. */
  semanticSearch?: SemanticSearch;
  /** Contains configuration options related to vector search. */
  vectorSearch?: VectorSearch;
  /** A value indicating whether permission filtering is enabled for the index. */
  permissionFilterOption?: SearchIndexPermissionFilterOption;
  /** A value indicating whether Purview is enabled for the index. */
  purviewEnabled?: boolean;
  /** The ETag of the index. */
  eTag?: string;
}

export function searchIndexSerializer(item: SearchIndex): any {
  return {
    name: item["name"],
    description: item["description"],
    fields: searchFieldArraySerializer(item["fields"]),
    scoringProfiles: !item["scoringProfiles"]
      ? item["scoringProfiles"]
      : scoringProfileArraySerializer(item["scoringProfiles"]),
    defaultScoringProfile: item["defaultScoringProfile"],
    corsOptions: !item["corsOptions"]
      ? item["corsOptions"]
      : corsOptionsSerializer(item["corsOptions"]),
    suggesters: !item["suggesters"]
      ? item["suggesters"]
      : searchSuggesterArraySerializer(item["suggesters"]),
    analyzers: !item["analyzers"]
      ? item["analyzers"]
      : lexicalAnalyzerUnionArraySerializer(item["analyzers"]),
    tokenizers: !item["tokenizers"]
      ? item["tokenizers"]
      : lexicalTokenizerUnionArraySerializer(item["tokenizers"]),
    tokenFilters: !item["tokenFilters"]
      ? item["tokenFilters"]
      : tokenFilterUnionArraySerializer(item["tokenFilters"]),
    charFilters: !item["charFilters"]
      ? item["charFilters"]
      : charFilterUnionArraySerializer(item["charFilters"]),
    normalizers: !item["normalizers"]
      ? item["normalizers"]
      : lexicalNormalizerUnionArraySerializer(item["normalizers"]),
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    similarity: !item["similarity"]
      ? item["similarity"]
      : similarityAlgorithmUnionSerializer(item["similarity"]),
    semantic: !item["semanticSearch"]
      ? item["semanticSearch"]
      : semanticSearchSerializer(item["semanticSearch"]),
    vectorSearch: !item["vectorSearch"]
      ? item["vectorSearch"]
      : vectorSearchSerializer(item["vectorSearch"]),
    permissionFilterOption: item["permissionFilterOption"],
    purviewEnabled: item["purviewEnabled"],
    "@odata.etag": item["eTag"],
  };
}

export function searchIndexDeserializer(item: any): SearchIndex {
  return {
    name: item["name"],
    description: item["description"],
    fields: searchFieldArrayDeserializer(item["fields"]),
    scoringProfiles: !item["scoringProfiles"]
      ? item["scoringProfiles"]
      : scoringProfileArrayDeserializer(item["scoringProfiles"]),
    defaultScoringProfile: item["defaultScoringProfile"],
    corsOptions: !item["corsOptions"]
      ? item["corsOptions"]
      : corsOptionsDeserializer(item["corsOptions"]),
    suggesters: !item["suggesters"]
      ? item["suggesters"]
      : searchSuggesterArrayDeserializer(item["suggesters"]),
    analyzers: !item["analyzers"]
      ? item["analyzers"]
      : lexicalAnalyzerUnionArrayDeserializer(item["analyzers"]),
    tokenizers: !item["tokenizers"]
      ? item["tokenizers"]
      : lexicalTokenizerUnionArrayDeserializer(item["tokenizers"]),
    tokenFilters: !item["tokenFilters"]
      ? item["tokenFilters"]
      : tokenFilterUnionArrayDeserializer(item["tokenFilters"]),
    charFilters: !item["charFilters"]
      ? item["charFilters"]
      : charFilterUnionArrayDeserializer(item["charFilters"]),
    normalizers: !item["normalizers"]
      ? item["normalizers"]
      : lexicalNormalizerUnionArrayDeserializer(item["normalizers"]),
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    similarity: !item["similarity"]
      ? item["similarity"]
      : similarityAlgorithmUnionDeserializer(item["similarity"]),
    semanticSearch: !item["semantic"]
      ? item["semantic"]
      : semanticSearchDeserializer(item["semantic"]),
    vectorSearch: !item["vectorSearch"]
      ? item["vectorSearch"]
      : vectorSearchDeserializer(item["vectorSearch"]),
    permissionFilterOption: item["permissionFilterOption"],
    purviewEnabled: item["purviewEnabled"],
    eTag: item["@odata.etag"],
  };
}

export function searchFieldArraySerializer(result: Array<SearchField>): any[] {
  return result.map((item) => {
    return searchFieldSerializer(item);
  });
}

export function searchFieldArrayDeserializer(result: Array<SearchField>): any[] {
  return result.map((item) => {
    return searchFieldDeserializer(item);
  });
}

/** Represents a field in an index definition, which describes the name, data type, and search behavior of a field. */
export interface SearchField {
  /** The name of the field, which must be unique within the fields collection of the index or parent field. */
  name: string;
  /** The data type of the field. */
  type: SearchFieldDataType;
  /** A value indicating whether the field uniquely identifies documents in the index. Exactly one top-level field in each index must be chosen as the key field and it must be of type Edm.String. Key fields can be used to look up documents directly and update or delete specific documents. Default is false for simple fields and null for complex fields. */
  key?: boolean;
  /** A value indicating whether the field can be returned in a search result. You can disable this option if you want to use a field (for example, margin) as a filter, sorting, or scoring mechanism but do not want the field to be visible to the end user. This property must be true for key fields, and it must be null for complex fields. This property can be changed on existing fields. Enabling this property does not cause any increase in index storage requirements. Default is true for simple fields, false for vector fields, and null for complex fields. */
  retrievable?: boolean;
  /** An immutable value indicating whether the field will be persisted separately on disk to be returned in a search result. You can disable this option if you don't plan to return the field contents in a search response to save on storage overhead. This can only be set during index creation and only for vector fields. This property cannot be changed for existing fields or set as false for new fields. If this property is set as false, the property 'retrievable' must also be set to false. This property must be true or unset for key fields, for new fields, and for non-vector fields, and it must be null for complex fields. Disabling this property will reduce index storage requirements. The default is true for vector fields. */
  stored?: boolean;
  /** A value indicating whether the field is full-text searchable. This means it will undergo analysis such as word-breaking during indexing. If you set a searchable field to a value like "sunny day", internally it will be split into the individual tokens "sunny" and "day". This enables full-text searches for these terms. Fields of type Edm.String or Collection(Edm.String) are searchable by default. This property must be false for simple fields of other non-string data types, and it must be null for complex fields. Note: searchable fields consume extra space in your index to accommodate additional tokenized versions of the field value for full-text searches. If you want to save space in your index and you don't need a field to be included in searches, set searchable to false. */
  searchable?: boolean;
  /** A value indicating whether to enable the field to be referenced in $filter queries. filterable differs from searchable in how strings are handled. Fields of type Edm.String or Collection(Edm.String) that are filterable do not undergo word-breaking, so comparisons are for exact matches only. For example, if you set such a field f to "sunny day", $filter=f eq 'sunny' will find no matches, but $filter=f eq 'sunny day' will. This property must be null for complex fields. Default is true for simple fields and null for complex fields. */
  filterable?: boolean;
  /** A value indicating whether to enable the field to be referenced in $orderby expressions. By default, the search engine sorts results by score, but in many experiences users will want to sort by fields in the documents. A simple field can be sortable only if it is single-valued (it has a single value in the scope of the parent document). Simple collection fields cannot be sortable, since they are multi-valued. Simple sub-fields of complex collections are also multi-valued, and therefore cannot be sortable. This is true whether it's an immediate parent field, or an ancestor field, that's the complex collection. Complex fields cannot be sortable and the sortable property must be null for such fields. The default for sortable is true for single-valued simple fields, false for multi-valued simple fields, and null for complex fields. */
  sortable?: boolean;
  /** A value indicating whether to enable the field to be referenced in facet queries. Typically used in a presentation of search results that includes hit count by category (for example, search for digital cameras and see hits by brand, by megapixels, by price, and so on). This property must be null for complex fields. Fields of type Edm.GeographyPoint or Collection(Edm.GeographyPoint) cannot be facetable. Default is true for all other simple fields. */
  facetable?: boolean;
  /** A value indicating whether the field should be used as a permission filter. */
  permissionFilter?: PermissionFilter;
  /** A value indicating whether the field contains sensitivity label information. */
  sensitivityLabel?: boolean;
  /** The name of the analyzer to use for the field. This option can be used only with searchable fields and it can't be set together with either searchAnalyzer or indexAnalyzer. Once the analyzer is chosen, it cannot be changed for the field. Must be null for complex fields. */
  analyzerName?: LexicalAnalyzerName;
  /** The name of the analyzer used at search time for the field. This option can be used only with searchable fields. It must be set together with indexAnalyzer and it cannot be set together with the analyzer option. This property cannot be set to the name of a language analyzer; use the analyzer property instead if you need a language analyzer. This analyzer can be updated on an existing field. Must be null for complex fields. */
  searchAnalyzerName?: LexicalAnalyzerName;
  /** The name of the analyzer used at indexing time for the field. This option can be used only with searchable fields. It must be set together with searchAnalyzer and it cannot be set together with the analyzer option.  This property cannot be set to the name of a language analyzer; use the analyzer property instead if you need a language analyzer. Once the analyzer is chosen, it cannot be changed for the field. Must be null for complex fields. */
  indexAnalyzerName?: LexicalAnalyzerName;
  /** The name of the normalizer to use for the field. This option can be used only with fields with filterable, sortable, or facetable enabled. Once the normalizer is chosen, it cannot be changed for the field. Must be null for complex fields. */
  normalizerName?: LexicalNormalizerName;
  /** The dimensionality of the vector field. */
  vectorSearchDimensions?: number;
  /** The name of the vector search profile that specifies the algorithm and vectorizer to use when searching the vector field. */
  vectorSearchProfileName?: string;
  /** The encoding format to interpret the field contents. */
  vectorEncodingFormat?: VectorEncodingFormat;
  /** A list of the names of synonym maps to associate with this field. This option can be used only with searchable fields. Currently only one synonym map per field is supported. Assigning a synonym map to a field ensures that query terms targeting that field are expanded at query-time using the rules in the synonym map. This attribute can be changed on existing fields. Must be null or an empty collection for complex fields. */
  synonymMapNames?: string[];
  /** A list of sub-fields if this is a field of type Edm.ComplexType or Collection(Edm.ComplexType). Must be null or empty for simple fields. */
  fields?: SearchField[];
}

export function searchFieldSerializer(item: SearchField): any {
  return {
    name: item["name"],
    type: item["type"],
    key: item["key"],
    retrievable: item["retrievable"],
    stored: item["stored"],
    searchable: item["searchable"],
    filterable: item["filterable"],
    sortable: item["sortable"],
    facetable: item["facetable"],
    permissionFilter: item["permissionFilter"],
    sensitivityLabel: item["sensitivityLabel"],
    analyzer: item["analyzerName"],
    searchAnalyzer: item["searchAnalyzerName"],
    indexAnalyzer: item["indexAnalyzerName"],
    normalizer: item["normalizerName"],
    dimensions: item["vectorSearchDimensions"],
    vectorSearchProfile: item["vectorSearchProfileName"],
    vectorEncoding: item["vectorEncodingFormat"],
    synonymMaps: !item["synonymMapNames"]
      ? item["synonymMapNames"]
      : item["synonymMapNames"].map((p: any) => {
          return p;
        }),
    fields: !item["fields"] ? item["fields"] : searchFieldArraySerializer(item["fields"]),
  };
}

export function searchFieldDeserializer(item: any): SearchField {
  return {
    name: item["name"],
    type: item["type"],
    key: item["key"],
    retrievable: item["retrievable"],
    stored: item["stored"],
    searchable: item["searchable"],
    filterable: item["filterable"],
    sortable: item["sortable"],
    facetable: item["facetable"],
    permissionFilter: item["permissionFilter"],
    sensitivityLabel: item["sensitivityLabel"],
    analyzerName: item["analyzer"],
    searchAnalyzerName: item["searchAnalyzer"],
    indexAnalyzerName: item["indexAnalyzer"],
    normalizerName: item["normalizer"],
    vectorSearchDimensions: item["dimensions"],
    vectorSearchProfileName: item["vectorSearchProfile"],
    vectorEncodingFormat: item["vectorEncoding"],
    synonymMapNames: !item["synonymMaps"]
      ? item["synonymMaps"]
      : item["synonymMaps"].map((p: any) => {
          return p;
        }),
    fields: !item["fields"] ? item["fields"] : searchFieldArrayDeserializer(item["fields"]),
  };
}

/** Defines the data type of a field in a search index. */
export enum KnownSearchFieldDataType {
  /** Indicates that a field contains a string. */
  String = "Edm.String",
  /** Indicates that a field contains a 32-bit signed integer. */
  Int32 = "Edm.Int32",
  /** Indicates that a field contains a 64-bit signed integer. */
  Int64 = "Edm.Int64",
  /** Indicates that a field contains an IEEE double-precision floating point number. */
  Double = "Edm.Double",
  /** Indicates that a field contains a Boolean value (true or false). */
  Boolean = "Edm.Boolean",
  /** Indicates that a field contains a date/time value, including timezone information. */
  DateTimeOffset = "Edm.DateTimeOffset",
  /** Indicates that a field contains a geo-location in terms of longitude and latitude. */
  GeographyPoint = "Edm.GeographyPoint",
  /** Indicates that a field contains one or more complex objects that in turn have sub-fields of other types. */
  Complex = "Edm.ComplexType",
  /** Indicates that a field contains a single-precision floating point number. This is only valid when used with Collection(Edm.Single). */
  Single = "Edm.Single",
  /** Indicates that a field contains a half-precision floating point number. This is only valid when used with Collection(Edm.Half). */
  Half = "Edm.Half",
  /** Indicates that a field contains a 16-bit signed integer. This is only valid when used with Collection(Edm.Int16). */
  Int16 = "Edm.Int16",
  /** Indicates that a field contains a 8-bit signed integer. This is only valid when used with Collection(Edm.SByte). */
  SByte = "Edm.SByte",
  /** Indicates that a field contains a 8-bit unsigned integer. This is only valid when used with Collection(Edm.Byte). */
  Byte = "Edm.Byte",
}

/**
 * Defines the data type of a field in a search index. \
 * {@link KnownSearchFieldDataType} can be used interchangeably with SearchFieldDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Edm.String**: Indicates that a field contains a string. \
 * **Edm.Int32**: Indicates that a field contains a 32-bit signed integer. \
 * **Edm.Int64**: Indicates that a field contains a 64-bit signed integer. \
 * **Edm.Double**: Indicates that a field contains an IEEE double-precision floating point number. \
 * **Edm.Boolean**: Indicates that a field contains a Boolean value (true or false). \
 * **Edm.DateTimeOffset**: Indicates that a field contains a date\/time value, including timezone information. \
 * **Edm.GeographyPoint**: Indicates that a field contains a geo-location in terms of longitude and latitude. \
 * **Edm.ComplexType**: Indicates that a field contains one or more complex objects that in turn have sub-fields of other types. \
 * **Edm.Single**: Indicates that a field contains a single-precision floating point number. This is only valid when used with Collection(Edm.Single). \
 * **Edm.Half**: Indicates that a field contains a half-precision floating point number. This is only valid when used with Collection(Edm.Half). \
 * **Edm.Int16**: Indicates that a field contains a 16-bit signed integer. This is only valid when used with Collection(Edm.Int16). \
 * **Edm.SByte**: Indicates that a field contains a 8-bit signed integer. This is only valid when used with Collection(Edm.SByte). \
 * **Edm.Byte**: Indicates that a field contains a 8-bit unsigned integer. This is only valid when used with Collection(Edm.Byte).
 */
export type SearchFieldDataType = string;

/** A value indicating whether the field should be used as a permission filter. */
export enum KnownPermissionFilter {
  /** Field represents user IDs that should be used to filter document access on queries. */
  UserIds = "userIds",
  /** Field represents group IDs that should be used to filter document access on queries. */
  GroupIds = "groupIds",
  /** Field represents an RBAC scope that should be used to filter document access on queries. */
  RbacScope = "rbacScope",
}

/**
 * A value indicating whether the field should be used as a permission filter. \
 * {@link KnownPermissionFilter} can be used interchangeably with PermissionFilter,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **userIds**: Field represents user IDs that should be used to filter document access on queries. \
 * **groupIds**: Field represents group IDs that should be used to filter document access on queries. \
 * **rbacScope**: Field represents an RBAC scope that should be used to filter document access on queries.
 */
export type PermissionFilter = string;

/** Defines the names of all text analyzers supported by the search engine. */
export enum KnownLexicalAnalyzerName {
  /** Microsoft analyzer for Arabic. */
  ArMicrosoft = "ar.microsoft",
  /** Lucene analyzer for Arabic. */
  ArLucene = "ar.lucene",
  /** Lucene analyzer for Armenian. */
  HyLucene = "hy.lucene",
  /** Microsoft analyzer for Bangla. */
  BnMicrosoft = "bn.microsoft",
  /** Lucene analyzer for Basque. */
  EuLucene = "eu.lucene",
  /** Microsoft analyzer for Bulgarian. */
  BgMicrosoft = "bg.microsoft",
  /** Lucene analyzer for Bulgarian. */
  BgLucene = "bg.lucene",
  /** Microsoft analyzer for Catalan. */
  CaMicrosoft = "ca.microsoft",
  /** Lucene analyzer for Catalan. */
  CaLucene = "ca.lucene",
  /** Microsoft analyzer for Chinese (Simplified). */
  ZhHansMicrosoft = "zh-Hans.microsoft",
  /** Lucene analyzer for Chinese (Simplified). */
  ZhHansLucene = "zh-Hans.lucene",
  /** Microsoft analyzer for Chinese (Traditional). */
  ZhHantMicrosoft = "zh-Hant.microsoft",
  /** Lucene analyzer for Chinese (Traditional). */
  ZhHantLucene = "zh-Hant.lucene",
  /** Microsoft analyzer for Croatian. */
  HrMicrosoft = "hr.microsoft",
  /** Microsoft analyzer for Czech. */
  CsMicrosoft = "cs.microsoft",
  /** Lucene analyzer for Czech. */
  CsLucene = "cs.lucene",
  /** Microsoft analyzer for Danish. */
  DaMicrosoft = "da.microsoft",
  /** Lucene analyzer for Danish. */
  DaLucene = "da.lucene",
  /** Microsoft analyzer for Dutch. */
  NlMicrosoft = "nl.microsoft",
  /** Lucene analyzer for Dutch. */
  NlLucene = "nl.lucene",
  /** Microsoft analyzer for English. */
  EnMicrosoft = "en.microsoft",
  /** Lucene analyzer for English. */
  EnLucene = "en.lucene",
  /** Microsoft analyzer for Estonian. */
  EtMicrosoft = "et.microsoft",
  /** Microsoft analyzer for Finnish. */
  FiMicrosoft = "fi.microsoft",
  /** Lucene analyzer for Finnish. */
  FiLucene = "fi.lucene",
  /** Microsoft analyzer for French. */
  FrMicrosoft = "fr.microsoft",
  /** Lucene analyzer for French. */
  FrLucene = "fr.lucene",
  /** Lucene analyzer for Galician. */
  GlLucene = "gl.lucene",
  /** Microsoft analyzer for German. */
  DeMicrosoft = "de.microsoft",
  /** Lucene analyzer for German. */
  DeLucene = "de.lucene",
  /** Microsoft analyzer for Greek. */
  ElMicrosoft = "el.microsoft",
  /** Lucene analyzer for Greek. */
  ElLucene = "el.lucene",
  /** Microsoft analyzer for Gujarati. */
  GuMicrosoft = "gu.microsoft",
  /** Microsoft analyzer for Hebrew. */
  HeMicrosoft = "he.microsoft",
  /** Microsoft analyzer for Hindi. */
  HiMicrosoft = "hi.microsoft",
  /** Lucene analyzer for Hindi. */
  HiLucene = "hi.lucene",
  /** Microsoft analyzer for Hungarian. */
  HuMicrosoft = "hu.microsoft",
  /** Lucene analyzer for Hungarian. */
  HuLucene = "hu.lucene",
  /** Microsoft analyzer for Icelandic. */
  IsMicrosoft = "is.microsoft",
  /** Microsoft analyzer for Indonesian (Bahasa). */
  IdMicrosoft = "id.microsoft",
  /** Lucene analyzer for Indonesian. */
  IdLucene = "id.lucene",
  /** Lucene analyzer for Irish. */
  GaLucene = "ga.lucene",
  /** Microsoft analyzer for Italian. */
  ItMicrosoft = "it.microsoft",
  /** Lucene analyzer for Italian. */
  ItLucene = "it.lucene",
  /** Microsoft analyzer for Japanese. */
  JaMicrosoft = "ja.microsoft",
  /** Lucene analyzer for Japanese. */
  JaLucene = "ja.lucene",
  /** Microsoft analyzer for Kannada. */
  KnMicrosoft = "kn.microsoft",
  /** Microsoft analyzer for Korean. */
  KoMicrosoft = "ko.microsoft",
  /** Lucene analyzer for Korean. */
  KoLucene = "ko.lucene",
  /** Microsoft analyzer for Latvian. */
  LvMicrosoft = "lv.microsoft",
  /** Lucene analyzer for Latvian. */
  LvLucene = "lv.lucene",
  /** Microsoft analyzer for Lithuanian. */
  LtMicrosoft = "lt.microsoft",
  /** Microsoft analyzer for Malayalam. */
  MlMicrosoft = "ml.microsoft",
  /** Microsoft analyzer for Malay (Latin). */
  MsMicrosoft = "ms.microsoft",
  /** Microsoft analyzer for Marathi. */
  MrMicrosoft = "mr.microsoft",
  /** Microsoft analyzer for Norwegian (BokmÃ¥l). */
  NbMicrosoft = "nb.microsoft",
  /** Lucene analyzer for Norwegian. */
  NoLucene = "no.lucene",
  /** Lucene analyzer for Persian. */
  FaLucene = "fa.lucene",
  /** Microsoft analyzer for Polish. */
  PlMicrosoft = "pl.microsoft",
  /** Lucene analyzer for Polish. */
  PlLucene = "pl.lucene",
  /** Microsoft analyzer for Portuguese (Brazil). */
  PtBrMicrosoft = "pt-BR.microsoft",
  /** Lucene analyzer for Portuguese (Brazil). */
  PtBrLucene = "pt-BR.lucene",
  /** Microsoft analyzer for Portuguese (Portugal). */
  PtPtMicrosoft = "pt-PT.microsoft",
  /** Lucene analyzer for Portuguese (Portugal). */
  PtPtLucene = "pt-PT.lucene",
  /** Microsoft analyzer for Punjabi. */
  PaMicrosoft = "pa.microsoft",
  /** Microsoft analyzer for Romanian. */
  RoMicrosoft = "ro.microsoft",
  /** Lucene analyzer for Romanian. */
  RoLucene = "ro.lucene",
  /** Microsoft analyzer for Russian. */
  RuMicrosoft = "ru.microsoft",
  /** Lucene analyzer for Russian. */
  RuLucene = "ru.lucene",
  /** Microsoft analyzer for Serbian (Cyrillic). */
  SrCyrillicMicrosoft = "sr-cyrillic.microsoft",
  /** Microsoft analyzer for Serbian (Latin). */
  SrLatinMicrosoft = "sr-latin.microsoft",
  /** Microsoft analyzer for Slovak. */
  SkMicrosoft = "sk.microsoft",
  /** Microsoft analyzer for Slovenian. */
  SlMicrosoft = "sl.microsoft",
  /** Microsoft analyzer for Spanish. */
  EsMicrosoft = "es.microsoft",
  /** Lucene analyzer for Spanish. */
  EsLucene = "es.lucene",
  /** Microsoft analyzer for Swedish. */
  SvMicrosoft = "sv.microsoft",
  /** Lucene analyzer for Swedish. */
  SvLucene = "sv.lucene",
  /** Microsoft analyzer for Tamil. */
  TaMicrosoft = "ta.microsoft",
  /** Microsoft analyzer for Telugu. */
  TeMicrosoft = "te.microsoft",
  /** Microsoft analyzer for Thai. */
  ThMicrosoft = "th.microsoft",
  /** Lucene analyzer for Thai. */
  ThLucene = "th.lucene",
  /** Microsoft analyzer for Turkish. */
  TrMicrosoft = "tr.microsoft",
  /** Lucene analyzer for Turkish. */
  TrLucene = "tr.lucene",
  /** Microsoft analyzer for Ukrainian. */
  UkMicrosoft = "uk.microsoft",
  /** Microsoft analyzer for Urdu. */
  UrMicrosoft = "ur.microsoft",
  /** Microsoft analyzer for Vietnamese. */
  ViMicrosoft = "vi.microsoft",
  /** Standard Lucene analyzer. */
  StandardLucene = "standard.lucene",
  /** Standard ASCII Folding Lucene analyzer. See https://learn.microsoft.com/rest/api/searchservice/Custom-analyzers-in-Azure-Search#Analyzers */
  StandardAsciiFoldingLucene = "standardasciifolding.lucene",
  /** Treats the entire content of a field as a single token. This is useful for data like zip codes, ids, and some product names. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/KeywordAnalyzer.html */
  Keyword = "keyword",
  /** Flexibly separates text into terms via a regular expression pattern. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/PatternAnalyzer.html */
  Pattern = "pattern",
  /** Divides text at non-letters and converts them to lower case. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/SimpleAnalyzer.html */
  Simple = "simple",
  /** Divides text at non-letters; Applies the lowercase and stopword token filters. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/StopAnalyzer.html */
  Stop = "stop",
  /** An analyzer that uses the whitespace tokenizer. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/WhitespaceAnalyzer.html */
  Whitespace = "whitespace",
}

/**
 * Defines the names of all text analyzers supported by the search engine. \
 * {@link KnownLexicalAnalyzerName} can be used interchangeably with LexicalAnalyzerName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ar.microsoft**: Microsoft analyzer for Arabic. \
 * **ar.lucene**: Lucene analyzer for Arabic. \
 * **hy.lucene**: Lucene analyzer for Armenian. \
 * **bn.microsoft**: Microsoft analyzer for Bangla. \
 * **eu.lucene**: Lucene analyzer for Basque. \
 * **bg.microsoft**: Microsoft analyzer for Bulgarian. \
 * **bg.lucene**: Lucene analyzer for Bulgarian. \
 * **ca.microsoft**: Microsoft analyzer for Catalan. \
 * **ca.lucene**: Lucene analyzer for Catalan. \
 * **zh-Hans.microsoft**: Microsoft analyzer for Chinese (Simplified). \
 * **zh-Hans.lucene**: Lucene analyzer for Chinese (Simplified). \
 * **zh-Hant.microsoft**: Microsoft analyzer for Chinese (Traditional). \
 * **zh-Hant.lucene**: Lucene analyzer for Chinese (Traditional). \
 * **hr.microsoft**: Microsoft analyzer for Croatian. \
 * **cs.microsoft**: Microsoft analyzer for Czech. \
 * **cs.lucene**: Lucene analyzer for Czech. \
 * **da.microsoft**: Microsoft analyzer for Danish. \
 * **da.lucene**: Lucene analyzer for Danish. \
 * **nl.microsoft**: Microsoft analyzer for Dutch. \
 * **nl.lucene**: Lucene analyzer for Dutch. \
 * **en.microsoft**: Microsoft analyzer for English. \
 * **en.lucene**: Lucene analyzer for English. \
 * **et.microsoft**: Microsoft analyzer for Estonian. \
 * **fi.microsoft**: Microsoft analyzer for Finnish. \
 * **fi.lucene**: Lucene analyzer for Finnish. \
 * **fr.microsoft**: Microsoft analyzer for French. \
 * **fr.lucene**: Lucene analyzer for French. \
 * **gl.lucene**: Lucene analyzer for Galician. \
 * **de.microsoft**: Microsoft analyzer for German. \
 * **de.lucene**: Lucene analyzer for German. \
 * **el.microsoft**: Microsoft analyzer for Greek. \
 * **el.lucene**: Lucene analyzer for Greek. \
 * **gu.microsoft**: Microsoft analyzer for Gujarati. \
 * **he.microsoft**: Microsoft analyzer for Hebrew. \
 * **hi.microsoft**: Microsoft analyzer for Hindi. \
 * **hi.lucene**: Lucene analyzer for Hindi. \
 * **hu.microsoft**: Microsoft analyzer for Hungarian. \
 * **hu.lucene**: Lucene analyzer for Hungarian. \
 * **is.microsoft**: Microsoft analyzer for Icelandic. \
 * **id.microsoft**: Microsoft analyzer for Indonesian (Bahasa). \
 * **id.lucene**: Lucene analyzer for Indonesian. \
 * **ga.lucene**: Lucene analyzer for Irish. \
 * **it.microsoft**: Microsoft analyzer for Italian. \
 * **it.lucene**: Lucene analyzer for Italian. \
 * **ja.microsoft**: Microsoft analyzer for Japanese. \
 * **ja.lucene**: Lucene analyzer for Japanese. \
 * **kn.microsoft**: Microsoft analyzer for Kannada. \
 * **ko.microsoft**: Microsoft analyzer for Korean. \
 * **ko.lucene**: Lucene analyzer for Korean. \
 * **lv.microsoft**: Microsoft analyzer for Latvian. \
 * **lv.lucene**: Lucene analyzer for Latvian. \
 * **lt.microsoft**: Microsoft analyzer for Lithuanian. \
 * **ml.microsoft**: Microsoft analyzer for Malayalam. \
 * **ms.microsoft**: Microsoft analyzer for Malay (Latin). \
 * **mr.microsoft**: Microsoft analyzer for Marathi. \
 * **nb.microsoft**: Microsoft analyzer for Norwegian (BokmÃ¥l). \
 * **no.lucene**: Lucene analyzer for Norwegian. \
 * **fa.lucene**: Lucene analyzer for Persian. \
 * **pl.microsoft**: Microsoft analyzer for Polish. \
 * **pl.lucene**: Lucene analyzer for Polish. \
 * **pt-BR.microsoft**: Microsoft analyzer for Portuguese (Brazil). \
 * **pt-BR.lucene**: Lucene analyzer for Portuguese (Brazil). \
 * **pt-PT.microsoft**: Microsoft analyzer for Portuguese (Portugal). \
 * **pt-PT.lucene**: Lucene analyzer for Portuguese (Portugal). \
 * **pa.microsoft**: Microsoft analyzer for Punjabi. \
 * **ro.microsoft**: Microsoft analyzer for Romanian. \
 * **ro.lucene**: Lucene analyzer for Romanian. \
 * **ru.microsoft**: Microsoft analyzer for Russian. \
 * **ru.lucene**: Lucene analyzer for Russian. \
 * **sr-cyrillic.microsoft**: Microsoft analyzer for Serbian (Cyrillic). \
 * **sr-latin.microsoft**: Microsoft analyzer for Serbian (Latin). \
 * **sk.microsoft**: Microsoft analyzer for Slovak. \
 * **sl.microsoft**: Microsoft analyzer for Slovenian. \
 * **es.microsoft**: Microsoft analyzer for Spanish. \
 * **es.lucene**: Lucene analyzer for Spanish. \
 * **sv.microsoft**: Microsoft analyzer for Swedish. \
 * **sv.lucene**: Lucene analyzer for Swedish. \
 * **ta.microsoft**: Microsoft analyzer for Tamil. \
 * **te.microsoft**: Microsoft analyzer for Telugu. \
 * **th.microsoft**: Microsoft analyzer for Thai. \
 * **th.lucene**: Lucene analyzer for Thai. \
 * **tr.microsoft**: Microsoft analyzer for Turkish. \
 * **tr.lucene**: Lucene analyzer for Turkish. \
 * **uk.microsoft**: Microsoft analyzer for Ukrainian. \
 * **ur.microsoft**: Microsoft analyzer for Urdu. \
 * **vi.microsoft**: Microsoft analyzer for Vietnamese. \
 * **standard.lucene**: Standard Lucene analyzer. \
 * **standardasciifolding.lucene**: Standard ASCII Folding Lucene analyzer. See https:\//learn.microsoft.com\/rest\/api\/searchservice\/Custom-analyzers-in-Azure-Search#Analyzers \
 * **keyword**: Treats the entire content of a field as a single token. This is useful for data like zip codes, ids, and some product names. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/KeywordAnalyzer.html \
 * **pattern**: Flexibly separates text into terms via a regular expression pattern. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/PatternAnalyzer.html \
 * **simple**: Divides text at non-letters and converts them to lower case. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/SimpleAnalyzer.html \
 * **stop**: Divides text at non-letters; Applies the lowercase and stopword token filters. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/StopAnalyzer.html \
 * **whitespace**: An analyzer that uses the whitespace tokenizer. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/WhitespaceAnalyzer.html
 */
export type LexicalAnalyzerName = string;

/** Defines the names of all text normalizers supported by the search engine. */
export enum KnownLexicalNormalizerName {
  /** Converts alphabetic, numeric, and symbolic Unicode characters which are not in the first 127 ASCII characters (the "Basic Latin" Unicode block) into their ASCII equivalents, if such equivalents exist. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ASCIIFoldingFilter.html */
  AsciiFolding = "asciifolding",
  /** Removes elisions. For example, "l'avion" (the plane) will be converted to "avion" (plane). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/util/ElisionFilter.html */
  Elision = "elision",
  /** Normalizes token text to lowercase. See https://lucene.apache.org/core/6_6_1/analyzers-common/org/apache/lucene/analysis/core/LowerCaseFilter.html */
  Lowercase = "lowercase",
  /** Standard normalizer, which consists of lowercase and asciifolding. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/reverse/ReverseStringFilter.html */
  Standard = "standard",
  /** Normalizes token text to uppercase. See https://lucene.apache.org/core/6_6_1/analyzers-common/org/apache/lucene/analysis/core/UpperCaseFilter.html */
  Uppercase = "uppercase",
}

/**
 * Defines the names of all text normalizers supported by the search engine. \
 * {@link KnownLexicalNormalizerName} can be used interchangeably with LexicalNormalizerName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **asciifolding**: Converts alphabetic, numeric, and symbolic Unicode characters which are not in the first 127 ASCII characters (the "Basic Latin" Unicode block) into their ASCII equivalents, if such equivalents exist. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/ASCIIFoldingFilter.html \
 * **elision**: Removes elisions. For example, "l'avion" (the plane) will be converted to "avion" (plane). See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/util\/ElisionFilter.html \
 * **lowercase**: Normalizes token text to lowercase. See https:\//lucene.apache.org\/core\/6_6_1\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/LowerCaseFilter.html \
 * **standard**: Standard normalizer, which consists of lowercase and asciifolding. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/reverse\/ReverseStringFilter.html \
 * **uppercase**: Normalizes token text to uppercase. See https:\//lucene.apache.org\/core\/6_6_1\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/UpperCaseFilter.html
 */
export type LexicalNormalizerName = string;

/** The encoding format for interpreting vector field contents. */
export enum KnownVectorEncodingFormat {
  /** Encoding format representing bits packed into a wider data type. */
  PackedBit = "packedBit",
}

/**
 * The encoding format for interpreting vector field contents. \
 * {@link KnownVectorEncodingFormat} can be used interchangeably with VectorEncodingFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **packedBit**: Encoding format representing bits packed into a wider data type.
 */
export type VectorEncodingFormat = string;

export function scoringProfileArraySerializer(result: Array<ScoringProfile>): any[] {
  return result.map((item) => {
    return scoringProfileSerializer(item);
  });
}

export function scoringProfileArrayDeserializer(result: Array<ScoringProfile>): any[] {
  return result.map((item) => {
    return scoringProfileDeserializer(item);
  });
}

/** Defines parameters for a search index that influence scoring in search queries. */
export interface ScoringProfile {
  /** The name of the scoring profile. */
  name: string;
  /** Parameters that boost scoring based on text matches in certain index fields. */
  textWeights?: TextWeights;
  /** The collection of functions that influence the scoring of documents. */
  functions?: ScoringFunctionUnion[];
  /** A value indicating how the results of individual scoring functions should be combined. Defaults to "Sum". Ignored if there are no scoring functions. */
  functionAggregation?: ScoringFunctionAggregation;
}

export function scoringProfileSerializer(item: ScoringProfile): any {
  return {
    name: item["name"],
    text: !item["textWeights"] ? item["textWeights"] : textWeightsSerializer(item["textWeights"]),
    functions: !item["functions"]
      ? item["functions"]
      : scoringFunctionUnionArraySerializer(item["functions"]),
    functionAggregation: item["functionAggregation"],
  };
}

export function scoringProfileDeserializer(item: any): ScoringProfile {
  return {
    name: item["name"],
    textWeights: !item["text"] ? item["text"] : textWeightsDeserializer(item["text"]),
    functions: !item["functions"]
      ? item["functions"]
      : scoringFunctionUnionArrayDeserializer(item["functions"]),
    functionAggregation: item["functionAggregation"],
  };
}

/** Defines weights on index fields for which matches should boost scoring in search queries. */
export interface TextWeights {
  /** The dictionary of per-field weights to boost document scoring. The keys are field names and the values are the weights for each field. */
  weights: Record<string, number>;
}

export function textWeightsSerializer(item: TextWeights): any {
  return { weights: item["weights"] };
}

export function textWeightsDeserializer(item: any): TextWeights {
  return {
    weights: Object.fromEntries(
      Object.entries(item["weights"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

export function scoringFunctionUnionArraySerializer(result: Array<ScoringFunctionUnion>): any[] {
  return result.map((item) => {
    return scoringFunctionUnionSerializer(item);
  });
}

export function scoringFunctionUnionArrayDeserializer(result: Array<ScoringFunctionUnion>): any[] {
  return result.map((item) => {
    return scoringFunctionUnionDeserializer(item);
  });
}

/** Base type for functions that can modify document scores during ranking. */
export interface ScoringFunction {
  /** The name of the field used as input to the scoring function. */
  fieldName: string;
  /** A multiplier for the raw score. Must be a positive number not equal to 1.0. */
  boost: number;
  /** A value indicating how boosting will be interpolated across document scores; defaults to "Linear". */
  interpolation?: ScoringFunctionInterpolation;
  /** Type of ScoringFunction. */
  /** The discriminator possible values: distance, freshness, magnitude, tag */
  type: string;
}

export function scoringFunctionSerializer(item: ScoringFunction): any {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
  };
}

export function scoringFunctionDeserializer(item: any): ScoringFunction {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
  };
}

/** Alias for ScoringFunctionUnion */
export type ScoringFunctionUnion =
  | DistanceScoringFunction
  | FreshnessScoringFunction
  | MagnitudeScoringFunction
  | TagScoringFunction
  | ScoringFunction;

export function scoringFunctionUnionSerializer(item: ScoringFunctionUnion): any {
  switch (item.type) {
    case "distance":
      return distanceScoringFunctionSerializer(item as DistanceScoringFunction);

    case "freshness":
      return freshnessScoringFunctionSerializer(item as FreshnessScoringFunction);

    case "magnitude":
      return magnitudeScoringFunctionSerializer(item as MagnitudeScoringFunction);

    case "tag":
      return tagScoringFunctionSerializer(item as TagScoringFunction);

    default:
      return scoringFunctionSerializer(item);
  }
}

export function scoringFunctionUnionDeserializer(item: any): ScoringFunctionUnion {
  switch (item["type"]) {
    case "distance":
      return distanceScoringFunctionDeserializer(item as DistanceScoringFunction);

    case "freshness":
      return freshnessScoringFunctionDeserializer(item as FreshnessScoringFunction);

    case "magnitude":
      return magnitudeScoringFunctionDeserializer(item as MagnitudeScoringFunction);

    case "tag":
      return tagScoringFunctionDeserializer(item as TagScoringFunction);

    default:
      return scoringFunctionDeserializer(item);
  }
}

/** Defines the function used to interpolate score boosting across a range of documents. */
export type ScoringFunctionInterpolation = "linear" | "constant" | "quadratic" | "logarithmic";

/** Defines a function that boosts scores based on distance from a geographic location. */
export interface DistanceScoringFunction extends ScoringFunction {
  /** Parameter values for the distance scoring function. */
  parameters: DistanceScoringParameters;
  /** Indicates the type of function to use. Valid values include magnitude, freshness, distance, and tag. The function type must be lower case. */
  type: "distance";
}

export function distanceScoringFunctionSerializer(item: DistanceScoringFunction): any {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
    distance: distanceScoringParametersSerializer(item["parameters"]),
  };
}

export function distanceScoringFunctionDeserializer(item: any): DistanceScoringFunction {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
    parameters: distanceScoringParametersDeserializer(item["distance"]),
  };
}

/** Provides parameter values to a distance scoring function. */
export interface DistanceScoringParameters {
  /** The name of the parameter passed in search queries to specify the reference location. */
  referencePointParameter: string;
  /** The distance in kilometers from the reference location where the boosting range ends. */
  boostingDistance: number;
}

export function distanceScoringParametersSerializer(item: DistanceScoringParameters): any {
  return {
    referencePointParameter: item["referencePointParameter"],
    boostingDistance: item["boostingDistance"],
  };
}

export function distanceScoringParametersDeserializer(item: any): DistanceScoringParameters {
  return {
    referencePointParameter: item["referencePointParameter"],
    boostingDistance: item["boostingDistance"],
  };
}

/** Defines a function that boosts scores based on the value of a date-time field. */
export interface FreshnessScoringFunction extends ScoringFunction {
  /** Parameter values for the freshness scoring function. */
  parameters: FreshnessScoringParameters;
  /** Indicates the type of function to use. Valid values include magnitude, freshness, distance, and tag. The function type must be lower case. */
  type: "freshness";
}

export function freshnessScoringFunctionSerializer(item: FreshnessScoringFunction): any {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
    freshness: freshnessScoringParametersSerializer(item["parameters"]),
  };
}

export function freshnessScoringFunctionDeserializer(item: any): FreshnessScoringFunction {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
    parameters: freshnessScoringParametersDeserializer(item["freshness"]),
  };
}

/** Provides parameter values to a freshness scoring function. */
export interface FreshnessScoringParameters {
  /** The expiration period after which boosting will stop for a particular document. */
  boostingDuration: string;
}

export function freshnessScoringParametersSerializer(item: FreshnessScoringParameters): any {
  return { boostingDuration: item["boostingDuration"] };
}

export function freshnessScoringParametersDeserializer(item: any): FreshnessScoringParameters {
  return {
    boostingDuration: item["boostingDuration"],
  };
}

/** Defines a function that boosts scores based on the magnitude of a numeric field. */
export interface MagnitudeScoringFunction extends ScoringFunction {
  /** Parameter values for the magnitude scoring function. */
  parameters: MagnitudeScoringParameters;
  /** Indicates the type of function to use. Valid values include magnitude, freshness, distance, and tag. The function type must be lower case. */
  type: "magnitude";
}

export function magnitudeScoringFunctionSerializer(item: MagnitudeScoringFunction): any {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
    magnitude: magnitudeScoringParametersSerializer(item["parameters"]),
  };
}

export function magnitudeScoringFunctionDeserializer(item: any): MagnitudeScoringFunction {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
    parameters: magnitudeScoringParametersDeserializer(item["magnitude"]),
  };
}

/** Provides parameter values to a magnitude scoring function. */
export interface MagnitudeScoringParameters {
  /** The field value at which boosting starts. */
  boostingRangeStart: number;
  /** The field value at which boosting ends. */
  boostingRangeEnd: number;
  /** A value indicating whether to apply a constant boost for field values beyond the range end value; default is false. */
  shouldBoostBeyondRangeByConstant?: boolean;
}

export function magnitudeScoringParametersSerializer(item: MagnitudeScoringParameters): any {
  return {
    boostingRangeStart: item["boostingRangeStart"],
    boostingRangeEnd: item["boostingRangeEnd"],
    constantBoostBeyondRange: item["shouldBoostBeyondRangeByConstant"],
  };
}

export function magnitudeScoringParametersDeserializer(item: any): MagnitudeScoringParameters {
  return {
    boostingRangeStart: item["boostingRangeStart"],
    boostingRangeEnd: item["boostingRangeEnd"],
    shouldBoostBeyondRangeByConstant: item["constantBoostBeyondRange"],
  };
}

/** Defines a function that boosts scores of documents with string values matching a given list of tags. */
export interface TagScoringFunction extends ScoringFunction {
  /** Parameter values for the tag scoring function. */
  parameters: TagScoringParameters;
  /** Indicates the type of function to use. Valid values include magnitude, freshness, distance, and tag. The function type must be lower case. */
  type: "tag";
}

export function tagScoringFunctionSerializer(item: TagScoringFunction): any {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
    tag: tagScoringParametersSerializer(item["parameters"]),
  };
}

export function tagScoringFunctionDeserializer(item: any): TagScoringFunction {
  return {
    fieldName: item["fieldName"],
    boost: item["boost"],
    interpolation: item["interpolation"],
    type: item["type"],
    parameters: tagScoringParametersDeserializer(item["tag"]),
  };
}

/** Provides parameter values to a tag scoring function. */
export interface TagScoringParameters {
  /** The name of the parameter passed in search queries to specify the list of tags to compare against the target field. */
  tagsParameter: string;
}

export function tagScoringParametersSerializer(item: TagScoringParameters): any {
  return { tagsParameter: item["tagsParameter"] };
}

export function tagScoringParametersDeserializer(item: any): TagScoringParameters {
  return {
    tagsParameter: item["tagsParameter"],
  };
}

/** Defines the aggregation function used to combine the results of all the scoring functions in a scoring profile. */
export type ScoringFunctionAggregation =
  | "sum"
  | "average"
  | "minimum"
  | "maximum"
  | "firstMatching"
  | "product";

/** Defines options to control Cross-Origin Resource Sharing (CORS) for an index. */
export interface CorsOptions {
  /** The list of origins from which JavaScript code will be granted access to your index. Can contain a list of hosts of the form {protocol}://{fully-qualified-domain-name}[:{port#}], or a single '*' to allow all origins (not recommended). */
  allowedOrigins: string[];
  /** The duration for which browsers should cache CORS preflight responses. Defaults to 5 minutes. */
  maxAgeInSeconds?: number;
}

export function corsOptionsSerializer(item: CorsOptions): any {
  return {
    allowedOrigins: item["allowedOrigins"].map((p: any) => {
      return p;
    }),
    maxAgeInSeconds: item["maxAgeInSeconds"],
  };
}

export function corsOptionsDeserializer(item: any): CorsOptions {
  return {
    allowedOrigins: item["allowedOrigins"].map((p: any) => {
      return p;
    }),
    maxAgeInSeconds: item["maxAgeInSeconds"],
  };
}

export function searchSuggesterArraySerializer(result: Array<SearchSuggester>): any[] {
  return result.map((item) => {
    return searchSuggesterSerializer(item);
  });
}

export function searchSuggesterArrayDeserializer(result: Array<SearchSuggester>): any[] {
  return result.map((item) => {
    return searchSuggesterDeserializer(item);
  });
}

/** Defines how the Suggest API should apply to a group of fields in the index. */
export interface SearchSuggester {
  /** The name of the suggester. */
  name: string;
  /** A value indicating the capabilities of the suggester. */
  searchMode: "analyzingInfixMatching";
  /** The list of field names to which the suggester applies. Each field must be searchable. */
  sourceFields: string[];
}

export function searchSuggesterSerializer(item: SearchSuggester): any {
  return {
    name: item["name"],
    searchMode: item["searchMode"],
    sourceFields: item["sourceFields"].map((p: any) => {
      return p;
    }),
  };
}

export function searchSuggesterDeserializer(item: any): SearchSuggester {
  return {
    name: item["name"],
    searchMode: item["searchMode"],
    sourceFields: item["sourceFields"].map((p: any) => {
      return p;
    }),
  };
}

export function lexicalAnalyzerUnionArraySerializer(result: Array<LexicalAnalyzerUnion>): any[] {
  return result.map((item) => {
    return lexicalAnalyzerUnionSerializer(item);
  });
}

export function lexicalAnalyzerUnionArrayDeserializer(result: Array<LexicalAnalyzerUnion>): any[] {
  return result.map((item) => {
    return lexicalAnalyzerUnionDeserializer(item);
  });
}

/** Base type for analyzers. */
export interface LexicalAnalyzer {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Azure.Search.CustomAnalyzer, #Microsoft.Azure.Search.PatternAnalyzer, #Microsoft.Azure.Search.StandardAnalyzer, #Microsoft.Azure.Search.StopAnalyzer */
  odatatype: string;
  /** The name of the analyzer. It must only contain letters, digits, spaces, dashes or underscores, can only start and end with alphanumeric characters, and is limited to 128 characters. */
  name: string;
}

export function lexicalAnalyzerSerializer(item: LexicalAnalyzer): any {
  return { "@odata.type": item["odatatype"], name: item["name"] };
}

export function lexicalAnalyzerDeserializer(item: any): LexicalAnalyzer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
  };
}

/** Alias for LexicalAnalyzerUnion */
export type LexicalAnalyzerUnion =
  | CustomAnalyzer
  | PatternAnalyzer
  | LuceneStandardAnalyzer
  | StopAnalyzer
  | LexicalAnalyzer;

export function lexicalAnalyzerUnionSerializer(item: LexicalAnalyzerUnion): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.CustomAnalyzer":
      return customAnalyzerSerializer(item as CustomAnalyzer);

    case "#Microsoft.Azure.Search.PatternAnalyzer":
      return patternAnalyzerSerializer(item as PatternAnalyzer);

    case "#Microsoft.Azure.Search.StandardAnalyzer":
      return luceneStandardAnalyzerSerializer(item as LuceneStandardAnalyzer);

    case "#Microsoft.Azure.Search.StopAnalyzer":
      return stopAnalyzerSerializer(item as StopAnalyzer);

    default:
      return lexicalAnalyzerSerializer(item);
  }
}

export function lexicalAnalyzerUnionDeserializer(item: any): LexicalAnalyzerUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.CustomAnalyzer":
      return customAnalyzerDeserializer(item as CustomAnalyzer);

    case "#Microsoft.Azure.Search.PatternAnalyzer":
      return patternAnalyzerDeserializer(item as PatternAnalyzer);

    case "#Microsoft.Azure.Search.StandardAnalyzer":
      return luceneStandardAnalyzerDeserializer(item as LuceneStandardAnalyzer);

    case "#Microsoft.Azure.Search.StopAnalyzer":
      return stopAnalyzerDeserializer(item as StopAnalyzer);

    default:
      return lexicalAnalyzerDeserializer(item);
  }
}

/** Allows you to take control over the process of converting text into indexable/searchable tokens. It's a user-defined configuration consisting of a single predefined tokenizer and one or more filters. The tokenizer is responsible for breaking text into tokens, and the filters for modifying tokens emitted by the tokenizer. */
export interface CustomAnalyzer extends LexicalAnalyzer {
  /** The name of the tokenizer to use to divide continuous text into a sequence of tokens, such as breaking a sentence into words. */
  tokenizer: LexicalTokenizerName;
  /** A list of token filters used to filter out or modify the tokens generated by a tokenizer. For example, you can specify a lowercase filter that converts all characters to lowercase. The filters are run in the order in which they are listed. */
  tokenFilters?: TokenFilterName[];
  /** A list of character filters used to prepare input text before it is processed by the tokenizer. For instance, they can replace certain characters or symbols. The filters are run in the order in which they are listed. */
  charFilters?: CharFilterName[];
  /** A URI fragment specifying the type of analyzer. */
  odatatype: "#Microsoft.Azure.Search.CustomAnalyzer";
}

export function customAnalyzerSerializer(item: CustomAnalyzer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    tokenizer: item["tokenizer"],
    tokenFilters: !item["tokenFilters"]
      ? item["tokenFilters"]
      : item["tokenFilters"].map((p: any) => {
          return p;
        }),
    charFilters: !item["charFilters"]
      ? item["charFilters"]
      : item["charFilters"].map((p: any) => {
          return p;
        }),
  };
}

export function customAnalyzerDeserializer(item: any): CustomAnalyzer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    tokenizer: item["tokenizer"],
    tokenFilters: !item["tokenFilters"]
      ? item["tokenFilters"]
      : item["tokenFilters"].map((p: any) => {
          return p;
        }),
    charFilters: !item["charFilters"]
      ? item["charFilters"]
      : item["charFilters"].map((p: any) => {
          return p;
        }),
  };
}

/** Defines the names of all tokenizers supported by the search engine. */
export enum KnownLexicalTokenizerName {
  /** Grammar-based tokenizer that is suitable for processing most European-language documents. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/ClassicTokenizer.html */
  Classic = "classic",
  /** Tokenizes the input from an edge into n-grams of the given size(s). See https://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/EdgeNGramTokenizer.html */
  EdgeNGram = "edgeNGram",
  /** Emits the entire input as a single token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/KeywordTokenizer.html */
  Keyword = "keyword_v2",
  /** Divides text at non-letters. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/LetterTokenizer.html */
  Letter = "letter",
  /** Divides text at non-letters and converts them to lower case. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/LowerCaseTokenizer.html */
  Lowercase = "lowercase",
  /** Divides text using language-specific rules. */
  MicrosoftLanguageTokenizer = "microsoft_language_tokenizer",
  /** Divides text using language-specific rules and reduces words to their base forms. */
  MicrosoftLanguageStemmingTokenizer = "microsoft_language_stemming_tokenizer",
  /** Tokenizes the input into n-grams of the given size(s). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/NGramTokenizer.html */
  NGram = "nGram",
  /** Tokenizer for path-like hierarchies. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/path/PathHierarchyTokenizer.html */
  PathHierarchy = "path_hierarchy_v2",
  /** Tokenizer that uses regex pattern matching to construct distinct tokens. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/pattern/PatternTokenizer.html */
  Pattern = "pattern",
  /** Standard Lucene analyzer; Composed of the standard tokenizer, lowercase filter and stop filter. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/StandardTokenizer.html */
  Standard = "standard_v2",
  /** Tokenizes urls and emails as one token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/UAX29URLEmailTokenizer.html */
  UaxUrlEmail = "uax_url_email",
  /** Divides text at whitespace. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/WhitespaceTokenizer.html */
  Whitespace = "whitespace",
}

/**
 * Defines the names of all tokenizers supported by the search engine. \
 * {@link KnownLexicalTokenizerName} can be used interchangeably with LexicalTokenizerName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **classic**: Grammar-based tokenizer that is suitable for processing most European-language documents. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/standard\/ClassicTokenizer.html \
 * **edgeNGram**: Tokenizes the input from an edge into n-grams of the given size(s). See https:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/ngram\/EdgeNGramTokenizer.html \
 * **keyword_v2**: Emits the entire input as a single token. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/KeywordTokenizer.html \
 * **letter**: Divides text at non-letters. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/LetterTokenizer.html \
 * **lowercase**: Divides text at non-letters and converts them to lower case. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/LowerCaseTokenizer.html \
 * **microsoft_language_tokenizer**: Divides text using language-specific rules. \
 * **microsoft_language_stemming_tokenizer**: Divides text using language-specific rules and reduces words to their base forms. \
 * **nGram**: Tokenizes the input into n-grams of the given size(s). See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/ngram\/NGramTokenizer.html \
 * **path_hierarchy_v2**: Tokenizer for path-like hierarchies. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/path\/PathHierarchyTokenizer.html \
 * **pattern**: Tokenizer that uses regex pattern matching to construct distinct tokens. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/pattern\/PatternTokenizer.html \
 * **standard_v2**: Standard Lucene analyzer; Composed of the standard tokenizer, lowercase filter and stop filter. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/standard\/StandardTokenizer.html \
 * **uax_url_email**: Tokenizes urls and emails as one token. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/standard\/UAX29URLEmailTokenizer.html \
 * **whitespace**: Divides text at whitespace. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/WhitespaceTokenizer.html
 */
export type LexicalTokenizerName = string;

/** Defines the names of all token filters supported by the search engine. */
export enum KnownTokenFilterName {
  /** A token filter that applies the Arabic normalizer to normalize the orthography. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ar/ArabicNormalizationFilter.html */
  ArabicNormalization = "arabic_normalization",
  /** Strips all characters after an apostrophe (including the apostrophe itself). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/tr/ApostropheFilter.html */
  Apostrophe = "apostrophe",
  /** Converts alphabetic, numeric, and symbolic Unicode characters which are not in the first 127 ASCII characters (the "Basic Latin" Unicode block) into their ASCII equivalents, if such equivalents exist. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ASCIIFoldingFilter.html */
  AsciiFolding = "asciifolding",
  /** Forms bigrams of CJK terms that are generated from the standard tokenizer. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/cjk/CJKBigramFilter.html */
  CjkBigram = "cjk_bigram",
  /** Normalizes CJK width differences. Folds full-width ASCII variants into the equivalent basic Latin, and half-width Katakana variants into the equivalent Kana. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/cjk/CJKWidthFilter.html */
  CjkWidth = "cjk_width",
  /** Removes English possessives, and dots from acronyms. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/ClassicFilter.html */
  Classic = "classic",
  /** Construct bigrams for frequently occurring terms while indexing. Single terms are still indexed too, with bigrams overlaid. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/commongrams/CommonGramsFilter.html */
  CommonGram = "common_grams",
  /** Generates n-grams of the given size(s) starting from the front or the back of an input token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/EdgeNGramTokenFilter.html */
  EdgeNGram = "edgeNGram_v2",
  /** Removes elisions. For example, "l'avion" (the plane) will be converted to "avion" (plane). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/util/ElisionFilter.html */
  Elision = "elision",
  /** Normalizes German characters according to the heuristics of the German2 snowball algorithm. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/de/GermanNormalizationFilter.html */
  GermanNormalization = "german_normalization",
  /** Normalizes text in Hindi to remove some differences in spelling variations. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/hi/HindiNormalizationFilter.html */
  HindiNormalization = "hindi_normalization",
  /** Normalizes the Unicode representation of text in Indian languages. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/in/IndicNormalizationFilter.html */
  IndicNormalization = "indic_normalization",
  /** Emits each incoming token twice, once as keyword and once as non-keyword. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/KeywordRepeatFilter.html */
  KeywordRepeat = "keyword_repeat",
  /** A high-performance kstem filter for English. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/en/KStemFilter.html */
  KStem = "kstem",
  /** Removes words that are too long or too short. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/LengthFilter.html */
  Length = "length",
  /** Limits the number of tokens while indexing. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/LimitTokenCountFilter.html */
  Limit = "limit",
  /** Normalizes token text to lower case. See https://lucene.apache.org/core/6_6_1/analyzers-common/org/apache/lucene/analysis/core/LowerCaseFilter.html */
  Lowercase = "lowercase",
  /** Generates n-grams of the given size(s). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/NGramTokenFilter.html */
  NGram = "nGram_v2",
  /** Applies normalization for Persian. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/fa/PersianNormalizationFilter.html */
  PersianNormalization = "persian_normalization",
  /** Create tokens for phonetic matches. See https://lucene.apache.org/core/4_10_3/analyzers-phonetic/org/apache/lucene/analysis/phonetic/package-tree.html */
  Phonetic = "phonetic",
  /** Uses the Porter stemming algorithm to transform the token stream. See http://tartarus.org/~martin/PorterStemmer */
  PorterStem = "porter_stem",
  /** Reverses the token string. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/reverse/ReverseStringFilter.html */
  Reverse = "reverse",
  /** Normalizes use of the interchangeable Scandinavian characters. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ScandinavianNormalizationFilter.html */
  ScandinavianNormalization = "scandinavian_normalization",
  /** Folds Scandinavian characters Ã¥Ã…Ã¤Ã¦Ã„Ã†-&gt;a and Ã¶Ã–Ã¸Ã˜-&gt;o. It also discriminates against use of double vowels aa, ae, ao, oe and oo, leaving just the first one. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ScandinavianFoldingFilter.html */
  ScandinavianFoldingNormalization = "scandinavian_folding",
  /** Creates combinations of tokens as a single token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/shingle/ShingleFilter.html */
  Shingle = "shingle",
  /** A filter that stems words using a Snowball-generated stemmer. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/snowball/SnowballFilter.html */
  Snowball = "snowball",
  /** Normalizes the Unicode representation of Sorani text. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ckb/SoraniNormalizationFilter.html */
  SoraniNormalization = "sorani_normalization",
  /** Language specific stemming filter. See https://learn.microsoft.com/rest/api/searchservice/Custom-analyzers-in-Azure-Search#TokenFilters */
  Stemmer = "stemmer",
  /** Removes stop words from a token stream. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/StopFilter.html */
  Stopwords = "stopwords",
  /** Trims leading and trailing whitespace from tokens. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/TrimFilter.html */
  Trim = "trim",
  /** Truncates the terms to a specific length. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/TruncateTokenFilter.html */
  Truncate = "truncate",
  /** Filters out tokens with same text as the previous token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/RemoveDuplicatesTokenFilter.html */
  Unique = "unique",
  /** Normalizes token text to upper case. See https://lucene.apache.org/core/6_6_1/analyzers-common/org/apache/lucene/analysis/core/UpperCaseFilter.html */
  Uppercase = "uppercase",
  /** Splits words into subwords and performs optional transformations on subword groups. */
  WordDelimiter = "word_delimiter",
}

/**
 * Defines the names of all token filters supported by the search engine. \
 * {@link KnownTokenFilterName} can be used interchangeably with TokenFilterName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **arabic_normalization**: A token filter that applies the Arabic normalizer to normalize the orthography. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/ar\/ArabicNormalizationFilter.html \
 * **apostrophe**: Strips all characters after an apostrophe (including the apostrophe itself). See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/tr\/ApostropheFilter.html \
 * **asciifolding**: Converts alphabetic, numeric, and symbolic Unicode characters which are not in the first 127 ASCII characters (the "Basic Latin" Unicode block) into their ASCII equivalents, if such equivalents exist. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/ASCIIFoldingFilter.html \
 * **cjk_bigram**: Forms bigrams of CJK terms that are generated from the standard tokenizer. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/cjk\/CJKBigramFilter.html \
 * **cjk_width**: Normalizes CJK width differences. Folds full-width ASCII variants into the equivalent basic Latin, and half-width Katakana variants into the equivalent Kana. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/cjk\/CJKWidthFilter.html \
 * **classic**: Removes English possessives, and dots from acronyms. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/standard\/ClassicFilter.html \
 * **common_grams**: Construct bigrams for frequently occurring terms while indexing. Single terms are still indexed too, with bigrams overlaid. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/commongrams\/CommonGramsFilter.html \
 * **edgeNGram_v2**: Generates n-grams of the given size(s) starting from the front or the back of an input token. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/ngram\/EdgeNGramTokenFilter.html \
 * **elision**: Removes elisions. For example, "l'avion" (the plane) will be converted to "avion" (plane). See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/util\/ElisionFilter.html \
 * **german_normalization**: Normalizes German characters according to the heuristics of the German2 snowball algorithm. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/de\/GermanNormalizationFilter.html \
 * **hindi_normalization**: Normalizes text in Hindi to remove some differences in spelling variations. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/hi\/HindiNormalizationFilter.html \
 * **indic_normalization**: Normalizes the Unicode representation of text in Indian languages. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/in\/IndicNormalizationFilter.html \
 * **keyword_repeat**: Emits each incoming token twice, once as keyword and once as non-keyword. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/KeywordRepeatFilter.html \
 * **kstem**: A high-performance kstem filter for English. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/en\/KStemFilter.html \
 * **length**: Removes words that are too long or too short. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/LengthFilter.html \
 * **limit**: Limits the number of tokens while indexing. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/LimitTokenCountFilter.html \
 * **lowercase**: Normalizes token text to lower case. See https:\//lucene.apache.org\/core\/6_6_1\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/LowerCaseFilter.html \
 * **nGram_v2**: Generates n-grams of the given size(s). See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/ngram\/NGramTokenFilter.html \
 * **persian_normalization**: Applies normalization for Persian. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/fa\/PersianNormalizationFilter.html \
 * **phonetic**: Create tokens for phonetic matches. See https:\//lucene.apache.org\/core\/4_10_3\/analyzers-phonetic\/org\/apache\/lucene\/analysis\/phonetic\/package-tree.html \
 * **porter_stem**: Uses the Porter stemming algorithm to transform the token stream. See http:\//tartarus.org\/~martin\/PorterStemmer \
 * **reverse**: Reverses the token string. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/reverse\/ReverseStringFilter.html \
 * **scandinavian_normalization**: Normalizes use of the interchangeable Scandinavian characters. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/ScandinavianNormalizationFilter.html \
 * **scandinavian_folding**: Folds Scandinavian characters Ã¥Ã…Ã¤Ã¦Ã„Ã†-&gt;a and Ã¶Ã–Ã¸Ã˜-&gt;o. It also discriminates against use of double vowels aa, ae, ao, oe and oo, leaving just the first one. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/ScandinavianFoldingFilter.html \
 * **shingle**: Creates combinations of tokens as a single token. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/shingle\/ShingleFilter.html \
 * **snowball**: A filter that stems words using a Snowball-generated stemmer. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/snowball\/SnowballFilter.html \
 * **sorani_normalization**: Normalizes the Unicode representation of Sorani text. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/ckb\/SoraniNormalizationFilter.html \
 * **stemmer**: Language specific stemming filter. See https:\//learn.microsoft.com\/rest\/api\/searchservice\/Custom-analyzers-in-Azure-Search#TokenFilters \
 * **stopwords**: Removes stop words from a token stream. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/StopFilter.html \
 * **trim**: Trims leading and trailing whitespace from tokens. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/TrimFilter.html \
 * **truncate**: Truncates the terms to a specific length. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/TruncateTokenFilter.html \
 * **unique**: Filters out tokens with same text as the previous token. See http:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/miscellaneous\/RemoveDuplicatesTokenFilter.html \
 * **uppercase**: Normalizes token text to upper case. See https:\//lucene.apache.org\/core\/6_6_1\/analyzers-common\/org\/apache\/lucene\/analysis\/core\/UpperCaseFilter.html \
 * **word_delimiter**: Splits words into subwords and performs optional transformations on subword groups.
 */
export type TokenFilterName = string;

/** Defines the names of all character filters supported by the search engine. */
export enum KnownCharFilterName {
  /** A character filter that attempts to strip out HTML constructs. See https://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/charfilter/HTMLStripCharFilter.html */
  HtmlStrip = "html_strip",
}

/**
 * Defines the names of all character filters supported by the search engine. \
 * {@link KnownCharFilterName} can be used interchangeably with CharFilterName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **html_strip**: A character filter that attempts to strip out HTML constructs. See https:\//lucene.apache.org\/core\/4_10_3\/analyzers-common\/org\/apache\/lucene\/analysis\/charfilter\/HTMLStripCharFilter.html
 */
export type CharFilterName = string;

/** Flexibly separates text into terms via a regular expression pattern. This analyzer is implemented using Apache Lucene. */
export interface PatternAnalyzer extends LexicalAnalyzer {
  /** A value indicating whether terms should be lower-cased. Default is true. */
  lowerCaseTerms?: boolean;
  /** A regular expression pattern to match token separators. Default is an expression that matches one or more non-word characters. */
  pattern?: string;
  /** Regular expression flags, specified as a '|' separated string of RegexFlags values. */
  flags?: RegexFlags[];
  /** A list of stopwords. */
  stopwords?: string[];
  /** A URI fragment specifying the type of analyzer. */
  odatatype: "#Microsoft.Azure.Search.PatternAnalyzer";
}

export function patternAnalyzerSerializer(item: PatternAnalyzer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    lowercase: item["lowerCaseTerms"],
    pattern: item["pattern"],
    flags: !item["flags"]
      ? item["flags"]
      : buildPipeCollection(
          item["flags"].map((p: any) => {
            return p;
          }),
        ),
    stopwords: !item["stopwords"]
      ? item["stopwords"]
      : item["stopwords"].map((p: any) => {
          return p;
        }),
  };
}

export function patternAnalyzerDeserializer(item: any): PatternAnalyzer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    lowerCaseTerms: item["lowercase"],
    pattern: item["pattern"],
    flags:
      item["flags"] === null || item["flags"] === undefined
        ? item["flags"]
        : parsePipeCollection(item["flags"]),
    stopwords: !item["stopwords"]
      ? item["stopwords"]
      : item["stopwords"].map((p: any) => {
          return p;
        }),
  };
}

/** Defines a regular expression flag that can be used in the pattern analyzer and pattern tokenizer. */
export enum KnownRegexFlags {
  /** Enables canonical equivalence. */
  CanonEq = "CANON_EQ",
  /** Enables case-insensitive matching. */
  CaseInsensitive = "CASE_INSENSITIVE",
  /** Permits whitespace and comments in the pattern. */
  Comments = "COMMENTS",
  /** Enables dotall mode. */
  DotAll = "DOTALL",
  /** Enables literal parsing of the pattern. */
  Literal = "LITERAL",
  /** Enables multiline mode. */
  Multiline = "MULTILINE",
  /** Enables Unicode-aware case folding. */
  UnicodeCase = "UNICODE_CASE",
  /** Enables Unix lines mode. */
  UnixLines = "UNIX_LINES",
}

/**
 * Defines a regular expression flag that can be used in the pattern analyzer and pattern tokenizer. \
 * {@link KnownRegexFlags} can be used interchangeably with RegexFlags,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CANON_EQ**: Enables canonical equivalence. \
 * **CASE_INSENSITIVE**: Enables case-insensitive matching. \
 * **COMMENTS**: Permits whitespace and comments in the pattern. \
 * **DOTALL**: Enables dotall mode. \
 * **LITERAL**: Enables literal parsing of the pattern. \
 * **MULTILINE**: Enables multiline mode. \
 * **UNICODE_CASE**: Enables Unicode-aware case folding. \
 * **UNIX_LINES**: Enables Unix lines mode.
 */
export type RegexFlags = string;

/** Standard Apache Lucene analyzer; Composed of the standard tokenizer, lowercase filter and stop filter. */
export interface LuceneStandardAnalyzer extends LexicalAnalyzer {
  /** The maximum token length. Default is 255. Tokens longer than the maximum length are split. The maximum token length that can be used is 300 characters. */
  maxTokenLength?: number;
  /** A list of stopwords. */
  stopwords?: string[];
  /** A URI fragment specifying the type of analyzer. */
  odatatype: "#Microsoft.Azure.Search.StandardAnalyzer";
}

export function luceneStandardAnalyzerSerializer(item: LuceneStandardAnalyzer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
    stopwords: !item["stopwords"]
      ? item["stopwords"]
      : item["stopwords"].map((p: any) => {
          return p;
        }),
  };
}

export function luceneStandardAnalyzerDeserializer(item: any): LuceneStandardAnalyzer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
    stopwords: !item["stopwords"]
      ? item["stopwords"]
      : item["stopwords"].map((p: any) => {
          return p;
        }),
  };
}

/** Divides text at non-letters; Applies the lowercase and stopword token filters. This analyzer is implemented using Apache Lucene. */
export interface StopAnalyzer extends LexicalAnalyzer {
  /** A list of stopwords. */
  stopwords?: string[];
  /** A URI fragment specifying the type of analyzer. */
  odatatype: "#Microsoft.Azure.Search.StopAnalyzer";
}

export function stopAnalyzerSerializer(item: StopAnalyzer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    stopwords: !item["stopwords"]
      ? item["stopwords"]
      : item["stopwords"].map((p: any) => {
          return p;
        }),
  };
}

export function stopAnalyzerDeserializer(item: any): StopAnalyzer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    stopwords: !item["stopwords"]
      ? item["stopwords"]
      : item["stopwords"].map((p: any) => {
          return p;
        }),
  };
}

export function lexicalTokenizerUnionArraySerializer(result: Array<LexicalTokenizerUnion>): any[] {
  return result.map((item) => {
    return lexicalTokenizerUnionSerializer(item);
  });
}

export function lexicalTokenizerUnionArrayDeserializer(
  result: Array<LexicalTokenizerUnion>,
): any[] {
  return result.map((item) => {
    return lexicalTokenizerUnionDeserializer(item);
  });
}

/** Base type for tokenizers. */
export interface LexicalTokenizer {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Azure.Search.ClassicTokenizer, #Microsoft.Azure.Search.EdgeNGramTokenizer, #Microsoft.Azure.Search.KeywordTokenizer, #Microsoft.Azure.Search.KeywordTokenizerV2, #Microsoft.Azure.Search.MicrosoftLanguageTokenizer, #Microsoft.Azure.Search.MicrosoftLanguageStemmingTokenizer, #Microsoft.Azure.Search.NGramTokenizer, #Microsoft.Azure.Search.PathHierarchyTokenizerV2, #Microsoft.Azure.Search.PatternTokenizer, #Microsoft.Azure.Search.StandardTokenizer, #Microsoft.Azure.Search.StandardTokenizerV2, #Microsoft.Azure.Search.UaxUrlEmailTokenizer */
  odatatype: string;
  /** The name of the tokenizer. It must only contain letters, digits, spaces, dashes or underscores, can only start and end with alphanumeric characters, and is limited to 128 characters. */
  name: string;
}

export function lexicalTokenizerSerializer(item: LexicalTokenizer): any {
  return { "@odata.type": item["odatatype"], name: item["name"] };
}

export function lexicalTokenizerDeserializer(item: any): LexicalTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
  };
}

/** Alias for LexicalTokenizerUnion */
export type LexicalTokenizerUnion =
  | ClassicTokenizer
  | EdgeNGramTokenizer
  | KeywordTokenizer
  | KeywordTokenizerV2
  | MicrosoftLanguageTokenizer
  | MicrosoftLanguageStemmingTokenizer
  | NGramTokenizer
  | PathHierarchyTokenizerV2
  | PatternTokenizer
  | LuceneStandardTokenizer
  | LuceneStandardTokenizerV2
  | UaxUrlEmailTokenizer
  | LexicalTokenizer;

export function lexicalTokenizerUnionSerializer(item: LexicalTokenizerUnion): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.ClassicTokenizer":
      return classicTokenizerSerializer(item as ClassicTokenizer);

    case "#Microsoft.Azure.Search.EdgeNGramTokenizer":
      return edgeNGramTokenizerSerializer(item as EdgeNGramTokenizer);

    case "#Microsoft.Azure.Search.KeywordTokenizer":
      return keywordTokenizerSerializer(item as KeywordTokenizer);

    case "#Microsoft.Azure.Search.KeywordTokenizerV2":
      return keywordTokenizerV2Serializer(item as KeywordTokenizerV2);

    case "#Microsoft.Azure.Search.MicrosoftLanguageTokenizer":
      return microsoftLanguageTokenizerSerializer(item as MicrosoftLanguageTokenizer);

    case "#Microsoft.Azure.Search.MicrosoftLanguageStemmingTokenizer":
      return microsoftLanguageStemmingTokenizerSerializer(
        item as MicrosoftLanguageStemmingTokenizer,
      );

    case "#Microsoft.Azure.Search.NGramTokenizer":
      return nGramTokenizerSerializer(item as NGramTokenizer);

    case "#Microsoft.Azure.Search.PathHierarchyTokenizerV2":
      return pathHierarchyTokenizerV2Serializer(item as PathHierarchyTokenizerV2);

    case "#Microsoft.Azure.Search.PatternTokenizer":
      return patternTokenizerSerializer(item as PatternTokenizer);

    case "#Microsoft.Azure.Search.StandardTokenizer":
      return luceneStandardTokenizerSerializer(item as LuceneStandardTokenizer);

    case "#Microsoft.Azure.Search.StandardTokenizerV2":
      return luceneStandardTokenizerV2Serializer(item as LuceneStandardTokenizerV2);

    case "#Microsoft.Azure.Search.UaxUrlEmailTokenizer":
      return uaxUrlEmailTokenizerSerializer(item as UaxUrlEmailTokenizer);

    default:
      return lexicalTokenizerSerializer(item);
  }
}

export function lexicalTokenizerUnionDeserializer(item: any): LexicalTokenizerUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.ClassicTokenizer":
      return classicTokenizerDeserializer(item as ClassicTokenizer);

    case "#Microsoft.Azure.Search.EdgeNGramTokenizer":
      return edgeNGramTokenizerDeserializer(item as EdgeNGramTokenizer);

    case "#Microsoft.Azure.Search.KeywordTokenizer":
      return keywordTokenizerDeserializer(item as KeywordTokenizer);

    case "#Microsoft.Azure.Search.KeywordTokenizerV2":
      return keywordTokenizerV2Deserializer(item as KeywordTokenizerV2);

    case "#Microsoft.Azure.Search.MicrosoftLanguageTokenizer":
      return microsoftLanguageTokenizerDeserializer(item as MicrosoftLanguageTokenizer);

    case "#Microsoft.Azure.Search.MicrosoftLanguageStemmingTokenizer":
      return microsoftLanguageStemmingTokenizerDeserializer(
        item as MicrosoftLanguageStemmingTokenizer,
      );

    case "#Microsoft.Azure.Search.NGramTokenizer":
      return nGramTokenizerDeserializer(item as NGramTokenizer);

    case "#Microsoft.Azure.Search.PathHierarchyTokenizerV2":
      return pathHierarchyTokenizerV2Deserializer(item as PathHierarchyTokenizerV2);

    case "#Microsoft.Azure.Search.PatternTokenizer":
      return patternTokenizerDeserializer(item as PatternTokenizer);

    case "#Microsoft.Azure.Search.StandardTokenizer":
      return luceneStandardTokenizerDeserializer(item as LuceneStandardTokenizer);

    case "#Microsoft.Azure.Search.StandardTokenizerV2":
      return luceneStandardTokenizerV2Deserializer(item as LuceneStandardTokenizerV2);

    case "#Microsoft.Azure.Search.UaxUrlEmailTokenizer":
      return uaxUrlEmailTokenizerDeserializer(item as UaxUrlEmailTokenizer);

    default:
      return lexicalTokenizerDeserializer(item);
  }
}

/** Grammar-based tokenizer that is suitable for processing most European-language documents. This tokenizer is implemented using Apache Lucene. */
export interface ClassicTokenizer extends LexicalTokenizer {
  /** The maximum token length. Default is 255. Tokens longer than the maximum length are split. The maximum token length that can be used is 300 characters. */
  maxTokenLength?: number;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.ClassicTokenizer";
}

export function classicTokenizerSerializer(item: ClassicTokenizer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

export function classicTokenizerDeserializer(item: any): ClassicTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

/** Tokenizes the input from an edge into n-grams of the given size(s). This tokenizer is implemented using Apache Lucene. */
export interface EdgeNGramTokenizer extends LexicalTokenizer {
  /** The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the value of maxGram. */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. Maximum is 300. */
  maxGram?: number;
  /** Character classes to keep in the tokens. */
  tokenChars?: TokenCharacterKind[];
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.EdgeNGramTokenizer";
}

export function edgeNGramTokenizerSerializer(item: EdgeNGramTokenizer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
    tokenChars: !item["tokenChars"]
      ? item["tokenChars"]
      : item["tokenChars"].map((p: any) => {
          return p;
        }),
  };
}

export function edgeNGramTokenizerDeserializer(item: any): EdgeNGramTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
    tokenChars: !item["tokenChars"]
      ? item["tokenChars"]
      : item["tokenChars"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents classes of characters on which a token filter can operate. */
export type TokenCharacterKind = "letter" | "digit" | "whitespace" | "punctuation" | "symbol";

/** Emits the entire input as a single token. This tokenizer is implemented using Apache Lucene. */
export interface KeywordTokenizer extends LexicalTokenizer {
  /** The read buffer size in bytes. Default is 256. */
  bufferSize?: number;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.KeywordTokenizer";
}

export function keywordTokenizerSerializer(item: KeywordTokenizer): any {
  return { "@odata.type": item["odatatype"], name: item["name"], bufferSize: item["bufferSize"] };
}

export function keywordTokenizerDeserializer(item: any): KeywordTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    bufferSize: item["bufferSize"],
  };
}

/** Emits the entire input as a single token. This tokenizer is implemented using Apache Lucene. */
export interface KeywordTokenizerV2 extends LexicalTokenizer {
  /** The maximum token length. Default is 256. Tokens longer than the maximum length are split. The maximum token length that can be used is 300 characters. */
  maxTokenLength?: number;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.KeywordTokenizerV2";
}

export function keywordTokenizerV2Serializer(item: KeywordTokenizerV2): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

export function keywordTokenizerV2Deserializer(item: any): KeywordTokenizerV2 {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

/** Divides text using language-specific rules. */
export interface MicrosoftLanguageTokenizer extends LexicalTokenizer {
  /** The maximum token length. Tokens longer than the maximum length are split. Maximum token length that can be used is 300 characters. Tokens longer than 300 characters are first split into tokens of length 300 and then each of those tokens is split based on the max token length set. Default is 255. */
  maxTokenLength?: number;
  /** A value indicating how the tokenizer is used. Set to true if used as the search tokenizer, set to false if used as the indexing tokenizer. Default is false. */
  isSearchTokenizer?: boolean;
  /** The language to use. The default is English. */
  language?: MicrosoftTokenizerLanguage;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.MicrosoftLanguageTokenizer";
}

export function microsoftLanguageTokenizerSerializer(item: MicrosoftLanguageTokenizer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
    isSearchTokenizer: item["isSearchTokenizer"],
    language: item["language"],
  };
}

export function microsoftLanguageTokenizerDeserializer(item: any): MicrosoftLanguageTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
    isSearchTokenizer: item["isSearchTokenizer"],
    language: item["language"],
  };
}

/** Lists the languages supported by the Microsoft language tokenizer. */
export type MicrosoftTokenizerLanguage =
  | "bangla"
  | "bulgarian"
  | "catalan"
  | "chineseSimplified"
  | "chineseTraditional"
  | "croatian"
  | "czech"
  | "danish"
  | "dutch"
  | "english"
  | "french"
  | "german"
  | "greek"
  | "gujarati"
  | "hindi"
  | "icelandic"
  | "indonesian"
  | "italian"
  | "japanese"
  | "kannada"
  | "korean"
  | "malay"
  | "malayalam"
  | "marathi"
  | "norwegianBokmaal"
  | "polish"
  | "portuguese"
  | "portugueseBrazilian"
  | "punjabi"
  | "romanian"
  | "russian"
  | "serbianCyrillic"
  | "serbianLatin"
  | "slovenian"
  | "spanish"
  | "swedish"
  | "tamil"
  | "telugu"
  | "thai"
  | "ukrainian"
  | "urdu"
  | "vietnamese";

/** Divides text using language-specific rules and reduces words to their base forms. */
export interface MicrosoftLanguageStemmingTokenizer extends LexicalTokenizer {
  /** The maximum token length. Tokens longer than the maximum length are split. Maximum token length that can be used is 300 characters. Tokens longer than 300 characters are first split into tokens of length 300 and then each of those tokens is split based on the max token length set. Default is 255. */
  maxTokenLength?: number;
  /** A value indicating how the tokenizer is used. Set to true if used as the search tokenizer, set to false if used as the indexing tokenizer. Default is false. */
  isSearchTokenizer?: boolean;
  /** The language to use. The default is English. */
  language?: MicrosoftStemmingTokenizerLanguage;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.MicrosoftLanguageStemmingTokenizer";
}

export function microsoftLanguageStemmingTokenizerSerializer(
  item: MicrosoftLanguageStemmingTokenizer,
): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
    isSearchTokenizer: item["isSearchTokenizer"],
    language: item["language"],
  };
}

export function microsoftLanguageStemmingTokenizerDeserializer(
  item: any,
): MicrosoftLanguageStemmingTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
    isSearchTokenizer: item["isSearchTokenizer"],
    language: item["language"],
  };
}

/** Lists the languages supported by the Microsoft language stemming tokenizer. */
export type MicrosoftStemmingTokenizerLanguage =
  | "arabic"
  | "bangla"
  | "bulgarian"
  | "catalan"
  | "croatian"
  | "czech"
  | "danish"
  | "dutch"
  | "english"
  | "estonian"
  | "finnish"
  | "french"
  | "german"
  | "greek"
  | "gujarati"
  | "hebrew"
  | "hindi"
  | "hungarian"
  | "icelandic"
  | "indonesian"
  | "italian"
  | "kannada"
  | "latvian"
  | "lithuanian"
  | "malay"
  | "malayalam"
  | "marathi"
  | "norwegianBokmaal"
  | "polish"
  | "portuguese"
  | "portugueseBrazilian"
  | "punjabi"
  | "romanian"
  | "russian"
  | "serbianCyrillic"
  | "serbianLatin"
  | "slovak"
  | "slovenian"
  | "spanish"
  | "swedish"
  | "tamil"
  | "telugu"
  | "turkish"
  | "ukrainian"
  | "urdu";

/** Tokenizes the input into n-grams of the given size(s). This tokenizer is implemented using Apache Lucene. */
export interface NGramTokenizer extends LexicalTokenizer {
  /** The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the value of maxGram. */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. Maximum is 300. */
  maxGram?: number;
  /** Character classes to keep in the tokens. */
  tokenChars?: TokenCharacterKind[];
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.NGramTokenizer";
}

export function nGramTokenizerSerializer(item: NGramTokenizer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
    tokenChars: !item["tokenChars"]
      ? item["tokenChars"]
      : item["tokenChars"].map((p: any) => {
          return p;
        }),
  };
}

export function nGramTokenizerDeserializer(item: any): NGramTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
    tokenChars: !item["tokenChars"]
      ? item["tokenChars"]
      : item["tokenChars"].map((p: any) => {
          return p;
        }),
  };
}

/** Tokenizer for path-like hierarchies. This tokenizer is implemented using Apache Lucene. */
export interface PathHierarchyTokenizerV2 extends LexicalTokenizer {
  /** The delimiter character to use. Default is "/". */
  delimiter?: string;
  /** A value that, if set, replaces the delimiter character. Default is "/". */
  replacement?: string;
  /** The maximum token length. Default and maximum is 300. */
  maxTokenLength?: number;
  /** A value indicating whether to generate tokens in reverse order. Default is false. */
  reverseTokenOrder?: boolean;
  /** The number of initial tokens to skip. Default is 0. */
  numberOfTokensToSkip?: number;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.PathHierarchyTokenizerV2";
}

export function pathHierarchyTokenizerV2Serializer(item: PathHierarchyTokenizerV2): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    delimiter: item["delimiter"],
    replacement: item["replacement"],
    maxTokenLength: item["maxTokenLength"],
    reverse: item["reverseTokenOrder"],
    skip: item["numberOfTokensToSkip"],
  };
}

export function pathHierarchyTokenizerV2Deserializer(item: any): PathHierarchyTokenizerV2 {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    delimiter: item["delimiter"],
    replacement: item["replacement"],
    maxTokenLength: item["maxTokenLength"],
    reverseTokenOrder: item["reverse"],
    numberOfTokensToSkip: item["skip"],
  };
}

/** Tokenizer that uses regex pattern matching to construct distinct tokens. This tokenizer is implemented using Apache Lucene. */
export interface PatternTokenizer extends LexicalTokenizer {
  /** A regular expression pattern to match token separators. Default is an expression that matches one or more non-word characters. */
  pattern?: string;
  /** Regular expression flags, specified as a '|' separated string of RegexFlags values. */
  flags?: RegexFlags[];
  /** The zero-based ordinal of the matching group in the regular expression pattern to extract into tokens. Use -1 if you want to use the entire pattern to split the input into tokens, irrespective of matching groups. Default is -1. */
  group?: number;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.PatternTokenizer";
}

export function patternTokenizerSerializer(item: PatternTokenizer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    pattern: item["pattern"],
    flags: !item["flags"]
      ? item["flags"]
      : buildPipeCollection(
          item["flags"].map((p: any) => {
            return p;
          }),
        ),
    group: item["group"],
  };
}

export function patternTokenizerDeserializer(item: any): PatternTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    pattern: item["pattern"],
    flags:
      item["flags"] === null || item["flags"] === undefined
        ? item["flags"]
        : parsePipeCollection(item["flags"]),
    group: item["group"],
  };
}

/** Breaks text following the Unicode Text Segmentation rules. This tokenizer is implemented using Apache Lucene. */
export interface LuceneStandardTokenizer extends LexicalTokenizer {
  /** The maximum token length. Default is 255. Tokens longer than the maximum length are split. */
  maxTokenLength?: number;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.StandardTokenizer";
}

export function luceneStandardTokenizerSerializer(item: LuceneStandardTokenizer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

export function luceneStandardTokenizerDeserializer(item: any): LuceneStandardTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

/** Breaks text following the Unicode Text Segmentation rules. This tokenizer is implemented using Apache Lucene. */
export interface LuceneStandardTokenizerV2 extends LexicalTokenizer {
  /** The maximum token length. Default is 255. Tokens longer than the maximum length are split. The maximum token length that can be used is 300 characters. */
  maxTokenLength?: number;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.StandardTokenizerV2";
}

export function luceneStandardTokenizerV2Serializer(item: LuceneStandardTokenizerV2): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

export function luceneStandardTokenizerV2Deserializer(item: any): LuceneStandardTokenizerV2 {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

/** Tokenizes urls and emails as one token. This tokenizer is implemented using Apache Lucene. */
export interface UaxUrlEmailTokenizer extends LexicalTokenizer {
  /** The maximum token length. Default is 255. Tokens longer than the maximum length are split. The maximum token length that can be used is 300 characters. */
  maxTokenLength?: number;
  /** A URI fragment specifying the type of tokenizer. */
  odatatype: "#Microsoft.Azure.Search.UaxUrlEmailTokenizer";
}

export function uaxUrlEmailTokenizerSerializer(item: UaxUrlEmailTokenizer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

export function uaxUrlEmailTokenizerDeserializer(item: any): UaxUrlEmailTokenizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxTokenLength: item["maxTokenLength"],
  };
}

export function tokenFilterUnionArraySerializer(result: Array<TokenFilterUnion>): any[] {
  return result.map((item) => {
    return tokenFilterUnionSerializer(item);
  });
}

export function tokenFilterUnionArrayDeserializer(result: Array<TokenFilterUnion>): any[] {
  return result.map((item) => {
    return tokenFilterUnionDeserializer(item);
  });
}

/** Base type for token filters. */
export interface TokenFilter {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Azure.Search.AsciiFoldingTokenFilter, #Microsoft.Azure.Search.CjkBigramTokenFilter, #Microsoft.Azure.Search.CommonGramTokenFilter, #Microsoft.Azure.Search.DictionaryDecompounderTokenFilter, #Microsoft.Azure.Search.EdgeNGramTokenFilter, #Microsoft.Azure.Search.EdgeNGramTokenFilterV2, #Microsoft.Azure.Search.ElisionTokenFilter, #Microsoft.Azure.Search.KeepTokenFilter, #Microsoft.Azure.Search.KeywordMarkerTokenFilter, #Microsoft.Azure.Search.LengthTokenFilter, #Microsoft.Azure.Search.LimitTokenFilter, #Microsoft.Azure.Search.NGramTokenFilter, #Microsoft.Azure.Search.NGramTokenFilterV2, #Microsoft.Azure.Search.PatternCaptureTokenFilter, #Microsoft.Azure.Search.PatternReplaceTokenFilter, #Microsoft.Azure.Search.PhoneticTokenFilter, #Microsoft.Azure.Search.ShingleTokenFilter, #Microsoft.Azure.Search.SnowballTokenFilter, #Microsoft.Azure.Search.StemmerTokenFilter, #Microsoft.Azure.Search.StemmerOverrideTokenFilter, #Microsoft.Azure.Search.StopwordsTokenFilter, #Microsoft.Azure.Search.SynonymTokenFilter, #Microsoft.Azure.Search.TruncateTokenFilter, #Microsoft.Azure.Search.UniqueTokenFilter, #Microsoft.Azure.Search.WordDelimiterTokenFilter */
  odatatype: string;
  /** The name of the token filter. It must only contain letters, digits, spaces, dashes or underscores, can only start and end with alphanumeric characters, and is limited to 128 characters. */
  name: string;
}

export function tokenFilterSerializer(item: TokenFilter): any {
  return { "@odata.type": item["odatatype"], name: item["name"] };
}

export function tokenFilterDeserializer(item: any): TokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
  };
}

/** Alias for TokenFilterUnion */
export type TokenFilterUnion =
  | AsciiFoldingTokenFilter
  | CjkBigramTokenFilter
  | CommonGramTokenFilter
  | DictionaryDecompounderTokenFilter
  | EdgeNGramTokenFilter
  | EdgeNGramTokenFilterV2
  | ElisionTokenFilter
  | KeepTokenFilter
  | KeywordMarkerTokenFilter
  | LengthTokenFilter
  | LimitTokenFilter
  | NGramTokenFilter
  | NGramTokenFilterV2
  | PatternCaptureTokenFilter
  | PatternReplaceTokenFilter
  | PhoneticTokenFilter
  | ShingleTokenFilter
  | SnowballTokenFilter
  | StemmerTokenFilter
  | StemmerOverrideTokenFilter
  | StopwordsTokenFilter
  | SynonymTokenFilter
  | TruncateTokenFilter
  | UniqueTokenFilter
  | WordDelimiterTokenFilter
  | TokenFilter;

export function tokenFilterUnionSerializer(item: TokenFilterUnion): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.AsciiFoldingTokenFilter":
      return asciiFoldingTokenFilterSerializer(item as AsciiFoldingTokenFilter);

    case "#Microsoft.Azure.Search.CjkBigramTokenFilter":
      return cjkBigramTokenFilterSerializer(item as CjkBigramTokenFilter);

    case "#Microsoft.Azure.Search.CommonGramTokenFilter":
      return commonGramTokenFilterSerializer(item as CommonGramTokenFilter);

    case "#Microsoft.Azure.Search.DictionaryDecompounderTokenFilter":
      return dictionaryDecompounderTokenFilterSerializer(item as DictionaryDecompounderTokenFilter);

    case "#Microsoft.Azure.Search.EdgeNGramTokenFilter":
      return edgeNGramTokenFilterSerializer(item as EdgeNGramTokenFilter);

    case "#Microsoft.Azure.Search.EdgeNGramTokenFilterV2":
      return edgeNGramTokenFilterV2Serializer(item as EdgeNGramTokenFilterV2);

    case "#Microsoft.Azure.Search.ElisionTokenFilter":
      return elisionTokenFilterSerializer(item as ElisionTokenFilter);

    case "#Microsoft.Azure.Search.KeepTokenFilter":
      return keepTokenFilterSerializer(item as KeepTokenFilter);

    case "#Microsoft.Azure.Search.KeywordMarkerTokenFilter":
      return keywordMarkerTokenFilterSerializer(item as KeywordMarkerTokenFilter);

    case "#Microsoft.Azure.Search.LengthTokenFilter":
      return lengthTokenFilterSerializer(item as LengthTokenFilter);

    case "#Microsoft.Azure.Search.LimitTokenFilter":
      return limitTokenFilterSerializer(item as LimitTokenFilter);

    case "#Microsoft.Azure.Search.NGramTokenFilter":
      return nGramTokenFilterSerializer(item as NGramTokenFilter);

    case "#Microsoft.Azure.Search.NGramTokenFilterV2":
      return nGramTokenFilterV2Serializer(item as NGramTokenFilterV2);

    case "#Microsoft.Azure.Search.PatternCaptureTokenFilter":
      return patternCaptureTokenFilterSerializer(item as PatternCaptureTokenFilter);

    case "#Microsoft.Azure.Search.PatternReplaceTokenFilter":
      return patternReplaceTokenFilterSerializer(item as PatternReplaceTokenFilter);

    case "#Microsoft.Azure.Search.PhoneticTokenFilter":
      return phoneticTokenFilterSerializer(item as PhoneticTokenFilter);

    case "#Microsoft.Azure.Search.ShingleTokenFilter":
      return shingleTokenFilterSerializer(item as ShingleTokenFilter);

    case "#Microsoft.Azure.Search.SnowballTokenFilter":
      return snowballTokenFilterSerializer(item as SnowballTokenFilter);

    case "#Microsoft.Azure.Search.StemmerTokenFilter":
      return stemmerTokenFilterSerializer(item as StemmerTokenFilter);

    case "#Microsoft.Azure.Search.StemmerOverrideTokenFilter":
      return stemmerOverrideTokenFilterSerializer(item as StemmerOverrideTokenFilter);

    case "#Microsoft.Azure.Search.StopwordsTokenFilter":
      return stopwordsTokenFilterSerializer(item as StopwordsTokenFilter);

    case "#Microsoft.Azure.Search.SynonymTokenFilter":
      return synonymTokenFilterSerializer(item as SynonymTokenFilter);

    case "#Microsoft.Azure.Search.TruncateTokenFilter":
      return truncateTokenFilterSerializer(item as TruncateTokenFilter);

    case "#Microsoft.Azure.Search.UniqueTokenFilter":
      return uniqueTokenFilterSerializer(item as UniqueTokenFilter);

    case "#Microsoft.Azure.Search.WordDelimiterTokenFilter":
      return wordDelimiterTokenFilterSerializer(item as WordDelimiterTokenFilter);

    default:
      return tokenFilterSerializer(item);
  }
}

export function tokenFilterUnionDeserializer(item: any): TokenFilterUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.AsciiFoldingTokenFilter":
      return asciiFoldingTokenFilterDeserializer(item as AsciiFoldingTokenFilter);

    case "#Microsoft.Azure.Search.CjkBigramTokenFilter":
      return cjkBigramTokenFilterDeserializer(item as CjkBigramTokenFilter);

    case "#Microsoft.Azure.Search.CommonGramTokenFilter":
      return commonGramTokenFilterDeserializer(item as CommonGramTokenFilter);

    case "#Microsoft.Azure.Search.DictionaryDecompounderTokenFilter":
      return dictionaryDecompounderTokenFilterDeserializer(
        item as DictionaryDecompounderTokenFilter,
      );

    case "#Microsoft.Azure.Search.EdgeNGramTokenFilter":
      return edgeNGramTokenFilterDeserializer(item as EdgeNGramTokenFilter);

    case "#Microsoft.Azure.Search.EdgeNGramTokenFilterV2":
      return edgeNGramTokenFilterV2Deserializer(item as EdgeNGramTokenFilterV2);

    case "#Microsoft.Azure.Search.ElisionTokenFilter":
      return elisionTokenFilterDeserializer(item as ElisionTokenFilter);

    case "#Microsoft.Azure.Search.KeepTokenFilter":
      return keepTokenFilterDeserializer(item as KeepTokenFilter);

    case "#Microsoft.Azure.Search.KeywordMarkerTokenFilter":
      return keywordMarkerTokenFilterDeserializer(item as KeywordMarkerTokenFilter);

    case "#Microsoft.Azure.Search.LengthTokenFilter":
      return lengthTokenFilterDeserializer(item as LengthTokenFilter);

    case "#Microsoft.Azure.Search.LimitTokenFilter":
      return limitTokenFilterDeserializer(item as LimitTokenFilter);

    case "#Microsoft.Azure.Search.NGramTokenFilter":
      return nGramTokenFilterDeserializer(item as NGramTokenFilter);

    case "#Microsoft.Azure.Search.NGramTokenFilterV2":
      return nGramTokenFilterV2Deserializer(item as NGramTokenFilterV2);

    case "#Microsoft.Azure.Search.PatternCaptureTokenFilter":
      return patternCaptureTokenFilterDeserializer(item as PatternCaptureTokenFilter);

    case "#Microsoft.Azure.Search.PatternReplaceTokenFilter":
      return patternReplaceTokenFilterDeserializer(item as PatternReplaceTokenFilter);

    case "#Microsoft.Azure.Search.PhoneticTokenFilter":
      return phoneticTokenFilterDeserializer(item as PhoneticTokenFilter);

    case "#Microsoft.Azure.Search.ShingleTokenFilter":
      return shingleTokenFilterDeserializer(item as ShingleTokenFilter);

    case "#Microsoft.Azure.Search.SnowballTokenFilter":
      return snowballTokenFilterDeserializer(item as SnowballTokenFilter);

    case "#Microsoft.Azure.Search.StemmerTokenFilter":
      return stemmerTokenFilterDeserializer(item as StemmerTokenFilter);

    case "#Microsoft.Azure.Search.StemmerOverrideTokenFilter":
      return stemmerOverrideTokenFilterDeserializer(item as StemmerOverrideTokenFilter);

    case "#Microsoft.Azure.Search.StopwordsTokenFilter":
      return stopwordsTokenFilterDeserializer(item as StopwordsTokenFilter);

    case "#Microsoft.Azure.Search.SynonymTokenFilter":
      return synonymTokenFilterDeserializer(item as SynonymTokenFilter);

    case "#Microsoft.Azure.Search.TruncateTokenFilter":
      return truncateTokenFilterDeserializer(item as TruncateTokenFilter);

    case "#Microsoft.Azure.Search.UniqueTokenFilter":
      return uniqueTokenFilterDeserializer(item as UniqueTokenFilter);

    case "#Microsoft.Azure.Search.WordDelimiterTokenFilter":
      return wordDelimiterTokenFilterDeserializer(item as WordDelimiterTokenFilter);

    default:
      return tokenFilterDeserializer(item);
  }
}

/** Converts alphabetic, numeric, and symbolic Unicode characters which are not in the first 127 ASCII characters (the "Basic Latin" Unicode block) into their ASCII equivalents, if such equivalents exist. This token filter is implemented using Apache Lucene. */
export interface AsciiFoldingTokenFilter extends TokenFilter {
  /** A value indicating whether the original token will be kept. Default is false. */
  preserveOriginal?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.AsciiFoldingTokenFilter";
}

export function asciiFoldingTokenFilterSerializer(item: AsciiFoldingTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    preserveOriginal: item["preserveOriginal"],
  };
}

export function asciiFoldingTokenFilterDeserializer(item: any): AsciiFoldingTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    preserveOriginal: item["preserveOriginal"],
  };
}

/** Forms bigrams of CJK terms that are generated from the standard tokenizer. This token filter is implemented using Apache Lucene. */
export interface CjkBigramTokenFilter extends TokenFilter {
  /** The scripts to ignore. */
  ignoreScripts?: CjkBigramTokenFilterScripts[];
  /** A value indicating whether to output both unigrams and bigrams (if true), or just bigrams (if false). Default is false. */
  outputUnigrams?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.CjkBigramTokenFilter";
}

export function cjkBigramTokenFilterSerializer(item: CjkBigramTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    ignoreScripts: !item["ignoreScripts"]
      ? item["ignoreScripts"]
      : item["ignoreScripts"].map((p: any) => {
          return p;
        }),
    outputUnigrams: item["outputUnigrams"],
  };
}

export function cjkBigramTokenFilterDeserializer(item: any): CjkBigramTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    ignoreScripts: !item["ignoreScripts"]
      ? item["ignoreScripts"]
      : item["ignoreScripts"].map((p: any) => {
          return p;
        }),
    outputUnigrams: item["outputUnigrams"],
  };
}

/** Scripts that can be ignored by CjkBigramTokenFilter. */
export type CjkBigramTokenFilterScripts = "han" | "hiragana" | "katakana" | "hangul";

/** Construct bigrams for frequently occurring terms while indexing. Single terms are still indexed too, with bigrams overlaid. This token filter is implemented using Apache Lucene. */
export interface CommonGramTokenFilter extends TokenFilter {
  /** The set of common words. */
  commonWords: string[];
  /** A value indicating whether common words matching will be case insensitive. Default is false. */
  ignoreCase?: boolean;
  /** A value that indicates whether the token filter is in query mode. When in query mode, the token filter generates bigrams and then removes common words and single terms followed by a common word. Default is false. */
  useQueryMode?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.CommonGramTokenFilter";
}

export function commonGramTokenFilterSerializer(item: CommonGramTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    commonWords: item["commonWords"].map((p: any) => {
      return p;
    }),
    ignoreCase: item["ignoreCase"],
    queryMode: item["useQueryMode"],
  };
}

export function commonGramTokenFilterDeserializer(item: any): CommonGramTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    commonWords: item["commonWords"].map((p: any) => {
      return p;
    }),
    ignoreCase: item["ignoreCase"],
    useQueryMode: item["queryMode"],
  };
}

/** Decomposes compound words found in many Germanic languages. This token filter is implemented using Apache Lucene. */
export interface DictionaryDecompounderTokenFilter extends TokenFilter {
  /** The list of words to match against. */
  wordList: string[];
  /** The minimum word size. Only words longer than this get processed. Default is 5. Maximum is 300. */
  minWordSize?: number;
  /** The minimum subword size. Only subwords longer than this are outputted. Default is 2. Maximum is 300. */
  minSubwordSize?: number;
  /** The maximum subword size. Only subwords shorter than this are outputted. Default is 15. Maximum is 300. */
  maxSubwordSize?: number;
  /** A value indicating whether to add only the longest matching subword to the output. Default is false. */
  onlyLongestMatch?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.DictionaryDecompounderTokenFilter";
}

export function dictionaryDecompounderTokenFilterSerializer(
  item: DictionaryDecompounderTokenFilter,
): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    wordList: item["wordList"].map((p: any) => {
      return p;
    }),
    minWordSize: item["minWordSize"],
    minSubwordSize: item["minSubwordSize"],
    maxSubwordSize: item["maxSubwordSize"],
    onlyLongestMatch: item["onlyLongestMatch"],
  };
}

export function dictionaryDecompounderTokenFilterDeserializer(
  item: any,
): DictionaryDecompounderTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    wordList: item["wordList"].map((p: any) => {
      return p;
    }),
    minWordSize: item["minWordSize"],
    minSubwordSize: item["minSubwordSize"],
    maxSubwordSize: item["maxSubwordSize"],
    onlyLongestMatch: item["onlyLongestMatch"],
  };
}

/** Generates n-grams of the given size(s) starting from the front or the back of an input token. This token filter is implemented using Apache Lucene. */
export interface EdgeNGramTokenFilter extends TokenFilter {
  /** The minimum n-gram length. Default is 1. Must be less than the value of maxGram. */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. */
  maxGram?: number;
  /** Specifies which side of the input the n-gram should be generated from. Default is "front". */
  side?: EdgeNGramTokenFilterSide;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.EdgeNGramTokenFilter";
}

export function edgeNGramTokenFilterSerializer(item: EdgeNGramTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
    side: item["side"],
  };
}

export function edgeNGramTokenFilterDeserializer(item: any): EdgeNGramTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
    side: item["side"],
  };
}

/** Specifies which side of the input an n-gram should be generated from. */
export type EdgeNGramTokenFilterSide = "front" | "back";

/** Generates n-grams of the given size(s) starting from the front or the back of an input token. This token filter is implemented using Apache Lucene. */
export interface EdgeNGramTokenFilterV2 extends TokenFilter {
  /** The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the value of maxGram. */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. Maximum is 300. */
  maxGram?: number;
  /** Specifies which side of the input the n-gram should be generated from. Default is "front". */
  side?: EdgeNGramTokenFilterSide;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.EdgeNGramTokenFilterV2";
}

export function edgeNGramTokenFilterV2Serializer(item: EdgeNGramTokenFilterV2): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
    side: item["side"],
  };
}

export function edgeNGramTokenFilterV2Deserializer(item: any): EdgeNGramTokenFilterV2 {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
    side: item["side"],
  };
}

/** Removes elisions. For example, "l'avion" (the plane) will be converted to "avion" (plane). This token filter is implemented using Apache Lucene. */
export interface ElisionTokenFilter extends TokenFilter {
  /** The set of articles to remove. */
  articles?: string[];
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.ElisionTokenFilter";
}

export function elisionTokenFilterSerializer(item: ElisionTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    articles: !item["articles"]
      ? item["articles"]
      : item["articles"].map((p: any) => {
          return p;
        }),
  };
}

export function elisionTokenFilterDeserializer(item: any): ElisionTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    articles: !item["articles"]
      ? item["articles"]
      : item["articles"].map((p: any) => {
          return p;
        }),
  };
}

/** A token filter that only keeps tokens with text contained in a specified list of words. This token filter is implemented using Apache Lucene. */
export interface KeepTokenFilter extends TokenFilter {
  /** The list of words to keep. */
  keepWords: string[];
  /** A value indicating whether to lower case all words first. Default is false. */
  lowerCaseKeepWords?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.KeepTokenFilter";
}

export function keepTokenFilterSerializer(item: KeepTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    keepWords: item["keepWords"].map((p: any) => {
      return p;
    }),
    keepWordsCase: item["lowerCaseKeepWords"],
  };
}

export function keepTokenFilterDeserializer(item: any): KeepTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    keepWords: item["keepWords"].map((p: any) => {
      return p;
    }),
    lowerCaseKeepWords: item["keepWordsCase"],
  };
}

/** Marks terms as keywords. This token filter is implemented using Apache Lucene. */
export interface KeywordMarkerTokenFilter extends TokenFilter {
  /** A list of words to mark as keywords. */
  keywords: string[];
  /** A value indicating whether to ignore case. If true, all words are converted to lower case first. Default is false. */
  ignoreCase?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.KeywordMarkerTokenFilter";
}

export function keywordMarkerTokenFilterSerializer(item: KeywordMarkerTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    keywords: item["keywords"].map((p: any) => {
      return p;
    }),
    ignoreCase: item["ignoreCase"],
  };
}

export function keywordMarkerTokenFilterDeserializer(item: any): KeywordMarkerTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    keywords: item["keywords"].map((p: any) => {
      return p;
    }),
    ignoreCase: item["ignoreCase"],
  };
}

/** Removes words that are too long or too short. This token filter is implemented using Apache Lucene. */
export interface LengthTokenFilter extends TokenFilter {
  /** The minimum length in characters. Default is 0. Maximum is 300. Must be less than the value of max. */
  minLength?: number;
  /** The maximum length in characters. Default and maximum is 300. */
  maxLength?: number;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.LengthTokenFilter";
}

export function lengthTokenFilterSerializer(item: LengthTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    min: item["minLength"],
    max: item["maxLength"],
  };
}

export function lengthTokenFilterDeserializer(item: any): LengthTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    minLength: item["min"],
    maxLength: item["max"],
  };
}

/** Limits the number of tokens while indexing. This token filter is implemented using Apache Lucene. */
export interface LimitTokenFilter extends TokenFilter {
  /** The maximum number of tokens to produce. Default is 1. */
  maxTokenCount?: number;
  /** A value indicating whether all tokens from the input must be consumed even if maxTokenCount is reached. Default is false. */
  consumeAllTokens?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.LimitTokenFilter";
}

export function limitTokenFilterSerializer(item: LimitTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxTokenCount: item["maxTokenCount"],
    consumeAllTokens: item["consumeAllTokens"],
  };
}

export function limitTokenFilterDeserializer(item: any): LimitTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxTokenCount: item["maxTokenCount"],
    consumeAllTokens: item["consumeAllTokens"],
  };
}

/** Generates n-grams of the given size(s). This token filter is implemented using Apache Lucene. */
export interface NGramTokenFilter extends TokenFilter {
  /** The minimum n-gram length. Default is 1. Must be less than the value of maxGram. */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. */
  maxGram?: number;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.NGramTokenFilter";
}

export function nGramTokenFilterSerializer(item: NGramTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
  };
}

export function nGramTokenFilterDeserializer(item: any): NGramTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
  };
}

/** Generates n-grams of the given size(s). This token filter is implemented using Apache Lucene. */
export interface NGramTokenFilterV2 extends TokenFilter {
  /** The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the value of maxGram. */
  minGram?: number;
  /** The maximum n-gram length. Default is 2. Maximum is 300. */
  maxGram?: number;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.NGramTokenFilterV2";
}

export function nGramTokenFilterV2Serializer(item: NGramTokenFilterV2): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
  };
}

export function nGramTokenFilterV2Deserializer(item: any): NGramTokenFilterV2 {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    minGram: item["minGram"],
    maxGram: item["maxGram"],
  };
}

/** Uses Java regexes to emit multiple tokens - one for each capture group in one or more patterns. This token filter is implemented using Apache Lucene. */
export interface PatternCaptureTokenFilter extends TokenFilter {
  /** A list of patterns to match against each token. */
  patterns: string[];
  /** A value indicating whether to return the original token even if one of the patterns matches. Default is true. */
  preserveOriginal?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.PatternCaptureTokenFilter";
}

export function patternCaptureTokenFilterSerializer(item: PatternCaptureTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
    preserveOriginal: item["preserveOriginal"],
  };
}

export function patternCaptureTokenFilterDeserializer(item: any): PatternCaptureTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
    preserveOriginal: item["preserveOriginal"],
  };
}

/** A character filter that replaces characters in the input string. It uses a regular expression to identify character sequences to preserve and a replacement pattern to identify characters to replace. For example, given the input text "aa bb aa bb", pattern "(aa)\\s+(bb)", and replacement "$1#$2", the result would be "aa#bb aa#bb". This token filter is implemented using Apache Lucene. */
export interface PatternReplaceTokenFilter extends TokenFilter {
  /** A regular expression pattern. */
  pattern: string;
  /** The replacement text. */
  replacement: string;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.PatternReplaceTokenFilter";
}

export function patternReplaceTokenFilterSerializer(item: PatternReplaceTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    pattern: item["pattern"],
    replacement: item["replacement"],
  };
}

export function patternReplaceTokenFilterDeserializer(item: any): PatternReplaceTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    pattern: item["pattern"],
    replacement: item["replacement"],
  };
}

/** Create tokens for phonetic matches. This token filter is implemented using Apache Lucene. */
export interface PhoneticTokenFilter extends TokenFilter {
  /** The phonetic encoder to use. Default is "metaphone". */
  encoder?: PhoneticEncoder;
  /** A value indicating whether encoded tokens should replace original tokens. If false, encoded tokens are added as synonyms. Default is true. */
  replaceOriginalTokens?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.PhoneticTokenFilter";
}

export function phoneticTokenFilterSerializer(item: PhoneticTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    encoder: item["encoder"],
    replace: item["replaceOriginalTokens"],
  };
}

export function phoneticTokenFilterDeserializer(item: any): PhoneticTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    encoder: item["encoder"],
    replaceOriginalTokens: item["replace"],
  };
}

/** Identifies the type of phonetic encoder to use with a PhoneticTokenFilter. */
export type PhoneticEncoder =
  | "metaphone"
  | "doubleMetaphone"
  | "soundex"
  | "refinedSoundex"
  | "caverphone1"
  | "caverphone2"
  | "cologne"
  | "nysiis"
  | "koelnerPhonetik"
  | "haasePhonetik"
  | "beiderMorse";

/** Creates combinations of tokens as a single token. This token filter is implemented using Apache Lucene. */
export interface ShingleTokenFilter extends TokenFilter {
  /** The maximum shingle size. Default and minimum value is 2. */
  maxShingleSize?: number;
  /** The minimum shingle size. Default and minimum value is 2. Must be less than the value of maxShingleSize. */
  minShingleSize?: number;
  /** A value indicating whether the output stream will contain the input tokens (unigrams) as well as shingles. Default is true. */
  outputUnigrams?: boolean;
  /** A value indicating whether to output unigrams for those times when no shingles are available. This property takes precedence when outputUnigrams is set to false. Default is false. */
  outputUnigramsIfNoShingles?: boolean;
  /** The string to use when joining adjacent tokens to form a shingle. Default is a single space (" "). */
  tokenSeparator?: string;
  /** The string to insert for each position at which there is no token. Default is an underscore ("_"). */
  filterToken?: string;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.ShingleTokenFilter";
}

export function shingleTokenFilterSerializer(item: ShingleTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    maxShingleSize: item["maxShingleSize"],
    minShingleSize: item["minShingleSize"],
    outputUnigrams: item["outputUnigrams"],
    outputUnigramsIfNoShingles: item["outputUnigramsIfNoShingles"],
    tokenSeparator: item["tokenSeparator"],
    filterToken: item["filterToken"],
  };
}

export function shingleTokenFilterDeserializer(item: any): ShingleTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    maxShingleSize: item["maxShingleSize"],
    minShingleSize: item["minShingleSize"],
    outputUnigrams: item["outputUnigrams"],
    outputUnigramsIfNoShingles: item["outputUnigramsIfNoShingles"],
    tokenSeparator: item["tokenSeparator"],
    filterToken: item["filterToken"],
  };
}

/** A filter that stems words using a Snowball-generated stemmer. This token filter is implemented using Apache Lucene. */
export interface SnowballTokenFilter extends TokenFilter {
  /** The language to use. */
  language: SnowballTokenFilterLanguage;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.SnowballTokenFilter";
}

export function snowballTokenFilterSerializer(item: SnowballTokenFilter): any {
  return { "@odata.type": item["odatatype"], name: item["name"], language: item["language"] };
}

export function snowballTokenFilterDeserializer(item: any): SnowballTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    language: item["language"],
  };
}

/** The language to use for a Snowball token filter. */
export type SnowballTokenFilterLanguage =
  | "armenian"
  | "basque"
  | "catalan"
  | "danish"
  | "dutch"
  | "english"
  | "finnish"
  | "french"
  | "german"
  | "german2"
  | "hungarian"
  | "italian"
  | "kp"
  | "lovins"
  | "norwegian"
  | "porter"
  | "portuguese"
  | "romanian"
  | "russian"
  | "spanish"
  | "swedish"
  | "turkish";

/** Language specific stemming filter. This token filter is implemented using Apache Lucene. See https://learn.microsoft.com/rest/api/searchservice/Custom-analyzers-in-Azure-Search#TokenFilters */
export interface StemmerTokenFilter extends TokenFilter {
  /** The language to use. */
  language: StemmerTokenFilterLanguage;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.StemmerTokenFilter";
}

export function stemmerTokenFilterSerializer(item: StemmerTokenFilter): any {
  return { "@odata.type": item["odatatype"], name: item["name"], language: item["language"] };
}

export function stemmerTokenFilterDeserializer(item: any): StemmerTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    language: item["language"],
  };
}

/** The language to use for a stemmer token filter. */
export type StemmerTokenFilterLanguage =
  | "arabic"
  | "armenian"
  | "basque"
  | "brazilian"
  | "bulgarian"
  | "catalan"
  | "czech"
  | "danish"
  | "dutch"
  | "dutchKp"
  | "english"
  | "lightEnglish"
  | "minimalEnglish"
  | "possessiveEnglish"
  | "porter2"
  | "lovins"
  | "finnish"
  | "lightFinnish"
  | "french"
  | "lightFrench"
  | "minimalFrench"
  | "galician"
  | "minimalGalician"
  | "german"
  | "german2"
  | "lightGerman"
  | "minimalGerman"
  | "greek"
  | "hindi"
  | "hungarian"
  | "lightHungarian"
  | "indonesian"
  | "irish"
  | "italian"
  | "lightItalian"
  | "sorani"
  | "latvian"
  | "norwegian"
  | "lightNorwegian"
  | "minimalNorwegian"
  | "lightNynorsk"
  | "minimalNynorsk"
  | "portuguese"
  | "lightPortuguese"
  | "minimalPortuguese"
  | "portugueseRslp"
  | "romanian"
  | "russian"
  | "lightRussian"
  | "spanish"
  | "lightSpanish"
  | "swedish"
  | "lightSwedish"
  | "turkish";

/** Provides the ability to override other stemming filters with custom dictionary-based stemming. Any dictionary-stemmed terms will be marked as keywords so that they will not be stemmed with stemmers down the chain. Must be placed before any stemming filters. This token filter is implemented using Apache Lucene. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/StemmerOverrideFilter.html */
export interface StemmerOverrideTokenFilter extends TokenFilter {
  /** A list of stemming rules in the following format: "word => stem", for example: "ran => run". */
  rules: string[];
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.StemmerOverrideTokenFilter";
}

export function stemmerOverrideTokenFilterSerializer(item: StemmerOverrideTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    rules: item["rules"].map((p: any) => {
      return p;
    }),
  };
}

export function stemmerOverrideTokenFilterDeserializer(item: any): StemmerOverrideTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    rules: item["rules"].map((p: any) => {
      return p;
    }),
  };
}

/** Removes stop words from a token stream. This token filter is implemented using Apache Lucene. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/StopFilter.html */
export interface StopwordsTokenFilter extends TokenFilter {
  /** The list of stopwords. This property and the stopwords list property cannot both be set. */
  stopwords?: string[];
  /** A predefined list of stopwords to use. This property and the stopwords property cannot both be set. Default is English. */
  stopwordsList?: StopwordsList;
  /** A value indicating whether to ignore case. If true, all words are converted to lower case first. Default is false. */
  ignoreCase?: boolean;
  /** A value indicating whether to ignore the last search term if it's a stop word. Default is true. */
  removeTrailingStopWords?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.StopwordsTokenFilter";
}

export function stopwordsTokenFilterSerializer(item: StopwordsTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    stopwords: !item["stopwords"]
      ? item["stopwords"]
      : item["stopwords"].map((p: any) => {
          return p;
        }),
    stopwordsList: item["stopwordsList"],
    ignoreCase: item["ignoreCase"],
    removeTrailing: item["removeTrailingStopWords"],
  };
}

export function stopwordsTokenFilterDeserializer(item: any): StopwordsTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    stopwords: !item["stopwords"]
      ? item["stopwords"]
      : item["stopwords"].map((p: any) => {
          return p;
        }),
    stopwordsList: item["stopwordsList"],
    ignoreCase: item["ignoreCase"],
    removeTrailingStopWords: item["removeTrailing"],
  };
}

/** Identifies a predefined list of language-specific stopwords. */
export type StopwordsList =
  | "arabic"
  | "armenian"
  | "basque"
  | "brazilian"
  | "bulgarian"
  | "catalan"
  | "czech"
  | "danish"
  | "dutch"
  | "english"
  | "finnish"
  | "french"
  | "galician"
  | "german"
  | "greek"
  | "hindi"
  | "hungarian"
  | "indonesian"
  | "irish"
  | "italian"
  | "latvian"
  | "norwegian"
  | "persian"
  | "portuguese"
  | "romanian"
  | "russian"
  | "sorani"
  | "spanish"
  | "swedish"
  | "thai"
  | "turkish";

/** Matches single or multi-word synonyms in a token stream. This token filter is implemented using Apache Lucene. */
export interface SynonymTokenFilter extends TokenFilter {
  /** A list of synonyms in following one of two formats: 1. incredible, unbelievable, fabulous => amazing - all terms on the left side of => symbol will be replaced with all terms on its right side; 2. incredible, unbelievable, fabulous, amazing - comma separated list of equivalent words. Set the expand option to change how this list is interpreted. */
  synonyms: string[];
  /** A value indicating whether to case-fold input for matching. Default is false. */
  ignoreCase?: boolean;
  /** A value indicating whether all words in the list of synonyms (if => notation is not used) will map to one another. If true, all words in the list of synonyms (if => notation is not used) will map to one another. The following list: incredible, unbelievable, fabulous, amazing is equivalent to: incredible, unbelievable, fabulous, amazing => incredible, unbelievable, fabulous, amazing. If false, the following list: incredible, unbelievable, fabulous, amazing will be equivalent to: incredible, unbelievable, fabulous, amazing => incredible. Default is true. */
  expand?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.SynonymTokenFilter";
}

export function synonymTokenFilterSerializer(item: SynonymTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    synonyms: item["synonyms"].map((p: any) => {
      return p;
    }),
    ignoreCase: item["ignoreCase"],
    expand: item["expand"],
  };
}

export function synonymTokenFilterDeserializer(item: any): SynonymTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    synonyms: item["synonyms"].map((p: any) => {
      return p;
    }),
    ignoreCase: item["ignoreCase"],
    expand: item["expand"],
  };
}

/** Truncates the terms to a specific length. This token filter is implemented using Apache Lucene. */
export interface TruncateTokenFilter extends TokenFilter {
  /** The length at which terms will be truncated. Default and maximum is 300. */
  length?: number;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.TruncateTokenFilter";
}

export function truncateTokenFilterSerializer(item: TruncateTokenFilter): any {
  return { "@odata.type": item["odatatype"], name: item["name"], length: item["length"] };
}

export function truncateTokenFilterDeserializer(item: any): TruncateTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    length: item["length"],
  };
}

/** Filters out tokens with same text as the previous token. This token filter is implemented using Apache Lucene. */
export interface UniqueTokenFilter extends TokenFilter {
  /** A value indicating whether to remove duplicates only at the same position. Default is false. */
  onlyOnSamePosition?: boolean;
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.UniqueTokenFilter";
}

export function uniqueTokenFilterSerializer(item: UniqueTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    onlyOnSamePosition: item["onlyOnSamePosition"],
  };
}

export function uniqueTokenFilterDeserializer(item: any): UniqueTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    onlyOnSamePosition: item["onlyOnSamePosition"],
  };
}

/** Splits words into subwords and performs optional transformations on subword groups. This token filter is implemented using Apache Lucene. */
export interface WordDelimiterTokenFilter extends TokenFilter {
  /** A value indicating whether to generate part words. If set, causes parts of words to be generated; for example "AzureSearch" becomes "Azure" "Search". Default is true. */
  generateWordParts?: boolean;
  /** A value indicating whether to generate number subwords. Default is true. */
  generateNumberParts?: boolean;
  /** A value indicating whether maximum runs of word parts will be catenated. For example, if this is set to true, "Azure-Search" becomes "AzureSearch". Default is false. */
  catenateWords?: boolean;
  /** A value indicating whether maximum runs of number parts will be catenated. For example, if this is set to true, "1-2" becomes "12". Default is false. */
  catenateNumbers?: boolean;
  /** A value indicating whether all subword parts will be catenated. For example, if this is set to true, "Azure-Search-1" becomes "AzureSearch1". Default is false. */
  catenateAll?: boolean;
  /** A value indicating whether to split words on caseChange. For example, if this is set to true, "AzureSearch" becomes "Azure" "Search". Default is true. */
  splitOnCaseChange?: boolean;
  /** A value indicating whether original words will be preserved and added to the subword list. Default is false. */
  preserveOriginal?: boolean;
  /** A value indicating whether to split on numbers. For example, if this is set to true, "Azure1Search" becomes "Azure" "1" "Search". Default is true. */
  splitOnNumerics?: boolean;
  /** A value indicating whether to remove trailing "'s" for each subword. Default is true. */
  stemEnglishPossessive?: boolean;
  /** A list of tokens to protect from being delimited. */
  protectedWords?: string[];
  /** A URI fragment specifying the type of token filter. */
  odatatype: "#Microsoft.Azure.Search.WordDelimiterTokenFilter";
}

export function wordDelimiterTokenFilterSerializer(item: WordDelimiterTokenFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    generateWordParts: item["generateWordParts"],
    generateNumberParts: item["generateNumberParts"],
    catenateWords: item["catenateWords"],
    catenateNumbers: item["catenateNumbers"],
    catenateAll: item["catenateAll"],
    splitOnCaseChange: item["splitOnCaseChange"],
    preserveOriginal: item["preserveOriginal"],
    splitOnNumerics: item["splitOnNumerics"],
    stemEnglishPossessive: item["stemEnglishPossessive"],
    protectedWords: !item["protectedWords"]
      ? item["protectedWords"]
      : item["protectedWords"].map((p: any) => {
          return p;
        }),
  };
}

export function wordDelimiterTokenFilterDeserializer(item: any): WordDelimiterTokenFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    generateWordParts: item["generateWordParts"],
    generateNumberParts: item["generateNumberParts"],
    catenateWords: item["catenateWords"],
    catenateNumbers: item["catenateNumbers"],
    catenateAll: item["catenateAll"],
    splitOnCaseChange: item["splitOnCaseChange"],
    preserveOriginal: item["preserveOriginal"],
    splitOnNumerics: item["splitOnNumerics"],
    stemEnglishPossessive: item["stemEnglishPossessive"],
    protectedWords: !item["protectedWords"]
      ? item["protectedWords"]
      : item["protectedWords"].map((p: any) => {
          return p;
        }),
  };
}

export function charFilterUnionArraySerializer(result: Array<CharFilterUnion>): any[] {
  return result.map((item) => {
    return charFilterUnionSerializer(item);
  });
}

export function charFilterUnionArrayDeserializer(result: Array<CharFilterUnion>): any[] {
  return result.map((item) => {
    return charFilterUnionDeserializer(item);
  });
}

/** Base type for character filters. */
export interface CharFilter {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Azure.Search.MappingCharFilter, #Microsoft.Azure.Search.PatternReplaceCharFilter */
  odatatype: string;
  /** The name of the char filter. It must only contain letters, digits, spaces, dashes or underscores, can only start and end with alphanumeric characters, and is limited to 128 characters. */
  name: string;
}

export function charFilterSerializer(item: CharFilter): any {
  return { "@odata.type": item["odatatype"], name: item["name"] };
}

export function charFilterDeserializer(item: any): CharFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
  };
}

/** Alias for CharFilterUnion */
export type CharFilterUnion = MappingCharFilter | PatternReplaceCharFilter | CharFilter;

export function charFilterUnionSerializer(item: CharFilterUnion): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.MappingCharFilter":
      return mappingCharFilterSerializer(item as MappingCharFilter);

    case "#Microsoft.Azure.Search.PatternReplaceCharFilter":
      return patternReplaceCharFilterSerializer(item as PatternReplaceCharFilter);

    default:
      return charFilterSerializer(item);
  }
}

export function charFilterUnionDeserializer(item: any): CharFilterUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.MappingCharFilter":
      return mappingCharFilterDeserializer(item as MappingCharFilter);

    case "#Microsoft.Azure.Search.PatternReplaceCharFilter":
      return patternReplaceCharFilterDeserializer(item as PatternReplaceCharFilter);

    default:
      return charFilterDeserializer(item);
  }
}

/** A character filter that applies mappings defined with the mappings option. Matching is greedy (longest pattern matching at a given point wins). Replacement is allowed to be the empty string. This character filter is implemented using Apache Lucene. */
export interface MappingCharFilter extends CharFilter {
  /** A list of mappings of the following format: "a=>b" (all occurrences of the character "a" will be replaced with character "b"). */
  mappings: string[];
  /** A URI fragment specifying the type of char filter. */
  odatatype: "#Microsoft.Azure.Search.MappingCharFilter";
}

export function mappingCharFilterSerializer(item: MappingCharFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    mappings: item["mappings"].map((p: any) => {
      return p;
    }),
  };
}

export function mappingCharFilterDeserializer(item: any): MappingCharFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    mappings: item["mappings"].map((p: any) => {
      return p;
    }),
  };
}

/** A character filter that replaces characters in the input string. It uses a regular expression to identify character sequences to preserve and a replacement pattern to identify characters to replace. For example, given the input text "aa bb aa bb", pattern "(aa)\\s+(bb)", and replacement "$1#$2", the result would be "aa#bb aa#bb". This character filter is implemented using Apache Lucene. */
export interface PatternReplaceCharFilter extends CharFilter {
  /** A regular expression pattern. */
  pattern: string;
  /** The replacement text. */
  replacement: string;
  /** A URI fragment specifying the type of char filter. */
  odatatype: "#Microsoft.Azure.Search.PatternReplaceCharFilter";
}

export function patternReplaceCharFilterSerializer(item: PatternReplaceCharFilter): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    pattern: item["pattern"],
    replacement: item["replacement"],
  };
}

export function patternReplaceCharFilterDeserializer(item: any): PatternReplaceCharFilter {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    pattern: item["pattern"],
    replacement: item["replacement"],
  };
}

export function lexicalNormalizerUnionArraySerializer(
  result: Array<LexicalNormalizerUnion>,
): any[] {
  return result.map((item) => {
    return lexicalNormalizerUnionSerializer(item);
  });
}

export function lexicalNormalizerUnionArrayDeserializer(
  result: Array<LexicalNormalizerUnion>,
): any[] {
  return result.map((item) => {
    return lexicalNormalizerUnionDeserializer(item);
  });
}

/** Base type for normalizers. */
export interface LexicalNormalizer {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Azure.Search.CustomNormalizer */
  odatatype: string;
  /** The name of the char filter. It must only contain letters, digits, spaces, dashes or underscores, can only start and end with alphanumeric characters, and is limited to 128 characters. */
  name: string;
}

export function lexicalNormalizerSerializer(item: LexicalNormalizer): any {
  return { "@odata.type": item["odatatype"], name: item["name"] };
}

export function lexicalNormalizerDeserializer(item: any): LexicalNormalizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
  };
}

/** Alias for LexicalNormalizerUnion */
export type LexicalNormalizerUnion = CustomNormalizer | LexicalNormalizer;

export function lexicalNormalizerUnionSerializer(item: LexicalNormalizerUnion): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.CustomNormalizer":
      return customNormalizerSerializer(item as CustomNormalizer);

    default:
      return lexicalNormalizerSerializer(item);
  }
}

export function lexicalNormalizerUnionDeserializer(item: any): LexicalNormalizerUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.CustomNormalizer":
      return customNormalizerDeserializer(item as CustomNormalizer);

    default:
      return lexicalNormalizerDeserializer(item);
  }
}

/** Allows you to configure normalization for filterable, sortable, and facetable fields, which by default operate with strict matching. This is a user-defined configuration consisting of at least one or more filters, which modify the token that is stored. */
export interface CustomNormalizer extends LexicalNormalizer {
  /** A list of token filters used to filter out or modify the input token. For example, you can specify a lowercase filter that converts all characters to lowercase. The filters are run in the order in which they are listed. */
  tokenFilters?: TokenFilterName[];
  /** A list of character filters used to prepare input text before it is processed. For instance, they can replace certain characters or symbols. The filters are run in the order in which they are listed. */
  charFilters?: CharFilterName[];
  /** A URI fragment specifying the type of normalizer. */
  odatatype: "#Microsoft.Azure.Search.CustomNormalizer";
}

export function customNormalizerSerializer(item: CustomNormalizer): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    tokenFilters: !item["tokenFilters"]
      ? item["tokenFilters"]
      : item["tokenFilters"].map((p: any) => {
          return p;
        }),
    charFilters: !item["charFilters"]
      ? item["charFilters"]
      : item["charFilters"].map((p: any) => {
          return p;
        }),
  };
}

export function customNormalizerDeserializer(item: any): CustomNormalizer {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    tokenFilters: !item["tokenFilters"]
      ? item["tokenFilters"]
      : item["tokenFilters"].map((p: any) => {
          return p;
        }),
    charFilters: !item["charFilters"]
      ? item["charFilters"]
      : item["charFilters"].map((p: any) => {
          return p;
        }),
  };
}

/** Base type for similarity algorithms. Similarity algorithms are used to calculate scores that tie queries to documents. The higher the score, the more relevant the document is to that specific query. Those scores are used to rank the search results. */
export interface SimilarityAlgorithm {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Azure.Search.ClassicSimilarity, #Microsoft.Azure.Search.BM25Similarity */
  odatatype: string;
}

export function similarityAlgorithmSerializer(item: SimilarityAlgorithm): any {
  return { "@odata.type": item["odatatype"] };
}

export function similarityAlgorithmDeserializer(item: any): SimilarityAlgorithm {
  return {
    odatatype: item["@odata.type"],
  };
}

/** Alias for SimilarityAlgorithmUnion */
export type SimilarityAlgorithmUnion = ClassicSimilarity | BM25Similarity | SimilarityAlgorithm;

export function similarityAlgorithmUnionSerializer(item: SimilarityAlgorithmUnion): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.ClassicSimilarity":
      return classicSimilaritySerializer(item as ClassicSimilarity);

    case "#Microsoft.Azure.Search.BM25Similarity":
      return bm25SimilaritySerializer(item as BM25Similarity);

    default:
      return similarityAlgorithmSerializer(item);
  }
}

export function similarityAlgorithmUnionDeserializer(item: any): SimilarityAlgorithmUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.ClassicSimilarity":
      return classicSimilarityDeserializer(item as ClassicSimilarity);

    case "#Microsoft.Azure.Search.BM25Similarity":
      return bm25SimilarityDeserializer(item as BM25Similarity);

    default:
      return similarityAlgorithmDeserializer(item);
  }
}

/** Legacy similarity algorithm which uses the Lucene TFIDFSimilarity implementation of TF-IDF. This variation of TF-IDF introduces static document length normalization as well as coordinating factors that penalize documents that only partially match the searched queries. */
export interface ClassicSimilarity extends SimilarityAlgorithm {
  /** The discriminator for derived types. */
  odatatype: "#Microsoft.Azure.Search.ClassicSimilarity";
}

export function classicSimilaritySerializer(item: ClassicSimilarity): any {
  return { "@odata.type": item["odatatype"] };
}

export function classicSimilarityDeserializer(item: any): ClassicSimilarity {
  return {
    odatatype: item["@odata.type"],
  };
}

/** Ranking function based on the Okapi BM25 similarity algorithm. BM25 is a TF-IDF-like algorithm that includes length normalization (controlled by the 'b' parameter) as well as term frequency saturation (controlled by the 'k1' parameter). */
export interface BM25Similarity extends SimilarityAlgorithm {
  /** This property controls the scaling function between the term frequency of each matching terms and the final relevance score of a document-query pair. By default, a value of 1.2 is used. A value of 0.0 means the score does not scale with an increase in term frequency. */
  k1?: number;
  /** This property controls how the length of a document affects the relevance score. By default, a value of 0.75 is used. A value of 0.0 means no length normalization is applied, while a value of 1.0 means the score is fully normalized by the length of the document. */
  b?: number;
  /** The discriminator for derived types. */
  odatatype: "#Microsoft.Azure.Search.BM25Similarity";
}

export function bm25SimilaritySerializer(item: BM25Similarity): any {
  return { "@odata.type": item["odatatype"], k1: item["k1"], b: item["b"] };
}

export function bm25SimilarityDeserializer(item: any): BM25Similarity {
  return {
    odatatype: item["@odata.type"],
    k1: item["k1"],
    b: item["b"],
  };
}

/** Defines parameters for a search index that influence semantic capabilities. */
export interface SemanticSearch {
  /** Allows you to set the name of a default semantic configuration in your index, making it optional to pass it on as a query parameter every time. */
  defaultConfigurationName?: string;
  /** The semantic configurations for the index. */
  configurations?: SemanticConfiguration[];
}

export function semanticSearchSerializer(item: SemanticSearch): any {
  return {
    defaultConfiguration: item["defaultConfigurationName"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : semanticConfigurationArraySerializer(item["configurations"]),
  };
}

export function semanticSearchDeserializer(item: any): SemanticSearch {
  return {
    defaultConfigurationName: item["defaultConfiguration"],
    configurations: !item["configurations"]
      ? item["configurations"]
      : semanticConfigurationArrayDeserializer(item["configurations"]),
  };
}

export function semanticConfigurationArraySerializer(result: Array<SemanticConfiguration>): any[] {
  return result.map((item) => {
    return semanticConfigurationSerializer(item);
  });
}

export function semanticConfigurationArrayDeserializer(
  result: Array<SemanticConfiguration>,
): any[] {
  return result.map((item) => {
    return semanticConfigurationDeserializer(item);
  });
}

/** Defines a specific configuration to be used in the context of semantic capabilities. */
export interface SemanticConfiguration {
  /** The name of the semantic configuration. */
  name: string;
  /** Describes the title, content, and keyword fields to be used for semantic ranking, captions, highlights, and answers. At least one of the three sub properties (titleField, prioritizedKeywordsFields and prioritizedContentFields) need to be set. */
  prioritizedFields: SemanticPrioritizedFields;
  /** Specifies the score type to be used for the sort order of the search results. */
  rankingOrder?: RankingOrder;
  /** Determines which semantic or query rewrite models to use during model flighting/upgrades. */
  flightingOptIn?: boolean;
}

export function semanticConfigurationSerializer(item: SemanticConfiguration): any {
  return {
    name: item["name"],
    prioritizedFields: semanticPrioritizedFieldsSerializer(item["prioritizedFields"]),
    rankingOrder: item["rankingOrder"],
    flightingOptIn: item["flightingOptIn"],
  };
}

export function semanticConfigurationDeserializer(item: any): SemanticConfiguration {
  return {
    name: item["name"],
    prioritizedFields: semanticPrioritizedFieldsDeserializer(item["prioritizedFields"]),
    rankingOrder: item["rankingOrder"],
    flightingOptIn: item["flightingOptIn"],
  };
}

/** Describes the title, content, and keywords fields to be used for semantic ranking, captions, highlights, and answers. */
export interface SemanticPrioritizedFields {
  /** Defines the title field to be used for semantic ranking, captions, highlights, and answers. If you don't have a title field in your index, leave this blank. */
  titleField?: SemanticField;
  /** Defines the content fields to be used for semantic ranking, captions, highlights, and answers. For the best result, the selected fields should contain text in natural language form. The order of the fields in the array represents their priority. Fields with lower priority may get truncated if the content is long. */
  contentFields?: SemanticField[];
  /** Defines the keyword fields to be used for semantic ranking, captions, highlights, and answers. For the best result, the selected fields should contain a list of keywords. The order of the fields in the array represents their priority. Fields with lower priority may get truncated if the content is long. */
  keywordsFields?: SemanticField[];
}

export function semanticPrioritizedFieldsSerializer(item: SemanticPrioritizedFields): any {
  return {
    titleField: !item["titleField"]
      ? item["titleField"]
      : semanticFieldSerializer(item["titleField"]),
    prioritizedContentFields: !item["contentFields"]
      ? item["contentFields"]
      : semanticFieldArraySerializer(item["contentFields"]),
    prioritizedKeywordsFields: !item["keywordsFields"]
      ? item["keywordsFields"]
      : semanticFieldArraySerializer(item["keywordsFields"]),
  };
}

export function semanticPrioritizedFieldsDeserializer(item: any): SemanticPrioritizedFields {
  return {
    titleField: !item["titleField"]
      ? item["titleField"]
      : semanticFieldDeserializer(item["titleField"]),
    contentFields: !item["prioritizedContentFields"]
      ? item["prioritizedContentFields"]
      : semanticFieldArrayDeserializer(item["prioritizedContentFields"]),
    keywordsFields: !item["prioritizedKeywordsFields"]
      ? item["prioritizedKeywordsFields"]
      : semanticFieldArrayDeserializer(item["prioritizedKeywordsFields"]),
  };
}

/** A field that is used as part of the semantic configuration. */
export interface SemanticField {
  /** File name */
  name: string;
}

export function semanticFieldSerializer(item: SemanticField): any {
  return { fieldName: item["name"] };
}

export function semanticFieldDeserializer(item: any): SemanticField {
  return {
    name: item["fieldName"],
  };
}

export function semanticFieldArraySerializer(result: Array<SemanticField>): any[] {
  return result.map((item) => {
    return semanticFieldSerializer(item);
  });
}

export function semanticFieldArrayDeserializer(result: Array<SemanticField>): any[] {
  return result.map((item) => {
    return semanticFieldDeserializer(item);
  });
}

/** Represents score to use for sort order of documents. */
export enum KnownRankingOrder {
  /** Sets sort order as BoostedRerankerScore */
  BoostedRerankerScore = "BoostedRerankerScore",
  /** Sets sort order as ReRankerScore */
  ReRankerScore = "RerankerScore",
}

/**
 * Represents score to use for sort order of documents. \
 * {@link KnownRankingOrder} can be used interchangeably with RankingOrder,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BoostedRerankerScore**: Sets sort order as BoostedRerankerScore \
 * **RerankerScore**: Sets sort order as ReRankerScore
 */
export type RankingOrder = string;

/** Contains configuration options related to vector search. */
export interface VectorSearch {
  /** Defines combinations of configurations to use with vector search. */
  profiles?: VectorSearchProfile[];
  /** Contains configuration options specific to the algorithm used during indexing or querying. */
  algorithms?: VectorSearchAlgorithmConfigurationUnion[];
  /** Contains configuration options on how to vectorize text vector queries. */
  vectorizers?: VectorSearchVectorizerUnion[];
  /** Contains configuration options specific to the compression method used during indexing or querying. */
  compressions?: VectorSearchCompressionUnion[];
}

export function vectorSearchSerializer(item: VectorSearch): any {
  return {
    profiles: !item["profiles"]
      ? item["profiles"]
      : vectorSearchProfileArraySerializer(item["profiles"]),
    algorithms: !item["algorithms"]
      ? item["algorithms"]
      : vectorSearchAlgorithmConfigurationUnionArraySerializer(item["algorithms"]),
    vectorizers: !item["vectorizers"]
      ? item["vectorizers"]
      : vectorSearchVectorizerUnionArraySerializer(item["vectorizers"]),
    compressions: !item["compressions"]
      ? item["compressions"]
      : vectorSearchCompressionUnionArraySerializer(item["compressions"]),
  };
}

export function vectorSearchDeserializer(item: any): VectorSearch {
  return {
    profiles: !item["profiles"]
      ? item["profiles"]
      : vectorSearchProfileArrayDeserializer(item["profiles"]),
    algorithms: !item["algorithms"]
      ? item["algorithms"]
      : vectorSearchAlgorithmConfigurationUnionArrayDeserializer(item["algorithms"]),
    vectorizers: !item["vectorizers"]
      ? item["vectorizers"]
      : vectorSearchVectorizerUnionArrayDeserializer(item["vectorizers"]),
    compressions: !item["compressions"]
      ? item["compressions"]
      : vectorSearchCompressionUnionArrayDeserializer(item["compressions"]),
  };
}

export function vectorSearchProfileArraySerializer(result: Array<VectorSearchProfile>): any[] {
  return result.map((item) => {
    return vectorSearchProfileSerializer(item);
  });
}

export function vectorSearchProfileArrayDeserializer(result: Array<VectorSearchProfile>): any[] {
  return result.map((item) => {
    return vectorSearchProfileDeserializer(item);
  });
}

/** Defines a combination of configurations to use with vector search. */
export interface VectorSearchProfile {
  /** The name to associate with this particular vector search profile. */
  name: string;
  /** The name of the vector search algorithm configuration that specifies the algorithm and optional parameters. */
  algorithmConfigurationName: string;
  /** The name of the vectorization being configured for use with vector search. */
  vectorizerName?: string;
  /** The name of the compression method configuration that specifies the compression method and optional parameters. */
  compressionName?: string;
}

export function vectorSearchProfileSerializer(item: VectorSearchProfile): any {
  return {
    name: item["name"],
    algorithm: item["algorithmConfigurationName"],
    vectorizer: item["vectorizerName"],
    compression: item["compressionName"],
  };
}

export function vectorSearchProfileDeserializer(item: any): VectorSearchProfile {
  return {
    name: item["name"],
    algorithmConfigurationName: item["algorithm"],
    vectorizerName: item["vectorizer"],
    compressionName: item["compression"],
  };
}

export function vectorSearchAlgorithmConfigurationUnionArraySerializer(
  result: Array<VectorSearchAlgorithmConfigurationUnion>,
): any[] {
  return result.map((item) => {
    return vectorSearchAlgorithmConfigurationUnionSerializer(item);
  });
}

export function vectorSearchAlgorithmConfigurationUnionArrayDeserializer(
  result: Array<VectorSearchAlgorithmConfigurationUnion>,
): any[] {
  return result.map((item) => {
    return vectorSearchAlgorithmConfigurationUnionDeserializer(item);
  });
}

/** Contains configuration options specific to the algorithm used during indexing or querying. */
export interface VectorSearchAlgorithmConfiguration {
  /** The name to associate with this particular configuration. */
  name: string;
  /** Type of VectorSearchAlgorithmConfiguration. */
  /** The discriminator possible values: hnsw, exhaustiveKnn */
  kind: VectorSearchAlgorithmKind;
}

export function vectorSearchAlgorithmConfigurationSerializer(
  item: VectorSearchAlgorithmConfiguration,
): any {
  return { name: item["name"], kind: item["kind"] };
}

export function vectorSearchAlgorithmConfigurationDeserializer(
  item: any,
): VectorSearchAlgorithmConfiguration {
  return {
    name: item["name"],
    kind: item["kind"],
  };
}

/** Alias for VectorSearchAlgorithmConfigurationUnion */
export type VectorSearchAlgorithmConfigurationUnion =
  | HnswAlgorithmConfiguration
  | ExhaustiveKnnAlgorithmConfiguration
  | VectorSearchAlgorithmConfiguration;

export function vectorSearchAlgorithmConfigurationUnionSerializer(
  item: VectorSearchAlgorithmConfigurationUnion,
): any {
  switch (item.kind) {
    case "hnsw":
      return hnswAlgorithmConfigurationSerializer(item as HnswAlgorithmConfiguration);

    case "exhaustiveKnn":
      return exhaustiveKnnAlgorithmConfigurationSerializer(
        item as ExhaustiveKnnAlgorithmConfiguration,
      );

    default:
      return vectorSearchAlgorithmConfigurationSerializer(item);
  }
}

export function vectorSearchAlgorithmConfigurationUnionDeserializer(
  item: any,
): VectorSearchAlgorithmConfigurationUnion {
  switch (item["kind"]) {
    case "hnsw":
      return hnswAlgorithmConfigurationDeserializer(item as HnswAlgorithmConfiguration);

    case "exhaustiveKnn":
      return exhaustiveKnnAlgorithmConfigurationDeserializer(
        item as ExhaustiveKnnAlgorithmConfiguration,
      );

    default:
      return vectorSearchAlgorithmConfigurationDeserializer(item);
  }
}

/** The algorithm used for indexing and querying. */
export enum KnownVectorSearchAlgorithmKind {
  /** HNSW (Hierarchical Navigable Small World), a type of approximate nearest neighbors algorithm. */
  Hnsw = "hnsw",
  /** Exhaustive KNN algorithm which will perform brute-force search. */
  ExhaustiveKnn = "exhaustiveKnn",
}

/**
 * The algorithm used for indexing and querying. \
 * {@link KnownVectorSearchAlgorithmKind} can be used interchangeably with VectorSearchAlgorithmKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **hnsw**: HNSW (Hierarchical Navigable Small World), a type of approximate nearest neighbors algorithm. \
 * **exhaustiveKnn**: Exhaustive KNN algorithm which will perform brute-force search.
 */
export type VectorSearchAlgorithmKind = string;

/** Contains configuration options specific to the HNSW approximate nearest neighbors algorithm used during indexing and querying. The HNSW algorithm offers a tunable trade-off between search speed and accuracy. */
export interface HnswAlgorithmConfiguration extends VectorSearchAlgorithmConfiguration {
  /** Contains the parameters specific to HNSW algorithm. */
  parameters?: HnswParameters;
  /** The name of the kind of algorithm being configured for use with vector search. */
  kind: "hnsw";
}

export function hnswAlgorithmConfigurationSerializer(item: HnswAlgorithmConfiguration): any {
  return {
    name: item["name"],
    kind: item["kind"],
    hnswParameters: !item["parameters"]
      ? item["parameters"]
      : hnswParametersSerializer(item["parameters"]),
  };
}

export function hnswAlgorithmConfigurationDeserializer(item: any): HnswAlgorithmConfiguration {
  return {
    name: item["name"],
    kind: item["kind"],
    parameters: !item["hnswParameters"]
      ? item["hnswParameters"]
      : hnswParametersDeserializer(item["hnswParameters"]),
  };
}

/** Contains the parameters specific to the HNSW algorithm. */
export interface HnswParameters {
  /** The number of bi-directional links created for every new element during construction. Increasing this parameter value may improve recall and reduce retrieval times for datasets with high intrinsic dimensionality at the expense of increased memory consumption and longer indexing time. */
  m?: number;
  /** The size of the dynamic list containing the nearest neighbors, which is used during index time. Increasing this parameter may improve index quality, at the expense of increased indexing time. At a certain point, increasing this parameter leads to diminishing returns. */
  efConstruction?: number;
  /** The size of the dynamic list containing the nearest neighbors, which is used during search time. Increasing this parameter may improve search results, at the expense of slower search. At a certain point, increasing this parameter leads to diminishing returns. */
  efSearch?: number;
  /** The similarity metric to use for vector comparisons. */
  metric?: VectorSearchAlgorithmMetric;
}

export function hnswParametersSerializer(item: HnswParameters): any {
  return {
    m: item["m"],
    efConstruction: item["efConstruction"],
    efSearch: item["efSearch"],
    metric: item["metric"],
  };
}

export function hnswParametersDeserializer(item: any): HnswParameters {
  return {
    m: item["m"],
    efConstruction: item["efConstruction"],
    efSearch: item["efSearch"],
    metric: item["metric"],
  };
}

/** The similarity metric to use for vector comparisons. It is recommended to choose the same similarity metric as the embedding model was trained on. */
export enum KnownVectorSearchAlgorithmMetric {
  /** Measures the angle between vectors to quantify their similarity, disregarding magnitude. The smaller the angle, the closer the similarity. */
  Cosine = "cosine",
  /** Computes the straight-line distance between vectors in a multi-dimensional space. The smaller the distance, the closer the similarity. */
  Euclidean = "euclidean",
  /** Calculates the sum of element-wise products to gauge alignment and magnitude similarity. The larger and more positive, the closer the similarity. */
  DotProduct = "dotProduct",
  /** Only applicable to bit-packed binary data types. Determines dissimilarity by counting differing positions in binary vectors. The fewer differences, the closer the similarity. */
  Hamming = "hamming",
}

/**
 * The similarity metric to use for vector comparisons. It is recommended to choose the same similarity metric as the embedding model was trained on. \
 * {@link KnownVectorSearchAlgorithmMetric} can be used interchangeably with VectorSearchAlgorithmMetric,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **cosine**: Measures the angle between vectors to quantify their similarity, disregarding magnitude. The smaller the angle, the closer the similarity. \
 * **euclidean**: Computes the straight-line distance between vectors in a multi-dimensional space. The smaller the distance, the closer the similarity. \
 * **dotProduct**: Calculates the sum of element-wise products to gauge alignment and magnitude similarity. The larger and more positive, the closer the similarity. \
 * **hamming**: Only applicable to bit-packed binary data types. Determines dissimilarity by counting differing positions in binary vectors. The fewer differences, the closer the similarity.
 */
export type VectorSearchAlgorithmMetric = string;

/** Contains configuration options specific to the exhaustive KNN algorithm used during querying, which will perform brute-force search across the entire vector index. */
export interface ExhaustiveKnnAlgorithmConfiguration extends VectorSearchAlgorithmConfiguration {
  /** Contains the parameters specific to exhaustive KNN algorithm. */
  parameters?: ExhaustiveKnnParameters;
  /** The name of the kind of algorithm being configured for use with vector search. */
  kind: "exhaustiveKnn";
}

export function exhaustiveKnnAlgorithmConfigurationSerializer(
  item: ExhaustiveKnnAlgorithmConfiguration,
): any {
  return {
    name: item["name"],
    kind: item["kind"],
    exhaustiveKnnParameters: !item["parameters"]
      ? item["parameters"]
      : exhaustiveKnnParametersSerializer(item["parameters"]),
  };
}

export function exhaustiveKnnAlgorithmConfigurationDeserializer(
  item: any,
): ExhaustiveKnnAlgorithmConfiguration {
  return {
    name: item["name"],
    kind: item["kind"],
    parameters: !item["exhaustiveKnnParameters"]
      ? item["exhaustiveKnnParameters"]
      : exhaustiveKnnParametersDeserializer(item["exhaustiveKnnParameters"]),
  };
}

/** Contains the parameters specific to exhaustive KNN algorithm. */
export interface ExhaustiveKnnParameters {
  /** The similarity metric to use for vector comparisons. */
  metric?: VectorSearchAlgorithmMetric;
}

export function exhaustiveKnnParametersSerializer(item: ExhaustiveKnnParameters): any {
  return { metric: item["metric"] };
}

export function exhaustiveKnnParametersDeserializer(item: any): ExhaustiveKnnParameters {
  return {
    metric: item["metric"],
  };
}

export function vectorSearchVectorizerUnionArraySerializer(
  result: Array<VectorSearchVectorizerUnion>,
): any[] {
  return result.map((item) => {
    return vectorSearchVectorizerUnionSerializer(item);
  });
}

export function vectorSearchVectorizerUnionArrayDeserializer(
  result: Array<VectorSearchVectorizerUnion>,
): any[] {
  return result.map((item) => {
    return vectorSearchVectorizerUnionDeserializer(item);
  });
}

/** Specifies the vectorization method to be used during query time. */
export interface VectorSearchVectorizer {
  /** The name to associate with this particular vectorization method. */
  vectorizerName: string;
  /** Type of VectorSearchVectorizer. */
  /** The discriminator possible values: azureOpenAI, customWebApi, aiServicesVision, aml */
  kind: VectorSearchVectorizerKind;
}

export function vectorSearchVectorizerSerializer(item: VectorSearchVectorizer): any {
  return { name: item["vectorizerName"], kind: item["kind"] };
}

export function vectorSearchVectorizerDeserializer(item: any): VectorSearchVectorizer {
  return {
    vectorizerName: item["name"],
    kind: item["kind"],
  };
}

/** Alias for VectorSearchVectorizerUnion */
export type VectorSearchVectorizerUnion =
  | AzureOpenAIVectorizer
  | WebApiVectorizer
  | AIServicesVisionVectorizer
  | AzureMachineLearningVectorizer
  | VectorSearchVectorizer;

export function vectorSearchVectorizerUnionSerializer(item: VectorSearchVectorizerUnion): any {
  switch (item.kind) {
    case "azureOpenAI":
      return azureOpenAIVectorizerSerializer(item as AzureOpenAIVectorizer);

    case "customWebApi":
      return webApiVectorizerSerializer(item as WebApiVectorizer);

    case "aiServicesVision":
      return aiServicesVisionVectorizerSerializer(item as AIServicesVisionVectorizer);

    case "aml":
      return azureMachineLearningVectorizerSerializer(item as AzureMachineLearningVectorizer);

    default:
      return vectorSearchVectorizerSerializer(item);
  }
}

export function vectorSearchVectorizerUnionDeserializer(item: any): VectorSearchVectorizerUnion {
  switch (item["kind"]) {
    case "azureOpenAI":
      return azureOpenAIVectorizerDeserializer(item as AzureOpenAIVectorizer);

    case "customWebApi":
      return webApiVectorizerDeserializer(item as WebApiVectorizer);

    case "aiServicesVision":
      return aiServicesVisionVectorizerDeserializer(item as AIServicesVisionVectorizer);

    case "aml":
      return azureMachineLearningVectorizerDeserializer(item as AzureMachineLearningVectorizer);

    default:
      return vectorSearchVectorizerDeserializer(item);
  }
}

/** The vectorization method to be used during query time. */
export enum KnownVectorSearchVectorizerKind {
  /** Generate embeddings using an Azure OpenAI resource at query time. */
  AzureOpenAI = "azureOpenAI",
  /** Generate embeddings using a custom web endpoint at query time. */
  CustomWebApi = "customWebApi",
  /** Generate embeddings for an image or text input at query time using the Azure AI Services Vision Vectorize API. */
  AIServicesVision = "aiServicesVision",
  /** Generate embeddings using an Azure Machine Learning endpoint deployed via the Azure AI Foundry Model Catalog at query time. */
  AML = "aml",
}

/**
 * The vectorization method to be used during query time. \
 * {@link KnownVectorSearchVectorizerKind} can be used interchangeably with VectorSearchVectorizerKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azureOpenAI**: Generate embeddings using an Azure OpenAI resource at query time. \
 * **customWebApi**: Generate embeddings using a custom web endpoint at query time. \
 * **aiServicesVision**: Generate embeddings for an image or text input at query time using the Azure AI Services Vision Vectorize API. \
 * **aml**: Generate embeddings using an Azure Machine Learning endpoint deployed via the Azure AI Foundry Model Catalog at query time.
 */
export type VectorSearchVectorizerKind = string;

/** Specifies the Azure OpenAI resource used to vectorize a query string. */
export interface AzureOpenAIVectorizer extends VectorSearchVectorizer {
  /** Contains the parameters specific to Azure OpenAI embedding vectorization. */
  parameters?: AzureOpenAIVectorizerParameters;
  /** The name of the kind of vectorization method being configured for use with vector search. */
  kind: "azureOpenAI";
}

export function azureOpenAIVectorizerSerializer(item: AzureOpenAIVectorizer): any {
  return {
    name: item["vectorizerName"],
    kind: item["kind"],
    azureOpenAIParameters: !item["parameters"]
      ? item["parameters"]
      : azureOpenAIVectorizerParametersSerializer(item["parameters"]),
  };
}

export function azureOpenAIVectorizerDeserializer(item: any): AzureOpenAIVectorizer {
  return {
    vectorizerName: item["name"],
    kind: item["kind"],
    parameters: !item["azureOpenAIParameters"]
      ? item["azureOpenAIParameters"]
      : azureOpenAIVectorizerParametersDeserializer(item["azureOpenAIParameters"]),
  };
}

/** Specifies the parameters for connecting to the Azure OpenAI resource. */
export interface AzureOpenAIVectorizerParameters {
  /** The resource URI of the Azure OpenAI resource. */
  resourceUrl?: string;
  /** ID of the Azure OpenAI model deployment on the designated resource. */
  deploymentId?: string;
  /** API key of the designated Azure OpenAI resource. */
  apiKey?: string;
  /** The user-assigned managed identity used for outbound connections. */
  authIdentity?: SearchIndexerDataIdentityUnion;
  /** The name of the embedding model that is deployed at the provided deploymentId path. */
  modelName?: AzureOpenAIModelName;
}

export function azureOpenAIVectorizerParametersSerializer(
  item: AzureOpenAIVectorizerParameters,
): any {
  return {
    resourceUri: item["resourceUrl"],
    deploymentId: item["deploymentId"],
    apiKey: item["apiKey"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionSerializer(item["authIdentity"]),
    modelName: item["modelName"],
  };
}

export function azureOpenAIVectorizerParametersDeserializer(
  item: any,
): AzureOpenAIVectorizerParameters {
  return {
    resourceUrl: item["resourceUri"],
    deploymentId: item["deploymentId"],
    apiKey: item["apiKey"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionDeserializer(item["authIdentity"]),
    modelName: item["modelName"],
  };
}

/** The Azure Open AI model name that will be called. */
export enum KnownAzureOpenAIModelName {
  /** TextEmbeddingAda002 model. */
  TextEmbeddingAda002 = "text-embedding-ada-002",
  /** TextEmbedding3Large model. */
  TextEmbedding3Large = "text-embedding-3-large",
  /** TextEmbedding3Small model. */
  TextEmbedding3Small = "text-embedding-3-small",
  /** Gpt4o model. */
  Gpt4O = "gpt-4o",
  /** Gpt4oMini model. */
  Gpt4OMini = "gpt-4o-mini",
  /** Gpt41 model. */
  Gpt41 = "gpt-4.1",
  /** Gpt41Mini model. */
  Gpt41Mini = "gpt-4.1-mini",
  /** Gpt41Nano model. */
  Gpt41Nano = "gpt-4.1-nano",
  /** Gpt5 model. */
  Gpt5 = "gpt-5",
  /** Gpt5Mini model. */
  Gpt5Mini = "gpt-5-mini",
  /** Gpt5Nano model. */
  Gpt5Nano = "gpt-5-nano",
}

/**
 * The Azure Open AI model name that will be called. \
 * {@link KnownAzureOpenAIModelName} can be used interchangeably with AzureOpenAIModelName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **text-embedding-ada-002**: TextEmbeddingAda002 model. \
 * **text-embedding-3-large**: TextEmbedding3Large model. \
 * **text-embedding-3-small**: TextEmbedding3Small model. \
 * **gpt-4o**: Gpt4o model. \
 * **gpt-4o-mini**: Gpt4oMini model. \
 * **gpt-4.1**: Gpt41 model. \
 * **gpt-4.1-mini**: Gpt41Mini model. \
 * **gpt-4.1-nano**: Gpt41Nano model. \
 * **gpt-5**: Gpt5 model. \
 * **gpt-5-mini**: Gpt5Mini model. \
 * **gpt-5-nano**: Gpt5Nano model.
 */
export type AzureOpenAIModelName = string;

/** Specifies a user-defined vectorizer for generating the vector embedding of a query string. Integration of an external vectorizer is achieved using the custom Web API interface of a skillset. */
export interface WebApiVectorizer extends VectorSearchVectorizer {
  /** Specifies the properties of the user-defined vectorizer. */
  webApiParameters?: WebApiVectorizerParameters;
  /** The name of the kind of vectorization method being configured for use with vector search. */
  kind: "customWebApi";
}

export function webApiVectorizerSerializer(item: WebApiVectorizer): any {
  return {
    name: item["vectorizerName"],
    kind: item["kind"],
    customWebApiParameters: !item["webApiParameters"]
      ? item["webApiParameters"]
      : webApiVectorizerParametersSerializer(item["webApiParameters"]),
  };
}

export function webApiVectorizerDeserializer(item: any): WebApiVectorizer {
  return {
    vectorizerName: item["name"],
    kind: item["kind"],
    webApiParameters: !item["customWebApiParameters"]
      ? item["customWebApiParameters"]
      : webApiVectorizerParametersDeserializer(item["customWebApiParameters"]),
  };
}

/** Specifies the properties for connecting to a user-defined vectorizer. */
export interface WebApiVectorizerParameters {
  /** The URI of the Web API providing the vectorizer. */
  uri?: string;
  /** The headers required to make the HTTP request. */
  httpHeaders?: Record<string, string>;
  /** The method for the HTTP request. */
  httpMethod?: string;
  /** The desired timeout for the request. Default is 30 seconds. */
  timeout?: string;
  /** Applies to custom endpoints that connect to external code in an Azure function or some other application that provides the transformations. This value should be the application ID created for the function or app when it was registered with Azure Active Directory. When specified, the vectorization connects to the function or app using a managed ID (either system or user-assigned) of the search service and the access token of the function or app, using this value as the resource id for creating the scope of the access token. */
  authResourceId?: string;
  /** The user-assigned managed identity used for outbound connections. If an authResourceId is provided and it's not specified, the system-assigned managed identity is used. On updates to the indexer, if the identity is unspecified, the value remains unchanged. If set to "none", the value of this property is cleared. */
  authIdentity?: SearchIndexerDataIdentityUnion;
}

export function webApiVectorizerParametersSerializer(item: WebApiVectorizerParameters): any {
  return {
    uri: item["uri"],
    httpHeaders: item["httpHeaders"],
    httpMethod: item["httpMethod"],
    timeout: item["timeout"],
    authResourceId: item["authResourceId"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionSerializer(item["authIdentity"]),
  };
}

export function webApiVectorizerParametersDeserializer(item: any): WebApiVectorizerParameters {
  return {
    uri: item["uri"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : Object.fromEntries(
          Object.entries(item["httpHeaders"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    httpMethod: item["httpMethod"],
    timeout: item["timeout"],
    authResourceId: item["authResourceId"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionDeserializer(item["authIdentity"]),
  };
}

/** Clears the identity property of a datasource. */
export interface AIServicesVisionVectorizer extends VectorSearchVectorizer {
  /** Contains the parameters specific to AI Services Vision embedding vectorization. */
  aiServicesVisionParameters?: AIServicesVisionParameters;
  /** The name of the kind of vectorization method being configured for use with vector search. */
  kind: "aiServicesVision";
}

export function aiServicesVisionVectorizerSerializer(item: AIServicesVisionVectorizer): any {
  return {
    name: item["vectorizerName"],
    kind: item["kind"],
    aiServicesVisionParameters: !item["aiServicesVisionParameters"]
      ? item["aiServicesVisionParameters"]
      : aiServicesVisionParametersSerializer(item["aiServicesVisionParameters"]),
  };
}

export function aiServicesVisionVectorizerDeserializer(item: any): AIServicesVisionVectorizer {
  return {
    vectorizerName: item["name"],
    kind: item["kind"],
    aiServicesVisionParameters: !item["aiServicesVisionParameters"]
      ? item["aiServicesVisionParameters"]
      : aiServicesVisionParametersDeserializer(item["aiServicesVisionParameters"]),
  };
}

/** Specifies the AI Services Vision parameters for vectorizing a query image or text. */
export interface AIServicesVisionParameters {
  /** The version of the model to use when calling the AI Services Vision service. It will default to the latest available when not specified. */
  modelVersion: string | null;
  /** The resource URI of the AI Services resource. */
  resourceUri: string;
  /** API key of the designated AI Services resource. */
  apiKey?: string;
  /** The user-assigned managed identity used for outbound connections. If an authResourceId is provided and it's not specified, the system-assigned managed identity is used. On updates to the index, if the identity is unspecified, the value remains unchanged. If set to "none", the value of this property is cleared. */
  authIdentity?: SearchIndexerDataIdentityUnion;
}

export function aiServicesVisionParametersSerializer(item: AIServicesVisionParameters): any {
  return {
    modelVersion: item["modelVersion"],
    resourceUri: item["resourceUri"],
    apiKey: item["apiKey"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionSerializer(item["authIdentity"]),
  };
}

export function aiServicesVisionParametersDeserializer(item: any): AIServicesVisionParameters {
  return {
    modelVersion: item["modelVersion"],
    resourceUri: item["resourceUri"],
    apiKey: item["apiKey"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionDeserializer(item["authIdentity"]),
  };
}

/** Specifies an Azure Machine Learning endpoint deployed via the Azure AI Foundry Model Catalog for generating the vector embedding of a query string. */
export interface AzureMachineLearningVectorizer extends VectorSearchVectorizer {
  /** Specifies the properties of the AML vectorizer. */
  amlParameters?: AzureMachineLearningParameters;
  /** The name of the kind of vectorization method being configured for use with vector search. */
  kind: "aml";
}

export function azureMachineLearningVectorizerSerializer(
  item: AzureMachineLearningVectorizer,
): any {
  return {
    name: item["vectorizerName"],
    kind: item["kind"],
    amlParameters: !item["amlParameters"]
      ? item["amlParameters"]
      : azureMachineLearningParametersSerializer(item["amlParameters"]),
  };
}

export function azureMachineLearningVectorizerDeserializer(
  item: any,
): AzureMachineLearningVectorizer {
  return {
    vectorizerName: item["name"],
    kind: item["kind"],
    amlParameters: !item["amlParameters"]
      ? item["amlParameters"]
      : azureMachineLearningParametersDeserializer(item["amlParameters"]),
  };
}

/** Specifies the properties for connecting to an AML vectorizer. */
export interface AzureMachineLearningParameters {
  /** (Required for no authentication or key authentication) The scoring URI of the AML service to which the JSON payload will be sent. Only the https URI scheme is allowed. */
  scoringUri: string | null;
  /** (Required for key authentication) The key for the AML service. */
  authenticationKey?: string;
  /** (Required for token authentication). The Azure Resource Manager resource ID of the AML service. It should be in the format subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.MachineLearningServices/workspaces/{workspace-name}/services/{service_name}. */
  resourceId?: string;
  /** (Optional) When specified, indicates the timeout for the http client making the API call. */
  timeout?: string;
  /** (Optional for token authentication). The region the AML service is deployed in. */
  region?: string;
  /** The name of the embedding model from the Azure AI Foundry Catalog that is deployed at the provided endpoint. */
  modelName?: AIFoundryModelCatalogName;
}

export function azureMachineLearningParametersSerializer(
  item: AzureMachineLearningParameters,
): any {
  return {
    uri: item["scoringUri"],
    key: item["authenticationKey"],
    resourceId: item["resourceId"],
    timeout: item["timeout"],
    region: item["region"],
    modelName: item["modelName"],
  };
}

export function azureMachineLearningParametersDeserializer(
  item: any,
): AzureMachineLearningParameters {
  return {
    scoringUri: item["uri"],
    authenticationKey: item["key"],
    resourceId: item["resourceId"],
    timeout: item["timeout"],
    region: item["region"],
    modelName: item["modelName"],
  };
}

/** The name of the embedding model from the Azure AI Foundry Catalog that will be called. */
export enum KnownAIFoundryModelCatalogName {
  /** OpenAI-CLIP-Image-Text-Embeddings-vit-base-patch32 */
  OpenAIClipImageTextEmbeddingsVitBasePatch32 = "OpenAI-CLIP-Image-Text-Embeddings-vit-base-patch32",
  /** OpenAI-CLIP-Image-Text-Embeddings-ViT-Large-Patch14-336 */
  OpenAIClipImageTextEmbeddingsViTLargePatch14336 = "OpenAI-CLIP-Image-Text-Embeddings-ViT-Large-Patch14-336",
  /** Facebook-DinoV2-Image-Embeddings-ViT-Base */
  FacebookDinoV2ImageEmbeddingsViTBase = "Facebook-DinoV2-Image-Embeddings-ViT-Base",
  /** Facebook-DinoV2-Image-Embeddings-ViT-Giant */
  FacebookDinoV2ImageEmbeddingsViTGiant = "Facebook-DinoV2-Image-Embeddings-ViT-Giant",
  /** Cohere-embed-v3-english */
  CohereEmbedV3English = "Cohere-embed-v3-english",
  /** Cohere-embed-v3-multilingual */
  CohereEmbedV3Multilingual = "Cohere-embed-v3-multilingual",
  /** Cohere embed v4 model for generating embeddings from both text and images. */
  CohereEmbedV4 = "Cohere-embed-v4",
}

/**
 * The name of the embedding model from the Azure AI Foundry Catalog that will be called. \
 * {@link KnownAIFoundryModelCatalogName} can be used interchangeably with AIFoundryModelCatalogName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OpenAI-CLIP-Image-Text-Embeddings-vit-base-patch32**: OpenAI-CLIP-Image-Text-Embeddings-vit-base-patch32 \
 * **OpenAI-CLIP-Image-Text-Embeddings-ViT-Large-Patch14-336**: OpenAI-CLIP-Image-Text-Embeddings-ViT-Large-Patch14-336 \
 * **Facebook-DinoV2-Image-Embeddings-ViT-Base**: Facebook-DinoV2-Image-Embeddings-ViT-Base \
 * **Facebook-DinoV2-Image-Embeddings-ViT-Giant**: Facebook-DinoV2-Image-Embeddings-ViT-Giant \
 * **Cohere-embed-v3-english**: Cohere-embed-v3-english \
 * **Cohere-embed-v3-multilingual**: Cohere-embed-v3-multilingual \
 * **Cohere-embed-v4**: Cohere embed v4 model for generating embeddings from both text and images.
 */
export type AIFoundryModelCatalogName = string;

export function vectorSearchCompressionUnionArraySerializer(
  result: Array<VectorSearchCompressionUnion>,
): any[] {
  return result.map((item) => {
    return vectorSearchCompressionUnionSerializer(item);
  });
}

export function vectorSearchCompressionUnionArrayDeserializer(
  result: Array<VectorSearchCompressionUnion>,
): any[] {
  return result.map((item) => {
    return vectorSearchCompressionUnionDeserializer(item);
  });
}

/** Contains configuration options specific to the compression method used during indexing or querying. */
export interface VectorSearchCompression {
  /** The name to associate with this particular configuration. */
  compressionName: string;
  /** Contains the options for rescoring. */
  rescoringOptions?: RescoringOptions;
  /** The number of dimensions to truncate the vectors to. Truncating the vectors reduces the size of the vectors and the amount of data that needs to be transferred during search. This can save storage cost and improve search performance at the expense of recall. It should be only used for embeddings trained with Matryoshka Representation Learning (MRL) such as OpenAI text-embedding-3-large (small). The default value is null, which means no truncation. */
  truncationDimension?: number;
  /** Type of VectorSearchCompression. */
  /** The discriminator possible values: scalarQuantization, binaryQuantization */
  kind: VectorSearchCompressionKind;
}

export function vectorSearchCompressionSerializer(item: VectorSearchCompression): any {
  return {
    name: item["compressionName"],
    rescoringOptions: !item["rescoringOptions"]
      ? item["rescoringOptions"]
      : rescoringOptionsSerializer(item["rescoringOptions"]),
    truncationDimension: item["truncationDimension"],
    kind: item["kind"],
  };
}

export function vectorSearchCompressionDeserializer(item: any): VectorSearchCompression {
  return {
    compressionName: item["name"],
    rescoringOptions: !item["rescoringOptions"]
      ? item["rescoringOptions"]
      : rescoringOptionsDeserializer(item["rescoringOptions"]),
    truncationDimension: item["truncationDimension"],
    kind: item["kind"],
  };
}

/** Alias for VectorSearchCompressionUnion */
export type VectorSearchCompressionUnion =
  | ScalarQuantizationCompression
  | BinaryQuantizationCompression
  | VectorSearchCompression;

export function vectorSearchCompressionUnionSerializer(item: VectorSearchCompressionUnion): any {
  switch (item.kind) {
    case "scalarQuantization":
      return scalarQuantizationCompressionSerializer(item as ScalarQuantizationCompression);

    case "binaryQuantization":
      return binaryQuantizationCompressionSerializer(item as BinaryQuantizationCompression);

    default:
      return vectorSearchCompressionSerializer(item);
  }
}

export function vectorSearchCompressionUnionDeserializer(item: any): VectorSearchCompressionUnion {
  switch (item["kind"]) {
    case "scalarQuantization":
      return scalarQuantizationCompressionDeserializer(item as ScalarQuantizationCompression);

    case "binaryQuantization":
      return binaryQuantizationCompressionDeserializer(item as BinaryQuantizationCompression);

    default:
      return vectorSearchCompressionDeserializer(item);
  }
}

/** Contains the options for rescoring. */
export interface RescoringOptions {
  /** If set to true, after the initial search on the compressed vectors, the similarity scores are recalculated using the full-precision vectors. This will improve recall at the expense of latency. */
  enableRescoring?: boolean;
  /** Default oversampling factor. Oversampling retrieves a greater set of potential documents to offset the resolution loss due to quantization. This increases the set of results that will be rescored on full-precision vectors. Minimum value is 1, meaning no oversampling (1x). This parameter can only be set when 'enableRescoring' is true. Higher values improve recall at the expense of latency. */
  defaultOversampling?: number;
  /** Controls the storage method for original vectors. This setting is immutable. */
  rescoreStorageMethod?: VectorSearchCompressionRescoreStorageMethod;
}

export function rescoringOptionsSerializer(item: RescoringOptions): any {
  return {
    enableRescoring: item["enableRescoring"],
    defaultOversampling: item["defaultOversampling"],
    rescoreStorageMethod: item["rescoreStorageMethod"],
  };
}

export function rescoringOptionsDeserializer(item: any): RescoringOptions {
  return {
    enableRescoring: item["enableRescoring"],
    defaultOversampling: item["defaultOversampling"],
    rescoreStorageMethod: item["rescoreStorageMethod"],
  };
}

/** The storage method for the original full-precision vectors used for rescoring and internal index operations. */
export enum KnownVectorSearchCompressionRescoreStorageMethod {
  /** This option preserves the original full-precision vectors. Choose this option for maximum flexibility and highest quality of compressed search results. This consumes more storage but allows for rescoring and oversampling. */
  PreserveOriginals = "preserveOriginals",
  /** This option discards the original full-precision vectors. Choose this option for maximum storage savings. Since this option does not allow for rescoring and oversampling, it will often cause slight to moderate reductions in quality. */
  DiscardOriginals = "discardOriginals",
}

/**
 * The storage method for the original full-precision vectors used for rescoring and internal index operations. \
 * {@link KnownVectorSearchCompressionRescoreStorageMethod} can be used interchangeably with VectorSearchCompressionRescoreStorageMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **preserveOriginals**: This option preserves the original full-precision vectors. Choose this option for maximum flexibility and highest quality of compressed search results. This consumes more storage but allows for rescoring and oversampling. \
 * **discardOriginals**: This option discards the original full-precision vectors. Choose this option for maximum storage savings. Since this option does not allow for rescoring and oversampling, it will often cause slight to moderate reductions in quality.
 */
export type VectorSearchCompressionRescoreStorageMethod = string;

/** The compression method used for indexing and querying. */
export enum KnownVectorSearchCompressionKind {
  /** Scalar Quantization, a type of compression method. In scalar quantization, the original vectors values are compressed to a narrower type by discretizing and representing each component of a vector using a reduced set of quantized values, thereby reducing the overall data size. */
  ScalarQuantization = "scalarQuantization",
  /** Binary Quantization, a type of compression method. In binary quantization, the original vectors values are compressed to the narrower binary type by discretizing and representing each component of a vector using binary values, thereby reducing the overall data size. */
  BinaryQuantization = "binaryQuantization",
}

/**
 * The compression method used for indexing and querying. \
 * {@link KnownVectorSearchCompressionKind} can be used interchangeably with VectorSearchCompressionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **scalarQuantization**: Scalar Quantization, a type of compression method. In scalar quantization, the original vectors values are compressed to a narrower type by discretizing and representing each component of a vector using a reduced set of quantized values, thereby reducing the overall data size. \
 * **binaryQuantization**: Binary Quantization, a type of compression method. In binary quantization, the original vectors values are compressed to the narrower binary type by discretizing and representing each component of a vector using binary values, thereby reducing the overall data size.
 */
export type VectorSearchCompressionKind = string;

/** Contains configuration options specific to the scalar quantization compression method used during indexing and querying. */
export interface ScalarQuantizationCompression extends VectorSearchCompression {
  /** Contains the parameters specific to Scalar Quantization. */
  parameters?: ScalarQuantizationParameters;
  /** The name of the kind of compression method being configured for use with vector search. */
  kind: "scalarQuantization";
}

export function scalarQuantizationCompressionSerializer(item: ScalarQuantizationCompression): any {
  return {
    name: item["compressionName"],
    rescoringOptions: !item["rescoringOptions"]
      ? item["rescoringOptions"]
      : rescoringOptionsSerializer(item["rescoringOptions"]),
    truncationDimension: item["truncationDimension"],
    kind: item["kind"],
    scalarQuantizationParameters: !item["parameters"]
      ? item["parameters"]
      : scalarQuantizationParametersSerializer(item["parameters"]),
  };
}

export function scalarQuantizationCompressionDeserializer(
  item: any,
): ScalarQuantizationCompression {
  return {
    compressionName: item["name"],
    rescoringOptions: !item["rescoringOptions"]
      ? item["rescoringOptions"]
      : rescoringOptionsDeserializer(item["rescoringOptions"]),
    truncationDimension: item["truncationDimension"],
    kind: item["kind"],
    parameters: !item["scalarQuantizationParameters"]
      ? item["scalarQuantizationParameters"]
      : scalarQuantizationParametersDeserializer(item["scalarQuantizationParameters"]),
  };
}

/** Contains the parameters specific to Scalar Quantization. */
export interface ScalarQuantizationParameters {
  /** The quantized data type of compressed vector values. */
  quantizedDataType?: VectorSearchCompressionTarget;
}

export function scalarQuantizationParametersSerializer(item: ScalarQuantizationParameters): any {
  return { quantizedDataType: item["quantizedDataType"] };
}

export function scalarQuantizationParametersDeserializer(item: any): ScalarQuantizationParameters {
  return {
    quantizedDataType: item["quantizedDataType"],
  };
}

/** The quantized data type of compressed vector values. */
export enum KnownVectorSearchCompressionTarget {
  /** 8-bit signed integer. */
  Int8 = "int8",
}

/**
 * The quantized data type of compressed vector values. \
 * {@link KnownVectorSearchCompressionTarget} can be used interchangeably with VectorSearchCompressionTarget,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **int8**: 8-bit signed integer.
 */
export type VectorSearchCompressionTarget = string;

/** Contains configuration options specific to the binary quantization compression method used during indexing and querying. */
export interface BinaryQuantizationCompression extends VectorSearchCompression {
  /** The name of the kind of compression method being configured for use with vector search. */
  kind: "binaryQuantization";
}

export function binaryQuantizationCompressionSerializer(item: BinaryQuantizationCompression): any {
  return {
    name: item["compressionName"],
    rescoringOptions: !item["rescoringOptions"]
      ? item["rescoringOptions"]
      : rescoringOptionsSerializer(item["rescoringOptions"]),
    truncationDimension: item["truncationDimension"],
    kind: item["kind"],
  };
}

export function binaryQuantizationCompressionDeserializer(
  item: any,
): BinaryQuantizationCompression {
  return {
    compressionName: item["name"],
    rescoringOptions: !item["rescoringOptions"]
      ? item["rescoringOptions"]
      : rescoringOptionsDeserializer(item["rescoringOptions"]),
    truncationDimension: item["truncationDimension"],
    kind: item["kind"],
  };
}

/** A value indicating whether permission filtering is enabled for the index. */
export enum KnownSearchIndexPermissionFilterOption {
  /** enabled. */
  Enabled = "enabled",
  /** disabled. */
  Disabled = "disabled",
}

/**
 * A value indicating whether permission filtering is enabled for the index. \
 * {@link KnownSearchIndexPermissionFilterOption} can be used interchangeably with SearchIndexPermissionFilterOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled**: enabled. \
 * **disabled**: disabled.
 */
export type SearchIndexPermissionFilterOption = string;

/** Response from a List Indexes request. If successful, it includes the full definitions of all indexes. */
export interface _ListIndexesResult {
  /** The indexes in the Search service. */
  readonly indexes: SearchIndex[];
}

export function _listIndexesResultDeserializer(item: any): _ListIndexesResult {
  return {
    indexes: searchIndexArrayDeserializer(item["value"]),
  };
}

export function searchIndexArraySerializer(result: Array<SearchIndex>): any[] {
  return result.map((item) => {
    return searchIndexSerializer(item);
  });
}

export function searchIndexArrayDeserializer(result: Array<SearchIndex>): any[] {
  return result.map((item) => {
    return searchIndexDeserializer(item);
  });
}

export function searchIndexResponseArrayDeserializer(result: Array<SearchIndexResponse>): any[] {
  return result.map((item) => {
    return searchIndexResponseDeserializer(item);
  });
}

/** Represents a search index definition, which describes the fields and search behavior of an index. */
export interface SearchIndexResponse {
  /** The name of the index. */
  name: string;
  /** The description of the index. */
  description?: string;
  /** The fields of the index. */
  fields?: SearchField[];
  /** The scoring profiles for the index. */
  scoringProfiles?: ScoringProfile[];
  /** The name of the scoring profile to use if none is specified in the query. If this property is not set and no scoring profile is specified in the query, then default scoring (tf-idf) will be used. */
  defaultScoringProfile?: string;
  /** Options to control Cross-Origin Resource Sharing (CORS) for the index. */
  corsOptions?: CorsOptions;
  /** The suggesters for the index. */
  suggesters?: SearchSuggester[];
  /** The analyzers for the index. */
  analyzers?: LexicalAnalyzerUnion[];
  /** The tokenizers for the index. */
  tokenizers?: LexicalTokenizerUnion[];
  /** The token filters for the index. */
  tokenFilters?: TokenFilterUnion[];
  /** The character filters for the index. */
  charFilters?: CharFilterUnion[];
  /** The normalizers for the index. */
  normalizers?: LexicalNormalizerUnion[];
  /** A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your data when you want full assurance that no one, not even Microsoft, can decrypt your data. Once you have encrypted your data, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your data will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019. */
  encryptionKey?: SearchResourceEncryptionKey;
  /** The type of similarity algorithm to be used when scoring and ranking the documents matching a search query. The similarity algorithm can only be defined at index creation time and cannot be modified on existing indexes. If null, the ClassicSimilarity algorithm is used. */
  similarity?: SimilarityAlgorithmUnion;
  /** Defines parameters for a search index that influence semantic capabilities. */
  semantic?: SemanticSearch;
  /** Contains configuration options related to vector search. */
  vectorSearch?: VectorSearch;
  /** A value indicating whether permission filtering is enabled for the index. */
  permissionFilterOption?: SearchIndexPermissionFilterOption;
  /** A value indicating whether Purview is enabled for the index. */
  purviewEnabled?: boolean;
  /** The ETag of the index. */
  eTag?: string;
}

export function searchIndexResponseDeserializer(item: any): SearchIndexResponse {
  return {
    name: item["name"],
    description: item["description"],
    fields: !item["fields"] ? item["fields"] : searchFieldArrayDeserializer(item["fields"]),
    scoringProfiles: !item["scoringProfiles"]
      ? item["scoringProfiles"]
      : scoringProfileArrayDeserializer(item["scoringProfiles"]),
    defaultScoringProfile: item["defaultScoringProfile"],
    corsOptions: !item["corsOptions"]
      ? item["corsOptions"]
      : corsOptionsDeserializer(item["corsOptions"]),
    suggesters: !item["suggesters"]
      ? item["suggesters"]
      : searchSuggesterArrayDeserializer(item["suggesters"]),
    analyzers: !item["analyzers"]
      ? item["analyzers"]
      : lexicalAnalyzerUnionArrayDeserializer(item["analyzers"]),
    tokenizers: !item["tokenizers"]
      ? item["tokenizers"]
      : lexicalTokenizerUnionArrayDeserializer(item["tokenizers"]),
    tokenFilters: !item["tokenFilters"]
      ? item["tokenFilters"]
      : tokenFilterUnionArrayDeserializer(item["tokenFilters"]),
    charFilters: !item["charFilters"]
      ? item["charFilters"]
      : charFilterUnionArrayDeserializer(item["charFilters"]),
    normalizers: !item["normalizers"]
      ? item["normalizers"]
      : lexicalNormalizerUnionArrayDeserializer(item["normalizers"]),
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    similarity: !item["similarity"]
      ? item["similarity"]
      : similarityAlgorithmUnionDeserializer(item["similarity"]),
    semantic: !item["semantic"] ? item["semantic"] : semanticSearchDeserializer(item["semantic"]),
    vectorSearch: !item["vectorSearch"]
      ? item["vectorSearch"]
      : vectorSearchDeserializer(item["vectorSearch"]),
    permissionFilterOption: item["permissionFilterOption"],
    purviewEnabled: item["purviewEnabled"],
    eTag: item["@odata.etag"],
  };
}

/** Statistics for a given index. Statistics are collected periodically and are not guaranteed to always be up-to-date. */
export interface GetIndexStatisticsResult {
  /** The number of documents in the index. */
  readonly documentCount: number;
  /** The amount of storage in bytes consumed by the index. */
  readonly storageSize: number;
  /** The amount of memory in bytes consumed by vectors in the index. */
  readonly vectorIndexSize: number;
}

export function getIndexStatisticsResultSerializer(item: GetIndexStatisticsResult): any {
  return item;
}

export function getIndexStatisticsResultDeserializer(item: any): GetIndexStatisticsResult {
  return {
    documentCount: item["documentCount"],
    storageSize: item["storageSize"],
    vectorIndexSize: item["vectorIndexSize"],
  };
}

/** Specifies some text and analysis components used to break that text into tokens. */
export interface AnalyzeTextOptions {
  /** The text to break into tokens. */
  text: string;
  /** The name of the analyzer to use to break the given text. If this parameter is not specified, you must specify a tokenizer instead. The tokenizer and analyzer parameters are mutually exclusive. */
  analyzerName?: LexicalAnalyzerName;
  /** The name of the tokenizer to use to break the given text. If this parameter is not specified, you must specify an analyzer instead. The tokenizer and analyzer parameters are mutually exclusive. */
  tokenizerName?: LexicalTokenizerName;
  /** The name of the normalizer to use to normalize the given text. */
  normalizerName?: LexicalNormalizerName;
  /** An optional list of token filters to use when breaking the given text. This parameter can only be set when using the tokenizer parameter. */
  tokenFilters?: TokenFilterName[];
  /** An optional list of character filters to use when breaking the given text. This parameter can only be set when using the tokenizer parameter. */
  charFilters?: CharFilterName[];
}

export function analyzeTextOptionsSerializer(item: AnalyzeTextOptions): any {
  return {
    text: item["text"],
    analyzer: item["analyzerName"],
    tokenizer: item["tokenizerName"],
    normalizer: item["normalizerName"],
    tokenFilters: !item["tokenFilters"]
      ? item["tokenFilters"]
      : item["tokenFilters"].map((p: any) => {
          return p;
        }),
    charFilters: !item["charFilters"]
      ? item["charFilters"]
      : item["charFilters"].map((p: any) => {
          return p;
        }),
  };
}

/** The result of testing an analyzer on text. */
export interface AnalyzeResult {
  /** The list of tokens returned by the analyzer specified in the request. */
  tokens: AnalyzedTokenInfo[];
}

export function analyzeResultSerializer(item: AnalyzeResult): any {
  return { tokens: analyzedTokenInfoArraySerializer(item["tokens"]) };
}

export function analyzeResultDeserializer(item: any): AnalyzeResult {
  return {
    tokens: analyzedTokenInfoArrayDeserializer(item["tokens"]),
  };
}

export function analyzedTokenInfoArraySerializer(result: Array<AnalyzedTokenInfo>): any[] {
  return result.map((item) => {
    return analyzedTokenInfoSerializer(item);
  });
}

export function analyzedTokenInfoArrayDeserializer(result: Array<AnalyzedTokenInfo>): any[] {
  return result.map((item) => {
    return analyzedTokenInfoDeserializer(item);
  });
}

/** Information about a token returned by an analyzer. */
export interface AnalyzedTokenInfo {
  /** The token returned by the analyzer. */
  readonly token: string;
  /** The index of the first character of the token in the input text. */
  readonly startOffset: number;
  /** The index of the last character of the token in the input text. */
  readonly endOffset: number;
  /** The position of the token in the input text relative to other tokens. The first token in the input text has position 0, the next has position 1, and so on. Depending on the analyzer used, some tokens might have the same position, for example if they are synonyms of each other. */
  readonly position: number;
}

export function analyzedTokenInfoSerializer(item: AnalyzedTokenInfo): any {
  return item;
}

export function analyzedTokenInfoDeserializer(item: any): AnalyzedTokenInfo {
  return {
    token: item["token"],
    startOffset: item["startOffset"],
    endOffset: item["endOffset"],
    position: item["position"],
  };
}

/** Represents an index alias, which describes a mapping from the alias name to an index. The alias name can be used in place of the index name for supported operations. */
export interface SearchAlias {
  /** The name of the alias. */
  name: string;
  /** The name of the index this alias maps to. Only one index name may be specified. */
  indexes: string[];
  /** The ETag of the alias. */
  etag?: string;
}

export function searchAliasSerializer(item: SearchAlias): any {
  return {
    name: item["name"],
    indexes: item["indexes"].map((p: any) => {
      return p;
    }),
    "@odata.etag": item["etag"],
  };
}

export function searchAliasDeserializer(item: any): SearchAlias {
  return {
    name: item["name"],
    indexes: item["indexes"].map((p: any) => {
      return p;
    }),
    etag: item["@odata.etag"],
  };
}

/** Response from a List Aliases request. If successful, it includes the associated index mappings for all aliases. */
export interface _ListAliasesResult {
  /** The aliases in the Search service. */
  readonly aliases: SearchAlias[];
}

export function _listAliasesResultDeserializer(item: any): _ListAliasesResult {
  return {
    aliases: searchAliasArrayDeserializer(item["value"]),
  };
}

export function searchAliasArraySerializer(result: Array<SearchAlias>): any[] {
  return result.map((item) => {
    return searchAliasSerializer(item);
  });
}

export function searchAliasArrayDeserializer(result: Array<SearchAlias>): any[] {
  return result.map((item) => {
    return searchAliasDeserializer(item);
  });
}

/** Represents a knowledge base definition. */
export interface KnowledgeBase {
  /** The name of the knowledge base. */
  name: string;
  /** Knowledge sources referenced by this knowledge base. */
  knowledgeSources: KnowledgeSourceReference[];
  /** Contains configuration options on how to connect to AI models. */
  models?: KnowledgeBaseModelUnion[];
  /** The retrieval reasoning effort configuration. */
  retrievalReasoningEffort?: KnowledgeRetrievalReasoningEffortUnion;
  /** The output mode for the knowledge base. */
  outputMode?: KnowledgeRetrievalOutputMode;
  /** The ETag of the knowledge base. */
  eTag?: string;
  /** A description of an encryption key that you create in Azure Key Vault. */
  encryptionKey?: SearchResourceEncryptionKey;
  /** The description of the knowledge base. */
  description?: string;
  /** Instructions considered by the knowledge base when developing query plan. */
  retrievalInstructions?: string;
  /** Instructions considered by the knowledge base when generating answers. */
  answerInstructions?: string;
}

export function knowledgeBaseSerializer(item: KnowledgeBase): any {
  return {
    name: item["name"],
    knowledgeSources: knowledgeSourceReferenceArraySerializer(item["knowledgeSources"]),
    models: !item["models"]
      ? item["models"]
      : knowledgeBaseModelUnionArraySerializer(item["models"]),
    retrievalReasoningEffort: !item["retrievalReasoningEffort"]
      ? item["retrievalReasoningEffort"]
      : knowledgeRetrievalReasoningEffortUnionSerializer(item["retrievalReasoningEffort"]),
    outputMode: item["outputMode"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    description: item["description"],
    retrievalInstructions: item["retrievalInstructions"],
    answerInstructions: item["answerInstructions"],
  };
}

export function knowledgeBaseDeserializer(item: any): KnowledgeBase {
  return {
    name: item["name"],
    knowledgeSources: knowledgeSourceReferenceArrayDeserializer(item["knowledgeSources"]),
    models: !item["models"]
      ? item["models"]
      : knowledgeBaseModelUnionArrayDeserializer(item["models"]),
    retrievalReasoningEffort: !item["retrievalReasoningEffort"]
      ? item["retrievalReasoningEffort"]
      : knowledgeRetrievalReasoningEffortUnionDeserializer(item["retrievalReasoningEffort"]),
    outputMode: item["outputMode"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    description: item["description"],
    retrievalInstructions: item["retrievalInstructions"],
    answerInstructions: item["answerInstructions"],
  };
}

export function knowledgeSourceReferenceArraySerializer(
  result: Array<KnowledgeSourceReference>,
): any[] {
  return result.map((item) => {
    return knowledgeSourceReferenceSerializer(item);
  });
}

export function knowledgeSourceReferenceArrayDeserializer(
  result: Array<KnowledgeSourceReference>,
): any[] {
  return result.map((item) => {
    return knowledgeSourceReferenceDeserializer(item);
  });
}

/** Reference to a knowledge source. */
export interface KnowledgeSourceReference {
  /** The name of the knowledge source. */
  name: string;
}

export function knowledgeSourceReferenceSerializer(item: KnowledgeSourceReference): any {
  return { name: item["name"] };
}

export function knowledgeSourceReferenceDeserializer(item: any): KnowledgeSourceReference {
  return {
    name: item["name"],
  };
}

export function knowledgeBaseModelUnionArraySerializer(
  result: Array<KnowledgeBaseModelUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseModelUnionSerializer(item);
  });
}

export function knowledgeBaseModelUnionArrayDeserializer(
  result: Array<KnowledgeBaseModelUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseModelUnionDeserializer(item);
  });
}

/** Specifies the connection parameters for the model to use for query planning. */
export interface KnowledgeBaseModel {
  /** The AI model to be used for query planning. */
  /** The discriminator possible values: azureOpenAI */
  kind: KnowledgeBaseModelKind;
}

export function knowledgeBaseModelSerializer(item: KnowledgeBaseModel): any {
  return { kind: item["kind"] };
}

export function knowledgeBaseModelDeserializer(item: any): KnowledgeBaseModel {
  return {
    kind: item["kind"],
  };
}

/** Alias for KnowledgeBaseModelUnion */
export type KnowledgeBaseModelUnion = KnowledgeBaseAzureOpenAIModel | KnowledgeBaseModel;

export function knowledgeBaseModelUnionSerializer(item: KnowledgeBaseModelUnion): any {
  switch (item.kind) {
    case "azureOpenAI":
      return knowledgeBaseAzureOpenAIModelSerializer(item as KnowledgeBaseAzureOpenAIModel);

    default:
      return knowledgeBaseModelSerializer(item);
  }
}

export function knowledgeBaseModelUnionDeserializer(item: any): KnowledgeBaseModelUnion {
  switch (item["kind"]) {
    case "azureOpenAI":
      return knowledgeBaseAzureOpenAIModelDeserializer(item as KnowledgeBaseAzureOpenAIModel);

    default:
      return knowledgeBaseModelDeserializer(item);
  }
}

/** The AI model to be used for query planning. */
export enum KnownKnowledgeBaseModelKind {
  /** Use Azure Open AI models for query planning. */
  AzureOpenAI = "azureOpenAI",
}

/**
 * The AI model to be used for query planning. \
 * {@link KnownKnowledgeBaseModelKind} can be used interchangeably with KnowledgeBaseModelKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azureOpenAI**: Use Azure Open AI models for query planning.
 */
export type KnowledgeBaseModelKind = string;

/** Specifies the Azure OpenAI resource used to do query planning. */
export interface KnowledgeBaseAzureOpenAIModel extends KnowledgeBaseModel {
  kind: "azureOpenAI";
  /** Azure OpenAI parameters. */
  azureOpenAIParameters: AzureOpenAIVectorizerParameters;
}

export function knowledgeBaseAzureOpenAIModelSerializer(item: KnowledgeBaseAzureOpenAIModel): any {
  return {
    kind: item["kind"],
    azureOpenAIParameters: azureOpenAIVectorizerParametersSerializer(item["azureOpenAIParameters"]),
  };
}

export function knowledgeBaseAzureOpenAIModelDeserializer(
  item: any,
): KnowledgeBaseAzureOpenAIModel {
  return {
    kind: item["kind"],
    azureOpenAIParameters: azureOpenAIVectorizerParametersDeserializer(
      item["azureOpenAIParameters"],
    ),
  };
}

/** Result from listing knowledge bases. */
export interface _ListKnowledgeBasesResult {
  /** The knowledge bases in the service. */
  value: KnowledgeBase[];
}

export function _listKnowledgeBasesResultDeserializer(item: any): _ListKnowledgeBasesResult {
  return {
    value: knowledgeBaseArrayDeserializer(item["value"]),
  };
}

export function knowledgeBaseArraySerializer(result: Array<KnowledgeBase>): any[] {
  return result.map((item) => {
    return knowledgeBaseSerializer(item);
  });
}

export function knowledgeBaseArrayDeserializer(result: Array<KnowledgeBase>): any[] {
  return result.map((item) => {
    return knowledgeBaseDeserializer(item);
  });
}

/** Represents a knowledge source definition. */
export interface KnowledgeSource {
  /** The name of the knowledge source. */
  name: string;
  /** Optional user-defined description. */
  description?: string;
  /** The type of the knowledge source. */
  /** The discriminator possible values: searchIndex, azureBlob, indexedSharePoint, indexedOneLake, web, remoteSharePoint */
  kind: KnowledgeSourceKind;
  /** The ETag of the knowledge source. */
  eTag?: string;
  /** A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your knowledge source definition when you want full assurance that no one, not even Microsoft, can decrypt them. Once you have encrypted your knowledge source definition, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your knowledge source definition will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019. */
  encryptionKey?: SearchResourceEncryptionKey;
}

export function knowledgeSourceSerializer(item: KnowledgeSource): any {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
  };
}

export function knowledgeSourceDeserializer(item: any): KnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
  };
}

/** Alias for KnowledgeSourceUnion */
export type KnowledgeSourceUnion =
  | SearchIndexKnowledgeSource
  | AzureBlobKnowledgeSource
  | IndexedSharePointKnowledgeSource
  | IndexedOneLakeKnowledgeSource
  | WebKnowledgeSource
  | RemoteSharePointKnowledgeSource
  | KnowledgeSource;

export function knowledgeSourceUnionSerializer(item: KnowledgeSourceUnion): any {
  switch (item.kind) {
    case "searchIndex":
      return searchIndexKnowledgeSourceSerializer(item as SearchIndexKnowledgeSource);

    case "azureBlob":
      return azureBlobKnowledgeSourceSerializer(item as AzureBlobKnowledgeSource);

    case "indexedSharePoint":
      return indexedSharePointKnowledgeSourceSerializer(item as IndexedSharePointKnowledgeSource);

    case "indexedOneLake":
      return indexedOneLakeKnowledgeSourceSerializer(item as IndexedOneLakeKnowledgeSource);

    case "web":
      return webKnowledgeSourceSerializer(item as WebKnowledgeSource);

    case "remoteSharePoint":
      return remoteSharePointKnowledgeSourceSerializer(item as RemoteSharePointKnowledgeSource);

    default:
      return knowledgeSourceSerializer(item);
  }
}

export function knowledgeSourceUnionDeserializer(item: any): KnowledgeSourceUnion {
  switch (item["kind"]) {
    case "searchIndex":
      return searchIndexKnowledgeSourceDeserializer(item as SearchIndexKnowledgeSource);

    case "azureBlob":
      return azureBlobKnowledgeSourceDeserializer(item as AzureBlobKnowledgeSource);

    case "indexedSharePoint":
      return indexedSharePointKnowledgeSourceDeserializer(item as IndexedSharePointKnowledgeSource);

    case "indexedOneLake":
      return indexedOneLakeKnowledgeSourceDeserializer(item as IndexedOneLakeKnowledgeSource);

    case "web":
      return webKnowledgeSourceDeserializer(item as WebKnowledgeSource);

    case "remoteSharePoint":
      return remoteSharePointKnowledgeSourceDeserializer(item as RemoteSharePointKnowledgeSource);

    default:
      return knowledgeSourceDeserializer(item);
  }
}

/** The kind of the knowledge source. */
export enum KnownKnowledgeSourceKind {
  /** A knowledge source that reads data from a Search Index. */
  SearchIndex = "searchIndex",
  /** A knowledge source that read and ingest data from Azure Blob Storage to a Search Index. */
  AzureBlob = "azureBlob",
  /** A knowledge source that reads data from indexed SharePoint. */
  IndexedSharePoint = "indexedSharePoint",
  /** A knowledge source that reads data from indexed OneLake. */
  IndexedOneLake = "indexedOneLake",
  /** A knowledge source that reads data from the web. */
  Web = "web",
  /** A knowledge source that reads data from remote SharePoint. */
  RemoteSharePoint = "remoteSharePoint",
}

/**
 * The kind of the knowledge source. \
 * {@link KnownKnowledgeSourceKind} can be used interchangeably with KnowledgeSourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **searchIndex**: A knowledge source that reads data from a Search Index. \
 * **azureBlob**: A knowledge source that read and ingest data from Azure Blob Storage to a Search Index. \
 * **indexedSharePoint**: A knowledge source that reads data from indexed SharePoint. \
 * **indexedOneLake**: A knowledge source that reads data from indexed OneLake. \
 * **web**: A knowledge source that reads data from the web. \
 * **remoteSharePoint**: A knowledge source that reads data from remote SharePoint.
 */
export type KnowledgeSourceKind = string;

/** Knowledge Source targeting a search index. */
export interface SearchIndexKnowledgeSource extends KnowledgeSource {
  kind: "searchIndex";
  /** The parameters for the knowledge source. */
  searchIndexParameters: SearchIndexKnowledgeSourceParameters;
}

export function searchIndexKnowledgeSourceSerializer(item: SearchIndexKnowledgeSource): any {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    searchIndexParameters: searchIndexKnowledgeSourceParametersSerializer(
      item["searchIndexParameters"],
    ),
  };
}

export function searchIndexKnowledgeSourceDeserializer(item: any): SearchIndexKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    searchIndexParameters: searchIndexKnowledgeSourceParametersDeserializer(
      item["searchIndexParameters"],
    ),
  };
}

/** Parameters for search index knowledge source. */
export interface SearchIndexKnowledgeSourceParameters {
  /** The name of the Search index. */
  searchIndexName: string;
  /** Used to request additional fields for referenced source data. */
  sourceDataFields?: SearchIndexFieldReference[];
  /** Used to restrict which fields to search on the search index. */
  searchFields?: SearchIndexFieldReference[];
  /** Used to specify a different semantic configuration on the target search index other than the default one. */
  semanticConfigurationName?: string;
}

export function searchIndexKnowledgeSourceParametersSerializer(
  item: SearchIndexKnowledgeSourceParameters,
): any {
  return {
    searchIndexName: item["searchIndexName"],
    sourceDataFields: !item["sourceDataFields"]
      ? item["sourceDataFields"]
      : searchIndexFieldReferenceArraySerializer(item["sourceDataFields"]),
    searchFields: !item["searchFields"]
      ? item["searchFields"]
      : searchIndexFieldReferenceArraySerializer(item["searchFields"]),
    semanticConfigurationName: item["semanticConfigurationName"],
  };
}

export function searchIndexKnowledgeSourceParametersDeserializer(
  item: any,
): SearchIndexKnowledgeSourceParameters {
  return {
    searchIndexName: item["searchIndexName"],
    sourceDataFields: !item["sourceDataFields"]
      ? item["sourceDataFields"]
      : searchIndexFieldReferenceArrayDeserializer(item["sourceDataFields"]),
    searchFields: !item["searchFields"]
      ? item["searchFields"]
      : searchIndexFieldReferenceArrayDeserializer(item["searchFields"]),
    semanticConfigurationName: item["semanticConfigurationName"],
  };
}

export function searchIndexFieldReferenceArraySerializer(
  result: Array<SearchIndexFieldReference>,
): any[] {
  return result.map((item) => {
    return searchIndexFieldReferenceSerializer(item);
  });
}

export function searchIndexFieldReferenceArrayDeserializer(
  result: Array<SearchIndexFieldReference>,
): any[] {
  return result.map((item) => {
    return searchIndexFieldReferenceDeserializer(item);
  });
}

/** Field reference for a search index. */
export interface SearchIndexFieldReference {
  /** The name of the field. */
  name: string;
}

export function searchIndexFieldReferenceSerializer(item: SearchIndexFieldReference): any {
  return { name: item["name"] };
}

export function searchIndexFieldReferenceDeserializer(item: any): SearchIndexFieldReference {
  return {
    name: item["name"],
  };
}

/** Configuration for Azure Blob Storage knowledge source. */
export interface AzureBlobKnowledgeSource extends KnowledgeSource {
  kind: "azureBlob";
  /** The type of the knowledge source. */
  azureBlobParameters: AzureBlobKnowledgeSourceParameters;
}

export function azureBlobKnowledgeSourceSerializer(item: AzureBlobKnowledgeSource): any {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    azureBlobParameters: azureBlobKnowledgeSourceParametersSerializer(item["azureBlobParameters"]),
  };
}

export function azureBlobKnowledgeSourceDeserializer(item: any): AzureBlobKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    azureBlobParameters: azureBlobKnowledgeSourceParametersDeserializer(
      item["azureBlobParameters"],
    ),
  };
}

/** Parameters for Azure Blob Storage knowledge source. */
export interface AzureBlobKnowledgeSourceParameters {
  /** Key-based connection string or the ResourceId format if using a managed identity. */
  connectionString: string;
  /** The name of the blob storage container. */
  containerName: string;
  /** Optional folder path within the container. */
  folderPath?: string;
  /** Set to true if connecting to an ADLS Gen2 storage account. Default is false. */
  isAdlsGen2?: boolean;
  /** Consolidates all general ingestion settings. */
  ingestionParameters?: KnowledgeSourceIngestionParameters;
  /** Resources created by the knowledge source. */
  readonly createdResources?: CreatedResources;
}

export function azureBlobKnowledgeSourceParametersSerializer(
  item: AzureBlobKnowledgeSourceParameters,
): any {
  return {
    connectionString: item["connectionString"],
    containerName: item["containerName"],
    folderPath: item["folderPath"],
    isADLSGen2: item["isAdlsGen2"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersSerializer(item["ingestionParameters"]),
  };
}

export function azureBlobKnowledgeSourceParametersDeserializer(
  item: any,
): AzureBlobKnowledgeSourceParameters {
  return {
    connectionString: item["connectionString"],
    containerName: item["containerName"],
    folderPath: item["folderPath"],
    isAdlsGen2: item["isADLSGen2"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersDeserializer(item["ingestionParameters"]),
    createdResources: !item["createdResources"]
      ? item["createdResources"]
      : createdResourcesDeserializer(item["createdResources"]),
  };
}

/** Represents a schedule for indexer execution. */
export interface IndexingSchedule {
  /** The interval of time between indexer executions. */
  interval: string;
  /** The time when an indexer should start running. */
  startTime?: Date;
}

export function indexingScheduleSerializer(item: IndexingSchedule): any {
  return {
    interval: item["interval"],
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
  };
}

export function indexingScheduleDeserializer(item: any): IndexingSchedule {
  return {
    interval: item["interval"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
  };
}

/** Permission types to ingest together with document content. */
export enum KnownKnowledgeSourceIngestionPermissionOption {
  /** Ingest explicit user identifiers alongside document content. */
  UserIds = "userIds",
  /** Ingest group identifiers alongside document content. */
  GroupIds = "groupIds",
  /** Ingest RBAC scope information alongside document content. */
  RbacScope = "rbacScope",
}

/**
 * Permission types to ingest together with document content. \
 * {@link KnownKnowledgeSourceIngestionPermissionOption} can be used interchangeably with KnowledgeSourceIngestionPermissionOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **userIds**: Ingest explicit user identifiers alongside document content. \
 * **groupIds**: Ingest group identifiers alongside document content. \
 * **rbacScope**: Ingest RBAC scope information alongside document content.
 */
export type KnowledgeSourceIngestionPermissionOption = string;

/** Optional content extraction mode. Default is 'minimal'. */
export enum KnownKnowledgeSourceContentExtractionMode {
  /** Extracts only essential metadata while deferring most content processing. */
  Minimal = "minimal",
  /** Performs the full default content extraction pipeline. */
  Standard = "standard",
}

/**
 * Optional content extraction mode. Default is 'minimal'. \
 * {@link KnownKnowledgeSourceContentExtractionMode} can be used interchangeably with KnowledgeSourceContentExtractionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **minimal**: Extracts only essential metadata while deferring most content processing. \
 * **standard**: Performs the full default content extraction pipeline.
 */
export type KnowledgeSourceContentExtractionMode = string;

/** Resources created by the knowledge source. Keys represent resource types (e.g., 'datasource', 'indexer', 'skillset', 'index') and values represent resource names. */
export interface CreatedResources {
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function createdResourcesDeserializer(item: any): CreatedResources {
  return {
    additionalProperties: serializeRecord(item, []),
  };
}

/** Configuration for SharePoint knowledge source. */
export interface IndexedSharePointKnowledgeSource extends KnowledgeSource {
  kind: "indexedSharePoint";
  /** The parameters for the knowledge source. */
  indexedSharePointParameters: IndexedSharePointKnowledgeSourceParameters;
}

export function indexedSharePointKnowledgeSourceSerializer(
  item: IndexedSharePointKnowledgeSource,
): any {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    indexedSharePointParameters: indexedSharePointKnowledgeSourceParametersSerializer(
      item["indexedSharePointParameters"],
    ),
  };
}

export function indexedSharePointKnowledgeSourceDeserializer(
  item: any,
): IndexedSharePointKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    indexedSharePointParameters: indexedSharePointKnowledgeSourceParametersDeserializer(
      item["indexedSharePointParameters"],
    ),
  };
}

/** Parameters for SharePoint knowledge source. */
export interface IndexedSharePointKnowledgeSourceParameters {
  /** SharePoint connection string with format: SharePointOnlineEndpoint=[SharePoint site url];ApplicationId=[Azure AD App ID];ApplicationSecret=[Azure AD App client secret];TenantId=[SharePoint site tenant id] */
  connectionString: string;
  /** Specifies which SharePoint libraries to access. */
  containerName: IndexedSharePointContainerName;
  /** Optional query to filter SharePoint content. */
  query?: string;
  /** Consolidates all general ingestion settings. */
  ingestionParameters?: KnowledgeSourceIngestionParameters;
  /** Resources created by the knowledge source. */
  readonly createdResources?: CreatedResources;
}

export function indexedSharePointKnowledgeSourceParametersSerializer(
  item: IndexedSharePointKnowledgeSourceParameters,
): any {
  return {
    connectionString: item["connectionString"],
    containerName: item["containerName"],
    query: item["query"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersSerializer(item["ingestionParameters"]),
  };
}

export function indexedSharePointKnowledgeSourceParametersDeserializer(
  item: any,
): IndexedSharePointKnowledgeSourceParameters {
  return {
    connectionString: item["connectionString"],
    containerName: item["containerName"],
    query: item["query"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersDeserializer(item["ingestionParameters"]),
    createdResources: !item["createdResources"]
      ? item["createdResources"]
      : createdResourcesDeserializer(item["createdResources"]),
  };
}

/** Specifies which SharePoint libraries to access. */
export enum KnownIndexedSharePointContainerName {
  /** Index content from the site's default document library. */
  DefaultSiteLibrary = "defaultSiteLibrary",
  /** Index content from every document library in the site. */
  AllSiteLibraries = "allSiteLibraries",
  /** Use a query to filter SharePoint content. */
  UseQuery = "useQuery",
}

/**
 * Specifies which SharePoint libraries to access. \
 * {@link KnownIndexedSharePointContainerName} can be used interchangeably with IndexedSharePointContainerName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **defaultSiteLibrary**: Index content from the site's default document library. \
 * **allSiteLibraries**: Index content from every document library in the site. \
 * **useQuery**: Use a query to filter SharePoint content.
 */
export type IndexedSharePointContainerName = string;

/** Configuration for OneLake knowledge source. */
export interface IndexedOneLakeKnowledgeSource extends KnowledgeSource {
  kind: "indexedOneLake";
  /** The parameters for the knowledge source. */
  indexedOneLakeParameters: IndexedOneLakeKnowledgeSourceParameters;
}

export function indexedOneLakeKnowledgeSourceSerializer(item: IndexedOneLakeKnowledgeSource): any {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    indexedOneLakeParameters: indexedOneLakeKnowledgeSourceParametersSerializer(
      item["indexedOneLakeParameters"],
    ),
  };
}

export function indexedOneLakeKnowledgeSourceDeserializer(
  item: any,
): IndexedOneLakeKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    indexedOneLakeParameters: indexedOneLakeKnowledgeSourceParametersDeserializer(
      item["indexedOneLakeParameters"],
    ),
  };
}

/** Parameters for OneLake knowledge source. */
export interface IndexedOneLakeKnowledgeSourceParameters {
  /** OneLake workspace ID. */
  fabricWorkspaceId: string;
  /** Specifies which OneLake lakehouse to access. */
  lakehouseId: string;
  /** Optional OneLakehouse folder or shortcut to filter OneLake content. */
  targetPath?: string;
  /** Consolidates all general ingestion settings. */
  ingestionParameters?: KnowledgeSourceIngestionParameters;
  /** Resources created by the knowledge source. */
  readonly createdResources?: CreatedResources;
}

export function indexedOneLakeKnowledgeSourceParametersSerializer(
  item: IndexedOneLakeKnowledgeSourceParameters,
): any {
  return {
    fabricWorkspaceId: item["fabricWorkspaceId"],
    lakehouseId: item["lakehouseId"],
    targetPath: item["targetPath"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersSerializer(item["ingestionParameters"]),
  };
}

export function indexedOneLakeKnowledgeSourceParametersDeserializer(
  item: any,
): IndexedOneLakeKnowledgeSourceParameters {
  return {
    fabricWorkspaceId: item["fabricWorkspaceId"],
    lakehouseId: item["lakehouseId"],
    targetPath: item["targetPath"],
    ingestionParameters: !item["ingestionParameters"]
      ? item["ingestionParameters"]
      : knowledgeSourceIngestionParametersDeserializer(item["ingestionParameters"]),
    createdResources: !item["createdResources"]
      ? item["createdResources"]
      : createdResourcesDeserializer(item["createdResources"]),
  };
}

/** Knowledge Source targeting web results. */
export interface WebKnowledgeSource extends KnowledgeSource {
  kind: "web";
  /** The parameters for the web knowledge source. */
  webParameters?: WebKnowledgeSourceParameters;
}

export function webKnowledgeSourceSerializer(item: WebKnowledgeSource): any {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    webParameters: !item["webParameters"]
      ? item["webParameters"]
      : webKnowledgeSourceParametersSerializer(item["webParameters"]),
  };
}

export function webKnowledgeSourceDeserializer(item: any): WebKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    webParameters: !item["webParameters"]
      ? item["webParameters"]
      : webKnowledgeSourceParametersDeserializer(item["webParameters"]),
  };
}

/** Parameters for web knowledge source. */
export interface WebKnowledgeSourceParameters {
  /** Domain allow/block configuration for web results. */
  domains?: WebKnowledgeSourceDomains;
}

export function webKnowledgeSourceParametersSerializer(item: WebKnowledgeSourceParameters): any {
  return {
    domains: !item["domains"]
      ? item["domains"]
      : webKnowledgeSourceDomainsSerializer(item["domains"]),
  };
}

export function webKnowledgeSourceParametersDeserializer(item: any): WebKnowledgeSourceParameters {
  return {
    domains: !item["domains"]
      ? item["domains"]
      : webKnowledgeSourceDomainsDeserializer(item["domains"]),
  };
}

/** Domain allow/block configuration for web knowledge source. */
export interface WebKnowledgeSourceDomains {
  /** Domains that are allowed for web results. */
  allowedDomains?: WebKnowledgeSourceDomain[];
  /** Domains that are blocked from web results. */
  blockedDomains?: WebKnowledgeSourceDomain[];
}

export function webKnowledgeSourceDomainsSerializer(item: WebKnowledgeSourceDomains): any {
  return {
    allowedDomains: !item["allowedDomains"]
      ? item["allowedDomains"]
      : webKnowledgeSourceDomainArraySerializer(item["allowedDomains"]),
    blockedDomains: !item["blockedDomains"]
      ? item["blockedDomains"]
      : webKnowledgeSourceDomainArraySerializer(item["blockedDomains"]),
  };
}

export function webKnowledgeSourceDomainsDeserializer(item: any): WebKnowledgeSourceDomains {
  return {
    allowedDomains: !item["allowedDomains"]
      ? item["allowedDomains"]
      : webKnowledgeSourceDomainArrayDeserializer(item["allowedDomains"]),
    blockedDomains: !item["blockedDomains"]
      ? item["blockedDomains"]
      : webKnowledgeSourceDomainArrayDeserializer(item["blockedDomains"]),
  };
}

export function webKnowledgeSourceDomainArraySerializer(
  result: Array<WebKnowledgeSourceDomain>,
): any[] {
  return result.map((item) => {
    return webKnowledgeSourceDomainSerializer(item);
  });
}

export function webKnowledgeSourceDomainArrayDeserializer(
  result: Array<WebKnowledgeSourceDomain>,
): any[] {
  return result.map((item) => {
    return webKnowledgeSourceDomainDeserializer(item);
  });
}

/** Configuration for web knowledge source domain. */
export interface WebKnowledgeSourceDomain {
  /** The address of the domain. */
  address: string;
  /** Whether or not to include subpages from this domain. */
  includeSubpages?: boolean;
}

export function webKnowledgeSourceDomainSerializer(item: WebKnowledgeSourceDomain): any {
  return { address: item["address"], includeSubpages: item["includeSubpages"] };
}

export function webKnowledgeSourceDomainDeserializer(item: any): WebKnowledgeSourceDomain {
  return {
    address: item["address"],
    includeSubpages: item["includeSubpages"],
  };
}

/** Configuration for remote SharePoint knowledge source. */
export interface RemoteSharePointKnowledgeSource extends KnowledgeSource {
  kind: "remoteSharePoint";
  /** The parameters for the remote SharePoint knowledge source. */
  remoteSharePointParameters?: RemoteSharePointKnowledgeSourceParameters;
}

export function remoteSharePointKnowledgeSourceSerializer(
  item: RemoteSharePointKnowledgeSource,
): any {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    remoteSharePointParameters: !item["remoteSharePointParameters"]
      ? item["remoteSharePointParameters"]
      : remoteSharePointKnowledgeSourceParametersSerializer(item["remoteSharePointParameters"]),
  };
}

export function remoteSharePointKnowledgeSourceDeserializer(
  item: any,
): RemoteSharePointKnowledgeSource {
  return {
    name: item["name"],
    description: item["description"],
    kind: item["kind"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    remoteSharePointParameters: !item["remoteSharePointParameters"]
      ? item["remoteSharePointParameters"]
      : remoteSharePointKnowledgeSourceParametersDeserializer(item["remoteSharePointParameters"]),
  };
}

/** Parameters for remote SharePoint knowledge source. */
export interface RemoteSharePointKnowledgeSourceParameters {
  /** Keyword Query Language (KQL) expression with queryable SharePoint properties and attributes to scope the retrieval before the query runs. */
  filterExpression?: string;
  /** A list of metadata fields to be returned for each item in the response. Only retrievable metadata properties can be included in this list. By default, no metadata is returned. */
  resourceMetadata?: string[];
  /** Container ID for SharePoint Embedded connection. When this is null, it will use SharePoint Online. */
  containerTypeId?: string;
}

export function remoteSharePointKnowledgeSourceParametersSerializer(
  item: RemoteSharePointKnowledgeSourceParameters,
): any {
  return {
    filterExpression: item["filterExpression"],
    resourceMetadata: !item["resourceMetadata"]
      ? item["resourceMetadata"]
      : item["resourceMetadata"].map((p: any) => {
          return p;
        }),
    containerTypeId: item["containerTypeId"],
  };
}

export function remoteSharePointKnowledgeSourceParametersDeserializer(
  item: any,
): RemoteSharePointKnowledgeSourceParameters {
  return {
    filterExpression: item["filterExpression"],
    resourceMetadata: !item["resourceMetadata"]
      ? item["resourceMetadata"]
      : item["resourceMetadata"].map((p: any) => {
          return p;
        }),
    containerTypeId: item["containerTypeId"],
  };
}

/** Result from listing knowledge sources. */
export interface _ListKnowledgeSourcesResult {
  /** The knowledge sources in the service. */
  value: KnowledgeSourceUnion[];
}

export function _listKnowledgeSourcesResultDeserializer(item: any): _ListKnowledgeSourcesResult {
  return {
    value: knowledgeSourceUnionArrayDeserializer(item["value"]),
  };
}

export function knowledgeSourceUnionArraySerializer(result: Array<KnowledgeSourceUnion>): any[] {
  return result.map((item) => {
    return knowledgeSourceUnionSerializer(item);
  });
}

export function knowledgeSourceUnionArrayDeserializer(result: Array<KnowledgeSourceUnion>): any[] {
  return result.map((item) => {
    return knowledgeSourceUnionDeserializer(item);
  });
}

/** The current synchronization status of the knowledge source. */
export enum KnownKnowledgeSourceSynchronizationStatus {
  /** The knowledge source is being provisioned. */
  Creating = "creating",
  /** The knowledge source is active and synchronization runs are occurring. */
  Active = "active",
  /** The knowledge source is being deleted and synchronization is paused. */
  Deleting = "deleting",
}

/**
 * The current synchronization status of the knowledge source. \
 * {@link KnownKnowledgeSourceSynchronizationStatus} can be used interchangeably with KnowledgeSourceSynchronizationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **creating**: The knowledge source is being provisioned. \
 * **active**: The knowledge source is active and synchronization runs are occurring. \
 * **deleting**: The knowledge source is being deleted and synchronization is paused.
 */
export type KnowledgeSourceSynchronizationStatus = string;

/** Response from a get service statistics request. If successful, it includes service level counters and limits. */
export interface SearchServiceStatistics {
  /** Service level resource counters. */
  counters: ServiceCounters;
  /** Service level general limits. */
  limits: ServiceLimits;
  /** Service level indexer runtime consumption. */
  indexersRuntime: ServiceIndexersRuntime;
}

export function searchServiceStatisticsDeserializer(item: any): SearchServiceStatistics {
  return {
    counters: serviceCountersDeserializer(item["counters"]),
    limits: serviceLimitsDeserializer(item["limits"]),
    indexersRuntime: serviceIndexersRuntimeDeserializer(item["indexersRuntime"]),
  };
}

/** Represents service-level resource counters and quotas. */
export interface ServiceCounters {
  /** Total number of aliases. */
  aliasCounter: ResourceCounter;
  /** Total number of documents across all indexes in the service. */
  documentCounter: ResourceCounter;
  /** Total number of indexes. */
  indexCounter: ResourceCounter;
  /** Total number of indexers. */
  indexerCounter: ResourceCounter;
  /** Total number of data sources. */
  dataSourceCounter: ResourceCounter;
  /** Total size of used storage in bytes. */
  storageSizeCounter: ResourceCounter;
  /** Total number of synonym maps. */
  synonymMapCounter: ResourceCounter;
  /** Total number of skillsets. */
  skillsetCounter: ResourceCounter;
  /** Total memory consumption of all vector indexes within the service, in bytes. */
  vectorIndexSizeCounter: ResourceCounter;
}

export function serviceCountersDeserializer(item: any): ServiceCounters {
  return {
    aliasCounter: resourceCounterDeserializer(item["aliasesCount"]),
    documentCounter: resourceCounterDeserializer(item["documentCount"]),
    indexCounter: resourceCounterDeserializer(item["indexesCount"]),
    indexerCounter: resourceCounterDeserializer(item["indexersCount"]),
    dataSourceCounter: resourceCounterDeserializer(item["dataSourcesCount"]),
    storageSizeCounter: resourceCounterDeserializer(item["storageSize"]),
    synonymMapCounter: resourceCounterDeserializer(item["synonymMaps"]),
    skillsetCounter: resourceCounterDeserializer(item["skillsetCount"]),
    vectorIndexSizeCounter: resourceCounterDeserializer(item["vectorIndexSize"]),
  };
}

/** Represents a resource's usage and quota. */
export interface ResourceCounter {
  /** The resource usage amount. */
  usage: number;
  /** The resource amount quota. */
  quota?: number;
}

export function resourceCounterDeserializer(item: any): ResourceCounter {
  return {
    usage: item["usage"],
    quota: item["quota"],
  };
}

/** Represents various service level limits. */
export interface ServiceLimits {
  /** The maximum allowed fields per index. */
  maxFieldsPerIndex?: number;
  /** The maximum depth which you can nest sub-fields in an index, including the top-level complex field. For example, a/b/c has a nesting depth of 3. */
  maxFieldNestingDepthPerIndex?: number;
  /** The maximum number of fields of type Collection(Edm.ComplexType) allowed in an index. */
  maxComplexCollectionFieldsPerIndex?: number;
  /** The maximum number of objects in complex collections allowed per document. */
  maxComplexObjectsInCollectionsPerDocument?: number;
  /** The maximum amount of storage in bytes allowed per index. */
  maxStoragePerIndexInBytes?: number;
  /** The maximum cumulative indexer runtime in seconds allowed for the service. */
  maxCumulativeIndexerRuntimeSeconds?: number;
}

export function serviceLimitsDeserializer(item: any): ServiceLimits {
  return {
    maxFieldsPerIndex: item["maxFieldsPerIndex"],
    maxFieldNestingDepthPerIndex: item["maxFieldNestingDepthPerIndex"],
    maxComplexCollectionFieldsPerIndex: item["maxComplexCollectionFieldsPerIndex"],
    maxComplexObjectsInCollectionsPerDocument: item["maxComplexObjectsInCollectionsPerDocument"],
    maxStoragePerIndexInBytes: item["maxStoragePerIndex"],
    maxCumulativeIndexerRuntimeSeconds: item["maxCumulativeIndexerRuntimeSeconds"],
  };
}

/** Represents service-level indexer runtime counters. */
export interface ServiceIndexersRuntime {
  /** Cumulative runtime of all indexers in the service from the beginningTime to endingTime, in seconds. */
  usedSeconds: number;
  /** Cumulative runtime remaining for all indexers in the service from the beginningTime to endingTime, in seconds. */
  remainingSeconds?: number;
  /** Beginning UTC time of the 24-hour period considered for indexer runtime usage (inclusive). */
  beginningTime: Date;
  /** End UTC time of the 24-hour period considered for indexer runtime usage (inclusive). */
  endingTime: Date;
}

export function serviceIndexersRuntimeDeserializer(item: any): ServiceIndexersRuntime {
  return {
    usedSeconds: item["usedSeconds"],
    remainingSeconds: item["remainingSeconds"],
    beginningTime: new Date(item["beginningTime"]),
    endingTime: new Date(item["endingTime"]),
  };
}

/** Response from a request to retrieve stats summary of all indexes. If successful, it includes the stats of each index in the service. */
export interface _ListIndexStatsSummary {
  /** The Statistics summary of all indexes in the Search service. */
  readonly indexesStatistics: IndexStatisticsSummary[];
}

export function _listIndexStatsSummaryDeserializer(item: any): _ListIndexStatsSummary {
  return {
    indexesStatistics: indexStatisticsSummaryArrayDeserializer(item["value"]),
  };
}

export function indexStatisticsSummaryArrayDeserializer(
  result: Array<IndexStatisticsSummary>,
): any[] {
  return result.map((item) => {
    return indexStatisticsSummaryDeserializer(item);
  });
}

/** Statistics for a given index. Statistics are collected periodically and are not guaranteed to always be up-to-date. */
export interface IndexStatisticsSummary {
  /** The name of the index. */
  name: string;
  /** The number of documents in the index. */
  readonly documentCount: number;
  /** The amount of storage in bytes consumed by the index. */
  readonly storageSize: number;
  /** The amount of memory in bytes consumed by vectors in the index. */
  readonly vectorIndexSize: number;
}

export function indexStatisticsSummaryDeserializer(item: any): IndexStatisticsSummary {
  return {
    name: item["name"],
    documentCount: item["documentCount"],
    storageSize: item["storageSize"],
    vectorIndexSize: item["vectorIndexSize"],
  };
}

/** Represents a datasource definition, which can be used to configure an indexer. */
export interface SearchIndexerDataSourceConnection {
  /** The name of the datasource. */
  name: string;
  /** The description of the datasource. */
  description?: string;
  /** The type of the datasource. */
  type: SearchIndexerDataSourceType;
  /** A specific type of the data source, in case the resource is capable of different modalities. For example, 'MongoDb' for certain 'cosmosDb' accounts. */
  readonly subType?: string;
  /** The data container for the datasource. */
  container: SearchIndexerDataContainer;
  /** An explicit managed identity to use for this datasource. If not specified and the connection string is a managed identity, the system-assigned managed identity is used. If not specified, the value remains unchanged. If "none" is specified, the value of this property is cleared. */
  identity?: SearchIndexerDataIdentityUnion;
  /** Ingestion options with various types of permission data. */
  indexerPermissionOptions?: IndexerPermissionOption[];
  /** The data change detection policy for the datasource. */
  dataChangeDetectionPolicy?: DataChangeDetectionPolicyUnion;
  /** The data deletion detection policy for the datasource. */
  dataDeletionDetectionPolicy?: DataDeletionDetectionPolicyUnion;
  /** The ETag of the data source. */
  eTag?: string;
  /** A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your datasource definition when you want full assurance that no one, not even Microsoft, can decrypt your data source definition. Once you have encrypted your data source definition, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your datasource definition will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019. */
  encryptionKey?: SearchResourceEncryptionKey;
  /** The connection string for the datasource. Set to `<unchanged>` (with brackets) if you don't want the connection string updated. Set to `<redacted>` if you want to remove the connection string value from the datasource. */
  connectionString?: string;
}

export function searchIndexerDataSourceConnectionSerializer(
  item: SearchIndexerDataSourceConnection,
): any {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    credentials: _searchIndexerDataSourceConnectionCredentialsSerializer(item),
    container: searchIndexerDataContainerSerializer(item["container"]),
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionSerializer(item["identity"]),
    indexerPermissionOptions: !item["indexerPermissionOptions"]
      ? item["indexerPermissionOptions"]
      : item["indexerPermissionOptions"].map((p: any) => {
          return p;
        }),
    dataChangeDetectionPolicy: !item["dataChangeDetectionPolicy"]
      ? item["dataChangeDetectionPolicy"]
      : dataChangeDetectionPolicyUnionSerializer(item["dataChangeDetectionPolicy"]),
    dataDeletionDetectionPolicy: !item["dataDeletionDetectionPolicy"]
      ? item["dataDeletionDetectionPolicy"]
      : dataDeletionDetectionPolicyUnionSerializer(item["dataDeletionDetectionPolicy"]),
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
  };
}

export function searchIndexerDataSourceConnectionDeserializer(
  item: any,
): SearchIndexerDataSourceConnection {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    subType: item["subType"],
    ..._searchIndexerDataSourceConnectionCredentialsDeserializer(item["credentials"]),
    container: searchIndexerDataContainerDeserializer(item["container"]),
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
    indexerPermissionOptions: !item["indexerPermissionOptions"]
      ? item["indexerPermissionOptions"]
      : item["indexerPermissionOptions"].map((p1: any) => {
          return p1;
        }),
    dataChangeDetectionPolicy: !item["dataChangeDetectionPolicy"]
      ? item["dataChangeDetectionPolicy"]
      : dataChangeDetectionPolicyUnionDeserializer(item["dataChangeDetectionPolicy"]),
    dataDeletionDetectionPolicy: !item["dataDeletionDetectionPolicy"]
      ? item["dataDeletionDetectionPolicy"]
      : dataDeletionDetectionPolicyUnionDeserializer(item["dataDeletionDetectionPolicy"]),
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
  };
}

/** Defines the type of a datasource. */
export enum KnownSearchIndexerDataSourceType {
  /** Indicates an Azure SQL datasource. */
  AzureSql = "azuresql",
  /** Indicates a CosmosDB datasource. */
  CosmosDb = "cosmosdb",
  /** Indicates an Azure Blob datasource. */
  AzureBlob = "azureblob",
  /** Indicates an Azure Table datasource. */
  AzureTable = "azuretable",
  /** Indicates a MySql datasource. */
  MySql = "mysql",
  /** Indicates an ADLS Gen2 datasource. */
  AdlsGen2 = "adlsgen2",
  /** Indicates a Microsoft Fabric OneLake datasource. */
  OneLake = "onelake",
  /** Indicates a SharePoint datasource. */
  SharePoint = "sharepoint",
}

/**
 * Defines the type of a datasource. \
 * {@link KnownSearchIndexerDataSourceType} can be used interchangeably with SearchIndexerDataSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azuresql**: Indicates an Azure SQL datasource. \
 * **cosmosdb**: Indicates a CosmosDB datasource. \
 * **azureblob**: Indicates an Azure Blob datasource. \
 * **azuretable**: Indicates an Azure Table datasource. \
 * **mysql**: Indicates a MySql datasource. \
 * **adlsgen2**: Indicates an ADLS Gen2 datasource. \
 * **onelake**: Indicates a Microsoft Fabric OneLake datasource. \
 * **sharepoint**: Indicates a SharePoint datasource.
 */
export type SearchIndexerDataSourceType = string;

/** Represents credentials that can be used to connect to a datasource. */
export interface DataSourceCredentials {
  /** The connection string for the datasource. Set to `<unchanged>` (with brackets) if you don't want the connection string updated. Set to `<redacted>` if you want to remove the connection string value from the datasource. */
  connectionString?: string;
}

export function dataSourceCredentialsSerializer(item: DataSourceCredentials): any {
  return { connectionString: item["connectionString"] };
}

export function dataSourceCredentialsDeserializer(item: any): DataSourceCredentials {
  return {
    connectionString: item["connectionString"],
  };
}

/** Represents information about the entity (such as Azure SQL table or CosmosDB collection) that will be indexed. */
export interface SearchIndexerDataContainer {
  /** The name of the table or view (for Azure SQL data source) or collection (for CosmosDB data source) that will be indexed. */
  name: string;
  /** A query that is applied to this data container. The syntax and meaning of this parameter is datasource-specific. Not supported by Azure SQL datasources. */
  query?: string;
}

export function searchIndexerDataContainerSerializer(item: SearchIndexerDataContainer): any {
  return { name: item["name"], query: item["query"] };
}

export function searchIndexerDataContainerDeserializer(item: any): SearchIndexerDataContainer {
  return {
    name: item["name"],
    query: item["query"],
  };
}

/** Options with various types of permission data to index. */
export enum KnownIndexerPermissionOption {
  /** Indexer to ingest ACL userIds from data source to index. */
  UserIds = "userIds",
  /** Indexer to ingest ACL groupIds from data source to index. */
  GroupIds = "groupIds",
  /** Indexer to ingest Azure RBAC scope from data source to index. */
  RbacScope = "rbacScope",
}

/**
 * Options with various types of permission data to index. \
 * {@link KnownIndexerPermissionOption} can be used interchangeably with IndexerPermissionOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **userIds**: Indexer to ingest ACL userIds from data source to index. \
 * **groupIds**: Indexer to ingest ACL groupIds from data source to index. \
 * **rbacScope**: Indexer to ingest Azure RBAC scope from data source to index.
 */
export type IndexerPermissionOption = string;

/** Base type for data change detection policies. */
export interface DataChangeDetectionPolicy {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy, #Microsoft.Azure.Search.SqlIntegratedChangeTrackingPolicy */
  odatatype: string;
}

export function dataChangeDetectionPolicySerializer(item: DataChangeDetectionPolicy): any {
  return { "@odata.type": item["odatatype"] };
}

export function dataChangeDetectionPolicyDeserializer(item: any): DataChangeDetectionPolicy {
  return {
    odatatype: item["@odata.type"],
  };
}

/** Alias for DataChangeDetectionPolicyUnion */
export type DataChangeDetectionPolicyUnion =
  | HighWaterMarkChangeDetectionPolicy
  | SqlIntegratedChangeTrackingPolicy
  | DataChangeDetectionPolicy;

export function dataChangeDetectionPolicyUnionSerializer(
  item: DataChangeDetectionPolicyUnion,
): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy":
      return highWaterMarkChangeDetectionPolicySerializer(
        item as HighWaterMarkChangeDetectionPolicy,
      );

    case "#Microsoft.Azure.Search.SqlIntegratedChangeTrackingPolicy":
      return sqlIntegratedChangeTrackingPolicySerializer(item as SqlIntegratedChangeTrackingPolicy);

    default:
      return dataChangeDetectionPolicySerializer(item);
  }
}

export function dataChangeDetectionPolicyUnionDeserializer(
  item: any,
): DataChangeDetectionPolicyUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy":
      return highWaterMarkChangeDetectionPolicyDeserializer(
        item as HighWaterMarkChangeDetectionPolicy,
      );

    case "#Microsoft.Azure.Search.SqlIntegratedChangeTrackingPolicy":
      return sqlIntegratedChangeTrackingPolicyDeserializer(
        item as SqlIntegratedChangeTrackingPolicy,
      );

    default:
      return dataChangeDetectionPolicyDeserializer(item);
  }
}

/** Defines a data change detection policy that captures changes based on the value of a high water mark column. */
export interface HighWaterMarkChangeDetectionPolicy extends DataChangeDetectionPolicy {
  /** The name of the high water mark column. */
  highWaterMarkColumnName: string;
  /** A URI fragment specifying the type of data change detection policy. */
  odatatype: "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy";
}

export function highWaterMarkChangeDetectionPolicySerializer(
  item: HighWaterMarkChangeDetectionPolicy,
): any {
  return {
    "@odata.type": item["odatatype"],
    highWaterMarkColumnName: item["highWaterMarkColumnName"],
  };
}

export function highWaterMarkChangeDetectionPolicyDeserializer(
  item: any,
): HighWaterMarkChangeDetectionPolicy {
  return {
    odatatype: item["@odata.type"],
    highWaterMarkColumnName: item["highWaterMarkColumnName"],
  };
}

/** Defines a data change detection policy that captures changes using the Integrated Change Tracking feature of Azure SQL Database. */
export interface SqlIntegratedChangeTrackingPolicy extends DataChangeDetectionPolicy {
  /** A URI fragment specifying the type of data change detection policy. */
  odatatype: "#Microsoft.Azure.Search.SqlIntegratedChangeTrackingPolicy";
}

export function sqlIntegratedChangeTrackingPolicySerializer(
  item: SqlIntegratedChangeTrackingPolicy,
): any {
  return { "@odata.type": item["odatatype"] };
}

export function sqlIntegratedChangeTrackingPolicyDeserializer(
  item: any,
): SqlIntegratedChangeTrackingPolicy {
  return {
    odatatype: item["@odata.type"],
  };
}

/** Base type for data deletion detection policies. */
export interface DataDeletionDetectionPolicy {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy, #Microsoft.Azure.Search.NativeBlobSoftDeleteDeletionDetectionPolicy */
  odatatype: string;
}

export function dataDeletionDetectionPolicySerializer(item: DataDeletionDetectionPolicy): any {
  return { "@odata.type": item["odatatype"] };
}

export function dataDeletionDetectionPolicyDeserializer(item: any): DataDeletionDetectionPolicy {
  return {
    odatatype: item["@odata.type"],
  };
}

/** Alias for DataDeletionDetectionPolicyUnion */
export type DataDeletionDetectionPolicyUnion =
  | SoftDeleteColumnDeletionDetectionPolicy
  | NativeBlobSoftDeleteDeletionDetectionPolicy
  | DataDeletionDetectionPolicy;

export function dataDeletionDetectionPolicyUnionSerializer(
  item: DataDeletionDetectionPolicyUnion,
): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy":
      return softDeleteColumnDeletionDetectionPolicySerializer(
        item as SoftDeleteColumnDeletionDetectionPolicy,
      );

    case "#Microsoft.Azure.Search.NativeBlobSoftDeleteDeletionDetectionPolicy":
      return nativeBlobSoftDeleteDeletionDetectionPolicySerializer(
        item as NativeBlobSoftDeleteDeletionDetectionPolicy,
      );

    default:
      return dataDeletionDetectionPolicySerializer(item);
  }
}

export function dataDeletionDetectionPolicyUnionDeserializer(
  item: any,
): DataDeletionDetectionPolicyUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy":
      return softDeleteColumnDeletionDetectionPolicyDeserializer(
        item as SoftDeleteColumnDeletionDetectionPolicy,
      );

    case "#Microsoft.Azure.Search.NativeBlobSoftDeleteDeletionDetectionPolicy":
      return nativeBlobSoftDeleteDeletionDetectionPolicyDeserializer(
        item as NativeBlobSoftDeleteDeletionDetectionPolicy,
      );

    default:
      return dataDeletionDetectionPolicyDeserializer(item);
  }
}

/** Defines a data deletion detection policy that implements a soft-deletion strategy. It determines whether an item should be deleted based on the value of a designated 'soft delete' column. */
export interface SoftDeleteColumnDeletionDetectionPolicy extends DataDeletionDetectionPolicy {
  /** The name of the column to use for soft-deletion detection. */
  softDeleteColumnName?: string;
  /** The marker value that identifies an item as deleted. */
  softDeleteMarkerValue?: string;
  /** A URI fragment specifying the type of data deletion detection policy. */
  odatatype: "#Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy";
}

export function softDeleteColumnDeletionDetectionPolicySerializer(
  item: SoftDeleteColumnDeletionDetectionPolicy,
): any {
  return {
    "@odata.type": item["odatatype"],
    softDeleteColumnName: item["softDeleteColumnName"],
    softDeleteMarkerValue: item["softDeleteMarkerValue"],
  };
}

export function softDeleteColumnDeletionDetectionPolicyDeserializer(
  item: any,
): SoftDeleteColumnDeletionDetectionPolicy {
  return {
    odatatype: item["@odata.type"],
    softDeleteColumnName: item["softDeleteColumnName"],
    softDeleteMarkerValue: item["softDeleteMarkerValue"],
  };
}

/** Defines a data deletion detection policy utilizing Azure Blob Storage's native soft delete feature for deletion detection. */
export interface NativeBlobSoftDeleteDeletionDetectionPolicy extends DataDeletionDetectionPolicy {
  /** A URI fragment specifying the type of data deletion detection policy. */
  odatatype: "#Microsoft.Azure.Search.NativeBlobSoftDeleteDeletionDetectionPolicy";
}

export function nativeBlobSoftDeleteDeletionDetectionPolicySerializer(
  item: NativeBlobSoftDeleteDeletionDetectionPolicy,
): any {
  return { "@odata.type": item["odatatype"] };
}

export function nativeBlobSoftDeleteDeletionDetectionPolicyDeserializer(
  item: any,
): NativeBlobSoftDeleteDeletionDetectionPolicy {
  return {
    odatatype: item["@odata.type"],
  };
}

/** Response from a List Datasources request. If successful, it includes the full definitions of all datasources. */
export interface ListDataSourcesResult {
  /** The datasources in the Search service. */
  readonly dataSources: SearchIndexerDataSourceConnection[];
}

export function listDataSourcesResultDeserializer(item: any): ListDataSourcesResult {
  return {
    dataSources: searchIndexerDataSourceConnectionArrayDeserializer(item["value"]),
  };
}

export function searchIndexerDataSourceConnectionArraySerializer(
  result: Array<SearchIndexerDataSourceConnection>,
): any[] {
  return result.map((item) => {
    return searchIndexerDataSourceConnectionSerializer(item);
  });
}

export function searchIndexerDataSourceConnectionArrayDeserializer(
  result: Array<SearchIndexerDataSourceConnection>,
): any[] {
  return result.map((item) => {
    return searchIndexerDataSourceConnectionDeserializer(item);
  });
}

/** Request body for resync indexer operation. */
export interface IndexerResyncBody {
  /** Re-sync options that have been pre-defined from data source. */
  options?: IndexerResyncOption[];
}

export function indexerResyncBodySerializer(item: IndexerResyncBody): any {
  return {
    options: !item["options"]
      ? item["options"]
      : item["options"].map((p: any) => {
          return p;
        }),
  };
}

/** Options with various types of permission data to index. */
export enum KnownIndexerResyncOption {
  /** Indexer to re-ingest pre-selected permissions data from data source to index. */
  Permissions = "permissions",
}

/**
 * Options with various types of permission data to index. \
 * {@link KnownIndexerResyncOption} can be used interchangeably with IndexerResyncOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **permissions**: Indexer to re-ingest pre-selected permissions data from data source to index.
 */
export type IndexerResyncOption = string;

/** The type of the keysOrIds. */
export interface DocumentKeysOrIds {
  /** document keys to be reset */
  documentKeys?: string[];
  /** datasource document identifiers to be reset */
  datasourceDocumentIds?: string[];
}

export function documentKeysOrIdsSerializer(item: DocumentKeysOrIds): any {
  return {
    documentKeys: !item["documentKeys"]
      ? item["documentKeys"]
      : item["documentKeys"].map((p: any) => {
          return p;
        }),
    datasourceDocumentIds: !item["datasourceDocumentIds"]
      ? item["datasourceDocumentIds"]
      : item["datasourceDocumentIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents an indexer. */
export interface SearchIndexer {
  /** The name of the indexer. */
  name: string;
  /** The description of the indexer. */
  description?: string;
  /** The name of the datasource from which this indexer reads data. */
  dataSourceName: string;
  /** The name of the skillset executing with this indexer. */
  skillsetName?: string;
  /** The name of the index to which this indexer writes data. */
  targetIndexName: string;
  /** The schedule for this indexer. */
  schedule?: IndexingSchedule;
  /** Parameters for indexer execution. */
  parameters?: IndexingParameters;
  /** Defines mappings between fields in the data source and corresponding target fields in the index. */
  fieldMappings?: FieldMapping[];
  /** Output field mappings are applied after enrichment and immediately before indexing. */
  outputFieldMappings?: FieldMapping[];
  /** A value indicating whether the indexer is disabled. Default is false. */
  isDisabled?: boolean;
  /** The ETag of the indexer. */
  eTag?: string;
  /** A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your indexer definition (as well as indexer execution status) when you want full assurance that no one, not even Microsoft, can decrypt them. Once you have encrypted your indexer definition, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your indexer definition (and indexer execution status) will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019. */
  encryptionKey?: SearchResourceEncryptionKey;
  /** Adds caching to an enrichment pipeline to allow for incremental modification steps without having to rebuild the index every time. */
  cache?: SearchIndexerCache;
}

export function searchIndexerSerializer(item: SearchIndexer): any {
  return {
    name: item["name"],
    description: item["description"],
    dataSourceName: item["dataSourceName"],
    skillsetName: item["skillsetName"],
    targetIndexName: item["targetIndexName"],
    schedule: !item["schedule"] ? item["schedule"] : indexingScheduleSerializer(item["schedule"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : indexingParametersSerializer(item["parameters"]),
    fieldMappings: !item["fieldMappings"]
      ? item["fieldMappings"]
      : fieldMappingArraySerializer(item["fieldMappings"]),
    outputFieldMappings: !item["outputFieldMappings"]
      ? item["outputFieldMappings"]
      : fieldMappingArraySerializer(item["outputFieldMappings"]),
    disabled: item["isDisabled"],
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
    cache: !item["cache"] ? item["cache"] : searchIndexerCacheSerializer(item["cache"]),
  };
}

export function searchIndexerDeserializer(item: any): SearchIndexer {
  return {
    name: item["name"],
    description: item["description"],
    dataSourceName: item["dataSourceName"],
    skillsetName: item["skillsetName"],
    targetIndexName: item["targetIndexName"],
    schedule: !item["schedule"] ? item["schedule"] : indexingScheduleDeserializer(item["schedule"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : indexingParametersDeserializer(item["parameters"]),
    fieldMappings: !item["fieldMappings"]
      ? item["fieldMappings"]
      : fieldMappingArrayDeserializer(item["fieldMappings"]),
    outputFieldMappings: !item["outputFieldMappings"]
      ? item["outputFieldMappings"]
      : fieldMappingArrayDeserializer(item["outputFieldMappings"]),
    isDisabled: item["disabled"],
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
    cache: !item["cache"] ? item["cache"] : searchIndexerCacheDeserializer(item["cache"]),
  };
}

/** Represents parameters for indexer execution. */
export interface IndexingParameters {
  /** The number of items that are read from the data source and indexed as a single batch in order to improve performance. The default depends on the data source type. */
  batchSize?: number;
  /** The maximum number of items that can fail indexing for indexer execution to still be considered successful. -1 means no limit. Default is 0. */
  maxFailedItems?: number;
  /** The maximum number of items in a single batch that can fail indexing for the batch to still be considered successful. -1 means no limit. Default is 0. */
  maxFailedItemsPerBatch?: number;
  /** A dictionary of indexer-specific configuration properties. Each name is the name of a specific property. Each value must be of a primitive type. */
  configuration?: IndexingParametersConfiguration;
}

export function indexingParametersSerializer(item: IndexingParameters): any {
  return {
    batchSize: item["batchSize"],
    maxFailedItems: item["maxFailedItems"],
    maxFailedItemsPerBatch: item["maxFailedItemsPerBatch"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : indexingParametersConfigurationSerializer(item["configuration"]),
  };
}

export function indexingParametersDeserializer(item: any): IndexingParameters {
  return {
    batchSize: item["batchSize"],
    maxFailedItems: item["maxFailedItems"],
    maxFailedItemsPerBatch: item["maxFailedItemsPerBatch"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : indexingParametersConfigurationDeserializer(item["configuration"]),
  };
}

/** A dictionary of indexer-specific configuration properties. Each name is the name of a specific property. Each value must be of a primitive type. */
export interface IndexingParametersConfiguration {
  /** Represents the parsing mode for indexing from an Azure blob data source. */
  parsingMode?: BlobIndexerParsingMode;
  /** Comma-delimited list of filename extensions to ignore when processing from Azure blob storage.  For example, you could exclude ".png, .mp4" to skip over those files during indexing. */
  excludedFileNameExtensions?: string;
  /** Comma-delimited list of filename extensions to select when processing from Azure blob storage.  For example, you could focus indexing on specific application files ".docx, .pptx, .msg" to specifically include those file types. */
  indexedFileNameExtensions?: string;
  /** For Azure blobs, set to false if you want to continue indexing when an unsupported content type is encountered, and you don't know all the content types (file extensions) in advance. */
  failOnUnsupportedContentType?: boolean;
  /** For Azure blobs, set to false if you want to continue indexing if a document fails indexing. */
  failOnUnprocessableDocument?: boolean;
  /** For Azure blobs, set this property to true to still index storage metadata for blob content that is too large to process. Oversized blobs are treated as errors by default. For limits on blob size, see https://learn.microsoft.com/azure/search/search-limits-quotas-capacity. */
  indexStorageMetadataOnlyForOversizedDocuments?: boolean;
  /** For CSV blobs, specifies a comma-delimited list of column headers, useful for mapping source fields to destination fields in an index. */
  delimitedTextHeaders?: string;
  /** For CSV blobs, specifies the end-of-line single-character delimiter for CSV files where each line starts a new document (for example, "|"). */
  delimitedTextDelimiter?: string;
  /** For CSV blobs, indicates that the first (non-blank) line of each blob contains headers. */
  firstLineContainsHeaders?: boolean;
  /** Specifies the submode that will determine whether a markdown file will be parsed into exactly one search document or multiple search documents. Default is `oneToMany`. */
  markdownParsingSubmode?: MarkdownParsingSubmode;
  /** Specifies the max header depth that will be considered while grouping markdown content. Default is `h6`. */
  markdownHeaderDepth?: MarkdownHeaderDepth;
  /** For JSON arrays, given a structured or semi-structured document, you can specify a path to the array using this property. */
  documentRoot?: string;
  /** Specifies the data to extract from Azure blob storage and tells the indexer which data to extract from image content when "imageAction" is set to a value other than "none".  This applies to embedded image content in a .PDF or other application, or image files such as .jpg and .png, in Azure blobs. */
  dataToExtract?: BlobIndexerDataToExtract;
  /** Determines how to process embedded images and image files in Azure blob storage.  Setting the "imageAction" configuration to any value other than "none" requires that a skillset also be attached to that indexer. */
  imageAction?: BlobIndexerImageAction;
  /** If true, will create a path //document//file_data that is an object representing the original file data downloaded from your blob data source. This allows you to pass the original file data to a custom skill for processing within the enrichment pipeline, or to the Document Extraction skill. */
  allowSkillsetToReadFileData?: boolean;
  /** Determines algorithm for text extraction from PDF files in Azure blob storage. */
  pdfTextRotationAlgorithm?: BlobIndexerPDFTextRotationAlgorithm;
  /** Specifies the environment in which the indexer should execute. */
  executionEnvironment?: IndexerExecutionEnvironment;
  /** Increases the timeout beyond the 5-minute default for Azure SQL database data sources, specified in the format "hh:mm:ss". */
  queryTimeout?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function indexingParametersConfigurationSerializer(
  item: IndexingParametersConfiguration,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    parsingMode: item["parsingMode"],
    excludedFileNameExtensions: item["excludedFileNameExtensions"],
    indexedFileNameExtensions: item["indexedFileNameExtensions"],
    failOnUnsupportedContentType: item["failOnUnsupportedContentType"],
    failOnUnprocessableDocument: item["failOnUnprocessableDocument"],
    indexStorageMetadataOnlyForOversizedDocuments:
      item["indexStorageMetadataOnlyForOversizedDocuments"],
    delimitedTextHeaders: item["delimitedTextHeaders"],
    delimitedTextDelimiter: item["delimitedTextDelimiter"],
    firstLineContainsHeaders: item["firstLineContainsHeaders"],
    markdownParsingSubmode: item["markdownParsingSubmode"],
    markdownHeaderDepth: item["markdownHeaderDepth"],
    documentRoot: item["documentRoot"],
    dataToExtract: item["dataToExtract"],
    imageAction: item["imageAction"],
    allowSkillsetToReadFileData: item["allowSkillsetToReadFileData"],
    pdfTextRotationAlgorithm: item["pdfTextRotationAlgorithm"],
    executionEnvironment: item["executionEnvironment"],
    queryTimeout: item["queryTimeout"],
  };
}

export function indexingParametersConfigurationDeserializer(
  item: any,
): IndexingParametersConfiguration {
  return {
    additionalProperties: serializeRecord(item, [
      "parsingMode",
      "excludedFileNameExtensions",
      "indexedFileNameExtensions",
      "failOnUnsupportedContentType",
      "failOnUnprocessableDocument",
      "indexStorageMetadataOnlyForOversizedDocuments",
      "delimitedTextHeaders",
      "delimitedTextDelimiter",
      "firstLineContainsHeaders",
      "markdownParsingSubmode",
      "markdownHeaderDepth",
      "documentRoot",
      "dataToExtract",
      "imageAction",
      "allowSkillsetToReadFileData",
      "pdfTextRotationAlgorithm",
      "executionEnvironment",
      "queryTimeout",
    ]),
    parsingMode: item["parsingMode"],
    excludedFileNameExtensions: item["excludedFileNameExtensions"],
    indexedFileNameExtensions: item["indexedFileNameExtensions"],
    failOnUnsupportedContentType: item["failOnUnsupportedContentType"],
    failOnUnprocessableDocument: item["failOnUnprocessableDocument"],
    indexStorageMetadataOnlyForOversizedDocuments:
      item["indexStorageMetadataOnlyForOversizedDocuments"],
    delimitedTextHeaders: item["delimitedTextHeaders"],
    delimitedTextDelimiter: item["delimitedTextDelimiter"],
    firstLineContainsHeaders: item["firstLineContainsHeaders"],
    markdownParsingSubmode: item["markdownParsingSubmode"],
    markdownHeaderDepth: item["markdownHeaderDepth"],
    documentRoot: item["documentRoot"],
    dataToExtract: item["dataToExtract"],
    imageAction: item["imageAction"],
    allowSkillsetToReadFileData: item["allowSkillsetToReadFileData"],
    pdfTextRotationAlgorithm: item["pdfTextRotationAlgorithm"],
    executionEnvironment: item["executionEnvironment"],
    queryTimeout: item["queryTimeout"],
  };
}

/** Represents the parsing mode for indexing from an Azure blob data source. */
export enum KnownBlobIndexerParsingMode {
  /** Set to default for normal file processing. */
  Default = "default",
  /** Set to text to improve indexing performance on plain text files in blob storage. */
  Text = "text",
  /** Set to delimitedText when blobs are plain CSV files. */
  DelimitedText = "delimitedText",
  /** Set to json to extract structured content from JSON files. */
  Json = "json",
  /** Set to jsonArray to extract individual elements of a JSON array as separate documents. */
  JsonArray = "jsonArray",
  /** Set to jsonLines to extract individual JSON entities, separated by a new line, as separate documents. */
  JsonLines = "jsonLines",
  /** Set to markdown to extract content from markdown files. */
  Markdown = "markdown",
}

/**
 * Represents the parsing mode for indexing from an Azure blob data source. \
 * {@link KnownBlobIndexerParsingMode} can be used interchangeably with BlobIndexerParsingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **default**: Set to default for normal file processing. \
 * **text**: Set to text to improve indexing performance on plain text files in blob storage. \
 * **delimitedText**: Set to delimitedText when blobs are plain CSV files. \
 * **json**: Set to json to extract structured content from JSON files. \
 * **jsonArray**: Set to jsonArray to extract individual elements of a JSON array as separate documents. \
 * **jsonLines**: Set to jsonLines to extract individual JSON entities, separated by a new line, as separate documents. \
 * **markdown**: Set to markdown to extract content from markdown files.
 */
export type BlobIndexerParsingMode = string;

/** Specifies the submode that will determine whether a markdown file will be parsed into exactly one search document or multiple search documents. Default is `oneToMany`. */
export enum KnownMarkdownParsingSubmode {
  /** Indicates that each section of the markdown file (up to a specified depth) will be parsed into individual search documents. This can result in a single markdown file producing multiple search documents. This is the default sub-mode. */
  OneToMany = "oneToMany",
  /** Indicates that each markdown file will be parsed into a single search document. */
  OneToOne = "oneToOne",
}

/**
 * Specifies the submode that will determine whether a markdown file will be parsed into exactly one search document or multiple search documents. Default is `oneToMany`. \
 * {@link KnownMarkdownParsingSubmode} can be used interchangeably with MarkdownParsingSubmode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **oneToMany**: Indicates that each section of the markdown file (up to a specified depth) will be parsed into individual search documents. This can result in a single markdown file producing multiple search documents. This is the default sub-mode. \
 * **oneToOne**: Indicates that each markdown file will be parsed into a single search document.
 */
export type MarkdownParsingSubmode = string;

/** Specifies the max header depth that will be considered while grouping markdown content. Default is `h6`. */
export enum KnownMarkdownHeaderDepth {
  /** Indicates that headers up to a level of h1 will be considered while grouping markdown content. */
  H1 = "h1",
  /** Indicates that headers up to a level of h2 will be considered while grouping markdown content. */
  H2 = "h2",
  /** Indicates that headers up to a level of h3 will be considered while grouping markdown content. */
  H3 = "h3",
  /** Indicates that headers up to a level of h4 will be considered while grouping markdown content. */
  H4 = "h4",
  /** Indicates that headers up to a level of h5 will be considered while grouping markdown content. */
  H5 = "h5",
  /** Indicates that headers up to a level of h6 will be considered while grouping markdown content. This is the default. */
  H6 = "h6",
}

/**
 * Specifies the max header depth that will be considered while grouping markdown content. Default is `h6`. \
 * {@link KnownMarkdownHeaderDepth} can be used interchangeably with MarkdownHeaderDepth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **h1**: Indicates that headers up to a level of h1 will be considered while grouping markdown content. \
 * **h2**: Indicates that headers up to a level of h2 will be considered while grouping markdown content. \
 * **h3**: Indicates that headers up to a level of h3 will be considered while grouping markdown content. \
 * **h4**: Indicates that headers up to a level of h4 will be considered while grouping markdown content. \
 * **h5**: Indicates that headers up to a level of h5 will be considered while grouping markdown content. \
 * **h6**: Indicates that headers up to a level of h6 will be considered while grouping markdown content. This is the default.
 */
export type MarkdownHeaderDepth = string;

/** Specifies the data to extract from Azure blob storage and tells the indexer which data to extract from image content when "imageAction" is set to a value other than "none".  This applies to embedded image content in a .PDF or other application, or image files such as .jpg and .png, in Azure blobs. */
export enum KnownBlobIndexerDataToExtract {
  /** Indexes just the standard blob properties and user-specified metadata. */
  StorageMetadata = "storageMetadata",
  /** Extracts metadata provided by the Azure blob storage subsystem and the content-type specific metadata (for example, metadata unique to just .png files are indexed). */
  AllMetadata = "allMetadata",
  /** Extracts all metadata and textual content from each blob. */
  ContentAndMetadata = "contentAndMetadata",
}

/**
 * Specifies the data to extract from Azure blob storage and tells the indexer which data to extract from image content when "imageAction" is set to a value other than "none".  This applies to embedded image content in a .PDF or other application, or image files such as .jpg and .png, in Azure blobs. \
 * {@link KnownBlobIndexerDataToExtract} can be used interchangeably with BlobIndexerDataToExtract,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **storageMetadata**: Indexes just the standard blob properties and user-specified metadata. \
 * **allMetadata**: Extracts metadata provided by the Azure blob storage subsystem and the content-type specific metadata (for example, metadata unique to just .png files are indexed). \
 * **contentAndMetadata**: Extracts all metadata and textual content from each blob.
 */
export type BlobIndexerDataToExtract = string;

/** Determines how to process embedded images and image files in Azure blob storage.  Setting the "imageAction" configuration to any value other than "none" requires that a skillset also be attached to that indexer. */
export enum KnownBlobIndexerImageAction {
  /** Ignores embedded images or image files in the data set.  This is the default. */
  None = "none",
  /** Extracts text from images (for example, the word "STOP" from a traffic stop sign), and embeds it into the content field.  This action requires that "dataToExtract" is set to "contentAndMetadata".  A normalized image refers to additional processing resulting in uniform image output, sized and rotated to promote consistent rendering when you include images in visual search results. This information is generated for each image when you use this option. */
  GenerateNormalizedImages = "generateNormalizedImages",
  /** Extracts text from images (for example, the word "STOP" from a traffic stop sign), and embeds it into the content field, but treats PDF files differently in that each page will be rendered as an image and normalized accordingly, instead of extracting embedded images.  Non-PDF file types will be treated the same as if "generateNormalizedImages" was set. */
  GenerateNormalizedImagePerPage = "generateNormalizedImagePerPage",
}

/**
 * Determines how to process embedded images and image files in Azure blob storage.  Setting the "imageAction" configuration to any value other than "none" requires that a skillset also be attached to that indexer. \
 * {@link KnownBlobIndexerImageAction} can be used interchangeably with BlobIndexerImageAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **none**: Ignores embedded images or image files in the data set.  This is the default. \
 * **generateNormalizedImages**: Extracts text from images (for example, the word "STOP" from a traffic stop sign), and embeds it into the content field.  This action requires that "dataToExtract" is set to "contentAndMetadata".  A normalized image refers to additional processing resulting in uniform image output, sized and rotated to promote consistent rendering when you include images in visual search results. This information is generated for each image when you use this option. \
 * **generateNormalizedImagePerPage**: Extracts text from images (for example, the word "STOP" from a traffic stop sign), and embeds it into the content field, but treats PDF files differently in that each page will be rendered as an image and normalized accordingly, instead of extracting embedded images.  Non-PDF file types will be treated the same as if "generateNormalizedImages" was set.
 */
export type BlobIndexerImageAction = string;

/** Determines algorithm for text extraction from PDF files in Azure blob storage. */
export enum KnownBlobIndexerPDFTextRotationAlgorithm {
  /** Leverages normal text extraction.  This is the default. */
  None = "none",
  /** May produce better and more readable text extraction from PDF files that have rotated text within them.  Note that there may be a small performance speed impact when this parameter is used.  This parameter only applies to PDF files, and only to PDFs with embedded text.  If the rotated text appears within an embedded image in the PDF, this parameter does not apply. */
  DetectAngles = "detectAngles",
}

/**
 * Determines algorithm for text extraction from PDF files in Azure blob storage. \
 * {@link KnownBlobIndexerPDFTextRotationAlgorithm} can be used interchangeably with BlobIndexerPDFTextRotationAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **none**: Leverages normal text extraction.  This is the default. \
 * **detectAngles**: May produce better and more readable text extraction from PDF files that have rotated text within them.  Note that there may be a small performance speed impact when this parameter is used.  This parameter only applies to PDF files, and only to PDFs with embedded text.  If the rotated text appears within an embedded image in the PDF, this parameter does not apply.
 */
export type BlobIndexerPDFTextRotationAlgorithm = string;

/** Specifies the environment in which the indexer should execute. */
export enum KnownIndexerExecutionEnvironment {
  /** Indicates that the search service can determine where the indexer should execute. This is the default environment when nothing is specified and is the recommended value. */
  Standard = "standard",
  /** Indicates that the indexer should run with the environment provisioned specifically for the search service. This should only be specified as the execution environment if the indexer needs to access resources securely over shared private link resources. */
  Private = "private",
}

/**
 * Specifies the environment in which the indexer should execute. \
 * {@link KnownIndexerExecutionEnvironment} can be used interchangeably with IndexerExecutionEnvironment,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **standard**: Indicates that the search service can determine where the indexer should execute. This is the default environment when nothing is specified and is the recommended value. \
 * **private**: Indicates that the indexer should run with the environment provisioned specifically for the search service. This should only be specified as the execution environment if the indexer needs to access resources securely over shared private link resources.
 */
export type IndexerExecutionEnvironment = string;

export function fieldMappingArraySerializer(result: Array<FieldMapping>): any[] {
  return result.map((item) => {
    return fieldMappingSerializer(item);
  });
}

export function fieldMappingArrayDeserializer(result: Array<FieldMapping>): any[] {
  return result.map((item) => {
    return fieldMappingDeserializer(item);
  });
}

/** Defines a mapping between a field in a data source and a target field in an index. */
export interface FieldMapping {
  /** The name of the field in the data source. */
  sourceFieldName: string;
  /** The name of the target field in the index. Same as the source field name by default. */
  targetFieldName?: string;
  /** A function to apply to each source field value before indexing. */
  mappingFunction?: FieldMappingFunction;
}

export function fieldMappingSerializer(item: FieldMapping): any {
  return {
    sourceFieldName: item["sourceFieldName"],
    targetFieldName: item["targetFieldName"],
    mappingFunction: !item["mappingFunction"]
      ? item["mappingFunction"]
      : fieldMappingFunctionSerializer(item["mappingFunction"]),
  };
}

export function fieldMappingDeserializer(item: any): FieldMapping {
  return {
    sourceFieldName: item["sourceFieldName"],
    targetFieldName: item["targetFieldName"],
    mappingFunction: !item["mappingFunction"]
      ? item["mappingFunction"]
      : fieldMappingFunctionDeserializer(item["mappingFunction"]),
  };
}

/** Represents a function that transforms a value from a data source before indexing. */
export interface FieldMappingFunction {
  /** The name of the field mapping function. */
  name: string;
  /** A dictionary of parameter name/value pairs to pass to the function. Each value must be of a primitive type. */
  parameters?: Record<string, any>;
}

export function fieldMappingFunctionSerializer(item: FieldMappingFunction): any {
  return { name: item["name"], parameters: item["parameters"] };
}

export function fieldMappingFunctionDeserializer(item: any): FieldMappingFunction {
  return {
    name: item["name"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
  };
}

/** The type of the cache. */
export interface SearchIndexerCache {
  /** A guid for the SearchIndexerCache. */
  id?: string;
  /** The connection string to the storage account where the cache data will be persisted. */
  storageConnectionString?: string;
  /** Specifies whether incremental reprocessing is enabled. */
  enableReprocessing?: boolean;
  /** The user-assigned managed identity used for connections to the enrichment cache.  If the connection string indicates an identity (ResourceId) and it's not specified, the system-assigned managed identity is used. On updates to the indexer, if the identity is unspecified, the value remains unchanged. If set to "none", the value of this property is cleared. */
  identity?: SearchIndexerDataIdentityUnion;
}

export function searchIndexerCacheSerializer(item: SearchIndexerCache): any {
  return {
    id: item["id"],
    storageConnectionString: item["storageConnectionString"],
    enableReprocessing: item["enableReprocessing"],
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionSerializer(item["identity"]),
  };
}

export function searchIndexerCacheDeserializer(item: any): SearchIndexerCache {
  return {
    id: item["id"],
    storageConnectionString: item["storageConnectionString"],
    enableReprocessing: item["enableReprocessing"],
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
  };
}

/** Response from a List Indexers request. If successful, it includes the full definitions of all indexers. */
export interface ListIndexersResult {
  /** The indexers in the Search service. */
  readonly indexers: SearchIndexer[];
}

export function listIndexersResultDeserializer(item: any): ListIndexersResult {
  return {
    indexers: searchIndexerArrayDeserializer(item["value"]),
  };
}

export function searchIndexerArraySerializer(result: Array<SearchIndexer>): any[] {
  return result.map((item) => {
    return searchIndexerSerializer(item);
  });
}

export function searchIndexerArrayDeserializer(result: Array<SearchIndexer>): any[] {
  return result.map((item) => {
    return searchIndexerDeserializer(item);
  });
}

/** Represents the current status and execution history of an indexer. */
export interface SearchIndexerStatus {
  /** The name of the indexer. */
  readonly name: string;
  /** Overall indexer status. */
  readonly status: IndexerStatus;
  /** Snapshot of the indexer's cumulative runtime consumption for the service over the current UTC period. */
  readonly runtime: IndexerRuntime;
  /** The result of the most recent or an in-progress indexer execution. */
  readonly lastResult?: IndexerExecutionResult;
  /** History of the recent indexer executions, sorted in reverse chronological order. */
  readonly executionHistory: IndexerExecutionResult[];
  /** The execution limits for the indexer. */
  readonly limits: SearchIndexerLimits;
  /** All of the state that defines and dictates the indexer's current execution. */
  readonly currentState?: IndexerCurrentState;
}

export function searchIndexerStatusDeserializer(item: any): SearchIndexerStatus {
  return {
    name: item["name"],
    status: item["status"],
    runtime: indexerRuntimeDeserializer(item["runtime"]),
    lastResult: !item["lastResult"]
      ? item["lastResult"]
      : indexerExecutionResultDeserializer(item["lastResult"]),
    executionHistory: indexerExecutionResultArrayDeserializer(item["executionHistory"]),
    limits: searchIndexerLimitsDeserializer(item["limits"]),
    currentState: !item["currentState"]
      ? item["currentState"]
      : indexerCurrentStateDeserializer(item["currentState"]),
  };
}

/** Represents the overall indexer status. */
export type IndexerStatus = "unknown" | "error" | "running";

/** Represents the indexer's cumulative runtime consumption in the service. */
export interface IndexerRuntime {
  /** Cumulative runtime of the indexer from the beginningTime to endingTime, in seconds. */
  usedSeconds: number;
  /** Cumulative runtime remaining for all indexers in the service from the beginningTime to endingTime, in seconds. */
  remainingSeconds?: number;
  /** Beginning UTC time of the 24-hour period considered for indexer runtime usage (inclusive). */
  beginningTime: Date;
  /** End UTC time of the 24-hour period considered for indexer runtime usage (inclusive). */
  endingTime: Date;
}

export function indexerRuntimeDeserializer(item: any): IndexerRuntime {
  return {
    usedSeconds: item["usedSeconds"],
    remainingSeconds: item["remainingSeconds"],
    beginningTime: new Date(item["beginningTime"]),
    endingTime: new Date(item["endingTime"]),
  };
}

/** Represents the result of an individual indexer execution. */
export interface IndexerExecutionResult {
  /** The outcome of this indexer execution. */
  readonly status: IndexerExecutionStatus;
  /** The outcome of this indexer execution. */
  readonly statusDetail?: IndexerExecutionStatusDetail;
  /** The mode the indexer is running in. */
  readonly mode?: IndexingMode;
  /** The error message indicating the top-level error, if any. */
  readonly errorMessage?: string;
  /** The start time of this indexer execution. */
  readonly startTime?: Date;
  /** The end time of this indexer execution, if the execution has already completed. */
  readonly endTime?: Date;
  /** The item-level indexing errors. */
  readonly errors: SearchIndexerError[];
  /** The item-level indexing warnings. */
  readonly warnings: SearchIndexerWarning[];
  /** The number of items that were processed during this indexer execution. This includes both successfully processed items and items where indexing was attempted but failed. */
  readonly itemCount: number;
  /** The number of items that failed to be indexed during this indexer execution. */
  readonly failedItemCount: number;
  /** Change tracking state with which an indexer execution started. */
  readonly initialTrackingState?: string;
  /** Change tracking state with which an indexer execution finished. */
  readonly finalTrackingState?: string;
}

export function indexerExecutionResultDeserializer(item: any): IndexerExecutionResult {
  return {
    status: item["status"],
    statusDetail: item["statusDetail"],
    mode: item["mode"],
    errorMessage: item["errorMessage"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errors: searchIndexerErrorArrayDeserializer(item["errors"]),
    warnings: searchIndexerWarningArrayDeserializer(item["warnings"]),
    itemCount: item["itemsProcessed"],
    failedItemCount: item["itemsFailed"],
    initialTrackingState: item["initialTrackingState"],
    finalTrackingState: item["finalTrackingState"],
  };
}

/** Represents the status of an individual indexer execution. */
export type IndexerExecutionStatus = "transientFailure" | "success" | "inProgress" | "reset";

/** Details the status of an individual indexer execution. */
export enum KnownIndexerExecutionStatusDetail {
  /** Indicates that the reset that occurred was for a call to ResetDocs. */
  ResetDocs = "resetDocs",
  /** Indicates to selectively resync based on option(s) from data source. */
  Resync = "resync",
}

/**
 * Details the status of an individual indexer execution. \
 * {@link KnownIndexerExecutionStatusDetail} can be used interchangeably with IndexerExecutionStatusDetail,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **resetDocs**: Indicates that the reset that occurred was for a call to ResetDocs. \
 * **resync**: Indicates to selectively resync based on option(s) from data source.
 */
export type IndexerExecutionStatusDetail = string;

/** Represents the mode the indexer is executing in. */
export enum KnownIndexingMode {
  /** The indexer is indexing all documents in the datasource. */
  IndexingAllDocs = "indexingAllDocs",
  /** The indexer is indexing selective, reset documents in the datasource. The documents being indexed are defined on indexer status. */
  IndexingResetDocs = "indexingResetDocs",
  /** The indexer is resyncing and indexing selective option(s) from the datasource. */
  IndexingResync = "indexingResync",
}

/**
 * Represents the mode the indexer is executing in. \
 * {@link KnownIndexingMode} can be used interchangeably with IndexingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **indexingAllDocs**: The indexer is indexing all documents in the datasource. \
 * **indexingResetDocs**: The indexer is indexing selective, reset documents in the datasource. The documents being indexed are defined on indexer status. \
 * **indexingResync**: The indexer is resyncing and indexing selective option(s) from the datasource.
 */
export type IndexingMode = string;

export function searchIndexerErrorArrayDeserializer(result: Array<SearchIndexerError>): any[] {
  return result.map((item) => {
    return searchIndexerErrorDeserializer(item);
  });
}

/** Represents an item- or document-level indexing error. */
export interface SearchIndexerError {
  /** The key of the item for which indexing failed. */
  readonly key?: string;
  /** The message describing the error that occurred while processing the item. */
  readonly errorMessage: string;
  /** The status code indicating why the indexing operation failed. Possible values include: 400 for a malformed input document, 404 for document not found, 409 for a version conflict, 422 when the index is temporarily unavailable, or 503 for when the service is too busy. */
  readonly statusCode: number;
  /** The name of the source at which the error originated. For example, this could refer to a particular skill in the attached skillset. This may not be always available. */
  readonly name?: string;
  /** Additional, verbose details about the error to assist in debugging the indexer. This may not be always available. */
  readonly details?: string;
  /** A link to a troubleshooting guide for these classes of errors. This may not be always available. */
  readonly documentationLink?: string;
}

export function searchIndexerErrorDeserializer(item: any): SearchIndexerError {
  return {
    key: item["key"],
    errorMessage: item["errorMessage"],
    statusCode: item["statusCode"],
    name: item["name"],
    details: item["details"],
    documentationLink: item["documentationLink"],
  };
}

export function searchIndexerWarningArrayDeserializer(result: Array<SearchIndexerWarning>): any[] {
  return result.map((item) => {
    return searchIndexerWarningDeserializer(item);
  });
}

/** Represents an item-level warning. */
export interface SearchIndexerWarning {
  /** The key of the item which generated a warning. */
  readonly key?: string;
  /** The message describing the warning that occurred while processing the item. */
  readonly message: string;
  /** The name of the source at which the warning originated. For example, this could refer to a particular skill in the attached skillset. This may not be always available. */
  readonly name?: string;
  /** Additional, verbose details about the warning to assist in debugging the indexer. This may not be always available. */
  readonly details?: string;
  /** A link to a troubleshooting guide for these classes of warnings. This may not be always available. */
  readonly documentationLink?: string;
}

export function searchIndexerWarningDeserializer(item: any): SearchIndexerWarning {
  return {
    key: item["key"],
    message: item["message"],
    name: item["name"],
    details: item["details"],
    documentationLink: item["documentationLink"],
  };
}

export function indexerExecutionResultArrayDeserializer(
  result: Array<IndexerExecutionResult>,
): any[] {
  return result.map((item) => {
    return indexerExecutionResultDeserializer(item);
  });
}

/** Represents the limits that can be applied to an indexer. */
export interface SearchIndexerLimits {
  /** The maximum duration that the indexer is permitted to run for one execution. */
  readonly maxRunTime?: string;
  /** The maximum size of a document, in bytes, which will be considered valid for indexing. */
  readonly maxDocumentExtractionSize?: number;
  /** The maximum number of characters that will be extracted from a document picked up for indexing. */
  readonly maxDocumentContentCharactersToExtract?: number;
}

export function searchIndexerLimitsDeserializer(item: any): SearchIndexerLimits {
  return {
    maxRunTime: item["maxRunTime"],
    maxDocumentExtractionSize: item["maxDocumentExtractionSize"],
    maxDocumentContentCharactersToExtract: item["maxDocumentContentCharactersToExtract"],
  };
}

/** Represents all of the state that defines and dictates the indexer's current execution. */
export interface IndexerCurrentState {
  /** The mode the indexer is running in. */
  readonly mode?: IndexingMode;
  /** Change tracking state used when indexing starts on all documents in the datasource. */
  readonly allDocsInitialTrackingState?: string;
  /** Change tracking state value when indexing finishes on all documents in the datasource. */
  readonly allDocsFinalTrackingState?: string;
  /** Change tracking state used when indexing starts on select, reset documents in the datasource. */
  readonly resetDocsInitialTrackingState?: string;
  /** Change tracking state value when indexing finishes on select, reset documents in the datasource. */
  readonly resetDocsFinalTrackingState?: string;
  /** Change tracking state used when indexing starts on selective options from the datasource. */
  readonly resyncInitialTrackingState?: string;
  /** Change tracking state value when indexing finishes on selective options from the datasource. */
  readonly resyncFinalTrackingState?: string;
  /** The list of document keys that have been reset. The document key is the document's unique identifier for the data in the search index. The indexer will prioritize selectively re-ingesting these keys. */
  readonly resetDocumentKeys?: string[];
  /** The list of datasource document ids that have been reset. The datasource document id is the unique identifier for the data in the datasource. The indexer will prioritize selectively re-ingesting these ids. */
  readonly resetDatasourceDocumentIds?: string[];
}

export function indexerCurrentStateDeserializer(item: any): IndexerCurrentState {
  return {
    mode: item["mode"],
    allDocsInitialTrackingState: item["allDocsInitialTrackingState"],
    allDocsFinalTrackingState: item["allDocsFinalTrackingState"],
    resetDocsInitialTrackingState: item["resetDocsInitialTrackingState"],
    resetDocsFinalTrackingState: item["resetDocsFinalTrackingState"],
    resyncInitialTrackingState: item["resyncInitialTrackingState"],
    resyncFinalTrackingState: item["resyncFinalTrackingState"],
    resetDocumentKeys: !item["resetDocumentKeys"]
      ? item["resetDocumentKeys"]
      : item["resetDocumentKeys"].map((p: any) => {
          return p;
        }),
    resetDatasourceDocumentIds: !item["resetDatasourceDocumentIds"]
      ? item["resetDatasourceDocumentIds"]
      : item["resetDatasourceDocumentIds"].map((p: any) => {
          return p;
        }),
  };
}

/** A list of skills. */
export interface SearchIndexerSkillset {
  /** The name of the skillset. */
  name: string;
  /** The description of the skillset. */
  description?: string;
  /** A list of skills in the skillset. */
  skills: SearchIndexerSkillUnion[];
  /** Details about the Azure AI service to be used when running skills. */
  cognitiveServicesAccount?: CognitiveServicesAccountUnion;
  /** Definition of additional projections to Azure blob, table, or files, of enriched data. */
  knowledgeStore?: SearchIndexerKnowledgeStore;
  /** Definition of additional projections to secondary search index(es). */
  indexProjection?: SearchIndexerIndexProjection;
  /** The ETag of the skillset. */
  eTag?: string;
  /** A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your skillset definition when you want full assurance that no one, not even Microsoft, can decrypt your skillset definition. Once you have encrypted your skillset definition, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your skillset definition will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019. */
  encryptionKey?: SearchResourceEncryptionKey;
}

export function searchIndexerSkillsetSerializer(item: SearchIndexerSkillset): any {
  return {
    name: item["name"],
    description: item["description"],
    skills: searchIndexerSkillUnionArraySerializer(item["skills"]),
    cognitiveServices: !item["cognitiveServicesAccount"]
      ? item["cognitiveServicesAccount"]
      : cognitiveServicesAccountUnionSerializer(item["cognitiveServicesAccount"]),
    knowledgeStore: !item["knowledgeStore"]
      ? item["knowledgeStore"]
      : searchIndexerKnowledgeStoreSerializer(item["knowledgeStore"]),
    indexProjections: !item["indexProjection"]
      ? item["indexProjection"]
      : searchIndexerIndexProjectionSerializer(item["indexProjection"]),
    "@odata.etag": item["eTag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
  };
}

export function searchIndexerSkillsetDeserializer(item: any): SearchIndexerSkillset {
  return {
    name: item["name"],
    description: item["description"],
    skills: searchIndexerSkillUnionArrayDeserializer(item["skills"]),
    cognitiveServicesAccount: !item["cognitiveServices"]
      ? item["cognitiveServices"]
      : cognitiveServicesAccountUnionDeserializer(item["cognitiveServices"]),
    knowledgeStore: !item["knowledgeStore"]
      ? item["knowledgeStore"]
      : searchIndexerKnowledgeStoreDeserializer(item["knowledgeStore"]),
    indexProjection: !item["indexProjections"]
      ? item["indexProjections"]
      : searchIndexerIndexProjectionDeserializer(item["indexProjections"]),
    eTag: item["@odata.etag"],
    encryptionKey: !item["encryptionKey"]
      ? item["encryptionKey"]
      : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
  };
}

export function searchIndexerSkillUnionArraySerializer(
  result: Array<SearchIndexerSkillUnion>,
): any[] {
  return result.map((item) => {
    return searchIndexerSkillUnionSerializer(item);
  });
}

export function searchIndexerSkillUnionArrayDeserializer(
  result: Array<SearchIndexerSkillUnion>,
): any[] {
  return result.map((item) => {
    return searchIndexerSkillUnionDeserializer(item);
  });
}

/** Base type for skills. */
export interface SearchIndexerSkill {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Skills.Util.ConditionalSkill, #Microsoft.Skills.Text.KeyPhraseExtractionSkill, #Microsoft.Skills.Vision.OcrSkill, #Microsoft.Skills.Vision.ImageAnalysisSkill, #Microsoft.Skills.Text.LanguageDetectionSkill, #Microsoft.Skills.Util.ShaperSkill, #Microsoft.Skills.Text.MergeSkill, #Microsoft.Skills.Text.V3.SentimentSkill, #Microsoft.Skills.Text.V3.EntityLinkingSkill, #Microsoft.Skills.Text.V3.EntityRecognitionSkill, #Microsoft.Skills.Text.PIIDetectionSkill, #Microsoft.Skills.Text.SplitSkill, #Microsoft.Skills.Text.CustomEntityLookupSkill, #Microsoft.Skills.Text.TranslationSkill, #Microsoft.Skills.Util.DocumentExtractionSkill, #Microsoft.Skills.Util.DocumentIntelligenceLayoutSkill, #Microsoft.Skills.Custom.WebApiSkill, #Microsoft.Skills.Custom.AmlSkill, #Microsoft.Skills.Text.AzureOpenAIEmbeddingSkill, #Microsoft.Skills.Vision.VectorizeSkill, #Microsoft.Skills.Util.ContentUnderstandingSkill, #Microsoft.Skills.Custom.ChatCompletionSkill */
  odatatype: string;
  /** The name of the skill which uniquely identifies it within the skillset. A skill with no name defined will be given a default name of its 1-based index in the skills array, prefixed with the character '#'. */
  name?: string;
  /** The description of the skill which describes the inputs, outputs, and usage of the skill. */
  description?: string;
  /** Represents the level at which operations take place, such as the document root or document content (for example, /document or /document/content). The default is /document. */
  context?: string;
  /** Inputs of the skills could be a column in the source data set, or the output of an upstream skill. */
  inputs: InputFieldMappingEntry[];
  /** The output of a skill is either a field in a search index, or a value that can be consumed as an input by another skill. */
  outputs: OutputFieldMappingEntry[];
}

export function searchIndexerSkillSerializer(item: SearchIndexerSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
  };
}

export function searchIndexerSkillDeserializer(item: any): SearchIndexerSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
  };
}

/** Alias for SearchIndexerSkillUnion */
export type SearchIndexerSkillUnion =
  | ConditionalSkill
  | KeyPhraseExtractionSkill
  | OcrSkill
  | ImageAnalysisSkill
  | LanguageDetectionSkill
  | ShaperSkill
  | MergeSkill
  | SentimentSkillV3
  | EntityLinkingSkill
  | EntityRecognitionSkillV3
  | PIIDetectionSkill
  | SplitSkill
  | CustomEntityLookupSkill
  | TextTranslationSkill
  | DocumentExtractionSkill
  | DocumentIntelligenceLayoutSkill
  | WebApiSkill
  | AzureMachineLearningSkill
  | AzureOpenAIEmbeddingSkill
  | VisionVectorizeSkill
  | ContentUnderstandingSkill
  | ChatCompletionSkill
  | SearchIndexerSkill;

export function searchIndexerSkillUnionSerializer(item: SearchIndexerSkillUnion): any {
  switch (item.odatatype) {
    case "#Microsoft.Skills.Util.ConditionalSkill":
      return conditionalSkillSerializer(item as ConditionalSkill);

    case "#Microsoft.Skills.Text.KeyPhraseExtractionSkill":
      return keyPhraseExtractionSkillSerializer(item as KeyPhraseExtractionSkill);

    case "#Microsoft.Skills.Vision.OcrSkill":
      return ocrSkillSerializer(item as OcrSkill);

    case "#Microsoft.Skills.Vision.ImageAnalysisSkill":
      return imageAnalysisSkillSerializer(item as ImageAnalysisSkill);

    case "#Microsoft.Skills.Text.LanguageDetectionSkill":
      return languageDetectionSkillSerializer(item as LanguageDetectionSkill);

    case "#Microsoft.Skills.Util.ShaperSkill":
      return shaperSkillSerializer(item as ShaperSkill);

    case "#Microsoft.Skills.Text.MergeSkill":
      return mergeSkillSerializer(item as MergeSkill);

    case "#Microsoft.Skills.Text.V3.SentimentSkill":
      return sentimentSkillV3Serializer(item as SentimentSkillV3);

    case "#Microsoft.Skills.Text.V3.EntityLinkingSkill":
      return entityLinkingSkillSerializer(item as EntityLinkingSkill);

    case "#Microsoft.Skills.Text.V3.EntityRecognitionSkill":
      return entityRecognitionSkillV3Serializer(item as EntityRecognitionSkillV3);

    case "#Microsoft.Skills.Text.PIIDetectionSkill":
      return piiDetectionSkillSerializer(item as PIIDetectionSkill);

    case "#Microsoft.Skills.Text.SplitSkill":
      return splitSkillSerializer(item as SplitSkill);

    case "#Microsoft.Skills.Text.CustomEntityLookupSkill":
      return customEntityLookupSkillSerializer(item as CustomEntityLookupSkill);

    case "#Microsoft.Skills.Text.TranslationSkill":
      return textTranslationSkillSerializer(item as TextTranslationSkill);

    case "#Microsoft.Skills.Util.DocumentExtractionSkill":
      return documentExtractionSkillSerializer(item as DocumentExtractionSkill);

    case "#Microsoft.Skills.Util.DocumentIntelligenceLayoutSkill":
      return documentIntelligenceLayoutSkillSerializer(item as DocumentIntelligenceLayoutSkill);

    case "#Microsoft.Skills.Custom.WebApiSkill":
      return webApiSkillSerializer(item as WebApiSkill);

    case "#Microsoft.Skills.Custom.AmlSkill":
      return azureMachineLearningSkillSerializer(item as AzureMachineLearningSkill);

    case "#Microsoft.Skills.Text.AzureOpenAIEmbeddingSkill":
      return azureOpenAIEmbeddingSkillSerializer(item as AzureOpenAIEmbeddingSkill);

    case "#Microsoft.Skills.Vision.VectorizeSkill":
      return visionVectorizeSkillSerializer(item as VisionVectorizeSkill);

    case "#Microsoft.Skills.Util.ContentUnderstandingSkill":
      return contentUnderstandingSkillSerializer(item as ContentUnderstandingSkill);

    case "#Microsoft.Skills.Custom.ChatCompletionSkill":
      return chatCompletionSkillSerializer(item as ChatCompletionSkill);

    default:
      return searchIndexerSkillSerializer(item);
  }
}

export function searchIndexerSkillUnionDeserializer(item: any): SearchIndexerSkillUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Skills.Util.ConditionalSkill":
      return conditionalSkillDeserializer(item as ConditionalSkill);

    case "#Microsoft.Skills.Text.KeyPhraseExtractionSkill":
      return keyPhraseExtractionSkillDeserializer(item as KeyPhraseExtractionSkill);

    case "#Microsoft.Skills.Vision.OcrSkill":
      return ocrSkillDeserializer(item as OcrSkill);

    case "#Microsoft.Skills.Vision.ImageAnalysisSkill":
      return imageAnalysisSkillDeserializer(item as ImageAnalysisSkill);

    case "#Microsoft.Skills.Text.LanguageDetectionSkill":
      return languageDetectionSkillDeserializer(item as LanguageDetectionSkill);

    case "#Microsoft.Skills.Util.ShaperSkill":
      return shaperSkillDeserializer(item as ShaperSkill);

    case "#Microsoft.Skills.Text.MergeSkill":
      return mergeSkillDeserializer(item as MergeSkill);

    case "#Microsoft.Skills.Text.V3.SentimentSkill":
      return sentimentSkillV3Deserializer(item as SentimentSkillV3);

    case "#Microsoft.Skills.Text.V3.EntityLinkingSkill":
      return entityLinkingSkillDeserializer(item as EntityLinkingSkill);

    case "#Microsoft.Skills.Text.V3.EntityRecognitionSkill":
      return entityRecognitionSkillV3Deserializer(item as EntityRecognitionSkillV3);

    case "#Microsoft.Skills.Text.PIIDetectionSkill":
      return piiDetectionSkillDeserializer(item as PIIDetectionSkill);

    case "#Microsoft.Skills.Text.SplitSkill":
      return splitSkillDeserializer(item as SplitSkill);

    case "#Microsoft.Skills.Text.CustomEntityLookupSkill":
      return customEntityLookupSkillDeserializer(item as CustomEntityLookupSkill);

    case "#Microsoft.Skills.Text.TranslationSkill":
      return textTranslationSkillDeserializer(item as TextTranslationSkill);

    case "#Microsoft.Skills.Util.DocumentExtractionSkill":
      return documentExtractionSkillDeserializer(item as DocumentExtractionSkill);

    case "#Microsoft.Skills.Util.DocumentIntelligenceLayoutSkill":
      return documentIntelligenceLayoutSkillDeserializer(item as DocumentIntelligenceLayoutSkill);

    case "#Microsoft.Skills.Custom.WebApiSkill":
      return webApiSkillDeserializer(item as WebApiSkill);

    case "#Microsoft.Skills.Custom.AmlSkill":
      return azureMachineLearningSkillDeserializer(item as AzureMachineLearningSkill);

    case "#Microsoft.Skills.Text.AzureOpenAIEmbeddingSkill":
      return azureOpenAIEmbeddingSkillDeserializer(item as AzureOpenAIEmbeddingSkill);

    case "#Microsoft.Skills.Vision.VectorizeSkill":
      return visionVectorizeSkillDeserializer(item as VisionVectorizeSkill);

    case "#Microsoft.Skills.Util.ContentUnderstandingSkill":
      return contentUnderstandingSkillDeserializer(item as ContentUnderstandingSkill);

    case "#Microsoft.Skills.Custom.ChatCompletionSkill":
      return chatCompletionSkillDeserializer(item as ChatCompletionSkill);

    default:
      return searchIndexerSkillDeserializer(item);
  }
}

export function inputFieldMappingEntryArraySerializer(
  result: Array<InputFieldMappingEntry>,
): any[] {
  return result.map((item) => {
    return inputFieldMappingEntrySerializer(item);
  });
}

export function inputFieldMappingEntryArrayDeserializer(
  result: Array<InputFieldMappingEntry>,
): any[] {
  return result.map((item) => {
    return inputFieldMappingEntryDeserializer(item);
  });
}

/** Input field mapping for a skill. */
export interface InputFieldMappingEntry {
  /** The name of the input. */
  name: string;
  /** The source of the input. */
  source?: string;
  /** The source context used for selecting recursive inputs. */
  sourceContext?: string;
  /** The recursive inputs used when creating a complex type. */
  inputs?: InputFieldMappingEntry[];
}

export function inputFieldMappingEntrySerializer(item: InputFieldMappingEntry): any {
  return {
    name: item["name"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArraySerializer(item["inputs"]),
  };
}

export function inputFieldMappingEntryDeserializer(item: any): InputFieldMappingEntry {
  return {
    name: item["name"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArrayDeserializer(item["inputs"]),
  };
}

export function outputFieldMappingEntryArraySerializer(
  result: Array<OutputFieldMappingEntry>,
): any[] {
  return result.map((item) => {
    return outputFieldMappingEntrySerializer(item);
  });
}

export function outputFieldMappingEntryArrayDeserializer(
  result: Array<OutputFieldMappingEntry>,
): any[] {
  return result.map((item) => {
    return outputFieldMappingEntryDeserializer(item);
  });
}

/** Output field mapping for a skill. */
export interface OutputFieldMappingEntry {
  /** The name of the output defined by the skill. */
  name: string;
  /** The target name of the output. It is optional and default to name. */
  targetName?: string;
}

export function outputFieldMappingEntrySerializer(item: OutputFieldMappingEntry): any {
  return { name: item["name"], targetName: item["targetName"] };
}

export function outputFieldMappingEntryDeserializer(item: any): OutputFieldMappingEntry {
  return {
    name: item["name"],
    targetName: item["targetName"],
  };
}

/** A skill that enables scenarios that require a Boolean operation to determine the data to assign to an output. */
export interface ConditionalSkill extends SearchIndexerSkill {
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Util.ConditionalSkill";
}

export function conditionalSkillSerializer(item: ConditionalSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
  };
}

export function conditionalSkillDeserializer(item: any): ConditionalSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
  };
}

/** A skill that uses text analytics for key phrase extraction. */
export interface KeyPhraseExtractionSkill extends SearchIndexerSkill {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: KeyPhraseExtractionSkillLanguage;
  /** A number indicating how many key phrases to return. If absent, all identified key phrases will be returned. */
  maxKeyPhraseCount?: number;
  /** The version of the model to use when calling the Text Analytics service. It will default to the latest available when not specified. We recommend you do not specify this value unless absolutely necessary. */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.KeyPhraseExtractionSkill";
}

export function keyPhraseExtractionSkillSerializer(item: KeyPhraseExtractionSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    maxKeyPhraseCount: item["maxKeyPhraseCount"],
    modelVersion: item["modelVersion"],
  };
}

export function keyPhraseExtractionSkillDeserializer(item: any): KeyPhraseExtractionSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    maxKeyPhraseCount: item["maxKeyPhraseCount"],
    modelVersion: item["modelVersion"],
  };
}

/** The language codes supported for input text by KeyPhraseExtractionSkill. */
export enum KnownKeyPhraseExtractionSkillLanguage {
  /** Danish */
  Da = "da",
  /** Dutch */
  Nl = "nl",
  /** English */
  En = "en",
  /** Finnish */
  Fi = "fi",
  /** French */
  Fr = "fr",
  /** German */
  De = "de",
  /** Italian */
  It = "it",
  /** Japanese */
  Ja = "ja",
  /** Korean */
  Ko = "ko",
  /** Norwegian (Bokmaal) */
  No = "no",
  /** Polish */
  Pl = "pl",
  /** Portuguese (Portugal) */
  PtPT = "pt-PT",
  /** Portuguese (Brazil) */
  PtBR = "pt-BR",
  /** Russian */
  Ru = "ru",
  /** Spanish */
  Es = "es",
  /** Swedish */
  Sv = "sv",
}

/**
 * The language codes supported for input text by KeyPhraseExtractionSkill. \
 * {@link KnownKeyPhraseExtractionSkillLanguage} can be used interchangeably with KeyPhraseExtractionSkillLanguage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **da**: Danish \
 * **nl**: Dutch \
 * **en**: English \
 * **fi**: Finnish \
 * **fr**: French \
 * **de**: German \
 * **it**: Italian \
 * **ja**: Japanese \
 * **ko**: Korean \
 * **no**: Norwegian (Bokmaal) \
 * **pl**: Polish \
 * **pt-PT**: Portuguese (Portugal) \
 * **pt-BR**: Portuguese (Brazil) \
 * **ru**: Russian \
 * **es**: Spanish \
 * **sv**: Swedish
 */
export type KeyPhraseExtractionSkillLanguage = string;

/** A skill that extracts text from image files. */
export interface OcrSkill extends SearchIndexerSkill {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: OcrSkillLanguage;
  /** A value indicating to turn orientation detection on or not. Default is false. */
  shouldDetectOrientation?: boolean;
  /** Defines the sequence of characters to use between the lines of text recognized by the OCR skill. The default value is "space". */
  lineEnding?: OcrLineEnding;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Vision.OcrSkill";
}

export function ocrSkillSerializer(item: OcrSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    detectOrientation: item["shouldDetectOrientation"],
    lineEnding: item["lineEnding"],
  };
}

export function ocrSkillDeserializer(item: any): OcrSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    shouldDetectOrientation: item["detectOrientation"],
    lineEnding: item["lineEnding"],
  };
}

/** The language codes supported for input by OcrSkill. */
export enum KnownOcrSkillLanguage {
  /** Afrikaans */
  Af = "af",
  /** Albanian */
  Sq = "sq",
  /** Angika (Devanagiri) */
  Anp = "anp",
  /** Arabic */
  Ar = "ar",
  /** Asturian */
  Ast = "ast",
  /** Awadhi-Hindi (Devanagiri) */
  Awa = "awa",
  /** Azerbaijani (Latin) */
  Az = "az",
  /** Bagheli */
  Bfy = "bfy",
  /** Basque */
  Eu = "eu",
  /** Belarusian (Cyrillic and Latin) */
  Be = "be",
  /** Belarusian (Cyrillic) */
  BeCyrl = "be-cyrl",
  /** Belarusian (Latin) */
  BeLatn = "be-latn",
  /** Bhojpuri-Hindi (Devanagiri) */
  Bho = "bho",
  /** Bislama */
  Bi = "bi",
  /** Bodo (Devanagiri) */
  Brx = "brx",
  /** Bosnian Latin */
  Bs = "bs",
  /** Brajbha */
  Bra = "bra",
  /** Breton */
  Br = "br",
  /** Bulgarian */
  Bg = "bg",
  /** Bundeli */
  Bns = "bns",
  /** Buryat (Cyrillic) */
  Bua = "bua",
  /** Catalan */
  Ca = "ca",
  /** Cebuano */
  Ceb = "ceb",
  /** Chamling */
  Rab = "rab",
  /** Chamorro */
  Ch = "ch",
  /** Chhattisgarhi (Devanagiri) */
  Hne = "hne",
  /** Chinese Simplified */
  ZhHans = "zh-Hans",
  /** Chinese Traditional */
  ZhHant = "zh-Hant",
  /** Cornish */
  Kw = "kw",
  /** Corsican */
  Co = "co",
  /** Crimean Tatar (Latin) */
  Crh = "crh",
  /** Croatian */
  Hr = "hr",
  /** Czech */
  Cs = "cs",
  /** Danish */
  Da = "da",
  /** Dari */
  Prs = "prs",
  /** Dhimal (Devanagiri) */
  Dhi = "dhi",
  /** Dogri (Devanagiri) */
  Doi = "doi",
  /** Dutch */
  Nl = "nl",
  /** English */
  En = "en",
  /** Erzya (Cyrillic) */
  Myv = "myv",
  /** Estonian */
  Et = "et",
  /** Faroese */
  Fo = "fo",
  /** Fijian */
  Fj = "fj",
  /** Filipino */
  Fil = "fil",
  /** Finnish */
  Fi = "fi",
  /** French */
  Fr = "fr",
  /** Frulian */
  Fur = "fur",
  /** Gagauz (Latin) */
  Gag = "gag",
  /** Galician */
  Gl = "gl",
  /** German */
  De = "de",
  /** Gilbertese */
  Gil = "gil",
  /** Gondi (Devanagiri) */
  Gon = "gon",
  /** Greek */
  El = "el",
  /** Greenlandic */
  Kl = "kl",
  /** Gurung (Devanagiri) */
  Gvr = "gvr",
  /** Haitian Creole */
  Ht = "ht",
  /** Halbi (Devanagiri) */
  Hlb = "hlb",
  /** Hani */
  Hni = "hni",
  /** Haryanvi */
  Bgc = "bgc",
  /** Hawaiian */
  Haw = "haw",
  /** Hindi */
  Hi = "hi",
  /** Hmong Daw (Latin) */
  Mww = "mww",
  /** Ho (Devanagiri) */
  Hoc = "hoc",
  /** Hungarian */
  Hu = "hu",
  /** Icelandic */
  Is = "is",
  /** Inari Sami */
  Smn = "smn",
  /** Indonesian */
  Id = "id",
  /** Interlingua */
  Ia = "ia",
  /** Inuktitut (Latin) */
  Iu = "iu",
  /** Irish */
  Ga = "ga",
  /** Italian */
  It = "it",
  /** Japanese */
  Ja = "ja",
  /** Jaunsari (Devanagiri) */
  Jns = "Jns",
  /** Javanese */
  Jv = "jv",
  /** Kabuverdianu */
  Kea = "kea",
  /** Kachin (Latin) */
  Kac = "kac",
  /** Kangri (Devanagiri) */
  Xnr = "xnr",
  /** Karachay-Balkar */
  Krc = "krc",
  /** Kara-Kalpak (Cyrillic) */
  KaaCyrl = "kaa-cyrl",
  /** Kara-Kalpak (Latin) */
  Kaa = "kaa",
  /** Kashubian */
  Csb = "csb",
  /** Kazakh (Cyrillic) */
  KkCyrl = "kk-cyrl",
  /** Kazakh (Latin) */
  KkLatn = "kk-latn",
  /** Khaling */
  Klr = "klr",
  /** Khasi */
  Kha = "kha",
  /** K'iche' */
  Quc = "quc",
  /** Korean */
  Ko = "ko",
  /** Korku */
  Kfq = "kfq",
  /** Koryak */
  Kpy = "kpy",
  /** Kosraean */
  Kos = "kos",
  /** Kumyk (Cyrillic) */
  Kum = "kum",
  /** Kurdish (Arabic) */
  KuArab = "ku-arab",
  /** Kurdish (Latin) */
  KuLatn = "ku-latn",
  /** Kurukh (Devanagiri) */
  Kru = "kru",
  /** Kyrgyz (Cyrillic) */
  Ky = "ky",
  /** Lakota */
  Lkt = "lkt",
  /** Latin */
  La = "la",
  /** Lithuanian */
  Lt = "lt",
  /** Lower Sorbian */
  Dsb = "dsb",
  /** Lule Sami */
  Smj = "smj",
  /** Luxembourgish */
  Lb = "lb",
  /** Mahasu Pahari (Devanagiri) */
  Bfz = "bfz",
  /** Malay (Latin) */
  Ms = "ms",
  /** Maltese */
  Mt = "mt",
  /** Malto (Devanagiri) */
  Kmj = "kmj",
  /** Manx */
  Gv = "gv",
  /** Maori */
  Mi = "mi",
  /** Marathi */
  Mr = "mr",
  /** Mongolian (Cyrillic) */
  Mn = "mn",
  /** Montenegrin (Cyrillic) */
  CnrCyrl = "cnr-cyrl",
  /** Montenegrin (Latin) */
  CnrLatn = "cnr-latn",
  /** Neapolitan */
  Nap = "nap",
  /** Nepali */
  Ne = "ne",
  /** Niuean */
  Niu = "niu",
  /** Nogay */
  Nog = "nog",
  /** Northern Sami (Latin) */
  Sme = "sme",
  /** Norwegian */
  Nb = "nb",
  /** Norwegian */
  No = "no",
  /** Occitan */
  Oc = "oc",
  /** Ossetic */
  Os = "os",
  /** Pashto */
  Ps = "ps",
  /** Persian */
  Fa = "fa",
  /** Polish */
  Pl = "pl",
  /** Portuguese */
  Pt = "pt",
  /** Punjabi (Arabic) */
  Pa = "pa",
  /** Ripuarian */
  Ksh = "ksh",
  /** Romanian */
  Ro = "ro",
  /** Romansh */
  Rm = "rm",
  /** Russian */
  Ru = "ru",
  /** Sadri (Devanagiri) */
  Sck = "sck",
  /** Samoan (Latin) */
  Sm = "sm",
  /** Sanskrit (Devanagiri) */
  Sa = "sa",
  /** Santali (Devanagiri) */
  Sat = "sat",
  /** Scots */
  Sco = "sco",
  /** Scottish Gaelic */
  Gd = "gd",
  /** Serbian (Latin) */
  Sr = "sr",
  /** Serbian (Cyrillic) */
  SrCyrl = "sr-Cyrl",
  /** Serbian (Latin) */
  SrLatn = "sr-Latn",
  /** Sherpa (Devanagiri) */
  Xsr = "xsr",
  /** Sirmauri (Devanagiri) */
  Srx = "srx",
  /** Skolt Sami */
  Sms = "sms",
  /** Slovak */
  Sk = "sk",
  /** Slovenian */
  Sl = "sl",
  /** Somali (Arabic) */
  So = "so",
  /** Southern Sami */
  Sma = "sma",
  /** Spanish */
  Es = "es",
  /** Swahili (Latin) */
  Sw = "sw",
  /** Swedish */
  Sv = "sv",
  /** Tajik (Cyrillic) */
  Tg = "tg",
  /** Tatar (Latin) */
  Tt = "tt",
  /** Tetum */
  Tet = "tet",
  /** Thangmi */
  Thf = "thf",
  /** Tongan */
  To = "to",
  /** Turkish */
  Tr = "tr",
  /** Turkmen (Latin) */
  Tk = "tk",
  /** Tuvan */
  Tyv = "tyv",
  /** Upper Sorbian */
  Hsb = "hsb",
  /** Urdu */
  Ur = "ur",
  /** Uyghur (Arabic) */
  Ug = "ug",
  /** Uzbek (Arabic) */
  UzArab = "uz-arab",
  /** Uzbek (Cyrillic) */
  UzCyrl = "uz-cyrl",
  /** Uzbek (Latin) */
  Uz = "uz",
  /** Volapük */
  Vo = "vo",
  /** Walser */
  Wae = "wae",
  /** Welsh */
  Cy = "cy",
  /** Western Frisian */
  Fy = "fy",
  /** Yucatec Maya */
  Yua = "yua",
  /** Zhuang */
  Za = "za",
  /** Zulu */
  Zu = "zu",
  /** Unknown (All) */
  Unk = "unk",
}

/**
 * The language codes supported for input by OcrSkill. \
 * {@link KnownOcrSkillLanguage} can be used interchangeably with OcrSkillLanguage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **af**: Afrikaans \
 * **sq**: Albanian \
 * **anp**: Angika (Devanagiri) \
 * **ar**: Arabic \
 * **ast**: Asturian \
 * **awa**: Awadhi-Hindi (Devanagiri) \
 * **az**: Azerbaijani (Latin) \
 * **bfy**: Bagheli \
 * **eu**: Basque \
 * **be**: Belarusian (Cyrillic and Latin) \
 * **be-cyrl**: Belarusian (Cyrillic) \
 * **be-latn**: Belarusian (Latin) \
 * **bho**: Bhojpuri-Hindi (Devanagiri) \
 * **bi**: Bislama \
 * **brx**: Bodo (Devanagiri) \
 * **bs**: Bosnian Latin \
 * **bra**: Brajbha \
 * **br**: Breton \
 * **bg**: Bulgarian \
 * **bns**: Bundeli \
 * **bua**: Buryat (Cyrillic) \
 * **ca**: Catalan \
 * **ceb**: Cebuano \
 * **rab**: Chamling \
 * **ch**: Chamorro \
 * **hne**: Chhattisgarhi (Devanagiri) \
 * **zh-Hans**: Chinese Simplified \
 * **zh-Hant**: Chinese Traditional \
 * **kw**: Cornish \
 * **co**: Corsican \
 * **crh**: Crimean Tatar (Latin) \
 * **hr**: Croatian \
 * **cs**: Czech \
 * **da**: Danish \
 * **prs**: Dari \
 * **dhi**: Dhimal (Devanagiri) \
 * **doi**: Dogri (Devanagiri) \
 * **nl**: Dutch \
 * **en**: English \
 * **myv**: Erzya (Cyrillic) \
 * **et**: Estonian \
 * **fo**: Faroese \
 * **fj**: Fijian \
 * **fil**: Filipino \
 * **fi**: Finnish \
 * **fr**: French \
 * **fur**: Frulian \
 * **gag**: Gagauz (Latin) \
 * **gl**: Galician \
 * **de**: German \
 * **gil**: Gilbertese \
 * **gon**: Gondi (Devanagiri) \
 * **el**: Greek \
 * **kl**: Greenlandic \
 * **gvr**: Gurung (Devanagiri) \
 * **ht**: Haitian Creole \
 * **hlb**: Halbi (Devanagiri) \
 * **hni**: Hani \
 * **bgc**: Haryanvi \
 * **haw**: Hawaiian \
 * **hi**: Hindi \
 * **mww**: Hmong Daw (Latin) \
 * **hoc**: Ho (Devanagiri) \
 * **hu**: Hungarian \
 * **is**: Icelandic \
 * **smn**: Inari Sami \
 * **id**: Indonesian \
 * **ia**: Interlingua \
 * **iu**: Inuktitut (Latin) \
 * **ga**: Irish \
 * **it**: Italian \
 * **ja**: Japanese \
 * **Jns**: Jaunsari (Devanagiri) \
 * **jv**: Javanese \
 * **kea**: Kabuverdianu \
 * **kac**: Kachin (Latin) \
 * **xnr**: Kangri (Devanagiri) \
 * **krc**: Karachay-Balkar \
 * **kaa-cyrl**: Kara-Kalpak (Cyrillic) \
 * **kaa**: Kara-Kalpak (Latin) \
 * **csb**: Kashubian \
 * **kk-cyrl**: Kazakh (Cyrillic) \
 * **kk-latn**: Kazakh (Latin) \
 * **klr**: Khaling \
 * **kha**: Khasi \
 * **quc**: K'iche' \
 * **ko**: Korean \
 * **kfq**: Korku \
 * **kpy**: Koryak \
 * **kos**: Kosraean \
 * **kum**: Kumyk (Cyrillic) \
 * **ku-arab**: Kurdish (Arabic) \
 * **ku-latn**: Kurdish (Latin) \
 * **kru**: Kurukh (Devanagiri) \
 * **ky**: Kyrgyz (Cyrillic) \
 * **lkt**: Lakota \
 * **la**: Latin \
 * **lt**: Lithuanian \
 * **dsb**: Lower Sorbian \
 * **smj**: Lule Sami \
 * **lb**: Luxembourgish \
 * **bfz**: Mahasu Pahari (Devanagiri) \
 * **ms**: Malay (Latin) \
 * **mt**: Maltese \
 * **kmj**: Malto (Devanagiri) \
 * **gv**: Manx \
 * **mi**: Maori \
 * **mr**: Marathi \
 * **mn**: Mongolian (Cyrillic) \
 * **cnr-cyrl**: Montenegrin (Cyrillic) \
 * **cnr-latn**: Montenegrin (Latin) \
 * **nap**: Neapolitan \
 * **ne**: Nepali \
 * **niu**: Niuean \
 * **nog**: Nogay \
 * **sme**: Northern Sami (Latin) \
 * **nb**: Norwegian \
 * **no**: Norwegian \
 * **oc**: Occitan \
 * **os**: Ossetic \
 * **ps**: Pashto \
 * **fa**: Persian \
 * **pl**: Polish \
 * **pt**: Portuguese \
 * **pa**: Punjabi (Arabic) \
 * **ksh**: Ripuarian \
 * **ro**: Romanian \
 * **rm**: Romansh \
 * **ru**: Russian \
 * **sck**: Sadri (Devanagiri) \
 * **sm**: Samoan (Latin) \
 * **sa**: Sanskrit (Devanagiri) \
 * **sat**: Santali (Devanagiri) \
 * **sco**: Scots \
 * **gd**: Scottish Gaelic \
 * **sr**: Serbian (Latin) \
 * **sr-Cyrl**: Serbian (Cyrillic) \
 * **sr-Latn**: Serbian (Latin) \
 * **xsr**: Sherpa (Devanagiri) \
 * **srx**: Sirmauri (Devanagiri) \
 * **sms**: Skolt Sami \
 * **sk**: Slovak \
 * **sl**: Slovenian \
 * **so**: Somali (Arabic) \
 * **sma**: Southern Sami \
 * **es**: Spanish \
 * **sw**: Swahili (Latin) \
 * **sv**: Swedish \
 * **tg**: Tajik (Cyrillic) \
 * **tt**: Tatar (Latin) \
 * **tet**: Tetum \
 * **thf**: Thangmi \
 * **to**: Tongan \
 * **tr**: Turkish \
 * **tk**: Turkmen (Latin) \
 * **tyv**: Tuvan \
 * **hsb**: Upper Sorbian \
 * **ur**: Urdu \
 * **ug**: Uyghur (Arabic) \
 * **uz-arab**: Uzbek (Arabic) \
 * **uz-cyrl**: Uzbek (Cyrillic) \
 * **uz**: Uzbek (Latin) \
 * **vo**: Volapük \
 * **wae**: Walser \
 * **cy**: Welsh \
 * **fy**: Western Frisian \
 * **yua**: Yucatec Maya \
 * **za**: Zhuang \
 * **zu**: Zulu \
 * **unk**: Unknown (All)
 */
export type OcrSkillLanguage = string;

/** Defines the sequence of characters to use between the lines of text recognized by the OCR skill. The default value is "space". */
export enum KnownOcrLineEnding {
  /** Lines are separated by a single space character. */
  Space = "space",
  /** Lines are separated by a carriage return ('\r') character. */
  CarriageReturn = "carriageReturn",
  /** Lines are separated by a single line feed ('\n') character. */
  LineFeed = "lineFeed",
  /** Lines are separated by a carriage return and a line feed ('\r\n') character. */
  CarriageReturnLineFeed = "carriageReturnLineFeed",
}

/**
 * Defines the sequence of characters to use between the lines of text recognized by the OCR skill. The default value is "space". \
 * {@link KnownOcrLineEnding} can be used interchangeably with OcrLineEnding,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **space**: Lines are separated by a single space character. \
 * **carriageReturn**: Lines are separated by a carriage return ('\r') character. \
 * **lineFeed**: Lines are separated by a single line feed ('\n') character. \
 * **carriageReturnLineFeed**: Lines are separated by a carriage return and a line feed ('\r\n') character.
 */
export type OcrLineEnding = string;

/** A skill that analyzes image files. It extracts a rich set of visual features based on the image content. */
export interface ImageAnalysisSkill extends SearchIndexerSkill {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: ImageAnalysisSkillLanguage;
  /** A list of visual features. */
  visualFeatures?: VisualFeature[];
  /** A string indicating which domain-specific details to return. */
  details?: ImageDetail[];
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Vision.ImageAnalysisSkill";
}

export function imageAnalysisSkillSerializer(item: ImageAnalysisSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    visualFeatures: !item["visualFeatures"]
      ? item["visualFeatures"]
      : item["visualFeatures"].map((p: any) => {
          return p;
        }),
    details: !item["details"]
      ? item["details"]
      : item["details"].map((p: any) => {
          return p;
        }),
  };
}

export function imageAnalysisSkillDeserializer(item: any): ImageAnalysisSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    visualFeatures: !item["visualFeatures"]
      ? item["visualFeatures"]
      : item["visualFeatures"].map((p: any) => {
          return p;
        }),
    details: !item["details"]
      ? item["details"]
      : item["details"].map((p: any) => {
          return p;
        }),
  };
}

/** The language codes supported for input by ImageAnalysisSkill. */
export enum KnownImageAnalysisSkillLanguage {
  /** Arabic */
  Ar = "ar",
  /** Azerbaijani */
  Az = "az",
  /** Bulgarian */
  Bg = "bg",
  /** Bosnian Latin */
  Bs = "bs",
  /** Catalan */
  Ca = "ca",
  /** Czech */
  Cs = "cs",
  /** Welsh */
  Cy = "cy",
  /** Danish */
  Da = "da",
  /** German */
  De = "de",
  /** Greek */
  El = "el",
  /** English */
  En = "en",
  /** Spanish */
  Es = "es",
  /** Estonian */
  Et = "et",
  /** Basque */
  Eu = "eu",
  /** Finnish */
  Fi = "fi",
  /** French */
  Fr = "fr",
  /** Irish */
  Ga = "ga",
  /** Galician */
  Gl = "gl",
  /** Hebrew */
  He = "he",
  /** Hindi */
  Hi = "hi",
  /** Croatian */
  Hr = "hr",
  /** Hungarian */
  Hu = "hu",
  /** Indonesian */
  Id = "id",
  /** Italian */
  It = "it",
  /** Japanese */
  Ja = "ja",
  /** Kazakh */
  Kk = "kk",
  /** Korean */
  Ko = "ko",
  /** Lithuanian */
  Lt = "lt",
  /** Latvian */
  Lv = "lv",
  /** Macedonian */
  Mk = "mk",
  /** Malay Malaysia */
  Ms = "ms",
  /** Norwegian (Bokmal) */
  Nb = "nb",
  /** Dutch */
  Nl = "nl",
  /** Polish */
  Pl = "pl",
  /** Dari */
  Prs = "prs",
  /** Portuguese-Brazil */
  PtBR = "pt-BR",
  /** Portuguese-Portugal */
  Pt = "pt",
  /** Portuguese-Portugal */
  PtPT = "pt-PT",
  /** Romanian */
  Ro = "ro",
  /** Russian */
  Ru = "ru",
  /** Slovak */
  Sk = "sk",
  /** Slovenian */
  Sl = "sl",
  /** Serbian - Cyrillic RS */
  SrCyrl = "sr-Cyrl",
  /** Serbian - Latin RS */
  SrLatn = "sr-Latn",
  /** Swedish */
  Sv = "sv",
  /** Thai */
  Th = "th",
  /** Turkish */
  Tr = "tr",
  /** Ukrainian */
  Uk = "uk",
  /** Vietnamese */
  Vi = "vi",
  /** Chinese Simplified */
  Zh = "zh",
  /** Chinese Simplified */
  ZhHans = "zh-Hans",
  /** Chinese Traditional */
  ZhHant = "zh-Hant",
}

/**
 * The language codes supported for input by ImageAnalysisSkill. \
 * {@link KnownImageAnalysisSkillLanguage} can be used interchangeably with ImageAnalysisSkillLanguage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ar**: Arabic \
 * **az**: Azerbaijani \
 * **bg**: Bulgarian \
 * **bs**: Bosnian Latin \
 * **ca**: Catalan \
 * **cs**: Czech \
 * **cy**: Welsh \
 * **da**: Danish \
 * **de**: German \
 * **el**: Greek \
 * **en**: English \
 * **es**: Spanish \
 * **et**: Estonian \
 * **eu**: Basque \
 * **fi**: Finnish \
 * **fr**: French \
 * **ga**: Irish \
 * **gl**: Galician \
 * **he**: Hebrew \
 * **hi**: Hindi \
 * **hr**: Croatian \
 * **hu**: Hungarian \
 * **id**: Indonesian \
 * **it**: Italian \
 * **ja**: Japanese \
 * **kk**: Kazakh \
 * **ko**: Korean \
 * **lt**: Lithuanian \
 * **lv**: Latvian \
 * **mk**: Macedonian \
 * **ms**: Malay Malaysia \
 * **nb**: Norwegian (Bokmal) \
 * **nl**: Dutch \
 * **pl**: Polish \
 * **prs**: Dari \
 * **pt-BR**: Portuguese-Brazil \
 * **pt**: Portuguese-Portugal \
 * **pt-PT**: Portuguese-Portugal \
 * **ro**: Romanian \
 * **ru**: Russian \
 * **sk**: Slovak \
 * **sl**: Slovenian \
 * **sr-Cyrl**: Serbian - Cyrillic RS \
 * **sr-Latn**: Serbian - Latin RS \
 * **sv**: Swedish \
 * **th**: Thai \
 * **tr**: Turkish \
 * **uk**: Ukrainian \
 * **vi**: Vietnamese \
 * **zh**: Chinese Simplified \
 * **zh-Hans**: Chinese Simplified \
 * **zh-Hant**: Chinese Traditional
 */
export type ImageAnalysisSkillLanguage = string;

/** The strings indicating what visual feature types to return. */
export enum KnownVisualFeature {
  /** Visual features recognized as adult persons. */
  Adult = "adult",
  /** Visual features recognized as commercial brands. */
  Brands = "brands",
  /** Categories. */
  Categories = "categories",
  /** Description. */
  Description = "description",
  /** Visual features recognized as people faces. */
  Faces = "faces",
  /** Visual features recognized as objects. */
  Objects = "objects",
  /** Tags. */
  Tags = "tags",
}

/**
 * The strings indicating what visual feature types to return. \
 * {@link KnownVisualFeature} can be used interchangeably with VisualFeature,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **adult**: Visual features recognized as adult persons. \
 * **brands**: Visual features recognized as commercial brands. \
 * **categories**: Categories. \
 * **description**: Description. \
 * **faces**: Visual features recognized as people faces. \
 * **objects**: Visual features recognized as objects. \
 * **tags**: Tags.
 */
export type VisualFeature = string;

/** A string indicating which domain-specific details to return. */
export enum KnownImageDetail {
  /** Details recognized as celebrities. */
  Celebrities = "celebrities",
  /** Details recognized as landmarks. */
  Landmarks = "landmarks",
}

/**
 * A string indicating which domain-specific details to return. \
 * {@link KnownImageDetail} can be used interchangeably with ImageDetail,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **celebrities**: Details recognized as celebrities. \
 * **landmarks**: Details recognized as landmarks.
 */
export type ImageDetail = string;

/** A skill that detects the language of input text and reports a single language code for every document submitted on the request. The language code is paired with a score indicating the confidence of the analysis. */
export interface LanguageDetectionSkill extends SearchIndexerSkill {
  /** A country code to use as a hint to the language detection model if it cannot disambiguate the language. */
  defaultCountryHint?: string;
  /** The version of the model to use when calling the Text Analytics service. It will default to the latest available when not specified. We recommend you do not specify this value unless absolutely necessary. */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.LanguageDetectionSkill";
}

export function languageDetectionSkillSerializer(item: LanguageDetectionSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultCountryHint: item["defaultCountryHint"],
    modelVersion: item["modelVersion"],
  };
}

export function languageDetectionSkillDeserializer(item: any): LanguageDetectionSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultCountryHint: item["defaultCountryHint"],
    modelVersion: item["modelVersion"],
  };
}

/** A skill for reshaping the outputs. It creates a complex type to support composite fields (also known as multipart fields). */
export interface ShaperSkill extends SearchIndexerSkill {
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Util.ShaperSkill";
}

export function shaperSkillSerializer(item: ShaperSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
  };
}

export function shaperSkillDeserializer(item: any): ShaperSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
  };
}

/** A skill for merging two or more strings into a single unified string, with an optional user-defined delimiter separating each component part. */
export interface MergeSkill extends SearchIndexerSkill {
  /** The tag indicates the start of the merged text. By default, the tag is an empty space. */
  insertPreTag?: string;
  /** The tag indicates the end of the merged text. By default, the tag is an empty space. */
  insertPostTag?: string;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.MergeSkill";
}

export function mergeSkillSerializer(item: MergeSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    insertPreTag: item["insertPreTag"],
    insertPostTag: item["insertPostTag"],
  };
}

export function mergeSkillDeserializer(item: any): MergeSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    insertPreTag: item["insertPreTag"],
    insertPostTag: item["insertPostTag"],
  };
}

/** Using the Text Analytics API, evaluates unstructured text and for each record, provides sentiment labels (such as "negative", "neutral" and "positive") based on the highest confidence score found by the service at a sentence and document-level. */
export interface SentimentSkillV3 extends SearchIndexerSkill {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: string;
  /** If set to true, the skill output will include information from Text Analytics for opinion mining, namely targets (nouns or verbs) and their associated assessment (adjective) in the text. Default is false. */
  includeOpinionMining?: boolean;
  /** The version of the model to use when calling the Text Analytics service. It will default to the latest available when not specified. We recommend you do not specify this value unless absolutely necessary. */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.V3.SentimentSkill";
}

export function sentimentSkillV3Serializer(item: SentimentSkillV3): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    includeOpinionMining: item["includeOpinionMining"],
    modelVersion: item["modelVersion"],
  };
}

export function sentimentSkillV3Deserializer(item: any): SentimentSkillV3 {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    includeOpinionMining: item["includeOpinionMining"],
    modelVersion: item["modelVersion"],
  };
}

/** Using the Text Analytics API, extracts linked entities from text. */
export interface EntityLinkingSkill extends SearchIndexerSkill {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: string;
  /** A value between 0 and 1 that be used to only include entities whose confidence score is greater than the value specified. If not set (default), or if explicitly set to null, all entities will be included. */
  minimumPrecision?: number;
  /** The version of the model to use when calling the Text Analytics service. It will default to the latest available when not specified. We recommend you do not specify this value unless absolutely necessary. */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.V3.EntityLinkingSkill";
}

export function entityLinkingSkillSerializer(item: EntityLinkingSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    minimumPrecision: item["minimumPrecision"],
    modelVersion: item["modelVersion"],
  };
}

export function entityLinkingSkillDeserializer(item: any): EntityLinkingSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    minimumPrecision: item["minimumPrecision"],
    modelVersion: item["modelVersion"],
  };
}

/** Using the Text Analytics API, extracts entities of different types from text. */
export interface EntityRecognitionSkillV3 extends SearchIndexerSkill {
  /** A list of entity categories that should be extracted. */
  categories?: string[];
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: string;
  /** A value between 0 and 1 that be used to only include entities whose confidence score is greater than the value specified. If not set (default), or if explicitly set to null, all entities will be included. */
  minimumPrecision?: number;
  /** The version of the model to use when calling the Text Analytics API. It will default to the latest available when not specified. We recommend you do not specify this value unless absolutely necessary. */
  modelVersion?: string;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.V3.EntityRecognitionSkill";
}

export function entityRecognitionSkillV3Serializer(item: EntityRecognitionSkillV3): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    defaultLanguageCode: item["defaultLanguageCode"],
    minimumPrecision: item["minimumPrecision"],
    modelVersion: item["modelVersion"],
  };
}

export function entityRecognitionSkillV3Deserializer(item: any): EntityRecognitionSkillV3 {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    defaultLanguageCode: item["defaultLanguageCode"],
    minimumPrecision: item["minimumPrecision"],
    modelVersion: item["modelVersion"],
  };
}

/** Using the Text Analytics API, extracts personal information from an input text and gives you the option of masking it. */
export interface PIIDetectionSkill extends SearchIndexerSkill {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: string;
  /** A value between 0 and 1 that be used to only include entities whose confidence score is greater than the value specified. If not set (default), or if explicitly set to null, all entities will be included. */
  minimumPrecision?: number;
  /** A parameter that provides various ways to mask the personal information detected in the input text. Default is 'none'. */
  maskingMode?: PIIDetectionSkillMaskingMode;
  /** The character used to mask the text if the maskingMode parameter is set to replace. Default is '*'. */
  mask?: string;
  /** The version of the model to use when calling the Text Analytics service. It will default to the latest available when not specified. We recommend you do not specify this value unless absolutely necessary. */
  modelVersion?: string;
  /** A list of PII entity categories that should be extracted and masked. */
  piiCategories?: string[];
  /** If specified, will set the PII domain to include only a subset of the entity categories. Possible values include: 'phi', 'none'. Default is 'none'. */
  domain?: string;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.PIIDetectionSkill";
}

export function piiDetectionSkillSerializer(item: PIIDetectionSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    minimumPrecision: item["minimumPrecision"],
    maskingMode: item["maskingMode"],
    maskingCharacter: item["mask"],
    modelVersion: item["modelVersion"],
    piiCategories: !item["piiCategories"]
      ? item["piiCategories"]
      : item["piiCategories"].map((p: any) => {
          return p;
        }),
    domain: item["domain"],
  };
}

export function piiDetectionSkillDeserializer(item: any): PIIDetectionSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    minimumPrecision: item["minimumPrecision"],
    maskingMode: item["maskingMode"],
    mask: item["maskingCharacter"],
    modelVersion: item["modelVersion"],
    piiCategories: !item["piiCategories"]
      ? item["piiCategories"]
      : item["piiCategories"].map((p: any) => {
          return p;
        }),
    domain: item["domain"],
  };
}

/** A string indicating what maskingMode to use to mask the personal information detected in the input text. */
export enum KnownPIIDetectionSkillMaskingMode {
  /** No masking occurs and the maskedText output will not be returned. */
  None = "none",
  /** Replaces the detected entities with the character given in the maskingCharacter parameter. The character will be repeated to the length of the detected entity so that the offsets will correctly correspond to both the input text as well as the output maskedText. */
  Replace = "replace",
}

/**
 * A string indicating what maskingMode to use to mask the personal information detected in the input text. \
 * {@link KnownPIIDetectionSkillMaskingMode} can be used interchangeably with PIIDetectionSkillMaskingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **none**: No masking occurs and the maskedText output will not be returned. \
 * **replace**: Replaces the detected entities with the character given in the maskingCharacter parameter. The character will be repeated to the length of the detected entity so that the offsets will correctly correspond to both the input text as well as the output maskedText.
 */
export type PIIDetectionSkillMaskingMode = string;

/** A skill to split a string into chunks of text. */
export interface SplitSkill extends SearchIndexerSkill {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: SplitSkillLanguage;
  /** A value indicating which split mode to perform. */
  textSplitMode?: TextSplitMode;
  /** The desired maximum page length. Default is 10000. */
  maximumPageLength?: number;
  /** Only applicable when textSplitMode is set to 'pages'. If specified, n+1th chunk will start with this number of characters/tokens from the end of the nth chunk. */
  pageOverlapLength?: number;
  /** Only applicable when textSplitMode is set to 'pages'. If specified, the SplitSkill will discontinue splitting after processing the first 'maximumPagesToTake' pages, in order to improve performance when only a few initial pages are needed from each document. */
  maximumPagesToTake?: number;
  /** Only applies if textSplitMode is set to pages. There are two possible values. The choice of the values will decide the length (maximumPageLength and pageOverlapLength) measurement. The default is 'characters', which means the length will be measured by character. */
  unit?: SplitSkillUnit;
  /** Only applies if the unit is set to azureOpenAITokens. If specified, the splitSkill will use these parameters when performing the tokenization. The parameters are a valid 'encoderModelName' and an optional 'allowedSpecialTokens' property. */
  azureOpenAITokenizerParameters?: AzureOpenAITokenizerParameters;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.SplitSkill";
}

export function splitSkillSerializer(item: SplitSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    textSplitMode: item["textSplitMode"],
    maximumPageLength: item["maximumPageLength"],
    pageOverlapLength: item["pageOverlapLength"],
    maximumPagesToTake: item["maximumPagesToTake"],
    unit: item["unit"],
    azureOpenAITokenizerParameters: !item["azureOpenAITokenizerParameters"]
      ? item["azureOpenAITokenizerParameters"]
      : azureOpenAITokenizerParametersSerializer(item["azureOpenAITokenizerParameters"]),
  };
}

export function splitSkillDeserializer(item: any): SplitSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    textSplitMode: item["textSplitMode"],
    maximumPageLength: item["maximumPageLength"],
    pageOverlapLength: item["pageOverlapLength"],
    maximumPagesToTake: item["maximumPagesToTake"],
    unit: item["unit"],
    azureOpenAITokenizerParameters: !item["azureOpenAITokenizerParameters"]
      ? item["azureOpenAITokenizerParameters"]
      : azureOpenAITokenizerParametersDeserializer(item["azureOpenAITokenizerParameters"]),
  };
}

/** The language codes supported for input text by SplitSkill. */
export enum KnownSplitSkillLanguage {
  /** Amharic */
  Am = "am",
  /** Bosnian */
  Bs = "bs",
  /** Czech */
  Cs = "cs",
  /** Danish */
  Da = "da",
  /** German */
  De = "de",
  /** English */
  En = "en",
  /** Spanish */
  Es = "es",
  /** Estonian */
  Et = "et",
  /** Finnish */
  Fi = "fi",
  /** French */
  Fr = "fr",
  /** Hebrew */
  He = "he",
  /** Hindi */
  Hi = "hi",
  /** Croatian */
  Hr = "hr",
  /** Hungarian */
  Hu = "hu",
  /** Indonesian */
  Id = "id",
  /** Icelandic */
  Is = "is",
  /** Italian */
  It = "it",
  /** Japanese */
  Ja = "ja",
  /** Korean */
  Ko = "ko",
  /** Latvian */
  Lv = "lv",
  /** Norwegian */
  Nb = "nb",
  /** Dutch */
  Nl = "nl",
  /** Polish */
  Pl = "pl",
  /** Portuguese (Portugal) */
  Pt = "pt",
  /** Portuguese (Brazil) */
  PtBr = "pt-br",
  /** Russian */
  Ru = "ru",
  /** Slovak */
  Sk = "sk",
  /** Slovenian */
  Sl = "sl",
  /** Serbian */
  Sr = "sr",
  /** Swedish */
  Sv = "sv",
  /** Turkish */
  Tr = "tr",
  /** Urdu */
  Ur = "ur",
  /** Chinese (Simplified) */
  Zh = "zh",
}

/**
 * The language codes supported for input text by SplitSkill. \
 * {@link KnownSplitSkillLanguage} can be used interchangeably with SplitSkillLanguage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **am**: Amharic \
 * **bs**: Bosnian \
 * **cs**: Czech \
 * **da**: Danish \
 * **de**: German \
 * **en**: English \
 * **es**: Spanish \
 * **et**: Estonian \
 * **fi**: Finnish \
 * **fr**: French \
 * **he**: Hebrew \
 * **hi**: Hindi \
 * **hr**: Croatian \
 * **hu**: Hungarian \
 * **id**: Indonesian \
 * **is**: Icelandic \
 * **it**: Italian \
 * **ja**: Japanese \
 * **ko**: Korean \
 * **lv**: Latvian \
 * **nb**: Norwegian \
 * **nl**: Dutch \
 * **pl**: Polish \
 * **pt**: Portuguese (Portugal) \
 * **pt-br**: Portuguese (Brazil) \
 * **ru**: Russian \
 * **sk**: Slovak \
 * **sl**: Slovenian \
 * **sr**: Serbian \
 * **sv**: Swedish \
 * **tr**: Turkish \
 * **ur**: Urdu \
 * **zh**: Chinese (Simplified)
 */
export type SplitSkillLanguage = string;

/** A value indicating which split mode to perform. */
export enum KnownTextSplitMode {
  /** Split the text into individual pages. */
  Pages = "pages",
  /** Split the text into individual sentences. */
  Sentences = "sentences",
}

/**
 * A value indicating which split mode to perform. \
 * {@link KnownTextSplitMode} can be used interchangeably with TextSplitMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pages**: Split the text into individual pages. \
 * **sentences**: Split the text into individual sentences.
 */
export type TextSplitMode = string;

/** A value indicating which unit to use. */
export enum KnownSplitSkillUnit {
  /** The length will be measured by character. */
  Characters = "characters",
  /** The length will be measured by an AzureOpenAI tokenizer from the tiktoken library. */
  AzureOpenAITokens = "azureOpenAITokens",
}

/**
 * A value indicating which unit to use. \
 * {@link KnownSplitSkillUnit} can be used interchangeably with SplitSkillUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **characters**: The length will be measured by character. \
 * **azureOpenAITokens**: The length will be measured by an AzureOpenAI tokenizer from the tiktoken library.
 */
export type SplitSkillUnit = string;

/** Azure OpenAI Tokenizer parameters. */
export interface AzureOpenAITokenizerParameters {
  /** Only applies if the unit is set to azureOpenAITokens. Options include 'R50k_base', 'P50k_base', 'P50k_edit' and 'CL100k_base'. The default value is 'CL100k_base'. */
  encoderModelName?: SplitSkillEncoderModelName;
  /** (Optional) Only applies if the unit is set to azureOpenAITokens. This parameter defines a collection of special tokens that are permitted within the tokenization process. */
  allowedSpecialTokens?: string[];
}

export function azureOpenAITokenizerParametersSerializer(
  item: AzureOpenAITokenizerParameters,
): any {
  return {
    encoderModelName: item["encoderModelName"],
    allowedSpecialTokens: !item["allowedSpecialTokens"]
      ? item["allowedSpecialTokens"]
      : item["allowedSpecialTokens"].map((p: any) => {
          return p;
        }),
  };
}

export function azureOpenAITokenizerParametersDeserializer(
  item: any,
): AzureOpenAITokenizerParameters {
  return {
    encoderModelName: item["encoderModelName"],
    allowedSpecialTokens: !item["allowedSpecialTokens"]
      ? item["allowedSpecialTokens"]
      : item["allowedSpecialTokens"].map((p: any) => {
          return p;
        }),
  };
}

/** A value indicating which tokenizer to use. */
export enum KnownSplitSkillEncoderModelName {
  /** Refers to a base model trained with a 50,000 token vocabulary, often used in general natural language processing tasks. */
  R50KBase = "r50k_base",
  /** A base model with a 50,000 token vocabulary, optimized for prompt-based tasks. */
  P50KBase = "p50k_base",
  /** Similar to p50k_base but fine-tuned for editing or rephrasing tasks with a 50,000 token vocabulary. */
  P50KEdit = "p50k_edit",
  /** A base model with a 100,000 token vocabulary. */
  CL100KBase = "cl100k_base",
}

/**
 * A value indicating which tokenizer to use. \
 * {@link KnownSplitSkillEncoderModelName} can be used interchangeably with SplitSkillEncoderModelName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **r50k_base**: Refers to a base model trained with a 50,000 token vocabulary, often used in general natural language processing tasks. \
 * **p50k_base**: A base model with a 50,000 token vocabulary, optimized for prompt-based tasks. \
 * **p50k_edit**: Similar to p50k_base but fine-tuned for editing or rephrasing tasks with a 50,000 token vocabulary. \
 * **cl100k_base**: A base model with a 100,000 token vocabulary.
 */
export type SplitSkillEncoderModelName = string;

/** A skill looks for text from a custom, user-defined list of words and phrases. */
export interface CustomEntityLookupSkill extends SearchIndexerSkill {
  /** A value indicating which language code to use. Default is `en`. */
  defaultLanguageCode?: CustomEntityLookupSkillLanguage;
  /** Path to a JSON or CSV file containing all the target text to match against. This entity definition is read at the beginning of an indexer run. Any updates to this file during an indexer run will not take effect until subsequent runs. This config must be accessible over HTTPS. */
  entitiesDefinitionUri?: string;
  /** The inline CustomEntity definition. */
  inlineEntitiesDefinition?: CustomEntity[];
  /** A global flag for CaseSensitive. If CaseSensitive is not set in CustomEntity, this value will be the default value. */
  globalDefaultCaseSensitive?: boolean;
  /** A global flag for AccentSensitive. If AccentSensitive is not set in CustomEntity, this value will be the default value. */
  globalDefaultAccentSensitive?: boolean;
  /** A global flag for FuzzyEditDistance. If FuzzyEditDistance is not set in CustomEntity, this value will be the default value. */
  globalDefaultFuzzyEditDistance?: number;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.CustomEntityLookupSkill";
}

export function customEntityLookupSkillSerializer(item: CustomEntityLookupSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    entitiesDefinitionUri: item["entitiesDefinitionUri"],
    inlineEntitiesDefinition: !item["inlineEntitiesDefinition"]
      ? item["inlineEntitiesDefinition"]
      : customEntityArraySerializer(item["inlineEntitiesDefinition"]),
    globalDefaultCaseSensitive: item["globalDefaultCaseSensitive"],
    globalDefaultAccentSensitive: item["globalDefaultAccentSensitive"],
    globalDefaultFuzzyEditDistance: item["globalDefaultFuzzyEditDistance"],
  };
}

export function customEntityLookupSkillDeserializer(item: any): CustomEntityLookupSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultLanguageCode: item["defaultLanguageCode"],
    entitiesDefinitionUri: item["entitiesDefinitionUri"],
    inlineEntitiesDefinition: !item["inlineEntitiesDefinition"]
      ? item["inlineEntitiesDefinition"]
      : customEntityArrayDeserializer(item["inlineEntitiesDefinition"]),
    globalDefaultCaseSensitive: item["globalDefaultCaseSensitive"],
    globalDefaultAccentSensitive: item["globalDefaultAccentSensitive"],
    globalDefaultFuzzyEditDistance: item["globalDefaultFuzzyEditDistance"],
  };
}

/** The language codes supported for input text by CustomEntityLookupSkill. */
export enum KnownCustomEntityLookupSkillLanguage {
  /** Danish */
  Da = "da",
  /** German */
  De = "de",
  /** English */
  En = "en",
  /** Spanish */
  Es = "es",
  /** Finnish */
  Fi = "fi",
  /** French */
  Fr = "fr",
  /** Italian */
  It = "it",
  /** Korean */
  Ko = "ko",
  /** Portuguese */
  Pt = "pt",
}

/**
 * The language codes supported for input text by CustomEntityLookupSkill. \
 * {@link KnownCustomEntityLookupSkillLanguage} can be used interchangeably with CustomEntityLookupSkillLanguage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **da**: Danish \
 * **de**: German \
 * **en**: English \
 * **es**: Spanish \
 * **fi**: Finnish \
 * **fr**: French \
 * **it**: Italian \
 * **ko**: Korean \
 * **pt**: Portuguese
 */
export type CustomEntityLookupSkillLanguage = string;

export function customEntityArraySerializer(result: Array<CustomEntity>): any[] {
  return result.map((item) => {
    return customEntitySerializer(item);
  });
}

export function customEntityArrayDeserializer(result: Array<CustomEntity>): any[] {
  return result.map((item) => {
    return customEntityDeserializer(item);
  });
}

/** An object that contains information about the matches that were found, and related metadata. */
export interface CustomEntity {
  /** The top-level entity descriptor. Matches in the skill output will be grouped by this name, and it should represent the "normalized" form of the text being found. */
  name: string;
  /** This field can be used as a passthrough for custom metadata about the matched text(s). The value of this field will appear with every match of its entity in the skill output. */
  description?: string;
  /** This field can be used as a passthrough for custom metadata about the matched text(s). The value of this field will appear with every match of its entity in the skill output. */
  type?: string;
  /** This field can be used as a passthrough for custom metadata about the matched text(s). The value of this field will appear with every match of its entity in the skill output. */
  subtype?: string;
  /** This field can be used as a passthrough for custom metadata about the matched text(s). The value of this field will appear with every match of its entity in the skill output. */
  id?: string;
  /** Defaults to false. Boolean value denoting whether comparisons with the entity name should be sensitive to character casing. Sample case insensitive matches of "Microsoft" could be: microsoft, microSoft, MICROSOFT. */
  caseSensitive?: boolean;
  /** Defaults to false. Boolean value denoting whether comparisons with the entity name should be sensitive to accent. */
  accentSensitive?: boolean;
  /** Defaults to 0. Maximum value of 5. Denotes the acceptable number of divergent characters that would still constitute a match with the entity name. The smallest possible fuzziness for any given match is returned. For instance, if the edit distance is set to 3, "Windows10" would still match "Windows", "Windows10" and "Windows 7". When case sensitivity is set to false, case differences do NOT count towards fuzziness tolerance, but otherwise do. */
  fuzzyEditDistance?: number;
  /** Changes the default case sensitivity value for this entity. It be used to change the default value of all aliases caseSensitive values. */
  defaultCaseSensitive?: boolean;
  /** Changes the default accent sensitivity value for this entity. It be used to change the default value of all aliases accentSensitive values. */
  defaultAccentSensitive?: boolean;
  /** Changes the default fuzzy edit distance value for this entity. It can be used to change the default value of all aliases fuzzyEditDistance values. */
  defaultFuzzyEditDistance?: number;
  /** An array of complex objects that can be used to specify alternative spellings or synonyms to the root entity name. */
  aliases?: CustomEntityAlias[];
}

export function customEntitySerializer(item: CustomEntity): any {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    subtype: item["subtype"],
    id: item["id"],
    caseSensitive: item["caseSensitive"],
    accentSensitive: item["accentSensitive"],
    fuzzyEditDistance: item["fuzzyEditDistance"],
    defaultCaseSensitive: item["defaultCaseSensitive"],
    defaultAccentSensitive: item["defaultAccentSensitive"],
    defaultFuzzyEditDistance: item["defaultFuzzyEditDistance"],
    aliases: !item["aliases"] ? item["aliases"] : customEntityAliasArraySerializer(item["aliases"]),
  };
}

export function customEntityDeserializer(item: any): CustomEntity {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    subtype: item["subtype"],
    id: item["id"],
    caseSensitive: item["caseSensitive"],
    accentSensitive: item["accentSensitive"],
    fuzzyEditDistance: item["fuzzyEditDistance"],
    defaultCaseSensitive: item["defaultCaseSensitive"],
    defaultAccentSensitive: item["defaultAccentSensitive"],
    defaultFuzzyEditDistance: item["defaultFuzzyEditDistance"],
    aliases: !item["aliases"]
      ? item["aliases"]
      : customEntityAliasArrayDeserializer(item["aliases"]),
  };
}

export function customEntityAliasArraySerializer(result: Array<CustomEntityAlias>): any[] {
  return result.map((item) => {
    return customEntityAliasSerializer(item);
  });
}

export function customEntityAliasArrayDeserializer(result: Array<CustomEntityAlias>): any[] {
  return result.map((item) => {
    return customEntityAliasDeserializer(item);
  });
}

/** A complex object that can be used to specify alternative spellings or synonyms to the root entity name. */
export interface CustomEntityAlias {
  /** The text of the alias. */
  text: string;
  /** Determine if the alias is case sensitive. */
  caseSensitive?: boolean;
  /** Determine if the alias is accent sensitive. */
  accentSensitive?: boolean;
  /** Determine the fuzzy edit distance of the alias. */
  fuzzyEditDistance?: number;
}

export function customEntityAliasSerializer(item: CustomEntityAlias): any {
  return {
    text: item["text"],
    caseSensitive: item["caseSensitive"],
    accentSensitive: item["accentSensitive"],
    fuzzyEditDistance: item["fuzzyEditDistance"],
  };
}

export function customEntityAliasDeserializer(item: any): CustomEntityAlias {
  return {
    text: item["text"],
    caseSensitive: item["caseSensitive"],
    accentSensitive: item["accentSensitive"],
    fuzzyEditDistance: item["fuzzyEditDistance"],
  };
}

/** A skill to translate text from one language to another. */
export interface TextTranslationSkill extends SearchIndexerSkill {
  /** The language code to translate documents into for documents that don't specify the to language explicitly. */
  defaultToLanguageCode: TextTranslationSkillLanguage;
  /** The language code to translate documents from for documents that don't specify the from language explicitly. */
  defaultFromLanguageCode?: TextTranslationSkillLanguage;
  /** The language code to translate documents from when neither the fromLanguageCode input nor the defaultFromLanguageCode parameter are provided, and the automatic language detection is unsuccessful. Default is `en`. */
  suggestedFrom?: TextTranslationSkillLanguage;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.TranslationSkill";
}

export function textTranslationSkillSerializer(item: TextTranslationSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    defaultToLanguageCode: item["defaultToLanguageCode"],
    defaultFromLanguageCode: item["defaultFromLanguageCode"],
    suggestedFrom: item["suggestedFrom"],
  };
}

export function textTranslationSkillDeserializer(item: any): TextTranslationSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    defaultToLanguageCode: item["defaultToLanguageCode"],
    defaultFromLanguageCode: item["defaultFromLanguageCode"],
    suggestedFrom: item["suggestedFrom"],
  };
}

/** The language codes supported for input text by TextTranslationSkill. */
export enum KnownTextTranslationSkillLanguage {
  /** Afrikaans */
  Af = "af",
  /** Arabic */
  Ar = "ar",
  /** Bangla */
  Bn = "bn",
  /** Bosnian (Latin) */
  Bs = "bs",
  /** Bulgarian */
  Bg = "bg",
  /** Cantonese (Traditional) */
  Yue = "yue",
  /** Catalan */
  Ca = "ca",
  /** Chinese Simplified */
  ZhHans = "zh-Hans",
  /** Chinese Traditional */
  ZhHant = "zh-Hant",
  /** Croatian */
  Hr = "hr",
  /** Czech */
  Cs = "cs",
  /** Danish */
  Da = "da",
  /** Dutch */
  Nl = "nl",
  /** English */
  En = "en",
  /** Estonian */
  Et = "et",
  /** Fijian */
  Fj = "fj",
  /** Filipino */
  Fil = "fil",
  /** Finnish */
  Fi = "fi",
  /** French */
  Fr = "fr",
  /** German */
  De = "de",
  /** Greek */
  El = "el",
  /** Haitian Creole */
  Ht = "ht",
  /** Hebrew */
  He = "he",
  /** Hindi */
  Hi = "hi",
  /** Hmong Daw */
  Mww = "mww",
  /** Hungarian */
  Hu = "hu",
  /** Icelandic */
  Is = "is",
  /** Indonesian */
  Id = "id",
  /** Italian */
  It = "it",
  /** Japanese */
  Ja = "ja",
  /** Kiswahili */
  Sw = "sw",
  /** Klingon */
  Tlh = "tlh",
  /** Klingon (Latin script) */
  TlhLatn = "tlh-Latn",
  /** Klingon (Klingon script) */
  TlhPiqd = "tlh-Piqd",
  /** Korean */
  Ko = "ko",
  /** Latvian */
  Lv = "lv",
  /** Lithuanian */
  Lt = "lt",
  /** Malagasy */
  Mg = "mg",
  /** Malay */
  Ms = "ms",
  /** Maltese */
  Mt = "mt",
  /** Norwegian */
  Nb = "nb",
  /** Persian */
  Fa = "fa",
  /** Polish */
  Pl = "pl",
  /** Portuguese */
  Pt = "pt",
  /** Portuguese (Brazil) */
  PtBr = "pt-br",
  /** Portuguese (Portugal) */
  PtPT = "pt-PT",
  /** Queretaro Otomi */
  Otq = "otq",
  /** Romanian */
  Ro = "ro",
  /** Russian */
  Ru = "ru",
  /** Samoan */
  Sm = "sm",
  /** Serbian (Cyrillic) */
  SrCyrl = "sr-Cyrl",
  /** Serbian (Latin) */
  SrLatn = "sr-Latn",
  /** Slovak */
  Sk = "sk",
  /** Slovenian */
  Sl = "sl",
  /** Spanish */
  Es = "es",
  /** Swedish */
  Sv = "sv",
  /** Tahitian */
  Ty = "ty",
  /** Tamil */
  Ta = "ta",
  /** Telugu */
  Te = "te",
  /** Thai */
  Th = "th",
  /** Tongan */
  To = "to",
  /** Turkish */
  Tr = "tr",
  /** Ukrainian */
  Uk = "uk",
  /** Urdu */
  Ur = "ur",
  /** Vietnamese */
  Vi = "vi",
  /** Welsh */
  Cy = "cy",
  /** Yucatec Maya */
  Yua = "yua",
  /** Irish */
  Ga = "ga",
  /** Kannada */
  Kn = "kn",
  /** Maori */
  Mi = "mi",
  /** Malayalam */
  Ml = "ml",
  /** Punjabi */
  Pa = "pa",
}

/**
 * The language codes supported for input text by TextTranslationSkill. \
 * {@link KnownTextTranslationSkillLanguage} can be used interchangeably with TextTranslationSkillLanguage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **af**: Afrikaans \
 * **ar**: Arabic \
 * **bn**: Bangla \
 * **bs**: Bosnian (Latin) \
 * **bg**: Bulgarian \
 * **yue**: Cantonese (Traditional) \
 * **ca**: Catalan \
 * **zh-Hans**: Chinese Simplified \
 * **zh-Hant**: Chinese Traditional \
 * **hr**: Croatian \
 * **cs**: Czech \
 * **da**: Danish \
 * **nl**: Dutch \
 * **en**: English \
 * **et**: Estonian \
 * **fj**: Fijian \
 * **fil**: Filipino \
 * **fi**: Finnish \
 * **fr**: French \
 * **de**: German \
 * **el**: Greek \
 * **ht**: Haitian Creole \
 * **he**: Hebrew \
 * **hi**: Hindi \
 * **mww**: Hmong Daw \
 * **hu**: Hungarian \
 * **is**: Icelandic \
 * **id**: Indonesian \
 * **it**: Italian \
 * **ja**: Japanese \
 * **sw**: Kiswahili \
 * **tlh**: Klingon \
 * **tlh-Latn**: Klingon (Latin script) \
 * **tlh-Piqd**: Klingon (Klingon script) \
 * **ko**: Korean \
 * **lv**: Latvian \
 * **lt**: Lithuanian \
 * **mg**: Malagasy \
 * **ms**: Malay \
 * **mt**: Maltese \
 * **nb**: Norwegian \
 * **fa**: Persian \
 * **pl**: Polish \
 * **pt**: Portuguese \
 * **pt-br**: Portuguese (Brazil) \
 * **pt-PT**: Portuguese (Portugal) \
 * **otq**: Queretaro Otomi \
 * **ro**: Romanian \
 * **ru**: Russian \
 * **sm**: Samoan \
 * **sr-Cyrl**: Serbian (Cyrillic) \
 * **sr-Latn**: Serbian (Latin) \
 * **sk**: Slovak \
 * **sl**: Slovenian \
 * **es**: Spanish \
 * **sv**: Swedish \
 * **ty**: Tahitian \
 * **ta**: Tamil \
 * **te**: Telugu \
 * **th**: Thai \
 * **to**: Tongan \
 * **tr**: Turkish \
 * **uk**: Ukrainian \
 * **ur**: Urdu \
 * **vi**: Vietnamese \
 * **cy**: Welsh \
 * **yua**: Yucatec Maya \
 * **ga**: Irish \
 * **kn**: Kannada \
 * **mi**: Maori \
 * **ml**: Malayalam \
 * **pa**: Punjabi
 */
export type TextTranslationSkillLanguage = string;

/** A skill that extracts content from a file within the enrichment pipeline. */
export interface DocumentExtractionSkill extends SearchIndexerSkill {
  /** The parsingMode for the skill. Will be set to 'default' if not defined. */
  parsingMode?: string;
  /** The type of data to be extracted for the skill. Will be set to 'contentAndMetadata' if not defined. */
  dataToExtract?: string;
  /** A dictionary of configurations for the skill. */
  configuration?: Record<string, any>;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Util.DocumentExtractionSkill";
}

export function documentExtractionSkillSerializer(item: DocumentExtractionSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    parsingMode: item["parsingMode"],
    dataToExtract: item["dataToExtract"],
    configuration: item["configuration"],
  };
}

export function documentExtractionSkillDeserializer(item: any): DocumentExtractionSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    parsingMode: item["parsingMode"],
    dataToExtract: item["dataToExtract"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : Object.fromEntries(
          Object.entries(item["configuration"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
  };
}

/** A skill that extracts content and layout information, via Azure AI Services, from files within the enrichment pipeline. */
export interface DocumentIntelligenceLayoutSkill extends SearchIndexerSkill {
  /** Controls the output format. Default is 'markdown'. */
  outputFormat?: DocumentIntelligenceLayoutSkillOutputFormat;
  /** Controls the cardinality of the output produced by the skill. Default is 'oneToMany'. */
  outputMode?: DocumentIntelligenceLayoutSkillOutputMode;
  /** The depth of headers in the markdown output. Default is h6. */
  markdownHeaderDepth?: DocumentIntelligenceLayoutSkillMarkdownHeaderDepth;
  /** Controls the cardinality of the content extracted from the document by the skill. */
  extractionOptions?: DocumentIntelligenceLayoutSkillExtractionOptions[];
  /** Controls the cardinality for chunking the content. */
  chunkingProperties?: DocumentIntelligenceLayoutSkillChunkingProperties;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Util.DocumentIntelligenceLayoutSkill";
}

export function documentIntelligenceLayoutSkillSerializer(
  item: DocumentIntelligenceLayoutSkill,
): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    outputFormat: item["outputFormat"],
    outputMode: item["outputMode"],
    markdownHeaderDepth: item["markdownHeaderDepth"],
    extractionOptions: !item["extractionOptions"]
      ? item["extractionOptions"]
      : item["extractionOptions"].map((p: any) => {
          return p;
        }),
    chunkingProperties: !item["chunkingProperties"]
      ? item["chunkingProperties"]
      : documentIntelligenceLayoutSkillChunkingPropertiesSerializer(item["chunkingProperties"]),
  };
}

export function documentIntelligenceLayoutSkillDeserializer(
  item: any,
): DocumentIntelligenceLayoutSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    outputFormat: item["outputFormat"],
    outputMode: item["outputMode"],
    markdownHeaderDepth: item["markdownHeaderDepth"],
    extractionOptions: !item["extractionOptions"]
      ? item["extractionOptions"]
      : item["extractionOptions"].map((p1: any) => {
          return p1;
        }),
    chunkingProperties: !item["chunkingProperties"]
      ? item["chunkingProperties"]
      : documentIntelligenceLayoutSkillChunkingPropertiesDeserializer(item["chunkingProperties"]),
  };
}

/** Controls the cardinality of the output format. Default is 'markdown'. */
export enum KnownDocumentIntelligenceLayoutSkillOutputFormat {
  /** Specify the format of the output as text. */
  Text = "text",
  /** Specify the format of the output as markdown. */
  Markdown = "markdown",
}

/**
 * Controls the cardinality of the output format. Default is 'markdown'. \
 * {@link KnownDocumentIntelligenceLayoutSkillOutputFormat} can be used interchangeably with DocumentIntelligenceLayoutSkillOutputFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **text**: Specify the format of the output as text. \
 * **markdown**: Specify the format of the output as markdown.
 */
export type DocumentIntelligenceLayoutSkillOutputFormat = string;

/** Controls the cardinality of the output produced by the skill. Default is 'oneToMany'. */
export enum KnownDocumentIntelligenceLayoutSkillOutputMode {
  /** Specify that the output should be parsed as 'oneToMany'. */
  OneToMany = "oneToMany",
}

/**
 * Controls the cardinality of the output produced by the skill. Default is 'oneToMany'. \
 * {@link KnownDocumentIntelligenceLayoutSkillOutputMode} can be used interchangeably with DocumentIntelligenceLayoutSkillOutputMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **oneToMany**: Specify that the output should be parsed as 'oneToMany'.
 */
export type DocumentIntelligenceLayoutSkillOutputMode = string;

/** The depth of headers in the markdown output. Default is h6. */
export enum KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth {
  /** Header level 1. */
  H1 = "h1",
  /** Header level 2. */
  H2 = "h2",
  /** Header level 3. */
  H3 = "h3",
  /** Header level 4. */
  H4 = "h4",
  /** Header level 5. */
  H5 = "h5",
  /** Header level 6. */
  H6 = "h6",
}

/**
 * The depth of headers in the markdown output. Default is h6. \
 * {@link KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth} can be used interchangeably with DocumentIntelligenceLayoutSkillMarkdownHeaderDepth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **h1**: Header level 1. \
 * **h2**: Header level 2. \
 * **h3**: Header level 3. \
 * **h4**: Header level 4. \
 * **h5**: Header level 5. \
 * **h6**: Header level 6.
 */
export type DocumentIntelligenceLayoutSkillMarkdownHeaderDepth = string;

/** Controls the cardinality of the content extracted from the document by the skill. */
export enum KnownDocumentIntelligenceLayoutSkillExtractionOptions {
  /** Specify that image content should be extracted from the document. */
  Images = "images",
  /** Specify that location metadata should be extracted from the document. */
  LocationMetadata = "locationMetadata",
}

/**
 * Controls the cardinality of the content extracted from the document by the skill. \
 * {@link KnownDocumentIntelligenceLayoutSkillExtractionOptions} can be used interchangeably with DocumentIntelligenceLayoutSkillExtractionOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **images**: Specify that image content should be extracted from the document. \
 * **locationMetadata**: Specify that location metadata should be extracted from the document.
 */
export type DocumentIntelligenceLayoutSkillExtractionOptions = string;

/** Controls the cardinality for chunking the content. */
export interface DocumentIntelligenceLayoutSkillChunkingProperties {
  /** The unit of the chunk. */
  unit?: DocumentIntelligenceLayoutSkillChunkingUnit;
  /** The maximum chunk length in characters. Default is 500. */
  maximumLength?: number;
  /** The length of overlap provided between two text chunks. Default is 0. */
  overlapLength?: number;
}

export function documentIntelligenceLayoutSkillChunkingPropertiesSerializer(
  item: DocumentIntelligenceLayoutSkillChunkingProperties,
): any {
  return {
    unit: item["unit"],
    maximumLength: item["maximumLength"],
    overlapLength: item["overlapLength"],
  };
}

export function documentIntelligenceLayoutSkillChunkingPropertiesDeserializer(
  item: any,
): DocumentIntelligenceLayoutSkillChunkingProperties {
  return {
    unit: item["unit"],
    maximumLength: item["maximumLength"],
    overlapLength: item["overlapLength"],
  };
}

/** Controls the cardinality of the chunk unit. Default is 'characters' */
export enum KnownDocumentIntelligenceLayoutSkillChunkingUnit {
  /** Specifies chunk by characters. */
  Characters = "characters",
}

/**
 * Controls the cardinality of the chunk unit. Default is 'characters' \
 * {@link KnownDocumentIntelligenceLayoutSkillChunkingUnit} can be used interchangeably with DocumentIntelligenceLayoutSkillChunkingUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **characters**: Specifies chunk by characters.
 */
export type DocumentIntelligenceLayoutSkillChunkingUnit = string;

/** A skill that can call a Web API endpoint, allowing you to extend a skillset by having it call your custom code. */
export interface WebApiSkill extends SearchIndexerSkill {
  /** The url for the Web API. */
  uri: string;
  /** The headers required to make the http request. */
  httpHeaders?: WebApiHttpHeaders;
  /** The method for the http request. */
  httpMethod?: string;
  /** The desired timeout for the request. Default is 30 seconds. */
  timeout?: string;
  /** The desired batch size which indicates number of documents. */
  batchSize?: number;
  /** If set, the number of parallel calls that can be made to the Web API. */
  degreeOfParallelism?: number;
  /** Applies to custom skills that connect to external code in an Azure function or some other application that provides the transformations. This value should be the application ID created for the function or app when it was registered with Azure Active Directory. When specified, the custom skill connects to the function or app using a managed ID (either system or user-assigned) of the search service and the access token of the function or app, using this value as the resource id for creating the scope of the access token. */
  authResourceId?: string;
  /** The user-assigned managed identity used for outbound connections. If an authResourceId is provided and it's not specified, the system-assigned managed identity is used. On updates to the indexer, if the identity is unspecified, the value remains unchanged. If set to "none", the value of this property is cleared. */
  authIdentity?: SearchIndexerDataIdentityUnion;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Custom.WebApiSkill";
}

export function webApiSkillSerializer(item: WebApiSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    uri: item["uri"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : webApiHttpHeadersSerializer(item["httpHeaders"]),
    httpMethod: item["httpMethod"],
    timeout: item["timeout"],
    batchSize: item["batchSize"],
    degreeOfParallelism: item["degreeOfParallelism"],
    authResourceId: item["authResourceId"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionSerializer(item["authIdentity"]),
  };
}

export function webApiSkillDeserializer(item: any): WebApiSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    uri: item["uri"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : webApiHttpHeadersDeserializer(item["httpHeaders"]),
    httpMethod: item["httpMethod"],
    timeout: item["timeout"],
    batchSize: item["batchSize"],
    degreeOfParallelism: item["degreeOfParallelism"],
    authResourceId: item["authResourceId"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionDeserializer(item["authIdentity"]),
  };
}

/** A dictionary of http request headers. */
export interface WebApiHttpHeaders {
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function webApiHttpHeadersSerializer(item: WebApiHttpHeaders): any {
  return { ...serializeRecord(item.additionalProperties ?? {}) };
}

export function webApiHttpHeadersDeserializer(item: any): WebApiHttpHeaders {
  return {
    additionalProperties: serializeRecord(item, []),
  };
}

/** The AML skill allows you to extend AI enrichment with a custom Azure Machine Learning (AML) model. Once an AML model is trained and deployed, an AML skill integrates it into AI enrichment. */
export interface AzureMachineLearningSkill extends SearchIndexerSkill {
  /** (Required for no authentication or key authentication) The scoring URI of the AML service to which the JSON payload will be sent. Only the https URI scheme is allowed. */
  scoringUri?: string;
  /** (Required for key authentication) The key for the AML service. */
  authenticationKey?: string;
  /** (Required for token authentication). The Azure Resource Manager resource ID of the AML service. It should be in the format subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.MachineLearningServices/workspaces/{workspace-name}/services/{service_name}. */
  resourceId?: string;
  /** (Optional) When specified, indicates the timeout for the http client making the API call. */
  timeout?: string;
  /** (Optional for token authentication). The region the AML service is deployed in. */
  region?: string;
  /** (Optional) When specified, indicates the number of calls the indexer will make in parallel to the endpoint you have provided. You can decrease this value if your endpoint is failing under too high of a request load, or raise it if your endpoint is able to accept more requests and you would like an increase in the performance of the indexer. If not set, a default value of 5 is used. The degreeOfParallelism can be set to a maximum of 10 and a minimum of 1. */
  degreeOfParallelism?: number;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Custom.AmlSkill";
}

export function azureMachineLearningSkillSerializer(item: AzureMachineLearningSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    uri: item["scoringUri"],
    key: item["authenticationKey"],
    resourceId: item["resourceId"],
    timeout: item["timeout"],
    region: item["region"],
    degreeOfParallelism: item["degreeOfParallelism"],
  };
}

export function azureMachineLearningSkillDeserializer(item: any): AzureMachineLearningSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    scoringUri: item["uri"],
    authenticationKey: item["key"],
    resourceId: item["resourceId"],
    timeout: item["timeout"],
    region: item["region"],
    degreeOfParallelism: item["degreeOfParallelism"],
  };
}

/** Allows you to generate a vector embedding for a given text input using the Azure OpenAI resource. */
export interface AzureOpenAIEmbeddingSkill extends SearchIndexerSkill {
  /** The resource URI of the Azure OpenAI resource. */
  resourceUrl?: string;
  /** ID of the Azure OpenAI model deployment on the designated resource. */
  deploymentId?: string;
  /** API key of the designated Azure OpenAI resource. */
  apiKey?: string;
  /** The user-assigned managed identity used for outbound connections. */
  authIdentity?: SearchIndexerDataIdentityUnion;
  /** The name of the embedding model that is deployed at the provided deploymentId path. */
  modelName?: AzureOpenAIModelName;
  /** The number of dimensions the resulting output embeddings should have. Only supported in text-embedding-3 and later models. */
  dimensions?: number;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Text.AzureOpenAIEmbeddingSkill";
}

export function azureOpenAIEmbeddingSkillSerializer(item: AzureOpenAIEmbeddingSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    resourceUri: item["resourceUrl"],
    deploymentId: item["deploymentId"],
    apiKey: item["apiKey"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionSerializer(item["authIdentity"]),
    modelName: item["modelName"],
    dimensions: item["dimensions"],
  };
}

export function azureOpenAIEmbeddingSkillDeserializer(item: any): AzureOpenAIEmbeddingSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    resourceUrl: item["resourceUri"],
    deploymentId: item["deploymentId"],
    apiKey: item["apiKey"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionDeserializer(item["authIdentity"]),
    modelName: item["modelName"],
    dimensions: item["dimensions"],
  };
}

/** Allows you to generate a vector embedding for a given image or text input using the Azure AI Services Vision Vectorize API. */
export interface VisionVectorizeSkill extends SearchIndexerSkill {
  /** The version of the model to use when calling the AI Services Vision service. It will default to the latest available when not specified. */
  modelVersion: string | null;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Vision.VectorizeSkill";
}

export function visionVectorizeSkillSerializer(item: VisionVectorizeSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    modelVersion: item["modelVersion"],
  };
}

export function visionVectorizeSkillDeserializer(item: any): VisionVectorizeSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    modelVersion: item["modelVersion"],
  };
}

/** A skill that leverages Azure AI Content Understanding to process and extract structured insights from documents, enabling enriched, searchable content for enhanced document indexing and retrieval. */
export interface ContentUnderstandingSkill extends SearchIndexerSkill {
  /** Controls the cardinality of the content extracted from the document by the skill. */
  extractionOptions?: ContentUnderstandingSkillExtractionOptions[];
  /** Controls the cardinality for chunking the content. */
  chunkingProperties?: ContentUnderstandingSkillChunkingProperties;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Util.ContentUnderstandingSkill";
}

export function contentUnderstandingSkillSerializer(item: ContentUnderstandingSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    extractionOptions: !item["extractionOptions"]
      ? item["extractionOptions"]
      : item["extractionOptions"].map((p: any) => {
          return p;
        }),
    chunkingProperties: !item["chunkingProperties"]
      ? item["chunkingProperties"]
      : contentUnderstandingSkillChunkingPropertiesSerializer(item["chunkingProperties"]),
  };
}

export function contentUnderstandingSkillDeserializer(item: any): ContentUnderstandingSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    extractionOptions: !item["extractionOptions"]
      ? item["extractionOptions"]
      : item["extractionOptions"].map((p1: any) => {
          return p1;
        }),
    chunkingProperties: !item["chunkingProperties"]
      ? item["chunkingProperties"]
      : contentUnderstandingSkillChunkingPropertiesDeserializer(item["chunkingProperties"]),
  };
}

/** Controls the cardinality of the content extracted from the document by the skill. */
export enum KnownContentUnderstandingSkillExtractionOptions {
  /** Specify that image content should be extracted from the document. */
  Images = "images",
  /** Specify that location metadata should be extracted from the document. */
  LocationMetadata = "locationMetadata",
}

/**
 * Controls the cardinality of the content extracted from the document by the skill. \
 * {@link KnownContentUnderstandingSkillExtractionOptions} can be used interchangeably with ContentUnderstandingSkillExtractionOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **images**: Specify that image content should be extracted from the document. \
 * **locationMetadata**: Specify that location metadata should be extracted from the document.
 */
export type ContentUnderstandingSkillExtractionOptions = string;

/** Controls the cardinality for chunking the content. */
export interface ContentUnderstandingSkillChunkingProperties {
  /** The unit of the chunk. */
  unit?: ContentUnderstandingSkillChunkingUnit;
  /** The maximum chunk length in characters. Default is 500. */
  maximumLength?: number;
  /** The length of overlap provided between two text chunks. Default is 0. */
  overlapLength?: number;
}

export function contentUnderstandingSkillChunkingPropertiesSerializer(
  item: ContentUnderstandingSkillChunkingProperties,
): any {
  return {
    unit: item["unit"],
    maximumLength: item["maximumLength"],
    overlapLength: item["overlapLength"],
  };
}

export function contentUnderstandingSkillChunkingPropertiesDeserializer(
  item: any,
): ContentUnderstandingSkillChunkingProperties {
  return {
    unit: item["unit"],
    maximumLength: item["maximumLength"],
    overlapLength: item["overlapLength"],
  };
}

/** Controls the cardinality of the chunk unit. Default is 'characters' */
export enum KnownContentUnderstandingSkillChunkingUnit {
  /** Specifies chunk by characters. */
  Characters = "characters",
}

/**
 * Controls the cardinality of the chunk unit. Default is 'characters' \
 * {@link KnownContentUnderstandingSkillChunkingUnit} can be used interchangeably with ContentUnderstandingSkillChunkingUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **characters**: Specifies chunk by characters.
 */
export type ContentUnderstandingSkillChunkingUnit = string;

/** A skill that calls a language model via Azure AI Foundry's Chat Completions endpoint. */
export interface ChatCompletionSkill extends SearchIndexerSkill {
  /** The url for the Web API. */
  uri: string;
  /** The headers required to make the http request. */
  httpHeaders?: WebApiHttpHeaders;
  /** The method for the http request. */
  httpMethod?: string;
  /** The desired timeout for the request. Default is 30 seconds. */
  timeout?: string;
  /** The desired batch size which indicates number of documents. */
  batchSize?: number;
  /** If set, the number of parallel calls that can be made to the Web API. */
  degreeOfParallelism?: number;
  /** Applies to custom skills that connect to external code in an Azure function or some other application that provides the transformations. This value should be the application ID created for the function or app when it was registered with Azure Active Directory. When specified, the custom skill connects to the function or app using a managed ID (either system or user-assigned) of the search service and the access token of the function or app, using this value as the resource id for creating the scope of the access token. */
  authResourceId?: string;
  /** The user-assigned managed identity used for outbound connections. If an authResourceId is provided and it's not specified, the system-assigned managed identity is used. On updates to the indexer, if the identity is unspecified, the value remains unchanged. If set to "none", the value of this property is cleared. */
  authIdentity?: SearchIndexerDataIdentityUnion;
  /** API key for authenticating to the model. Both apiKey and authIdentity cannot be specified at the same time. */
  apiKey?: string;
  /** Common language model parameters that customers can tweak. If omitted, reasonable defaults will be applied. */
  commonModelParameters?: CommonModelParameters;
  /** Open-type dictionary for model-specific parameters that should be appended to the chat completions call. Follows Azure AI Foundry's extensibility pattern. */
  extraParameters?: Record<string, any>;
  /** How extra parameters are handled by Azure AI Foundry. Default is 'error'. */
  extraParametersBehavior?: ChatCompletionExtraParametersBehavior;
  /** Determines how the LLM should format its response. Defaults to 'text' response type. */
  responseFormat?: ChatCompletionResponseFormat;
  /** A URI fragment specifying the type of skill. */
  odatatype: "#Microsoft.Skills.Custom.ChatCompletionSkill";
}

export function chatCompletionSkillSerializer(item: ChatCompletionSkill): any {
  return {
    "@odata.type": item["odatatype"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
    outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    uri: item["uri"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : webApiHttpHeadersSerializer(item["httpHeaders"]),
    httpMethod: item["httpMethod"],
    timeout: item["timeout"],
    batchSize: item["batchSize"],
    degreeOfParallelism: item["degreeOfParallelism"],
    authResourceId: item["authResourceId"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionSerializer(item["authIdentity"]),
    apiKey: item["apiKey"],
    commonModelParameters: !item["commonModelParameters"]
      ? item["commonModelParameters"]
      : commonModelParametersSerializer(item["commonModelParameters"]),
    extraParameters: item["extraParameters"],
    extraParametersBehavior: item["extraParametersBehavior"],
    responseFormat: !item["responseFormat"]
      ? item["responseFormat"]
      : chatCompletionResponseFormatSerializer(item["responseFormat"]),
  };
}

export function chatCompletionSkillDeserializer(item: any): ChatCompletionSkill {
  return {
    odatatype: item["@odata.type"],
    name: item["name"],
    description: item["description"],
    context: item["context"],
    inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    uri: item["uri"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : webApiHttpHeadersDeserializer(item["httpHeaders"]),
    httpMethod: item["httpMethod"],
    timeout: item["timeout"],
    batchSize: item["batchSize"],
    degreeOfParallelism: item["degreeOfParallelism"],
    authResourceId: item["authResourceId"],
    authIdentity: !item["authIdentity"]
      ? item["authIdentity"]
      : searchIndexerDataIdentityUnionDeserializer(item["authIdentity"]),
    apiKey: item["apiKey"],
    commonModelParameters: !item["commonModelParameters"]
      ? item["commonModelParameters"]
      : commonModelParametersDeserializer(item["commonModelParameters"]),
    extraParameters: !item["extraParameters"]
      ? item["extraParameters"]
      : Object.fromEntries(
          Object.entries(item["extraParameters"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    extraParametersBehavior: item["extraParametersBehavior"],
    responseFormat: !item["responseFormat"]
      ? item["responseFormat"]
      : chatCompletionResponseFormatDeserializer(item["responseFormat"]),
  };
}

/** Common language model parameters for Chat Completions. If omitted, default values are used. */
export interface CommonModelParameters {
  /** The name of the model to use (e.g., 'gpt-4o', etc.). Default is null if not specified. */
  model?: string;
  /** A float in the range [-2,2] that reduces or increases likelihood of repeated tokens. Default is 0. */
  frequencyPenalty?: number;
  /** A float in the range [-2,2] that penalizes new tokens based on their existing presence. Default is 0. */
  presencePenalty?: number;
  /** Maximum number of tokens to generate. */
  maxTokens?: number;
  /** Sampling temperature. Default is 0.7. */
  temperature?: number;
  /** Random seed for controlling deterministic outputs. If omitted, randomization is used. */
  seed?: number;
  /** List of stop sequences that will cut off text generation. Default is none. */
  stop?: string[];
}

export function commonModelParametersSerializer(item: CommonModelParameters): any {
  return {
    model: item["model"],
    frequencyPenalty: item["frequencyPenalty"],
    presencePenalty: item["presencePenalty"],
    maxTokens: item["maxTokens"],
    temperature: item["temperature"],
    seed: item["seed"],
    stop: !item["stop"]
      ? item["stop"]
      : item["stop"].map((p: any) => {
          return p;
        }),
  };
}

export function commonModelParametersDeserializer(item: any): CommonModelParameters {
  return {
    model: item["model"],
    frequencyPenalty: item["frequencyPenalty"],
    presencePenalty: item["presencePenalty"],
    maxTokens: item["maxTokens"],
    temperature: item["temperature"],
    seed: item["seed"],
    stop: !item["stop"]
      ? item["stop"]
      : item["stop"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Specifies how 'extraParameters' should be handled by Azure AI Foundry. Defaults to 'error'. */
export enum KnownChatCompletionExtraParametersBehavior {
  /** Passes any extra parameters directly to the model. */
  PassThrough = "passThrough",
  /** Drops all extra parameters. */
  Drop = "drop",
  /** Raises an error if any extra parameter is present. */
  Error = "error",
}

/**
 * Specifies how 'extraParameters' should be handled by Azure AI Foundry. Defaults to 'error'. \
 * {@link KnownChatCompletionExtraParametersBehavior} can be used interchangeably with ChatCompletionExtraParametersBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **passThrough**: Passes any extra parameters directly to the model. \
 * **drop**: Drops all extra parameters. \
 * **error**: Raises an error if any extra parameter is present.
 */
export type ChatCompletionExtraParametersBehavior = string;

/** Determines how the language model's response should be serialized. Defaults to 'text'. */
export interface ChatCompletionResponseFormat {
  /** Specifies how the LLM should format the response. */
  type?: ChatCompletionResponseFormatType;
  /** An open dictionary for extended properties. Required if 'type' == 'json_schema' */
  chatCompletionSchemaProperties?: ChatCompletionSchemaProperties;
}

export function chatCompletionResponseFormatSerializer(item: ChatCompletionResponseFormat): any {
  return {
    type: item["type"],
    jsonSchemaProperties: !item["chatCompletionSchemaProperties"]
      ? item["chatCompletionSchemaProperties"]
      : chatCompletionSchemaPropertiesSerializer(item["chatCompletionSchemaProperties"]),
  };
}

export function chatCompletionResponseFormatDeserializer(item: any): ChatCompletionResponseFormat {
  return {
    type: item["type"],
    chatCompletionSchemaProperties: !item["jsonSchemaProperties"]
      ? item["jsonSchemaProperties"]
      : chatCompletionSchemaPropertiesDeserializer(item["jsonSchemaProperties"]),
  };
}

/** Specifies how the LLM should format the response. */
export enum KnownChatCompletionResponseFormatType {
  /** Plain text response format. */
  Text = "text",
  /** Arbitrary JSON object response format. */
  JsonObject = "jsonObject",
  /** JSON schema-adhering response format. */
  JsonSchema = "jsonSchema",
}

/**
 * Specifies how the LLM should format the response. \
 * {@link KnownChatCompletionResponseFormatType} can be used interchangeably with ChatCompletionResponseFormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **text**: Plain text response format. \
 * **jsonObject**: Arbitrary JSON object response format. \
 * **jsonSchema**: JSON schema-adhering response format.
 */
export type ChatCompletionResponseFormatType = string;

/** Properties for JSON schema response format. */
export interface ChatCompletionSchemaProperties {
  /** Name of the json schema the model will adhere to. */
  name?: string;
  /** Description of the json schema the model will adhere to. */
  description?: string;
  /** Whether or not the model's response should use structured outputs. Default is true. */
  strict?: boolean;
  /** The schema definition. */
  schema?: ChatCompletionSchema;
}

export function chatCompletionSchemaPropertiesSerializer(
  item: ChatCompletionSchemaProperties,
): any {
  return {
    name: item["name"],
    description: item["description"],
    strict: item["strict"],
    schema: !item["schema"] ? item["schema"] : chatCompletionSchemaSerializer(item["schema"]),
  };
}

export function chatCompletionSchemaPropertiesDeserializer(
  item: any,
): ChatCompletionSchemaProperties {
  return {
    name: item["name"],
    description: item["description"],
    strict: item["strict"],
    schema: !item["schema"] ? item["schema"] : chatCompletionSchemaDeserializer(item["schema"]),
  };
}

/** Object defining the custom schema the model will use to structure its output. */
export interface ChatCompletionSchema {
  /** Type of schema representation. Usually 'object'. Default is 'object'. */
  type?: string;
  /** A JSON-formatted string that defines the output schema's properties and constraints for the model. */
  properties?: string;
  /** An array of the property names that are required to be part of the model's response. All properties must be included for structured outputs. */
  required?: string[];
  /** Controls whether it is allowable for an object to contain additional keys / values that were not defined in the JSON Schema. Default is false. */
  additionalProperties?: boolean;
}

export function chatCompletionSchemaSerializer(item: ChatCompletionSchema): any {
  return {
    type: item["type"],
    properties: item["properties"],
    required: !item["required"]
      ? item["required"]
      : item["required"].map((p: any) => {
          return p;
        }),
    additionalProperties: item["additionalProperties"],
  };
}

export function chatCompletionSchemaDeserializer(item: any): ChatCompletionSchema {
  return {
    type: item["type"],
    properties: item["properties"],
    required: !item["required"]
      ? item["required"]
      : item["required"].map((p: any) => {
          return p;
        }),
    additionalProperties: item["additionalProperties"],
  };
}

/** Base type for describing any Azure AI service resource attached to a skillset. */
export interface CognitiveServicesAccount {
  /** The discriminator for derived types. */
  /** The discriminator possible values: #Microsoft.Azure.Search.DefaultCognitiveServices, #Microsoft.Azure.Search.CognitiveServicesByKey, #Microsoft.Azure.Search.AIServicesByKey, #Microsoft.Azure.Search.AIServicesByIdentity */
  odatatype: string;
  /** Description of the Azure AI service resource attached to a skillset. */
  description?: string;
}

export function cognitiveServicesAccountSerializer(item: CognitiveServicesAccount): any {
  return { "@odata.type": item["odatatype"], description: item["description"] };
}

export function cognitiveServicesAccountDeserializer(item: any): CognitiveServicesAccount {
  return {
    odatatype: item["@odata.type"],
    description: item["description"],
  };
}

/** Alias for CognitiveServicesAccountUnion */
export type CognitiveServicesAccountUnion =
  | DefaultCognitiveServicesAccount
  | CognitiveServicesAccountKey
  | AIServicesAccountKey
  | AIServicesAccountIdentity
  | CognitiveServicesAccount;

export function cognitiveServicesAccountUnionSerializer(item: CognitiveServicesAccountUnion): any {
  switch (item.odatatype) {
    case "#Microsoft.Azure.Search.DefaultCognitiveServices":
      return defaultCognitiveServicesAccountSerializer(item as DefaultCognitiveServicesAccount);

    case "#Microsoft.Azure.Search.CognitiveServicesByKey":
      return cognitiveServicesAccountKeySerializer(item as CognitiveServicesAccountKey);

    case "#Microsoft.Azure.Search.AIServicesByKey":
      return aiServicesAccountKeySerializer(item as AIServicesAccountKey);

    case "#Microsoft.Azure.Search.AIServicesByIdentity":
      return aiServicesAccountIdentitySerializer(item as AIServicesAccountIdentity);

    default:
      return cognitiveServicesAccountSerializer(item);
  }
}

export function cognitiveServicesAccountUnionDeserializer(
  item: any,
): CognitiveServicesAccountUnion {
  switch (item["@odata.type"]) {
    case "#Microsoft.Azure.Search.DefaultCognitiveServices":
      return defaultCognitiveServicesAccountDeserializer(item as DefaultCognitiveServicesAccount);

    case "#Microsoft.Azure.Search.CognitiveServicesByKey":
      return cognitiveServicesAccountKeyDeserializer(item as CognitiveServicesAccountKey);

    case "#Microsoft.Azure.Search.AIServicesByKey":
      return aiServicesAccountKeyDeserializer(item as AIServicesAccountKey);

    case "#Microsoft.Azure.Search.AIServicesByIdentity":
      return aiServicesAccountIdentityDeserializer(item as AIServicesAccountIdentity);

    default:
      return cognitiveServicesAccountDeserializer(item);
  }
}

/** An empty object that represents the default Azure AI service resource for a skillset. */
export interface DefaultCognitiveServicesAccount extends CognitiveServicesAccount {
  /** A URI fragment specifying the type of Azure AI service resource attached to a skillset. */
  odatatype: "#Microsoft.Azure.Search.DefaultCognitiveServices";
}

export function defaultCognitiveServicesAccountSerializer(
  item: DefaultCognitiveServicesAccount,
): any {
  return { "@odata.type": item["odatatype"], description: item["description"] };
}

export function defaultCognitiveServicesAccountDeserializer(
  item: any,
): DefaultCognitiveServicesAccount {
  return {
    odatatype: item["@odata.type"],
    description: item["description"],
  };
}

/** The multi-region account key of an Azure AI service resource that's attached to a skillset. */
export interface CognitiveServicesAccountKey extends CognitiveServicesAccount {
  /** The key used to provision the Azure AI service resource attached to a skillset. */
  key: string;
  /** A URI fragment specifying the type of Azure AI service resource attached to a skillset. */
  odatatype: "#Microsoft.Azure.Search.CognitiveServicesByKey";
}

export function cognitiveServicesAccountKeySerializer(item: CognitiveServicesAccountKey): any {
  return { "@odata.type": item["odatatype"], description: item["description"], key: item["key"] };
}

export function cognitiveServicesAccountKeyDeserializer(item: any): CognitiveServicesAccountKey {
  return {
    odatatype: item["@odata.type"],
    description: item["description"],
    key: item["key"],
  };
}

/** The account key of an Azure AI service resource that's attached to a skillset, to be used with the resource's subdomain. */
export interface AIServicesAccountKey extends CognitiveServicesAccount {
  /** The key used to provision the Azure AI service resource attached to a skillset. */
  key: string;
  /** The subdomain url for the corresponding AI Service. */
  subdomainUrl: string;
  /** A URI fragment specifying the type of Azure AI service resource attached to a skillset. */
  odatatype: "#Microsoft.Azure.Search.AIServicesByKey";
}

export function aiServicesAccountKeySerializer(item: AIServicesAccountKey): any {
  return {
    "@odata.type": item["odatatype"],
    description: item["description"],
    key: item["key"],
    subdomainUrl: item["subdomainUrl"],
  };
}

export function aiServicesAccountKeyDeserializer(item: any): AIServicesAccountKey {
  return {
    odatatype: item["@odata.type"],
    description: item["description"],
    key: item["key"],
    subdomainUrl: item["subdomainUrl"],
  };
}

/** The multi-region account of an Azure AI service resource that's attached to a skillset. */
export interface AIServicesAccountIdentity extends CognitiveServicesAccount {
  /** The user-assigned managed identity used for connections to AI Service. If not specified, the system-assigned managed identity is used. On updates to the skillset, if the identity is unspecified, the value remains unchanged. If set to "none", the value of this property is cleared. */
  identity?: SearchIndexerDataIdentityUnion;
  /** The subdomain url for the corresponding AI Service. */
  subdomainUrl: string;
  /** A URI fragment specifying the type of Azure AI service resource attached to a skillset. */
  odatatype: "#Microsoft.Azure.Search.AIServicesByIdentity";
}

export function aiServicesAccountIdentitySerializer(item: AIServicesAccountIdentity): any {
  return {
    "@odata.type": item["odatatype"],
    description: item["description"],
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionSerializer(item["identity"]),
    subdomainUrl: item["subdomainUrl"],
  };
}

export function aiServicesAccountIdentityDeserializer(item: any): AIServicesAccountIdentity {
  return {
    odatatype: item["@odata.type"],
    description: item["description"],
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
    subdomainUrl: item["subdomainUrl"],
  };
}

/** Definition of additional projections to azure blob, table, or files, of enriched data. */
export interface SearchIndexerKnowledgeStore {
  /** The connection string to the storage account projections will be stored in. */
  storageConnectionString: string;
  /** A list of additional projections to perform during indexing. */
  projections: SearchIndexerKnowledgeStoreProjection[];
  /** The user-assigned managed identity used for connections to Azure Storage when writing knowledge store projections. If the connection string indicates an identity (ResourceId) and it's not specified, the system-assigned managed identity is used. On updates to the indexer, if the identity is unspecified, the value remains unchanged. If set to "none", the value of this property is cleared. */
  identity?: SearchIndexerDataIdentityUnion;
  /** A dictionary of knowledge store-specific configuration properties. Each name is the name of a specific property. Each value must be of a primitive type. */
  parameters?: SearchIndexerKnowledgeStoreParameters;
}

export function searchIndexerKnowledgeStoreSerializer(item: SearchIndexerKnowledgeStore): any {
  return {
    storageConnectionString: item["storageConnectionString"],
    projections: searchIndexerKnowledgeStoreProjectionArraySerializer(item["projections"]),
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionSerializer(item["identity"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : searchIndexerKnowledgeStoreParametersSerializer(item["parameters"]),
  };
}

export function searchIndexerKnowledgeStoreDeserializer(item: any): SearchIndexerKnowledgeStore {
  return {
    storageConnectionString: item["storageConnectionString"],
    projections: searchIndexerKnowledgeStoreProjectionArrayDeserializer(item["projections"]),
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : searchIndexerKnowledgeStoreParametersDeserializer(item["parameters"]),
  };
}

export function searchIndexerKnowledgeStoreProjectionArraySerializer(
  result: Array<SearchIndexerKnowledgeStoreProjection>,
): any[] {
  return result.map((item) => {
    return searchIndexerKnowledgeStoreProjectionSerializer(item);
  });
}

export function searchIndexerKnowledgeStoreProjectionArrayDeserializer(
  result: Array<SearchIndexerKnowledgeStoreProjection>,
): any[] {
  return result.map((item) => {
    return searchIndexerKnowledgeStoreProjectionDeserializer(item);
  });
}

/** Container object for various projection selectors. */
export interface SearchIndexerKnowledgeStoreProjection {
  /** Projections to Azure Table storage. */
  tables?: SearchIndexerKnowledgeStoreTableProjectionSelector[];
  /** Projections to Azure Blob storage. */
  objects?: SearchIndexerKnowledgeStoreObjectProjectionSelector[];
  /** Projections to Azure File storage. */
  files?: SearchIndexerKnowledgeStoreFileProjectionSelector[];
}

export function searchIndexerKnowledgeStoreProjectionSerializer(
  item: SearchIndexerKnowledgeStoreProjection,
): any {
  return {
    tables: !item["tables"]
      ? item["tables"]
      : searchIndexerKnowledgeStoreTableProjectionSelectorArraySerializer(item["tables"]),
    objects: !item["objects"]
      ? item["objects"]
      : searchIndexerKnowledgeStoreObjectProjectionSelectorArraySerializer(item["objects"]),
    files: !item["files"]
      ? item["files"]
      : searchIndexerKnowledgeStoreFileProjectionSelectorArraySerializer(item["files"]),
  };
}

export function searchIndexerKnowledgeStoreProjectionDeserializer(
  item: any,
): SearchIndexerKnowledgeStoreProjection {
  return {
    tables: !item["tables"]
      ? item["tables"]
      : searchIndexerKnowledgeStoreTableProjectionSelectorArrayDeserializer(item["tables"]),
    objects: !item["objects"]
      ? item["objects"]
      : searchIndexerKnowledgeStoreObjectProjectionSelectorArrayDeserializer(item["objects"]),
    files: !item["files"]
      ? item["files"]
      : searchIndexerKnowledgeStoreFileProjectionSelectorArrayDeserializer(item["files"]),
  };
}

export function searchIndexerKnowledgeStoreTableProjectionSelectorArraySerializer(
  result: Array<SearchIndexerKnowledgeStoreTableProjectionSelector>,
): any[] {
  return result.map((item) => {
    return searchIndexerKnowledgeStoreTableProjectionSelectorSerializer(item);
  });
}

export function searchIndexerKnowledgeStoreTableProjectionSelectorArrayDeserializer(
  result: Array<SearchIndexerKnowledgeStoreTableProjectionSelector>,
): any[] {
  return result.map((item) => {
    return searchIndexerKnowledgeStoreTableProjectionSelectorDeserializer(item);
  });
}

/** Description for what data to store in Azure Tables. */
export interface SearchIndexerKnowledgeStoreTableProjectionSelector extends SearchIndexerKnowledgeStoreProjectionSelector {
  /** Name of generated key to store projection under. */
  generatedKeyName: string;
  /** Name of the Azure table to store projected data in. */
  tableName: string;
}

export function searchIndexerKnowledgeStoreTableProjectionSelectorSerializer(
  item: SearchIndexerKnowledgeStoreTableProjectionSelector,
): any {
  return {
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArraySerializer(item["inputs"]),
    tableName: item["tableName"],
  };
}

export function searchIndexerKnowledgeStoreTableProjectionSelectorDeserializer(
  item: any,
): SearchIndexerKnowledgeStoreTableProjectionSelector {
  return {
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    tableName: item["tableName"],
  };
}

export function searchIndexerKnowledgeStoreObjectProjectionSelectorArraySerializer(
  result: Array<SearchIndexerKnowledgeStoreObjectProjectionSelector>,
): any[] {
  return result.map((item) => {
    return searchIndexerKnowledgeStoreObjectProjectionSelectorSerializer(item);
  });
}

export function searchIndexerKnowledgeStoreObjectProjectionSelectorArrayDeserializer(
  result: Array<SearchIndexerKnowledgeStoreObjectProjectionSelector>,
): any[] {
  return result.map((item) => {
    return searchIndexerKnowledgeStoreObjectProjectionSelectorDeserializer(item);
  });
}

/** Projection definition for what data to store in Azure Blob. */
export interface SearchIndexerKnowledgeStoreObjectProjectionSelector extends SearchIndexerKnowledgeStoreBlobProjectionSelector {}

export function searchIndexerKnowledgeStoreObjectProjectionSelectorSerializer(
  item: SearchIndexerKnowledgeStoreObjectProjectionSelector,
): any {
  return {
    storageContainer: item["storageContainer"],
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArraySerializer(item["inputs"]),
  };
}

export function searchIndexerKnowledgeStoreObjectProjectionSelectorDeserializer(
  item: any,
): SearchIndexerKnowledgeStoreObjectProjectionSelector {
  return {
    storageContainer: item["storageContainer"],
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArrayDeserializer(item["inputs"]),
  };
}

export function searchIndexerKnowledgeStoreFileProjectionSelectorArraySerializer(
  result: Array<SearchIndexerKnowledgeStoreFileProjectionSelector>,
): any[] {
  return result.map((item) => {
    return searchIndexerKnowledgeStoreFileProjectionSelectorSerializer(item);
  });
}

export function searchIndexerKnowledgeStoreFileProjectionSelectorArrayDeserializer(
  result: Array<SearchIndexerKnowledgeStoreFileProjectionSelector>,
): any[] {
  return result.map((item) => {
    return searchIndexerKnowledgeStoreFileProjectionSelectorDeserializer(item);
  });
}

/** Projection definition for what data to store in Azure Files. */
export interface SearchIndexerKnowledgeStoreFileProjectionSelector extends SearchIndexerKnowledgeStoreBlobProjectionSelector {}

export function searchIndexerKnowledgeStoreFileProjectionSelectorSerializer(
  item: SearchIndexerKnowledgeStoreFileProjectionSelector,
): any {
  return {
    storageContainer: item["storageContainer"],
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArraySerializer(item["inputs"]),
  };
}

export function searchIndexerKnowledgeStoreFileProjectionSelectorDeserializer(
  item: any,
): SearchIndexerKnowledgeStoreFileProjectionSelector {
  return {
    storageContainer: item["storageContainer"],
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArrayDeserializer(item["inputs"]),
  };
}

/** A dictionary of knowledge store-specific configuration properties. Each name is the name of a specific property. Each value must be of a primitive type. */
export interface SearchIndexerKnowledgeStoreParameters {
  /** Whether or not projections should synthesize a generated key name if one isn't already present. */
  synthesizeGeneratedKeyName?: boolean;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function searchIndexerKnowledgeStoreParametersSerializer(
  item: SearchIndexerKnowledgeStoreParameters,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    synthesizeGeneratedKeyName: item["synthesizeGeneratedKeyName"],
  };
}

export function searchIndexerKnowledgeStoreParametersDeserializer(
  item: any,
): SearchIndexerKnowledgeStoreParameters {
  return {
    additionalProperties: serializeRecord(item, ["synthesizeGeneratedKeyName"]),
    synthesizeGeneratedKeyName: item["synthesizeGeneratedKeyName"],
  };
}

/** Definition of additional projections to secondary search indexes. */
export interface SearchIndexerIndexProjection {
  /** A list of projections to be performed to secondary search indexes. */
  selectors: SearchIndexerIndexProjectionSelector[];
  /** A dictionary of index projection-specific configuration properties. Each name is the name of a specific property. Each value must be of a primitive type. */
  parameters?: SearchIndexerIndexProjectionsParameters;
}

export function searchIndexerIndexProjectionSerializer(item: SearchIndexerIndexProjection): any {
  return {
    selectors: searchIndexerIndexProjectionSelectorArraySerializer(item["selectors"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : searchIndexerIndexProjectionsParametersSerializer(item["parameters"]),
  };
}

export function searchIndexerIndexProjectionDeserializer(item: any): SearchIndexerIndexProjection {
  return {
    selectors: searchIndexerIndexProjectionSelectorArrayDeserializer(item["selectors"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : searchIndexerIndexProjectionsParametersDeserializer(item["parameters"]),
  };
}

export function searchIndexerIndexProjectionSelectorArraySerializer(
  result: Array<SearchIndexerIndexProjectionSelector>,
): any[] {
  return result.map((item) => {
    return searchIndexerIndexProjectionSelectorSerializer(item);
  });
}

export function searchIndexerIndexProjectionSelectorArrayDeserializer(
  result: Array<SearchIndexerIndexProjectionSelector>,
): any[] {
  return result.map((item) => {
    return searchIndexerIndexProjectionSelectorDeserializer(item);
  });
}

/** Description for what data to store in the designated search index. */
export interface SearchIndexerIndexProjectionSelector {
  /** Name of the search index to project to. Must have a key field with the 'keyword' analyzer set. */
  targetIndexName: string;
  /** Name of the field in the search index to map the parent document's key value to. Must be a string field that is filterable and not the key field. */
  parentKeyFieldName: string;
  /** Source context for the projections. Represents the cardinality at which the document will be split into multiple sub documents. */
  sourceContext: string;
  /** Mappings for the projection, or which source should be mapped to which field in the target index. */
  mappings: InputFieldMappingEntry[];
}

export function searchIndexerIndexProjectionSelectorSerializer(
  item: SearchIndexerIndexProjectionSelector,
): any {
  return {
    targetIndexName: item["targetIndexName"],
    parentKeyFieldName: item["parentKeyFieldName"],
    sourceContext: item["sourceContext"],
    mappings: inputFieldMappingEntryArraySerializer(item["mappings"]),
  };
}

export function searchIndexerIndexProjectionSelectorDeserializer(
  item: any,
): SearchIndexerIndexProjectionSelector {
  return {
    targetIndexName: item["targetIndexName"],
    parentKeyFieldName: item["parentKeyFieldName"],
    sourceContext: item["sourceContext"],
    mappings: inputFieldMappingEntryArrayDeserializer(item["mappings"]),
  };
}

/** A dictionary of index projection-specific configuration properties. Each name is the name of a specific property. Each value must be of a primitive type. */
export interface SearchIndexerIndexProjectionsParameters {
  /** Defines behavior of the index projections in relation to the rest of the indexer. */
  projectionMode?: IndexProjectionMode;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function searchIndexerIndexProjectionsParametersSerializer(
  item: SearchIndexerIndexProjectionsParameters,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    projectionMode: item["projectionMode"],
  };
}

export function searchIndexerIndexProjectionsParametersDeserializer(
  item: any,
): SearchIndexerIndexProjectionsParameters {
  return {
    additionalProperties: serializeRecord(item, ["projectionMode"]),
    projectionMode: item["projectionMode"],
  };
}

/** Defines behavior of the index projections in relation to the rest of the indexer. */
export enum KnownIndexProjectionMode {
  /** The source document will be skipped from writing into the indexer's target index. */
  SkipIndexingParentDocuments = "skipIndexingParentDocuments",
  /** The source document will be written into the indexer's target index. This is the default pattern. */
  IncludeIndexingParentDocuments = "includeIndexingParentDocuments",
}

/**
 * Defines behavior of the index projections in relation to the rest of the indexer. \
 * {@link KnownIndexProjectionMode} can be used interchangeably with IndexProjectionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **skipIndexingParentDocuments**: The source document will be skipped from writing into the indexer's target index. \
 * **includeIndexingParentDocuments**: The source document will be written into the indexer's target index. This is the default pattern.
 */
export type IndexProjectionMode = string;

/** Abstract class to share properties between concrete selectors. */
export interface SearchIndexerKnowledgeStoreProjectionSelector {
  /** Name of reference key to different projection. */
  referenceKeyName?: string;
  /** Name of generated key to store projection under. */
  generatedKeyName?: string;
  /** Source data to project. */
  source?: string;
  /** Source context for complex projections. */
  sourceContext?: string;
  /** Nested inputs for complex projections. */
  inputs?: InputFieldMappingEntry[];
}

export function searchIndexerKnowledgeStoreProjectionSelectorSerializer(
  item: SearchIndexerKnowledgeStoreProjectionSelector,
): any {
  return {
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArraySerializer(item["inputs"]),
  };
}

export function searchIndexerKnowledgeStoreProjectionSelectorDeserializer(
  item: any,
): SearchIndexerKnowledgeStoreProjectionSelector {
  return {
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArrayDeserializer(item["inputs"]),
  };
}

/** Abstract class to share properties between concrete selectors. */
export interface SearchIndexerKnowledgeStoreBlobProjectionSelector extends SearchIndexerKnowledgeStoreProjectionSelector {
  /** Blob container to store projections in. */
  storageContainer: string;
}

export function searchIndexerKnowledgeStoreBlobProjectionSelectorSerializer(
  item: SearchIndexerKnowledgeStoreBlobProjectionSelector,
): any {
  return {
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArraySerializer(item["inputs"]),
    storageContainer: item["storageContainer"],
  };
}

export function searchIndexerKnowledgeStoreBlobProjectionSelectorDeserializer(
  item: any,
): SearchIndexerKnowledgeStoreBlobProjectionSelector {
  return {
    referenceKeyName: item["referenceKeyName"],
    generatedKeyName: item["generatedKeyName"],
    source: item["source"],
    sourceContext: item["sourceContext"],
    inputs: !item["inputs"]
      ? item["inputs"]
      : inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    storageContainer: item["storageContainer"],
  };
}

/** Response from a list skillset request. If successful, it includes the full definitions of all skillsets. */
export interface ListSkillsetsResult {
  /** The skillsets defined in the Search service. */
  readonly skillsets: SearchIndexerSkillset[];
}

export function listSkillsetsResultDeserializer(item: any): ListSkillsetsResult {
  return {
    skillsets: searchIndexerSkillsetArrayDeserializer(item["value"]),
  };
}

export function searchIndexerSkillsetArraySerializer(result: Array<SearchIndexerSkillset>): any[] {
  return result.map((item) => {
    return searchIndexerSkillsetSerializer(item);
  });
}

export function searchIndexerSkillsetArrayDeserializer(
  result: Array<SearchIndexerSkillset>,
): any[] {
  return result.map((item) => {
    return searchIndexerSkillsetDeserializer(item);
  });
}

/** The type of the skill names. */
export interface SkillNames {
  /** the names of skills to be reset. */
  skillNames?: string[];
}

export function skillNamesSerializer(item: SkillNames): any {
  return {
    skillNames: !item["skillNames"]
      ? item["skillNames"]
      : item["skillNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _searchResourceEncryptionKeyAccessCredentialsSerializer(
  item: SearchResourceEncryptionKey,
): any {
  return { applicationId: item["applicationId"], applicationSecret: item["applicationSecret"] };
}

export function _searchResourceEncryptionKeyAccessCredentialsDeserializer(item: any) {
  return {
    applicationId: item["applicationId"],
    applicationSecret: item["applicationSecret"],
  };
}

export function _searchIndexerDataSourceConnectionCredentialsSerializer(
  item: SearchIndexerDataSourceConnection,
): any {
  return { connectionString: item["connectionString"] };
}

export function _searchIndexerDataSourceConnectionCredentialsDeserializer(item: any) {
  return {
    connectionString: item["connectionString"],
  };
}
