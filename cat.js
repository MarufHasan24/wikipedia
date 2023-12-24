const request = require("request");
let url = "https://bn.wikipedia.org/w/api.php";
const { writeFileSync } = require("fs");
let params = {
  action: "query",
  format: "json",
  list: "categorymembers",
  formatversion: "2",
  cmtitle: "বিষয়শ্রেণী:মৌলিক পদার্থ",
  cmprop: "ids|title",
  cmlimit: "max",
};
request({ url: url, qs: params }, function (err, response, body) {
  if (err) {
    console.log(err);
    return;
  }
  body = JSON.parse(body);
  let mpages = [],
    cats = [];
  let pages = body.query.categorymembers;
  for (let page of pages) {
    if (page.ns === 0 && !page.title.includes(" ")) {
      mpages.push(page);
    } else if (page.ns === 14) {
      cats.push(page);
    }
  }
  for (let i in mpages) {
    if (cats.includes(cats[i])) {
      mpages.splice(i, 1);
    }
  }
  getCsrfToken((token) => {
    let i = 0;
    function loop(i) {
      let params = {
        title: "বিষয়শ্রেণী:" + mpages[i].title,
        token: token,
        text:
          "{{Cat main|" + mpages[i].title + "}}\n[[বিষয়শ্রেণী:মৌলিক পদার্থ]]",
        summary: "মৌলিক পদার্থের বিষয়শ্রেণী তৈরি করা হয়েছে।",
      };
      console.log("Editing ", params);
      editPage(params, (res, body) => {
        if (i < mpages.length - 1) {
          if (!res.body.error) {
            console.log("✅" + mpages[i].title);
          } else {
            console.log("❌" + mpages[i].title, body);
          }
          setTimeout(() => {
            loop(i + 1);
          }, 15000);
        } else {
          console.log("Done!");
        }
      });
    }
    //loop(i);
    console.log(token);
  });
});
function getLoginToken(callback) {
  var params = {
    action: "query",
    format: "json",
    meta: "tokens",
    formatversion: "2",
    type: "login",
  };
  console.log("Getting login token...");
  request.get({ url: url, qs: params }, function (error, res, body) {
    if (error) {
      console.error(error);
      return;
    }
    var data = JSON.parse(body);
    console.log("Login token: " + data.query.tokens.logintoken);
    callback(data.query.tokens.logintoken);
  });
}
function loginRequest(callback) {
  console.log("Logging in...");
  getLoginToken((login_token) => {
    var params = {
      action: "login",
      lgname: "মোহাম্মদ মারুফ@mr-node",
      lgpassword: "t4s1jj4lpg264kb4pu7pq8kde3a9gmc4",
      lgtoken: login_token,
      format: "json",
    };
    request.post({ url: url, form: params }, function (error, res, body) {
      body = JSON.parse(body);
      writeFileSync("error.json", JSON.stringify({ body, res }));
      console.log("body");
      if (error) {
        console.error(error);
        return;
      } else if (body.login.result == "Success") {
        callback(res, body);
      } else {
        console.log(body);
      }
    });
  });
}
function getCsrfToken(callback) {
  console.log("Getting CSRF token...");
  loginRequest((res, body) => {
    if (res.statusCode == 200) {
      var params = {
        action: "query",
        meta: "tokens",
        format: "json",
      };

      request.get({ url: url, qs: params }, function (error, res, body) {
        if (error) {
          console.error(error);
          return;
        }
        var data = JSON.parse(body);
        console.log("CSRF token: " + data.query.tokens.csrftoken);
        callback(data.query.tokens.csrftoken);
      });
    } else {
      console.log(body);
    }
  });
}
function editPage(preparams, callback) {
  var params = {
    action: "edit",
    format: "json",
    title: preparams.title,
    text: preparams.text,
    summary: preparams.summary,
    token: preparams.token,
    formatversion: "2",
  };
  preparams.section ? (params.section = preparams.section) : null;
  request.post({ url: url, form: params }, function (error, res, body) {
    if (error) {
      console.error(error);
      return;
    } else {
      callback(res, JSON.parse(body));
    }
  });
}
