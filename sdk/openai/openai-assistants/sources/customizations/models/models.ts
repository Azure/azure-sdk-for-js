// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AssistantImageFile,
  AssistantMessageText,
  AssistantRole,
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

/** The details used to create a new assistant thread. */
export interface AssistantThreadCreationOptions {
  /** The messages to associate with the new thread. */
  messages?: {
    /** The role associated with the assistant thread message. */
    role: AssistantRole;
    /** The list of content items associated with the assistant thread message. */
    content: string;
  }[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** The response data for a requested list of items. */
export interface ListResponseOf<T> {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: T[];
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}