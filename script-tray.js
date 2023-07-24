(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/script-tray.js: script-tray module
   ****************************************
   * Mode of invocation:     load scrtipt on demand
   * Active on:              except special namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/script-tray.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             12 July, 2023
   */
  if (
    mw.config.get("wgNamespaceNumber") !== -1 &&
    mw.config.get("wgAction") == "view"
  ) {
    const skin = mw.config.get("skin");
    var area = skin === "minerva" ? "p-tb" : "p-cactions";
    var button = $(mw.util.addPortletLink(area, "#", "ট্রে", "script-tray"));
    button.click(function () {});
  }
})();
