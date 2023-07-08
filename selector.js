(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/selector.js: selector module
   ****************************************
   * Mode of invocation:     select elements from the DOM
   * Active on:              catagory namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/selector.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             15 March, 2023
   */
  if (
    mw.config.get("wgAction") === "view" &&
    mw.config.get("wgNamespaceNumber") === 14
  ) {
    var toolbox = document.getElementById("mr-toolbox");
    function select(item) {
      if (item.classList.contains("mr-selected")) {
        item.classList.remove("mr-selected");
        item.style.backgroundColor = "transparent";
      } else {
        item.classList.add("mr-selected");
        item.style.backgroundColor = "#9FA";
      }
    }
    var button = document.createElement("button");
    button.class = "mr-tool-button";
    button.innerHTML = "select";
    var container = document.createElement("textarea");
    container.id = "mr-tool-container";
    container.style.display = "none";
    document.body.appendChild(container);
    function start() {
      //get all list items
      var group = document.querySelectorAll("div.mw-category-group");
      var li = document.querySelectorAll("div.mw-category li");
      li.forEach(function (item) {
        item.addEventListener("click", function () {
          select(item);
        });
      });
      group.forEach(function (item) {
        var h3 = item.getElementsByTagName("h3")[0];
        h3.addEventListener("click", function () {
          select(h3);
          li = item.getElementsByTagName("li");
          for (var i = 0; i < li.length; i++) {
            select(li[i]);
          }
        });
      });
      //add a selecter button
      button.innerHTML = "copy now";
    }
    function copy() {
      if (container.innerHTML === "") {
        var selected = document.querySelectorAll(".mr-selected a");
        var selectedp = document.querySelectorAll(".mr-selected");
        selected.forEach(function (item, index) {
          selectedp[index].classList.remove("mr-selected");
          selectedp[index].style.backgroundColor = "transparent";
          container.innerHTML += item.innerHTML + ",";
        });
      }
      container.style.display = "block";
      container.style.opacity = "0";
      navigator.clipboard.writeText(container.innerHTML).then(() => {
        container.style.display = "none";
        container.innerHTML = "";
        button.innerHTML = "select";
      });
    }
    button.addEventListener("click", function () {
      if (button.innerHTML === "select") {
        start();
      } else {
        copy();
      }
    });
    toolbox.appendChild(button);
  }
})();
