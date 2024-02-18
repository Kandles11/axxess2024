export function onCodeScan(code) {
    let temp = {
        "user": "Temp",
        "barcode": {code},
        "servings": "1"
    }
    postMessage(temp, "10.169.170.135:3000/v1/food/");
}
