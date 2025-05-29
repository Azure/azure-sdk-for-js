// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __rest } from "tslib";
import { logger } from "./logger.js";
import { isComplexField } from "./serviceModels.js";
export const defaultServiceVersion = "2024-09-01-Preview";
const knownSkills = {
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
export function convertSkillsToPublic(skills) {
    if (!skills) {
        return skills;
    }
    // This validation has already GAed
    return skills.filter((skill) => knownSkills[skill.odatatype]);
}
export function convertCognitiveServicesAccountToGenerated(cognitiveServicesAccount) {
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
            logger.warning(`Unsupported Cognitive Services account odatatype: ${cognitiveServicesAccount.odatatype}`);
            return cognitiveServicesAccount;
        }
    }
}
export function convertCognitiveServicesAccountToPublic(cognitiveServicesAccount) {
    var _a;
    if (!cognitiveServicesAccount) {
        return cognitiveServicesAccount;
    }
    const deserializers = {
        "#Microsoft.Azure.Search.DefaultCognitiveServices": () => {
            return cognitiveServicesAccount;
        },
        "#Microsoft.Azure.Search.CognitiveServicesByKey": () => {
            return cognitiveServicesAccount;
        },
        "#Microsoft.Azure.Search.AIServicesByKey": () => {
            return cognitiveServicesAccount;
        },
        "#Microsoft.Azure.Search.AIServicesByIdentity": () => {
            const _a = cognitiveServicesAccount, { identity } = _a, restParams = __rest(_a, ["identity"]);
            return Object.assign(Object.assign({}, restParams), { identity: convertSearchIndexerDataIdentityToPublic(identity !== null && identity !== void 0 ? identity : undefined) });
        },
    };
    const defaultDeserializer = () => {
        logger.warning(`Unsupported Cognitive Services account odatatype: ${cognitiveServicesAccount.odatatype}`);
        return cognitiveServicesAccount;
    };
    return ((_a = deserializers[cognitiveServicesAccount.odatatype]) !== null && _a !== void 0 ? _a : defaultDeserializer)();
}
export function convertTokenFiltersToGenerated(tokenFilters) {
    if (!tokenFilters) {
        return tokenFilters;
    }
    const result = [];
    for (const filter of tokenFilters) {
        result.push(filter);
    }
    return result;
}
function convertAnalyzersToGenerated(analyzers) {
    if (!analyzers) {
        return analyzers;
    }
    const result = [];
    for (const analyzer of analyzers) {
        switch (analyzer.odatatype) {
            case "#Microsoft.Azure.Search.StandardAnalyzer":
            case "#Microsoft.Azure.Search.StopAnalyzer":
                result.push(analyzer);
                break;
            case "#Microsoft.Azure.Search.PatternAnalyzer":
                result.push(Object.assign(Object.assign({}, analyzer), { flags: analyzer.flags ? analyzer.flags.join("|") : undefined }));
                break;
            case "#Microsoft.Azure.Search.CustomAnalyzer":
                result.push(Object.assign(Object.assign({}, analyzer), { tokenizerName: analyzer.tokenizerName }));
                break;
        }
    }
    return result;
}
function convertAnalyzersToPublic(analyzers) {
    if (!analyzers) {
        return analyzers;
    }
    const result = [];
    for (const analyzer of analyzers) {
        switch (analyzer.odatatype) {
            case "#Microsoft.Azure.Search.StandardAnalyzer":
                result.push(analyzer);
                break;
            case "#Microsoft.Azure.Search.StopAnalyzer":
                result.push(analyzer);
                break;
            case "#Microsoft.Azure.Search.PatternAnalyzer":
                result.push(Object.assign(Object.assign({}, analyzer), { flags: analyzer.flags
                        ? analyzer.flags.split("|")
                        : undefined }));
                break;
            case "#Microsoft.Azure.Search.CustomAnalyzer":
                result.push(analyzer);
                break;
        }
    }
    return result;
}
export function convertFieldsToPublic(fields) {
    if (!fields) {
        return fields;
    }
    return fields.map((field) => {
        if (field.type === "Collection(Edm.ComplexType)" || field.type === "Edm.ComplexType") {
            const result = {
                name: field.name,
                type: field.type,
                fields: convertFieldsToPublic(field.fields),
            };
            return result;
        }
        else {
            const type = field.type;
            const synonymMapNames = field.synonymMaps;
            const { retrievable, analyzer, searchAnalyzer, indexAnalyzer, normalizer } = field, restField = __rest(field, ["retrievable", "analyzer", "searchAnalyzer", "indexAnalyzer", "normalizer"]);
            const hidden = typeof retrievable === "boolean" ? !retrievable : retrievable;
            const result = Object.assign(Object.assign({}, restField), { type,
                hidden, analyzerName: analyzer, searchAnalyzerName: searchAnalyzer, indexAnalyzerName: indexAnalyzer, normalizerName: normalizer, synonymMapNames });
            return result;
        }
    });
}
export function convertFieldsToGenerated(fields) {
    return fields === null || fields === void 0 ? void 0 : fields.map((field) => {
        var _a, _b, _c, _d;
        if (isComplexField(field)) {
            return {
                name: field.name,
                type: field.type,
                fields: convertFieldsToGenerated(field.fields),
            };
        }
        else {
            const { hidden } = field, restField = __rest(field, ["hidden"]);
            const retrievable = typeof hidden === "boolean" ? !hidden : hidden;
            return Object.assign(Object.assign({}, restField), { retrievable, 
                // modify API defaults to use less storage for simple types
                searchable: (_a = field.searchable) !== null && _a !== void 0 ? _a : false, filterable: (_b = field.filterable) !== null && _b !== void 0 ? _b : false, facetable: (_c = field.facetable) !== null && _c !== void 0 ? _c : false, sortable: (_d = field.sortable) !== null && _d !== void 0 ? _d : false, analyzer: field.analyzerName, searchAnalyzer: field.searchAnalyzerName, indexAnalyzer: field.indexAnalyzerName, synonymMaps: field.synonymMapNames, normalizer: field.normalizerName });
        }
    });
}
function convertTokenizersToGenerated(tokenizers) {
    if (!tokenizers) {
        return tokenizers;
    }
    const result = [];
    for (const tokenizer of tokenizers) {
        if (tokenizer.odatatype === "#Microsoft.Azure.Search.PatternTokenizer") {
            result.push(Object.assign(Object.assign({}, tokenizer), { flags: tokenizer.flags ? tokenizer.flags.join("|") : undefined }));
        }
        else {
            result.push(tokenizer);
        }
    }
    return result;
}
function convertTokenizersToPublic(tokenizers) {
    var _a;
    if (!tokenizers) {
        return tokenizers;
    }
    const result = [];
    for (const tokenizer of tokenizers) {
        if (tokenizer.odatatype === "#Microsoft.Azure.Search.PatternTokenizer") {
            const patternTokenizer = tokenizer;
            const flags = (_a = patternTokenizer.flags) === null || _a === void 0 ? void 0 : _a.split("|");
            result.push(Object.assign(Object.assign({}, tokenizer), { flags }));
        }
        else {
            result.push(tokenizer);
        }
    }
    return result;
}
export function convertSimilarityToGenerated(similarity) {
    if (!similarity) {
        return similarity;
    }
    return similarity;
}
export function convertSimilarityToPublic(similarity) {
    if (!similarity) {
        return similarity;
    }
    if (similarity.odatatype === "#Microsoft.Azure.Search.ClassicSimilarity") {
        return similarity;
    }
    else {
        return similarity;
    }
}
function convertEncryptionKeyToPublic(encryptionKey) {
    if (!encryptionKey) {
        return encryptionKey;
    }
    const result = {
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
function convertEncryptionKeyToGenerated(encryptionKey) {
    if (!encryptionKey) {
        return encryptionKey;
    }
    const result = {
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
export function generatedIndexToPublicIndex(generatedIndex) {
    return {
        name: generatedIndex.name,
        defaultScoringProfile: generatedIndex.defaultScoringProfile,
        corsOptions: generatedIndex.corsOptions,
        suggesters: generatedIndex.suggesters,
        encryptionKey: convertEncryptionKeyToPublic(generatedIndex.encryptionKey),
        etag: generatedIndex.etag,
        analyzers: convertAnalyzersToPublic(generatedIndex.analyzers),
        tokenizers: convertTokenizersToPublic(generatedIndex.tokenizers),
        tokenFilters: generatedIndex.tokenFilters,
        charFilters: generatedIndex.charFilters,
        normalizers: generatedIndex.normalizers,
        scoringProfiles: generatedIndex.scoringProfiles,
        fields: convertFieldsToPublic(generatedIndex.fields),
        similarity: convertSimilarityToPublic(generatedIndex.similarity),
        semanticSearch: generatedIndex.semanticSearch,
        vectorSearch: generatedVectorSearchToPublicVectorSearch(generatedIndex.vectorSearch),
    };
}
export function generatedVectorSearchVectorizerToPublicVectorizer(generatedVectorizer) {
    var _a;
    if (!generatedVectorizer) {
        return generatedVectorizer;
    }
    const knownVectorizerDeserializers = {
        azureOpenAI: () => {
            const { parameters } = generatedVectorizer;
            const authIdentity = convertSearchIndexerDataIdentityToPublic(parameters === null || parameters === void 0 ? void 0 : parameters.authIdentity);
            const vectorizer = Object.assign(Object.assign({}, generatedVectorizer), { parameters: Object.assign(Object.assign({}, parameters), { authIdentity }) });
            return vectorizer;
        },
        customWebApi: () => {
            const { parameters } = generatedVectorizer;
            const authIdentity = convertSearchIndexerDataIdentityToPublic(parameters === null || parameters === void 0 ? void 0 : parameters.authIdentity);
            const vectorizer = Object.assign(Object.assign({}, generatedVectorizer), { parameters: Object.assign(Object.assign({}, parameters), { authIdentity }) });
            return vectorizer;
        },
        aiServicesVision: () => {
            var _a;
            const generatedVisionVectorizer = generatedVectorizer;
            const { aIServicesVisionParameters: generatedParameters } = generatedVisionVectorizer;
            const parameters = generatedParameters
                ? Object.assign(Object.assign({}, generatedParameters), { modelVersion: (_a = generatedParameters.modelVersion) !== null && _a !== void 0 ? _a : undefined, resourceUri: generatedParameters.resourceUri, authIdentity: convertSearchIndexerDataIdentityToPublic(generatedParameters.authIdentity) }) : undefined;
            const vectorizer = Object.assign(Object.assign({}, generatedVisionVectorizer), { parameters });
            return vectorizer;
        },
        aml: () => {
            const generatedAMLVectorizer = generatedVectorizer;
            const vectorizer = Object.assign(Object.assign({}, generatedAMLVectorizer), { amlParameters: generatedAzureMachineLearningVectorizerParametersToPublicAzureMachineLearningVectorizerParameters(generatedAMLVectorizer.aMLParameters) });
            return vectorizer;
        },
    };
    const defaultDeserializer = () => {
        logger.warning(`Unsupported vectorizer kind: ${generatedVectorizer.kind}`);
        return generatedVectorizer;
    };
    return ((_a = knownVectorizerDeserializers[generatedVectorizer.kind]) !== null && _a !== void 0 ? _a : defaultDeserializer)();
}
function generatedAzureMachineLearningVectorizerParametersToPublicAzureMachineLearningVectorizerParameters(aMLParameters) {
    if (!aMLParameters) {
        return aMLParameters;
    }
    const { resourceId, authenticationKey, scoringUri } = aMLParameters;
    // Sensitive to case order
    switch (true) {
        case resourceId !== undefined && resourceId !== null: {
            return Object.assign(Object.assign({}, aMLParameters), { authKind: "token" });
        }
        case authenticationKey !== undefined && authenticationKey !== null: {
            return Object.assign(Object.assign({}, aMLParameters), { authKind: "key" });
        }
        case scoringUri !== undefined && scoringUri !== null: {
            return Object.assign(Object.assign({}, aMLParameters), { authKind: "none" });
        }
    }
    logger.warning("Unknown AML parameter kind");
    return aMLParameters;
}
export function generatedVectorSearchAlgorithmConfigurationToPublicVectorSearchAlgorithmConfiguration(generatedAlgorithmConfiguration) {
    var _a;
    if (!generatedAlgorithmConfiguration) {
        return generatedAlgorithmConfiguration;
    }
    if (["hnsw", "exhaustiveKnn"].includes(generatedAlgorithmConfiguration.kind)) {
        const algorithmConfiguration = generatedAlgorithmConfiguration;
        const metric = (_a = algorithmConfiguration.parameters) === null || _a === void 0 ? void 0 : _a.metric;
        return Object.assign(Object.assign({}, algorithmConfiguration), { parameters: Object.assign(Object.assign({}, algorithmConfiguration.parameters), { metric }) });
    }
    throw Error("Unsupported algorithm configuration");
}
export function generatedVectorSearchToPublicVectorSearch(vectorSearch) {
    var _a, _b;
    if (!vectorSearch) {
        return vectorSearch;
    }
    return Object.assign(Object.assign({}, vectorSearch), { algorithms: (_a = vectorSearch.algorithms) === null || _a === void 0 ? void 0 : _a.map(generatedVectorSearchAlgorithmConfigurationToPublicVectorSearchAlgorithmConfiguration), vectorizers: (_b = vectorSearch.vectorizers) === null || _b === void 0 ? void 0 : _b.map(generatedVectorSearchVectorizerToPublicVectorizer) });
}
export function generatedSearchResultToPublicSearchResult(results) {
    const returnValues = results.map((result) => {
        const { _score: score, _highlights: highlights, _rerankerScore: rerankerScore, _captions: captions, documentDebugInfo: documentDebugInfo } = result, restProps = __rest(result, ["_score", "_highlights", "_rerankerScore", "_captions", "documentDebugInfo"]);
        const obj = {
            score,
            highlights,
            rerankerScore,
            captions,
            documentDebugInfo,
            document: restProps,
        };
        return obj;
    });
    return returnValues;
}
export function generatedSuggestDocumentsResultToPublicSuggestDocumentsResult(searchDocumentsResult) {
    const results = searchDocumentsResult.results.map((element) => {
        const { _text } = element, restProps = __rest(element, ["_text"]);
        const obj = {
            text: _text,
            document: restProps,
        };
        return obj;
    });
    const result = {
        results: results,
        coverage: searchDocumentsResult.coverage,
    };
    return result;
}
export function publicIndexToGeneratedIndex(index) {
    var _a;
    const { encryptionKey, tokenFilters, analyzers, tokenizers, fields, similarity } = index;
    return Object.assign(Object.assign({}, index), { encryptionKey: convertEncryptionKeyToGenerated(encryptionKey), tokenFilters: convertTokenFiltersToGenerated(tokenFilters), analyzers: convertAnalyzersToGenerated(analyzers), tokenizers: convertTokenizersToGenerated(tokenizers), fields: (_a = convertFieldsToGenerated(fields)) !== null && _a !== void 0 ? _a : [], similarity: convertSimilarityToGenerated(similarity) });
}
export function generatedSkillsetToPublicSkillset(generatedSkillset) {
    const { skills, cognitiveServicesAccount, knowledgeStore, encryptionKey, indexProjection } = generatedSkillset, props = __rest(generatedSkillset, ["skills", "cognitiveServicesAccount", "knowledgeStore", "encryptionKey", "indexProjection"]);
    return Object.assign(Object.assign({}, props), { skills: convertSkillsToPublic(skills), cognitiveServicesAccount: convertCognitiveServicesAccountToPublic(cognitiveServicesAccount), knowledgeStore: convertKnowledgeStoreToPublic(knowledgeStore), encryptionKey: convertEncryptionKeyToPublic(encryptionKey), indexProjection: indexProjection });
}
export function publicSkillsetToGeneratedSkillset(skillset) {
    const { cognitiveServicesAccount, encryptionKey } = skillset;
    return Object.assign(Object.assign({}, skillset), { cognitiveServicesAccount: convertCognitiveServicesAccountToGenerated(cognitiveServicesAccount), encryptionKey: convertEncryptionKeyToGenerated(encryptionKey) });
}
export function generatedSynonymMapToPublicSynonymMap(synonymMap) {
    const result = {
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
export function publicSynonymMapToGeneratedSynonymMap(synonymMap) {
    const result = {
        name: synonymMap.name,
        format: "solr",
        encryptionKey: convertEncryptionKeyToGenerated(synonymMap.encryptionKey),
        etag: synonymMap.etag,
        synonyms: synonymMap.synonyms.join("\n"),
    };
    result.encryptionKey = convertEncryptionKeyToGenerated(synonymMap.encryptionKey);
    return result;
}
export function publicSearchIndexerToGeneratedSearchIndexer(indexer) {
    return Object.assign(Object.assign({}, indexer), { encryptionKey: convertEncryptionKeyToGenerated(indexer.encryptionKey) });
}
export function generatedSearchIndexerToPublicSearchIndexer(indexer) {
    var _a, _b, _c, _d;
    const { parsingMode, dataToExtract, imageAction, pdfTextRotationAlgorithm, executionEnvironment, } = (_b = (_a = indexer.parameters) === null || _a === void 0 ? void 0 : _a.configuration) !== null && _b !== void 0 ? _b : {};
    const configuration = ((_c = indexer.parameters) === null || _c === void 0 ? void 0 : _c.configuration) && Object.assign(Object.assign({}, (_d = indexer.parameters) === null || _d === void 0 ? void 0 : _d.configuration), { parsingMode: parsingMode, dataToExtract: dataToExtract, imageAction: imageAction, pdfTextRotationAlgorithm: pdfTextRotationAlgorithm, executionEnvironment: executionEnvironment });
    const parameters = Object.assign(Object.assign({}, indexer.parameters), { configuration });
    return Object.assign(Object.assign({}, indexer), { parameters, encryptionKey: convertEncryptionKeyToPublic(indexer.encryptionKey), cache: convertSearchIndexerCacheToPublic(indexer.cache) });
}
export function publicDataSourceToGeneratedDataSource(dataSource) {
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
export function generatedDataSourceToPublicDataSource(dataSource) {
    return {
        name: dataSource.name,
        description: dataSource.name,
        type: dataSource.type,
        connectionString: dataSource.credentials.connectionString,
        container: dataSource.container,
        identity: convertSearchIndexerDataIdentityToPublic(dataSource.identity),
        etag: dataSource.etag,
        dataChangeDetectionPolicy: convertDataChangeDetectionPolicyToPublic(dataSource.dataChangeDetectionPolicy),
        dataDeletionDetectionPolicy: convertDataDeletionDetectionPolicyToPublic(dataSource.dataDeletionDetectionPolicy),
        encryptionKey: convertEncryptionKeyToPublic(dataSource.encryptionKey),
    };
}
export function convertSearchIndexerDataIdentityToPublic(searchIndexerDataIdentity) {
    if (!searchIndexerDataIdentity) {
        return searchIndexerDataIdentity;
    }
    if (searchIndexerDataIdentity.odatatype === "#Microsoft.Azure.Search.DataNoneIdentity") {
        return searchIndexerDataIdentity;
    }
    else {
        return searchIndexerDataIdentity;
    }
}
export function convertDataChangeDetectionPolicyToPublic(dataChangeDetectionPolicy) {
    if (!dataChangeDetectionPolicy) {
        return dataChangeDetectionPolicy;
    }
    if (dataChangeDetectionPolicy.odatatype ===
        "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy") {
        return dataChangeDetectionPolicy;
    }
    else {
        return dataChangeDetectionPolicy;
    }
}
export function convertDataDeletionDetectionPolicyToPublic(dataDeletionDetectionPolicy) {
    if (!dataDeletionDetectionPolicy) {
        return dataDeletionDetectionPolicy;
    }
    return dataDeletionDetectionPolicy;
}
export function getRandomIntegerInclusive(min, max) {
    // Make sure inputs are integers.
    min = Math.ceil(min);
    max = Math.floor(max);
    // Pick a random offset from zero to the size of the range.
    // Since Math.random() can never return 1, we have to make the range one larger
    // in order to be inclusive of the maximum value after we take the floor.
    const offset = Math.floor(Math.random() * (max - min + 1));
    return offset + min;
}
function convertKnowledgeStoreToPublic(knowledgeStore) {
    if (!knowledgeStore) {
        return knowledgeStore;
    }
    return Object.assign(Object.assign({}, knowledgeStore), { identity: convertSearchIndexerDataIdentityToPublic(knowledgeStore.identity) });
}
export function convertSearchIndexerCacheToPublic(cache) {
    if (!cache) {
        return cache;
    }
    return Object.assign(Object.assign({}, cache), { identity: convertSearchIndexerDataIdentityToPublic(cache.identity) });
}
//# sourceMappingURL=serviceUtils.js.map