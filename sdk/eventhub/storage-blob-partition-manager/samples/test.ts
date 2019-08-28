function t(key: string){
    if(!(typeof key==="string" && key)){
        console.log("throw error");
    }

}
console.log("1st");
t("");
console.log("2nd");
t(1 as any);
console.log("3rd");
t("hey");
console.log("4rd");
t(undefined as any);
