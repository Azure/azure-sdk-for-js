let nock = require('nock');

module.exports.hash = "23b025b71787a30364a6ae60a747fd6e";

module.exports.testInfo = {"uniqueName":{"share":"share167875881156202341","dir":"dir167875881181303697"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881156202341')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:31 GMT',
  'ETag',
  '"0x8DB242EEA2FDD6C"',
  'x-ms-request-id',
  'fd6a9f5b-e01a-0007-0817-56fda4000000',
  'x-ms-client-request-id',
  '194764b5-2340-4192-9a7f-6ada2a4ad1fb',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881156202341/dir167875881181303697.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:32 GMT',
  'ETag',
  '"0x8DB242EEA57FDBD"',
  'x-ms-request-id',
  'fd6a9f5d-e01a-0007-0917-56fda4000000',
  'x-ms-client-request-id',
  '60fafa0e-4850-40cd-b460-0b3587b68d92',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:32.1787837Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:32.1787837Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:32.1787837Z',
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
  'Tue, 14 Mar 2023 01:53:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875881156202341/dir167875881181303697.')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'fd6a9f5e-e01a-0007-0a17-56fda4000000',
  'x-ms-client-request-id',
  'e65ec7f6-936c-4b03-b501-e37fdc5d67ba',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875881156202341')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9f5f-e01a-0007-0b17-56fda4000000',
  'x-ms-client-request-id',
  'a4a20875-08a5-4dbd-8522-8cf28c78c1a1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:32 GMT'
]);
