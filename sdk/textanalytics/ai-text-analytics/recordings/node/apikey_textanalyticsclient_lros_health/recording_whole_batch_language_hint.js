let nock = require('nock');

module.exports.hash = "1fb1a57acc331f867912cae0ed39dc23";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/fc94279f-12a1-4543-a465-586ab372438f',
  'x-envoy-upstream-service-time',
  '201',
  'apim-request-id',
  '74b09a27-ddeb-414b-afb1-b7996d342cfe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/fc94279f-12a1-4543-a465-586ab372438f')
  .query(true)
  .reply(200, {"jobId":"fc94279f-12a1-4543-a465-586ab372438f","lastUpdateDateTime":"2021-06-25T19:56:37Z","createdDateTime":"2021-06-25T19:56:37Z","expirationDateTime":"2021-06-26T19:56:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bcd7c48f-9d18-4408-88d9-35657464d3c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/fc94279f-12a1-4543-a465-586ab372438f')
  .query(true)
  .reply(200, {"jobId":"fc94279f-12a1-4543-a465-586ab372438f","lastUpdateDateTime":"2021-06-25T19:56:37Z","createdDateTime":"2021-06-25T19:56:37Z","expirationDateTime":"2021-06-26T19:56:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e7712c70-6c60-4f00-80b2-9ac6f04ae59a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/fc94279f-12a1-4543-a465-586ab372438f')
  .query(true)
  .reply(200, {"jobId":"fc94279f-12a1-4543-a465-586ab372438f","lastUpdateDateTime":"2021-06-25T19:56:39Z","createdDateTime":"2021-06-25T19:56:37Z","expirationDateTime":"2021-06-26T19:56:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '35095389-51e5-4e44-93aa-e12d5fd3f971',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/fc94279f-12a1-4543-a465-586ab372438f')
  .query(true)
  .reply(200, {"jobId":"fc94279f-12a1-4543-a465-586ab372438f","lastUpdateDateTime":"2021-06-25T19:56:39Z","createdDateTime":"2021-06-25T19:56:37Z","expirationDateTime":"2021-06-26T19:56:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '7846cf46-2d7a-4ec6-8030-f70f6d73cbf2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:39 GMT'
]);
