let nock = require('nock');

module.exports.hash = "6516b11d4c8e29c390eee6a2119d8ece";

module.exports.testInfo = {"uniqueName":{"container":"container163246920597009233","blob":"blob163246920731207476"},"newDate":{"now":"2021-09-24T07:40:05.969Z","tmr":"2021-09-24T07:40:05.970Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163246920597009233')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 07:40:07 GMT',
  'ETag',
  '"0x8D97F2E87E89231"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d96d4de-f01e-0030-3117-b1640d000000',
  'x-ms-client-request-id',
  '15f5fc95-e9f6-4ac2-a6d6-6f41b6790021',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 07:40:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163246920597009233/blob163246920731207476')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 07:40:07 GMT',
  'ETag',
  '"0x8D97F2E88266DC0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d96d51d-f01e-0030-5f17-b1640d000000',
  'x-ms-client-request-id',
  '432a83a5-e859-4c37-bbaf-20338afdddb5',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-version-id',
  '2021-09-24T07:40:07.9078848Z',
  'Date',
  'Fri, 24 Sep 2021 07:40:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163246920597009233')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d96d576-f01e-0030-2a17-b1640d000000',
  'x-ms-client-request-id',
  'e5e400a1-9c2c-44da-a91c-42e6cf820b16',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 07:40:07 GMT'
]);
