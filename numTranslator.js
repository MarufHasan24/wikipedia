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
   */

  //get the page name
  var pagename = mw.config.get("wgPageName");
  //check if the page is in main namespace
  if (mw.config.get("wgNamespaceNumber") === 0 || 2 || 3 || 5 || 11 || 101) {
    //add a button to the page
    button = $(
      mw.util.addPortletLink(
        "p-tb",
        "#",
        "অনুবাদক (সংখ্যা)",
        "অনুবাদক (সংখ্যা)",
        "ইংরেজি সংখ্যাগুলো বাংলায় অনুবাদ করুন",
        "",
        "#numTranslator"
      )
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
              summary: "সকল সংখ্যা বাংলায় অনুবাদ করা হয়েছে",
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
  function translateNumbers(data) {
    var result = data
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))0(?!(}|(\d*[a-z])))/gi,
        "০"
      )
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))1(?!(}|(\d*[a-z])))/gi,
        "১"
      )
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))2(?!(}|(\d*[a-z])))/gi,
        "২"
      )
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))3(?!(}|(\d*[a-z])))/gi,
        "৩"
      )
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))4(?!(}|(\d*[a-z])))/gi,
        "৪"
      )
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))5(?!(}|(\d*[a-z])))/gi,
        "৫"
      )
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))6(?!(}|(\d*[a-z])))/gi,
        "৬"
      )
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))7(?!(}|(\d*[a-z])))/gi,
        "৭"
      )
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))8(?!(}|(\d*[a-z])))/gi,
        "৮"
      )
      .replace(
        /(?<!(({\d*)|http(\S)+|[a-z]\d*|(>\S*)|((issn|pmid|isbn|oclc|s2cid)\s*=\s*(\d|-)*)|(ডিওআই|doi)\s*=\s*\d*.\d*|(\/[-._;()\/:A-Z0-9]+)))9(?!(}|(\d*[a-z])))/gi,
        "৯"
      )
      .replace(/(ডিওআই|doi)=১/gi, "ডিওআই=1");
    return result;
  }
})();
