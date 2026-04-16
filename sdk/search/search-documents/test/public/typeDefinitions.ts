// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KnownSemanticErrorMode,
  KnownSemanticErrorReason,
  KnownSemanticSearchResultsType,
  KnownVectorFilterMode,
  KnownVectorQueryKind,
} from "../../src/index.js";
import type {
  KnownBlobIndexerDataToExtract,
  KnownBlobIndexerImageAction,
  KnownBlobIndexerParsingMode,
  KnownBlobIndexerPDFTextRotationAlgorithm,
  KnownCustomEntityLookupSkillLanguage,
  KnownImageAnalysisSkillLanguage,
  KnownImageDetail,
  KnownIndexerExecutionEnvironment,
  KnownKeyPhraseExtractionSkillLanguage,
  KnownOcrSkillLanguage,
  KnownPIIDetectionSkillMaskingMode,
  KnownRegexFlags,
  KnownSearchFieldDataType,
  KnownSearchIndexerDataSourceType,
  KnownSplitSkillLanguage,
  KnownTextSplitMode,
  KnownTextTranslationSkillLanguage,
  KnownVectorSearchAlgorithmKind,
  KnownVectorSearchAlgorithmMetric,
  KnownVisualFeature,
} from "../../src/index.js";

import type { IsEqual } from "type-plus";

type ExpectBlobIndexerDataToExtract = `${KnownBlobIndexerDataToExtract}`;
type ExpectBlobIndexerImageAction = `${KnownBlobIndexerImageAction}`;
type ExpectBlobIndexerParsingMode = `${KnownBlobIndexerParsingMode}`;
type ExpectBlobIndexerPDFTextRotationAlgorithm = `${KnownBlobIndexerPDFTextRotationAlgorithm}`;
type ExpectCustomEntityLookupSkillLanguage = `${KnownCustomEntityLookupSkillLanguage}`;
type ExpectImageAnalysisSkillLanguage = `${KnownImageAnalysisSkillLanguage}`;
type ExpectImageDetail = `${KnownImageDetail}`;
type ExpectIndexerExecutionEnvironment = `${KnownIndexerExecutionEnvironment}`;
type ExpectKeyPhraseExtractionSkillLanguage = `${KnownKeyPhraseExtractionSkillLanguage}`;
type ExpectOcrSkillLanguage = `${KnownOcrSkillLanguage}`;
type ExpectPIIDetectionSkillMaskingMode = `${KnownPIIDetectionSkillMaskingMode}`;
type ExpectRegexFlags = `${KnownRegexFlags}`;
type ExpectSearchFieldDataType = Exclude<
  `${KnownSearchFieldDataType}` | `Collection(${KnownSearchFieldDataType})`,
  "Edm.ComplexType" | "Edm.Byte" | "Edm.Half" | "Edm.Int16" | "Edm.SByte" | "Edm.Single"
>;
type ExpectSearchIndexerDataSourceType = `${KnownSearchIndexerDataSourceType}`;
type ExpectSemanticErrorMode = `${KnownSemanticErrorMode}`;
type ExpectSemanticErrorReason = `${KnownSemanticErrorReason}`;
type ExpectSemanticSearchResultsType = `${KnownSemanticSearchResultsType}`;
type ExpectSplitSkillLanguage = `${KnownSplitSkillLanguage}`;
type ExpectTextSplitMode = `${KnownTextSplitMode}`;
type ExpectTextTranslationSkillLanguage = `${KnownTextTranslationSkillLanguage}`;
type ExpectVectorFilterMode = `${KnownVectorFilterMode}`;
type ExpectVectorQueryKind = `${KnownVectorQueryKind}`;
type ExpectVectorSearchAlgorithmKind = `${KnownVectorSearchAlgorithmKind}`;
type ExpectVectorSearchAlgorithmMetric = `${KnownVectorSearchAlgorithmMetric}`;
type ExpectVisualFeature = `${KnownVisualFeature}`;

type BlobIndexerDataToExtract = "allMetadata" | "contentAndMetadata" | "storageMetadata";
type BlobIndexerImageAction =
  | "generateNormalizedImagePerPage"
  | "generateNormalizedImages"
  | "none";
type BlobIndexerParsingMode =
  | "default"
  | "delimitedText"
  | "json"
  | "jsonArray"
  | "jsonLines"
  | "markdown"
  | "text";
