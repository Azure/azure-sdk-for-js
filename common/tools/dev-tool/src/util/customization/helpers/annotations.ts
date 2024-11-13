// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { CallSignatureDeclaration, PropertySignature } from "ts-morph";
import { Declaration } from "../common";

export type AnnotationType = "remove" | "rename";
export interface Annotation {
  type: AnnotationType;
  param?: string;
}

export function getAnnotation(
  declaration: Declaration | PropertySignature | CallSignatureDeclaration,
): Annotation | undefined {
  // Check if the property has a `// @azsdk-remove` comment
  const leadingCommentRanges = declaration.getLeadingCommentRanges();
  for (const commentRange of leadingCommentRanges) {
    const commentText = commentRange.getText();

    const regex = /@azsdk-(\w+)(?:\((\w+)\))?/;
    const match = commentText.match(regex);

    if (match) {
      return {
        type: match[1] as AnnotationType,
        param: match[2],
      };
    }
  }
  return undefined;
}
