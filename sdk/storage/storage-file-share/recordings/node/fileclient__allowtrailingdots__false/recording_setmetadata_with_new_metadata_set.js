let nock = require('nock');

module.exports.hash = "f116b85d95bb314c02619e5f89a97858";

module.exports.testInfo = {"uniqueName":{"share":"share167747852986103524","dir":"dir167747853011700509","file":"file167747853037707727"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852986103524')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:30 GMT',
  'ETag',
  '"0x8DB188A06EADF8B"',
  'x-ms-request-id',
  '1775e956-e01a-0001-5b72-4a1b65000000',
  'x-ms-client-request-id',
  '0971eb23-9307-4de6-bd2e-032552199230',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852986103524/dir167747853011700509....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:30 GMT',
  'ETag',
  '"0x8DB188A0713A94C"',
  'x-ms-request-id',
  '1775e958-e01a-0001-5c72-4a1b65000000',
  'x-ms-client-request-id',
  'a9589efa-3aa1-4361-859f-bb2f429953f2',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:30.6339660Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:30.6339660Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:30.6339660Z',
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
  'Mon, 27 Feb 2023 06:15:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852986103524/dir167747853011700509..../file167747853037707727....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:30 GMT',
  'ETag',
  '"0x8DB188A073EB12C"',
  'x-ms-request-id',
  '1775e959-e01a-0001-5d72-4a1b65000000',
  'x-ms-client-request-id',
  '56a2f5cc-c1f3-4fb2-aeaa-e6b02d7f656a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:30.9159724Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:30.9159724Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:30.9159724Z',
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
  'Mon, 27 Feb 2023 06:15:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747852986103524/dir167747853011700509..../file167747853037707727....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:31 GMT',
  'ETag',
  '"0x8DB188A07665D7C"',
  'x-ms-request-id',
  '1775e95a-e01a-0001-5e72-4a1b65000000',
  'x-ms-client-request-id',
  'aec6a78e-4fca-4a40-b34f-95fb7e659088',
  'x-ms-version',
  '2022-11-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747852986103524/dir167747853011700509..../file167747853037707727....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:31 GMT',
  'ETag',
  '"0x8DB188A07665D7C"',
  'x-ms-request-id',
  '1775e95b-e01a-0001-5f72-4a1b65000000',
  'x-ms-client-request-id',
  '11097283-dba4-4a7c-ae81-60191a725bd7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T06:15:31.1759740Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:30.9159724Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:30.9159724Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747852986103524')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e95c-e01a-0001-6072-4a1b65000000',
  'x-ms-client-request-id',
  'bdb95dca-8982-452d-ad94-db6795f090e6',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:31 GMT'
]);
