import type { CancellableAsyncLock } from "./lock.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { WebSocketImpl } from "rhea-promise";
/**
 * @internal
 *
 * Describes the options that can be provided to create an async lock.
 */
export interface AsyncLockOptions {
    /**
     * The max timeout. Default is: 0 (never timeout).
     */
    timeout?: number;
    /**
     * Maximum pending tasks. Default is: 1000.
     */
    maxPending?: number;
    /**
     * Whether lock can reenter in the same domain.
     * Default is: false.
     */
    domainReentrant?: boolean;
    /**
     * Your implementation of the promise. Default is: global promise.
     */
    Promise?: any;
}
/**
 * Options to configure the channelling of the AMQP connection over Web Sockets.
 */
export interface WebSocketOptions {
    /**
     * The WebSocket constructor used to create an AMQP connection over a WebSocket.
     * This option should be provided in the below scenarios:
     * - The TCP port 5671 which is that is used by the AMQP connection to Event Hubs is blocked in your environment.
     * - Your application needs to be run behind a proxy server.
     * - Your application needs to run in the browser and you want to provide your own choice of Websocket implementation
     *   instead of the built-in WebSocket in the browser.
     */
    webSocket?: WebSocketImpl;
    /**
     * Options to be passed to the WebSocket constructor when the underlying `rhea` library instantiates
     * the WebSocket.
     */
    webSocketConstructorOptions?: any;
}
/**
 * Defines an object with possible properties defined in T.
 */
export type ParsedOutput<T> = {
    [P in keyof T]: T[P];
};
/**
 * Parses the connection string and returns an object of type T.
 *
 * Connection strings have the following syntax:
 *
 * ConnectionString ::= `Part { ";" Part } [ ";" ] [ WhiteSpace ]`
 * Part             ::= [ PartLiteral [ "=" PartLiteral ] ]
 * PartLiteral      ::= [ WhiteSpace ] Literal [ WhiteSpace ]
 * Literal          ::= ? any sequence of characters except ; or = or WhiteSpace ?
 * WhiteSpace       ::= ? all whitespace characters including `\r` and `\n` ?
 *
 * @param connectionString - The connection string to be parsed.
 * @returns ParsedOutput<T>.
 */
export declare function parseConnectionString<T>(connectionString: string): ParsedOutput<T>;
/**
 * The cancellable async lock instance.
 */
export declare const defaultCancellableLock: CancellableAsyncLock;
/**
 * @internal
 *
 * Describes a Timeout class that can wait for the specified amount of time and then resolve/reject
 * the promise with the given value.
 */
export declare class Timeout {
    private _timer?;
    set<T>(t: number, value?: T): Promise<T>;
    clear(): void;
    wrap<T>(promise: Promise<T>, t: number, value?: T): Promise<T>;
    private _promiseFinally;
    static set<T>(t: number, value?: T): Promise<T>;
    static wrap<T>(promise: Promise<T>, t: number, value?: T): Promise<T>;
}
/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param abortSignal - The abortSignal associated with containing operation.
 * @param abortErrorMsg - The abort error message associated with containing operation.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @returns - Resolved promise
 */
export declare function delay<T>(delayInMs: number, abortSignal?: AbortSignalLike, abortErrorMsg?: string, value?: T): Promise<T | void>;
/**
 * Checks if an address is localhost.
 * @param address - The address to check.
 * @returns true if the address is localhost, false otherwise.
 */
export declare function isLoopbackAddress(address: string): boolean;
/**
 * @internal
 *
 * Generates a random number between the given interval
 * @param min - Min number of the range (inclusive).
 * @param max - Max number of the range (inclusive).
 */
export declare function randomNumberFromInterval(min: number, max: number): number;
/**
 * @internal
 *
 * Type declaration for a Function type where T is the input to the function and V is the output
 * of the function.
 */
export type Func<T, V> = (a: T) => V;
/**
 * @internal
 *
 * Executes an array of promises sequentially. Inspiration of this method is here:
 * https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html. An awesome blog on promises!
 *
 * @param promiseFactories - An array of promise factories(A function that return a promise)
 *
 * @param kickstart - Input to the first promise that is used to kickstart the promise chain.
 * If not provided then the promise chain starts with undefined.
 *
 * @returns A chain of resolved or rejected promises
 */
export declare function executePromisesSequentially(promiseFactories: Array<any>, kickstart?: unknown): Promise<any>;
/**
 * @internal
 *
 * Determines whether the given connection string is an iothub connection string.
 * @param connectionString - The connection string.
 * @returns boolean.
 */
export declare function isIotHubConnectionString(connectionString: string): boolean;
/**
 * @internal
 */
export declare function isString(s: unknown): s is string;
/**
 * @internal
 */
export declare function isNumber(n: unknown): n is number;
//# sourceMappingURL=utils.d.ts.map