let nock = require('nock');

module.exports.hash = "70ebb48b8c690c3a54b627eeb3ac0ee6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/08e62ce1-26c9-437c-989c-d4de96aabbaa',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  'c20ef2ce-77b4-4029-ac7d-8da0fe783da6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/08e62ce1-26c9-437c-989c-d4de96aabbaa')
  .query(true)
  .reply(200, {"jobId":"08e62ce1-26c9-437c-989c-d4de96aabbaa","lastUpdateDateTime":"2021-08-03T22:38:09Z","createdDateTime":"2021-08-03T22:38:09Z","expirationDateTime":"2021-08-04T22:38:09Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '86891b29-86f1-443e-8279-66abdd40852c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/08e62ce1-26c9-437c-989c-d4de96aabbaa')
  .query(true)
  .reply(200, {"jobId":"08e62ce1-26c9-437c-989c-d4de96aabbaa","lastUpdateDateTime":"2021-08-03T22:38:09Z","createdDateTime":"2021-08-03T22:38:09Z","expirationDateTime":"2021-08-04T22:38:09Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c9fee7c9-a21b-4d7e-bc29-12be8d4e7048',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/08e62ce1-26c9-437c-989c-d4de96aabbaa')
  .query(true)
  .reply(200, {"jobId":"08e62ce1-26c9-437c-989c-d4de96aabbaa","lastUpdateDateTime":"2021-08-03T22:38:09Z","createdDateTime":"2021-08-03T22:38:09Z","expirationDateTime":"2021-08-04T22:38:09Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '450228fb-b8f2-44b9-a92b-706a33b4be35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/08e62ce1-26c9-437c-989c-d4de96aabbaa')
  .query(true)
  .reply(200, {"jobId":"08e62ce1-26c9-437c-989c-d4de96aabbaa","lastUpdateDateTime":"2021-08-03T22:38:11Z","createdDateTime":"2021-08-03T22:38:09Z","expirationDateTime":"2021-08-04T22:38:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'a37988a0-58a3-4f8b-9749-9fd8e7c056ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/08e62ce1-26c9-437c-989c-d4de96aabbaa')
  .query(true)
  .reply(200, {"jobId":"08e62ce1-26c9-437c-989c-d4de96aabbaa","lastUpdateDateTime":"2021-08-03T22:38:11Z","createdDateTime":"2021-08-03T22:38:09Z","expirationDateTime":"2021-08-04T22:38:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2b2131ac-ae4e-46eb-a250-b7f490c14ad6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/08e62ce1-26c9-437c-989c-d4de96aabbaa')
  .query(true)
  .reply(200, {"jobId":"08e62ce1-26c9-437c-989c-d4de96aabbaa","lastUpdateDateTime":"2021-08-03T22:38:17Z","createdDateTime":"2021-08-03T22:38:09Z","expirationDateTime":"2021-08-04T22:38:09Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:38:17.2921206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '9d4b6156-703d-46c6-b2f5-50be3013502e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/08e62ce1-26c9-437c-989c-d4de96aabbaa')
  .query(true)
  .reply(200, {"jobId":"08e62ce1-26c9-437c-989c-d4de96aabbaa","lastUpdateDateTime":"2021-08-03T22:38:17Z","createdDateTime":"2021-08-03T22:38:09Z","expirationDateTime":"2021-08-04T22:38:09Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:38:17.2921206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  '62d663c3-f158-4514-ae50-f204e4408d21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:17 GMT'
]);
