import { SearchIndexerDataIdentityUnion, VectorSearchVectorizerKind, AzureOpenAIVectorizerParameters, KnowledgeBaseModelUnion, KnowledgeSourceKind, IndexingSchedule, KnowledgeSourceIngestionPermissionOption, KnowledgeSourceContentExtractionMode, KnowledgeSourceSynchronizationStatus } from "../indexes/models.js";
/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/** Base type for reasoning effort. */
export interface KnowledgeRetrievalReasoningEffort {
    /** The kind of reasoning effort. */
    /** The discriminator possible values: minimal, low, medium */
    kind: KnowledgeRetrievalReasoningEffortKind;
}
export declare function knowledgeRetrievalReasoningEffortSerializer(item: KnowledgeRetrievalReasoningEffort): any;
export declare function knowledgeRetrievalReasoningEffortDeserializer(item: any): KnowledgeRetrievalReasoningEffort;
/** Alias for KnowledgeRetrievalReasoningEffortUnion */
export type KnowledgeRetrievalReasoningEffortUnion = KnowledgeRetrievalMinimalReasoningEffort | KnowledgeRetrievalLowReasoningEffort | KnowledgeRetrievalMediumReasoningEffort | KnowledgeRetrievalReasoningEffort;
export declare function knowledgeRetrievalReasoningEffortUnionSerializer(item: KnowledgeRetrievalReasoningEffortUnion): any;
export declare function knowledgeRetrievalReasoningEffortUnionDeserializer(item: any): KnowledgeRetrievalReasoningEffortUnion;
/** The amount of effort to use during retrieval. */
export declare enum KnownKnowledgeRetrievalReasoningEffortKind {
    /** Does not perform any source selections, query planning, or iterative search. */
    Minimal = "minimal",
    /** Use low reasoning during retrieval. */
    Low = "low",
    /** Use a moderate amount of reasoning during retrieval. */
    Medium = "medium"
}
/**
 * The amount of effort to use during retrieval. \
 * {@link KnownKnowledgeRetrievalReasoningEffortKind} can be used interchangeably with KnowledgeRetrievalReasoningEffortKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **minimal**: Does not perform any source selections, query planning, or iterative search. \
 * **low**: Use low reasoning during retrieval. \
 * **medium**: Use a moderate amount of reasoning during retrieval.
 */
export type KnowledgeRetrievalReasoningEffortKind = string;
/** Run knowledge retrieval with minimal reasoning effort. */
export interface KnowledgeRetrievalMinimalReasoningEffort extends KnowledgeRetrievalReasoningEffort {
    /** The discriminator value. */
    kind: "minimal";
}
export declare function knowledgeRetrievalMinimalReasoningEffortSerializer(item: KnowledgeRetrievalMinimalReasoningEffort): any;
export declare function knowledgeRetrievalMinimalReasoningEffortDeserializer(item: any): KnowledgeRetrievalMinimalReasoningEffort;
/** Run knowledge retrieval with low reasoning effort. */
export interface KnowledgeRetrievalLowReasoningEffort extends KnowledgeRetrievalReasoningEffort {
    /** The discriminator value. */
    kind: "low";
}
export declare function knowledgeRetrievalLowReasoningEffortSerializer(item: KnowledgeRetrievalLowReasoningEffort): any;
export declare function knowledgeRetrievalLowReasoningEffortDeserializer(item: any): KnowledgeRetrievalLowReasoningEffort;
/** Run knowledge retrieval with medium reasoning effort. */
export interface KnowledgeRetrievalMediumReasoningEffort extends KnowledgeRetrievalReasoningEffort {
    /** The discriminator value. */
    kind: "medium";
}
export declare function knowledgeRetrievalMediumReasoningEffortSerializer(item: KnowledgeRetrievalMediumReasoningEffort): any;
export declare function knowledgeRetrievalMediumReasoningEffortDeserializer(item: any): KnowledgeRetrievalMediumReasoningEffort;
/** The output configuration for this retrieval. */
export declare enum KnownKnowledgeRetrievalOutputMode {
    /** Return data from the knowledge sources directly without generative alteration. */
    ExtractiveData = "extractiveData",
    /** Synthesize an answer for the response payload. */
    AnswerSynthesis = "answerSynthesis"
}
/**
 * The output configuration for this retrieval. \
 * {@link KnownKnowledgeRetrievalOutputMode} can be used interchangeably with KnowledgeRetrievalOutputMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **extractiveData**: Return data from the knowledge sources directly without generative alteration. \
 * **answerSynthesis**: Synthesize an answer for the response payload.
 */
