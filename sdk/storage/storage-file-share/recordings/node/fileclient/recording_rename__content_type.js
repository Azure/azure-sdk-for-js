let nock = require('nock');

module.exports.hash = "0c4c4a853dc5a67bccc786c52a88279e";

module.exports.testInfo = {"uniqueName":{"share":"share164847196832304856","dir":"dir164847197010601340","file":"file164847197041603847","destfile":"destfile164847197042006954","sourcefile":"sourcefile164847197042001221"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847196832304856')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:52:50 GMT',
  'ETag',
  '"0x8DA10B9DDC2BDEF"',
  'x-ms-request-id',
  '30e30984-e01a-0007-6da2-42fda4000000',
  'x-ms-client-request-id',
  'd55ea458-0bc1-4470-ada2-f81024481088',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 28 Mar 2022 12:52:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847196832304856/dir164847197010601340')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:52:50 GMT',
  'ETag',
  '"0x8DA10B9DDF7A14C"',
  'x-ms-request-id',
  '30e30987-e01a-0007-6ea2-42fda4000000',
  'x-ms-client-request-id',
  'b0d0b3e5-40c7-428c-b33b-68c20b3234dd',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-03-28T12:52:50.5334092Z',
  'x-ms-file-last-write-time',
  '2022-03-28T12:52:50.5334092Z',
  'x-ms-file-creation-time',
  '2022-03-28T12:52:50.5334092Z',
  'x-ms-file-permission-key',
  '1690096059463891404*11228742651815927693',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 12:52:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847196832304856/sourcefile164847197042001221')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:52:50 GMT',
  'ETag',
  '"0x8DA10B9DE20D45A"',
  'x-ms-request-id',
  '30e30989-e01a-0007-6fa2-42fda4000000',
  'x-ms-client-request-id',
  '4bfae4a2-8245-41da-a91b-4f8a8c3e7f48',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-03-28T12:52:50.8034138Z',
  'x-ms-file-last-write-time',
  '2022-03-28T12:52:50.8034138Z',
  'x-ms-file-creation-time',
  '2022-03-28T12:52:50.8034138Z',
  'x-ms-file-permission-key',
  '8782974441151326443*11228742651815927693',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 12:52:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847196832304856/destfile164847197042006954')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:52:51 GMT',
  'ETag',
  '"0x8DA10B9DE50E567"',
  'x-ms-request-id',
  '30e3098a-e01a-0007-70a2-42fda4000000',
  'x-ms-client-request-id',
  '6d65a8a7-6041-4c59-9e88-cbd83cc3edaf',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-03-28T12:52:51.1184231Z',
  'x-ms-file-last-write-time',
  '2022-03-28T12:52:50.8034138Z',
  'x-ms-file-creation-time',
  '2022-03-28T12:52:50.8034138Z',
  'x-ms-file-permission-key',
  '8782974441151326443*11228742651815927693',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 12:52:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164847196832304856/destfile164847197042006954')
  .reply(200, "", [
  'Content-Length',
  '2048',
  'Content-Type',
  'contenttype/subtype',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:52:51 GMT',
  'ETag',
  '"0x8DA10B9DE50E567"',
  'x-ms-request-id',
  '30e3098b-e01a-0007-71a2-42fda4000000',
  'x-ms-client-request-id',
  '358a94ce-28d4-44cf-91e0-35e1b976bd50',
  'x-ms-version',
  '2021-06-08',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-03-28T12:52:51.1184231Z',
  'x-ms-file-last-write-time',
  '2022-03-28T12:52:50.8034138Z',
  'x-ms-file-creation-time',
  '2022-03-28T12:52:50.8034138Z',
  'x-ms-file-permission-key',
  '8782974441151326443*11228742651815927693',
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
  'Mon, 28 Mar 2022 12:52:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164847196832304856/sourcefile164847197042001221')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '30e3098c-e01a-0007-72a2-42fda4000000',
  'x-ms-client-request-id',
  'f82f72a0-92d1-48eb-9167-f958ee72ae5a',
  'x-ms-version',
  '2021-06-08',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Mar 2022 12:52:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164847196832304856')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '30e3098d-e01a-0007-73a2-42fda4000000',
  'x-ms-client-request-id',
  'bb3fdbd6-bbdd-4bb4-ad0f-9b2f50f2fffb',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 28 Mar 2022 12:52:51 GMT'
]);
