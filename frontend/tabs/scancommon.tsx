export function onCodeScan(code: string) {
    let temp = {
        "user": "Temp",
        "barcode": {code},
        "servings": "1"
    }
    postMessage(temp, "http://172.20.10.8:3000/v1/food/");
}
