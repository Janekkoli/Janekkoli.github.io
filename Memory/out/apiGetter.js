import { ApiClass } from "./apiClass.js";
const apiPoint = new ApiClass('http://127.0.0.1:8000/');
export async function getSentence() {
    return apiPoint.getApi("sentence");
}
export async function postSentence(sentence) {
    return apiPoint.postApi("putSentence", { sentntn: sentence });
}
