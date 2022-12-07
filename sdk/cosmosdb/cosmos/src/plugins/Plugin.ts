// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RequestContext } from "../request/RequestContext";
import { Response } from "../request/Response";

/**
 * Used to specify which type of events to execute this plug in on.
 *
 * @hidden
 */
export enum PluginOn {
  /**
   * Will be executed per network request
   */
  request = "request",
  /**
   * Will be executed per API operation
   */
  operation = "operation",
}

/**
 * Specifies which event to run for the specified plugin
 *
 * @hidden
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
 * A plugin is a function which returns a `Promise<Response<T>>`, and is passed a RequestContext and Next object.
 *
 * Next is a function which takes in requestContext returns a promise. You must await/then that promise which will contain the response from further plugins,
 * allowing you to log those results or handle errors.
 *
 * RequestContext is an object which controls what operation is happening, against which endpoint, and more. Modifying this and passing it along via next is how
 * you modify future SDK behavior.
 *
 * @hidden
 */
export type Plugin<T> = (context: RequestContext, next: Next<T>) => Promise<Response<T>>;

/**
 * Next is a function which takes in requestContext returns a promise. You must await/then that promise which will contain the response from further plugins,
 * allowing you to log those results or handle errors.
 * @hidden
 */
export type Next<T> = (context: RequestContext) => Promise<Response<T>>;

/**
 * TODO: Refactor to simplify recursion.
 * @internal
 */
export async function executePlugins(
  requestContext: RequestContext,
  next: Plugin<any>,
  on: PluginOn
): Promise<Response> {
  /**
   * If no plugins are supplied in requestContext hand over execution to {@link next} function.
   */
  if (!requestContext.plugins) {
    return next(requestContext, undefined);
  }
  let pluginIndex = 0;
  /**
   * Create a function whose closure has access to {@link pluginIndex} variable. which is used to keep
   * track of current plugin in RequestContext.plugins array.
   * @param inner 
   * @returns 
   */
  const _: Next<any> = (inner: RequestContext): Promise<Response> => {
    /**
     * If {@link pluginIndex} has reached or exceeded length of plugins hand over execution to 
     * {@link next} function.
     */
    if (++pluginIndex >= inner.plugins.length) {
      return next(requestContext, undefined);
    } else if (inner.plugins[pluginIndex].on !== on) {
      /**
       * If current plugin's {@link on} variable don't match, skip this and hand over execution
       * to next plugin. 
       */
      return _(requestContext);
    } else {
      /**
       * If current plugin's {@link on} variable matches, execute this plugin and then hand over 
       * execution to next plugin. 
       */
      return inner.plugins[pluginIndex].plugin(inner, _);
    }
  };
  /**
   * If FIRST plugin's {@link on} variable don't match, skip this and hand over execution
   * to next plugin. 
   */
  if (requestContext.plugins[pluginIndex].on !== on) {
    return _(requestContext);
  } else {
  /**
   * If FIRST plugin's {@link on} variable matches, execute this plugin and then hand over 
   * execution to next plugin. 
   */
    return requestContext.plugins[pluginIndex].plugin(requestContext, _);
  }
}
