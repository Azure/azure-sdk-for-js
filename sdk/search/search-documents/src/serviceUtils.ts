// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BM25Similarity,
  ClassicSimilarity,
  CognitiveServicesAccountKey,
  CognitiveServicesAccountUnion,
  ConditionalSkill,
  CustomAnalyzer,
  CustomEntityLookupSkill,
  DataChangeDetectionPolicyUnion,
  DataDeletionDetectionPolicyUnion,
  DefaultCognitiveServicesAccount,
  DocumentExtractionSkill,
  EntityRecognitionSkill,
  PatternAnalyzer as GeneratedPatternAnalyzer,
  SearchField as GeneratedSearchField,
  SearchIndex as GeneratedSearchIndex,
  SearchIndexer as GeneratedSearchIndexer,
  SearchIndexerDataSource as GeneratedSearchIndexerDataSourceConnection,
  SearchIndexerSkillset as GeneratedSearchIndexerSkillset,
  SearchResourceEncryptionKey as GeneratedSearchResourceEncryptionKey,
  SynonymMap as GeneratedSynonymMap,
  HighWaterMarkChangeDetectionPolicy,
  ImageAnalysisSkill,
  KeyPhraseExtractionSkill,
  LanguageDetectionSkill,
  LexicalAnalyzerName,
  LexicalAnalyzerUnion,
  LexicalTokenizerUnion,
  LuceneStandardAnalyzer,
  MergeSkill,
  OcrSkill,
  PatternTokenizer,
  RegexFlags,
  SearchIndexerSkillUnion,
  SentimentSkill,
  ShaperSkill,
  SimilarityUnion,
  SoftDeleteColumnDeletionDetectionPolicy,
  SplitSkill,
  SqlIntegratedChangeTrackingPolicy,
  StopAnalyzer,
  TextTranslationSkill,
  TokenFilterUnion,
  WebApiSkill,
} from "./generated/service/models";
import {
  CharFilter,
  CognitiveServicesAccount,
  ComplexField,
  DataChangeDetectionPolicy,
  DataDeletionDetectionPolicy,
  LexicalAnalyzer,
  LexicalTokenizer,
  PatternAnalyzer,
  ScoringProfile,
  SearchField,
  SearchFieldDataType,
  SearchIndex,
  SearchIndexer,
  SearchIndexerDataSourceConnection,
  SearchIndexerSkill,
  SearchIndexerSkillset,
  SearchResourceEncryptionKey,
  SimilarityAlgorithm,
  SimpleField,
  SynonymMap,
  TokenFilter,
  isComplexField,
} from "./serviceModels";
import { SearchResult, SuggestDocumentsResult, SuggestResult } from "./indexModels";
import {
  SearchResult as GeneratedSearchResult,
  SuggestDocumentsResult as GeneratedSuggestDocumentsResult,
} from "./generated/data/models";

export function convertSkillsToPublic(skills: SearchIndexerSkillUnion[]): SearchIndexerSkill[] {
  if (!skills) {
    return skills;
  }

  const result: SearchIndexerSkill[] = [];
  for (const skill of skills) {
    switch (skill.odatatype) {
      case "#Microsoft.Skills.Util.ConditionalSkill":
        result.push(skill as ConditionalSkill);
        break;
      case "#Microsoft.Skills.Text.KeyPhraseExtractionSkill":
        result.push(skill as KeyPhraseExtractionSkill);
        break;
      case "#Microsoft.Skills.Vision.OcrSkill":
        result.push(skill as OcrSkill);
        break;
      case "#Microsoft.Skills.Vision.ImageAnalysisSkill":
        result.push(skill as ImageAnalysisSkill);
        break;
      case "#Microsoft.Skills.Text.LanguageDetectionSkill":
        result.push(skill as LanguageDetectionSkill);
        break;
      case "#Microsoft.Skills.Util.ShaperSkill":
        result.push(skill as ShaperSkill);
        break;
      case "#Microsoft.Skills.Text.MergeSkill":
        result.push(skill as MergeSkill);
        break;
      case "#Microsoft.Skills.Text.EntityRecognitionSkill":
        result.push(skill as EntityRecognitionSkill);
        break;
      case "#Microsoft.Skills.Text.SentimentSkill":
        result.push(skill as SentimentSkill);
        break;
      case "#Microsoft.Skills.Text.SplitSkill":
        result.push(skill as SplitSkill);
        break;
      case "#Microsoft.Skills.Text.TranslationSkill":
        result.push(skill as TextTranslationSkill);
        break;
      case "#Microsoft.Skills.Custom.WebApiSkill":
        result.push(skill as WebApiSkill);
        break;
      case "#Microsoft.Skills.Text.CustomEntityLookupSkill":
        result.push(skill as CustomEntityLookupSkill);
        break;
      case "#Microsoft.Skills.Util.DocumentExtractionSkill":
        result.push(skill as DocumentExtractionSkill);
        break;
    }
  }
  return result;
}

