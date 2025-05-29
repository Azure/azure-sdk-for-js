import { __rest } from "tslib";
export function createLroSpec(inputs) {
    const { args, spec, sendOperationFn } = inputs;
    return {
        requestMethod: spec.httpMethod,
        requestPath: spec.path,
        sendInitialRequest: () => sendOperationFn(args, spec),
        sendPollRequest: (path, options) => {
            const { requestBody } = spec, restSpec = __rest(spec, ["requestBody"]);
            return sendOperationFn(args, Object.assign(Object.assign({}, restSpec), { httpMethod: "GET", path, abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal }));
        },
    };
}
//# sourceMappingURL=lroImpl.js.map