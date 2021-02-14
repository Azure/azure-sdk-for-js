// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { OperationStatus } from "../../generated/models";

import { RecognizeFormResultResponse } from "../../internalModels";
import { RecognizedFormArray } from "../../models";
import { toRecognizedFormArray } from "../../transforms";

/**
 * Options for Form Recognition shared between prebuilt and custom models.
 */
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
  getResult(operationId: string, modelId?: string): Promise<RecognizeFormResultResponse>;
}

/**
 * The status of a form recognition operation
 */
export interface RecognizeFormsOperationState extends PollOperationState<RecognizedFormArray> {
  /**
   * Identifier for the recognition operation.
   */
  modelId?: string;
  /**
   * Expected document type from recognition.
   */
  expectedDocType?: string;
  /**
   * Identifier for the recognition operation
   */
  resultId?: string;
  /**
   * Last-known status of the recognition operation
   */
  status: OperationStatus;
}

/**
 * Create a form recognition poll operation.
 *
 * This operation handles the creation, polling, and transformation of results.
 *
 * @internal
 */
function makeFormRecognitionOperation(
  description: FormPollerOperationDescription,
  initialState: RecognizeFormsOperationState
): PollOperation<typeof initialState, RecognizedFormArray> {
  const self: PollOperation<typeof initialState, RecognizedFormArray> = {
    state: { ...initialState },
    async cancel() {
      throw new Error("The cancel operation is not supported on this poller.");
    },
    async update(options) {
      const { isStarted, isCompleted, modelId, expectedDocType } = self.state;

      if (!isStarted || !self.state.resultId) {
        self.state.resultId = await description.createOperation();
        self.state.isStarted = true;
      }

      const response = await description.getResult(self.state.resultId, modelId);
      self.state.status = response.status;

      if (!isCompleted) {
        // eslint-disable-next-line no-unused-expressions
        options?.fireProgress?.({ ...self.state });

        if (response.status === "succeeded") {
          self.state.result = toRecognizedFormArray(
            response,
            expectedDocType?.startsWith("prebuilt:") ? expectedDocType : undefined
          );
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

/**
 * Set of intrinsic properties that describe a form recognition polling operation.
 */
export type FormPollerOperationDescription = FormPollerOperationOptions &
  FormRecognitionOperationClient & {
    /**
     * The expected document type that should be used to validate recognition
     * results.
     */
    expectedDocType?: string;
    /**
     * The model ID that should be used for this poller, if one is required.
     */
    modelId?: string;
  };

const DEFAULT_POLLING_INTERVAL = 5000;

/**
 * A poller for Form Recognition that works for all analysis endpoints
 * that return the basic, weakly-typed `RecognizedFormArray` type.
 */
export class FormRecognitionPoller extends Poller<
  RecognizeFormsOperationState,
  RecognizedFormArray
> {
  private options: FormPollerOperationOptions;

  constructor(description: FormPollerOperationDescription) {
    const state: RecognizeFormsOperationState = description.resumeFrom
      ? JSON.parse(description.resumeFrom).state
      : {
          modelId: description.modelId,
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
