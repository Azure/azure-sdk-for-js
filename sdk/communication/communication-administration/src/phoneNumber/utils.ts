// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const getDefaultLocale = (): string => {
  // hard-coded for NodeJS, we use navigator.language in the browser
  return "en-US";
};

export const getSkipTakeFromNextLink = (nextLink: string): number[] => {
  const results: number[] = [];
  const skipMatcher = nextLink.match(/skip=([0-9]*)/);
  const takeMatcher = nextLink.match(/take=([0-9]*)/);

  if (skipMatcher && takeMatcher) {
    results.push(parseInt(skipMatcher[1]));
    results.push(parseInt(takeMatcher[1]));
  }

  return results;
};
