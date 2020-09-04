// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BlobServiceClient,
  StoragePipelineOptions,
  StorageSharedKeyCredential,
  AnonymousCredential,
  Pipeline
} from "@azure/storage-blob";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { ChangeFeedFactory } from "./ChangeFeedFactory";
import { ChangeFeed } from "./ChangeFeed";
import { CHANGE_FEED_MAX_PAGE_SIZE, SDK_VERSION } from "./utils/constants";
import { BlobChangeFeedListChangesOptions } from "./models/models";
import { TokenCredential } from "@azure/core-http";

/**
 * Contains paged response data for the {@link BlobChangeFeedClient.listChanges} operation.
 *
 * @export
 * @class BlobChangeFeedEventPage
 */
export class BlobChangeFeedEventPage {
  /**
   * Array of {@link BlobChangeFeedEvent}.
   *
   * @type {BlobChangeFeedEvent[]}
   * @memberof BlobChangeFeedEventPage
   */
  public events: BlobChangeFeedEvent[];

  /**
   * The token that keeps track of where to continue the iterator.
   *
   * @type {string}
   * @memberof BlobChangeFeedEventPage
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
 * @export
 * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
 * @param {StoragePipelineOptions} [pipelineOptions] Optional. Options.
 * @returns {Pipeline} A new Pipeline object.
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
    // two spaces to work around as the TelemetryPolicyFactory in blob removes the first space now.
    options.userAgentOptions.userAgentPrefix += "  ";
  }
  options.userAgentOptions.userAgentPrefix += `changefeed-js/${SDK_VERSION}`;
  return options;
}

/**
 * BlobChangeFeedClient.
 * @see https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-change-feed?tabs=azure-portal
 *
 * @export
 * @class BlobChangeFeedClient
 */
export class BlobChangeFeedClient {
  /**
   * blobServiceClient provided by @azure/storage-blob package.
   *
   * @private
   * @type {BlobServiceClient}
   * @memberof BlobChangeFeedClient
   */
  private blobServiceClient: BlobServiceClient;
  private changeFeedFactory: ChangeFeedFactory;

  /**
   *
   * Creates an instance of BlobChangeFeedClient from connection string.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobChangeFeedClient
   */
  public static fromConnectionString(
    connectionString: string,
    options?: StoragePipelineOptions
  ): BlobChangeFeedClient {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString, options);
    return new BlobChangeFeedClient(
      blobServiceClient.url,
      blobServiceClient.credential,
      appendUserAgentPrefix(options)
    );
  }

  /**
   * Creates an instance of BlobChangeFeedClient.
   *
   * @param {string} url A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobChangeFeedClient
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
    options?: StoragePipelineOptions
  );

  /**
   * Creates an instance of BlobChangeFeedClient.
   *
   * @param {string} url A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlobChangeFeedClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrClient: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    options?: StoragePipelineOptions
  ) {
    this.changeFeedFactory = new ChangeFeedFactory();

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
        tracingOptions: options.tracingOptions
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
          tracingOptions: options.tracingOptions
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
   * @param {BlobChangeFeedListChangesOptions} [options={}] Options to list change feed events.
   * @returns {PagedAsyncIterableIterator<BlobChangeFeedEvent, BlobChangeFeedEventPage>} An asyncIterableIterator that supports paging.
   * @memberof BlobChangeFeedClient
   */
  public listChanges(
    options: BlobChangeFeedListChangesOptions = {}
  ): PagedAsyncIterableIterator<BlobChangeFeedEvent, BlobChangeFeedEventPage> {
    const iter = this.getChange(options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      async next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.getPage(settings.continuationToken, settings.maxPageSize, options);
      }
    };
  }
}
