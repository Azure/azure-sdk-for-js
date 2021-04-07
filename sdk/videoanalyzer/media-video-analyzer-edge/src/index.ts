export * from "./generated/models"; //add omit
import { PipelineTopology, LivePipeline } from "./generated/models";
import {
  MethodRequest as MethodRequestInternal
} from "./generated/models/mappers";

export type Payload = (PipelineTopology | LivePipeline | NamePayload | {}) & {
  "@apiVersion": string;
};

export type PipelineTopologySetRequestPayload = PipelineTopology & { "@apiVersion": string;};

export interface Request<T> {
  methodName: string;
  payload: T & {"@apiVersion": string;};
}

interface NamePayload {
  name: string;
}

const apiVersion = MethodRequestInternal.type.modelProperties!.apiVersion.defaultValue;

function addApiVersion<T extends object>(payload?: PipelineTopology | LivePipeline | string): Payload {
  return {
    ...(typeof payload === "string" ? { name: payload } : payload ?? {}),
    "@apiVersion": apiVersion
  };
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

export function createRequest(request: "pipelineTopologySet", payload: PipelineTopology): Request <PipelineTopology>;
export function createRequest(request: "pipelineTopologyGet", payload: string): Request <NamePayload>;
export function createRequest(request: "pipelineTopologyList"): Request<{}>;
export function createRequest(request: "pipelineTopologyDelete", payload: string): Request<NamePayload>;
export function createRequest(request: "livePipelineSet", payload: LivePipeline): Request<LivePipeline>;
export function createRequest(request: "livePipelineGet", payload: string): Request<NamePayload>;
export function createRequest(request: "livePipelineList"): Request<{}>;
export function createRequest(request: "livePipelineDelete", payload: string): Request<NamePayload>;
export function createRequest(request: "livePipelineActivate", payload: string): Request<NamePayload>;
export function createRequest(request: "livePipelineDeactivate", payload: string): Request<NamePayload>;
export function createRequest(request: RequestType, payload?: any): Request<Payload> {
  return {
    methodName: request,
    payload: addApiVersion(payload)
  };
}

const pipelineTopologySetRequest = createRequest("pipelineTopologySet", {} as PipelineTopology);
pipelineTopologySetRequest.payload

const listRequest = createRequest("pipelineTopologyList");
listRequest.payload

const getRequest = createRequest("pipelineTopologyGet", "")
getRequest.payload