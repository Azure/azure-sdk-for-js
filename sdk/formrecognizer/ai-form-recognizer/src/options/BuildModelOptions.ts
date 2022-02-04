// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { TrainingPollOperationState } from "../lro/training";
import { PollerOptions } from "./PollerOptions";

/**
 * Supported model build modes. The model build mode selects the engine that the service uses to train the model based
 * on the labeled training data.
 *
 * The options are:
 * - "neural", which yields the highest quality of model that is capable of extracting data from classes of documents
 *   that have the same structure of data, but different layouts (for example, W2 tax forms, which may vary from company
 *   to company, but always contain the same information).
 * - "template", which requires all documents to have the same fixed layout (template).
 *
 * Please see the following link for more information: https://aka.ms/azsdk/formrecognizer/buildmode
 */
export type DocumentModelBuildMode =
  typeof DocumentModelBuildMode[keyof typeof DocumentModelBuildMode];

/**
 * Supported values of `DocumentModelBuildMode`.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DocumentModelBuildMode = {
  /**
   * A mode that builds a model assuming that documents all follow the same, fixed template layout (the same relative
   * positioning of fields between documents).
   */
  Template: "template",
  /**
   * A mode that uses a neural engine to extract fields, allowing for documents that have different visual appearances,
   * but that contain the same information.
   */
  Neural: "neural",
} as const;

/**
 * Options common to all operations that define new models, such as `beginBuildModel`, `beginComposeModel`, and
 * `getCopyAuthorization`.
 */
export interface CommonModelCreationOptions {
  /**
   * A textual description of the model (can be any text).
   */
  description?: string;

  /**
   * Additional, user-specified key-value pairs to associate with the model as persistent metadata.
   */
  tags?: Record<string, string>;
}

/**
 * Options for the model build operation.
 */
export interface BuildModelOptions
  extends OperationOptions,
    CommonModelCreationOptions,
    PollerOptions<TrainingPollOperationState> {}