export type KnowledgeRetrievalOutputMode = string;
/** Consolidates all general ingestion settings for knowledge sources. */
export interface KnowledgeSourceIngestionParameters {
    /** An explicit identity to use for this knowledge source. */
    identity?: SearchIndexerDataIdentityUnion;
    /** Optional vectorizer configuration for vectorizing content. */
    embeddingModel?: KnowledgeSourceVectorizerUnion;
    /** Optional chat completion model for image verbalization or context extraction. */
    chatCompletionModel?: KnowledgeBaseModelUnion;
    /** Indicates whether image verbalization should be disabled. Default is false. */
    disableImageVerbalization?: boolean;
    /** Optional schedule for data ingestion. */
    ingestionSchedule?: IndexingSchedule;
    /** Optional list of permission types to ingest together with document content. If specified, it will set the indexer permission options for the data source. */
    ingestionPermissionOptions?: KnowledgeSourceIngestionPermissionOption[];
    /** Optional content extraction mode. Default is 'minimal'. */
    contentExtractionMode?: KnowledgeSourceContentExtractionMode;
    /** Optional AI Services configuration for content processing. */
    aiServices?: AIServices;
    /** Optional asset store configuration for storing extracted assets such as images. */
    assetStore?: AssetStore;
    /** Optional freshness policy for biasing retrieval toward newer documents. */
    freshnessPolicy?: FreshnessPolicy;
}
export declare function knowledgeSourceIngestionParametersSerializer(item: KnowledgeSourceIngestionParameters): any;
export declare function knowledgeSourceIngestionParametersDeserializer(item: any): KnowledgeSourceIngestionParameters;
/** Specifies the vectorization method to be used for knowledge source embedding model. */
export interface KnowledgeSourceVectorizer {
    /** The name of the kind of vectorization method being configured for use with vector search. */
    /** The discriminator possible values: azureOpenAI */
    kind: VectorSearchVectorizerKind;
}
export declare function knowledgeSourceVectorizerSerializer(item: KnowledgeSourceVectorizer): any;
export declare function knowledgeSourceVectorizerDeserializer(item: any): KnowledgeSourceVectorizer;
/** Alias for KnowledgeSourceVectorizerUnion */
export type KnowledgeSourceVectorizerUnion = KnowledgeSourceAzureOpenAIVectorizer | KnowledgeSourceVectorizer;
export declare function knowledgeSourceVectorizerUnionSerializer(item: KnowledgeSourceVectorizerUnion): any;
export declare function knowledgeSourceVectorizerUnionDeserializer(item: any): KnowledgeSourceVectorizerUnion;
/** Specifies the Azure OpenAI resource used to vectorize a query string. */
export interface KnowledgeSourceAzureOpenAIVectorizer extends KnowledgeSourceVectorizer {
    /** The discriminator value. */
    kind: "azureOpenAI";
    /** Contains the parameters specific to Azure OpenAI embedding vectorization. */
    azureOpenAIParameters?: AzureOpenAIVectorizerParameters;
}
export declare function knowledgeSourceAzureOpenAIVectorizerSerializer(item: KnowledgeSourceAzureOpenAIVectorizer): any;
export declare function knowledgeSourceAzureOpenAIVectorizerDeserializer(item: any): KnowledgeSourceAzureOpenAIVectorizer;
/** Parameters for AI Services. */
export interface AIServices {
    /** The URI of the AI Services endpoint. */
    uri: string;
    /** The API key for accessing AI Services. */
    apiKey?: string;
}
export declare function aiServicesSerializer(item: AIServices): any;
export declare function aiServicesDeserializer(item: any): AIServices;
/** Configuration for an asset store used to store extracted assets such as images. */
export interface AssetStore {
    /** The connection string for the asset store. */
    connectionString: string;
    /** The name of the blob container within the asset store where extracted assets (for example, images) are stored. */
    containerName: string;
}
export declare function assetStoreSerializer(item: AssetStore): any;
export declare function assetStoreDeserializer(item: any): AssetStore;
/** Configuration for freshness-aware retrieval. When set, newer documents receive a ranking boost during retrieval. */
export interface FreshnessPolicy {
    /** ISO 8601 duration for the freshness boosting window (e.g. 'P90D' for 90 days). Documents newer than this duration receive a ranking boost during retrieval. */
    boostingDuration?: string;
}
export declare function freshnessPolicySerializer(item: FreshnessPolicy): any;
export declare function freshnessPolicyDeserializer(item: any): FreshnessPolicy;
/** Represents the status and synchronization history of a knowledge source. */
export interface KnowledgeSourceStatus {
    /** Identifies the Knowledge Source kind directly from the Status response. */
    kind?: KnowledgeSourceKind;
    /** The current synchronization status. */
    synchronizationStatus: KnowledgeSourceSynchronizationStatus;
    /** The synchronization interval (e.g., '1d' for daily). Null if no schedule is configured. */
    synchronizationInterval?: string;
    /** Current synchronization state that spans multiple indexer runs. */
    currentSynchronizationState?: SynchronizationState;
    /** Details of the last completed synchronization. Null on first sync. */
    lastSynchronizationState?: CompletedSynchronizationState;
    /** Statistical information about the knowledge source synchronization history. Null on first sync. */
    statistics?: KnowledgeSourceStatistics;
}
export declare function knowledgeSourceStatusSerializer(item: KnowledgeSourceStatus): any;
export declare function knowledgeSourceStatusDeserializer(item: any): KnowledgeSourceStatus;
/** Represents the current state of an ongoing synchronization that spans multiple indexer runs. */
export interface SynchronizationState {
    /** The start time of the current synchronization. */
    startTime: Date;
    /** The number of item updates successfully processed in the current synchronization. */
    itemsUpdatesProcessed: number;
    /** The number of item updates that failed in the current synchronization. */
    itemsUpdatesFailed: number;
    /** The number of items skipped in the current synchronization. */
    itemsSkipped: number;
    /** Collection of document-level indexing errors encountered during the current synchronization run. Returned only when errors are present. */
    errors?: KnowledgeSourceSynchronizationError[];
}
export declare function synchronizationStateSerializer(item: SynchronizationState): any;
export declare function synchronizationStateDeserializer(item: any): SynchronizationState;
export declare function knowledgeSourceSynchronizationErrorArraySerializer(result: Array<KnowledgeSourceSynchronizationError>): any[];
export declare function knowledgeSourceSynchronizationErrorArrayDeserializer(result: Array<KnowledgeSourceSynchronizationError>): any[];
/** Represents a document-level indexing error encountered during a knowledge source synchronization run. */
export interface KnowledgeSourceSynchronizationError {
    /** The unique identifier for the failed document or item within the synchronization run. */
    docId?: string;
    /** HTTP-like status code representing the failure category (e.g., 400). */
    statusCode?: number;
    /** Name of the ingestion or processing component reporting the error. */
    name?: string;
    /** Human-readable, customer-visible error message. */
    errorMessage: string;
    /** Additional contextual information about the failure. */
    details?: string;
    /** A link to relevant troubleshooting documentation. */
    documentationLink?: string;
}
export declare function knowledgeSourceSynchronizationErrorSerializer(item: KnowledgeSourceSynchronizationError): any;
export declare function knowledgeSourceSynchronizationErrorDeserializer(item: any): KnowledgeSourceSynchronizationError;
/** Represents the completed state of the last synchronization. */
export interface CompletedSynchronizationState {
    /** The start time of the last completed synchronization. */
    startTime: Date;
    /** The end time of the last completed synchronization. */
    endTime: Date;
    /** The number of item updates successfully processed in the last synchronization. */
    itemsUpdatesProcessed: number;
    /** The number of item updates that failed in the last synchronization. */
    itemsUpdatesFailed: number;
    /** The number of items skipped in the last synchronization. */
    itemsSkipped: number;
}
export declare function completedSynchronizationStateSerializer(item: CompletedSynchronizationState): any;
export declare function completedSynchronizationStateDeserializer(item: any): CompletedSynchronizationState;
/** Statistical information about knowledge source synchronization history. */
export interface KnowledgeSourceStatistics {
    /** Total number of synchronizations. */
    totalSynchronization: number;
    /** Average synchronization duration in HH:MM:SS format. */
    averageSynchronizationDuration: string;
    /** Average items processed per synchronization. */
    averageItemsProcessedPerSynchronization: number;
}
export declare function knowledgeSourceStatisticsSerializer(item: KnowledgeSourceStatistics): any;
export declare function knowledgeSourceStatisticsDeserializer(item: any): KnowledgeSourceStatistics;
/** The input contract for the retrieval request. */
export interface KnowledgeBaseRetrievalRequest {
    /** A list of chat message style input. */
    messages?: KnowledgeBaseMessage[];
    /** A list of intended queries to execute without model query planning. */
    intents?: KnowledgeRetrievalIntentUnion[];
    /** The maximum runtime in seconds. */
    maxRuntimeInSeconds?: number;
    /** Limits the maximum size of the content in the output. */
    maxOutputSize?: number;
    /** Limits the maximum number of documents in the output. */
    maxOutputDocuments?: number;
    /** Limits the maximum size of the content in the output. */
    maxOutputSizeInTokens?: number;
    /** The retrieval reasoning effort configuration. */
    retrievalReasoningEffort?: KnowledgeRetrievalReasoningEffortUnion;
    /** Indicates retrieval results should include activity information. */
    includeActivity?: boolean;
    /** The output configuration for this retrieval. */
    outputMode?: KnowledgeRetrievalOutputMode;
    /** A list of runtime parameters for the knowledge sources. */
    knowledgeSourceParams?: KnowledgeSourceParamsUnion[];
}
export declare function knowledgeBaseRetrievalRequestSerializer(item: KnowledgeBaseRetrievalRequest): any;
export declare function knowledgeBaseMessageArraySerializer(result: Array<KnowledgeBaseMessage>): any[];
export declare function knowledgeBaseMessageArrayDeserializer(result: Array<KnowledgeBaseMessage>): any[];
/** The natural language message style object. */
export interface KnowledgeBaseMessage {
    /** The role of the tool response. */
    role?: string;
    /** The content of the message. */
    content: KnowledgeBaseMessageContentUnion[];
}
export declare function knowledgeBaseMessageSerializer(item: KnowledgeBaseMessage): any;
export declare function knowledgeBaseMessageDeserializer(item: any): KnowledgeBaseMessage;
export declare function knowledgeBaseMessageContentUnionArraySerializer(result: Array<KnowledgeBaseMessageContentUnion>): any[];
export declare function knowledgeBaseMessageContentUnionArrayDeserializer(result: Array<KnowledgeBaseMessageContentUnion>): any[];
/** Specifies the type of the message content. */
export interface KnowledgeBaseMessageContent {
    /** The type of the message */
    /** The discriminator possible values: text, image */
    type: KnowledgeBaseMessageContentType;
}
export declare function knowledgeBaseMessageContentSerializer(item: KnowledgeBaseMessageContent): any;
export declare function knowledgeBaseMessageContentDeserializer(item: any): KnowledgeBaseMessageContent;
/** Alias for KnowledgeBaseMessageContentUnion */
export type KnowledgeBaseMessageContentUnion = KnowledgeBaseMessageTextContent | KnowledgeBaseMessageImageContent | KnowledgeBaseMessageContent;
export declare function knowledgeBaseMessageContentUnionSerializer(item: KnowledgeBaseMessageContentUnion): any;
export declare function knowledgeBaseMessageContentUnionDeserializer(item: any): KnowledgeBaseMessageContentUnion;
/** The type of message content. */
export declare enum KnownKnowledgeBaseMessageContentType {
    /** Text message content kind. */
    Text = "text",
    /** Image message content kind. */
    Image = "image"
}
/**
 * The type of message content. \
 * {@link KnownKnowledgeBaseMessageContentType} can be used interchangeably with KnowledgeBaseMessageContentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **text**: Text message content kind. \
 * **image**: Image message content kind.
 */
