let nock = require('nock');

module.exports.hash = "da39bba3c06162c654185f7c8c2c23d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/d082f519-d49c-48f8-824c-8579952c6270')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6955d817-c369-4c12-9900-df4618dde699',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '6955d817-c369-4c12-9900-df4618dde699',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/d082f519-d49c-48f8-824c-8579952c6270')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd146ad3e-52bd-43d8-87e0-b4a11ce07ea2',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'd146ad3e-52bd-43d8-87e0-b4a11ce07ea2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:33 GMT'
]);
