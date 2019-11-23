// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CanonicalCode } from "@opentelemetry/types";

import { DataLakeFileClient } from "./DataLakeFileClient";
import { DataLakePathClient } from "./DataLakePathClient";
import {
  DirectoryCreateOptions,
  DirectoryCreateResponse,
  PathCreateOptions,
  PathCreateResponse,
  PathResourceType,
} from "./models";
import { createSpan } from "./utils/tracing";
import { appendToURLPath } from "./utils/utils.common";

export class DataLakeDirectoryClient extends DataLakePathClient {
  // https://stackoverflow.com/questions/50729485/override-method-with-different-argument-types-in-extended-class-typescript
  public async create(
    resourceType: PathResourceType,
    options?: PathCreateOptions
  ): Promise<PathCreateResponse>;
  public async create(options?: DirectoryCreateOptions): Promise<DirectoryCreateResponse>;
  public async create(
    resourceTypeOrOptions?: PathResourceType | PathCreateOptions,
    options: PathCreateOptions = {}
  ): Promise<PathCreateResponse> {
    if (resourceTypeOrOptions === PathResourceType.Directory) {
      return super.create(resourceTypeOrOptions as PathResourceType, options);
    }

    if (resourceTypeOrOptions === PathResourceType.File) {
      throw TypeError(
        `DataLakeDirectoryClient:create() resourceType cannot be ${PathResourceType.File}. Refer to DataLakeFileClient for file creation.`
      );
    }

    options = resourceTypeOrOptions || {};
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "DataLakeDirectoryClient-create",
      options.tracingOptions
    );
    try {
      return await super.create(PathResourceType.Directory, {
        ...options,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public getSubdirectoryClient(subdirectoryName: string): DataLakeDirectoryClient {
    return new DataLakeDirectoryClient(
      appendToURLPath(this.url, encodeURIComponent(subdirectoryName)),
      this.pipeline
    );
  }

  public getFileClient(fileName: string): DataLakeFileClient {
    return new DataLakeFileClient(
      appendToURLPath(this.url, encodeURIComponent(fileName)),
      this.pipeline
    );
  }
}
