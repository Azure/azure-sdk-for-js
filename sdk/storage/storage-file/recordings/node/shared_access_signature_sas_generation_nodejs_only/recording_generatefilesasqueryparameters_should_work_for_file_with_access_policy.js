let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-06-17T23:54:13.619Z","share":"share156081565361905348","dir":"dir156081565393603427","file":"file156081565425108841"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156081565361905348')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Jun 2019 23:54:13 GMT',
  'ETag',
  '"0x8D6F37F19CEF3F5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00754256-701a-0047-7e67-25a5fa000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 17 Jun 2019 23:54:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156081565361905348/dir156081565393603427')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Jun 2019 23:54:14 GMT',
  'ETag',
  '"0x8D6F37F19FE8E2F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8cfe3be5-c01a-0092-1767-25ed27000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 17 Jun 2019 23:54:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156081565361905348/dir156081565393603427/file156081565425108841')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Jun 2019 23:54:14 GMT',
  'ETag',
  '"0x8D6F37F1A2E5949"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10ca00e1-b01a-0078-2467-251226000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 17 Jun 2019 23:54:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156081565361905348', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-06-17T23:49:13.6190000Z</Start><Expiry>2019-06-18T23:54:13.6190000Z</Expiry><Permission>rcwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Jun 2019 23:54:15 GMT',
  'ETag',
  '"0x8D6F37F1A7A4452"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3a97f08-d01a-00c2-4867-25f22f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 17 Jun 2019 23:54:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156081565361905348/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156081565361905348\" DirectoryPath=\"\"><Entries><Directory><Name>dir156081565393603427</Name><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cdc24bde-101a-0031-5f67-252146000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 17 Jun 2019 23:54:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156081565361905348')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '565c2689-d01a-00c9-2267-25ea5b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 17 Jun 2019 23:54:15 GMT',
  'Connection',
  'close' ]);

