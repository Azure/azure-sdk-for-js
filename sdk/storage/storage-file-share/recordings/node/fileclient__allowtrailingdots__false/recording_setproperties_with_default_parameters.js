let nock = require('nock');

module.exports.hash = "cd4918536aad63653dbbf78e8a04f085";

module.exports.testInfo = {"uniqueName":{"share":"share167747852830301032","dir":"dir167747852856103169","file":"file167747852882709678"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852830301032')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:28 GMT',
  'ETag',
  '"0x8DB188A05FD6F27"',
  'x-ms-request-id',
  '1775e94e-e01a-0001-5572-4a1b65000000',
  'x-ms-client-request-id',
  '22d29799-19f4-4205-b478-f240c7ab4deb',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852830301032/dir167747852856103169....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:29 GMT',
  'ETag',
  '"0x8DB188A062661B7"',
  'x-ms-request-id',
  '1775e950-e01a-0001-5672-4a1b65000000',
  'x-ms-client-request-id',
  '4c9b11ea-4e2e-45b2-86fd-a101e62ba6ff',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:29.0789303Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:29.0789303Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:29.0789303Z',
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
  'Mon, 27 Feb 2023 06:15:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852830301032/dir167747852856103169..../file167747852882709678....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:29 GMT',
  'ETag',
  '"0x8DB188A064F468E"',
  'x-ms-request-id',
  '1775e951-e01a-0001-5772-4a1b65000000',
  'x-ms-client-request-id',
  '95f8f31f-0953-41cf-bfce-3c780e620fbc',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:29.3469326Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:29.3469326Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:29.3469326Z',
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
  'Mon, 27 Feb 2023 06:15:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852830301032/dir167747852856103169..../file167747852882709678....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:29 GMT',
  'ETag',
  '"0x8DB188A06762FDF"',
  'x-ms-request-id',
  '1775e952-e01a-0001-5872-4a1b65000000',
  'x-ms-client-request-id',
  'd5da7435-e4b7-476e-a6ac-6d1df5a3416e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:29.6019423Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:29.3469326Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:29.3469326Z',
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
  'Mon, 27 Feb 2023 06:15:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747852830301032/dir167747852856103169..../file167747852882709678....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:29 GMT',
  'ETag',
  '"0x8DB188A06762FDF"',
  'x-ms-request-id',
  '1775e953-e01a-0001-5972-4a1b65000000',
  'x-ms-client-request-id',
  'f78f683f-2199-45b2-a3de-8a9c023ccf9f',
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
  '2023-02-27T06:15:29.6019423Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:29.3469326Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:29.3469326Z',
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
  'Mon, 27 Feb 2023 06:15:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747852830301032')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e955-e01a-0001-5a72-4a1b65000000',
  'x-ms-client-request-id',
  '90929127-01ed-4f86-8d3d-65d199f927f6',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:29 GMT'
]);
