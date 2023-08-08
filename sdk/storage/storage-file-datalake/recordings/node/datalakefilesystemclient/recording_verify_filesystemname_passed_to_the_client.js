let nock = require('nock');

module.exports.hash = "6790c02f30f01ae85d1a81e6b1451c41";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154751558505594"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751558505594')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:35 GMT',
  'ETag',
  '"0x8DB987EEF4512C2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c269f1-101e-002e-7367-caab16000000',
  'x-ms-client-request-id',
  '04ef9ebb-3527-4a3c-baed-0ee7e29c8a88',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751558505594')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26a00-101e-002e-7c67-caab16000000',
  'x-ms-client-request-id',
  '3926c696-d53e-4fa9-b054-1cbf42726b72',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:34 GMT'
]);
