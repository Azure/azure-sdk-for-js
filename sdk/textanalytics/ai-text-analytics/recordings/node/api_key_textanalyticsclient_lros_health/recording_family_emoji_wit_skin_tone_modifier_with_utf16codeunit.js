let nock = require('nock');

module.exports.hash = "316216dafaf79a901a978dd5e8584eda";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/a4d1ec83-b93b-419f-90d7-73e87bea4343',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'a18593be-5d65-483c-843a-283e2080ac96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/a4d1ec83-b93b-419f-90d7-73e87bea4343')
  .query(true)
  .reply(200, {"jobId":"a4d1ec83-b93b-419f-90d7-73e87bea4343","lastUpdateDateTime":"2021-05-12T19:05:54Z","createdDateTime":"2021-05-12T19:05:54Z","expirationDateTime":"2021-05-13T19:05:54Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'a50d7cdb-f21e-4d3b-818a-35593b912553',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/a4d1ec83-b93b-419f-90d7-73e87bea4343')
  .query(true)
  .reply(200, {"jobId":"a4d1ec83-b93b-419f-90d7-73e87bea4343","lastUpdateDateTime":"2021-05-12T19:05:54Z","createdDateTime":"2021-05-12T19:05:54Z","expirationDateTime":"2021-05-13T19:05:54Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '67c122ef-52db-4ff5-8c05-a1829b0baa6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/a4d1ec83-b93b-419f-90d7-73e87bea4343')
  .query(true)
  .reply(200, {"jobId":"a4d1ec83-b93b-419f-90d7-73e87bea4343","lastUpdateDateTime":"2021-05-12T19:05:54Z","createdDateTime":"2021-05-12T19:05:54Z","expirationDateTime":"2021-05-13T19:05:54Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '85ab65b4-c3bb-4d93-b7b2-b480d5fd63fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/a4d1ec83-b93b-419f-90d7-73e87bea4343')
  .query(true)
  .reply(200, {"jobId":"a4d1ec83-b93b-419f-90d7-73e87bea4343","lastUpdateDateTime":"2021-05-12T19:05:57Z","createdDateTime":"2021-05-12T19:05:54Z","expirationDateTime":"2021-05-13T19:05:54Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":20,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.89,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'd0a5d049-aa1e-4b29-a679-5ec3342a46d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/a4d1ec83-b93b-419f-90d7-73e87bea4343')
  .query(true)
  .reply(200, {"jobId":"a4d1ec83-b93b-419f-90d7-73e87bea4343","lastUpdateDateTime":"2021-05-12T19:05:57Z","createdDateTime":"2021-05-12T19:05:54Z","expirationDateTime":"2021-05-13T19:05:54Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":20,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.89,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'c79f60d3-740d-4d27-aa03-6cbca2dee4ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:57 GMT'
]);
