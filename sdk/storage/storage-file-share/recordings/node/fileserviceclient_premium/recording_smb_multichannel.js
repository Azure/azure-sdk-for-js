let nock = require('nock');

module.exports.hash = "eb5c28f68ec1b06f5b0af59f04f201a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><StorageServiceProperties><ProtocolSettings><SMB><Multichannel><Enabled>true</Enabled></Multichannel></SMB></ProtocolSettings></StorageServiceProperties>")
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84dc4a50-501a-0067-6059-9526b0000000',
  'x-ms-client-request-id',
  '268a12f3-4769-4b6d-b7a8-fe90438b0d2a',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 28 Sep 2020 05:36:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>4</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>3</Days></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>GET,PUT</AllowedMethods><AllowedOrigins>http://www.example1.com</AllowedOrigins><AllowedHeaders>x-ms-header1,x-ms-header2</AllowedHeaders><ExposedHeaders>x-ms-header3</ExposedHeaders><MaxAgeInSeconds>10</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>DELETE</AllowedMethods><AllowedOrigins>http://www.example2.com</AllowedOrigins><AllowedHeaders>x-ms-header1</AllowedHeaders><ExposedHeaders>x-ms-header2,x-ms-header3</ExposedHeaders><MaxAgeInSeconds>20</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT,PATCH</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>86400</MaxAgeInSeconds></CorsRule></Cors><ProtocolSettings><SMB><Multichannel><Enabled>true</Enabled></Multichannel></SMB></ProtocolSettings></StorageServiceProperties>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84dc4a59-501a-0067-6359-9526b0000000',
  'x-ms-client-request-id',
  '7e820c94-59fc-4772-8ee0-693f8acae009',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Sep 2020 05:36:40 GMT'
]);
