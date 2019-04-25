let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-04-25T01:09:59.212Z","share":"share155615459921202127"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615459921202127')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 01:09:59 GMT',
  'ETag',
  '"0x8D6C91ABCF42752"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40c6cee1-201a-0083-2c03-fb3df5000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 01:09:59 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155615459921202127/')
  .query({"sv":"2018-03-28","spr":"https%2Chttp","st":"2019-04-25T01%3A04%3A59Z","se":"2019-04-26T01%3A09%3A59Z","sip":"0.0.0.0-255.255.255.255","sr":"s","sp":"rcwdl","sig":"gXujSfdlooG1QorFsygwmxZtFEzSfLcLSajWRD5Vjoo%3D","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155615459921202127\" DirectoryPath=\"\"><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '566e4423-801a-0042-1b03-fbb64c000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Apr 2019 01:09:59 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155615459921202127')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be4ac691-701a-005c-5e03-fb6ca1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 01:09:59 GMT',
  'Connection',
  'close' ]);
