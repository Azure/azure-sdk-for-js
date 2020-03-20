import { AzureKeyCredential } from "@azure/core-auth";
import { URL } from "url";

interface ParsedConnectionString {
  credential: AzureKeyCredential;
  endpoint: string;
}

export function parseConnectionString(conn: string): ParsedConnectionString {
  const em = /Endpoint=(.*?);/g.exec(conn);
  if (!em) throw new TypeError("connection string missing endpoint");
  const endpointPart = em[1];
  const km = /AccessKey=(.*?);/g.exec(conn);
  if (!km) throw new Error("connection string missing access key");
  const key = km[1];
  const credential = new AzureKeyCredential(key);
  const pm = /Port=(.*?);/g.exec(conn);
  const port = pm == null ? "" : pm[1];
  const url = new URL(endpointPart);
  url.port = port;
  const endpoint = url.toString();
  url.port = "";
  // todo: Support PORT with audience n stuff.
  // this.audience = url.toString();

  return { credential, endpoint };
}
