let nock = require('nock');

module.exports.testInfo = {"share":"share156404670570809122","dir":"dir156404670601001018"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404670570809122')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:27 GMT',
  'ETag',
  '"0x8D710E178DB5F11"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d79676c-e01a-0069-7dca-42613a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404670570809122/dir156404670601001018')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:28 GMT',
  'ETag',
  '"0x8D710E1790A3748"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb143f18-d01a-012a-7dca-420d86000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:21:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156404670570809122/dir156404670601001018')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89e0d69b-d01a-00e2-15ca-42dae4000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156404670570809122/dir156404670601001018')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '449303cb-301a-0006-54ca-42c9ee000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156404670570809122')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '270e4cb4-b01a-0113-4eca-424d22000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:28 GMT',
  'Connection',
  'close' ]);

