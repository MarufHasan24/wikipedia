(function (Wikial) {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/list-editathon.js: list-editathon module
   ****************************************
   * Mode of invocation:     make a list of editathon
   * Active on:              catagory namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/list-editathon.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             18 March, 2023
   */
  if (
    mw.config.get("wgAction") === "view" &&
    mw.config.get("wgNamespaceNumber") === 14
  ) {
    var lang = "en";
    const Api = new mw.Api();
    const FoeignApi = new mw.ForeignApi(
      "https://" + lang + ".wikipedia.org/w/api.php"
    );
    var wikial = new Wikial("case");
    //get the english name of the page
    var i = 0;
    var toolbox = document.getElementById("mr-toolbox");
    var button = document.createElement("button");
    button.innerHTML = "editathon lister";
    button.addEventListener("click", function () {
      var container = document.getElementById("mr-tool-container");
      container.style.display = "block";
      container.innerHTML = "";
      var selected = document.querySelectorAll("li.mr-selected a");
      if (selected.length == 0) {
        alert("Please select some page names first");
        return;
      }
      var start = parseInt(prompt("start number", "1"));
      if (isNaN(start)) {
        start = 1;
      }
      var cas = wikial.case({
        title:
          '<a href="https:"//bn.wikipedia.org"/wiki/উইকিপিডিয়া:অমর_একুশে_নিবন্ধ_প্রতিযোগিতা_' +
          translator(new Date().getFullYear()) +
          '">' +
          "প্রতিযোগীতা</a>",
        content:
          "প্রতিযোগিতার জন্য নির্বাচিত $to টি নিবন্ধের মধ্যে $from টি নিবন্ধের যোগ্যতা যাচাই করা হয়েছে।",
        from: 1,
        to: selected.length,
      });
      var serial = start;
      getName(selected[i].innerHTML);
      function getName(page) {
        Api.get({
          action: "query",
          prop: "langlinks",
          titles: page,
          llprop: "url",
          lllang: "en",
          formatversion: "2",
          format: "json",
        }).then(function (data) {
          var title = data.query.pages[0].langlinks[0].title;
          if (i + 1 < selected.length) {
            //get page's content size of both pages
            PageSize(
              title,
              (ensize) => {
                PageSize(selected[i].innerHTML, (bnsize) => {
                  if (ensize > bnsize / 2 + 15000) {
                    var num = translator(serial);
                    container.innerHTML +=
                      "|" +
                      num +
                      " || [[" +
                      selected[i].innerHTML +
                      "]] || {{ইং|" +
                      title +
                      "}} || \n|-\n";
                    i++;
                    serial++;
                    getName(selected[i].innerHTML);
                  } else {
                    i++;
                    getName(selected[i].innerHTML);
                  }
                  cas.update();
                });
              },
              FoeignApi
            );
          } else {
            wikial.alert({
              title: "সম্পূর্ণ হয়েছে",
              content:
                selected.length +
                "টি নিবন্ধের মধ্যে " +
                serial +
                "টি নিবন্ধ যোগ্য হিসেবে চিহ্নিত হয়েছে। অর্থাৎ " +
                Math.round((serial / selected.length) * 100) +
                "% নিবন্ধ যোগ্য হিসেবে চিহ্নিত হয়েছে।",
              type: "success",
            });
          }
        });
      }
    });
    function PageSize(page, callback, api = Api) {
      api
        .get({
          action: "query",
          prop: "info",
          titles: page,
          formatversion: "2",
          format: "json",
        })
        .then(function (data) {
          callback(data.query.pages[0].length);
        });
    }
    function translator(number) {
      var bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      var str = number.toString();
      var len = str.length;
      var num = "";
      for (var i = 0; i < len; i++) {
        num += bn[parseInt(str[i])];
      }
      return num;
    }
    toolbox.appendChild(button);
  }
})(window.mr.Wikial);
