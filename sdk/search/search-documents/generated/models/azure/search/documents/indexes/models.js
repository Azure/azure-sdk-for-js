// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { buildNewlineCollection } from "../../../../../static-helpers/serialization/build-newline-collection.js";
import { buildPipeCollection } from "../../../../../static-helpers/serialization/build-pipe-collection.js";
import { areAllPropsUndefined } from "../../../../../static-helpers/serialization/check-prop-undefined.js";
import { parseNewlineCollection } from "../../../../../static-helpers/serialization/parse-newline-collection.js";
import { parsePipeCollection } from "../../../../../static-helpers/serialization/parse-pipe-collection.js";
import { serializeRecord } from "../../../../../static-helpers/serialization/serialize-record.js";
import { knowledgeRetrievalReasoningEffortUnionSerializer, knowledgeRetrievalReasoningEffortUnionDeserializer, knowledgeSourceIngestionParametersSerializer, knowledgeSourceIngestionParametersDeserializer, } from "../knowledgeBases/models.js";
export function synonymMapSerializer(item) {
    return {
        name: item["name"],
        format: item["format"],
        synonyms: buildNewlineCollection(item["synonyms"].map((p) => {
            return p;
        })),
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        "@odata.etag": item["eTag"],
    };
}
export function synonymMapDeserializer(item) {
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
export function searchResourceEncryptionKeySerializer(item) {
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
        isServiceLevelKey: item["isServiceLevelKey"],
    };
}
export function searchResourceEncryptionKeyDeserializer(item) {
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
        isServiceLevelKey: item["isServiceLevelKey"],
    };
}
export function azureActiveDirectoryApplicationCredentialsSerializer(item) {
    return { applicationId: item["applicationId"], applicationSecret: item["applicationSecret"] };
}
export function azureActiveDirectoryApplicationCredentialsDeserializer(item) {
    return {
        applicationId: item["applicationId"],
        applicationSecret: item["applicationSecret"],
    };
}
export function searchIndexerDataIdentitySerializer(item) {
    return { "@odata.type": item["odatatype"] };
}
export function searchIndexerDataIdentityDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
    };
}
export function searchIndexerDataIdentityUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.DataNoneIdentity":
            return searchIndexerDataNoneIdentitySerializer(item);
        case "#Microsoft.Azure.Search.DataUserAssignedIdentity":
            return searchIndexerDataUserAssignedIdentitySerializer(item);
        default:
            return searchIndexerDataIdentitySerializer(item);
    }
}
export function searchIndexerDataIdentityUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.DataNoneIdentity":
            return searchIndexerDataNoneIdentityDeserializer(item);
        case "#Microsoft.Azure.Search.DataUserAssignedIdentity":
            return searchIndexerDataUserAssignedIdentityDeserializer(item);
        default:
            return searchIndexerDataIdentityDeserializer(item);
    }
}
export function searchIndexerDataNoneIdentitySerializer(item) {
    return { "@odata.type": item["odatatype"] };
}
export function searchIndexerDataNoneIdentityDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
    };
}
export function searchIndexerDataUserAssignedIdentitySerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        userAssignedIdentity: item["resourceId"],
        federatedIdentityClientId: item["federatedIdentityClientId"],
    };
}
export function searchIndexerDataUserAssignedIdentityDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        resourceId: item["userAssignedIdentity"],
        federatedIdentityClientId: item["federatedIdentityClientId"],
    };
}
export function listSynonymMapsResultDeserializer(item) {
    return {
        synonymMaps: synonymMapArrayDeserializer(item["value"]),
    };
}
export function synonymMapArraySerializer(result) {
    return result.map((item) => {
        return synonymMapSerializer(item);
    });
}
export function synonymMapArrayDeserializer(result) {
    return result.map((item) => {
        return synonymMapDeserializer(item);
    });
}
export function searchIndexSerializer(item) {
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
        sharePointConnectorAppRegistration: !item["sharePointConnectorAppRegistration"]
            ? item["sharePointConnectorAppRegistration"]
            : sharePointConnectorAppRegistrationSerializer(item["sharePointConnectorAppRegistration"]),
        "@odata.etag": item["eTag"],
    };
}
export function searchIndexDeserializer(item) {
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
        sharePointConnectorAppRegistration: !item["sharePointConnectorAppRegistration"]
            ? item["sharePointConnectorAppRegistration"]
            : sharePointConnectorAppRegistrationDeserializer(item["sharePointConnectorAppRegistration"]),
        eTag: item["@odata.etag"],
    };
}
export function searchFieldArraySerializer(result) {
    return result.map((item) => {
        return searchFieldSerializer(item);
    });
}
export function searchFieldArrayDeserializer(result) {
    return result.map((item) => {
        return searchFieldDeserializer(item);
    });
}
export function searchFieldSerializer(item) {
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
        sensitivityLabelId: item["sensitivityLabelId"],
        sensitivityLabelName: item["sensitivityLabelName"],
        sourceDocumentId: item["sourceDocumentId"],
        sharepointSiteUrl: item["sharepointSiteUrl"],
        analyzer: item["analyzerName"],
        searchAnalyzer: item["searchAnalyzerName"],
        indexAnalyzer: item["indexAnalyzerName"],
        normalizer: item["normalizerName"],
        dimensions: item["vectorSearchDimensions"],
        vectorSearchProfile: item["vectorSearchProfileName"],
        vectorEncoding: item["vectorEncodingFormat"],
        synonymMaps: !item["synonymMapNames"]
            ? item["synonymMapNames"]
            : item["synonymMapNames"].map((p) => {
                return p;
            }),
        fields: !item["fields"] ? item["fields"] : searchFieldArraySerializer(item["fields"]),
    };
}
export function searchFieldDeserializer(item) {
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
        sensitivityLabelId: item["sensitivityLabelId"],
        sensitivityLabelName: item["sensitivityLabelName"],
        sourceDocumentId: item["sourceDocumentId"],
        sharepointSiteUrl: item["sharepointSiteUrl"],
        analyzerName: item["analyzer"],
        searchAnalyzerName: item["searchAnalyzer"],
        indexAnalyzerName: item["indexAnalyzer"],
        normalizerName: item["normalizer"],
        vectorSearchDimensions: item["dimensions"],
        vectorSearchProfileName: item["vectorSearchProfile"],
        vectorEncodingFormat: item["vectorEncoding"],
        synonymMapNames: !item["synonymMaps"]
            ? item["synonymMaps"]
            : item["synonymMaps"].map((p) => {
                return p;
            }),
        fields: !item["fields"] ? item["fields"] : searchFieldArrayDeserializer(item["fields"]),
    };
}
/** Defines the data type of a field in a search index. */
export var KnownSearchFieldDataType;
(function (KnownSearchFieldDataType) {
    /** Indicates that a field contains a string. */
    KnownSearchFieldDataType["String"] = "Edm.String";
    /** Indicates that a field contains a 32-bit signed integer. */
    KnownSearchFieldDataType["Int32"] = "Edm.Int32";
    /** Indicates that a field contains a 64-bit signed integer. */
    KnownSearchFieldDataType["Int64"] = "Edm.Int64";
    /** Indicates that a field contains an IEEE double-precision floating point number. */
    KnownSearchFieldDataType["Double"] = "Edm.Double";
    /** Indicates that a field contains a Boolean value (true or false). */
    KnownSearchFieldDataType["Boolean"] = "Edm.Boolean";
    /** Indicates that a field contains a date/time value, including timezone information. */
    KnownSearchFieldDataType["DateTimeOffset"] = "Edm.DateTimeOffset";
    /** Indicates that a field contains a geo-location in terms of longitude and latitude. */
    KnownSearchFieldDataType["GeographyPoint"] = "Edm.GeographyPoint";
    /** Indicates that a field contains one or more complex objects that in turn have sub-fields of other types. */
    KnownSearchFieldDataType["Complex"] = "Edm.ComplexType";
    /** Indicates that a field contains a single-precision floating point number. This is only valid when used with Collection(Edm.Single). */
    KnownSearchFieldDataType["Single"] = "Edm.Single";
    /** Indicates that a field contains a half-precision floating point number. This is only valid when used with Collection(Edm.Half). */
    KnownSearchFieldDataType["Half"] = "Edm.Half";
    /** Indicates that a field contains a 16-bit signed integer. This is only valid when used with Collection(Edm.Int16). */
    KnownSearchFieldDataType["Int16"] = "Edm.Int16";
    /** Indicates that a field contains a 8-bit signed integer. This is only valid when used with Collection(Edm.SByte). */
    KnownSearchFieldDataType["SByte"] = "Edm.SByte";
    /** Indicates that a field contains a 8-bit unsigned integer. This is only valid when used with Collection(Edm.Byte). */
    KnownSearchFieldDataType["Byte"] = "Edm.Byte";
})(KnownSearchFieldDataType || (KnownSearchFieldDataType = {}));
/** A value indicating whether the field should be used as a permission filter. */
export var KnownPermissionFilter;
(function (KnownPermissionFilter) {
    /** Field represents user IDs that should be used to filter document access on queries. */
    KnownPermissionFilter["UserIds"] = "userIds";
    /** Field represents group IDs that should be used to filter document access on queries. */
    KnownPermissionFilter["GroupIds"] = "groupIds";
    /** Field represents an RBAC scope that should be used to filter document access on queries. */
    KnownPermissionFilter["RbacScope"] = "rbacScope";
})(KnownPermissionFilter || (KnownPermissionFilter = {}));
/** Defines the names of all text analyzers supported by the search engine. */
export var KnownLexicalAnalyzerName;
(function (KnownLexicalAnalyzerName) {
    /** Microsoft analyzer for Arabic. */
    KnownLexicalAnalyzerName["ArMicrosoft"] = "ar.microsoft";
    /** Lucene analyzer for Arabic. */
    KnownLexicalAnalyzerName["ArLucene"] = "ar.lucene";
    /** Lucene analyzer for Armenian. */
    KnownLexicalAnalyzerName["HyLucene"] = "hy.lucene";
    /** Microsoft analyzer for Bangla. */
    KnownLexicalAnalyzerName["BnMicrosoft"] = "bn.microsoft";
    /** Lucene analyzer for Basque. */
    KnownLexicalAnalyzerName["EuLucene"] = "eu.lucene";
    /** Microsoft analyzer for Bulgarian. */
    KnownLexicalAnalyzerName["BgMicrosoft"] = "bg.microsoft";
    /** Lucene analyzer for Bulgarian. */
    KnownLexicalAnalyzerName["BgLucene"] = "bg.lucene";
    /** Microsoft analyzer for Catalan. */
    KnownLexicalAnalyzerName["CaMicrosoft"] = "ca.microsoft";
    /** Lucene analyzer for Catalan. */
    KnownLexicalAnalyzerName["CaLucene"] = "ca.lucene";
    /** Microsoft analyzer for Chinese (Simplified). */
    KnownLexicalAnalyzerName["ZhHansMicrosoft"] = "zh-Hans.microsoft";
    /** Lucene analyzer for Chinese (Simplified). */
    KnownLexicalAnalyzerName["ZhHansLucene"] = "zh-Hans.lucene";
    /** Microsoft analyzer for Chinese (Traditional). */
    KnownLexicalAnalyzerName["ZhHantMicrosoft"] = "zh-Hant.microsoft";
    /** Lucene analyzer for Chinese (Traditional). */
    KnownLexicalAnalyzerName["ZhHantLucene"] = "zh-Hant.lucene";
    /** Microsoft analyzer for Croatian. */
    KnownLexicalAnalyzerName["HrMicrosoft"] = "hr.microsoft";
    /** Microsoft analyzer for Czech. */
    KnownLexicalAnalyzerName["CsMicrosoft"] = "cs.microsoft";
    /** Lucene analyzer for Czech. */
    KnownLexicalAnalyzerName["CsLucene"] = "cs.lucene";
    /** Microsoft analyzer for Danish. */
    KnownLexicalAnalyzerName["DaMicrosoft"] = "da.microsoft";
    /** Lucene analyzer for Danish. */
    KnownLexicalAnalyzerName["DaLucene"] = "da.lucene";
    /** Microsoft analyzer for Dutch. */
    KnownLexicalAnalyzerName["NlMicrosoft"] = "nl.microsoft";
    /** Lucene analyzer for Dutch. */
    KnownLexicalAnalyzerName["NlLucene"] = "nl.lucene";
    /** Microsoft analyzer for English. */
    KnownLexicalAnalyzerName["EnMicrosoft"] = "en.microsoft";
    /** Lucene analyzer for English. */
    KnownLexicalAnalyzerName["EnLucene"] = "en.lucene";
    /** Microsoft analyzer for Estonian. */
    KnownLexicalAnalyzerName["EtMicrosoft"] = "et.microsoft";
    /** Microsoft analyzer for Finnish. */
    KnownLexicalAnalyzerName["FiMicrosoft"] = "fi.microsoft";
    /** Lucene analyzer for Finnish. */
    KnownLexicalAnalyzerName["FiLucene"] = "fi.lucene";
    /** Microsoft analyzer for French. */
    KnownLexicalAnalyzerName["FrMicrosoft"] = "fr.microsoft";
    /** Lucene analyzer for French. */
    KnownLexicalAnalyzerName["FrLucene"] = "fr.lucene";
    /** Lucene analyzer for Galician. */
    KnownLexicalAnalyzerName["GlLucene"] = "gl.lucene";
    /** Microsoft analyzer for German. */
    KnownLexicalAnalyzerName["DeMicrosoft"] = "de.microsoft";
    /** Lucene analyzer for German. */
    KnownLexicalAnalyzerName["DeLucene"] = "de.lucene";
    /** Microsoft analyzer for Greek. */
    KnownLexicalAnalyzerName["ElMicrosoft"] = "el.microsoft";
    /** Lucene analyzer for Greek. */
    KnownLexicalAnalyzerName["ElLucene"] = "el.lucene";
    /** Microsoft analyzer for Gujarati. */
    KnownLexicalAnalyzerName["GuMicrosoft"] = "gu.microsoft";
    /** Microsoft analyzer for Hebrew. */
    KnownLexicalAnalyzerName["HeMicrosoft"] = "he.microsoft";
    /** Microsoft analyzer for Hindi. */
    KnownLexicalAnalyzerName["HiMicrosoft"] = "hi.microsoft";
    /** Lucene analyzer for Hindi. */
    KnownLexicalAnalyzerName["HiLucene"] = "hi.lucene";
    /** Microsoft analyzer for Hungarian. */
    KnownLexicalAnalyzerName["HuMicrosoft"] = "hu.microsoft";
    /** Lucene analyzer for Hungarian. */
    KnownLexicalAnalyzerName["HuLucene"] = "hu.lucene";
    /** Microsoft analyzer for Icelandic. */
    KnownLexicalAnalyzerName["IsMicrosoft"] = "is.microsoft";
    /** Microsoft analyzer for Indonesian (Bahasa). */
    KnownLexicalAnalyzerName["IdMicrosoft"] = "id.microsoft";
    /** Lucene analyzer for Indonesian. */
    KnownLexicalAnalyzerName["IdLucene"] = "id.lucene";
    /** Lucene analyzer for Irish. */
    KnownLexicalAnalyzerName["GaLucene"] = "ga.lucene";
    /** Microsoft analyzer for Italian. */
    KnownLexicalAnalyzerName["ItMicrosoft"] = "it.microsoft";
    /** Lucene analyzer for Italian. */
    KnownLexicalAnalyzerName["ItLucene"] = "it.lucene";
    /** Microsoft analyzer for Japanese. */
    KnownLexicalAnalyzerName["JaMicrosoft"] = "ja.microsoft";
    /** Lucene analyzer for Japanese. */
    KnownLexicalAnalyzerName["JaLucene"] = "ja.lucene";
    /** Microsoft analyzer for Kannada. */
    KnownLexicalAnalyzerName["KnMicrosoft"] = "kn.microsoft";
    /** Microsoft analyzer for Korean. */
    KnownLexicalAnalyzerName["KoMicrosoft"] = "ko.microsoft";
    /** Lucene analyzer for Korean. */
    KnownLexicalAnalyzerName["KoLucene"] = "ko.lucene";
    /** Microsoft analyzer for Latvian. */
    KnownLexicalAnalyzerName["LvMicrosoft"] = "lv.microsoft";
    /** Lucene analyzer for Latvian. */
    KnownLexicalAnalyzerName["LvLucene"] = "lv.lucene";
    /** Microsoft analyzer for Lithuanian. */
    KnownLexicalAnalyzerName["LtMicrosoft"] = "lt.microsoft";
    /** Microsoft analyzer for Malayalam. */
    KnownLexicalAnalyzerName["MlMicrosoft"] = "ml.microsoft";
    /** Microsoft analyzer for Malay (Latin). */
    KnownLexicalAnalyzerName["MsMicrosoft"] = "ms.microsoft";
    /** Microsoft analyzer for Marathi. */
    KnownLexicalAnalyzerName["MrMicrosoft"] = "mr.microsoft";
    /** Microsoft analyzer for Norwegian (BokmÃ¥l). */
    KnownLexicalAnalyzerName["NbMicrosoft"] = "nb.microsoft";
    /** Lucene analyzer for Norwegian. */
    KnownLexicalAnalyzerName["NoLucene"] = "no.lucene";
    /** Lucene analyzer for Persian. */
    KnownLexicalAnalyzerName["FaLucene"] = "fa.lucene";
    /** Microsoft analyzer for Polish. */
    KnownLexicalAnalyzerName["PlMicrosoft"] = "pl.microsoft";
    /** Lucene analyzer for Polish. */
    KnownLexicalAnalyzerName["PlLucene"] = "pl.lucene";
    /** Microsoft analyzer for Portuguese (Brazil). */
    KnownLexicalAnalyzerName["PtBrMicrosoft"] = "pt-BR.microsoft";
    /** Lucene analyzer for Portuguese (Brazil). */
    KnownLexicalAnalyzerName["PtBrLucene"] = "pt-BR.lucene";
    /** Microsoft analyzer for Portuguese (Portugal). */
    KnownLexicalAnalyzerName["PtPtMicrosoft"] = "pt-PT.microsoft";
    /** Lucene analyzer for Portuguese (Portugal). */
    KnownLexicalAnalyzerName["PtPtLucene"] = "pt-PT.lucene";
    /** Microsoft analyzer for Punjabi. */
    KnownLexicalAnalyzerName["PaMicrosoft"] = "pa.microsoft";
    /** Microsoft analyzer for Romanian. */
    KnownLexicalAnalyzerName["RoMicrosoft"] = "ro.microsoft";
    /** Lucene analyzer for Romanian. */
    KnownLexicalAnalyzerName["RoLucene"] = "ro.lucene";
    /** Microsoft analyzer for Russian. */
    KnownLexicalAnalyzerName["RuMicrosoft"] = "ru.microsoft";
    /** Lucene analyzer for Russian. */
    KnownLexicalAnalyzerName["RuLucene"] = "ru.lucene";
    /** Microsoft analyzer for Serbian (Cyrillic). */
    KnownLexicalAnalyzerName["SrCyrillicMicrosoft"] = "sr-cyrillic.microsoft";
    /** Microsoft analyzer for Serbian (Latin). */
    KnownLexicalAnalyzerName["SrLatinMicrosoft"] = "sr-latin.microsoft";
    /** Microsoft analyzer for Slovak. */
    KnownLexicalAnalyzerName["SkMicrosoft"] = "sk.microsoft";
    /** Microsoft analyzer for Slovenian. */
    KnownLexicalAnalyzerName["SlMicrosoft"] = "sl.microsoft";
    /** Microsoft analyzer for Spanish. */
    KnownLexicalAnalyzerName["EsMicrosoft"] = "es.microsoft";
    /** Lucene analyzer for Spanish. */
    KnownLexicalAnalyzerName["EsLucene"] = "es.lucene";
    /** Microsoft analyzer for Swedish. */
    KnownLexicalAnalyzerName["SvMicrosoft"] = "sv.microsoft";
    /** Lucene analyzer for Swedish. */
    KnownLexicalAnalyzerName["SvLucene"] = "sv.lucene";
    /** Microsoft analyzer for Tamil. */
    KnownLexicalAnalyzerName["TaMicrosoft"] = "ta.microsoft";
    /** Microsoft analyzer for Telugu. */
    KnownLexicalAnalyzerName["TeMicrosoft"] = "te.microsoft";
    /** Microsoft analyzer for Thai. */
    KnownLexicalAnalyzerName["ThMicrosoft"] = "th.microsoft";
    /** Lucene analyzer for Thai. */
    KnownLexicalAnalyzerName["ThLucene"] = "th.lucene";
    /** Microsoft analyzer for Turkish. */
    KnownLexicalAnalyzerName["TrMicrosoft"] = "tr.microsoft";
    /** Lucene analyzer for Turkish. */
    KnownLexicalAnalyzerName["TrLucene"] = "tr.lucene";
    /** Microsoft analyzer for Ukrainian. */
    KnownLexicalAnalyzerName["UkMicrosoft"] = "uk.microsoft";
    /** Microsoft analyzer for Urdu. */
    KnownLexicalAnalyzerName["UrMicrosoft"] = "ur.microsoft";
    /** Microsoft analyzer for Vietnamese. */
    KnownLexicalAnalyzerName["ViMicrosoft"] = "vi.microsoft";
    /** Standard Lucene analyzer. */
    KnownLexicalAnalyzerName["StandardLucene"] = "standard.lucene";
    /** Standard ASCII Folding Lucene analyzer. See https://learn.microsoft.com/rest/api/searchservice/Custom-analyzers-in-Azure-Search#Analyzers */
    KnownLexicalAnalyzerName["StandardAsciiFoldingLucene"] = "standardasciifolding.lucene";
    /** Treats the entire content of a field as a single token. This is useful for data like zip codes, ids, and some product names. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/KeywordAnalyzer.html */
    KnownLexicalAnalyzerName["Keyword"] = "keyword";
    /** Flexibly separates text into terms via a regular expression pattern. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/PatternAnalyzer.html */
    KnownLexicalAnalyzerName["Pattern"] = "pattern";
    /** Divides text at non-letters and converts them to lower case. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/SimpleAnalyzer.html */
    KnownLexicalAnalyzerName["Simple"] = "simple";
    /** Divides text at non-letters; Applies the lowercase and stopword token filters. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/StopAnalyzer.html */
    KnownLexicalAnalyzerName["Stop"] = "stop";
    /** An analyzer that uses the whitespace tokenizer. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/WhitespaceAnalyzer.html */
    KnownLexicalAnalyzerName["Whitespace"] = "whitespace";
})(KnownLexicalAnalyzerName || (KnownLexicalAnalyzerName = {}));
/** Defines the names of all text normalizers supported by the search engine. */
export var KnownLexicalNormalizerName;
(function (KnownLexicalNormalizerName) {
    /** Converts alphabetic, numeric, and symbolic Unicode characters which are not in the first 127 ASCII characters (the "Basic Latin" Unicode block) into their ASCII equivalents, if such equivalents exist. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ASCIIFoldingFilter.html */
    KnownLexicalNormalizerName["AsciiFolding"] = "asciifolding";
    /** Removes elisions. For example, "l'avion" (the plane) will be converted to "avion" (plane). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/util/ElisionFilter.html */
    KnownLexicalNormalizerName["Elision"] = "elision";
    /** Normalizes token text to lowercase. See https://lucene.apache.org/core/6_6_1/analyzers-common/org/apache/lucene/analysis/core/LowerCaseFilter.html */
    KnownLexicalNormalizerName["Lowercase"] = "lowercase";
    /** Standard normalizer, which consists of lowercase and asciifolding. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/reverse/ReverseStringFilter.html */
    KnownLexicalNormalizerName["Standard"] = "standard";
    /** Normalizes token text to uppercase. See https://lucene.apache.org/core/6_6_1/analyzers-common/org/apache/lucene/analysis/core/UpperCaseFilter.html */
    KnownLexicalNormalizerName["Uppercase"] = "uppercase";
})(KnownLexicalNormalizerName || (KnownLexicalNormalizerName = {}));
/** The encoding format for interpreting vector field contents. */
export var KnownVectorEncodingFormat;
(function (KnownVectorEncodingFormat) {
    /** Encoding format representing bits packed into a wider data type. */
    KnownVectorEncodingFormat["PackedBit"] = "packedBit";
})(KnownVectorEncodingFormat || (KnownVectorEncodingFormat = {}));
export function scoringProfileArraySerializer(result) {
    return result.map((item) => {
        return scoringProfileSerializer(item);
    });
}
export function scoringProfileArrayDeserializer(result) {
    return result.map((item) => {
        return scoringProfileDeserializer(item);
    });
}
export function scoringProfileSerializer(item) {
    return {
        name: item["name"],
        text: !item["textWeights"] ? item["textWeights"] : textWeightsSerializer(item["textWeights"]),
        functions: !item["functions"]
            ? item["functions"]
            : scoringFunctionUnionArraySerializer(item["functions"]),
        functionAggregation: item["functionAggregation"],
    };
}
export function scoringProfileDeserializer(item) {
    return {
        name: item["name"],
        textWeights: !item["text"] ? item["text"] : textWeightsDeserializer(item["text"]),
        functions: !item["functions"]
            ? item["functions"]
            : scoringFunctionUnionArrayDeserializer(item["functions"]),
        functionAggregation: item["functionAggregation"],
    };
}
export function textWeightsSerializer(item) {
    return { weights: item["weights"] };
}
export function textWeightsDeserializer(item) {
    return {
        weights: Object.fromEntries(Object.entries(item["weights"]).map(([k, p]) => [k, p])),
    };
}
export function scoringFunctionUnionArraySerializer(result) {
    return result.map((item) => {
        return scoringFunctionUnionSerializer(item);
    });
}
export function scoringFunctionUnionArrayDeserializer(result) {
    return result.map((item) => {
        return scoringFunctionUnionDeserializer(item);
    });
}
export function scoringFunctionSerializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
    };
}
export function scoringFunctionDeserializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
    };
}
export function scoringFunctionUnionSerializer(item) {
    switch (item.type) {
        case "distance":
            return distanceScoringFunctionSerializer(item);
        case "freshness":
            return freshnessScoringFunctionSerializer(item);
        case "magnitude":
            return magnitudeScoringFunctionSerializer(item);
        case "tag":
            return tagScoringFunctionSerializer(item);
        default:
            return scoringFunctionSerializer(item);
    }
}
export function scoringFunctionUnionDeserializer(item) {
    switch (item["type"]) {
        case "distance":
            return distanceScoringFunctionDeserializer(item);
        case "freshness":
            return freshnessScoringFunctionDeserializer(item);
        case "magnitude":
            return magnitudeScoringFunctionDeserializer(item);
        case "tag":
            return tagScoringFunctionDeserializer(item);
        default:
            return scoringFunctionDeserializer(item);
    }
}
export function distanceScoringFunctionSerializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
        distance: distanceScoringParametersSerializer(item["parameters"]),
    };
}
export function distanceScoringFunctionDeserializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
        parameters: distanceScoringParametersDeserializer(item["distance"]),
    };
}
export function distanceScoringParametersSerializer(item) {
    return {
        referencePointParameter: item["referencePointParameter"],
        boostingDistance: item["boostingDistance"],
    };
}
export function distanceScoringParametersDeserializer(item) {
    return {
        referencePointParameter: item["referencePointParameter"],
        boostingDistance: item["boostingDistance"],
    };
}
export function freshnessScoringFunctionSerializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
        freshness: freshnessScoringParametersSerializer(item["parameters"]),
    };
}
export function freshnessScoringFunctionDeserializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
        parameters: freshnessScoringParametersDeserializer(item["freshness"]),
    };
}
export function freshnessScoringParametersSerializer(item) {
    return { boostingDuration: item["boostingDuration"] };
}
export function freshnessScoringParametersDeserializer(item) {
    return {
        boostingDuration: item["boostingDuration"],
    };
}
export function magnitudeScoringFunctionSerializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
        magnitude: magnitudeScoringParametersSerializer(item["parameters"]),
    };
}
export function magnitudeScoringFunctionDeserializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
        parameters: magnitudeScoringParametersDeserializer(item["magnitude"]),
    };
}
export function magnitudeScoringParametersSerializer(item) {
    return {
        boostingRangeStart: item["boostingRangeStart"],
        boostingRangeEnd: item["boostingRangeEnd"],
        constantBoostBeyondRange: item["shouldBoostBeyondRangeByConstant"],
    };
}
export function magnitudeScoringParametersDeserializer(item) {
    return {
        boostingRangeStart: item["boostingRangeStart"],
        boostingRangeEnd: item["boostingRangeEnd"],
        shouldBoostBeyondRangeByConstant: item["constantBoostBeyondRange"],
    };
}
export function tagScoringFunctionSerializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
        tag: tagScoringParametersSerializer(item["parameters"]),
    };
}
export function tagScoringFunctionDeserializer(item) {
    return {
        fieldName: item["fieldName"],
        boost: item["boost"],
        interpolation: item["interpolation"],
        type: item["type"],
        parameters: tagScoringParametersDeserializer(item["tag"]),
    };
}
export function tagScoringParametersSerializer(item) {
    return { tagsParameter: item["tagsParameter"] };
}
export function tagScoringParametersDeserializer(item) {
    return {
        tagsParameter: item["tagsParameter"],
    };
}
export function corsOptionsSerializer(item) {
    return {
        allowedOrigins: item["allowedOrigins"].map((p) => {
            return p;
        }),
        maxAgeInSeconds: item["maxAgeInSeconds"],
    };
}
export function corsOptionsDeserializer(item) {
    return {
        allowedOrigins: item["allowedOrigins"].map((p) => {
            return p;
        }),
        maxAgeInSeconds: item["maxAgeInSeconds"],
    };
}
export function searchSuggesterArraySerializer(result) {
    return result.map((item) => {
        return searchSuggesterSerializer(item);
    });
}
export function searchSuggesterArrayDeserializer(result) {
    return result.map((item) => {
        return searchSuggesterDeserializer(item);
    });
}
export function searchSuggesterSerializer(item) {
    return {
        name: item["name"],
        searchMode: item["searchMode"],
        sourceFields: item["sourceFields"].map((p) => {
            return p;
        }),
    };
}
export function searchSuggesterDeserializer(item) {
    return {
        name: item["name"],
        searchMode: item["searchMode"],
        sourceFields: item["sourceFields"].map((p) => {
            return p;
        }),
    };
}
export function lexicalAnalyzerUnionArraySerializer(result) {
    return result.map((item) => {
        return lexicalAnalyzerUnionSerializer(item);
    });
}
export function lexicalAnalyzerUnionArrayDeserializer(result) {
    return result.map((item) => {
        return lexicalAnalyzerUnionDeserializer(item);
    });
}
export function lexicalAnalyzerSerializer(item) {
    return { "@odata.type": item["odatatype"], name: item["name"] };
}
export function lexicalAnalyzerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
    };
}
export function lexicalAnalyzerUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.CustomAnalyzer":
            return customAnalyzerSerializer(item);
        case "#Microsoft.Azure.Search.PatternAnalyzer":
            return patternAnalyzerSerializer(item);
        case "#Microsoft.Azure.Search.StandardAnalyzer":
            return luceneStandardAnalyzerSerializer(item);
        case "#Microsoft.Azure.Search.StopAnalyzer":
            return stopAnalyzerSerializer(item);
        default:
            return lexicalAnalyzerSerializer(item);
    }
}
export function lexicalAnalyzerUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.CustomAnalyzer":
            return customAnalyzerDeserializer(item);
        case "#Microsoft.Azure.Search.PatternAnalyzer":
            return patternAnalyzerDeserializer(item);
        case "#Microsoft.Azure.Search.StandardAnalyzer":
            return luceneStandardAnalyzerDeserializer(item);
        case "#Microsoft.Azure.Search.StopAnalyzer":
            return stopAnalyzerDeserializer(item);
        default:
            return lexicalAnalyzerDeserializer(item);
    }
}
export function customAnalyzerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        tokenizer: item["tokenizer"],
        tokenFilters: !item["tokenFilters"]
            ? item["tokenFilters"]
            : item["tokenFilters"].map((p) => {
                return p;
            }),
        charFilters: !item["charFilters"]
            ? item["charFilters"]
            : item["charFilters"].map((p) => {
                return p;
            }),
    };
}
export function customAnalyzerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        tokenizer: item["tokenizer"],
        tokenFilters: !item["tokenFilters"]
            ? item["tokenFilters"]
            : item["tokenFilters"].map((p) => {
                return p;
            }),
        charFilters: !item["charFilters"]
            ? item["charFilters"]
            : item["charFilters"].map((p) => {
                return p;
            }),
    };
}
/** Defines the names of all tokenizers supported by the search engine. */
export var KnownLexicalTokenizerName;
(function (KnownLexicalTokenizerName) {
    /** Grammar-based tokenizer that is suitable for processing most European-language documents. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/ClassicTokenizer.html */
    KnownLexicalTokenizerName["Classic"] = "classic";
    /** Tokenizes the input from an edge into n-grams of the given size(s). See https://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/EdgeNGramTokenizer.html */
    KnownLexicalTokenizerName["EdgeNGram"] = "edgeNGram";
    /** Emits the entire input as a single token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/KeywordTokenizer.html */
    KnownLexicalTokenizerName["Keyword"] = "keyword_v2";
    /** Divides text at non-letters. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/LetterTokenizer.html */
    KnownLexicalTokenizerName["Letter"] = "letter";
    /** Divides text at non-letters and converts them to lower case. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/LowerCaseTokenizer.html */
    KnownLexicalTokenizerName["Lowercase"] = "lowercase";
    /** Divides text using language-specific rules. */
    KnownLexicalTokenizerName["MicrosoftLanguageTokenizer"] = "microsoft_language_tokenizer";
    /** Divides text using language-specific rules and reduces words to their base forms. */
    KnownLexicalTokenizerName["MicrosoftLanguageStemmingTokenizer"] = "microsoft_language_stemming_tokenizer";
    /** Tokenizes the input into n-grams of the given size(s). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/NGramTokenizer.html */
    KnownLexicalTokenizerName["NGram"] = "nGram";
    /** Tokenizer for path-like hierarchies. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/path/PathHierarchyTokenizer.html */
    KnownLexicalTokenizerName["PathHierarchy"] = "path_hierarchy_v2";
    /** Tokenizer that uses regex pattern matching to construct distinct tokens. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/pattern/PatternTokenizer.html */
    KnownLexicalTokenizerName["Pattern"] = "pattern";
    /** Standard Lucene analyzer; Composed of the standard tokenizer, lowercase filter and stop filter. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/StandardTokenizer.html */
    KnownLexicalTokenizerName["Standard"] = "standard_v2";
    /** Tokenizes urls and emails as one token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/UAX29URLEmailTokenizer.html */
    KnownLexicalTokenizerName["UaxUrlEmail"] = "uax_url_email";
    /** Divides text at whitespace. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/WhitespaceTokenizer.html */
    KnownLexicalTokenizerName["Whitespace"] = "whitespace";
})(KnownLexicalTokenizerName || (KnownLexicalTokenizerName = {}));
/** Defines the names of all token filters supported by the search engine. */
export var KnownTokenFilterName;
(function (KnownTokenFilterName) {
    /** A token filter that applies the Arabic normalizer to normalize the orthography. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ar/ArabicNormalizationFilter.html */
    KnownTokenFilterName["ArabicNormalization"] = "arabic_normalization";
    /** Strips all characters after an apostrophe (including the apostrophe itself). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/tr/ApostropheFilter.html */
    KnownTokenFilterName["Apostrophe"] = "apostrophe";
    /** Converts alphabetic, numeric, and symbolic Unicode characters which are not in the first 127 ASCII characters (the "Basic Latin" Unicode block) into their ASCII equivalents, if such equivalents exist. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ASCIIFoldingFilter.html */
    KnownTokenFilterName["AsciiFolding"] = "asciifolding";
    /** Forms bigrams of CJK terms that are generated from the standard tokenizer. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/cjk/CJKBigramFilter.html */
    KnownTokenFilterName["CjkBigram"] = "cjk_bigram";
    /** Normalizes CJK width differences. Folds full-width ASCII variants into the equivalent basic Latin, and half-width Katakana variants into the equivalent Kana. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/cjk/CJKWidthFilter.html */
    KnownTokenFilterName["CjkWidth"] = "cjk_width";
    /** Removes English possessives, and dots from acronyms. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/ClassicFilter.html */
    KnownTokenFilterName["Classic"] = "classic";
    /** Construct bigrams for frequently occurring terms while indexing. Single terms are still indexed too, with bigrams overlaid. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/commongrams/CommonGramsFilter.html */
    KnownTokenFilterName["CommonGram"] = "common_grams";
    /** Generates n-grams of the given size(s) starting from the front or the back of an input token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/EdgeNGramTokenFilter.html */
    KnownTokenFilterName["EdgeNGram"] = "edgeNGram_v2";
    /** Removes elisions. For example, "l'avion" (the plane) will be converted to "avion" (plane). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/util/ElisionFilter.html */
    KnownTokenFilterName["Elision"] = "elision";
    /** Normalizes German characters according to the heuristics of the German2 snowball algorithm. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/de/GermanNormalizationFilter.html */
    KnownTokenFilterName["GermanNormalization"] = "german_normalization";
    /** Normalizes text in Hindi to remove some differences in spelling variations. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/hi/HindiNormalizationFilter.html */
    KnownTokenFilterName["HindiNormalization"] = "hindi_normalization";
    /** Normalizes the Unicode representation of text in Indian languages. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/in/IndicNormalizationFilter.html */
    KnownTokenFilterName["IndicNormalization"] = "indic_normalization";
    /** Emits each incoming token twice, once as keyword and once as non-keyword. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/KeywordRepeatFilter.html */
    KnownTokenFilterName["KeywordRepeat"] = "keyword_repeat";
    /** A high-performance kstem filter for English. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/en/KStemFilter.html */
    KnownTokenFilterName["KStem"] = "kstem";
    /** Removes words that are too long or too short. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/LengthFilter.html */
    KnownTokenFilterName["Length"] = "length";
    /** Limits the number of tokens while indexing. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/LimitTokenCountFilter.html */
    KnownTokenFilterName["Limit"] = "limit";
    /** Normalizes token text to lower case. See https://lucene.apache.org/core/6_6_1/analyzers-common/org/apache/lucene/analysis/core/LowerCaseFilter.html */
    KnownTokenFilterName["Lowercase"] = "lowercase";
    /** Generates n-grams of the given size(s). See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/NGramTokenFilter.html */
    KnownTokenFilterName["NGram"] = "nGram_v2";
    /** Applies normalization for Persian. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/fa/PersianNormalizationFilter.html */
    KnownTokenFilterName["PersianNormalization"] = "persian_normalization";
    /** Create tokens for phonetic matches. See https://lucene.apache.org/core/4_10_3/analyzers-phonetic/org/apache/lucene/analysis/phonetic/package-tree.html */
    KnownTokenFilterName["Phonetic"] = "phonetic";
    /** Uses the Porter stemming algorithm to transform the token stream. See http://tartarus.org/~martin/PorterStemmer */
    KnownTokenFilterName["PorterStem"] = "porter_stem";
    /** Reverses the token string. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/reverse/ReverseStringFilter.html */
    KnownTokenFilterName["Reverse"] = "reverse";
    /** Normalizes use of the interchangeable Scandinavian characters. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ScandinavianNormalizationFilter.html */
    KnownTokenFilterName["ScandinavianNormalization"] = "scandinavian_normalization";
    /** Folds Scandinavian characters Ã¥Ã…Ã¤Ã¦Ã„Ã†-&gt;a and Ã¶Ã–Ã¸Ã˜-&gt;o. It also discriminates against use of double vowels aa, ae, ao, oe and oo, leaving just the first one. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ScandinavianFoldingFilter.html */
    KnownTokenFilterName["ScandinavianFoldingNormalization"] = "scandinavian_folding";
    /** Creates combinations of tokens as a single token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/shingle/ShingleFilter.html */
    KnownTokenFilterName["Shingle"] = "shingle";
    /** A filter that stems words using a Snowball-generated stemmer. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/snowball/SnowballFilter.html */
    KnownTokenFilterName["Snowball"] = "snowball";
    /** Normalizes the Unicode representation of Sorani text. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ckb/SoraniNormalizationFilter.html */
    KnownTokenFilterName["SoraniNormalization"] = "sorani_normalization";
    /** Language specific stemming filter. See https://learn.microsoft.com/rest/api/searchservice/Custom-analyzers-in-Azure-Search#TokenFilters */
    KnownTokenFilterName["Stemmer"] = "stemmer";
    /** Removes stop words from a token stream. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/StopFilter.html */
    KnownTokenFilterName["Stopwords"] = "stopwords";
    /** Trims leading and trailing whitespace from tokens. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/TrimFilter.html */
    KnownTokenFilterName["Trim"] = "trim";
    /** Truncates the terms to a specific length. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/TruncateTokenFilter.html */
    KnownTokenFilterName["Truncate"] = "truncate";
    /** Filters out tokens with same text as the previous token. See http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/RemoveDuplicatesTokenFilter.html */
    KnownTokenFilterName["Unique"] = "unique";
    /** Normalizes token text to upper case. See https://lucene.apache.org/core/6_6_1/analyzers-common/org/apache/lucene/analysis/core/UpperCaseFilter.html */
    KnownTokenFilterName["Uppercase"] = "uppercase";
    /** Splits words into subwords and performs optional transformations on subword groups. */
    KnownTokenFilterName["WordDelimiter"] = "word_delimiter";
})(KnownTokenFilterName || (KnownTokenFilterName = {}));
/** Defines the names of all character filters supported by the search engine. */
export var KnownCharFilterName;
(function (KnownCharFilterName) {
    /** A character filter that attempts to strip out HTML constructs. See https://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/charfilter/HTMLStripCharFilter.html */
    KnownCharFilterName["HtmlStrip"] = "html_strip";
})(KnownCharFilterName || (KnownCharFilterName = {}));
export function patternAnalyzerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        lowercase: item["lowerCaseTerms"],
        pattern: item["pattern"],
        flags: !item["flags"]
            ? item["flags"]
            : buildPipeCollection(item["flags"].map((p) => {
                return p;
            })),
        stopwords: !item["stopwords"]
            ? item["stopwords"]
            : item["stopwords"].map((p) => {
                return p;
            }),
    };
}
export function patternAnalyzerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        lowerCaseTerms: item["lowercase"],
        pattern: item["pattern"],
        flags: item["flags"] === null || item["flags"] === undefined
            ? item["flags"]
            : parsePipeCollection(item["flags"]),
        stopwords: !item["stopwords"]
            ? item["stopwords"]
            : item["stopwords"].map((p) => {
                return p;
            }),
    };
}
/** Defines a regular expression flag that can be used in the pattern analyzer and pattern tokenizer. */
export var KnownRegexFlags;
(function (KnownRegexFlags) {
    /** Enables canonical equivalence. */
    KnownRegexFlags["CanonEq"] = "CANON_EQ";
    /** Enables case-insensitive matching. */
    KnownRegexFlags["CaseInsensitive"] = "CASE_INSENSITIVE";
    /** Permits whitespace and comments in the pattern. */
    KnownRegexFlags["Comments"] = "COMMENTS";
    /** Enables dotall mode. */
    KnownRegexFlags["DotAll"] = "DOTALL";
    /** Enables literal parsing of the pattern. */
    KnownRegexFlags["Literal"] = "LITERAL";
    /** Enables multiline mode. */
    KnownRegexFlags["Multiline"] = "MULTILINE";
    /** Enables Unicode-aware case folding. */
    KnownRegexFlags["UnicodeCase"] = "UNICODE_CASE";
    /** Enables Unix lines mode. */
    KnownRegexFlags["UnixLines"] = "UNIX_LINES";
})(KnownRegexFlags || (KnownRegexFlags = {}));
export function luceneStandardAnalyzerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
        stopwords: !item["stopwords"]
            ? item["stopwords"]
            : item["stopwords"].map((p) => {
                return p;
            }),
    };
}
export function luceneStandardAnalyzerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
        stopwords: !item["stopwords"]
            ? item["stopwords"]
            : item["stopwords"].map((p) => {
                return p;
            }),
    };
}
export function stopAnalyzerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        stopwords: !item["stopwords"]
            ? item["stopwords"]
            : item["stopwords"].map((p) => {
                return p;
            }),
    };
}
export function stopAnalyzerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        stopwords: !item["stopwords"]
            ? item["stopwords"]
            : item["stopwords"].map((p) => {
                return p;
            }),
    };
}
export function lexicalTokenizerUnionArraySerializer(result) {
    return result.map((item) => {
        return lexicalTokenizerUnionSerializer(item);
    });
}
export function lexicalTokenizerUnionArrayDeserializer(result) {
    return result.map((item) => {
        return lexicalTokenizerUnionDeserializer(item);
    });
}
export function lexicalTokenizerSerializer(item) {
    return { "@odata.type": item["odatatype"], name: item["name"] };
}
export function lexicalTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
    };
}
export function lexicalTokenizerUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.ClassicTokenizer":
            return classicTokenizerSerializer(item);
        case "#Microsoft.Azure.Search.EdgeNGramTokenizer":
            return edgeNGramTokenizerSerializer(item);
        case "#Microsoft.Azure.Search.KeywordTokenizer":
            return keywordTokenizerSerializer(item);
        case "#Microsoft.Azure.Search.KeywordTokenizerV2":
            return keywordTokenizerV2Serializer(item);
        case "#Microsoft.Azure.Search.MicrosoftLanguageTokenizer":
            return microsoftLanguageTokenizerSerializer(item);
        case "#Microsoft.Azure.Search.MicrosoftLanguageStemmingTokenizer":
            return microsoftLanguageStemmingTokenizerSerializer(item);
        case "#Microsoft.Azure.Search.NGramTokenizer":
            return nGramTokenizerSerializer(item);
        case "#Microsoft.Azure.Search.PathHierarchyTokenizerV2":
            return pathHierarchyTokenizerV2Serializer(item);
        case "#Microsoft.Azure.Search.PatternTokenizer":
            return patternTokenizerSerializer(item);
        case "#Microsoft.Azure.Search.StandardTokenizer":
            return luceneStandardTokenizerSerializer(item);
        case "#Microsoft.Azure.Search.StandardTokenizerV2":
            return luceneStandardTokenizerV2Serializer(item);
        case "#Microsoft.Azure.Search.UaxUrlEmailTokenizer":
            return uaxUrlEmailTokenizerSerializer(item);
        default:
            return lexicalTokenizerSerializer(item);
    }
}
export function lexicalTokenizerUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.ClassicTokenizer":
            return classicTokenizerDeserializer(item);
        case "#Microsoft.Azure.Search.EdgeNGramTokenizer":
            return edgeNGramTokenizerDeserializer(item);
        case "#Microsoft.Azure.Search.KeywordTokenizer":
            return keywordTokenizerDeserializer(item);
        case "#Microsoft.Azure.Search.KeywordTokenizerV2":
            return keywordTokenizerV2Deserializer(item);
        case "#Microsoft.Azure.Search.MicrosoftLanguageTokenizer":
            return microsoftLanguageTokenizerDeserializer(item);
        case "#Microsoft.Azure.Search.MicrosoftLanguageStemmingTokenizer":
            return microsoftLanguageStemmingTokenizerDeserializer(item);
        case "#Microsoft.Azure.Search.NGramTokenizer":
            return nGramTokenizerDeserializer(item);
        case "#Microsoft.Azure.Search.PathHierarchyTokenizerV2":
            return pathHierarchyTokenizerV2Deserializer(item);
        case "#Microsoft.Azure.Search.PatternTokenizer":
            return patternTokenizerDeserializer(item);
        case "#Microsoft.Azure.Search.StandardTokenizer":
            return luceneStandardTokenizerDeserializer(item);
        case "#Microsoft.Azure.Search.StandardTokenizerV2":
            return luceneStandardTokenizerV2Deserializer(item);
        case "#Microsoft.Azure.Search.UaxUrlEmailTokenizer":
            return uaxUrlEmailTokenizerDeserializer(item);
        default:
            return lexicalTokenizerDeserializer(item);
    }
}
export function classicTokenizerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function classicTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function edgeNGramTokenizerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
        tokenChars: !item["tokenChars"]
            ? item["tokenChars"]
            : item["tokenChars"].map((p) => {
                return p;
            }),
    };
}
export function edgeNGramTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
        tokenChars: !item["tokenChars"]
            ? item["tokenChars"]
            : item["tokenChars"].map((p) => {
                return p;
            }),
    };
}
export function keywordTokenizerSerializer(item) {
    return { "@odata.type": item["odatatype"], name: item["name"], bufferSize: item["bufferSize"] };
}
export function keywordTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        bufferSize: item["bufferSize"],
    };
}
export function keywordTokenizerV2Serializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function keywordTokenizerV2Deserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function microsoftLanguageTokenizerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
        isSearchTokenizer: item["isSearchTokenizer"],
        language: item["language"],
    };
}
export function microsoftLanguageTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
        isSearchTokenizer: item["isSearchTokenizer"],
        language: item["language"],
    };
}
export function microsoftLanguageStemmingTokenizerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
        isSearchTokenizer: item["isSearchTokenizer"],
        language: item["language"],
    };
}
export function microsoftLanguageStemmingTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
        isSearchTokenizer: item["isSearchTokenizer"],
        language: item["language"],
    };
}
export function nGramTokenizerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
        tokenChars: !item["tokenChars"]
            ? item["tokenChars"]
            : item["tokenChars"].map((p) => {
                return p;
            }),
    };
}
export function nGramTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
        tokenChars: !item["tokenChars"]
            ? item["tokenChars"]
            : item["tokenChars"].map((p) => {
                return p;
            }),
    };
}
export function pathHierarchyTokenizerV2Serializer(item) {
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
export function pathHierarchyTokenizerV2Deserializer(item) {
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
export function patternTokenizerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        pattern: item["pattern"],
        flags: !item["flags"]
            ? item["flags"]
            : buildPipeCollection(item["flags"].map((p) => {
                return p;
            })),
        group: item["group"],
    };
}
export function patternTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        pattern: item["pattern"],
        flags: item["flags"] === null || item["flags"] === undefined
            ? item["flags"]
            : parsePipeCollection(item["flags"]),
        group: item["group"],
    };
}
export function luceneStandardTokenizerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function luceneStandardTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function luceneStandardTokenizerV2Serializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function luceneStandardTokenizerV2Deserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function uaxUrlEmailTokenizerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function uaxUrlEmailTokenizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        maxTokenLength: item["maxTokenLength"],
    };
}
export function tokenFilterUnionArraySerializer(result) {
    return result.map((item) => {
        return tokenFilterUnionSerializer(item);
    });
}
export function tokenFilterUnionArrayDeserializer(result) {
    return result.map((item) => {
        return tokenFilterUnionDeserializer(item);
    });
}
export function tokenFilterSerializer(item) {
    return { "@odata.type": item["odatatype"], name: item["name"] };
}
export function tokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
    };
}
export function tokenFilterUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.AsciiFoldingTokenFilter":
            return asciiFoldingTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.CjkBigramTokenFilter":
            return cjkBigramTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.CommonGramTokenFilter":
            return commonGramTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.DictionaryDecompounderTokenFilter":
            return dictionaryDecompounderTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.EdgeNGramTokenFilter":
            return edgeNGramTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.EdgeNGramTokenFilterV2":
            return edgeNGramTokenFilterV2Serializer(item);
        case "#Microsoft.Azure.Search.ElisionTokenFilter":
            return elisionTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.KeepTokenFilter":
            return keepTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.KeywordMarkerTokenFilter":
            return keywordMarkerTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.LengthTokenFilter":
            return lengthTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.LimitTokenFilter":
            return limitTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.NGramTokenFilter":
            return nGramTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.NGramTokenFilterV2":
            return nGramTokenFilterV2Serializer(item);
        case "#Microsoft.Azure.Search.PatternCaptureTokenFilter":
            return patternCaptureTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.PatternReplaceTokenFilter":
            return patternReplaceTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.PhoneticTokenFilter":
            return phoneticTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.ShingleTokenFilter":
            return shingleTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.SnowballTokenFilter":
            return snowballTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.StemmerTokenFilter":
            return stemmerTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.StemmerOverrideTokenFilter":
            return stemmerOverrideTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.StopwordsTokenFilter":
            return stopwordsTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.SynonymTokenFilter":
            return synonymTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.TruncateTokenFilter":
            return truncateTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.UniqueTokenFilter":
            return uniqueTokenFilterSerializer(item);
        case "#Microsoft.Azure.Search.WordDelimiterTokenFilter":
            return wordDelimiterTokenFilterSerializer(item);
        default:
            return tokenFilterSerializer(item);
    }
}
export function tokenFilterUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.AsciiFoldingTokenFilter":
            return asciiFoldingTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.CjkBigramTokenFilter":
            return cjkBigramTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.CommonGramTokenFilter":
            return commonGramTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.DictionaryDecompounderTokenFilter":
            return dictionaryDecompounderTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.EdgeNGramTokenFilter":
            return edgeNGramTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.EdgeNGramTokenFilterV2":
            return edgeNGramTokenFilterV2Deserializer(item);
        case "#Microsoft.Azure.Search.ElisionTokenFilter":
            return elisionTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.KeepTokenFilter":
            return keepTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.KeywordMarkerTokenFilter":
            return keywordMarkerTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.LengthTokenFilter":
            return lengthTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.LimitTokenFilter":
            return limitTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.NGramTokenFilter":
            return nGramTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.NGramTokenFilterV2":
            return nGramTokenFilterV2Deserializer(item);
        case "#Microsoft.Azure.Search.PatternCaptureTokenFilter":
            return patternCaptureTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.PatternReplaceTokenFilter":
            return patternReplaceTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.PhoneticTokenFilter":
            return phoneticTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.ShingleTokenFilter":
            return shingleTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.SnowballTokenFilter":
            return snowballTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.StemmerTokenFilter":
            return stemmerTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.StemmerOverrideTokenFilter":
            return stemmerOverrideTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.StopwordsTokenFilter":
            return stopwordsTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.SynonymTokenFilter":
            return synonymTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.TruncateTokenFilter":
            return truncateTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.UniqueTokenFilter":
            return uniqueTokenFilterDeserializer(item);
        case "#Microsoft.Azure.Search.WordDelimiterTokenFilter":
            return wordDelimiterTokenFilterDeserializer(item);
        default:
            return tokenFilterDeserializer(item);
    }
}
export function asciiFoldingTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        preserveOriginal: item["preserveOriginal"],
    };
}
export function asciiFoldingTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        preserveOriginal: item["preserveOriginal"],
    };
}
export function cjkBigramTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        ignoreScripts: !item["ignoreScripts"]
            ? item["ignoreScripts"]
            : item["ignoreScripts"].map((p) => {
                return p;
            }),
        outputUnigrams: item["outputUnigrams"],
    };
}
export function cjkBigramTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        ignoreScripts: !item["ignoreScripts"]
            ? item["ignoreScripts"]
            : item["ignoreScripts"].map((p) => {
                return p;
            }),
        outputUnigrams: item["outputUnigrams"],
    };
}
export function commonGramTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        commonWords: item["commonWords"].map((p) => {
            return p;
        }),
        ignoreCase: item["ignoreCase"],
        queryMode: item["useQueryMode"],
    };
}
export function commonGramTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        commonWords: item["commonWords"].map((p) => {
            return p;
        }),
        ignoreCase: item["ignoreCase"],
        useQueryMode: item["queryMode"],
    };
}
export function dictionaryDecompounderTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        wordList: item["wordList"].map((p) => {
            return p;
        }),
        minWordSize: item["minWordSize"],
        minSubwordSize: item["minSubwordSize"],
        maxSubwordSize: item["maxSubwordSize"],
        onlyLongestMatch: item["onlyLongestMatch"],
    };
}
export function dictionaryDecompounderTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        wordList: item["wordList"].map((p) => {
            return p;
        }),
        minWordSize: item["minWordSize"],
        minSubwordSize: item["minSubwordSize"],
        maxSubwordSize: item["maxSubwordSize"],
        onlyLongestMatch: item["onlyLongestMatch"],
    };
}
export function edgeNGramTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
        side: item["side"],
    };
}
export function edgeNGramTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
        side: item["side"],
    };
}
export function edgeNGramTokenFilterV2Serializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
        side: item["side"],
    };
}
export function edgeNGramTokenFilterV2Deserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
        side: item["side"],
    };
}
export function elisionTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        articles: !item["articles"]
            ? item["articles"]
            : item["articles"].map((p) => {
                return p;
            }),
    };
}
export function elisionTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        articles: !item["articles"]
            ? item["articles"]
            : item["articles"].map((p) => {
                return p;
            }),
    };
}
export function keepTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        keepWords: item["keepWords"].map((p) => {
            return p;
        }),
        keepWordsCase: item["lowerCaseKeepWords"],
    };
}
export function keepTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        keepWords: item["keepWords"].map((p) => {
            return p;
        }),
        lowerCaseKeepWords: item["keepWordsCase"],
    };
}
export function keywordMarkerTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        keywords: item["keywords"].map((p) => {
            return p;
        }),
        ignoreCase: item["ignoreCase"],
    };
}
export function keywordMarkerTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        keywords: item["keywords"].map((p) => {
            return p;
        }),
        ignoreCase: item["ignoreCase"],
    };
}
export function lengthTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        min: item["minLength"],
        max: item["maxLength"],
    };
}
export function lengthTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        minLength: item["min"],
        maxLength: item["max"],
    };
}
export function limitTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        maxTokenCount: item["maxTokenCount"],
        consumeAllTokens: item["consumeAllTokens"],
    };
}
export function limitTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        maxTokenCount: item["maxTokenCount"],
        consumeAllTokens: item["consumeAllTokens"],
    };
}
export function nGramTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
    };
}
export function nGramTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
    };
}
export function nGramTokenFilterV2Serializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
    };
}
export function nGramTokenFilterV2Deserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        minGram: item["minGram"],
        maxGram: item["maxGram"],
    };
}
export function patternCaptureTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        patterns: item["patterns"].map((p) => {
            return p;
        }),
        preserveOriginal: item["preserveOriginal"],
    };
}
export function patternCaptureTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        patterns: item["patterns"].map((p) => {
            return p;
        }),
        preserveOriginal: item["preserveOriginal"],
    };
}
export function patternReplaceTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        pattern: item["pattern"],
        replacement: item["replacement"],
    };
}
export function patternReplaceTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        pattern: item["pattern"],
        replacement: item["replacement"],
    };
}
export function phoneticTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        encoder: item["encoder"],
        replace: item["replaceOriginalTokens"],
    };
}
export function phoneticTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        encoder: item["encoder"],
        replaceOriginalTokens: item["replace"],
    };
}
export function shingleTokenFilterSerializer(item) {
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
export function shingleTokenFilterDeserializer(item) {
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
export function snowballTokenFilterSerializer(item) {
    return { "@odata.type": item["odatatype"], name: item["name"], language: item["language"] };
}
export function snowballTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        language: item["language"],
    };
}
export function stemmerTokenFilterSerializer(item) {
    return { "@odata.type": item["odatatype"], name: item["name"], language: item["language"] };
}
export function stemmerTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        language: item["language"],
    };
}
export function stemmerOverrideTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        rules: item["rules"].map((p) => {
            return p;
        }),
    };
}
export function stemmerOverrideTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        rules: item["rules"].map((p) => {
            return p;
        }),
    };
}
export function stopwordsTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        stopwords: !item["stopwords"]
            ? item["stopwords"]
            : item["stopwords"].map((p) => {
                return p;
            }),
        stopwordsList: item["stopwordsList"],
        ignoreCase: item["ignoreCase"],
        removeTrailing: item["removeTrailingStopWords"],
    };
}
export function stopwordsTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        stopwords: !item["stopwords"]
            ? item["stopwords"]
            : item["stopwords"].map((p) => {
                return p;
            }),
        stopwordsList: item["stopwordsList"],
        ignoreCase: item["ignoreCase"],
        removeTrailingStopWords: item["removeTrailing"],
    };
}
export function synonymTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        synonyms: item["synonyms"].map((p) => {
            return p;
        }),
        ignoreCase: item["ignoreCase"],
        expand: item["expand"],
    };
}
export function synonymTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        synonyms: item["synonyms"].map((p) => {
            return p;
        }),
        ignoreCase: item["ignoreCase"],
        expand: item["expand"],
    };
}
export function truncateTokenFilterSerializer(item) {
    return { "@odata.type": item["odatatype"], name: item["name"], length: item["length"] };
}
export function truncateTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        length: item["length"],
    };
}
export function uniqueTokenFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        onlyOnSamePosition: item["onlyOnSamePosition"],
    };
}
export function uniqueTokenFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        onlyOnSamePosition: item["onlyOnSamePosition"],
    };
}
export function wordDelimiterTokenFilterSerializer(item) {
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
            : item["protectedWords"].map((p) => {
                return p;
            }),
    };
}
export function wordDelimiterTokenFilterDeserializer(item) {
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
            : item["protectedWords"].map((p) => {
                return p;
            }),
    };
}
export function charFilterUnionArraySerializer(result) {
    return result.map((item) => {
        return charFilterUnionSerializer(item);
    });
}
export function charFilterUnionArrayDeserializer(result) {
    return result.map((item) => {
        return charFilterUnionDeserializer(item);
    });
}
export function charFilterSerializer(item) {
    return { "@odata.type": item["odatatype"], name: item["name"] };
}
export function charFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
    };
}
export function charFilterUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.MappingCharFilter":
            return mappingCharFilterSerializer(item);
        case "#Microsoft.Azure.Search.PatternReplaceCharFilter":
            return patternReplaceCharFilterSerializer(item);
        default:
            return charFilterSerializer(item);
    }
}
export function charFilterUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.MappingCharFilter":
            return mappingCharFilterDeserializer(item);
        case "#Microsoft.Azure.Search.PatternReplaceCharFilter":
            return patternReplaceCharFilterDeserializer(item);
        default:
            return charFilterDeserializer(item);
    }
}
export function mappingCharFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        mappings: item["mappings"].map((p) => {
            return p;
        }),
    };
}
export function mappingCharFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        mappings: item["mappings"].map((p) => {
            return p;
        }),
    };
}
export function patternReplaceCharFilterSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        pattern: item["pattern"],
        replacement: item["replacement"],
    };
}
export function patternReplaceCharFilterDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        pattern: item["pattern"],
        replacement: item["replacement"],
    };
}
export function lexicalNormalizerUnionArraySerializer(result) {
    return result.map((item) => {
        return lexicalNormalizerUnionSerializer(item);
    });
}
export function lexicalNormalizerUnionArrayDeserializer(result) {
    return result.map((item) => {
        return lexicalNormalizerUnionDeserializer(item);
    });
}
export function lexicalNormalizerSerializer(item) {
    return { "@odata.type": item["odatatype"], name: item["name"] };
}
export function lexicalNormalizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
    };
}
export function lexicalNormalizerUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.CustomNormalizer":
            return customNormalizerSerializer(item);
        default:
            return lexicalNormalizerSerializer(item);
    }
}
export function lexicalNormalizerUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.CustomNormalizer":
            return customNormalizerDeserializer(item);
        default:
            return lexicalNormalizerDeserializer(item);
    }
}
export function customNormalizerSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        tokenFilters: !item["tokenFilters"]
            ? item["tokenFilters"]
            : item["tokenFilters"].map((p) => {
                return p;
            }),
        charFilters: !item["charFilters"]
            ? item["charFilters"]
            : item["charFilters"].map((p) => {
                return p;
            }),
    };
}
export function customNormalizerDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        tokenFilters: !item["tokenFilters"]
            ? item["tokenFilters"]
            : item["tokenFilters"].map((p) => {
                return p;
            }),
        charFilters: !item["charFilters"]
            ? item["charFilters"]
            : item["charFilters"].map((p) => {
                return p;
            }),
    };
}
export function similarityAlgorithmSerializer(item) {
    return { "@odata.type": item["odatatype"] };
}
export function similarityAlgorithmDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
    };
}
export function similarityAlgorithmUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.ClassicSimilarity":
            return classicSimilaritySerializer(item);
        case "#Microsoft.Azure.Search.BM25Similarity":
            return bm25SimilaritySerializer(item);
        default:
            return similarityAlgorithmSerializer(item);
    }
}
export function similarityAlgorithmUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.ClassicSimilarity":
            return classicSimilarityDeserializer(item);
        case "#Microsoft.Azure.Search.BM25Similarity":
            return bm25SimilarityDeserializer(item);
        default:
            return similarityAlgorithmDeserializer(item);
    }
}
export function classicSimilaritySerializer(item) {
    return { "@odata.type": item["odatatype"] };
}
export function classicSimilarityDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
    };
}
export function bm25SimilaritySerializer(item) {
    return { "@odata.type": item["odatatype"], k1: item["k1"], b: item["b"] };
}
export function bm25SimilarityDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        k1: item["k1"],
        b: item["b"],
    };
}
export function semanticSearchSerializer(item) {
    return {
        defaultConfiguration: item["defaultConfigurationName"],
        configurations: !item["configurations"]
            ? item["configurations"]
            : semanticConfigurationArraySerializer(item["configurations"]),
    };
}
export function semanticSearchDeserializer(item) {
    return {
        defaultConfigurationName: item["defaultConfiguration"],
        configurations: !item["configurations"]
            ? item["configurations"]
            : semanticConfigurationArrayDeserializer(item["configurations"]),
    };
}
export function semanticConfigurationArraySerializer(result) {
    return result.map((item) => {
        return semanticConfigurationSerializer(item);
    });
}
export function semanticConfigurationArrayDeserializer(result) {
    return result.map((item) => {
        return semanticConfigurationDeserializer(item);
    });
}
export function semanticConfigurationSerializer(item) {
    return {
        name: item["name"],
        prioritizedFields: semanticPrioritizedFieldsSerializer(item["prioritizedFields"]),
        rankingOrder: item["rankingOrder"],
        flightingOptIn: item["flightingOptIn"],
    };
}
export function semanticConfigurationDeserializer(item) {
    return {
        name: item["name"],
        prioritizedFields: semanticPrioritizedFieldsDeserializer(item["prioritizedFields"]),
        rankingOrder: item["rankingOrder"],
        flightingOptIn: item["flightingOptIn"],
    };
}
export function semanticPrioritizedFieldsSerializer(item) {
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
export function semanticPrioritizedFieldsDeserializer(item) {
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
export function semanticFieldSerializer(item) {
    return { fieldName: item["name"] };
}
export function semanticFieldDeserializer(item) {
    return {
        name: item["fieldName"],
    };
}
export function semanticFieldArraySerializer(result) {
    return result.map((item) => {
        return semanticFieldSerializer(item);
    });
}
export function semanticFieldArrayDeserializer(result) {
    return result.map((item) => {
        return semanticFieldDeserializer(item);
    });
}
/** Represents score to use for sort order of documents. */
export var KnownRankingOrder;
(function (KnownRankingOrder) {
    /** Sets sort order as BoostedRerankerScore */
    KnownRankingOrder["BoostedRerankerScore"] = "BoostedRerankerScore";
    /** Sets sort order as ReRankerScore */
    KnownRankingOrder["RerankerScore"] = "RerankerScore";
})(KnownRankingOrder || (KnownRankingOrder = {}));
export function vectorSearchSerializer(item) {
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
export function vectorSearchDeserializer(item) {
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
export function vectorSearchProfileArraySerializer(result) {
    return result.map((item) => {
        return vectorSearchProfileSerializer(item);
    });
}
export function vectorSearchProfileArrayDeserializer(result) {
    return result.map((item) => {
        return vectorSearchProfileDeserializer(item);
    });
}
export function vectorSearchProfileSerializer(item) {
    return {
        name: item["name"],
        algorithm: item["algorithmConfigurationName"],
        vectorizer: item["vectorizerName"],
        compression: item["compressionName"],
    };
}
export function vectorSearchProfileDeserializer(item) {
    return {
        name: item["name"],
        algorithmConfigurationName: item["algorithm"],
        vectorizerName: item["vectorizer"],
        compressionName: item["compression"],
    };
}
export function vectorSearchAlgorithmConfigurationUnionArraySerializer(result) {
    return result.map((item) => {
        return vectorSearchAlgorithmConfigurationUnionSerializer(item);
    });
}
export function vectorSearchAlgorithmConfigurationUnionArrayDeserializer(result) {
    return result.map((item) => {
        return vectorSearchAlgorithmConfigurationUnionDeserializer(item);
    });
}
export function vectorSearchAlgorithmConfigurationSerializer(item) {
    return { name: item["name"], kind: item["kind"] };
}
export function vectorSearchAlgorithmConfigurationDeserializer(item) {
    return {
        name: item["name"],
        kind: item["kind"],
    };
}
export function vectorSearchAlgorithmConfigurationUnionSerializer(item) {
    switch (item.kind) {
        case "hnsw":
            return hnswAlgorithmConfigurationSerializer(item);
        case "exhaustiveKnn":
            return exhaustiveKnnAlgorithmConfigurationSerializer(item);
        default:
            return vectorSearchAlgorithmConfigurationSerializer(item);
    }
}
export function vectorSearchAlgorithmConfigurationUnionDeserializer(item) {
    switch (item["kind"]) {
        case "hnsw":
            return hnswAlgorithmConfigurationDeserializer(item);
        case "exhaustiveKnn":
            return exhaustiveKnnAlgorithmConfigurationDeserializer(item);
        default:
            return vectorSearchAlgorithmConfigurationDeserializer(item);
    }
}
/** The algorithm used for indexing and querying. */
export var KnownVectorSearchAlgorithmKind;
(function (KnownVectorSearchAlgorithmKind) {
    /** HNSW (Hierarchical Navigable Small World), a type of approximate nearest neighbors algorithm. */
    KnownVectorSearchAlgorithmKind["Hnsw"] = "hnsw";
    /** Exhaustive KNN algorithm which will perform brute-force search. */
    KnownVectorSearchAlgorithmKind["ExhaustiveKnn"] = "exhaustiveKnn";
})(KnownVectorSearchAlgorithmKind || (KnownVectorSearchAlgorithmKind = {}));
export function hnswAlgorithmConfigurationSerializer(item) {
    return {
        name: item["name"],
        kind: item["kind"],
        hnswParameters: !item["parameters"]
            ? item["parameters"]
            : hnswParametersSerializer(item["parameters"]),
    };
}
export function hnswAlgorithmConfigurationDeserializer(item) {
    return {
        name: item["name"],
        kind: item["kind"],
        parameters: !item["hnswParameters"]
            ? item["hnswParameters"]
            : hnswParametersDeserializer(item["hnswParameters"]),
    };
}
export function hnswParametersSerializer(item) {
    return {
        m: item["m"],
        efConstruction: item["efConstruction"],
        efSearch: item["efSearch"],
        metric: item["metric"],
    };
}
export function hnswParametersDeserializer(item) {
    return {
        m: item["m"],
        efConstruction: item["efConstruction"],
        efSearch: item["efSearch"],
        metric: item["metric"],
    };
}
/** The similarity metric to use for vector comparisons. It is recommended to choose the same similarity metric as the embedding model was trained on. */
export var KnownVectorSearchAlgorithmMetric;
(function (KnownVectorSearchAlgorithmMetric) {
    /** Measures the angle between vectors to quantify their similarity, disregarding magnitude. The smaller the angle, the closer the similarity. */
    KnownVectorSearchAlgorithmMetric["Cosine"] = "cosine";
    /** Computes the straight-line distance between vectors in a multi-dimensional space. The smaller the distance, the closer the similarity. */
    KnownVectorSearchAlgorithmMetric["Euclidean"] = "euclidean";
    /** Calculates the sum of element-wise products to gauge alignment and magnitude similarity. The larger and more positive, the closer the similarity. */
    KnownVectorSearchAlgorithmMetric["DotProduct"] = "dotProduct";
    /** Only applicable to bit-packed binary data types. Determines dissimilarity by counting differing positions in binary vectors. The fewer differences, the closer the similarity. */
    KnownVectorSearchAlgorithmMetric["Hamming"] = "hamming";
})(KnownVectorSearchAlgorithmMetric || (KnownVectorSearchAlgorithmMetric = {}));
export function exhaustiveKnnAlgorithmConfigurationSerializer(item) {
    return {
        name: item["name"],
        kind: item["kind"],
        exhaustiveKnnParameters: !item["parameters"]
            ? item["parameters"]
            : exhaustiveKnnParametersSerializer(item["parameters"]),
    };
}
export function exhaustiveKnnAlgorithmConfigurationDeserializer(item) {
    return {
        name: item["name"],
        kind: item["kind"],
        parameters: !item["exhaustiveKnnParameters"]
            ? item["exhaustiveKnnParameters"]
            : exhaustiveKnnParametersDeserializer(item["exhaustiveKnnParameters"]),
    };
}
export function exhaustiveKnnParametersSerializer(item) {
    return { metric: item["metric"] };
}
export function exhaustiveKnnParametersDeserializer(item) {
    return {
        metric: item["metric"],
    };
}
export function vectorSearchVectorizerUnionArraySerializer(result) {
    return result.map((item) => {
        return vectorSearchVectorizerUnionSerializer(item);
    });
}
export function vectorSearchVectorizerUnionArrayDeserializer(result) {
    return result.map((item) => {
        return vectorSearchVectorizerUnionDeserializer(item);
    });
}
export function vectorSearchVectorizerSerializer(item) {
    return { name: item["vectorizerName"], kind: item["kind"] };
}
export function vectorSearchVectorizerDeserializer(item) {
    return {
        vectorizerName: item["name"],
        kind: item["kind"],
    };
}
export function vectorSearchVectorizerUnionSerializer(item) {
    switch (item.kind) {
        case "azureOpenAI":
            return azureOpenAIVectorizerSerializer(item);
        case "customWebApi":
            return webApiVectorizerSerializer(item);
        case "aiServicesVision":
            return aiServicesVisionVectorizerSerializer(item);
        case "aml":
            return azureMachineLearningVectorizerSerializer(item);
        default:
            return vectorSearchVectorizerSerializer(item);
    }
}
export function vectorSearchVectorizerUnionDeserializer(item) {
    switch (item["kind"]) {
        case "azureOpenAI":
            return azureOpenAIVectorizerDeserializer(item);
        case "customWebApi":
            return webApiVectorizerDeserializer(item);
        case "aiServicesVision":
            return aiServicesVisionVectorizerDeserializer(item);
        case "aml":
            return azureMachineLearningVectorizerDeserializer(item);
        default:
            return vectorSearchVectorizerDeserializer(item);
    }
}
/** The vectorization method to be used during query time. */
export var KnownVectorSearchVectorizerKind;
(function (KnownVectorSearchVectorizerKind) {
    /** Generate embeddings using an Azure OpenAI resource at query time. */
    KnownVectorSearchVectorizerKind["AzureOpenAI"] = "azureOpenAI";
    /** Generate embeddings using a custom web endpoint at query time. */
    KnownVectorSearchVectorizerKind["CustomWebApi"] = "customWebApi";
    /** Generate embeddings for an image or text input at query time using the Azure AI Services Vision Vectorize API. */
    KnownVectorSearchVectorizerKind["AIServicesVision"] = "aiServicesVision";
    /** Generate embeddings using an Azure Machine Learning endpoint deployed via the Azure AI Foundry Model Catalog at query time. */
    KnownVectorSearchVectorizerKind["AML"] = "aml";
})(KnownVectorSearchVectorizerKind || (KnownVectorSearchVectorizerKind = {}));
export function azureOpenAIVectorizerSerializer(item) {
    return {
        name: item["vectorizerName"],
        kind: item["kind"],
        azureOpenAIParameters: !item["parameters"]
            ? item["parameters"]
            : azureOpenAIVectorizerParametersSerializer(item["parameters"]),
    };
}
export function azureOpenAIVectorizerDeserializer(item) {
    return {
        vectorizerName: item["name"],
        kind: item["kind"],
        parameters: !item["azureOpenAIParameters"]
            ? item["azureOpenAIParameters"]
            : azureOpenAIVectorizerParametersDeserializer(item["azureOpenAIParameters"]),
    };
}
export function azureOpenAIVectorizerParametersSerializer(item) {
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
export function azureOpenAIVectorizerParametersDeserializer(item) {
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
export var KnownAzureOpenAIModelName;
(function (KnownAzureOpenAIModelName) {
    /** TextEmbeddingAda002 model. */
    KnownAzureOpenAIModelName["TextEmbeddingAda002"] = "text-embedding-ada-002";
    /** TextEmbedding3Large model. */
    KnownAzureOpenAIModelName["TextEmbedding3Large"] = "text-embedding-3-large";
    /** TextEmbedding3Small model. */
    KnownAzureOpenAIModelName["TextEmbedding3Small"] = "text-embedding-3-small";
    /** Gpt4o model. */
    KnownAzureOpenAIModelName["Gpt4O"] = "gpt-4o";
    /** Gpt4oMini model. */
    KnownAzureOpenAIModelName["Gpt4OMini"] = "gpt-4o-mini";
    /** Gpt41 model. */
    KnownAzureOpenAIModelName["Gpt41"] = "gpt-4.1";
    /** Gpt41Mini model. */
    KnownAzureOpenAIModelName["Gpt41Mini"] = "gpt-4.1-mini";
    /** Gpt41Nano model. */
    KnownAzureOpenAIModelName["Gpt41Nano"] = "gpt-4.1-nano";
    /** Gpt5 model. */
    KnownAzureOpenAIModelName["Gpt5"] = "gpt-5";
    /** Gpt5Mini model. */
    KnownAzureOpenAIModelName["Gpt5Mini"] = "gpt-5-mini";
    /** Gpt5Nano model. */
    KnownAzureOpenAIModelName["Gpt5Nano"] = "gpt-5-nano";
    /** Gpt51 model. */
    KnownAzureOpenAIModelName["Gpt51"] = "gpt-5.1";
    /** Gpt52 model. */
    KnownAzureOpenAIModelName["Gpt52"] = "gpt-5.2";
    /** Gpt54 model. */
    KnownAzureOpenAIModelName["Gpt54"] = "gpt-5.4";
    /** Gpt54Mini model. */
    KnownAzureOpenAIModelName["Gpt54Mini"] = "gpt-5.4-mini";
    /** Gpt54Nano model. */
    KnownAzureOpenAIModelName["Gpt54Nano"] = "gpt-5.4-nano";
})(KnownAzureOpenAIModelName || (KnownAzureOpenAIModelName = {}));
export function webApiVectorizerSerializer(item) {
    return {
        name: item["vectorizerName"],
        kind: item["kind"],
        customWebApiParameters: !item["webApiParameters"]
            ? item["webApiParameters"]
            : webApiVectorizerParametersSerializer(item["webApiParameters"]),
    };
}
export function webApiVectorizerDeserializer(item) {
    return {
        vectorizerName: item["name"],
        kind: item["kind"],
        webApiParameters: !item["customWebApiParameters"]
            ? item["customWebApiParameters"]
            : webApiVectorizerParametersDeserializer(item["customWebApiParameters"]),
    };
}
export function webApiVectorizerParametersSerializer(item) {
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
export function webApiVectorizerParametersDeserializer(item) {
    return {
        uri: item["uri"],
        httpHeaders: !item["httpHeaders"]
            ? item["httpHeaders"]
            : Object.fromEntries(Object.entries(item["httpHeaders"]).map(([k, p]) => [k, p])),
        httpMethod: item["httpMethod"],
        timeout: item["timeout"],
        authResourceId: item["authResourceId"],
        authIdentity: !item["authIdentity"]
            ? item["authIdentity"]
            : searchIndexerDataIdentityUnionDeserializer(item["authIdentity"]),
    };
}
export function aiServicesVisionVectorizerSerializer(item) {
    return {
        name: item["vectorizerName"],
        kind: item["kind"],
        aiServicesVisionParameters: !item["aiServicesVisionParameters"]
            ? item["aiServicesVisionParameters"]
            : aiServicesVisionParametersSerializer(item["aiServicesVisionParameters"]),
    };
}
export function aiServicesVisionVectorizerDeserializer(item) {
    return {
        vectorizerName: item["name"],
        kind: item["kind"],
        aiServicesVisionParameters: !item["aiServicesVisionParameters"]
            ? item["aiServicesVisionParameters"]
            : aiServicesVisionParametersDeserializer(item["aiServicesVisionParameters"]),
    };
}
export function aiServicesVisionParametersSerializer(item) {
    return {
        modelVersion: item["modelVersion"],
        resourceUri: item["resourceUri"],
        apiKey: item["apiKey"],
        authIdentity: !item["authIdentity"]
            ? item["authIdentity"]
            : searchIndexerDataIdentityUnionSerializer(item["authIdentity"]),
    };
}
export function aiServicesVisionParametersDeserializer(item) {
    return {
        modelVersion: item["modelVersion"],
        resourceUri: item["resourceUri"],
        apiKey: item["apiKey"],
        authIdentity: !item["authIdentity"]
            ? item["authIdentity"]
            : searchIndexerDataIdentityUnionDeserializer(item["authIdentity"]),
    };
}
export function azureMachineLearningVectorizerSerializer(item) {
    return {
        name: item["vectorizerName"],
        kind: item["kind"],
        amlParameters: !item["amlParameters"]
            ? item["amlParameters"]
            : azureMachineLearningParametersSerializer(item["amlParameters"]),
    };
}
export function azureMachineLearningVectorizerDeserializer(item) {
    return {
        vectorizerName: item["name"],
        kind: item["kind"],
        amlParameters: !item["amlParameters"]
            ? item["amlParameters"]
            : azureMachineLearningParametersDeserializer(item["amlParameters"]),
    };
}
export function azureMachineLearningParametersSerializer(item) {
    return {
        uri: item["scoringUri"],
        key: item["authenticationKey"],
        resourceId: item["resourceId"],
        timeout: item["timeout"],
        region: item["region"],
        modelName: item["modelName"],
    };
}
export function azureMachineLearningParametersDeserializer(item) {
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
export var KnownAIFoundryModelCatalogName;
(function (KnownAIFoundryModelCatalogName) {
    /** OpenAI-CLIP-Image-Text-Embeddings-vit-base-patch32 */
    KnownAIFoundryModelCatalogName["OpenAIClipImageTextEmbeddingsVitBasePatch32"] = "OpenAI-CLIP-Image-Text-Embeddings-vit-base-patch32";
    /** OpenAI-CLIP-Image-Text-Embeddings-ViT-Large-Patch14-336 */
    KnownAIFoundryModelCatalogName["OpenAIClipImageTextEmbeddingsViTLargePatch14336"] = "OpenAI-CLIP-Image-Text-Embeddings-ViT-Large-Patch14-336";
    /** Facebook-DinoV2-Image-Embeddings-ViT-Base */
    KnownAIFoundryModelCatalogName["FacebookDinoV2ImageEmbeddingsViTBase"] = "Facebook-DinoV2-Image-Embeddings-ViT-Base";
    /** Facebook-DinoV2-Image-Embeddings-ViT-Giant */
    KnownAIFoundryModelCatalogName["FacebookDinoV2ImageEmbeddingsViTGiant"] = "Facebook-DinoV2-Image-Embeddings-ViT-Giant";
    /** Cohere-embed-v3-english */
    KnownAIFoundryModelCatalogName["CohereEmbedV3English"] = "Cohere-embed-v3-english";
    /** Cohere-embed-v3-multilingual */
    KnownAIFoundryModelCatalogName["CohereEmbedV3Multilingual"] = "Cohere-embed-v3-multilingual";
    /** Cohere embed v4 model for generating embeddings from both text and images. */
    KnownAIFoundryModelCatalogName["CohereEmbedV4"] = "Cohere-embed-v4";
})(KnownAIFoundryModelCatalogName || (KnownAIFoundryModelCatalogName = {}));
export function vectorSearchCompressionUnionArraySerializer(result) {
    return result.map((item) => {
        return vectorSearchCompressionUnionSerializer(item);
    });
}
export function vectorSearchCompressionUnionArrayDeserializer(result) {
    return result.map((item) => {
        return vectorSearchCompressionUnionDeserializer(item);
    });
}
export function vectorSearchCompressionSerializer(item) {
    return {
        name: item["compressionName"],
        rescoringOptions: !item["rescoringOptions"]
            ? item["rescoringOptions"]
            : rescoringOptionsSerializer(item["rescoringOptions"]),
        truncationDimension: item["truncationDimension"],
        kind: item["kind"],
    };
}
export function vectorSearchCompressionDeserializer(item) {
    return {
        compressionName: item["name"],
        rescoringOptions: !item["rescoringOptions"]
            ? item["rescoringOptions"]
            : rescoringOptionsDeserializer(item["rescoringOptions"]),
        truncationDimension: item["truncationDimension"],
        kind: item["kind"],
    };
}
export function vectorSearchCompressionUnionSerializer(item) {
    switch (item.kind) {
        case "scalarQuantization":
            return scalarQuantizationCompressionSerializer(item);
        case "binaryQuantization":
            return binaryQuantizationCompressionSerializer(item);
        default:
            return vectorSearchCompressionSerializer(item);
    }
}
export function vectorSearchCompressionUnionDeserializer(item) {
    switch (item["kind"]) {
        case "scalarQuantization":
            return scalarQuantizationCompressionDeserializer(item);
        case "binaryQuantization":
            return binaryQuantizationCompressionDeserializer(item);
        default:
            return vectorSearchCompressionDeserializer(item);
    }
}
export function rescoringOptionsSerializer(item) {
    return {
        enableRescoring: item["enableRescoring"],
        defaultOversampling: item["defaultOversampling"],
        rescoreStorageMethod: item["rescoreStorageMethod"],
    };
}
export function rescoringOptionsDeserializer(item) {
    return {
        enableRescoring: item["enableRescoring"],
        defaultOversampling: item["defaultOversampling"],
        rescoreStorageMethod: item["rescoreStorageMethod"],
    };
}
/** The storage method for the original full-precision vectors used for rescoring and internal index operations. */
export var KnownVectorSearchCompressionRescoreStorageMethod;
(function (KnownVectorSearchCompressionRescoreStorageMethod) {
    /** This option preserves the original full-precision vectors. Choose this option for maximum flexibility and highest quality of compressed search results. This consumes more storage but allows for rescoring and oversampling. */
    KnownVectorSearchCompressionRescoreStorageMethod["PreserveOriginals"] = "preserveOriginals";
    /** This option discards the original full-precision vectors. Choose this option for maximum storage savings. Since this option does not allow for rescoring and oversampling, it will often cause slight to moderate reductions in quality. */
    KnownVectorSearchCompressionRescoreStorageMethod["DiscardOriginals"] = "discardOriginals";
})(KnownVectorSearchCompressionRescoreStorageMethod || (KnownVectorSearchCompressionRescoreStorageMethod = {}));
/** The compression method used for indexing and querying. */
export var KnownVectorSearchCompressionKind;
(function (KnownVectorSearchCompressionKind) {
    /** Scalar Quantization, a type of compression method. In scalar quantization, the original vectors values are compressed to a narrower type by discretizing and representing each component of a vector using a reduced set of quantized values, thereby reducing the overall data size. */
    KnownVectorSearchCompressionKind["ScalarQuantization"] = "scalarQuantization";
    /** Binary Quantization, a type of compression method. In binary quantization, the original vectors values are compressed to the narrower binary type by discretizing and representing each component of a vector using binary values, thereby reducing the overall data size. */
    KnownVectorSearchCompressionKind["BinaryQuantization"] = "binaryQuantization";
})(KnownVectorSearchCompressionKind || (KnownVectorSearchCompressionKind = {}));
export function scalarQuantizationCompressionSerializer(item) {
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
export function scalarQuantizationCompressionDeserializer(item) {
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
export function scalarQuantizationParametersSerializer(item) {
    return { quantizedDataType: item["quantizedDataType"] };
}
export function scalarQuantizationParametersDeserializer(item) {
    return {
        quantizedDataType: item["quantizedDataType"],
    };
}
/** The quantized data type of compressed vector values. */
export var KnownVectorSearchCompressionTarget;
(function (KnownVectorSearchCompressionTarget) {
    /** 8-bit signed integer. */
    KnownVectorSearchCompressionTarget["Int8"] = "int8";
})(KnownVectorSearchCompressionTarget || (KnownVectorSearchCompressionTarget = {}));
export function binaryQuantizationCompressionSerializer(item) {
    return {
        name: item["compressionName"],
        rescoringOptions: !item["rescoringOptions"]
            ? item["rescoringOptions"]
            : rescoringOptionsSerializer(item["rescoringOptions"]),
        truncationDimension: item["truncationDimension"],
        kind: item["kind"],
    };
}
export function binaryQuantizationCompressionDeserializer(item) {
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
export var KnownSearchIndexPermissionFilterOption;
(function (KnownSearchIndexPermissionFilterOption) {
    /** Permission filtering is enabled for the index. */
    KnownSearchIndexPermissionFilterOption["Enabled"] = "enabled";
    /** Permission filtering is disabled for the index. */
    KnownSearchIndexPermissionFilterOption["Disabled"] = "disabled";
})(KnownSearchIndexPermissionFilterOption || (KnownSearchIndexPermissionFilterOption = {}));
export function sharePointConnectorAppRegistrationSerializer(item) {
    return {
        applicationId: item["applicationId"],
        federatedCredentialId: item["federatedCredentialId"],
        tenantId: item["tenantId"],
    };
}
export function sharePointConnectorAppRegistrationDeserializer(item) {
    return {
        applicationId: item["applicationId"],
        federatedCredentialId: item["federatedCredentialId"],
        tenantId: item["tenantId"],
    };
}
export function _listIndexesResultDeserializer(item) {
    return {
        count: item["@odata.count"],
        indexes: searchIndexArrayDeserializer(item["value"]),
        nextLink: item["@odata.nextLink"],
    };
}
export function searchIndexArraySerializer(result) {
    return result.map((item) => {
        return searchIndexSerializer(item);
    });
}
export function searchIndexArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexDeserializer(item);
    });
}
export function searchIndexResponseArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexResponseDeserializer(item);
    });
}
export function searchIndexResponseDeserializer(item) {
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
export function getIndexStatisticsResultSerializer(_item) {
    return {};
}
export function getIndexStatisticsResultDeserializer(item) {
    return {
        documentCount: item["documentCount"],
        storageSize: item["storageSize"],
        vectorIndexSize: item["vectorIndexSize"],
    };
}
export function analyzeTextOptionsSerializer(item) {
    return {
        text: item["text"],
        analyzer: item["analyzerName"],
        tokenizer: item["tokenizerName"],
        normalizer: item["normalizerName"],
        tokenFilters: !item["tokenFilters"]
            ? item["tokenFilters"]
            : item["tokenFilters"].map((p) => {
                return p;
            }),
        charFilters: !item["charFilters"]
            ? item["charFilters"]
            : item["charFilters"].map((p) => {
                return p;
            }),
    };
}
export function analyzeResultSerializer(item) {
    return { tokens: analyzedTokenInfoArraySerializer(item["tokens"]) };
}
export function analyzeResultDeserializer(item) {
    return {
        tokens: analyzedTokenInfoArrayDeserializer(item["tokens"]),
    };
}
export function analyzedTokenInfoArraySerializer(result) {
    return result.map((item) => {
        return analyzedTokenInfoSerializer(item);
    });
}
export function analyzedTokenInfoArrayDeserializer(result) {
    return result.map((item) => {
        return analyzedTokenInfoDeserializer(item);
    });
}
export function analyzedTokenInfoSerializer(_item) {
    return {};
}
export function analyzedTokenInfoDeserializer(item) {
    return {
        token: item["token"],
        startOffset: item["startOffset"],
        endOffset: item["endOffset"],
        position: item["position"],
    };
}
export function searchAliasSerializer(item) {
    return {
        name: item["name"],
        indexes: item["indexes"].map((p) => {
            return p;
        }),
        "@odata.etag": item["etag"],
    };
}
export function searchAliasDeserializer(item) {
    return {
        name: item["name"],
        indexes: item["indexes"].map((p) => {
            return p;
        }),
        etag: item["@odata.etag"],
    };
}
export function _listAliasesResultDeserializer(item) {
    return {
        aliases: searchAliasArrayDeserializer(item["value"]),
    };
}
export function searchAliasArraySerializer(result) {
    return result.map((item) => {
        return searchAliasSerializer(item);
    });
}
export function searchAliasArrayDeserializer(result) {
    return result.map((item) => {
        return searchAliasDeserializer(item);
    });
}
export function knowledgeBaseSerializer(item) {
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
        "@odata.etag": item["etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        description: item["description"],
        retrievalInstructions: item["retrievalInstructions"],
        answerInstructions: item["answerInstructions"],
        corsOptions: !item["corsOptions"]
            ? item["corsOptions"]
            : corsOptionsSerializer(item["corsOptions"]),
    };
}
export function knowledgeBaseDeserializer(item) {
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
        etag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        description: item["description"],
        retrievalInstructions: item["retrievalInstructions"],
        answerInstructions: item["answerInstructions"],
        corsOptions: !item["corsOptions"]
            ? item["corsOptions"]
            : corsOptionsDeserializer(item["corsOptions"]),
    };
}
export function knowledgeSourceReferenceArraySerializer(result) {
    return result.map((item) => {
        return knowledgeSourceReferenceSerializer(item);
    });
}
export function knowledgeSourceReferenceArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeSourceReferenceDeserializer(item);
    });
}
export function knowledgeSourceReferenceSerializer(item) {
    return {
        name: item["name"],
        enableImageServing: item["enableImageServing"],
        enableFreshness: item["enableFreshness"],
    };
}
export function knowledgeSourceReferenceDeserializer(item) {
    return {
        name: item["name"],
        enableImageServing: item["enableImageServing"],
        enableFreshness: item["enableFreshness"],
    };
}
export function knowledgeBaseModelUnionArraySerializer(result) {
    return result.map((item) => {
        return knowledgeBaseModelUnionSerializer(item);
    });
}
export function knowledgeBaseModelUnionArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeBaseModelUnionDeserializer(item);
    });
}
export function knowledgeBaseModelSerializer(item) {
    return { kind: item["kind"] };
}
export function knowledgeBaseModelDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
export function knowledgeBaseModelUnionSerializer(item) {
    switch (item.kind) {
        case "azureOpenAI":
            return knowledgeBaseAzureOpenAIModelSerializer(item);
        default:
            return knowledgeBaseModelSerializer(item);
    }
}
export function knowledgeBaseModelUnionDeserializer(item) {
    switch (item["kind"]) {
        case "azureOpenAI":
            return knowledgeBaseAzureOpenAIModelDeserializer(item);
        default:
            return knowledgeBaseModelDeserializer(item);
    }
}
/** The AI model to be used for query planning. */
export var KnownKnowledgeBaseModelKind;
(function (KnownKnowledgeBaseModelKind) {
    /** Use Azure Open AI models for query planning. */
    KnownKnowledgeBaseModelKind["AzureOpenAI"] = "azureOpenAI";
})(KnownKnowledgeBaseModelKind || (KnownKnowledgeBaseModelKind = {}));
export function knowledgeBaseAzureOpenAIModelSerializer(item) {
    return {
        kind: item["kind"],
        azureOpenAIParameters: azureOpenAIVectorizerParametersSerializer(item["azureOpenAIParameters"]),
    };
}
export function knowledgeBaseAzureOpenAIModelDeserializer(item) {
    return {
        kind: item["kind"],
        azureOpenAIParameters: azureOpenAIVectorizerParametersDeserializer(item["azureOpenAIParameters"]),
    };
}
export function _listKnowledgeBasesResultDeserializer(item) {
    return {
        value: knowledgeBaseArrayDeserializer(item["value"]),
    };
}
export function knowledgeBaseArraySerializer(result) {
    return result.map((item) => {
        return knowledgeBaseSerializer(item);
    });
}
export function knowledgeBaseArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeBaseDeserializer(item);
    });
}
export function knowledgeSourceSerializer(item) {
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
export function knowledgeSourceDeserializer(item) {
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
export function knowledgeSourceUnionSerializer(item) {
    switch (item.kind) {
        case "searchIndex":
            return searchIndexKnowledgeSourceSerializer(item);
        case "azureBlob":
            return azureBlobKnowledgeSourceSerializer(item);
        case "indexedSharePoint":
            return indexedSharePointKnowledgeSourceSerializer(item);
        case "indexedOneLake":
            return indexedOneLakeKnowledgeSourceSerializer(item);
        case "indexedSql":
            return indexedSqlKnowledgeSourceSerializer(item);
        case "file":
            return fileKnowledgeSourceSerializer(item);
        case "web":
            return webKnowledgeSourceSerializer(item);
        case "remoteSharePoint":
            return remoteSharePointKnowledgeSourceSerializer(item);
        case "workIQ":
            return workIQKnowledgeSourceSerializer(item);
        case "mcpServer":
            return mcpServerKnowledgeSourceSerializer(item);
        case "fabricDataAgent":
            return fabricDataAgentKnowledgeSourceSerializer(item);
        case "fabricOntology":
            return fabricOntologyKnowledgeSourceSerializer(item);
        default:
            return knowledgeSourceSerializer(item);
    }
}
export function knowledgeSourceUnionDeserializer(item) {
    switch (item["kind"]) {
        case "searchIndex":
            return searchIndexKnowledgeSourceDeserializer(item);
        case "azureBlob":
            return azureBlobKnowledgeSourceDeserializer(item);
        case "indexedSharePoint":
            return indexedSharePointKnowledgeSourceDeserializer(item);
        case "indexedOneLake":
            return indexedOneLakeKnowledgeSourceDeserializer(item);
        case "indexedSql":
            return indexedSqlKnowledgeSourceDeserializer(item);
        case "file":
            return fileKnowledgeSourceDeserializer(item);
        case "web":
            return webKnowledgeSourceDeserializer(item);
        case "remoteSharePoint":
            return remoteSharePointKnowledgeSourceDeserializer(item);
        case "workIQ":
            return workIQKnowledgeSourceDeserializer(item);
        case "mcpServer":
            return mcpServerKnowledgeSourceDeserializer(item);
        case "fabricDataAgent":
            return fabricDataAgentKnowledgeSourceDeserializer(item);
        case "fabricOntology":
            return fabricOntologyKnowledgeSourceDeserializer(item);
        default:
            return knowledgeSourceDeserializer(item);
    }
}
/** The kind of the knowledge source. */
export var KnownKnowledgeSourceKind;
(function (KnownKnowledgeSourceKind) {
    /** A knowledge source that reads data from a Search Index. */
    KnownKnowledgeSourceKind["SearchIndex"] = "searchIndex";
    /** A knowledge source that read and ingest data from Azure Blob Storage to a Search Index. */
    KnownKnowledgeSourceKind["AzureBlob"] = "azureBlob";
    /** A knowledge source that reads data from indexed SharePoint. */
    KnownKnowledgeSourceKind["IndexedSharePoint"] = "indexedSharePoint";
    /** A knowledge source that reads data from indexed OneLake. */
    KnownKnowledgeSourceKind["IndexedOneLake"] = "indexedOneLake";
    /** A knowledge source that retrieves and ingests data from Azure SQL Database or SQL Managed Instance to a Search Index. */
    KnownKnowledgeSourceKind["IndexedSql"] = "indexedSql";
    /** A knowledge source that reads data from the web. */
    KnownKnowledgeSourceKind["Web"] = "web";
    /** A knowledge source that reads data from remote SharePoint. */
    KnownKnowledgeSourceKind["RemoteSharePoint"] = "remoteSharePoint";
    /** A knowledge source that reads data from work IQ */
    KnownKnowledgeSourceKind["WorkIQ"] = "workIQ";
    /** A knowledge source that supports direct file upload and indexing. */
    KnownKnowledgeSourceKind["File"] = "file";
    /** A knowledge source backed by an MCP (Model Context Protocol) server. */
    KnownKnowledgeSourceKind["McpServer"] = "mcpServer";
    /** A knowledge source that retrieves data from a Fabric Data Agent. */
    KnownKnowledgeSourceKind["FabricDataAgent"] = "fabricDataAgent";
    /** A knowledge source that retrieves data from Microsoft Fabric Ontology ontologies. */
    KnownKnowledgeSourceKind["FabricOntology"] = "fabricOntology";
})(KnownKnowledgeSourceKind || (KnownKnowledgeSourceKind = {}));
export function searchIndexKnowledgeSourceSerializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        "@odata.etag": item["eTag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        searchIndexParameters: searchIndexKnowledgeSourceParametersSerializer(item["searchIndexParameters"]),
    };
}
export function searchIndexKnowledgeSourceDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        eTag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        searchIndexParameters: searchIndexKnowledgeSourceParametersDeserializer(item["searchIndexParameters"]),
    };
}
export function searchIndexKnowledgeSourceParametersSerializer(item) {
    return {
        searchIndexName: item["searchIndexName"],
        sourceDataFields: !item["sourceDataFields"]
            ? item["sourceDataFields"]
            : searchIndexFieldReferenceArraySerializer(item["sourceDataFields"]),
        searchFields: !item["searchFields"]
            ? item["searchFields"]
            : searchIndexFieldReferenceArraySerializer(item["searchFields"]),
        semanticConfigurationName: item["semanticConfigurationName"],
        baseFilter: item["baseFilter"],
    };
}
export function searchIndexKnowledgeSourceParametersDeserializer(item) {
    return {
        searchIndexName: item["searchIndexName"],
        sourceDataFields: !item["sourceDataFields"]
            ? item["sourceDataFields"]
            : searchIndexFieldReferenceArrayDeserializer(item["sourceDataFields"]),
        searchFields: !item["searchFields"]
            ? item["searchFields"]
            : searchIndexFieldReferenceArrayDeserializer(item["searchFields"]),
        semanticConfigurationName: item["semanticConfigurationName"],
        baseFilter: item["baseFilter"],
    };
}
export function searchIndexFieldReferenceArraySerializer(result) {
    return result.map((item) => {
        return searchIndexFieldReferenceSerializer(item);
    });
}
export function searchIndexFieldReferenceArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexFieldReferenceDeserializer(item);
    });
}
export function searchIndexFieldReferenceSerializer(item) {
    return { name: item["name"] };
}
export function searchIndexFieldReferenceDeserializer(item) {
    return {
        name: item["name"],
    };
}
export function azureBlobKnowledgeSourceSerializer(item) {
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
export function azureBlobKnowledgeSourceDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        eTag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        azureBlobParameters: azureBlobKnowledgeSourceParametersDeserializer(item["azureBlobParameters"]),
    };
}
export function azureBlobKnowledgeSourceParametersSerializer(item) {
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
export function azureBlobKnowledgeSourceParametersDeserializer(item) {
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
export function indexingScheduleSerializer(item) {
    return {
        interval: item["interval"],
        startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
    };
}
export function indexingScheduleDeserializer(item) {
    return {
        interval: item["interval"],
        startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    };
}
/** Permission types to ingest together with document content. */
export var KnownKnowledgeSourceIngestionPermissionOption;
(function (KnownKnowledgeSourceIngestionPermissionOption) {
    /** Ingest explicit user identifiers alongside document content. */
    KnownKnowledgeSourceIngestionPermissionOption["UserIds"] = "userIds";
    /** Ingest group identifiers alongside document content. */
    KnownKnowledgeSourceIngestionPermissionOption["GroupIds"] = "groupIds";
    /** Ingest RBAC scope information alongside document content. */
    KnownKnowledgeSourceIngestionPermissionOption["RbacScope"] = "rbacScope";
    /** Ingest Microsoft Purview sensitivity labels alongside document content. */
    KnownKnowledgeSourceIngestionPermissionOption["SensitivityLabels"] = "sensitivityLabels";
})(KnownKnowledgeSourceIngestionPermissionOption || (KnownKnowledgeSourceIngestionPermissionOption = {}));
/** Optional content extraction mode. Default is 'minimal'. */
export var KnownKnowledgeSourceContentExtractionMode;
(function (KnownKnowledgeSourceContentExtractionMode) {
    /** Extracts only essential metadata while deferring most content processing. */
    KnownKnowledgeSourceContentExtractionMode["Minimal"] = "minimal";
    /** Performs the full default content extraction pipeline. */
    KnownKnowledgeSourceContentExtractionMode["Standard"] = "standard";
})(KnownKnowledgeSourceContentExtractionMode || (KnownKnowledgeSourceContentExtractionMode = {}));
export function createdResourcesDeserializer(item) {
    return {
        additionalProperties: serializeRecord(item, []),
    };
}
export function indexedSharePointKnowledgeSourceSerializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        "@odata.etag": item["eTag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        indexedSharePointParameters: indexedSharePointKnowledgeSourceParametersSerializer(item["indexedSharePointParameters"]),
    };
}
export function indexedSharePointKnowledgeSourceDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        eTag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        indexedSharePointParameters: indexedSharePointKnowledgeSourceParametersDeserializer(item["indexedSharePointParameters"]),
    };
}
export function indexedSharePointKnowledgeSourceParametersSerializer(item) {
    return {
        connectionString: item["connectionString"],
        containerName: item["containerName"],
        query: item["query"],
        ingestionParameters: !item["ingestionParameters"]
            ? item["ingestionParameters"]
            : knowledgeSourceIngestionParametersSerializer(item["ingestionParameters"]),
    };
}
export function indexedSharePointKnowledgeSourceParametersDeserializer(item) {
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
export var KnownIndexedSharePointContainerName;
(function (KnownIndexedSharePointContainerName) {
    /** Index content from the site's default document library. */
    KnownIndexedSharePointContainerName["DefaultSiteLibrary"] = "defaultSiteLibrary";
    /** Index content from every document library in the site. */
    KnownIndexedSharePointContainerName["AllSiteLibraries"] = "allSiteLibraries";
    /** Use a query to filter SharePoint content. */
    KnownIndexedSharePointContainerName["UseQuery"] = "useQuery";
})(KnownIndexedSharePointContainerName || (KnownIndexedSharePointContainerName = {}));
export function indexedOneLakeKnowledgeSourceSerializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        "@odata.etag": item["eTag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        indexedOneLakeParameters: indexedOneLakeKnowledgeSourceParametersSerializer(item["indexedOneLakeParameters"]),
    };
}
export function indexedOneLakeKnowledgeSourceDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        eTag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        indexedOneLakeParameters: indexedOneLakeKnowledgeSourceParametersDeserializer(item["indexedOneLakeParameters"]),
    };
}
export function indexedOneLakeKnowledgeSourceParametersSerializer(item) {
    return {
        fabricWorkspaceId: item["fabricWorkspaceId"],
        lakehouseId: item["lakehouseId"],
        targetPath: item["targetPath"],
        ingestionParameters: !item["ingestionParameters"]
            ? item["ingestionParameters"]
            : knowledgeSourceIngestionParametersSerializer(item["ingestionParameters"]),
    };
}
export function indexedOneLakeKnowledgeSourceParametersDeserializer(item) {
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
export function indexedSqlKnowledgeSourceSerializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        "@odata.etag": item["eTag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        indexedSqlParameters: indexedSqlKnowledgeSourceParametersSerializer(item["indexedSqlParameters"]),
    };
}
export function indexedSqlKnowledgeSourceDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        eTag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        indexedSqlParameters: indexedSqlKnowledgeSourceParametersDeserializer(item["indexedSqlParameters"]),
    };
}
export function indexedSqlKnowledgeSourceParametersSerializer(item) {
    return {
        connectionString: item["connectionString"],
        tableOrView: item["tableOrView"],
        highWaterMarkColumnName: item["highWaterMarkColumnName"],
        contentColumns: !item["contentColumns"]
            ? item["contentColumns"]
            : contentColumnMappingArraySerializer(item["contentColumns"]),
        embeddingColumns: !item["embeddingColumns"]
            ? item["embeddingColumns"]
            : embeddingColumnMappingArraySerializer(item["embeddingColumns"]),
        ingestionParameters: !item["ingestionParameters"]
            ? item["ingestionParameters"]
            : knowledgeSourceIngestionParametersSerializer(item["ingestionParameters"]),
    };
}
export function indexedSqlKnowledgeSourceParametersDeserializer(item) {
    return {
        connectionString: item["connectionString"],
        tableOrView: item["tableOrView"],
        highWaterMarkColumnName: item["highWaterMarkColumnName"],
        contentColumns: !item["contentColumns"]
            ? item["contentColumns"]
            : contentColumnMappingArrayDeserializer(item["contentColumns"]),
        embeddingColumns: !item["embeddingColumns"]
            ? item["embeddingColumns"]
            : embeddingColumnMappingArrayDeserializer(item["embeddingColumns"]),
        ingestionParameters: !item["ingestionParameters"]
            ? item["ingestionParameters"]
            : knowledgeSourceIngestionParametersDeserializer(item["ingestionParameters"]),
        createdResources: !item["createdResources"]
            ? item["createdResources"]
            : createdResourcesDeserializer(item["createdResources"]),
    };
}
export function contentColumnMappingArraySerializer(result) {
    return result.map((item) => {
        return contentColumnMappingSerializer(item);
    });
}
export function contentColumnMappingArrayDeserializer(result) {
    return result.map((item) => {
        return contentColumnMappingDeserializer(item);
    });
}
export function contentColumnMappingSerializer(item) {
    return {
        name: item["name"],
        sourceField: item["sourceField"],
        searchFieldType: item["searchFieldType"],
    };
}
export function contentColumnMappingDeserializer(item) {
    return {
        name: item["name"],
        sourceField: item["sourceField"],
        searchFieldType: item["searchFieldType"],
    };
}
export function embeddingColumnMappingArraySerializer(result) {
    return result.map((item) => {
        return embeddingColumnMappingSerializer(item);
    });
}
export function embeddingColumnMappingArrayDeserializer(result) {
    return result.map((item) => {
        return embeddingColumnMappingDeserializer(item);
    });
}
export function embeddingColumnMappingSerializer(item) {
    return { name: item["name"], sourceField: item["sourceField"] };
}
export function embeddingColumnMappingDeserializer(item) {
    return {
        name: item["name"],
        sourceField: item["sourceField"],
    };
}
export function fileKnowledgeSourceSerializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        "@odata.etag": item["eTag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        fileParameters: fileKnowledgeSourceParametersSerializer(item["fileParameters"]),
    };
}
export function fileKnowledgeSourceDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        eTag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        fileParameters: fileKnowledgeSourceParametersDeserializer(item["fileParameters"]),
    };
}
export function fileKnowledgeSourceParametersSerializer(item) {
    return {
        ingestionParameters: !item["ingestionParameters"]
            ? item["ingestionParameters"]
            : knowledgeSourceIngestionParametersSerializer(item["ingestionParameters"]),
    };
}
export function fileKnowledgeSourceParametersDeserializer(item) {
    return {
        ingestionParameters: !item["ingestionParameters"]
            ? item["ingestionParameters"]
            : knowledgeSourceIngestionParametersDeserializer(item["ingestionParameters"]),
        createdResources: !item["createdResources"]
            ? item["createdResources"]
            : createdResourcesDeserializer(item["createdResources"]),
    };
}
export function webKnowledgeSourceSerializer(item) {
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
export function webKnowledgeSourceDeserializer(item) {
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
export function webKnowledgeSourceParametersSerializer(item) {
    return {
        domains: !item["domains"]
            ? item["domains"]
            : webKnowledgeSourceDomainsSerializer(item["domains"]),
        language: item["language"],
        market: item["market"],
        count: item["count"],
        freshness: item["freshness"],
    };
}
export function webKnowledgeSourceParametersDeserializer(item) {
    return {
        domains: !item["domains"]
            ? item["domains"]
            : webKnowledgeSourceDomainsDeserializer(item["domains"]),
        language: item["language"],
        market: item["market"],
        count: item["count"],
        freshness: item["freshness"],
    };
}
export function webKnowledgeSourceDomainsSerializer(item) {
    return {
        allowedDomains: !item["allowedDomains"]
            ? item["allowedDomains"]
            : webKnowledgeSourceDomainArraySerializer(item["allowedDomains"]),
        blockedDomains: !item["blockedDomains"]
            ? item["blockedDomains"]
            : webKnowledgeSourceDomainArraySerializer(item["blockedDomains"]),
    };
}
export function webKnowledgeSourceDomainsDeserializer(item) {
    return {
        allowedDomains: !item["allowedDomains"]
            ? item["allowedDomains"]
            : webKnowledgeSourceDomainArrayDeserializer(item["allowedDomains"]),
        blockedDomains: !item["blockedDomains"]
            ? item["blockedDomains"]
            : webKnowledgeSourceDomainArrayDeserializer(item["blockedDomains"]),
    };
}
export function webKnowledgeSourceDomainArraySerializer(result) {
    return result.map((item) => {
        return webKnowledgeSourceDomainSerializer(item);
    });
}
export function webKnowledgeSourceDomainArrayDeserializer(result) {
    return result.map((item) => {
        return webKnowledgeSourceDomainDeserializer(item);
    });
}
export function webKnowledgeSourceDomainSerializer(item) {
    return { address: item["address"], includeSubpages: item["includeSubpages"] };
}
export function webKnowledgeSourceDomainDeserializer(item) {
    return {
        address: item["address"],
        includeSubpages: item["includeSubpages"],
    };
}
export function remoteSharePointKnowledgeSourceSerializer(item) {
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
export function remoteSharePointKnowledgeSourceDeserializer(item) {
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
export function remoteSharePointKnowledgeSourceParametersSerializer(item) {
    return {
        filterExpression: item["filterExpression"],
        resourceMetadata: !item["resourceMetadata"]
            ? item["resourceMetadata"]
            : item["resourceMetadata"].map((p) => {
                return p;
            }),
        containerTypeId: item["containerTypeId"],
    };
}
export function remoteSharePointKnowledgeSourceParametersDeserializer(item) {
    return {
        filterExpression: item["filterExpression"],
        resourceMetadata: !item["resourceMetadata"]
            ? item["resourceMetadata"]
            : item["resourceMetadata"].map((p) => {
                return p;
            }),
        containerTypeId: item["containerTypeId"],
    };
}
export function workIQKnowledgeSourceSerializer(item) {
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
export function workIQKnowledgeSourceDeserializer(item) {
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
export function mcpServerKnowledgeSourceSerializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        "@odata.etag": item["eTag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        mcpServerParameters: mcpServerKnowledgeSourceParametersSerializer(item["mcpServerParameters"]),
    };
}
export function mcpServerKnowledgeSourceDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        eTag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        mcpServerParameters: mcpServerKnowledgeSourceParametersDeserializer(item["mcpServerParameters"]),
    };
}
export function mcpServerKnowledgeSourceParametersSerializer(item) {
    return {
        serverURL: item["serverURL"],
        authentication: !item["authentication"]
            ? item["authentication"]
            : mcpServerAuthenticationUnionSerializer(item["authentication"]),
        tools: mcpServerToolArraySerializer(item["tools"]),
    };
}
export function mcpServerKnowledgeSourceParametersDeserializer(item) {
    return {
        serverURL: item["serverURL"],
        authentication: !item["authentication"]
            ? item["authentication"]
            : mcpServerAuthenticationUnionDeserializer(item["authentication"]),
        tools: mcpServerToolArrayDeserializer(item["tools"]),
    };
}
export function mcpServerAuthenticationSerializer(item) {
    return { kind: item["kind"] };
}
export function mcpServerAuthenticationDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
export function mcpServerAuthenticationUnionSerializer(item) {
    switch (item.kind) {
        case "foundryConnection":
            return mcpServerFoundryConnectionAuthenticationSerializer(item);
        case "storedHeaders":
            return mcpServerStoredHeadersAuthenticationSerializer(item);
        default:
            return mcpServerAuthenticationSerializer(item);
    }
}
export function mcpServerAuthenticationUnionDeserializer(item) {
    switch (item["kind"]) {
        case "foundryConnection":
            return mcpServerFoundryConnectionAuthenticationDeserializer(item);
        case "storedHeaders":
            return mcpServerStoredHeadersAuthenticationDeserializer(item);
        default:
            return mcpServerAuthenticationDeserializer(item);
    }
}
/** The kind of authentication for an MCP server. */
export var KnownMcpServerAuthenticationKind;
(function (KnownMcpServerAuthenticationKind) {
    /** Authenticate using an Azure AI Foundry connection. */
    KnownMcpServerAuthenticationKind["FoundryConnection"] = "foundryConnection";
    /** Authenticate using stored HTTP headers. */
    KnownMcpServerAuthenticationKind["StoredHeaders"] = "storedHeaders";
})(KnownMcpServerAuthenticationKind || (KnownMcpServerAuthenticationKind = {}));
export function mcpServerFoundryConnectionAuthenticationSerializer(item) {
    return {
        kind: item["kind"],
        foundryConnectionParameters: mcpServerFoundryConnectionParametersSerializer(item["foundryConnectionParameters"]),
    };
}
export function mcpServerFoundryConnectionAuthenticationDeserializer(item) {
    return {
        kind: item["kind"],
        foundryConnectionParameters: mcpServerFoundryConnectionParametersDeserializer(item["foundryConnectionParameters"]),
    };
}
export function mcpServerFoundryConnectionParametersSerializer(item) {
    return { connectionId: item["connectionId"] };
}
export function mcpServerFoundryConnectionParametersDeserializer(item) {
    return {
        connectionId: item["connectionId"],
    };
}
export function mcpServerStoredHeadersAuthenticationSerializer(item) {
    return {
        kind: item["kind"],
        storedHeadersParameters: mcpServerStoredHeadersParametersSerializer(item["storedHeadersParameters"]),
    };
}
export function mcpServerStoredHeadersAuthenticationDeserializer(item) {
    return {
        kind: item["kind"],
        storedHeadersParameters: mcpServerStoredHeadersParametersDeserializer(item["storedHeadersParameters"]),
    };
}
export function mcpServerStoredHeadersParametersSerializer(item) {
    return {
        headers: !item["headers"] ? item["headers"] : mcpServerHeadersSerializer(item["headers"]),
    };
}
export function mcpServerStoredHeadersParametersDeserializer(item) {
    return {
        headers: !item["headers"] ? item["headers"] : mcpServerHeadersDeserializer(item["headers"]),
    };
}
export function mcpServerHeadersSerializer(item) {
    return { ...serializeRecord(item.additionalProperties ?? {}) };
}
export function mcpServerHeadersDeserializer(item) {
    return {
        additionalProperties: serializeRecord(item, []),
    };
}
export function mcpServerToolArraySerializer(result) {
    return result.map((item) => {
        return mcpServerToolSerializer(item);
    });
}
export function mcpServerToolArrayDeserializer(result) {
    return result.map((item) => {
        return mcpServerToolDeserializer(item);
    });
}
export function mcpServerToolSerializer(item) {
    return {
        name: item["name"],
        outputParsing: !item["outputParsing"]
            ? item["outputParsing"]
            : mcpServerOutputParsingUnionSerializer(item["outputParsing"]),
        inclusionMode: item["inclusionMode"],
        maxOutputTokens: item["maxOutputTokens"],
    };
}
export function mcpServerToolDeserializer(item) {
    return {
        name: item["name"],
        outputParsing: !item["outputParsing"]
            ? item["outputParsing"]
            : mcpServerOutputParsingUnionDeserializer(item["outputParsing"]),
        inclusionMode: item["inclusionMode"],
        maxOutputTokens: item["maxOutputTokens"],
    };
}
export function mcpServerOutputParsingSerializer(item) {
    return { kind: item["kind"] };
}
export function mcpServerOutputParsingDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
export function mcpServerOutputParsingUnionSerializer(item) {
    switch (item.kind) {
        case "auto":
            return mcpServerAutoOutputParsingSerializer(item);
        case "json":
            return mcpServerJsonOutputParsingSerializer(item);
        case "split":
            return mcpServerSplitOutputParsingSerializer(item);
        case "none":
            return mcpServerNoneOutputParsingSerializer(item);
        default:
            return mcpServerOutputParsingSerializer(item);
    }
}
export function mcpServerOutputParsingUnionDeserializer(item) {
    switch (item["kind"]) {
        case "auto":
            return mcpServerAutoOutputParsingDeserializer(item);
        case "json":
            return mcpServerJsonOutputParsingDeserializer(item);
        case "split":
            return mcpServerSplitOutputParsingDeserializer(item);
        case "none":
            return mcpServerNoneOutputParsingDeserializer(item);
        default:
            return mcpServerOutputParsingDeserializer(item);
    }
}
/** The kind of output parsing for an MCP server tool. */
export var KnownMcpServerOutputParsingKind;
(function (KnownMcpServerOutputParsingKind) {
    /** Automatically detect the output format and parse accordingly. */
    KnownMcpServerOutputParsingKind["Auto"] = "auto";
    /** Parse the output as a JSON document using the configured JSON parameters. */
    KnownMcpServerOutputParsingKind["Json"] = "json";
    /** Split the output into pages using the configured split parameters. */
    KnownMcpServerOutputParsingKind["Split"] = "split";
    /** Treat the output as a single block without any parsing. */
    KnownMcpServerOutputParsingKind["None"] = "none";
})(KnownMcpServerOutputParsingKind || (KnownMcpServerOutputParsingKind = {}));
export function mcpServerAutoOutputParsingSerializer(item) {
    return { kind: item["kind"] };
}
export function mcpServerAutoOutputParsingDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
export function mcpServerJsonOutputParsingSerializer(item) {
    return {
        kind: item["kind"],
        jsonParameters: mcpServerOutputParsingJsonParametersSerializer(item["jsonParameters"]),
    };
}
export function mcpServerJsonOutputParsingDeserializer(item) {
    return {
        kind: item["kind"],
        jsonParameters: mcpServerOutputParsingJsonParametersDeserializer(item["jsonParameters"]),
    };
}
export function mcpServerOutputParsingJsonParametersSerializer(item) {
    return { documentsPath: item["documentsPath"], includeContext: item["includeContext"] };
}
export function mcpServerOutputParsingJsonParametersDeserializer(item) {
    return {
        documentsPath: item["documentsPath"],
        includeContext: item["includeContext"],
    };
}
export function mcpServerSplitOutputParsingSerializer(item) {
    return {
        kind: item["kind"],
        splitParameters: !item["splitParameters"]
            ? item["splitParameters"]
            : mcpServerOutputParsingSplitParametersSerializer(item["splitParameters"]),
    };
}
export function mcpServerSplitOutputParsingDeserializer(item) {
    return {
        kind: item["kind"],
        splitParameters: !item["splitParameters"]
            ? item["splitParameters"]
            : mcpServerOutputParsingSplitParametersDeserializer(item["splitParameters"]),
    };
}
export function mcpServerOutputParsingSplitParametersSerializer(item) {
    return {
        textSplitMode: item["textSplitMode"],
        maximumPageLength: item["maximumPageLength"],
        pageOverlapLength: item["pageOverlapLength"],
        maximumPagesToTake: item["maximumPagesToTake"],
        defaultLanguageCode: item["defaultLanguageCode"],
    };
}
export function mcpServerOutputParsingSplitParametersDeserializer(item) {
    return {
        textSplitMode: item["textSplitMode"],
        maximumPageLength: item["maximumPageLength"],
        pageOverlapLength: item["pageOverlapLength"],
        maximumPagesToTake: item["maximumPagesToTake"],
        defaultLanguageCode: item["defaultLanguageCode"],
    };
}
/** A value indicating which split mode to perform. */
export var KnownTextSplitMode;
(function (KnownTextSplitMode) {
    /** Split the text into individual pages. */
    KnownTextSplitMode["Pages"] = "pages";
    /** Split the text into individual sentences. */
    KnownTextSplitMode["Sentences"] = "sentences";
})(KnownTextSplitMode || (KnownTextSplitMode = {}));
/** The language codes supported for input text by SplitSkill. */
export var KnownSplitSkillLanguage;
(function (KnownSplitSkillLanguage) {
    /** Amharic */
    KnownSplitSkillLanguage["Am"] = "am";
    /** Bosnian */
    KnownSplitSkillLanguage["Bs"] = "bs";
    /** Czech */
    KnownSplitSkillLanguage["Cs"] = "cs";
    /** Danish */
    KnownSplitSkillLanguage["Da"] = "da";
    /** German */
    KnownSplitSkillLanguage["De"] = "de";
    /** English */
    KnownSplitSkillLanguage["En"] = "en";
    /** Spanish */
    KnownSplitSkillLanguage["Es"] = "es";
    /** Estonian */
    KnownSplitSkillLanguage["Et"] = "et";
    /** Finnish */
    KnownSplitSkillLanguage["Fi"] = "fi";
    /** French */
    KnownSplitSkillLanguage["Fr"] = "fr";
    /** Hebrew */
    KnownSplitSkillLanguage["He"] = "he";
    /** Hindi */
    KnownSplitSkillLanguage["Hi"] = "hi";
    /** Croatian */
    KnownSplitSkillLanguage["Hr"] = "hr";
    /** Hungarian */
    KnownSplitSkillLanguage["Hu"] = "hu";
    /** Indonesian */
    KnownSplitSkillLanguage["Id"] = "id";
    /** Icelandic */
    KnownSplitSkillLanguage["Is"] = "is";
    /** Italian */
    KnownSplitSkillLanguage["It"] = "it";
    /** Japanese */
    KnownSplitSkillLanguage["Ja"] = "ja";
    /** Korean */
    KnownSplitSkillLanguage["Ko"] = "ko";
    /** Latvian */
    KnownSplitSkillLanguage["Lv"] = "lv";
    /** Norwegian */
    KnownSplitSkillLanguage["Nb"] = "nb";
    /** Dutch */
    KnownSplitSkillLanguage["Nl"] = "nl";
    /** Polish */
    KnownSplitSkillLanguage["Pl"] = "pl";
    /** Portuguese (Portugal) */
    KnownSplitSkillLanguage["Pt"] = "pt";
    /** Portuguese (Brazil) */
    KnownSplitSkillLanguage["PtBr"] = "pt-br";
    /** Russian */
    KnownSplitSkillLanguage["Ru"] = "ru";
    /** Slovak */
    KnownSplitSkillLanguage["Sk"] = "sk";
    /** Slovenian */
    KnownSplitSkillLanguage["Sl"] = "sl";
    /** Serbian */
    KnownSplitSkillLanguage["Sr"] = "sr";
    /** Swedish */
    KnownSplitSkillLanguage["Sv"] = "sv";
    /** Turkish */
    KnownSplitSkillLanguage["Tr"] = "tr";
    /** Urdu */
    KnownSplitSkillLanguage["Ur"] = "ur";
    /** Chinese (Simplified) */
    KnownSplitSkillLanguage["Zh"] = "zh";
})(KnownSplitSkillLanguage || (KnownSplitSkillLanguage = {}));
export function mcpServerNoneOutputParsingSerializer(item) {
    return { kind: item["kind"] };
}
export function mcpServerNoneOutputParsingDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
/** Controls how parsed MCP tool results are integrated into the final result set. */
export var KnownMcpServerToolInclusionMode;
(function (KnownMcpServerToolInclusionMode) {
    /** Tool results go through the reranking and aggregation pipeline alongside results from other knowledge sources. This is the default behavior. */
    KnownMcpServerToolInclusionMode["Reranked"] = "reranked";
    /** Tool results bypass reranking and are always included in the agent context. */
    KnownMcpServerToolInclusionMode["Always"] = "always";
})(KnownMcpServerToolInclusionMode || (KnownMcpServerToolInclusionMode = {}));
export function fabricDataAgentKnowledgeSourceSerializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        "@odata.etag": item["eTag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        fabricDataAgentParameters: fabricDataAgentKnowledgeSourceParametersSerializer(item["fabricDataAgentParameters"]),
    };
}
export function fabricDataAgentKnowledgeSourceDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        eTag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        fabricDataAgentParameters: fabricDataAgentKnowledgeSourceParametersDeserializer(item["fabricDataAgentParameters"]),
    };
}
export function fabricDataAgentKnowledgeSourceParametersSerializer(item) {
    return { workspaceId: item["workspaceId"], dataAgentId: item["dataAgentId"] };
}
export function fabricDataAgentKnowledgeSourceParametersDeserializer(item) {
    return {
        workspaceId: item["workspaceId"],
        dataAgentId: item["dataAgentId"],
    };
}
export function fabricOntologyKnowledgeSourceSerializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        "@odata.etag": item["eTag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeySerializer(item["encryptionKey"]),
        fabricOntologyParameters: fabricOntologyKnowledgeSourceParametersSerializer(item["fabricOntologyParameters"]),
    };
}
export function fabricOntologyKnowledgeSourceDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        kind: item["kind"],
        eTag: item["@odata.etag"],
        encryptionKey: !item["encryptionKey"]
            ? item["encryptionKey"]
            : searchResourceEncryptionKeyDeserializer(item["encryptionKey"]),
        fabricOntologyParameters: fabricOntologyKnowledgeSourceParametersDeserializer(item["fabricOntologyParameters"]),
    };
}
export function fabricOntologyKnowledgeSourceParametersSerializer(item) {
    return { workspaceId: item["workspaceId"], ontologyId: item["ontologyId"] };
}
export function fabricOntologyKnowledgeSourceParametersDeserializer(item) {
    return {
        workspaceId: item["workspaceId"],
        ontologyId: item["ontologyId"],
    };
}
export function _listKnowledgeSourcesResultDeserializer(item) {
    return {
        value: knowledgeSourceUnionArrayDeserializer(item["value"]),
    };
}
export function knowledgeSourceUnionArraySerializer(result) {
    return result.map((item) => {
        return knowledgeSourceUnionSerializer(item);
    });
}
export function knowledgeSourceUnionArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeSourceUnionDeserializer(item);
    });
}
/** The current synchronization status of the knowledge source. */
export var KnownKnowledgeSourceSynchronizationStatus;
(function (KnownKnowledgeSourceSynchronizationStatus) {
    /** The knowledge source is being provisioned. */
    KnownKnowledgeSourceSynchronizationStatus["Creating"] = "creating";
    /** The knowledge source is active and synchronization runs are occurring. */
    KnownKnowledgeSourceSynchronizationStatus["Active"] = "active";
    /** The knowledge source is being deleted and synchronization is paused. */
    KnownKnowledgeSourceSynchronizationStatus["Deleting"] = "deleting";
})(KnownKnowledgeSourceSynchronizationStatus || (KnownKnowledgeSourceSynchronizationStatus = {}));
export function knowledgeSourceFileDeserializer(item) {
    return {
        fileId: item["fileId"],
        fileName: item["fileName"],
        fileSizeBytes: item["fileSizeBytes"],
        createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
        lastUpdatedAt: !item["lastUpdatedAt"] ? item["lastUpdatedAt"] : new Date(item["lastUpdatedAt"]),
        errorMessage: item["errorMessage"],
    };
}
export function _listKnowledgeSourceFilesResultDeserializer(item) {
    return {
        value: knowledgeSourceFileArrayDeserializer(item["value"]),
    };
}
export function knowledgeSourceFileArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeSourceFileDeserializer(item);
    });
}
export function searchServiceStatisticsDeserializer(item) {
    return {
        counters: serviceCountersDeserializer(item["counters"]),
        limits: serviceLimitsDeserializer(item["limits"]),
        indexersRuntime: serviceIndexersRuntimeDeserializer(item["indexersRuntime"]),
    };
}
export function serviceCountersDeserializer(item) {
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
        knowledgeBaseCounter: resourceCounterDeserializer(item["knowledgeBasesCount"]),
        knowledgeSourceCounter: resourceCounterDeserializer(item["knowledgeSourcesCount"]),
    };
}
export function resourceCounterDeserializer(item) {
    return {
        usage: item["usage"],
        quota: item["quota"],
    };
}
export function serviceLimitsDeserializer(item) {
    return {
        maxFieldsPerIndex: item["maxFieldsPerIndex"],
        maxFieldNestingDepthPerIndex: item["maxFieldNestingDepthPerIndex"],
        maxComplexCollectionFieldsPerIndex: item["maxComplexCollectionFieldsPerIndex"],
        maxComplexObjectsInCollectionsPerDocument: item["maxComplexObjectsInCollectionsPerDocument"],
        maxStoragePerIndexInBytes: item["maxStoragePerIndex"],
        maxCumulativeIndexerRuntimeSeconds: item["maxCumulativeIndexerRuntimeSeconds"],
    };
}
export function serviceIndexersRuntimeDeserializer(item) {
    return {
        usedSeconds: item["usedSeconds"],
        remainingSeconds: item["remainingSeconds"],
        beginningTime: new Date(item["beginningTime"]),
        endingTime: new Date(item["endingTime"]),
    };
}
export function _listIndexStatsSummaryDeserializer(item) {
    return {
        count: item["@odata.count"],
        indexesStatistics: indexStatisticsSummaryArrayDeserializer(item["value"]),
        nextLink: item["@odata.nextLink"],
    };
}
export function indexStatisticsSummaryArrayDeserializer(result) {
    return result.map((item) => {
        return indexStatisticsSummaryDeserializer(item);
    });
}
export function indexStatisticsSummaryDeserializer(item) {
    return {
        name: item["name"],
        documentCount: item["documentCount"],
        storageSize: item["storageSize"],
        vectorIndexSize: item["vectorIndexSize"],
    };
}
export function searchIndexerDataSourceConnectionSerializer(item) {
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
            : item["indexerPermissionOptions"].map((p) => {
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
export function searchIndexerDataSourceConnectionDeserializer(item) {
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
            : item["indexerPermissionOptions"].map((p1) => {
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
export var KnownSearchIndexerDataSourceType;
(function (KnownSearchIndexerDataSourceType) {
    /** Indicates an Azure SQL datasource. */
    KnownSearchIndexerDataSourceType["AzureSql"] = "azuresql";
    /** Indicates a CosmosDB datasource. */
    KnownSearchIndexerDataSourceType["CosmosDb"] = "cosmosdb";
    /** Indicates an Azure Blob datasource. */
    KnownSearchIndexerDataSourceType["AzureBlob"] = "azureblob";
    /** Indicates an Azure Table datasource. */
    KnownSearchIndexerDataSourceType["AzureTable"] = "azuretable";
    /** Indicates a MySql datasource. */
    KnownSearchIndexerDataSourceType["MySql"] = "mysql";
    /** Indicates an ADLS Gen2 datasource. */
    KnownSearchIndexerDataSourceType["AdlsGen2"] = "adlsgen2";
    /** Indicates a Microsoft Fabric OneLake datasource. */
    KnownSearchIndexerDataSourceType["OneLake"] = "onelake";
    /** Indicates a SharePoint datasource. */
    KnownSearchIndexerDataSourceType["SharePoint"] = "sharepoint";
})(KnownSearchIndexerDataSourceType || (KnownSearchIndexerDataSourceType = {}));
export function dataSourceCredentialsSerializer(item) {
    return { connectionString: item["connectionString"] };
}
export function dataSourceCredentialsDeserializer(item) {
    return {
        connectionString: item["connectionString"],
    };
}
export function searchIndexerDataContainerSerializer(item) {
    return { name: item["name"], query: item["query"] };
}
export function searchIndexerDataContainerDeserializer(item) {
    return {
        name: item["name"],
        query: item["query"],
    };
}
/** Options with various types of permission data to index. */
export var KnownIndexerPermissionOption;
(function (KnownIndexerPermissionOption) {
    /** Indexer to ingest ACL userIds from data source to index. */
    KnownIndexerPermissionOption["UserIds"] = "userIds";
    /** Indexer to ingest ACL groupIds from data source to index. */
    KnownIndexerPermissionOption["GroupIds"] = "groupIds";
    /** Indexer to ingest Azure RBAC scope from data source to index. */
    KnownIndexerPermissionOption["RbacScope"] = "rbacScope";
})(KnownIndexerPermissionOption || (KnownIndexerPermissionOption = {}));
export function dataChangeDetectionPolicySerializer(item) {
    return { "@odata.type": item["odatatype"] };
}
export function dataChangeDetectionPolicyDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
    };
}
export function dataChangeDetectionPolicyUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy":
            return highWaterMarkChangeDetectionPolicySerializer(item);
        case "#Microsoft.Azure.Search.SqlIntegratedChangeTrackingPolicy":
            return sqlIntegratedChangeTrackingPolicySerializer(item);
        default:
            return dataChangeDetectionPolicySerializer(item);
    }
}
export function dataChangeDetectionPolicyUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy":
            return highWaterMarkChangeDetectionPolicyDeserializer(item);
        case "#Microsoft.Azure.Search.SqlIntegratedChangeTrackingPolicy":
            return sqlIntegratedChangeTrackingPolicyDeserializer(item);
        default:
            return dataChangeDetectionPolicyDeserializer(item);
    }
}
export function highWaterMarkChangeDetectionPolicySerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        highWaterMarkColumnName: item["highWaterMarkColumnName"],
    };
}
export function highWaterMarkChangeDetectionPolicyDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        highWaterMarkColumnName: item["highWaterMarkColumnName"],
    };
}
export function sqlIntegratedChangeTrackingPolicySerializer(item) {
    return { "@odata.type": item["odatatype"] };
}
export function sqlIntegratedChangeTrackingPolicyDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
    };
}
export function dataDeletionDetectionPolicySerializer(item) {
    return { "@odata.type": item["odatatype"] };
}
export function dataDeletionDetectionPolicyDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
    };
}
export function dataDeletionDetectionPolicyUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy":
            return softDeleteColumnDeletionDetectionPolicySerializer(item);
        case "#Microsoft.Azure.Search.NativeBlobSoftDeleteDeletionDetectionPolicy":
            return nativeBlobSoftDeleteDeletionDetectionPolicySerializer(item);
        default:
            return dataDeletionDetectionPolicySerializer(item);
    }
}
export function dataDeletionDetectionPolicyUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy":
            return softDeleteColumnDeletionDetectionPolicyDeserializer(item);
        case "#Microsoft.Azure.Search.NativeBlobSoftDeleteDeletionDetectionPolicy":
            return nativeBlobSoftDeleteDeletionDetectionPolicyDeserializer(item);
        default:
            return dataDeletionDetectionPolicyDeserializer(item);
    }
}
export function softDeleteColumnDeletionDetectionPolicySerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        softDeleteColumnName: item["softDeleteColumnName"],
        softDeleteMarkerValue: item["softDeleteMarkerValue"],
    };
}
export function softDeleteColumnDeletionDetectionPolicyDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        softDeleteColumnName: item["softDeleteColumnName"],
        softDeleteMarkerValue: item["softDeleteMarkerValue"],
    };
}
export function nativeBlobSoftDeleteDeletionDetectionPolicySerializer(item) {
    return { "@odata.type": item["odatatype"] };
}
export function nativeBlobSoftDeleteDeletionDetectionPolicyDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
    };
}
export function listDataSourcesResultDeserializer(item) {
    return {
        dataSources: searchIndexerDataSourceConnectionArrayDeserializer(item["value"]),
    };
}
export function searchIndexerDataSourceConnectionArraySerializer(result) {
    return result.map((item) => {
        return searchIndexerDataSourceConnectionSerializer(item);
    });
}
export function searchIndexerDataSourceConnectionArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerDataSourceConnectionDeserializer(item);
    });
}
export function indexerResyncBodySerializer(item) {
    return {
        options: !item["options"]
            ? item["options"]
            : item["options"].map((p) => {
                return p;
            }),
    };
}
/** Options with various types of permission data to index. */
export var KnownIndexerResyncOption;
(function (KnownIndexerResyncOption) {
    /** Indexer to re-ingest pre-selected permissions data from data source to index. */
    KnownIndexerResyncOption["Permissions"] = "permissions";
})(KnownIndexerResyncOption || (KnownIndexerResyncOption = {}));
export function documentKeysOrIdsSerializer(item) {
    return {
        documentKeys: !item["documentKeys"]
            ? item["documentKeys"]
            : item["documentKeys"].map((p) => {
                return p;
            }),
        datasourceDocumentIds: !item["datasourceDocumentIds"]
            ? item["datasourceDocumentIds"]
            : item["datasourceDocumentIds"].map((p) => {
                return p;
            }),
    };
}
export function searchIndexerSerializer(item) {
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
export function searchIndexerDeserializer(item) {
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
export function indexingParametersSerializer(item) {
    return {
        batchSize: item["batchSize"],
        maxFailedItems: item["maxFailedItems"],
        maxFailedItemsPerBatch: item["maxFailedItemsPerBatch"],
        configuration: !item["configuration"]
            ? item["configuration"]
            : indexingParametersConfigurationSerializer(item["configuration"]),
    };
}
export function indexingParametersDeserializer(item) {
    return {
        batchSize: item["batchSize"],
        maxFailedItems: item["maxFailedItems"],
        maxFailedItemsPerBatch: item["maxFailedItemsPerBatch"],
        configuration: !item["configuration"]
            ? item["configuration"]
            : indexingParametersConfigurationDeserializer(item["configuration"]),
    };
}
export function indexingParametersConfigurationSerializer(item) {
    return {
        ...serializeRecord(item.additionalProperties ?? {}),
        parsingMode: item["parsingMode"],
        excludedFileNameExtensions: item["excludedFileNameExtensions"],
        indexedFileNameExtensions: item["indexedFileNameExtensions"],
        failOnUnsupportedContentType: item["failOnUnsupportedContentType"],
        failOnUnprocessableDocument: item["failOnUnprocessableDocument"],
        indexStorageMetadataOnlyForOversizedDocuments: item["indexStorageMetadataOnlyForOversizedDocuments"],
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
export function indexingParametersConfigurationDeserializer(item) {
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
        indexStorageMetadataOnlyForOversizedDocuments: item["indexStorageMetadataOnlyForOversizedDocuments"],
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
export var KnownBlobIndexerParsingMode;
(function (KnownBlobIndexerParsingMode) {
    /** Set to default for normal file processing. */
    KnownBlobIndexerParsingMode["Default"] = "default";
    /** Set to text to improve indexing performance on plain text files in blob storage. */
    KnownBlobIndexerParsingMode["Text"] = "text";
    /** Set to delimitedText when blobs are plain CSV files. */
    KnownBlobIndexerParsingMode["DelimitedText"] = "delimitedText";
    /** Set to json to extract structured content from JSON files. */
    KnownBlobIndexerParsingMode["Json"] = "json";
    /** Set to jsonArray to extract individual elements of a JSON array as separate documents. */
    KnownBlobIndexerParsingMode["JsonArray"] = "jsonArray";
    /** Set to jsonLines to extract individual JSON entities, separated by a new line, as separate documents. */
    KnownBlobIndexerParsingMode["JsonLines"] = "jsonLines";
    /** Set to markdown to extract content from markdown files. */
    KnownBlobIndexerParsingMode["Markdown"] = "markdown";
})(KnownBlobIndexerParsingMode || (KnownBlobIndexerParsingMode = {}));
/** Specifies the submode that will determine whether a markdown file will be parsed into exactly one search document or multiple search documents. Default is `oneToMany`. */
export var KnownMarkdownParsingSubmode;
(function (KnownMarkdownParsingSubmode) {
    /** Indicates that each section of the markdown file (up to a specified depth) will be parsed into individual search documents. This can result in a single markdown file producing multiple search documents. This is the default sub-mode. */
    KnownMarkdownParsingSubmode["OneToMany"] = "oneToMany";
    /** Indicates that each markdown file will be parsed into a single search document. */
    KnownMarkdownParsingSubmode["OneToOne"] = "oneToOne";
})(KnownMarkdownParsingSubmode || (KnownMarkdownParsingSubmode = {}));
/** Specifies the max header depth that will be considered while grouping markdown content. Default is `h6`. */
export var KnownMarkdownHeaderDepth;
(function (KnownMarkdownHeaderDepth) {
    /** Indicates that headers up to a level of h1 will be considered while grouping markdown content. */
    KnownMarkdownHeaderDepth["H1"] = "h1";
    /** Indicates that headers up to a level of h2 will be considered while grouping markdown content. */
    KnownMarkdownHeaderDepth["H2"] = "h2";
    /** Indicates that headers up to a level of h3 will be considered while grouping markdown content. */
    KnownMarkdownHeaderDepth["H3"] = "h3";
    /** Indicates that headers up to a level of h4 will be considered while grouping markdown content. */
    KnownMarkdownHeaderDepth["H4"] = "h4";
    /** Indicates that headers up to a level of h5 will be considered while grouping markdown content. */
    KnownMarkdownHeaderDepth["H5"] = "h5";
    /** Indicates that headers up to a level of h6 will be considered while grouping markdown content. This is the default. */
    KnownMarkdownHeaderDepth["H6"] = "h6";
})(KnownMarkdownHeaderDepth || (KnownMarkdownHeaderDepth = {}));
/** Specifies the data to extract from Azure blob storage and tells the indexer which data to extract from image content when "imageAction" is set to a value other than "none".  This applies to embedded image content in a .PDF or other application, or image files such as .jpg and .png, in Azure blobs. */
export var KnownBlobIndexerDataToExtract;
(function (KnownBlobIndexerDataToExtract) {
    /** Indexes just the standard blob properties and user-specified metadata. */
    KnownBlobIndexerDataToExtract["StorageMetadata"] = "storageMetadata";
    /** Extracts metadata provided by the Azure blob storage subsystem and the content-type specific metadata (for example, metadata unique to just .png files are indexed). */
    KnownBlobIndexerDataToExtract["AllMetadata"] = "allMetadata";
    /** Extracts all metadata and textual content from each blob. */
    KnownBlobIndexerDataToExtract["ContentAndMetadata"] = "contentAndMetadata";
})(KnownBlobIndexerDataToExtract || (KnownBlobIndexerDataToExtract = {}));
/** Determines how to process embedded images and image files in Azure blob storage.  Setting the "imageAction" configuration to any value other than "none" requires that a skillset also be attached to that indexer. */
export var KnownBlobIndexerImageAction;
(function (KnownBlobIndexerImageAction) {
    /** Ignores embedded images or image files in the data set.  This is the default. */
    KnownBlobIndexerImageAction["None"] = "none";
    /** Extracts text from images (for example, the word "STOP" from a traffic stop sign), and embeds it into the content field.  This action requires that "dataToExtract" is set to "contentAndMetadata".  A normalized image refers to additional processing resulting in uniform image output, sized and rotated to promote consistent rendering when you include images in visual search results. This information is generated for each image when you use this option. */
    KnownBlobIndexerImageAction["GenerateNormalizedImages"] = "generateNormalizedImages";
    /** Extracts text from images (for example, the word "STOP" from a traffic stop sign), and embeds it into the content field, but treats PDF files differently in that each page will be rendered as an image and normalized accordingly, instead of extracting embedded images.  Non-PDF file types will be treated the same as if "generateNormalizedImages" was set. */
    KnownBlobIndexerImageAction["GenerateNormalizedImagePerPage"] = "generateNormalizedImagePerPage";
})(KnownBlobIndexerImageAction || (KnownBlobIndexerImageAction = {}));
/** Determines algorithm for text extraction from PDF files in Azure blob storage. */
export var KnownBlobIndexerPDFTextRotationAlgorithm;
(function (KnownBlobIndexerPDFTextRotationAlgorithm) {
    /** Leverages normal text extraction.  This is the default. */
    KnownBlobIndexerPDFTextRotationAlgorithm["None"] = "none";
    /** May produce better and more readable text extraction from PDF files that have rotated text within them.  Note that there may be a small performance speed impact when this parameter is used.  This parameter only applies to PDF files, and only to PDFs with embedded text.  If the rotated text appears within an embedded image in the PDF, this parameter does not apply. */
    KnownBlobIndexerPDFTextRotationAlgorithm["DetectAngles"] = "detectAngles";
})(KnownBlobIndexerPDFTextRotationAlgorithm || (KnownBlobIndexerPDFTextRotationAlgorithm = {}));
/** Specifies the environment in which the indexer should execute. */
export var KnownIndexerExecutionEnvironment;
(function (KnownIndexerExecutionEnvironment) {
    /** Indicates that the search service can determine where the indexer should execute. This is the default environment when nothing is specified and is the recommended value. */
    KnownIndexerExecutionEnvironment["Standard"] = "standard";
    /** Indicates that the indexer should run with the environment provisioned specifically for the search service. This should only be specified as the execution environment if the indexer needs to access resources securely over shared private link resources. */
    KnownIndexerExecutionEnvironment["Private"] = "private";
})(KnownIndexerExecutionEnvironment || (KnownIndexerExecutionEnvironment = {}));
export function fieldMappingArraySerializer(result) {
    return result.map((item) => {
        return fieldMappingSerializer(item);
    });
}
export function fieldMappingArrayDeserializer(result) {
    return result.map((item) => {
        return fieldMappingDeserializer(item);
    });
}
export function fieldMappingSerializer(item) {
    return {
        sourceFieldName: item["sourceFieldName"],
        targetFieldName: item["targetFieldName"],
        mappingFunction: !item["mappingFunction"]
            ? item["mappingFunction"]
            : fieldMappingFunctionSerializer(item["mappingFunction"]),
    };
}
export function fieldMappingDeserializer(item) {
    return {
        sourceFieldName: item["sourceFieldName"],
        targetFieldName: item["targetFieldName"],
        mappingFunction: !item["mappingFunction"]
            ? item["mappingFunction"]
            : fieldMappingFunctionDeserializer(item["mappingFunction"]),
    };
}
export function fieldMappingFunctionSerializer(item) {
    return { name: item["name"], parameters: item["parameters"] };
}
export function fieldMappingFunctionDeserializer(item) {
    return {
        name: item["name"],
        parameters: !item["parameters"]
            ? item["parameters"]
            : Object.fromEntries(Object.entries(item["parameters"]).map(([k1, p1]) => [k1, p1])),
    };
}
export function searchIndexerCacheSerializer(item) {
    return {
        id: item["id"],
        storageConnectionString: item["storageConnectionString"],
        enableReprocessing: item["enableReprocessing"],
        identity: !item["identity"]
            ? item["identity"]
            : searchIndexerDataIdentityUnionSerializer(item["identity"]),
    };
}
export function searchIndexerCacheDeserializer(item) {
    return {
        id: item["id"],
        storageConnectionString: item["storageConnectionString"],
        enableReprocessing: item["enableReprocessing"],
        identity: !item["identity"]
            ? item["identity"]
            : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
    };
}
export function listIndexersResultDeserializer(item) {
    return {
        indexers: searchIndexerArrayDeserializer(item["value"]),
    };
}
export function searchIndexerArraySerializer(result) {
    return result.map((item) => {
        return searchIndexerSerializer(item);
    });
}
export function searchIndexerArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerDeserializer(item);
    });
}
export function searchIndexerStatusDeserializer(item) {
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
export function indexerRuntimeDeserializer(item) {
    return {
        usedSeconds: item["usedSeconds"],
        remainingSeconds: item["remainingSeconds"],
        beginningTime: new Date(item["beginningTime"]),
        endingTime: new Date(item["endingTime"]),
    };
}
export function indexerExecutionResultDeserializer(item) {
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
/** Details the status of an individual indexer execution. */
export var KnownIndexerExecutionStatusDetail;
(function (KnownIndexerExecutionStatusDetail) {
    /** Indicates that the reset that occurred was for a call to ResetDocs. */
    KnownIndexerExecutionStatusDetail["ResetDocs"] = "resetDocs";
    /** Indicates to selectively resync based on option(s) from data source. */
    KnownIndexerExecutionStatusDetail["Resync"] = "resync";
})(KnownIndexerExecutionStatusDetail || (KnownIndexerExecutionStatusDetail = {}));
/** Represents the mode the indexer is executing in. */
export var KnownIndexingMode;
(function (KnownIndexingMode) {
    /** The indexer is indexing all documents in the datasource. */
    KnownIndexingMode["IndexingAllDocs"] = "indexingAllDocs";
    /** The indexer is indexing selective, reset documents in the datasource. The documents being indexed are defined on indexer status. */
    KnownIndexingMode["IndexingResetDocs"] = "indexingResetDocs";
    /** The indexer is resyncing and indexing selective option(s) from the datasource. */
    KnownIndexingMode["IndexingResync"] = "indexingResync";
})(KnownIndexingMode || (KnownIndexingMode = {}));
export function searchIndexerErrorArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerErrorDeserializer(item);
    });
}
export function searchIndexerErrorDeserializer(item) {
    return {
        key: item["key"],
        errorMessage: item["errorMessage"],
        statusCode: item["statusCode"],
        name: item["name"],
        details: item["details"],
        documentationLink: item["documentationLink"],
    };
}
export function searchIndexerWarningArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerWarningDeserializer(item);
    });
}
export function searchIndexerWarningDeserializer(item) {
    return {
        key: item["key"],
        message: item["message"],
        name: item["name"],
        details: item["details"],
        documentationLink: item["documentationLink"],
    };
}
export function indexerExecutionResultArrayDeserializer(result) {
    return result.map((item) => {
        return indexerExecutionResultDeserializer(item);
    });
}
export function searchIndexerLimitsDeserializer(item) {
    return {
        maxRunTime: item["maxRunTime"],
        maxDocumentExtractionSize: item["maxDocumentExtractionSize"],
        maxDocumentContentCharactersToExtract: item["maxDocumentContentCharactersToExtract"],
    };
}
export function indexerCurrentStateDeserializer(item) {
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
            : item["resetDocumentKeys"].map((p) => {
                return p;
            }),
        resetDatasourceDocumentIds: !item["resetDatasourceDocumentIds"]
            ? item["resetDatasourceDocumentIds"]
            : item["resetDatasourceDocumentIds"].map((p) => {
                return p;
            }),
    };
}
export function searchIndexerSkillsetSerializer(item) {
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
export function searchIndexerSkillsetDeserializer(item) {
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
export function searchIndexerSkillUnionArraySerializer(result) {
    return result.map((item) => {
        return searchIndexerSkillUnionSerializer(item);
    });
}
export function searchIndexerSkillUnionArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerSkillUnionDeserializer(item);
    });
}
export function searchIndexerSkillSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
        outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    };
}
export function searchIndexerSkillDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
        outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    };
}
export function searchIndexerSkillUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Skills.Util.ConditionalSkill":
            return conditionalSkillSerializer(item);
        case "#Microsoft.Skills.Text.KeyPhraseExtractionSkill":
            return keyPhraseExtractionSkillSerializer(item);
        case "#Microsoft.Skills.Vision.OcrSkill":
            return ocrSkillSerializer(item);
        case "#Microsoft.Skills.Vision.ImageAnalysisSkill":
            return imageAnalysisSkillSerializer(item);
        case "#Microsoft.Skills.Text.LanguageDetectionSkill":
            return languageDetectionSkillSerializer(item);
        case "#Microsoft.Skills.Util.ShaperSkill":
            return shaperSkillSerializer(item);
        case "#Microsoft.Skills.Text.MergeSkill":
            return mergeSkillSerializer(item);
        case "#Microsoft.Skills.Text.V3.SentimentSkill":
            return sentimentSkillV3Serializer(item);
        case "#Microsoft.Skills.Text.V3.EntityLinkingSkill":
            return entityLinkingSkillSerializer(item);
        case "#Microsoft.Skills.Text.V3.EntityRecognitionSkill":
            return entityRecognitionSkillV3Serializer(item);
        case "#Microsoft.Skills.Text.PIIDetectionSkill":
            return piiDetectionSkillSerializer(item);
        case "#Microsoft.Skills.Text.SplitSkill":
            return splitSkillSerializer(item);
        case "#Microsoft.Skills.Text.CustomEntityLookupSkill":
            return customEntityLookupSkillSerializer(item);
        case "#Microsoft.Skills.Text.TranslationSkill":
            return textTranslationSkillSerializer(item);
        case "#Microsoft.Skills.Util.DocumentExtractionSkill":
            return documentExtractionSkillSerializer(item);
        case "#Microsoft.Skills.Util.DocumentIntelligenceLayoutSkill":
            return documentIntelligenceLayoutSkillSerializer(item);
        case "#Microsoft.Skills.Custom.WebApiSkill":
            return webApiSkillSerializer(item);
        case "#Microsoft.Skills.Custom.AmlSkill":
            return azureMachineLearningSkillSerializer(item);
        case "#Microsoft.Skills.Text.AzureOpenAIEmbeddingSkill":
            return azureOpenAIEmbeddingSkillSerializer(item);
        case "#Microsoft.Skills.Vision.VectorizeSkill":
            return visionVectorizeSkillSerializer(item);
        case "#Microsoft.Skills.Util.ContentUnderstandingSkill":
            return contentUnderstandingSkillSerializer(item);
        case "#Microsoft.Skills.Custom.ChatCompletionSkill":
            return chatCompletionSkillSerializer(item);
        default:
            return searchIndexerSkillSerializer(item);
    }
}
export function searchIndexerSkillUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Skills.Util.ConditionalSkill":
            return conditionalSkillDeserializer(item);
        case "#Microsoft.Skills.Text.KeyPhraseExtractionSkill":
            return keyPhraseExtractionSkillDeserializer(item);
        case "#Microsoft.Skills.Vision.OcrSkill":
            return ocrSkillDeserializer(item);
        case "#Microsoft.Skills.Vision.ImageAnalysisSkill":
            return imageAnalysisSkillDeserializer(item);
        case "#Microsoft.Skills.Text.LanguageDetectionSkill":
            return languageDetectionSkillDeserializer(item);
        case "#Microsoft.Skills.Util.ShaperSkill":
            return shaperSkillDeserializer(item);
        case "#Microsoft.Skills.Text.MergeSkill":
            return mergeSkillDeserializer(item);
        case "#Microsoft.Skills.Text.V3.SentimentSkill":
            return sentimentSkillV3Deserializer(item);
        case "#Microsoft.Skills.Text.V3.EntityLinkingSkill":
            return entityLinkingSkillDeserializer(item);
        case "#Microsoft.Skills.Text.V3.EntityRecognitionSkill":
            return entityRecognitionSkillV3Deserializer(item);
        case "#Microsoft.Skills.Text.PIIDetectionSkill":
            return piiDetectionSkillDeserializer(item);
        case "#Microsoft.Skills.Text.SplitSkill":
            return splitSkillDeserializer(item);
        case "#Microsoft.Skills.Text.CustomEntityLookupSkill":
            return customEntityLookupSkillDeserializer(item);
        case "#Microsoft.Skills.Text.TranslationSkill":
            return textTranslationSkillDeserializer(item);
        case "#Microsoft.Skills.Util.DocumentExtractionSkill":
            return documentExtractionSkillDeserializer(item);
        case "#Microsoft.Skills.Util.DocumentIntelligenceLayoutSkill":
            return documentIntelligenceLayoutSkillDeserializer(item);
        case "#Microsoft.Skills.Custom.WebApiSkill":
            return webApiSkillDeserializer(item);
        case "#Microsoft.Skills.Custom.AmlSkill":
            return azureMachineLearningSkillDeserializer(item);
        case "#Microsoft.Skills.Text.AzureOpenAIEmbeddingSkill":
            return azureOpenAIEmbeddingSkillDeserializer(item);
        case "#Microsoft.Skills.Vision.VectorizeSkill":
            return visionVectorizeSkillDeserializer(item);
        case "#Microsoft.Skills.Util.ContentUnderstandingSkill":
            return contentUnderstandingSkillDeserializer(item);
        case "#Microsoft.Skills.Custom.ChatCompletionSkill":
            return chatCompletionSkillDeserializer(item);
        default:
            return searchIndexerSkillDeserializer(item);
    }
}
export function inputFieldMappingEntryArraySerializer(result) {
    return result.map((item) => {
        return inputFieldMappingEntrySerializer(item);
    });
}
export function inputFieldMappingEntryArrayDeserializer(result) {
    return result.map((item) => {
        return inputFieldMappingEntryDeserializer(item);
    });
}
export function inputFieldMappingEntrySerializer(item) {
    return {
        name: item["name"],
        source: item["source"],
        sourceContext: item["sourceContext"],
        inputs: !item["inputs"]
            ? item["inputs"]
            : inputFieldMappingEntryArraySerializer(item["inputs"]),
    };
}
export function inputFieldMappingEntryDeserializer(item) {
    return {
        name: item["name"],
        source: item["source"],
        sourceContext: item["sourceContext"],
        inputs: !item["inputs"]
            ? item["inputs"]
            : inputFieldMappingEntryArrayDeserializer(item["inputs"]),
    };
}
export function outputFieldMappingEntryArraySerializer(result) {
    return result.map((item) => {
        return outputFieldMappingEntrySerializer(item);
    });
}
export function outputFieldMappingEntryArrayDeserializer(result) {
    return result.map((item) => {
        return outputFieldMappingEntryDeserializer(item);
    });
}
export function outputFieldMappingEntrySerializer(item) {
    return { name: item["name"], targetName: item["targetName"] };
}
export function outputFieldMappingEntryDeserializer(item) {
    return {
        name: item["name"],
        targetName: item["targetName"],
    };
}
export function conditionalSkillSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
        outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    };
}
export function conditionalSkillDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
        outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    };
}
export function keyPhraseExtractionSkillSerializer(item) {
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
export function keyPhraseExtractionSkillDeserializer(item) {
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
export var KnownKeyPhraseExtractionSkillLanguage;
(function (KnownKeyPhraseExtractionSkillLanguage) {
    /** Danish */
    KnownKeyPhraseExtractionSkillLanguage["Da"] = "da";
    /** Dutch */
    KnownKeyPhraseExtractionSkillLanguage["Nl"] = "nl";
    /** English */
    KnownKeyPhraseExtractionSkillLanguage["En"] = "en";
    /** Finnish */
    KnownKeyPhraseExtractionSkillLanguage["Fi"] = "fi";
    /** French */
    KnownKeyPhraseExtractionSkillLanguage["Fr"] = "fr";
    /** German */
    KnownKeyPhraseExtractionSkillLanguage["De"] = "de";
    /** Italian */
    KnownKeyPhraseExtractionSkillLanguage["It"] = "it";
    /** Japanese */
    KnownKeyPhraseExtractionSkillLanguage["Ja"] = "ja";
    /** Korean */
    KnownKeyPhraseExtractionSkillLanguage["Ko"] = "ko";
    /** Norwegian (Bokmaal) */
    KnownKeyPhraseExtractionSkillLanguage["No"] = "no";
    /** Polish */
    KnownKeyPhraseExtractionSkillLanguage["Pl"] = "pl";
    /** Portuguese (Portugal) */
    KnownKeyPhraseExtractionSkillLanguage["PtPT"] = "pt-PT";
    /** Portuguese (Brazil) */
    KnownKeyPhraseExtractionSkillLanguage["PtBR"] = "pt-BR";
    /** Russian */
    KnownKeyPhraseExtractionSkillLanguage["Ru"] = "ru";
    /** Spanish */
    KnownKeyPhraseExtractionSkillLanguage["Es"] = "es";
    /** Swedish */
    KnownKeyPhraseExtractionSkillLanguage["Sv"] = "sv";
})(KnownKeyPhraseExtractionSkillLanguage || (KnownKeyPhraseExtractionSkillLanguage = {}));
export function ocrSkillSerializer(item) {
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
export function ocrSkillDeserializer(item) {
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
export var KnownOcrSkillLanguage;
(function (KnownOcrSkillLanguage) {
    /** Afrikaans */
    KnownOcrSkillLanguage["Af"] = "af";
    /** Albanian */
    KnownOcrSkillLanguage["Sq"] = "sq";
    /** Angika (Devanagiri) */
    KnownOcrSkillLanguage["Anp"] = "anp";
    /** Arabic */
    KnownOcrSkillLanguage["Ar"] = "ar";
    /** Asturian */
    KnownOcrSkillLanguage["Ast"] = "ast";
    /** Awadhi-Hindi (Devanagiri) */
    KnownOcrSkillLanguage["Awa"] = "awa";
    /** Azerbaijani (Latin) */
    KnownOcrSkillLanguage["Az"] = "az";
    /** Bagheli */
    KnownOcrSkillLanguage["Bfy"] = "bfy";
    /** Basque */
    KnownOcrSkillLanguage["Eu"] = "eu";
    /** Belarusian (Cyrillic and Latin) */
    KnownOcrSkillLanguage["Be"] = "be";
    /** Belarusian (Cyrillic) */
    KnownOcrSkillLanguage["BeCyrl"] = "be-cyrl";
    /** Belarusian (Latin) */
    KnownOcrSkillLanguage["BeLatn"] = "be-latn";
    /** Bhojpuri-Hindi (Devanagiri) */
    KnownOcrSkillLanguage["Bho"] = "bho";
    /** Bislama */
    KnownOcrSkillLanguage["Bi"] = "bi";
    /** Bodo (Devanagiri) */
    KnownOcrSkillLanguage["Brx"] = "brx";
    /** Bosnian Latin */
    KnownOcrSkillLanguage["Bs"] = "bs";
    /** Brajbha */
    KnownOcrSkillLanguage["Bra"] = "bra";
    /** Breton */
    KnownOcrSkillLanguage["Br"] = "br";
    /** Bulgarian */
    KnownOcrSkillLanguage["Bg"] = "bg";
    /** Bundeli */
    KnownOcrSkillLanguage["Bns"] = "bns";
    /** Buryat (Cyrillic) */
    KnownOcrSkillLanguage["Bua"] = "bua";
    /** Catalan */
    KnownOcrSkillLanguage["Ca"] = "ca";
    /** Cebuano */
    KnownOcrSkillLanguage["Ceb"] = "ceb";
    /** Chamling */
    KnownOcrSkillLanguage["Rab"] = "rab";
    /** Chamorro */
    KnownOcrSkillLanguage["Ch"] = "ch";
    /** Chhattisgarhi (Devanagiri) */
    KnownOcrSkillLanguage["Hne"] = "hne";
    /** Chinese Simplified */
    KnownOcrSkillLanguage["ZhHans"] = "zh-Hans";
    /** Chinese Traditional */
    KnownOcrSkillLanguage["ZhHant"] = "zh-Hant";
    /** Cornish */
    KnownOcrSkillLanguage["Kw"] = "kw";
    /** Corsican */
    KnownOcrSkillLanguage["Co"] = "co";
    /** Crimean Tatar (Latin) */
    KnownOcrSkillLanguage["Crh"] = "crh";
    /** Croatian */
    KnownOcrSkillLanguage["Hr"] = "hr";
    /** Czech */
    KnownOcrSkillLanguage["Cs"] = "cs";
    /** Danish */
    KnownOcrSkillLanguage["Da"] = "da";
    /** Dari */
    KnownOcrSkillLanguage["Prs"] = "prs";
    /** Dhimal (Devanagiri) */
    KnownOcrSkillLanguage["Dhi"] = "dhi";
    /** Dogri (Devanagiri) */
    KnownOcrSkillLanguage["Doi"] = "doi";
    /** Dutch */
    KnownOcrSkillLanguage["Nl"] = "nl";
    /** English */
    KnownOcrSkillLanguage["En"] = "en";
    /** Erzya (Cyrillic) */
    KnownOcrSkillLanguage["Myv"] = "myv";
    /** Estonian */
    KnownOcrSkillLanguage["Et"] = "et";
    /** Faroese */
    KnownOcrSkillLanguage["Fo"] = "fo";
    /** Fijian */
    KnownOcrSkillLanguage["Fj"] = "fj";
    /** Filipino */
    KnownOcrSkillLanguage["Fil"] = "fil";
    /** Finnish */
    KnownOcrSkillLanguage["Fi"] = "fi";
    /** French */
    KnownOcrSkillLanguage["Fr"] = "fr";
    /** Frulian */
    KnownOcrSkillLanguage["Fur"] = "fur";
    /** Gagauz (Latin) */
    KnownOcrSkillLanguage["Gag"] = "gag";
    /** Galician */
    KnownOcrSkillLanguage["Gl"] = "gl";
    /** German */
    KnownOcrSkillLanguage["De"] = "de";
    /** Gilbertese */
    KnownOcrSkillLanguage["Gil"] = "gil";
    /** Gondi (Devanagiri) */
    KnownOcrSkillLanguage["Gon"] = "gon";
    /** Greek */
    KnownOcrSkillLanguage["El"] = "el";
    /** Greenlandic */
    KnownOcrSkillLanguage["Kl"] = "kl";
    /** Gurung (Devanagiri) */
    KnownOcrSkillLanguage["Gvr"] = "gvr";
    /** Haitian Creole */
    KnownOcrSkillLanguage["Ht"] = "ht";
    /** Halbi (Devanagiri) */
    KnownOcrSkillLanguage["Hlb"] = "hlb";
    /** Hani */
    KnownOcrSkillLanguage["Hni"] = "hni";
    /** Haryanvi */
    KnownOcrSkillLanguage["Bgc"] = "bgc";
    /** Hawaiian */
    KnownOcrSkillLanguage["Haw"] = "haw";
    /** Hindi */
    KnownOcrSkillLanguage["Hi"] = "hi";
    /** Hmong Daw (Latin) */
    KnownOcrSkillLanguage["Mww"] = "mww";
    /** Ho (Devanagiri) */
    KnownOcrSkillLanguage["Hoc"] = "hoc";
    /** Hungarian */
    KnownOcrSkillLanguage["Hu"] = "hu";
    /** Icelandic */
    KnownOcrSkillLanguage["Is"] = "is";
    /** Inari Sami */
    KnownOcrSkillLanguage["Smn"] = "smn";
    /** Indonesian */
    KnownOcrSkillLanguage["Id"] = "id";
    /** Interlingua */
    KnownOcrSkillLanguage["Ia"] = "ia";
    /** Inuktitut (Latin) */
    KnownOcrSkillLanguage["Iu"] = "iu";
    /** Irish */
    KnownOcrSkillLanguage["Ga"] = "ga";
    /** Italian */
    KnownOcrSkillLanguage["It"] = "it";
    /** Japanese */
    KnownOcrSkillLanguage["Ja"] = "ja";
    /** Jaunsari (Devanagiri) */
    KnownOcrSkillLanguage["Jns"] = "Jns";
    /** Javanese */
    KnownOcrSkillLanguage["Jv"] = "jv";
    /** Kabuverdianu */
    KnownOcrSkillLanguage["Kea"] = "kea";
    /** Kachin (Latin) */
    KnownOcrSkillLanguage["Kac"] = "kac";
    /** Kangri (Devanagiri) */
    KnownOcrSkillLanguage["Xnr"] = "xnr";
    /** Karachay-Balkar */
    KnownOcrSkillLanguage["Krc"] = "krc";
    /** Kara-Kalpak (Cyrillic) */
    KnownOcrSkillLanguage["KaaCyrl"] = "kaa-cyrl";
    /** Kara-Kalpak (Latin) */
    KnownOcrSkillLanguage["Kaa"] = "kaa";
    /** Kashubian */
    KnownOcrSkillLanguage["Csb"] = "csb";
    /** Kazakh (Cyrillic) */
    KnownOcrSkillLanguage["KkCyrl"] = "kk-cyrl";
    /** Kazakh (Latin) */
    KnownOcrSkillLanguage["KkLatn"] = "kk-latn";
    /** Khaling */
    KnownOcrSkillLanguage["Klr"] = "klr";
    /** Khasi */
    KnownOcrSkillLanguage["Kha"] = "kha";
    /** K'iche' */
    KnownOcrSkillLanguage["Quc"] = "quc";
    /** Korean */
    KnownOcrSkillLanguage["Ko"] = "ko";
    /** Korku */
    KnownOcrSkillLanguage["Kfq"] = "kfq";
    /** Koryak */
    KnownOcrSkillLanguage["Kpy"] = "kpy";
    /** Kosraean */
    KnownOcrSkillLanguage["Kos"] = "kos";
    /** Kumyk (Cyrillic) */
    KnownOcrSkillLanguage["Kum"] = "kum";
    /** Kurdish (Arabic) */
    KnownOcrSkillLanguage["KuArab"] = "ku-arab";
    /** Kurdish (Latin) */
    KnownOcrSkillLanguage["KuLatn"] = "ku-latn";
    /** Kurukh (Devanagiri) */
    KnownOcrSkillLanguage["Kru"] = "kru";
    /** Kyrgyz (Cyrillic) */
    KnownOcrSkillLanguage["Ky"] = "ky";
    /** Lakota */
    KnownOcrSkillLanguage["Lkt"] = "lkt";
    /** Latin */
    KnownOcrSkillLanguage["La"] = "la";
    /** Lithuanian */
    KnownOcrSkillLanguage["Lt"] = "lt";
    /** Lower Sorbian */
    KnownOcrSkillLanguage["Dsb"] = "dsb";
    /** Lule Sami */
    KnownOcrSkillLanguage["Smj"] = "smj";
    /** Luxembourgish */
    KnownOcrSkillLanguage["Lb"] = "lb";
    /** Mahasu Pahari (Devanagiri) */
    KnownOcrSkillLanguage["Bfz"] = "bfz";
    /** Malay (Latin) */
    KnownOcrSkillLanguage["Ms"] = "ms";
    /** Maltese */
    KnownOcrSkillLanguage["Mt"] = "mt";
    /** Malto (Devanagiri) */
    KnownOcrSkillLanguage["Kmj"] = "kmj";
    /** Manx */
    KnownOcrSkillLanguage["Gv"] = "gv";
    /** Maori */
    KnownOcrSkillLanguage["Mi"] = "mi";
    /** Marathi */
    KnownOcrSkillLanguage["Mr"] = "mr";
    /** Mongolian (Cyrillic) */
    KnownOcrSkillLanguage["Mn"] = "mn";
    /** Montenegrin (Cyrillic) */
    KnownOcrSkillLanguage["CnrCyrl"] = "cnr-cyrl";
    /** Montenegrin (Latin) */
    KnownOcrSkillLanguage["CnrLatn"] = "cnr-latn";
    /** Neapolitan */
    KnownOcrSkillLanguage["Nap"] = "nap";
    /** Nepali */
    KnownOcrSkillLanguage["Ne"] = "ne";
    /** Niuean */
    KnownOcrSkillLanguage["Niu"] = "niu";
    /** Nogay */
    KnownOcrSkillLanguage["Nog"] = "nog";
    /** Northern Sami (Latin) */
    KnownOcrSkillLanguage["Sme"] = "sme";
    /** Norwegian */
    KnownOcrSkillLanguage["Nb"] = "nb";
    /** Norwegian */
    KnownOcrSkillLanguage["No"] = "no";
    /** Occitan */
    KnownOcrSkillLanguage["Oc"] = "oc";
    /** Ossetic */
    KnownOcrSkillLanguage["Os"] = "os";
    /** Pashto */
    KnownOcrSkillLanguage["Ps"] = "ps";
    /** Persian */
    KnownOcrSkillLanguage["Fa"] = "fa";
    /** Polish */
    KnownOcrSkillLanguage["Pl"] = "pl";
    /** Portuguese */
    KnownOcrSkillLanguage["Pt"] = "pt";
    /** Punjabi (Arabic) */
    KnownOcrSkillLanguage["Pa"] = "pa";
    /** Ripuarian */
    KnownOcrSkillLanguage["Ksh"] = "ksh";
    /** Romanian */
    KnownOcrSkillLanguage["Ro"] = "ro";
    /** Romansh */
    KnownOcrSkillLanguage["Rm"] = "rm";
    /** Russian */
    KnownOcrSkillLanguage["Ru"] = "ru";
    /** Sadri (Devanagiri) */
    KnownOcrSkillLanguage["Sck"] = "sck";
    /** Samoan (Latin) */
    KnownOcrSkillLanguage["Sm"] = "sm";
    /** Sanskrit (Devanagiri) */
    KnownOcrSkillLanguage["Sa"] = "sa";
    /** Santali (Devanagiri) */
    KnownOcrSkillLanguage["Sat"] = "sat";
    /** Scots */
    KnownOcrSkillLanguage["Sco"] = "sco";
    /** Scottish Gaelic */
    KnownOcrSkillLanguage["Gd"] = "gd";
    /** Serbian (Latin) */
    KnownOcrSkillLanguage["Sr"] = "sr";
    /** Serbian (Cyrillic) */
    KnownOcrSkillLanguage["SrCyrl"] = "sr-Cyrl";
    /** Serbian (Latin) */
    KnownOcrSkillLanguage["SrLatn"] = "sr-Latn";
    /** Sherpa (Devanagiri) */
    KnownOcrSkillLanguage["Xsr"] = "xsr";
    /** Sirmauri (Devanagiri) */
    KnownOcrSkillLanguage["Srx"] = "srx";
    /** Skolt Sami */
    KnownOcrSkillLanguage["Sms"] = "sms";
    /** Slovak */
    KnownOcrSkillLanguage["Sk"] = "sk";
    /** Slovenian */
    KnownOcrSkillLanguage["Sl"] = "sl";
    /** Somali (Arabic) */
    KnownOcrSkillLanguage["So"] = "so";
    /** Southern Sami */
    KnownOcrSkillLanguage["Sma"] = "sma";
    /** Spanish */
    KnownOcrSkillLanguage["Es"] = "es";
    /** Swahili (Latin) */
    KnownOcrSkillLanguage["Sw"] = "sw";
    /** Swedish */
    KnownOcrSkillLanguage["Sv"] = "sv";
    /** Tajik (Cyrillic) */
    KnownOcrSkillLanguage["Tg"] = "tg";
    /** Tatar (Latin) */
    KnownOcrSkillLanguage["Tt"] = "tt";
    /** Tetum */
    KnownOcrSkillLanguage["Tet"] = "tet";
    /** Thangmi */
    KnownOcrSkillLanguage["Thf"] = "thf";
    /** Tongan */
    KnownOcrSkillLanguage["To"] = "to";
    /** Turkish */
    KnownOcrSkillLanguage["Tr"] = "tr";
    /** Turkmen (Latin) */
    KnownOcrSkillLanguage["Tk"] = "tk";
    /** Tuvan */
    KnownOcrSkillLanguage["Tyv"] = "tyv";
    /** Upper Sorbian */
    KnownOcrSkillLanguage["Hsb"] = "hsb";
    /** Urdu */
    KnownOcrSkillLanguage["Ur"] = "ur";
    /** Uyghur (Arabic) */
    KnownOcrSkillLanguage["Ug"] = "ug";
    /** Uzbek (Arabic) */
    KnownOcrSkillLanguage["UzArab"] = "uz-arab";
    /** Uzbek (Cyrillic) */
    KnownOcrSkillLanguage["UzCyrl"] = "uz-cyrl";
    /** Uzbek (Latin) */
    KnownOcrSkillLanguage["Uz"] = "uz";
    /** Volapük */
    KnownOcrSkillLanguage["Vo"] = "vo";
    /** Walser */
    KnownOcrSkillLanguage["Wae"] = "wae";
    /** Welsh */
    KnownOcrSkillLanguage["Cy"] = "cy";
    /** Western Frisian */
    KnownOcrSkillLanguage["Fy"] = "fy";
    /** Yucatec Maya */
    KnownOcrSkillLanguage["Yua"] = "yua";
    /** Zhuang */
    KnownOcrSkillLanguage["Za"] = "za";
    /** Zulu */
    KnownOcrSkillLanguage["Zu"] = "zu";
    /** Unknown (All) */
    KnownOcrSkillLanguage["Unk"] = "unk";
})(KnownOcrSkillLanguage || (KnownOcrSkillLanguage = {}));
/** Defines the sequence of characters to use between the lines of text recognized by the OCR skill. The default value is "space". */
export var KnownOcrLineEnding;
(function (KnownOcrLineEnding) {
    /** Lines are separated by a single space character. */
    KnownOcrLineEnding["Space"] = "space";
    /** Lines are separated by a carriage return ('\r') character. */
    KnownOcrLineEnding["CarriageReturn"] = "carriageReturn";
    /** Lines are separated by a single line feed ('\n') character. */
    KnownOcrLineEnding["LineFeed"] = "lineFeed";
    /** Lines are separated by a carriage return and a line feed ('\r\n') character. */
    KnownOcrLineEnding["CarriageReturnLineFeed"] = "carriageReturnLineFeed";
})(KnownOcrLineEnding || (KnownOcrLineEnding = {}));
export function imageAnalysisSkillSerializer(item) {
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
            : item["visualFeatures"].map((p) => {
                return p;
            }),
        details: !item["details"]
            ? item["details"]
            : item["details"].map((p) => {
                return p;
            }),
    };
}
export function imageAnalysisSkillDeserializer(item) {
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
            : item["visualFeatures"].map((p) => {
                return p;
            }),
        details: !item["details"]
            ? item["details"]
            : item["details"].map((p) => {
                return p;
            }),
    };
}
/** The language codes supported for input by ImageAnalysisSkill. */
export var KnownImageAnalysisSkillLanguage;
(function (KnownImageAnalysisSkillLanguage) {
    /** Arabic */
    KnownImageAnalysisSkillLanguage["Ar"] = "ar";
    /** Azerbaijani */
    KnownImageAnalysisSkillLanguage["Az"] = "az";
    /** Bulgarian */
    KnownImageAnalysisSkillLanguage["Bg"] = "bg";
    /** Bosnian Latin */
    KnownImageAnalysisSkillLanguage["Bs"] = "bs";
    /** Catalan */
    KnownImageAnalysisSkillLanguage["Ca"] = "ca";
    /** Czech */
    KnownImageAnalysisSkillLanguage["Cs"] = "cs";
    /** Welsh */
    KnownImageAnalysisSkillLanguage["Cy"] = "cy";
    /** Danish */
    KnownImageAnalysisSkillLanguage["Da"] = "da";
    /** German */
    KnownImageAnalysisSkillLanguage["De"] = "de";
    /** Greek */
    KnownImageAnalysisSkillLanguage["El"] = "el";
    /** English */
    KnownImageAnalysisSkillLanguage["En"] = "en";
    /** Spanish */
    KnownImageAnalysisSkillLanguage["Es"] = "es";
    /** Estonian */
    KnownImageAnalysisSkillLanguage["Et"] = "et";
    /** Basque */
    KnownImageAnalysisSkillLanguage["Eu"] = "eu";
    /** Finnish */
    KnownImageAnalysisSkillLanguage["Fi"] = "fi";
    /** French */
    KnownImageAnalysisSkillLanguage["Fr"] = "fr";
    /** Irish */
    KnownImageAnalysisSkillLanguage["Ga"] = "ga";
    /** Galician */
    KnownImageAnalysisSkillLanguage["Gl"] = "gl";
    /** Hebrew */
    KnownImageAnalysisSkillLanguage["He"] = "he";
    /** Hindi */
    KnownImageAnalysisSkillLanguage["Hi"] = "hi";
    /** Croatian */
    KnownImageAnalysisSkillLanguage["Hr"] = "hr";
    /** Hungarian */
    KnownImageAnalysisSkillLanguage["Hu"] = "hu";
    /** Indonesian */
    KnownImageAnalysisSkillLanguage["Id"] = "id";
    /** Italian */
    KnownImageAnalysisSkillLanguage["It"] = "it";
    /** Japanese */
    KnownImageAnalysisSkillLanguage["Ja"] = "ja";
    /** Kazakh */
    KnownImageAnalysisSkillLanguage["Kk"] = "kk";
    /** Korean */
    KnownImageAnalysisSkillLanguage["Ko"] = "ko";
    /** Lithuanian */
    KnownImageAnalysisSkillLanguage["Lt"] = "lt";
    /** Latvian */
    KnownImageAnalysisSkillLanguage["Lv"] = "lv";
    /** Macedonian */
    KnownImageAnalysisSkillLanguage["Mk"] = "mk";
    /** Malay Malaysia */
    KnownImageAnalysisSkillLanguage["Ms"] = "ms";
    /** Norwegian (Bokmal) */
    KnownImageAnalysisSkillLanguage["Nb"] = "nb";
    /** Dutch */
    KnownImageAnalysisSkillLanguage["Nl"] = "nl";
    /** Polish */
    KnownImageAnalysisSkillLanguage["Pl"] = "pl";
    /** Dari */
    KnownImageAnalysisSkillLanguage["Prs"] = "prs";
    /** Portuguese-Brazil */
    KnownImageAnalysisSkillLanguage["PtBR"] = "pt-BR";
    /** Portuguese-Portugal */
    KnownImageAnalysisSkillLanguage["Pt"] = "pt";
    /** Portuguese-Portugal */
    KnownImageAnalysisSkillLanguage["PtPT"] = "pt-PT";
    /** Romanian */
    KnownImageAnalysisSkillLanguage["Ro"] = "ro";
    /** Russian */
    KnownImageAnalysisSkillLanguage["Ru"] = "ru";
    /** Slovak */
    KnownImageAnalysisSkillLanguage["Sk"] = "sk";
    /** Slovenian */
    KnownImageAnalysisSkillLanguage["Sl"] = "sl";
    /** Serbian - Cyrillic RS */
    KnownImageAnalysisSkillLanguage["SrCyrl"] = "sr-Cyrl";
    /** Serbian - Latin RS */
    KnownImageAnalysisSkillLanguage["SrLatn"] = "sr-Latn";
    /** Swedish */
    KnownImageAnalysisSkillLanguage["Sv"] = "sv";
    /** Thai */
    KnownImageAnalysisSkillLanguage["Th"] = "th";
    /** Turkish */
    KnownImageAnalysisSkillLanguage["Tr"] = "tr";
    /** Ukrainian */
    KnownImageAnalysisSkillLanguage["Uk"] = "uk";
    /** Vietnamese */
    KnownImageAnalysisSkillLanguage["Vi"] = "vi";
    /** Chinese Simplified */
    KnownImageAnalysisSkillLanguage["Zh"] = "zh";
    /** Chinese Simplified */
    KnownImageAnalysisSkillLanguage["ZhHans"] = "zh-Hans";
    /** Chinese Traditional */
    KnownImageAnalysisSkillLanguage["ZhHant"] = "zh-Hant";
})(KnownImageAnalysisSkillLanguage || (KnownImageAnalysisSkillLanguage = {}));
/** The strings indicating what visual feature types to return. */
export var KnownVisualFeature;
(function (KnownVisualFeature) {
    /** Visual features recognized as adult persons. */
    KnownVisualFeature["Adult"] = "adult";
    /** Visual features recognized as commercial brands. */
    KnownVisualFeature["Brands"] = "brands";
    /** Categories. */
    KnownVisualFeature["Categories"] = "categories";
    /** Description. */
    KnownVisualFeature["Description"] = "description";
    /** Visual features recognized as people faces. */
    KnownVisualFeature["Faces"] = "faces";
    /** Visual features recognized as objects. */
    KnownVisualFeature["Objects"] = "objects";
    /** Tags. */
    KnownVisualFeature["Tags"] = "tags";
})(KnownVisualFeature || (KnownVisualFeature = {}));
/** A string indicating which domain-specific details to return. */
export var KnownImageDetail;
(function (KnownImageDetail) {
    /** Details recognized as celebrities. */
    KnownImageDetail["Celebrities"] = "celebrities";
    /** Details recognized as landmarks. */
    KnownImageDetail["Landmarks"] = "landmarks";
})(KnownImageDetail || (KnownImageDetail = {}));
export function languageDetectionSkillSerializer(item) {
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
export function languageDetectionSkillDeserializer(item) {
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
export function shaperSkillSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
        outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
    };
}
export function shaperSkillDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
        outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
    };
}
export function mergeSkillSerializer(item) {
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
export function mergeSkillDeserializer(item) {
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
export function sentimentSkillV3Serializer(item) {
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
export function sentimentSkillV3Deserializer(item) {
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
/** The language codes supported for input text by SentimentSkill. */
export var KnownSentimentSkillLanguage;
(function (KnownSentimentSkillLanguage) {
    /** Danish */
    KnownSentimentSkillLanguage["Da"] = "da";
    /** Dutch */
    KnownSentimentSkillLanguage["Nl"] = "nl";
    /** English */
    KnownSentimentSkillLanguage["En"] = "en";
    /** Finnish */
    KnownSentimentSkillLanguage["Fi"] = "fi";
    /** French */
    KnownSentimentSkillLanguage["Fr"] = "fr";
    /** German */
    KnownSentimentSkillLanguage["De"] = "de";
    /** Greek */
    KnownSentimentSkillLanguage["El"] = "el";
    /** Italian */
    KnownSentimentSkillLanguage["It"] = "it";
    /** Norwegian (Bokmaal) */
    KnownSentimentSkillLanguage["No"] = "no";
    /** Polish */
    KnownSentimentSkillLanguage["Pl"] = "pl";
    /** Portuguese (Portugal) */
    KnownSentimentSkillLanguage["PtPT"] = "pt-PT";
    /** Russian */
    KnownSentimentSkillLanguage["Ru"] = "ru";
    /** Spanish */
    KnownSentimentSkillLanguage["Es"] = "es";
    /** Swedish */
    KnownSentimentSkillLanguage["Sv"] = "sv";
    /** Turkish */
    KnownSentimentSkillLanguage["Tr"] = "tr";
})(KnownSentimentSkillLanguage || (KnownSentimentSkillLanguage = {}));
export function entityLinkingSkillSerializer(item) {
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
export function entityLinkingSkillDeserializer(item) {
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
export function entityRecognitionSkillV3Serializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
        outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
        categories: !item["categories"]
            ? item["categories"]
            : item["categories"].map((p) => {
                return p;
            }),
        defaultLanguageCode: item["defaultLanguageCode"],
        minimumPrecision: item["minimumPrecision"],
        modelVersion: item["modelVersion"],
    };
}
export function entityRecognitionSkillV3Deserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
        outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
        categories: !item["categories"]
            ? item["categories"]
            : item["categories"].map((p) => {
                return p;
            }),
        defaultLanguageCode: item["defaultLanguageCode"],
        minimumPrecision: item["minimumPrecision"],
        modelVersion: item["modelVersion"],
    };
}
/** A string indicating what entity categories to return. */
export var KnownEntityCategory;
(function (KnownEntityCategory) {
    /** Entities describing a physical location. */
    KnownEntityCategory["Location"] = "location";
    /** Entities describing an organization. */
    KnownEntityCategory["Organization"] = "organization";
    /** Entities describing a person. */
    KnownEntityCategory["Person"] = "person";
    /** Entities describing a quantity. */
    KnownEntityCategory["Quantity"] = "quantity";
    /** Entities describing a date and time. */
    KnownEntityCategory["Datetime"] = "datetime";
    /** Entities describing a URL. */
    KnownEntityCategory["Url"] = "url";
    /** Entities describing an email address. */
    KnownEntityCategory["Email"] = "email";
})(KnownEntityCategory || (KnownEntityCategory = {}));
/** The language codes supported for input text by EntityRecognitionSkill. */
export var KnownEntityRecognitionSkillLanguage;
(function (KnownEntityRecognitionSkillLanguage) {
    /** Arabic */
    KnownEntityRecognitionSkillLanguage["Ar"] = "ar";
    /** Czech */
    KnownEntityRecognitionSkillLanguage["Cs"] = "cs";
    /** Chinese-Simplified */
    KnownEntityRecognitionSkillLanguage["ZhHans"] = "zh-Hans";
    /** Chinese-Traditional */
    KnownEntityRecognitionSkillLanguage["ZhHant"] = "zh-Hant";
    /** Danish */
    KnownEntityRecognitionSkillLanguage["Da"] = "da";
    /** Dutch */
    KnownEntityRecognitionSkillLanguage["Nl"] = "nl";
    /** English */
    KnownEntityRecognitionSkillLanguage["En"] = "en";
    /** Finnish */
    KnownEntityRecognitionSkillLanguage["Fi"] = "fi";
    /** French */
    KnownEntityRecognitionSkillLanguage["Fr"] = "fr";
    /** German */
    KnownEntityRecognitionSkillLanguage["De"] = "de";
    /** Greek */
    KnownEntityRecognitionSkillLanguage["El"] = "el";
    /** Hungarian */
    KnownEntityRecognitionSkillLanguage["Hu"] = "hu";
    /** Italian */
    KnownEntityRecognitionSkillLanguage["It"] = "it";
    /** Japanese */
    KnownEntityRecognitionSkillLanguage["Ja"] = "ja";
    /** Korean */
    KnownEntityRecognitionSkillLanguage["Ko"] = "ko";
    /** Norwegian (Bokmaal) */
    KnownEntityRecognitionSkillLanguage["No"] = "no";
    /** Polish */
    KnownEntityRecognitionSkillLanguage["Pl"] = "pl";
    /** Portuguese (Portugal) */
    KnownEntityRecognitionSkillLanguage["PtPT"] = "pt-PT";
    /** Portuguese (Brazil) */
    KnownEntityRecognitionSkillLanguage["PtBR"] = "pt-BR";
    /** Russian */
    KnownEntityRecognitionSkillLanguage["Ru"] = "ru";
    /** Spanish */
    KnownEntityRecognitionSkillLanguage["Es"] = "es";
    /** Swedish */
    KnownEntityRecognitionSkillLanguage["Sv"] = "sv";
    /** Turkish */
    KnownEntityRecognitionSkillLanguage["Tr"] = "tr";
})(KnownEntityRecognitionSkillLanguage || (KnownEntityRecognitionSkillLanguage = {}));
export function piiDetectionSkillSerializer(item) {
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
            : item["piiCategories"].map((p) => {
                return p;
            }),
        domain: item["domain"],
    };
}
export function piiDetectionSkillDeserializer(item) {
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
            : item["piiCategories"].map((p) => {
                return p;
            }),
        domain: item["domain"],
    };
}
/** A string indicating what maskingMode to use to mask the personal information detected in the input text. */
export var KnownPIIDetectionSkillMaskingMode;
(function (KnownPIIDetectionSkillMaskingMode) {
    /** No masking occurs and the maskedText output will not be returned. */
    KnownPIIDetectionSkillMaskingMode["None"] = "none";
    /** Replaces the detected entities with the character given in the maskingCharacter parameter. The character will be repeated to the length of the detected entity so that the offsets will correctly correspond to both the input text as well as the output maskedText. */
    KnownPIIDetectionSkillMaskingMode["Replace"] = "replace";
})(KnownPIIDetectionSkillMaskingMode || (KnownPIIDetectionSkillMaskingMode = {}));
export function splitSkillSerializer(item) {
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
export function splitSkillDeserializer(item) {
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
/** A value indicating which unit to use. */
export var KnownSplitSkillUnit;
(function (KnownSplitSkillUnit) {
    /** The length will be measured by character. */
    KnownSplitSkillUnit["Characters"] = "characters";
    /** The length will be measured by an AzureOpenAI tokenizer from the tiktoken library. */
    KnownSplitSkillUnit["AzureOpenAITokens"] = "azureOpenAITokens";
})(KnownSplitSkillUnit || (KnownSplitSkillUnit = {}));
export function azureOpenAITokenizerParametersSerializer(item) {
    return {
        encoderModelName: item["encoderModelName"],
        allowedSpecialTokens: !item["allowedSpecialTokens"]
            ? item["allowedSpecialTokens"]
            : item["allowedSpecialTokens"].map((p) => {
                return p;
            }),
    };
}
export function azureOpenAITokenizerParametersDeserializer(item) {
    return {
        encoderModelName: item["encoderModelName"],
        allowedSpecialTokens: !item["allowedSpecialTokens"]
            ? item["allowedSpecialTokens"]
            : item["allowedSpecialTokens"].map((p) => {
                return p;
            }),
    };
}
/** A value indicating which tokenizer to use. */
export var KnownSplitSkillEncoderModelName;
(function (KnownSplitSkillEncoderModelName) {
    /** Refers to a base model trained with a 50,000 token vocabulary, often used in general natural language processing tasks. */
    KnownSplitSkillEncoderModelName["R50KBase"] = "r50k_base";
    /** A base model with a 50,000 token vocabulary, optimized for prompt-based tasks. */
    KnownSplitSkillEncoderModelName["P50KBase"] = "p50k_base";
    /** Similar to p50k_base but fine-tuned for editing or rephrasing tasks with a 50,000 token vocabulary. */
    KnownSplitSkillEncoderModelName["P50KEdit"] = "p50k_edit";
    /** A base model with a 100,000 token vocabulary. */
    KnownSplitSkillEncoderModelName["CL100KBase"] = "cl100k_base";
})(KnownSplitSkillEncoderModelName || (KnownSplitSkillEncoderModelName = {}));
export function customEntityLookupSkillSerializer(item) {
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
export function customEntityLookupSkillDeserializer(item) {
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
export var KnownCustomEntityLookupSkillLanguage;
(function (KnownCustomEntityLookupSkillLanguage) {
    /** Danish */
    KnownCustomEntityLookupSkillLanguage["Da"] = "da";
    /** German */
    KnownCustomEntityLookupSkillLanguage["De"] = "de";
    /** English */
    KnownCustomEntityLookupSkillLanguage["En"] = "en";
    /** Spanish */
    KnownCustomEntityLookupSkillLanguage["Es"] = "es";
    /** Finnish */
    KnownCustomEntityLookupSkillLanguage["Fi"] = "fi";
    /** French */
    KnownCustomEntityLookupSkillLanguage["Fr"] = "fr";
    /** Italian */
    KnownCustomEntityLookupSkillLanguage["It"] = "it";
    /** Korean */
    KnownCustomEntityLookupSkillLanguage["Ko"] = "ko";
    /** Portuguese */
    KnownCustomEntityLookupSkillLanguage["Pt"] = "pt";
})(KnownCustomEntityLookupSkillLanguage || (KnownCustomEntityLookupSkillLanguage = {}));
export function customEntityArraySerializer(result) {
    return result.map((item) => {
        return customEntitySerializer(item);
    });
}
export function customEntityArrayDeserializer(result) {
    return result.map((item) => {
        return customEntityDeserializer(item);
    });
}
export function customEntitySerializer(item) {
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
export function customEntityDeserializer(item) {
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
export function customEntityAliasArraySerializer(result) {
    return result.map((item) => {
        return customEntityAliasSerializer(item);
    });
}
export function customEntityAliasArrayDeserializer(result) {
    return result.map((item) => {
        return customEntityAliasDeserializer(item);
    });
}
export function customEntityAliasSerializer(item) {
    return {
        text: item["text"],
        caseSensitive: item["caseSensitive"],
        accentSensitive: item["accentSensitive"],
        fuzzyEditDistance: item["fuzzyEditDistance"],
    };
}
export function customEntityAliasDeserializer(item) {
    return {
        text: item["text"],
        caseSensitive: item["caseSensitive"],
        accentSensitive: item["accentSensitive"],
        fuzzyEditDistance: item["fuzzyEditDistance"],
    };
}
export function textTranslationSkillSerializer(item) {
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
export function textTranslationSkillDeserializer(item) {
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
export var KnownTextTranslationSkillLanguage;
(function (KnownTextTranslationSkillLanguage) {
    /** Afrikaans */
    KnownTextTranslationSkillLanguage["Af"] = "af";
    /** Arabic */
    KnownTextTranslationSkillLanguage["Ar"] = "ar";
    /** Bangla */
    KnownTextTranslationSkillLanguage["Bn"] = "bn";
    /** Bosnian (Latin) */
    KnownTextTranslationSkillLanguage["Bs"] = "bs";
    /** Bulgarian */
    KnownTextTranslationSkillLanguage["Bg"] = "bg";
    /** Cantonese (Traditional) */
    KnownTextTranslationSkillLanguage["Yue"] = "yue";
    /** Catalan */
    KnownTextTranslationSkillLanguage["Ca"] = "ca";
    /** Chinese Simplified */
    KnownTextTranslationSkillLanguage["ZhHans"] = "zh-Hans";
    /** Chinese Traditional */
    KnownTextTranslationSkillLanguage["ZhHant"] = "zh-Hant";
    /** Croatian */
    KnownTextTranslationSkillLanguage["Hr"] = "hr";
    /** Czech */
    KnownTextTranslationSkillLanguage["Cs"] = "cs";
    /** Danish */
    KnownTextTranslationSkillLanguage["Da"] = "da";
    /** Dutch */
    KnownTextTranslationSkillLanguage["Nl"] = "nl";
    /** English */
    KnownTextTranslationSkillLanguage["En"] = "en";
    /** Estonian */
    KnownTextTranslationSkillLanguage["Et"] = "et";
    /** Fijian */
    KnownTextTranslationSkillLanguage["Fj"] = "fj";
    /** Filipino */
    KnownTextTranslationSkillLanguage["Fil"] = "fil";
    /** Finnish */
    KnownTextTranslationSkillLanguage["Fi"] = "fi";
    /** French */
    KnownTextTranslationSkillLanguage["Fr"] = "fr";
    /** German */
    KnownTextTranslationSkillLanguage["De"] = "de";
    /** Greek */
    KnownTextTranslationSkillLanguage["El"] = "el";
    /** Haitian Creole */
    KnownTextTranslationSkillLanguage["Ht"] = "ht";
    /** Hebrew */
    KnownTextTranslationSkillLanguage["He"] = "he";
    /** Hindi */
    KnownTextTranslationSkillLanguage["Hi"] = "hi";
    /** Hmong Daw */
    KnownTextTranslationSkillLanguage["Mww"] = "mww";
    /** Hungarian */
    KnownTextTranslationSkillLanguage["Hu"] = "hu";
    /** Icelandic */
    KnownTextTranslationSkillLanguage["Is"] = "is";
    /** Indonesian */
    KnownTextTranslationSkillLanguage["Id"] = "id";
    /** Italian */
    KnownTextTranslationSkillLanguage["It"] = "it";
    /** Japanese */
    KnownTextTranslationSkillLanguage["Ja"] = "ja";
    /** Kiswahili */
    KnownTextTranslationSkillLanguage["Sw"] = "sw";
    /** Klingon */
    KnownTextTranslationSkillLanguage["Tlh"] = "tlh";
    /** Klingon (Latin script) */
    KnownTextTranslationSkillLanguage["TlhLatn"] = "tlh-Latn";
    /** Klingon (Klingon script) */
    KnownTextTranslationSkillLanguage["TlhPiqd"] = "tlh-Piqd";
    /** Korean */
    KnownTextTranslationSkillLanguage["Ko"] = "ko";
    /** Latvian */
    KnownTextTranslationSkillLanguage["Lv"] = "lv";
    /** Lithuanian */
    KnownTextTranslationSkillLanguage["Lt"] = "lt";
    /** Malagasy */
    KnownTextTranslationSkillLanguage["Mg"] = "mg";
    /** Malay */
    KnownTextTranslationSkillLanguage["Ms"] = "ms";
    /** Maltese */
    KnownTextTranslationSkillLanguage["Mt"] = "mt";
    /** Norwegian */
    KnownTextTranslationSkillLanguage["Nb"] = "nb";
    /** Persian */
    KnownTextTranslationSkillLanguage["Fa"] = "fa";
    /** Polish */
    KnownTextTranslationSkillLanguage["Pl"] = "pl";
    /** Portuguese */
    KnownTextTranslationSkillLanguage["Pt"] = "pt";
    /** Portuguese (Brazil) */
    KnownTextTranslationSkillLanguage["PtBr"] = "pt-br";
    /** Portuguese (Portugal) */
    KnownTextTranslationSkillLanguage["PtPT"] = "pt-PT";
    /** Queretaro Otomi */
    KnownTextTranslationSkillLanguage["Otq"] = "otq";
    /** Romanian */
    KnownTextTranslationSkillLanguage["Ro"] = "ro";
    /** Russian */
    KnownTextTranslationSkillLanguage["Ru"] = "ru";
    /** Samoan */
    KnownTextTranslationSkillLanguage["Sm"] = "sm";
    /** Serbian (Cyrillic) */
    KnownTextTranslationSkillLanguage["SrCyrl"] = "sr-Cyrl";
    /** Serbian (Latin) */
    KnownTextTranslationSkillLanguage["SrLatn"] = "sr-Latn";
    /** Slovak */
    KnownTextTranslationSkillLanguage["Sk"] = "sk";
    /** Slovenian */
    KnownTextTranslationSkillLanguage["Sl"] = "sl";
    /** Spanish */
    KnownTextTranslationSkillLanguage["Es"] = "es";
    /** Swedish */
    KnownTextTranslationSkillLanguage["Sv"] = "sv";
    /** Tahitian */
    KnownTextTranslationSkillLanguage["Ty"] = "ty";
    /** Tamil */
    KnownTextTranslationSkillLanguage["Ta"] = "ta";
    /** Telugu */
    KnownTextTranslationSkillLanguage["Te"] = "te";
    /** Thai */
    KnownTextTranslationSkillLanguage["Th"] = "th";
    /** Tongan */
    KnownTextTranslationSkillLanguage["To"] = "to";
    /** Turkish */
    KnownTextTranslationSkillLanguage["Tr"] = "tr";
    /** Ukrainian */
    KnownTextTranslationSkillLanguage["Uk"] = "uk";
    /** Urdu */
    KnownTextTranslationSkillLanguage["Ur"] = "ur";
    /** Vietnamese */
    KnownTextTranslationSkillLanguage["Vi"] = "vi";
    /** Welsh */
    KnownTextTranslationSkillLanguage["Cy"] = "cy";
    /** Yucatec Maya */
    KnownTextTranslationSkillLanguage["Yua"] = "yua";
    /** Irish */
    KnownTextTranslationSkillLanguage["Ga"] = "ga";
    /** Kannada */
    KnownTextTranslationSkillLanguage["Kn"] = "kn";
    /** Maori */
    KnownTextTranslationSkillLanguage["Mi"] = "mi";
    /** Malayalam */
    KnownTextTranslationSkillLanguage["Ml"] = "ml";
    /** Punjabi */
    KnownTextTranslationSkillLanguage["Pa"] = "pa";
})(KnownTextTranslationSkillLanguage || (KnownTextTranslationSkillLanguage = {}));
export function documentExtractionSkillSerializer(item) {
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
export function documentExtractionSkillDeserializer(item) {
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
            : Object.fromEntries(Object.entries(item["configuration"]).map(([k1, p1]) => [k1, p1])),
    };
}
export function documentIntelligenceLayoutSkillSerializer(item) {
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
            : item["extractionOptions"].map((p) => {
                return p;
            }),
        chunkingProperties: !item["chunkingProperties"]
            ? item["chunkingProperties"]
            : documentIntelligenceLayoutSkillChunkingPropertiesSerializer(item["chunkingProperties"]),
    };
}
export function documentIntelligenceLayoutSkillDeserializer(item) {
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
            : item["extractionOptions"].map((p1) => {
                return p1;
            }),
        chunkingProperties: !item["chunkingProperties"]
            ? item["chunkingProperties"]
            : documentIntelligenceLayoutSkillChunkingPropertiesDeserializer(item["chunkingProperties"]),
    };
}
/** Controls the cardinality of the output format. Default is 'markdown'. */
export var KnownDocumentIntelligenceLayoutSkillOutputFormat;
(function (KnownDocumentIntelligenceLayoutSkillOutputFormat) {
    /** Specify the format of the output as text. */
    KnownDocumentIntelligenceLayoutSkillOutputFormat["Text"] = "text";
    /** Specify the format of the output as markdown. */
    KnownDocumentIntelligenceLayoutSkillOutputFormat["Markdown"] = "markdown";
})(KnownDocumentIntelligenceLayoutSkillOutputFormat || (KnownDocumentIntelligenceLayoutSkillOutputFormat = {}));
/** Controls the cardinality of the output produced by the skill. Default is 'oneToMany'. */
export var KnownDocumentIntelligenceLayoutSkillOutputMode;
(function (KnownDocumentIntelligenceLayoutSkillOutputMode) {
    /** Specify that the output should be parsed as 'oneToMany'. */
    KnownDocumentIntelligenceLayoutSkillOutputMode["OneToMany"] = "oneToMany";
})(KnownDocumentIntelligenceLayoutSkillOutputMode || (KnownDocumentIntelligenceLayoutSkillOutputMode = {}));
/** The depth of headers in the markdown output. Default is h6. */
export var KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth;
(function (KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth) {
    /** Header level 1. */
    KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth["H1"] = "h1";
    /** Header level 2. */
    KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth["H2"] = "h2";
    /** Header level 3. */
    KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth["H3"] = "h3";
    /** Header level 4. */
    KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth["H4"] = "h4";
    /** Header level 5. */
    KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth["H5"] = "h5";
    /** Header level 6. */
    KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth["H6"] = "h6";
})(KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth || (KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth = {}));
/** Controls the cardinality of the content extracted from the document by the skill. */
export var KnownDocumentIntelligenceLayoutSkillExtractionOptions;
(function (KnownDocumentIntelligenceLayoutSkillExtractionOptions) {
    /** Specify that image content should be extracted from the document. */
    KnownDocumentIntelligenceLayoutSkillExtractionOptions["Images"] = "images";
    /** Specify that location metadata should be extracted from the document. */
    KnownDocumentIntelligenceLayoutSkillExtractionOptions["LocationMetadata"] = "locationMetadata";
})(KnownDocumentIntelligenceLayoutSkillExtractionOptions || (KnownDocumentIntelligenceLayoutSkillExtractionOptions = {}));
export function documentIntelligenceLayoutSkillChunkingPropertiesSerializer(item) {
    return {
        unit: item["unit"],
        maximumLength: item["maximumLength"],
        overlapLength: item["overlapLength"],
    };
}
export function documentIntelligenceLayoutSkillChunkingPropertiesDeserializer(item) {
    return {
        unit: item["unit"],
        maximumLength: item["maximumLength"],
        overlapLength: item["overlapLength"],
    };
}
/** Controls the cardinality of the chunk unit. Default is 'characters' */
export var KnownDocumentIntelligenceLayoutSkillChunkingUnit;
(function (KnownDocumentIntelligenceLayoutSkillChunkingUnit) {
    /** Specifies chunk by characters. */
    KnownDocumentIntelligenceLayoutSkillChunkingUnit["Characters"] = "characters";
})(KnownDocumentIntelligenceLayoutSkillChunkingUnit || (KnownDocumentIntelligenceLayoutSkillChunkingUnit = {}));
export function webApiSkillSerializer(item) {
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
export function webApiSkillDeserializer(item) {
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
export function webApiHttpHeadersSerializer(item) {
    return { ...serializeRecord(item.additionalProperties ?? {}) };
}
export function webApiHttpHeadersDeserializer(item) {
    return {
        additionalProperties: serializeRecord(item, []),
    };
}
export function azureMachineLearningSkillSerializer(item) {
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
export function azureMachineLearningSkillDeserializer(item) {
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
export function azureOpenAIEmbeddingSkillSerializer(item) {
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
export function azureOpenAIEmbeddingSkillDeserializer(item) {
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
export function visionVectorizeSkillSerializer(item) {
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
export function visionVectorizeSkillDeserializer(item) {
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
export function contentUnderstandingSkillSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
        outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
        extractionOptions: !item["extractionOptions"]
            ? item["extractionOptions"]
            : item["extractionOptions"].map((p) => {
                return p;
            }),
        chunkingProperties: !item["chunkingProperties"]
            ? item["chunkingProperties"]
            : contentUnderstandingSkillChunkingPropertiesSerializer(item["chunkingProperties"]),
    };
}
export function contentUnderstandingSkillDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
        outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
        extractionOptions: !item["extractionOptions"]
            ? item["extractionOptions"]
            : item["extractionOptions"].map((p1) => {
                return p1;
            }),
        chunkingProperties: !item["chunkingProperties"]
            ? item["chunkingProperties"]
            : contentUnderstandingSkillChunkingPropertiesDeserializer(item["chunkingProperties"]),
    };
}
/** Controls the cardinality of the content extracted from the document by the skill. */
export var KnownContentUnderstandingSkillExtractionOptions;
(function (KnownContentUnderstandingSkillExtractionOptions) {
    /** Specify that image content should be extracted from the document. */
    KnownContentUnderstandingSkillExtractionOptions["Images"] = "images";
    /** Specify that location metadata should be extracted from the document. */
    KnownContentUnderstandingSkillExtractionOptions["LocationMetadata"] = "locationMetadata";
})(KnownContentUnderstandingSkillExtractionOptions || (KnownContentUnderstandingSkillExtractionOptions = {}));
export function contentUnderstandingSkillChunkingPropertiesSerializer(item) {
    return {
        method: item["method"],
        unit: item["unit"],
        maximumLength: item["maximumLength"],
        overlapLength: item["overlapLength"],
    };
}
export function contentUnderstandingSkillChunkingPropertiesDeserializer(item) {
    return {
        method: item["method"],
        unit: item["unit"],
        maximumLength: item["maximumLength"],
        overlapLength: item["overlapLength"],
    };
}
/** The chunking strategy used by the Content Understanding skill. Default is 'fixedSize'. */
export var KnownContentUnderstandingSkillChunkingMethod;
(function (KnownContentUnderstandingSkillChunkingMethod) {
    /** Fixed-size character-based windowed chunking. */
    KnownContentUnderstandingSkillChunkingMethod["FixedSize"] = "fixedSize";
    /** Layout-aware, paragraph-boundary-respecting chunking. */
    KnownContentUnderstandingSkillChunkingMethod["Semantic"] = "semantic";
})(KnownContentUnderstandingSkillChunkingMethod || (KnownContentUnderstandingSkillChunkingMethod = {}));
/** Controls the cardinality of the chunk unit. Default is 'characters' */
export var KnownContentUnderstandingSkillChunkingUnit;
(function (KnownContentUnderstandingSkillChunkingUnit) {
    /** Specifies chunk by characters. */
    KnownContentUnderstandingSkillChunkingUnit["Characters"] = "characters";
    /** Specifies chunk by tokens. */
    KnownContentUnderstandingSkillChunkingUnit["Tokens"] = "tokens";
})(KnownContentUnderstandingSkillChunkingUnit || (KnownContentUnderstandingSkillChunkingUnit = {}));
export function chatCompletionSkillSerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArraySerializer(item["inputs"]),
        outputs: outputFieldMappingEntryArraySerializer(item["outputs"]),
        uri: item["uri"],
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
export function chatCompletionSkillDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        name: item["name"],
        description: item["description"],
        context: item["context"],
        inputs: inputFieldMappingEntryArrayDeserializer(item["inputs"]),
        outputs: outputFieldMappingEntryArrayDeserializer(item["outputs"]),
        uri: item["uri"],
        authIdentity: !item["authIdentity"]
            ? item["authIdentity"]
            : searchIndexerDataIdentityUnionDeserializer(item["authIdentity"]),
        apiKey: item["apiKey"],
        commonModelParameters: !item["commonModelParameters"]
            ? item["commonModelParameters"]
            : commonModelParametersDeserializer(item["commonModelParameters"]),
        extraParameters: !item["extraParameters"]
            ? item["extraParameters"]
            : Object.fromEntries(Object.entries(item["extraParameters"]).map(([k1, p1]) => [k1, p1])),
        extraParametersBehavior: item["extraParametersBehavior"],
        responseFormat: !item["responseFormat"]
            ? item["responseFormat"]
            : chatCompletionResponseFormatDeserializer(item["responseFormat"]),
    };
}
export function commonModelParametersSerializer(item) {
    return {
        model: item["model"],
        frequencyPenalty: item["frequencyPenalty"],
        presencePenalty: item["presencePenalty"],
        maxTokens: item["maxTokens"],
        temperature: item["temperature"],
        seed: item["seed"],
        stop: !item["stop"]
            ? item["stop"]
            : item["stop"].map((p) => {
                return p;
            }),
    };
}
export function commonModelParametersDeserializer(item) {
    return {
        model: item["model"],
        frequencyPenalty: item["frequencyPenalty"],
        presencePenalty: item["presencePenalty"],
        maxTokens: item["maxTokens"],
        temperature: item["temperature"],
        seed: item["seed"],
        stop: !item["stop"]
            ? item["stop"]
            : item["stop"].map((p1) => {
                return p1;
            }),
    };
}
/** Specifies how 'extraParameters' should be handled by Azure AI Foundry. Defaults to 'error'. */
export var KnownChatCompletionExtraParametersBehavior;
(function (KnownChatCompletionExtraParametersBehavior) {
    /** Passes any extra parameters directly to the model. */
    KnownChatCompletionExtraParametersBehavior["PassThrough"] = "passThrough";
    /** Drops all extra parameters. */
    KnownChatCompletionExtraParametersBehavior["Drop"] = "drop";
    /** Raises an error if any extra parameter is present. */
    KnownChatCompletionExtraParametersBehavior["Error"] = "error";
})(KnownChatCompletionExtraParametersBehavior || (KnownChatCompletionExtraParametersBehavior = {}));
export function chatCompletionResponseFormatSerializer(item) {
    return {
        type: item["type"],
        jsonSchemaProperties: !item["chatCompletionSchemaProperties"]
            ? item["chatCompletionSchemaProperties"]
            : chatCompletionSchemaPropertiesSerializer(item["chatCompletionSchemaProperties"]),
    };
}
export function chatCompletionResponseFormatDeserializer(item) {
    return {
        type: item["type"],
        chatCompletionSchemaProperties: !item["jsonSchemaProperties"]
            ? item["jsonSchemaProperties"]
            : chatCompletionSchemaPropertiesDeserializer(item["jsonSchemaProperties"]),
    };
}
/** Specifies how the LLM should format the response. */
export var KnownChatCompletionResponseFormatType;
(function (KnownChatCompletionResponseFormatType) {
    /** Plain text response format. */
    KnownChatCompletionResponseFormatType["Text"] = "text";
    /** Arbitrary JSON object response format. */
    KnownChatCompletionResponseFormatType["JsonObject"] = "jsonObject";
    /** JSON schema-adhering response format. */
    KnownChatCompletionResponseFormatType["JsonSchema"] = "jsonSchema";
})(KnownChatCompletionResponseFormatType || (KnownChatCompletionResponseFormatType = {}));
export function chatCompletionSchemaPropertiesSerializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        strict: item["strict"],
        schema: !item["schema"] ? item["schema"] : chatCompletionSchemaSerializer(item["schema"]),
    };
}
export function chatCompletionSchemaPropertiesDeserializer(item) {
    return {
        name: item["name"],
        description: item["description"],
        strict: item["strict"],
        schema: !item["schema"] ? item["schema"] : chatCompletionSchemaDeserializer(item["schema"]),
    };
}
export function chatCompletionSchemaSerializer(item) {
    return {
        type: item["type"],
        properties: item["properties"],
        required: !item["required"]
            ? item["required"]
            : item["required"].map((p) => {
                return p;
            }),
        additionalProperties: item["additionalProperties"],
    };
}
export function chatCompletionSchemaDeserializer(item) {
    return {
        type: item["type"],
        properties: item["properties"],
        required: !item["required"]
            ? item["required"]
            : item["required"].map((p) => {
                return p;
            }),
        additionalProperties: item["additionalProperties"],
    };
}
export function cognitiveServicesAccountSerializer(item) {
    return { "@odata.type": item["odatatype"], description: item["description"] };
}
export function cognitiveServicesAccountDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        description: item["description"],
    };
}
export function cognitiveServicesAccountUnionSerializer(item) {
    switch (item.odatatype) {
        case "#Microsoft.Azure.Search.DefaultCognitiveServices":
            return defaultCognitiveServicesAccountSerializer(item);
        case "#Microsoft.Azure.Search.CognitiveServicesByKey":
            return cognitiveServicesAccountKeySerializer(item);
        case "#Microsoft.Azure.Search.AIServicesByKey":
            return aiServicesAccountKeySerializer(item);
        case "#Microsoft.Azure.Search.AIServicesByIdentity":
            return aiServicesAccountIdentitySerializer(item);
        default:
            return cognitiveServicesAccountSerializer(item);
    }
}
export function cognitiveServicesAccountUnionDeserializer(item) {
    switch (item["@odata.type"]) {
        case "#Microsoft.Azure.Search.DefaultCognitiveServices":
            return defaultCognitiveServicesAccountDeserializer(item);
        case "#Microsoft.Azure.Search.CognitiveServicesByKey":
            return cognitiveServicesAccountKeyDeserializer(item);
        case "#Microsoft.Azure.Search.AIServicesByKey":
            return aiServicesAccountKeyDeserializer(item);
        case "#Microsoft.Azure.Search.AIServicesByIdentity":
            return aiServicesAccountIdentityDeserializer(item);
        default:
            return cognitiveServicesAccountDeserializer(item);
    }
}
export function defaultCognitiveServicesAccountSerializer(item) {
    return { "@odata.type": item["odatatype"], description: item["description"] };
}
export function defaultCognitiveServicesAccountDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        description: item["description"],
    };
}
export function cognitiveServicesAccountKeySerializer(item) {
    return { "@odata.type": item["odatatype"], description: item["description"], key: item["key"] };
}
export function cognitiveServicesAccountKeyDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        description: item["description"],
        key: item["key"],
    };
}
export function aiServicesAccountKeySerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        description: item["description"],
        key: item["key"],
        subdomainUrl: item["subdomainUrl"],
    };
}
export function aiServicesAccountKeyDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        description: item["description"],
        key: item["key"],
        subdomainUrl: item["subdomainUrl"],
    };
}
export function aiServicesAccountIdentitySerializer(item) {
    return {
        "@odata.type": item["odatatype"],
        description: item["description"],
        identity: !item["identity"]
            ? item["identity"]
            : searchIndexerDataIdentityUnionSerializer(item["identity"]),
        subdomainUrl: item["subdomainUrl"],
    };
}
export function aiServicesAccountIdentityDeserializer(item) {
    return {
        odatatype: item["@odata.type"],
        description: item["description"],
        identity: !item["identity"]
            ? item["identity"]
            : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
        subdomainUrl: item["subdomainUrl"],
    };
}
export function searchIndexerKnowledgeStoreSerializer(item) {
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
export function searchIndexerKnowledgeStoreDeserializer(item) {
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
export function searchIndexerKnowledgeStoreProjectionArraySerializer(result) {
    return result.map((item) => {
        return searchIndexerKnowledgeStoreProjectionSerializer(item);
    });
}
export function searchIndexerKnowledgeStoreProjectionArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerKnowledgeStoreProjectionDeserializer(item);
    });
}
export function searchIndexerKnowledgeStoreProjectionSerializer(item) {
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
export function searchIndexerKnowledgeStoreProjectionDeserializer(item) {
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
export function searchIndexerKnowledgeStoreTableProjectionSelectorArraySerializer(result) {
    return result.map((item) => {
        return searchIndexerKnowledgeStoreTableProjectionSelectorSerializer(item);
    });
}
export function searchIndexerKnowledgeStoreTableProjectionSelectorArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerKnowledgeStoreTableProjectionSelectorDeserializer(item);
    });
}
export function searchIndexerKnowledgeStoreTableProjectionSelectorSerializer(item) {
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
export function searchIndexerKnowledgeStoreTableProjectionSelectorDeserializer(item) {
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
export function searchIndexerKnowledgeStoreObjectProjectionSelectorArraySerializer(result) {
    return result.map((item) => {
        return searchIndexerKnowledgeStoreObjectProjectionSelectorSerializer(item);
    });
}
export function searchIndexerKnowledgeStoreObjectProjectionSelectorArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerKnowledgeStoreObjectProjectionSelectorDeserializer(item);
    });
}
export function searchIndexerKnowledgeStoreObjectProjectionSelectorSerializer(item) {
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
export function searchIndexerKnowledgeStoreObjectProjectionSelectorDeserializer(item) {
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
export function searchIndexerKnowledgeStoreFileProjectionSelectorArraySerializer(result) {
    return result.map((item) => {
        return searchIndexerKnowledgeStoreFileProjectionSelectorSerializer(item);
    });
}
export function searchIndexerKnowledgeStoreFileProjectionSelectorArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerKnowledgeStoreFileProjectionSelectorDeserializer(item);
    });
}
export function searchIndexerKnowledgeStoreFileProjectionSelectorSerializer(item) {
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
export function searchIndexerKnowledgeStoreFileProjectionSelectorDeserializer(item) {
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
export function searchIndexerKnowledgeStoreParametersSerializer(item) {
    return {
        ...serializeRecord(item.additionalProperties ?? {}),
        synthesizeGeneratedKeyName: item["synthesizeGeneratedKeyName"],
    };
}
export function searchIndexerKnowledgeStoreParametersDeserializer(item) {
    return {
        additionalProperties: serializeRecord(item, ["synthesizeGeneratedKeyName"]),
        synthesizeGeneratedKeyName: item["synthesizeGeneratedKeyName"],
    };
}
export function searchIndexerIndexProjectionSerializer(item) {
    return {
        selectors: searchIndexerIndexProjectionSelectorArraySerializer(item["selectors"]),
        parameters: !item["parameters"]
            ? item["parameters"]
            : searchIndexerIndexProjectionsParametersSerializer(item["parameters"]),
    };
}
export function searchIndexerIndexProjectionDeserializer(item) {
    return {
        selectors: searchIndexerIndexProjectionSelectorArrayDeserializer(item["selectors"]),
        parameters: !item["parameters"]
            ? item["parameters"]
            : searchIndexerIndexProjectionsParametersDeserializer(item["parameters"]),
    };
}
export function searchIndexerIndexProjectionSelectorArraySerializer(result) {
    return result.map((item) => {
        return searchIndexerIndexProjectionSelectorSerializer(item);
    });
}
export function searchIndexerIndexProjectionSelectorArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerIndexProjectionSelectorDeserializer(item);
    });
}
export function searchIndexerIndexProjectionSelectorSerializer(item) {
    return {
        targetIndexName: item["targetIndexName"],
        parentKeyFieldName: item["parentKeyFieldName"],
        sourceContext: item["sourceContext"],
        mappings: inputFieldMappingEntryArraySerializer(item["mappings"]),
    };
}
export function searchIndexerIndexProjectionSelectorDeserializer(item) {
    return {
        targetIndexName: item["targetIndexName"],
        parentKeyFieldName: item["parentKeyFieldName"],
        sourceContext: item["sourceContext"],
        mappings: inputFieldMappingEntryArrayDeserializer(item["mappings"]),
    };
}
export function searchIndexerIndexProjectionsParametersSerializer(item) {
    return {
        ...serializeRecord(item.additionalProperties ?? {}),
        projectionMode: item["projectionMode"],
    };
}
export function searchIndexerIndexProjectionsParametersDeserializer(item) {
    return {
        additionalProperties: serializeRecord(item, ["projectionMode"]),
        projectionMode: item["projectionMode"],
    };
}
/** Defines behavior of the index projections in relation to the rest of the indexer. */
export var KnownIndexProjectionMode;
(function (KnownIndexProjectionMode) {
    /** The source document will be skipped from writing into the indexer's target index. */
    KnownIndexProjectionMode["SkipIndexingParentDocuments"] = "skipIndexingParentDocuments";
    /** The source document will be written into the indexer's target index. This is the default pattern. */
    KnownIndexProjectionMode["IncludeIndexingParentDocuments"] = "includeIndexingParentDocuments";
})(KnownIndexProjectionMode || (KnownIndexProjectionMode = {}));
export function searchIndexerKnowledgeStoreProjectionSelectorSerializer(item) {
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
export function searchIndexerKnowledgeStoreProjectionSelectorDeserializer(item) {
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
export function searchIndexerKnowledgeStoreBlobProjectionSelectorSerializer(item) {
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
export function searchIndexerKnowledgeStoreBlobProjectionSelectorDeserializer(item) {
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
export function listSkillsetsResultDeserializer(item) {
    return {
        skillsets: searchIndexerSkillsetArrayDeserializer(item["value"]),
    };
}
export function searchIndexerSkillsetArraySerializer(result) {
    return result.map((item) => {
        return searchIndexerSkillsetSerializer(item);
    });
}
export function searchIndexerSkillsetArrayDeserializer(result) {
    return result.map((item) => {
        return searchIndexerSkillsetDeserializer(item);
    });
}
export function skillNamesSerializer(item) {
    return {
        skillNames: !item["skillNames"]
            ? item["skillNames"]
            : item["skillNames"].map((p) => {
                return p;
            }),
    };
}
export function _searchResourceEncryptionKeyAccessCredentialsSerializer(item) {
    return { applicationId: item["applicationId"], applicationSecret: item["applicationSecret"] };
}
export function _searchResourceEncryptionKeyAccessCredentialsDeserializer(item) {
    return {
        applicationId: item["applicationId"],
        applicationSecret: item["applicationSecret"],
    };
}
export function _searchIndexerDataSourceConnectionCredentialsSerializer(item) {
    return { connectionString: item["connectionString"] };
}
export function _searchIndexerDataSourceConnectionCredentialsDeserializer(item) {
    return {
        connectionString: item["connectionString"],
    };
}
//# sourceMappingURL=models.js.map