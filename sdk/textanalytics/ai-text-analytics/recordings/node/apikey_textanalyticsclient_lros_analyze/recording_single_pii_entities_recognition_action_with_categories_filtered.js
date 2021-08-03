let nock = require('nock');

module.exports.hash = "ebe1e864b29f1a1984cdd09711789b18";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987 and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","piiCategories":["USSocialSecurityNumber"],"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/4c6b4839-1b39-4672-a82b-605d7e6f5b85',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '9d596671-68dd-4fb7-9082-0c119e1e8391',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4c6b4839-1b39-4672-a82b-605d7e6f5b85')
  .query(true)
  .reply(200, {"jobId":"4c6b4839-1b39-4672-a82b-605d7e6f5b85","lastUpdateDateTime":"2021-08-03T03:11:09Z","createdDateTime":"2021-08-03T03:11:09Z","expirationDateTime":"2021-08-04T03:11:09Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '29642acc-432e-4357-902e-ed15d9dffe87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4c6b4839-1b39-4672-a82b-605d7e6f5b85')
  .query(true)
  .reply(200, {"jobId":"4c6b4839-1b39-4672-a82b-605d7e6f5b85","lastUpdateDateTime":"2021-08-03T03:11:09Z","createdDateTime":"2021-08-03T03:11:09Z","expirationDateTime":"2021-08-04T03:11:09Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '1c18a188-c56f-4415-a877-9577ca134c19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4c6b4839-1b39-4672-a82b-605d7e6f5b85')
  .query(true)
  .reply(200, {"jobId":"4c6b4839-1b39-4672-a82b-605d7e6f5b85","lastUpdateDateTime":"2021-08-03T03:11:11Z","createdDateTime":"2021-08-03T03:11:09Z","expirationDateTime":"2021-08-04T03:11:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '354896fb-fa81-4166-8ab1-4c7b0c6ea6a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:11 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4c6b4839-1b39-4672-a82b-605d7e6f5b85')
  .query(true)
  .reply(200, {"jobId":"4c6b4839-1b39-4672-a82b-605d7e6f5b85","lastUpdateDateTime":"2021-08-03T03:11:11Z","createdDateTime":"2021-08-03T03:11:09Z","expirationDateTime":"2021-08-04T03:11:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '38e1d379-48d7-4031-8802-127b148a3ded',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:13 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4c6b4839-1b39-4672-a82b-605d7e6f5b85')
  .query(true)
  .reply(200, {"jobId":"4c6b4839-1b39-4672-a82b-605d7e6f5b85","lastUpdateDateTime":"2021-08-03T03:11:11Z","createdDateTime":"2021-08-03T03:11:09Z","expirationDateTime":"2021-08-04T03:11:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'cedd76d4-1460-4d99-9af2-f4eda59002ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:15 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4c6b4839-1b39-4672-a82b-605d7e6f5b85')
  .query(true)
  .reply(200, {"jobId":"4c6b4839-1b39-4672-a82b-605d7e6f5b85","lastUpdateDateTime":"2021-08-03T03:11:17Z","createdDateTime":"2021-08-03T03:11:09Z","expirationDateTime":"2021-08-04T03:11:09Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:11:17.3236386Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  'fc28fd72-ca61-4438-80f2-77ca23933be1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:17 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4c6b4839-1b39-4672-a82b-605d7e6f5b85')
  .query(true)
  .reply(200, {"jobId":"4c6b4839-1b39-4672-a82b-605d7e6f5b85","lastUpdateDateTime":"2021-08-03T03:11:17Z","createdDateTime":"2021-08-03T03:11:09Z","expirationDateTime":"2021-08-04T03:11:09Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:11:17.3236386Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '4781b470-d06d-48b7-b159-9684d961ff2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:17 GMT'
]);
