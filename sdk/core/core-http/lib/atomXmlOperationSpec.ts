import { AtomXmlSerializer } from "./atomXmlSerializer";

export interface AtomXmlOperationSpec {
  /**
   * The serializer to use in this operation.
   */
  serializer: AtomXmlSerializer;
}
