let nock = require('nock');

module.exports.hash = "d975b16d2add4541fc29814b032688e0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/54365e0a-e311-484e-ade8-8bc68592e2bf',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '461821c2-59b5-481c-a2db-3cf9dde0c2f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/54365e0a-e311-484e-ade8-8bc68592e2bf')
  .query(true)
  .reply(200, {"jobId":"54365e0a-e311-484e-ade8-8bc68592e2bf","lastUpdateDateTime":"2021-04-28T21:05:37Z","createdDateTime":"2021-04-28T21:05:37Z","expirationDateTime":"2021-04-29T21:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'fddec57f-c548-426d-aad7-0ca29274011e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/54365e0a-e311-484e-ade8-8bc68592e2bf')
  .query(true)
  .reply(200, {"jobId":"54365e0a-e311-484e-ade8-8bc68592e2bf","lastUpdateDateTime":"2021-04-28T21:05:37Z","createdDateTime":"2021-04-28T21:05:37Z","expirationDateTime":"2021-04-29T21:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '7ff4d314-a5d8-48c3-b98f-aa8d80a6b166',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/54365e0a-e311-484e-ade8-8bc68592e2bf')
  .query(true)
  .reply(200, {"jobId":"54365e0a-e311-484e-ade8-8bc68592e2bf","lastUpdateDateTime":"2021-04-28T21:05:37Z","createdDateTime":"2021-04-28T21:05:37Z","expirationDateTime":"2021-04-29T21:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '3905220f-23b4-49ee-95ae-58a41f92c470',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/54365e0a-e311-484e-ade8-8bc68592e2bf')
  .query(true)
  .reply(200, {"jobId":"54365e0a-e311-484e-ade8-8bc68592e2bf","lastUpdateDateTime":"2021-04-28T21:05:37Z","createdDateTime":"2021-04-28T21:05:37Z","expirationDateTime":"2021-04-29T21:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1df8a5c9-cfcf-4bbb-9cd8-6add25754b4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/54365e0a-e311-484e-ade8-8bc68592e2bf')
  .query(true)
  .reply(200, {"jobId":"54365e0a-e311-484e-ade8-8bc68592e2bf","lastUpdateDateTime":"2021-04-28T21:05:37Z","createdDateTime":"2021-04-28T21:05:37Z","expirationDateTime":"2021-04-29T21:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '9d6ed859-8e86-48b7-a695-8f1523319adc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/54365e0a-e311-484e-ade8-8bc68592e2bf')
  .query(true)
  .reply(200, {"jobId":"54365e0a-e311-484e-ade8-8bc68592e2bf","lastUpdateDateTime":"2021-04-28T21:05:44Z","createdDateTime":"2021-04-28T21:05:37Z","expirationDateTime":"2021-04-29T21:05:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":12,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.89,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '1effc853-38c9-4348-8b56-246a19b93f4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/54365e0a-e311-484e-ade8-8bc68592e2bf')
  .query(true)
  .reply(200, {"jobId":"54365e0a-e311-484e-ade8-8bc68592e2bf","lastUpdateDateTime":"2021-04-28T21:05:44Z","createdDateTime":"2021-04-28T21:05:37Z","expirationDateTime":"2021-04-29T21:05:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":12,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.89,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '46c51926-c32d-4b71-8143-5a628932fadc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:45 GMT'
]);