export type KnowledgeBaseMessageContentType = string;
/** Text message type. */
export interface KnowledgeBaseMessageTextContent extends KnowledgeBaseMessageContent {
    /** The discriminator value. */
    type: "text";
    /** The text content. */
    text: string;
}
export declare function knowledgeBaseMessageTextContentSerializer(item: KnowledgeBaseMessageTextContent): any;
export declare function knowledgeBaseMessageTextContentDeserializer(item: any): KnowledgeBaseMessageTextContent;
/** Image message type. */
export interface KnowledgeBaseMessageImageContent extends KnowledgeBaseMessageContent {
    /** The discriminator value. */
    type: "image";
    /** The image content. */
    image: KnowledgeBaseImageContent;
}
export declare function knowledgeBaseMessageImageContentSerializer(item: KnowledgeBaseMessageImageContent): any;
export declare function knowledgeBaseMessageImageContentDeserializer(item: any): KnowledgeBaseMessageImageContent;
/** Image content. */
export interface KnowledgeBaseImageContent {
    /** The url of the image. */
    url: string;
}
export declare function knowledgeBaseImageContentSerializer(item: KnowledgeBaseImageContent): any;
export declare function knowledgeBaseImageContentDeserializer(item: any): KnowledgeBaseImageContent;
export declare function knowledgeRetrievalIntentUnionArraySerializer(result: Array<KnowledgeRetrievalIntentUnion>): any[];
/** An intended query to execute without model query planning. */
export interface KnowledgeRetrievalIntent {
    /** The type of the intent. */
    /** The discriminator possible values: semantic */
    type: KnowledgeRetrievalIntentType;
}
export declare function knowledgeRetrievalIntentSerializer(item: KnowledgeRetrievalIntent): any;
/** Alias for KnowledgeRetrievalIntentUnion */
export type KnowledgeRetrievalIntentUnion = KnowledgeRetrievalSemanticIntent | KnowledgeRetrievalIntent;
export declare function knowledgeRetrievalIntentUnionSerializer(item: KnowledgeRetrievalIntentUnion): any;
/** The kind of knowledge base configuration to use. */
export declare enum KnownKnowledgeRetrievalIntentType {
    /** A natural language semantic query intent. */
    Semantic = "semantic"
}
/**
 * The kind of knowledge base configuration to use. \
 * {@link KnownKnowledgeRetrievalIntentType} can be used interchangeably with KnowledgeRetrievalIntentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **semantic**: A natural language semantic query intent.
 */
