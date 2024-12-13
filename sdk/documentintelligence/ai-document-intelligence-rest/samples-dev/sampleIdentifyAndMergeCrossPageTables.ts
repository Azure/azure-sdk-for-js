/**
 *
    FILE: sampleIdentifyAndMergeCrossPageTables.ts

    DESCRIPTION:

    This sample demonstrates how to use the output of Layout model and some business rules to identify cross-page tables and merge them into one table in the markdown output based on rules.
    Once identified, it can be further processed to merge these tables and keep the semantics of a table.

    Depending on your document format, there can be different rules applied to identify a cross-page table. This sample shows how to use the following rules to identify cross-page tables:

    - Vertical layout
        - If the 2 or more tables appear in consecutive pages
        - And there's only page header, page footer or page number between them
        - And the tables have the same number of columns
        - These tables could be considered to one vertical table.

    - Horizontal layout
        - If there're 2 or more tables appear in consecutive pages
        - And the table's right side is quite close to the right edge of current page
        - And the next table's left side is quite close to the left edge of next page
        - And the tables have the same number of row count
        - These tables could be considered to one horizontal table.

    You can customize the rules based on your scenario.

    PRE-REQUISITES:

    - An Azure AI Document Intelligence resource - follow https://learn.microsoft.com/azure/ai-services/document-intelligence/create-document-intelligence-resource?view=doc-intel-4.0.0 to create one if you don't have.
    - Get familiar with the output structure of Layout model - complete this quickstart: https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/quickstarts/get-started-sdks-rest-api?view=doc-intel-4.0.0&pivots=programming-language-javascript#layout-model to learn more.

    SETUP:
    npm install @azure-rest/ai-document-intelligence dotenv

    USAGE:

    ts-node sampleIdentifyCrossPageTables.ts [input_file_path]
 */
import DocumentIntelligence, { AnalyzeResultOperationOutput, AnalyzeResultOutput, DocumentParagraphOutput, getLongRunningPoller, isUnexpected } from "@azure-rest/ai-document-intelligence";
import * as dotenv from "dotenv";
import * as fs from "fs";
import path from "path";

dotenv.config();
const BORDER_SYMBOL = "|";


/**
 * Identifies and merges tables that span across multiple pages in a document.
 * 
 * @param inputFilePath - The path to the input file containing the document to be analyzed.
 * 
 * This function performs the following steps:
 * 1. Initializes the Document Intelligence client using the provided endpoint and API key.
 * 2. Reads the input file and encodes its content in base64 format.
 * 3. Sends a request to analyze the document using the "prebuilt-layout" model.
 * 4. Polls the long-running operation until the analysis is complete.
 * 5. Identifies candidate tables for merging based on their positions and content.
 * 6. Merges tables that are either horizontally or vertically aligned and updates the content accordingly.
 * 7. Logs the merged tables and their content.
 * 8. Constructs the optimized content by merging the identified tables and preserving the remaining content.
 * 
 * Note: The function assumes that the environment variables `DOCUMENT_INTELLIGENCE_ENDPOINT` and `DOCUMENT_INTELLIGENCE_API_KEY` are set.
 * 
 * @throws Will throw an error if the initial response from the document analysis is unexpected.
 */
