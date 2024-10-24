// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ListApplications200Response,
  ListApplicationsDefaultResponse,
  GetApplication200Response,
  GetApplicationDefaultResponse,
  ListPoolUsageMetrics200Response,
  ListPoolUsageMetricsDefaultResponse,
  CreatePool201Response,
  CreatePoolDefaultResponse,
  ListPools200Response,
  ListPoolsDefaultResponse,
  DeletePool202Response,
  DeletePoolDefaultResponse,
  PoolExists200Response,
  PoolExists404Response,
  PoolExistsDefaultResponse,
  GetPool200Response,
  GetPoolDefaultResponse,
  UpdatePool200Response,
  UpdatePoolDefaultResponse,
  DisablePoolAutoScale200Response,
  DisablePoolAutoScaleDefaultResponse,
  EnablePoolAutoScale200Response,
  EnablePoolAutoScaleDefaultResponse,
  EvaluatePoolAutoScale200Response,
  EvaluatePoolAutoScaleDefaultResponse,
  ResizePool202Response,
  ResizePoolDefaultResponse,
  StopPoolResize202Response,
  StopPoolResizeDefaultResponse,
  ReplacePoolProperties204Response,
  ReplacePoolPropertiesDefaultResponse,
  RemoveNodes202Response,
  RemoveNodesDefaultResponse,
  ListSupportedImages200Response,
  ListSupportedImagesDefaultResponse,
  ListPoolNodeCounts200Response,
  ListPoolNodeCountsDefaultResponse,
  DeleteJob202Response,
  DeleteJobDefaultResponse,
  GetJob200Response,
  GetJobDefaultResponse,
  UpdateJob200Response,
  UpdateJobDefaultResponse,
  ReplaceJob200Response,
  ReplaceJobDefaultResponse,
  DisableJob202Response,
  DisableJobDefaultResponse,
  EnableJob202Response,
  EnableJobDefaultResponse,
  TerminateJob202Response,
  TerminateJobDefaultResponse,
  CreateJob201Response,
  CreateJobDefaultResponse,
  ListJobs200Response,
  ListJobsDefaultResponse,
  ListJobsFromSchedule200Response,
  ListJobsFromScheduleDefaultResponse,
  ListJobPreparationAndReleaseTaskStatus200Response,
  ListJobPreparationAndReleaseTaskStatusDefaultResponse,
  GetJobTaskCounts200Response,
  GetJobTaskCountsDefaultResponse,
  JobScheduleExists200Response,
  JobScheduleExists404Response,
  JobScheduleExistsDefaultResponse,
  DeleteJobSchedule202Response,
  DeleteJobScheduleDefaultResponse,
  GetJobSchedule200Response,
  GetJobScheduleDefaultResponse,
  UpdateJobSchedule200Response,
  UpdateJobScheduleDefaultResponse,
  ReplaceJobSchedule200Response,
  ReplaceJobScheduleDefaultResponse,
  DisableJobSchedule204Response,
  DisableJobScheduleDefaultResponse,
  EnableJobSchedule204Response,
  EnableJobScheduleDefaultResponse,
  TerminateJobSchedule202Response,
  TerminateJobScheduleDefaultResponse,
  CreateJobSchedule201Response,
  CreateJobScheduleDefaultResponse,
  ListJobSchedules200Response,
  ListJobSchedulesDefaultResponse,
  CreateTask201Response,
  CreateTaskDefaultResponse,
  ListTasks200Response,
  ListTasksDefaultResponse,
  CreateTaskCollection200Response,
  CreateTaskCollectionDefaultResponse,
  DeleteTask200Response,
  DeleteTaskDefaultResponse,
  GetTask200Response,
  GetTaskDefaultResponse,
  ReplaceTask200Response,
  ReplaceTaskDefaultResponse,
  ListSubTasks200Response,
  ListSubTasksDefaultResponse,
  TerminateTask204Response,
  TerminateTaskDefaultResponse,
  ReactivateTask204Response,
  ReactivateTaskDefaultResponse,
  DeleteTaskFile200Response,
  DeleteTaskFileDefaultResponse,
  GetTaskFile200Response,
  GetTaskFileDefaultResponse,
  GetTaskFileProperties200Response,
  GetTaskFilePropertiesDefaultResponse,
  ListTaskFiles200Response,
  ListTaskFilesDefaultResponse,
  CreateNodeUser201Response,
  CreateNodeUserDefaultResponse,
  DeleteNodeUser200Response,
  DeleteNodeUserDefaultResponse,
  ReplaceNodeUser200Response,
  ReplaceNodeUserDefaultResponse,
  GetNode200Response,
  GetNodeDefaultResponse,
  RebootNode202Response,
  RebootNodeDefaultResponse,
  StartNode202Response,
  StartNodeDefaultResponse,
  DeallocateNode202Response,
  DeallocateNodeDefaultResponse,
  ReimageNode202Response,
  ReimageNodeDefaultResponse,
  DisableNodeScheduling200Response,
  DisableNodeSchedulingDefaultResponse,
  EnableNodeScheduling200Response,
  EnableNodeSchedulingDefaultResponse,
  GetNodeRemoteLoginSettings200Response,
  GetNodeRemoteLoginSettingsDefaultResponse,
  UploadNodeLogs200Response,
  UploadNodeLogsDefaultResponse,
  ListNodes200Response,
  ListNodesDefaultResponse,
  GetNodeExtension200Response,
  GetNodeExtensionDefaultResponse,
  ListNodeExtensions200Response,
  ListNodeExtensionsDefaultResponse,
  DeleteNodeFile200Response,
  DeleteNodeFileDefaultResponse,
  GetNodeFile200Response,
  GetNodeFileDefaultResponse,
  GetNodeFileProperties200Response,
  GetNodeFilePropertiesDefaultResponse,
  ListNodeFiles200Response,
  ListNodeFilesDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /applications": ["200"],
  "GET /applications/{applicationId}": ["200"],
  "GET /poolusagemetrics": ["200"],
  "POST /pools": ["201"],
  "GET /pools": ["200"],
  "DELETE /pools/{poolId}": ["202"],
  "HEAD /pools/{poolId}": ["200", "404"],
  "GET /pools/{poolId}": ["200"],
  "PATCH /pools/{poolId}": ["200"],
  "POST /pools/{poolId}/disableautoscale": ["200"],
  "POST /pools/{poolId}/enableautoscale": ["200"],
  "POST /pools/{poolId}/evaluateautoscale": ["200"],
  "POST /pools/{poolId}/resize": ["202"],
  "POST /pools/{poolId}/stopresize": ["202"],
  "POST /pools/{poolId}/updateproperties": ["204"],
  "POST /pools/{poolId}/removenodes": ["202"],
  "GET /supportedimages": ["200"],
  "GET /nodecounts": ["200"],
  "DELETE /jobs/{jobId}": ["202"],
  "GET /jobs/{jobId}": ["200"],
  "PATCH /jobs/{jobId}": ["200"],
  "PUT /jobs/{jobId}": ["200"],
  "POST /jobs/{jobId}/disable": ["202"],
  "POST /jobs/{jobId}/enable": ["202"],
  "POST /jobs/{jobId}/terminate": ["202"],
  "POST /jobs": ["201"],
  "GET /jobs": ["200"],
  "GET /jobschedules/{jobScheduleId}/jobs": ["200"],
  "GET /jobs/{jobId}/jobpreparationandreleasetaskstatus": ["200"],
  "GET /jobs/{jobId}/taskcounts": ["200"],
  "HEAD /jobschedules/{jobScheduleId}": ["200", "404"],
  "DELETE /jobschedules/{jobScheduleId}": ["202"],
  "GET /jobschedules/{jobScheduleId}": ["200"],
  "PATCH /jobschedules/{jobScheduleId}": ["200"],
  "PUT /jobschedules/{jobScheduleId}": ["200"],
  "POST /jobschedules/{jobScheduleId}/disable": ["204"],
  "POST /jobschedules/{jobScheduleId}/enable": ["204"],
  "POST /jobschedules/{jobScheduleId}/terminate": ["202"],
  "POST /jobschedules": ["201"],
  "GET /jobschedules": ["200"],
  "POST /jobs/{jobId}/tasks": ["201"],
  "GET /jobs/{jobId}/tasks": ["200"],
  "POST /jobs/{jobId}/addtaskcollection": ["200"],
  "DELETE /jobs/{jobId}/tasks/{taskId}": ["200"],
  "GET /jobs/{jobId}/tasks/{taskId}": ["200"],
  "PUT /jobs/{jobId}/tasks/{taskId}": ["200"],
  "GET /jobs/{jobId}/tasks/{taskId}/subtasksinfo": ["200"],
  "POST /jobs/{jobId}/tasks/{taskId}/terminate": ["204"],
  "POST /jobs/{jobId}/tasks/{taskId}/reactivate": ["204"],
  "DELETE /jobs/{jobId}/tasks/{taskId}/files/{filePath}": ["200"],
  "GET /jobs/{jobId}/tasks/{taskId}/files/{filePath}": ["200"],
  "HEAD /jobs/{jobId}/tasks/{taskId}/files/{filePath}": ["200"],
  "GET /jobs/{jobId}/tasks/{taskId}/files": ["200"],
  "POST /pools/{poolId}/nodes/{nodeId}/users": ["201"],
  "DELETE /pools/{poolId}/nodes/{nodeId}/users/{userName}": ["200"],
  "PUT /pools/{poolId}/nodes/{nodeId}/users/{userName}": ["200"],
  "GET /pools/{poolId}/nodes/{nodeId}": ["200"],
  "POST /pools/{poolId}/nodes/{nodeId}/reboot": ["202"],
  "POST /pools/{poolId}/nodes/{nodeId}/start": ["202"],
  "POST /pools/{poolId}/nodes/{nodeId}/deallocate": ["202"],
  "POST /pools/{poolId}/nodes/{nodeId}/reimage": ["202"],
  "POST /pools/{poolId}/nodes/{nodeId}/disablescheduling": ["200"],
  "POST /pools/{poolId}/nodes/{nodeId}/enablescheduling": ["200"],
  "GET /pools/{poolId}/nodes/{nodeId}/remoteloginsettings": ["200"],
  "POST /pools/{poolId}/nodes/{nodeId}/uploadbatchservicelogs": ["200"],
  "GET /pools/{poolId}/nodes": ["200"],
  "GET /pools/{poolId}/nodes/{nodeId}/extensions/{extensionName}": ["200"],
  "GET /pools/{poolId}/nodes/{nodeId}/extensions": ["200"],
  "DELETE /pools/{poolId}/nodes/{nodeId}/files/{filePath}": ["200"],
  "GET /pools/{poolId}/nodes/{nodeId}/files/{filePath}": ["200"],
  "HEAD /pools/{poolId}/nodes/{nodeId}/files/{filePath}": ["200"],
  "GET /pools/{poolId}/nodes/{nodeId}/files": ["200"],
};

