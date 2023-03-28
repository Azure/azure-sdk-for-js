let nock = require('nock');

module.exports.hash = "f2882c849aefb0f88a9f76d562b25150";

module.exports.testInfo = {"uniqueName":{"share":"share167747853142702445","dir":"dir167747853168500271","file":"file167747853194806734"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853142702445')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:31 GMT',
  'ETag',
  '"0x8DB188A07D9D6FA"',
  'x-ms-request-id',
  '1775e95d-e01a-0001-6172-4a1b65000000',
  'x-ms-client-request-id',
  'f975c98d-12d0-49d3-849b-a683637c1b68',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853142702445/dir167747853168500271....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:32 GMT',
  'ETag',
  '"0x8DB188A080313A7"',
  'x-ms-request-id',
  '1775e95f-e01a-0001-6272-4a1b65000000',
  'x-ms-client-request-id',
  '02ede89b-d737-4c23-912c-1878304610bf',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:32.2029991Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:32.2029991Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:32.2029991Z',
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
  'Mon, 27 Feb 2023 06:15:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853142702445/dir167747853168500271..../file167747853194806734....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:32 GMT',
  'ETag',
  '"0x8DB188A082B832F"',
  'x-ms-request-id',
  '1775e960-e01a-0001-6372-4a1b65000000',
  'x-ms-client-request-id',
  '1383065d-945c-46e6-8bdc-4cb393b8cc22',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:32.4679983Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:32.4679983Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:32.4679983Z',
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
  'Mon, 27 Feb 2023 06:15:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747853142702445/dir167747853168500271..../file167747853194806734....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:32 GMT',
  'ETag',
  '"0x8DB188A08521E23"',
  'x-ms-request-id',
  '1775e961-e01a-0001-6472-4a1b65000000',
  'x-ms-client-request-id',
  '565f2afb-de69-4130-a8f6-e8f3a567486c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:32.7210019Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:32.4679983Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:32.4679983Z',
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
  'Mon, 27 Feb 2023 06:15:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747853142702445/dir167747853168500271..../file167747853194806734....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:32 GMT',
  'ETag',
  '"0x8DB188A08521E23"',
  'x-ms-request-id',
  '1775e962-e01a-0001-6572-4a1b65000000',
  'x-ms-client-request-id',
  'fd90ed1c-d9ba-4c49-b335-56c485097982',
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
  '2023-02-27T06:15:32.7210019Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:32.4679983Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:32.4679983Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747853142702445')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e963-e01a-0001-6672-4a1b65000000',
  'x-ms-client-request-id',
  '4f7d91b2-aa50-4de9-a7c2-3e5f6115d4f7',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:32 GMT'
]);
