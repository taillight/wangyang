(function(){
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
    }
  };

  globle.page.choose.init();
})();
