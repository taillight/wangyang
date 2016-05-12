(function(){
  window.globle = {
    page: {},
    popup: {},
    app: {
      initialize: function() {
          this.bindEvents();
      },
      bindEvents: function() {
          // Here we register our callbacks for the lifecycle events we care about
          document.addEventListener('deviceready', this.onDeviceReady, false);
          document.addEventListener('pause', this.onPause, false);
          document.addEventListener('resume', this.onResume, false);
      },
      onDeviceReady: function() {
          document.getElementById("take-picture-button").addEventListener("click", function() {
              // Because the camera plugin method launches an external Activity,
              // there is a chance that our application will be killed before the
              // success or failure callbacks are called. See onPause() and
              // onResume() where we save and restore our state to handle this case
              //appState.takingPicture = true;
              console.log(" --------  navigator camera : ");
              console.log(navigator.camera);
              /*navigator.camera.getPicture(cameraSuccessCallback, cameraFailureCallback,
                  {
                      sourceType: Camera.PictureSourceType.CAMERA,
                      destinationType: Camera.DestinationType.FILE_URI,
                      targetWidth: 250,
                      targetHeight: 250
                  }
              );*/
          });
    }
    }
  }
})();