export type KnowledgeRetrievalIntentType = string;
/** A semantic query intent. */
export interface KnowledgeRetrievalSemanticIntent extends KnowledgeRetrievalIntent {
    /** The discriminator value. */
    type: "semantic";
    /** The semantic query to execute */
    search: string;
}
export declare function knowledgeRetrievalSemanticIntentSerializer(item: KnowledgeRetrievalSemanticIntent): any;
export declare function knowledgeSourceParamsUnionArraySerializer(result: Array<KnowledgeSourceParamsUnion>): any[];
/** Base type for knowledge source runtime parameters. */
export interface KnowledgeSourceParams {
    /** The name of the index the params apply to. */
    knowledgeSourceName: string;
    /** Indicates whether references should be included for data retrieved from this source. */
    includeReferences?: boolean;
    /** Indicates whether references should include the structured data obtained during retrieval in their payload. */
    includeReferenceSourceData?: boolean;
    /** Indicates that this knowledge source should bypass source selection and always be queried at retrieval time. */
    alwaysQuerySource?: boolean;
    /** Indicates that the entire retrieval request should fail if retrieval from this knowledge source encounters an error. Defaults to false. */
    failOnError?: boolean;
    /** The reranker threshold all retrieved documents must meet to be included in the response. */
    rerankerThreshold?: number;
    /** Limits the maximum number of documents returned from this knowledge source. */
    maxOutputDocuments?: number;
    /** The type of the knowledge source. */
    /** The discriminator possible values: searchIndex, azureBlob, indexedSharePoint, indexedOneLake, web, remoteSharePoint, workIQ, fabricDataAgent, fabricOntology, mcpServer, file, indexedSql */
    kind: KnowledgeSourceKind;
    /** Indicates whether image serving should be enabled for this knowledge source at retrieval time. When true, images extracted during ingestion are delivered to downstream models. */
    enableImageServing?: boolean;
}
export declare function knowledgeSourceParamsSerializer(item: KnowledgeSourceParams): any;
/** Alias for KnowledgeSourceParamsUnion */
export type KnowledgeSourceParamsUnion = SearchIndexKnowledgeSourceParams | AzureBlobKnowledgeSourceParams | IndexedSharePointKnowledgeSourceParams | IndexedOneLakeKnowledgeSourceParams | WebKnowledgeSourceParams | RemoteSharePointKnowledgeSourceParams | WorkIQKnowledgeSourceParams | FabricDataAgentKnowledgeSourceParams | FabricOntologyKnowledgeSourceParams | McpServerKnowledgeSourceParams | FileKnowledgeSourceParams | IndexedSqlKnowledgeSourceParams | KnowledgeSourceParams;
export declare function knowledgeSourceParamsUnionSerializer(item: KnowledgeSourceParamsUnion): any;
/** Specifies runtime parameters for a search index knowledge source */
export interface SearchIndexKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "searchIndex";
    /** A filter condition applied to the index (e.g., 'State eq VA'). */
    filterAddOn?: string;
}
export declare function searchIndexKnowledgeSourceParamsSerializer(item: SearchIndexKnowledgeSourceParams): any;
/** Specifies runtime parameters for a azure blob knowledge source */
export interface AzureBlobKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "azureBlob";
}
export declare function azureBlobKnowledgeSourceParamsSerializer(item: AzureBlobKnowledgeSourceParams): any;
/** Specifies runtime parameters for a indexed SharePoint knowledge source */
export interface IndexedSharePointKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "indexedSharePoint";
}
export declare function indexedSharePointKnowledgeSourceParamsSerializer(item: IndexedSharePointKnowledgeSourceParams): any;
/** Specifies runtime parameters for a indexed OneLake knowledge source */
export interface IndexedOneLakeKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "indexedOneLake";
}
export declare function indexedOneLakeKnowledgeSourceParamsSerializer(item: IndexedOneLakeKnowledgeSourceParams): any;
/** Specifies runtime parameters for a web knowledge source */
export interface WebKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "web";
    /** The language of the web results. */
    language?: string;
    /** The market of the web results. */
    market?: string;
    /** The number of web results to return. */
    count?: number;
    /** The freshness of web results. */
    freshness?: string;
}
export declare function webKnowledgeSourceParamsSerializer(item: WebKnowledgeSourceParams): any;
/** Specifies runtime parameters for a remote SharePoint knowledge source */
export interface RemoteSharePointKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "remoteSharePoint";
    /** A filter condition applied to the SharePoint data source. It must be specified in the Keyword Query Language syntax. It will be combined as a conjunction with the filter expression specified in the knowledge source definition. */
    filterExpressionAddOn?: string;
}
export declare function remoteSharePointKnowledgeSourceParamsSerializer(item: RemoteSharePointKnowledgeSourceParams): any;
/** Specifies runtime parameters for a WorkIQ knowledge source */
export interface WorkIQKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "workIQ";
}
export declare function workIQKnowledgeSourceParamsSerializer(item: WorkIQKnowledgeSourceParams): any;
/** Specifies runtime parameters for a Fabric Data Agent knowledge source */
export interface FabricDataAgentKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "fabricDataAgent";
}
export declare function fabricDataAgentKnowledgeSourceParamsSerializer(item: FabricDataAgentKnowledgeSourceParams): any;
/** Specifies runtime parameters for a Fabric Ontology knowledge source */
export interface FabricOntologyKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "fabricOntology";
}
export declare function fabricOntologyKnowledgeSourceParamsSerializer(item: FabricOntologyKnowledgeSourceParams): any;
/** Specifies runtime parameters for an MCP server knowledge source */
export interface McpServerKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "mcpServer";
}
export declare function mcpServerKnowledgeSourceParamsSerializer(item: McpServerKnowledgeSourceParams): any;
/** Specifies runtime parameters for a File knowledge source */
export interface FileKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "file";
}
export declare function fileKnowledgeSourceParamsSerializer(item: FileKnowledgeSourceParams): any;
/** Specifies runtime parameters for an indexed SQL knowledge source */
export interface IndexedSqlKnowledgeSourceParams extends KnowledgeSourceParams {
    /** The discriminator value. */
    kind: "indexedSql";
}
export declare function indexedSqlKnowledgeSourceParamsSerializer(item: IndexedSqlKnowledgeSourceParams): any;
/** The output contract for the retrieval response. */
export interface KnowledgeBaseRetrievalResponse {
    /** The response messages. */
    response?: KnowledgeBaseMessage[];
    /** The activity records for tracking progress and billing implications. */
    activity?: KnowledgeBaseActivityRecordUnion[];
    /** The references for the retrieval data used in the response. */
    references?: KnowledgeBaseReferenceUnion[];
    /** The sensitivity label information for the overall response. */
    responseSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}
