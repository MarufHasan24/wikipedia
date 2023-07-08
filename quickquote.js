/*
 ****************************************
 *** ব্যবহারকারী:মোহাম্মদ মারুফ/quickquote.js: quickquote module
 ****************************************
 * Mode of invocation:     দ্রুত উক্তি যোগ
 * Active on:              main namespace
 * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/quickquote.js
 * creator:                মোহাম্মদ মারুফ
 * created on:             18 January, 2023
 * modified for gadget:    16 March, 2023
 */
mw.loader.using(["jquery.ui"]).then(function () {
  (function ($, mw) {
    if (
      mw.config.get("wgAction") === "view" &&
      mw.config.get("wgNamespaceNumber") === 0 &&
      mw.config.get("wgIsArticle")
    ) {
      // add the container
      var container = document.createElement("div");
      container.id = "qq-container";
      container.className = "qq-container";
      container.style.display = "none";
      document.body.appendChild(container);
      container.innerHTML =
        '<div class="qq-popup-window"> <div class="qq-popup-header"> <div class="qq-popup-header-title">একটি উক্তি যোগ করুন</div><div class="qq-popup-button" style="background: #36c; color: #fff;" id="qq-done">সম্পন্ন</div></div><div class="qq-popup-body"> <div class="qq-popup-body"> <div class="input quote"> <div class="input-label">উক্তি</div><div class="input-field"> <textarea placeholder="উক্তি লিখুন" value="" id="qq-quote"></textarea> </div></div><div class="input ref"> <div class="input-label">তথ্যসূত্র</div><div class="input-field"> <textarea placeholder="তথ্যসূত্র" value="" id="qq-ref"></textarea> </div></div></div></div><div class="btnContainer"> <div class="qq-popup-button" style="color: #d33; border: none;" id="qq-cancel">বাতিল</div><div class="qq-popup-button" style="font-weight: normal;" id="qq-add">আরও একটি উক্তি যোগ করুন</div></div></div>';
      //dependencies
      var add = document.getElementById("qq-add");
      var cancel = document.getElementById("qq-cancel");
      var done = document.getElementById("qq-done");
      var quote = document.getElementById("qq-quote");
      var ref = document.getElementById("qq-ref");
      var pagename = mw.config.get("wgPageName");
      var quoteContainer = [];
      var api = new mw.Api();
      add.addEventListener("click", function () {
        if (quote.value === "" && ref.value === "") {
          return;
        } else {
          quoteContainer.push({
            quote: quote.value,
            ref: ref.value,
          });
          quote.value = "";
          ref.value = "";
        }
      });
      cancel.addEventListener("click", function () {
        container.style.display = "none";
        quote.value = "";
        ref.value = "";
      });
      whereToInclude = null;
      api
        .get({
          action: "parse",
          page: pagename,
          prop: "sections",
          format: "json",
        })
        .done(function (data) {
          var sections = data.parse.sections;
          sections.forEach(function (section) {
            if (section.line === "উক্তি") {
              whereToInclude = parseInt(section.index);
            }
          });
          if (whereToInclude !== null) {
            var button = $(
              mw.util.addPortletLink(
                "p-tb",
                "#",
                "তড়িৎ উক্তি",
                "t-quickquote",
                "দ্রুত উক্তি যোগ"
              )
            );
            button.click(function () {
              if (container.style.display === "none") {
                container.style.display = "flex";
              } else {
                container.style.display = "none";
              }
            });
            done.addEventListener("click", function () {
              container.style.display = "none";
              var text = "";
              if (quote.value === "" && ref.value === "") {
                if (quoteContainer.length !== 0) {
                  for (var i = 0; i < quoteContainer.length; i++) {
                    text +=
                      "\n* " +
                      quoteContainer[i].quote +
                      "\n** " +
                      quoteContainer[i].ref;
                  }
                }
              } else {
                quoteContainer.push({
                  quote: quote.value,
                  ref: ref.value,
                });
                for (var i = 0; i < quoteContainer.length; i++) {
                  text +=
                    "\n* " +
                    quoteContainer[i].quote +
                    "\n** " +
                    quoteContainer[i].ref;
                }
              }
              if (text) {
                edit(
                  whereToInclude,
                  text,
                  quoteContainer.length,
                  function (result) {
                    if (result === true) {
                      mw.notify(
                        $(
                          '<div class="qq-msg-container"><img src="https://upload.wikimedia.org/wikipedia/commons/2/28/Green_check_icon_with_gradient.svg" /><span>উক্তি যোগ করা হয়েছে</span></div>'
                        ),
                        { type: "success", autoHideSeconds: 1 }
                      );
                      setTimeout(function () {
                        location.reload();
                      }, 1000);
                    } else {
                      mw.notify(
                        $(
                          '<div class="qq-msg-container"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg" /><span>' +
                            result +
                            "</span></div>"
                        ),
                        {
                          type: "error",
                          autoHideSeconds: 3,
                        }
                      );
                    }
                  }
                );
              } else {
                mw.notify(
                  $(
                    '<div class="qq-msg-container"><img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Info_icon-72a7cf.svg" /><span>উক্তি যোগ করা হয়নি</span></div>'
                  ),
                  {
                    type: "info",
                    autoHideSeconds: 1,
                  }
                );
              }
            });
          } else {
            console.log("উক্তি শিরোনাম নেই");
          }
        });
      //done
      function edit(section, text, count, callback) {
        var params = {
          action: "edit",
          title: pagename,
          section: section,
          summary:
            "[[ব্যবহারকারী:মোহাম্মদ মারুফ/quickquote|quickquote]] ব্যবহার করে " +
            count +
            "টি উক্তি যোগ করা হয়েছে",
        };
        getSectionData(section, function (sectionText) {
          params.text = sectionText + text;
          api.postWithToken("csrf", params).done(function (data) {
            if (data.edit.result === "Success") {
              callback(true);
            } else {
              callback(data.edit.result);
            }
          });
        });
      }
      function getSectionData(section, callback) {
        var params = {
          action: "parse",
          page: pagename,
          prop: "wikitext",
          format: "json",
          section: section,
          disabletoc: 1,
          formatversion: "2",
        };
        api.get(params).done(function (data) {
          callback(data.parse.wikitext);
        });
      }
    }
  })(jQuery, mw);
});
