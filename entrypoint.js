const axios = require("axios");
const core = require("@actions/core");
const Kakao = require("./kakao_v2.5.0.min.js");

async function main() {
  const kakao_js_key = core.getInput("kakao_js_key");

  Kakao.init(kakao_js_key); // 사용하려는 앱의 JavaScript 키 입력

  const receiver_uuids = core.getInput("receiver_uuids");
  const template_id = core.getInput("template_id");
  const args_json = core.getInput("template_args");

  if (receiver_uuids) {
    try {
      const response = await axios.post(
        "https://kapi.kakao.com/v1/api/talk/friends/message/default/send",
        {
          template_id: templateId,
          template_args: templateArgs,
          receiver_uuids: receiverUuids,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Message sent:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  } else {
    console.log("Sending kakao talk message.");
    Kakao.Share.sendCustom({
      templateId: template_id,
      templateArgs: JSON.parse(args_json),
    });
  }
}

main()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    core.setFailed(err.message);
  });
