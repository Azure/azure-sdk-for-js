import { AbortSignalLike, isNode } from "@azure/ms-rest-js";

/**
 * An aborter instance implements AbortSignal interface, can abort HTTP requests.
 *
 * - Call Aborter.none to create a new Aborter instance without timeout.
 * - Call Aborter.timeout() to create a new Aborter instance with timeout.
 *
 * For an existing instance aborter:
 * - Call aborter.withTimeout() to create and return a child Aborter instance with timeout.
 * - Call aborter.withValue(key, value) to create and return a child Aborter instance with key/value pair.
 * - Call aborter.abort() to abort current instance and all children instances.
 * - Call aborter.getValue(key) to search and get value with corresponding key from current aborter to all parents.
 *
 * @example
 * // Abort without timeout
 * await blockBlobURL.upload(Aborter.none, buf, buf.length);
 *
 * @example
 * // Abort container create in 1000ms
 * await blockBlobURL.upload(Aborter.timeout(1000), buf, buf.length);
 *
 * @example
 * // Share aborter cross multiple operations in 30s
 * // Upload the same data to 2 different data centers at the same time, abort another when any of them is finished
 * const aborter = Aborter.timeout(30 * 1000);
 * blockBlobURL1.upload(aborter, buf, buf.length).then(aborter.abort);
 * blockBlobURL2.upload(aborter, buf, buf.length).then(aborter.abort);
 *
 * @example
 * // Cascaded aborting
 * // All operations can't take more than 30 seconds
 * const aborter = Aborter.timeout(30 * 1000);
 *
 * // Following 2 operations can't take more than 25 seconds
 * await blockBlobURL.upload(aborter.withTimeout(25 * 1000), buf, buf.length);
 * await blockBlobURL.upload(aborter.withTimeout(25 * 1000), buf, buf.length);
 *
 * @export
 * @class Aborter
 * @implements {AbortSignalLike}
 */

export class Aborter implements AbortSignalLike {
  /**
   * Status of whether aborted or not.
   *
   * @readonly
   * @type {boolean}
   * @memberof Aborter
   */
  public get aborted(): boolean {
    return this._aborted;
  }

  /**
   * Creates a new Aborter instance without timeout.
   *
   * @readonly
   * @static
   * @type {Aborter}
   * @memberof Aborter
   */
  public static get none(): Aborter {
    return new Aborter(undefined, 0);
  }

  /**
   * Creates a new Aborter instance with timeout in milliseconds.
   * Set parameter timeout to 0 will not create a timer.
   *
   * @static
   * @param {number} {timeout} in milliseconds
   * @returns {Aborter}
   * @memberof Aborter
   */
  public static timeout(timeout: number): Aborter {
    return new Aborter(undefined, timeout);
  }

  /**
   * onabort event listener.
   *
   * @memberof Aborter
   */
  public onabort: ((this: AbortSignalLike, ev: any) => any) | null = null;

  // tslint:disable-next-line:variable-name
  private _aborted: boolean = false;
  private timer?: any;
  private readonly parent?: Aborter;
  private readonly children: Aborter[] = []; // When child object calls dispose(), remove child from here
  private readonly abortEventListeners: ((this: AbortSignalLike, ev?: any) => any)[] = [];
  // Pipeline proxies need to use "abortSignal as Aborter" in order to access non AbortSignalLike methods
  // immutable primitive types
  private readonly key?: string;
  private readonly value?: string | number | boolean | null;
  // private disposed: boolean = false;

  /**
   * Private constructor for internal usage, creates an instance of Aborter.
   *
   * @param {Aborter} [parent] Optional. Parent aborter.
   * @param {number} [timeout=0] Optional. Timeout before abort in millisecond, 0 means no timeout.
   * @param {string} [key] Optional. Immutable key in string.
   * @param {(string | number | boolean | null)} [value] Optional. Immutable value.
   * @memberof Aborter
   */
  private constructor(
    parent?: Aborter,
    timeout: number = 0,
    key?: string,
    value?: string | number | boolean | null
  ) {
    this.parent = parent;
    this.key = key;
    this.value = value;

    if (timeout > 0) {
      this.timer = setTimeout(() => {
        this.abort.call(this);
      }, timeout);

      // When called, the active Timeout object will not require the Node.js event loop
      // to remain active. If there is no other activity keeping the event loop running,
      // the process may exit before the Timeout object's callback is invoked.
      if (this.timer && isNode) {
        this.timer!.unref();
      }
    }
  }

