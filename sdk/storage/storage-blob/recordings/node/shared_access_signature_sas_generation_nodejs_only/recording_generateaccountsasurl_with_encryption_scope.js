let nock = require('nock');

module.exports.hash = "05b93a01e5408f81165679b4f355d213";

module.exports.testInfo = {"uniqueName":{"container":"container163245467813808766","appendblob":"appendblob163245467930201211"},"newDate":{"now":"2021-09-24T03:37:58.137Z","tmr":"2021-09-24T03:37:58.138Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163245467813808766')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 03:37:59 GMT',
  'ETag',
  '"0x8D97F0CB4778032"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e247f504-501e-004b-4cf5-b02691000000',
  'x-ms-client-request-id',
  'd7c2050c-b7b9-4ee6-9040-f37f5b77d2ce',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 03:37:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163245467813808766/appendblob163245467930201211')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 03:37:59 GMT',
  'ETag',
  '"0x8D97F0CB4A6B39A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e247f550-501e-004b-7ff5-b02691000000',
  'x-ms-client-request-id',
  'dfe96c09-16ef-408b-991c-a3d1b0ebf8d6',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-version-id',
  '2021-09-24T03:37:59.6794778Z',
  'Date',
  'Fri, 24 Sep 2021 03:37:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163245467813808766')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e247f591-501e-004b-33f5-b02691000000',
  'x-ms-client-request-id',
  'b0e8588e-efaf-4190-93c2-56f2cbb7ed00',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 03:37:59 GMT'
]);
