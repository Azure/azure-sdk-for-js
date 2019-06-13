let nock = require('nock');

module.exports.testInfo = {}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"restype":"service","comp":"properties"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>3</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>4</Days></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>PUT,OPTIONS,POST,MERGE,HEAD,GET,DELETE</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>2419200</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule></Cors></StorageServiceProperties>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '07113928-d01a-0078-3478-12f5ef000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:37:45 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><StorageServiceProperties><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>3</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>4</Days></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedOrigins>*</AllowedOrigins><AllowedMethods>PUT,OPTIONS,POST,MERGE,HEAD,GET,DELETE</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>2419200</MaxAgeInSeconds></CorsRule><CorsRule><AllowedOrigins>example.com</AllowedOrigins><AllowedMethods>GET</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedOrigins>example.com</AllowedOrigins><AllowedMethods>GET</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedOrigins>example.com</AllowedOrigins><AllowedMethods>GET</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedOrigins>example.com</AllowedOrigins><AllowedMethods>GET</AllowedMethods><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule></Cors></StorageServiceProperties>")
  .query({"restype":"service","comp":"properties"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e998b1cb-c01a-0028-2378-12eae7000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 24 May 2019 21:37:56 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"restype":"service","comp":"properties"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>3</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>4</Days></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>PUT,OPTIONS,POST,MERGE,HEAD,GET,DELETE</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>2419200</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule></Cors></StorageServiceProperties>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '134ee2af-301a-0014-5578-125e3c000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:38:06 GMT',
  'Connection',
  'close' ]);

