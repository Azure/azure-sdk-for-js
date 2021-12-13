let nock = require('nock');

module.exports.hash = "4684079f293e8f82853556ca73851c21";

module.exports.testInfo = {"uniqueName":{"share":"share163946892446406223","dir":"dir163946892651008238","file":"file163946892752600706","sourcefile":"sourcefile163946892752704041","destfile":"destfile163946892851208977"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946892446406223')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:06 GMT',
  'ETag',
  '"0x8D9BED8059223EB"',
  'x-ms-request-id',
  'bba5699f-201a-0000-1bc0-f0e568000000',
  'x-ms-client-request-id',
  '82a1c86d-6647-4445-aba5-82971b29aa71',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:06 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946892446406223/dir163946892651008238')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:07 GMT',
  'ETag',
  '"0x8D9BED80633F6A6"',
  'x-ms-request-id',
  '39e28cbf-a01a-0003-07c0-f01608000000',
  'x-ms-client-request-id',
  'dfa77593-a621-4243-a837-ac413bad15d2',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:07.5917990Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:07.5917990Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:07.5917990Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:07 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946892446406223/sourcefile163946892752704041')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:08 GMT',
  'ETag',
  '"0x8D9BED806CBCC40"',
  'x-ms-request-id',
  'bba569a2-201a-0000-1cc0-f0e568000000',
  'x-ms-client-request-id',
  'e94d38a0-6af7-48c9-8be2-0ad8f4ebbbef',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:08.5868608Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:08.5868608Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:08.5868608Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:07 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946892446406223/destfile163946892851208977')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:09 GMT',
  'ETag',
  '"0x8D9BED80765769E"',
  'x-ms-request-id',
  '61b4ef3d-e01a-0001-6cc0-f01b65000000',
  'x-ms-client-request-id',
  '815dcb65-6de5-47fd-9bf8-5c23bf916238',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:09.5939230Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:09.5939230Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:09.5939230Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:09 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946892446406223/destfile163946892851208977')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:10 GMT',
  'ETag',
  '"0x8D9BED807FD4C21"',
  'x-ms-request-id',
  'b9e7f0a8-201a-0006-44c0-f003a9000000',
  'x-ms-client-request-id',
  '28e10395-a224-4620-b4cd-005cb12c90cf',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:10.5889825Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:08.5868608Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:08.5868608Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:10 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946892446406223/destfile163946892851208977')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:10 GMT',
  'ETag',
  '"0x8D9BED807FD4C21"',
  'x-ms-request-id',
  'b9e7f0ac-201a-0006-45c0-f003a9000000',
  'x-ms-client-request-id',
  'cd2d096e-6fcf-4c4e-8a04-4684c2ed928a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:02:10.5889825Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:08.5868608Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:08.5868608Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 14 Dec 2021 08:02:10 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946892446406223/sourcefile163946892752704041')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'f82c8a08-601a-0002-6ec0-f0e805000000',
  'x-ms-client-request-id',
  '76341396-4ed1-4a04-8d7b-05fe01998096',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 14 Dec 2021 08:02:12 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163946892446406223')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '55e37ee1-701a-0008-65c0-f0c247000000',
  'x-ms-client-request-id',
  'f124c39d-6166-4100-92d7-439e8c4eb707',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:12 GMT',
  'Connection',
  'close'
]);