async function identifyAndMergeCrossPageTables() {
    const client = DocumentIntelligence(
        process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
        { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" });

    const base64Source = fs.readFileSync(path.join(".", "assets", "receipt", "multipage_invoice1.png"), { encoding: "base64" });

    const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
            contentType: "application/json",
            body: {
                base64Source,
            },
            queryParameters: { locale: "en-IN" },
        });
    if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
    }
    const poller = await getLongRunningPoller(client, initialResponse);
    const result = (
        (await (poller).pollUntilDone()).body as AnalyzeResultOperationOutput
    ).analyzeResult!;


    const { mergeTablesCandidates, tableIntegralSpanList } = getMergeTableCandidatesAndTableIntegralSpan(result.tables);

    console.log("----------------------------------------");

    const SEPARATOR_LENGTH_IN_MARKDOWN_FORMAT = 2;
    const mergedTableList: {
        tableIdxList: number[];
        offset: { minOffset: number; maxOffset: number };
        content: string;
        remark: string;
    }[] = [];
    for (const mergedTable of mergeTablesCandidates) {
        const preTableIdx = mergedTable.preTableIdx;
        const start = mergedTable.start;
        const end = mergedTable.end;
        const hasParagraph = checkParagraphPresence(result.paragraphs, start, end);

        const isHorizontal = checkTablesAreHorizontalDistribution(result, preTableIdx);
        const isVertical =
            !hasParagraph &&
            result.tables![preTableIdx].columnCount === result.tables![preTableIdx + 1].columnCount &&
            tableIntegralSpanList[preTableIdx + 1].minOffset - tableIntegralSpanList[preTableIdx].maxOffset <= SEPARATOR_LENGTH_IN_MARKDOWN_FORMAT;

        if (isVertical || isHorizontal) {
            console.log(`Merge table: ${preTableIdx} and ${preTableIdx + 1}`);
            console.log("----------------------------------------");

            let remark = "";
            const curContent = result.content.slice(tableIntegralSpanList[preTableIdx + 1].minOffset, tableIntegralSpanList[preTableIdx + 1].maxOffset);

            if (isHorizontal) {
                remark = result.content.slice(tableIntegralSpanList[preTableIdx].maxOffset, tableIntegralSpanList[preTableIdx + 1].minOffset);
            }

            const mergedListLen = mergedTableList.length;
            if (mergedListLen > 0 && mergedTableList[mergedListLen - 1].tableIdxList.includes(preTableIdx)) {
                mergedTableList[mergedListLen - 1].tableIdxList.push(preTableIdx + 1);
                mergedTableList[mergedListLen - 1].offset.maxOffset = tableIntegralSpanList[preTableIdx + 1].maxOffset;
                if (isVertical) {
                    mergedTableList[mergedListLen - 1].content = mergeVerticalTables(mergedTableList[mergedListLen - 1].content, curContent);
                } else if (isHorizontal) {
                    mergedTableList[mergedListLen - 1].content = mergeHorizontalTables(mergedTableList[mergedListLen - 1].content, curContent);
                    mergedTableList[mergedListLen - 1].remark += remark;
                }
            } else {
                const preContent = result.content.slice(tableIntegralSpanList[preTableIdx].minOffset, tableIntegralSpanList[preTableIdx].maxOffset);
                const mergedTable: {
                    tableIdxList: number[];
                    offset: { minOffset: number; maxOffset: number };
                    content: string;
                    remark: string;
                } = {
                    tableIdxList: [preTableIdx, preTableIdx + 1],
                    offset: {
                        minOffset: tableIntegralSpanList[preTableIdx].minOffset,
                        maxOffset: tableIntegralSpanList[preTableIdx + 1].maxOffset,
                    },
                    content: isVertical ? mergeVerticalTables(preContent, curContent) : mergeHorizontalTables(preContent, curContent),
                    remark: isHorizontal ? remark.trim() : "",
                };

                mergedTableList.push(mergedTable);
            }
        }
    }

    let optimizedContent = "";
    if (mergedTableList.length > 0) {
        console.log(`${mergedTableList.length} merged result totally.`);
        console.log("=========================================================");
        let startIdx = 0;
        for (const mergedTable of mergedTableList) {
            console.log(`Merged result of table ${mergedTable.tableIdxList.join(", ")}`);
            console.log("-----------------------------------------------------");
            console.log(mergedTable.content);
            console.log("-----------------------------------------------------");

            optimizedContent += result.content.slice(startIdx, mergedTable.offset.minOffset) + mergedTable.content + mergedTable.remark;
            startIdx = mergedTable.offset.maxOffset;
        }

        optimizedContent += result.content.slice(startIdx);
    } else {
        optimizedContent = result.content;
    }

    // Due to the optimized_content may be quite long, if want to check it, just uncomment below line:
    // console.log(`this is the optimize content: ${optimizedContent}`);
}


/**
 * Extracts the page numbers from the bounding regions of a table.
 *
 * @param table - An object representing a table, which contains an array of bounding regions.
 * @returns An array of page numbers extracted from the bounding regions.
 */
function getTablePageNumbers(table: { boundingRegions: any[]; }) {
    return table.boundingRegions.map(region => region.pageNumber);
}

/**
 * Calculates the minimum and maximum offsets from a table's spans.
 *
 * @param table - An object containing spans, where each span has an offset and a length.
 * @returns An object with `minOffset` and `maxOffset` properties. If the table has no spans, both offsets are set to -1.
 */
