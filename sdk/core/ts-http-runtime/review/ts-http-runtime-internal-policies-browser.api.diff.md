# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- export function decompressResponsePolicy(): PipelinePolicy;
+ export function decompressResponsePolicy(): never;
- // @public
+ // @public (undocumented)
- // @public @deprecated
+ // @public (undocumented)
- export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined;
+ export function getDefaultProxySettings(): never;
- export function proxyPolicy(proxySettings?: ProxySettings, options?: {
+ export function proxyPolicy(): never;
-     customNoProxyList?: string[];
+ 
- }): PipelinePolicy;
+ // @public (undocumented)
- 
+ export const proxyPolicyName = "proxyPolicy";
- // @public
+ 
- export const proxyPolicyName = "proxyPolicy";
+ // @public
- 
+ export function redirectPolicy(options?: RedirectPolicyOptions): PipelinePolicy;
- // @public
+ 
- export function redirectPolicy(options?: RedirectPolicyOptions): PipelinePolicy;
+ // @public
- 
+ export const redirectPolicyName = "redirectPolicy";
- // @public
+ 
- export const redirectPolicyName = "redirectPolicy";
+ // @public
- 
+ export interface RedirectPolicyOptions {
- // @public
+     maxRetries?: number;
- export interface RedirectPolicyOptions {
+ }
-     maxRetries?: number;
+ 
- }
+ // @public
- 
+ export interface RetryInformation {
- // @public
+     response?: PipelineResponse;
- export interface RetryInformation {
+     responseError?: RestError;
-     response?: PipelineResponse;
+     retryCount: number;
-     responseError?: RestError;
+ }
-     retryCount: number;
+ 
- }
+ // @public
- 
+ export interface RetryModifiers {
- // @public
+     errorToThrow?: RestError;
- export interface RetryModifiers {
+     redirectTo?: string;
-     errorToThrow?: RestError;
+     retryAfterInMs?: number;
-     redirectTo?: string;
+     skipStrategy?: boolean;
-     retryAfterInMs?: number;
+ }
-     skipStrategy?: boolean;
+ 
- }
+ // @public
- 
+ export function retryPolicy(strategies: RetryStrategy[], options?: RetryPolicyOptions): PipelinePolicy;
- // @public
+ 
- export function retryPolicy(strategies: RetryStrategy[], options?: RetryPolicyOptions): PipelinePolicy;
+ // @public
- 
+ export interface RetryPolicyOptions {
- // @public
+     logger?: TypeSpecRuntimeLogger;
- export interface RetryPolicyOptions {
+     maxRetries?: number;
-     logger?: TypeSpecRuntimeLogger;
+ }
-     maxRetries?: number;
+ 
- }
+ // @public
- 
+ export interface RetryStrategy {
- // @public
+     logger?: TypeSpecRuntimeLogger;
- export interface RetryStrategy {
+     name: string;
-     logger?: TypeSpecRuntimeLogger;
+     retry(state: RetryInformation): RetryModifiers;
-     name: string;
+ }
-     retry(state: RetryInformation): RetryModifiers;
+ 
- }
+ // @public
- 
+ export function systemErrorRetryPolicy(options?: SystemErrorRetryPolicyOptions): PipelinePolicy;
- // @public
+ 
- export function systemErrorRetryPolicy(options?: SystemErrorRetryPolicyOptions): PipelinePolicy;
+ // @public
- 
+ export const systemErrorRetryPolicyName = "systemErrorRetryPolicy";
- // @public
+ 
- export const systemErrorRetryPolicyName = "systemErrorRetryPolicy";
+ // @public
- 
+ export function throttlingRetryPolicy(options?: ThrottlingRetryPolicyOptions): PipelinePolicy;
- // @public
+ 
- export function throttlingRetryPolicy(options?: ThrottlingRetryPolicyOptions): PipelinePolicy;
+ // @public
- 
+ export const throttlingRetryPolicyName = "throttlingRetryPolicy";
- // @public
+ 
- export const throttlingRetryPolicyName = "throttlingRetryPolicy";
+ // @public
- 
+ export function tlsPolicy(tlsSettings?: TlsSettings): PipelinePolicy;
- // @public
+ 
- export function tlsPolicy(tlsSettings?: TlsSettings): PipelinePolicy;
+ // @public
- 
+ export const tlsPolicyName = "tlsPolicy";
- // @public
+ 
- export const tlsPolicyName = "tlsPolicy";
+ // @public
- 
+ export function userAgentPolicy(options?: UserAgentPolicyOptions): PipelinePolicy;
- // @public
+ 
- export function userAgentPolicy(options?: UserAgentPolicyOptions): PipelinePolicy;
+ // @public
- 
+ export const userAgentPolicyName = "userAgentPolicy";
- // @public
+ 
- export const userAgentPolicyName = "userAgentPolicy";
+ // @public
- 
+ export interface UserAgentPolicyOptions {
- // @public
+     userAgentPrefix?: string;
- export interface UserAgentPolicyOptions {
+ }
-     userAgentPrefix?: string;
+ 
- }
+ // (No @packageDocumentation comment for this package)
- // (No @packageDocumentation comment for this package)
+ ```
- 
+ 
- ```
+ 
```