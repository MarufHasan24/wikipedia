(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/linkchecker.js: linkchecker module
   ****************************************
   * Mode of invocation:     check selected links has desired status
   * Active on:              all namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/linkchecker.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             12 January, 2023
   */
  var sidebarObj = {
    vector: "mw-panel",
    monobook: "globalWrapper",
    timeless: "personal-inner",
    "vector-2022": "mw-panel",
  };
  //load css
  mw.loader.load(
    "https://bn.wikipedia.org/w/index.php?title=ব্যবহারকারী:মোহাম্মদ%20মারুফ/linkchecker.css&action=raw&ctype=text/css",
    "text/css"
  );
  const api = new mw.Api();
  function selection() {
    var ranges = {},
      a;
    var falseTag,
      sel = window.getSelection();
    for (var i = 0; i < sel.rangeCount; i++) {
      falseTag = document.createElement("div");
      falseTag.style.display = "none";
      falseTag.appendChild(sel.getRangeAt(i).cloneContents());
      for (var j = 0; j < falseTag.getElementsByTagName("a").length; j++) {
        a = falseTag.getElementsByTagName("a")[j];
        a.classList.add("selected");
        ranges[a.title] = a.href;
      }
    }
    return ranges;
  }
  //user language
  var lang = mw.config.get("wgPageContentLanguage");
  var linkchecker = document.createElement("div");
  linkchecker.id = "p-linkchecker";
  linkchecker.className = "linkchecker";
  linkchecker.innerHTML =
    '<h3>Linkchecker</h3> <div class="pBody"> <ul> <li><a href="javascript:void(0)" id="linkchecker">Linkchecker</a></li><li style="margin: 10px 0 0 0;"> <input class="linkchecker-input" type="radio" id="link" name="link" value="true" checked/> <label for="link">True</label> </li><li style="margin: 0 0 10px 0;"> <input class="linkchecker-input" type="radio" id="link" name="link" value="false"/> <label for="link">False</label> </li><li style="margin-left: 0;"> <label for="langcode">lang code</label> <input type="text" id="langcode" name="langcode" value="bn" maxlength="6"/> </li></ul> </div>';

  //add linkchecker to sidebar
  document
    .getElementById(sidebarObj[mw.config.get("skin")])
    .appendChild(linkchecker);
  var langLinkElem = document.getElementById("langcode");
  langLinkElem.onkeyup = function () {
    localStorage.setItem(btoa(lang + "-langlink-langcode"), langLinkElem.value);
  };
  langLinkElem.value =
    localStorage.getItem(btoa(lang + "-langlink-langcode")) || "bn";

  document.getElementById("linkchecker").onclick = function () {
    var linkcheckerInputs =
      document.getElementsByClassName("linkchecker-input");
    var langLink = langLinkElem.value;
    var linkcheckerValue;
    for (var linkcheckerInput of linkcheckerInputs) {
      if (linkcheckerInput.checked) {
        linkcheckerValue = linkcheckerInput.value ?? "true";
      }
    }
    var ranges = selection(); // get selected object
    for (var item in ranges) {
      Res(ranges[item], linkcheckerValue, langLink);
    }
  };

  async function Res(url, langcheck, langcode = "bn") {
    //get query of that page
    pagename = decodeURI(url).split("/wiki/")[1];
    var params = {
      action: "parse",
      format: "json",
      page: pagename,
      prop: "langlinks",
      formatversion: "2",
    };
    var data = await api.get(params);
    var langlink = "";
    for (var i = 0; i < data.parse.langlinks.length; i++) {
      if (data.parse.langlinks[i].lang == langcode) {
        langlink = data.parse.langlinks[i].url;
        break;
      }
    }
    if (langcheck == "true") {
      if (langlink) {
        window.open(langlink, "_blank");
      }
    } else if (langcheck == "false") {
      if (!langlink) {
        window.open(url, "_blank");
      }
    } else {
      //do nothing
    }
  }
})();