export function convertCognitiveServicesAccountToGenerated(
  cognitiveServicesAccount?: CognitiveServicesAccount
): CognitiveServicesAccountUnion | undefined {
  if (!cognitiveServicesAccount) {
    return cognitiveServicesAccount;
  }

  return cognitiveServicesAccount as CognitiveServicesAccountUnion;
}

export function convertCognitiveServicesAccountToPublic(
  cognitiveServicesAccount?: CognitiveServicesAccountUnion
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
  tokenFilters?: TokenFilter[]
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

export function convertAnalyzersToGenerated(
  analyzers?: LexicalAnalyzer[]
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

export function convertAnalyzersToPublic(
  analyzers?: LexicalAnalyzerUnion[]
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
        result.push({
          ...analyzer,
          tokenizerName: (analyzer as CustomAnalyzer).tokenizerName,
        } as CustomAnalyzer);
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
      const { synonymMaps, retrievable, ...restField } = field;

      const type: SearchFieldDataType = field.type as SearchFieldDataType;
      const hidden = typeof retrievable === "boolean" ? !retrievable : retrievable;
      const analyzerName = field.analyzer as LexicalAnalyzerName | undefined;
      const searchAnalyzerName = field.searchAnalyzer as LexicalAnalyzerName | undefined;
      const indexAnalyzerName = field.indexAnalyzer as LexicalAnalyzerName | undefined;

      const result: SimpleField = {
        ...restField,
        type,
        hidden,
        analyzerName,
        searchAnalyzerName,
        indexAnalyzerName,
        synonymMapNames: synonymMaps,
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
      };
    }
  });
}

