let nock = require('nock');

module.exports.testInfo = {"share":"share156044261898409584","dir":"dir156044261923304153","file":"file156044261950006984"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044261898409584')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:43 GMT',
  'ETag',
  '"0x8D6EFDFDA525B79"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8995981c-101a-00b9-58c8-21999f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044261898409584/dir156044261923304153')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:44 GMT',
  'ETag',
  '"0x8D6EFDFDA7A42A1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3595a59a-d01a-0041-27c8-215282000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044261898409584/dir156044261923304153/file156044261950006984')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:44 GMT',
  'ETag',
  '"0x8D6EFDFDAA4192E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '323f9079-d01a-0068-53c8-2124c0000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044261898409584/dir156044261923304153/file156044261950006984', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:44 GMT',
  'ETag',
  '"0x8D6EFDFDACD0535"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4eec3d8-801a-003f-70c8-21cd4d000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044261898409584/dir156044261923304153/file156044261950006984', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:45 GMT',
  'ETag',
  '"0x8D6EFDFDB3DDC67"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1f07554-001a-008f-35c8-2134cd000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044261898409584/dir156044261923304153/file156044261950006984')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:45 GMT',
  'ETag',
  '"0x8D6EFDFDB69FD4C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de8f9eff-f01a-00de-09c8-212a38000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156044261898409584/dir156044261923304153/file156044261950006984')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:45 GMT',
  'ETag',
  '"0x8D6EFDFDB69FD4C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6b547e48-e01a-008e-31c8-213530000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:16:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044261898409584')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fafcc862-701a-0065-0ac8-21cbcc000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:46 GMT',
  'Connection',
  'close' ]);

