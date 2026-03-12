// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SearchResult as GeneratedSearchResult,
  SuggestDocumentsResult as GeneratedSuggestDocumentsResult,
  IndexAction,
  IndexActionType,
  FacetResult as GeneratedFacetResult,
  QueryAnswerResult as GeneratedQueryAnswerResult,
  QueryCaptionResult as GeneratedQueryCaptionResult,
} from "./models/azure/search/documents/index.js";
import type {
  SearchIndexerKnowledgeStore as BaseSearchIndexerKnowledgeStore,
  BM25Similarity,
  ClassicSimilarity,
  CognitiveServicesAccountUnion,
  DataChangeDetectionPolicyUnion,
  DataDeletionDetectionPolicyUnion,
  AIServicesAccountIdentity as GeneratedAIServicesAccountIdentity,
  AIServicesAccountKey as GeneratedAIServicesAccountKey,
  AIServicesVisionVectorizer as GeneratedAIServicesVisionVectorizer,
  AzureMachineLearningParameters as GeneratedAMLParameters,
  AzureMachineLearningVectorizer as GeneratedAMLVectorizer,
  AzureBlobKnowledgeSource as GeneratedAzureBlobKnowledgeSource,
  AzureBlobKnowledgeSourceParameters as GeneratedAzureBlobKnowledgeSourceParameters,
  AzureOpenAIVectorizerParameters as GeneratedAzureOpenAIParameters,
  AzureOpenAIVectorizer as GeneratedAzureOpenAIVectorizer,
  CognitiveServicesAccountKey as GeneratedCognitiveServicesAccountKey,
  DefaultCognitiveServicesAccount as GeneratedDefaultCognitiveServicesAccount,
  ExhaustiveKnnAlgorithmConfiguration as GeneratedExhaustiveKnnAlgorithmConfiguration,
  HnswAlgorithmConfiguration as GeneratedHnswAlgorithmConfiguration,
  IndexedOneLakeKnowledgeSource as GeneratedIndexedOneLakeKnowledgeSource,
  IndexedSharePointKnowledgeSource as GeneratedIndexedSharePointKnowledgeSource,
  KnowledgeBase as GeneratedKnowledgeBase,
  KnowledgeBaseAzureOpenAIModel as GeneratedKnowledgeBaseAzureOpenAIModel,
  KnowledgeBaseModelUnion as GeneratedKnowledgeBaseModel,
  KnowledgeSourceUnion as GeneratedKnowledgeSource,
  // KnowledgeSourceVectorizer as GeneratedKnowledgeSourceVectorizer,
  // PatternAnalyzer as GeneratedPatternAnalyzer,
  RemoteSharePointKnowledgeSource as GeneratedRemoteSharePointKnowledgeSource,
  SearchField as GeneratedSearchField,
  SearchIndex as GeneratedSearchIndex,
  SearchIndexer as GeneratedSearchIndexer,
  SearchIndexerCache as GeneratedSearchIndexerCache,
  SearchIndexerDataSourceConnection as GeneratedSearchIndexerDataSourceConnection,
  SearchIndexerSkillset as GeneratedSearchIndexerSkillset,
  SearchIndexKnowledgeSource as GeneratedSearchIndexKnowledgeSource,
  SearchResourceEncryptionKey as GeneratedSearchResourceEncryptionKey,
  SynonymMap as GeneratedSynonymMap,
  VectorSearch as GeneratedVectorSearch,
  VectorSearchAlgorithmConfigurationUnion as GeneratedVectorSearchAlgorithmConfiguration,
  VectorSearchVectorizerUnion as GeneratedVectorSearchVectorizer,
  WebApiVectorizer as GeneratedWebApiVectorizer,
  WebKnowledgeSource as GeneratedWebKnowledgeSource,
  HighWaterMarkChangeDetectionPolicy,
  LexicalAnalyzerUnion,
  LexicalTokenizerUnion,
  LuceneStandardAnalyzer,
  SearchIndexerDataIdentityUnion,
  SearchIndexerDataNoneIdentity,
  SearchIndexerDataUserAssignedIdentity,
  SearchIndexerSkillUnion,
  SimilarityAlgorithmUnion as SimilarityUnion,
  SoftDeleteColumnDeletionDetectionPolicy,
  SqlIntegratedChangeTrackingPolicy,
  StopAnalyzer,
  TokenFilterUnion,
} from "./models/azure/search/documents/indexes/index.js";
import type {
  SearchResult,
  SelectFields,
  SuggestDocumentsResult,
  SuggestResult,
} from "./indexModels.js";
import type { KnowledgeBase } from "./knowledgeBaseModels.js";
import { logger } from "./logger.js";
import type {
  AIServicesVisionVectorizer,
  AzureBlobKnowledgeSourceParameters,
  AzureMachineLearningVectorizer,
  AzureMachineLearningVectorizerParameters,
  AzureOpenAIParameters,
  AzureOpenAIVectorizer,
  BlobIndexerDataToExtract,
  BlobIndexerImageAction,
  BlobIndexerParsingMode,
  BlobIndexerPDFTextRotationAlgorithm,
  CharFilter,
  CognitiveServicesAccount,
  ComplexField,
  DataChangeDetectionPolicy,
  DataDeletionDetectionPolicy,
  FacetResult,
  IndexerExecutionEnvironment,
  IndexingParameters,
  IndexingParametersConfiguration,
  KeyAuthAzureMachineLearningVectorizerParameters,
  KnowledgeBaseModel,
  KnowledgeSource,
  KnowledgeSourceIngestionParameters,
  KnowledgeSourceVectorizer,
  LexicalAnalyzer,
  LexicalTokenizer,
  NoAuthAzureMachineLearningVectorizerParameters,
  PatternAnalyzer,
  QueryAnswerResult,
  QueryCaptionResult,
  ScoringProfile,
  SearchField,
  SearchFieldDataType,
  SearchIndex,
  SearchIndexer,
  SearchIndexerCache,
  SearchIndexerDataIdentity,
  SearchIndexerDataSourceConnection,
  SearchIndexerDataSourceType,
  SearchIndexerIndexProjection,
  SearchIndexerKnowledgeStore,
  SearchIndexerSkill,
  SearchIndexerSkillset,
  SearchResourceEncryptionKey,
  SimilarityAlgorithm,
  SimpleField,
  SynonymMap,
  TokenAuthAzureMachineLearningVectorizerParameters,
  TokenFilter,
  VectorSearch,
  VectorSearchAlgorithmConfiguration,
  VectorSearchAlgorithmMetric,
  VectorSearchVectorizer,
  WebApiParameters,
  WebApiVectorizer,
} from "./serviceModels.js";
import { isComplexField } from "./serviceModels.js";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import type { KnowledgeSourceIngestionParameters as GeneratedKnowledgeSourceIngestionParameters } from "./models/azure/search/documents/knowledgeBases/index.js";

