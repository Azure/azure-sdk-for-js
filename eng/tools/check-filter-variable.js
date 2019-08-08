let globFilter = process.argv[2];
if(globFilter === undefined || globFilter ===""){
globFilter = "**";
}
console.log(`##vso[task.setvariable variable=packageFilter]${globFilter}`);