/**
 * Enhanced "Typekit Advanced Embed Code"
 *
 * - Beautified for better readability
 * - Use classList instead of className +=
 * - Fix left over wf-* classes
 * - Remember error within session and fail early
 *
 * Run `uglifyjs typekit-advanced.js --compress --mangle` to compress.
 *
 */

// var config = { kitId: '<ID>', scriptTimeout: 1500, async: true, classes: false };

(function() {
  var docList = document.documentElement.classList;
  var storage = window.sessionStorage;

  function setInactive() {
    docList.add('wf-inactive');
    docList.remove('wf-loading');
    storage.setItem('wf-inactive', true);
  }

  function setActive() {
    docList.add('wf-active');
    docList.remove('wf-loading');
  }

  // Attach handlers
  config.active = setActive;
  config.inactive = setInactive;

  // Timeout loading script (network error, invalid URL)
  var timeout = setTimeout(setInactive, config.scriptTimeout);

  // Add `.wf-loading` while loading
  docList.add('wf-loading');

  // Create script
  var script = document.createElement('script');
  var status, ready;
  script.src = 'https://use.typekit.net/' + config.kitId + '.js';
  script.async = true;
  script.onload = script.onreadystatechange = function() {
      ready = this.readyState;
      if (status || ready && ready != 'complete' && ready != 'loaded') return;
      status = true;
      clearTimeout(timeout);
      try {
          Typekit.load(config);
      } catch (e) {}
  };

  // Do not load if previous attempt failed
  if (storage && storage['wf-inactive']) {
    setInactive();
    return;
  }

  // Add script to DOM
  var prevScript = document.getElementsByTagName('script')[0];
  prevScript.parentNode.insertBefore(script, prevScript);
})();
