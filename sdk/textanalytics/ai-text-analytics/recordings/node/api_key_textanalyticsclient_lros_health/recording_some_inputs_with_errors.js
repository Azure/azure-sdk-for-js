let nock = require('nock');

module.exports.hash = "6dc8db0ff1b4a40ee490f6bad3509f1e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/654008fa-2b21-42a6-8cb0-64672d66acd9',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  'e36dfbf9-86e1-43f1-bc76-264e92b81cc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:41:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/654008fa-2b21-42a6-8cb0-64672d66acd9')
  .query(true)
  .reply(200, {"jobId":"654008fa-2b21-42a6-8cb0-64672d66acd9","lastUpdateDateTime":"2021-02-23T02:41:57Z","createdDateTime":"2021-02-23T02:41:57Z","expirationDateTime":"2021-02-24T02:41:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f8bdca3d-158f-450a-8005-a6eade054eec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:41:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/654008fa-2b21-42a6-8cb0-64672d66acd9')
  .query(true)
  .reply(200, {"jobId":"654008fa-2b21-42a6-8cb0-64672d66acd9","lastUpdateDateTime":"2021-02-23T02:41:57Z","createdDateTime":"2021-02-23T02:41:57Z","expirationDateTime":"2021-02-24T02:41:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '9582d05d-cda2-49f2-83a9-edc66d5871d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:41:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/654008fa-2b21-42a6-8cb0-64672d66acd9')
  .query(true)
  .reply(200, {"jobId":"654008fa-2b21-42a6-8cb0-64672d66acd9","lastUpdateDateTime":"2021-02-23T02:41:57Z","createdDateTime":"2021-02-23T02:41:57Z","expirationDateTime":"2021-02-24T02:41:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'd5d95481-cbd5-43ec-9f22-bf332bbd3ec4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:41:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/654008fa-2b21-42a6-8cb0-64672d66acd9')
  .query(true)
  .reply(200, {"jobId":"654008fa-2b21-42a6-8cb0-64672d66acd9","lastUpdateDateTime":"2021-02-23T02:41:57Z","createdDateTime":"2021-02-23T02:41:57Z","expirationDateTime":"2021-02-24T02:41:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e90e3106-e7c7-42b7-979f-4215fd7acb6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/654008fa-2b21-42a6-8cb0-64672d66acd9')
  .query(true)
  .reply(200, {"jobId":"654008fa-2b21-42a6-8cb0-64672d66acd9","lastUpdateDateTime":"2021-02-23T02:42:01Z","createdDateTime":"2021-02-23T02:41:57Z","expirationDateTime":"2021-02-24T02:41:57Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"3","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":0.98},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/0/entities/0","role":"Attribute"},{"ref":"#/results/documents/0/entities/1","role":"Entity"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/0/entities/1","role":"Entity"},{"ref":"#/results/documents/0/entities/2","role":"Attribute"}]}],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '7cffaae6-78af-4768-9206-d9491cc21a8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/654008fa-2b21-42a6-8cb0-64672d66acd9')
  .query(true)
  .reply(200, {"jobId":"654008fa-2b21-42a6-8cb0-64672d66acd9","lastUpdateDateTime":"2021-02-23T02:42:01Z","createdDateTime":"2021-02-23T02:41:57Z","expirationDateTime":"2021-02-24T02:41:57Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"3","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":0.98},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/0/entities/0","role":"Attribute"},{"ref":"#/results/documents/0/entities/1","role":"Entity"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/0/entities/1","role":"Entity"},{"ref":"#/results/documents/0/entities/2","role":"Attribute"}]}],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'd8ef70d3-21fb-4ff0-96f8-563619c7701c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:03 GMT'
]);
