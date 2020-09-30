let nock = require('nock');

module.exports.hash = "35241ca13b2f0a4e39ac34a5c3703e44";

module.exports.testInfo = {"uniqueName":{"container":"container159549714446502477","blob":"blob159549714476903821"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714446502477')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:03 GMT',
  'ETag',
  '"0x8D82EEC3C7D3E44"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd01901-a01e-0020-3bd5-603607000000',
  'x-ms-client-request-id',
  '47ba7d87-1be4-49d1-9e7d-729c83f34cea',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 09:39:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549714446502477/blob159549714476903821', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 09:39:03 GMT',
  'ETag',
  '"0x8D82EEC3CAACDC0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd0191b-a01e-0020-4cd5-603607000000',
  'x-ms-client-request-id',
  '8a480dc9-a495-462d-a8f9-376158b7f63d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T09:39:03.7911488Z',
  'Date',
  'Thu, 23 Jul 2020 09:39:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549714446502477')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bd0192d-a01e-0020-58d5-603607000000',
  'x-ms-client-request-id',
  'd1882594-78ea-4b35-9b06-2fdf08723138',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 09:39:03 GMT'
]);
