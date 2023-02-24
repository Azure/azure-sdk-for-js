let nock = require('nock');

module.exports.hash = "dee8356b84d2671d15c67bb369a22640";

module.exports.testInfo = {"uniqueName":{"share":"share167749056426304471","dir":"dir167749056456002215","file":"file167749056486005324"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056426304471')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:04 GMT',
  'ETag',
  '"0x8DB18A60BE9582C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb38b-101a-0070-328e-4a9c5e000000',
  'x-ms-client-request-id',
  'e04090b3-6019-4ad7-9c20-f8579a627d7c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056426304471/dir167749056456002215')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:04 GMT',
  'ETag',
  '"0x8DB18A60C1798F3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb38d-101a-0070-338e-4a9c5e000000',
  'x-ms-client-request-id',
  'c7029a91-4ee1-4f0a-ae67-11b1b1cd6e8c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:04.9567987Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:04.9567987Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:04.9567987Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056426304471/dir167749056456002215/file167749056486005324')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:05 GMT',
  'ETag',
  '"0x8DB18A60C4531F9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb38e-101a-0070-348e-4a9c5e000000',
  'x-ms-client-request-id',
  'fe426995-e826-4d3d-bb59-e39b01fb74b7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:05.2556281Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:05.2556281Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:05.2556281Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056426304471/dir167749056456002215/file167749056486005324')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:05 GMT',
  'ETag',
  '"0x8DB18A60C72CAEE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb394-101a-0070-368e-4a9c5e000000',
  'x-ms-client-request-id',
  '281de34c-38b5-4a0e-a2df-93470687d0a8',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:05.5544558Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:05.5544558Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:05.5544558Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056426304471/dir167749056456002215/file167749056486005324', "Hello World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:05 GMT',
  'ETag',
  '"0x8DB18A60CA1001A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb396-101a-0070-378e-4a9c5e000000',
  'x-ms-client-request-id',
  '4e72f621-d761-4be5-a8d6-3242ef15d9c2',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:05.8572826Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749056426304471/dir167749056456002215/file167749056486005324')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB18A60CA1001A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb397-101a-0070-388e-4a9c5e000000',
  'x-ms-client-request-id',
  'da053379-8241-417d-8ad5-444599de03db',
  'x-ms-version',
  '2022-11-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T09:36:05.8572826Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:05.8572826Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:05.5544558Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749056426304471')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb398-101a-0070-398e-4a9c5e000000',
  'x-ms-client-request-id',
  '01e4287c-1cb5-4195-81f1-c5b1fe309e61',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:06 GMT'
]);
