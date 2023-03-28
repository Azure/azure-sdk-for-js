let nock = require('nock');

module.exports.hash = "dee8356b84d2671d15c67bb369a22640";

module.exports.testInfo = {"uniqueName":{"share":"share167747747128705646","dir":"dir167747747153606601","file":"file167747747179303432"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747128705646')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:51 GMT',
  'ETag',
  '"0x8DB18878FF2EBD7"',
  'x-ms-request-id',
  'e51cf711-601a-0004-7f70-4a0ec4000000',
  'x-ms-client-request-id',
  'b85ba76d-cc96-42c6-af17-2e5fd655d28e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747128705646/dir167747747153606601....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:52 GMT',
  'ETag',
  '"0x8DB1887901AC37D"',
  'x-ms-request-id',
  'e51cf713-601a-0004-8070-4a0ec4000000',
  'x-ms-client-request-id',
  'daa77b43-73b4-457a-807a-64f35ea2ed02',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:52.0381821Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:52.0381821Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:52.0381821Z',
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
  'Mon, 27 Feb 2023 05:57:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747128705646/dir167747747153606601..../file167747747179303432....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:52 GMT',
  'ETag',
  '"0x8DB18879041858D"',
  'x-ms-request-id',
  'e51cf714-601a-0004-0170-4a0ec4000000',
  'x-ms-client-request-id',
  'e82cab87-d615-437b-aca0-68af5cdcd7a5',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:52.2921869Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:52.2921869Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:52.2921869Z',
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
  'Mon, 27 Feb 2023 05:57:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747128705646/dir167747747153606601..../file167747747179303432....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:52 GMT',
  'ETag',
  '"0x8DB188790673640"',
  'x-ms-request-id',
  'e51cf715-601a-0004-0270-4a0ec4000000',
  'x-ms-client-request-id',
  'fef72e79-3d2e-4738-bc5c-76fff5abea27',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:52.5391936Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:52.5391936Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:52.5391936Z',
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
  'Mon, 27 Feb 2023 05:57:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747128705646/dir167747747153606601..../file167747747179303432....', "Hello World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:52 GMT',
  'ETag',
  '"0x8DB1887908E1F60"',
  'x-ms-request-id',
  'e51cf716-601a-0004-0370-4a0ec4000000',
  'x-ms-client-request-id',
  '1a7cada4-6cf0-479c-bbda-44d973e980a9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:52.7941984Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747747128705646/dir167747747153606601..../file167747747179303432....')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB1887908E1F60"',
  'x-ms-request-id',
  'e51cf717-601a-0004-0470-4a0ec4000000',
  'x-ms-client-request-id',
  '511243b5-17bf-4c56-9ab0-da3725246138',
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
  '2023-02-27T05:57:52.7941984Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:52.7941984Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:52.5391936Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747747128705646')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf718-601a-0004-0570-4a0ec4000000',
  'x-ms-client-request-id',
  'f48fac5c-f436-48be-8717-5078457186a5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:52 GMT'
]);
