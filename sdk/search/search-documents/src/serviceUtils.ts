// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import {
  LexicalAnalyzerUnion,
  CognitiveServicesAccountKey,
  CognitiveServicesAccountUnion,
  DefaultCognitiveServicesAccount,
  SearchField as GeneratedSearchField,
  SearchIndex as GeneratedIndex,
  RegexFlags,
  SearchIndexerSkillset as GeneratedSearchIndexerSkillset,
  SearchIndexerSkillUnion,
  LexicalTokenizerUnion,
  SynonymMap as GeneratedSynonymMap,
  SearchIndexerDataSource as GeneratedSearchIndexerDataSource,
  DataChangeDetectionPolicyUnion,
  HighWaterMarkChangeDetectionPolicy,
  SqlIntegratedChangeTrackingPolicy,
  DataDeletionDetectionPolicyUnion,
  SoftDeleteColumnDeletionDetectionPolicy
} from "./generated/service/models";
import {
  LexicalAnalyzer,
  CharFilter,
  CognitiveServicesAccount,
  ComplexField,
  SearchField,
  SearchIndex,
  isComplexField,
  ScoringProfile,
  SimpleField,
  SearchIndexerSkill,
  SearchIndexerSkillset,
  TokenFilter,
  LexicalTokenizer,
  SynonymMap,
  SearchIndexerDataSource,
  DataChangeDetectionPolicy,
  DataDeletionDetectionPolicy
} from "./serviceModels";

