let nock = require('nock');

module.exports.hash = "6197be518bc787450217d0b89ab9001b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/eba73647-e324-4fa2-9dfd-fccda2216b8f',
  'x-envoy-upstream-service-time',
  '132',
  'apim-request-id',
  'b46361b1-bbe3-4e6a-9667-3860fedb4bbc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/eba73647-e324-4fa2-9dfd-fccda2216b8f')
  .query(true)
  .reply(200, {"jobId":"eba73647-e324-4fa2-9dfd-fccda2216b8f","lastUpdateDateTime":"2021-06-25T19:57:31Z","createdDateTime":"2021-06-25T19:57:31Z","expirationDateTime":"2021-06-26T19:57:31Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b6d71491-26fd-4b26-92f3-5e136436d9b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/eba73647-e324-4fa2-9dfd-fccda2216b8f')
  .query(true)
  .reply(200, {"jobId":"eba73647-e324-4fa2-9dfd-fccda2216b8f","lastUpdateDateTime":"2021-06-25T19:57:31Z","createdDateTime":"2021-06-25T19:57:31Z","expirationDateTime":"2021-06-26T19:57:31Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '9230a1d0-cc39-4cab-8d5a-a86c7d922e72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/eba73647-e324-4fa2-9dfd-fccda2216b8f')
  .query(true)
  .reply(200, {"jobId":"eba73647-e324-4fa2-9dfd-fccda2216b8f","lastUpdateDateTime":"2021-06-25T19:57:31Z","createdDateTime":"2021-06-25T19:57:31Z","expirationDateTime":"2021-06-26T19:57:31Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '626f2bfe-5490-4041-9d67-3d769411f53e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/eba73647-e324-4fa2-9dfd-fccda2216b8f')
  .query(true)
  .reply(200, {"jobId":"eba73647-e324-4fa2-9dfd-fccda2216b8f","lastUpdateDateTime":"2021-06-25T19:57:34Z","createdDateTime":"2021-06-25T19:57:31Z","expirationDateTime":"2021-06-26T19:57:31Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":12,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.99,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '3545b446-5b55-473e-a5fd-9229d2bdb115',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/eba73647-e324-4fa2-9dfd-fccda2216b8f')
  .query(true)
  .reply(200, {"jobId":"eba73647-e324-4fa2-9dfd-fccda2216b8f","lastUpdateDateTime":"2021-06-25T19:57:34Z","createdDateTime":"2021-06-25T19:57:31Z","expirationDateTime":"2021-06-26T19:57:31Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":12,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.99,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'c87e444f-3bda-4915-828d-6a7a42ed9f2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:35 GMT'
]);
