(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/decoder.js: decoder module
   ****************************************
   * Mode of invocation:     encode and decode
   * Active on:              except special namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/decoder.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             25 May, 2023
   */
  if (mw.config.get("wgCanonicalNamespace") !== "Special") {
    var encodedArea = document
      .getElementById("mw-content-text")
      .getElementsByTagName("p");
    for (var i = 0; i < encodedArea.length; i++) {
      var encoded = encodedArea[i].innerHTML;
      var decoded = decodeURI(dencode(encoded, "!E6hJk'{KB"));
      encodedArea[i].innerHTML = decoded;
    }
  }
  function ttob(str) {
    return str
      .split("")
      .map(function (c) {
        var bin = c.charCodeAt(0).toString(2);
        return Array(8 - bin.length + 1).join("0") + bin;
      })
      .join("");
  }
  function btot(str) {
    //check if the string is a binary string
    if (/^[01]+$/.test(str)) {
      return str
        .match(/.{8}/g)
        .map(function (c) {
          return String.fromCharCode(parseInt(c, 2));
        })
        .join("");
    } else {
      throw new Error("Not a binary string");
    }
  }
  function changeCase(str) {
    var newStr = "";
    for (var i = 0; i < str.length; i++) {
      var char = str[i];
      if (char == char.toUpperCase()) {
        newStr += char.toLowerCase();
      } else {
        newStr += char.toUpperCase();
      }
    }
    return newStr;
  }
  function dencode(str, token) {
    //check if the string is a binary string
    if (typeof str == "string") {
      var str = ttob(str);
      var token = ttob(token);
      var tokenLength = token.length;
      var strLength = str.length;
      var encoded = "";
      for (var i = 0; i < strLength; i++) {
        var bit = str[i];
        var tokenBit = token[i % tokenLength];
        if (bit == tokenBit) {
          encoded += "1";
        } else {
          encoded += "0";
        }
      }
      return btot(encoded);
    } else {
      throw new Error("Not a string");
    }
  }
})();