export const defaultServiceVersion = "2025-11-01-Preview";

const knownSkills: Record<`${SearchIndexerSkillUnion["odatatype"]}`, true> = {
  "#Microsoft.Skills.Custom.ChatCompletionSkill": true,
  "#Microsoft.Skills.Custom.WebApiSkill": true,
  "#Microsoft.Skills.Text.AzureOpenAIEmbeddingSkill": true,
  "#Microsoft.Skills.Text.CustomEntityLookupSkill": true,
  "#Microsoft.Skills.Text.EntityRecognitionSkill": true,
  "#Microsoft.Skills.Text.KeyPhraseExtractionSkill": true,
  "#Microsoft.Skills.Text.LanguageDetectionSkill": true,
  "#Microsoft.Skills.Text.MergeSkill": true,
  "#Microsoft.Skills.Text.PIIDetectionSkill": true,
  "#Microsoft.Skills.Text.SentimentSkill": true,
  "#Microsoft.Skills.Text.SplitSkill": true,
  "#Microsoft.Skills.Text.TranslationSkill": true,
  "#Microsoft.Skills.Text.V3.EntityLinkingSkill": true,
  "#Microsoft.Skills.Text.V3.EntityRecognitionSkill": true,
  "#Microsoft.Skills.Text.V3.SentimentSkill": true,
  "#Microsoft.Skills.Util.ConditionalSkill": true,
  "#Microsoft.Skills.Util.DocumentExtractionSkill": true,
  "#Microsoft.Skills.Util.ShaperSkill": true,
  "#Microsoft.Skills.Vision.ImageAnalysisSkill": true,
  "#Microsoft.Skills.Vision.OcrSkill": true,
  "#Microsoft.Skills.Custom.AmlSkill": true,
  "#Microsoft.Skills.Vision.VectorizeSkill": true,
  "#Microsoft.Skills.Util.DocumentIntelligenceLayoutSkill": true,
  "#Microsoft.Skills.Util.ContentUnderstandingSkill": true,
};

export function convertSkillsToPublic(skills: SearchIndexerSkillUnion[]): SearchIndexerSkill[] {
  if (!skills) {
    return skills;
  }

  // This validation has already GAed
  return skills.filter((skill): skill is SearchIndexerSkill => knownSkills[skill.odatatype]);
}

export function convertCognitiveServicesAccountToGenerated(
  cognitiveServicesAccount?: CognitiveServicesAccount,
): CognitiveServicesAccountUnion | undefined {
  if (!cognitiveServicesAccount) {
    return cognitiveServicesAccount;
  }

  switch (cognitiveServicesAccount.odatatype) {
    case "#Microsoft.Azure.Search.AIServicesByIdentity":
    case "#Microsoft.Azure.Search.DefaultCognitiveServices":
    case "#Microsoft.Azure.Search.CognitiveServicesByKey":
    case "#Microsoft.Azure.Search.AIServicesByKey":
      return cognitiveServicesAccount;
    default: {
      logger.warning(
        `Unsupported Cognitive Services account odatatype: ${(cognitiveServicesAccount as any).odatatype}`,
      );
      return cognitiveServicesAccount as any;
    }
  }
}

export function convertCognitiveServicesAccountToPublic(
  cognitiveServicesAccount?: CognitiveServicesAccountUnion,
): CognitiveServicesAccount | undefined {
  if (!cognitiveServicesAccount) {
    return cognitiveServicesAccount;
  }

  const deserializers: Record<
    CognitiveServicesAccountUnion["odatatype"],
    () => CognitiveServicesAccount
  > = {
    "#Microsoft.Azure.Search.DefaultCognitiveServices": () => {
      return cognitiveServicesAccount as GeneratedDefaultCognitiveServicesAccount;
    },
    "#Microsoft.Azure.Search.CognitiveServicesByKey": () => {
      return cognitiveServicesAccount as GeneratedCognitiveServicesAccountKey;
    },
    "#Microsoft.Azure.Search.AIServicesByKey": () => {
      return cognitiveServicesAccount as GeneratedAIServicesAccountKey;
    },
    "#Microsoft.Azure.Search.AIServicesByIdentity": () => {
      const { identity, ...restParams } =
        cognitiveServicesAccount as GeneratedAIServicesAccountIdentity;
      return {
        ...restParams,
        identity: convertSearchIndexerDataIdentityToPublic(identity),
      };
    },
  };

  const defaultDeserializer: () => CognitiveServicesAccount = () => {
    logger.warning(
      `Unsupported Cognitive Services account odatatype: ${(cognitiveServicesAccount as CognitiveServicesAccount).odatatype}`,
    );
    return cognitiveServicesAccount as CognitiveServicesAccount;
  };

  return (deserializers[cognitiveServicesAccount.odatatype] ?? defaultDeserializer)();
}

export function convertTokenFiltersToGenerated(
  tokenFilters?: TokenFilter[],
): TokenFilterUnion[] | undefined {
  if (!tokenFilters) {
    return tokenFilters;
  }

  const result: TokenFilterUnion[] = [];
  for (const filter of tokenFilters) {
    result.push(filter);
  }

  return result;
}

