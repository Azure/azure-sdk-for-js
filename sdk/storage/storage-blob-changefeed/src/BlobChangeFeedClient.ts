import { BlobServiceClient } from "@azure/storage-blob";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { ChangeFeedFactory } from "./ChangeFeedFactory";
import { ChangeFeed } from "./ChangeFeed";
import { CHANGE_FEED_MAX_PAGE_SIZE } from "./utils/constants";

export interface BlobChangeFeedListChangesOptions {
  start?: Date;
  end?: Date;
}

export class BlobChangeFeedEventPage {
  public events: BlobChangeFeedEvent[];
  public continuationToken: string;

  constructor() {
    this.events = [];
    this.continuationToken = "";
  }
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

  public constructor(blobServiceClient: BlobServiceClient) {
    this._blobServiceClient = blobServiceClient;
    this._changeFeedFactory = new ChangeFeedFactory();
  }

  private async *getChange(
    options: BlobChangeFeedListChangesOptions = {}
  ): AsyncIterableIterator<BlobChangeFeedEvent> {
    const changeFeed: ChangeFeed = await this._changeFeedFactory.create(
      this._blobServiceClient,
      undefined,
      options.start,
      options.end
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
      options.start,
      options.end
    );

    if (!maxPageSize || maxPageSize > CHANGE_FEED_MAX_PAGE_SIZE) {
      maxPageSize = CHANGE_FEED_MAX_PAGE_SIZE;
    }
    while (changeFeed.hasNext()) {
      const eventPage = new BlobChangeFeedEventPage();
      while (changeFeed.hasNext() && eventPage.events.length < maxPageSize) {
        const event = await changeFeed.getChange();
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
