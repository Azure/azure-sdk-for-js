let nock = require('nock');

module.exports.hash = "f3924ffbb542416858b2a5df9d0271fe";

module.exports.testInfo = {"uniqueName":{"container":"container159213484138100238","blob":"blob159213484151806013"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159213484138100238')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 11:40:41 GMT',
  'ETag',
  '"0x8D81057C45530AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9238049-101e-0035-4940-4221b4000000',
  'x-ms-client-request-id',
  'b3ef4b4f-91af-441c-b988-d4bf78557d3c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 11:40:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159213484138100238/blob159213484151806013', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 11:40:41 GMT',
  'ETag',
  '"0x8D81057C45A85DD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f923806b-101e-0035-6940-4221b4000000',
  'x-ms-client-request-id',
  '987cdf1d-40cf-45b2-84f5-171498aba9b8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T11:40:41.5391197Z',
  'Date',
  'Sun, 14 Jun 2020 11:40:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159213484138100238/blob159213484151806013')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sun, 14 Jun 2020 11:40:41 GMT',
  'ETag',
  '"0x8D81057C45D1E66"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9238078-101e-0035-7640-4221b4000000',
  'x-ms-client-request-id',
  '1913e0ce-7397-4b06-9f05-3d51e44d4614',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T11:40:41.5571318Z',
  'Date',
  'Sun, 14 Jun 2020 11:40:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159213484138100238')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9238084-101e-0035-0240-4221b4000000',
  'x-ms-client-request-id',
  '36f90171-99e9-4689-93c6-76b66fd5c18d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 11:40:41 GMT'
]);
