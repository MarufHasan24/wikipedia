mw.loader.load(
  "/w/index.php?title=ব্যবহারকারী:মোহাম্মদ মারুফ/morebits.js&action=raw&ctype=text/javascript",
  "text/javascript"
);
0;
const namespace = mw.config.get("wgNamespaceNumber");
if (namespace == 0) {
  mw.loader.load(
    "/w/index.php?title=ব্যবহারকারী:মোহাম্মদ মারুফ/tag.js&action=raw&ctype=text/javascript",
    "text/javascript"
  );
  mw.loader.load(
    "/w/index.php?title=ব্যবহারকারী:মোহাম্মদ মারুফ/sdf.js&action=raw&ctype=text/javascript",
    "text/javascript"
  );
}
var denoder;
mw.loader.using(["jquery.ui"]).then(function () {
  (function ($, mw) {
    /*
     ****************************************
     *** ব্যবহারকারী:মোহাম্মদ মারুফ/twinkle.js: twinkle module
     ****************************************
     * Mode of invocation:     twinkle lite
     * Active on:              all namespace
     * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/twinkle.js
     * creator:                মোহাম্মদ মারুফ
     * created on:             02 July, 2024
     */
    const skin = mw.config.get("skin");
    const pagename = mw.config.get("wgPageName");
    function loop(callback) {
      if (!denoder) {
        setTimeout(function () {
          loop(callback);
        }, 300);
      } else {
        callback();
      }
    }
    loop(function () {
      loadMorebits((functions) => {
        // programe gose from here
        if (mw.config.get("wgAction") === "view") {
          var button = $(
            mw.util.addPortletLink(
              "right-navigation",
              "#",
              "টুইংকেল",
              "twinkle",
              "টুইংকেল"
            )
          );
          //functions.page.getCreator(pagename, (data) => {});
        }
      });
    });
  })(jQuery, mediaWiki);
});
