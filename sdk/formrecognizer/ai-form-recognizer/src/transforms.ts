// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DataTable as DataTableModel,
  KeyValueElement as KeyValueElementModel,
  KeyValuePair as KeyValuePairModel,
  PageResult as PageResultModel,
  ReadResult as ReadResultModel,
  TextLine as TextLineModel,
} from "./generated/models/index";

import {
  ReadResult,
  TextLine,
  ExtractedElement,
  DataTableRow,
  DataTable,
  KeyValueElement,
  KeyValuePair,
  PageResult
} from "./models";

function toTextLine(original: TextLineModel, pageNumber: number): TextLine {
  const line = {
    pageNumber: pageNumber,
    text: original.text,
    boundingBox: original.boundingBox,
    words: original.words.map(w => {
      return {
        text: w.text,
        boundingBox: w.boundingBox,
        confidence: w.confidence,
        pageNumber: pageNumber
      };
    })
  };
  return {
    ...line,
    words: line.words.map(w => { return {...w, containingLine: line }})
  };
}
export function toReadResult(original: ReadResultModel): ReadResult {
  return {
    pageNumber: original.pageNumber,
    angle: original.angle,
    width: original.width,
    height: original.height,
    unit: original.unit,
    lines: original.lines?.map(toTextLine)
  };
}

const elementPattern = /#\/readResults\/(\d+)\/lines\/(\d+)\/words\/(\d+)/;

function toExtractedElement(element: string, readResults: ReadResult[]) : ExtractedElement {
  const result = elementPattern.exec(element);
  if (!result || result.length < 3) {
    throw new Error(`Unexpected element reference encountered: ${element}`)
  }

  const readIndex = Number.parseInt(result[1]);
  const lineIndex = Number.parseInt(result[2]);
  if (result.length === 4) {
    const wordIndex = Number.parseInt(result[3]);
    return readResults[readIndex].lines![lineIndex].words[wordIndex];
  } else {
    return readResults[readIndex].lines![lineIndex];
  }
}

function toKeyValueElement(original: KeyValueElementModel, readResults?: ReadResult[]): KeyValueElement {
  return {
    text: original.text,
    boundingBox: original.boundingBox,
    elements: readResults ? original.elements?.map(element => toExtractedElement(element, readResults!)) : undefined
  }
}

function toKeyValuePair(original: KeyValuePairModel, readResults?: ReadResult[]): KeyValuePair {
  return {
    label: original.label,
    confidence: original.confidence,
    key: toKeyValueElement(original.key, readResults),
    value: toKeyValueElement(original.value, readResults)
  }
}

function toTable(original: DataTableModel, readResults?: ReadResult[]): DataTable {
  let rows: DataTableRow[] = [];
  for (let i = 0; i < original.rows; i++) {
    rows.push({ cells: []});
  }
  for (const cell of original.cells) {
    rows[cell.rowIndex].cells.push({
      boundingBox: cell.boundingBox,
      columnIndex: cell.columnIndex,
      columnSpan: cell.columnSpan || 1,
      confidence: cell.confidence,
      elements: readResults ? cell.elements?.map(element => toExtractedElement(element, readResults!)) : undefined,
      isFooter: cell.isFooter || false,
      isHeader: cell.isHeader || false,
      rowIndex: cell.rowIndex,
      rowSpan: cell.rowSpan || 1,
      text: cell.text
    })
  }
  return {
    rowCount: original.rows,
    columnCount: original.columns,
    rows: rows
  }
}

function toPageResult(original: PageResultModel, readResults?: ReadResult[]): PageResult {
  return {
    pageNumber: original.pageNumber,
    clusterId: original.clusterId,
    keyValuePairs: original.keyValuePairs?.map(pair => toKeyValuePair(pair, readResults)),
    tables: original.tables?.map(table => toTable(table, readResults))
  }
}

export function transformResults(readResults?: ReadResultModel[], pageResults?: PageResultModel[])
  : { readResults: ReadResult[], pageResults: PageResult[] } {
  const transformedReadResults = readResults?.map(toReadResult);
  return {
    readResults: transformedReadResults || [],
    pageResults: pageResults?.map(page => toPageResult(page, transformedReadResults)) || []
  }
}
