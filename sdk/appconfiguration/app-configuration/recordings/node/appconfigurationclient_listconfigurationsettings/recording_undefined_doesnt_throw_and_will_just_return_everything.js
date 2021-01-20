let nock = require('nock');

module.exports.hash = "4e2a8cbdaa9cdc134bb1bb5a1187de31";

module.exports.testInfo = {"uniqueName":{"listConfigSetting0A":"listConfigSetting0A161110360404608420","listConfigSetting0B":"listConfigSetting0B161110360404602873","listConfigSettingsLabel":"listConfigSettingsLabel161110360404609563"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting0A161110360404608420', {"key":"listConfigSetting0A161110360404608420","label":"listConfigSettingsLabel161110360404609563","content_type":"a content type","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"l1d9CsxPA6g8G6lI5lm7xl9IPtY","key":"listConfigSetting0A161110360404608420","label":"listConfigSettingsLabel161110360404609563","content_type":"a content type","value":"[A] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:45+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:45:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:45 GMT',
  'ETag',
  '"l1d9CsxPA6g8G6lI5lm7xl9IPtY"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2ODQ=;sn=3852684',
  'x-ms-request-id',
  '1e068aed-382c-46d1-8eae-e779a3e3c3e3',
  'x-ms-correlation-request-id',
  '1e068aed-382c-46d1-8eae-e779a3e3c3e3',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/locks/listConfigSetting0A161110360404608420')
  .query(true)
  .reply(200, {"etag":"lRedhuOzSCDsO11pQc0FOgUv8Jq","key":"listConfigSetting0A161110360404608420","label":"listConfigSettingsLabel161110360404609563","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:45+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:48 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:45 GMT',
  'ETag',
  '"lRedhuOzSCDsO11pQc0FOgUv8Jq"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2ODU=;sn=3852685',
  'x-ms-request-id',
  'a69211c4-6202-4630-b1ec-730ee138d60c',
  'x-ms-correlation-request-id',
  'a69211c4-6202-4630-b1ec-730ee138d60c',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting0A161110360404608420', {"key":"listConfigSetting0A161110360404608420","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"P1bsOLYoVt1mlGWZVaAxPWK3EUq","key":"listConfigSetting0A161110360404608420","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:45+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:45:56 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:45 GMT',
  'ETag',
  '"P1bsOLYoVt1mlGWZVaAxPWK3EUq"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2ODc=;sn=3852687',
  'x-ms-request-id',
  '59946b2e-a95e-422b-ad06-0fc588bd2f7c',
  'x-ms-correlation-request-id',
  '59946b2e-a95e-422b-ad06-0fc588bd2f7c',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting0B161110360404602873', {"key":"listConfigSetting0B161110360404602873","label":"listConfigSettingsLabel161110360404609563","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"VOhxhMSNXGqnQYKxHyFbYVYgy9z","key":"listConfigSetting0B161110360404602873","label":"listConfigSettingsLabel161110360404609563","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:46+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:48 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:46 GMT',
  'ETag',
  '"VOhxhMSNXGqnQYKxHyFbYVYgy9z"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2ODg=;sn=3852688',
  'x-ms-request-id',
  '917f6d3d-5133-446b-9c48-09b6f95868f6',
  'x-ms-correlation-request-id',
  '917f6d3d-5133-446b-9c48-09b6f95868f6',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting0B161110360404602873', {"key":"listConfigSetting0B161110360404602873","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"S8nF0qmv6XrksmnbcdQi5QmA8in","key":"listConfigSetting0B161110360404602873","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:46+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:45:56 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:46 GMT',
  'ETag',
  '"S8nF0qmv6XrksmnbcdQi5QmA8in"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2OTA=;sn=3852690',
  'x-ms-request-id',
  '6e95b9b3-5e05-4574-b1b1-08bee601ad07',
  'x-ms-correlation-request-id',
  '6e95b9b3-5e05-4574-b1b1-08bee601ad07',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"0EEKdFeFr3baUTuPZbB8ksXtMup","key":"TestKeyVaultRef","label":null,"content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://riparkkv.vault.azure.net/secrets/TestSecret\"}","tags":{},"locked":false,"last_modified":"2020-12-17T22:14:20+00:00"},{"etag":"GA7QRMf8nIhfxHoxrYmCgnqRCcb","key":"addConfigSample161074428772209000","label":null,"content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2021-01-15T20:58:08+00:00"},{"etag":"iZvVGhaCrBzz1NUoOUHgsY7G1mP","key":"addConfigSample161108421557204366","label":null,"content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2021-01-19T19:23:36+00:00"},{"etag":"dEaqy6GkHU6vtnHHvxU8R9U1Fv5","key":"deleteConfigTest161074429381309236","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2021-01-15T20:58:14+00:00"},{"etag":"RA3O7kgqpCzHHUx47UweqDsXXJJ","key":"deleteConfigTest161108422159509008","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2021-01-19T19:23:42+00:00"},{"etag":"U0kvFidM1gahao7QmLgTLyGK5Cw","key":"getConfigTest161074325964002735","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:41:00+00:00"},{"etag":"yqQXRAK5HeoEmMe1Rxa9v6nkoiS","key":"getConfigTest161074336337108430","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:42:44+00:00"},{"etag":"PmoJ2ZbWfCDCFNQLM6e9pCsi41O","key":"getConfigTest161074340987300332","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:43:31+00:00"},{"etag":"m36glcd4XyJ7O1QzkaPO5cbxXyA","key":"getConfigTest161074344102209372","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:44:02+00:00"},{"etag":"UdzmzJG6biQqRAxoYOsbszSKEac","key":"getConfigTest161074374691300795","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:49:08+00:00"},{"etag":"qFZsm7TnF3Pfev50cxZnu5lDYxq","key":"getConfigTest161074377096300977","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:49:32+00:00"},{"etag":"qFXEPr4V5FE5oRqonXWc0xMjv1d","key":"getConfigTest161074404705405257","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:54:08+00:00"},{"etag":"BhWlb0SaC8j9BoAeL3d99Fdn9I0","key":"getConfigTest161074409803301026","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:54:59+00:00"},{"etag":"Sil1UJgTEgNVbTTJQmkR1ccELi8","key":"getConfigTest161074416641801488","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:56:07+00:00"},{"etag":"t4j1vIZzR41HFYEas4bQn1KPXlj","key":"getConfigTest161074420850504305","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:56:49+00:00"},{"etag":"beIb5qQSoBV3Zpca8hm3R9xmGB3","key":"getConfigTest161074429570902194","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2021-01-15T20:58:16+00:00"},{"etag":"UexjluvRf8CyJ1sJEnuf0sAMk4v","key":"getConfigTest161074429822101363","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-15T20:58:19+00:00"},{"etag":"AQnLKCnfSvljKGoIOlDDDk6tkgU","key":"getConfigTest161108422351809560","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2021-01-19T19:23:44+00:00"},{"etag":"Szb8VsdhKTNu2RqbpB4SnEr27Ho","key":"getConfigTest161108422602506352","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-19T19:23:47+00:00"},{"etag":"XkvXojetBK9ZlqSA31xJQRoTkaW","key":"getConfigurationSettingByDate161074429609000557","label":null,"content_type":null,"value":"value2","tags":{},"locked":false,"last_modified":"2021-01-15T20:58:18+00:00"},{"etag":"nHv3BdAA9Pk7oiwXUfaABrKyjuX","key":"getConfigurationSettingByDate161108422389005765","label":null,"content_type":null,"value":"value2","tags":{},"locked":false,"last_modified":"2021-01-19T19:23:46+00:00"},{"etag":"SjrjoNTI2MUofQnVTRQ8VwvHHLq","key":"listConfigSetting0A161073704565802334","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T18:57:28+00:00"},{"etag":"9rr7iJRhJsWDOR5BxMQF7Bk0qdB","key":"listConfigSetting0A161073704565802334","label":"listConfigSettingsLabel161073704565807216","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T18:57:26+00:00"},{"etag":"CI57l0WMyOQBLrH1v6a1O1CAKH9","key":"listConfigSetting0A161073710509701052","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T18:58:27+00:00"},{"etag":"CMIlktNZSAOntw5KPHQrb8cpdDw","key":"listConfigSetting0A161073710509701052","label":"listConfigSettingsLabel161073710509704279","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T18:58:26+00:00"},{"etag":"tOGv8pszZwnXwpnWe8AR49T5uL0","key":"listConfigSetting0A161073714966906934","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T18:59:12+00:00"},{"etag":"2rLdWh9dV6AafugsfgYqFzh8L6o","key":"listConfigSetting0A161073714966906934","label":"listConfigSettingsLabel161073714966901367","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T18:59:10+00:00"},{"etag":"rwRIMGXidOnUSYlWpab9GxdG2k2","key":"listConfigSetting0A161073728698800416","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:01:29+00:00"},{"etag":"56HHtzW0UbF6GbxWtuZqNHQWVQP","key":"listConfigSetting0A161073728698800416","label":"listConfigSettingsLabel161073728698802371","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:01:28+00:00"},{"etag":"kMaO7LO0XxhC829oNVVhO2X29au","key":"listConfigSetting0A161073731546209885","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:01:58+00:00"},{"etag":"jqWjrYRsA6VQHzDZ5cXuGVa3rNZ","key":"listConfigSetting0A161073731546209885","label":"listConfigSettingsLabel161073731546300177","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:01:56+00:00"},{"etag":"iBrlZQVR8xh2OlM7sw4O1K4BPAG","key":"listConfigSetting0A161073737706407919","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:02:59+00:00"},{"etag":"YQhDaA7IziSwZ6mftMIw6OWYGYp","key":"listConfigSetting0A161073737706407919","label":"listConfigSettingsLabel161073737706507557","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:02:58+00:00"},{"etag":"KxcBJBke6zxUbq8X8lO1FubDBs5","key":"listConfigSetting0A161073749289501505","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:04:55+00:00"},{"etag":"hSJvLtbrkoOYPoCov5tpbuQeDdj","key":"listConfigSetting0A161073749289501505","label":"listConfigSettingsLabel161073749289504063","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:04:54+00:00"},{"etag":"f1oWLU1Vg7boIJVxNFk1GMxYhmx","key":"listConfigSetting0A161073754195700998","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:05:44+00:00"},{"etag":"tLjBHS9gMz3AAgHUWy8Y27PoZ3F","key":"listConfigSetting0A161073754195700998","label":"listConfigSettingsLabel161073754195701085","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:05:43+00:00"},{"etag":"g2NWNZEHrCecjOr4XliMbpUyXB1","key":"listConfigSetting0A161073761478703769","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:06:57+00:00"},{"etag":"mM6K1O5ZHZTUTEfodeYeh254gUg","key":"listConfigSetting0A161073761478703769","label":"listConfigSettingsLabel161073761478804593","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:06:56+00:00"},{"etag":"0fEyqfJluVr7foJhAwNX06skXI6","key":"listConfigSetting0A161073772183601576","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:08:44+00:00"},{"etag":"zH6kD417ndyfbizt0DaeQAfAcNW","key":"listConfigSetting0A161073772183601576","label":"listConfigSettingsLabel161073772183600122","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:08:43+00:00"},{"etag":"qIQDGE4MPc0qvZoUboTP8Esi9rQ","key":"listConfigSetting0A161073776208509858","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:09:24+00:00"},{"etag":"AT1qLQnc3Quz3ssmwjaGngcJYQB","key":"listConfigSetting0A161073776208509858","label":"listConfigSettingsLabel161073776208506197","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:09:23+00:00"},{"etag":"z6fKM3LdbdyIgjYCj7GTAH6a6jn","key":"listConfigSetting0A161073781131400396","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:10:13+00:00"},{"etag":"kZ0o2YTUqYvil5v3E6oJL80HskE","key":"listConfigSetting0A161073781131400396","label":"listConfigSettingsLabel161073781131505928","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:10:12+00:00"},{"etag":"esIOoJDG64XW5Y4nUEjiTQvPwYU","key":"listConfigSetting0A161073786411600060","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:11:07+00:00"},{"etag":"18ANEMd4cSbihTiEVDIybDGRkqj","key":"listConfigSetting0A161073786411600060","label":"listConfigSettingsLabel161073786411708709","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:11:05+00:00"},{"etag":"hO8s17BhWO6jz9t8NUouNwMOBqP","key":"listConfigSetting0A161073856807000040","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:22:50+00:00"},{"etag":"75FeqrHHNFVfzSbX0qZkg4wG8Qc","key":"listConfigSetting0A161073856807000040","label":"listConfigSettingsLabel161073856807008391","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:22:49+00:00"},{"etag":"Cr0gJHo2g6WSbxS9LhEgJMoIBnv","key":"listConfigSetting0A161073863439709352","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:23:57+00:00"},{"etag":"cPW5BoNHIwlA7lWcPpYox3lj0Qu","key":"listConfigSetting0A161073863439709352","label":"listConfigSettingsLabel161073863439704889","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:23:55+00:00"},{"etag":"Hsr25jjFZY7ZU6TcUi51VLBR79H","key":"listConfigSetting0A161073890449704174","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:28:27+00:00"},{"etag":"qvIDtANb1OO8IOgtMReYURHyGcR","key":"listConfigSetting0A161073890449704174","label":"listConfigSettingsLabel161073890449807584","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:28:25+00:00"},{"etag":"zIo7OfY2pAmE8hj9aqxVouIzSr1","key":"listConfigSetting0A161073892766005758","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:28:50+00:00"},{"etag":"vnILAPwRc6lno9zaXOVo6ukoF6E","key":"listConfigSetting0A161073892766005758","label":"listConfigSettingsLabel161073892766105921","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:28:48+00:00"},{"etag":"IxmQugtMIts8NgTcmAMOUTEBhOg","key":"listConfigSetting0A161073947792600920","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T19:38:00+00:00"},{"etag":"JTCxntcUPaRfbTHGAOXz1PIClDA","key":"listConfigSetting0A161073947792600920","label":"listConfigSettingsLabel161073947792605674","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T19:37:59+00:00"},{"etag":"hoyxVC0by1A5lmcwReKTBA51fMx","key":"listConfigSetting0A161074093652203884","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:02:19+00:00"},{"etag":"3FRNMNmDOZI5vJkVCx0w2QFYXP8","key":"listConfigSetting0A161074093652203884","label":"listConfigSettingsLabel161074093652308772","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:02:17+00:00"},{"etag":"LMz31Bus6jBO4Pz6j6FTQ8huex2","key":"listConfigSetting0A161074147854906695","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:11:21+00:00"},{"etag":"VSz0LqVHW4WJ70ydzMLfJV9eDH0","key":"listConfigSetting0A161074147854906695","label":"listConfigSettingsLabel161074147855001821","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:11:19+00:00"},{"etag":"q7a2DhO9A1PxHyNu66rCsyPf8x3","key":"listConfigSetting0A161074151122907497","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:11:53+00:00"},{"etag":"tcntn9cWL3DKxhRe1iE8gbxO3VH","key":"listConfigSetting0A161074151122907497","label":"listConfigSettingsLabel161074151122906586","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:11:52+00:00"},{"etag":"njnMJurmmKkKeZ21uog7VrNwm0m","key":"listConfigSetting0A161074215129003660","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:22:34+00:00"},{"etag":"8180rLmQK6Fylzy812A3XyCVpCv","key":"listConfigSetting0A161074215129003660","label":"listConfigSettingsLabel161074215129105758","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:22:32+00:00"},{"etag":"JRoXbpPaGYymblwZME7GfuLoevv","key":"listConfigSetting0A161074221975704280","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:23:42+00:00"},{"etag":"40m5julD9aq2cRK0M8E1kz1mYB1","key":"listConfigSetting0A161074221975704280","label":"listConfigSettingsLabel161074221975802849","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:23:41+00:00"},{"etag":"TkDjGUMA0xWmxSMrr6oc08Rzvz5","key":"listConfigSetting0A161074240793207730","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:26:50+00:00"},{"etag":"qDQRWjbUBTVWo53s4qZfBciY9mL","key":"listConfigSetting0A161074240793207730","label":"listConfigSettingsLabel161074240793205581","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:26:49+00:00"},{"etag":"EYmJeSA5PS2ad9haOMKAQgCvfs2","key":"listConfigSetting0A161074282268505104","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:33:45+00:00"},{"etag":"MyG2jbKCNH9st7y09bUbooE1U96","key":"listConfigSetting0A161074282268505104","label":"listConfigSettingsLabel161074282268500389","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:33:44+00:00"},{"etag":"CP7kOFZGFHK8NqcRur0NSfFtmus","key":"listConfigSetting0A161074296000108887","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:36:02+00:00"},{"etag":"cfZJv1RqteBmnlz0G7R1NIyiHF5","key":"listConfigSetting0A161074296000108887","label":"listConfigSettingsLabel161074296000206790","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:36:01+00:00"},{"etag":"HQCGQoyN02rRfC0KoMiXknrSwZF","key":"listConfigSetting0A161074326100805357","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:41:03+00:00"},{"etag":"JUGHxY14i8vasMntqTg5q4DuKgE","key":"listConfigSetting0A161074326100805357","label":"listConfigSettingsLabel161074326100804061","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:41:02+00:00"},{"etag":"MxH7IROxgzkIYgIlRh2bGF6MdTm","key":"listConfigSetting0A161074336483903708","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:42:47+00:00"},{"etag":"C1bVSm2MCUmfYlC0Aywwp3Logwx","key":"listConfigSetting0A161074336483903708","label":"listConfigSettingsLabel161074336483903907","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:42:45+00:00"},{"etag":"LJnoTP48t3WdRRq5RE3Nood5PPb","key":"listConfigSetting0A161074341119700307","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:43:33+00:00"},{"etag":"lK1MU071Kp4G5F5sstZNs9HqU9O","key":"listConfigSetting0A161074341119700307","label":"listConfigSettingsLabel161074341119700148","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:43:32+00:00"},{"etag":"8dE4Wp7AUFNFhv8l0vLcnV5JiKt","key":"listConfigSetting0A161074344223206587","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":true,"last_modified":"2021-01-15T20:44:04+00:00"},{"etag":"3eQmCb15GWMwmrM5xLqM4pLxkyj","key":"listConfigSetting0A161074344223206587","label":"listConfigSettingsLabel161074344223205054","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:44:03+00:00"},{"etag":"t2rXeUe7UAcCfjd3gnA8MbGEIo3","key":"listConfigSetting0A161074429934907388","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-15T20:58:20+00:00"},{"etag":"sy0vLFqEDUfw19PwwLHDspTNgJm","key":"listConfigSetting0A161074429934907388","label":"listConfigSettingsLabel161074429935009190","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-15T20:58:20+00:00"},{"etag":"yz1Pffvsv1OWkztUqtPQBIzatf3","key":"listConfigSetting0A161108422711509297","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-19T19:23:48+00:00"},{"etag":"KhG58y0MX4r67d8eo7HTNAb1ffV","key":"listConfigSetting0A161108422711509297","label":"listConfigSettingsLabel161108422711501685","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-19T19:23:48+00:00"},{"etag":"gOQhm44dLzVVhoJSadl7mVblTn0","key":"listConfigSetting0A161110326130703497","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:41:03+00:00"},{"etag":"jL2JKNZUxDGWNhus4N6eW5kJRxX","key":"listConfigSetting0A161110326130703497","label":"listConfigSettingsLabel161110326130707080","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:41:02+00:00"},{"etag":"f8niB8trNBlmf9yaxCrJaB79d5U","key":"listConfigSetting0A161110338537307223","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:43:07+00:00"},{"etag":"1pYbdO40btPR31oEz6xTG9BYFba","key":"listConfigSetting0A161110338537307223","label":"listConfigSettingsLabel161110338537306570","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:43:06+00:00"},{"etag":"8XyPbefJL8cRxuHo1sUQyPZ9LHQ","key":"listConfigSetting0A161110351751709718","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:45:19+00:00"},{"etag":"4PeVLpGpUH1DNaG384GH1rjZuye","key":"listConfigSetting0A161110351751709718","label":"listConfigSettingsLabel161110351751706185","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:45:18+00:00"},{"etag":"P1bsOLYoVt1mlGWZVaAxPWK3EUq","key":"listConfigSetting0A161110360404608420","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:45+00:00"},{"etag":"lRedhuOzSCDsO11pQc0FOgUv8Jq","key":"listConfigSetting0A161110360404608420","label":"listConfigSettingsLabel161110360404609563","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:45+00:00"},{"etag":"O2TtSiZhBMldJmei0YHJKyiSWig","key":"listConfigSetting0B161073704565803172","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-15T18:57:28+00:00"},{"etag":"Xfp99eFaG2Y1YvHJJq7GnYZ5TaN","key":"listConfigSetting0B161073704565803172","label":"listConfigSettingsLabel161073704565807216","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-15T18:57:27+00:00"},{"etag":"lVZbctCUUHWiKGKRKcNDvrpdmRx","key":"listConfigSetting0B161073710509709101","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-15T18:58:27+00:00"},{"etag":"muD6lQ9JaoazpPVx9chJzl7ZlnF","key":"listConfigSetting0B161073710509709101","label":"listConfigSettingsLabel161073710509704279","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-15T18:58:27+00:00"},{"etag":"aqZEpAJKSF919EulFRYt1bZtNSk","key":"listConfigSetting0B161073714966901293","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-15T18:59:11+00:00"},{"etag":"HnAV8zw5rNxIwLevb3C7YDWR1kK","key":"listConfigSetting0B161073714966901293","label":"listConfigSettingsLabel161073714966901367","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-15T18:59:11+00:00"},{"etag":"8NxDh82KKQbptCncN9o0gWykH61","key":"listConfigSetting0B161073728698806373","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-15T19:01:29+00:00"}],"@nextLink":"/kv?api-version=1.0&after=bGlzdENvbmZpZ1NldHRpbmcwQjE2MTA3MzcyODY5ODgwNjM3Mwo%3D"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:49 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Link',
  '</kv?api-version=1.0&after=bGlzdENvbmZpZ1NldHRpbmcwQjE2MTA3MzcyODY5ODgwNjM3Mwo%3D>; rel="next"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2OTI=;sn=3852692',
  'x-ms-request-id',
  '5f555ed2-b67c-4913-996c-bd986380fe91',
  'x-ms-correlation-request-id',
  '5f555ed2-b67c-4913-996c-bd986380fe91',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
