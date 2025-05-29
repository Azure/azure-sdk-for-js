import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { NotebookOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type { NotebookResource, NotebookGetNotebooksByWorkspaceOptionalParams, NotebookGetNotebookSummaryByWorkSpaceOptionalParams, NotebookCreateOrUpdateNotebookOptionalParams, NotebookCreateOrUpdateNotebookResponse, NotebookGetNotebookOptionalParams, NotebookGetNotebookResponse, NotebookDeleteNotebookOptionalParams, ArtifactRenameRequest, NotebookRenameNotebookOptionalParams } from "../models/index.js";
/** Class containing NotebookOperations operations. */
export declare class NotebookOperationsImpl implements NotebookOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class NotebookOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Lists Notebooks.
     * @param options - The options parameters.
     */
    listNotebooksByWorkspace(options?: NotebookGetNotebooksByWorkspaceOptionalParams): PagedAsyncIterableIterator<NotebookResource>;
    private getNotebooksByWorkspacePagingPage;
    private getNotebooksByWorkspacePagingAll;
    /**
     * Lists a summary of Notebooks.
     * @param options - The options parameters.
     */
    listNotebookSummaryByWorkSpace(options?: NotebookGetNotebookSummaryByWorkSpaceOptionalParams): PagedAsyncIterableIterator<NotebookResource>;
    private getNotebookSummaryByWorkSpacePagingPage;
    private getNotebookSummaryByWorkSpacePagingAll;
    /**
     * Lists Notebooks.
     * @param options - The options parameters.
     */
    private _getNotebooksByWorkspace;
    /**
     * Lists a summary of Notebooks.
     * @param options - The options parameters.
     */
    private _getNotebookSummaryByWorkSpace;
    /**
     * Creates or updates a Note Book.
     * @param notebookName - - The notebook name.
     * @param notebook - - Note book resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateNotebook(notebookName: string, notebook: NotebookResource, options?: NotebookCreateOrUpdateNotebookOptionalParams): Promise<SimplePollerLike<OperationState<NotebookCreateOrUpdateNotebookResponse>, NotebookCreateOrUpdateNotebookResponse>>;
    /**
     * Creates or updates a Note Book.
     * @param notebookName - The notebook name.
     * @param notebook - Note book resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateNotebookAndWait(notebookName: string, notebook: NotebookResource, options?: NotebookCreateOrUpdateNotebookOptionalParams): Promise<NotebookCreateOrUpdateNotebookResponse>;
    /**
     * Gets a Note Book.
     * @param notebookName - The notebook name.
     * @param options - The options parameters.
     */
    getNotebook(notebookName: string, options?: NotebookGetNotebookOptionalParams): Promise<NotebookGetNotebookResponse>;
    /**
     * Deletes a Note book.
     * @param notebookName - The notebook name.
     * @param options - The options parameters.
     */
    beginDeleteNotebook(notebookName: string, options?: NotebookDeleteNotebookOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a Note book.
     * @param notebookName - The notebook name.
     * @param options - The options parameters.
     */
    beginDeleteNotebookAndWait(notebookName: string, options?: NotebookDeleteNotebookOptionalParams): Promise<void>;
    /**
     * Renames a notebook.
     * @param notebookName - The notebook name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameNotebook(notebookName: string, request: ArtifactRenameRequest, options?: NotebookRenameNotebookOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Renames a notebook.
     * @param notebookName - The notebook name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameNotebookAndWait(notebookName: string, request: ArtifactRenameRequest, options?: NotebookRenameNotebookOptionalParams): Promise<void>;
    /**
     * GetNotebooksByWorkspaceNext
     * @param nextLink - The nextLink from the previous successful call to the GetNotebooksByWorkspace
     *                 method.
     * @param options - The options parameters.
     */
    private _getNotebooksByWorkspaceNext;
    /**
     * GetNotebookSummaryByWorkSpaceNext
     * @param nextLink - The nextLink from the previous successful call to the GetNotebookSummaryByWorkSpace
     *                 method.
     * @param options - The options parameters.
     */
    private _getNotebookSummaryByWorkSpaceNext;
}
//# sourceMappingURL=notebookOperations.d.ts.map