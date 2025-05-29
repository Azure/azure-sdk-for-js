import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualMachineTemplates } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { VirtualMachineTemplate, VirtualMachineTemplatesListOptionalParams, VirtualMachineTemplatesGetOptionalParams, VirtualMachineTemplatesGetResponse } from "../models/index.js";
/** Class containing VirtualMachineTemplates operations. */
export declare class VirtualMachineTemplatesImpl implements VirtualMachineTemplates {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualMachineTemplates class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Returns list of virtual machine templates in region for private cloud
     * @param pcName The private cloud name
     * @param regionId The region Id (westus, eastus)
     * @param resourcePoolName Resource pool used to derive vSphere cluster which contains VM templates
     * @param options The options parameters.
     */
    list(pcName: string, regionId: string, resourcePoolName: string, options?: VirtualMachineTemplatesListOptionalParams): PagedAsyncIterableIterator<VirtualMachineTemplate>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Returns list of virtual machine templates in region for private cloud
     * @param pcName The private cloud name
     * @param regionId The region Id (westus, eastus)
     * @param resourcePoolName Resource pool used to derive vSphere cluster which contains VM templates
     * @param options The options parameters.
     */
    private _list;
    /**
     * Returns virtual machine templates by its name
     * @param regionId The region Id (westus, eastus)
     * @param pcName The private cloud name
     * @param virtualMachineTemplateName virtual machine template id (vsphereId)
     * @param options The options parameters.
     */
    get(regionId: string, pcName: string, virtualMachineTemplateName: string, options?: VirtualMachineTemplatesGetOptionalParams): Promise<VirtualMachineTemplatesGetResponse>;
    /**
     * ListNext
     * @param pcName The private cloud name
     * @param regionId The region Id (westus, eastus)
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualMachineTemplates.d.ts.map