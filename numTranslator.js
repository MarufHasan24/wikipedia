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
   * last update:            1 Januarry, 2024
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
  //check if the page is in main namespace
  if (mw.config.get("wgNamespaceNumber") === 0) {
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
    [
      /(?<=(=|(\s+|\()))(January(,|\s+))|(?<=(=|(\s+|\()))(Jan\s+)/gi,
      " জানুয়ারি ",
    ],
    [
      /(?<=(=|(\s+|\()))(February(,|\s+))|(?<=(=|(\s+|\()))(Feb\s+)/gi,
      " ফেব্রুয়ারি ",
    ],
    [/(?<=(=|(\s+|\()))(March(,|\s+))|(?<=(=|(\s+|\()))(Mar\s+)/gi, " মার্চ "],
    [/(?<=(=|(\s+|\()))(April(,|\s+))|(?<=(=|(\s+|\()))(Apr\s+)/gi, " এপ্রিল "],
    [/(?<=(=|(\s+|\()))(May\s+)/gi, " মে "],
    [/(?<=(=|(\s+|\()))(June(,|\s+))|(?<=(=|(\s+|\()))(Jun\s+)/gi, " জুন "],
    [/(?<=(=|(\s+|\()))(July(,|\s+))|(?<=(=|(\s+|\()))(Jul\s+)/gi, " জুলাই "],
    [
      /(?<=(=|(\s+|\()))(August(,|\s+))|(?<=(=|(\s+|\()))(Aug\s+)/gi,
      " অগাস্ট ",
    ],
    [
      /(?<=(=|(\s+|\()))(September(,|\s+))|(?<=(=|(\s+|\()))(Sep\s+)/gi,
      " সেপ্টেম্বর ",
    ],
    [
      /(?<=(=|(\s+|\()))(October(,|\s+))|(?<=(=|(\s+|\()))(Oct\s+)/gi,
      " অক্টোবর ",
    ],
    [
      /(?<=(=|(\s+|\()))(November(,|\s+))|(?<=(=|(\s+|\()))(Nov\s+)/gi,
      " নভেম্বর ",
    ],
    [
      /(?<=(=|(\s+|\()))(December(,|\s+))|(?<=(=|(\s+|\()))(Dec\s+)/gi,
      " ডিসেম্বর ",
    ],
    [
      /(?<=(=|(\s+|\()))(Sunday(,|\s+))|(?<=(=|(\s+|\()))(Sun\s+)/gi,
      " রবিবার ",
    ],
    [
      /(?<=(=|(\s+|\()))(Monday(,|\s+))|(?<=(=|(\s+|\()))(Mon\s+)/gi,
      " সোমবার ",
    ],
    [
      /(?<=(=|(\s+|\()))(Tuesday(,|\s+))|(?<=(=|(\s+|\()))(Tue\s+)/gi,
      " মঙ্গলবার ",
    ],
    [
      /(?<=(=|(\s+|\()))(Wednesday(,|\s+))|(?<=(=|(\s+|\()))(Wed\s+)/gi,
      " বুধবার ",
    ],
    [
      /(?<=(=|(\s+|\()))(Thursday(,|\s+))|(?<=(=|(\s+|\()))(Thu\s+)/gi,
      " বৃহস্পতিবার ",
    ],
    [
      /(?<=(=|(\s+|\()))(Friday(,|\s+))|(?<=(=|(\s+|\()))(Fri\s+)/gi,
      " শুক্রবার ",
    ],
    [
      /(?<=(=|(\s+|\()))(Saturday(,|\s+))|(?<=(=|(\s+|\()))(Sat\s+)/gi,
      " শনিবার ",
    ],
    [/(?<=(=|(\s+|\()))(BC\s+)/gi, " খ্রিস্টাব্দ "],
    [/(?<=\d{4})s/gi, "এর দশকের"],
    [/(\s|\()hours?(\s|\))/gi, " ঘন্টা "],
    [/(\s|\()days?(\s|\))/gi, " দিন "],
    [/(\s|\()months?(\s|\))/gi, " মাস "],
    [/(\s|\()years?(\s|\))/gi, " বছর "],
    [/(\s|\()minutes?(\s|\))/gi, " মিনিট "],
    [/(\s|\()seconds?(\s|\))/gi, " সেকেন্ড "],
    [/(\s|\()weeks?(\s|\))/gi, " সপ্তাহ "],
    [/(\s|\()decades?(\s|\))/gi, " দশক "],
  ];
  function translateNumbers(data) {
    var result = data.replace(
      /((?<!(({|\[)[^|]+|.*:.*|"|<.+|\w+))\d+(?!(<\/.*>|"|\w+)))|((তারিখ|বছর|পাতাসমূহ).+?(\||\}))|(\s|\\>|)[\d,]+(\s)|(\(\d+\))/g,
      (match) => {
        var p = "";
        if (!match) return match;
        for (var i in match) {
          if (match[i].match(/\d/)) p += "০১২৩৪৫৬৭৮৯"[match[i]];
          else p += match[i];
        }
        return p;
      }
    );
    for (var i = 0; i < translateDates.length; i++) {
      var thisregex = translateDates[i][0];
      var thisreplace = translateDates[i][1];
      result = result.replace(thisregex, thisreplace);
    }
    return result;
  }
})();
