import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { Library } from "../operationsInterfaces/index.js";
import type * as coreRestPipeline from "@azure/core-rest-pipeline";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type { LibraryResource, LibraryListOptionalParams, LibraryFlushOptionalParams, LibraryGetOperationResultOptionalParams, LibraryGetOperationResultResponse, LibraryDeleteOptionalParams, LibraryGetOptionalParams, LibraryGetResponse, LibraryCreateOptionalParams, LibraryAppendOptionalParams } from "../models/index.js";
/** Class containing Library operations. */
export declare class LibraryImpl implements Library {
    private readonly client;
    /**
     * Initialize a new instance of the class Library class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Lists Library.
     * @param options - The options parameters.
     */
    list(options?: LibraryListOptionalParams): PagedAsyncIterableIterator<LibraryResource>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists Library.
     * @param options - The options parameters.
     */
    private _list;
    /**
     * Flush Library
     * @param libraryName - file name to upload. Minimum length of the filename should be 1 excluding the
     *                    extension length.
     * @param options - The options parameters.
     */
    beginFlush(libraryName: string, options?: LibraryFlushOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Flush Library
     * @param libraryName - file name to upload. Minimum length of the filename should be 1 excluding the
     *                    extension length.
     * @param options - The options parameters.
     */
    beginFlushAndWait(libraryName: string, options?: LibraryFlushOptionalParams): Promise<void>;
    /**
     * Get Operation result for Library
     * @param operationId - operation id for which status is requested
     * @param options - The options parameters.
     */
    getOperationResult(operationId: string, options?: LibraryGetOperationResultOptionalParams): Promise<LibraryGetOperationResultResponse>;
    /**
     * Delete Library
     * @param libraryName - file name to upload. Minimum length of the filename should be 1 excluding the
     *                    extension length.
     * @param options - The options parameters.
     */
    beginDelete(libraryName: string, options?: LibraryDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Delete Library
     * @param libraryName - file name to upload. Minimum length of the filename should be 1 excluding the
     *                    extension length.
     * @param options - The options parameters.
     */
    beginDeleteAndWait(libraryName: string, options?: LibraryDeleteOptionalParams): Promise<void>;
    /**
     * Get Library
     * @param libraryName - file name to upload. Minimum length of the filename should be 1 excluding the
     *                    extension length.
     * @param options - The options parameters.
     */
    get(libraryName: string, options?: LibraryGetOptionalParams): Promise<LibraryGetResponse>;
    /**
     * Creates a library with the library name.
     * @param libraryName - file name to upload. Minimum length of the filename should be 1 excluding the
     *                    extension length.
     * @param options - The options parameters.
     */
    beginCreate(libraryName: string, options?: LibraryCreateOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Creates a library with the library name.
     * @param libraryName - file name to upload. Minimum length of the filename should be 1 excluding the
     *                    extension length.
     * @param options - The options parameters.
     */
    beginCreateAndWait(libraryName: string, options?: LibraryCreateOptionalParams): Promise<void>;
    /**
     * Append the content to the library resource created using the create operation. The maximum content
     * size is 4MiB. Content larger than 4MiB must be appended in 4MiB chunks
     * @param libraryName - file name to upload. Minimum length of the filename should be 1 excluding the
     *                    extension length.
     * @param content - Library file chunk.
     * @param options - The options parameters.
     */
    append(libraryName: string, content: coreRestPipeline.RequestBodyType, options?: LibraryAppendOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param nextLink - The nextLink from the previous successful call to the List method.
     * @param options - The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=library.d.ts.map