let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-05T09:25:11.351Z","share":"share156767551135103503"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767551135103503')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:25:11 GMT',
  'ETag',
  '"0x8D731E2F3A618E6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f438b452-001a-003a-80cb-63edfb000000',
  'x-ms-client-request-id',
  '9b230c47-5051-4250-a442-a3f1063ae55f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:25:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767551135103503/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156767551135103503\" DirectoryPath=\"\"><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d678980-201a-0150-13cb-63cbde000000',
  'x-ms-client-request-id',
  '727047f3-4071-44b0-a99a-2338676c5e97',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:25:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767551135103503')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c9569e08-101a-0044-1ccb-637dbc000000',
  'x-ms-client-request-id',
  'ed42c070-4573-4702-885c-c2e070fff2b8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:25:11 GMT',
  'Connection',
  'close' ]);

