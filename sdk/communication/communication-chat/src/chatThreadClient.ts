// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logger } from "./models/logger";
import {
  CommunicationIdentifier,
  CommunicationTokenCredential,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AddParticipantsRequest,
  SendMessageRequest,
  SendReadReceiptRequest,
} from "./models/requests";

import {
  AddChatParticipantsResult,
  ChatMessage,
  ChatMessageReadReceipt,
  ChatParticipant,
  ChatThreadProperties,
  ListPageSettings,
  SendChatMessageResult,
  UploadImageResult
} from "./models/models";
import {
  mapToAddChatParticipantsRequestRestModel,
  mapToChatMessageSdkModel,
  mapToChatParticipantSdkModel,
  mapToChatThreadPropertiesSdkModel,
  mapToReadReceiptSdkModel,
} from "./models/mappers";
import {
  AddParticipantsOptions,
  ChatThreadClientOptions,
  DeleteMessageOptions,
  GetMessageOptions,
  GetPropertiesOptions,
  ListMessagesOptions,
  ListParticipantsOptions,
  ListReadReceiptsOptions,
  RemoveParticipantOptions,
  SendMessageOptions,
  SendReadReceiptOptions,
  SendTypingNotificationOptions,
  UpdateMessageOptions,
  UpdateTopicOptions,
  UploadImageOptions
} from "./models/options";
import { ChatApiClient, ChatThreadUploadChatImageOptionalParams, ChatThreadUploadChatImageResponse } from "./generated/src";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { createCommunicationTokenCredentialPolicy } from "./credential/communicationTokenCredentialPolicy";
import { tracingClient } from "./generated/src/tracing";

const minimumTypingIntervalInMilliSeconds: number = 8000;

/**
 * The client to do chat operations
 */
export class ChatThreadClient {
  /**
   * Thread ID of the ChatThreadClient
   */
  readonly threadId: string;

  private readonly tokenCredential: CommunicationTokenCredential;
  private readonly client: ChatApiClient;
  private readonly xhrClient?: ChatApiClient;

  private timeOfLastTypingRequest: Date | undefined = undefined;

  constructor(
    private readonly endpoint: string,
    threadId: string,
    credential: CommunicationTokenCredential,
    options: ChatThreadClientOptions = {}
  ) {
    this.threadId = threadId;
    this.tokenCredential = credential;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new ChatApiClient(this.endpoint, {
      endpoint: this.endpoint,
      ...internalPipelineOptions,
    });

    const authPolicy = createCommunicationTokenCredentialPolicy(this.tokenCredential);
    this.client.pipeline.addPolicy(authPolicy);

    if (typeof XMLHttpRequest != "undefined") {
      this.xhrClient = new ChatApiClient(this.endpoint, {
        endpoint: this.endpoint,
        ...internalPipelineOptions,
        httpClient: createXhrHttpClient()
      });
      this.xhrClient.pipeline.addPolicy(authPolicy);
    }
  }

  /**
   * Gets a chat thread.
   * Returns the chat thread.
   * @param options -  Operation options.
   */
  public getProperties(options: GetPropertiesOptions = {}): Promise<ChatThreadProperties> {
    return tracingClient.withSpan("ChatClient-GetProperties", options, async (updatedOptions) => {
      const result = await this.client.chatThread.getChatThreadProperties(
        this.threadId,
        updatedOptions
      );
      return mapToChatThreadPropertiesSdkModel(result);
    });
  }

