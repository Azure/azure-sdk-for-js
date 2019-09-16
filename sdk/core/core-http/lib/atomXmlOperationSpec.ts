import { AtomResourceSerializer } from "./util/atomXmlHelper";

export interface AtomXmlOperationSpec {
  /**
   * The serializer to use in this operation.
   */
  serializer: AtomResourceSerializer;

  /**
   * Indicates whether the response needs to be parsed.
   * Applicable for GET / LIST operations.
   */
  shouldParseResponse: boolean;
}
