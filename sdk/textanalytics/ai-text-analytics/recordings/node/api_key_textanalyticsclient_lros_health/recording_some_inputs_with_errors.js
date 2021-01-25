let nock = require('nock');

module.exports.hash = "0ca79508caa1c1ace422679c6aeefa55";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/f3387cfe-f6b3-4d11-9595-b45d6e93306a',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  'da42ca14-5f90-445f-be4e-f7847dbc7192',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f3387cfe-f6b3-4d11-9595-b45d6e93306a')
  .query(true)
  .reply(200, {"jobId":"f3387cfe-f6b3-4d11-9595-b45d6e93306a","lastUpdateDateTime":"2020-12-22T20:07:15Z","createdDateTime":"2020-12-22T20:07:15Z","expirationDateTime":"2020-12-23T20:07:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '990221fc-c51a-4366-8b6c-59715c19594f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f3387cfe-f6b3-4d11-9595-b45d6e93306a')
  .query(true)
  .reply(200, {"jobId":"f3387cfe-f6b3-4d11-9595-b45d6e93306a","lastUpdateDateTime":"2020-12-22T20:07:15Z","createdDateTime":"2020-12-22T20:07:15Z","expirationDateTime":"2020-12-23T20:07:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '6c0854bf-4424-4a24-a4f4-eb7cdffd6dbe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f3387cfe-f6b3-4d11-9595-b45d6e93306a')
  .query(true)
  .reply(200, {"jobId":"f3387cfe-f6b3-4d11-9595-b45d6e93306a","lastUpdateDateTime":"2020-12-22T20:07:15Z","createdDateTime":"2020-12-22T20:07:15Z","expirationDateTime":"2020-12-23T20:07:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c0ee02f4-2d3a-466c-ab7f-792e2a9b1e33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f3387cfe-f6b3-4d11-9595-b45d6e93306a')
  .query(true)
  .reply(200, {"jobId":"f3387cfe-f6b3-4d11-9595-b45d6e93306a","lastUpdateDateTime":"2020-12-22T20:07:18Z","createdDateTime":"2020-12-22T20:07:15Z","expirationDateTime":"2020-12-23T20:07:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"3","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1,"isNegated":false},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1,"isNegated":false}],"relations":[{"relationType":"DosageOfMedication","bidirectional":false,"source":"#/results/documents/0/entities/0","target":"#/results/documents/0/entities/1"},{"relationType":"FrequencyOfMedication","bidirectional":false,"source":"#/results/documents/0/entities/2","target":"#/results/documents/0/entities/1"}],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '0db7721c-5faa-4a9b-b297-40c26dd5b08b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f3387cfe-f6b3-4d11-9595-b45d6e93306a')
  .query(true)
  .reply(200, {"jobId":"f3387cfe-f6b3-4d11-9595-b45d6e93306a","lastUpdateDateTime":"2020-12-22T20:07:18Z","createdDateTime":"2020-12-22T20:07:15Z","expirationDateTime":"2020-12-23T20:07:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"3","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1,"isNegated":false},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1,"isNegated":false}],"relations":[{"relationType":"DosageOfMedication","bidirectional":false,"source":"#/results/documents/0/entities/0","target":"#/results/documents/0/entities/1"},{"relationType":"FrequencyOfMedication","bidirectional":false,"source":"#/results/documents/0/entities/2","target":"#/results/documents/0/entities/1"}],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'daea0a6b-0cb7-4e95-8e7e-e40fd9efb121',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:19 GMT'
]);