function convertAnalyzersToGenerated(
  analyzers?: LexicalAnalyzer[],
): LexicalAnalyzerUnion[] | undefined {
  if (!analyzers) {
    return analyzers;
  }

  const result: LexicalAnalyzerUnion[] = [];
  for (const analyzer of analyzers) {
    switch (analyzer.odatatype) {
      case "#Microsoft.Azure.Search.StandardAnalyzer":
      case "#Microsoft.Azure.Search.StopAnalyzer":
        result.push(analyzer);
        break;
      case "#Microsoft.Azure.Search.PatternAnalyzer":
        result.push(analyzer);
        break;
      case "#Microsoft.Azure.Search.CustomAnalyzer":
        result.push({
          ...analyzer,
          tokenizer: analyzer.tokenizerName,
        });
        break;
    }
  }
  return result;
}

function convertAnalyzersToPublic(
  analyzers?: LexicalAnalyzerUnion[],
): LexicalAnalyzer[] | undefined {
  if (!analyzers) {
    return analyzers;
  }

  const result: LexicalAnalyzer[] = [];
  for (const analyzer of analyzers) {
    switch (analyzer.odatatype) {
      case "#Microsoft.Azure.Search.StandardAnalyzer":
        result.push(analyzer as LuceneStandardAnalyzer);
        break;
      case "#Microsoft.Azure.Search.StopAnalyzer":
        result.push(analyzer as StopAnalyzer);
        break;
      case "#Microsoft.Azure.Search.PatternAnalyzer":
        result.push({
          ...analyzer,
        } as PatternAnalyzer);
        break;
      case "#Microsoft.Azure.Search.CustomAnalyzer":
        result.push(analyzer as LexicalAnalyzer);
        break;
    }
  }
  return result;
}

export function convertFieldsToPublic(fields?: GeneratedSearchField[]): SearchField[] | undefined {
  if (!fields) {
    return fields;
  }

  return fields.map<SearchField>((field): SearchField => {
    if (field.type === "Collection(Edm.ComplexType)" || field.type === "Edm.ComplexType") {
      const result: ComplexField = {
        name: field.name,
        type: field.type,
        fields: convertFieldsToPublic(field.fields!),
      };
      return result;
    } else {
      const type: SearchFieldDataType = field.type as SearchFieldDataType;
      const synonymMapNames: string[] | undefined = field.synonymMapNames;

      const { retrievable, ...restField } = field;
      const hidden = typeof retrievable === "boolean" ? !retrievable : retrievable;

      const result: SimpleField = {
        ...restField,
        type,
        hidden,
        synonymMapNames,
      };
      return result;
    }
  });
}

export function convertFieldsToGenerated(
  fields: SearchField[] | undefined,
): GeneratedSearchField[] | undefined {
  return fields?.map<GeneratedSearchField>((field) => {
    if (isComplexField(field)) {
      return {
        name: field.name,
        type: field.type,
        fields: convertFieldsToGenerated(field.fields),
      };
    } else {
      const { hidden, ...restField } = field;
      const retrievable = typeof hidden === "boolean" ? !hidden : hidden;
      return {
        ...restField,
        retrievable,
        // modify API defaults to use less storage for simple types
        searchable: field.searchable ?? false,
        filterable: field.filterable ?? false,
        facetable: field.facetable ?? false,
        sortable: field.sortable ?? false,
        analyzerName: field.analyzerName,
        searchAnalyzerName: field.searchAnalyzerName,
        indexAnalyzerName: field.indexAnalyzerName,
        synonymMapNames: field.synonymMapNames,
        normalizerName: field.normalizerName,
      };
    }
  });
}

function convertTokenizersToPublic(
  tokenizers?: LexicalTokenizerUnion[],
): LexicalTokenizer[] | undefined {
  if (!tokenizers) {
    return tokenizers;
  }

  const result: LexicalTokenizer[] = [];
  for (const tokenizer of tokenizers) {
    result.push(tokenizer as LexicalTokenizer);
  }
  return result;
}

export function convertSimilarityToGenerated(
  similarity?: SimilarityAlgorithm,
): SimilarityUnion | undefined {
  if (!similarity) {
    return similarity;
  }

  return similarity as SimilarityUnion;
}

export function convertSimilarityToPublic(
  similarity?: SimilarityUnion,
): SimilarityAlgorithm | undefined {
  if (!similarity) {
    return similarity;
  }

  if (similarity.odatatype === "#Microsoft.Azure.Search.ClassicSimilarity") {
    return similarity as ClassicSimilarity;
  } else {
    return similarity as BM25Similarity;
  }
}

function convertEncryptionKeyToPublic(
  encryptionKey?: GeneratedSearchResourceEncryptionKey,
): SearchResourceEncryptionKey | undefined {
  if (!encryptionKey) {
    return encryptionKey;
  }

  const result: SearchResourceEncryptionKey = {
    keyName: encryptionKey.keyName,
    keyVersion: encryptionKey.keyVersion,
    vaultUrl: encryptionKey.vaultUri,
    identity: convertSearchIndexerDataIdentityToPublic(encryptionKey.identity),
    applicationId: encryptionKey.applicationId,
    applicationSecret: encryptionKey.applicationSecret,
  };

  return result;
}

function convertEncryptionKeyToGenerated(
  encryptionKey?: SearchResourceEncryptionKey,
): GeneratedSearchResourceEncryptionKey | undefined {
  if (!encryptionKey) {
    return encryptionKey;
  }

  const result: GeneratedSearchResourceEncryptionKey = {
    keyName: encryptionKey.keyName,
    keyVersion: encryptionKey.keyVersion,
    vaultUri: encryptionKey.vaultUrl,
    identity: encryptionKey.identity,
    applicationId: encryptionKey.applicationId,
    applicationSecret: encryptionKey.applicationSecret,
  };

  return result;
}

