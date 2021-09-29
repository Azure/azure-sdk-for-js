let nock = require('nock');

module.exports.hash = "7b6ab81851eb58d7d3f44dec3a2ccf39";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/documentModels/modelName163225990069002530')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  'b604f48f-0f9f-4cb8-a3ce-1ef920a31fbc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:32:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/modelName163225990069002530')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Resource not found.","innererror":{"code":"ModelNotFound","message":"The requested model was not found."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  '90269346-a134-49ee-bd08-b2c5610a966c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 21 Sep 2021 21:32:01 GMT'
]);
