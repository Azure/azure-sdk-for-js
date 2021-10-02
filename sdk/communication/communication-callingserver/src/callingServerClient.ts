// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CallConnection, ContentDownloadResponse, DownloadContentOptions } from ".";
import { ServerCall, JoinCallRequestConverter } from ".";
import { CreateCallConnectionOptions, JoinCallOptions, ContentDownloadOptions } from "./models";
import { CallConnections, ServerCalls } from "./generated/src/operations";
import { CreateCallRequest } from "./generated/src/models";
import { CallingServerApiClientContext } from "./generated/src/callingServerApiClientContext";

import {
  CommunicationIdentifier,
  serializeCommunicationIdentifier
} from "@azure/communication-common";

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy
} from "@azure/communication-common";
import {
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  isNode,
  operationOptionsToRequestOptionsBase,
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { CallingServerApiClient } from "./generated/src/callingServerApiClient";
import { SDK_VERSION } from "./constants";
import { convertTracingToRequestOptionsBase, createSpan } from "./tracing";
import { logger } from "./logger";
import { ContentDownloader } from "./ContentDownloader";
// import { Readable } from "stream";
import { rangeToString } from "./Range";
import { RepeatableContentDownloadResponse } from "./RepeatableContentDownloadResponse";

/**
 * Client options used to configure CallingServer Client API requests.
 */
export interface CallingServerClientOptions extends PipelineOptions { }


/**
* Checks whether the type of a value is CallingServerClientOptions or not.
*
* @param options - The value being checked.
*/
const isCallingServerClientOptions = (options: any): options is CallingServerClientOptions =>
  !!options && !isKeyCredential(options);

/**
 * A CallingServerClient represents a Client to the Azure Communication CallingServer service.
 */
export class CallingServerClient {
  private readonly callingServerServiceClient: CallingServerApiClient;
  private readonly callConnectionRestClient: CallConnections;
  private readonly serverCallRestClient: ServerCalls;
  private readonly downloadCallingServerApiClient: CallingServerApiClientContext

  /**
   * Initializes a new instance of the CallingServerClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: CallingServerClientOptions);

  constructor(
    connectionString: string,
    options?: CallingServerClientOptions,
    maybeOptions: CallingServerClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionString, options);
    options = isCallingServerClientOptions(options) ? options : maybeOptions;

    const libInfo = `azsdk-js-communication-callingserver/${SDK_VERSION}`;

    if (!options?.userAgentOptions) {
      options.userAgentOptions = {};
    }

    if (options?.userAgentOptions?.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.callingServerServiceClient = new CallingServerApiClient(url, pipeline);
    this.callConnectionRestClient = this.callingServerServiceClient.callConnections;
    this.serverCallRestClient = this.callingServerServiceClient.serverCalls;
    this.downloadCallingServerApiClient = new CallingServerApiClientContext(url, pipeline);
  }

  public getCallConnection(callConnectionId: string): CallConnection {
    return new CallConnection(callConnectionId, this.callConnectionRestClient);
  }

  public initializeServerCall(serverCallId: string): ServerCall {
    return new ServerCall(serverCallId, this.serverCallRestClient);
  }

  public initializeContentDownloader() {
    return new ContentDownloader(this.downloadCallingServerApiClient);
  }

  public async createCallConnection(
    source: CommunicationIdentifier,
    targets: CommunicationIdentifier[],
    options: CreateCallConnectionOptions
  ): Promise<CallConnection> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-CreateCallConnection", options);

    const request: CreateCallRequest = {
      source: serializeCommunicationIdentifier(source),
      targets: targets.map(m => serializeCommunicationIdentifier(m)),
      callbackUri: options.callbackUri,
      requestedMediaTypes: options.requestedMediaTypes,
      requestedCallEvents: options.requestedCallEvents,
      alternateCallerId: options.alternateCallerId == null ? undefined : { value: options.alternateCallerId.phoneNumber },
      subject: options.subject
    };

    try {
      const response = await this.callConnectionRestClient.createCall(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      if (response.callConnectionId) {
        return new CallConnection(response.callConnectionId, this.callConnectionRestClient);
      } else {
        throw 'callConnectionId is missing in createCall response';
      }
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async joinCall(
    serverCallId: string,
    source: CommunicationIdentifier,
    options: JoinCallOptions,
  ): Promise<CallConnection> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-JoinCall", options);

    const request = JoinCallRequestConverter.convert(source, updatedOptions);

    try {
      const response = await this.serverCallRestClient.joinCall(
        serverCallId,
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      if (response.callConnectionId) {
        return new CallConnection(response.callConnectionId, this.callConnectionRestClient);
      } else {
        throw 'callConnectionId is missing in joinCall response';
      }
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Reads or downloads a blob from the system, including its metadata and properties.
   * You can also call Get Blob to read a snapshot.
   *
   * * In Node.js, data returns in a Readable stream readableStreamBody
   * * In browsers, data returns in a promise blobBody
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob
   *
   * @param offset - From which position of the blob to download, greater than or equal to 0
   * @param count - How much data to be downloaded, greater than 0. Will download to the end when undefined
   * @param options - Optional options to Blob Download operation.
   *
   *
   * Example usage (Node.js):
   *
   * ```js
   * // Download and convert a blob to a string
   * const downloadBlockBlobResponse = await blobClient.download();
   * const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
   * console.log("Downloaded blob content:", downloaded.toString());
   *
   * async function streamToBuffer(readableStream) {
   * return new Promise((resolve, reject) => {
   * const chunks = [];
   * readableStream.on("data", (data) => {
   * chunks.push(data instanceof Buffer ? data : Buffer.from(data));
   * });
   * readableStream.on("end", () => {
   * resolve(Buffer.concat(chunks));
   * });
   * readableStream.on("error", reject);
   * });
   * }
   * ```
   *
   * Example usage (browser):
   *
   * ```js
   * // Download and convert a blob to a string
   * const downloadBlockBlobResponse = await blobClient.download();
   * const downloaded = await blobToString(await downloadBlockBlobResponse.blobBody);
   * console.log(
   *   "Downloaded blob content",
   *   downloaded
   * );
   *
   * async function blobToString(blob: Blob): Promise<string> {
   *   const fileReader = new FileReader();
   *   return new Promise<string>((resolve, reject) => {
   *     fileReader.onloadend = (ev: any) => {
   *       resolve(ev.target!.result);
   *     };
   *     fileReader.onerror = reject;
   *     fileReader.readAsText(blob);
   *   });
   * }
   * ```
   */
   public async download(
    uri: string,
    offset: number = 0,
    count?: number,
    options: ContentDownloadOptions = {}
  ): Promise<ContentDownloadResponse> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-download", options);
    const DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS = 3;
    let contentDownloader = this.initializeContentDownloader();
    try {
      console.log("before download");
      const res = await contentDownloader.downloadContent(uri,{
        abortSignal: options.abortSignal,
        requestOptions: {
          onDownloadProgress: isNode ? undefined : options.onProgress // for Node.js, progress is reported by RetriableReadableStream
        },
        range: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });
      console.log("after download");
      // Return browser response immediately
      if (!isNode) {
        return res;
      }

      // We support retrying when download stream unexpected ends in Node.js runtime
      // Following code shouldn't be bundled into browser build, however some
      // bundlers may try to bundle following code and "FileReadResponse.ts".
      // In this case, "FileDownloadResponse.browser.ts" will be used as a shim of "FileDownloadResponse.ts"
      // The config is in package.json "browser" field
      if (options.maxRetryRequests === undefined || options.maxRetryRequests < 0) {
        // TODO: Default value or make it a required parameter?
        options.maxRetryRequests = DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS;
      }

      if (res.contentLength === undefined) {
        throw new RangeError(`File download response doesn't contain valid content length header`);
      }
      console.log("before returning");
      return new RepeatableContentDownloadResponse(
        res,
        async (start: number): Promise<NodeJS.ReadableStream> => {
          const updatedOptions: DownloadContentOptions = {
            range: rangeToString({
              count: offset + res.contentLength! - start,
              offset: start
            })
          };

          // Debug purpose only
          // console.log(
          //   `Read from internal stream, range: ${
          //     updatedOptions.range
          //   }, options: ${JSON.stringify(updatedOptions)}`
          // );

          return (
            await contentDownloader.downloadContent(
              uri, {
              abortSignal: options.abortSignal,
              ...updatedOptions
            })
          ).readableStreamBody!;
        },
        offset,
        res.contentLength!,
        {
          maxRetryRequests: options.maxRetryRequests,
          onProgress: options.onProgress
        }
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
