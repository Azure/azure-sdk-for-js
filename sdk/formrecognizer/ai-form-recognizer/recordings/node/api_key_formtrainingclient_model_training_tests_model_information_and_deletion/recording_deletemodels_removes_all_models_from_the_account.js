let nock = require('nock');

module.exports.hash = "98aacaa3c4cd6e8a687856c9c25251f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/0b287dc6-1c73-4230-965c-83b10e298c57')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'b2d3f23a-6035-4418-9396-1abfa9989374',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '17eb9350-f4b2-4938-87c9-4151ad4c8745',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/80c13f16-6a24-4da5-bb0a-af2974dba817')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '638a2cd6-ccf0-4269-a616-cb89bb94080c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/058a6549-10d1-4d27-b964-c30016d783d8')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '28fdcb1c-dbe8-410e-9eeb-e7e968a8b57b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/49f3c146-8bae-417b-8474-97a56b6313f7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '6e537abc-16f2-46a9-9149-a146073fd70e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/59a48030-a88c-439b-bf3e-19c8446b77c9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '9e5e1156-ef36-4922-9524-6eadddf47a6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/59a48030-a88c-439b-bf3e-19c8446b77c9')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=59a48030-a88c-439b-bf3e-19c8446b77c9' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'f965fc8e-d9da-4cca-be0d-8b3e30bfdfb4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=e885bbd2-92c2-4d4a-8805-2ee9f3f1e55b' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '2a03cb61-c7a0-4441-b9c7-660e033b9fe9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/0b287dc6-1c73-4230-965c-83b10e298c57')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=0b287dc6-1c73-4230-965c-83b10e298c57' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '66b49a40-9cd9-4cae-af14-4306bb3576cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/80c13f16-6a24-4da5-bb0a-af2974dba817')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=80c13f16-6a24-4da5-bb0a-af2974dba817' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'a8fd3f80-6ba9-4bac-a423-190fd6860757',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/058a6549-10d1-4d27-b964-c30016d783d8')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=058a6549-10d1-4d27-b964-c30016d783d8' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'fee411db-87c2-4729-a7a9-e36713f4e76b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/49f3c146-8bae-417b-8474-97a56b6313f7')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=49f3c146-8bae-417b-8474-97a56b6313f7' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'd324c84e-436c-4ed7-b9a2-ae933eab7cdc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:28:23 GMT'
]);
