(function () {
  if (typeof window.mr === "undefined") {
    window.mr = new Object();
  }
  //looking for the page creator
  function creatorLookOut(callbacks) {
    var params = {};
    var ts = new Morebits.wiki.page(mw.config.get("wgPageName"));
    ts.setFollowRedirect(true); // for NPP, and also because redirects are ineligible for PROD
    ts.setLookupNonRedirectCreator(true); // Look for author of first non-redirect revision
    //console.log("creatorLookOut");
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
  function choiseMsg(
    reason,
    creator,
    creation,
    pagename,
    sender,
    template,
    prefarence
  ) {
    var strObj = {
      string: "",
      template: template,
      reason: reason,
      color: "black",
      days: 0,
      creator: creator,
    };
    var prefarence = typeof prefarence === "object" && !{} ? prefarence : {};
    //console.log("choiseMsg");
    if (reason && pagename && creator && creation && sender && template) {
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
      var finalStr = `<nowiki>{{subst:টেমপ্লেট:${strObj.template}|reason=${strObj.reason}|page=${pagename}|creator=${strObj.creator}|color=${strObj.color}|days=${creationDate.days}|date=${creationDate.date}|${strObj.string}|sign=~~~~}}</nowiki>`;
      return finalStr;
    } else {
      if (!pagename) {
        throw new Error("পাতার নাম পাওয়া যায়নি");
      } else if (!creator) {
        throw new Error("কোনো প্রণেতা পাওয়া যায়নি");
      } else if (!creation) {
        throw new Error("পাতা প্রকাশের সময় পাওয়া যায়নি");
      } else if (!sender) {
        throw new Error("আপনার নাম পাওয়া যায়নি, সম্ভবত আপনি লগ আউট করেছেন");
      } else if (!reason) {
        throw new Error("ট্যাগ সঠিকভাবে আসেনি");
      } else if (!template) {
        throw new Error("নোটিশ পাঠানো লেটের নাম উল্লেখ করেননি");
      } else {
        throw new Error("নোটিশ পাঠানো যায়নি");
      }
    }
  }
  //main function to exicute
  function main(
    creator,
    creation,
    sender,
    reason,
    pagename,
    template,
    prefarence
  ) {
    //suggestion for the creator
    var rawtext = "";
    rawtext = choiseMsg(
      reason,
      creator,
      creation,
      pagename,
      sender,
      template,
      prefarence
    )
      ? choiseMsg(
          reason,
          creator,
          creation,
          pagename,
          sender,
          template,
          prefarence
        )
      : "";
    //console.log("main");
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
          "]] [[ব্যবহারকারী:মোহাম্মদ মারুফ/notice|notice]] সরঞ্জামটি ব্যবহার করে [[ব্যবহারকারী:" +
          creator +
          "|" +
          creator +
          "]] এর আলাপ পাতায় " +
          prefarence.summary;
      //sidebar button
      //putting user talkpage info here
      if (creator) {
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
            alertv = "প্রণেতাকে জানানো হয়েছে";
          },
          function onNotifyError() {
            /*           // if user could not be notified, log nomination without mentioning that notification was sent
          if (params.lognomination) {
            var usl = new Morebits.userspaceLogger(
              Twinkle.getPref("speedyLogPageName")
            );
          } */ // যদি কোনোদিন টুইংকেল আসে তাহলে এটা আবার চালু করতে হবে
            throw new Error("নোটিশ পাঠানো যায়নি");
          }
        );
      }
    } else {
      throw new Error("নোটিশ পাঠানো যায়নি");
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
    //console.log("countDay");
    return {
      days: diffObj.days,
      date: diffObj.date,
    };
  }
  //translate english numbers into bengali numbers
  function translateNumbers(number) {
    var num = number.toString();
    var result = "";
    //console.log("translateNumbers");
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
  if (mr.notice) {
    throw new Error("mr.notice already exists");
  }
  mr.notice = function (reason, template, prefarence) {
    //console.log(reason);
    var reason = typeof reason === "string" && reason.trim() ? reason : false;
    var template =
      typeof template === "string" && template.trim() ? template : false;
    var prefarence =
      typeof prefarence === "object" && prefarence ? prefarence : {};
    prefarence.summary =
      typeof prefarence.summary === "string" && prefarence.summary.trim()
        ? prefarence.summary
        : "নোটিশ পাঠিয়েছেন";
    prefarence.msgOwn =
      typeof prefarence.msgOwn === "boolean" ? prefarence.msgOwn : false;
    if (reason && template) {
      creatorLookOut(function (params) {
        var creator = params.initialContrib;
        var creation = params.creation;
        var sender = mw.config.get("wgUserName");
        //page name
        var pagename = mw.config.get("wgPageName").replace(/_/g, " ");
        //creator === sender
        if (!(creator === sender) || prefarence.msgOwn) {
          main(
            creator,
            creation,
            sender,
            reason,
            pagename,
            template,
            prefarence
          );
          alert("প্রণেতাকে নোটিশ পাঠানো হয়েছে");
        }
      });
    } else {
      if (!reason) {
        throw new Error("বার্তা প্রদানের কারণ উল্লেখ করেননি");
      } else if (!template) {
        throw new Error(
          "নোটিশ পাঠানোর জন্য একটি উইকি টেমপ্লেটের প্রয়োজন, যা অনুপস্থিত রয়েছে"
        );
      }
    }
  };
})();
