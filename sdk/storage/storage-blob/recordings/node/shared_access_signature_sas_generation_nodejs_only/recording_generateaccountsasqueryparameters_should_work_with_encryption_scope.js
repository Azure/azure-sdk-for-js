let nock = require('nock');

module.exports.hash = "e24ce7d35a24a3cd065ecba3dc42537a";

module.exports.testInfo = {"uniqueName":{"container":"container163230260562305195","appendblob":"appendblob163230260591806523"},"newDate":{"now":"2021-09-22T09:23:25.621Z","tmr":"2021-09-22T09:23:25.621Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260562305195')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:26 GMT',
  'ETag',
  '"0x8D97DAAA1CBD42D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a43fb-f01e-0052-7e93-afa62a000000',
  'x-ms-client-request-id',
  '9c54d2ca-6900-4802-b7d8-8715ae3db3b4',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260562305195/appendblob163230260591806523')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:26 GMT',
  'ETag',
  '"0x8D97DAAA1F66FA5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4441-f01e-0052-3993-afa62a000000',
  'x-ms-client-request-id',
  '56a900d9-93d0-4b2f-a99d-c10b05c60e5e',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-version-id',
  '2021-09-22T09:23:26.4830373Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230260562305195')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a447e-f01e-0052-6f93-afa62a000000',
  'x-ms-client-request-id',
  '3fb94b8e-cd3f-4426-996f-4c3dda1ab139',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:26 GMT'
]);
