let nock = require('nock');

module.exports.hash = "7b6ab81851eb58d7d3f44dec3a2ccf39";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/documentModels/modelName163337188938006462')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '609f8d3e-5cb4-4dc6-acfd-7644826064e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:25:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/modelName163337188938006462')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Resource not found.","innererror":{"code":"ModelNotFound","message":"The requested model was not found."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '0e6fb559-cd54-464a-9a59-a570b0832b0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:25:02 GMT'
]);
