const api = new mw.Api();
const list = document.querySelectorAll(".wikitable");
const pagename = mw.config.get("wgPageName");
let i = 0;
console.time("start");
function iloop(i, sectiondata, callback) {
  if (i < list.length) {
    let j = 0,
      Twikitext = `{| class="wikitable"
! প্রবন্ধ শিরোনাম !! শব্দ সংখ্যা`;
    let totalcount = 0;
    let As = list[i].querySelectorAll("a");
    function jloop(j, callback) {
      if (j < As.length) {
        console.log(As[j].title);
        getOldText(As[j].title, (wikitext) => {
          wikitext = wikitext.replace(/\{\{[\s\S]+?\}\}/gm, "");
          let wordcount = wikitext
            .splitRegex(/(\s|\|\-|')/g)
            .filter((e) => e).length;
          totalcount += wordcount;
          Twikitext += `|-
| [[${As[j].title}]] ||${translateNumbers(wordcount)}
`;
          j++;
          jloop(j, callback);
        });
      } else {
        callback(
          (Twikitext += `|-
|'''মোট'''
|'''${translateNumbers(totalcount)}'''
|}`)
        );
      }
    }
    jloop(j, (wikitext) => {
      let text = `
== ${sectiondata[i].line} ==

${wikitext}

`;
      edit(text, (data) => {
        i++;
        if (data == true) iloop(i, sectiondata, callback);
        else console.log(data);
      });
    });
  } else {
    callback("done");
  }
}
function getOldText(page, callback) {
  var params = {
    action: "query",
    format: "json",
    titles: page,
    prop: "wikitext",
    formatversion: "2",
  };
  api.get(params).then(function (data) {
    if (data.query.pages[0].missing) {
      callback(false);
    } else {
      delete params.titles;
      params.page = page;
      params.action = "parse";
      api
        .get(params)
        .done(function (data) {
          callback(data.parse.wikitext);
        })
        .fail(function (error) {
          console.error(error);
        });
    }
  });
}
api
  .get({
    action: "parse",
    page: pagename,
    prop: "sections",
    format: "json",
  })
  .done(function (data) {
    iloop(i, data.parse.sections, () => {
      console.log("done");
      console.timeEnd("start");
    });
  })
  .fail((msg) => {
    console.log(msg);
  });
function translateNumbers(number) {
  var num = number.toString();
  var result = "";
  result = num
    .replace(/0/gi, "০")
    .replace(/1/gi, "১")
    .replace(/2/gi, "২")
    .replace(/3/gi, "৩")
    .replace(/4/gi, "৪")
    .replace(/5/gi, "৫")
    .replace(/6/gi, "৬")
    .replace(/7/gi, "৭")
    .replace(/8/gi, "৮")
    .replace(/9/gi, "৯");
  return result;
}
function edit(text, callback) {
  var params = {
    action: "edit",
    title: "ব্যবহারকারী:মোহাম্মদ মারুফ/খেলাঘর",
  };
  getOldText("ব্যবহারকারী:মোহাম্মদ মারুফ/খেলাঘর", function (Text) {
    params.text = Text + text;
    api.postWithToken("csrf", params).done(function (data) {
      if (data.edit.result === "Success") {
        callback(true);
      } else {
        callback(data.edit.result);
      }
    });
  });
}
