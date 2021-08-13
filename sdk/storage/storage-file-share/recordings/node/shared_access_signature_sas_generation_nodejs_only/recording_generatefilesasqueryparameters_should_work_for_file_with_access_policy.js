let nock = require('nock');

module.exports.hash = "4456afa7cdbd9d330289a94a4c3895b9";

module.exports.testInfo = {"uniqueName":{"share":"share161069088802504463","dir":"dir161069088832403501","file":"file161069088862702767"},"newDate":{"now":"2021-01-15T06:08:08.025Z","tmr":"2021-01-15T06:08:08.025Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share161069088802504463')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:08:08 GMT',
  'ETag',
  '"0x8D8B91BEE013880"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59080b0b-501a-0063-7004-ebc806000000',
  'x-ms-client-request-id',
  '846fcb0d-e977-43bb-8f68-059da54cd553',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 06:08:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share161069088802504463/dir161069088832403501')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:08:08 GMT',
  'ETag',
  '"0x8D8B91BEE2FF006"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59080b2a-501a-0063-0d04-ebc806000000',
  'x-ms-client-request-id',
  'b7e2ea6f-c9e1-4071-8012-54aebdbf6041',
  'x-ms-version',
  '2020-04-08',
  'x-ms-file-change-time',
  '2021-01-15T06:08:08.4299782Z',
  'x-ms-file-last-write-time',
  '2021-01-15T06:08:08.4299782Z',
  'x-ms-file-creation-time',
  '2021-01-15T06:08:08.4299782Z',
  'x-ms-file-permission-key',
  '18253506462963126402*10775527834424002315',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 15 Jan 2021 06:08:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share161069088802504463/dir161069088832403501/file161069088862702767')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:08:08 GMT',
  'ETag',
  '"0x8D8B91BEE5DBEFC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59080b3f-501a-0063-2104-ebc806000000',
  'x-ms-client-request-id',
  'a0b58298-8fd1-4d7a-81de-3b63d16dd935',
  'x-ms-version',
  '2020-04-08',
  'x-ms-file-change-time',
  '2021-01-15T06:08:08.7301884Z',
  'x-ms-file-last-write-time',
  '2021-01-15T06:08:08.7301884Z',
  'x-ms-file-creation-time',
  '2021-01-15T06:08:08.7301884Z',
  'x-ms-file-permission-key',
  '4407534441384161157*10775527834424002315',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 15 Jan 2021 06:08:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share161069088802504463', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2021-01-15T06:03:08.0250000Z</Start><Expiry>2021-01-16T06:08:08.0250000Z</Expiry><Permission>rcwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:08:09 GMT',
  'ETag',
  '"0x8D8B91BEE8A8325"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59080b59-501a-0063-3a04-ebc806000000',
  'x-ms-client-request-id',
  'ab8928e9-ac60-43d4-8a66-3b7e3a40d1f5',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 06:08:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share161069088802504463/dir161069088832403501/file161069088862702767')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-original',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:08:08 GMT',
  'ETag',
  '"0x8D8B91BEE5DBEFC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5908123b-501a-0063-6704-ebc806000000',
  'x-ms-client-request-id',
  '5716d565-4204-47f6-96ba-c9ad60eabddc',
  'x-ms-version',
  '2020-04-08',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2021-01-15T06:08:08.7301884Z',
  'x-ms-file-last-write-time',
  '2021-01-15T06:08:08.7301884Z',
  'x-ms-file-creation-time',
  '2021-01-15T06:08:08.7301884Z',
  'x-ms-file-permission-key',
  '4407534441384161157*10775527834424002315',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Jan 2021 06:08:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share161069088802504463')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59081252-501a-0063-7b04-ebc806000000',
  'x-ms-client-request-id',
  '4c29c515-82c5-48fb-a130-ae1ea58ff5fd',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 06:08:39 GMT'
]);
