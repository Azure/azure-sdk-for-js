let nock = require('nock');

module.exports.hash = "1350c307152e08822f9aa14d56c42293";

module.exports.testInfo = {"uniqueName":{"share":"share167747748957401985","dir":"dir167747748982505077","file":"file167747749008001524"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748957401985')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:10 GMT',
  'ETag',
  '"0x8DB18879AD953BC"',
  'x-ms-request-id',
  'e51cf76c-601a-0004-4770-4a0ec4000000',
  'x-ms-client-request-id',
  '0c9afff6-1978-4742-a2e3-17f4e50bba3e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748957401985/dir167747748982505077....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:10 GMT',
  'ETag',
  '"0x8DB18879B0158FD"',
  'x-ms-request-id',
  'e51cf76e-601a-0004-4870-4a0ec4000000',
  'x-ms-client-request-id',
  '97ba945d-3129-4e5e-b306-9a752db96cfd',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:10.3265533Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:10.3265533Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:10.3265533Z',
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
  'Mon, 27 Feb 2023 05:58:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748957401985/dir167747748982505077..../file167747749008001524....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:10 GMT',
  'ETag',
  '"0x8DB18879B29A1DB"',
  'x-ms-request-id',
  'e51cf76f-601a-0004-4970-4a0ec4000000',
  'x-ms-client-request-id',
  '62bc64fe-6aa1-4343-8e79-6ba7c79b4c86',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:10.5905627Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:10.5905627Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:10.5905627Z',
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
  'Mon, 27 Feb 2023 05:58:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748957401985/dir167747748982505077..../file167747749008001524....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf770-601a-0004-4a70-4a0ec4000000',
  'x-ms-client-request-id',
  '6cc5eeaf-0dad-4249-bf9d-84453357679e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-number-of-handles-closed',
  '0',
  'x-ms-number-of-handles-failed',
  '0',
  'Date',
  'Mon, 27 Feb 2023 05:58:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747748957401985')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf771-601a-0004-4b70-4a0ec4000000',
  'x-ms-client-request-id',
  '5dc04d1b-585b-448c-b542-8291fef7cc74',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:10 GMT'
]);
