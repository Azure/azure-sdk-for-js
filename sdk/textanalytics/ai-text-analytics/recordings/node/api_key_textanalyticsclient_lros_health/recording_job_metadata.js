let nock = require('nock');

module.exports.hash = "4b79eadddaad1235c0d80281d06ab707";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/a308d10c-2551-4aaf-b4ba-84c3c3f9e472',
  'x-envoy-upstream-service-time',
  '565',
  'apim-request-id',
  'a414688a-fe85-4af8-b99b-927c5dfae2c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 28 Dec 2020 20:12:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a308d10c-2551-4aaf-b4ba-84c3c3f9e472')
  .query(true)
  .reply(200, {"jobId":"a308d10c-2551-4aaf-b4ba-84c3c3f9e472","lastUpdateDateTime":"2020-12-28T20:12:51Z","createdDateTime":"2020-12-28T20:12:51Z","expirationDateTime":"2020-12-29T20:12:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '2041e529-43f4-45a9-9985-94ab6996bf6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 28 Dec 2020 20:12:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a308d10c-2551-4aaf-b4ba-84c3c3f9e472')
  .query(true)
  .reply(200, {"jobId":"a308d10c-2551-4aaf-b4ba-84c3c3f9e472","lastUpdateDateTime":"2020-12-28T20:12:51Z","createdDateTime":"2020-12-28T20:12:51Z","expirationDateTime":"2020-12-29T20:12:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '9723da1e-03d2-49a3-85cc-656195fc06a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 28 Dec 2020 20:12:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a308d10c-2551-4aaf-b4ba-84c3c3f9e472')
  .query(true)
  .reply(200, {"jobId":"a308d10c-2551-4aaf-b4ba-84c3c3f9e472","lastUpdateDateTime":"2020-12-28T20:12:51Z","createdDateTime":"2020-12-28T20:12:51Z","expirationDateTime":"2020-12-29T20:12:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'ee32c91f-320e-4b00-a73e-a4f95a8e5440',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 28 Dec 2020 20:12:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a308d10c-2551-4aaf-b4ba-84c3c3f9e472')
  .query(true)
  .reply(200, {"jobId":"a308d10c-2551-4aaf-b4ba-84c3c3f9e472","lastUpdateDateTime":"2020-12-28T20:12:55Z","createdDateTime":"2020-12-28T20:12:51Z","expirationDateTime":"2020-12-29T20:12:51Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":29,"length":4,"text":"high","category":"MeasurementValue","confidenceScore":0.93,"isNegated":false},{"offset":34,"length":14,"text":"blood pressure","category":"ExaminationName","confidenceScore":0.91,"isNegated":true,"links":[{"dataSource":"UMLS","id":"C0005824"},{"dataSource":"AOD","id":"0000007392"},{"dataSource":"CCC","id":"K33.1"},{"dataSource":"CHV","id":"0000002009"},{"dataSource":"ICNP","id":"10031996"},{"dataSource":"LCH_NW","id":"sh85015011"},{"dataSource":"MDR","id":"10076581"},{"dataSource":"MEDCIN","id":"6045"},{"dataSource":"MSH","id":"D001795"},{"dataSource":"SNM","id":"P-Y107"},{"dataSource":"SNMI","id":"PA-00540"},{"dataSource":"SNOMEDCT_US","id":"46973005"}]}],"relations":[{"relationType":"ValueOfExamination","bidirectional":false,"source":"#/results/documents/0/entities/0","target":"#/results/documents/0/entities/1"}],"warnings":[]},{"id":"2","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1,"isNegated":false},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1,"isNegated":false}],"relations":[{"relationType":"DosageOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/0","target":"#/results/documents/1/entities/1"},{"relationType":"FrequencyOfMedication","bidirectional":false,"source":"#/results/documents/1/entities/2","target":"#/results/documents/1/entities/1"}],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '3ff1e112-b64a-4b39-b842-ee501e93a82c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 28 Dec 2020 20:12:55 GMT'
]);
