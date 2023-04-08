import { PropertySignature } from "ts-morph";
import { Declaration } from "../common";

export type Annotation = "Remove";
export function getAnnotation(declaration: Declaration | PropertySignature): Annotation | undefined {
  // Check if the property has a `// @azsdk-remove` comment
  const leadingCommentRanges = declaration.getLeadingCommentRanges();
  if (leadingCommentRanges) {
    for (const commentRange of leadingCommentRanges) {

      const commentText = commentRange.getText();

      const regex = /@azsdk-(\w+)/;
      const match = commentText.match(regex);
      const annotation = match ? match[0] : null;

      if (annotation === "@azsdk-remove") {
        return "Remove";
      }

      return undefined;
    }
  }
}
