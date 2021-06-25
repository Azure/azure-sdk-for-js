let nock = require('nock');

module.exports.hash = "95091b45dc61495bb4243ad632fd8fa2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/8eb5c88b-bdee-4e29-aa14-236de29da2b6',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '88eb3081-6d30-497f-b28d-3569da682494',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/8eb5c88b-bdee-4e29-aa14-236de29da2b6')
  .query(true)
  .reply(200, {"jobId":"8eb5c88b-bdee-4e29-aa14-236de29da2b6","lastUpdateDateTime":"2021-06-25T05:11:22Z","createdDateTime":"2021-06-25T05:11:22Z","expirationDateTime":"2021-06-26T05:11:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7800b289-8758-4b2a-975f-fb11226079d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/8eb5c88b-bdee-4e29-aa14-236de29da2b6')
  .query(true)
  .reply(200, {"jobId":"8eb5c88b-bdee-4e29-aa14-236de29da2b6","lastUpdateDateTime":"2021-06-25T05:11:22Z","createdDateTime":"2021-06-25T05:11:22Z","expirationDateTime":"2021-06-26T05:11:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c7d1ddee-0933-43cc-8427-4499dd112333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/8eb5c88b-bdee-4e29-aa14-236de29da2b6')
  .query(true)
  .reply(200, {"jobId":"8eb5c88b-bdee-4e29-aa14-236de29da2b6","lastUpdateDateTime":"2021-06-25T05:11:24Z","createdDateTime":"2021-06-25T05:11:22Z","expirationDateTime":"2021-06-26T05:11:22Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '53024212-d33a-4add-a50e-c3ba93f6b834',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/8eb5c88b-bdee-4e29-aa14-236de29da2b6')
  .query(true)
  .reply(200, {"jobId":"8eb5c88b-bdee-4e29-aa14-236de29da2b6","lastUpdateDateTime":"2021-06-25T05:11:24Z","createdDateTime":"2021-06-25T05:11:22Z","expirationDateTime":"2021-06-26T05:11:22Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '795175af-ea5f-44de-9a55-d1b06d953912',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:25 GMT'
]);
