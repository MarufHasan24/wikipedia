(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/script-replacer.js: replacer module
   ****************************************
   * Mode of invocation:     replace this all over
   * Active on:              only main namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/script-replacer.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             15 January, 2024
   */
  var toolbox = document.getElementById("mr-toolbox");
  var button = document.createElement("button");
  button.innerHTML = "replacer";
  const api = new mw.Api();
  button.addEventListener("click", () => {
    var relatable = prompt("আপনি কি পরিবর্তন করতে চান?", "");
    function loop(continuet, callback) {
      api
        .get({
          action: "query",
          format: "json",
          list: "search",
          formatversion: "2",
          srsearch: relatable,
          srlimit: "max",
          srprop: "timestamp|snippet",
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
          alert("একটি সমস্যা হয়েছে!");
          //location.reload();
        });
    }
    loop("", (data) => {
      var count = data.length;
      if (count < 200) {
      } else {
        alert(
          "এই জিনিসটি " +
            count +
            " টি পাতায় রয়েছে, যা অনেক বেশি! এবং এটির সম্পাদনা শেষ করতে আপনার প্রায় " +
            dtime(count * 15) +
            ' সময় লাগবে। তাই আপনার উচিৎ কোনো প্রসাশকের সাহায্য নেওয়া। কারণ এতো বড় সম্পাদনার ফলে "সাম্প্রতিক পরিবর্তন" এ সমস্যা দেখা দিতে পারে। আপনি চাইলে AishikBot কে এ বিষয়ে অবগত করতে পারেন।'
        );
      }
    });
  });

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
})();
