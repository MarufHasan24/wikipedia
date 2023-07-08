/*
Title: wikial.js
Author: Maruf Hasan
Description: wikial.js is a javascript framework for creating smart and beautifull alert.
Date: 15 May, 2023
version: 1.0.0
*/

function Wikial(label, preference) {
  window.wikialdata = window.wikialdata || {
    labelcount: 0,
    labels: {},
  };
  Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index != -1) this.splice(index, 1);
  };
  var preferences = preference || {};
  if (window.wikialdata.labels[label])
    throw new Error("This Wikial label already exists");
  wikialdata.labelcount += 1;
  if (!label) {
    wikialdata.labels[wikialdata.labelcount] =
      "wikial-" + wikialdata.labelcount;
  } else {
    wikialdata.labels[wikialdata.labelcount] = label;
  }
  var protobj = {};
  protobj.id = "wikial-" + label || wikialdata.labels[wikialdata.labelcount];
  var wikial,
    autoHide = false,
    contentDom,
    footer,
    continuetime = 0,
    data = {
      label: label,
      displaying: false,
      lines: [],
      lineCount: 0,
      type: preferences.type || "default",
      done: false,
    };
  protobj.init = function () {
    if (data.done) data.done = false;
    wikial = document.createElement("div");
    wikial.id = protobj.id;
    wikial.className = "wikial";
    wikial.style.display = "block";
    data.displaying = true;
    document.body.appendChild(wikial);
    wikial.innerHTML = `<div id="wikial-title">${
      data.label || "Wikial"
    }</div><div id="wikial-content"></div><div id="wikial-footer"></div>`;
    return protobj;
  };
  protobj.add = function (pref) {
    if (!pref) throw new Error('No data provided in "add" method');
    if (!data.displaying) protobj.init();
    if (pref.title)
      document.getElementById("wikial-title").innerHTML = pref.title;
    data.label = pref.title;
    var line = document.createElement("div");
    data.lineCount++;
    line.className = "wikial-line";
    line.id = "wikial-line" + data.lineCount;
    contentDom = contentDom || document.getElementById("wikial-content");
    contentDom.appendChild(line);
    line.innerHTML = pref.content;
    styling(line, pref);
    data.lines.push(line);
    return protobj;
  };
  protobj.change = function (pref) {
    if (data.done) return;
    if (!pref) throw new Error('No data provided in "change" method');
    if (!data.displaying) {
      protobj.add({
        title: pref.title || data.label,
        content: pref.content,
      });
    } else {
      var lineno =
        pref.line && pref.line <= data.lineCount ? pref.line : data.lineCount;
      var line = document.getElementById("wikial-line" + lineno);
      line.innerHTML = pref.content;
      styling(line, pref);
    }
  };
  protobj.remove = function (pref) {
    if (data.done) return;
    var lineno =
      pref.line && pref.line <= data.lineCount ? pref.line : data.lineCount;
    var line = document.getElementById("wikial-line" + lineno);
    line.remove();
    data.lines.remove(line);
  };
  protobj.clear = function () {
    if (data.done) return;
    if (!data.displaying) return;
    contentDom = contentDom || document.getElementById("wikial-content");
    contentDom.innerHTML = "";
    footer = footer || document.getElementById("wikial-footer");
    footer.innerHTML = "";
    data.lines = [];
    data.lineCount = 0;
    return protobj;
  };
  protobj.end = function () {
    if (data.done) return;
    wikial = wikial || document.getElementById(protobj.label);
    wikial.style.display = "none";
    document.body.removeChild(wikial);
    data.displaying = false;
    data.done = true;
    return protobj;
  };
  protobj.timeout = function (autoend) {
    if (data.done) return;
    continuetime = autoend;
    if (!autoend) throw new Error('No time provided in "timeout" method');
    autoHide = true;
    if (typeof autoend == "string") {
      if (autoend.includes("s"))
        autoend = parseInt(autoend.replace("s", "")) * 1000;
      else if (autoend.includes("m"))
        autoend = parseInt(autoend.replace("m", "")) * 1000 * 60;
      else if (autoend.includes("h"))
        autoend = parseInt(autoend.replace("h", "")) * 1000 * 60 * 60;
      else {
        throw new Error('Invalid time string provided in "timeout" method');
      }
    } else if (typeof autoend != "number") {
      throw new Error('Invalid time string provided in "timeout" method');
    }
    if (autoend) {
      setTimeout(function () {
        if (continuetime > autoend) {
          continuetime -= autoend;
          protobj.timeout(continuetime);
        } else {
          protobj.end();
        }
      }, autoend);
    }
    return protobj;
  };
  protobj.break = function () {
    if (data.done) return;
    if (autoHide) {
      protobj.end();
    } else {
      throw new Error("This Wikial instance is not set to autohide");
    }
  };
  protobj.continue = function (extend) {
    if (data.done) return;
    extend = typeof extend === "number" ? extend * 1000 : 0;
    if (autoHide) {
      continuetime += extend;
    } else {
      throw new Error("This Wikial instance is not set to autohide");
    }
    return protobj;
  };
  protobj.hideAfter = function (callback) {
    if (data.done) return;
    if (typeof callback != "function")
      throw new Error("Invalid callback provided in afterHide method");
    callback(() => {
      new Promise((resolve) => {
        resolve();
      }).then(() => {
        protobj.clear();
        protobj.end();
        data.done = true;
      });
    });
    return protobj;
  };
  protobj.time = function (callback) {
    if (data.done) return;
    if (typeof callback != "function")
      throw new Error("Invalid callback provided in time method");
    var start = performance.now();
    callback();
    var end = performance.now();
    return end - start;
  };
  protobj.addButton = function (pref) {
    if (data.done) return;
    if (!pref) throw new Error('No data provided in "button" method');
    if (!data.displaying) protobj.init();
    var button = document.createElement("button");
    button.className = "wikial-button";
    button.id = "wikial-button" + data.lineCount;
    button.innerHTML = pref.content;
    button.onclick = pref.onclick;
    footer = footer || document.getElementById("wikial-footer");
    footer.appendChild(button);
    return protobj;
  };
  protobj.isPresnt = function (line) {
    if (data.done) return false;
    return line <= data.lineCount && line > 0 && data.lines.indexOf(line) != -1;
  };
  protobj.setTitle = function (title) {
    if (data.done) return;
    if (!title) throw new Error('No title provided in "setTitle" method');
    var title = document.getElementById("wikial-title");
    title.innerHTML = title;
    return protobj;
  };
  this.__proto__ = protobj;
  this.alert = function (pref) {
    data.type = "alert";
    if (!data.done) {
      protobj.clear();
    }
    if (!pref) throw new Error('No data provided in "alert" method');
    if (typeof pref == "string") pref = { content: pref };
    else if (typeof pref != "object") throw new Error("Invalid data provided");
    protobj.add({
      title: pref.title || data.label,
      content: pref.content,
      type: pref.type || "warning",
    });
    if (pref.autoHide != undefined) {
      protobj.timeout(pref.autoHide);
    } else {
      protobj.hideAfter((callback) => {
        protobj.addButton({
          content: pref.button || "OK",
          onclick: callback,
        });
      });
    }
    wikial.className = "wikial wikial-alert";
  };
  this.log = function (...args) {
    data.type = "log";
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      //it it's string
      var argtype = typeof arg;
      switch (argtype) {
        case "object":
          if (arg instanceof Array) {
            protobj.add({
              content: arrayToString(arg),
            });
          } else {
            protobj.add({
              content: objectToString(arg),
            });
          }
          break;
        case "function":
          protobj.add({
            content: arg(),
          });
          break;
        default:
          protobj.add({
            content: arg,
          });
          break;
      }
    }
    wikial.className = "wikial wikial-log";
  };
  this.error = function (pref) {
    data.type = "error";
    if (!pref.content) throw new Error("No content provided in error method");
    protobj.add({
      title: pref.title || data.label,
      content: pref.content,
    });
    if (pref.autoHide != undefined) {
      protobj.timeout(pref.autoHide);
    } else {
      protobj.hideAfter((callback) => {
        if (pref.button == undefined)
          pref.button = ["I understood", "copy to clipboard"];
        else if (typeof pref.button == "string")
          pref.button = [pref.button, "copy to clipboard"];
        else if (pref.button.length == 1 && pref.button instanceof Array)
          pref.button.push("copy to clipboard");
        protobj.addButton({
          content: pref.button[0],
          onclick: callback,
        });
        protobj.addButton({
          content: pref.button[1],
          onclick: function () {
            var text = document.getElementById("wikial-content").innerText;
            navigator.clipboard.writeText(text.replace(/<br>/g, ""));
            callback();
          },
        });
      });
    }
    wikial.className = "wikial wikial-error";
  };
  this.case = function (pref) {
    data.type = "case";
    if (!pref.from) pref.from = 0;
    if (!pref.to) throw new Error("No ending provided in case method");
    if (!pref.content) throw new Error("No content provided in case method");
    var content = pref.content;
    protobj.add({
      title: pref.title || data.label,
      content: content.replace(/\$to/i, pref.to).replace(/\$from/i, pref.from),
      type: pref.type || "info",
    });
    this.update = function (lpref) {
      if (lpref && lpref.from) pref.from = lpref.from;
      pref.from++;
      if (pref.from < pref.to) {
        protobj.change({
          content: content
            .replace(/\$to/i, pref.to)
            .replace(/\$from/i, pref.from),
          type: (lpref && lpref.type) || pref.type || "info",
        });
      } else if (pref.from >= pref.to) {
        protobj.change({
          content: content
            .replace(/\$to/i, pref.to)
            .replace(/\$from/i, pref.from),
          type: (lpref && lpref.type) || pref.type || "info",
        });
        protobj.hideAfter((callback) => {
          protobj.addButton({
            content: "Ok",
            onclick: callback,
          });
        });
      }
    };
    wikial.className = "wikial wikial-case";
    return this;
  };
}
if (window.mr) window.mr.Wikial = Wikial;
else window.mr = { Wikial: Wikial };
//dependencies
function arrayToString(arr) {
  var str = "[";
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) str += arrayToString(arr[i]) + ",<br>";
    else if (typeof arr[i] == "object") str += objectToString(arr[i]) + ",";
    else if (typeof arr[i] == "function") str += arr[i]() + ",<br>";
    else str += arr[i] + " ";
  }
  return str + "]";
}
function objectToString(obj) {
  var str = "{<br>";
  for (var key in obj) {
    if (typeof obj[key] == "object") str += objectToString(obj[key]);
    else if (obj[key] instanceof Array) str += arrayToString(obj[key]);
    else if (typeof obj[key] == "function")
      str += key + ": " + obj[key]() + ",<br>";
    else str += key + ": " + obj[key] + " ,<br>";
  }
  return str + "}";
}
function styling(line, pref) {
  if (pref.type == "error") {
    line.style.color = "red";
    line.style.fontWeight = "bold";
    line.style.fontStyle = "normal";
    line.style.textShadow = "0px 0px 1px #800";
  } else if (pref.type == "success") {
    line.style.color = "#49af41";
    line.style.fontWeight = "bold";
    line.style.fontStyle = "normal";
    line.style.textShadow = "0px 0px 1px #222";
  } else if (pref.type == "warning") {
    line.style.color = "orange";
    line.style.fontStyle = "italic";
    line.style.textShadow = "none";
    line.style.fontWeight = "300";
  } else if (pref.type == "info") {
    line.style.color = "blue";
    line.style.fontStyle = "italic";
    line.style.textShadow = "none";
    line.style.fontWeight = "400";
  } else {
    line.style.color = pref.color || "black";
    line.style.backgroundColor = pref.bgcolor || "none";
    line.style.fontWeight = pref.bold ? "bold" : "normal";
    line.style.fontStyle = pref.italic ? "italic" : "normal";
    line.style.textShadow = pref.shadow ? "0px 0px 3px #000" : "none";
  }
}
