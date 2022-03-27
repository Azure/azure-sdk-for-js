let nock = require('nock');

module.exports.hash = "20cfa026d636992bf7956f69c5dacd66";

module.exports.testInfo = {"uniqueName":{"share":"share164847055210203017","dir":"dir164847055321605765","file":"file164847055348902999"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847055210203017')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:29:13 GMT',
  'ETag',
  '"0x8DA10B69139C9CC"',
  'x-ms-request-id',
  'cc51748f-601a-0004-6d9f-420ec4000000',
  'x-ms-client-request-id',
  '99835a26-f722-4603-8b79-61cf660cec2b',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 28 Mar 2022 12:29:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847055210203017/dir164847055321605765')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:29:13 GMT',
  'ETag',
  '"0x8DA10B69169B498"',
  'x-ms-request-id',
  'cc517492-601a-0004-6e9f-420ec4000000',
  'x-ms-client-request-id',
  'be7fcbcb-9056-4daf-93e5-069fa19e0345',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-03-28T12:29:13.6062616Z',
  'x-ms-file-last-write-time',
  '2022-03-28T12:29:13.6062616Z',
  'x-ms-file-creation-time',
  '2022-03-28T12:29:13.6062616Z',
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
  'Mon, 28 Mar 2022 12:29:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847055210203017/dir164847055321605765/file164847055348902999')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:29:13 GMT',
  'ETag',
  '"0x8DA10B69192C08F"',
  'x-ms-request-id',
  'cc517494-601a-0004-6f9f-420ec4000000',
  'x-ms-client-request-id',
  'e9fe0347-6b29-4d9b-9559-74d9f422e958',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-03-28T12:29:13.8752655Z',
  'x-ms-file-last-write-time',
  '2022-03-28T12:29:13.8752655Z',
  'x-ms-file-creation-time',
  '2022-03-28T12:29:13.8752655Z',
  'x-ms-file-permission-key',
  '8782974441151326443*11228742651815927693',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 12:29:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164847055210203017/dir164847055321605765/file164847055348902999')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:29:13 GMT',
  'ETag',
  '"0x8DA10B69192C08F"',
  'x-ms-request-id',
  'cc517495-601a-0004-709f-420ec4000000',
  'x-ms-client-request-id',
  'f8a60ab0-9d78-4fe0-ba97-6e381c6d74e5',
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
  '2022-03-28T12:29:13.8752655Z',
  'x-ms-file-last-write-time',
  '2022-03-28T12:29:13.8752655Z',
  'x-ms-file-creation-time',
  '2022-03-28T12:29:13.8752655Z',
  'x-ms-file-permission-key',
  '8782974441151326443*11228742651815927693',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Mar 2022 12:29:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164847055210203017/dir164847055321605765/file164847055348902999')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:29:14 GMT',
  'ETag',
  '"0x8DA10B691E12F07"',
  'x-ms-request-id',
  'cc517496-601a-0004-719f-420ec4000000',
  'x-ms-client-request-id',
  '6c82ea97-9f39-4b80-91a9-eec0d80e9cbf',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2019-10-25T14:48:00.0000000Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '8782974441151326443*11228742651815927693',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Archive | Temporary | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Mar 2022 12:29:13 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164847055210203017/dir164847055321605765/file164847055348902999')
  .reply(200, "", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 28 Mar 2022 12:29:14 GMT',
  'ETag',
  '"0x8DA10B691E12F07"',
  'x-ms-request-id',
  'cc517497-601a-0004-729f-420ec4000000',
  'x-ms-client-request-id',
  'acf6f5d3-7908-4abd-9d0c-a95f8ed21745',
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
  '2019-10-25T14:48:00.0000000Z',
  'x-ms-file-last-write-time',
  '2019-10-15T14:48:00.0000000Z',
  'x-ms-file-creation-time',
  '2019-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '8782974441151326443*11228742651815927693',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Archive | Temporary | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Mar 2022 12:29:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164847055210203017')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'cc517498-601a-0004-739f-420ec4000000',
  'x-ms-client-request-id',
  '39eb6cee-74e5-43a3-ab03-33e353535ed1',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 28 Mar 2022 12:29:14 GMT'
]);
