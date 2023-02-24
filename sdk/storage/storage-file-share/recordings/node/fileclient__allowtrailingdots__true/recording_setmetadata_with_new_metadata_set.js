let nock = require('nock');

module.exports.hash = "f116b85d95bb314c02619e5f89a97858";

module.exports.testInfo = {"uniqueName":{"share":"share167747745734804969","dir":"dir167747745759904898","file":"file167747745785503525"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745734804969')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:37 GMT',
  'ETag',
  '"0x8DB188787A447AB"',
  'x-ms-request-id',
  'e51cf6be-601a-0004-4470-4a0ec4000000',
  'x-ms-client-request-id',
  'badd0d3c-01ca-446d-a3b0-19cfa7684742',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745734804969/dir167747745759904898....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:38 GMT',
  'ETag',
  '"0x8DB188787CBF33E"',
  'x-ms-request-id',
  'e51cf6c0-601a-0004-4570-4a0ec4000000',
  'x-ms-client-request-id',
  '8898b912-9bcb-4cc7-8d7c-68d597c5779b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:38.0998974Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:38.0998974Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:38.0998974Z',
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
  'Mon, 27 Feb 2023 05:57:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745734804969/dir167747745759904898..../file167747745785503525....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:38 GMT',
  'ETag',
  '"0x8DB188787F2DC46"',
  'x-ms-request-id',
  'e51cf6c1-601a-0004-4670-4a0ec4000000',
  'x-ms-client-request-id',
  'b8431bd1-7df8-49cd-b8d0-02d4425cc545',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:38.3548998Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:38.3548998Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:38.3548998Z',
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
  'Mon, 27 Feb 2023 05:57:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747745734804969/dir167747745759904898..../file167747745785503525....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:38 GMT',
  'ETag',
  '"0x8DB188788188CFD"',
  'x-ms-request-id',
  'e51cf6c2-601a-0004-4770-4a0ec4000000',
  'x-ms-client-request-id',
  '170a7495-1eb6-4c38-8b54-02388d07506d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747745734804969/dir167747745759904898..../file167747745785503525....')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:38 GMT',
  'ETag',
  '"0x8DB188788188CFD"',
  'x-ms-request-id',
  'e51cf6c3-601a-0004-4870-4a0ec4000000',
  'x-ms-client-request-id',
  '04fead6b-20be-475d-8cee-7b1e24309dae',
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
  '2023-02-27T05:57:38.6019069Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:38.3548998Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:38.3548998Z',
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
  'Mon, 27 Feb 2023 05:57:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747745734804969')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6c4-601a-0004-4970-4a0ec4000000',
  'x-ms-client-request-id',
  'f3bec2fe-ef1c-4372-85d5-6d47e476774b',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:38 GMT'
]);
