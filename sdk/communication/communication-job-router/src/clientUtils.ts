// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />

import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

export type Transformer<TFrom, TTo> = (input: TFrom) => TTo;
export class TransformingPagedAsyncIterableIterator<
  TElement,
  TTransformed,
  TPage = TElement[],
  TTransformedPage = TTransformed[],
  TPageSettings = PageSettings,
> {
  constructor(
    private internalIterator: PagedAsyncIterableIterator<TElement, TPage, TPageSettings>,
    private transform: Transformer<TElement, TTransformed>,
  ) {}

  async next(): Promise<IteratorResult<TTransformed>> {
    const internalResult = await this.internalIterator.next();

    const generatedItem = internalResult?.value as TElement | undefined;
    const transformedItem =
      generatedItem === undefined ? ({} as TTransformed) : this.transform(generatedItem);

    return Promise.resolve({ value: transformedItem, done: internalResult.done });
  }

  [Symbol.asyncIterator](): TransformingPagedAsyncIterableIterator<
    TElement,
    TTransformed,
    TPage,
    TTransformedPage,
    TPageSettings
  > {
    return this;
  }

  async *byPage(settings?: TPageSettings): AsyncIterableIterator<TTransformedPage> {
    const internalResult = await this.internalIterator.byPage(settings);

    for await (const generatedPage of internalResult) {
      const transformedPage = [] as TTransformedPage;

      (generatedPage as Array<TElement>).forEach((generatedItem) => {
        const transformedItem =
          generatedItem === undefined ? ({} as TTransformed) : this.transform(generatedItem);
        (transformedPage as Array<TTransformed>).push(transformedItem);
      });

      yield transformedPage;
    }
  }
}
