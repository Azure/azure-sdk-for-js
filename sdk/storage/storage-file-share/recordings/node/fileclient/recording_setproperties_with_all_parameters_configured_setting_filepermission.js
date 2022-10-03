let nock = require('nock');

module.exports.hash = "bb03f3ce553c0aea036aaeb2696cdb26";

module.exports.testInfo = {"uniqueName":{"share":"share164249168805400416","dir":"dir164249168831206417","file":"file164249168858207502"},"newDate":{"now":"2022-01-18T07:41:28.839Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249168805400416')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 07:41:28 GMT',
  'ETag',
  '"0x8D9DA55F02029E9"',
  'x-ms-request-id',
  '4b9edc83-a01a-0005-1b3e-0cf0c9000000',
  'x-ms-client-request-id',
  '345bd974-0d84-4525-93d3-8ffe3dd17fcf',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Tue, 18 Jan 2022 07:41:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249168805400416/dir164249168831206417')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 07:41:28 GMT',
  'ETag',
  '"0x8D9DA55F049774F"',
  'x-ms-request-id',
  '4b9edc85-a01a-0005-1c3e-0cf0c9000000',
  'x-ms-client-request-id',
  '5ef1ec60-490c-4174-ba4b-32dad6d92a4e',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-18T07:41:28.8057679Z',
  'x-ms-file-last-write-time',
  '2022-01-18T07:41:28.8057679Z',
  'x-ms-file-creation-time',
  '2022-01-18T07:41:28.8057679Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 18 Jan 2022 07:41:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164249168805400416')
  .query(true)
  .reply(200, {"permission":"O:BAG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;BA)(A;OICIIO;GA;;;CO)"}, [
  'Content-Length',
  '149',
  'x-ms-request-id',
  '4b9edc86-a01a-0005-1d3e-0cf0c9000000',
  'x-ms-client-request-id',
  '429681eb-e468-4f42-8e55-f3884acb088a',
  'x-ms-version',
  '2021-06-08',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 18 Jan 2022 07:41:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249168805400416/dir164249168831206417/file164249168858207502')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 07:41:29 GMT',
  'ETag',
  '"0x8D9DA55F0999380"',
  'x-ms-request-id',
  '4b9edc87-a01a-0005-1e3e-0cf0c9000000',
  'x-ms-client-request-id',
  'b9853c3a-3cca-42fc-a2ff-fe127bf0557d',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-18T07:41:29.3307776Z',
  'x-ms-file-last-write-time',
  '2022-01-18T07:41:29.3307776Z',
  'x-ms-file-creation-time',
  '2022-01-18T07:41:29.3307776Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 18 Jan 2022 07:41:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249168805400416/dir164249168831206417/file164249168858207502')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 07:41:29 GMT',
  'ETag',
  '"0x8D9DA55F0C2787A"',
  'x-ms-request-id',
  '4b9edc88-a01a-0005-1f3e-0cf0c9000000',
  'x-ms-client-request-id',
  'be1ba506-26b8-4c85-b3f8-27434f738f5c',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-18T07:41:28.8390000Z',
  'x-ms-file-last-write-time',
  '2022-01-18T07:41:28.8390000Z',
  'x-ms-file-creation-time',
  '2022-01-18T07:41:28.8390000Z',
  'x-ms-file-permission-key',
  '11010447213779069920*3117928199373521617',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Archive | Temporary | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 18 Jan 2022 07:41:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164249168805400416/dir164249168831206417/file164249168858207502')
  .reply(200, [], [
  'Cache-Control',
  'fileCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'fileContentType',
  'Content-Encoding',
  'fileContentEncoding',
  'Content-Language',
  'fileContentLanguage',
  'Last-Modified',
  'Tue, 18 Jan 2022 07:41:29 GMT',
  'ETag',
  '"0x8D9DA55F0C2787A"',
  'x-ms-request-id',
  '4b9edc89-a01a-0005-203e-0cf0c9000000',
  'x-ms-client-request-id',
  '49c1e8e3-bb55-4f3d-819b-302f909cb514',
  'x-ms-version',
  '2021-06-08',
  'Content-Disposition',
  'fileContentDisposition',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-01-18T07:41:28.8390000Z',
  'x-ms-file-last-write-time',
  '2022-01-18T07:41:28.8390000Z',
  'x-ms-file-creation-time',
  '2022-01-18T07:41:28.8390000Z',
  'x-ms-file-permission-key',
  '11010447213779069920*3117928199373521617',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Archive | Temporary | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,Content-Disposition,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 18 Jan 2022 07:41:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164249168805400416')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '4b9edc8a-a01a-0005-213e-0cf0c9000000',
  'x-ms-client-request-id',
  '5b232e2b-71a4-4723-9e65-f90262b2783e',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Tue, 18 Jan 2022 07:41:30 GMT'
]);
