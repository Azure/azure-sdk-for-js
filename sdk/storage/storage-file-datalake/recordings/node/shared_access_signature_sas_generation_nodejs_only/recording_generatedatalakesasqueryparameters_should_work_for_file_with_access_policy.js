let nock = require('nock');

module.exports.hash = "5a49665901d4c84e2f3503371afe0a81";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem161068977513004637","file":"file161068977659501721"},"newDate":{"now":"2021-01-15T05:49:35.129Z","tmr":"2021-01-15T05:49:35.130Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161068977513004637')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 05:49:36 GMT',
  'ETag',
  '"0x8D8B91957582CB3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '283f6fb7-801e-001e-1f02-eb9f73000000',
  'x-ms-client-request-id',
  '2b960111-1a66-46b5-b993-f261fb0bdc3f',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 05:49:36 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161068977513004637/file161068977659501721')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 15 Jan 2021 05:49:37 GMT',
  'ETag',
  '"0x8D8B919583E1CBA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50c4e27e-301f-0007-5602-ebb31b000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '4d4f3ce9-66e9-4951-b3d7-160e94199439',
  'Date',
  'Fri, 15 Jan 2021 05:49:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem161068977513004637', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2021-01-15T05:39:35.1290000Z</Start><Expiry>2021-01-25T05:49:35.1300000Z</Expiry><Permission>racwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 05:49:39 GMT',
  'ETag',
  '"0x8D8B91958F93DF0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a64cf8db-901e-0023-7002-eb2a55000000',
  'x-ms-client-request-id',
  '8228734b-7747-4a9b-aad4-b63a6c571fff',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 05:49:39 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem161068977513004637/file161068977659501721')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 15 Jan 2021 05:49:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8B919583E1CBA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4482131d-501e-00b6-4b02-eb4b66000000',
  'x-ms-client-request-id',
  '69013d0c-f3f9-4f4e-9284-4eec2aee8925',
  'x-ms-version',
  '2020-04-08',
  'x-ms-creation-time',
  'Fri, 15 Jan 2021 05:49:37 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Jan 2021 05:49:40 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem161068977513004637')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93c90ced-901e-004e-2502-eb807b000000',
  'x-ms-client-request-id',
  'a9250a72-3fb9-4fe5-937b-dcb6aea0130a',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 05:49:41 GMT',
  'Connection',
  'close'
]);
