let nock = require('nock');

module.exports.hash = "ae1c188833962e6937626c9bba53ed43";

module.exports.testInfo = {"uniqueName":{"share":"share167747853579006755","dir":"dir167747853604600668","file":"file167747853631804497"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853579006755')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:36 GMT',
  'ETag',
  '"0x8DB188A0A739DA6"',
  'x-ms-request-id',
  '1775e975-e01a-0001-7272-4a1b65000000',
  'x-ms-client-request-id',
  '31ec74e3-d246-4bb7-bf2a-3375d7e6d143',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853579006755/dir167747853604600668....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:36 GMT',
  'ETag',
  '"0x8DB188A0A9C1152"',
  'x-ms-request-id',
  '1775e977-e01a-0001-7372-4a1b65000000',
  'x-ms-client-request-id',
  '334e5342-41a6-4bb0-a872-078f9dca71a4',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:36.5610834Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:36.5610834Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:36.5610834Z',
  'x-ms-file-permission-key',
  '13895902193744473398*5510371786133343095',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747853579006755/dir167747853604600668..../file167747853631804497....')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e978-e01a-0001-7472-4a1b65000000',
  'x-ms-client-request-id',
  '71f06853-d572-4279-a7e8-14727e10bae9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853579006755/dir167747853604600668..../file167747853631804497....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:37 GMT',
  'ETag',
  '"0x8DB188A0AEDB44C"',
  'x-ms-request-id',
  '1775e979-e01a-0001-7572-4a1b65000000',
  'x-ms-client-request-id',
  '9bda14a3-23f7-4fa6-ad7b-2d8b1af3cd1a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:37.0960972Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:37.0960972Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:37.0960972Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747853579006755/dir167747853604600668..../file167747853631804497....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:37 GMT',
  'ETag',
  '"0x8DB188A0AEDB44C"',
  'x-ms-request-id',
  '1775e97a-e01a-0001-7672-4a1b65000000',
  'x-ms-client-request-id',
  '40c93436-ff4c-4af1-9eff-b5da37ad92bf',
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
  '2023-02-27T06:15:37.0960972Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:37.0960972Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:37.0960972Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
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
  'Mon, 27 Feb 2023 06:15:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747853579006755')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e97b-e01a-0001-7772-4a1b65000000',
  'x-ms-client-request-id',
  'ac671dca-d3ac-4cc9-aeb7-61b7d5341b5d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:37 GMT'
]);
