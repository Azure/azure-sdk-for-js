export declare const SDK_VERSION: string;
export declare const SERVICE_VERSION: string;
export declare const BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES: number;
export declare const BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES: number;
export declare const BLOCK_BLOB_MAX_BLOCKS: number;
export declare const DEFAULT_BLOCK_BUFFER_SIZE_BYTES: number;
export declare const DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES: number;
export declare const DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS: number;
export declare const REQUEST_TIMEOUT: number;
/**
 * The OAuth scope to use with Azure Storage.
 */
export declare const StorageOAuthScopes: string | string[];
export declare const URLConstants: {
    Parameters: {
        FORCE_BROWSER_NO_CACHE: string;
        SIGNATURE: string;
        SNAPSHOT: string;
        VERSIONID: string;
        TIMEOUT: string;
    };
};
export declare const HTTPURLConnection: {
    HTTP_ACCEPTED: number;
    HTTP_CONFLICT: number;
    HTTP_NOT_FOUND: number;
    HTTP_PRECON_FAILED: number;
    HTTP_RANGE_NOT_SATISFIABLE: number;
};
export declare const HeaderConstants: {
    AUTHORIZATION: string;
    AUTHORIZATION_SCHEME: string;
    CONTENT_ENCODING: string;
    CONTENT_ID: string;
    CONTENT_LANGUAGE: string;
    CONTENT_LENGTH: string;
    CONTENT_MD5: string;
    CONTENT_TRANSFER_ENCODING: string;
    CONTENT_TYPE: string;
    COOKIE: string;
    DATE: string;
    IF_MATCH: string;
    IF_MODIFIED_SINCE: string;
    IF_NONE_MATCH: string;
    IF_UNMODIFIED_SINCE: string;
    PREFIX_FOR_STORAGE: string;
    RANGE: string;
    USER_AGENT: string;
    X_MS_CLIENT_REQUEST_ID: string;
    X_MS_COPY_SOURCE: string;
    X_MS_DATE: string;
    X_MS_ERROR_CODE: string;
    X_MS_VERSION: string;
    X_MS_CopySourceErrorCode: string;
};
export declare const ETagNone = "";
export declare const ETagAny = "*";
export declare const SIZE_1_MB: number;
export declare const BATCH_MAX_REQUEST = 256;
export declare const BATCH_MAX_PAYLOAD_IN_BYTES: number;
export declare const HTTP_LINE_ENDING = "\r\n";
export declare const HTTP_VERSION_1_1 = "HTTP/1.1";
export declare const EncryptionAlgorithmAES25 = "AES256";
export declare const DevelopmentConnectionString = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;";
export declare const StorageBlobLoggingAllowedHeaderNames: string[];
export declare const StorageBlobLoggingAllowedQueryParameters: string[];
export declare const BlobUsesCustomerSpecifiedEncryptionMsg = "BlobUsesCustomerSpecifiedEncryption";
export declare const BlobDoesNotUseCustomerSpecifiedEncryption = "BlobDoesNotUseCustomerSpecifiedEncryption";
export declare const PathStylePorts: string[];
//# sourceMappingURL=constants.d.ts.map