export declare function knowledgeBaseRetrievalResponseDeserializer(item: any): KnowledgeBaseRetrievalResponse;
export declare function knowledgeBaseActivityRecordUnionArrayDeserializer(result: Array<KnowledgeBaseActivityRecordUnion>): any[];
/** Base type for activity records. Tracks execution details, timing, and errors for knowledge base operations. */
export interface KnowledgeBaseActivityRecord {
    /** The ID of the activity record. */
    id: number;
    /** The type of the activity record. */
    /** The discriminator possible values: modelQueryPlanning, modelAnswerSynthesis, modelWebSummarization, agenticReasoning */
    type: KnowledgeBaseActivityRecordType;
    /** The elapsed time in milliseconds for the retrieval activity. */
    elapsedMs?: number;
    /** The error detail explaining why the operation failed. This property is only included when the activity does not succeed. */
    error?: KnowledgeBaseErrorDetail;
    /** A warning message surfacing potential configuration issues observed during the activity, such as documents dropped due to score thresholding, token limit truncation, or timeout conditions. */
    warning?: string;
}
export declare function knowledgeBaseActivityRecordDeserializer(item: any): KnowledgeBaseActivityRecord;
/** Alias for KnowledgeBaseActivityRecordUnion */
export type KnowledgeBaseActivityRecordUnion = KnowledgeBaseModelQueryPlanningActivityRecord | KnowledgeBaseModelAnswerSynthesisActivityRecord | KnowledgeBaseModelWebSummarizationActivityRecord | KnowledgeBaseAgenticReasoningActivityRecord | KnowledgeBaseActivityRecord;
export declare function knowledgeBaseActivityRecordUnionDeserializer(item: any): KnowledgeBaseActivityRecordUnion;
/** The type of activity record. */
export declare enum KnownKnowledgeBaseActivityRecordType {
    /** Search index retrieval activity. */
    SearchIndex = "searchIndex",
    /** Azure Blob retrieval activity. */
    AzureBlob = "azureBlob",
    /** Indexed SharePoint retrieval activity. */
    IndexedSharePoint = "indexedSharePoint",
    /** Indexed OneLake retrieval activity. */
    IndexedOneLake = "indexedOneLake",
    /** Web retrieval activity. */
    Web = "web",
    /** Remote SharePoint retrieval activity. */
    RemoteSharePoint = "remoteSharePoint",
    /** WorkIQ retrieval activity. */
    WorkIQ = "workIQ",
    /** Fabric Data Agent retrieval activity. */
    FabricDataAgent = "fabricDataAgent",
    /** Fabric Ontology retrieval activity. */
    FabricOntology = "fabricOntology",
    /** MCP server retrieval activity. */
    McpServer = "mcpServer",
    /** File retrieval activity. */
    File = "file",
    /** Indexed SQL retrieval activity. */
    IndexedSql = "indexedSql",
    /** LLM query planning activity. */
    ModelQueryPlanning = "modelQueryPlanning",
    /** LLM answer synthesis activity. */
    ModelAnswerSynthesis = "modelAnswerSynthesis",
    /** LLM web summarization activity. */
    ModelWebSummarization = "modelWebSummarization",
    /** Agentic reasoning activity. */
    AgenticReasoning = "agenticReasoning"
}
/**
 * The type of activity record. \
 * {@link KnownKnowledgeBaseActivityRecordType} can be used interchangeably with KnowledgeBaseActivityRecordType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **searchIndex**: Search index retrieval activity. \
 * **azureBlob**: Azure Blob retrieval activity. \
 * **indexedSharePoint**: Indexed SharePoint retrieval activity. \
 * **indexedOneLake**: Indexed OneLake retrieval activity. \
 * **web**: Web retrieval activity. \
 * **remoteSharePoint**: Remote SharePoint retrieval activity. \
 * **workIQ**: WorkIQ retrieval activity. \
 * **fabricDataAgent**: Fabric Data Agent retrieval activity. \
 * **fabricOntology**: Fabric Ontology retrieval activity. \
 * **mcpServer**: MCP server retrieval activity. \
 * **file**: File retrieval activity. \
 * **indexedSql**: Indexed SQL retrieval activity. \
 * **modelQueryPlanning**: LLM query planning activity. \
 * **modelAnswerSynthesis**: LLM answer synthesis activity. \
 * **modelWebSummarization**: LLM web summarization activity. \
 * **agenticReasoning**: Agentic reasoning activity.
 */
