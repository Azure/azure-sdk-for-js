let nock = require('nock');

module.exports.hash = "fe137671c07488aa656306f842584e89";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"1","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/e731ff1b-e6fd-4934-8439-64e05a652529',
  'x-envoy-upstream-service-time',
  '1330',
  'apim-request-id',
  'd16ffbac-1275-4ae1-ac38-07c8b6fc96f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:27:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e731ff1b-e6fd-4934-8439-64e05a652529')
  .query(true)
  .reply(200, {"jobId":"e731ff1b-e6fd-4934-8439-64e05a652529","lastUpdateDateTime":"2020-12-30T17:27:48Z","createdDateTime":"2020-12-30T17:27:47Z","expirationDateTime":"2020-12-31T17:27:47Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '362',
  'apim-request-id',
  '2a7da9e0-6cb6-451d-9963-25840af3a2aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:27:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e731ff1b-e6fd-4934-8439-64e05a652529')
  .query(true)
  .reply(200, {"jobId":"e731ff1b-e6fd-4934-8439-64e05a652529","lastUpdateDateTime":"2020-12-30T17:27:48Z","createdDateTime":"2020-12-30T17:27:47Z","expirationDateTime":"2020-12-31T17:27:47Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  '31bd19be-10ef-41ba-be96-1353dcc68a79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:27:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e731ff1b-e6fd-4934-8439-64e05a652529')
  .query(true)
  .reply(200, {"jobId":"e731ff1b-e6fd-4934-8439-64e05a652529","lastUpdateDateTime":"2020-12-30T17:27:48Z","createdDateTime":"2020-12-30T17:27:47Z","expirationDateTime":"2020-12-31T17:27:47Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '619',
  'apim-request-id',
  'da6f3d72-8c18-4f6d-941b-165a19062f71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:27:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e731ff1b-e6fd-4934-8439-64e05a652529')
  .query(true)
  .reply(200, {"jobId":"e731ff1b-e6fd-4934-8439-64e05a652529","lastUpdateDateTime":"2020-12-30T17:27:48Z","createdDateTime":"2020-12-30T17:27:47Z","expirationDateTime":"2020-12-31T17:27:47Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  '2f82724c-e79c-4a29-bee3-b33293106cf1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:27:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e731ff1b-e6fd-4934-8439-64e05a652529')
  .query(true)
  .reply(200, {"jobId":"e731ff1b-e6fd-4934-8439-64e05a652529","lastUpdateDateTime":"2020-12-30T17:27:56Z","createdDateTime":"2020-12-30T17:27:47Z","expirationDateTime":"2020-12-31T17:27:47Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '6e1a1341-1337-4308-a90d-e920606ee0c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:27:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e731ff1b-e6fd-4934-8439-64e05a652529')
  .query(true)
  .reply(200, {"jobId":"e731ff1b-e6fd-4934-8439-64e05a652529","lastUpdateDateTime":"2020-12-30T17:27:56Z","createdDateTime":"2020-12-30T17:27:47Z","expirationDateTime":"2020-12-31T17:27:47Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":4,"text":"high","category":"MeasurementValue","confidenceScore":0.93,"isNegated":false},{"offset":34,"length":14,"text":"blood pressure","category":"ExaminationName","confidenceScore":0.91,"isNegated":true,"links":[{"dataSource":"UMLS","id":"C0005824"},{"dataSource":"AOD","id":"0000007392"},{"dataSource":"CCC","id":"K33.1"},{"dataSource":"CHV","id":"0000002009"},{"dataSource":"ICNP","id":"10031996"},{"dataSource":"LCH_NW","id":"sh85015011"},{"dataSource":"MDR","id":"10076581"},{"dataSource":"MEDCIN","id":"6045"},{"dataSource":"MSH","id":"D001795"},{"dataSource":"SNM","id":"P-Y107"},{"dataSource":"SNMI","id":"PA-00540"},{"dataSource":"SNOMEDCT_US","id":"46973005"}]}],"relations":[{"relationType":"ValueOfExamination","bidirectional":false,"source":"#/results/documents/0/entities/0","target":"#/results/documents/0/entities/1"}],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1,"isNegated":false},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1,"isNegated":false}],"relations":[{"relationType":"DosageOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/0","target":"#/results/documents/1/entities/1"},{"relationType":"FrequencyOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/2","target":"#/results/documents/1/entities/1"}],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  '229124e5-4933-41f2-b7ac-bd36ccb4187c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:27:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e731ff1b-e6fd-4934-8439-64e05a652529')
  .query(true)
  .reply(200, {"jobId":"e731ff1b-e6fd-4934-8439-64e05a652529","lastUpdateDateTime":"2020-12-30T17:27:56Z","createdDateTime":"2020-12-30T17:27:47Z","expirationDateTime":"2020-12-31T17:27:47Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":4,"text":"high","category":"MeasurementValue","confidenceScore":0.93,"isNegated":false},{"offset":34,"length":14,"text":"blood pressure","category":"ExaminationName","confidenceScore":0.91,"isNegated":true,"links":[{"dataSource":"UMLS","id":"C0005824"},{"dataSource":"AOD","id":"0000007392"},{"dataSource":"CCC","id":"K33.1"},{"dataSource":"CHV","id":"0000002009"},{"dataSource":"ICNP","id":"10031996"},{"dataSource":"LCH_NW","id":"sh85015011"},{"dataSource":"MDR","id":"10076581"},{"dataSource":"MEDCIN","id":"6045"},{"dataSource":"MSH","id":"D001795"},{"dataSource":"SNM","id":"P-Y107"},{"dataSource":"SNMI","id":"PA-00540"},{"dataSource":"SNOMEDCT_US","id":"46973005"}]}],"relations":[{"relationType":"ValueOfExamination","bidirectional":false,"source":"#/results/documents/0/entities/0","target":"#/results/documents/0/entities/1"}],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1,"isNegated":false},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1,"isNegated":false}],"relations":[{"relationType":"DosageOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/0","target":"#/results/documents/1/entities/1"},{"relationType":"FrequencyOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/2","target":"#/results/documents/1/entities/1"}],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '234',
  'apim-request-id',
  'f48ee9dc-5443-43b8-aa29-06bf9d0d7d7b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:27:59 GMT'
]);
