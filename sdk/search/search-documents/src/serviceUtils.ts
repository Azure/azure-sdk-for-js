// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import {
  AnalyzerUnion,
  CognitiveServicesAccountKey,
  CognitiveServicesAccountUnion,
  DefaultCognitiveServicesAccount,
  Field as GeneratedField,
  Index as GeneratedIndex,
  RegexFlags,
  Skillset as GeneratedSkillset,
  SkillUnion,
  TokenizerUnion,
  SynonymMap as GeneratedSynonymMap,
  DataSource as GeneratedDataSource,
  DataChangeDetectionPolicyUnion,
  HighWaterMarkChangeDetectionPolicy,
  SqlIntegratedChangeTrackingPolicy,
  DataDeletionDetectionPolicyUnion,
  SoftDeleteColumnDeletionDetectionPolicy
} from "./generated/service/models";
import {
  Analyzer,
  CharFilter,
  CognitiveServicesAccount,
  ComplexField,
  Field,
  Index,
  isComplexField,
  ScoringProfile,
  SimpleField,
  Skill,
  Skillset,
  TokenFilter,
  Tokenizer,
  SynonymMap,
  DataSource,
  DataChangeDetectionPolicy,
  DataDeletionDetectionPolicy
} from "./serviceModels";

export function convertSkillsToPublic(skills: SkillUnion[]): Skill[] {
  if (!skills) {
    return skills;
  }

  const result: Skill[] = [];
  for (const skill of skills) {
    if (skill.odatatype !== "Skill") {
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

export function convertAnalyzersToGenerated(analyzers?: Analyzer[]): AnalyzerUnion[] | undefined {
  if (!analyzers) {
    return analyzers;
  }

  const result: AnalyzerUnion[] = [];
  for (const analyzer of analyzers) {
    switch (analyzer.odatatype) {
      case "#Microsoft.Azure.Search.CustomAnalyzer":
      case "#Microsoft.Azure.Search.StandardAnalyzer":
      case "#Microsoft.Azure.Search.StopAnalyzer":
        result.push(analyzer);
        break;
      case "#Microsoft.Azure.Search.PatternAnalyzer":
        result.push({
          ...analyzer,
          flags: analyzer.flags ? analyzer.flags.join("|") : undefined
        });
    }
  }
  return result;
}

export function convertAnalyzersToPublic(analyzers?: AnalyzerUnion[]): Analyzer[] | undefined {
  if (!analyzers) {
    return analyzers;
  }

  const result: Analyzer[] = [];
  for (const analyzer of analyzers) {
    switch (analyzer.odatatype) {
      case "#Microsoft.Azure.Search.CustomAnalyzer":
      case "#Microsoft.Azure.Search.StandardAnalyzer":
      case "#Microsoft.Azure.Search.StopAnalyzer":
        result.push(analyzer);
        break;
      case "#Microsoft.Azure.Search.PatternAnalyzer":
        result.push({
          ...analyzer,
          flags: analyzer.flags ? (analyzer.flags.split("|") as RegexFlags[]) : undefined
        });
    }
  }
  return result;
}

export function convertFieldsToPublic(fields: GeneratedField[]): Field[] {
  if (!fields) {
    return fields;
  }

  return fields.map<Field>((field) => {
    let result: Field;
    if (field.type === "Collection(Edm.ComplexType)" || field.type === "Edm.ComplexType") {
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

export function convertFieldsToGenerated(fields: Field[]): GeneratedField[] {
  return fields.map<GeneratedField>((field) => {
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

export function convertTokenizersToGenerated(
  tokenizers?: Tokenizer[]
): TokenizerUnion[] | undefined {
  if (!tokenizers) {
    return tokenizers;
  }

  const result: TokenizerUnion[] = [];
  for (const tokenizer of tokenizers) {
    if (tokenizer.odatatype === "#Microsoft.Azure.Search.PatternTokenizer") {
      result.push({
        ...tokenizer,
        flags: tokenizer.flags ? tokenizer.flags.join("|") : undefined
      });
    } else {
      result.push(tokenizer);
    }
  }
  return result;
}

export function convertTokenizersToPublic(tokenizers?: TokenizerUnion[]): Tokenizer[] | undefined {
  if (!tokenizers) {
    return tokenizers;
  }

  const result: Tokenizer[] = [];
  for (const tokenizer of tokenizers) {
    if (tokenizer.odatatype === "#Microsoft.Azure.Search.PatternTokenizer") {
      result.push({
        ...tokenizer,
        flags: tokenizer.flags ? (tokenizer.flags.split("|") as RegexFlags[]) : undefined
      });
    } else if (tokenizer.odatatype !== "Tokenizer") {
      result.push(tokenizer);
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

export function generatedIndexToPublicIndex(generatedIndex: GeneratedIndex): Index {
  return {
    name: generatedIndex.name,
    defaultScoringProfile: generatedIndex.defaultScoringProfile,
    corsOptions: generatedIndex.corsOptions,
    suggesters: generatedIndex.suggesters,
    encryptionKey: generatedIndex.encryptionKey,
    etag: generatedIndex.etag,
    analyzers: convertAnalyzersToPublic(generatedIndex.analyzers),
    tokenizers: convertTokenizersToPublic(generatedIndex.tokenizers),
    tokenFilters: generatedIndex.tokenFilters as TokenFilter[],
    charFilters: generatedIndex.charFilters as CharFilter[],
    scoringProfiles: generatedIndex.scoringProfiles as ScoringProfile[],
    fields: convertFieldsToPublic(generatedIndex.fields)
  };
}

export function publicIndexToGeneratedIndex(index: Index): GeneratedIndex {
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
    analyzers: convertAnalyzersToGenerated(index.analyzers),
    tokenizers: convertTokenizersToGenerated(index.tokenizers),
    fields: convertFieldsToGenerated(index.fields)
  };
}

export function generatedSkillsetToPublicSkillset(generatedSkillset: GeneratedSkillset): Skillset {
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

export function publicSkillsetToGeneratedSkillset(skillset: Skillset): GeneratedSkillset {
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

export function generatedDataSourceToPublicDataSource(dataSource: GeneratedDataSource): DataSource {
  return {
    name: dataSource.name,
    description: dataSource.name,
    type: dataSource.type,
    credentials: dataSource.credentials,
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