export function convertTokenizersToGenerated(
  tokenizers?: LexicalTokenizer[]
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

export function convertTokenizersToPublic(
  tokenizers?: LexicalTokenizerUnion[]
): LexicalTokenizer[] | undefined {
  if (!tokenizers) {
    return tokenizers;
  }

  const result: LexicalTokenizer[] = [];
  for (const tokenizer of tokenizers) {
    if (tokenizer.odatatype === "#Microsoft.Azure.Search.PatternTokenizer") {
      result.push({
        ...tokenizer,
        flags: (tokenizer as PatternTokenizer).flags
          ? ((tokenizer as PatternTokenizer).flags!.split("|") as RegexFlags[])
          : undefined,
      });
    } else {
      result.push(tokenizer);
    }
  }
  return result;
}

export function convertSimilarityToGenerated(
  similarity?: SimilarityAlgorithm
): SimilarityUnion | undefined {
  if (!similarity) {
    return similarity;
  }

  return similarity as SimilarityUnion;
}

export function convertSimilarityToPublic(
  similarity?: SimilarityUnion
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

export function convertEncryptionKeyToPublic(
  encryptionKey?: GeneratedSearchResourceEncryptionKey | null
): SearchResourceEncryptionKey | null | undefined {
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

export function convertEncryptionKeyToGenerated(
  encryptionKey?: SearchResourceEncryptionKey | null
): GeneratedSearchResourceEncryptionKey | null | undefined {
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
  };
}

export function generatedSearchResultToPublicSearchResult<T>(
  results: GeneratedSearchResult[]
): SearchResult<T>[] {
  const returnValues: SearchResult<T>[] = results.map<SearchResult<T>>((result) => {
    const { _score, _highlights, rerankerScore, captions, ...restProps } = result;
    const doc: { [key: string]: any } = {
      ...restProps,
    };
    const obj = {
      score: _score,
      highlights: _highlights,
      rerankerScore,
      captions,
      document: doc,
    };
    return obj as unknown as SearchResult<T>;
  });
  return returnValues;
}

export function generatedSuggestDocumentsResultToPublicSuggestDocumentsResult<T>(
  searchDocumentsResult: GeneratedSuggestDocumentsResult
): SuggestDocumentsResult<T> {
  const results = searchDocumentsResult.results.map<SuggestResult<T>>((element) => {
    const { _text, ...restProps } = element;

    const doc: { [key: string]: any } = {
      ...restProps,
    };

    const obj = {
      text: _text,
      document: doc,
    };

    return obj as SuggestResult<T>;
  });

  const result: SuggestDocumentsResult<T> = {
    results: results,
    coverage: searchDocumentsResult.coverage,
  };

  return result;
}

export function publicIndexToGeneratedIndex(index: SearchIndex): GeneratedSearchIndex {
  const { encryptionKey, tokenFilters, analyzers, tokenizers, fields, similarity, ...props } =
    index;

  return {
    ...props,
    encryptionKey: convertEncryptionKeyToGenerated(encryptionKey),
    tokenFilters: convertTokenFiltersToGenerated(tokenFilters),
    analyzers: convertAnalyzersToGenerated(analyzers),
    tokenizers: convertTokenizersToGenerated(tokenizers),
    fields: convertFieldsToGenerated(fields),
    similarity: convertSimilarityToGenerated(similarity),
  };
}

export function generatedSkillsetToPublicSkillset(
  generatedSkillset: GeneratedSearchIndexerSkillset
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
  skillset: SearchIndexerSkillset
): GeneratedSearchIndexerSkillset {
  return {
    name: skillset.name,
    description: skillset.description,
    etag: skillset.etag,
    skills: skillset.skills,
    cognitiveServicesAccount: convertCognitiveServicesAccountToGenerated(
      skillset.cognitiveServicesAccount
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
  indexer: SearchIndexer
): GeneratedSearchIndexer {
  return {
    ...indexer,
    encryptionKey: convertEncryptionKeyToGenerated(indexer.encryptionKey),
  };
}

export function generatedSearchIndexerToPublicSearchIndexer(
  indexer: GeneratedSearchIndexer
): SearchIndexer {
  const { encryptionKey, ...props } = indexer;

  return {
    ...props,
    encryptionKey: convertEncryptionKeyToPublic(indexer.encryptionKey),
  };
}

export function publicDataSourceToGeneratedDataSource(
  dataSource: SearchIndexerDataSourceConnection
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
  dataSource: GeneratedSearchIndexerDataSourceConnection
): SearchIndexerDataSourceConnection {
  return {
    name: dataSource.name,
    description: dataSource.name,
    type: dataSource.type,
    connectionString: dataSource.credentials.connectionString,
    container: dataSource.container,
    etag: dataSource.etag,
    dataChangeDetectionPolicy: convertDataChangeDetectionPolicyToPublic(
      dataSource.dataChangeDetectionPolicy
    ),
    dataDeletionDetectionPolicy: convertDataDeletionDetectionPolicyToPublic(
      dataSource.dataDeletionDetectionPolicy
    ),
    encryptionKey: convertEncryptionKeyToPublic(dataSource.encryptionKey),
  };
}

export function convertDataChangeDetectionPolicyToPublic(
  dataChangeDetectionPolicy?: DataChangeDetectionPolicyUnion | null
): DataChangeDetectionPolicy | null | undefined {
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
  dataDeletionDetectionPolicy?: DataDeletionDetectionPolicyUnion | null
): DataDeletionDetectionPolicy | null | undefined {
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

/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 * @param timeInMs - The number of milliseconds to be delayed.
 * @returns Promise that is resolved after timeInMs
 */
export function delay(timeInMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), timeInMs));
}

export const serviceVersions = ["2020-06-30"];

export const defaultServiceVersion = "2020-06-30";
