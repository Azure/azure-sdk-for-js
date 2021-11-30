let nock = require('nock');

module.exports.hash = "5e57524070a1097a4629feb2ca2d4fbc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/b7dd4cd0-bc84-48b5-9467-0aae0f34382b',
  'x-envoy-upstream-service-time',
  '457',
  'apim-request-id',
  'a30c0028-a676-418c-93fa-4d56151db688',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b7dd4cd0-bc84-48b5-9467-0aae0f34382b')
  .query(true)
  .reply(200, {"jobId":"b7dd4cd0-bc84-48b5-9467-0aae0f34382b","lastUpdateDateTime":"2021-10-23T00:37:49Z","createdDateTime":"2021-10-23T00:37:48Z","expirationDateTime":"2021-10-24T00:37:48Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'df1c8f17-80b6-44e6-9ba2-27d75f239de8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b7dd4cd0-bc84-48b5-9467-0aae0f34382b')
  .query(true)
  .reply(200, {"jobId":"b7dd4cd0-bc84-48b5-9467-0aae0f34382b","lastUpdateDateTime":"2021-10-23T00:37:49Z","createdDateTime":"2021-10-23T00:37:48Z","expirationDateTime":"2021-10-24T00:37:48Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '3e75b10c-e3e1-44ef-a7c6-be92ffa3b1a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b7dd4cd0-bc84-48b5-9467-0aae0f34382b')
  .query(true)
  .reply(200, {"jobId":"b7dd4cd0-bc84-48b5-9467-0aae0f34382b","lastUpdateDateTime":"2021-10-23T00:37:51Z","createdDateTime":"2021-10-23T00:37:48Z","expirationDateTime":"2021-10-24T00:37:48Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:37:51.0280911Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '26ab3993-0c03-4d60-99c4-31fb80240ee7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/b7dd4cd0-bc84-48b5-9467-0aae0f34382b')
  .query(true)
  .reply(200, {"jobId":"b7dd4cd0-bc84-48b5-9467-0aae0f34382b","lastUpdateDateTime":"2021-10-23T00:37:51Z","createdDateTime":"2021-10-23T00:37:48Z","expirationDateTime":"2021-10-24T00:37:48Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:37:51.0280911Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '6e6c8db9-cecb-4c3a-965e-5b9dec3dd8e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:51 GMT'
]);
