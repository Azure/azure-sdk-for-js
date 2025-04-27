
import type { AbortSignalLike } from '@azure/abort-controller';
import type { CancelOnProgress } from '@azure/core-lro';
import type { Client } from '@azure-rest/core-client';
import type { ClientOptions } from '@azure-rest/core-client';
import type { CreateHttpPollerOptions } from '@azure/core-lro';
import type { HttpResponse } from '@azure-rest/core-client';
import type { KeyCredential } from '@azure/core-auth';
import type { OperationState } from '@azure/core-lro';
import type { PathUncheckedResponse } from '@azure-rest/core-client';
import type { RawHttpHeaders } from '@azure/core-rest-pipeline';
import type { RawHttpHeadersInput } from '@azure/core-rest-pipeline';
import type { RequestParameters } from '@azure-rest/core-client';
import type { StreamableMethod } from '@azure-rest/core-client';
import type { TokenCredential } from '@azure/core-auth';

// @public
export interface AddressValueOutput {
    city?: string;
    cityDistrict?: string;
    countryRegion?: string;
    house?: string;
    houseNumber?: string;
    level?: string;
    poBox?: string;
    postalCode?: string;
    road?: string;
    state?: string;
    stateDistrict?: string;
    streetAddress?: string;
    suburb?: string;
    unit?: string;
}

// @public (undocumented)
export interface AnalyzeBatchDocuments {
    post(options: AnalyzeBatchDocumentsParameters): StreamableMethod<AnalyzeBatchDocuments202Response | AnalyzeBatchDocumentsDefaultResponse>;
}

// @public (undocumented)
export interface AnalyzeBatchDocuments202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface AnalyzeBatchDocuments202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & AnalyzeBatchDocuments202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface AnalyzeBatchDocumentsBodyParam {
    body: AnalyzeBatchDocumentsRequest;
}

// @public (undocumented)
export interface AnalyzeBatchDocumentsDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public
export interface AnalyzeBatchDocumentsFeaturesQueryParam {
    explode: false;
    style: "form";
    value: DocumentAnalysisFeature[];
}

// @public
export interface AnalyzeBatchDocumentsLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface AnalyzeBatchDocumentsMediaTypesParam {
    contentType: "application/json";
}

// @public
export interface AnalyzeBatchDocumentsOutputQueryParam {
    explode: false;
    style: "form";
    value: AnalyzeOutputOption[];
}

// @public (undocumented)
export type AnalyzeBatchDocumentsParameters = AnalyzeBatchDocumentsQueryParam & AnalyzeBatchDocumentsMediaTypesParam & AnalyzeBatchDocumentsBodyParam & RequestParameters;

// @public
export interface AnalyzeBatchDocumentsQueryFieldsQueryParam {
    explode: false;
    style: "form";
    value: string[];
}

// @public (undocumented)
export interface AnalyzeBatchDocumentsQueryParam {
    // (undocumented)
    queryParameters?: AnalyzeBatchDocumentsQueryParamProperties;
}

// @public (undocumented)
export interface AnalyzeBatchDocumentsQueryParamProperties {
    features?: DocumentAnalysisFeature[] | AnalyzeBatchDocumentsFeaturesQueryParam;
    locale?: string;
    output?: AnalyzeOutputOption[] | AnalyzeBatchDocumentsOutputQueryParam;
    outputContentFormat?: DocumentContentFormat;
    pages?: string;
    queryFields?: string[] | AnalyzeBatchDocumentsQueryFieldsQueryParam;
    stringIndexType?: StringIndexType;
}

// @public
export interface AnalyzeBatchDocumentsRequest {
    azureBlobFileListSource?: AzureBlobFileListContentSource;
    azureBlobSource?: AzureBlobContentSource;
    overwriteExisting?: boolean;
    resultContainerUrl: string;
    resultPrefix?: string;
}

// @public
export interface AnalyzeBatchOperationDetailOutput {
    error?: DocumentIntelligenceErrorOutput;
    resultUrl?: string;
    sourceUrl: string;
    status: DocumentIntelligenceOperationStatusOutput;
}

// @public
export interface AnalyzeBatchOperationOutput {
    createdDateTime: string;
    error?: DocumentIntelligenceErrorOutput;
    lastUpdatedDateTime: string;
    percentCompleted?: number;
    result?: AnalyzeBatchResultOutput;
    resultId?: string;
    status: DocumentIntelligenceOperationStatusOutput;
}

// @public
export interface AnalyzeBatchResultOutput {
    details?: Array<AnalyzeBatchOperationDetailOutput>;
    failedCount: number;
    skippedCount: number;
    succeededCount: number;
}

// @public
export interface AnalyzedDocumentOutput {
    boundingRegions?: Array<BoundingRegionOutput>;
    confidence: number;
    docType: string;
    fields?: Record<string, DocumentFieldOutput>;
    spans: Array<DocumentSpanOutput>;
}

// @public (undocumented)
export interface AnalyzeDocument202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface AnalyzeDocument202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & AnalyzeDocument202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface AnalyzeDocumentBodyParam {
    body: AnalyzeDocumentRequest;
}

// @public (undocumented)
export interface AnalyzeDocumentDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public
export interface AnalyzeDocumentFeaturesQueryParam {
    explode: false;
    style: "form";
    value: DocumentAnalysisFeature[];
}

// @public (undocumented)
export interface AnalyzeDocumentFromStream {
    post(options: AnalyzeDocumentFromStreamParameters): StreamableMethod<AnalyzeDocumentFromStream202Response | AnalyzeDocumentFromStreamDefaultResponse>;
    post(options: AnalyzeDocumentParameters): StreamableMethod<AnalyzeDocument202Response | AnalyzeDocumentDefaultResponse>;
}

