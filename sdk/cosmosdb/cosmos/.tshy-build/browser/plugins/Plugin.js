/**
 * Used to specify which type of events to execute this plug in on.
 *
 * @hidden
 */
export var PluginOn;
(function (PluginOn) {
    /**
     * Will be executed per network request
     */
    PluginOn["request"] = "request";
    /**
     * Will be executed per API operation
     */
    PluginOn["operation"] = "operation";
})(PluginOn || (PluginOn = {}));
/**
 * @internal
 */
export async function executePlugins(diagnosticNode, requestContext, next, on) {
    if (!requestContext.plugins) {
        return next(requestContext, diagnosticNode, undefined);
    }
    let level = 0;
    const _ = (inner) => {
        if (++level >= inner.plugins.length) {
            return next(requestContext, diagnosticNode, undefined);
        }
        else if (inner.plugins[level].on !== on) {
            return _(requestContext);
        }
        else {
            return inner.plugins[level].plugin(inner, diagnosticNode, _);
        }
    };
    if (requestContext.plugins[level].on !== on) {
        return _(requestContext);
    }
    else {
        return requestContext.plugins[level].plugin(requestContext, diagnosticNode, _);
    }
}
//# sourceMappingURL=Plugin.js.map