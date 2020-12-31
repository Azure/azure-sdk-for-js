// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { v4 as guid } from "uuid";
import { Container } from "../../dist";

// tslint:disable:no-console
export class Worker {
  constructor(private readonly regionName: string, private readonly container: Container) {}

  public async RunLoop(itemsToInsert: number): Promise<void> {
    let iterationCount = 0;

    let latency: number[] = [];
    while (iterationCount++ < itemsToInsert) {
      const start = Date.now();
      await this.container.items.create({ id: guid() });
      const end = Date.now();
      latency.push(end - start);
    }
    latency = latency.sort();
    const p50Index = Math.floor(latency.length / 2);

    console.log(
      `Inserted ${latency.length} documents at ${this.regionName} with p50 ${latency[p50Index]}`
    );
  }

  public async ReadAll(expectedNumberOfItems: number): Promise<void> {
    for (;;) {
      const { resources: items } = await this.container.items.readAll().fetchAll();
      if (items.length < expectedNumberOfItems) {
        console.log(
          `Total item read ${items.length} from ${this.regionName} is less than ${expectedNumberOfItems}, retrying reads`
        );

        await this.sleep(1000);
      } else {
        console.log(`Read ${items.length} items from ${this.regionName}`);
        return;
      }
    }
  }

  public async DeleteAll(): Promise<void> {
    const { resources: items } = await this.container.items.readAll().fetchAll();
    for (const item of items) {
      await this.container.item(item.id, undefined).delete();
    }
    console.log(`Deleted all documents from region ${this.regionName}`);
  }

  private sleep(timeinMS: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeinMS);
    });
  }
}
