(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/imp-exp.js: imp-exp module
   ****************************************
   * Mode of invocation:     import and export between wikis easily
   * Active on:              all namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/imp-exp.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             02 July, 2024
   */
  let metadata = {
    lang: "bn",
    wiki: "wikipedia",
    replaces: ["উইকিপিডিয়া;উইকিউক্তি", "wikipedia;wikiquote"],
  };

  const Api = new mw.Api();
  const FoeignApi = new mw.ForeignApi(
    "https://" + lang + "." + wiki + ".org/w/api.php"
  );
  if (!localStorage.getItem("imp-exp_wikis"))
    localStorage.setItem("imp-exp_wikis", JSON.stringify(metadata));
  else metadata = JSON.parse(localStorage.getItem("imp-exp_wikis"));
  var button = $(
    mw.util.addPortletLink(
      "p-tb",
      "#",
      "imp-exp",
      "imp-exp",
      "দ্রুত আমদানি রপ্তানি"
    )
  );
  let inputBox = document.createElement("div");
  inputBox.innerHTML =
    '<section id="imp-exp"><div class="imp-exp-title"><button class="active" id="import">Import</button><button style="right:0" id="export">Export</button></div><div class="import"><label for="imp-wiki">Wiki name</label><textarea id="imp-wiki" placeholder="wikipedia"></textarea><label for="imp-lang">Language Name</label><textarea id="imp-lang" placeholder="bn"></textarea><label for="imp-replace">পরিবর্তন সমূহ</label><textarea id="imp-replace" placeholder="উইকিপিডিয়া;উইকিউক্তি,wikipedia;wikiquote"></textarea></div><div class="export hide"><label for="exp-wiki">Wiki name</label><textarea id="exp-wiki" placeholder="wikiquote"></textarea><label for="exp-lang">Language Name</label><textarea id="exp-lang" placeholder="bn"></textarea><label for="exp-replace">পরিবর্তন সমূহ</label><textarea id="exp-replace" placeholder="উইকিপিডিয়া;উইকিউক্তি,wikipedia;wikiquote"></textarea></div></section>';
  button.onclick = function (params) {
    document.body.appendChild(inputBox);
  };
})();
