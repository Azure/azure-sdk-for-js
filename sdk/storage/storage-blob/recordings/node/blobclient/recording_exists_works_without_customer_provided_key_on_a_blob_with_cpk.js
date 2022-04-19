let nock = require('nock');

module.exports.hash = "2ee8bd8d959f767a011ddb409fcf8cd7";

module.exports.testInfo = {"uniqueName":{"container":"container164869749091905939","blob":"blob164869749273607912","blobCPK":"blobCPK164869749315009552"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164869749091905939')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 31 Mar 2022 03:31:32 GMT',
  'ETag',
  '"0x8DA12C6F3AC5C90"',
  'x-ms-request-id',
  '87010834-201e-0000-1faf-44e568000000',
  'x-ms-client-request-id',
  '4e4fe20d-f6d4-414c-8e76-f9171140bb73',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 31 Mar 2022 03:31:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164869749091905939/blob164869749273607912', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 31 Mar 2022 03:31:33 GMT',
  'ETag',
  '"0x8DA12C6F3F763D7"',
  'x-ms-request-id',
  '87010838-201e-0000-20af-44e568000000',
  'x-ms-client-request-id',
  '9fb9a08c-e6b2-4001-b69c-1cb0b76bf4c6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 31 Mar 2022 03:31:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164869749091905939/blobCPK164869749315009552', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 31 Mar 2022 03:31:33 GMT',
  'ETag',
  '"0x8DA12C6F423C921"',
  'x-ms-request-id',
  '87010839-201e-0000-21af-44e568000000',
  'x-ms-client-request-id',
  'deaea6d2-dc0f-4055-8a4e-ecdebb43685a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Thu, 31 Mar 2022 03:31:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container164869749091905939/blobCPK164869749315009552')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '8701083a-201e-0000-22af-44e568000000',
  'x-ms-client-request-id',
  '7021c631-b81f-4603-a273-9c6fa1247791',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 31 Mar 2022 03:31:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164869749091905939')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '8701083b-201e-0000-23af-44e568000000',
  'x-ms-client-request-id',
  '4cf5562e-05c6-439d-86aa-9f2babc4a1cb',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 31 Mar 2022 03:31:33 GMT'
]);