export function generatedIndexToPublicIndex(generatedIndex: GeneratedSearchIndex): SearchIndex {
  const {
    charFilters,
    tokenFilters,
    scoringProfiles,
    encryptionKey,
    analyzers,
    tokenizers,
    fields,
    similarity,
    vectorSearch,
    ...rest
  } = generatedIndex;
  return {
    ...rest,
    scoringProfiles: scoringProfiles as ScoringProfile[],
    tokenFilters: tokenFilters as TokenFilter[],
    charFilters: charFilters as CharFilter[],
    encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
    analyzers: convertAnalyzersToPublic(analyzers),
    tokenizers: convertTokenizersToPublic(tokenizers),
    fields: convertFieldsToPublic(fields),
    similarity: convertSimilarityToPublic(similarity),
    vectorSearch: generatedVectorSearchToPublicVectorSearch(vectorSearch),
  } as SearchIndex;
}

export function generatedVectorSearchVectorizerToPublicVectorizer(): undefined;
export function generatedVectorSearchVectorizerToPublicVectorizer(
  generatedVectorizer: GeneratedVectorSearchVectorizer,
): VectorSearchVectorizer;
export function generatedVectorSearchVectorizerToPublicVectorizer(
  generatedVectorizer?: GeneratedVectorSearchVectorizer,
): VectorSearchVectorizer | undefined {
  if (!generatedVectorizer) {
    return generatedVectorizer;
  }

  const knownVectorizerDeserializers: Record<
    VectorSearchVectorizer["kind"],
    () => VectorSearchVectorizer
  > = {
    azureOpenAI: () => {
      const { parameters } = generatedVectorizer as GeneratedAzureOpenAIVectorizer;
      const authIdentity = convertSearchIndexerDataIdentityToPublic(parameters?.authIdentity);
      const vectorizer: AzureOpenAIVectorizer = {
        ...(generatedVectorizer as GeneratedAzureOpenAIVectorizer),
        parameters: { ...parameters, authIdentity },
      };
      return vectorizer;
    },

    customWebApi: () => {
      const { webApiParameters } = generatedVectorizer as GeneratedWebApiVectorizer;
      const authIdentity = convertSearchIndexerDataIdentityToPublic(webApiParameters?.authIdentity);
      const vectorizer: WebApiVectorizer = {
        ...(generatedVectorizer as GeneratedWebApiVectorizer),
        parameters: { ...webApiParameters, authIdentity } as WebApiParameters,
      };
      return vectorizer;
    },

    aiServicesVision: () => {
      const generatedVisionVectorizer = generatedVectorizer as GeneratedAIServicesVisionVectorizer;
      const { aiServicesVisionParameters: generatedParameters } = generatedVisionVectorizer;
      const parameters = generatedParameters
        ? {
            ...generatedParameters,
            modelVersion: generatedParameters.modelVersion,
            resourceUri: generatedParameters.resourceUri,
            authIdentity: convertSearchIndexerDataIdentityToPublic(
              generatedParameters.authIdentity,
            ),
          }
        : undefined;
      const vectorizer: AIServicesVisionVectorizer = {
        ...generatedVisionVectorizer,
        parameters,
      };
      return vectorizer;
    },
    aml: () => {
      const generatedAMLVectorizer = generatedVectorizer as GeneratedAMLVectorizer;

      const vectorizer: AzureMachineLearningVectorizer = {
        ...generatedAMLVectorizer,
        amlParameters:
          generatedAzureMachineLearningVectorizerParametersToPublicAzureMachineLearningVectorizerParameters(
            generatedAMLVectorizer.amlParameters,
          ),
      };

      return vectorizer;
    },
  };
  const defaultDeserializer = (): any => {
    logger.warning(`Unsupported vectorizer kind: ${(generatedVectorizer as any).kind}`);
    return generatedVectorizer as any;
  };

  return (
    knownVectorizerDeserializers[
      generatedVectorizer.kind as keyof typeof knownVectorizerDeserializers
    ] ?? defaultDeserializer
  )();
}

export function generatedKnowledgeSourceVectorizerToPublicVectorizer(): undefined;
export function generatedKnowledgeSourceVectorizerToPublicVectorizer(
  generatedVectorizer: any,
): KnowledgeSourceVectorizer;
export function generatedKnowledgeSourceVectorizerToPublicVectorizer(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  generatedVectorizer?: /* GeneratedKnowledgeSourceVectorizer */ any,
): KnowledgeSourceVectorizer | undefined {
  if (!generatedVectorizer) {
    return generatedVectorizer;
  }

  const knownVectorizerDeserializers: Record<
    KnowledgeSourceVectorizer["kind"],
    () => KnowledgeSourceVectorizer
  > = {
    azureOpenAI: () => {
      const { parameters } = generatedVectorizer as GeneratedAzureOpenAIVectorizer;
      const authIdentity = convertSearchIndexerDataIdentityToPublic(parameters?.authIdentity);
      const vectorizer: AzureOpenAIVectorizer = {
        ...(generatedVectorizer as GeneratedAzureOpenAIVectorizer),
        parameters: { ...parameters, authIdentity },
      };
      return vectorizer;
    },
  };
  const defaultDeserializer = (): any => {
    logger.warning(`Unsupported vectorizer kind: ${(generatedVectorizer as any).kind}`);
    return generatedVectorizer as any;
  };

  return (
    knownVectorizerDeserializers[
      generatedVectorizer.kind as keyof typeof knownVectorizerDeserializers
    ] ?? defaultDeserializer
  )();
}

function generatedAzureMachineLearningVectorizerParametersToPublicAzureMachineLearningVectorizerParameters(
  aMLParameters?: GeneratedAMLParameters,
): AzureMachineLearningVectorizerParameters | undefined {
  if (!aMLParameters) {
    return aMLParameters;
  }

  const { resourceId, authenticationKey, scoringUri } = aMLParameters;
  // Sensitive to case order
  switch (true) {
    case resourceId !== undefined && resourceId !== null: {
      return {
        ...aMLParameters,
        authKind: "token",
      } as TokenAuthAzureMachineLearningVectorizerParameters;
    }
    case authenticationKey !== undefined && authenticationKey !== null: {
      return {
        ...aMLParameters,
        authKind: "key",
      } as KeyAuthAzureMachineLearningVectorizerParameters;
    }
    case scoringUri !== undefined && scoringUri !== null: {
      return {
        ...aMLParameters,
        authKind: "none",
      } as NoAuthAzureMachineLearningVectorizerParameters;
    }
  }
  logger.warning("Unknown AML parameter kind");
  return aMLParameters as any;
}

