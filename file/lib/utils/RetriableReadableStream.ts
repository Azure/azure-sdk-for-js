import { RestError, TransferProgressEvent } from "ms-rest-js";
import { Readable } from "stream";
import { Aborter } from "../Aborter";

export type ReadableStreamGetter = (
  offset: number
) => Promise<NodeJS.ReadableStream>;

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js ReadableStream will internally retry when internal ReadableStream unexpected ends.
 *
 * @class RetriableReadableStream
 * @extends {Readable}
 */
export class RetriableReadableStream extends Readable {
  private aborter: Aborter;
  private start: number;
  private offset: number;
  private end: number;
  private getter: ReadableStreamGetter;
  private source: NodeJS.ReadableStream;
  private retries: number = 0;
  private maxRetryRequests: number;
  private progress?: (progress: TransferProgressEvent) => void;

  /**
   * Creates an instance of RetriableReadableStream.
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {ReadableStreamGetter} getter A method calling downloading request returning
   *                                      a new ReadableStream from specified offset
   * @param {NodeJS.ReadableStream} source The current ReadableStream returned from getter
   * @param {number} startInPath Offset position in original data source to read (included)
   * @param {number} endInPath End offset position in original data source to read (included)
   * @param {number} [maxRetryRequests] Max retry count (>=0), undefined or invalid value means no retry
   * @param {(progress: TransferProgressEvent) => void} [progress] Read progress event handler
   * @memberof RetriableReadableStream
   */
  public constructor(
    aborter: Aborter,
    getter: ReadableStreamGetter,
    source: NodeJS.ReadableStream,
    startInPath: number,
    endInPath: number,
    maxRetryRequests?: number,
    progress?: (progress: TransferProgressEvent) => void
  ) {
    super();
    this.aborter = aborter;
    this.getter = getter;
    this.source = source;
    this.start = startInPath;
    this.offset = startInPath;
    this.end = endInPath;
    this.maxRetryRequests =
      maxRetryRequests && maxRetryRequests >= 0 ? maxRetryRequests : 0;
    this.progress = progress;

    aborter.addEventListener("abort", () => {
      this.source.pause();
      this.emit(
        "error",
        new RestError(
          "The request was aborted",
          RestError.REQUEST_ABORTED_ERROR
        )
      );
    });

    this.setSourceDataHandler();
    this.setSourceEndHandler();
    this.setSourceErrorHandler();
  }

  public _read() {
    if (!this.aborter.aborted) {
      this.source.resume();
    }
  }

  private setSourceDataHandler() {
    this.source.on("data", (data: Buffer) => {
      // console.log(
      //   `Offset: ${this.offset}, Received ${data.length} from internal stream`
      // );
      this.offset += data.length;
      if (this.progress) {
        this.progress({ loadedBytes: this.offset - this.start });
      }
      if (!this.push(data)) {
        this.source.pause();
      }
    });
  }

  private setSourceEndHandler() {
    this.source.on("end", () => {
      // console.log(
      //   `Source stream emits end, offset: ${
      //     this.offset
      //   }, dest end : ${this.end}`
      // );
      if (this.offset - 1 === this.end) {
        this.push(null);
      } else if (this.offset <= this.end) {
        // console.log(
        //   `retries: ${this.retries}, max retries: ${this.maxRetries}`
        // );
        if (this.retries < this.maxRetryRequests) {
          this.retries += 1;
          this.getter(this.offset)
            .then(newSource => {
              this.source = newSource;
              this.setSourceDataHandler();
              this.setSourceEndHandler();
              this.setSourceErrorHandler();
            })
            .catch(error => {
              this.emit("error", error);
            });
        } else {
          this.emit(
            "error",
            `Data corruption failure: received less data than required and reached maxRetires limitation.\
             Received data offset: ${this.offset - 1}, data needed offset: ${
              this.end
            }, retries: ${this.retries}, max retries: ${this.maxRetryRequests}`
          );
        }
      } else {
        this.emit(
          "error",
          `Data corruption failure: Received more data than original request, data needed offset is ${
            this.end
          }, received offset: ${this.offset - 1}`
        );
      }
    });
  }

  private setSourceErrorHandler() {
    this.source.on("error", error => {
      this.emit("error", error);
    });
  }
}