// @public (undocumented)
export interface AnalyzeDocumentFromStream202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface AnalyzeDocumentFromStream202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & AnalyzeDocumentFromStream202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface AnalyzeDocumentFromStreamBodyParam {
    body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

// @public (undocumented)
export interface AnalyzeDocumentFromStreamDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public
export interface AnalyzeDocumentFromStreamFeaturesQueryParam {
    explode: false;
    style: "form";
    value: DocumentAnalysisFeature[];
}

// @public
export interface AnalyzeDocumentFromStreamLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface AnalyzeDocumentFromStreamMediaTypesParam {
    contentType: "application/octet-stream" | "application/pdf" | "image/jpeg" | "image/png" | "image/tiff" | "image/bmp" | "image/heif" | "text/html" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.presentationml.presentation";
}

// @public
export interface AnalyzeDocumentFromStreamOutputQueryParam {
    explode: false;
    style: "form";
    value: AnalyzeOutputOption[];
}

// @public (undocumented)
export type AnalyzeDocumentFromStreamParameters = AnalyzeDocumentFromStreamQueryParam & AnalyzeDocumentFromStreamMediaTypesParam & AnalyzeDocumentFromStreamBodyParam & RequestParameters;

// @public
export interface AnalyzeDocumentFromStreamQueryFieldsQueryParam {
    explode: false;
    style: "form";
    value: string[];
}

// @public (undocumented)
export interface AnalyzeDocumentFromStreamQueryParam {
    // (undocumented)
    queryParameters?: AnalyzeDocumentFromStreamQueryParamProperties;
}

// @public (undocumented)
export interface AnalyzeDocumentFromStreamQueryParamProperties {
    features?: DocumentAnalysisFeature[] | AnalyzeDocumentFromStreamFeaturesQueryParam;
    locale?: string;
    output?: AnalyzeOutputOption[] | AnalyzeDocumentFromStreamOutputQueryParam;
    outputContentFormat?: DocumentContentFormat;
    pages?: string;
    queryFields?: string[] | AnalyzeDocumentFromStreamQueryFieldsQueryParam;
    stringIndexType?: StringIndexType;
}

// @public
export interface AnalyzeDocumentLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface AnalyzeDocumentMediaTypesParam {
    contentType: "application/json";
}

// @public
export interface AnalyzeDocumentOutputQueryParam {
    explode: false;
    style: "form";
    value: AnalyzeOutputOption[];
}

// @public (undocumented)
export type AnalyzeDocumentParameters = AnalyzeDocumentQueryParam & AnalyzeDocumentMediaTypesParam & AnalyzeDocumentBodyParam & RequestParameters;

// @public
export interface AnalyzeDocumentQueryFieldsQueryParam {
    explode: false;
    style: "form";
    value: string[];
}

// @public (undocumented)
export interface AnalyzeDocumentQueryParam {
    // (undocumented)
    queryParameters?: AnalyzeDocumentQueryParamProperties;
}

// @public (undocumented)
export interface AnalyzeDocumentQueryParamProperties {
    features?: DocumentAnalysisFeature[] | AnalyzeDocumentFeaturesQueryParam;
    locale?: string;
    output?: AnalyzeOutputOption[] | AnalyzeDocumentOutputQueryParam;
    outputContentFormat?: DocumentContentFormat;
    pages?: string;
    queryFields?: string[] | AnalyzeDocumentQueryFieldsQueryParam;
    stringIndexType?: StringIndexType;
}

// @public
export interface AnalyzeDocumentRequest {
    base64Source?: string;
    urlSource?: string;
}

// @public
export interface AnalyzeOperationOutput {
    analyzeResult?: AnalyzeResultOutput;
    createdDateTime: string;
    error?: DocumentIntelligenceErrorOutput;
    lastUpdatedDateTime: string;
    status: DocumentIntelligenceOperationStatusOutput;
}

// @public
export type AnalyzeOutputOption = string;

// @public
export interface AnalyzeResultOutput {
    apiVersion: string;
    content: string;
    contentFormat?: DocumentContentFormatOutput;
    documents?: Array<AnalyzedDocumentOutput>;
    figures?: Array<DocumentFigureOutput>;
    keyValuePairs?: Array<DocumentKeyValuePairOutput>;
    languages?: Array<DocumentLanguageOutput>;
    modelId: string;
    pages: Array<DocumentPageOutput>;
    paragraphs?: Array<DocumentParagraphOutput>;
    sections?: Array<DocumentSectionOutput>;
    stringIndexType: StringIndexTypeOutput;
    styles?: Array<DocumentStyleOutput>;
    tables?: Array<DocumentTableOutput>;
    warnings?: Array<DocumentIntelligenceWarningOutput>;
}

// @public (undocumented)
export interface AuthorizeClassifierCopy {
    post(options: AuthorizeClassifierCopyParameters): StreamableMethod<AuthorizeClassifierCopy200Response | AuthorizeClassifierCopyDefaultResponse>;
}

// @public
export interface AuthorizeClassifierCopy200Response extends HttpResponse {
    // (undocumented)
    body: ClassifierCopyAuthorizationOutput;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface AuthorizeClassifierCopyBodyParam {
    body: AuthorizeClassifierCopyRequest;
}

// @public (undocumented)
export interface AuthorizeClassifierCopyDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type AuthorizeClassifierCopyParameters = AuthorizeClassifierCopyBodyParam & RequestParameters;

// @public
export interface AuthorizeClassifierCopyRequest {
    classifierId: string;
    description?: string;
    tags?: Record<string, string>;
}

// @public
export interface AuthorizeCopyRequest {
    description?: string;
    modelId: string;
    tags?: Record<string, string>;
}

// @public (undocumented)
export interface AuthorizeModelCopy {
    post(options: AuthorizeModelCopyParameters): StreamableMethod<AuthorizeModelCopy200Response | AuthorizeModelCopyDefaultResponse>;
}

// @public
export interface AuthorizeModelCopy200Response extends HttpResponse {
    // (undocumented)
    body: ModelCopyAuthorizationOutput;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface AuthorizeModelCopyBodyParam {
    body: AuthorizeCopyRequest;
}

// @public (undocumented)
export interface AuthorizeModelCopyDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type AuthorizeModelCopyParameters = AuthorizeModelCopyBodyParam & RequestParameters;

// @public
export interface AzureBlobContentSource {
    containerUrl: string;
    prefix?: string;
}

// @public
export interface AzureBlobContentSourceOutput {
    containerUrl: string;
    prefix?: string;
}

// @public
export interface AzureBlobFileListContentSource {
    containerUrl: string;
    fileList: string;
}

// @public
export interface AzureBlobFileListContentSourceOutput {
    containerUrl: string;
    fileList: string;
}

// @public
export interface BoundingRegionOutput {
    pageNumber: number;
    polygon: number[];
}

// @public (undocumented)
export interface BuildClassifier {
    post(options: BuildClassifierParameters): StreamableMethod<BuildClassifier202Response | BuildClassifierDefaultResponse>;
}

// @public (undocumented)
export interface BuildClassifier202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface BuildClassifier202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & BuildClassifier202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface BuildClassifierBodyParam {
    body: BuildDocumentClassifierRequest;
}

// @public (undocumented)
export interface BuildClassifierDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public
export interface BuildClassifierLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export type BuildClassifierParameters = BuildClassifierBodyParam & RequestParameters;

// @public
export interface BuildDocumentClassifierRequest {
    allowOverwrite?: boolean;
    baseClassifierId?: string;
    classifierId: string;
    description?: string;
    docTypes: Record<string, ClassifierDocumentTypeDetails>;
}

// @public
export interface BuildDocumentModelRequest {
    allowOverwrite?: boolean;
    azureBlobFileListSource?: AzureBlobFileListContentSource;
    azureBlobSource?: AzureBlobContentSource;
    buildMode: DocumentBuildMode;
    description?: string;
    maxTrainingHours?: number;
    modelId: string;
    tags?: Record<string, string>;
}

// @public (undocumented)
export interface BuildModel {
    post(options: BuildModelParameters): StreamableMethod<BuildModel202Response | BuildModelDefaultResponse>;
}

// @public (undocumented)
export interface BuildModel202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface BuildModel202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & BuildModel202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface BuildModelBodyParam {
    body: BuildDocumentModelRequest;
}

// @public (undocumented)
export interface BuildModelDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public
export interface BuildModelLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export type BuildModelParameters = BuildModelBodyParam & RequestParameters;

// @public
export interface ClassifierCopyAuthorization {
    accessToken: string;
    expirationDateTime: Date | string;
    targetClassifierId: string;
    targetClassifierLocation: string;
    targetResourceId: string;
    targetResourceRegion: string;
}

// @public
export interface ClassifierCopyAuthorizationOutput {
    accessToken: string;
    expirationDateTime: string;
    targetClassifierId: string;
    targetClassifierLocation: string;
    targetResourceId: string;
    targetResourceRegion: string;
}

// @public
export interface ClassifierDocumentTypeDetails {
    azureBlobFileListSource?: AzureBlobFileListContentSource;
    azureBlobSource?: AzureBlobContentSource;
    sourceKind?: ContentSourceKind;
}

// @public
export interface ClassifierDocumentTypeDetailsOutput {
    azureBlobFileListSource?: AzureBlobFileListContentSourceOutput;
    azureBlobSource?: AzureBlobContentSourceOutput;
    sourceKind?: ContentSourceKindOutput;
}

// @public (undocumented)
export interface ClassifyDocument202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface ClassifyDocument202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & ClassifyDocument202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface ClassifyDocumentBodyParam {
    body: ClassifyDocumentRequest;
}

// @public (undocumented)
export interface ClassifyDocumentDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface ClassifyDocumentFromStream {
    post(options: ClassifyDocumentFromStreamParameters): StreamableMethod<ClassifyDocumentFromStream202Response | ClassifyDocumentFromStreamDefaultResponse>;
    post(options: ClassifyDocumentParameters): StreamableMethod<ClassifyDocument202Response | ClassifyDocumentDefaultResponse>;
}

// @public (undocumented)
export interface ClassifyDocumentFromStream202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface ClassifyDocumentFromStream202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & ClassifyDocumentFromStream202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface ClassifyDocumentFromStreamBodyParam {
    body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

// @public (undocumented)
export interface ClassifyDocumentFromStreamDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public
export interface ClassifyDocumentFromStreamLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface ClassifyDocumentFromStreamMediaTypesParam {
    contentType: "application/octet-stream" | "application/pdf" | "image/jpeg" | "image/png" | "image/tiff" | "image/bmp" | "image/heif" | "text/html" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.presentationml.presentation";
}

// @public (undocumented)
export type ClassifyDocumentFromStreamParameters = ClassifyDocumentFromStreamQueryParam & ClassifyDocumentFromStreamMediaTypesParam & ClassifyDocumentFromStreamBodyParam & RequestParameters;

// @public (undocumented)
export interface ClassifyDocumentFromStreamQueryParam {
    // (undocumented)
    queryParameters?: ClassifyDocumentFromStreamQueryParamProperties;
}

// @public (undocumented)
export interface ClassifyDocumentFromStreamQueryParamProperties {
    pages?: string;
    split?: SplitMode;
    stringIndexType?: StringIndexType;
}

// @public
export interface ClassifyDocumentLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface ClassifyDocumentMediaTypesParam {
    contentType: "application/json";
}

// @public (undocumented)
export type ClassifyDocumentParameters = ClassifyDocumentQueryParam & ClassifyDocumentMediaTypesParam & ClassifyDocumentBodyParam & RequestParameters;

// @public (undocumented)
export interface ClassifyDocumentQueryParam {
    // (undocumented)
    queryParameters?: ClassifyDocumentQueryParamProperties;
}

// @public (undocumented)
export interface ClassifyDocumentQueryParamProperties {
    pages?: string;
    split?: SplitMode;
    stringIndexType?: StringIndexType;
}

// @public
export interface ClassifyDocumentRequest {
    base64Source?: string;
    urlSource?: string;
}

// @public
export interface ComposeDocumentModelRequest {
    classifierId: string;
    description?: string;
    docTypes: Record<string, DocumentTypeDetails>;
    modelId: string;
    split?: SplitMode;
    tags?: Record<string, string>;
}

// @public (undocumented)
export interface ComposeModel {
    post(options: ComposeModelParameters): StreamableMethod<ComposeModel202Response | ComposeModelDefaultResponse>;
}

// @public (undocumented)
export interface ComposeModel202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface ComposeModel202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & ComposeModel202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface ComposeModelBodyParam {
    body: ComposeDocumentModelRequest;
}

// @public (undocumented)
export interface ComposeModelDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public
export interface ComposeModelLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export type ComposeModelParameters = ComposeModelBodyParam & RequestParameters;

// @public
export type ContentSourceKind = string;

// @public
export type ContentSourceKindOutput = string;

// @public (undocumented)
export interface CopyClassifierTo {
    post(options: CopyClassifierToParameters): StreamableMethod<CopyClassifierTo202Response | CopyClassifierToDefaultResponse>;
}

// @public (undocumented)
export interface CopyClassifierTo202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface CopyClassifierTo202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & CopyClassifierTo202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface CopyClassifierToBodyParam {
    body: ClassifierCopyAuthorization;
}

// @public (undocumented)
export interface CopyClassifierToDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public
export interface CopyClassifierToLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export type CopyClassifierToParameters = CopyClassifierToBodyParam & RequestParameters;

// @public (undocumented)
export interface CopyModelTo {
    post(options: CopyModelToParameters): StreamableMethod<CopyModelTo202Response | CopyModelToDefaultResponse>;
}

// @public (undocumented)
export interface CopyModelTo202Headers {
    // (undocumented)
    "operation-location": string;
    "retry-after"?: number;
}

// @public
export interface CopyModelTo202Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & CopyModelTo202Headers;
    // (undocumented)
    status: "202";
}

// @public (undocumented)
export interface CopyModelToBodyParam {
    body: ModelCopyAuthorization;
}

// @public (undocumented)
export interface CopyModelToDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public
export interface CopyModelToLogicalResponse extends HttpResponse {
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export type CopyModelToParameters = CopyModelToBodyParam & RequestParameters;

// @public
function createClient(endpointParam: string, credentials: TokenCredential | KeyCredential, { apiVersion, ...options }?: DocumentIntelligenceClientOptions): DocumentIntelligenceClient;
export default createClient;

// @public
export interface CurrencyValueOutput {
    amount: number;
    currencyCode?: string;
    currencySymbol?: string;
}

// @public
export interface CustomDocumentModelsDetailsOutput {
    count: number;
    limit: number;
}

// @public
export interface DeleteAnalyzeBatchResult204Response extends HttpResponse {
    // (undocumented)
    status: "204";
}

// @public (undocumented)
export interface DeleteAnalyzeBatchResultDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type DeleteAnalyzeBatchResultParameters = RequestParameters;

// @public
export interface DeleteAnalyzeResult204Response extends HttpResponse {
    // (undocumented)
    status: "204";
}

// @public (undocumented)
export interface DeleteAnalyzeResultDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type DeleteAnalyzeResultParameters = RequestParameters;

// @public (undocumented)
export interface DeleteClassifier204Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface DeleteClassifier204Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & DeleteClassifier204Headers;
    // (undocumented)
    status: "204";
}

// @public (undocumented)
export interface DeleteClassifierDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface DeleteClassifierHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & DeleteClassifierHeaders;
}

// @public (undocumented)
export interface DeleteClassifierHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type DeleteClassifierParameters = DeleteClassifierHeaderParam & RequestParameters;

// @public (undocumented)
export interface DeleteModel204Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface DeleteModel204Response extends HttpResponse {
    // (undocumented)
    headers: RawHttpHeaders & DeleteModel204Headers;
    // (undocumented)
    status: "204";
}

// @public (undocumented)
export interface DeleteModelDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface DeleteModelHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & DeleteModelHeaders;
}

// @public (undocumented)
export interface DeleteModelHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type DeleteModelParameters = DeleteModelHeaderParam & RequestParameters;

// @public
export type DocumentAnalysisFeature = string;

// @public
export type DocumentAnalysisFeatureOutput = string;

// @public
export type DocumentBarcodeKindOutput = string;

// @public
export interface DocumentBarcodeOutput {
    confidence: number;
    kind: DocumentBarcodeKindOutput;
    polygon?: number[];
    span: DocumentSpanOutput;
    value: string;
}

// @public
export type DocumentBuildMode = string;

// @public
export type DocumentBuildModeOutput = string;

// @public
export interface DocumentCaptionOutput {
    boundingRegions?: Array<BoundingRegionOutput>;
    content: string;
    elements?: string[];
    spans: Array<DocumentSpanOutput>;
}

// @public
export interface DocumentClassifierBuildOperationDetailsOutput extends DocumentIntelligenceOperationDetailsOutputParent {
    kind: "documentClassifierBuild";
    result?: DocumentClassifierDetailsOutput;
}

// @public
export interface DocumentClassifierCopyToOperationDetailsOutput extends DocumentIntelligenceOperationDetailsOutputParent {
    kind: "documentClassifierCopyTo";
    result?: DocumentClassifierDetailsOutput;
}

// @public
export interface DocumentClassifierDetailsOutput {
    apiVersion: string;
    baseClassifierId?: string;
    classifierId: string;
    createdDateTime: string;
    description?: string;
    docTypes: Record<string, ClassifierDocumentTypeDetailsOutput>;
    expirationDateTime?: string;
    readonly modifiedDateTime?: string;
    warnings?: Array<DocumentIntelligenceWarningOutput>;
}

// @public
export type DocumentContentFormat = string;

// @public
export type DocumentContentFormatOutput = string;

// @public
export interface DocumentFieldOutput {
    boundingRegions?: Array<BoundingRegionOutput>;
    confidence?: number;
    content?: string;
    spans?: Array<DocumentSpanOutput>;
    type: DocumentFieldTypeOutput;
    valueAddress?: AddressValueOutput;
    valueArray?: Array<DocumentFieldOutput>;
    valueBoolean?: boolean;
    valueCountryRegion?: string;
    valueCurrency?: CurrencyValueOutput;
    valueDate?: string;
    valueInteger?: number;
    valueNumber?: number;
    valueObject?: Record<string, DocumentFieldOutput>;
    valuePhoneNumber?: string;
    valueSelectionGroup?: string[];
    valueSelectionMark?: DocumentSelectionMarkStateOutput;
    valueSignature?: DocumentSignatureTypeOutput;
    valueString?: string;
    valueTime?: string;
}

// @public
export interface DocumentFieldSchema {
    description?: string;
    example?: string;
    items?: DocumentFieldSchema;
    properties?: Record<string, DocumentFieldSchema>;
    type: DocumentFieldType;
}

// @public
export interface DocumentFieldSchemaOutput {
    description?: string;
    example?: string;
    items?: DocumentFieldSchemaOutput;
    properties?: Record<string, DocumentFieldSchemaOutput>;
    type: DocumentFieldTypeOutput;
}

// @public
export type DocumentFieldType = string;

// @public
export type DocumentFieldTypeOutput = string;

// @public
export interface DocumentFigureOutput {
    boundingRegions?: Array<BoundingRegionOutput>;
    caption?: DocumentCaptionOutput;
    elements?: string[];
    footnotes?: Array<DocumentFootnoteOutput>;
    id?: string;
    spans: Array<DocumentSpanOutput>;
}

// @public
export type DocumentFontStyleOutput = string;

// @public
export type DocumentFontWeightOutput = string;

// @public
export interface DocumentFootnoteOutput {
    boundingRegions?: Array<BoundingRegionOutput>;
    content: string;
    elements?: string[];
    spans: Array<DocumentSpanOutput>;
}

// @public
export type DocumentFormulaKindOutput = string;

// @public
export interface DocumentFormulaOutput {
    confidence: number;
    kind: DocumentFormulaKindOutput;
    polygon?: number[];
    span: DocumentSpanOutput;
    value: string;
}

// @public (undocumented)
export type DocumentIntelligenceClient = Client & {
    path: Routes;
};

// @public
export interface DocumentIntelligenceClientOptions extends ClientOptions {
    apiVersion?: string;
}

// @public
export interface DocumentIntelligenceErrorOutput {
    code: string;
    details?: Array<DocumentIntelligenceErrorOutput>;
    innererror?: DocumentIntelligenceInnerErrorOutput;
    message: string;
    target?: string;
}

// @public
export interface DocumentIntelligenceErrorResponseOutput {
    error: DocumentIntelligenceErrorOutput;
}

// @public
export interface DocumentIntelligenceInnerErrorOutput {
    code?: string;
    innererror?: DocumentIntelligenceInnerErrorOutput;
    message?: string;
}

// @public
export type DocumentIntelligenceOperationDetailsOutput = DocumentIntelligenceOperationDetailsOutputParent | DocumentModelBuildOperationDetailsOutput | DocumentModelComposeOperationDetailsOutput | DocumentModelCopyToOperationDetailsOutput | DocumentClassifierCopyToOperationDetailsOutput | DocumentClassifierBuildOperationDetailsOutput;

// @public
export interface DocumentIntelligenceOperationDetailsOutputParent {
    apiVersion?: string;
    createdDateTime: string;
    error?: DocumentIntelligenceErrorOutput;
    // (undocumented)
    kind: OperationKindOutput;
    lastUpdatedDateTime: string;
    operationId: string;
    percentCompleted?: number;
    resourceLocation: string;
    status: DocumentIntelligenceOperationStatusOutput;
    tags?: Record<string, string>;
}

// @public
export type DocumentIntelligenceOperationStatusOutput = string;

// @public
export interface DocumentIntelligenceResourceDetailsOutput {
    customDocumentModels: CustomDocumentModelsDetailsOutput;
}

// @public
export interface DocumentIntelligenceWarningOutput {
    code: string;
    message: string;
    target?: string;
}

// @public
export interface DocumentKeyValueElementOutput {
    boundingRegions?: Array<BoundingRegionOutput>;
    content: string;
    spans: Array<DocumentSpanOutput>;
}

// @public
export interface DocumentKeyValuePairOutput {
    confidence: number;
    key: DocumentKeyValueElementOutput;
    value?: DocumentKeyValueElementOutput;
}

// @public
export interface DocumentLanguageOutput {
    confidence: number;
    locale: string;
    spans: Array<DocumentSpanOutput>;
}

// @public
export interface DocumentLineOutput {
    content: string;
    polygon?: number[];
    spans: Array<DocumentSpanOutput>;
}

// @public
export interface DocumentModelBuildOperationDetailsOutput extends DocumentIntelligenceOperationDetailsOutputParent {
    kind: "documentModelBuild";
    result?: DocumentModelDetailsOutput;
}

// @public
export interface DocumentModelComposeOperationDetailsOutput extends DocumentIntelligenceOperationDetailsOutputParent {
    kind: "documentModelCompose";
    result?: DocumentModelDetailsOutput;
}

// @public
export interface DocumentModelCopyToOperationDetailsOutput extends DocumentIntelligenceOperationDetailsOutputParent {
    kind: "documentModelCopyTo";
    result?: DocumentModelDetailsOutput;
}

// @public
export interface DocumentModelDetailsOutput {
    readonly apiVersion?: string;
    readonly azureBlobFileListSource?: AzureBlobFileListContentSourceOutput;
    readonly azureBlobSource?: AzureBlobContentSourceOutput;
    readonly buildMode?: DocumentBuildModeOutput;
    classifierId?: string;
    readonly createdDateTime: string;
    description?: string;
    readonly docTypes?: Record<string, DocumentTypeDetailsOutput>;
    readonly expirationDateTime?: string;
    modelId: string;
    readonly modifiedDateTime?: string;
    split?: SplitModeOutput;
    tags?: Record<string, string>;
    readonly trainingHours?: number;
    readonly warnings?: Array<DocumentIntelligenceWarningOutput>;
}

// @public
export interface DocumentPageOutput {
    angle?: number;
    barcodes?: Array<DocumentBarcodeOutput>;
    formulas?: Array<DocumentFormulaOutput>;
    height?: number;
    lines?: Array<DocumentLineOutput>;
    pageNumber: number;
    selectionMarks?: Array<DocumentSelectionMarkOutput>;
    spans: Array<DocumentSpanOutput>;
    unit?: LengthUnitOutput;
    width?: number;
    words?: Array<DocumentWordOutput>;
}

// @public
export interface DocumentParagraphOutput {
    boundingRegions?: Array<BoundingRegionOutput>;
    content: string;
    role?: ParagraphRoleOutput;
    spans: Array<DocumentSpanOutput>;
}

// @public
export interface DocumentSectionOutput {
    elements?: string[];
    spans: Array<DocumentSpanOutput>;
}

// @public
export interface DocumentSelectionMarkOutput {
    confidence: number;
    polygon?: number[];
    span: DocumentSpanOutput;
    state: DocumentSelectionMarkStateOutput;
}

// @public
export type DocumentSelectionMarkStateOutput = string;

// @public
export type DocumentSignatureTypeOutput = string;

// @public
export interface DocumentSpanOutput {
    length: number;
    offset: number;
}

// @public
export interface DocumentStyleOutput {
    backgroundColor?: string;
    color?: string;
    confidence: number;
    fontStyle?: DocumentFontStyleOutput;
    fontWeight?: DocumentFontWeightOutput;
    isHandwritten?: boolean;
    similarFontFamily?: string;
    spans: Array<DocumentSpanOutput>;
}

// @public
export type DocumentTableCellKindOutput = string;

// @public
export interface DocumentTableCellOutput {
    boundingRegions?: Array<BoundingRegionOutput>;
    columnIndex: number;
    columnSpan?: number;
    content: string;
    elements?: string[];
    kind?: DocumentTableCellKindOutput;
    rowIndex: number;
    rowSpan?: number;
    spans: Array<DocumentSpanOutput>;
}

// @public
export interface DocumentTableOutput {
    boundingRegions?: Array<BoundingRegionOutput>;
    caption?: DocumentCaptionOutput;
    cells: Array<DocumentTableCellOutput>;
    columnCount: number;
    footnotes?: Array<DocumentFootnoteOutput>;
    rowCount: number;
    spans: Array<DocumentSpanOutput>;
}

// @public
export interface DocumentTypeDetails {
    buildMode?: DocumentBuildMode;
    confidenceThreshold?: number;
    description?: string;
    features?: DocumentAnalysisFeature[];
    fieldConfidence?: Record<string, number>;
    fieldSchema?: Record<string, DocumentFieldSchema>;
    maxDocumentsToAnalyze?: number;
    modelId?: string;
    queryFields?: string[];
}

// @public
export interface DocumentTypeDetailsOutput {
    buildMode?: DocumentBuildModeOutput;
    confidenceThreshold?: number;
    description?: string;
    features?: DocumentAnalysisFeatureOutput[];
    fieldConfidence?: Record<string, number>;
    fieldSchema?: Record<string, DocumentFieldSchemaOutput>;
    maxDocumentsToAnalyze?: number;
    modelId?: string;
    queryFields?: string[];
}

// @public
export interface DocumentWordOutput {
    confidence: number;
    content: string;
    polygon?: number[];
    span: DocumentSpanOutput;
}

// @public (undocumented)
export interface GetAnalyzeBatchResult {
    delete(options?: DeleteAnalyzeBatchResultParameters): StreamableMethod<DeleteAnalyzeBatchResult204Response | DeleteAnalyzeBatchResultDefaultResponse>;
    get(options?: GetAnalyzeBatchResultParameters): StreamableMethod<GetAnalyzeBatchResult200Response | GetAnalyzeBatchResultDefaultResponse>;
}

// @public
export interface GetAnalyzeBatchResult200Response extends HttpResponse {
    // (undocumented)
    body: AnalyzeBatchOperationOutput;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetAnalyzeBatchResultDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type GetAnalyzeBatchResultParameters = RequestParameters;

// @public (undocumented)
export interface GetAnalyzeResult {
    delete(options?: DeleteAnalyzeResultParameters): StreamableMethod<DeleteAnalyzeResult204Response | DeleteAnalyzeResultDefaultResponse>;
    get(options?: GetAnalyzeResultParameters): StreamableMethod<GetAnalyzeResult200Response | GetAnalyzeResultDefaultResponse>;
}

// @public
export interface GetAnalyzeResult200Response extends HttpResponse {
    // (undocumented)
    body: AnalyzeOperationOutput;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetAnalyzeResultDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface GetAnalyzeResultFigure {
    get(options?: GetAnalyzeResultFigureParameters): StreamableMethod<GetAnalyzeResultFigure200Response | GetAnalyzeResultFigureDefaultResponse>;
}

// @public (undocumented)
export interface GetAnalyzeResultFigure200Headers {
    "content-type": "image/png";
}

// @public
export interface GetAnalyzeResultFigure200Response extends HttpResponse {
    body: Uint8Array;
    // (undocumented)
    headers: RawHttpHeaders & GetAnalyzeResultFigure200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetAnalyzeResultFigureDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type GetAnalyzeResultFigureParameters = RequestParameters;

// @public (undocumented)
export type GetAnalyzeResultParameters = RequestParameters;

// @public (undocumented)
export interface GetAnalyzeResultPdf {
    get(options?: GetAnalyzeResultPdfParameters): StreamableMethod<GetAnalyzeResultPdf200Response | GetAnalyzeResultPdfDefaultResponse>;
}

// @public (undocumented)
export interface GetAnalyzeResultPdf200Headers {
    "content-type": "application/pdf";
}

// @public
export interface GetAnalyzeResultPdf200Response extends HttpResponse {
    body: Uint8Array;
    // (undocumented)
    headers: RawHttpHeaders & GetAnalyzeResultPdf200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetAnalyzeResultPdfDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type GetAnalyzeResultPdfParameters = RequestParameters;

// @public
export type GetArrayType<T> = T extends Array<infer TData> ? TData : never;

// @public (undocumented)
export interface GetClassifier {
    delete(options?: DeleteClassifierParameters): StreamableMethod<DeleteClassifier204Response | DeleteClassifierDefaultResponse>;
    get(options?: GetClassifierParameters): StreamableMethod<GetClassifier200Response | GetClassifierDefaultResponse>;
}

// @public (undocumented)
export interface GetClassifier200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface GetClassifier200Response extends HttpResponse {
    // (undocumented)
    body: DocumentClassifierDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & GetClassifier200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetClassifierDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface GetClassifierHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & GetClassifierHeaders;
}

// @public (undocumented)
export interface GetClassifierHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type GetClassifierParameters = GetClassifierHeaderParam & RequestParameters;

// @public (undocumented)
export interface GetClassifyResult {
    get(options?: GetClassifyResultParameters): StreamableMethod<GetClassifyResult200Response | GetClassifyResultDefaultResponse>;
}

// @public
export interface GetClassifyResult200Response extends HttpResponse {
    // (undocumented)
    body: AnalyzeOperationOutput;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetClassifyResultDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type GetClassifyResultParameters = RequestParameters;

// @public (undocumented)
export interface GetDocumentClassifierBuildOperation200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface GetDocumentClassifierBuildOperation200Response extends HttpResponse {
    // (undocumented)
    body: DocumentClassifierBuildOperationDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & GetDocumentClassifierBuildOperation200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetDocumentClassifierBuildOperationDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface GetDocumentClassifierBuildOperationHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & GetDocumentClassifierBuildOperationHeaders;
}

// @public (undocumented)
export interface GetDocumentClassifierBuildOperationHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type GetDocumentClassifierBuildOperationParameters = GetDocumentClassifierBuildOperationHeaderParam & RequestParameters;

// @public (undocumented)
export interface GetDocumentClassifierCopyToOperation200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface GetDocumentClassifierCopyToOperation200Response extends HttpResponse {
    // (undocumented)
    body: DocumentClassifierCopyToOperationDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & GetDocumentClassifierCopyToOperation200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetDocumentClassifierCopyToOperationDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface GetDocumentClassifierCopyToOperationHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & GetDocumentClassifierCopyToOperationHeaders;
}

// @public (undocumented)
export interface GetDocumentClassifierCopyToOperationHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type GetDocumentClassifierCopyToOperationParameters = GetDocumentClassifierCopyToOperationHeaderParam & RequestParameters;

// @public (undocumented)
export interface GetDocumentModelBuildOperation {
    get(options?: GetDocumentModelBuildOperationParameters): StreamableMethod<GetDocumentModelBuildOperation200Response | GetDocumentModelBuildOperationDefaultResponse>;
    get(options?: GetDocumentModelComposeOperationParameters): StreamableMethod<GetDocumentModelComposeOperation200Response | GetDocumentModelComposeOperationDefaultResponse>;
    get(options?: GetDocumentModelCopyToOperationParameters): StreamableMethod<GetDocumentModelCopyToOperation200Response | GetDocumentModelCopyToOperationDefaultResponse>;
    get(options?: GetDocumentClassifierCopyToOperationParameters): StreamableMethod<GetDocumentClassifierCopyToOperation200Response | GetDocumentClassifierCopyToOperationDefaultResponse>;
    get(options?: GetDocumentClassifierBuildOperationParameters): StreamableMethod<GetDocumentClassifierBuildOperation200Response | GetDocumentClassifierBuildOperationDefaultResponse>;
    get(options?: GetOperationParameters): StreamableMethod<GetOperation200Response | GetOperationDefaultResponse>;
}

// @public (undocumented)
export interface GetDocumentModelBuildOperation200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface GetDocumentModelBuildOperation200Response extends HttpResponse {
    // (undocumented)
    body: DocumentModelBuildOperationDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & GetDocumentModelBuildOperation200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetDocumentModelBuildOperationDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface GetDocumentModelBuildOperationHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & GetDocumentModelBuildOperationHeaders;
}

// @public (undocumented)
export interface GetDocumentModelBuildOperationHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type GetDocumentModelBuildOperationParameters = GetDocumentModelBuildOperationHeaderParam & RequestParameters;

// @public (undocumented)
export interface GetDocumentModelComposeOperation200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface GetDocumentModelComposeOperation200Response extends HttpResponse {
    // (undocumented)
    body: DocumentModelComposeOperationDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & GetDocumentModelComposeOperation200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetDocumentModelComposeOperationDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface GetDocumentModelComposeOperationHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & GetDocumentModelComposeOperationHeaders;
}

// @public (undocumented)
export interface GetDocumentModelComposeOperationHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type GetDocumentModelComposeOperationParameters = GetDocumentModelComposeOperationHeaderParam & RequestParameters;

// @public (undocumented)
export interface GetDocumentModelCopyToOperation200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface GetDocumentModelCopyToOperation200Response extends HttpResponse {
    // (undocumented)
    body: DocumentModelCopyToOperationDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & GetDocumentModelCopyToOperation200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetDocumentModelCopyToOperationDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface GetDocumentModelCopyToOperationHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & GetDocumentModelCopyToOperationHeaders;
}

// @public (undocumented)
export interface GetDocumentModelCopyToOperationHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type GetDocumentModelCopyToOperationParameters = GetDocumentModelCopyToOperationHeaderParam & RequestParameters;

// @public
export function getLongRunningPoller<TResult extends AnalyzeBatchDocumentsLogicalResponse | AnalyzeBatchDocumentsDefaultResponse>(client: Client, initialResponse: AnalyzeBatchDocuments202Response | AnalyzeBatchDocumentsDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;

// @public (undocumented)
export function getLongRunningPoller<TResult extends BuildModelLogicalResponse | BuildModelDefaultResponse>(client: Client, initialResponse: BuildModel202Response | BuildModelDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;

// @public (undocumented)
export function getLongRunningPoller<TResult extends ComposeModelLogicalResponse | ComposeModelDefaultResponse>(client: Client, initialResponse: ComposeModel202Response | ComposeModelDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;

// @public (undocumented)
export function getLongRunningPoller<TResult extends CopyModelToLogicalResponse | CopyModelToDefaultResponse>(client: Client, initialResponse: CopyModelTo202Response | CopyModelToDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;

// @public (undocumented)
export function getLongRunningPoller<TResult extends BuildClassifierLogicalResponse | BuildClassifierDefaultResponse>(client: Client, initialResponse: BuildClassifier202Response | BuildClassifierDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;

// @public (undocumented)
export function getLongRunningPoller<TResult extends CopyClassifierToLogicalResponse | CopyClassifierToDefaultResponse>(client: Client, initialResponse: CopyClassifierTo202Response | CopyClassifierToDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;

// @public (undocumented)
export function getLongRunningPoller<TResult extends AnalyzeDocumentFromStreamLogicalResponse | AnalyzeDocumentFromStreamDefaultResponse>(client: Client, initialResponse: AnalyzeDocumentFromStream202Response | AnalyzeDocumentFromStreamDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;

// @public (undocumented)
export function getLongRunningPoller<TResult extends ClassifyDocumentFromStreamLogicalResponse | ClassifyDocumentFromStreamDefaultResponse>(client: Client, initialResponse: ClassifyDocumentFromStream202Response | ClassifyDocumentFromStreamDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;

// @public (undocumented)
export interface GetModel {
    delete(options?: DeleteModelParameters): StreamableMethod<DeleteModel204Response | DeleteModelDefaultResponse>;
    get(options?: GetModelParameters): StreamableMethod<GetModel200Response | GetModelDefaultResponse>;
}

// @public (undocumented)
export interface GetModel200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface GetModel200Response extends HttpResponse {
    // (undocumented)
    body: DocumentModelDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & GetModel200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetModelDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface GetModelHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & GetModelHeaders;
}

// @public (undocumented)
export interface GetModelHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type GetModelParameters = GetModelHeaderParam & RequestParameters;

// @public (undocumented)
export interface GetOperation200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface GetOperation200Response extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceOperationDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & GetOperation200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetOperationDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface GetOperationHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & GetOperationHeaders;
}

// @public (undocumented)
export interface GetOperationHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type GetOperationParameters = GetOperationHeaderParam & RequestParameters;

// @public
export type GetPage<TPage> = (pageLink: string) => Promise<{
    page: TPage;
    nextPageLink?: string;
}>;

// @public (undocumented)
export interface GetResourceDetails {
    get(options?: GetResourceDetailsParameters): StreamableMethod<GetResourceDetails200Response | GetResourceDetailsDefaultResponse>;
}

// @public
export interface GetResourceDetails200Response extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceResourceDetailsOutput;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface GetResourceDetailsDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type GetResourceDetailsParameters = RequestParameters;

// @public (undocumented)
export function isUnexpected(response: ListOperations200Response | ListOperationsDefaultResponse): response is ListOperationsDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetDocumentModelBuildOperation200Response | GetDocumentModelBuildOperationDefaultResponse): response is GetDocumentModelBuildOperationDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetDocumentModelComposeOperation200Response | GetDocumentModelComposeOperationDefaultResponse): response is GetDocumentModelComposeOperationDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetDocumentModelCopyToOperation200Response | GetDocumentModelCopyToOperationDefaultResponse): response is GetDocumentModelCopyToOperationDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetDocumentClassifierCopyToOperation200Response | GetDocumentClassifierCopyToOperationDefaultResponse): response is GetDocumentClassifierCopyToOperationDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetDocumentClassifierBuildOperation200Response | GetDocumentClassifierBuildOperationDefaultResponse): response is GetDocumentClassifierBuildOperationDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetOperation200Response | GetOperationDefaultResponse): response is GetOperationDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetResourceDetails200Response | GetResourceDetailsDefaultResponse): response is GetResourceDetailsDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetAnalyzeResult200Response | GetAnalyzeResultDefaultResponse): response is GetAnalyzeResultDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: DeleteAnalyzeResult204Response | DeleteAnalyzeResultDefaultResponse): response is DeleteAnalyzeResultDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetAnalyzeResultPdf200Response | GetAnalyzeResultPdfDefaultResponse): response is GetAnalyzeResultPdfDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetAnalyzeResultFigure200Response | GetAnalyzeResultFigureDefaultResponse): response is GetAnalyzeResultFigureDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: AnalyzeDocumentFromStream202Response | AnalyzeDocumentFromStreamLogicalResponse | AnalyzeDocumentFromStreamDefaultResponse): response is AnalyzeDocumentFromStreamDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: AnalyzeDocument202Response | AnalyzeDocumentLogicalResponse | AnalyzeDocumentDefaultResponse): response is AnalyzeDocumentDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetAnalyzeBatchResult200Response | GetAnalyzeBatchResultDefaultResponse): response is GetAnalyzeBatchResultDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: DeleteAnalyzeBatchResult204Response | DeleteAnalyzeBatchResultDefaultResponse): response is DeleteAnalyzeBatchResultDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: AnalyzeBatchDocuments202Response | AnalyzeBatchDocumentsLogicalResponse | AnalyzeBatchDocumentsDefaultResponse): response is AnalyzeBatchDocumentsDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: ListAnalyzeBatchResults200Response | ListAnalyzeBatchResultsDefaultResponse): response is ListAnalyzeBatchResultsDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetModel200Response | GetModelDefaultResponse): response is GetModelDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: DeleteModel204Response | DeleteModelDefaultResponse): response is DeleteModelDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: BuildModel202Response | BuildModelLogicalResponse | BuildModelDefaultResponse): response is BuildModelDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: ComposeModel202Response | ComposeModelLogicalResponse | ComposeModelDefaultResponse): response is ComposeModelDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: AuthorizeModelCopy200Response | AuthorizeModelCopyDefaultResponse): response is AuthorizeModelCopyDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: CopyModelTo202Response | CopyModelToLogicalResponse | CopyModelToDefaultResponse): response is CopyModelToDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: ListModels200Response | ListModelsDefaultResponse): response is ListModelsDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: BuildClassifier202Response | BuildClassifierLogicalResponse | BuildClassifierDefaultResponse): response is BuildClassifierDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: ListClassifiers200Response | ListClassifiersDefaultResponse): response is ListClassifiersDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetClassifier200Response | GetClassifierDefaultResponse): response is GetClassifierDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: DeleteClassifier204Response | DeleteClassifierDefaultResponse): response is DeleteClassifierDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: ClassifyDocumentFromStream202Response | ClassifyDocumentFromStreamLogicalResponse | ClassifyDocumentFromStreamDefaultResponse): response is ClassifyDocumentFromStreamDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: ClassifyDocument202Response | ClassifyDocumentLogicalResponse | ClassifyDocumentDefaultResponse): response is ClassifyDocumentDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: GetClassifyResult200Response | GetClassifyResultDefaultResponse): response is GetClassifyResultDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: AuthorizeClassifierCopy200Response | AuthorizeClassifierCopyDefaultResponse): response is AuthorizeClassifierCopyDefaultResponse;