export function generatedVectorSearchAlgorithmConfigurationToPublicVectorSearchAlgorithmConfiguration(): undefined;
export function generatedVectorSearchAlgorithmConfigurationToPublicVectorSearchAlgorithmConfiguration(
  generatedAlgorithmConfiguration: GeneratedVectorSearchAlgorithmConfiguration,
): VectorSearchAlgorithmConfiguration;
export function generatedVectorSearchAlgorithmConfigurationToPublicVectorSearchAlgorithmConfiguration(
  generatedAlgorithmConfiguration?: GeneratedVectorSearchAlgorithmConfiguration,
): VectorSearchAlgorithmConfiguration | undefined {
  if (!generatedAlgorithmConfiguration) {
    return generatedAlgorithmConfiguration;
  }

  if (["hnsw", "exhaustiveKnn"].includes(generatedAlgorithmConfiguration.kind)) {
    const algorithmConfiguration = generatedAlgorithmConfiguration as
      | GeneratedHnswAlgorithmConfiguration
      | GeneratedExhaustiveKnnAlgorithmConfiguration;
    const metric = algorithmConfiguration.parameters?.metric as VectorSearchAlgorithmMetric;
    return {
      ...algorithmConfiguration,
      parameters: { ...algorithmConfiguration.parameters, metric },
    };
  }

  throw Error("Unsupported algorithm configuration");
}

export function generatedVectorSearchToPublicVectorSearch(
  vectorSearch?: GeneratedVectorSearch,
): VectorSearch | undefined {
  if (!vectorSearch) {
    return vectorSearch;
  }

  return {
    ...vectorSearch,
    algorithms: vectorSearch.algorithms?.map(
      generatedVectorSearchAlgorithmConfigurationToPublicVectorSearchAlgorithmConfiguration,
    ),
    vectorizers: vectorSearch.vectorizers?.map(generatedVectorSearchVectorizerToPublicVectorizer),
  } as VectorSearch;
}

export function generatedSearchResultToPublicSearchResult<
  TModel extends object,
  TFields extends SelectFields<TModel>,
>(results: GeneratedSearchResult[]): SearchResult<TModel, TFields>[] {
  const returnValues: SearchResult<TModel, TFields>[] = results.map<SearchResult<TModel, TFields>>(
    (result) => {
      const {
        score,
        highlights,
        rerankerScore,
        rerankerBoostedScore,
        captions,
        documentDebugInfo,
        additionalProperties,
      } = result;
      const obj = {
        score,
        highlights,
        rerankerScore,
        rerankerBoostedScore,
        captions: convertGeneratedCaptionsToPublic(captions),
        documentDebugInfo,
        // The generated code puts document fields in additionalProperties
        document: additionalProperties ?? {},
      };
      return obj as SearchResult<TModel, TFields>;
    },
  );
  return returnValues;
}

export function generatedSuggestDocumentsResultToPublicSuggestDocumentsResult<
  TModel extends object,
  TFields extends SelectFields<TModel>,
>(searchDocumentsResult: GeneratedSuggestDocumentsResult): SuggestDocumentsResult<TModel, TFields> {
  const results = searchDocumentsResult.results.map<SuggestResult<TModel, TFields>>((element) => {
    const { text, additionalProperties } = element;

    const obj = {
      text,
      // The generated code puts document fields in additionalProperties
      document: additionalProperties ?? {},
    };

    return obj as SuggestResult<TModel, TFields>;
  });

  const result: SuggestDocumentsResult<TModel, TFields> = {
    results: results,
    coverage: searchDocumentsResult.coverage,
  };

  return result;
}

export function publicIndexToGeneratedIndex(index: SearchIndex): GeneratedSearchIndex {
  const { encryptionKey, tokenFilters, analyzers, fields, similarity } = index;

  return {
    ...index,
    encryptionKey: convertEncryptionKeyToGenerated(encryptionKey),
    tokenFilters: convertTokenFiltersToGenerated(tokenFilters),
    analyzers: convertAnalyzersToGenerated(analyzers),
    fields: convertFieldsToGenerated(fields) ?? [],
    similarity: convertSimilarityToGenerated(similarity),
  };
}

export function generatedSkillsetToPublicSkillset(
  generatedSkillset: GeneratedSearchIndexerSkillset,
): SearchIndexerSkillset {
  const {
    skills,
    cognitiveServicesAccount,
    knowledgeStore,
    encryptionKey,
    indexProjection,
    ...props
  } = generatedSkillset;
  return {
    ...props,
    skills: convertSkillsToPublic(skills),
    cognitiveServicesAccount: convertCognitiveServicesAccountToPublic(cognitiveServicesAccount),
    knowledgeStore: convertKnowledgeStoreToPublic(knowledgeStore),
    encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
    indexProjection: indexProjection as SearchIndexerIndexProjection,
  };
}

export function publicSkillsetToGeneratedSkillset(
  skillset: SearchIndexerSkillset,
): GeneratedSearchIndexerSkillset {
  const { cognitiveServicesAccount, encryptionKey } = skillset;

  return {
    ...skillset,
    cognitiveServicesAccount: convertCognitiveServicesAccountToGenerated(cognitiveServicesAccount),
    encryptionKey: convertEncryptionKeyToGenerated(encryptionKey),
  };
}

