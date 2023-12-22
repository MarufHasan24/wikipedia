const { appendFile } = require("fs");
("use strict");
let request = require("request");
let url = "https://en.wikipedia.org/w/api.php";
let tru = 0;
let fals = 0;
let miss = 0;

function checkInBnWiki(title, callback) {
  let params = {
    action: "query",
    format: "json",
    prop: "revisions|langlinks",
    titles: title,
    formatversion: "2",
    rvprop: "size",
    rvlimit: "1",
    rvdir: "older",
    lllang: "bn",
  };
  request({ url: url, qs: params }, function (err, response, body) {
    if (err) {
      console.log(err);
      return;
    }
    let data = JSON.parse(body);
    let page = data.query.pages[0];
    if (page.langlinks) {
      //console.log(title, page.langlinks[0].title);
      callback();
    } else {
      if (!(page.revisions && page.revisions[0])) {
        //console.log("🅰" + title, "No revision");
        miss++;
        callback();
      } else if (
        page.revisions[0].size < 5000 &&
        page.revisions[0].size > 2000
      ) {
        tru++;
        let txt =
          "| " +
          bnnum(tru) +
          "|| [[:en:" +
          title +
          "|" +
          title +
          "]] || " +
          page.revisions[0].size +
          "\n|-\n";
        appendFile("output.txt", txt, function (err) {
          if (err) throw err;
          callback(title);
        });
      } else {
        console.log("❌" + title, page.revisions[0].size);
        fals++;
        callback();
      }
    }
  });
}
function main(continuel, callbackmain) {
  let params = {
    action: "query",
    format: "json",
    prop: "links",
    titles: "List of inorganic compounds",
    formatversion: "2",
    plnamespace: "0",
    pllimit: "max",
  };
  if (continuel) {
    params.plcontinue = continuel;
  }
  request({ url: url, qs: params }, function (err, response, body) {
    if (err) {
      console.log(err);
      return;
    }
    let data = JSON.parse(body);
    let page = data.query.pages[0];
    let links = page.links;
    let i = 0;
    function iloop(i, callback) {
      if (i < links.length) {
        checkInBnWiki(links[i].title, function () {
          iloop(i + 1, callback);
        });
      } else {
        callback();
      }
    }
    iloop(i, function () {
      if (data.continue) {
        main(data.continue.plcontinue, callbackmain);
      } else {
        callbackmain();
      }
    });
  });
}
main("", function () {
  console.log("✅", tru, "❌", fals, "🅰", miss);
  let total = tru + fals + miss;
  console.log("Total", total);
  console.log("✅", (tru / total) * 100);
  console.log("❌", (fals / total) * 100);
  console.log("🅰", (miss / total) * 100);
});
function bnnum(num) {
  num = num.toString();
  let txt = "";
  for (let i = 0; i < num.length; i++) {
    txt += "০১২৩৪৫৬৭৮৯"[num[i]];
  }
  return txt;
}
