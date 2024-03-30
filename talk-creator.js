(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/talk-creator.js: talk-creator module
   ****************************************
   * Mode of invocation:     create talk page
   * Active on:              only main namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/talk-creator.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             28 May, 2023
   */
  if (
    mw.config.get("wgNamespaceNumber") === 0 &&
    mw.config.get("wgAction") === "view" &&
    mw.config.get("wgArticleId") > 0 &&
    location.href.indexOf("redirect=no") === -1
  ) {
    const api = new mw.Api();
    var pageName = mw.config.get("wgPageName").replace(/_/g, " ");
    var talkPageName = "আলাপ:" + pageName;
    api
      .get({
        action: "query",
        titles: talkPageName,
        format: "json",
        prop: "info",
      })
      .done(function (data) {
        creationLookOut(pageName, function (creator, milisec) {
          if (data.query.pages[-1]) {
            if (creator === mw.config.get("wgUserName")) {
              api
                .postWithToken("csrf", {
                  action: "edit",
                  title: talkPageName,
                  text: "{{আলাপ পাতা}}",
                  summary: "আলাপ পাতা তৈরি করা হয়েছে",
                  format: "json",
                  createonly: true,
                })
                .done(function () {
                  alert("আলাপ পাতা তৈরি হয়েছে");
                })
                .fail(function (data) {
                  console.log(data);
                });
            } else if (milisec + 86400 * 1000 > new Date().getTime()) {
              api
                .postWithToken("csrf", {
                  action: "edit",
                  title: talkPageName,
                  text: "{{আলাপ পাতা}}",
                  summary: "আলাপ পাতা তৈরি করা হয়েছে",
                  format: "json",
                  createonly: true,
                })
                .done(function () {
                  addToWatchlist(3, pageName, function () {
                    console.log("আলাপ পাতা তৈরি হয়েছে");
                  });
                })
                .fail(function (data) {
                  console.log(data);
                });
            }
          }
        });
      })
      .fail(function (data) {
        console.log(data);
      });
    function creationLookOut(pagename, callback) {
      var params = {
        action: "query",
        format: "json",
        prop: "revisions",
        titles: pagename,
        formatversion: "2",
        rvprop: "timestamp|user",
        rvlimit: "1",
        rvdir: "newer",
      };
      api
        .get(params)
        .then(function (data) {
          var milisec = new Date(
            data.query.pages[0].revisions[0].timestamp
          ).getTime();
          callback(data.query.pages[0].revisions[0].user, milisec);
        })
        .fail(function (error) {
          console.error(error);
        });
    }
    function addToWatchlist(time, page, callback) {
      var date = new Date(new Date().getTime() + time * 24 * 60 * 60 * 1000); //3 days
      var params = {
        action: "watch",
        format: "json",
        titles: page,
        expiry: date.toISOString(),
      };
      api
        .postWithToken("watch", params)
        .done(function (data) {
          callback(data);
        })
        .fail(function (error) {
          console.error(error);
        });
    }
  }
})();
