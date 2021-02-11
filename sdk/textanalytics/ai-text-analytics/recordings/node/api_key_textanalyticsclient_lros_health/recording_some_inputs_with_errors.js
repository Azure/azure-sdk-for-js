let nock = require('nock');

module.exports.hash = "be863970fc731e04283de35e1435de68";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/406764e2-5f71-4ff2-98cc-3fd328faade0',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '4660a79a-73fb-430e-9674-9aa45b9c9560',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/406764e2-5f71-4ff2-98cc-3fd328faade0')
  .query(true)
  .reply(200, {"jobId":"406764e2-5f71-4ff2-98cc-3fd328faade0","lastUpdateDateTime":"2020-12-30T17:28:07Z","createdDateTime":"2020-12-30T17:28:07Z","expirationDateTime":"2020-12-31T17:28:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '4c3ed23d-c49b-4742-8aea-c6be3f442f99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/406764e2-5f71-4ff2-98cc-3fd328faade0')
  .query(true)
  .reply(200, {"jobId":"406764e2-5f71-4ff2-98cc-3fd328faade0","lastUpdateDateTime":"2020-12-30T17:28:07Z","createdDateTime":"2020-12-30T17:28:07Z","expirationDateTime":"2020-12-31T17:28:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '7cbcd819-1d72-4c5b-b238-fa82814afb4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/406764e2-5f71-4ff2-98cc-3fd328faade0')
  .query(true)
  .reply(200, {"jobId":"406764e2-5f71-4ff2-98cc-3fd328faade0","lastUpdateDateTime":"2020-12-30T17:28:07Z","createdDateTime":"2020-12-30T17:28:07Z","expirationDateTime":"2020-12-31T17:28:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'a7048236-e0e4-4d29-8dfd-f22daf88bdf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/406764e2-5f71-4ff2-98cc-3fd328faade0')
  .query(true)
  .reply(200, {"jobId":"406764e2-5f71-4ff2-98cc-3fd328faade0","lastUpdateDateTime":"2020-12-30T17:28:10Z","createdDateTime":"2020-12-30T17:28:07Z","expirationDateTime":"2020-12-31T17:28:07Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"3","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1,"isNegated":false},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1,"isNegated":false}],"relations":[{"relationType":"DosageOfMedication","bidirectional":false,"source":"#/results/documents/0/entities/0","target":"#/results/documents/0/entities/1"},{"relationType":"FrequencyOfMedication","bidirectional":false,"source":"#/results/documents/0/entities/2","target":"#/results/documents/0/entities/1"}],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '9b8a9c75-b110-4707-bd05-cb5f1ed7680d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/406764e2-5f71-4ff2-98cc-3fd328faade0')
  .query(true)
  .reply(200, {"jobId":"406764e2-5f71-4ff2-98cc-3fd328faade0","lastUpdateDateTime":"2020-12-30T17:28:10Z","createdDateTime":"2020-12-30T17:28:07Z","expirationDateTime":"2020-12-31T17:28:07Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"3","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1,"isNegated":false},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1,"isNegated":false}],"relations":[{"relationType":"DosageOfMedication","bidirectional":false,"source":"#/results/documents/0/entities/0","target":"#/results/documents/0/entities/1"},{"relationType":"FrequencyOfMedication","bidirectional":false,"source":"#/results/documents/0/entities/2","target":"#/results/documents/0/entities/1"}],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'c0c4c25c-82a1-46dd-ac18-4b7bec2b608c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:12 GMT'
]);
