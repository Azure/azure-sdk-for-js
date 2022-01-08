let nock = require('nock');

module.exports.hash = "536383fbbe259a2e561915c459a152c3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/c2338a32-2941-4718-8eac-468cc77ee2a5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'fa59ef35-bf61-4efc-8547-0210cbfac2cc',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  'fa59ef35-bf61-4efc-8547-0210cbfac2cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/c2338a32-2941-4718-8eac-468cc77ee2a5')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: f6d34324-0ac3-4aa5-927b-51dabb004725"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f6d34324-0ac3-4aa5-927b-51dabb004725',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'f6d34324-0ac3-4aa5-927b-51dabb004725',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:03 GMT'
]);
