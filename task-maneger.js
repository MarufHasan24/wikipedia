(function () {
  /*
   ****************************************
   *** ব্যবহারকারী:মোহাম্মদ মারুফ/task-maneger.js: task-maneger module
   ****************************************
   * Mode of invocation:     task-maneger with alarm
   * Active on:              only main namespace
   * Config directives in:   ব্যবহারকারী:মোহাম্মদ মারুফ/task-maneger.js
   * creator:                মোহাম্মদ মারুফ
   * created on:             10 May, 2023
   */
  if (mw.config.get("wgNamespaceNumber") === 0) {
    const container = document.getElementById("mw-panel");
    var taskManeger = document.createElement("div");
    taskManeger.id = "task-maneger-container";
    taskManeger.innerHTML =
      '<h5 id="task-maneger-header">Task Maneger<button id="task-maneger-add">+</button></h5><ul id="task-maneger-list"></ul>';
    container.appendChild(taskManeger);
    var taskManegerList = document.getElementById("task-maneger-list");
    var taskManegerAdd = document.getElementById("task-maneger-add");
    loadData(taskManegerList);
    addDeleteEvent(taskManegerList);
    taskManegerAdd.addEventListener("click", function () {
      var task = prompt("Enter your task");
      if (task) {
        //wiki markup to make a link
        if (
          task.search(/\[.*\s.*\]/g) >= 0 &&
          task.search(/(\[\[.*\]\])/g) < 0
        ) {
          task = createLink(task, false);
        } else if (task.search(/(\[\[.*\]\])/g) >= 0) {
          task = createLink(task, true);
        }
        taskManegerList.innerHTML +=
          '<li class="task-maneger-item">' +
          task +
          '<button class="task-maneger-list-delete">X</button></li>';
        saveData(taskManegerList);
        addDeleteEvent(taskManegerList);
      }
    });
    alarm();
  }
  function loadData(container) {
    var data = localStorage.getItem("mr-task-maneger");
    if (data) {
      data = JSON.parse(data).text;
      for (var i = 0; i < data.length; i++) {
        container.innerHTML +=
          '<li class="task-maneger-item">' + data[i] + "</li>";
      }
    }
  }
  function saveData(container) {
    var data = {
      text: [],
      nextTime: new Date().getTime() + 24 * 60 * 60 * 1000,
    };
    var taskManegerListItems =
      container.getElementsByClassName("task-maneger-item");
    for (var i = 0; i < taskManegerListItems.length; i++) {
      data.text.push(taskManegerListItems[i].innerHTML);
    }
    localStorage.setItem("mr-task-maneger", JSON.stringify(data));
  }
  function addDeleteEvent(container) {
    var taskManegerListDelete = document.getElementsByClassName(
      "task-maneger-list-delete"
    );
    if (taskManegerListDelete.length) {
      for (var i = 0; i < taskManegerListDelete.length; i++) {
        taskManegerListDelete[i].addEventListener("click", function () {
          this.parentNode.remove();
          saveData(container);
        });
      }
    }
  }
  function alarm() {
    var data = localStorage.getItem("mr-task-maneger");
    if (data) {
      data = JSON.parse(data);
      if (data.nextTime < new Date().getTime() && data.text.length) {
        alert("You have some task to do");
        data.nextTime = new Date().getTime() + 60 * 60 * 1000;
        localStorage.setItem("mr-task-maneger", JSON.stringify(data));
      }
    }
  }
  function createLink(text, dission) {
    //extractuct link text
    if (dission) {
      var link = text
        .match(/(\[\[.*\]\])/g)[0]
        .replace(/(\[\[|\]\])/g, "")
        .split("|");
      var title = link[1] ? link[1] : link[0];
      return text.replace(
        /(\[\[.*\]\])/g,
        '<a href="https:' +
          mw.config.get("wgServer") +
          "/wiki/" +
          link[0] +
          '">' +
          title +
          "</a>"
      );
    } else {
      var link = text
        .match(/\[.*\s.*\]/g)[0]
        .replace(/(\[|\])/g, "")
        .split(" ");
      return text.replace(
        /\[.*\s.*\]/g,
        '<a href="' + link[0] + '">' + link[1] + "</a>"
      );
    }
  }
})();