export function generatedSynonymMapToPublicSynonymMap(synonymMap: GeneratedSynonymMap): SynonymMap {
  const result: SynonymMap = {
    name: synonymMap.name,
    encryptionKey: convertEncryptionKeyToPublic(synonymMap.encryptionKey),
    etag: synonymMap.eTag,
    synonyms: [],
  };

  if (synonymMap.synonyms) {
    result.synonyms = synonymMap.synonyms;
  }

  return result;
}

export function publicSynonymMapToGeneratedSynonymMap(synonymMap: SynonymMap): GeneratedSynonymMap {
  const result: GeneratedSynonymMap = {
    name: synonymMap.name,
    format: "solr",
    encryptionKey: convertEncryptionKeyToGenerated(synonymMap.encryptionKey),
    eTag: synonymMap.etag,
    synonyms: synonymMap.synonyms,
  };

  result.encryptionKey = convertEncryptionKeyToGenerated(synonymMap.encryptionKey);

  return result;
}

export function publicSearchIndexerToGeneratedSearchIndexer(
  indexer: SearchIndexer,
): GeneratedSearchIndexer {
  return {
    ...indexer,
    encryptionKey: convertEncryptionKeyToGenerated(indexer.encryptionKey),
  };
}

export function generatedSearchIndexerToPublicSearchIndexer(
  indexer: GeneratedSearchIndexer,
): SearchIndexer {
  const {
    parsingMode,
    dataToExtract,
    imageAction,
    pdfTextRotationAlgorithm,
    executionEnvironment,
  } = indexer.parameters?.configuration ?? {};

  const configuration: IndexingParametersConfiguration | undefined = indexer.parameters
    ?.configuration && {
    ...indexer.parameters?.configuration,
    parsingMode: parsingMode as BlobIndexerParsingMode | undefined,
    dataToExtract: dataToExtract as BlobIndexerDataToExtract | undefined,
    imageAction: imageAction as BlobIndexerImageAction | undefined,
    pdfTextRotationAlgorithm: pdfTextRotationAlgorithm as
      | BlobIndexerPDFTextRotationAlgorithm
      | undefined,
    executionEnvironment: executionEnvironment as IndexerExecutionEnvironment | undefined,
    markdownParsingSubmode: indexer.parameters?.configuration?.markdownParsingSubmode,
    markdownHeaderDepth: indexer.parameters?.configuration?.markdownHeaderDepth,
  };
  const parameters: IndexingParameters = {
    ...indexer.parameters,
    configuration,
    batchSize: indexer.parameters?.batchSize,
    maxFailedItems: indexer.parameters?.maxFailedItems,
    maxFailedItemsPerBatch: indexer.parameters?.maxFailedItemsPerBatch,
  };

  return {
    ...indexer,
    parameters,
    encryptionKey: convertEncryptionKeyToPublic(indexer.encryptionKey),
    cache: convertSearchIndexerCacheToPublic(indexer.cache),
    schedule: indexer.schedule,
    isDisabled: indexer.isDisabled,
  };
}

export function publicDataSourceToGeneratedDataSource(
  dataSource: SearchIndexerDataSourceConnection,
): GeneratedSearchIndexerDataSourceConnection {
  return {
    name: dataSource.name,
    description: dataSource.description,
    type: dataSource.type,
    connectionString: dataSource.connectionString,
    container: dataSource.container,
    identity: dataSource.identity,
    eTag: dataSource.etag,
    dataChangeDetectionPolicy: dataSource.dataChangeDetectionPolicy,
    dataDeletionDetectionPolicy: dataSource.dataDeletionDetectionPolicy,
    encryptionKey: convertEncryptionKeyToGenerated(dataSource.encryptionKey),
  };
}

export function generatedDataSourceToPublicDataSource(
  dataSource: GeneratedSearchIndexerDataSourceConnection,
): SearchIndexerDataSourceConnection {
  return {
    name: dataSource.name,
    description: dataSource.description,
    type: dataSource.type as SearchIndexerDataSourceType,
    connectionString: dataSource.connectionString,
    container: dataSource.container,
    identity: convertSearchIndexerDataIdentityToPublic(dataSource.identity),
    etag: dataSource.eTag,
    dataChangeDetectionPolicy: convertDataChangeDetectionPolicyToPublic(
      dataSource.dataChangeDetectionPolicy,
    ),
    dataDeletionDetectionPolicy: convertDataDeletionDetectionPolicyToPublic(
      dataSource.dataDeletionDetectionPolicy,
    ),
    encryptionKey: convertEncryptionKeyToPublic(dataSource.encryptionKey),
  };
}

export function convertSearchIndexerDataIdentityToPublic(
  searchIndexerDataIdentity?: SearchIndexerDataIdentityUnion,
): SearchIndexerDataIdentity | undefined {
  if (!searchIndexerDataIdentity) {
    return searchIndexerDataIdentity;
  }

  if (searchIndexerDataIdentity.odatatype === "#Microsoft.Azure.Search.DataNoneIdentity") {
    return searchIndexerDataIdentity as SearchIndexerDataNoneIdentity;
  } else {
    return searchIndexerDataIdentity as SearchIndexerDataUserAssignedIdentity;
  }
}

export function convertDataChangeDetectionPolicyToPublic(
  dataChangeDetectionPolicy?: DataChangeDetectionPolicyUnion,
): DataChangeDetectionPolicy | undefined {
  if (!dataChangeDetectionPolicy) {
    return dataChangeDetectionPolicy;
  }

  if (
    dataChangeDetectionPolicy.odatatype ===
    "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy"
  ) {
    return dataChangeDetectionPolicy as HighWaterMarkChangeDetectionPolicy;
  } else {
    return dataChangeDetectionPolicy as SqlIntegratedChangeTrackingPolicy;
  }
}

export function convertDataDeletionDetectionPolicyToPublic(
  dataDeletionDetectionPolicy?: DataDeletionDetectionPolicyUnion,
): DataDeletionDetectionPolicy | undefined {
  if (!dataDeletionDetectionPolicy) {
    return dataDeletionDetectionPolicy;
  }

  return dataDeletionDetectionPolicy as SoftDeleteColumnDeletionDetectionPolicy;
}

