let nock = require('nock');

module.exports.hash = "7b6ab81851eb58d7d3f44dec3a2ccf39";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/documentModels/modelName164331090870809307')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '35617d31-5876-485e-b8a4-da9a3dc33bde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:24 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/modelName164331090870809307')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Resource not found.","innererror":{"code":"ModelNotFound","message":"The requested model was not found."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'd45d6840-90d7-42ae-bb50-aee07632ff69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 19:15:24 GMT'
]);
