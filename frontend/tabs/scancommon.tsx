import { SERVER_IP, USERID } from "../consts";

export function onCodeScan(code: string) {
    let temp = {
        "user": USERID,
        "barcode": code,
        "calories": 3,
        "score": 5,
        "name": "Test food"
    }
    fetch(`${SERVER_IP}/v1/food/`, {
      method: "POST", body: JSON.stringify(temp), headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data); // Check the data returned by the API
      });
}
