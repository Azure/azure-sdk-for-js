let nock = require('nock');

module.exports.testInfo = {}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\"><Shares><Share><Name>share155476988099909174</Name><Properties><Last-Modified>Tue, 09 Apr 2019 00:31:21 GMT</Last-Modified><Etag>\"0x8D6BC82B08DA216\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155476988816207586155476988902704210</Name><Properties><Last-Modified>Tue, 09 Apr 2019 00:31:29 GMT</Last-Modified><Etag>\"0x8D6BC82B55A8882\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155476998539207384155476998579106408</Name><Properties><Last-Modified>Tue, 09 Apr 2019 00:33:06 GMT</Last-Modified><Etag>\"0x8D6BC82EF031DD6\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155477068736806088</Name><Properties><Last-Modified>Tue, 09 Apr 2019 00:44:47 GMT</Last-Modified><Etag>\"0x8D6BC84913DB425\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155477069192406214155477069233605864</Name><Properties><Last-Modified>Tue, 09 Apr 2019 00:44:52 GMT</Last-Modified><Etag>\"0x8D6BC84940667FF\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155477074214507879155477074235104724</Name><Properties><Last-Modified>Tue, 09 Apr 2019 00:45:42 GMT</Last-Modified><Etag>\"0x8D6BC84B1D566C1\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155612883974800955</Name><Properties><Last-Modified>Wed, 24 Apr 2019 18:00:39 GMT</Last-Modified><Etag>\"0x8D6C8DEC30604F1\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155612884588804669155612884660401600</Name><Properties><Last-Modified>Wed, 24 Apr 2019 18:00:46 GMT</Last-Modified><Etag>\"0x8D6C8DEC71EF4CE\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155612893686802718155612893850801436</Name><Properties><Last-Modified>Wed, 24 Apr 2019 18:02:18 GMT</Last-Modified><Etag>\"0x8D6C8DEFDF38854\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155613135596009941</Name><Properties><Last-Modified>Wed, 24 Apr 2019 18:42:36 GMT</Last-Modified><Etag>\"0x8D6C8E49EE7A45F\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155613135950109844155613135985106038</Name><Properties><Last-Modified>Wed, 24 Apr 2019 18:42:39 GMT</Last-Modified><Etag>\"0x8D6C8E4A11048F0\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155613140679805088155613140697400689</Name><Properties><Last-Modified>Wed, 24 Apr 2019 18:43:27 GMT</Last-Modified><Etag>\"0x8D6C8E4BD26DA52\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155613590999504685</Name><Properties><Last-Modified>Wed, 24 Apr 2019 19:58:30 GMT</Last-Modified><Etag>\"0x8D6C8EF39454A04\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155613648042002431155613648110702586</Name><Properties><Last-Modified>Wed, 24 Apr 2019 20:08:01 GMT</Last-Modified><Etag>\"0x8D6C8F08DACB687\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155613674077300992155613674143200581</Name><Properties><Last-Modified>Wed, 24 Apr 2019 20:12:21 GMT</Last-Modified><Etag>\"0x8D6C8F128D61795\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share155614648006500593</Name><Properties><Last-Modified>Wed, 24 Apr 2019 22:54:40 GMT</Last-Modified><Etag>\"0x8D6C907D5A69CB0\"</Etag><Quota>5120</Quota></Properties></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d12d393-d01a-003c-0800-fb2983000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Apr 2019 00:48:12 GMT',
  'Connection',
  'close' ]);
