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
  getAssistantMessagesOperations,
  AssistantMessagesOperations,
} from "./classic/assistantMessages/index.js";
import {
  getAssistantRunsOperations,
  AssistantRunsOperations,
} from "./classic/assistantRuns/index.js";
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
    this.assistantMessages = getAssistantMessagesOperations(this._client);
    this.assistantRuns = getAssistantRunsOperations(this._client);
    this.runSteps = getRunStepsOperations(this._client);
    this.files = getFilesOperations(this._client);
  }

  /** The operation groups for Assistants */
  public readonly assistants: AssistantsOperations;
  /** The operation groups for AssistantThreads */
  public readonly assistantThreads: AssistantThreadsOperations;
  /** The operation groups for AssistantMessages */
  public readonly assistantMessages: AssistantMessagesOperations;
  /** The operation groups for AssistantRuns */
  public readonly assistantRuns: AssistantRunsOperations;
  /** The operation groups for RunSteps */
  public readonly runSteps: RunStepsOperations;
  /** The operation groups for Files */
  public readonly files: FilesOperations;
}
