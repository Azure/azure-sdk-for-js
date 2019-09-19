import { AtomXmlSerializer } from "./util/atomXmlHelper";

export interface AtomXmlOperationSpec {
  /**
   * The serializer to use in this operation.
   */
  serializer: AtomXmlSerializer;
}
