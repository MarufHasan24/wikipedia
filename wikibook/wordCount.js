(function ($) {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/wordCount.js: wordCount module
   ****************************************
   * Mode of invocation:     count words
   * Active on:              all namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/wordCount.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             08 July, 2024
   */
  const pagename = mw.config.get("wgPageName");
  String.prototype.splitRegex = function (regex) {
    let token = `<split token=${Math.floor(Math.random() * 99)}/>`;
    return this.replace(regex, token).split(token);
  };
  const api = new mw.Api();
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
  if (
    mw.config.get("wgAction") === "view" &&
    (mw.config.get("wgNamespaceNumber") === 0 ||
      mw.config.get("wgNamespaceNumber") === 104)
  ) {
    let key = Number(localStorage.getItem("wordCounter"));
    var button = $(
      mw.util.addPortletLink(
        "p-tb",
        "#",
        "word counter| " + (key ? "চালু" : "বন্ধ"),
        "wordCounter",
        "মোট শব্দ সংখ্যা"
      )
    );
    button.on("click", () => {
      localStorage.setItem("wordCounter", 1 - Number(key));
      location.reload();
    });
    if (key) {
      getOldText(pagename, (wikitext) => {
        wikitext = wikitext.replace(/\{\{[\s\S]+?\}\}/gm, "");
        let wordcount = wikitext
          .splitRegex(/(\s|\|\-|')/g)
          .filter((e) => e).length;
        mw.notify(wordcount, { autoHide: false, type: "success" });
      });
    }
  }
})(jQuery);
