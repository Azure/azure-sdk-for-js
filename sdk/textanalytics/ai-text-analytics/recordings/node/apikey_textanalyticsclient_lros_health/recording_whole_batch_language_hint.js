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
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/b25e31c8-de8c-4dc5-b73a-442e2e39ab9f',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  'bb34467b-ee87-4ff7-a85e-01faa2c693ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b25e31c8-de8c-4dc5-b73a-442e2e39ab9f')
  .query(true)
  .reply(200, {"jobId":"b25e31c8-de8c-4dc5-b73a-442e2e39ab9f","lastUpdateDateTime":"2021-06-25T05:10:50Z","createdDateTime":"2021-06-25T05:10:50Z","expirationDateTime":"2021-06-26T05:10:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '35500594-532f-4a9b-b819-7e82bbbc8ad8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b25e31c8-de8c-4dc5-b73a-442e2e39ab9f')
  .query(true)
  .reply(200, {"jobId":"b25e31c8-de8c-4dc5-b73a-442e2e39ab9f","lastUpdateDateTime":"2021-06-25T05:10:50Z","createdDateTime":"2021-06-25T05:10:50Z","expirationDateTime":"2021-06-26T05:10:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '5c291d73-da8d-4f9d-a342-03d3e23c231d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b25e31c8-de8c-4dc5-b73a-442e2e39ab9f')
  .query(true)
  .reply(200, {"jobId":"b25e31c8-de8c-4dc5-b73a-442e2e39ab9f","lastUpdateDateTime":"2021-06-25T05:10:50Z","createdDateTime":"2021-06-25T05:10:50Z","expirationDateTime":"2021-06-26T05:10:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '06d73e7c-a14f-43fd-9c3e-a850d7308a51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b25e31c8-de8c-4dc5-b73a-442e2e39ab9f')
  .query(true)
  .reply(200, {"jobId":"b25e31c8-de8c-4dc5-b73a-442e2e39ab9f","lastUpdateDateTime":"2021-06-25T05:10:54Z","createdDateTime":"2021-06-25T05:10:50Z","expirationDateTime":"2021-06-26T05:10:50Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'a192f54f-7c9c-46fe-bf9a-d40b97caffc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b25e31c8-de8c-4dc5-b73a-442e2e39ab9f')
  .query(true)
  .reply(200, {"jobId":"b25e31c8-de8c-4dc5-b73a-442e2e39ab9f","lastUpdateDateTime":"2021-06-25T05:10:54Z","createdDateTime":"2021-06-25T05:10:50Z","expirationDateTime":"2021-06-26T05:10:50Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '495276f6-c706-43da-b1bf-476278962af9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:54 GMT'
]);