type BlobIndexerPDFTextRotationAlgorithm = "detectAngles" | "none";
type CustomEntityLookupSkillLanguage = "da" | "de" | "en" | "es" | "fi" | "fr" | "it" | "ko" | "pt";
type ImageAnalysisSkillLanguage =
  | "ar"
  | "az"
  | "bg"
  | "bs"
  | "ca"
  | "cs"
  | "cy"
  | "da"
  | "de"
  | "el"
  | "en"
  | "es"
  | "et"
  | "eu"
  | "fi"
  | "fr"
  | "ga"
  | "gl"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "it"
  | "ja"
  | "kk"
  | "ko"
  | "lt"
  | "lv"
  | "mk"
  | "ms"
  | "nb"
  | "nl"
  | "pl"
  | "prs"
  | "pt-BR"
  | "pt-PT"
  | "pt"
  | "ro"
  | "ru"
  | "sk"
  | "sl"
  | "sr-Cyrl"
  | "sr-Latn"
  | "sv"
  | "th"
  | "tr"
  | "uk"
  | "vi"
  | "zh-Hans"
  | "zh-Hant"
  | "zh";
type ImageDetail = "celebrities" | "landmarks";
type IndexerExecutionEnvironment = "private" | "standard";
type KeyPhraseExtractionSkillLanguage =
  | "da"
  | "de"
  | "en"
  | "es"
  | "fi"
  | "fr"
  | "it"
  | "ja"
  | "ko"
  | "nl"
  | "no"
  | "pl"
  | "pt-BR"
  | "pt-PT"
  | "ru"
  | "sv";
type OcrSkillLanguage =
  | "af"
  | "anp"
  | "ar"
  | "ast"
  | "awa"
  | "az"
  | "be-cyrl"
  | "be-latn"
  | "be"
  | "bfy"
  | "bfz"
  | "bg"
  | "bgc"
  | "bho"
  | "bi"
  | "bns"
  | "br"
  | "bra"
  | "brx"
  | "bs"
  | "bua"
  | "ca"
  | "ceb"
  | "ch"
  | "cnr-cyrl"
  | "cnr-latn"
  | "co"
  | "crh"
  | "cs"
  | "csb"
  | "cy"
  | "da"
  | "de"
  | "dhi"
  | "doi"
  | "dsb"
  | "el"
  | "en"
  | "es"
  | "et"
  | "eu"
  | "fa"
  | "fi"
  | "fil"
  | "fj"
  | "fo"
  | "fr"
  | "fur"
  | "fy"
  | "ga"
  | "gag"
  | "gd"
  | "gil"
  | "gl"
  | "gon"
  | "gv"
  | "gvr"
  | "haw"
  | "hi"
  | "hlb"
  | "hne"
  | "hni"
  | "hoc"
  | "hr"
  | "hsb"
  | "ht"
  | "hu"
  | "ia"
  | "id"
  | "is"
  | "it"
  | "iu"
  | "ja"
  | "Jns"
  | "jv"
  | "kaa-cyrl"
  | "kaa"
  | "kac"
  | "kea"
  | "kfq"
  | "kha"
  | "kk-cyrl"
  | "kk-latn"
  | "kl"
  | "klr"
  | "kmj"
  | "ko"
  | "kos"
  | "kpy"
  | "krc"
  | "kru"
  | "ksh"
  | "ku-arab"
  | "ku-latn"
  | "kum"
  | "kw"
  | "ky"
  | "la"
  | "lb"
  | "lkt"
  | "lt"
  | "mi"
  | "mn"
  | "mr"
  | "ms"
  | "mt"
  | "mww"
  | "myv"
  | "nap"
  | "nb"
  | "ne"
  | "niu"
  | "nl"
  | "no"
  | "nog"
  | "oc"
  | "os"
  | "pa"
  | "pl"
  | "prs"
  | "ps"
  | "pt"
  | "quc"
  | "rab"
  | "rm"
  | "ro"
  | "ru"
  | "sa"
  | "sat"
  | "sck"
  | "sco"
  | "sk"
  | "sl"
  | "sm"
  | "sma"
  | "sme"
  | "smj"
  | "smn"
  | "sms"
  | "so"
  | "sq"
  | "sr-Cyrl"
  | "sr-Latn"
  | "sr"
  | "srx"
  | "sv"
  | "sw"
  | "tet"
  | "tg"
  | "thf"
  | "tk"
  | "to"
  | "tr"
  | "tt"
  | "tyv"
  | "ug"
  | "unk"
  | "ur"
  | "uz-arab"
  | "uz-cyrl"
  | "uz"
  | "vo"
  | "wae"
  | "xnr"
  | "xsr"
  | "yua"
  | "za"
  | "zh-Hans"
  | "zh-Hant"
  | "zu";
