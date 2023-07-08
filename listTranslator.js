(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/listTranslator.js: listTranslator module
   ****************************************
   * Mode of invocation:     translate list items
   * Active on:              only main and template namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/listTranslator.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             03 February, 2023
   */
  if (
    mw.config.get("wgNamespaceNumber") == 10 ||
    mw.config.get("wgNamespaceNumber") == 0 ||
    mw.config.get("wgNamespaceNumber") == 2
  ) {
    const api = new mw.Api();
    const lang = mw.config.get("wgPageContentLanguage");
    const page = mw.config.get("wgPageName");
    const ForeignApi = new mw.ForeignApi("https://en.wikipedia.org/w/api.php");
    //get the list items
    async function getLinks(callback) {
      var links = [];
      var params = {
        action: "parse",
        page: page,
        prop: "links|wikiText",
        format: "json",
        formatversion: 2,
      };
      api.get(params).then(function (data) {
        var link = data.parse.links;
        for (var i = 0; i < link.length; i++) {
          if (
            link[i].ns == 0 &&
            link[i].exists == true &&
            link[i].title.search(/\w+/) > -1
          ) {
            links.push(link[i].title);
          }
        }
        callback(links, data.parse.wikitext);
      });
    }
    //get the translation of the list items
    var button = mw.util.addPortletLink(
      "p-tb",
      "#",
      "লিস্ট অনুবাদ",
      "t-translate"
    );
    $(button).click(function () {
      getLinks(async function (links, text) {
        var translatedLinks = [];
        var params = {
          action: "parse",
          prop: "langlinks",
          format: "json",
          formatversion: 2,
        };
        for (var i = 0; i < links.length; i++) {
          params.page = links[i];
          var data = await ForeignApi.get(params);
          var langLinks = data.parse.langlinks;
          for (var j = 0; j < langLinks.length; j++) {
            if (langLinks[j].lang == lang) {
              translatedLinks.push([links[i], langLinks[j]]);
              break;
            }
          }
        }
        for (var i = 0; i < translatedLinks.length; i++) {
          var link = translatedLinks[i][0];
          var translation = translatedLinks[i][1];
          var params = {
            action: "edit",
            title: page,
          };
          var newText = text.replaceAll(link, translation);
          if (text != newText) {
            var params = {
              action: "edit",
              title: page,
              text: newText,
              summary: "Translated list items",
              token: mw.user.tokens.get("editToken"),
            };
            var result = await api.postWithToken("csrf", params);
            if (result.edit.result == "Success") {
              alert("Translation successful");
              location.reload();
            } else {
              alert("Translation failed");
            }
          }
        }
      });
    });
  }
})();
