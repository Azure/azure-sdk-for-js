// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SearchResult as GeneratedSearchResult,
  SuggestDocumentsResult as GeneratedSuggestDocumentsResult,
} from "./generated/data/models/index.js";
import type {
  AIServicesAccountIdentity as GeneratedAIServicesAccountIdentity,
  AIServicesAccountKey as GeneratedAIServicesAccountKey,
  AIServicesVisionVectorizer as GeneratedAIServicesVisionVectorizer,
  AMLParameters as GeneratedAMLParameters,
  AMLVectorizer as GeneratedAMLVectorizer,
  AzureBlobKnowledgeSource as GeneratedAzureBlobKnowledgeSource,
  AzureBlobKnowledgeSourceParameters as GeneratedAzureBlobKnowledgeSourceParameters,
  AzureOpenAIParameters as GeneratedAzureOpenAIParameters,
  AzureOpenAIVectorizer as GeneratedAzureOpenAIVectorizer,
  BM25Similarity,
  ClassicSimilarity,
  CognitiveServicesAccountKey as GeneratedCognitiveServicesAccountKey,
  CognitiveServicesAccountUnion,
  CustomAnalyzer as BaseCustomAnalyzer,
  DataChangeDetectionPolicyUnion,
  DataDeletionDetectionPolicyUnion,
  DefaultCognitiveServicesAccount as GeneratedDefaultCognitiveServicesAccount,
  ExhaustiveKnnAlgorithmConfiguration as GeneratedExhaustiveKnnAlgorithmConfiguration,
  HighWaterMarkChangeDetectionPolicy,
  HnswAlgorithmConfiguration as GeneratedHnswAlgorithmConfiguration,
  KnowledgeAgent as GeneratedKnowledgeAgent,
  KnowledgeAgentAzureOpenAIModel as GeneratedKnowledgeAgentAzureOpenAIModel,
  KnowledgeAgentModelUnion as GeneratedKnowledgeAgentModel,
  KnowledgeSourceUnion as GeneratedKnowledgeSource,
  LexicalAnalyzerUnion,
  LexicalTokenizerUnion,
  LuceneStandardAnalyzer,
  PatternAnalyzer as GeneratedPatternAnalyzer,
  PatternTokenizer,
  SearchField as GeneratedSearchField,
  SearchIndex as GeneratedSearchIndex,
  SearchIndexer as GeneratedSearchIndexer,
  SearchIndexerCache as GeneratedSearchIndexerCache,
  SearchIndexerDataIdentityUnion,
  SearchIndexerDataNoneIdentity,
  SearchIndexerDataSource as GeneratedSearchIndexerDataSourceConnection,
  SearchIndexerDataUserAssignedIdentity,
  SearchIndexerKnowledgeStore as BaseSearchIndexerKnowledgeStore,
  SearchIndexerSkillset as GeneratedSearchIndexerSkillset,
  SearchIndexerSkillUnion,
  SearchIndexKnowledgeSource as GeneratedSearchIndexKnowledgeSource,
  SearchResourceEncryptionKey as GeneratedSearchResourceEncryptionKey,
  SimilarityUnion,
  SoftDeleteColumnDeletionDetectionPolicy,
  SqlIntegratedChangeTrackingPolicy,
  StopAnalyzer,
  SynonymMap as GeneratedSynonymMap,
  TokenFilterUnion,
  VectorSearch as GeneratedVectorSearch,
  VectorSearchAlgorithmConfigurationUnion as GeneratedVectorSearchAlgorithmConfiguration,
  VectorSearchVectorizerUnion as GeneratedVectorSearchVectorizer,
  WebApiVectorizer as GeneratedWebApiVectorizer,
} from "./generated/service/models/index.js";
import type {
  SearchResult,
  SelectFields,
  SuggestDocumentsResult,
  SuggestResult,
} from "./indexModels.js";
import type { KnowledgeAgent } from "./knowledgeAgentModels.js";
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
  IndexerExecutionEnvironment,
  IndexingParameters,
  IndexingParametersConfiguration,
  KeyAuthAzureMachineLearningVectorizerParameters,
  KnowledgeAgentModel,
  KnowledgeSource,
  LexicalAnalyzer,
  LexicalTokenizer,
  NoAuthAzureMachineLearningVectorizerParameters,
  PatternAnalyzer,
  RegexFlags,
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
  WebApiVectorizer,
} from "./serviceModels.js";
import { isComplexField } from "./serviceModels.js";

export const defaultServiceVersion = "2025-08-01-Preview";

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
        identity: convertSearchIndexerDataIdentityToPublic(identity ?? undefined),
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
        result.push({
          ...analyzer,
          flags: analyzer.flags ? analyzer.flags.join("|") : undefined,
        });
        break;
      case "#Microsoft.Azure.Search.CustomAnalyzer":
        result.push({
          ...analyzer,
          tokenizerName: analyzer.tokenizerName,
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
          flags: (analyzer as GeneratedPatternAnalyzer).flags
            ? ((analyzer as GeneratedPatternAnalyzer).flags!.split("|") as RegexFlags[])
            : undefined,
        } as PatternAnalyzer);
        break;
      case "#Microsoft.Azure.Search.CustomAnalyzer":
        result.push(analyzer as BaseCustomAnalyzer);
        break;
    }
  }
  return result;
}

