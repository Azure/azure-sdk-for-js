let nock = require('nock');

module.exports.testInfo = {"share":"share155615329328000178"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615329328000178x1')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 00:48:13 GMT',
  'ETag',
  '"0x8D6C917B2A87E02"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea8d1280-701a-0090-6600-fb0814000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 00:48:13 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155615329328000178x2')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Apr 2019 00:48:14 GMT',
  'ETag',
  '"0x8D6C917B2FF659D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06bf9040-501a-004b-6800-fbacc2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 00:48:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"prefix":"share155615329328000178","maxresults":"1","include":"metadata%2Csnapshots","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\"><Prefix>share155615329328000178</Prefix><MaxResults>1</MaxResults><Shares><Share><Name>share155615329328000178x1</Name><Properties><Last-Modified>Thu, 25 Apr 2019 00:48:13 GMT</Last-Modified><Etag>\"0x8D6C917B2A87E02\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/coolstorageaccount1234/share155615329328000178x2/01D4FB009088E3D3/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '496899f7-301a-001f-3e00-fb4648000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Apr 2019 00:48:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"prefix":"share155615329328000178","marker":"%2Fcoolstorageaccount1234%2Fshare155615329328000178x2%2F01D4FB009088E3D3%2F9999-12-31T23%3A59%3A59.9999999Z","maxresults":"1","include":"metadata%2Csnapshots","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\"><Prefix>share155615329328000178</Prefix><Marker>/coolstorageaccount1234/share155615329328000178x2/01D4FB009088E3D3/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>1</MaxResults><Shares><Share><Name>share155615329328000178x2</Name><Properties><Last-Modified>Thu, 25 Apr 2019 00:48:14 GMT</Last-Modified><Etag>\"0x8D6C917B2FF659D\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9899e377-e01a-0095-6800-fbfc6b000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Apr 2019 00:48:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155615329328000178x1')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c5c9e01-d01a-009d-4300-fbe718000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 00:48:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155615329328000178x2')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd6a9d88-301a-0079-6900-fbf412000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 25 Apr 2019 00:48:16 GMT',
  'Connection',
  'close' ]);
