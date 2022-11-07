// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoResultTable, Table, WellKnownDataSet } from "./models";

interface V2DataSetHeaderFrame {
  FrameType: "DataSetHeader";
  IsProgressive: boolean;
  Version: string;
}

interface V2DataSetTableFrame extends Table {
  FrameType: "DataTable";
  TableId: number;
  TableName: string;
  TableKind: string;
  Columns: Column[];
  Rows: any[][];
}

interface V2DataSetCompletionFrame {
  FrameType: "DataSetCompletion";
  HasErrors: boolean;
  Cancelled: boolean;
}

export type V2Frames = (V2DataSetHeaderFrame | V2DataSetTableFrame | V2DataSetCompletionFrame)[];

export type V1 = { Tables: Table[] };

interface Column {
  ColumnName: string;
  ColumnType: string;
}

enum ErrorLevels {
  Warning = 3,
  Error = 2,
}

export abstract class KustoResponseDataSet {
  tables: KustoResultTable[];
  tableNames: string[];
  primaryResults: KustoResultTable[];
  statusTable?: KustoResultTable;
  abstract dataSetCompletion: {
    HasErrors: boolean;
    OneApiErrors?: any[];
  } | null;

  abstract getStatusColumn(): string;

  abstract getErrorColumn(): string;

  abstract getCridColumn(): string;

  protected constructor(tables: Table[]) {
    let _tables = tables;

    if (!Array.isArray(tables)) {
      _tables = [tables];
    }

    this.tables = [];
    this.tableNames = [];
    this.primaryResults = [];
    for (const table of _tables) {
      const resultTable = new KustoResultTable(table);
      this.tables.push(resultTable);
      this.tableNames.push(resultTable.name);

      if (resultTable.kind === WellKnownDataSet.PrimaryResult) {
        this.primaryResults.push(resultTable);
      } else if (resultTable.kind === WellKnownDataSet.QueryCompletionInformation) {
        this.statusTable = resultTable;
      }
    }
  }

  getErrorsCount(): { warnings: number; errors: number } {
    let errors = 0;
    let warnings = 0;

    if (this.statusTable && this.statusTable._rows.length !== 0) {
      let minLevel = ErrorLevels.Error;
      const errorColumn = this.getErrorColumn();
      for (const row of this.statusTable.rows()) {
        if (row[errorColumn] <= minLevel) {
          if (row[errorColumn] < minLevel) {
            minLevel = row[errorColumn];
            errors = 1;
          } else if (row[errorColumn] === minLevel) {
            errors += 1;
          }
        } else if (row[errorColumn] === warnings) {
          warnings += 1;
        }
      }
    }
    if (this.dataSetCompletion && this.dataSetCompletion.HasErrors) {
      errors += 1;
    }

    return { warnings, errors };
  }

  private getErrorsByLevel(errorLevel: ErrorLevels) {
    const result = [];
    if (this.statusTable && this.statusTable._rows.length !== 0) {
      const errorColumn = this.getErrorColumn();
      const cridColumn = this.getCridColumn();
      const statusColumn = this.getStatusColumn();
      for (const row of this.statusTable.rows()) {
        if (row[errorColumn] <= errorLevel) {
          result.push(
            `Please provide the following data to Kusto: CRID=${row[cridColumn]} Description: ${row[statusColumn]}`
          );
        }
      }
    }
    return result;
  }

  getExceptions(): string[] {
    const result = this.getErrorsByLevel(ErrorLevels.Error);
    if (
      this.dataSetCompletion &&
      this.dataSetCompletion.HasErrors &&
      this.dataSetCompletion.OneApiErrors
    ) {
      for (const row of this.dataSetCompletion.OneApiErrors) {
        result.push((row as { error: { "@message": string } }).error["@message"]);
      }
    }
    return result;
  }

  getWarnings(): string[] {
    return this.getErrorsByLevel(ErrorLevels.Warning);
  }
}

// TODO: should only expose 1 response type, versioning should be handled internally
export class KustoResponseDataSetV1 extends KustoResponseDataSet {
  version: string;
  dataSetCompletion: null = null;

  getStatusColumn() {
    return "StatusDescription";
  }

  getCridColumn() {
    return "ClientActivityId";
  }

  getErrorColumn() {
    return "Severity";
  }

  static getTablesKinds(): { [name: string]: WellKnownDataSet } {
    return {
      QueryResult: WellKnownDataSet.PrimaryResult,
      QueryProperties: WellKnownDataSet.QueryProperties,
      QueryStatus: WellKnownDataSet.QueryCompletionInformation,
    };
  }

  constructor(data: V1) {
    super(data.Tables);

    if (this.tables.length <= 2) {
      if (this.tables[0].kind === undefined) {
        this.tables[0].kind = WellKnownDataSet.PrimaryResult;
        this.primaryResults.push(this.tables[0]);
      }

      this.tables[0].id = 0;

      if (this.tables.length === 2) {
        this.tables[1].kind = WellKnownDataSet.QueryProperties;
        this.tables[1].id = 1;
      }
    } else {
      const toc = this.tables[this.tables.length - 1];
      toc.kind = WellKnownDataSet.TableOfContents;
      toc.id = this.tables.length - 1;
      for (let i = 0; i < this.tables.length - 1; i++) {
        const current = toc[i] as {
          Name: string;
          Id: number;
          Kind: string;
        };
        this.tables[i].name = current.Name;
        this.tables[i].id = current.Id;
        this.tables[i].kind = KustoResponseDataSetV1.getTablesKinds()[current.Kind];
      }
    }

    this.version = "1.0";
  }
}

// TODO: should only expose 1 response type, versioning should be handled internally
export class KustoResponseDataSetV2 extends KustoResponseDataSet {
  dataSetHeader: V2DataSetHeaderFrame | null;
  dataSetCompletion: V2DataSetCompletionFrame | null;
  version: string;

  getStatusColumn() {
    return "Payload";
  }

  getErrorColumn() {
    return "Level";
  }

  getCridColumn() {
    return "ClientRequestId";
  }

  constructor(data: V2Frames) {
    const dataTables: V2DataSetTableFrame[] = [];
    let dataSetHeader: V2DataSetHeaderFrame | null = null;
    let dataSetCompletion: V2DataSetCompletionFrame | null = null;
    data.forEach((frame) => {
      switch (frame.FrameType) {
        case "DataTable":
          dataTables.push(frame);
          break;
        case "DataSetHeader":
          dataSetHeader = frame;
          break;
        case "DataSetCompletion":
          dataSetCompletion = frame;
          break;
      }
    });

    super(dataTables);
    this.dataSetHeader = dataSetHeader;
    this.dataSetCompletion = dataSetCompletion;
    this.version = "2.0";
  }
}
