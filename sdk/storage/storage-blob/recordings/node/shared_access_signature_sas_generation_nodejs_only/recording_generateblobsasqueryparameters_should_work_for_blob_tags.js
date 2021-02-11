let nock = require('nock');

module.exports.hash = "73a2c4fc997ae1e0a0357e5464a79f55";

module.exports.testInfo = {"uniqueName":{"container":"container159210828276003907","blob":"blob159210828277501390"},"newDate":{"now":"2020-06-14T04:18:02.760Z","tmr":"2020-06-14T04:18:02.760Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828276003907')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:02 GMT',
  'ETag',
  '"0x8D81019EE19831E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309e63-201e-003e-2602-42dadf000000',
  'x-ms-client-request-id',
  'd8d17bc9-6db3-4457-9a44-76789fbb59e6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:18:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828276003907/blob159210828277501390')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:02 GMT',
  'ETag',
  '"0x8D81019EE1C36AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309e70-201e-003e-3102-42dadf000000',
  'x-ms-client-request-id',
  '73cda227-0857-497c-a9ea-33caf4d5a3ed',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:18:02.7988417Z',
  'Date',
  'Sun, 14 Jun 2020 04:18:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828276003907/blob159210828277501390', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309e77-201e-003e-3802-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'fd59e5da-e888-409b-8225-a6e7ef9520f1',
  'Date',
  'Sun, 14 Jun 2020 04:18:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210828276003907/blob159210828277501390')
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
  'Sun, 14 Jun 2020 04:18:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EE1C36AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309e79-201e-003e-3a02-42dadf000000',
  'x-ms-client-request-id',
  '51729296-84c3-42e9-85b9-3f617edc8526',
  'x-ms-version',
  '2019-12-12',
  'x-ms-tag-count',
  '2',
  'x-ms-version-id',
  '2020-06-14T04:18:02.7988417Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:18:02 GMT',
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
  'Sun, 14 Jun 2020 04:18:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210828276003907')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309e7d-201e-003e-3e02-42dadf000000',
  'x-ms-client-request-id',
  '73e3d781-a8e4-4f55-8cf6-7a80f2c52cc5',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:18:01 GMT'
]);
