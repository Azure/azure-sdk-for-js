let nock = require('nock');

module.exports.hash = "6197be518bc787450217d0b89ab9001b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/d72627e9-d715-4cbb-8fb7-3acb41f32049',
  'x-envoy-upstream-service-time',
  '318',
  'apim-request-id',
  'a872195b-70c4-4506-95de-a17b32b01f04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/d72627e9-d715-4cbb-8fb7-3acb41f32049')
  .query(true)
  .reply(200, {"jobId":"d72627e9-d715-4cbb-8fb7-3acb41f32049","lastUpdateDateTime":"2021-10-23T00:43:08Z","createdDateTime":"2021-10-23T00:43:08Z","expirationDateTime":"2021-10-24T00:43:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2c6f01ad-5122-402b-bfb8-7d59d53c7944',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/d72627e9-d715-4cbb-8fb7-3acb41f32049')
  .query(true)
  .reply(200, {"jobId":"d72627e9-d715-4cbb-8fb7-3acb41f32049","lastUpdateDateTime":"2021-10-23T00:43:08Z","createdDateTime":"2021-10-23T00:43:08Z","expirationDateTime":"2021-10-24T00:43:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  'dac27aa3-7cfa-43ae-9b7e-34ce5fc9d2c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/d72627e9-d715-4cbb-8fb7-3acb41f32049')
  .query(true)
  .reply(200, {"jobId":"d72627e9-d715-4cbb-8fb7-3acb41f32049","lastUpdateDateTime":"2021-10-23T00:43:09Z","createdDateTime":"2021-10-23T00:43:08Z","expirationDateTime":"2021-10-24T00:43:08Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":12,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.99,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'bdbfca43-9c3f-4080-a1c8-6a6f1e476945',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/d72627e9-d715-4cbb-8fb7-3acb41f32049')
  .query(true)
  .reply(200, {"jobId":"d72627e9-d715-4cbb-8fb7-3acb41f32049","lastUpdateDateTime":"2021-10-23T00:43:09Z","createdDateTime":"2021-10-23T00:43:08Z","expirationDateTime":"2021-10-24T00:43:08Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":12,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.99,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '4be960f2-37bc-4aeb-8fb7-6fe0342d6747',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:10 GMT'
]);