    /**
   * UploadImage
   * Returns the chat thread.
   * @param body - Image body to be uploaded in the Blob, ArrayBuffer, NodeJS.ReadableStream, or ReadableStream<Uint8Array>.
   * @param options -  Operation options, 'size' is required for ReadableStream.
   */
  public uploadImage(body: ArrayBuffer | Blob | ReadableStream<Uint8Array> | NodeJS.ReadableStream, options: UploadImageOptions) {
    return tracingClient.withSpan("ChatClient-GetProperties", {}, async () => {
      // console.log('size uploadImage: ', blob.size)
      const uploadChatImageOptions: ChatThreadUploadChatImageOptionalParams = {
        requestOptions: {
          onUploadProgress: options.onUploadProgress
        }
      }

      // validate file name/extension
      // validate size

      // check size if is readable stream or throw
      console.log('options.size', options.size);
      var result: ChatThreadUploadChatImageResponse;
      // var uint8Array: Uint8Array;
      if (this.xhrClient && // is browser
        ((!this.supportsReadableStream() && isReadableStream(body)) || // is readable stream but no support, need to convert
        !isReadableStream(body))
      ) {
        console.log("using xhrClient")
        result = await this.xhrClient.chatThread.uploadChatImage(
          'application/octet-stream',
          // @ts-ignore
          options.size?.toString(), // ?? blob.size?.toString() ?? blob.length?.toString(),
          this.threadId,
          // if is readable stream: convert body (readable stream) to in memory blob or array buffer
          isReadableStream(body) ? await this.getArrayBufferFromReadableStream(body) : body,
          uploadChatImageOptions
        );
      } else { // backend & fetch client for readable stream
        console.log("using default client")

        // backend (no browser) need to convert Blob to ReadableStream or ArrayBuffer
        result = await this.client.chatThread.uploadChatImage(
          'application/octet-stream',
          // @ts-ignore
          options.size?.toString(), // ?? blob.size?.toString() ?? blob.length?.toString(),
          this.threadId,
          // if is blob and has browser, will not end up in this case
          isBlob(body) ? await this.getArrayBufferFromBlob(body) : body,
          uploadChatImageOptions
        );
      }
      
      // const result = await this.client.chatThread.uploadChatImage(
      //   'application/octet-stream',
      //   blob.size.toString(),
      //   this.threadId,
      //   blob.stream(),
      //   uploadChatImageOptions
      // );
      console.log('result2----');
      console.log(result);
      const response: UploadImageResult = {
        id: result.id,
        attachmentType: 'teamsInlineImage',
        contentType: options?.filename?.split('.')?.pop(),
        name: options?.filename,
        url: 'someUrl',
        previewUrl: 'somePreviewUrl',
      }
      return response;
    });
  }

