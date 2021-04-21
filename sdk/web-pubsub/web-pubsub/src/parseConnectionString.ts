import { AzureKeyCredential } from "@azure/core-auth";
import { URL } from "url";

interface ParsedConnectionString {
  credential: AzureKeyCredential;
  endpoint: string;
}

export function parseConnectionString(conn: string): ParsedConnectionString {
  let parsed: { [id: string]: string } = {};
  conn.split(";").forEach((i) => {
    const pair = i.split("=");
    if (pair.length == 2) {
      parsed[pair[0].toLowerCase()] = pair[1];
    }
  });

  const endpointPart = parsed["endpoint"];
  if (!endpointPart) throw new TypeError("connection string missing endpoint");
  const key = parsed["accesskey"];
  if (!key) throw new TypeError("connection string missing access key");
  const credential = new AzureKeyCredential(key);
  const port = parsed["port"];
  const url = new URL(endpointPart);
  url.port = port;
  const endpoint = url.toString();
  url.port = "";

  return { credential, endpoint };
}
