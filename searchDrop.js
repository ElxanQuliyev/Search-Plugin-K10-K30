(function($){
    $.fn.searchDrop=function(){
        var self=this;
        var allList=[];
        for(var i=0;i<arguments.length;i++){
            allList.push(arguments[i])
        }
        allList.sort();
       if(arguments.length>0){
           var dropDiv=$("<div></div>");
           dropDiv.addClass('searchDropdown')
           for(var i=0;i<arguments.length;i++){
               dropDiv.html(dropDiv.html()+"<span>"+arguments[i]+"</span>")
           }
           fillDropDown(dropDiv,allList)

           var wrapperDiv=$('<div></div>');
           wrapperDiv.addClass('wrapper')
           $(this).wrap(wrapperDiv)
           this.after(dropDiv);

           var marginTop=this.css('marginTop');
           marginTop=pxParse(marginTop);
           var top=this.outerHeight()+marginTop;

           var marginLeft=this.css('marginLeft');
           marginLeft=pxParse(marginLeft);
        

         
           dropDiv.css({
               top:top+'px',
               left:marginLeft+'px',
               width:this.outerWidth()+'px'
           })

           this.on('focus',function(){
               dropDiv.fadeIn(200)
           })
           //Triggering dropdown event
           this.on('keyup',function(){
             var letter=$(this).val()  
            var newList=filterList(letter,allList);
            fillDropDown($('.searchDropdown'),newList)
           })
           $('.searchDropdown span').on('click',function(){
            self.val($(this).html())
           })
       }
    }
}(jQuery))

function pxParse(value){
  return Number(value.slice(0,value.length-2));
}
function filterList(letter,list){
var newList=[];
    for(var i=0;i<list.length;i++){
        if(list[i].toLowerCase().startsWith(letter.toLowerCase())){
            newList.push(list[i])
        }   
    }
    return newList.sort();
}
function fillDropDown(element,list){
    $(element).empty()
    for(var i=0;i<list.length;i++){
        $(element).html(element.html()+"<span>"+list[i]+"</span>")
    }
}