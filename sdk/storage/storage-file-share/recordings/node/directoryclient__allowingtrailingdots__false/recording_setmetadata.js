let nock = require('nock');

module.exports.hash = "4ef28efc30180ee9ff6ef6187702ebc9";

module.exports.testInfo = {"uniqueName":{"share":"share167875883697101519","dir":"dir167875883722104969"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883697101519')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:57 GMT',
  'ETag',
  '"0x8DB242EF95532D9"',
  'x-ms-request-id',
  'fd6a9f8a-e01a-0007-1d17-56fda4000000',
  'x-ms-client-request-id',
  '5cc10d57-0c4b-4845-ada4-3c69b8e7fcfa',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883697101519/dir167875883722104969.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:57 GMT',
  'ETag',
  '"0x8DB242EF97D4332"',
  'x-ms-request-id',
  'fd6a9f8c-e01a-0007-1e17-56fda4000000',
  'x-ms-client-request-id',
  '8da57b2c-3a60-4314-af3c-4d3a1ff90db5',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:57.5888690Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:57.5888690Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:57.5888690Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883697101519/dir167875883722104969.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:57 GMT',
  'ETag',
  '"0x8DB242EF9A47B11"',
  'x-ms-request-id',
  'fd6a9f8d-e01a-0007-1f17-56fda4000000',
  'x-ms-client-request-id',
  'eeda2488-c482-4677-be37-d237aea7f9d9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875883697101519/dir167875883722104969.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:57 GMT',
  'ETag',
  '"0x8DB242EF9A47B11"',
  'x-ms-request-id',
  'fd6a9f8e-e01a-0007-2017-56fda4000000',
  'x-ms-client-request-id',
  '4bab9d8e-b250-411d-9d32-f0a7e7997ea9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'false',
  'x-ms-file-change-time',
  '2023-03-14T01:53:57.8458897Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:57.5888690Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:57.5888690Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883697101519/dir167875883722104969.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:58 GMT',
  'ETag',
  '"0x8DB242EF9F3FC31"',
  'x-ms-request-id',
  'fd6a9f8f-e01a-0007-2117-56fda4000000',
  'x-ms-client-request-id',
  '38be3f68-c8b6-4d14-bd6f-2b0eb2b1df29',
  'x-ms-version',
  '2022-11-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875883697101519/dir167875883722104969.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:58 GMT',
  'ETag',
  '"0x8DB242EF9F3FC31"',
  'x-ms-request-id',
  'fd6a9f90-e01a-0007-2217-56fda4000000',
  'x-ms-client-request-id',
  '357f30d8-5fb7-4ea6-894d-caa04a651c2d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key1',
  'Value1',
  'x-ms-file-change-time',
  '2023-03-14T01:53:58.3669297Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:57.5888690Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:57.5888690Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key1,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875883697101519')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f91-e01a-0007-2317-56fda4000000',
  'x-ms-client-request-id',
  'a7dd121e-2f89-4fda-a808-b11aaaf5f867',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:58 GMT'
]);
