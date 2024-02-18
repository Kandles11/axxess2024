import { SERVER_IP, USERID } from "../consts";

export function onCodeScan(code: string, setInfo) {
  fetch(`${SERVER_IP}/v1/food/view/${code}`, {
    method: "GET"
  })
    .then((response) => response.json())
    .then((foodData) => {
      console.log("Food view data", foodData);
      setInfo(foodData);
    })
    .catch(
      setInfo({ name: "Unknown food", calories: 0, score: 0 })
    );
}