type PIIDetectionSkillMaskingMode = "none" | "replace";
type RegexFlags =
  | "CANON_EQ"
  | "CASE_INSENSITIVE"
  | "COMMENTS"
  | "DOTALL"
  | "LITERAL"
  | "MULTILINE"
  | "UNICODE_CASE"
  | "UNIX_LINES";
type SearchFieldDataType =
  | "Collection(Edm.Boolean)"
  | "Collection(Edm.Byte)"
  | "Collection(Edm.ComplexType)"
  | "Collection(Edm.DateTimeOffset)"
  | "Collection(Edm.Double)"
  | "Collection(Edm.GeographyPoint)"
  | "Collection(Edm.Half)"
  | "Collection(Edm.Int16)"
  | "Collection(Edm.Int32)"
  | "Collection(Edm.Int64)"
  | "Collection(Edm.SByte)"
  | "Collection(Edm.Single)"
  | "Collection(Edm.String)"
  | "Edm.Boolean"
  | "Edm.DateTimeOffset"
  | "Edm.Double"
  | "Edm.GeographyPoint"
  | "Edm.Int32"
  | "Edm.Int64"
  | "Edm.String";
type SearchIndexerDataSourceType =
  | "adlsgen2"
  | "azureblob"
  | "azuresql"
  | "azuretable"
  | "cosmosdb"
  | "mysql"
  | "onelake"
  | "sharepoint";
type SemanticErrorMode = "fail" | "partial";
type SemanticErrorReason = "capacityOverloaded" | "maxWaitExceeded" | "transient";
type SemanticSearchResultsType = "baseResults" | "rerankedResults";
type SplitSkillLanguage =
  | "am"
  | "bs"
  | "cs"
  | "da"
  | "de"
  | "en"
  | "es"
  | "et"
  | "fi"
  | "fr"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "is"
  | "it"
  | "ja"
  | "ko"
  | "lv"
  | "nb"
  | "nl"
  | "pl"
  | "pt-br"
  | "pt"
  | "ru"
  | "sk"
  | "sl"
  | "sr"
  | "sv"
  | "tr"
  | "ur"
  | "zh";
type TextSplitMode = "pages" | "sentences";
type TextTranslationSkillLanguage =
  | "af"
  | "ar"
  | "bg"
  | "bn"
  | "bs"
  | "ca"
  | "cs"
  | "cy"
  | "da"
  | "de"
  | "el"
  | "en"
  | "es"
  | "et"
  | "fa"
  | "fi"
  | "fil"
  | "fj"
  | "fr"
  | "ga"
  | "he"
  | "hi"
  | "hr"
  | "ht"
  | "hu"
  | "id"
  | "is"
  | "it"
  | "ja"
  | "kn"
  | "ko"
  | "lt"
  | "lv"
  | "mg"
  | "mi"
  | "ml"
  | "ms"
  | "mt"
  | "mww"
  | "nb"
  | "nl"
  | "otq"
  | "pa"
  | "pl"
  | "pt-br"
  | "pt-PT"
  | "pt"
  | "ro"
  | "ru"
  | "sk"
  | "sl"
  | "sm"
  | "sr-Cyrl"
  | "sr-Latn"
  | "sv"
  | "sw"
  | "ta"
  | "te"
  | "th"
  | "tlh-Latn"
  | "tlh-Piqd"
  | "tlh"
  | "to"
  | "tr"
  | "ty"
  | "uk"
  | "ur"
  | "vi"
  | "yua"
  | "yue"
  | "zh-Hans"
  | "zh-Hant";
type VectorFilterMode = "postFilter" | "preFilter" | "strictPostFilter";
type VectorQueryKind = "imageBinary" | "imageUrl" | "text" | "vector";
type VectorSearchAlgorithmKind = "exhaustiveKnn" | "hnsw";
type VectorSearchAlgorithmMetric = "cosine" | "dotProduct" | "euclidean" | "hamming";
type VisualFeature =
  | "adult"
  | "brands"
  | "categories"
  | "description"
  | "faces"
  | "objects"
  | "tags";