  /**
   * Create and return a new Aborter instance, which will be appended as a child node of current Aborter.
   * Current Aborter instance becomes father node of the new instance. When current or father Aborter node
   * triggers timeout event, all children nodes abort event will be triggered too.
   *
   * When timeout parameter (in millisecond) is larger than 0, the abort event will be triggered when timeout.
   * Otherwise, call abort() method to manually abort.
   *
   * @param {number} {timeout} Timeout in millisecond.
   * @returns {Aborter} The new Aborter instance created.
   * @memberof Aborter
   */
  public withTimeout(timeout: number): Aborter {
    const childCancelContext = new Aborter(this, timeout);
    this.children.push(childCancelContext);
    return childCancelContext;
  }

  /**
   * Create and return a new Aborter instance, which will be appended as a child node of current Aborter.
   * Current Aborter instance becomes father node of the new instance. When current or father Aborter node
   * triggers timeout event, all children nodes abort event will be triggered too.
   *
   * Immutable key value pair will be set into the new created Aborter instance.
   * Call getValue() to find out latest value with corresponding key in the chain of
   * [current node] -> [parent node] and [grand parent node]....
   *
   * @param {string} key
   * @param {(string | number | boolean | null)} [value]
   * @returns {Aborter}
   * @memberof Aborter
   */
  public withValue(key: string, value?: string | number | boolean | null): Aborter {
    const childCancelContext = new Aborter(this, 0, key, value);
    this.children.push(childCancelContext);
    return childCancelContext;
  }

  /**
   * Find out latest value with corresponding key in the chain of
   * [current node] -> [parent node] -> [grand parent node] -> ... -> [root node].
   *
   * If key is not found, undefined will be returned.
   *
   * @param {string} key
   * @returns {(string | number | boolean | null | undefined)}
   * @memberof Aborter
   */
  public getValue(key: string): string | number | boolean | null | undefined {
    for (let parent: Aborter | undefined = this; parent; parent = parent.parent) {
      if (parent.key === key) {
        return parent.value;
      }
    }
    return undefined;
  }

  /**
   * Trigger abort event immediately, the onabort and all abort event listeners will be triggered.
   * Will try to trigger abort event for all children Aborter nodes.
   *
   * - If there is a timeout, the timer will be cancelled.
   * - If aborted is true, nothing will happen.
   *
   * @returns
   * @memberof Aborter
   */
  public abort() {
    if (this.aborted) {
      return;
    }
    this.cancelTimer();

    if (this.onabort) {
      this.onabort.call(this, { type: "abort" } as any);
    }

    this.abortEventListeners.forEach((listener) => {
      listener.call(this, { type: "abort" } as any);
    });

    this.children.forEach((child) => child.cancelByParent());

    this._aborted = true;
  }

  // public dispose() {
  //   if (this.disposed || this.aborted) {
  //     return;
  //   }

  //   this.cancelTimer();

  //   // (parent)A <- B <- C(child), if B disposes, when A abort, C will not abort
  //   if (this.parent) {
  //     const index = this.parent.children.indexOf(this);
  //     if (index > -1) {
  //       this.parent.children.splice(index, 1);
  //     }
  //   }

  //   this.disposed = true;
  // }

  /**
   * Added new "abort" event listener, only support "abort" event.
   *
   * @param {"abort"} _type Only support "abort" event
   * @param {(this: AbortSignalLike, ev: any) => any} listener
   * @memberof Aborter
   */
  public addEventListener(
    // tslint:disable-next-line:variable-name
    _type: "abort",
    listener: (this: AbortSignalLike, ev: any) => any
  ): void {
    this.abortEventListeners.push(listener);
  }

  /**
   * Remove "abort" event listener, only support "abort" event.
   *
   * @param {"abort"} _type Only support "abort" event
   * @param {(this: AbortSignalLike, ev: any) => any} listener
   * @memberof Aborter
   */
  public removeEventListener(
    // tslint:disable-next-line:variable-name
    _type: "abort",
    listener: (this: AbortSignalLike, ev: any) => any
  ): void {
    const index = this.abortEventListeners.indexOf(listener);
    if (index > -1) {
      this.abortEventListeners.splice(index, 1);
    }
  }

  public dispatchEvent(): boolean {
    throw new Error("Method not implemented.");
  }

  private cancelByParent() {
    // if (!this.disposed) {
    this.abort();
    // }
  }

  private cancelTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
