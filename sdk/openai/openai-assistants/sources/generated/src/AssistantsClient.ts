// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getAssistantsOperations,
  AssistantsOperations,
} from "./classic/assistants/index.js";
import {
  getAssistantThreadsOperations,
  AssistantThreadsOperations,
} from "./classic/assistantThreads/index.js";
import {
  getThreadMessagesOperations,
  ThreadMessagesOperations,
} from "./classic/threadMessages/index.js";
import {
  getThreadRunsOperations,
  ThreadRunsOperations,
} from "./classic/threadRuns/index.js";
import {
  getRunStepsOperations,
  RunStepsOperations,
} from "./classic/runSteps/index.js";
import { getFilesOperations, FilesOperations } from "./classic/files/index.js";
import {
  createAssistants,
  AssistantsClientOptions,
  AssistantsContext,
} from "./api/index.js";

export { AssistantsClientOptions } from "./api/AssistantsContext.js";

export class AssistantsClient {
  private _client: AssistantsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure OpenAI APIs for Assistants. */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: AssistantsClientOptions = {}
  ) {
    this._client = createAssistants(endpoint, credential, options);
    this.pipeline = this._client.pipeline;
    this.assistants = getAssistantsOperations(this._client);
    this.assistantThreads = getAssistantThreadsOperations(this._client);
    this.threadMessages = getThreadMessagesOperations(this._client);
    this.threadRuns = getThreadRunsOperations(this._client);
    this.runSteps = getRunStepsOperations(this._client);
    this.files = getFilesOperations(this._client);
  }

  /** The operation groups for Assistants */
  public readonly assistants: AssistantsOperations;
  /** The operation groups for AssistantThreads */
  public readonly assistantThreads: AssistantThreadsOperations;
  /** The operation groups for ThreadMessages */
  public readonly threadMessages: ThreadMessagesOperations;
  /** The operation groups for ThreadRuns */
  public readonly threadRuns: ThreadRunsOperations;
  /** The operation groups for RunSteps */
  public readonly runSteps: RunStepsOperations;
  /** The operation groups for Files */
  public readonly files: FilesOperations;
}
