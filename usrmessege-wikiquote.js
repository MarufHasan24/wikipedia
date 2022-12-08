(function () {
  if (!window.Morebits) {
    window.Morebits = mw.loader.load(
      "//bn.wikiquote.org/w/index.php?title=মিডিয়াউইকি:Gadget-morebits.js&action=raw&ctype=text/javascript"
    );
  }
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
  //dependencies
  var sidebarObj = {
    vector: {
      area: "#p-cactions ul",
      class: "mw-list-item",
    },
    monobook: {
      area: "#p-personal ul",
      class: "mw-list-item",
    },
    timeless: {
      area: "#p-personal ul",
      class: "mw-list-item",
    },
    minerva: {
      area: "#p-tb",
      class: "toggle-list-item",
    },
    "vector-2022": {
      area: "#p-cactions ul",
      class: "mw-list-item",
    },
  };
  mw.loader.load(
    "/w/index.php?title=ব্যবহারকারী:মোহাম্মদ মারুফ/বার্তাপ্রদান.css&action=raw&ctype=text/css",
    "text/css"
  );
  var skin = mw.config.get("skin");
  //desided sidebar
  var li = document.createElement("li");
  li.id = "t-usrmessage";
  li.className = sidebarObj[skin].class;
  document.querySelector(sidebarObj[skin].area).appendChild(li);
  var sidebar = document.getElementById("t-usrmessage");
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
      soln: "[[উইকিউক্তি:নির্ভরযোগ্য উৎস|নির্ভরযোগ্য উৎস]] থেকে [[উইকিউক্তি:যাচাইযোগ্যতা|তথ্যসূত্র প্রদান করে]] এই নিবন্ধটির মানোন্নয়ন করুন। তা নাহলে নিবন্ধটি অপসারণ করা হতে পারে",
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
    sidebar.innerHTML += '<a id="msg-send-tool">অপেক্ষা করুন</a>';
    try {
      if (skin === "minerva") {
        sidebar.innerHTML =
          '<a id="msg-send-tool"><span class="mw-ui-icon" id="usermsg-icon"></span><span>অপেক্ষা করুন</span></a>';
        document.getElementById("page-actions-overflow").onclick = finalTouch;
      } else if (skin == "vector" || skin == "vector-2022") {
        document.getElementById("p-cactions").onmouseover = finalTouch;
      } else {
        finalTouch();
      }
    } catch (e) {
      document.getElementById("msg-send-tool").innerHTML =
        '<span style="color:red;">লোড করা সম্ভব হয়নি</span>';
    }
    //received user name amd creation time
  } else {
    return;
  }
  //fainally loded
  function finalTouch() {
    creatorLookOut(async function (params) {
      var creator = params.initialContrib;
      var creation = params.creation;
      var isMultiple = false;
      var sender = mw.config.get("wgUserName");
      //page name
      var pagename = mw.config.get("wgPageName").replace(/_/g, " ");
      //received all tags
      var tagsInfo = await fillterTags(pagename),
        tags,
        doButton = document.getElementById("msg-send-tool");
      if (typeof Morebits.wiki.page === "undefined") {
        await Morebits.wiki.page;
      }
      if (skin === "minerva") {
        doButton.innerHTML =
          '<span class="mw-ui-icon" id="usermsg-icon"></span><span>বার্তা দিন</span>';
      } else {
        doButton.innerHTML = "বার্তা দিন";
      }
      tags = tagsInfo;
      isMultiple = typeof tags === "object" && tags.length === 1 ? false : true;
      // added button to sidebar
      doButton.onclick = function () {
        var today = new Date();
        var diff = today - new Date(creation);
        var longLongAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
        var msg =
          longLongAgo > 365
            ? longLongAgo +
              " দিন আগে " +
              creator +
              " এই পাতাটি তৈরি করেছেন, হয়তো প্রণেতা সর্বশেষ পরিবর্তনগুলো করেননি। বার্তা দেওয়ার পূর্বে পাতার ইতিহাস যাচাই করে নিন। আপনি কি এখনি " +
              creator +
              "-কে বার্তা দিতে চান?"
            : "আপনি কি " + creator + "-কে বার্তা দিতে চান?";
        if (creator === sender) {
          msg = "আপনি কি নিজেকে বার্তা দিতে চান?";
          if (confirm(msg)) {
            main(creator, creation, sender, tags, pagename, params, isMultiple);
          } else {
            alert("বার্তা প্রদান বাতিল করা হয়েছে");
            return;
          }
        } else {
          if (confirm(msg)) {
            main(creator, creation, sender, tags, pagename, params, isMultiple);
          } else {
            alert("বার্তা প্রদান বাতিল করা হয়েছে");
            return;
          }
        }
      };
    });
  }
  //looking for the page creator
  function creatorLookOut(callbacks) {
    var params = {};
    var ts = new Morebits.wiki.page(mw.config.get("wgPageName"));
    ts.setFollowRedirect(true); // for NPP, and also because redirects are ineligible for PROD
    ts.setLookupNonRedirectCreator(true); // Look for author of first non-redirect revision
    ts.lookupCreation(
      function (pageobj) {
        params.initialContrib = pageobj.getCreator();
        params.creation = pageobj.getCreationTimestamp();
        /*         pageobj
          .getStatusElement()
          .info(params.initialContrib + " এই পাতাটি তৈরি করেছেন");*/
        callbacks(params);
      },
      function (pageobj) {
        pageobj.getStatusElement().info("কোন প্রণেতা পাওয়া যায়নি");
      }
    );
  }
  //choise message
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
            : "দিন"; //if the page is created today
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
  function main(creator, creation, sender, tags, pagename, params, multiple) {
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
          "]] [[ব্যবহারকারী:মোহাম্মদ মারুফ/বার্তাপ্রদান.js|বার্তাপ্রদান]] সরঞ্জামটি ব্যবহার করে [[ব্যবহারকারী:" +
          creator +
          "|" +
          creator +
          "]]কে বার্তা প্রদান করেছেন";
      //sidebar button
      //putting user talkpage info here
      if (creation)
        var usertalkpage = new Morebits.wiki.page(
          "ব্যবহারকারী আলাপ:" + creator,
          "মূল অবদানকারীকে জানানো হচ্ছে (" + creator + ")"
        );
      usertalkpage.setAppendText(notifytext);
      usertalkpage.setEditSummary(editsummary);
      //usertalkpage.setChangeTags("twinkle"); //বার্তাপ্রদান
      usertalkpage.setCreateOption("recreate");
      usertalkpage.setWatchlist("1 month");
      usertalkpage.setFollowRedirect(true, false);
      usertalkpage.append(
        function onNotifySuccess() {
          // add this nomination to the user's userspace log, if the user has enabled it
          /* if (params.lognomination) {
            Twinkle.speedy.callbacks.user.addToLog(params, initialContrib);
          } */ // যদি কোনোদিন টুইংকেল আসে তাহলে এটা আবার চালু করতে হবে
          alert("সফলভাবে বার্তা প্রদান করা হয়েছে");
        },
        function onNotifyError() {
          /*           // if user could not be notified, log nomination without mentioning that notification was sent
          if (params.lognomination) {
            var usl = new Morebits.userspaceLogger(
              Twinkle.getPref("speedyLogPageName")
            );
          } */ // যদি কোনোদিন টুইংকেল আসে তাহলে এটা আবার চালু করতে হবে
          alert("বার্তা প্রদান করা যায়নি");
        }
      );
    }
  }
  //async function to get tags
  async function getTags(pagename) {
    var url =
      "https://bn.wikiquote.org/w/api.php?" +
      new URLSearchParams({
        origin: "*",
        action: "parse",
        page: pagename,
        format: "json",
      });

    var req = await fetch(url);
    var json = await req.json();
    return json.parse.templates;
  }
  //filltering tags from template
  async function fillterTags(pagename) {
    var rawdata = await getTags(pagename);
    var data = rawdata;
    var templates = data.map(function (elem) {
      var tempName = elem["*"].replace("টেমপ্লেট:", "");
      return tempName;
    });
    var tags = templates.filter((value) => problems.includes(value));
    if (tags.length !== 0) {
      return tags;
    } else {
      return "কোনো ট্যাগ নেই";
    }
  }
  //counting on date
  function countDay(date) {
    var today = new Date();
    var diff = today - new Date(date);
    var diffArray = new Date(date);
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
        translateNumbers(diffArray.getDate()) +
        " " +
        monthArray[diffArray.getMonth()] +
        ", " +
        translateNumbers(diffArray.getFullYear()),
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
  function ipCheck(creator) {
    var ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    var ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(creator) || ipv6Regex.test(creator);
  }
})();
