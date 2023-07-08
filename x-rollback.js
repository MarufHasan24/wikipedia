(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/x-rollback.js: x-rollback module
   ****************************************
   * Mode of invocation:     extended rollback
   * Active on:              except special namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/x-rollback.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             12 June, 2023
   */
  if (
    mw.config.get("wgNamespaceNumber") !== -1 &&
    mw.config.get("wgAction") === "diff"
  ) {
    //add rollback button
    var rollbackButton = document.createElement("a");
    rollbackButton.setAttribute("id", "rollbackButton");
    rollbackButton.setAttribute("class", "mw-ui-button");
    rollbackButton.setAttribute("href", "JavaScript:void(0);");
    rollbackButton.innerHTML = "ex rollback";
    rollbackButton.addEventListener("click", function () {
      console.log("rollback button clicked");
    });
    var newTitle = document.getElementById("mw-diff-ntitle1");
    var oldTitle = document.getElementById("mw-diff-otitle1");
    newTitle.appendChild(rollbackButton);

    compare(extractId()[0], extractId()[1], function (matched0, unmatched0) {
      compare(0, extractId()[1], function (matched1, unmatched1) {
        var keys0 = Object.keys(unmatched0);
        var keys1 = Object.keys(matched1);
      });
    });

    function extractId() {
      var oldIdUrl = oldTitle.getElementsByTagName("a")[0].getAttribute("href");
      var newIdUrl = newTitle.getElementsByTagName("a")[0].getAttribute("href");
      var oldId = new URLSearchParams(oldIdUrl.split("?")).get("oldid");
      var newId = new URLSearchParams(newIdUrl.split("?")).get("oldid");
      return [oldId, newId];
    }

    const api = new mw.Api();
    function getRivisionData(n, callback) {
      //get nth revision data
      var query = {
        action: "query",
        prop: "revisions",
        titles: mw.config.get("wgPageName"),
        rvprop: "ids|timestamp|user|comment|size|tags|flags|sha1|content",
        rvdir: "older",
        formatversion: 2,
        format: "json",
      };
      if (n === 0) {
        query.rvlimit = 1;
      } else {
        query.rvlimit = 1;
        query.rvstartid = n;
        query.rvendid = n;
      }
      api
        .get(query)
        .done(function (data) {
          callback(data.query.pages[0].revisions[0]);
        })
        .fail(function (data) {
          console.log(data);
        });
    }
    function compare(oldId, newId, callback) {
      getRivisionData(oldId, function (oldData) {
        getRivisionData(newId, function (newData) {
          var oldContent = oldData.content;
          var newContent = newData.content;
          //split content into array by sentence
          var oldContentArray = oldContent.split(/(?<=[।?!]|(\}\}|\>))/);
          var matched = new Object();
          var unmatched = new Object();
          var i = 0;
          oldContentArray.forEach(function (sentence) {
            if (newContent.includes(sentence)) {
              matched[i] = sentence;
            } else {
              unmatched[i] = sentence;
            }
            i++;
          });
          callback(matched, unmatched);
        });
      });
    }
  }
})();
