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

export function convertSkillsToPublic(skills: SearchIndexerSkillUnion[]): SearchIndexerSkill[] {
  if (!skills) {
    return skills;
  }

  const result: SearchIndexerSkill[] = [];
  for (const skill of skills) {
    if (skill.odatatype !== "SearchIndexerSkill") {
      result.push(skill);
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

export function convertFieldsToPublic(searchFields: GeneratedSearchField[]): SearchField[] {
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

export function generatedIndexToPublicIndex(generatedIndex: GeneratedIndex): SearchIndex {
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
    fields: convertFieldsToPublic(generatedIndex.fields)
  };
}

export function publicIndexToGeneratedIndex(index: SearchIndex): GeneratedIndex {
  return {
    name: index.name,
    defaultScoringProfile: index.defaultScoringProfile,
    corsOptions: index.corsOptions,
    suggesters: index.suggesters,
    encryptionKey: index.encryptionKey,
    etag: index.etag,
    tokenFilters: index.tokenFilters,
    charFilters: index.charFilters,
    scoringProfiles: index.scoringProfiles,
    analyzers: convertLexicalAnalyzersToGenerated(index.analyzers),
    tokenizers: convertLexicalTokenizersToGenerated(index.tokenizers),
    fields: convertFieldsToGenerated(index.fields)
  };
}

export function generatedSkillsetToPublicSkillset(
  generatedSkillset: GeneratedSearchIndexerSkillset
): SearchIndexerSkillset {
  return {
    name: generatedSkillset.name,
    description: generatedSkillset.description,
    skills: convertSkillsToPublic(generatedSkillset.skills),
    cognitiveServicesAccount: convertCognitiveServicesAccountToPublic(
      generatedSkillset.cognitiveServicesAccount
    ),
    etag: generatedSkillset.etag
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

export function generatedDataSourceToPublicDataSource(
  dataSource: GeneratedSearchIndexerDataSource
): SearchIndexerDataSource {
  return {
    name: dataSource.name,
    description: dataSource.name,
    type: dataSource.type,
    connectionString: dataSource.connectionString,
    container: dataSource.container,
    etag: dataSource.etag,
    dataChangeDetectionPolicy: convertDataChangeDetectionPolicyToPublic(
      dataSource.dataChangeDetectionPolicy
    ),
    dataDeletionDetectionPolicy: convertDataDeletionDetectionPolicyToPublic(
      dataSource.dataDeletionDetectionPolicy
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
