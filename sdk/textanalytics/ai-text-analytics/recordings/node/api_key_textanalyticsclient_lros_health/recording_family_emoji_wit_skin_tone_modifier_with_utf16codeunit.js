let nock = require('nock');

module.exports.hash = "316216dafaf79a901a978dd5e8584eda";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/8e611e8b-0f1d-4673-a1da-7cd4b66b6231',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '66c18e72-c67d-4825-8d2a-57ed4821147f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8e611e8b-0f1d-4673-a1da-7cd4b66b6231')
  .query(true)
  .reply(200, {"jobId":"8e611e8b-0f1d-4673-a1da-7cd4b66b6231","lastUpdateDateTime":"2021-04-28T21:05:35Z","createdDateTime":"2021-04-28T21:05:35Z","expirationDateTime":"2021-04-29T21:05:35Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '65969c9a-b35f-4d4c-a71b-30f518e1a62c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8e611e8b-0f1d-4673-a1da-7cd4b66b6231')
  .query(true)
  .reply(200, {"jobId":"8e611e8b-0f1d-4673-a1da-7cd4b66b6231","lastUpdateDateTime":"2021-04-28T21:05:35Z","createdDateTime":"2021-04-28T21:05:35Z","expirationDateTime":"2021-04-29T21:05:35Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '8c9ff7fd-ef35-4a3d-b841-6e3a60bf4308',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8e611e8b-0f1d-4673-a1da-7cd4b66b6231')
  .query(true)
  .reply(200, {"jobId":"8e611e8b-0f1d-4673-a1da-7cd4b66b6231","lastUpdateDateTime":"2021-04-28T21:05:35Z","createdDateTime":"2021-04-28T21:05:35Z","expirationDateTime":"2021-04-29T21:05:35Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":20,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.89,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '88e414bb-d4ec-48f6-a2d6-f34c94b596fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8e611e8b-0f1d-4673-a1da-7cd4b66b6231')
  .query(true)
  .reply(200, {"jobId":"8e611e8b-0f1d-4673-a1da-7cd4b66b6231","lastUpdateDateTime":"2021-04-28T21:05:35Z","createdDateTime":"2021-04-28T21:05:35Z","expirationDateTime":"2021-04-29T21:05:35Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":20,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.89,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'fa317f24-2f4c-433d-ab66-16b7d2c44e3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:37 GMT'
]);
