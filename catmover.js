(function (Wikial) {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/catmover.js: catmover module
   ****************************************
   * Mode of invocation:     move catagories in existing one
   * Active on:              catagory namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/script-catmover.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             26 December, 2023
   */
  const api = new mw.Api();
  const page = mw.config.get("wgPageName");
  if (
    mw.config.get("wgAction") === "view" &&
    mw.config.get("wgNamespaceNumber") === 14
  ) {
    var wikial = new Wikial("abc");
    var toolbox = document.getElementById("mr-toolbox");
    var button = document.createElement("button");
    button.innerHTML = "cat mover";
    button.addEventListener("click", () => {
      var initdata = [];
      function loop(continuet, callback) {
        api
          .get({
            action: "query",
            format: "json",
            list: "categorymembers",
            formatversion: "2",
            cmtitle: page,
            cmlimit: "max",
            cmcontinue: continuet || "",
          })
          .done(function (data) {
            initdata.push(...data.query.categorymembers);
            if (continuet) {
              loop(data.continue.cmcontinue, callback);
            } else {
              callback(initdata);
            }
          })
          .fail(function (data) {
            console.log(data);
            wikial.error({
              content: data.error,
            });
            location.reload();
          });
      }
      loop("", (data) => {
        var count = data.length,
          serial = 0;
        var i = 0;
        if (count < 200) {
          var dis = confirm(
            "বিষয়শ্রেণীতে মোট নিবন্ধ রয়েছে " +
              count +
              "টি। যার সবগুলো সরাতে সময় লাগবে " +
              dtime(count * 15) +
              "। শুরু করা যাক?"
          );
          if (!dis) location.reload();
          var cas = new Wikial("case").case({
            title: count + "টি বিষয়শ্রেণী সরানো হয়েছে!",
            from: 0,
            to: count,
            content: "$to টি পাতার মধ্যে $from টি সরানো হয়েছে",
          });
          var which = prompt(
            "যে বিষয়শ্রেণীতে স্থানান্তর করতে চান, তার নাম?",
            page.replace(/_/g, " ")
          );
          function iloop(i, callback) {
            if (i < count) {
              edit(
                {
                  page: data[i].title,
                  what: page,
                  which: which,
                },
                (res, msg) => {
                  if (res) {
                    serial++;
                    cas.update();
                    console.log(data[i].title);
                  } else {
                    wikial.alert(
                      data[i].title +
                        " পাতাটিকে " +
                        which +
                        " এ স্থানন্তর করা যায়নি"
                    );
                    console.log(msg);
                  }
                }
              );
            } else {
              callback();
            }
            setTimeout(() => {
              i++;
              iloop(i, callback);
            }, 13.5 * 1000); // delay for 13.5 secs
          }
          iloop(i, () => {
            wikial.alert({
              title: "সম্পূর্ণ হয়েছে",
              content:
                count +
                "টি পাতার মধ্যে " +
                serial +
                "টি পাতাকে " +
                which +
                "এ স্থানন্তর করা সম্ভব হয়েছে। অর্থাৎ " +
                Math.round((serial / count) * 100) +
                "% স্থানন্তর করা সম্ভব হয়েছে।",
              type: "success",
            });
            api //get pagedata
              .get({
                action: "parse",
                format: "json",
                page: page,
                prop: "wikitext",
                formatversion: "2",
              })
              .done((data) => {
                api //edit old page
                  .edit(page, function (revision) {
                    return {
                      text: "{{বিষয়শ্রেণী পুনর্নির্দেশ|" + which + "}}",
                      summary: "হালনাগাদ করা হয়েছে।",
                    };
                  })
                  .done(() => {
                    api //edit target page
                      .edit(which, function (revision) {
                        return {
                          text: data.content.replace(
                            page.split(":")[1].replace(/_/g, " ").trim(),
                            which.split(":")[1].replace(/_/g, " ").trim()
                          ),
                          summary: "হালনাগাদ করা হয়েছে।",
                        };
                      })
                      .done(() => {
                        alert("All set guru!");
                      })
                      .fail((msg) => {
                        callback(false, msg);
                      });
                  })
                  .fail((msg) => {
                    console.log(false, msg);
                  });
              })
              .fail((msg) => {
                console.log(msg);
              });
          });
        } else {
          alert(
            "এই বিষয়শ্রেণীতে " +
              count +
              " টি পাতা রয়েছে, যা অনেক বেশি! এবং এটির সম্পাদনা শেষ করতে আপনার প্রায় " +
              dtime(count * 40) +
              ' সময় লাগবে। তাই আপনার উচিৎ কোনো প্রসাশকের সাহায্য নেওয়া। কারণ এতো বড় সম্পাদনার ফলে "সাম্প্রতিক পরিবর্তন" এ সমস্যা দেখা দিতে পারে।'
          );
        }
      });
    });
    function dtime(sec) {
      if (sec > 3600) {
        return (sec / 3600).toFixed(2) + " ঘন্টা";
      } else if (sec > 60) {
        return (sec / 60).toFixed(2) + " মিনিট";
      } else {
        return sec + " সেকেন্ড";
      }
    }
    function edit({ page, what, which }, callback) {
      what = what.replace(/_/g, " ");
      which = which.replace(/_/g, " ");
      api
        .edit(page, function (revision) {
          return {
            text: revision.content.replace(what, which),
            summary:
              "[[ব্যবহারকারী:মোহাম্মদ মারুফ/script-catmover.js|catmover]] ব্যবহার করে [[" +
              what +
              "]] থেকে [[" +
              which +
              "]] এ পরিবর্তন করা হয়েছে।",
            minor: true,
          };
        })
        .done(() => {
          callback(true);
        })
        .fail((msg) => {
          callback(false, msg);
        });
    }
    toolbox.appendChild(button);
  }
})(window.mr.Wikial);
