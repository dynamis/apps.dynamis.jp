"use strict";

function initialize() {
  // shorthands and utilities
  var Apps = navigator.apps || navigator.Apps || navigator.mozApps;
  var getElementById = document.getElementById.bind(document);
  var querySelectorAll = document.querySelectorAll.bind(document);
  // Array.prototype.slice.call( <Array like object> ) -> Array
  var slice = Function.prototype.call.bind(Array.prototype.slice);
  var toArray = slice;
  function preventDefault(event) {
    if(event.preventDefault) {
      event.preventDefault();
    }
    else {
      event.returnValue = false;
    }
  }
  function installApp(manifesturl) {
    if (!Apps) {
      alert("Web アプリケーションがサポートされていません");
    }
    var request = Apps.install(manifesturl);
    request.onsuccess = function () {
      var app = this.result;
      alert(app.manifest.name + 'をインストールしました。')
    };
    request.onerror = function () {
      alert('インストールできませんでした: ' + this.error.name);
    };
  }
  
  // Application Loader
  var apploader = getElementById("apploader");
  apploader.addEventListener("submit", function(event) {
    preventDefault(event);
    var appurl = getElementById("appurl").value;
    document.location = appurl;
  }, false);
  
  // Application Installer
  var appInstallIcons = toArray(querySelectorAll(".appicon[data-manifesturl]"));
  appInstallIcons.forEach(function(element, index, array) {
    element.addEventListener("click", function(event) {
      var manifesturl = element.dataset.manifesturl;
      installApp(manifesturl);
    }, false);
  });
  
  var appinstaller = getElementById("appinstaller");
  appinstaller.addEventListener("submit", function(event) {
    preventDefault(event);
    var manifesturl = getElementById("manifesturl").value;
    installApp(manifesturl);
  }, false);
  
  
}
initialize();


