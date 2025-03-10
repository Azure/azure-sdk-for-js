import { OAuth2Flow } from "./schemes.js";

export interface GetTokenOptions {
  abortSignal?: AbortSignal;
}

export interface OAuth2TokenCredential<TFlows extends OAuth2Flow> {
  // for @useAuth(OAuth2Auth) we provide the possible flows
  // scope(s) are declared in each flow
  getToken(flows: TFlows[], options: GetTokenOptions): Promise<string>;
}

export interface BearerTokenCredential {
  // for @useAuth(BearerAuth) we provide no information whatsoever
  getToken(options: GetTokenOptions): Promise<string>;
}

export interface BasicCredential {
  username: string;
  password: string;
}

export interface ApiKeyCredential {
  key: string;
}

export type AuthCredential =
  | OAuth2TokenCredential<OAuth2Flow>
  | BearerTokenCredential
  | BasicCredential
  | ApiKeyCredential;

export function isOAuth2TokenCredential(
  credential: AuthCredential,
): credential is OAuth2TokenCredential<OAuth2Flow> {
  return "getToken" in credential && credential.getToken.length > 1;
}

export function isBearerTokenCredential(
  credential: AuthCredential,
): credential is BearerTokenCredential {
  return "getToken" in credential && credential.getToken.length === 1;
}

export function isBasicCredential(credential: AuthCredential): credential is BasicCredential {
  return "username" in credential && "password" in credential;
}

export function isApiKeyCredential(credential: AuthCredential): credential is ApiKeyCredential {
  return "key" in credential;
}
