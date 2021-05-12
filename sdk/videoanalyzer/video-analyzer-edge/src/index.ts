export * from "./generated/models"; //add omit
import { PipelineTopology, LivePipeline } from "./generated/models";
import { MethodRequest } from "./generated/models/mappers";

export interface Request<T> {
  methodName: string;
  payload: T & { "@apiVersion": string };
}

interface NameObject {
  name: string;
}

export type RequestType =
  | "pipelineTopologySet"
  | "pipelineTopologyGet"
  | "pipelineTopologyList"
  | "pipelineTopologyDelete"
  | "livePipelineSet"
  | "livePipelineGet"
  | "livePipelineList"
  | "livePipelineDelete"
  | "livePipelineActivate"
  | "livePipelineDeactivate";

const apiVersion = MethodRequest.type.modelProperties!.apiVersion.defaultValue;

export function createRequest(
  request: "pipelineTopologySet",
  payload: PipelineTopology
): Request<PipelineTopology>;
export function createRequest(request: "pipelineTopologyGet", payload: string): Request<NameObject>;
export function createRequest(request: "pipelineTopologyList"): Request<{}>;
export function createRequest(
  request: "pipelineTopologyDelete",
  payload: string
): Request<NameObject>;
export function createRequest(
  request: "livePipelineSet",
  payload: LivePipeline
): Request<LivePipeline>;
export function createRequest(request: "livePipelineGet", payload: string): Request<NameObject>;
export function createRequest(request: "livePipelineList"): Request<{}>;
export function createRequest(request: "livePipelineDelete", payload: string): Request<NameObject>;
export function createRequest(
  request: "livePipelineActivate",
  payload: string
): Request<NameObject>;
export function createRequest(
  request: "livePipelineDeactivate",
  payload: string
): Request<NameObject>;
export function createRequest<T extends object>(request: RequestType, payload?: any): Request<T> {
  return {
    methodName: request,
    payload: {
      ...(typeof payload === "string" ? { name: payload } : payload ?? {}),
      "@apiVersion": apiVersion
    }
  };
}
