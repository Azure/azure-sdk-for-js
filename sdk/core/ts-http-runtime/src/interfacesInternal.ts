// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelineRequestOptions as PipelineRequestOptionsWeb,
  FormDataValue as FormDataValueWeb,
  PipelineResponse as PipelineResponseWeb,
  RequestBodyType as RequestBodyTypeWeb,
} from "./interfaces-browser.mjs";
import type {
  PipelineRequestOptions as PipelineRequestOptionsRN,
  FormDataValue as FormDataValueRN,
  PipelineResponse as PipelineResponseRN,
  RequestBodyType as RequestBodyTypeRN,
} from "./interfaces-react-native.mjs";
import type {
  PipelineRequestOptions as PipelineRequestOptionsNode,
  FormDataValue as FormDataValueNode,
  PipelineResponse as PipelineResponseNode,
  RequestBodyType as RequestBodyTypeNode,
} from "./interfaces.js";

export type PipelineRequestOptionsInternal = PipelineRequestOptionsWeb &
  PipelineRequestOptionsRN &
  PipelineRequestOptionsNode;
export type FormDataValueInternal = FormDataValueWeb & FormDataValueRN & FormDataValueNode;
export type PipelineResponseInternal = PipelineResponseWeb &
  PipelineResponseRN &
  PipelineResponseNode;
export type RequestBodyTypeInternal = RequestBodyTypeWeb | RequestBodyTypeRN | RequestBodyTypeNode;
