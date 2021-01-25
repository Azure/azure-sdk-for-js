// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RequestContext } from "../request/RequestContext";
import { Response } from "../request/Response";

/**
 * Used to specify which type of events to execute this plug in on.
 *
 * @ignore
 */
export enum PluginOn {
  /**
   * Will be executed per network request
   */
  request = "request",
  /**
   * Will be executed per API operation
   */
  operation = "operation"
}

/**
 * Specifies which event to run for the specified plugin
 *
 * @ignore
 */
export interface PluginConfig {
  /**
   * The event to run the plugin on
   */
  on: keyof typeof PluginOn;
  /**
   * The plugin to run
   */
  plugin: Plugin<any>;
}

/**
 * Plugins allow you to customize the behavior of the SDk with additional logging, retry, or additional functionality.
 *
 * A plugin is a function which returns a Promise<Response<T>>, and is passed a RequestContext and Next object.
 *
 * Next is a function which takes in requestContext returns a promise. You must await/then that promise which will contain the response from further plugins,
 * allowing you to log those results or handle errors.
 *
 * RequestContext is an object which controls what operation is happening, against which endpoint, and more. Modifying this and passing it along via next is how
 * you modify future SDK behavior.
 *
 * @ignore
 */
export type Plugin<T> = (context: RequestContext, next: Next<T>) => Promise<Response<T>>;

/**
 * Next is a function which takes in requestContext returns a promise. You must await/then that promise which will contain the response from further plugins,
 * allowing you to log those results or handle errors.
 * @ignore
 */
export type Next<T> = (context: RequestContext) => Promise<Response<T>>;

/**
 * @internal
 * @hidden
 * @ignore
 * @param requestContext
 * @param next
 * @param on
 */
export async function executePlugins(
  requestContext: RequestContext,
  next: Plugin<any>,
  on: PluginOn
): Promise<Response<any>> {
  if (!requestContext.plugins) {
    return next(requestContext, undefined);
  }
  let level = 0;
  const _: Next<any> = (inner: RequestContext): Promise<Response<any>> => {
    if (++level >= inner.plugins.length) {
      return next(requestContext, undefined);
    } else if (inner.plugins[level].on !== on) {
      return _(requestContext);
    } else {
      return inner.plugins[level].plugin(inner, _);
    }
  };
  if (requestContext.plugins[level].on !== on) {
    return _(requestContext);
  } else {
    return requestContext.plugins[level].plugin(requestContext, _);
  }
}
