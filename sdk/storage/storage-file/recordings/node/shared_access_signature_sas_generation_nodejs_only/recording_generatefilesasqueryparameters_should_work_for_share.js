let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-05-24T21:39:27.499Z","share":"share155873396749900225"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155873396749900225')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 May 2019 21:39:27 GMT',
  'ETag',
  '"0x8D6E0904C14527F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50ec7fbb-701a-0013-7879-12a8b9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155873396749900225/')
  .query({"sv":"2018-03-28","spr":"https%2Chttp","st":"2019-05-24T21%3A34%3A27Z","se":"2019-05-25T21%3A39%3A27Z","sip":"0.0.0.0-255.255.255.255","sr":"s","sp":"rcwdl","sig":"l8mPhmmcJfdS%2BuqvS1ZzYih3MPFNrDh%2B7oY8v6cWqV0%3D","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155873396749900225\" DirectoryPath=\"\"><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84faa699-901a-0012-0b79-12a944000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:39:27 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155873396749900225')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4327bd1c-301a-009c-4679-12e6e5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:39:27 GMT',
  'Connection',
  'close' ]);

