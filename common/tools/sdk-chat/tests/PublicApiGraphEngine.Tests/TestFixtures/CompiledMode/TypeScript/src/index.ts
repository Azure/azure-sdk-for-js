/**
 * Default entry point — re-exports shared types.
 * The source engine uses this as THE entry point and merges everything.
 */
export { BaseClient, ClientOptions, Resource } from "./shared";
export { NodeClient, NodeClientOptions } from "./node";
export { BrowserClient, BrowserClientOptions } from "./browser";
