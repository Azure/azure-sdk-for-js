let nock = require('nock');

module.exports.hash = "1f54683e6068900425c3f9984c2bc283";

module.exports.testInfo = {"uniqueName":{"share":"share167747856401100495","dir":"dir167747856428200753","file":"file167747856454308943"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856401100495')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:04 GMT',
  'ETag',
  '"0x8DB188A1B45E0BD"',
  'x-ms-request-id',
  '1775ea0d-e01a-0001-6572-4a1b65000000',
  'x-ms-client-request-id',
  '049244ca-17f6-4379-aa3f-b0508fd0e3e4',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:16:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856401100495/dir167747856428200753....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:04 GMT',
  'ETag',
  '"0x8DB188A1B70C7C8"',
  'x-ms-request-id',
  '1775ea10-e01a-0001-6672-4a1b65000000',
  'x-ms-client-request-id',
  'f7bd0b2a-90d8-45b6-a8ce-72fd456e1738',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:16:04.7986632Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:04.7986632Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:16:04.7986632Z',
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
  'Mon, 27 Feb 2023 06:16:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856401100495/dir167747856428200753..../file167747856454308943....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:05 GMT',
  'ETag',
  '"0x8DB188A1B995EDB"',
  'x-ms-request-id',
  '1775ea16-e01a-0001-6772-4a1b65000000',
  'x-ms-client-request-id',
  'd4e0f904-526d-4da5-adcd-858071eeb6af',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:16:05.0646747Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:05.0646747Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:16:05.0646747Z',
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
  'Mon, 27 Feb 2023 06:16:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747856401100495/dir167747856428200753..../file167747856454308943....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '1775ea19-e01a-0001-6872-4a1b65000000',
  'x-ms-client-request-id',
  '91a47538-812b-40a7-ae5b-8a14e609b0f8',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:16:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747856401100495')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775ea1a-e01a-0001-6972-4a1b65000000',
  'x-ms-client-request-id',
  '2c2b87d5-c875-470b-8582-18f7ef22c958',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:16:05 GMT'
]);
