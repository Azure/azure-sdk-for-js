let nock = require('nock');

module.exports.hash = "4f56b0f66598dab226d5c3fc0a2cd157";

module.exports.testInfo = {"uniqueName":{"container":"container163230260648001738","appendblob":"appendblob163230260675304082"},"newDate":{"now":"2021-09-22T09:23:26.479Z","tmr":"2021-09-22T09:23:26.480Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260648001738')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:27 GMT',
  'ETag',
  '"0x8D97DAAA24B03A3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a44b5-f01e-0052-1e93-afa62a000000',
  'x-ms-client-request-id',
  'a23f18e8-068b-441a-bbb8-213e329d4c74',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260648001738/appendblob163230260675304082')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:27 GMT',
  'ETag',
  '"0x8D97DAAA2759F42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a44ff-f01e-0052-5b93-afa62a000000',
  'x-ms-client-request-id',
  'd368464c-8a1e-4f7f-b569-ec770a4e158f',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-version-id',
  '2021-09-22T09:23:27.3165634Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230260648001738')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a454e-f01e-0052-2193-afa62a000000',
  'x-ms-client-request-id',
  'c43adba1-e0c9-4225-ab86-719896633ed6',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:27 GMT'
]);
