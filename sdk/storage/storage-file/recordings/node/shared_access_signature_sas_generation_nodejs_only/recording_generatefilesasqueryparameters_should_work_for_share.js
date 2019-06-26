let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-06-25T23:34:08.454Z","share":"share156150564845405463"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150564845405463')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:34:08 GMT',
  'ETag',
  '"0x8D6F9C59EC284F1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '263ab671-f01a-0056-1fae-2b92e1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:34:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150564845405463/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156150564845405463\" DirectoryPath=\"\"><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '339f38d8-201a-0032-11ae-2b2241000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:34:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150564845405463')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e65da297-801a-00da-41ae-2bdfba000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:34:09 GMT',
  'Connection',
  'close' ]);

