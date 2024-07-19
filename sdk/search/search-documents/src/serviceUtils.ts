// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SearchResult as GeneratedSearchResult,
  SuggestDocumentsResult as GeneratedSuggestDocumentsResult,
} from "./generated/data/models";
import {
  BM25Similarity,
  ClassicSimilarity,
  CognitiveServicesAccountKey,
  CognitiveServicesAccountUnion,
  CustomAnalyzer as BaseCustomAnalyzer,
  DataChangeDetectionPolicyUnion,
  DataDeletionDetectionPolicyUnion,
  DefaultCognitiveServicesAccount,
  ExhaustiveKnnAlgorithmConfiguration as GeneratedExhaustiveKnnAlgorithmConfiguration,
  HighWaterMarkChangeDetectionPolicy,
  HnswAlgorithmConfiguration as GeneratedHnswAlgorithmConfiguration,
  LexicalAnalyzerUnion,
  LexicalTokenizerUnion,
  LuceneStandardAnalyzer,
  PatternAnalyzer as GeneratedPatternAnalyzer,
  PatternTokenizer,
  SearchField as GeneratedSearchField,
  SearchIndex as GeneratedSearchIndex,
  SearchIndexer as GeneratedSearchIndexer,
  SearchIndexerDataSource as GeneratedSearchIndexerDataSourceConnection,
  SearchIndexerSkillset as GeneratedSearchIndexerSkillset,
  SearchIndexerSkillUnion,
  SearchResourceEncryptionKey as GeneratedSearchResourceEncryptionKey,
  SimilarityUnion,
  SoftDeleteColumnDeletionDetectionPolicy,
  SqlIntegratedChangeTrackingPolicy,
  StopAnalyzer,
  SynonymMap as GeneratedSynonymMap,
  TokenFilterUnion,
  VectorSearch as GeneratedVectorSearch,
  VectorSearchAlgorithmConfigurationUnion as GeneratedVectorSearchAlgorithmConfiguration,
} from "./generated/service/models";
import { SearchResult, SelectFields, SuggestDocumentsResult, SuggestResult } from "./indexModels";
import {
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
  isComplexField,
  LexicalAnalyzer,
  LexicalTokenizer,
  PatternAnalyzer,
  RegexFlags,
  ScoringProfile,
  SearchField,
  SearchFieldDataType,
  SearchIndex,
  SearchIndexer,
  SearchIndexerDataSourceConnection,
  SearchIndexerDataSourceType,
  SearchIndexerSkill,
  SearchIndexerSkillset,
  SearchResourceEncryptionKey,
  SimilarityAlgorithm,
  SimpleField,
  SynonymMap,
  TokenFilter,
  VectorSearch,
  VectorSearchAlgorithmConfiguration,
  VectorSearchAlgorithmMetric,
} from "./serviceModels";

export const defaultServiceVersion = "2023-11-01";

const knownSkills: Record<`${SearchIndexerSkillUnion["odatatype"]}`, true> = {
  "#Microsoft.Skills.Custom.WebApiSkill": true,
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

  return cognitiveServicesAccount as CognitiveServicesAccountUnion;
}

export function convertCognitiveServicesAccountToPublic(
  cognitiveServicesAccount?: CognitiveServicesAccountUnion,
): CognitiveServicesAccount | undefined {
  if (!cognitiveServicesAccount) {
    return cognitiveServicesAccount;
  }

  if (cognitiveServicesAccount.odatatype === "#Microsoft.Azure.Search.DefaultCognitiveServices") {
    return cognitiveServicesAccount as DefaultCognitiveServicesAccount;
  } else {
    return cognitiveServicesAccount as CognitiveServicesAccountKey;
  }
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

      const { retrievable, analyzer, searchAnalyzer, indexAnalyzer, ...restField } = field;
      const hidden = typeof retrievable === "boolean" ? !retrievable : retrievable;

      const result: SimpleField = {
        ...restField,
        type,
        hidden,
        analyzerName: analyzer,
        searchAnalyzerName: searchAnalyzer,
        indexAnalyzerName: indexAnalyzer,
        synonymMapNames,
      };
      return result;
    }
  });
}

export function convertFieldsToGenerated(fields: SearchField[]): GeneratedSearchField[] {
  return fields.map<GeneratedSearchField>((field) => {
    if (isComplexField(field)) {
      return {
        name: field.name,
        type: field.type,
        fields: field.fields ? convertFieldsToGenerated(field.fields) : field.fields,
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
  return {
    name: generatedIndex.name,
    defaultScoringProfile: generatedIndex.defaultScoringProfile,
    corsOptions: generatedIndex.corsOptions,
    suggesters: generatedIndex.suggesters,
    encryptionKey: convertEncryptionKeyToPublic(generatedIndex.encryptionKey),
    etag: generatedIndex.etag,
    analyzers: convertAnalyzersToPublic(generatedIndex.analyzers),
    tokenizers: convertTokenizersToPublic(generatedIndex.tokenizers),
    tokenFilters: generatedIndex.tokenFilters as TokenFilter[],
    charFilters: generatedIndex.charFilters as CharFilter[],
    scoringProfiles: generatedIndex.scoringProfiles as ScoringProfile[],
    fields: convertFieldsToPublic(generatedIndex.fields),
    similarity: convertSimilarityToPublic(generatedIndex.similarity),
    semanticSearch: generatedIndex.semanticSearch,
    vectorSearch: generatedVectorSearchToPublicVectorSearch(generatedIndex.vectorSearch),
  };
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
        _captions: captions,
        ...restProps
      } = result;
      const obj = {
        score,
        highlights,
        rerankerScore,
        captions,
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
    fields: convertFieldsToGenerated(fields),
    similarity: convertSimilarityToGenerated(similarity),
  };
}

export function generatedSkillsetToPublicSkillset(
  generatedSkillset: GeneratedSearchIndexerSkillset,
): SearchIndexerSkillset {
  const { skills, cognitiveServicesAccount, encryptionKey, ...props } = generatedSkillset;
  return {
    ...props,
    skills: convertSkillsToPublic(skills),
    cognitiveServicesAccount: convertCognitiveServicesAccountToPublic(cognitiveServicesAccount),
    encryptionKey: convertEncryptionKeyToPublic(encryptionKey),
  };
}

export function publicSkillsetToGeneratedSkillset(
  skillset: SearchIndexerSkillset,
): GeneratedSearchIndexerSkillset {
  return {
    name: skillset.name,
    description: skillset.description,
    etag: skillset.etag,
    skills: skillset.skills,
    cognitiveServicesAccount: convertCognitiveServicesAccountToGenerated(
      skillset.cognitiveServicesAccount,
    ),
    knowledgeStore: skillset.knowledgeStore,
    encryptionKey: convertEncryptionKeyToGenerated(skillset.encryptionKey),
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
