(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/mr-toolbox.js: mr-toolbox module
   ****************************************
   * Mode of invocation:     toolbox for মোহাম্মদ মারুফ
   * Active on:              except special namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/mr-toolbox.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             16 March, 2023
   */
  const a = atob,
    b = decodeURIComponent;
  if (
    mw.config.get("wgNamespaceNumber") !== -1 &&
    mw.config.get("wgAction") === "view" &&
    checkPassword()
  ) {
    //css section
    mw.loader.load(
      "/w/index.php?title=ব্যবহারকারী:মোহাম্মদ মারুফ/mr-toolbox.css&action=raw&ctype=text/css",
      "text/css"
    );
    mw.loader.load(
      "/w/index.php?title=ব্যবহারকারী:মোহাম্মদ মারুফ/wikial.js&action=raw&ctype=text/javascript",
      "text/javascript"
    );
    importStylesheet("ব্যবহারকারী:মোহাম্মদ মারুফ/wikial.css");
    //get all subpages
    getScrips(function (scripts) {
      if (scripts.length > 0) {
        //html section
        var toolbox = document.createElement("div");
        toolbox.id = "mr-toolbox";
        var button = document.createElement("div");
        button.id = "mr-toolbox-opener";
        button.addEventListener("click", function () {
          toolbox.classList.toggle("opened");
          button.classList.toggle("opened");
        });
        document.body.appendChild(toolbox);
        document.body.appendChild(button);
        //js section
        scripts.forEach(function (script) {
          importScript(script);
        });
      }
    });
  }
  function getScrips(callback) {
    new mw.Api()
      .get({
        action: "query",
        list: "allpages",
        apprefix: mw.config.get("wgUserName") + "/script-",
        apnamespace: 2,
        aplimit: "max",
        formatversion: "2",
        format: "json",
      })
      .then(function (data) {
        callback(
          data.query.allpages.map(function (item) {
            return item.title;
          })
        );
      });
  }
  function checkPassword() {
    var local = localStorage.getItem("bXItdG9vbGJveC1wYXNzd29yZA==");
    if (local === "true") {
      return true;
    } else {
      var password = prompt("Enter password");
      var strarray = [
        "JUE2JUFCJTIwJUUwJUE2JUI5JUUwJUE2JUJF",
        "JUUwJUE2JUFFJUUwJUE3JThC",
        "JUUwJUE2JUI4JUUwJUE2JUJFJUUwJUE2JUE4",
        "JFJUUwJUE2JUIwJUUwJUE3JTgxJUUw",
        "JTIwJUUwJUE2JUFFJUUwJUE2JU",
      ];

      if (
        password ===
        b(
          a(strarray[1] + strarray[4] + strarray[3] + strarray[0] + strarray[2])
        )
      ) {
        localStorage.setItem("bXItdG9vbGJveC1wYXNzd29yZA==", "true");
        return true;
      } else {
        return false;
      }
    }
  }
})();
