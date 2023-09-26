mw.loader.using(["jquery.ui"]).then(function () {
  (function ($) {
    /*
     ****************************************
     *** ব্যবহারকারী:মোহাম্মদ মারুফ/বার্তাপ্রদান.js: বার্তাপ্রদান মডিউল
     ****************************************
     * Mode of invocation:     ট্যাগযুক্ত পাতা থেকে পাতা তৈরিকারককে বার্তা প্রদান
     * Active on:              মূল নামস্থান
     * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/বার্তাপ্রদান.js
     * creator:                মোহাম্মদ মারুফ
     * mentored by:            MdsShakil
     */
    // dependencies
    const api = new mw.Api();
    const pagename = mw.config.get("wgPageName").replace(/_/g, " ");
    const skin = mw.config.get("skin");
    const today = new Date();
    mw.loader.load(
      "/w/index.php?title=ব্যবহারকারী:মোহাম্মদ মারুফ/বার্তাপ্রদান.css&action=raw&ctype=text/css",
      "text/css"
    );
    var area = skin === "minerva" ? "p-tb" : "p-cactions";
    //সমস্যা
    var problems = [
      /* "COI", */
      // প্রয়োজন নেই
      /* "expert-subject", */
      // প্রয়োজন নেই
      /* "Merge from", */
      // প্রয়োজন নেই
      /* "Merge to", */
      // প্রয়োজন নেই
      /* "ইতিহাস একীকরণ", প্রয়োজন নেই, প্রশাশকের কাজ*/
      /*"নতুন অপর্যালোচিত নিবন্ধ", প্রয়োজন নেই, পর্যালোচকের কাজ */
      /* "ব্যবহৃত হচ্ছে" , প্রয়োজন নেই*/
      /*"Close paraphrasing",
    "Hoax",
    "In-universe",
    "Peacock",
    "Plot",
    "Recentism",
    "Too few opinions",
    "Weasel",
    "context",
    "fansite",
    "tense",
    "অ-উন্মুক্ত",
    "অতিরিক্ত অনুচ্ছেদসমূহ",
    "অতিরিক্ত সংযোগ",
    "অনির্ভরযোগ্য তথ্যসূত্র",
    "অনুচ্ছেদসমূহ",
    "অনুলিপি প্রতিলেপন",
    "অনুলিপি সম্পাদনা",
    "অসংযুক্ত",
    "অসংলগ্ন",
    "আত্মজীবনী",
    "আরও পাদটীকা",
    "উদ্ধৃতিদান শৈলী",
    "উল্লেখযোগ্যতা",
    "উৎসহীন",
    "একটি উৎস",
    "একীকরণ",
    "কম সংযুক্ত",
    "কমসংযুক্ত",
    "কারিগরি পরিভাষার আধিক্য",
    "কাল্পনিক",
    "খালি ইউআরএল পরিষ্কারকরণ",
    "খুব দীর্ঘ",
    "গদ্য",
    "ছোট নিবন্ধ",
    "জী-ব্য-জী উৎসহীন",
    "জী-ব্য-জী তথ্যসূত্র",
    "নিরপেক্ষতা",
    "পরিষ্করণ",
    "পরিষ্করণ-পুনঃসংগঠন",
    "পাদটীকা নেই",
    "পুরোটাই দৃশ্যপট",
    "প্রাথমিক উৎস",
    "বর্ণনা ভঙ্গি",
    "বহিঃসংযোগসমূহ",
    "বাংলা নয়",
    "বিজ্ঞাপন",
    "বিতর্কিত",
    "বিভ্রান্তিকর",
    "বিষয়শ্রেণী উন্নয়ন",
    "বিষয়শ্রেণীহীন",
    "বৈশ্বিক দৃষ্টিভঙ্গি",
    "ভাষা সম্প্রসারণ",
    "ভূমিকাংশ অতি দীর্ঘ",
    "ভূমিকাংশ অনুপস্থিত",
    "ভূমিকাংশ খুবই সংক্ষিপ্ত",
    "ভূমিকাংশ পুনর্লিখন",
    "মেয়াদউত্তীর্ণ",
    "মৌলিক গবেষণা",
    "যান্ত্রিক অনুবাদ",
    "রচনা সংশোধন",
    "রচনানুগ",
    "সংযোগহীন",
    "সূত্র উন্নতি",
    "স্বপ্রকাশিত",
    "হালনাগাদ",
    "অসম্পূর্ণ",
    "জীববিজ্ঞান-অসম্পূর্ণ",
    "রসায়ন-অসম্পূর্ণ",
    "বিজ্ঞান-অসম্পূর্ণ",
    "বিষমচাক্রিক-অসম্পূর্ণ",
    "কম্পিউটার বিজ্ঞান-অসম্পূর্ণ",
    "গণিত-অসম্পূর্ণ",
    "অসম্পূর্ণ-জীবনী",
    "ভৌগোলিক অবস্থান-অসম্পূর্ণ",
    "প্রাণী অসম্পূর্ণ",
    "চিকিৎসা বিজ্ঞান-অসম্পূর্ণ",
    "টেলিভিশন ধারাবাহিক অসম্পূর্ণ",
    "চলচ্চিত্র-অসম্পূর্ণ",
    "ধর্ম-অসম্পূর্ণ",
    "এভিয়েশন-অসম্পূর্ণ",
    "খাদ্য অসম্পূর্ণ",
    "ওয়েবসাইট অসম্পূর্ণ",
    "অ্যানিমে-অসম্পূর্ণ",
   */
      "উৎসহীন",
      "পরিষ্করণ",
      "নিরপেক্ষতা",
    ];
    //সমাধান
    var problemDes = {
      উৎসহীন: {
        des: "নিবন্ধটিতে কোন [[উইকিউক্তি:যাচাইযোগ্যতা|উৎস বা তথ্যসূত্র]] [[উইকিউক্তি:উৎসনির্দেশ|উদ্ধৃত]] নেই",
        soln: "[[উইকিউক্তি:নির্ভরযোগ্য উৎস|নির্ভরযোগ্য উৎস]] থেকে [[উইকিউক্তি:যাচাইযোগ্যতা|তথ্যসূত্র প্রদান করে]] এই নিবন্ধটির মানোন্নয়ন করুন",
      },
      পরিষ্করণ: {
        des: "নিবন্ধটি '''উইকিউক্তির জন্য [[উইকিউক্তি:রচনাশৈলী নির্দেশনা|মানসম্পন্ন অবস্থায়]] আনতে [[উইকিউক্তি:নিবন্ধ ত্রুটি দূরীকরণ|পরিচ্ছন্ন]] করা প্রয়োজন'''। ",
        soln: "নিবন্ধটিতে [[উইকিউক্তি:নিবন্ধ ত্রুটি দূরীকরণ|পরিচ্ছন্ন]] সমস্যা সম্পর্কে আরো বিস্তারিত থাকতে পারে। এর আলাপ পাতায় প্রাসঙ্গিক আলোচনা পাওয়া যেতে পারে। নিবন্ধটি পরিষ্কার করার আগ পর্যন্ত {{tl|পরিষ্করণ}} টেমপ্লেটটি সরিয়ে ফেলবেন না",
      },
      নিরপেক্ষতা: {
        des: "নিবন্ধটির '''[[উইকিউক্তি:নিরপেক্ষ দৃষ্টিভঙ্গি|নিরপেক্ষতা]] নিয়ে [[উইকিউক্তি:সংঘাত নিরসন|বিতর্ক]]''' রয়েছে",
        soln: "প্রাসঙ্গিক আলোচনা নিবন্ধটির আলাপ পাতায় পাওয়া যেতে পারে। [[উইকিউক্তি:সংঘাত নিরসন#সংঘাত নিরসন|বিতর্ক নিরসন]] হওয়ার আগ পর্যন্ত {{tl|নিরপেক্ষতা টেমপ্লেটটি}} সরিয়ে ফেলবেন না",
      },
    };
    if (
      mw.config.get("wgSiteName") === "উইকিউক্তি" &&
      mw.config.get("wgNamespaceNumber") === 0 &&
      mw.config.get("wgArticleId") &&
      !mw.config.get("wgIsMainPage")
    ) {
      // added button to the page
      var button = $(
        mw.util.addPortletLink(area, "#", "বার্তা দিন", "msg-send-tool")
      );
      // find the creator of the page
      creatorLookOut(pagename, function (params) {
        var creator = params.creator;
        var creation = params.creation;
        var sender = mw.config.get("wgUserName");
        button.click(function () {
          // users last contribution
          usrLstContribution(creator, function (usrdata) {
            var lastCdate = usrdata.date;
            var lastCdays = usrdata.days;
            var diff = today - new Date(creation);
            var longLongAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
            var msg = "আপনি কি " + creator + "-কে বার্তা দিতে চান?";
            if (lastCdays > 30) {
              msg =
                "ব্যবহারকারী:" +
                creator +
                " সর্বশেষ সম্পাদনা করেছেন " +
                lastCdate +
                " তারিখে অর্থাৎ " +
                lastCdays +
                " দিন আগে। আপনি কি তাঁকে বার্তা দিতে চান?";
              if (longLongAgo > 365) {
                msg =
                  "ব্যবহারকারী:" +
                  creator +
                  " সর্বশেষ সম্পাদনা করেছেন " +
                  lastCdate +
                  " তারিখে অর্থাৎ " +
                  lastCdays +
                  " দিন আগে এবং তিনি এই পাতাটি " +
                  longLongAgo +
                  " দিন আগে তৈরি করেছেন, হয়তো প্রণেতা সর্বশেষ পরিবর্তনগুলোও করেননি। বার্তা দেওয়ার পূর্বে পাতার ইতিহাস যাচাই করে নিন। আপনি কি তাঁকে বার্তা দিতে চান?";
              }
            } else {
              if (longLongAgo > 365) {
                msg =
                  "ব্যবহারকারী:" +
                  creator +
                  " সর্বশেষ সম্পাদনা করেছেন " +
                  lastCdate +
                  " তারিখে অর্থাৎ " +
                  lastCdays +
                  " দিন আগে এবং তিনি এই পাতাটি " +
                  longLongAgo +
                  " দিন আগে তৈরি করেছেন, হয়তো প্রণেতা সর্বশেষ পরিবর্তনগুলোও করেননি। বার্তা দেওয়ার পূর্বে পাতার ইতিহাস যাচাই করে নিন। আপনি কি তাঁকে বার্তা দিতে চান?";
              }
            }
            fillterTags(pagename, function (tags) {
              if (tags.length > 0) {
                var multiple = tags.length > 1 ? true : false;
                // check if the creator is the sender
                if (creator === sender) {
                  msg = "আপনি কি নিজেকে বার্তা দিতে চান?";
                  if (confirm(msg)) {
                    main(creator, creation, sender, tags, pagename, multiple);
                  } else {
                    alert("বার্তা প্রদান বাতিল করা হয়েছে");
                    return;
                  }
                } else {
                  if (confirm(msg)) {
                    main(creator, creation, sender, tags, pagename, multiple);
                  } else {
                    alert("বার্তা প্রদান বাতিল করা হয়েছে");
                    return;
                  }
                }
              } else {
                alert("এই পাতাটি কোন ট্যাগ নেই");
                return;
              }
            });
            // all tags recieved successfully
          });
        });
      });
    }
    //fainally loded
    //choise message for the user based on the tags
    function choiseMsg(tags, multiple, creator, creation, pagename, sender) {
      var strObj = {
        string: "",
        problems: tags,
        problemDes: "",
        multiple: multiple ?? false,
        suggesition: "",
        color: "black",
        days: 0,
        creator: ipCheck(creator) ? "ব্যবহারকারী" : creator,
      };
      //if there is tags
      if (typeof strObj.problems !== "string") {
        strObj.problemDes = problemDes[strObj.problems[0]].des;
        strObj.suggesition = problemDes[strObj.problems[0]].soln
          ? "|suggesition=" + problemDes[strObj.problems[0]].soln
          : "";
        for (var i = 1; i < tags.length; i++) {
          strObj.suggesition += problemDes[strObj.problems[i]].soln
            ? "\n#" + problemDes[strObj.problems[i]].soln
            : "";
          strObj.problemDes += "\n#" + problemDes[strObj.problems[i]].des;
        }
        if (tags && pagename && creator && creation && sender) {
          //counting on date
          var creationDate = countDay(creation);
          //if the page is created more than 7 days ago
          if (creationDate.days > 7) {
            strObj.color = "red";
          } else if (creationDate.days > 3) {
            strObj.color = "orange";
          } else {
            strObj.color = "black";
          }
          //creation day count translation
          creationDate.days =
            creationDate.days > 0
              ? '<span style="color:' +
                strObj.color +
                '">' +
                translateNumbers(creationDate.days) +
                " দিন পূর্বে </span>"
              : "দিন";
          console.log(creationDate.days);
          //if the page is created today
          //string operation
          if (typeof strObj.problems === "object") {
            if (!multiple) {
              strObj.string = `<nowiki>{{subst:টেমপ্লেট:বার্তা প্রদান|page=${pagename}|problem=${strObj.problemDes}${strObj.suggesition}|creator=${strObj.creator}|sender=${sender}|days=${creationDate.days}|date=${creationDate.date}|sign=~~~~}}</nowiki>`;
            } else if (multiple === true && tags.length > 1) {
              strObj.string = `<nowiki>{{subst:টেমপ্লেট:বার্তা প্রদান-একাধিক|page=${pagename}|problem=${strObj.problemDes}${strObj.suggesition}|creator=${strObj.creator}|sender=${sender}|days=${creationDate.days}|date=${creationDate.date}|sign=~~~~}}</nowiki>`;
            }
            return strObj.string;
          }
        } else {
          if (!pagename) {
            alert("পাতার নাম পাওয়া যায়নি");
          } else if (!creator) {
            alert("কোনো প্রণেতা পাওয়া যায়নি");
          } else if (!creation) {
            alert("পাতা প্রকাশের সময় পাওয়া যায়নি");
          } else if (!sender) {
            alert("আপনার নাম পাওয়া যায়নি, সম্ভবত আপনি লগ আউট করেছেন");
          } else if (!tags) {
            alert("ট্যাগ সঠিকভাবে আসেনি");
          } else {
            alert("বার্তা প্রদান করা যায়নি");
          }
        }
      } else {
        //if there is no tags
        if (strObj.problems === "একাধিক") {
          strObj.multiple = false;
        } else if (strObj.problems === "কোনো ট্যাগ নেই") {
          alert("কোনো ট্যাগ পাওয়া যায়নি, বার্তা প্রদান করা হয়নি"); //if there is no tags
          return;
        } else {
          return;
        }
      }
    }
    //main function to exicute
    function main(creator, creation, sender, tags, pagename, multiple) {
      //suggestion for the creator
      var rawtext = "";
      rawtext =
        choiseMsg(tags, multiple, creator, creation, pagename, sender) ?? "";
      if (rawtext.trim() !== "") {
        //notify user

        var notifytext =
            "\n\n" + rawtext.replace("<nowiki>", "").replace("</nowiki>", ""),
          //edit summary
          editsummary =
            "[[ব্যবহারকারী:" +
            sender +
            "|" +
            sender +
            "]] [[ব্যবহারকারী:মোহাম্মদ মারুফ/বার্তাপ্রদান|বার্তাপ্রদান]] সরঞ্জামটি ব্যবহার করে [[ব্যবহারকারী:" +
            creator +
            "|" +
            creator +
            "]]কে বার্তা প্রদান করেছেন";
        // if the user is exist
        if (creator) {
          var talkpage = "ব্যবহারকারী আলাপ:" + creator;
          getOldText(talkpage, function (oldtext) {
            var params = {
              action: "edit",
              title: talkpage,
              text: oldtext + notifytext,
              summary: editsummary,
            };
            //edit the talk page
            api.postWithToken("csrf", params).then(function (data) {
              if (data.edit.result === "Success") {
                addToWatchlist(talkpage, function (data) {
                  if (data.error) {
                    alert(
                      "বার্তা প্রদান করা হয়েছে, কিন্তু আপনার নজরতালিকায় যোগ করা যায়নি"
                    );
                  } else {
                    alert("সফলভাবে বার্তা প্রদান করা হয়েছে");
                  }
                });
              } else {
                alert("বার্তা প্রদান করা যায়নি");
              }
            });
          });
        }
      } else {
        alert("বার্তা প্রদান করা যায়নি");
      }
    }
    //counting on date
    function countDay(date) {
      var diff = today - new Date(date);
      var diffdate = new Date(date);
      var monthArray = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
      ];
      var diffObj = {
        date:
          translateNumbers(diffdate.getDate()) +
          " " +
          monthArray[diffdate.getMonth()] +
          ", " +
          translateNumbers(diffdate.getFullYear()),
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      };
      return {
        days: diffObj.days,
        date: diffObj.date,
      };
    }
    //translate english numbers into bengali numbers
    function translateNumbers(number) {
      var num = number.toString();
      var result = "";
      result = num
        .replace(/0/gi, "০")
        .replace(/1/gi, "১")
        .replace(/2/gi, "২")
        .replace(/3/gi, "৩")
        .replace(/4/gi, "৪")
        .replace(/5/gi, "৫")
        .replace(/6/gi, "৬")
        .replace(/7/gi, "৭")
        .replace(/8/gi, "৮")
        .replace(/9/gi, "৯");
      return result;
    }
    //check if the user is an ip
    function ipCheck(creator) {
      var ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
      var ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
      return ipv4Regex.test(creator) || ipv6Regex.test(creator);
    }
    // look out for the page creation
    function creatorLookOut(pagename, callback) {
      var params = {
        action: "query",
        format: "json",
        prop: "revisions",
        titles: pagename,
        formatversion: "2",
        rvprop: "timestamp|user|comment|tags",
        rvlimit: "1",
        rvdir: "newer",
      };
      api
        .get(params)
        .then(function (data) {
          var revision = data.query.pages[0].revisions[0],
            result = {
              creator: revision.user,
              creation: revision.timestamp,
              summary: revision.comment,
              tags: revision.tags,
            };
          callback(result);
        })
        .fail(function (error) {
          console.error(error);
        });
    }
    //get and fillter tags from template
    function fillterTags(pagename, callback) {
      var params = {
        action: "parse",
        page: pagename,
        format: "json",
      };
      api
        .get(params)
        .then(function (data) {
          var data = data.parse.templates;
          var templates = data.map(function (elem) {
            var tempName = elem["*"].replace("টেমপ্লেট:", "");
            return tempName;
          });
          var tags = templates.filter((value) => problems.includes(value));
          if (tags.length !== 0) {
            callback(tags);
          } else {
            callback(false);
          }
        })
        .fail(function (error) {
          console.error(error);
        });
    }
    //user is active or not
    function usrLstContribution(username, callback) {
      var params = {
        action: "query",
        format: "json",
        list: "usercontribs",
        formatversion: "2",
        uclimit: "1",
        ucuser: username,
        ucnamespace: "*",
      };
      api
        .get(params)
        .then(function (data) {
          var lastContribution = data.query.usercontribs[0].timestamp;
          var dateday = countDay(lastContribution);
          var result = {
            date: dateday.date,
            days: dateday.days,
          };
          callback(result);
        })
        .fail(function (error) {
          console.error(error);
        });
    }
    //set watchlist
    function addToWatchlist(page, callback) {
      var date = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); //7 days
      var params = {
        action: "watch",
        format: "json",
        titles: page,
        expiry: date.toISOString(),
      };
      api
        .postWithToken("watch", params)
        .done(function (data) {
          callback(data);
        })
        .fail(function (error) {
          console.error(error);
        });
    }
    //get old text
    function getOldText(page, callback) {
      var params = {
        action: "query",
        format: "json",
        titles: page,
        prop: "wikitext",
        formatversion: "2",
      };
      api.get(params).then(function (data) {
        if (data.query.pages[0].missing) {
          delete params.titles;
          params.page = page;
          params.action = "parse";
          createPage(
            page,
            function (data) {
              api
                .get(params)
                .done(function (data) {
                  callback(data.parse.wikitext);
                })
                .fail(function (error) {
                  console.error(error);
                });
            },
            "== বাংলা উইকিপিডিয়ায় আপনাকে স্বাগতম ==\n\n{{" +
              "স্বাগতম/২য় সংস্করণ}} <!-- বার্তা প্রদান সরঞ্জাম কতৃক প্রদানকৃত -->"
          );
        } else {
          delete params.titles;
          params.page = page;
          params.action = "parse";
          api
            .get(params)
            .done(function (data) {
              callback(data.parse.wikitext);
            })
            .fail(function (error) {
              console.error(error);
            });
        }
      });
    }
    //create page
    function createPage(page, callback, pretext) {
      var params = {
        action: "edit",
        createonly: "true",
        format: "json",
        title: page,
        text: pretext ? pretext : "",
        summary: "বার্তা প্রদান সরঞ্জাম প্রয়োজনে পাতা তৈরি করেছে",
      };
      api
        .postWithToken("csrf", params)
        .done(function (data) {
          callback(data);
        })
        .fail(function (error) {
          console.error(error);
          alert(page + " পাতাটি তৈরি করা যায়নি। তাই বার্তা প্রদান করা যায়নি");
        });
    }
  })(jQuery);
});
