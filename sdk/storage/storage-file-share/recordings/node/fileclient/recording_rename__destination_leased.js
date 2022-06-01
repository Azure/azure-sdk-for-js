let nock = require('nock');

module.exports.hash = "451b9aa0af089427e5a1c095d28b5732";

module.exports.testInfo = {"uniqueName":{"share":"share164033526630701548","dir":"dir164033526824606147","file":"file164033526859103701","sourcefile":"sourcefile164033526859500849","destfile":"destfile164033526885607741"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033526630701548')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:08 GMT',
  'ETag',
  '"0x8D9C6B9218DBF7F"',
  'x-ms-request-id',
  '7edfb549-701a-0008-7ea1-f8c247000000',
  'x-ms-client-request-id',
  '8bc28c9e-1fd0-4112-b5c3-805542d39634',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:41:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033526630701548/dir164033526824606147')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:08 GMT',
  'ETag',
  '"0x8D9C6B921C9F5AF"',
  'x-ms-request-id',
  '7edfb54c-701a-0008-7fa1-f8c247000000',
  'x-ms-client-request-id',
  'd4c35e90-15c5-4c34-ba38-58f7b7c5bd6b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:41:08.7769007Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:08.7769007Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:08.7769007Z',
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
  'Fri, 24 Dec 2021 08:41:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033526630701548/sourcefile164033526859500849')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:09 GMT',
  'ETag',
  '"0x8D9C6B921F32932"',
  'x-ms-request-id',
  '7edfb54e-701a-0008-80a1-f8c247000000',
  'x-ms-client-request-id',
  '4ac1d8e6-316a-4b4f-84ad-60513e2ace36',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:41:09.0469170Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:09.0469170Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:09.0469170Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 Dec 2021 08:41:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033526630701548/destfile164033526885607741')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:09 GMT',
  'ETag',
  '"0x8D9C6B9221928A0"',
  'x-ms-request-id',
  '7edfb550-701a-0008-02a1-f8c247000000',
  'x-ms-client-request-id',
  '16e51ec8-fe62-46ec-a267-3c1753472d76',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:41:09.2959392Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:09.2959392Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:09.2959392Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 Dec 2021 08:41:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033526630701548/destfile164033526885607741')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:09 GMT',
  'ETag',
  '"0x8D9C6B9221928A0"',
  'x-ms-request-id',
  '7edfb555-701a-0008-07a1-f8c247000000',
  'x-ms-client-request-id',
  '8b053796-c0b5-41bf-a3ba-ff5c2ddf91c7',
  'x-ms-version',
  '2021-04-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Fri, 24 Dec 2021 08:41:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033526630701548/destfile164033526885607741')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:09 GMT',
  'ETag',
  '"0x8D9C6B92269BAFC"',
  'x-ms-request-id',
  '7edfb55b-701a-0008-0da1-f8c247000000',
  'x-ms-client-request-id',
  'df522798-1681-4707-9224-d460da147ae6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:41:09.8239740Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:09.0469170Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:09.0469170Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 Dec 2021 08:41:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164033526630701548/destfile164033526885607741')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:41:09 GMT',
  'ETag',
  '"0x8D9C6B92269BAFC"',
  'x-ms-request-id',
  '7edfb55d-701a-0008-0fa2-f8c247000000',
  'x-ms-client-request-id',
  '4e96b53e-834c-4ae0-a226-c6d21a01c2cc',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2021-12-24T08:41:09.8239740Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:41:09.0469170Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:41:09.0469170Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 Dec 2021 08:41:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164033526630701548/sourcefile164033526859500849')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '7edfb55e-701a-0008-10a2-f8c247000000',
  'x-ms-client-request-id',
  'f78feddd-0428-4880-8ea8-496589857a49',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 Dec 2021 08:41:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164033526630701548')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '7edfb55f-701a-0008-11a2-f8c247000000',
  'x-ms-client-request-id',
  '44f059d0-929e-4533-b7f4-c7dafcb615a1',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:41:10 GMT'
]);