  /**
   * Updates a thread's topic.
   * @param topic - The topic needs to be updated to.
   * @param options - Operation options.
   */
  public updateTopic(topic: string, options: UpdateTopicOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-UpdateTopic",
      options,
      async (updatedOptions) => {
        await this.client.chatThread.updateChatThreadProperties(
          this.threadId,
          { topic: topic },
          updatedOptions
        );
      }
    );
  }

  /**
   * Sends a chat message to a thread identified by threadId.
   * Returns the id of the created message.
   * @param request - Request for sending a message.
   * @param options - Operation options.
   */
  public sendMessage(
    request: SendMessageRequest,
    options: SendMessageOptions = {}
  ): Promise<SendChatMessageResult> {
    return tracingClient.withSpan(
      "ChatThreadClient-SendMessage",
      options,
      async (updatedOptions) => {
        // reset typing notification clock
        this.timeOfLastTypingRequest = undefined;

        const result = await this.client.chatThread.sendChatMessage(
          this.threadId,
          { ...request, ...options },
          updatedOptions
        );
        return result;
      }
    );
  }

  /**
   * Gets a chat message identified by messageId.
   * Returns the specific message.
   * @param messageId - The message id of the message.
   * @param options - Operation options.
   */
  public getMessage(messageId: string, options: GetMessageOptions = {}): Promise<ChatMessage> {
    return tracingClient.withSpan(
      "ChatThreadClient-GetMessage",
      options,
      async (updatedOptions) => {
        const result = await this.client.chatThread.getChatMessage(
          this.threadId,
          messageId,
          updatedOptions
        );
        return mapToChatMessageSdkModel(result);
      }
    );
  }

  private async *listMessagesPage(
    pageSettings: ListPageSettings,
    options: ListMessagesOptions = {}
  ): AsyncIterableIterator<ChatMessage[]> {
    if (!pageSettings.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatMessages(
        this.threadId,
        options
      );
      pageSettings.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToChatMessageSdkModel, this);
      }
    }

    while (pageSettings.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatMessagesNext(
        this.threadId,
        pageSettings.continuationToken,
        options
      );
      pageSettings.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToChatMessageSdkModel, this);
      } else {
        break;
      }
    }
  }

  private async *listMessagesAll(options: ListMessagesOptions): AsyncIterableIterator<ChatMessage> {
    for await (const page of this.listMessagesPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of message from a thread identified by threadId.
   * Returns the list of the messages.
   * @param options - Get messages options.
   */
  public listMessages(options: ListMessagesOptions = {}): PagedAsyncIterableIterator<ChatMessage> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ChatThreadClient-ListMessages",
      options
    );

    try {
      const iter = this.listMessagesAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listMessagesPage(settings, updatedOptions);
        },
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a message identified by threadId and messageId
   * @param messageId - The message id of the message.
   * @param options - Operation options.
   */
  public deleteMessage(messageId: string, options: DeleteMessageOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-DeleteMessage",
      options,
      async (updatedOptions) => {
        await this.client.chatThread.deleteChatMessage(this.threadId, messageId, updatedOptions);
      }
    );
  }

  /**
   * Updates a message identified by threadId and messageId
   * @param messageId - The message id of the message.
   * @param options - Operation options.
   */
  public async updateMessage(messageId: string, options: UpdateMessageOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-UpdateMessage",
      options,
      async (updatedOptions) => {
        await this.client.chatThread.updateChatMessage(
          this.threadId,
          messageId,
          options,
          updatedOptions
        );
      }
    );
  }

  /**
   * Adds the details of chat participants belonging to the thread identified by threadId.
   * @param request - Thread participants' details to add in the thread roster
   * @param options - Operation options.
   */
  public async addParticipants(
    request: AddParticipantsRequest,
    options: AddParticipantsOptions = {}
  ): Promise<AddChatParticipantsResult> {
    return tracingClient.withSpan(
      "ChatThreadClient-AddParticipants",
      options,
      async (updatedOptions) => {
        const result = await this.client.chatThread.addChatParticipants(
          this.threadId,
          mapToAddChatParticipantsRequestRestModel(request),
          updatedOptions
        );
        return result;
      }
    );
  }

  private async *listParticipantsPage(
    continuationState: ListPageSettings,
    options: ListParticipantsOptions = {}
  ): AsyncIterableIterator<ChatParticipant[]> {
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatParticipants(
        this.threadId,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToChatParticipantSdkModel, this);
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatParticipantsNext(
        this.threadId,
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToChatParticipantSdkModel, this);
      } else {
        break;
      }
    }
  }

  private async *listParticipantsAll(
    options: ListParticipantsOptions
  ): AsyncIterableIterator<ChatParticipant> {
    for await (const page of this.listParticipantsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Gets the participants of the thread identified by threadId.
   * Returns the lists of the participants.
   * @param options - Operation options.
   */
  public listParticipants(
    options: ListParticipantsOptions = {}
  ): PagedAsyncIterableIterator<ChatParticipant> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ChatThreadClient-ListParticipants",
      options
    );

    try {
      const iter = this.listParticipantsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listParticipantsPage(settings, updatedOptions);
        },
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Removes participant from the thread identified by threadId.
   * @param participant - Thread participant to remove from the thread roster
   * @param options - Operation options.
   */
  public async removeParticipant(
    participant: CommunicationIdentifier,
    options: RemoveParticipantOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-RemoveParticipant",
      options,
      async (updatedOptions) => {
        await this.client.chatThread.removeChatParticipant(
          this.threadId,
          serializeCommunicationIdentifier(participant),
          updatedOptions
        );
      }
    );
  }

  /**
   * Sends a typing notification to the thread.
   * Doesn't attempt to send if the time since last notification is smaller than the minimum typing interval
   * @param options - - Operation options
   * @returns True if the typing message notification could be sent, otherwise false.
   */
  public async sendTypingNotification(
    options: SendTypingNotificationOptions = {}
  ): Promise<boolean> {
    return tracingClient.withSpan(
      "ChatThreadClient-SendTypingNotification",
      options,
      async (updatedOptions) => {
        const dateNow = new Date();
        const { senderDisplayName, ...restOptions } = updatedOptions;

        if (this.canPostTypingNotification(dateNow)) {
          this.timeOfLastTypingRequest = dateNow;

          await this.client.chatThread.sendTypingNotification(this.threadId, {
            sendTypingNotificationRequest: { senderDisplayName: senderDisplayName },
            ...restOptions,
          });
          return true;
        }

        logger.info(`Typing Notification NOT Send. [thread_id=${this.threadId}]`);
        return false;
      }
    );
  }

  /**
   * Sends a read receipt to the thread identified by threadId.
   * @param request - Request for sending a read receipt
   * @param options - Operation options.
   */
  public async sendReadReceipt(
    request: SendReadReceiptRequest,
    options: SendReadReceiptOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-SendReadReceipt",
      options,
      async (updatedOptions) => {
        await this.client.chatThread.sendChatReadReceipt(this.threadId, request, updatedOptions);
      }
    );
  }

  private async *listReadReceiptsPage(
    continuationState: ListPageSettings,
    options: ListReadReceiptsOptions = {}
  ): AsyncIterableIterator<ChatMessageReadReceipt[]> {
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatReadReceipts(
        this.threadId,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToReadReceiptSdkModel, this);
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatReadReceiptsNext(
        this.threadId,
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToReadReceiptSdkModel, this);
      } else {
        break;
      }
    }
  }

  private async *listReadReceiptsAll(
    options: ListReadReceiptsOptions
  ): AsyncIterableIterator<ChatMessageReadReceipt> {
    for await (const page of this.listReadReceiptsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of read receipt from a thread identified by threadId.
   * Returns the list of the messages.
   * @param options - Get messages options.
   */
  public listReadReceipts(
    options: ListReadReceiptsOptions = {}
  ): PagedAsyncIterableIterator<ChatMessageReadReceipt> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ChatThreadClient-ListChatReadReceipts",
      options
    );

    try {
      const iter = this.listReadReceiptsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listReadReceiptsPage(settings, updatedOptions);
        },
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private canPostTypingNotification(dateNow: Date): boolean {
    if (this.timeOfLastTypingRequest) {
      const timeSinceLastRequestInMilliSeconds =
        dateNow.getTime() - this.timeOfLastTypingRequest.getTime();

      if (timeSinceLastRequestInMilliSeconds < minimumTypingIntervalInMilliSeconds) {
        logger.info(`Typing interval check failed. [last_request=${this.timeOfLastTypingRequest}]`);
        return false;
      }
    }

    return true;
  }

  private supportsReadableStream(): boolean {
    let duplexAccessed = false;
    const hasContentType = new Request('', {
      body: new ReadableStream(),
      method: 'POST',
      // @ts-ignore
      get duplex() {
        duplexAccessed = true;
        return 'half';
      },
    }).headers.has('Content-Type');
    return duplexAccessed && !hasContentType;
  }

  private async getArrayBufferFromReadableStream(body: ReadableStream<Uint8Array>): Promise<ArrayBuffer> {
    console.log("getArrayBufferFromReadableStream");
    const arrayBuffer = await new Response(body).arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  private async getArrayBufferFromBlob(body: Blob): Promise<ArrayBuffer> {
    console.log("getArrayBufferFromBlob");
    return new Uint8Array(await body.arrayBuffer());
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError } from "@azure/abort-controller";
import {
  HttpClient,
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
  TransferProgressEvent,
} from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { RestError } from "@azure/core-rest-pipeline";
// import * as coreClient from "@azure/core-client";

function isNodeReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

/**
 * Checks if the body is a ReadableStream supported by browsers
 */
function isReadableStream(body: unknown): body is ReadableStream {
  return Boolean(
    body &&
      typeof (body as ReadableStream).getReader === "function" &&
      typeof (body as ReadableStream).tee === "function"
  );
}

/**
 * Checks if the body is a Blob or Blob-like
 */
function isBlob(body: unknown): body is Blob {
  // File objects count as a type of Blob, so we want to use instanceof explicitly
  return (typeof Blob === "function" || typeof Blob === "object") && body instanceof Blob;
}

/**
 * A HttpClient implementation that uses XMLHttpRequest to send HTTP requests.
 * @internal
 */
class XhrHttpClient implements HttpClient {
  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request - The request to be made.
   */
  public async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    const url = new URL(request.url);
    const isInsecure = url.protocol !== "https:";

    if (isInsecure && !request.allowInsecureConnection) {
      throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
    }

    const xhr = new XMLHttpRequest();

    if (request.proxySettings) {
      throw new Error("HTTP proxy is not supported in browser environment");
    }

    const abortSignal = request.abortSignal;
    if (abortSignal) {
      if (abortSignal.aborted) {
        throw new AbortError("The operation was aborted.");
      }

      const listener = (): void => {
        xhr.abort();
      };
      abortSignal.addEventListener("abort", listener);
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          abortSignal.removeEventListener("abort", listener);
        }
      });
    }

    addProgressListener(xhr.upload, request.onUploadProgress);
    addProgressListener(xhr, request.onDownloadProgress);

    xhr.open(request.method, request.url);
    xhr.timeout = request.timeout;
    xhr.withCredentials = request.withCredentials;
    for (const [name, value] of request.headers) {
      xhr.setRequestHeader(name, value);
    }

    xhr.responseType = request.streamResponseStatusCodes?.size ? "blob" : "text";

    const body = typeof request.body === "function" ? request.body() : request.body;
    if (isNodeReadableStream(body) || isReadableStream(body)) {
      throw new Error("streams are not supported in XhrHttpClient.");
    }

    xhr.send(body === undefined ? null : body);

    if (xhr.responseType === "blob") {
      return new Promise((resolve, reject) => {
        handleBlobResponse(xhr, request, resolve, reject);
        rejectOnTerminalEvent(request, xhr, reject);
      });
    } else {
      return new Promise(function (resolve, reject) {
        xhr.addEventListener("load", () =>
          resolve({
            request,
            status: xhr.status,
            headers: parseHeaders(xhr),
            bodyAsText: xhr.responseText,
          })
        );
        rejectOnTerminalEvent(request, xhr, reject);
      });
    }
  }
}

