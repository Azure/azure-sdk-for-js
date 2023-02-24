let nock = require('nock');

module.exports.hash = "01d44ba97ee6de8a0ab8fbca7d275da8";

module.exports.testInfo = {"uniqueName":{"share":"share167747745374704082","dir":"dir167747745477500426","file":"file167747745504602640"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745374704082')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:34 GMT',
  'ETag',
  '"0x8DB188785F0F102"',
  'x-ms-request-id',
  'e51cf6ae-601a-0004-3970-4a0ec4000000',
  'x-ms-client-request-id',
  '499995b7-68de-4c75-9ca0-729e488ed964',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745374704082/dir167747745477500426....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:35 GMT',
  'ETag',
  '"0x8DB1887861EDD1D"',
  'x-ms-request-id',
  'e51cf6b1-601a-0004-3a70-4a0ec4000000',
  'x-ms-client-request-id',
  '054c1038-afe7-4e03-8987-523e8921d497',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:35.2878365Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:35.2878365Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:35.2878365Z',
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
  'Mon, 27 Feb 2023 05:57:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745374704082/dir167747745477500426..../file167747745504602640....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:35 GMT',
  'ETag',
  '"0x8DB18878646FEC7"',
  'x-ms-request-id',
  'e51cf6b3-601a-0004-3b70-4a0ec4000000',
  'x-ms-client-request-id',
  'f083a5d2-22ec-46cf-a8b2-5c2bc05e7446',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:35.5508423Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:35.5508423Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:35.5508423Z',
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
  'Mon, 27 Feb 2023 05:57:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747745374704082/dir167747745477500426....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167747745374704082\" DirectoryPath=\"dir167747745477500426....\"><DirectoryId>13835128424026341376</DirectoryId><Entries><File><Name>file167747745504602640....</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>11</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e51cf6b4-601a-0004-3c70-4a0ec4000000',
  'x-ms-client-request-id',
  '426ad621-4ccd-4700-9847-45ef726ba480',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747745374704082')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6b5-601a-0004-3d70-4a0ec4000000',
  'x-ms-client-request-id',
  '7b7d8b99-2acb-420b-8505-8a8b74330e10',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:36 GMT'
]);
