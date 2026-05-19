// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { searchIndexerDataIdentityUnionSerializer, searchIndexerDataIdentityUnionDeserializer, azureOpenAIVectorizerParametersSerializer, azureOpenAIVectorizerParametersDeserializer, knowledgeBaseModelUnionSerializer, knowledgeBaseModelUnionDeserializer, indexingScheduleSerializer, indexingScheduleDeserializer, } from "../indexes/models.js";
export function knowledgeRetrievalReasoningEffortSerializer(item) {
    return { kind: item["kind"] };
}
export function knowledgeRetrievalReasoningEffortDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
export function knowledgeRetrievalReasoningEffortUnionSerializer(item) {
    switch (item.kind) {
        case "minimal":
            return knowledgeRetrievalMinimalReasoningEffortSerializer(item);
        case "low":
            return knowledgeRetrievalLowReasoningEffortSerializer(item);
        case "medium":
            return knowledgeRetrievalMediumReasoningEffortSerializer(item);
        default:
            return knowledgeRetrievalReasoningEffortSerializer(item);
    }
}
export function knowledgeRetrievalReasoningEffortUnionDeserializer(item) {
    switch (item["kind"]) {
        case "minimal":
            return knowledgeRetrievalMinimalReasoningEffortDeserializer(item);
        case "low":
            return knowledgeRetrievalLowReasoningEffortDeserializer(item);
        case "medium":
            return knowledgeRetrievalMediumReasoningEffortDeserializer(item);
        default:
            return knowledgeRetrievalReasoningEffortDeserializer(item);
    }
}
/** The amount of effort to use during retrieval. */
export var KnownKnowledgeRetrievalReasoningEffortKind;
(function (KnownKnowledgeRetrievalReasoningEffortKind) {
    /** Does not perform any source selections, query planning, or iterative search. */
    KnownKnowledgeRetrievalReasoningEffortKind["Minimal"] = "minimal";
    /** Use low reasoning during retrieval. */
    KnownKnowledgeRetrievalReasoningEffortKind["Low"] = "low";
    /** Use a moderate amount of reasoning during retrieval. */
    KnownKnowledgeRetrievalReasoningEffortKind["Medium"] = "medium";
})(KnownKnowledgeRetrievalReasoningEffortKind || (KnownKnowledgeRetrievalReasoningEffortKind = {}));
export function knowledgeRetrievalMinimalReasoningEffortSerializer(item) {
    return { kind: item["kind"] };
}
export function knowledgeRetrievalMinimalReasoningEffortDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
export function knowledgeRetrievalLowReasoningEffortSerializer(item) {
    return { kind: item["kind"] };
}
export function knowledgeRetrievalLowReasoningEffortDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
export function knowledgeRetrievalMediumReasoningEffortSerializer(item) {
    return { kind: item["kind"] };
}
export function knowledgeRetrievalMediumReasoningEffortDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
/** The output configuration for this retrieval. */
export var KnownKnowledgeRetrievalOutputMode;
(function (KnownKnowledgeRetrievalOutputMode) {
    /** Return data from the knowledge sources directly without generative alteration. */
    KnownKnowledgeRetrievalOutputMode["ExtractiveData"] = "extractiveData";
    /** Synthesize an answer for the response payload. */
    KnownKnowledgeRetrievalOutputMode["AnswerSynthesis"] = "answerSynthesis";
})(KnownKnowledgeRetrievalOutputMode || (KnownKnowledgeRetrievalOutputMode = {}));
export function knowledgeSourceIngestionParametersSerializer(item) {
    return {
        identity: !item["identity"]
            ? item["identity"]
            : searchIndexerDataIdentityUnionSerializer(item["identity"]),
        embeddingModel: !item["embeddingModel"]
            ? item["embeddingModel"]
            : knowledgeSourceVectorizerUnionSerializer(item["embeddingModel"]),
        chatCompletionModel: !item["chatCompletionModel"]
            ? item["chatCompletionModel"]
            : knowledgeBaseModelUnionSerializer(item["chatCompletionModel"]),
        disableImageVerbalization: item["disableImageVerbalization"],
        ingestionSchedule: !item["ingestionSchedule"]
            ? item["ingestionSchedule"]
            : indexingScheduleSerializer(item["ingestionSchedule"]),
        ingestionPermissionOptions: !item["ingestionPermissionOptions"]
            ? item["ingestionPermissionOptions"]
            : item["ingestionPermissionOptions"].map((p) => {
                return p;
            }),
        contentExtractionMode: item["contentExtractionMode"],
        aiServices: !item["aiServices"] ? item["aiServices"] : aiServicesSerializer(item["aiServices"]),
        assetStore: !item["assetStore"] ? item["assetStore"] : assetStoreSerializer(item["assetStore"]),
        freshnessPolicy: !item["freshnessPolicy"]
            ? item["freshnessPolicy"]
            : freshnessPolicySerializer(item["freshnessPolicy"]),
    };
}
export function knowledgeSourceIngestionParametersDeserializer(item) {
    return {
        identity: !item["identity"]
            ? item["identity"]
            : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
        embeddingModel: !item["embeddingModel"]
            ? item["embeddingModel"]
            : knowledgeSourceVectorizerUnionDeserializer(item["embeddingModel"]),
        chatCompletionModel: !item["chatCompletionModel"]
            ? item["chatCompletionModel"]
            : knowledgeBaseModelUnionDeserializer(item["chatCompletionModel"]),
        disableImageVerbalization: item["disableImageVerbalization"],
        ingestionSchedule: !item["ingestionSchedule"]
            ? item["ingestionSchedule"]
            : indexingScheduleDeserializer(item["ingestionSchedule"]),
        ingestionPermissionOptions: !item["ingestionPermissionOptions"]
            ? item["ingestionPermissionOptions"]
            : item["ingestionPermissionOptions"].map((p1) => {
                return p1;
            }),
        contentExtractionMode: item["contentExtractionMode"],
        aiServices: !item["aiServices"]
            ? item["aiServices"]
            : aiServicesDeserializer(item["aiServices"]),
        assetStore: !item["assetStore"]
            ? item["assetStore"]
            : assetStoreDeserializer(item["assetStore"]),
        freshnessPolicy: !item["freshnessPolicy"]
            ? item["freshnessPolicy"]
            : freshnessPolicyDeserializer(item["freshnessPolicy"]),
    };
}
export function knowledgeSourceVectorizerSerializer(item) {
    return { kind: item["kind"] };
}
export function knowledgeSourceVectorizerDeserializer(item) {
    return {
        kind: item["kind"],
    };
}
export function knowledgeSourceVectorizerUnionSerializer(item) {
    switch (item.kind) {
        case "azureOpenAI":
            return knowledgeSourceAzureOpenAIVectorizerSerializer(item);
        default:
            return knowledgeSourceVectorizerSerializer(item);
    }
}
export function knowledgeSourceVectorizerUnionDeserializer(item) {
    switch (item["kind"]) {
        case "azureOpenAI":
            return knowledgeSourceAzureOpenAIVectorizerDeserializer(item);
        default:
            return knowledgeSourceVectorizerDeserializer(item);
    }
}
export function knowledgeSourceAzureOpenAIVectorizerSerializer(item) {
    return {
        kind: item["kind"],
        azureOpenAIParameters: !item["azureOpenAIParameters"]
            ? item["azureOpenAIParameters"]
            : azureOpenAIVectorizerParametersSerializer(item["azureOpenAIParameters"]),
    };
}
export function knowledgeSourceAzureOpenAIVectorizerDeserializer(item) {
    return {
        kind: item["kind"],
        azureOpenAIParameters: !item["azureOpenAIParameters"]
            ? item["azureOpenAIParameters"]
            : azureOpenAIVectorizerParametersDeserializer(item["azureOpenAIParameters"]),
    };
}
export function aiServicesSerializer(item) {
    return { uri: item["uri"], apiKey: item["apiKey"] };
}
export function aiServicesDeserializer(item) {
    return {
        uri: item["uri"],
        apiKey: item["apiKey"],
    };
}
export function assetStoreSerializer(item) {
    return { connectionString: item["connectionString"], containerName: item["containerName"] };
}
export function assetStoreDeserializer(item) {
    return {
        connectionString: item["connectionString"],
        containerName: item["containerName"],
    };
}
export function freshnessPolicySerializer(item) {
    return { boostingDuration: item["boostingDuration"] };
}
export function freshnessPolicyDeserializer(item) {
    return {
        boostingDuration: item["boostingDuration"],
    };
}
export function knowledgeSourceStatusSerializer(item) {
    return {
        kind: item["kind"],
        synchronizationStatus: item["synchronizationStatus"],
        synchronizationInterval: item["synchronizationInterval"],
        currentSynchronizationState: !item["currentSynchronizationState"]
            ? item["currentSynchronizationState"]
            : synchronizationStateSerializer(item["currentSynchronizationState"]),
        lastSynchronizationState: !item["lastSynchronizationState"]
            ? item["lastSynchronizationState"]
            : completedSynchronizationStateSerializer(item["lastSynchronizationState"]),
        statistics: !item["statistics"]
            ? item["statistics"]
            : knowledgeSourceStatisticsSerializer(item["statistics"]),
    };
}
export function knowledgeSourceStatusDeserializer(item) {
    return {
        kind: item["kind"],
        synchronizationStatus: item["synchronizationStatus"],
        synchronizationInterval: item["synchronizationInterval"],
        currentSynchronizationState: !item["currentSynchronizationState"]
            ? item["currentSynchronizationState"]
            : synchronizationStateDeserializer(item["currentSynchronizationState"]),
        lastSynchronizationState: !item["lastSynchronizationState"]
            ? item["lastSynchronizationState"]
            : completedSynchronizationStateDeserializer(item["lastSynchronizationState"]),
        statistics: !item["statistics"]
            ? item["statistics"]
            : knowledgeSourceStatisticsDeserializer(item["statistics"]),
    };
}
export function synchronizationStateSerializer(item) {
    return {
        startTime: item["startTime"].toISOString(),
        itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
        itemsUpdatesFailed: item["itemsUpdatesFailed"],
        itemsSkipped: item["itemsSkipped"],
        errors: !item["errors"]
            ? item["errors"]
            : knowledgeSourceSynchronizationErrorArraySerializer(item["errors"]),
    };
}
export function synchronizationStateDeserializer(item) {
    return {
        startTime: new Date(item["startTime"]),
        itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
        itemsUpdatesFailed: item["itemsUpdatesFailed"],
        itemsSkipped: item["itemsSkipped"],
        errors: !item["errors"]
            ? item["errors"]
            : knowledgeSourceSynchronizationErrorArrayDeserializer(item["errors"]),
    };
}
export function knowledgeSourceSynchronizationErrorArraySerializer(result) {
    return result.map((item) => {
        return knowledgeSourceSynchronizationErrorSerializer(item);
    });
}
export function knowledgeSourceSynchronizationErrorArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeSourceSynchronizationErrorDeserializer(item);
    });
}
export function knowledgeSourceSynchronizationErrorSerializer(item) {
    return {
        docId: item["docId"],
        statusCode: item["statusCode"],
        name: item["name"],
        errorMessage: item["errorMessage"],
        details: item["details"],
        documentationLink: item["documentationLink"],
    };
}
export function knowledgeSourceSynchronizationErrorDeserializer(item) {
    return {
        docId: item["docId"],
        statusCode: item["statusCode"],
        name: item["name"],
        errorMessage: item["errorMessage"],
        details: item["details"],
        documentationLink: item["documentationLink"],
    };
}
export function completedSynchronizationStateSerializer(item) {
    return {
        startTime: item["startTime"].toISOString(),
        endTime: item["endTime"].toISOString(),
        itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
        itemsUpdatesFailed: item["itemsUpdatesFailed"],
        itemsSkipped: item["itemsSkipped"],
    };
}
export function completedSynchronizationStateDeserializer(item) {
    return {
        startTime: new Date(item["startTime"]),
        endTime: new Date(item["endTime"]),
        itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
        itemsUpdatesFailed: item["itemsUpdatesFailed"],
        itemsSkipped: item["itemsSkipped"],
    };
}
export function knowledgeSourceStatisticsSerializer(item) {
    return {
        totalSynchronization: item["totalSynchronization"],
        averageSynchronizationDuration: item["averageSynchronizationDuration"],
        averageItemsProcessedPerSynchronization: item["averageItemsProcessedPerSynchronization"],
    };
}
export function knowledgeSourceStatisticsDeserializer(item) {
    return {
        totalSynchronization: item["totalSynchronization"],
        averageSynchronizationDuration: item["averageSynchronizationDuration"],
        averageItemsProcessedPerSynchronization: item["averageItemsProcessedPerSynchronization"],
    };
}
export function knowledgeBaseRetrievalRequestSerializer(item) {
    return {
        messages: !item["messages"]
            ? item["messages"]
            : knowledgeBaseMessageArraySerializer(item["messages"]),
        intents: !item["intents"]
            ? item["intents"]
            : knowledgeRetrievalIntentUnionArraySerializer(item["intents"]),
        maxRuntimeInSeconds: item["maxRuntimeInSeconds"],
        maxOutputSize: item["maxOutputSize"],
        maxOutputDocuments: item["maxOutputDocuments"],
        maxOutputSizeInTokens: item["maxOutputSizeInTokens"],
        retrievalReasoningEffort: !item["retrievalReasoningEffort"]
            ? item["retrievalReasoningEffort"]
            : knowledgeRetrievalReasoningEffortUnionSerializer(item["retrievalReasoningEffort"]),
        includeActivity: item["includeActivity"],
        outputMode: item["outputMode"],
        knowledgeSourceParams: !item["knowledgeSourceParams"]
            ? item["knowledgeSourceParams"]
            : knowledgeSourceParamsUnionArraySerializer(item["knowledgeSourceParams"]),
    };
}
export function knowledgeBaseMessageArraySerializer(result) {
    return result.map((item) => {
        return knowledgeBaseMessageSerializer(item);
    });
}
export function knowledgeBaseMessageArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeBaseMessageDeserializer(item);
    });
}
export function knowledgeBaseMessageSerializer(item) {
    return {
        role: item["role"],
        content: knowledgeBaseMessageContentUnionArraySerializer(item["content"]),
    };
}
export function knowledgeBaseMessageDeserializer(item) {
    return {
        role: item["role"],
        content: knowledgeBaseMessageContentUnionArrayDeserializer(item["content"]),
    };
}
export function knowledgeBaseMessageContentUnionArraySerializer(result) {
    return result.map((item) => {
        return knowledgeBaseMessageContentUnionSerializer(item);
    });
}
export function knowledgeBaseMessageContentUnionArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeBaseMessageContentUnionDeserializer(item);
    });
}
export function knowledgeBaseMessageContentSerializer(item) {
    return { type: item["type"] };
}
export function knowledgeBaseMessageContentDeserializer(item) {
    return {
        type: item["type"],
    };
}
export function knowledgeBaseMessageContentUnionSerializer(item) {
    switch (item.type) {
        case "text":
            return knowledgeBaseMessageTextContentSerializer(item);
        case "image":
            return knowledgeBaseMessageImageContentSerializer(item);
        default:
            return knowledgeBaseMessageContentSerializer(item);
    }
}
export function knowledgeBaseMessageContentUnionDeserializer(item) {
    switch (item["type"]) {
        case "text":
            return knowledgeBaseMessageTextContentDeserializer(item);
        case "image":
            return knowledgeBaseMessageImageContentDeserializer(item);
        default:
            return knowledgeBaseMessageContentDeserializer(item);
    }
}
/** The type of message content. */
export var KnownKnowledgeBaseMessageContentType;
(function (KnownKnowledgeBaseMessageContentType) {
    /** Text message content kind. */
    KnownKnowledgeBaseMessageContentType["Text"] = "text";
    /** Image message content kind. */
    KnownKnowledgeBaseMessageContentType["Image"] = "image";
})(KnownKnowledgeBaseMessageContentType || (KnownKnowledgeBaseMessageContentType = {}));
export function knowledgeBaseMessageTextContentSerializer(item) {
    return { type: item["type"], text: item["text"] };
}
export function knowledgeBaseMessageTextContentDeserializer(item) {
    return {
        type: item["type"],
        text: item["text"],
    };
}
export function knowledgeBaseMessageImageContentSerializer(item) {
    return { type: item["type"], image: knowledgeBaseImageContentSerializer(item["image"]) };
}
export function knowledgeBaseMessageImageContentDeserializer(item) {
    return {
        type: item["type"],
        image: knowledgeBaseImageContentDeserializer(item["image"]),
    };
}
export function knowledgeBaseImageContentSerializer(item) {
    return { url: item["url"] };
}
export function knowledgeBaseImageContentDeserializer(item) {
    return {
        url: item["url"],
    };
}
export function knowledgeRetrievalIntentUnionArraySerializer(result) {
    return result.map((item) => {
        return knowledgeRetrievalIntentUnionSerializer(item);
    });
}
export function knowledgeRetrievalIntentSerializer(item) {
    return { type: item["type"] };
}
export function knowledgeRetrievalIntentUnionSerializer(item) {
    switch (item.type) {
        case "semantic":
            return knowledgeRetrievalSemanticIntentSerializer(item);
        default:
            return knowledgeRetrievalIntentSerializer(item);
    }
}
/** The kind of knowledge base configuration to use. */
export var KnownKnowledgeRetrievalIntentType;
(function (KnownKnowledgeRetrievalIntentType) {
    /** A natural language semantic query intent. */
    KnownKnowledgeRetrievalIntentType["Semantic"] = "semantic";
})(KnownKnowledgeRetrievalIntentType || (KnownKnowledgeRetrievalIntentType = {}));
export function knowledgeRetrievalSemanticIntentSerializer(item) {
    return { type: item["type"], search: item["search"] };
}
export function knowledgeSourceParamsUnionArraySerializer(result) {
    return result.map((item) => {
        return knowledgeSourceParamsUnionSerializer(item);
    });
}
export function knowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function knowledgeSourceParamsUnionSerializer(item) {
    switch (item.kind) {
        case "searchIndex":
            return searchIndexKnowledgeSourceParamsSerializer(item);
        case "azureBlob":
            return azureBlobKnowledgeSourceParamsSerializer(item);
        case "indexedSharePoint":
            return indexedSharePointKnowledgeSourceParamsSerializer(item);
        case "indexedOneLake":
            return indexedOneLakeKnowledgeSourceParamsSerializer(item);
        case "web":
            return webKnowledgeSourceParamsSerializer(item);
        case "remoteSharePoint":
            return remoteSharePointKnowledgeSourceParamsSerializer(item);
        case "workIQ":
            return workIQKnowledgeSourceParamsSerializer(item);
        case "fabricDataAgent":
            return fabricDataAgentKnowledgeSourceParamsSerializer(item);
        case "fabricOntology":
            return fabricOntologyKnowledgeSourceParamsSerializer(item);
        case "mcpServer":
            return mcpServerKnowledgeSourceParamsSerializer(item);
        case "file":
            return fileKnowledgeSourceParamsSerializer(item);
        case "indexedSql":
            return indexedSqlKnowledgeSourceParamsSerializer(item);
        default:
            return knowledgeSourceParamsSerializer(item);
    }
}
export function searchIndexKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
        filterAddOn: item["filterAddOn"],
    };
}
export function azureBlobKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function indexedSharePointKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function indexedOneLakeKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function webKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
        language: item["language"],
        market: item["market"],
        count: item["count"],
        freshness: item["freshness"],
    };
}
export function remoteSharePointKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
        filterExpressionAddOn: item["filterExpressionAddOn"],
    };
}
export function workIQKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function fabricDataAgentKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function fabricOntologyKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function mcpServerKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function fileKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function indexedSqlKnowledgeSourceParamsSerializer(item) {
    return {
        knowledgeSourceName: item["knowledgeSourceName"],
        includeReferences: item["includeReferences"],
        includeReferenceSourceData: item["includeReferenceSourceData"],
        alwaysQuerySource: item["alwaysQuerySource"],
        failOnError: item["failOnError"],
        rerankerThreshold: item["rerankerThreshold"],
        maxOutputDocuments: item["maxOutputDocuments"],
        kind: item["kind"],
        enableImageServing: item["enableImageServing"],
    };
}
export function knowledgeBaseRetrievalResponseDeserializer(item) {
    return {
        response: !item["response"]
            ? item["response"]
            : knowledgeBaseMessageArrayDeserializer(item["response"]),
        activity: !item["activity"]
            ? item["activity"]
            : knowledgeBaseActivityRecordUnionArrayDeserializer(item["activity"]),
        references: !item["references"]
            ? item["references"]
            : knowledgeBaseReferenceUnionArrayDeserializer(item["references"]),
        responseSensitivityLabelInfo: !item["responseSensitivityLabelInfo"]
            ? item["responseSensitivityLabelInfo"]
            : purviewSensitivityLabelInfoDeserializer(item["responseSensitivityLabelInfo"]),
    };
}
export function knowledgeBaseActivityRecordUnionArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeBaseActivityRecordUnionDeserializer(item);
    });
}
export function knowledgeBaseActivityRecordDeserializer(item) {
    return {
        id: item["id"],
        type: item["type"],
        elapsedMs: item["elapsedMs"],
        error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
        warning: item["warning"],
    };
}
export function knowledgeBaseActivityRecordUnionDeserializer(item) {
    switch (item["type"]) {
        case "modelQueryPlanning":
            return knowledgeBaseModelQueryPlanningActivityRecordDeserializer(item);
        case "modelAnswerSynthesis":
            return knowledgeBaseModelAnswerSynthesisActivityRecordDeserializer(item);
        case "modelWebSummarization":
            return knowledgeBaseModelWebSummarizationActivityRecordDeserializer(item);
        case "agenticReasoning":
            return knowledgeBaseAgenticReasoningActivityRecordDeserializer(item);
        default:
            return knowledgeBaseActivityRecordDeserializer(item);
    }
}
/** The type of activity record. */
export var KnownKnowledgeBaseActivityRecordType;
(function (KnownKnowledgeBaseActivityRecordType) {
    /** Search index retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["SearchIndex"] = "searchIndex";
    /** Azure Blob retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["AzureBlob"] = "azureBlob";
    /** Indexed SharePoint retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["IndexedSharePoint"] = "indexedSharePoint";
    /** Indexed OneLake retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["IndexedOneLake"] = "indexedOneLake";
    /** Web retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["Web"] = "web";
    /** Remote SharePoint retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["RemoteSharePoint"] = "remoteSharePoint";
    /** WorkIQ retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["WorkIQ"] = "workIQ";
    /** Fabric Data Agent retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["FabricDataAgent"] = "fabricDataAgent";
    /** Fabric Ontology retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["FabricOntology"] = "fabricOntology";
    /** MCP server retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["McpServer"] = "mcpServer";
    /** File retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["File"] = "file";
    /** Indexed SQL retrieval activity. */
    KnownKnowledgeBaseActivityRecordType["IndexedSql"] = "indexedSql";
    /** LLM query planning activity. */
    KnownKnowledgeBaseActivityRecordType["ModelQueryPlanning"] = "modelQueryPlanning";
    /** LLM answer synthesis activity. */
    KnownKnowledgeBaseActivityRecordType["ModelAnswerSynthesis"] = "modelAnswerSynthesis";
    /** LLM web summarization activity. */
    KnownKnowledgeBaseActivityRecordType["ModelWebSummarization"] = "modelWebSummarization";
    /** Agentic reasoning activity. */
    KnownKnowledgeBaseActivityRecordType["AgenticReasoning"] = "agenticReasoning";
})(KnownKnowledgeBaseActivityRecordType || (KnownKnowledgeBaseActivityRecordType = {}));
export function knowledgeBaseErrorDetailDeserializer(item) {
    return {
        code: item["code"],
        message: item["message"],
        target: item["target"],
        details: !item["details"]
            ? item["details"]
            : knowledgeBaseErrorDetailArrayDeserializer(item["details"]),
        additionalInfo: !item["additionalInfo"]
            ? item["additionalInfo"]
            : knowledgeBaseErrorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
    };
}
export function knowledgeBaseErrorDetailArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeBaseErrorDetailDeserializer(item);
    });
}
export function knowledgeBaseErrorAdditionalInfoArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeBaseErrorAdditionalInfoDeserializer(item);
    });
}
export function knowledgeBaseErrorAdditionalInfoDeserializer(item) {
    return {
        type: item["type"],
        info: !item["info"]
            ? item["info"]
            : Object.fromEntries(Object.entries(item["info"]).map(([k, p]) => [k, p])),
    };
}
export function knowledgeBaseModelQueryPlanningActivityRecordDeserializer(item) {
    return {
        id: item["id"],
        type: item["type"],
        elapsedMs: item["elapsedMs"],
        error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
        warning: item["warning"],
        inputTokens: item["inputTokens"],
        outputTokens: item["outputTokens"],
        modelName: item["modelName"],
    };
}
export function knowledgeBaseModelAnswerSynthesisActivityRecordDeserializer(item) {
    return {
        id: item["id"],
        type: item["type"],
        elapsedMs: item["elapsedMs"],
        error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
        warning: item["warning"],
        inputTokens: item["inputTokens"],
        outputTokens: item["outputTokens"],
        modelName: item["modelName"],
    };
}
export function knowledgeBaseModelWebSummarizationActivityRecordDeserializer(item) {
    return {
        id: item["id"],
        type: item["type"],
        elapsedMs: item["elapsedMs"],
        error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
        warning: item["warning"],
        inputTokensCount: item["inputTokens"],
        outputTokensCount: item["outputTokens"],
        modelName: item["modelName"],
    };
}
export function knowledgeBaseAgenticReasoningActivityRecordDeserializer(item) {
    return {
        id: item["id"],
        type: item["type"],
        elapsedMs: item["elapsedMs"],
        error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
        warning: item["warning"],
        reasoningTokens: item["reasoningTokens"],
        retrievalReasoningEffort: !item["retrievalReasoningEffort"]
            ? item["retrievalReasoningEffort"]
            : knowledgeRetrievalReasoningEffortUnionDeserializer(item["retrievalReasoningEffort"]),
    };
}
export function knowledgeBaseReferenceUnionArrayDeserializer(result) {
    return result.map((item) => {
        return knowledgeBaseReferenceUnionDeserializer(item);
    });
}
export function knowledgeBaseReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
    };
}
export function knowledgeBaseReferenceUnionDeserializer(item) {
    switch (item["type"]) {
        case "searchIndex":
            return knowledgeBaseSearchIndexReferenceDeserializer(item);
        case "azureBlob":
            return knowledgeBaseAzureBlobReferenceDeserializer(item);
        case "indexedSharePoint":
            return knowledgeBaseIndexedSharePointReferenceDeserializer(item);
        case "indexedOneLake":
            return knowledgeBaseIndexedOneLakeReferenceDeserializer(item);
        case "web":
            return knowledgeBaseWebReferenceDeserializer(item);
        case "remoteSharePoint":
            return knowledgeBaseRemoteSharePointReferenceDeserializer(item);
        case "workIQ":
            return knowledgeBaseWorkIQReferenceDeserializer(item);
        case "fabricDataAgent":
            return knowledgeBaseFabricDataAgentReferenceDeserializer(item);
        case "fabricOntology":
            return knowledgeBaseFabricOntologyReferenceDeserializer(item);
        case "mcpServer":
            return knowledgeBaseMcpServerReferenceDeserializer(item);
        case "file":
            return knowledgeBaseFileReferenceDeserializer(item);
        case "indexedSql":
            return knowledgeBaseIndexedSqlReferenceDeserializer(item);
        default:
            return knowledgeBaseReferenceDeserializer(item);
    }
}
/** The type of reference. */
export var KnownKnowledgeBaseReferenceType;
(function (KnownKnowledgeBaseReferenceType) {
    /** Search index document reference. */
    KnownKnowledgeBaseReferenceType["SearchIndex"] = "searchIndex";
    /** Azure Blob document reference. */
    KnownKnowledgeBaseReferenceType["AzureBlob"] = "azureBlob";
    /** Indexed SharePoint document reference. */
    KnownKnowledgeBaseReferenceType["IndexedSharePoint"] = "indexedSharePoint";
    /** Indexed OneLake document reference. */
    KnownKnowledgeBaseReferenceType["IndexedOneLake"] = "indexedOneLake";
    /** Web document reference. */
    KnownKnowledgeBaseReferenceType["Web"] = "web";
    /** Remote SharePoint document reference. */
    KnownKnowledgeBaseReferenceType["RemoteSharePoint"] = "remoteSharePoint";
    /** Work IQ document reference. */
    KnownKnowledgeBaseReferenceType["WorkIQ"] = "workIQ";
    /** Fabric Data Agent document reference. */
    KnownKnowledgeBaseReferenceType["FabricDataAgent"] = "fabricDataAgent";
    /** Fabric Ontology document reference. */
    KnownKnowledgeBaseReferenceType["FabricOntology"] = "fabricOntology";
    /** MCP server document reference. */
    KnownKnowledgeBaseReferenceType["McpServer"] = "mcpServer";
    /** File document reference. */
    KnownKnowledgeBaseReferenceType["File"] = "file";
    /** Indexed SQL document reference. */
    KnownKnowledgeBaseReferenceType["IndexedSql"] = "indexedSql";
})(KnownKnowledgeBaseReferenceType || (KnownKnowledgeBaseReferenceType = {}));
export function knowledgeBaseSearchIndexReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        docKey: item["docKey"],
        searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
            ? item["searchSensitivityLabelInfo"]
            : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
    };
}
export function purviewSensitivityLabelInfoDeserializer(item) {
    return {
        displayName: item["displayName"],
        sensitivityLabelId: item["sensitivityLabelId"],
        toolTip: item["toolTip"],
        priority: item["priority"],
        color: item["color"],
        isEncrypted: item["isEncrypted"],
    };
}
export function knowledgeBaseAzureBlobReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        blobUrl: item["blobUrl"],
        searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
            ? item["searchSensitivityLabelInfo"]
            : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
    };
}
export function knowledgeBaseIndexedSharePointReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        docUrl: item["docUrl"],
        searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
            ? item["searchSensitivityLabelInfo"]
            : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
    };
}
export function knowledgeBaseIndexedOneLakeReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        docUrl: item["docUrl"],
        searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
            ? item["searchSensitivityLabelInfo"]
            : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
    };
}
export function knowledgeBaseWebReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        url: item["url"],
        title: item["title"],
    };
}
export function knowledgeBaseRemoteSharePointReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        webUrl: item["webUrl"],
        searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
            ? item["searchSensitivityLabelInfo"]
            : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
    };
}
export function knowledgeBaseWorkIQReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        attributions: !item["attributions"]
            ? item["attributions"]
            : workIQAttributionArrayDeserializer(item["attributions"]),
    };
}
export function workIQAttributionArrayDeserializer(result) {
    return result.map((item) => {
        return workIQAttributionDeserializer(item);
    });
}
export function workIQAttributionDeserializer(item) {
    return {
        seeMoreWebUrl: item["seeMoreWebUrl"],
    };
}
export function knowledgeBaseFabricDataAgentReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        workspaceId: item["workspaceId"],
        dataAgentId: item["dataAgentId"],
    };
}
export function knowledgeBaseFabricOntologyReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        workspaceId: item["workspaceId"],
        ontologyId: item["ontologyId"],
    };
}
export function knowledgeBaseMcpServerReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        toolName: item["toolName"],
        title: item["title"],
    };
}
export function knowledgeBaseFileReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        docName: item["docName"],
    };
}
export function knowledgeBaseIndexedSqlReferenceDeserializer(item) {
    return {
        type: item["type"],
        id: item["id"],
        activitySource: item["activitySource"],
        sourceData: !item["sourceData"]
            ? item["sourceData"]
            : Object.fromEntries(Object.entries(item["sourceData"]).map(([k, p]) => [k, p])),
        rerankerScore: item["rerankerScore"],
        docUrl: item["docUrl"],
    };
}
//# sourceMappingURL=models.js.map