export function getRandomIntegerInclusive(min: number, max: number): number {
  // Make sure inputs are integers.
  min = Math.ceil(min);
  max = Math.floor(max);
  // Pick a random offset from zero to the size of the range.
  // Since Math.random() can never return 1, we have to make the range one larger
  // in order to be inclusive of the maximum value after we take the floor.
  const offset = Math.floor(Math.random() * (max - min + 1));
  return offset + min;
}

function convertKnowledgeStoreToPublic(
  knowledgeStore: BaseSearchIndexerKnowledgeStore | undefined,
): SearchIndexerKnowledgeStore | undefined {
  if (!knowledgeStore) {
    return knowledgeStore;
  }

  return {
    ...knowledgeStore,
    identity: convertSearchIndexerDataIdentityToPublic(knowledgeStore.identity),
  };
}

export function convertSearchIndexerCacheToPublic(
  cache?: GeneratedSearchIndexerCache,
): SearchIndexerCache | undefined {
  if (!cache) {
    return cache;
  }

  return {
    ...cache,
    identity: convertSearchIndexerDataIdentityToPublic(cache.identity),
    enableReprocessing: cache.enableReprocessing,
  };
}

export function convertKnowledgeBaseToPublic(
  knowledgeBase: GeneratedKnowledgeBase | undefined,
): KnowledgeBase {
  if (!knowledgeBase) {
    throw new Error("Knowledge base is undefined");
  }

  return {
    ...knowledgeBase,
    models: (knowledgeBase.models ?? []).map((model) => convertKnowledgeBaseModelToPublic(model)),
    encryptionKey: convertEncryptionKeyToPublic(knowledgeBase.encryptionKey),
  };
}

export function convertKnowledgeBaseToGenerated(
  knowledgeBase: KnowledgeBase | undefined,
): GeneratedKnowledgeBase | undefined {
  if (!knowledgeBase) {
    return knowledgeBase;
  }

  return {
    ...knowledgeBase,
    encryptionKey: convertEncryptionKeyToGenerated(knowledgeBase.encryptionKey),
  };
}

export function convertKnowledgeSourceToPublic(
  knowledgeSource: GeneratedKnowledgeSource,
): KnowledgeSource | undefined {
  if (!knowledgeSource) {
    return knowledgeSource;
  }

  switch (knowledgeSource.kind) {
    case "searchIndex": {
      const { encryptionKey } = knowledgeSource as GeneratedSearchIndexKnowledgeSource;
      return {
        ...knowledgeSource,
        encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
      } as KnowledgeSource;
    }
    case "azureBlob": {
      const { encryptionKey, azureBlobParameters } =
        knowledgeSource as GeneratedAzureBlobKnowledgeSource;
      return {
        ...knowledgeSource,
        kind: "azureBlob",
        encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
        azureBlobParameters: convertAzureBlobKnowledgeSourceParametersToPublic(azureBlobParameters),
      };
    }
    case "indexedSharePoint": {
      const { encryptionKey, indexedSharePointParameters } =
        knowledgeSource as GeneratedIndexedSharePointKnowledgeSource;
      return {
        ...knowledgeSource,
        kind: "indexedSharePoint",
        encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
        indexedSharePointParameters: {
          connectionString: indexedSharePointParameters.connectionString,
          containerName: indexedSharePointParameters.containerName,
          createdResources: indexedSharePointParameters.createdResources?.additionalProperties,
          ingestionParameters: convertKnowledgeIngestionParametersToPublic(
            indexedSharePointParameters.ingestionParameters,
          ),
          query: indexedSharePointParameters.query,
        },
      };
    }
    case "indexedOneLake": {
      const { encryptionKey, indexedOneLakeParameters } =
        knowledgeSource as GeneratedIndexedOneLakeKnowledgeSource;
      return {
        ...knowledgeSource,
        kind: "indexedOneLake",
        encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
        indexedOneLakeParameters: {
          fabricWorkspaceId: indexedOneLakeParameters.fabricWorkspaceId,
          lakehouseId: indexedOneLakeParameters.lakehouseId,
          ingestionParameters: convertKnowledgeIngestionParametersToPublic(
            indexedOneLakeParameters.ingestionParameters,
          ),
          targetPath: indexedOneLakeParameters.targetPath,
          createdResources: indexedOneLakeParameters.createdResources?.additionalProperties,
        },
      };
    }
    case "remoteSharePoint": {
      const { encryptionKey } = knowledgeSource as GeneratedRemoteSharePointKnowledgeSource;
      return {
        ...knowledgeSource,
        kind: "remoteSharePoint",
        encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
      };
    }
    case "web": {
      const { encryptionKey } = knowledgeSource as GeneratedWebKnowledgeSource;
      return {
        ...knowledgeSource,
        kind: "web",
        encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
      };
    }
    default: {
      logger.warning(`Unknown knowledge source kind ${knowledgeSource.kind}`);
      return undefined;
    }
  }
}

export function convertKnowledgeSourceToGenerated(
  knowledgeSource: KnowledgeSource | undefined,
): GeneratedKnowledgeSource | undefined {
  if (!knowledgeSource) {
    return knowledgeSource;
  }
  const { encryptionKey } = knowledgeSource;
  return { ...knowledgeSource, encryptionKey: convertEncryptionKeyToGenerated(encryptionKey) };
}

function convertKnowledgeIngestionParametersToPublic(
  params: GeneratedKnowledgeSourceIngestionParameters | undefined,
): KnowledgeSourceIngestionParameters | undefined {
  if (!params) {
    return params;
  }

  const { embeddingModel, chatCompletionModel, identity, ...rest } = params;
  return {
    ...rest,
    embeddingModel: !embeddingModel
      ? embeddingModel
      : generatedKnowledgeSourceVectorizerToPublicVectorizer(embeddingModel),
    identity: convertSearchIndexerDataIdentityToPublic(identity),
    chatCompletionModel: !chatCompletionModel
      ? chatCompletionModel
      : convertKnowledgeBaseModelToPublic(chatCompletionModel),
  } as KnowledgeSourceIngestionParameters;
}

