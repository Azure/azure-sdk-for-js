// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BlobServiceClient,
  StoragePipelineOptions,
  StorageSharedKeyCredential,
  AnonymousCredential,
  Pipeline,
} from "@azure/storage-blob";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { ChangeFeedFactory } from "./ChangeFeedFactory";
import { ChangeFeed } from "./ChangeFeed";
import { CHANGE_FEED_MAX_PAGE_SIZE, SDK_VERSION } from "./utils/constants";
import { BlobChangeFeedListChangesOptions } from "./models/models";
import { TokenCredential } from "@azure/core-auth";

/**
 * Contains paged response data for the {@link BlobChangeFeedClient.listChanges} operation.
 */
export class BlobChangeFeedEventPage {
  /**
   * Array of {@link BlobChangeFeedEvent}.
   */
  public events: BlobChangeFeedEvent[];

  /**
   * The token that keeps track of where to continue the iterator.
   */
  public continuationToken: string;

  constructor() {
    this.events = [];
    this.continuationToken = "";
  }
}

/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
 * @param pipelineOptions - Optional. Options.
 * @returns A new Pipeline object.
 */
export function newPipeline(
  credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
  pipelineOptions: StoragePipelineOptions = {}
): Pipeline {
  return newPipeline(credential, appendUserAgentPrefix(pipelineOptions));
}

function appendUserAgentPrefix(options?: StoragePipelineOptions): StoragePipelineOptions {
  if (!options) {
    options = {};
  }
  if (options.userAgentOptions === undefined) {
    options.userAgentOptions = {};
  }

  if (options.userAgentOptions.userAgentPrefix === undefined) {
    options.userAgentOptions.userAgentPrefix = "";
  } else if (options.userAgentOptions.userAgentPrefix !== "") {
    options.userAgentOptions.userAgentPrefix += " ";
  }
  options.userAgentOptions.userAgentPrefix += `changefeed-js/${SDK_VERSION}`;
  return options;
}

/**
 * Blob Change Feed client options.
 */
export interface BlobChangeFeedClientOptions {
  /**
   * The maximum length of an transfer in bytes.
   */
  maximumTransferSize?: number;
}

/**
 * BlobChangeFeedClient.
 * @see https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-change-feed?tabs=azure-portal
 */
export class BlobChangeFeedClient {
  /**
   * blobServiceClient provided by `@azure/storage-blob` package.
   */
  private blobServiceClient: BlobServiceClient;
  private changeFeedFactory: ChangeFeedFactory;
  private changeFeedClientOptions: BlobChangeFeedClientOptions;

