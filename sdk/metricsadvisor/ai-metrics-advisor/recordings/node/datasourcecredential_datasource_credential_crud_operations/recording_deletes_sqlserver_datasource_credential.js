let nock = require('nock');

module.exports.hash = "62bf2de974cc718245b0129b75e1b5e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/2527beee-a546-4f61-b95a-e807d5c645a2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '32bdc9a9-90dd-47f1-97bf-2a4968577698',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '32bdc9a9-90dd-47f1-97bf-2a4968577698',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/2527beee-a546-4f61-b95a-e807d5c645a2')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7c87f489-e9b3-49a2-9c39-4699a9fb3dbe',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '7c87f489-e9b3-49a2-9c39-4699a9fb3dbe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:33 GMT'
]);
