// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StatusQueue } from "./statusQ";
import KustoIngestClient from "./ingestClient";
import { ResourceURI } from "./resourceManager";

export class StatusMessage {
  OperationId?: string;
  Database?: string;
  Table?: string;
  IngestionSourceId?: string;
  IngestionSourcePath?: string;
  RootActivityId?: string;

  [other: string]: any;
  constructor(raw: any, obj: any, extraProps: string[] | null) {
    let props: string[] = [
      "OperationId",
      "Database",
      "Table",
      "IngestionSourceId",
      "IngestionSourcePath",
      "RootActivityId",
    ];

    if (extraProps && extraProps.length > 0) {
      props = props.concat(extraProps);
    }

    const _obj: Record<string, any> = obj || JSON.parse(raw || JSON.stringify(raw));

    for (const prop of props) {
      this[prop] = _obj[prop];
    }
  }
}

class SuccessMessage extends StatusMessage {
  SucceededOn?: string;

  constructor(raw: any, obj: any) {
    super(raw, obj, ["SucceededOn"]);
  }
}

class FailureMessage extends StatusMessage {
  FailedOn?: string;
  Details?: string;
  ErrorCode?: string;
  FailureStatus?: string;
  OriginatesFromUpdatePolicy?: string;
  ShouldRetry?: string;
  constructor(raw: any, obj: any) {
    super(raw, obj, [
      "FailedOn",
      "Details",
      "ErrorCode",
      "FailureStatus",
      "OriginatesFromUpdatePolicy",
      "ShouldRetry",
    ]);
  }
}

export class KustoIngestStatusQueues {
  success: StatusQueue;
  failure: StatusQueue;
  constructor(kustoIngestClient: KustoIngestClient) {
    this.success = new StatusQueue(
      () =>
        kustoIngestClient.resourceManager
          .getSuccessfulIngestionsQueues()
          .then((r) => r as ResourceURI[]),
      SuccessMessage
    );
    this.failure = new StatusQueue(
      () =>
        kustoIngestClient.resourceManager
          .getFailedIngestionsQueues()
          .then((r) => r as ResourceURI[]),
      FailureMessage
    );
  }
}

export default KustoIngestStatusQueues;
