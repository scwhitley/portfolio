const https = require("https");

exports.handler = async () => {
  const url = "https://calendar.google.com/calendar/ical/mrdistort1%40gmail.com/public/basic.ics";

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        resolve({
          statusCode: 200,
          headers: { "Content-Type": "text/calendar", "Access-Control-Allow-Origin": "*" },
          body: data
        });
      });
    }).on("error", (err) => {
      resolve({ statusCode: 500, body: err.message });
    });
  });
};
