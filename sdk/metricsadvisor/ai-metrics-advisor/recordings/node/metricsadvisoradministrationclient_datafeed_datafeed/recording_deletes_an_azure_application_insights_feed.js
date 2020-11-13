let nock = require('nock');

module.exports.hash = "029380c24e3327f7b4b4c25a1429439e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3e631af1-018a-4056-9111-41d39a934f35')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b181ab03-8743-4695-b6b1-7b62b08f449a',
  'x-envoy-upstream-service-time',
  '342',
  'apim-request-id',
  'b181ab03-8743-4695-b6b1-7b62b08f449a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3e631af1-018a-4056-9111-41d39a934f35')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ad74bd35-e50a-43ca-be58-4acf97dbb5bb',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'ad74bd35-e50a-43ca-be58-4acf97dbb5bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:37 GMT'
]);
