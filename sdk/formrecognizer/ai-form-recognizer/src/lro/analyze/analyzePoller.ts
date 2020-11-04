// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { OperationStatus } from "../../generated/models";

import { RecognizeFormResultResponse } from "../../internalModels";
import { RecognizedFormArray } from "../../models";
import { toRecognizeFormResultResponse } from "../../transforms";

export interface FormPollerOperationOptions {
  /**
   * Time between each polling in milliseconds.
   */
  updateIntervalInMs?: number;

  /**
   * Callback that will receive events related to the progress of the
   * form recognition operation.
   */
  onProgress?: (state: RecognizeFormsOperationState) => void;

  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Encapsulates the steps to start and query the status of
 * a form recognition operation
 */
export interface FormRecognitionOperationClient {
  /**
   * Creates the analysis operation on the service
   */
  createOperation(): Promise<string>;
  /**
   * Returns the results of the operation
   */
  getResult(operationId: string): Promise<RecognizeFormResultResponse>;
}

/**
 * The status of a form recognition operation
 */
export interface RecognizeFormsOperationState extends PollOperationState<RecognizedFormArray> {
  /**
   * Identifier for the recognition operation
   */
  resultId?: string;
  /**
   * Last-known status of the recognition operation
   */
  status: OperationStatus;
}

function makeFormRecognitionOperation(
  description: FormPollerOperationDescription,
  initialState: RecognizeFormsOperationState
): PollOperation<typeof initialState, RecognizedFormArray> {
  let self: PollOperation<typeof initialState, RecognizedFormArray>;
  self = {
    state: { ...initialState },
    async cancel() {
      throw new Error("The cancel operation is not supported on this poller.");
    },
    async update(options) {
      const { isStarted, isCompleted } = self.state;

      if (!isStarted) {
        self.state.resultId = await description.createOperation();
        self.state.isStarted = true;
      }

      const response = await description.getResult(self.state.resultId!);
      self.state.status = response.status;

      if (!isCompleted) {
        options?.fireProgress?.({ ...self.state });

        if (response.status === "succeeded") {
          self.state.result = toRecognizeFormResultResponse(response).forms;
          self.state.isCompleted = true;
        } else if (response.status === "failed") {
          throw new Error(
            [
              `Failed to recognize forms using the model "${description.modelId}"`,
              "Error(s):",
              ...(response.errors?.map((e) => `  Code ${e.code}, message: '${e.message}'`) ?? [
                "  <empty>"
              ])
            ].join("\n")
          );
        }
      }
      return self;
    },
    // Maintaining the depth of "state" in the serialized poller is
    // important for maintaining compatibility with previous versions
    toString: () => JSON.stringify({ state: self.state })
  };

  return self;
}

export type FormPollerOperationDescription = FormPollerOperationOptions &
  FormRecognitionOperationClient & {
    // Knowing the model that is used for recognition is useful when
    // producing error messages
    modelId: string;
  };

const DEFAULT_POLLING_INTERVAL = 5000;

export class FormRecognitionPoller extends Poller<
  RecognizeFormsOperationState,
  RecognizedFormArray
> {
  private options: FormPollerOperationOptions;

  constructor(description: FormPollerOperationDescription) {
    const state: RecognizeFormsOperationState = description.resumeFrom
      ? JSON.parse(description.resumeFrom).state
      : {
          status: "notStarted"
        };

    super(makeFormRecognitionOperation(description, state));

    if (typeof description.onProgress === "function") {
      this.onProgress(description.onProgress);
    }

    this.options = description;
  }

  /**
   * Delay the poller
   */
  public delay(): Promise<void> {
    return delay(this.options.updateIntervalInMs ?? DEFAULT_POLLING_INTERVAL);
  }
}
