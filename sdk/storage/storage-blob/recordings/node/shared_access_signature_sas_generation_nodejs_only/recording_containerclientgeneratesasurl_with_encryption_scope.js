let nock = require('nock');

module.exports.hash = "2c77794b4db2877151a620d456f8f634";

module.exports.testInfo = {"uniqueName":{"container":"container163245589255102722","appendblob":"appendblob163245589372805661"},"newDate":{"now":"2021-09-24T03:58:12.550Z","tmr":"2021-09-24T03:58:12.551Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163245589255102722')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 03:58:13 GMT',
  'ETag',
  '"0x8D97F0F885441C2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea24206c-e01e-0095-1cf8-b03277000000',
  'x-ms-client-request-id',
  'f1860808-a96e-4ea2-9359-f8d9a5c54a8c',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 03:58:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163245589255102722/appendblob163245589372805661')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 03:58:14 GMT',
  'ETag',
  '"0x8D97F0F8881492F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea2420b4-e01e-0095-54f8-b03277000000',
  'x-ms-client-request-id',
  '7fce4e66-6bde-44a0-9a05-926f04c7e3b2',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-version-id',
  '2021-09-24T03:58:14.1047087Z',
  'Date',
  'Fri, 24 Sep 2021 03:58:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163245589255102722')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea2420ec-e01e-0095-80f8-b03277000000',
  'x-ms-client-request-id',
  'c7a0fcc3-e238-4b0c-98a0-4cb57fdd275f',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 03:58:13 GMT'
]);
