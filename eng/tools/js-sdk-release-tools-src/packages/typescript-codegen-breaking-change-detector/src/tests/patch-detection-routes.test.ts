import { describe, expect, test } from 'vitest';

import { patchRoutes } from '../azure/patch/patch-detection';
import { createTestAstContext } from './utils';
import { DiffLocation, DiffReasons } from '../azure/common/types';

describe('detect routes', async () => {
  // TODO: split into multiple unit tests
  test('routes identified by path', async () => {
    const baselineApiView = `
        export interface ClustersGet {
        a: number;
    }
    export interface Routes {
        (path: "basic", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
        (path: "remove", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
        (path: "change_return_type", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
        (path: "change_para_count", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
        (path: "change_para_type", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;
    }`;

    const currentApiView = `
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
    }`;

    const astContext = await createTestAstContext(baselineApiView, currentApiView);
    const diffPairs = patchRoutes(astContext);
    expect(diffPairs.length).toBe(5);

    expect(diffPairs[0].location).toBe(DiffLocation.Signature);
    expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
    expect(diffPairs[0].source).toBeUndefined();
    expect(diffPairs[0].target?.node.getText()).toBe(
      '(path: "remove", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;'
    );

    expect(diffPairs[1].location).toBe(DiffLocation.Signature_ReturnType);
    expect(diffPairs[1].reasons).toBe(DiffReasons.TypeChanged);
    expect(diffPairs[1].target?.name).toBe(
      '(path: "change_return_type", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;'
    );

    expect(diffPairs[2].location).toBe(DiffLocation.Signature_ParameterList);
    expect(diffPairs[2].reasons).toBe(DiffReasons.CountChanged);
    expect(diffPairs[2].target?.node.getText()).toBe(
      '(path: "change_para_count", subscriptionId: string, resourceGroupName: string, clusterName: string): ClustersGet;'
    );

    expect(diffPairs[3].location).toBe(DiffLocation.Parameter);
    expect(diffPairs[3].reasons).toBe(DiffReasons.TypeChanged);
    expect(diffPairs[3].target?.node.getText()).toBe('clusterName: string');

    expect(diffPairs[4].location).toBe(DiffLocation.Signature);
    expect(diffPairs[4].reasons).toBe(DiffReasons.Added);
    expect(diffPairs[4].source?.node.getText()).toBe(
      '(path: "add", subscriptionId: string, resourceGroupName: string, clusterName: string): ClusterGetOld;'
    );
    expect(diffPairs[4].target).toBeUndefined();
  });
});
