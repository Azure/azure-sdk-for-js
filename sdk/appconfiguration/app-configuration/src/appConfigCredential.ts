import * as crypto from "crypto";
import { ServiceClientCredentials, WebResource, URLBuilder } from "@azure/core-http";

export class AppConfigCredential implements ServiceClientCredentials {
  private credential: string;
  private secret: string;

  constructor(credential: string, secret: string) {
    this.credential = credential;
    this.secret = secret;
  }

  signRequest(webResource: WebResource): Promise<WebResource> {
    const verb = webResource.method.toUpperCase()
    const utcNow = new Date().toUTCString();
    const contentHash =
      crypto.createHash("sha256")
        .update(webResource.body || "")
        .digest("base64");

    const signedHeaders = "x-ms-date;host;x-ms-content-sha256";

    const url = URLBuilder.parse(webResource.url);
    const query = url.getQuery();
    const urlPathAndQuery = `${url.getPath()}${ query ? "?" + query : "" }`

    const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${url.getHost()};${contentHash}`;

    const decodedSecret = Buffer.from(this.secret, "base64");
    var signature =
      crypto.createHmac("sha256", decodedSecret)
      .update(stringToSign)
      .digest("base64");

    webResource.headers.set("x-ms-date", utcNow);
    webResource.headers.set("x-ms-content-sha256", contentHash);
    webResource.headers.set("Authorization", `HMAC-SHA256 Credential=${this.credential}, SignedHeaders=${signedHeaders}, Signature=${signature}`);

    return Promise.resolve(webResource);
  }
}
