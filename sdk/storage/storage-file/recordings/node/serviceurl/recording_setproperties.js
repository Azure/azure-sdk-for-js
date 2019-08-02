let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>3</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>4</Days></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>POST,DELETE,GET,OPTIONS,MERGE,HEAD,PUT</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>88888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule></Cors></StorageServiceProperties>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0e5540e-b01a-007a-5aca-4254db000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:22:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><StorageServiceProperties><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>3</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>4</Days></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedOrigins>*</AllowedOrigins><AllowedMethods>POST,DELETE,GET,OPTIONS,MERGE,HEAD,PUT</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>88888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedOrigins>example.com</AllowedOrigins><AllowedMethods>GET</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedOrigins>example.com</AllowedOrigins><AllowedMethods>GET</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedOrigins>example.com</AllowedOrigins><AllowedMethods>GET</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedOrigins>example.com</AllowedOrigins><AllowedMethods>GET</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule></Cors></StorageServiceProperties>")
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '46bc196a-d01a-00a6-03ca-420688000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:22:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>3</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>4</Days></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>POST,DELETE,GET,OPTIONS,MERGE,HEAD,PUT</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>88888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule></Cors></StorageServiceProperties>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be6eeabe-c01a-013e-7eca-42cee2000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:23:03 GMT',
  'Connection',
  'close' ]);

