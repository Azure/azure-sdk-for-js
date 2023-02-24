let nock = require('nock');

module.exports.hash = "ae1c188833962e6937626c9bba53ed43";

module.exports.testInfo = {"uniqueName":{"share":"share167747746316209119","dir":"dir167747746341102912","file":"file167747746366808755"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746316209119')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:43 GMT',
  'ETag',
  '"0x8DB18878B1B486E"',
  'x-ms-request-id',
  'e51cf6e3-601a-0004-6470-4a0ec4000000',
  'x-ms-client-request-id',
  'ba8f6b03-b40c-4a3a-ad44-47b34b0a2024',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746316209119/dir167747746341102912....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:43 GMT',
  'ETag',
  '"0x8DB18878B42CF30"',
  'x-ms-request-id',
  'e51cf6e6-601a-0004-6570-4a0ec4000000',
  'x-ms-client-request-id',
  '35dadad3-afd4-448a-b027-786269045741',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:43.9120176Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:43.9120176Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:43.9120176Z',
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
  'Mon, 27 Feb 2023 05:57:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747746316209119/dir167747746341102912..../file167747746366808755....')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6e7-601a-0004-6670-4a0ec4000000',
  'x-ms-client-request-id',
  '73b9bf22-7a8d-434b-816e-13b5b446ba62',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746316209119/dir167747746341102912..../file167747746366808755....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:44 GMT',
  'ETag',
  '"0x8DB18878B8EA5CF"',
  'x-ms-request-id',
  'e51cf6e8-601a-0004-6770-4a0ec4000000',
  'x-ms-client-request-id',
  '94f28dd1-b615-4f43-98dd-091de582fd5a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:44.4090319Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:44.4090319Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:44.4090319Z',
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
  'Mon, 27 Feb 2023 05:57:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747746316209119/dir167747746341102912..../file167747746366808755....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:44 GMT',
  'ETag',
  '"0x8DB18878B8EA5CF"',
  'x-ms-request-id',
  'e51cf6ea-601a-0004-6870-4a0ec4000000',
  'x-ms-client-request-id',
  '1d8433f3-283d-4fe3-a882-b88040f3eb94',
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
  '2023-02-27T05:57:44.4090319Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:44.4090319Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:44.4090319Z',
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
  'Mon, 27 Feb 2023 05:57:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747746316209119')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6eb-601a-0004-6970-4a0ec4000000',
  'x-ms-client-request-id',
  '3842eb6a-f736-4622-aad3-49d638ea9f0d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:44 GMT'
]);
