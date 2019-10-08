
const fetch = require("node-fetch");

const Get = async () => {
  const res = await fetch(
    "https://docs.google.com/document/export?format=txt&id=1SWsU4Dv93oqN67IuVAa9W8Qh75GeNWgA8C3MUKMOfLQ&token=AC4w5VgI0vCcwM4qgBYm5QHFEE3upEWAgQ%3A1540802477358&includes_info_params=true"
  );
  const text = await res.text();
  const cutText = text.substring(1, text.length)
  const jsonObject = JSON.parse(cutText);
  return jsonObject;
};

module.exports = {
  Get
};
