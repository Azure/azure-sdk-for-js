let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-30T22:41:09.092Z","tmr":"2019-04-30T22:41:09.092Z","container":"container155666406909201835"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container155666406909201835')
  .query({"restype":"container"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Apr 2019 22:41:09 GMT',
  'ETag',
  '"0x8D6CDBCF0A95BA1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'edcce1c8-f01e-0081-2fa5-ff3f0f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:41:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container155666406909201835')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-04-30T22%3A36%3A09Z","se":"2019-05-01T22%3A41%3A09Z","sip":"0.0.0.0-255.255.255.255","sr":"c","sp":"racwdl","sig":"xcwQddKwl4%2FMdOi0JogbTYE9XfMLpZQ32uTcoFDHeYw%3D","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"container155666406909201835\"><Blobs /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7f83195-901e-0056-2fa5-ff7528000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 22:41:09 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container155666406909201835')
  .query({"restype":"container"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '764558e3-c01e-000a-03a5-ff84d1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 30 Apr 2019 22:41:09 GMT',
  'Connection',
  'close' ]);

