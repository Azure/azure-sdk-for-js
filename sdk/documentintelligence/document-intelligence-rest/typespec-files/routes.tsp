import "@azure-tools/typespec-azure-core";
import "@typespec/rest";
import "@typespec/http";
import "./models.tsp";

using Azure.Core;
using Azure.Core.Traits;
using TypeSpec.Rest;
using TypeSpec.Http;
using TypeSpec.Versioning;

namespace DocumentIntelligence;


#suppress "@azure-tools/typespec-azure-core/long-running-polling-operation-required" "This is a template"
@doc("Long running RPC operation template")
op TLongRunningRpcOperation<
  TParams extends TypeSpec.Reflection.Model,
  TResponse extends TypeSpec.Reflection.Model,
  Traits extends TypeSpec.Reflection.Model = {},
  TError = Azure.Core.Foundations.ErrorResponse
> is Foundations.Operation<
  TParams,
  AcceptedResponse & { 
    @pollingLocation
    @header("Operation-Location")
    operationLocation: ResourceLocation<TResponse>},
  Traits,
  TError
>;

@doc("Document model analyze request parameters.")
model DocumentModelAnalyzeRequestParams {
  @doc("Unique document model name.")
  @path
  @pattern("^[a-zA-Z0-9][a-zA-Z0-9._~-]{1,63}$")
  modelId: string;

  @doc("List of 1-based page numbers to analyze.  Ex. \"1-3,5,7-9\"")
  @query
  @pattern("^(\\d+(-\\d+)?)(,\\s*(\\d+(-\\d+)?))*$")
  pages?: string;

  @doc("""
  Locale hint for text recognition and document analysis.  Value may contain only
  the language code (ex. \"en\", \"fr\") or BCP 47 language tag (ex. \"en-US\").
  """)
  @query
  locale?: string;

  @doc("Method used to compute string offset and length.")
  @query
  stringIndexType?: StringIndexType = StringIndexType.textElements;

  @added(Versions.v2023_10_31_preview)
  @doc("Format of the analyze result top-level content.")
  @query
  contentFormat?: ContentFormat;

  @added(Versions.v2022_08_31)
  @doc("List of optional analysis features.")
  @query({format: "csv"})
  features?: DocumentAnalysisFeature[];

  @added(Versions.v2023_10_31_preview)
  @doc("List of additional fields to extract.  Ex. \"NumberOfGuests,StoreNumber\"")
  @query({format: "csv"})
  queryFields?: string[];
}

@doc("Document classifier analyze request parameters.")
model DocumentClassifierAnalyzeRequestParams {
  @doc("Unique document classifier name.")
  @path
  @pattern("^[a-zA-Z0-9][a-zA-Z0-9._~-]{1,63}$")
  classifierId: string;

  @doc("Method used to compute string offset and length.")
  @query
  stringIndexType?: StringIndexType = StringIndexType.textElements;

  @doc("Document splitting mode.")
  @added(Versions.v2023_10_31_preview)
  @query
  split: SplitMode;
}

@doc("Analyze from stream request parameters.")
model AnalyzeFromStreamRequestParams {
  @doc("Input content type")
  @header contentType: 
//    "application/json" |
    "application/octet-stream" |
    "application/pdf" |
    "image/jpeg" |
    "image/png" |
    "image/tiff" |
    "image/bmp" |
    "image/heif" |
    "text/html" |
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" |
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" |
    "application/vnd.openxmlformats-officedocument.presentationml.presentation";

  @doc("Input content")
  @body
  input: bytes;
}

interface DocumentModels {
  #suppress "@azure-tools/typespec-azure-core/use-standard-operations" "Doesn't fit into a ResourceRead and RpcOperation doesnt recommend path parameters"
  @doc("Gets the result of document analysis.")
  @route("/documentModels/{modelId}/analyzeResults/{resultId}")
  @get
  getAnalyzeResult is Foundations.Operation<
    {
      @doc("Unique document model name.")
      @path
      @pattern("^[a-zA-Z0-9][a-zA-Z0-9._~-]{1,63}$")
      modelId: string;

      @doc("Analyze operation result ID.")
      @path
      @format("uuid")
      resultId: string;
    },
    AnalyzeResultOperation
  >;

  @post
  @pollingOperation(DocumentModels.getAnalyzeResult)
  @sharedRoute
  @route("/documentModels/{modelId}:analyze")
  analyzeDocumentFromStream is TLongRunningRpcOperation<
    {
      ...DocumentModelAnalyzeRequestParams,
      ...AnalyzeFromStreamRequestParams
    },
    AnalyzeResultOperation
  >;

  @post
  @pollingOperation(DocumentModels.getAnalyzeResult)
  @sharedRoute
  @route("/documentModels/{modelId}:analyze")
  analyzeDocument is TLongRunningRpcOperation<
    {
      ...DocumentModelAnalyzeRequestParams,

      @doc("Input content type")
      @header contentType: "application/json";

      @doc("Analyze request parameters.")
      @body
      analyzeRequest?: AnalyzeDocumentRequest;
    },
    AnalyzeResultOperation
  >;
  
  @doc("Gets detailed document model information.")
  getModel is StandardResourceOperations.ResourceRead<DocumentModelDetails>;

  @doc("Builds a custom document analysis model.")
  @pollingOperation(MiscellaneousOperations.getDocumentBuildOperation)
  @route("/documentModels:build")
  @post
  // FIXME: LRO signatures arent returning the right model
  buildDocument is Foundations.Operation<
    {
      @doc("Build request parameters.")
      @body
      buildRequest: BuildDocumentModelRequest;
    },
    AcceptedResponse & { 
      @pollingLocation
      @header("Operation-Location")
      operationLocation: ResourceLocation<OperationDetails>}
  >;