function handleBlobResponse(
  xhr: XMLHttpRequest,
  request: PipelineRequest,
  res: (value: PipelineResponse | PromiseLike<PipelineResponse>) => void,
  rej: (reason?: any) => void
): void {
  xhr.addEventListener("readystatechange", () => {
    // Resolve as soon as headers are loaded
    if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
      if (
        // Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
        request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) ||
        request.streamResponseStatusCodes?.has(xhr.status)
      ) {
        const blobBody = new Promise<Blob>((resolve, reject) => {
          xhr.addEventListener("load", () => {
            resolve(xhr.response);
          });
          rejectOnTerminalEvent(request, xhr, reject);
        });
        res({
          request,
          status: xhr.status,
          headers: parseHeaders(xhr),
          blobBody,
        });
      } else {
        xhr.addEventListener("load", () => {
          // xhr.response is of Blob type if the request is sent with xhr.responseType === "blob"
          // but the status code is not one of the stream response status codes,
          // so treat it as text and convert from Blob to text
          if (xhr.response) {
            xhr.response
              .text()
              .then((text: string) => {
                res({
                  request: request,
                  status: xhr.status,
                  headers: parseHeaders(xhr),
                  bodyAsText: text,
                });
                return;
              })
              .catch((e: any) => {
                rej(e);
              });
          } else {
            res({
              request,
              status: xhr.status,
              headers: parseHeaders(xhr),
            });
          }
        });
      }
    }
  });
}

