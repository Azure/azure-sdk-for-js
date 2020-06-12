let nock = require('nock');

module.exports.hash = "a198f8f80adb2ea3371ca8aa91911b96";

module.exports.testInfo = {"uniqueName":{"container":"container159196232864304483","blob":"blob159196233040509276"},"newDate":{"now":"2020-06-12T11:45:28.642Z","tmr":"2020-06-12T11:45:28.643Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159196232864304483')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 11:45:29 GMT',
  'ETag',
  '"0x8D80EC61AE9AB90"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '245c1d65-601e-0010-71ae-4088c8000000',
  'x-ms-client-request-id',
  'd2cc23c7-3103-4469-bb9a-69d84ed388af',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 11:45:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159196232864304483/blob159196233040509276')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 11:45:29 GMT',
  'ETag',
  '"0x8D80EC61B4A8D28"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '245c1df2-601e-0010-67ae-4088c8000000',
  'x-ms-client-request-id',
  '30db7470-ae44-4c7d-b923-a6bdc8413ed0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T11:45:29.7109288Z',
  'Date',
  'Fri, 12 Jun 2020 11:45:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159196232864304483/blob159196233040509276', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '245c1e3b-601e-0010-22ae-4088c8000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '07cce673-d889-4ec9-8a69-c138f79158e2',
  'Date',
  'Fri, 12 Jun 2020 11:45:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159196232864304483/blob159196233040509276')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Fri, 12 Jun 2020 11:45:29 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D80EC61B4A8D28"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '245c1e7d-601e-0010-57ae-4088c8000000',
  'x-ms-client-request-id',
  'd1326ca3-0a11-43a7-acb2-28ad3c84f676',
  'x-ms-version',
  '2019-12-12',
  'x-ms-tag-count',
  '2',
  'x-ms-version-id',
  '2020-06-12T11:45:29.7109288Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Fri, 12 Jun 2020 11:45:29 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Fri, 12 Jun 2020 11:45:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159196232864304483')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '245c1ecf-601e-0010-20ae-4088c8000000',
  'x-ms-client-request-id',
  '98f1bc47-30bc-4f19-a464-8472ec8555c0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 11:45:30 GMT'
]);