function getTableSpanOffsets(table: { spans: string | any[]; }) {
    if (table.spans.length > 0) {
        let minOffset = table.spans[0].offset;
        let maxOffset = table.spans[0].offset + table.spans[0].length;

        for (const span of table.spans) {
            if (span.offset < minOffset) {
                minOffset = span.offset;
            }
            if (span.offset + span.length > maxOffset) {
                maxOffset = span.offset + span.length;
            }
        }

        return { minOffset, maxOffset };
    } else {
        return { minOffset: -1, maxOffset: -1 };
    }
}

/**
 * Analyzes a list of tables to determine potential candidates for merging and calculates the integral span of each table.
 *
 * @param tables - An array of tables to analyze. Each table should have properties that allow the calculation of span offsets and page numbers.
 * @returns An object containing two properties:
 *   - `mergeTablesCandidates`: An array of objects representing potential merge candidates. Each object contains:
 *     - `preTableIdx`: The index of the previous table.
 *     - `start`: The starting offset of the previous table.
 *     - `end`: The ending offset of the current table.
 *     - `minOffset`: The minimum offset of the current table.
 *     - `maxOffset`: The maximum offset of the current table.
 *   - `tableIntegralSpanList`: An array of objects representing the integral span of each table. Each object contains:
 *     - `idx`: The index of the table.
 *     - `minOffset`: The minimum offset of the table.
 *     - `maxOffset`: The maximum offset of the table.
 */
function getMergeTableCandidatesAndTableIntegralSpan(tables: any[] | undefined) {
    const tableIntegralSpanList: { idx: number; minOffset: any; maxOffset: any; }[] = [];
    const mergeTablesCandidates: { preTableIdx: number; start: number; end: any; minOffset: any; maxOffset: any; }[] = [];
    let preTableIdx = -1;
    let preTablePage = -1;
    let preMaxOffset = 0;

    tables?.forEach((table, tableIdx) => {
        const { minOffset, maxOffset } = getTableSpanOffsets(table);
        if (minOffset > -1 && maxOffset > -1) {
            const tablePage = Math.min(...getTablePageNumbers(table));
            console.log(`Table ${tableIdx} has offset range: ${minOffset} - ${maxOffset} on page ${tablePage}`);

            if (tablePage === preTablePage + 1) {
                mergeTablesCandidates.push({
                    preTableIdx,
                    start: preMaxOffset,
                    end: minOffset,
                    minOffset,
                    maxOffset,
                });
            }

            tableIntegralSpanList.push({
                idx: tableIdx,
                minOffset,
                maxOffset,
            });

            preTableIdx = tableIdx;
            preTablePage = tablePage;
            preMaxOffset = maxOffset;
        } else {
            console.log(`Table ${tableIdx} is empty`);
            tableIntegralSpanList.push({ idx: tableIdx, minOffset: -1, maxOffset: -1 });
        }
    });

    return { mergeTablesCandidates, tableIntegralSpanList };
}

/**
 * Checks if there is a paragraph within the specified range that is not a page header, footer, or page number.
 *
 * @param paragraphs - An array of `DocumentParagraphOutput` objects or undefined.
 * @param start - The start offset of the range to check.
 * @param end - The end offset of the range to check.
 * @returns `true` if a paragraph is found within the range that is not a page header, footer, or page number; otherwise, `false`.
 */