export type KnowledgeBaseActivityRecordType = string;
/** The error details. */
export interface KnowledgeBaseErrorDetail {
    /** The error code. */
    readonly code?: string;
    /** The error message. */
    readonly message?: string;
    /** The error target. */
    readonly target?: string;
    /** The error details. */
    readonly details?: KnowledgeBaseErrorDetail[];
    /** The error additional info. */
    readonly additionalInfo?: KnowledgeBaseErrorAdditionalInfo[];
}
export declare function knowledgeBaseErrorDetailDeserializer(item: any): KnowledgeBaseErrorDetail;
export declare function knowledgeBaseErrorDetailArrayDeserializer(result: Array<KnowledgeBaseErrorDetail>): any[];
export declare function knowledgeBaseErrorAdditionalInfoArrayDeserializer(result: Array<KnowledgeBaseErrorAdditionalInfo>): any[];
/** The resource management error additional info. */
export interface KnowledgeBaseErrorAdditionalInfo {
    /** The additional info type. */
    readonly type?: string;
    /** The additional info. */
    readonly info?: Record<string, any>;
}
export declare function knowledgeBaseErrorAdditionalInfoDeserializer(item: any): KnowledgeBaseErrorAdditionalInfo;
/** Represents an LLM query planning activity record. */
export interface KnowledgeBaseModelQueryPlanningActivityRecord extends KnowledgeBaseActivityRecord {
    /** The discriminator value. */
    type: "modelQueryPlanning";
    /** The number of input tokens for the LLM query planning activity. */
    inputTokens?: number;
    /** The number of output tokens for the LLM query planning activity. */
    outputTokens?: number;
    /** The name of the model used for the LLM query planning activity. */
    modelName?: string;
}
export declare function knowledgeBaseModelQueryPlanningActivityRecordDeserializer(item: any): KnowledgeBaseModelQueryPlanningActivityRecord;
/** Represents an LLM answer synthesis activity record. */
export interface KnowledgeBaseModelAnswerSynthesisActivityRecord extends KnowledgeBaseActivityRecord {
    /** The discriminator value. */
    type: "modelAnswerSynthesis";
    /** The number of input tokens for the LLM answer synthesis activity. */
    inputTokens?: number;
    /** The number of output tokens for the LLM answer synthesis activity. */
    outputTokens?: number;
    /** The name of the model used for the LLM answer synthesis activity. */
    modelName?: string;
}
export declare function knowledgeBaseModelAnswerSynthesisActivityRecordDeserializer(item: any): KnowledgeBaseModelAnswerSynthesisActivityRecord;
/** Represents an LLM web summarization activity record. */
export interface KnowledgeBaseModelWebSummarizationActivityRecord extends KnowledgeBaseActivityRecord {
    /** The discriminator value. */
    type: "modelWebSummarization";
    /** The number of input tokens for the LLM web summarization activity. */
    inputTokensCount?: number;
    /** The number of output tokens for the LLM web summarization activity. */
    outputTokensCount?: number;
    /** The name of the model used for the LLM web summarization activity. */
    modelName?: string;
}
export declare function knowledgeBaseModelWebSummarizationActivityRecordDeserializer(item: any): KnowledgeBaseModelWebSummarizationActivityRecord;
/** Represents an agentic reasoning activity record. */
export interface KnowledgeBaseAgenticReasoningActivityRecord extends KnowledgeBaseActivityRecord {
    /** The discriminator value. */
    type: "agenticReasoning";
    /** The number of input tokens for agentic reasoning. */
    reasoningTokens?: number;
    /** The retrieval reasoning effort configuration. */
    retrievalReasoningEffort?: KnowledgeRetrievalReasoningEffortUnion;
}
export declare function knowledgeBaseAgenticReasoningActivityRecordDeserializer(item: any): KnowledgeBaseAgenticReasoningActivityRecord;
export declare function knowledgeBaseReferenceUnionArrayDeserializer(result: Array<KnowledgeBaseReferenceUnion>): any[];
/** Base type for references. */
export interface KnowledgeBaseReference {
    /** The type of the reference. */
    /** The discriminator possible values: searchIndex, azureBlob, indexedSharePoint, indexedOneLake, web, remoteSharePoint, workIQ, fabricDataAgent, fabricOntology, mcpServer, file, indexedSql */
    type: KnowledgeBaseReferenceType;
    /** The ID of the reference. */
    id: string;
    /** The source activity ID for the reference. */
    activitySource: number;
    /** The source data for the reference. */
    sourceData?: Record<string, any>;
    /** The reranker score for the document reference. */
    rerankerScore?: number;
}
export declare function knowledgeBaseReferenceDeserializer(item: any): KnowledgeBaseReference;
/** Alias for KnowledgeBaseReferenceUnion */
export type KnowledgeBaseReferenceUnion = KnowledgeBaseSearchIndexReference | KnowledgeBaseAzureBlobReference | KnowledgeBaseIndexedSharePointReference | KnowledgeBaseIndexedOneLakeReference | KnowledgeBaseWebReference | KnowledgeBaseRemoteSharePointReference | KnowledgeBaseWorkIQReference | KnowledgeBaseFabricDataAgentReference | KnowledgeBaseFabricOntologyReference | KnowledgeBaseMcpServerReference | KnowledgeBaseFileReference | KnowledgeBaseIndexedSqlReference | KnowledgeBaseReference;
export declare function knowledgeBaseReferenceUnionDeserializer(item: any): KnowledgeBaseReferenceUnion;
/** The type of reference. */
export declare enum KnownKnowledgeBaseReferenceType {
    /** Search index document reference. */
    SearchIndex = "searchIndex",
    /** Azure Blob document reference. */
    AzureBlob = "azureBlob",
    /** Indexed SharePoint document reference. */
    IndexedSharePoint = "indexedSharePoint",
    /** Indexed OneLake document reference. */
    IndexedOneLake = "indexedOneLake",
    /** Web document reference. */
    Web = "web",
    /** Remote SharePoint document reference. */
    RemoteSharePoint = "remoteSharePoint",
    /** Work IQ document reference. */
    WorkIQ = "workIQ",
    /** Fabric Data Agent document reference. */
    FabricDataAgent = "fabricDataAgent",
    /** Fabric Ontology document reference. */
    FabricOntology = "fabricOntology",
    /** MCP server document reference. */
    McpServer = "mcpServer",
    /** File document reference. */
    File = "file",
    /** Indexed SQL document reference. */
    IndexedSql = "indexedSql"
}
/**
 * The type of reference. \
 * {@link KnownKnowledgeBaseReferenceType} can be used interchangeably with KnowledgeBaseReferenceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **searchIndex**: Search index document reference. \
 * **azureBlob**: Azure Blob document reference. \
 * **indexedSharePoint**: Indexed SharePoint document reference. \
 * **indexedOneLake**: Indexed OneLake document reference. \
 * **web**: Web document reference. \
 * **remoteSharePoint**: Remote SharePoint document reference. \
 * **workIQ**: Work IQ document reference. \
 * **fabricDataAgent**: Fabric Data Agent document reference. \
 * **fabricOntology**: Fabric Ontology document reference. \
 * **mcpServer**: MCP server document reference. \
 * **file**: File document reference. \
 * **indexedSql**: Indexed SQL document reference.
 */
