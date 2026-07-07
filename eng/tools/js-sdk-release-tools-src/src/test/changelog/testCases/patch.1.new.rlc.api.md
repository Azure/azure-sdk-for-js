# patch

``` ts
export interface ClustersGet {
    a: string;
}

export interface ClusterGetOld {
    a: number;
}

export interface Routes {
    (path: "basic", subscriptionId: string, resourceGroupName: string, clusterName: string): ClusterGetOld;
    (path: "add", subscriptionId: string, resourceGroupName: string, clusterName: string): ClusterGetOld;
    (path: "change_return_type", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
    (path: "change_para_count", subscriptionId: string, resourceGroupName: string): ClusterGetOld;
    (path: "change_para_type", subscriptionId: string, resourceGroupName: string, clusterName: number): ClusterGetOld;
}

export type typesChange = "basic" | "rEmove";
export type typesAdd = "basic" | "rEmove";

export interface A {a: string;}
export interface B {b: string;}
export interface C {c: string;}
export interface D {d: string;}
export function isUnexpected(response: A | B): response is A;
export function isUnexpected(response: C | E): response is C;

export function funcBasic(a: string): string
export function funcReturnType(a: string): number
export function funcParameterCount(a: string, b: string, c: string): string
export function funcParameterType(a: number): string
export function funcAdd(a: string): string

// ignore generic types
export type TypeGeneric<T> = InterfaceGeneric<T>;
```
