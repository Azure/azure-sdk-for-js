/** @hidden */
export class TestData {
  public numberOfDocuments: number;
  public field: string;
  public numberOfDocsWithSamePartitionKey: number;
  public numberOfDocumentsWithNumbericId: number;
  public sum: number;
  public docs: any[];
  constructor(public partitionKey: string, public uniquePartitionKey: string) {
    this.numberOfDocuments = 800;
    this.field = "field";
    const docs = [];

    const values = [null, false, true, "abc", "cdfg", "opqrs", "ttttttt", "xyz", "oo", "ppp"];
    for (const value of values) {
      const d: any = {};
      d[partitionKey] = value;
      docs.push(d);
    }

    this.numberOfDocsWithSamePartitionKey = 400;
    for (let i = 0; i < this.numberOfDocsWithSamePartitionKey; ++i) {
      const d: any = {};
      d[partitionKey] = uniquePartitionKey;
      d["resourceId"] = i.toString();
      d[this.field] = i + 1;
      docs.push(d);
    }

    this.numberOfDocumentsWithNumbericId =
      this.numberOfDocuments - values.length - this.numberOfDocsWithSamePartitionKey;
    for (let i = 0; i < this.numberOfDocumentsWithNumbericId; ++i) {
      const d: any = {};
      d[partitionKey] = i + 1;
      docs.push(d);
    }

    this.sum = (this.numberOfDocumentsWithNumbericId * (this.numberOfDocumentsWithNumbericId + 1)) / 2.0;

    this.docs = docs;
  }
}
