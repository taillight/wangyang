$(function($){
  globle.page.choose = {
    id: "choose",
    choosedVal:"",
    lastSelector:"#choose > li:last-child",
    init: function(){
      self = this;
      $("#choose-wrapper").bind( {
        "iscroll_onpulldown" : self.onPullDown,
        "iscroll_onpullup"   : self.onPullUp
        });
    },

    onPullDown: function(){},
    onPullUp: function(event, data){
      var i,
          iscrollview = data.iscrollview,
          newContent = "";
      for (i=0; i<3; i+=1) {
        newContent += '<li><p><strong>树障201605112107</strong></p><h2>为有效消除电力线路保护区内的树障隐患，确保夏季电网安全运行，近日，襄汾县供电公司按计划在城乡电力线路范围内开展树障集中清理工作</h2><p class="ui-li-rside">线路工区&nbsp;&nbsp;&nbsp;汪洋</p><p class="ui-li-aside"><strong>2016-2-4</strong></p></li>';
        }
      $("#choose ul").append(newContent).listview("refresh");
      iscrollview.refresh(null, null,
        $.proxy(function afterRefreshCallback(iscrollview) {
          this.scrollToElement(globle.page.choose.listView.find("li:last-child"), 400);
          }, iscrollview) );
    }
  }

  globle.page.choose.init();
});
