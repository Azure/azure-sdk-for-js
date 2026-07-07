# patch

``` ts
export interface ClustersGet {
    a: number;
}

export interface Routes {
    (path: "basic", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
    (path: "remove", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
    (path: "change_return_type", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
    (path: "change_para_count", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
    (path: "change_para_type", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
}

export type typesChange = "basic" | "remove";
export type typesRemove = "basic" | "remove";

export interface A {a: string;}
export interface B {b: string;}
export interface C {c: string;}
export interface D {d: string;}
export function isUnexpected(response: A | B): response is A;
export function isUnexpected(response: C | D): response is A;

export function funcBasic(a: string): string
export function funcReturnType(a: string): string
export function funcParameterCount(a: string, b: string): string
export function funcParameterType(a: string): string
export function funcRemove(a: string): string

// ignore generic types
export type TypeGeneric<T> = InterfaceGeneric<T>;
```
