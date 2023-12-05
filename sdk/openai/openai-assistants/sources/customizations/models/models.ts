// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AssistantImageFile,
  AssistantMessageText
} from "../../generated/src/models/models.js";

/** An abstract representation of a single item of thread message content. */
export interface AssistantMessageContent {
  /** the discriminator possible values image_file, text */
  type: string;
  image_file?: AssistantImageFile;
  text?: AssistantMessageText;
  file_ids?: string[];
  metadata?: Record<string, string>;
}

/** An abstract representation of an annotation to text thread message content. */
export interface AssistantMessageTextAnnotation {
  /** the discriminator possible values file_citation, file_path */
  type: string;
  /** The textual content associated with this text annotation item. */
  text: string;
  /** The first text index associated with this text annotation. */
  start_index: number;
  /** The last text index associated with this text annotation. */
  end_index: number;
}
