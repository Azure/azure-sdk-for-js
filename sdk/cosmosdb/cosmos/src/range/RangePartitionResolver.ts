import { CompareFunction, Range } from ".";
import { Document, PartitionKey } from "../documents";

/** @hidden */
export type PartitionKeyExtractorFunction = (obj: object) => PartitionKey;
/** @hidden */
export type PartitionKeyExtractor = string | PartitionKeyExtractorFunction;
/** @hidden */
export interface PartitionKeyMapItem {
  range: Range;
  link: string;
}

/** @hidden */
export class RangePartitionResolver {
  // TODO: should these be public?
  public partitionKeyExtractor: PartitionKeyExtractor;
  public partitionKeyMap: PartitionKeyMapItem[];
  public compareFunction: CompareFunction;
  /**
   * RangePartitionResolver implements partitioning using a partition map of ranges of values to a \
   * collection link in the Azure Cosmos DB database service.
   * @class RangePartitionResolver
   * @param {PartitionKeyExtractor} partitionKeyExtractor   - If partitionKeyExtractor is a string, \
   * it should be the name of the property in the document to execute the hashing on.
   *                                                      If partitionKeyExtractor is a function, \
   * it should be a function to extract the partition key from an object.
   * @param {Array} partitionKeyMap                     - The map from Range to collection link that\
   *  is used for partitioning requests.
   * @param {function} compareFunction                  - Optional function that accepts two arguments\
   *  x and y and returns a negative value if x < y, zero if x = y, or a positive value if x > y.
   */
  constructor(
    partitionKeyExtractor: PartitionKeyExtractor,
    partitionKeyMap: PartitionKeyMapItem[],
    compareFunction?: CompareFunction
  ) {
    if (partitionKeyExtractor === undefined || partitionKeyExtractor === null) {
      throw new Error("partitionKeyExtractor cannot be null or undefined");
    }
    if (typeof partitionKeyExtractor !== "string" && typeof partitionKeyExtractor !== "function") {
      throw new Error("partitionKeyExtractor must be either a 'string' or a 'function'");
    }
    if (partitionKeyMap === undefined || partitionKeyMap === null) {
      throw new Error("partitionKeyMap cannot be null or undefined");
    }
    if (!Array.isArray(partitionKeyMap)) {
      throw new Error("partitionKeyMap has to be an Array");
    }
    const allMapEntriesAreValid = partitionKeyMap.every(m => {
      if (m === undefined || m === null) {
        return false;
      }
      if (m.range === undefined) {
        return false;
      }
      if (!(m.range instanceof Range)) {
        return false;
      }
      if (m.link === undefined) {
        return false;
      }
      if (typeof m.link !== "string") {
        return false;
      }
      return true;
    });
    if (!allMapEntriesAreValid) {
      throw new Error("All partitionKeyMap entries have to be a tuple {range: Range, link: string }");
    }
    if (compareFunction !== undefined && typeof compareFunction !== "function") {
      throw new Error("Invalid argument: 'compareFunction' is not a function");
    }

    this.partitionKeyExtractor = partitionKeyExtractor;
    this.partitionKeyMap = partitionKeyMap;
    this.compareFunction = compareFunction;
  }

  /**
   * Extracts the partition key from the specified document using the partitionKeyExtractor
   * @memberof RangePartitionResolver
   * @instance
   * @param {object} document - The document from which to extract the partition key.
   * @returns {}
   */
  public getPartitionKey(document: Document): PartitionKey {
    if (typeof this.partitionKeyExtractor === "string") {
      return document[this.partitionKeyExtractor] as number;
    }
    if (typeof this.partitionKeyExtractor === "function") {
      return this.partitionKeyExtractor(document);
    }
    throw new Error(`Unable to extract partition key from document. \
            Ensure PartitionKeyExtractor is a valid function or property name.`);
  }

  /**
   * Given a partition key, returns the correct collection link for creating a document using the range partition map.
   * @memberof RangePartitionResolver
   * @instance
   * @param {any} partitionKey - The partition key used to determine the target collection for create
   * @returns {string}         - The target collection link that will be used for document creation.
   */
  public resolveForCreate(partitionKey: PartitionKey) {
    const range = new Range({ low: partitionKey });
    const mapEntry = this.getFirstContainingMapEntryOrNull(range);
    if (mapEntry !== undefined && mapEntry !== null) {
      return mapEntry.link;
    }
    throw new Error(`Invalid operation: A containing range for \
'${range.toString()}' doesn't exist in the partition map.`);
  }

  /**
   * Given a partition key, returns a list of collection links to read from using the range partition map.
   * @memberof RangePartitionResolver
   * @instance
   * @param {any} partitionKey - The partition key used to determine the target collection for query
   * @returns {string[]}         - The list of target collection links.
   */
  public resolveForRead(partitionKey: PartitionKey) {
    if (partitionKey === undefined || partitionKey === null) {
      return this.partitionKeyMap.map(i => i.link);
    } else {
      return this._getIntersectingMapEntries(partitionKey).map(i => i.link);
    }
  }

  // TODO: did this for backwards compat test, probably need to consider making these private
  public _getFirstContainingMapEntryOrNull(point: any) {
    return this.getFirstContainingMapEntryOrNull(point);
  }
  public getFirstContainingMapEntryOrNull(point: any) {
    // TODO: any Point
    const containingMapEntries = this.partitionKeyMap.filter(
      p => p.range !== undefined && p.range.contains(point, this.compareFunction)
    );
    if (containingMapEntries && containingMapEntries.length > 0) {
      return containingMapEntries[0];
    }
    return null;
  }

  public _getIntersectingMapEntries(partitionKey: PartitionKey) {
    const partitionKeys: PartitionKey[] = Array.isArray(partitionKey) ? partitionKey : [partitionKey];
    const ranges: Range[] = partitionKeys.map<Range>(p => (Range.isRange(p) ? (p as Range) : new Range({ low: p })));

    return ranges.reduce((result, range) => {
      return result.concat(this.partitionKeyMap.filter(entry => entry.range.intersect(range, this.compareFunction)));
    }, []);
  }
}
