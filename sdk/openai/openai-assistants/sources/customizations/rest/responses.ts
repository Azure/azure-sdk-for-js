import { ListResponseOfOutput } from "./outputModels.js";
import {
  AssistantOutput,
  MessageFileOutput,
  FileOutput,
  ThreadRunOutput,
  AssistantFileOutput,
  ThreadMessageOutput,
  RunStepOutput,
} from "../../generated/src/rest/outputModels.js";
import { HttpResponse } from "@azure-rest/core-client";

/** The request has succeeded. */
export interface ListAssistants200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<AssistantOutput>;
}

/** The requested list of files attached to the specified assistant. */
export interface ListAssistantFiles200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<AssistantFileOutput>;
}

/** The request has succeeded. */
export interface ListFiles200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<FileOutput>;
}

/** The request has succeeded. */
export interface ListMessages200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<ThreadMessageOutput>;
}

/** The request has succeeded. */
export interface ListMessageFiles200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<MessageFileOutput>;
}

/** The request has succeeded. */
export interface ListRuns200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<ThreadRunOutput>;
}

/** The request has succeeded. */
export interface ListRunSteps200Response extends HttpResponse {
  status: "200";
  body: ListResponseOfOutput<RunStepOutput>;
}