export type KnowledgeBaseReferenceType = string;
/** Represents an Azure Search document reference. */
export interface KnowledgeBaseSearchIndexReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "searchIndex";
    /** The document key for the reference. */
    docKey?: string;
    /** The sensitivity label information for the reference. */
    searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}
export declare function knowledgeBaseSearchIndexReferenceDeserializer(item: any): KnowledgeBaseSearchIndexReference;
/** Information about the sensitivity label applied to a document */
export interface PurviewSensitivityLabelInfo {
    /** The display name for the sensitivity label. */
    displayName?: string;
    /** The ID of the sensitivity label. */
    sensitivityLabelId?: string;
    /** The tooltip that should be displayed for the label in a UI. */
    toolTip?: string;
    /** The priority in which the sensitivity label is applied. */
    priority?: number;
    /** The color that the UI should display for the label, if configured. */
    color?: string;
    /** Indicates whether the sensitivity label enforces encryption. */
    isEncrypted?: boolean;
}
export declare function purviewSensitivityLabelInfoDeserializer(item: any): PurviewSensitivityLabelInfo;
/** Represents an Azure Blob Storage document reference. */
export interface KnowledgeBaseAzureBlobReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "azureBlob";
    /** The blob URL for the reference. */
    blobUrl?: string;
    /** The sensitivity label information for the reference. */
    searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}
