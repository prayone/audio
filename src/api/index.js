import ajax from "../utils/ajax";

export function course_play(data) {
  return ajax({
    url: "https://m.xdfgk.cn/api/v1.0/volunteer/course_play",
    method: "POST",
    data: data,
  });
}
