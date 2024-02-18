export function onCodeScan(code: string) {
    let temp = {
        "user": "Temp",
        "barcode": {code},
        "calories": 3,
        "score": 5
    }
    fetch("http://172.20.10.8:3000/v1/food/", {
      method: "POST", body: JSON.stringify(temp), headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data); // Check the data returned by the API
      });
}


