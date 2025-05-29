import type { BlobImmutabilityPolicyMode } from "./generatedModels.js";
import type { BlobDownloadHeaders, BlobType, CopyStatusType, LeaseDurationType, LeaseStateType, LeaseStatusType } from "./generatedModels.js";
import type { BlobDownloadResponseParsed, Metadata, ObjectReplicationPolicy } from "./models.js";
import type { ReadableStreamGetter, RetriableReadableStreamOptions } from "./utils/RetriableReadableStream.js";
import type { ResponseWithHeaders } from "./utils/utils.common.js";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * BlobDownloadResponse implements BlobDownloadResponseParsed interface, and in Node.js runtime it will
 * automatically retry when internal read stream unexpected ends. (This kind of unexpected ends cannot
 * trigger retries defined in pipeline retry policy.)
 *
 * The {@link readableStreamBody} stream will retry underlayer, you can just use it as a normal Node.js
 * Readable stream.
 */
export declare class BlobDownloadResponse implements BlobDownloadResponseParsed {
    /**
     * Indicates that the service supports
     * requests for partial file content.
     *
     * @readonly
     */
    get acceptRanges(): string | undefined;
    /**
     * Returns if it was previously specified
     * for the file.
     *
     * @readonly
     */
    get cacheControl(): string | undefined;
    /**
     * Returns the value that was specified
     * for the 'x-ms-content-disposition' header and specifies how to process the
     * response.
     *
     * @readonly
     */
    get contentDisposition(): string | undefined;
    /**
     * Returns the value that was specified
     * for the Content-Encoding request header.
     *
     * @readonly
     */
    get contentEncoding(): string | undefined;
    /**
     * Returns the value that was specified
     * for the Content-Language request header.
     *
     * @readonly
     */
    get contentLanguage(): string | undefined;
    /**
     * The current sequence number for a
     * page blob. This header is not returned for block blobs or append blobs.
     *
     * @readonly
     */
    get blobSequenceNumber(): number | undefined;
    /**
     * The blob's type. Possible values include:
     * 'BlockBlob', 'PageBlob', 'AppendBlob'.
     *
     * @readonly
     */
    get blobType(): BlobType | undefined;
    /**
     * The number of bytes present in the
     * response body.
     *
     * @readonly
     */
    get contentLength(): number | undefined;
    /**
     * If the file has an MD5 hash and the
     * request is to read the full file, this response header is returned so that
     * the client can check for message content integrity. If the request is to
     * read a specified range and the 'x-ms-range-get-content-md5' is set to
     * true, then the request returns an MD5 hash for the range, as long as the
     * range size is less than or equal to 4 MB. If neither of these sets of
     * conditions is true, then no value is returned for the 'Content-MD5'
     * header.
     *
     * @readonly
     */
    get contentMD5(): Uint8Array | undefined;
    /**
     * Indicates the range of bytes returned if
     * the client requested a subset of the file by setting the Range request
     * header.
     *
     * @readonly
     */
    get contentRange(): string | undefined;
    /**
     * The content type specified for the file.
     * The default content type is 'application/octet-stream'
     *
     * @readonly
     */
    get contentType(): string | undefined;
    /**
     * Conclusion time of the last attempted
     * Copy File operation where this file was the destination file. This value
     * can specify the time of a completed, aborted, or failed copy attempt.
     *
     * @readonly
     */
    get copyCompletedOn(): Date | undefined;
    /**
     * String identifier for the last attempted Copy
     * File operation where this file was the destination file.
     *
     * @readonly
     */
    get copyId(): string | undefined;
    /**
     * Contains the number of bytes copied and
     * the total bytes in the source in the last attempted Copy File operation
     * where this file was the destination file. Can show between 0 and
     * Content-Length bytes copied.
     *
     * @readonly
     */
    get copyProgress(): string | undefined;
    /**
     * URL up to 2KB in length that specifies the
     * source file used in the last attempted Copy File operation where this file
     * was the destination file.
     *
     * @readonly
     */
    get copySource(): string | undefined;
    /**
     * State of the copy operation
     * identified by 'x-ms-copy-id'. Possible values include: 'pending',
     * 'success', 'aborted', 'failed'
     *
     * @readonly
     */
    get copyStatus(): CopyStatusType | undefined;
    /**
     * Only appears when
     * x-ms-copy-status is failed or pending. Describes cause of fatal or
     * non-fatal copy operation failure.
     *
     * @readonly
     */
    get copyStatusDescription(): string | undefined;
    /**
     * When a blob is leased,
     * specifies whether the lease is of infinite or fixed duration. Possible
     * values include: 'infinite', 'fixed'.
     *
     * @readonly
     */
    get leaseDuration(): LeaseDurationType | undefined;
    /**
     * Lease state of the blob. Possible
     * values include: 'available', 'leased', 'expired', 'breaking', 'broken'.
     *
     * @readonly
     */
    get leaseState(): LeaseStateType | undefined;
    /**
     * The current lease status of the
     * blob. Possible values include: 'locked', 'unlocked'.
     *
     * @readonly
     */
    get leaseStatus(): LeaseStatusType | undefined;
    /**
     * A UTC date/time value generated by the service that
     * indicates the time at which the response was initiated.
     *
     * @readonly
     */
    get date(): Date | undefined;
    /**
     * The number of committed blocks
     * present in the blob. This header is returned only for append blobs.
     *
     * @readonly
     */
    get blobCommittedBlockCount(): number | undefined;
    /**
     * The ETag contains a value that you can use to
     * perform operations conditionally, in quotes.
     *
     * @readonly
     */
    get etag(): string | undefined;
    /**
     * The number of tags associated with the blob
     *
     * @readonly
     */
    get tagCount(): number | undefined;
    /**
     * The error code.
     *
     * @readonly
     */
    get errorCode(): string | undefined;
    /**
     * The value of this header is set to
     * true if the file data and application metadata are completely encrypted
     * using the specified algorithm. Otherwise, the value is set to false (when
     * the file is unencrypted, or if only parts of the file/application metadata
     * are encrypted).
     *
     * @readonly
     */
    get isServerEncrypted(): boolean | undefined;
    /**
     * If the blob has a MD5 hash, and if
     * request contains range header (Range or x-ms-range), this response header
     * is returned with the value of the whole blob's MD5 value. This value may
     * or may not be equal to the value returned in Content-MD5 header, with the
     * latter calculated from the requested range.
     *
     * @readonly
     */
    get blobContentMD5(): Uint8Array | undefined;
    /**
     * Returns the date and time the file was last
     * modified. Any operation that modifies the file or its properties updates
     * the last modified time.
     *
     * @readonly
     */
    get lastModified(): Date | undefined;
    /**
     * Returns the UTC date and time generated by the service that indicates the time at which the blob was
     * last read or written to.
     *
     * @readonly
     */
    get lastAccessed(): Date | undefined;
    /**
     * Returns the date and time the blob was created.
     *
     * @readonly
     */
    get createdOn(): Date | undefined;
    /**
     * A name-value pair
     * to associate with a file storage object.
     *
     * @readonly
     */
    get metadata(): Metadata | undefined;
    /**
     * This header uniquely identifies the request
     * that was made and can be used for troubleshooting the request.
     *
     * @readonly
     */
    get requestId(): string | undefined;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     *
     * @readonly
     */
    get clientRequestId(): string | undefined;
    /**
     * Indicates the version of the Blob service used
     * to execute the request.
     *
     * @readonly
     */
    get version(): string | undefined;
    /**
     * Indicates the versionId of the downloaded blob version.
     *
     * @readonly
     */
    get versionId(): string | undefined;
    /**
     * Indicates whether version of this blob is a current version.
     *
     * @readonly
     */
    get isCurrentVersion(): boolean | undefined;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the blob. This value is only returned
     * when the blob was encrypted with a customer-provided key.
     *
     * @readonly
     */
    get encryptionKeySha256(): string | undefined;
    /**
     * If the request is to read a specified range and the x-ms-range-get-content-crc64 is set to
     * true, then the request returns a crc64 for the range, as long as the range size is less than
     * or equal to 4 MB. If both x-ms-range-get-content-crc64 & x-ms-range-get-content-md5 is
     * specified in the same request, it will fail with 400(Bad Request)
     */
    get contentCrc64(): Uint8Array | undefined;
    /**
     * Object Replication Policy Id of the destination blob.
     *
     * @readonly
     */
    get objectReplicationDestinationPolicyId(): string | undefined;
    /**
     * Parsed Object Replication Policy Id, Rule Id(s) and status of the source blob.
     *
     * @readonly
     */
    get objectReplicationSourceProperties(): ObjectReplicationPolicy[] | undefined;
    /**
     * If this blob has been sealed.
     *
     * @readonly
     */
    get isSealed(): boolean | undefined;
    /**
     * UTC date/time value generated by the service that indicates the time at which the blob immutability policy will expire.
     *
     * @readonly
     */
    get immutabilityPolicyExpiresOn(): Date | undefined;
    /**
     * Indicates immutability policy mode.
     *
     * @readonly
     */
    get immutabilityPolicyMode(): BlobImmutabilityPolicyMode | undefined;
    /**
     * Indicates if a legal hold is present on the blob.
     *
     * @readonly
     */
    get legalHold(): boolean | undefined;
    /**
     * The response body as a browser Blob.
     * Always undefined in node.js.
     *
     * @readonly
     */
    get contentAsBlob(): Promise<Blob> | undefined;
    /**
     * The response body as a node.js Readable stream.
     * Always undefined in the browser.
     *
     * It will automatically retry when internal read stream unexpected ends.
     *
     * @readonly
     */
    get readableStreamBody(): NodeJS.ReadableStream | undefined;
    /**
     * The HTTP response.
     */
    get _response(): ResponseWithHeaders<BlobDownloadHeaders>["_response"];
    private originalResponse;
    private blobDownloadStream?;
    /**
     * Creates an instance of BlobDownloadResponse.
     *
     * @param originalResponse -
     * @param getter -
     * @param offset -
     * @param count -
     * @param options -
     */
    constructor(originalResponse: BlobDownloadResponseParsed, getter: ReadableStreamGetter, offset: number, count: number, options?: RetriableReadableStreamOptions);
}
//# sourceMappingURL=BlobDownloadResponse.d.ts.map