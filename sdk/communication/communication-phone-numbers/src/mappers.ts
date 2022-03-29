// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging"

import * as Generated from "./generated/src/operatorConnect/models/";
import * as Public from "./";


export function toConsentResponse(
  consent: Generated.Consent
): Public.Consent {
  return {
    companyName: consent.companyName!,
    consentedBy: consent.consentedBy!,
    consentedCountries: consent.consentedCountries!,
    consentedOn: consent.consentedOn!,
    contacts: consent.contacts!,
    lastModifiedBy: consent.lastModifiedBy!,
    lastModifiedOn: consent.lastModifiedOn!,
    operatorId: consent.operatorId!,
    status: consent.status as Public.ConsentStatus,
  };
}
export function toOperatorResponse(operator: Generated.Operator)
  : Public.Operator {
  return {
    operatorId: operator.operatorId!,
    acquiredNumbersCount: operator.acquiredNumbersCount!,
    friendlyName: operator.friendlyName!,
    landingPage: operator.landingPage!,
    logoThumbnailUri: operator.logoThumbnailUri!,
    logoUri: operator.logoUri!,
    offerings: operator.offerings!,
  }
}

export function toConsentResponseIterator(
  constentsIterator: PagedAsyncIterableIterator<Generated.Consent, Generated.Consent[], PageSettings>
): PagedAsyncIterableIterator<Public.Consent, Public.Consent[], PageSettings> {
  const inter = getIterator(constentsIterator, toConsentResponse);
  return {
    [Symbol.asyncIterator]() { return this; },
    byPage: (settings?: PageSettings) => getNextPage(settings, constentsIterator, toConsentResponse),
    next: inter.next,
  };
}

export function toOperatorsResponseIterator(
  constentsIterator: PagedAsyncIterableIterator<Generated.Operator, Generated.Operator[], PageSettings>
): PagedAsyncIterableIterator<Public.Operator, Public.Operator[], PageSettings> {
  const inter = getIterator(constentsIterator, toOperatorResponse);
  return {
    [Symbol.asyncIterator]() { return this; },
    byPage: (settings?: PageSettings) => getNextPage(settings, constentsIterator, toOperatorResponse),
    next: inter.next,
  };
}

async function* getIterator<TResult, TOrig>(
  constentsIterator: PagedAsyncIterableIterator<TOrig, TOrig[], PageSettings>,
  convert: (orig: TOrig) => TResult
): AsyncIterableIterator<TResult> {
  for await (const item of constentsIterator) {
    yield convert(item);
  }
}

async function* getNextPage<TResult, TOrig>(
  settings: PageSettings | undefined,
  constentsIterator: PagedAsyncIterableIterator<TOrig, TOrig[], PageSettings>,
  convert: (orig: TOrig) => TResult
): AsyncIterableIterator<TResult[]> {
  for await (const page of constentsIterator.byPage(settings)) {
    yield page.map(item => convert(item));
  }
}
