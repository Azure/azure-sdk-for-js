let nock = require('nock');

module.exports.hash = "5560f220a4da0efd626852c190c5617f";

module.exports.testInfo = {"uniqueName":{"share":"share163946896953103984","dir":"dir163946897051600260","file":"file163946897149708302","destfile":"destfile163946897149701447","sourcefile":"sourcefile163946897246903029"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946896953103984')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:50 GMT',
  'ETag',
  '"0x8D9BED81FD43A96"',
  'x-ms-request-id',
  '888d357b-a01a-0005-1dc0-f0f0c9000000',
  'x-ms-client-request-id',
  '3a025ece-bac2-4fe4-b66c-2eadde665e2c',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:50 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946896953103984/dir163946897051600260')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:51 GMT',
  'ETag',
  '"0x8D9BED8206B068B"',
  'x-ms-request-id',
  'b9e7f0d6-201a-0006-51c0-f003a9000000',
  'x-ms-client-request-id',
  'b95261bf-d8bb-49e9-84d8-0a6e773451f6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:51.5734155Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:51.5734155Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:51.5734155Z',
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
  'Tue, 14 Dec 2021 08:02:51 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946896953103984', {"permission":"O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:AI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)"})
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'bba569d0-201a-0000-2cc0-f0e568000000',
  'x-ms-client-request-id',
  'f7a70765-2ec4-4407-8bbe-2876aeb52060',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'Date',
  'Tue, 14 Dec 2021 08:02:52 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946896953103984/sourcefile163946897246903029')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:53 GMT',
  'ETag',
  '"0x8D9BED82194969E"',
  'x-ms-request-id',
  '61b4ef72-e01a-0001-7cc0-f01b65000000',
  'x-ms-client-request-id',
  '3f201b08-2d82-4e7e-b341-17b8776bd0ea',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:53.5235230Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:53.5235230Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:53.5235230Z',
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
  'Tue, 14 Dec 2021 08:02:53 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946896953103984/destfile163946897149701447')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:54 GMT',
  'ETag',
  '"0x8D9BED8222A9757"',
  'x-ms-request-id',
  '88abb436-601a-0004-77c0-f00ec4000000',
  'x-ms-client-request-id',
  '746c3d0f-3806-43ea-8530-d4f806e7dd52',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:54.5065815Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'x-ms-file-attributes',
  'ReadOnly | Hidden',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:54 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946896953103984/destfile163946897149701447')
  .reply(200, "", [
  'Content-Length',
  '2048',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:54 GMT',
  'ETag',
  '"0x8D9BED8222A9757"',
  'x-ms-request-id',
  '55e37f11-701a-0008-74c1-f0c247000000',
  'x-ms-client-request-id',
  '4eaf3d3e-b76d-48fa-8fa8-3af6c6b25789',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:02:54.5065815Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'x-ms-file-attributes',
  'ReadOnly | Hidden',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 14 Dec 2021 08:02:55 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946896953103984/sourcefile163946897246903029')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'bba569d3-201a-0000-2dc1-f0e568000000',
  'x-ms-client-request-id',
  '47a10111-02c6-4f7c-8158-f22b3a6ae60c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 14 Dec 2021 08:02:56 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163946896953103984')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb43a-601a-0004-78c1-f00ec4000000',
  'x-ms-client-request-id',
  '5adec5ff-7823-4975-837b-77319c5f80e4',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:57 GMT',
  'Connection',
  'close'
]);