function checkParagraphPresence(paragraphs: DocumentParagraphOutput[] | undefined, start: number, end: number) {
    if (!paragraphs) return false;
    for (const paragraph of paragraphs) {
        for (const span of paragraph.spans) {
            if (span.offset > start && span.offset < end) {
                if (!paragraph.role || !["pageHeader", "pageFooter", "pageNumber"].includes(paragraph.role)) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * Checks if the tables in the result are horizontally distributed by comparing the bounding regions
 * of the tables at the specified index and the next index.
 *
 * @param result - The analysis result output containing tables and pages information.
 * @param preTableIdx - The index of the table to compare with the next table.
 * @returns A boolean indicating whether the tables are horizontally distributed.
 */
function checkTablesAreHorizontalDistribution(result: AnalyzeResultOutput, preTableIdx: number) {
    const INDEX_OF_X_LEFT_TOP = 0;
    const INDEX_OF_X_LEFT_BOTTOM = 6;
    const INDEX_OF_X_RIGHT_TOP = 2;
    const INDEX_OF_X_RIGHT_BOTTOM = 4;

    const THRESHOLD_RATE_OF_RIGHT_COVER = 0.99;
    const THRESHOLD_RATE_OF_LEFT_COVER = 0.01;

    let isRightCovered = false;
    let isLeftCovered = false;

    if (result.tables![preTableIdx].rowCount === result.tables![preTableIdx + 1].rowCount) {
        const boundingRegions = result.tables![preTableIdx].boundingRegions!;
        for (const region of boundingRegions) {
            const pageWidth = result.pages[region.pageNumber - 1].width;
            const xRight = Math.max(region.polygon[INDEX_OF_X_RIGHT_TOP], region.polygon[INDEX_OF_X_RIGHT_BOTTOM]);
            if (pageWidth !== undefined) {
                const rightCoverRate = xRight / pageWidth;
                if (rightCoverRate > THRESHOLD_RATE_OF_RIGHT_COVER) {
                    isRightCovered = true;
                    break;
                }
            }
            return isLeftCovered && isRightCovered;
        }

        for (const region of boundingRegions) {
            const pageWidth = result.pages[region.pageNumber - 1].width;
            const xLeft = Math.min(region.polygon[INDEX_OF_X_LEFT_TOP], region.polygon[INDEX_OF_X_LEFT_BOTTOM]);
            if (pageWidth !== undefined) {
                const leftCoverRate = xLeft / pageWidth;
                if (leftCoverRate < THRESHOLD_RATE_OF_LEFT_COVER) {
                    isLeftCovered = true;
                    break;
                }
            }
            isLeftCovered = true;
            break;
        }
    }

    return isLeftCovered && isRightCovered;
}

/**
 * Removes the header row from a markdown table.
 *
 * This function takes a markdown table as input and removes the header row,
 * which is identified by a separator line containing cells with " - ".
 *
 * @param markdownTable - The markdown table as a string.
 * @returns The markdown table without the header row.
 */
function removeHeaderFromMarkdownTable(markdownTable: string): string {
    const HEADER_SEPARATOR_CELL_CONTENT = " - ";

    let result = "";
    const lines = markdownTable.split("\n");
    for (const line of lines) {
        const borderList = line.split(HEADER_SEPARATOR_CELL_CONTENT);
        const borderSet = new Set(borderList);
        if (borderSet.size === 1 && borderSet.has(BORDER_SYMBOL)) {
            continue;
        } else {
            result += `${line}\n`;
        }
    }

    return result;
}

/**
 * Merges two markdown tables horizontally by combining their rows.
 * Each row from the first table is concatenated with the corresponding row from the second table.
 * The tables are expected to have the same number of rows.
 *
 * @param mdTable1 - The first markdown table as a string.
 * @param mdTable2 - The second markdown table as a string.
 * @returns The merged markdown table as a string.
 */
function mergeHorizontalTables(mdTable1: string, mdTable2: string): string {
    const rows1 = mdTable1.trim().split("\n");
    const rows2 = mdTable2.trim().split("\n");

    const mergedRows = rows1.map((row1, index) => {
        const row2 = rows2[index];
        return (
            (row1.endsWith(BORDER_SYMBOL) ? row1.slice(0, -1) : row1) +
            BORDER_SYMBOL +
            (row2.startsWith(BORDER_SYMBOL) ? row2.slice(1) : row2)
        );
    });

    return mergedRows.join("\n");
}

/**
 * Merges two markdown tables vertically by appending the rows of the second table to the first table.
 * Assumes that both tables have the same number of columns.
 *
 * @param mdTable1 - The first markdown table as a string.
 * @param mdTable2 - The second markdown table as a string.
 * @returns The merged markdown table as a string.
 * @throws Will throw an error if the number of columns in the two tables are different.
 */
function mergeVerticalTables(mdTable1: string, mdTable2: string): string {
    const table2WithoutHeader = removeHeaderFromMarkdownTable(mdTable2);
    const rows1 = mdTable1.trim().split("\n");
    const rows2 = table2WithoutHeader.trim().split("\n");

    const numColumns1 = rows1[0].split(BORDER_SYMBOL).length - 2;
    const numColumns2 = rows2[0].split(BORDER_SYMBOL).length - 2;

    if (numColumns1 !== numColumns2) {
        throw new Error("Different count of columns");
    }

    const mergedRows = rows1.concat(rows2);
    return mergedRows.join("\n");
}


identifyAndMergeCrossPageTables().catch(console.error);