  // @doc("Creates a new document model from document types of existing document models.")
  // @route("/documentModels:compose")
  // @post
  // composeModel is Azure.Core.Foundations.LongRunningOperation<
  //   {
  //     @doc("Compose request parameters.")
  //     @body
  //     composeRequest: ComposeDocumentModelRequest;
  //   },
  //   void
  // >;

  @doc("""
  Generates authorization to copy a document model to this location with
  specified modelId and optional description.
  """)
  @route("/documentModels:authorizeCopy")
  @post
  authorizeModelCopy is Foundations.Operation<
    {
      @doc("Authorize copy request parameters.")
      @body
      authorizeCopyRequest: AuthorizeCopyRequest;
    },
    CopyAuthorization
  >;

//   @doc("Copies document model to the target resource, region, and modelId.")
//   @route("/documentModels/{modelId}:copyTo")
//   @post
//   copyModelTo is Azure.Core.Foundations.Operation<
//     {
//       @doc("Unique document model name.")
//       @path
//       @pattern("^[a-zA-Z0-9][a-zA-Z0-9._~-]{1,63}$")
//       modelId: string;

//       @doc("Copy to request parameters.")
//       @body
//       copyToRequest: CopyAuthorization;
//     },
//     void
//   >;

  @doc("List all document models")
  listModels is StandardResourceOperations.ResourceList<DocumentModelSummary>;

  @doc("Deletes document model.")
  @delete
  deleteModel is StandardResourceOperations.ResourceDelete<DocumentModelDetails>;
}

interface MiscellaneousOperations {
  @doc("Lists all operations.")
  listOperations is StandardResourceOperations.ResourceList<OperationSummary>;
  // listOperations is Foundations.ResourceList<OperationSummary, {}, GetOperationsResponse>;
  // @route("/operations")
  // listOperations is Foundations.Operation<{}, GetOperationsResponse>;

  @sharedRoute
  @doc("Gets operation info.")
  getOperation is StandardResourceOperations.ResourceRead<OperationDetails>;

  // FIXME: this is a workaround to get proper LRO signatures for buildDocument
  @sharedRoute
  @doc("Gets operation info.")
  getDocumentBuildOperation is StandardResourceOperations.ResourceRead<DocumentModelBuildOperationDetails>;

  @doc("Return information about the current resource.")
  @route("/info")
  @get
  getResourceInfo is RpcOperation<{}, ResourceDetails>;
}

@added(Versions.v2023_07_31)
interface DocumentClassifier {
  // @doc("Builds a custom document classifier.")
  // build is StandardResourceOperations.LongRunningResourceCreateOrReplace<
  //   DocumentClassifierDetails
  // >;

  @doc("List all document classifiers.")
  listClassifiers is StandardResourceOperations.ResourceList<DocumentClassifierDetails>;

  @doc("Gets detailed document classifier information.")
  getClassifier is StandardResourceOperations.ResourceRead<DocumentClassifierDetails>;

  @doc("Deletes document classifier.")
  deleteClassifier is StandardResourceOperations.ResourceDelete<DocumentClassifierDetails>;

  @doc("Classifies document with document classifier.")
  @pollingOperation(DocumentClassifier.getClassifyResult)
  @sharedRoute
  @route("/documentClassifiers/{classifierId}:analyze")
  @post
  classifyDocumentFromStream is TLongRunningRpcOperation<
    {
      ...DocumentClassifierAnalyzeRequestParams,
      ...AnalyzeFromStreamRequestParams
    },
    AnalyzeResultOperation
  >;

  @doc("Classifies document with document classifier.")
  @pollingOperation(DocumentClassifier.getClassifyResult)
  @sharedRoute
  @route("/documentClassifiers/{classifierId}:analyze")
  @post
  classifyDocument is TLongRunningRpcOperation<
    {
      ...DocumentClassifierAnalyzeRequestParams,

      @doc("Input content type")
      @header contentType: "application/json";

      @doc("Classify request parameters.")
      @body
      classifyRequest: ClassifyDocumentRequest;
    },
    AnalyzeResultOperation
  >;

  @doc("Gets the result of document classifier.")
  @route("/documentClassifiers/{classifierId}/analyzeResults/{resultId}")
  @get
  getClassifyResult is Azure.Core.Foundations.Operation<
    {
      @doc("Unique document classifier name.")
      @path
      @pattern("^[a-zA-Z0-9][a-zA-Z0-9._~-]{1,63}$")
      classifierId: string;

      @doc("Analyze operation result ID.")
      @path
      @format("uuid")
      resultId: string;
    },
    AnalyzeResultOperation
  >;
}

// @added(Versions.v2023_10_31_preview)
// interface ChatOperations {
//   @doc("Builds a chat index from documents.")
//   @route("/chat:build")
//   @post
//   BuildIndex is Azure.Core.Foundations.Operation<{}, void>;

//   @doc("Creates a completion for the chat message.")
//   @route("/chat/{chatId}:complete")
//   @post
//   CompleteChat is Azure.Core.Foundations.Operation<
//     {
//       @doc("Chat index ID.")
//       @path
//       chatId: string;

//       @doc("Complete chat request parameters.")
//       @body
//       CompleteChatRequest: CompleteChatRequest;
//     },
//     ChatCompletion
//   >;
// }