// @public (undocumented)
export function isUnexpected(response: CopyClassifierTo202Response | CopyClassifierToLogicalResponse | CopyClassifierToDefaultResponse): response is CopyClassifierToDefaultResponse;

// @public
export type LengthUnitOutput = string;

// @public (undocumented)
export interface ListAnalyzeBatchResults {
    get(options?: ListAnalyzeBatchResultsParameters): StreamableMethod<ListAnalyzeBatchResults200Response | ListAnalyzeBatchResultsDefaultResponse>;
}

// @public
export interface ListAnalyzeBatchResults200Response extends HttpResponse {
    // (undocumented)
    body: PagedAnalyzeBatchOperationOutput;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface ListAnalyzeBatchResultsDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export type ListAnalyzeBatchResultsParameters = RequestParameters;

// @public (undocumented)
export interface ListClassifiers {
    get(options?: ListClassifiersParameters): StreamableMethod<ListClassifiers200Response | ListClassifiersDefaultResponse>;
}

// @public (undocumented)
export interface ListClassifiers200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface ListClassifiers200Response extends HttpResponse {
    // (undocumented)
    body: PagedDocumentClassifierDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & ListClassifiers200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface ListClassifiersDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface ListClassifiersHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & ListClassifiersHeaders;
}

// @public (undocumented)
export interface ListClassifiersHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type ListClassifiersParameters = ListClassifiersHeaderParam & RequestParameters;

// @public (undocumented)
export interface ListModels {
    get(options?: ListModelsParameters): StreamableMethod<ListModels200Response | ListModelsDefaultResponse>;
}

// @public (undocumented)
export interface ListModels200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface ListModels200Response extends HttpResponse {
    // (undocumented)
    body: PagedDocumentModelDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & ListModels200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface ListModelsDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface ListModelsHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & ListModelsHeaders;
}

// @public (undocumented)
export interface ListModelsHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type ListModelsParameters = ListModelsHeaderParam & RequestParameters;

// @public (undocumented)
export interface ListOperations {
    get(options?: ListOperationsParameters): StreamableMethod<ListOperations200Response | ListOperationsDefaultResponse>;
}

// @public (undocumented)
export interface ListOperations200Headers {
    "x-ms-client-request-id"?: string;
}

// @public
export interface ListOperations200Response extends HttpResponse {
    // (undocumented)
    body: PagedDocumentIntelligenceOperationDetailsOutput;
    // (undocumented)
    headers: RawHttpHeaders & ListOperations200Headers;
    // (undocumented)
    status: "200";
}

// @public (undocumented)
export interface ListOperationsDefaultResponse extends HttpResponse {
    // (undocumented)
    body: DocumentIntelligenceErrorResponseOutput;
    // (undocumented)
    status: string;
}

// @public (undocumented)
export interface ListOperationsHeaderParam {
    // (undocumented)
    headers?: RawHttpHeadersInput & ListOperationsHeaders;
}

// @public (undocumented)
export interface ListOperationsHeaders {
    "x-ms-client-request-id"?: string;
}

// @public (undocumented)
export type ListOperationsParameters = ListOperationsHeaderParam & RequestParameters;

// @public
export interface ModelCopyAuthorization {
    accessToken: string;
    expirationDateTime: Date | string;
    targetModelId: string;
    targetModelLocation: string;
    targetResourceId: string;
    targetResourceRegion: string;
}

// @public
export interface ModelCopyAuthorizationOutput {
    accessToken: string;
    expirationDateTime: string;
    targetModelId: string;
    targetModelLocation: string;
    targetResourceId: string;
    targetResourceRegion: string;
}

// @public
export type OperationKindOutput = string;

// @public
export interface PagedAnalyzeBatchOperationOutput {
    nextLink?: string;
    value: Array<AnalyzeBatchOperationOutput>;
}

// @public
export interface PagedAsyncIterableIterator<TElement, TPage = TElement[], TPageSettings = PageSettings> {
    [Symbol.asyncIterator](): PagedAsyncIterableIterator<TElement, TPage, TPageSettings>;
    byPage: (settings?: TPageSettings) => AsyncIterableIterator<TPage>;
    next(): Promise<IteratorResult<TElement>>;
}

// @public
export interface PagedDocumentClassifierDetailsOutput {
    nextLink?: string;
    value: Array<DocumentClassifierDetailsOutput>;
}

// @public
export interface PagedDocumentIntelligenceOperationDetailsOutput {
    nextLink?: string;
    value: Array<DocumentIntelligenceOperationDetailsOutput>;
}

// @public
export interface PagedDocumentModelDetailsOutput {
    nextLink?: string;
    value: Array<DocumentModelDetailsOutput>;
}

// @public
export interface PageSettings {
    continuationToken?: string;
}

// @public
export function paginate<TResponse extends PathUncheckedResponse>(client: Client, initialResponse: TResponse, options?: PagingOptions<TResponse>): PagedAsyncIterableIterator<PaginateReturn<TResponse>>;

// @public
export type PaginateReturn<TResult> = TResult extends {
    body: {
        value?: infer TPage;
    };
} ? GetArrayType<TPage> : Array<unknown>;

// @public
export interface PagingOptions<TResponse> {
    customGetPage?: GetPage<PaginateReturn<TResponse>[]>;
}

// @public
export type ParagraphRoleOutput = string;

// @public (undocumented)
export interface Routes {
    (path: "/operations"): ListOperations;
    (path: "/operations/{operationId}", operationId: string): GetDocumentModelBuildOperation;
    (path: "/info"): GetResourceDetails;
    (path: "/documentModels/{modelId}/analyzeResults/{resultId}", modelId: string, resultId: string): GetAnalyzeResult;
    (path: "/documentModels/{modelId}/analyzeResults/{resultId}/pdf", modelId: string, resultId: string): GetAnalyzeResultPdf;
    (path: "/documentModels/{modelId}/analyzeResults/{resultId}/figures/{figureId}", modelId: string, resultId: string, figureId: string): GetAnalyzeResultFigure;
    (path: "/documentModels/{modelId}:analyze", modelId: string): AnalyzeDocumentFromStream;
    (path: "/documentModels/{modelId}/analyzeBatchResults/{resultId}", modelId: string, resultId: string): GetAnalyzeBatchResult;
    (path: "/documentModels/{modelId}:analyzeBatch", modelId: string): AnalyzeBatchDocuments;
    (path: "/documentModels/{modelId}/analyzeBatchResults", modelId: string): ListAnalyzeBatchResults;
    (path: "/documentModels/{modelId}", modelId: string): GetModel;
    (path: "/documentModels:build"): BuildModel;
    (path: "/documentModels:compose"): ComposeModel;
    (path: "/documentModels:authorizeCopy"): AuthorizeModelCopy;
    (path: "/documentModels/{modelId}:copyTo", modelId: string): CopyModelTo;
    (path: "/documentModels"): ListModels;
    (path: "/documentClassifiers:build"): BuildClassifier;
    (path: "/documentClassifiers"): ListClassifiers;
    (path: "/documentClassifiers/{classifierId}", classifierId: string): GetClassifier;
    (path: "/documentClassifiers/{classifierId}:analyze", classifierId: string): ClassifyDocumentFromStream;
    (path: "/documentClassifiers/{classifierId}/analyzeResults/{resultId}", classifierId: string, resultId: string): GetClassifyResult;
    (path: "/documentClassifiers:authorizeCopy"): AuthorizeClassifierCopy;
    (path: "/documentClassifiers/{classifierId}:copyTo", classifierId: string): CopyClassifierTo;
}

// @public
export interface SimplePollerLike<TState extends OperationState<TResult>, TResult> {
    getOperationState(): TState;
    getResult(): TResult | undefined;
    isDone(): boolean;
    // @deprecated
    isStopped(): boolean;
    onProgress(callback: (state: TState) => void): CancelOnProgress;
    poll(options?: {
        abortSignal?: AbortSignalLike;
    }): Promise<TState>;
    pollUntilDone(pollOptions?: {
        abortSignal?: AbortSignalLike;
    }): Promise<TResult>;
    serialize(): Promise<string>;
    // @deprecated
    stopPolling(): void;
    submitted(): Promise<void>;
    // @deprecated
    toString(): string;
}

// @public
export type SplitMode = string;

// @public
export type SplitModeOutput = string;

// @public
export type StringIndexType = string;

// @public
export type StringIndexTypeOutput = string;

// (No @packageDocumentation comment for this package)
