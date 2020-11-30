let nock = require('nock');

module.exports.hash = "748aae975ad43d35ef133cb69554336a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/2f6fda6b-8e54-45df-8482-ca6ccc0ac194',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'dca3ae16-c038-4ad5-a24b-e635431f9c19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/2f6fda6b-8e54-45df-8482-ca6ccc0ac194')
  .query(true)
  .reply(200, {"jobId":"2f6fda6b-8e54-45df-8482-ca6ccc0ac194","lastUpdateDateTime":"2020-11-20T00:13:24Z","createdDateTime":"2020-11-20T00:13:23Z","expirationDateTime":"2020-11-21T00:13:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd50d4f75-ff8c-4d98-90ff-89d3b24bbd40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/2f6fda6b-8e54-45df-8482-ca6ccc0ac194')
  .query(true)
  .reply(200, {"jobId":"2f6fda6b-8e54-45df-8482-ca6ccc0ac194","lastUpdateDateTime":"2020-11-20T00:13:24Z","createdDateTime":"2020-11-20T00:13:23Z","expirationDateTime":"2020-11-21T00:13:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '59eaa7ee-b87d-43e3-a4ac-f053b6b35121',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/2f6fda6b-8e54-45df-8482-ca6ccc0ac194')
  .query(true)
  .reply(200, {"jobId":"2f6fda6b-8e54-45df-8482-ca6ccc0ac194","lastUpdateDateTime":"2020-11-20T00:13:24Z","createdDateTime":"2020-11-20T00:13:23Z","expirationDateTime":"2020-11-21T00:13:23Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '4652895e-28e6-4e6d-a3a3-338a8b07dc36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/2f6fda6b-8e54-45df-8482-ca6ccc0ac194')
  .query(true)
  .reply(200, {"jobId":"2f6fda6b-8e54-45df-8482-ca6ccc0ac194","lastUpdateDateTime":"2020-11-20T00:13:24Z","createdDateTime":"2020-11-20T00:13:23Z","expirationDateTime":"2020-11-21T00:13:23Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '0b321ac6-89ea-446f-8019-1704c71c34f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:25 GMT'
]);