const foo: [
  IsEqual<
    ExpectBlobIndexerDataToExtract,
    BlobIndexerDataToExtract,
    "BlobIndexerDataToExtract",
    never
  >,
  IsEqual<ExpectBlobIndexerImageAction, BlobIndexerImageAction, "BlobIndexerImageAction", never>,
  IsEqual<ExpectBlobIndexerParsingMode, BlobIndexerParsingMode, "BlobIndexerParsingMode", never>,
  IsEqual<
    ExpectBlobIndexerPDFTextRotationAlgorithm,
    BlobIndexerPDFTextRotationAlgorithm,
    "BlobIndexerPDFTextRotationAlgorithm",
    never
  >,
  IsEqual<
    ExpectCustomEntityLookupSkillLanguage,
    CustomEntityLookupSkillLanguage,
    "CustomEntityLookupSkillLanguage",
    never
  >,
  IsEqual<
    ExpectImageAnalysisSkillLanguage,
    ImageAnalysisSkillLanguage,
    "ImageAnalysisSkillLanguage",
    never
  >,
  IsEqual<ExpectImageDetail, ImageDetail, "ImageDetail", never>,
  IsEqual<
    ExpectIndexerExecutionEnvironment,
    IndexerExecutionEnvironment,
    "IndexerExecutionEnvironment",
    never
  >,
  IsEqual<
    ExpectKeyPhraseExtractionSkillLanguage,
    KeyPhraseExtractionSkillLanguage,
    "KeyPhraseExtractionSkillLanguage",
    never
  >,
  IsEqual<ExpectOcrSkillLanguage, OcrSkillLanguage, "OcrSkillLanguage", never>,
  IsEqual<
    ExpectPIIDetectionSkillMaskingMode,
    PIIDetectionSkillMaskingMode,
    "PIIDetectionSkillMaskingMode",
    never
  >,
  IsEqual<ExpectRegexFlags, RegexFlags, "RegexFlags", never>,
  IsEqual<ExpectSearchFieldDataType, SearchFieldDataType, "SearchFieldDataType", never>,
  IsEqual<
    ExpectSearchIndexerDataSourceType,
    SearchIndexerDataSourceType,
    "SearchIndexerDataSourceType",
    never
  >,
  IsEqual<ExpectSemanticErrorMode, SemanticErrorMode, "SemanticErrorMode", never>,
  IsEqual<ExpectSemanticErrorReason, SemanticErrorReason, "SemanticErrorReason", never>,
  IsEqual<
    ExpectSemanticSearchResultsType,
    SemanticSearchResultsType,
    "SemanticSearchResultsType",
    never
  >,
  IsEqual<ExpectSplitSkillLanguage, SplitSkillLanguage, "SplitSkillLanguage", never>,
  IsEqual<ExpectTextSplitMode, TextSplitMode, "TextSplitMode", never>,
  IsEqual<
    ExpectTextTranslationSkillLanguage,
    TextTranslationSkillLanguage,
    "TextTranslationSkillLanguage",
    never
  >,
  IsEqual<ExpectVectorFilterMode, VectorFilterMode, "VectorFilterMode", never>,
  IsEqual<ExpectVectorQueryKind, VectorQueryKind, "VectorQueryKind", never>,
  IsEqual<
    ExpectVectorSearchAlgorithmKind,
    VectorSearchAlgorithmKind,
    "VectorSearchAlgorithmKind",
    never
  >,
  IsEqual<
    ExpectVectorSearchAlgorithmMetric,
    VectorSearchAlgorithmMetric,
    "VectorSearchAlgorithmMetric",
    never
  >,
  IsEqual<ExpectVisualFeature, VisualFeature, "VisualFeature", never>,
] = [
  // List of custom string literal unions. Update with any new authored string literal unions.
  "BlobIndexerDataToExtract",
  "BlobIndexerImageAction",
  "BlobIndexerParsingMode",
  "BlobIndexerPDFTextRotationAlgorithm",
  "CustomEntityLookupSkillLanguage",
  "ImageAnalysisSkillLanguage",
  "ImageDetail",
  "IndexerExecutionEnvironment",
  "KeyPhraseExtractionSkillLanguage",
  "OcrSkillLanguage",
  "PIIDetectionSkillMaskingMode",
  "RegexFlags",
  "SearchFieldDataType",
  "SearchIndexerDataSourceType",
  "SemanticErrorMode",
  "SemanticErrorReason",
  "SemanticSearchResultsType",
  "SplitSkillLanguage",
  "TextSplitMode",
  "TextTranslationSkillLanguage",
  "VectorFilterMode",
  "VectorQueryKind",
  "VectorSearchAlgorithmKind",
  "VectorSearchAlgorithmMetric",
  "VisualFeature",
];

((_) => {})(foo);
