import { OperationRequest, OperationRequestInfo } from "./interfaces.js";

export const state = {
  operationRequestMap: new WeakMap<OperationRequest, OperationRequestInfo>(),
};
