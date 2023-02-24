let nock = require('nock');

module.exports.hash = "d01bf3945696e943dd1a3ae7399efa24";

module.exports.testInfo = {"uniqueName":{"share":"share167875880980804075","dir":"dir167875881005908187","file":"file167875881031906905"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880980804075')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:30 GMT',
  'ETag',
  '"0x8DB242EE92486A0"',
  'x-ms-request-id',
  'fd6a9f53-e01a-0007-0117-56fda4000000',
  'x-ms-client-request-id',
  '544ea929-388b-4ba5-8c37-82798b46e99e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880980804075/dir167875881005908187.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:30 GMT',
  'ETag',
  '"0x8DB242EE94CA295"',
  'x-ms-request-id',
  'fd6a9f55-e01a-0007-0217-56fda4000000',
  'x-ms-client-request-id',
  'a7ba8f73-f307-4f27-8195-dbcf6ff3d30e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:30.4266389Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:30.4266389Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:30.4266389Z',
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
  'Tue, 14 Mar 2023 01:53:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875880980804075/dir167875881005908187./file167875881031906905.')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:30 GMT',
  'ETag',
  '"0x8DB242EE973DA66"',
  'x-ms-request-id',
  'fd6a9f56-e01a-0007-0317-56fda4000000',
  'x-ms-client-request-id',
  '57b0d850-1c39-4388-aa74-db80828799ad',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:30.6836582Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:30.6836582Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:30.6836582Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167875880980804075/dir167875881005908187./file167875881031906905.')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:30 GMT',
  'ETag',
  '"0x8DB242EE973DA66"',
  'x-ms-request-id',
  'fd6a9f57-e01a-0007-0417-56fda4000000',
  'x-ms-client-request-id',
  'e6ee19d3-cf3b-4a77-a86a-8a507a007696',
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
  '2023-03-14T01:53:30.6836582Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:30.6836582Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:30.6836582Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
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
  'Tue, 14 Mar 2023 01:53:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875880980804075/dir167875881005908187./file167875881031906905.')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f58-e01a-0007-0517-56fda4000000',
  'x-ms-client-request-id',
  '93696caa-ab11-4a92-a013-5b14915b7c92',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167875880980804075/dir167875881005908187./file167875881031906905.')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f59-e01a-0007-0617-56fda4000000',
  'x-ms-client-request-id',
  'b989e4fc-a9dd-43fd-a4ba-2f5cf728bf87',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875880980804075')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f5a-e01a-0007-0717-56fda4000000',
  'x-ms-client-request-id',
  'f1390863-181a-4b9e-95ac-87a6d3d0268f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:31 GMT'
]);
