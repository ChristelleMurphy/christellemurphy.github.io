window.onload = () => {
    'use strict';
  
    splitFunction();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service_worker.js');
    }
  }