let nock = require('nock');

module.exports.hash = "d98981d9bf602515a1154516d3524da1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/60cae6ef-62d5-4dcf-9491-c0a0884b64e4')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '872f85e3-fc07-4f52-99ef-8888dd9f6bea',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '872f85e3-fc07-4f52-99ef-8888dd9f6bea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/60cae6ef-62d5-4dcf-9491-c0a0884b64e4')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '701db66f-7c72-45b5-9561-c9bdfe10078c',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '701db66f-7c72-45b5-9561-c9bdfe10078c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:33 GMT'
]);