function convertAzureBlobKnowledgeSourceParametersToPublic(
  params: GeneratedAzureBlobKnowledgeSourceParameters | undefined,
): AzureBlobKnowledgeSourceParameters | undefined {
  if (!params) {
    return params;
  }
  const { embeddingModel, chatCompletionModel, identity, ...rest } =
    params.ingestionParameters ?? {};
  return {
    ...rest,
    embeddingModel: !embeddingModel
      ? embeddingModel
      : generatedKnowledgeSourceVectorizerToPublicVectorizer(embeddingModel),
    identity: convertSearchIndexerDataIdentityToPublic(identity),
    connectionString: params.connectionString,
    containerName: params.containerName,
    chatCompletionModel: !chatCompletionModel
      ? chatCompletionModel
      : convertKnowledgeBaseModelToPublic(chatCompletionModel),
  } as AzureBlobKnowledgeSourceParameters;
}

function convertKnowledgeBaseModelToPublic(model: GeneratedKnowledgeBaseModel): KnowledgeBaseModel {
  switch (model.kind) {
    case "azureOpenAI": {
      const { azureOpenAIParameters, ...rest } = model as GeneratedKnowledgeBaseAzureOpenAIModel;
      return {
        ...rest,
        azureOpenAIParameters: convertAzureOpenAIParametersToPublic(azureOpenAIParameters),
      };
    }
    default: {
      logger.warning("Unknown knowledge base model kind");
      return model as any;
    }
  }
}

function convertAzureOpenAIParametersToPublic(
  params: GeneratedAzureOpenAIParameters,
): AzureOpenAIParameters {
  return {
    ...params,
    authIdentity: convertSearchIndexerDataIdentityToPublic(params.authIdentity),
  };
}

export function mapPagedAsyncIterable<T, U>(
  iter: PagedAsyncIterableIterator<T>,
  mapper: (x: T) => U,
): PagedAsyncIterableIterator<U> {
  return {
    async next() {
      const result = await iter.next();

      return {
        ...result,
        value: result.value && mapper(result.value),
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    async *byPage(settings) {
      const iteratorByPage = iter.byPage(settings);
      for await (const page of iteratorByPage) {
        yield page.map(mapper);
      }
    },
  };
}

/**
 * Converts public IndexDocumentsAction format to generated IndexAction format.
 * The public API uses `__actionType` with document properties spread at the root,
 * while the generated API expects `actionType` with document properties in `additionalProperties`.
 * @internal
 */
export function convertPublicActionsToGeneratedActions<
  TModel extends { __actionType: IndexActionType },
>(actions: Array<TModel>): IndexAction[] {
  return actions.map((action) => {
    const { __actionType, ...documentProperties } = action;
    return {
      actionType: __actionType,
      additionalProperties: documentProperties as Record<string, unknown>,
    };
  });
}

// Backward compatibility conversion functions for FacetResult, QueryAnswerResult, and QueryCaptionResult
// These functions spread additionalProperties onto the top level of the object for backward compatibility
// with the old API where users could access dynamic properties directly (e.g., facetResult["myProperty"])

/**
 * Converts a generated FacetResult to a public FacetResult with additionalProperties spread
 * onto the object for backward compatibility.
 * @internal
 */
export function convertGeneratedFacetResultToPublic(
  facetResult: GeneratedFacetResult,
): FacetResult {
  const { additionalProperties, facets, ...rest } = facetResult;
  return {
    ...additionalProperties,
    ...rest,
    // Recursively convert nested facets
    facets: convertGeneratedFacetsToPublic(facets),
    additionalProperties,
  } as FacetResult;
}

/**
 * Converts a record of FacetResult arrays from generated to public format.
 * @internal
 */
export function convertGeneratedFacetsToPublic(
  facets: Record<string, GeneratedFacetResult[]> | undefined,
): Record<string, FacetResult[]> | undefined {
  if (!facets) {
    return facets;
  }
  const result: Record<string, FacetResult[]> = {};
  for (const [key, value] of Object.entries(facets)) {
    result[key] = value.map(convertGeneratedFacetResultToPublic);
  }
  return result;
}

/**
 * Converts a generated QueryAnswerResult to a public QueryAnswerResult with additionalProperties spread
 * onto the object for backward compatibility.
 * @internal
 */
export function convertGeneratedQueryAnswerResultToPublic(
  answerResult: GeneratedQueryAnswerResult,
): QueryAnswerResult {
  const { additionalProperties, ...rest } = answerResult;
  return {
    ...additionalProperties,
    ...rest,
    additionalProperties,
  } as QueryAnswerResult;
}

/**
 * Converts an array of QueryAnswerResult from generated to public format.
 * @internal
 */
export function convertGeneratedAnswersToPublic(
  answers: GeneratedQueryAnswerResult[] | undefined,
): QueryAnswerResult[] | undefined {
  if (!answers) {
    return answers;
  }
  return answers.map(convertGeneratedQueryAnswerResultToPublic);
}

/**
 * Converts a generated QueryCaptionResult to a public QueryCaptionResult with additionalProperties spread
 * onto the object for backward compatibility.
 * @internal
 */
export function convertGeneratedQueryCaptionResultToPublic(
  captionResult: GeneratedQueryCaptionResult,
): QueryCaptionResult {
  const { additionalProperties, ...rest } = captionResult;
  return {
    ...additionalProperties,
    ...rest,
    additionalProperties,
  } as QueryCaptionResult;
}

/**
 * Converts an array of QueryCaptionResult from generated to public format.
 * @internal
 */
export function convertGeneratedCaptionsToPublic(
  captions: GeneratedQueryCaptionResult[] | undefined,
): QueryCaptionResult[] | undefined {
  if (!captions) {
    return captions;
  }
  return captions.map(convertGeneratedQueryCaptionResultToPublic);
}
