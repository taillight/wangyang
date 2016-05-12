(function(){
  globle.page.insert_tree = {
    id: "insert_tree",
    init: function(){
      var self = this;
      self.camera = $("#siteImg").on("click",function(ent){
        navigator.camera.getPicture(self.cameraSuccessCallback, self.cameraFailureCallback,
            {
                sourceType: Camera.PictureSourceType.CAMERA,
                destinationType: Camera.DestinationType.FILE_URI,
                targetWidth: 250,
                targetHeight: 250
            }
        );
      });

    },
    cameraSuccessCallback: function(imageUri){
      console.log("-------------------------------------"+imageUri);
      if(imageUri) {
        this.pict = $("#tree_pic");
        this.pict.find("img").attr("src",imageUri);
        this.pict.show();
      }
    },
    cameraFailureCallback: function(error){}
  };

  globle.page.insert_tree.init();
})();