export declare function knowledgeBaseAzureBlobReferenceDeserializer(item: any): KnowledgeBaseAzureBlobReference;
/** Represents an indexed SharePoint document reference. */
export interface KnowledgeBaseIndexedSharePointReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "indexedSharePoint";
    /** The document URL for the reference. */
    docUrl?: string;
    /** The sensitivity label information for the reference. */
    searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}
export declare function knowledgeBaseIndexedSharePointReferenceDeserializer(item: any): KnowledgeBaseIndexedSharePointReference;
/** Represents an indexed OneLake document reference. */
export interface KnowledgeBaseIndexedOneLakeReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "indexedOneLake";
    /** The document URL for the reference. */
    docUrl?: string;
    /** The sensitivity label information for the reference. */
    searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}
export declare function knowledgeBaseIndexedOneLakeReferenceDeserializer(item: any): KnowledgeBaseIndexedOneLakeReference;
/** Represents a web document reference. */
export interface KnowledgeBaseWebReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "web";
    /** The url the reference data originated from. */
    url?: string;
    /** The title of the web document. */
    title?: string;
}
export declare function knowledgeBaseWebReferenceDeserializer(item: any): KnowledgeBaseWebReference;
/** Represents a remote SharePoint document reference. */
export interface KnowledgeBaseRemoteSharePointReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "remoteSharePoint";
    /** The url the reference data originated from. */
    webUrl?: string;
    /** The sensitivity label information for the reference. */
    searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}
export declare function knowledgeBaseRemoteSharePointReferenceDeserializer(item: any): KnowledgeBaseRemoteSharePointReference;
/** Represents a WorkIQ document reference. */
export interface KnowledgeBaseWorkIQReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "workIQ";
    /** The attributions for the reference. */
    attributions?: WorkIQAttribution[];
}
export declare function knowledgeBaseWorkIQReferenceDeserializer(item: any): KnowledgeBaseWorkIQReference;
export declare function workIQAttributionArrayDeserializer(result: Array<WorkIQAttribution>): any[];
/** Attribution information for a WorkIQ reference. */
export interface WorkIQAttribution {
    /** The URL for the attribution. */
    seeMoreWebUrl?: string;
}
export declare function workIQAttributionDeserializer(item: any): WorkIQAttribution;
/** Represents a Fabric Data Agent document reference. */
export interface KnowledgeBaseFabricDataAgentReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "fabricDataAgent";
    /** The Fabric workspace ID. */
    workspaceId?: string;
    /** The Fabric Data Agent ID. */
    dataAgentId?: string;
}
export declare function knowledgeBaseFabricDataAgentReferenceDeserializer(item: any): KnowledgeBaseFabricDataAgentReference;
/** Represents a Fabric Ontology document reference. */
export interface KnowledgeBaseFabricOntologyReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "fabricOntology";
    /** The Fabric workspace ID. */
    workspaceId?: string;
    /** The ontology ID within the workspace. */
    ontologyId?: string;
}
export declare function knowledgeBaseFabricOntologyReferenceDeserializer(item: any): KnowledgeBaseFabricOntologyReference;
/** Represents an MCP server document reference. */
export interface KnowledgeBaseMcpServerReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "mcpServer";
    /** The name of the MCP server tool that produced the reference. */
    toolName?: string;
    /** The title of the MCP server tool result. */
    title?: string;
}
export declare function knowledgeBaseMcpServerReferenceDeserializer(item: any): KnowledgeBaseMcpServerReference;
/** Represents a file document reference. */
export interface KnowledgeBaseFileReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "file";
    /** The document name for the reference. */
    docName?: string;
}
export declare function knowledgeBaseFileReferenceDeserializer(item: any): KnowledgeBaseFileReference;
/** Represents an Azure SQL document reference. */
export interface KnowledgeBaseIndexedSqlReference extends KnowledgeBaseReference {
    /** The discriminator value. */
    type: "indexedSql";
    /** The document URL for the reference. */
    docUrl?: string;
}
export declare function knowledgeBaseIndexedSqlReferenceDeserializer(item: any): KnowledgeBaseIndexedSqlReference;
//# sourceMappingURL=models.d.ts.map