function addProgressListener(
  xhr: XMLHttpRequestEventTarget,
  listener?: (progress: TransferProgressEvent) => void
): void {
  if (listener) {
    xhr.addEventListener("progress", (rawEvent) =>
      listener({
        loadedBytes: rawEvent.loaded,
      })
    );
  }
}

function parseHeaders(xhr: XMLHttpRequest): HttpHeaders {
  const responseHeaders = createHttpHeaders();
  const headerLines = xhr
    .getAllResponseHeaders()
    .trim()
    .split(/[\r\n]+/);
  for (const line of headerLines) {
    const index = line.indexOf(":");
    const headerName = line.slice(0, index);
    const headerValue = line.slice(index + 2);
    responseHeaders.set(headerName, headerValue);
  }
  return responseHeaders;
}

function rejectOnTerminalEvent(
  request: PipelineRequest,
  xhr: XMLHttpRequest,
  reject: (err: any) => void
): void {
  xhr.addEventListener("error", () =>
    reject(
      new RestError(`Failed to send request to ${request.url}`, {
        code: RestError.REQUEST_SEND_ERROR,
        request,
      })
    )
  );
  const abortError = new AbortError("The operation was aborted.");
  xhr.addEventListener("abort", () => reject(abortError));
  xhr.addEventListener("timeout", () => reject(abortError));
}

/**
 * Create a new HttpClient instance for the browser environment.
 * @internal
 */
export function createXhrHttpClient(): HttpClient {
  return new XhrHttpClient();
}
