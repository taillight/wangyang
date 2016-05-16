(function($){
  globle.page.choose = {
    id: "choose",
    choosedVal:"",
    pullDownGeneratedCount: 0,
    pullUpGeneratedCount: 0,
    listSelector:"div.pull-demo-page ul.ui-listview",
    init: function(obj){
      var self = this;
      self.isr_choose = $("#isr_choose").on("change",function(ent){
        self.choosedVal = ent.target && ent.target.value;
        console.log(self.choosedVal);
        $.mobile.changePage("#" + self.choosedVal);
      });

      self.scroll = new iScroll('wrapper', {
    		scrollbarClass: 'myScrollbar', /* 重要样式 */
    		useTransition: false
    	});
    }
  };

  // Set-up jQuery event callbacks
  $(document).delegate("#choose", "pageinit",
    function bindPullPagePullCallbacks(event) {
      globle.page.choose.init(event.target);
    });
}(jQuery));
