import { ResourceSerializer } from "./resourceSerializer";

export interface AtomXmlOperationSpec {
  /**
   * The serializer to use in this operation.
   */
  serializer: ResourceSerializer;

  /**
   * Indicates whether the response needs to be parsed.
   * Applicable for GET / LIST operations.
   */
  shouldParseResponse: boolean;
}
