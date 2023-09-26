(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/numTranslator.js: numTranslator module
   ****************************************
   * Mode of invocation:     translate numbers to bangla
   * Active on:              expect some namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/numTranslator.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             23 December, 2022
   * last update:            27 December, 2022
   * version:                2.0.0
   */
  "use strict";
  //get the page name
  var pagename = mw.config.get("wgPageName");
  //load css file
  mw.loader.load(
    "https://bn.wikipedia.org/w/index.php?title=ব্যবহারকারী:মোহাম্মদ মারুফ/default.css&action=raw&ctype=text/css",
    "text/css"
  );
  //script is under construction
  if (mw.config.get("wgUserName") == "মোহাম্মদ মারুফ") {
    //comment it out in common.js
    var api = new mw.Api();
    api
      .get({
        action: "parse",
        prop: "wikitext",
        page: "ব্যবহারকারী:" + mw.config.get("wgUserName") + "/common.js",
      })
      .then(function (data) {
        api
          .postWithToken("csrf", {
            action: "edit",
            title: "ব্যবহারকারী:" + mw.config.get("wgUserName") + "/common.js",
            text:
              data.parse.wikitext["*"].replace(
                /^(mw\.loader\.load|inportScript).+?\/numTranslator\.js.+?\);?/gm,
                function (match) {
                  return "/* " + match + " */";
                }
              ) ||
              (function () {
                throw "error";
              })(),
          })
          .then(function (e) {
            if (e.edit.result === "Success") {
              alert(
                "Brother, don't be sad. You can't use thos script now. It's not ready yet. Thanks for your interest.❤❤❤"
              );
            }
          });
      });
  }
  //check if the page is in main namespace
  if (mw.config.get("wgNamespaceNumber") === 0 || 2 || 3 || 5 || 11 || 101) {
    //add a button to the page
    var button = mw.util.addPortletLink(
      "p-tb",
      "#",
      "অনুবাদক (সংখ্যা)",
      "numTranslator",
      "ইংরেজি সংখ্যা, দিন ও তারিখ বাংলায় অনুবাদ করুন",
      "numTr"
    );

    const api = new mw.Api();
    //button click event
    $(button).click(function () {
      api
        .edit(pagename, function (revision) {
          var text = revision.content;
          var result = translateNumbers(text);
          if (result !== text) {
            return {
              text: result,
              summary:
                "প্রায় সকল সংখ্যা, দিন ও তারিখগুলো স্বয়ংক্রিয়ভাবে বাংলায় অনুবাদ করা হলো",
              minor: true,
              bot: false,
            };
          } else {
            alert("কোনো ইংরেজি সংখ্যা পাওয়া যায়নি");
            return { text: result };
          }
        })
        .then(function () {
          location.reload();
        });
    });
  }
  //translate dates
  var translateDates = [
    [/(?<=(=|\s+))(January(,|\s+))|(?<=(=|\s+))(Jan\s+)/gi, " জানুয়ারি "],
    [/(?<=(=|\s+))(February(,|\s+))|(?<=(=|\s+))(Feb\s+)/gi, " ফেব্রুয়ারি "],
    [/(?<=(=|\s+))(March(,|\s+))|(?<=(=|\s+))(Mar\s+)/gi, " মার্চ "],
    [/(?<=(=|\s+))(April(,|\s+))|(?<=(=|\s+))(Apr\s+)/gi, " এপ্রিল "],
    [/(?<=(=|\s+))(May\s+)/gi, " মে "],
    [/(?<=(=|\s+))(June(,|\s+))|(?<=(=|\s+))(Jun\s+)/gi, " জুন "],
    [/(?<=(=|\s+))(July(,|\s+))|(?<=(=|\s+))(Jul\s+)/gi, " জুলাই "],
    [/(?<=(=|\s+))(August(,|\s+))|(?<=(=|\s+))(Aug\s+)/gi, " অগাস্ট "],
    [/(?<=(=|\s+))(September(,|\s+))|(?<=(=|\s+))(Sep\s+)/gi, " সেপ্টেম্বর "],
    [/(?<=(=|\s+))(October(,|\s+))|(?<=(=|\s+))(Oct\s+)/gi, " অক্টোবর "],
    [/(?<=(=|\s+))(November(,|\s+))|(?<=(=|\s+))(Nov\s+)/gi, " নভেম্বর "],
    [/(?<=(=|\s+))(December(,|\s+))|(?<=(=|\s+))(Dec\s+)/gi, " ডিসেম্বর "],
    [/(?<=(=|\s+))(Sunday(,|\s+))|(?<=(=|\s+))(Sun\s+)/gi, " রবিবার "],
    [/(?<=(=|\s+))(Monday(,|\s+))|(?<=(=|\s+))(Mon\s+)/gi, " সোমবার "],
    [/(?<=(=|\s+))(Tuesday(,|\s+))|(?<=(=|\s+))(Tue\s+)/gi, " মঙ্গলবার "],
    [/(?<=(=|\s+))(Wednesday(,|\s+))|(?<=(=|\s+))(Wed\s+)/gi, " বুধবার "],
    [/(?<=(=|\s+))(Thursday(,|\s+))|(?<=(=|\s+))(Thu\s+)/gi, " বৃহস্পতিবার "],
    [/(?<=(=|\s+))(Friday(,|\s+))|(?<=(=|\s+))(Fri\s+)/gi, " শুক্রবার "],
    [/(?<=(=|\s+))(Saturday(,|\s+))|(?<=(=|\s+))(Sat\s+)/gi, " শনিবার "],
    [/(?<=(=|\s+))(BC\s+)/gi, " খ্রিস্টাব্দ "],
    [/(?<=\d{4})s/gi, "এর দশকের"],
  ];

  function translateNumbers(data) {
    var result = data
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))0(?!((\d*%)|(\d*[a-z])))/gi,
        "০"
      )
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))1(?!((\d*%)|(\d*[a-z])))/gi,
        "১"
      )
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))2(?!((\d*%)|(\d*[a-z])))/gi,
        "২"
      )
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))3(?!((\d*%)|(\d*[a-z])))/gi,
        "৩"
      )
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))4(?!((\d*%)|(\d*[a-z])))/gi,
        "৪"
      )
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))5(?!((\d*%)|(\d*[a-z])))/gi,
        "৫"
      )
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))6(?!((\d*%)|(\d*[a-z])))/gi,
        "৬"
      )
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))7(?!((\d*%)|(\d*[a-z])))/gi,
        "৭"
      )
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))8(?!((\d*%)|(\d*[a-z])))/gi,
        "৮"
      )
      .replace(
        /(?<!(({\d*}?)|\[([a-z]|\s|\d|\/)+|("|')\w+\d*|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))9(?!((\d*%)|(\d*[a-z])))/gi,
        "৯"
      )
      .replace(/(ডিওআই|doi)=১\s+/gi, " ডিওআই=1");
    for (var i = 0; i < translateDates.length; i++) {
      var thisregex = translateDates[i][0];
      var thisreplace = translateDates[i][1];
      result = result.replace(thisregex, thisreplace);
    }
    return result;
  }
})();
