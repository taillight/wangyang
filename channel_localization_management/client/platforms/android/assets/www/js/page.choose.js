(function($){
  globle.page.choose = {
    id: "choose",
    choosedVal:"",
    init: function(){
      var self = this;
      self.isr_choose = $("#isr_choose").on("change",function(ent){
        self.choosedVal = ent.target && ent.target.value;
        console.log(self.choosedVal);
        $.mobile.changePage("#" + self.choosedVal);
      });

      self.tabs = $("#choose .ui-content");

      self.navbar = $("#navbar > li").on("click", function(ent){
        var idx = $(ent.target).attr("data-index");
        self.tabs.hide();
        self.tabs.eq(idx).fadeIn();
      });;
    },

    onPullDown: function(){},
    onPullUp: function(event, data){
      var i,
          iscrollview = data.iscrollview,
          newContent = "";
      for (i=0; i<3; i+=1) {
        newContent += '<li><p><strong>树障201605112107</strong></p><h2>为有效消除电力线路保护区内的树障隐患，确保夏季电网安全运行，近日，襄汾县供电公司按计划在城乡电力线路范围内开展树障集中清理工作</h2><p class="ui-li-rside">线路工区&nbsp;&nbsp;&nbsp;汪洋</p><p class="ui-li-aside"><strong>2016-2-4</strong></p></li>';
        }
      $("#choose-listview").append(newContent).listview("refresh");
      iscrollview.refresh(null, null,
        $.proxy(function afterRefreshCallback(iscrollview) {
          this.scrollToElement("#choose-listview .ui-last-child", 400);
          }, iscrollview) );
    }
  };

  // Set-up jQuery event callbacks
  $(document).delegate("#choose", "pageinit",
    function bindPullPagePullCallbacks(event) {
      globle.page.choose.init();

      $("#choose-wrapper").bind( {
        "iscroll_onpulldown" : globle.page.choose.onPullDown,
        "iscroll_onpullup"   : globle.page.choose.onPullUp
        });
    });
}(jQuery));
