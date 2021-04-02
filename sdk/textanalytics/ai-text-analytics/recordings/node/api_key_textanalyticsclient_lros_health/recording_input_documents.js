let nock = require('nock');

module.exports.hash = "a2db9772e5da11b1c3f1daa5a71792e3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/39c338ec-2c4f-4b1f-9c09-5f355dd80d5c',
  'x-envoy-upstream-service-time',
  '359',
  'apim-request-id',
  '871632b2-b331-4511-840c-e8ac091c115d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/39c338ec-2c4f-4b1f-9c09-5f355dd80d5c')
  .query(true)
  .reply(200, {"jobId":"39c338ec-2c4f-4b1f-9c09-5f355dd80d5c","lastUpdateDateTime":"2020-12-22T20:07:06Z","createdDateTime":"2020-12-22T20:07:06Z","expirationDateTime":"2020-12-23T20:07:06Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'a0900f30-adb9-4d08-b374-fc98d681dcb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/39c338ec-2c4f-4b1f-9c09-5f355dd80d5c')
  .query(true)
  .reply(200, {"jobId":"39c338ec-2c4f-4b1f-9c09-5f355dd80d5c","lastUpdateDateTime":"2020-12-22T20:07:06Z","createdDateTime":"2020-12-22T20:07:06Z","expirationDateTime":"2020-12-23T20:07:06Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9e09d315-5e46-4c8d-abab-9f48a7073b85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/39c338ec-2c4f-4b1f-9c09-5f355dd80d5c')
  .query(true)
  .reply(200, {"jobId":"39c338ec-2c4f-4b1f-9c09-5f355dd80d5c","lastUpdateDateTime":"2020-12-22T20:07:06Z","createdDateTime":"2020-12-22T20:07:06Z","expirationDateTime":"2020-12-23T20:07:06Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '52f78a04-3e9f-4fc8-87d9-9bb7b114f14e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/39c338ec-2c4f-4b1f-9c09-5f355dd80d5c')
  .query(true)
  .reply(200, {"jobId":"39c338ec-2c4f-4b1f-9c09-5f355dd80d5c","lastUpdateDateTime":"2020-12-22T20:07:06Z","createdDateTime":"2020-12-22T20:07:06Z","expirationDateTime":"2020-12-23T20:07:06Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'eaf63a7d-1f39-47bc-81c9-683877ff2ea2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/39c338ec-2c4f-4b1f-9c09-5f355dd80d5c')
  .query(true)
  .reply(200, {"jobId":"39c338ec-2c4f-4b1f-9c09-5f355dd80d5c","lastUpdateDateTime":"2020-12-22T20:07:12Z","createdDateTime":"2020-12-22T20:07:06Z","expirationDateTime":"2020-12-23T20:07:06Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f09c2d6e-8b4d-447e-9e9d-1b94e10ae59f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/39c338ec-2c4f-4b1f-9c09-5f355dd80d5c')
  .query(true)
  .reply(200, {"jobId":"39c338ec-2c4f-4b1f-9c09-5f355dd80d5c","lastUpdateDateTime":"2020-12-22T20:07:13Z","createdDateTime":"2020-12-22T20:07:06Z","expirationDateTime":"2020-12-23T20:07:06Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":29,"length":4,"text":"high","category":"MeasurementValue","confidenceScore":0.93,"isNegated":false},{"offset":34,"length":14,"text":"blood pressure","category":"ExaminationName","confidenceScore":0.91,"isNegated":true,"links":[{"dataSource":"UMLS","id":"C0005824"},{"dataSource":"AOD","id":"0000007392"},{"dataSource":"CCC","id":"K33.1"},{"dataSource":"CHV","id":"0000002009"},{"dataSource":"ICNP","id":"10031996"},{"dataSource":"LCH_NW","id":"sh85015011"},{"dataSource":"MDR","id":"10076581"},{"dataSource":"MEDCIN","id":"6045"},{"dataSource":"MSH","id":"D001795"},{"dataSource":"SNM","id":"P-Y107"},{"dataSource":"SNMI","id":"PA-00540"},{"dataSource":"SNOMEDCT_US","id":"46973005"}]}],"relations":[{"relationType":"ValueOfExamination","bidirectional":false,"source":"#/results/documents/0/entities/0","target":"#/results/documents/0/entities/1"}],"warnings":[]},{"id":"2","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1,"isNegated":false},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1,"isNegated":false}],"relations":[{"relationType":"DosageOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/0","target":"#/results/documents/1/entities/1"},{"relationType":"FrequencyOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/2","target":"#/results/documents/1/entities/1"}],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '69191e74-4967-432e-9129-f317b0582ec0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/39c338ec-2c4f-4b1f-9c09-5f355dd80d5c')
  .query(true)
  .reply(200, {"jobId":"39c338ec-2c4f-4b1f-9c09-5f355dd80d5c","lastUpdateDateTime":"2020-12-22T20:07:13Z","createdDateTime":"2020-12-22T20:07:06Z","expirationDateTime":"2020-12-23T20:07:06Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":29,"length":4,"text":"high","category":"MeasurementValue","confidenceScore":0.93,"isNegated":false},{"offset":34,"length":14,"text":"blood pressure","category":"ExaminationName","confidenceScore":0.91,"isNegated":true,"links":[{"dataSource":"UMLS","id":"C0005824"},{"dataSource":"AOD","id":"0000007392"},{"dataSource":"CCC","id":"K33.1"},{"dataSource":"CHV","id":"0000002009"},{"dataSource":"ICNP","id":"10031996"},{"dataSource":"LCH_NW","id":"sh85015011"},{"dataSource":"MDR","id":"10076581"},{"dataSource":"MEDCIN","id":"6045"},{"dataSource":"MSH","id":"D001795"},{"dataSource":"SNM","id":"P-Y107"},{"dataSource":"SNMI","id":"PA-00540"},{"dataSource":"SNOMEDCT_US","id":"46973005"}]}],"relations":[{"relationType":"ValueOfExamination","bidirectional":false,"source":"#/results/documents/0/entities/0","target":"#/results/documents/0/entities/1"}],"warnings":[]},{"id":"2","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1,"isNegated":false},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1,"isNegated":false}],"relations":[{"relationType":"DosageOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/0","target":"#/results/documents/1/entities/1"},{"relationType":"FrequencyOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/2","target":"#/results/documents/1/entities/1"}],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '97057600-b871-4b25-a989-d0b0c2c5cb24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:14 GMT'
]);
