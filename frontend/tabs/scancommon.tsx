import { SERVER_IP, USERID } from "../consts";

function choose(choices: any[]) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

const NAMES = [
  "Ruffles",
  "Doritos Cool Ranch",
  "Pack of Peanuts",
  "12oz Coca-Cola",
  "Water Bottle",
  "BBQ Lays Chips",
  "Nutella",
  "Starbucks Canned Coffee",
  "Nature Valley Granola Bar"
];

export function onCodeScan(code: string) {
    let temp = {
        "user": USERID,
        "barcode": code,
        "calories": 50 + Math.floor(Math.random() * 300),
        "score": 1 + Math.floor(Math.random() * 10),
        "name": choose(NAMES)
    }
    fetch(`${SERVER_IP}/v1/food/`, {
      method: "POST", body: JSON.stringify(temp), headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data); // Check the data returned by the API
      });
}