export function convertFieldsToPublic(fields: GeneratedSearchField[]): SearchField[] {
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
      const synonymMapNames: string[] | undefined = field.synonymMaps;

      const { retrievable, analyzer, searchAnalyzer, indexAnalyzer, normalizer, ...restField } =
        field;
      const hidden = typeof retrievable === "boolean" ? !retrievable : retrievable;

      const result: SimpleField = {
        ...restField,
        type,
        hidden,
        analyzerName: analyzer,
        searchAnalyzerName: searchAnalyzer,
        indexAnalyzerName: indexAnalyzer,
        normalizerName: normalizer,
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
        analyzer: field.analyzerName,
        searchAnalyzer: field.searchAnalyzerName,
        indexAnalyzer: field.indexAnalyzerName,
        synonymMaps: field.synonymMapNames,
        normalizer: field.normalizerName,
      };
    }
  });
}

function convertTokenizersToGenerated(
  tokenizers?: LexicalTokenizer[],
): LexicalTokenizerUnion[] | undefined {
  if (!tokenizers) {
    return tokenizers;
  }

  const result: LexicalTokenizerUnion[] = [];
  for (const tokenizer of tokenizers) {
    if (tokenizer.odatatype === "#Microsoft.Azure.Search.PatternTokenizer") {
      result.push({
        ...tokenizer,
        flags: tokenizer.flags ? tokenizer.flags.join("|") : undefined,
      });
    } else {
      result.push(tokenizer);
    }
  }
  return result;
}

function convertTokenizersToPublic(
  tokenizers?: LexicalTokenizerUnion[],
): LexicalTokenizer[] | undefined {
  if (!tokenizers) {
    return tokenizers;
  }

  const result: LexicalTokenizer[] = [];
  for (const tokenizer of tokenizers) {
    if (tokenizer.odatatype === "#Microsoft.Azure.Search.PatternTokenizer") {
      const patternTokenizer = tokenizer as PatternTokenizer;
      const flags = patternTokenizer.flags?.split("|") as RegexFlags[] | undefined;
      result.push({
        ...tokenizer,
        flags,
      });
    } else {
      result.push(tokenizer);
    }
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
  };

  if (encryptionKey.accessCredentials) {
    result.applicationId = encryptionKey.accessCredentials.applicationId;
    result.applicationSecret = encryptionKey.accessCredentials.applicationSecret;
  }

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
  };

  if (encryptionKey.applicationId) {
    result.accessCredentials = {
      applicationId: encryptionKey.applicationId,
      applicationSecret: encryptionKey.applicationSecret,
    };
  }

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
  };
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
      const { parameters } = generatedVectorizer as GeneratedWebApiVectorizer;
      const authIdentity = convertSearchIndexerDataIdentityToPublic(parameters?.authIdentity);
      const vectorizer: WebApiVectorizer = {
        ...(generatedVectorizer as GeneratedWebApiVectorizer),
        parameters: { ...parameters, authIdentity },
      };
      return vectorizer;
    },

    aiServicesVision: () => {
      const generatedVisionVectorizer = generatedVectorizer as GeneratedAIServicesVisionVectorizer;
      const { aIServicesVisionParameters: generatedParameters } = generatedVisionVectorizer;
      const parameters = generatedParameters
        ? {
            ...generatedParameters,
            modelVersion: generatedParameters.modelVersion ?? undefined,
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
            generatedAMLVectorizer.aMLParameters,
          ),
      };

      return vectorizer;
    },
  };
  const defaultDeserializer = (): any => {
    logger.warning(`Unsupported vectorizer kind: ${(generatedVectorizer as any).kind}`);
    return generatedVectorizer as any;
  };

  return (knownVectorizerDeserializers[generatedVectorizer.kind] ?? defaultDeserializer)();
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
  };
}

export function generatedSearchResultToPublicSearchResult<
  TModel extends object,
  TFields extends SelectFields<TModel>,