export function isUnexpected(
  response: ListApplications200Response | ListApplicationsDefaultResponse,
): response is ListApplicationsDefaultResponse;
export function isUnexpected(
  response: GetApplication200Response | GetApplicationDefaultResponse,
): response is GetApplicationDefaultResponse;
export function isUnexpected(
  response: ListPoolUsageMetrics200Response | ListPoolUsageMetricsDefaultResponse,
): response is ListPoolUsageMetricsDefaultResponse;
export function isUnexpected(
  response: CreatePool201Response | CreatePoolDefaultResponse,
): response is CreatePoolDefaultResponse;
export function isUnexpected(
  response: ListPools200Response | ListPoolsDefaultResponse,
): response is ListPoolsDefaultResponse;
export function isUnexpected(
  response: DeletePool202Response | DeletePoolDefaultResponse,
): response is DeletePoolDefaultResponse;
export function isUnexpected(
  response: PoolExists200Response | PoolExists404Response | PoolExistsDefaultResponse,
): response is PoolExistsDefaultResponse;
export function isUnexpected(
  response: GetPool200Response | GetPoolDefaultResponse,
): response is GetPoolDefaultResponse;
export function isUnexpected(
  response: UpdatePool200Response | UpdatePoolDefaultResponse,
): response is UpdatePoolDefaultResponse;
export function isUnexpected(
  response: DisablePoolAutoScale200Response | DisablePoolAutoScaleDefaultResponse,
): response is DisablePoolAutoScaleDefaultResponse;
export function isUnexpected(
  response: EnablePoolAutoScale200Response | EnablePoolAutoScaleDefaultResponse,
): response is EnablePoolAutoScaleDefaultResponse;
export function isUnexpected(
  response: EvaluatePoolAutoScale200Response | EvaluatePoolAutoScaleDefaultResponse,
): response is EvaluatePoolAutoScaleDefaultResponse;
export function isUnexpected(
  response: ResizePool202Response | ResizePoolDefaultResponse,
): response is ResizePoolDefaultResponse;
export function isUnexpected(
  response: StopPoolResize202Response | StopPoolResizeDefaultResponse,
): response is StopPoolResizeDefaultResponse;
export function isUnexpected(
  response: ReplacePoolProperties204Response | ReplacePoolPropertiesDefaultResponse,
): response is ReplacePoolPropertiesDefaultResponse;
export function isUnexpected(
  response: RemoveNodes202Response | RemoveNodesDefaultResponse,
): response is RemoveNodesDefaultResponse;
export function isUnexpected(
  response: ListSupportedImages200Response | ListSupportedImagesDefaultResponse,
): response is ListSupportedImagesDefaultResponse;
export function isUnexpected(
  response: ListPoolNodeCounts200Response | ListPoolNodeCountsDefaultResponse,
): response is ListPoolNodeCountsDefaultResponse;
export function isUnexpected(
  response: DeleteJob202Response | DeleteJobDefaultResponse,
): response is DeleteJobDefaultResponse;
export function isUnexpected(
  response: GetJob200Response | GetJobDefaultResponse,
): response is GetJobDefaultResponse;
export function isUnexpected(
  response: UpdateJob200Response | UpdateJobDefaultResponse,
): response is UpdateJobDefaultResponse;
export function isUnexpected(
  response: ReplaceJob200Response | ReplaceJobDefaultResponse,
): response is ReplaceJobDefaultResponse;
export function isUnexpected(
  response: DisableJob202Response | DisableJobDefaultResponse,
): response is DisableJobDefaultResponse;
export function isUnexpected(
  response: EnableJob202Response | EnableJobDefaultResponse,
): response is EnableJobDefaultResponse;
export function isUnexpected(
  response: TerminateJob202Response | TerminateJobDefaultResponse,
): response is TerminateJobDefaultResponse;
export function isUnexpected(
  response: CreateJob201Response | CreateJobDefaultResponse,
): response is CreateJobDefaultResponse;
export function isUnexpected(
  response: ListJobs200Response | ListJobsDefaultResponse,
): response is ListJobsDefaultResponse;
export function isUnexpected(
  response: ListJobsFromSchedule200Response | ListJobsFromScheduleDefaultResponse,
): response is ListJobsFromScheduleDefaultResponse;
export function isUnexpected(
  response:
    | ListJobPreparationAndReleaseTaskStatus200Response
    | ListJobPreparationAndReleaseTaskStatusDefaultResponse,
): response is ListJobPreparationAndReleaseTaskStatusDefaultResponse;
export function isUnexpected(
  response: GetJobTaskCounts200Response | GetJobTaskCountsDefaultResponse,
): response is GetJobTaskCountsDefaultResponse;
export function isUnexpected(
  response:
    | JobScheduleExists200Response
    | JobScheduleExists404Response
    | JobScheduleExistsDefaultResponse,
): response is JobScheduleExistsDefaultResponse;
export function isUnexpected(
  response: DeleteJobSchedule202Response | DeleteJobScheduleDefaultResponse,
): response is DeleteJobScheduleDefaultResponse;
export function isUnexpected(
  response: GetJobSchedule200Response | GetJobScheduleDefaultResponse,
): response is GetJobScheduleDefaultResponse;
export function isUnexpected(
  response: UpdateJobSchedule200Response | UpdateJobScheduleDefaultResponse,
): response is UpdateJobScheduleDefaultResponse;
export function isUnexpected(
  response: ReplaceJobSchedule200Response | ReplaceJobScheduleDefaultResponse,
): response is ReplaceJobScheduleDefaultResponse;
export function isUnexpected(
  response: DisableJobSchedule204Response | DisableJobScheduleDefaultResponse,
): response is DisableJobScheduleDefaultResponse;
export function isUnexpected(
  response: EnableJobSchedule204Response | EnableJobScheduleDefaultResponse,
): response is EnableJobScheduleDefaultResponse;
export function isUnexpected(
  response: TerminateJobSchedule202Response | TerminateJobScheduleDefaultResponse,
): response is TerminateJobScheduleDefaultResponse;
export function isUnexpected(
  response: CreateJobSchedule201Response | CreateJobScheduleDefaultResponse,
): response is CreateJobScheduleDefaultResponse;
export function isUnexpected(
  response: ListJobSchedules200Response | ListJobSchedulesDefaultResponse,
): response is ListJobSchedulesDefaultResponse;
export function isUnexpected(
  response: CreateTask201Response | CreateTaskDefaultResponse,
): response is CreateTaskDefaultResponse;
export function isUnexpected(
  response: ListTasks200Response | ListTasksDefaultResponse,
): response is ListTasksDefaultResponse;
export function isUnexpected(
  response: CreateTaskCollection200Response | CreateTaskCollectionDefaultResponse,
): response is CreateTaskCollectionDefaultResponse;
export function isUnexpected(
  response: DeleteTask200Response | DeleteTaskDefaultResponse,
): response is DeleteTaskDefaultResponse;
export function isUnexpected(
  response: GetTask200Response | GetTaskDefaultResponse,
): response is GetTaskDefaultResponse;
export function isUnexpected(
  response: ReplaceTask200Response | ReplaceTaskDefaultResponse,
): response is ReplaceTaskDefaultResponse;
export function isUnexpected(
  response: ListSubTasks200Response | ListSubTasksDefaultResponse,
): response is ListSubTasksDefaultResponse;
export function isUnexpected(
  response: TerminateTask204Response | TerminateTaskDefaultResponse,
): response is TerminateTaskDefaultResponse;
export function isUnexpected(
  response: ReactivateTask204Response | ReactivateTaskDefaultResponse,
): response is ReactivateTaskDefaultResponse;
export function isUnexpected(
  response: DeleteTaskFile200Response | DeleteTaskFileDefaultResponse,
): response is DeleteTaskFileDefaultResponse;
export function isUnexpected(
  response: GetTaskFile200Response | GetTaskFileDefaultResponse,
): response is GetTaskFileDefaultResponse;
export function isUnexpected(
  response: GetTaskFileProperties200Response | GetTaskFilePropertiesDefaultResponse,
): response is GetTaskFilePropertiesDefaultResponse;
export function isUnexpected(
  response: ListTaskFiles200Response | ListTaskFilesDefaultResponse,
): response is ListTaskFilesDefaultResponse;
export function isUnexpected(
  response: CreateNodeUser201Response | CreateNodeUserDefaultResponse,
): response is CreateNodeUserDefaultResponse;
export function isUnexpected(
  response: DeleteNodeUser200Response | DeleteNodeUserDefaultResponse,
): response is DeleteNodeUserDefaultResponse;
export function isUnexpected(
  response: ReplaceNodeUser200Response | ReplaceNodeUserDefaultResponse,
): response is ReplaceNodeUserDefaultResponse;
export function isUnexpected(
  response: GetNode200Response | GetNodeDefaultResponse,
): response is GetNodeDefaultResponse;
export function isUnexpected(
  response: RebootNode202Response | RebootNodeDefaultResponse,
): response is RebootNodeDefaultResponse;
export function isUnexpected(
  response: StartNode202Response | StartNodeDefaultResponse,
): response is StartNodeDefaultResponse;
export function isUnexpected(
  response: DeallocateNode202Response | DeallocateNodeDefaultResponse,
): response is DeallocateNodeDefaultResponse;
export function isUnexpected(
  response: ReimageNode202Response | ReimageNodeDefaultResponse,
): response is ReimageNodeDefaultResponse;
export function isUnexpected(
  response: DisableNodeScheduling200Response | DisableNodeSchedulingDefaultResponse,
): response is DisableNodeSchedulingDefaultResponse;
export function isUnexpected(
  response: EnableNodeScheduling200Response | EnableNodeSchedulingDefaultResponse,
): response is EnableNodeSchedulingDefaultResponse;
export function isUnexpected(
  response: GetNodeRemoteLoginSettings200Response | GetNodeRemoteLoginSettingsDefaultResponse,
): response is GetNodeRemoteLoginSettingsDefaultResponse;
export function isUnexpected(
  response: UploadNodeLogs200Response | UploadNodeLogsDefaultResponse,
): response is UploadNodeLogsDefaultResponse;
export function isUnexpected(
  response: ListNodes200Response | ListNodesDefaultResponse,
): response is ListNodesDefaultResponse;
export function isUnexpected(
  response: GetNodeExtension200Response | GetNodeExtensionDefaultResponse,
): response is GetNodeExtensionDefaultResponse;
export function isUnexpected(
  response: ListNodeExtensions200Response | ListNodeExtensionsDefaultResponse,
): response is ListNodeExtensionsDefaultResponse;
export function isUnexpected(
  response: DeleteNodeFile200Response | DeleteNodeFileDefaultResponse,
): response is DeleteNodeFileDefaultResponse;
export function isUnexpected(
  response: GetNodeFile200Response | GetNodeFileDefaultResponse,
): response is GetNodeFileDefaultResponse;
export function isUnexpected(
  response: GetNodeFileProperties200Response | GetNodeFilePropertiesDefaultResponse,
): response is GetNodeFilePropertiesDefaultResponse;
export function isUnexpected(
  response: ListNodeFiles200Response | ListNodeFilesDefaultResponse,
): response is ListNodeFilesDefaultResponse;
export function isUnexpected(
  response:
    | ListApplications200Response
    | ListApplicationsDefaultResponse
    | GetApplication200Response
    | GetApplicationDefaultResponse
    | ListPoolUsageMetrics200Response
    | ListPoolUsageMetricsDefaultResponse
    | CreatePool201Response
    | CreatePoolDefaultResponse
    | ListPools200Response
    | ListPoolsDefaultResponse
    | DeletePool202Response
    | DeletePoolDefaultResponse
    | PoolExists200Response
    | PoolExists404Response
    | PoolExistsDefaultResponse
    | GetPool200Response
    | GetPoolDefaultResponse
    | UpdatePool200Response
    | UpdatePoolDefaultResponse
    | DisablePoolAutoScale200Response
    | DisablePoolAutoScaleDefaultResponse
    | EnablePoolAutoScale200Response
    | EnablePoolAutoScaleDefaultResponse
    | EvaluatePoolAutoScale200Response
    | EvaluatePoolAutoScaleDefaultResponse
    | ResizePool202Response
    | ResizePoolDefaultResponse
    | StopPoolResize202Response
    | StopPoolResizeDefaultResponse
    | ReplacePoolProperties204Response
    | ReplacePoolPropertiesDefaultResponse
    | RemoveNodes202Response
    | RemoveNodesDefaultResponse
    | ListSupportedImages200Response
    | ListSupportedImagesDefaultResponse
    | ListPoolNodeCounts200Response
    | ListPoolNodeCountsDefaultResponse
    | DeleteJob202Response
    | DeleteJobDefaultResponse
    | GetJob200Response
    | GetJobDefaultResponse
    | UpdateJob200Response
    | UpdateJobDefaultResponse
    | ReplaceJob200Response
    | ReplaceJobDefaultResponse
    | DisableJob202Response
    | DisableJobDefaultResponse
    | EnableJob202Response
    | EnableJobDefaultResponse
    | TerminateJob202Response
    | TerminateJobDefaultResponse
    | CreateJob201Response
    | CreateJobDefaultResponse
    | ListJobs200Response
    | ListJobsDefaultResponse
    | ListJobsFromSchedule200Response
    | ListJobsFromScheduleDefaultResponse
    | ListJobPreparationAndReleaseTaskStatus200Response
    | ListJobPreparationAndReleaseTaskStatusDefaultResponse
    | GetJobTaskCounts200Response
    | GetJobTaskCountsDefaultResponse
    | JobScheduleExists200Response
    | JobScheduleExists404Response
    | JobScheduleExistsDefaultResponse
    | DeleteJobSchedule202Response
    | DeleteJobScheduleDefaultResponse
    | GetJobSchedule200Response
    | GetJobScheduleDefaultResponse
    | UpdateJobSchedule200Response
    | UpdateJobScheduleDefaultResponse
    | ReplaceJobSchedule200Response
    | ReplaceJobScheduleDefaultResponse
    | DisableJobSchedule204Response
    | DisableJobScheduleDefaultResponse
    | EnableJobSchedule204Response
    | EnableJobScheduleDefaultResponse
    | TerminateJobSchedule202Response
    | TerminateJobScheduleDefaultResponse
    | CreateJobSchedule201Response
    | CreateJobScheduleDefaultResponse
    | ListJobSchedules200Response
    | ListJobSchedulesDefaultResponse
    | CreateTask201Response
    | CreateTaskDefaultResponse
    | ListTasks200Response
    | ListTasksDefaultResponse
    | CreateTaskCollection200Response
    | CreateTaskCollectionDefaultResponse
    | DeleteTask200Response
    | DeleteTaskDefaultResponse
    | GetTask200Response
    | GetTaskDefaultResponse
    | ReplaceTask200Response
    | ReplaceTaskDefaultResponse
    | ListSubTasks200Response
    | ListSubTasksDefaultResponse
    | TerminateTask204Response
    | TerminateTaskDefaultResponse
    | ReactivateTask204Response
    | ReactivateTaskDefaultResponse
    | DeleteTaskFile200Response
    | DeleteTaskFileDefaultResponse
    | GetTaskFile200Response
    | GetTaskFileDefaultResponse
    | GetTaskFileProperties200Response
    | GetTaskFilePropertiesDefaultResponse
    | ListTaskFiles200Response
    | ListTaskFilesDefaultResponse
    | CreateNodeUser201Response
    | CreateNodeUserDefaultResponse
    | DeleteNodeUser200Response
    | DeleteNodeUserDefaultResponse
    | ReplaceNodeUser200Response
    | ReplaceNodeUserDefaultResponse
    | GetNode200Response
    | GetNodeDefaultResponse
    | RebootNode202Response
    | RebootNodeDefaultResponse
    | StartNode202Response
    | StartNodeDefaultResponse
    | DeallocateNode202Response
    | DeallocateNodeDefaultResponse
    | ReimageNode202Response
    | ReimageNodeDefaultResponse
    | DisableNodeScheduling200Response
    | DisableNodeSchedulingDefaultResponse
    | EnableNodeScheduling200Response
    | EnableNodeSchedulingDefaultResponse
    | GetNodeRemoteLoginSettings200Response
    | GetNodeRemoteLoginSettingsDefaultResponse
    | UploadNodeLogs200Response
    | UploadNodeLogsDefaultResponse
    | ListNodes200Response
    | ListNodesDefaultResponse
    | GetNodeExtension200Response
    | GetNodeExtensionDefaultResponse
    | ListNodeExtensions200Response
    | ListNodeExtensionsDefaultResponse
    | DeleteNodeFile200Response
    | DeleteNodeFileDefaultResponse
    | GetNodeFile200Response
    | GetNodeFileDefaultResponse
    | GetNodeFileProperties200Response
    | GetNodeFilePropertiesDefaultResponse
    | ListNodeFiles200Response
    | ListNodeFilesDefaultResponse,
): response is
  | ListApplicationsDefaultResponse
  | GetApplicationDefaultResponse
  | ListPoolUsageMetricsDefaultResponse
  | CreatePoolDefaultResponse
  | ListPoolsDefaultResponse
  | DeletePoolDefaultResponse
  | PoolExistsDefaultResponse
  | GetPoolDefaultResponse
  | UpdatePoolDefaultResponse
  | DisablePoolAutoScaleDefaultResponse
  | EnablePoolAutoScaleDefaultResponse
  | EvaluatePoolAutoScaleDefaultResponse
  | ResizePoolDefaultResponse
  | StopPoolResizeDefaultResponse
  | ReplacePoolPropertiesDefaultResponse
  | RemoveNodesDefaultResponse
  | ListSupportedImagesDefaultResponse
  | ListPoolNodeCountsDefaultResponse
  | DeleteJobDefaultResponse
  | GetJobDefaultResponse
  | UpdateJobDefaultResponse
  | ReplaceJobDefaultResponse
  | DisableJobDefaultResponse
  | EnableJobDefaultResponse
  | TerminateJobDefaultResponse
  | CreateJobDefaultResponse
  | ListJobsDefaultResponse
  | ListJobsFromScheduleDefaultResponse
  | ListJobPreparationAndReleaseTaskStatusDefaultResponse
  | GetJobTaskCountsDefaultResponse
  | JobScheduleExistsDefaultResponse
  | DeleteJobScheduleDefaultResponse
  | GetJobScheduleDefaultResponse
  | UpdateJobScheduleDefaultResponse
  | ReplaceJobScheduleDefaultResponse
  | DisableJobScheduleDefaultResponse
  | EnableJobScheduleDefaultResponse
  | TerminateJobScheduleDefaultResponse
  | CreateJobScheduleDefaultResponse
  | ListJobSchedulesDefaultResponse
  | CreateTaskDefaultResponse
  | ListTasksDefaultResponse
  | CreateTaskCollectionDefaultResponse
  | DeleteTaskDefaultResponse
  | GetTaskDefaultResponse
  | ReplaceTaskDefaultResponse
  | ListSubTasksDefaultResponse
  | TerminateTaskDefaultResponse
  | ReactivateTaskDefaultResponse
  | DeleteTaskFileDefaultResponse
  | GetTaskFileDefaultResponse
  | GetTaskFilePropertiesDefaultResponse
  | ListTaskFilesDefaultResponse
  | CreateNodeUserDefaultResponse
  | DeleteNodeUserDefaultResponse
  | ReplaceNodeUserDefaultResponse
  | GetNodeDefaultResponse
  | RebootNodeDefaultResponse
  | StartNodeDefaultResponse
  | DeallocateNodeDefaultResponse
  | ReimageNodeDefaultResponse
  | DisableNodeSchedulingDefaultResponse
  | EnableNodeSchedulingDefaultResponse
  | GetNodeRemoteLoginSettingsDefaultResponse
  | UploadNodeLogsDefaultResponse
  | ListNodesDefaultResponse
  | GetNodeExtensionDefaultResponse
  | ListNodeExtensionsDefaultResponse
  | DeleteNodeFileDefaultResponse
  | GetNodeFileDefaultResponse
  | GetNodeFilePropertiesDefaultResponse
  | ListNodeFilesDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
