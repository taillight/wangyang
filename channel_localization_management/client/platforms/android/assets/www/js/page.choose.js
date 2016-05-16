(function($){
  globle.page.choose = {
    id: "choose",
    choosedVal:"",
    pullDownGeneratedCount: 0,
    pullUpGeneratedCount: 0,
    listSelector:"div.pull-demo-page ul.ui-listview",
    init: function(){
      var self = this;
      self.isr_choose = $("#isr_choose").on("change",function(ent){
        self.choosedVal = ent.target && ent.target.value;
        console.log(self.choosedVal);
        $.mobile.changePage("#" + self.choosedVal);
      });
    }
  };

  // Set-up jQuery event callbacks
  $(document).delegate("#choose", "pageinit",
    function bindPullPagePullCallbacks(event) {
      globle.page.choose.init();

      $(".iscroll-wrapper", this).bind( {
        "iscroll_onpulldown" : function(){},
        "iscroll_onpullup"   : function(){}
        });

      globle.page.choose.scrollView = $(".iscroll-wrapper").data("mobile-iscrollview");
    });
}(jQuery));
