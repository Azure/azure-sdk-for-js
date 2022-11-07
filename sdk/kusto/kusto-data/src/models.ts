// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import moment from "moment";

export enum WellKnownDataSet {
  PrimaryResult = "PrimaryResult",
  QueryCompletionInformation = "QueryCompletionInformation",
  TableOfContents = "TableOfContents",
  QueryProperties = "QueryProperties",
}

type DateTimeParser = (value: string) => any;
type TimeSpanParser = (value: number) => any;

const defaultDatetimeParser: DateTimeParser = (t: string) => moment(t);
const defaultTimespanParser: TimeSpanParser = (t: number) => moment.duration(t);

export interface Table {
  TableKind?: string;
  TableName: string;
  TableId?: number;
  Columns: Column[];
  Rows: any[][];
}

interface Column {
  ColumnName: string;
  ColumnType?: string;
  DateType?: string;
}

export class KustoResultRow {
  columns: KustoResultColumn[];
  raw: { [ord: number]: any };

  [column: string]: any;

  constructor(
    columns: KustoResultColumn[],
    row: { [ord: number]: any },
    dateTimeParser: DateTimeParser = defaultDatetimeParser,
    timeSpanParser: TimeSpanParser = defaultTimespanParser
  ) {
    this.columns = columns.sort((a, b) => a.ordinal - b.ordinal);
    this.raw = row;

    for (const col of this.columns) {
      if (col.name == null) {
        continue;
      }
      let value = row[col.ordinal];

      if (col.type != null) {
        switch (col.type.toLowerCase()) {
          case "datetime":
            value = dateTimeParser(value);
            break;
          case "timespan":
            value = timeSpanParser(value);
            break;
        }
        this[col.name] = row[col.ordinal];
      }

      this[col.name] = value;
    }
  }

  *values() {
    for (let i = 0; i < this.columns.length; i++) {
      yield this.raw[i];
    }
  }

  getValueAt(index: number) {
    return this[this.columns[index].name as string];
  }

  /**
   * @deprecated use the compliant toJSON() instead
   */
  toJson() {
    return this.toJSON();
  }

  toJSON<T = Record<string, any>>(): T {
    const obj: Record<string, any> = {};

    for (const col of this.columns) {
      obj[col.name as string] = this[col.name as string];
    }

    return obj as T;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

export class KustoResultColumn {
  name: string | null;
  type: string | null;
  ordinal: number;

  constructor(
    columnObj: { ColumnName?: string; ColumnType?: string; DateType?: string },
    ordinal: number
  ) {
    this.name = columnObj.ColumnName ?? null;
    // TODO: should validate type? should coarse value to type?
    this.type = (columnObj.ColumnType || columnObj.DateType) ?? null;
    this.ordinal = ordinal;
  }
}

export class KustoResultTable {
  name: string;
  id?: number;
  kind?: string;
  columns: KustoResultColumn[];
  readonly _rows: any[];
  private _dateTimeParser: DateTimeParser = defaultDatetimeParser;
  private _timeSpanParser: TimeSpanParser = defaultTimespanParser;

  [row: number]: any;

  constructor(tableObj: Table) {
    this.name = tableObj.TableName;
    if (tableObj.TableId !== undefined) {
      this.id = tableObj.TableId;
    }

    if (tableObj.TableKind) {
      this.kind = tableObj.TableKind;
    }

    this.columns = tableObj.Columns.map((item, index) => new KustoResultColumn(item, index));
    this._rows = tableObj.Rows;

    if (this._rows && this._rows.length > 0) {
      for (let i = 0; i < tableObj.Rows.length; i++) {
        Object.defineProperty(this, i, {
          get: () => new KustoResultRow(this.columns, this._rows[i]),
        });
      }
    }
  }

  get timeSpanParser(): TimeSpanParser {
    return this._timeSpanParser;
  }

  set timeSpanParser(value: TimeSpanParser) {
    this._timeSpanParser = value;
  }
  get dateTimeParser(): DateTimeParser {
    return this._dateTimeParser;
  }

  set dateTimeParser(value: DateTimeParser) {
    this._dateTimeParser = value;
  }

  *rows() {
    for (const row of this._rows) {
      yield new KustoResultRow(this.columns, row, this._dateTimeParser, this._timeSpanParser);
    }
  }

  /**
   * @deprecated use the compliant toJSON() instead
   */
  toJson() {
    return this.toJSON();
  }

  toJSON<T = Record<string, any>>(): {
    name: string;
    data: T[];
  } {
    const table: {
      name: string;
      data: T[];
    } = {
      name: this.name,
      data: [],
    };
    for (const row of this.rows()) {
      table.data.push(row.toJSON<T>());
    }

    return table;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}