  /**
   *
   * Creates an instance of BlobChangeFeedClient from connection string.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public static fromConnectionString(
    connectionString: string,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
    // Static method to construct an object, the option is for the object not for the method.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    changeFeedClientOptions?: BlobChangeFeedClientOptions
  ): BlobChangeFeedClient {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString, options);
    return new BlobChangeFeedClient(
      blobServiceClient.url,
      blobServiceClient.credential,
      appendUserAgentPrefix(options),
      changeFeedClientOptions
    );
  }

  /**
   * Creates an instance of BlobChangeFeedClient.
   *
   * @param url - A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   *
   * Example using DefaultAzureCredential from `@azure/identity`:
   *
   * ```js
   * const account = "<storage account name>";
   *
   * const defaultAzureCredential = new DefaultAzureCredential();
   *
   * const blobChangeFeedClient = new BlobChangeFeedClient(
   *   `https://${account}.blob.core.windows.net`,
   *   defaultAzureCredential
   * );
   * ```
   *
   * Example using an account name/key:
   *
   * ```js
   * const account = "<storage account name>"
   * const sharedKeyCredential = new StorageSharedKeyCredential(account, "<account key>");
   *
   * const blobChangeFeedClient = new BlobChangeFeedClient(
   *   `https://${account}.blob.core.windows.net`,
   *   sharedKeyCredential
   * );
   * ```
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
    changeFeedClientOptions?: BlobChangeFeedClientOptions
  );

  /**
   * Creates an instance of BlobChangeFeedClient.
   *
   * @param url - A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrClient: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
    changeFeedClientOptions?: BlobChangeFeedClientOptions
  ) {
    this.changeFeedClientOptions = changeFeedClientOptions || {};
    this.changeFeedFactory = new ChangeFeedFactory(
      this.changeFeedClientOptions.maximumTransferSize
    );

    if (credentialOrPipeline instanceof Pipeline) {
      this.blobServiceClient = new BlobServiceClient(urlOrClient, credentialOrPipeline);
    } else {
      this.blobServiceClient = new BlobServiceClient(
        urlOrClient,
        credentialOrPipeline,
        appendUserAgentPrefix(options)
      );
    }
  }

  private async *getChange(
    options: BlobChangeFeedListChangesOptions = {}
  ): AsyncIterableIterator<BlobChangeFeedEvent> {
    const changeFeed: ChangeFeed = await this.changeFeedFactory.create(
      this.blobServiceClient,
      undefined,
      options
    );

    while (changeFeed.hasNext()) {
      const event = await changeFeed.getChange({
        abortSignal: options.abortSignal,
        tracingOptions: options.tracingOptions,
      });
      if (event) {
        yield event;
      } else {
        return;
      }
    }
  }

  // start in ChangeFeedListChangesOptions will be ignored when continuationToken is specified.
  private async *getPage(
    continuationToken?: string,
    maxPageSize?: number,
    options: BlobChangeFeedListChangesOptions = {}
  ): AsyncIterableIterator<BlobChangeFeedEventPage> {
    const changeFeed: ChangeFeed = await this.changeFeedFactory.create(
      this.blobServiceClient,
      continuationToken,
      options
    );

    if (!maxPageSize || maxPageSize > CHANGE_FEED_MAX_PAGE_SIZE) {
      maxPageSize = CHANGE_FEED_MAX_PAGE_SIZE;
    }
    while (changeFeed.hasNext()) {
      const eventPage = new BlobChangeFeedEventPage();
      while (changeFeed.hasNext() && eventPage.events.length < maxPageSize) {
        const event = await changeFeed.getChange({
          abortSignal: options.abortSignal,
          tracingOptions: options.tracingOptions,
        });
        if (event) {
          eventPage.events.push(event);
        }
      }
      if (changeFeed.hasNext()) {
        eventPage.continuationToken = JSON.stringify(changeFeed.getCursor());
      }
      if (eventPage.events.length > 0) {
        yield eventPage;
      } else {
        return;
      }
    }
  }

  /**
   * Returns an async iterable iterator to list all the change feed events
   * in the specified account.
   *
   * .byPage() returns an async iterable iterator to list the change feed events in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * for await (const event of blobChangeFeedClient.listChanges()) {
   *   console.log(`Event ${i++}, type: ${event.eventType}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * const iter = blobChangeFeedClient.listChanges();
   * let eventItem = await iter.next();
   * while (!eventItem.done) {
   *   console.log(`Event ${i++}, type: ${eventItem.eventType}`);
   *   eventItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const eventPage of blobChangeFeedClient.listChanges().byPage({ maxPageSize: 20 })) {
   *   if (eventPage.events) {
   *     for (const event of eventPage.events) {
   *       console.log(`Event ${i++}, type: ${event.eventType}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = blobChangeFeedClient.listChanges().byPage({ maxPageSize: 2 });
   * let eventPage = (await iterator.next()).value;
   *
   * if (eventPage.events) {
   *   for (const container of eventPage.events) {
   *     console.log(`Event ${i++}, type: ${event.eventType}`);
   *   }
   * }
   *
   * // Gets next marker
   * let marker = eventPage.continuationToken;
   * // Passing next marker as continuationToken
   * iterator = blobChangeFeedClient
   *   .listChanges()
   *   .byPage({ continuationToken: marker, maxPageSize: 10 });
   * eventPage = (await iterator.next()).value;
   *
   * if (eventPage.events) {
   *   for (const container of eventPage.events) {
   *      console.log(`Event ${i++}, type: ${event.eventType}`);
   *   }
   * }
   * ```
   *
   * @param options - Options to list change feed events.
   * @returns An asyncIterableIterator that supports paging.
   */
  public listChanges(
    options: BlobChangeFeedListChangesOptions = {}
  ): PagedAsyncIterableIterator<BlobChangeFeedEvent, BlobChangeFeedEventPage> {
    const iter = this.getChange(options);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      async next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.getPage(settings.continuationToken, settings.maxPageSize, options);
      },
    };
  }
}
