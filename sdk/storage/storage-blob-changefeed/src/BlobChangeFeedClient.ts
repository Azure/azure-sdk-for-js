// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlobServiceClient, StoragePipelineOptions, StorageSharedKeyCredential, AnonymousCredential, Pipeline } from "@azure/storage-blob";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { ChangeFeedFactory } from "./ChangeFeedFactory";
import { ChangeFeed } from "./ChangeFeed";
import { CHANGE_FEED_MAX_PAGE_SIZE, SDK_VERSION } from "./utils/constants";
import { BlobChangeFeedListChangesOptions } from './models/models';
import { TokenCredential } from '@azure/core-http';

export class BlobChangeFeedEventPage {
  public events: BlobChangeFeedEvent[];
  public continuationToken: string;

  constructor() {
    this.events = [];
    this.continuationToken = "";
  }
}

export function newPipeline(
  credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
  pipelineOptions: StoragePipelineOptions = {}
): Pipeline {
  return newPipeline(credential, BlobChangeFeedClient.appendUserAgentPrefix(pipelineOptions));
}

export class BlobChangeFeedClient {
  /**
   * blobServiceClient provided by @azure/storage-blob package.
   *
   * @private
   * @type {BlobServiceClient}
   * @memberof BlobChangeFeedClient
   */
  private _blobServiceClient: BlobServiceClient;
  private _changeFeedFactory: ChangeFeedFactory;

  public static appendUserAgentPrefix(options?: StoragePipelineOptions): StoragePipelineOptions {
    if (!options) {
      options = {};
    }
    if (options.userAgentOptions === undefined) {
      options.userAgentOptions = {}
    }

    if (options.userAgentOptions.userAgentPrefix === undefined) {
      options.userAgentOptions.userAgentPrefix = "";
    } else if (options.userAgentOptions.userAgentPrefix !== "") {
      // two spaces to work around as the TelemetryPolicyFactory in blob removes the first space now.
      options.userAgentOptions.userAgentPrefix += "  "
    }
    options.userAgentOptions.userAgentPrefix += `changefeed-js/${SDK_VERSION}`;
    return options;
  }

  public static fromConnectionString(connectionString: string, options?: StoragePipelineOptions) : BlobChangeFeedClient {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString, options);
    return new BlobChangeFeedClient(blobServiceClient.url, blobServiceClient.credential, this.appendUserAgentPrefix(options));
  }
  
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
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
    this._changeFeedFactory = new ChangeFeedFactory();

    if (credentialOrPipeline instanceof Pipeline) {
      this._blobServiceClient = new BlobServiceClient(urlOrClient, credentialOrPipeline);
    }
    else {
      this._blobServiceClient = new BlobServiceClient(urlOrClient, credentialOrPipeline, BlobChangeFeedClient.appendUserAgentPrefix(options));
    }
  }

  private async *getChange(
    options: BlobChangeFeedListChangesOptions = {}
  ): AsyncIterableIterator<BlobChangeFeedEvent> {
    const changeFeed: ChangeFeed = await this._changeFeedFactory.create(
      this._blobServiceClient,
      undefined,
      options
    );

    while (changeFeed.hasNext()) {
      const event = await changeFeed.getChange();
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
    const changeFeed: ChangeFeed = await this._changeFeedFactory.create(
      this._blobServiceClient,
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
          abortSignal: options.abortSignal
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