>(results: GeneratedSearchResult[]): SearchResult<TModel, TFields>[] {
  const returnValues: SearchResult<TModel, TFields>[] = results.map<SearchResult<TModel, TFields>>(
    (result) => {
      const {
        _score: score,
        _highlights: highlights,
        _rerankerScore: rerankerScore,
        _rerankerBoostedScore: rerankerBoostedScore,
        _captions: captions,
        _documentDebugInfo: documentDebugInfo,
        ...restProps
      } = result;
      const obj = {
        score,
        highlights,
        rerankerScore,
        rerankerBoostedScore,
        captions,
        documentDebugInfo,
        document: restProps,
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
    const { _text, ...restProps } = element;

    const obj = {
      text: _text,
      document: restProps,
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
  const { encryptionKey, tokenFilters, analyzers, tokenizers, fields, similarity } = index;

  return {
    ...index,
    encryptionKey: convertEncryptionKeyToGenerated(encryptionKey),
    tokenFilters: convertTokenFiltersToGenerated(tokenFilters),
    analyzers: convertAnalyzersToGenerated(analyzers),
    tokenizers: convertTokenizersToGenerated(tokenizers),
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
    etag: synonymMap.etag,
    synonyms: [],
  };

  if (synonymMap.synonyms) {
    result.synonyms = synonymMap.synonyms.split("\n");
  }

  return result;
}

export function publicSynonymMapToGeneratedSynonymMap(synonymMap: SynonymMap): GeneratedSynonymMap {
  const result: GeneratedSynonymMap = {
    name: synonymMap.name,
    format: "solr",
    encryptionKey: convertEncryptionKeyToGenerated(synonymMap.encryptionKey),
    etag: synonymMap.etag,
    synonyms: synonymMap.synonyms.join("\n"),
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
  };
  const parameters: IndexingParameters = {
    ...indexer.parameters,
    configuration,
  };

  return {
    ...indexer,
    parameters,
    encryptionKey: convertEncryptionKeyToPublic(indexer.encryptionKey),
    cache: convertSearchIndexerCacheToPublic(indexer.cache),
  };
}

export function publicDataSourceToGeneratedDataSource(
  dataSource: SearchIndexerDataSourceConnection,
): GeneratedSearchIndexerDataSourceConnection {
  return {
    name: dataSource.name,
    description: dataSource.description,
    type: dataSource.type,
    credentials: {
      connectionString: dataSource.connectionString,
    },
    container: dataSource.container,
    identity: dataSource.identity,
    etag: dataSource.etag,
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
    description: dataSource.name,
    type: dataSource.type as SearchIndexerDataSourceType,
    connectionString: dataSource.credentials.connectionString,
    container: dataSource.container,
    identity: convertSearchIndexerDataIdentityToPublic(dataSource.identity),
    etag: dataSource.etag,
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
  };
}

export function convertKnowledgeAgentToPublic(
  knowledgeAgent: GeneratedKnowledgeAgent | undefined,
): KnowledgeAgent | undefined {
  if (!knowledgeAgent) {
    return knowledgeAgent;
  }

  return {
    ...knowledgeAgent,
    models: knowledgeAgent.models.map((model) => convertKnowledgeAgentModelToPublic(model)),
    encryptionKey: convertEncryptionKeyToPublic(knowledgeAgent.encryptionKey),
  };
}

export function convertKnowledgeAgentToGenerated(
  knowledgeAgent: KnowledgeAgent | undefined,
): GeneratedKnowledgeAgent | undefined {
  if (!knowledgeAgent) {
    return knowledgeAgent;
  }

  return {
    ...knowledgeAgent,
    encryptionKey: convertEncryptionKeyToGenerated(knowledgeAgent.encryptionKey),
  };
}

export function convertKnowledgeSourceToPublic(
  knowledgeSource: GeneratedKnowledgeSource | undefined,
): KnowledgeSource | undefined {
  if (!knowledgeSource) {
    return knowledgeSource;
  }

  switch (knowledgeSource.kind) {
    case "searchIndex": {
      const { encryptionKey } = knowledgeSource as GeneratedSearchIndexKnowledgeSource;
      return { ...knowledgeSource, encryptionKey: convertEncryptionKeyToPublic(encryptionKey) };
    }
    case "azureBlob": {
      const { encryptionKey, azureBlobParameters } =
        knowledgeSource as GeneratedAzureBlobKnowledgeSource;
      return {
        ...knowledgeSource,
        encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
        azureBlobParameters: convertAzureBlobKnowledgeSourceParametersToPublic(azureBlobParameters),
      };
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

function convertAzureBlobKnowledgeSourceParametersToPublic(
  params: GeneratedAzureBlobKnowledgeSourceParameters | undefined,
): AzureBlobKnowledgeSourceParameters | undefined {
  if (!params) {
    return params;
  }
  const { embeddingModel, identity, chatCompletionModel, ...rest } = params;
  return {
    ...rest,
    embeddingModel: !embeddingModel
      ? embeddingModel
      : generatedVectorSearchVectorizerToPublicVectorizer(embeddingModel),
    identity: convertSearchIndexerDataIdentityToPublic(identity),
    chatCompletionModel: !chatCompletionModel
      ? chatCompletionModel
      : convertKnowledgeAgentModelToPublic(chatCompletionModel),
  };
}

function convertKnowledgeAgentModelToPublic(
  model: GeneratedKnowledgeAgentModel,
): KnowledgeAgentModel {
  switch (model.kind) {
    case "azureOpenAI": {
      const { azureOpenAIParameters, ...rest } = model as GeneratedKnowledgeAgentAzureOpenAIModel;
      return {
        ...rest,
        azureOpenAIParameters: convertAzureOpenAIParametersToPublic(azureOpenAIParameters),
      };
    }
    default: {
      logger.warning("Unknown knowledge agent model kind");
      return model as any;
    }
  }
}

function convertAzureOpenAIParametersToPublic(
  params: GeneratedAzureOpenAIParameters,
): AzureOpenAIParameters {
  return { ...params, authIdentity: convertSearchIndexerDataIdentityToPublic(params.authIdentity) };
}
