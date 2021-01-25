let nock = require('nock');

module.exports.hash = "98aacaa3c4cd6e8a687856c9c25251f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/29f8f2c1-3491-401c-a1ff-817823b2c29f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '235cdc19-2221-484b-89ad-1a0c688656d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/31da96b2-53f5-471f-b5b8-33492a79f624')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  '2589f3f1-2953-4615-8b38-d8db42d5b82f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/86ed5888-ce24-4634-b11a-1ec82455ca0b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '325f4c40-ee63-477a-b920-ae34b50db236',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '1f1d71d1-e10f-478f-8e5a-7fe4c090e4ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/ccfa295d-de40-44bb-8166-039a37b2d8ab')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '07d1e5e2-bb1d-4ffc-b94e-bd10e721c6ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/3b91c785-a219-4848-bdf7-4bbc3842c364')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'ab5171bd-bf0a-4837-8d3b-3ba88014a1f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/29f8f2c1-3491-401c-a1ff-817823b2c29f')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=29f8f2c1-3491-401c-a1ff-817823b2c29f' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '06ce408c-f0b6-414f-bf22-c63cb88744d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=7e6bf6db-cabe-4230-9ca7-31f6dabaf4d9' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'bc4832f2-e118-494d-bb23-75f41df8673d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/3b91c785-a219-4848-bdf7-4bbc3842c364')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=3b91c785-a219-4848-bdf7-4bbc3842c364' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '309f2215-b908-44d9-be5f-d39861e7a6d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/86ed5888-ce24-4634-b11a-1ec82455ca0b')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=86ed5888-ce24-4634-b11a-1ec82455ca0b' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '98a8c176-00a6-4e72-bb8c-0b389ed6f4c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/31da96b2-53f5-471f-b5b8-33492a79f624')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=31da96b2-53f5-471f-b5b8-33492a79f624' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '6e63e572-0ea4-475a-9d9a-760a5cb307e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/ccfa295d-de40-44bb-8166-039a37b2d8ab')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=ccfa295d-de40-44bb-8166-039a37b2d8ab' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '886b5d53-11e4-4bdd-b0d1-b4c534b4b3f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:12:32 GMT'
]);
