// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { IngestionProperties, IngestionPropertiesInput } from "./ingestionProperties";
import { FileDescriptor, StreamDescriptor } from "./descriptors";
import { Readable } from "stream";

export abstract class AbstractKustoClient {
  public defaultProps: IngestionProperties;
  public defaultDatabase?: string;

  protected constructor(defaultProps: IngestionPropertiesInput) {
    if (!defaultProps) {
      this.defaultProps = new IngestionProperties({});
    } else if (!(defaultProps instanceof IngestionProperties)) {
      this.defaultProps = new IngestionProperties(defaultProps);
    } else {
      this.defaultProps = new IngestionProperties(defaultProps);
    }
  }

  _getMergedProps(newProperties?: IngestionPropertiesInput): IngestionProperties {
    const props = this.defaultProps.merge(newProperties);
    props.setDefaults();
    if (!props.database) {
      props.database = this.defaultDatabase;
    }
    props.validate();
    return props;
  }

  abstract ingestFromStream(
    stream: StreamDescriptor | Readable,
    ingestionProperties: IngestionPropertiesInput
  ): Promise<any>;

  abstract ingestFromFile(
    file: FileDescriptor | string,
    ingestionProperties: IngestionPropertiesInput
  ): Promise<any>;
}
