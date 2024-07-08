var denoder = true;
function loadMorebits(mcallback) {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/morebits.js: morebits module
   ****************************************
   * Mode of invocation:     laibrary for twinkle
   * Active on:              all namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/morebits.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             02 July, 2024
   */
  const api = new mw.Api();
  const today = new Date();
  //gather data
  api
    .get({
      action: "query",
      meta: ["userinfo", "siteinfo"], // same effect as 'userinfo|siteinfo'
    })
    .then(function ({ query }) {
      mcallback({
        user: {
          LastContribution: usrLstContribution,
          contributionCount: usrContribCount,
        },
        page: {
          create: createPage,
          edit: editPage,
          data: getOldText,
          getCreator: creatorLookOut,
          tags: fillterTags,
          info: pageInfo,
        },
        technical: {
          watch: addToWatchlist,
          isIpUser: ipCheck,
        },
        info: { sitedata: query.general, userdata: query.userdata },
      });
    });
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
  //user is active or not (gives the last contribution date of a user)
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
  function addToWatchlist(page, days, callback) {
    var date = new Date(today.getTime() + days * 24 * 60 * 60 * 1000); //{{days}} days
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
        callback(false);
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
  function createPage(page, callback, pretext, summary) {
    var params = {
      action: "edit",
      createonly: "true",
      format: "json",
      title: page,
      text: pretext ? pretext : "",
      summary: summary ? summary : "",
    };
    api
      .postWithToken("csrf", params)
      .done(function (data) {
        callback(data);
      })
      .fail(function (error) {
        console.error(error);
        alert(page + " পাতাটি তৈরি করা যায়নি।");
      });
  }
  //edit page
  function editPage(page, summary, callback) {
    new mw.Api()
      .edit(page, async function (revision) {
        var wikitext = await callback(revision);
        if (typeof wikitext !== "string") {
          console.error(
            "Page is not edited, because recived value is not a 'Sring'. Insted it's a(n)" +
              typeof wikitext
          );
        } else {
          return {
            text: wikitext,
            summary,
          };
        }
      })
      .fail(function (e) {
        console.error(e);
      });
  }
  //page info
  function pageInfo(page, callback) {
    var pages = "";
    if (page instanceof Array) {
      pages = page.join("|");
    } else if (page instanceof String) {
      pages = page;
    } else {
      callback(false);
      throw TypeError(
        "You should input Array or String rather a(n)" + typeof page
      );
    }
    var params = {
      action: "query",
      format: "json",
      prop: "info|categories|images|iwlinks|langlinks|redirects|pageviews",
      titles: pages,
      formatversion: "2",
      inprop: "url|talkid|watchers|watched|protection",
      cllimit: "max",
      imlimit: "max",
      iwlimit: "max",
      lllimit: "max",
      rdlimit: "max",
    };
    api.get(params).then(function (data) {
      if (data.batchcomplete) {
        if (data.query.pages[0].missing) {
          callback(false);
        } else {
          callback(data.query.pages);
        }
      }
    });
  }
  //user's total contribution
  function usrContribCount(user, project, lang, callback) {
    fetcher(
      `https://xtools.wmcloud.org/api/user/simple_editcount/${lang}.${project}/${user}/all`,
      (data) => {
        delete data["elapsed_time"];
        data["total_edit_count"] =
          data["deleted_edit_count"] + data["live_edit_count"];
        callback(data);
      }
    );
  }

  /* judicial section */
  //fetching data
  function fetcher(url, callback) {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        callback(json);
      });
  }
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
}
