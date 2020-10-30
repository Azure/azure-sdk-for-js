let nock = require('nock');

module.exports.hash = "98aacaa3c4cd6e8a687856c9c25251f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/efb62dab-214a-4b00-8557-f1b122d6f2a7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'fb47c2e9-e771-43e0-8c4f-4b068e5e9b75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/1421a7b8-5a9a-4abf-933b-ce1116368b6c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '1ed6b686-5cd5-435d-a91a-fa67471a48ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/a38f86af-e110-4a09-ac49-c484ef0c5a26')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'bd88f2b2-f2c2-4f27-a2b9-ffa40b9269e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/a3e4b77b-d241-4435-9517-5d2e2dd24970')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  'e115ae4b-28c6-46f0-aaa3-44dbfa469ebc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/6d1555f6-8b26-465b-bd9f-1b987188d359')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '7e76aa23-e6b7-4cb8-a6ee-d79c6bb0e7bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/8bfe3706-55fd-48d4-b3cb-b63621e19e38')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '07688687-5196-47c9-bcb0-9bc05385924b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/1421a7b8-5a9a-4abf-933b-ce1116368b6c')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=1421a7b8-5a9a-4abf-933b-ce1116368b6c' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '6038dca3-769c-441a-922e-37ac5219bda9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a38f86af-e110-4a09-ac49-c484ef0c5a26')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=a38f86af-e110-4a09-ac49-c484ef0c5a26' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '582f3820-ebcc-4696-9a2c-5015c0f32f98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/8bfe3706-55fd-48d4-b3cb-b63621e19e38')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=8bfe3706-55fd-48d4-b3cb-b63621e19e38' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '9a71a00e-b382-4a04-8e40-4ebec9bf9397',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a3e4b77b-d241-4435-9517-5d2e2dd24970')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=a3e4b77b-d241-4435-9517-5d2e2dd24970' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '2890638c-e95c-40da-be1e-d49082aeea14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/efb62dab-214a-4b00-8557-f1b122d6f2a7')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=efb62dab-214a-4b00-8557-f1b122d6f2a7' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '7977fa08-46b2-4da6-bbab-bc4c5a6e79a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/6d1555f6-8b26-465b-bd9f-1b987188d359')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=6d1555f6-8b26-465b-bd9f-1b987188d359' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '4793bdab-d2ee-4d44-84fb-bca82e48e061',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:36:46 GMT'
]);