export function convertSearchIndexerSkillsToPublic(
  searchIndexerSkills: SearchIndexerSkillUnion[]
): SearchIndexerSkill[] {
  if (!searchIndexerSkills) {
    return searchIndexerSkills;
  }

  const result: SearchIndexerSkill[] = [];
  for (const searchIndexerSkill of searchIndexerSkills) {
    if (searchIndexerSkill.odatatype !== "SearchIndexerSkill") {
      result.push(searchIndexerSkill);
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

export function convertLexicalAnalyzersToGenerated(
  lexicalAnalyzers?: LexicalAnalyzer[]
): LexicalAnalyzerUnion[] | undefined {
  if (!lexicalAnalyzers) {
    return lexicalAnalyzers;
  }

  const result: LexicalAnalyzerUnion[] = [];
  for (const lexicalAnalyzer of lexicalAnalyzers) {
    switch (lexicalAnalyzer.odatatype) {
      case "#Microsoft.Azure.Search.CustomAnalyzer":
      case "#Microsoft.Azure.Search.StandardAnalyzer":
      case "#Microsoft.Azure.Search.StopAnalyzer":
        result.push(lexicalAnalyzer);
        break;
      case "#Microsoft.Azure.Search.PatternAnalyzer":
        result.push({
          ...lexicalAnalyzer,
          flags: lexicalAnalyzer.flags ? lexicalAnalyzer.flags.join("|") : undefined
        });
    }
  }
  return result;
}

export function convertLexicalAnalyzersToPublic(
  lexicalAnalyzers?: LexicalAnalyzerUnion[]
): LexicalAnalyzer[] | undefined {
  if (!lexicalAnalyzers) {
    return lexicalAnalyzers;
  }

  const result: LexicalAnalyzer[] = [];
  for (const lexicalAnalyzer of lexicalAnalyzers) {
    switch (lexicalAnalyzer.odatatype) {
      case "#Microsoft.Azure.Search.CustomAnalyzer":
      case "#Microsoft.Azure.Search.StandardAnalyzer":
      case "#Microsoft.Azure.Search.StopAnalyzer":
        result.push(lexicalAnalyzer);
        break;
      case "#Microsoft.Azure.Search.PatternAnalyzer":
        result.push({
          ...lexicalAnalyzer,
          flags: lexicalAnalyzer.flags
            ? (lexicalAnalyzer.flags.split("|") as RegexFlags[])
            : undefined
        });
    }
  }
  return result;
}

export function convertSearchFieldsToPublic(searchFields: GeneratedSearchField[]): SearchField[] {
  if (!searchFields) {
    return searchFields;
  }

  return searchFields.map<SearchField>((field) => {
    let result: SearchField;
    if (field.type === "Edm.ComplexType") {
      result = field as ComplexField;
    } else {
      const { retrievable, ...restField } = field;
      const hidden = typeof retrievable === "boolean" ? !retrievable : retrievable;
      result = {
        ...restField,
        hidden
      } as SimpleField;
    }
    return result;
  });
}

export function convertFieldsToGenerated(fields: SearchField[]): GeneratedSearchField[] {
  return fields.map<GeneratedSearchField>((field) => {
    if (isComplexField(field)) {
      return field;
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
        sortable: field.sortable ?? false
      };
    }
  });
}

export function convertLexicalTokenizersToGenerated(
  lexicalTokenizers?: LexicalTokenizer[]
): LexicalTokenizerUnion[] | undefined {
  if (!lexicalTokenizers) {
    return lexicalTokenizers;
  }

  const result: LexicalTokenizerUnion[] = [];
  for (const lexicalTokenizer of lexicalTokenizers) {
    if (lexicalTokenizer.odatatype === "#Microsoft.Azure.Search.PatternTokenizer") {
      result.push({
        ...lexicalTokenizer,
        flags: lexicalTokenizer.flags ? lexicalTokenizer.flags.join("|") : undefined
      });
    } else {
      result.push(lexicalTokenizer);
    }
  }
  return result;
}

export function convertLexicalTokenizersToPublic(
  lexicalTokenizers?: LexicalTokenizerUnion[]
): LexicalTokenizer[] | undefined {
  if (!lexicalTokenizers) {
    return lexicalTokenizers;
  }

  const result: LexicalTokenizer[] = [];
  for (const lexicalTokenizer of lexicalTokenizers) {
    if (lexicalTokenizer.odatatype === "#Microsoft.Azure.Search.PatternTokenizer") {
      result.push({
        ...lexicalTokenizer,
        flags: lexicalTokenizer.flags
          ? (lexicalTokenizer.flags.split("|") as RegexFlags[])
          : undefined
      });
    } else if (lexicalTokenizer.odatatype !== "LexicalTokenizer") {
      result.push(lexicalTokenizer);
    }
  }
  return result;
}

export function extractOperationOptions<T extends OperationOptions>(
  obj: T
): {
  operationOptions: OperationOptions;
  restOptions: Pick<T, Exclude<keyof T, keyof OperationOptions>>;
} {
  const { abortSignal, requestOptions, tracingOptions, ...restOptions } = obj;

  return {
    operationOptions: {
      abortSignal,
      requestOptions,
      tracingOptions
    },
    restOptions
  };
}

export function generatedSearchIndexToPublicSearchIndex(
  generatedIndex: GeneratedIndex
): SearchIndex {
  return {
    name: generatedIndex.name,
    defaultScoringProfile: generatedIndex.defaultScoringProfile,
    corsOptions: generatedIndex.corsOptions,
    suggesters: generatedIndex.suggesters,
    encryptionKey: generatedIndex.encryptionKey,
    etag: generatedIndex.etag,
    analyzers: convertLexicalAnalyzersToPublic(generatedIndex.analyzers),
    tokenizers: convertLexicalTokenizersToPublic(generatedIndex.tokenizers),
    tokenFilters: generatedIndex.tokenFilters as TokenFilter[],
    charFilters: generatedIndex.charFilters as CharFilter[],
    scoringProfiles: generatedIndex.scoringProfiles as ScoringProfile[],
    fields: convertSearchFieldsToPublic(generatedIndex.fields)
  };
}

export function publicSearchIndexToGeneratedSearchIndex(searchIndex: SearchIndex): GeneratedIndex {
  return {
    name: searchIndex.name,
    defaultScoringProfile: searchIndex.defaultScoringProfile,
    corsOptions: searchIndex.corsOptions,
    suggesters: searchIndex.suggesters,
    encryptionKey: searchIndex.encryptionKey,
    etag: searchIndex.etag,
    tokenFilters: searchIndex.tokenFilters,
    charFilters: searchIndex.charFilters,
    scoringProfiles: searchIndex.scoringProfiles,
    analyzers: convertLexicalAnalyzersToGenerated(searchIndex.analyzers),
    tokenizers: convertLexicalTokenizersToGenerated(searchIndex.tokenizers),
    fields: convertFieldsToGenerated(searchIndex.fields)
  };
}

export function generatedSearchIndexerSkillsetToPublicSearchIndexerSkillset(
  generatedSkillset: GeneratedSearchIndexerSkillset
): SearchIndexerSkillset {
  return {
    name: generatedSkillset.name,
    description: generatedSkillset.description,
    skills: convertSearchIndexerSkillsToPublic(generatedSkillset.skills),
    cognitiveServicesAccount: convertCognitiveServicesAccountToPublic(
      generatedSkillset.cognitiveServicesAccount
    ),
    etag: generatedSkillset.etag
  };
}

export function publicSearchIndexerSkillsetToGeneratedSearchIndexerSkillset(
  searchIndexerSkillset: SearchIndexerSkillset
): GeneratedSearchIndexerSkillset {
  return {
    name: searchIndexerSkillset.name,
    description: searchIndexerSkillset.description,
    etag: searchIndexerSkillset.etag,
    skills: searchIndexerSkillset.skills,
    cognitiveServicesAccount: convertCognitiveServicesAccountToGenerated(
      searchIndexerSkillset.cognitiveServicesAccount
    )
  };
}

export function generatedSynonymMapToPublicSynonymMap(synonymMap: GeneratedSynonymMap): SynonymMap {
  const result: SynonymMap = {
    name: synonymMap.name,
    encryptionKey: synonymMap.encryptionKey,
    etag: synonymMap.etag,
    synonyms: []
  };

  if (synonymMap.synonyms) {
    result.synonyms = synonymMap.synonyms.split("\n");
  }

  return result;
}

export function publicSynonymMapToGeneratedSynonymMap(synonymMap: SynonymMap): GeneratedSynonymMap {
  return {
    name: synonymMap.name,
    encryptionKey: synonymMap.encryptionKey,
    etag: synonymMap.etag,
    synonyms: synonymMap.synonyms.join("\n")
  };
}

export function generatedSearchIndexerDataSourceToPublicSearchIndexerDataSource(
  searchIndexerdataSource: GeneratedSearchIndexerDataSource
): SearchIndexerDataSource {
  return {
    name: searchIndexerdataSource.name,
    description: searchIndexerdataSource.name,
    type: searchIndexerdataSource.type,
    connectionString: searchIndexerdataSource.connectionString,
    container: searchIndexerdataSource.container,
    etag: searchIndexerdataSource.etag,
    dataChangeDetectionPolicy: convertDataChangeDetectionPolicyToPublic(
      searchIndexerdataSource.dataChangeDetectionPolicy
    ),
    dataDeletionDetectionPolicy: convertDataDeletionDetectionPolicyToPublic(
      searchIndexerdataSource.dataDeletionDetectionPolicy
    )
  };
}

export function convertDataChangeDetectionPolicyToPublic(
  dataChangeDetectionPolicy?: DataChangeDetectionPolicyUnion
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
  dataDeletionDetectionPolicy?: DataDeletionDetectionPolicyUnion
): DataDeletionDetectionPolicy | undefined {
  if (!dataDeletionDetectionPolicy) {
    return dataDeletionDetectionPolicy;
  }

  return dataDeletionDetectionPolicy as SoftDeleteColumnDeletionDetectionPolicy;
}
