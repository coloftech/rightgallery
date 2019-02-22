
  $(function(){

  $('.gallery').loadThumbnail()
  $('.img-container').on('click',function(e){

      index = $(this).data('index');
      lightbox(index);

    $('#modalimage').modal('show');

    $('.close').on('click',function(){
      $('.modal').modal('hide');
    });


});

  })


var index = 0;

    $(document).on('click','#modalimage .btn-prev',function(){

  var thumbnail = $('.gallery img');
     index =  index-1;
      if (index == -1) {
        index=thumbnail.length - 1;
      }

     lightbox(index);

    })
    
    $(document).on('click','#modalimage .btn-next',function(){

  var thumbnail = $('.gallery img');
     index =  index+1;
      if (index >= thumbnail.length) {
        index=0;
      }

     lightbox(index);

    })


var lightbox = function(index){

  
  var img = {
    id: 0,
    slide: 0,
    src: null,
    title: null,
    desc: null,
    isLoaded: false,
    size: null,
    init: function(){

      var container = $('#img-'+index);
      img.id = $(container).attr('id');
      img.src =  $(container).find('img').attr('src')
      img.slide = index;
      img.title = $(container).find('.img-title').text();
      img.desc = $(container).find('img').data('desc');
      img.size = $(container).find('img').data('size');
      img.loadModal();
      img.loadImage();
      img.loadCaption();



    },
    loadModal: function(){
      if(img.isLoaded == false){
        img.isLoaded = true;
        var modal = '<div class="modal" id="modalimage">'+
    '<div class="modal-dialog modal-lg">'+
    '<div class="modal-content">'+
      '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button>&nbsp;</div>'+
      '<div class="modal-body">'+
    '<div class="images-viewer row">'+      
      '<div class="col-md-8"><div class="images"><div class="image"><img src="http://localhost/cacao/themes/Company/images/2.jpg"/></div><div class="clear-fix"></div></div></div>'+
    '<div class="col-md 4"><div class="images-information"><div class="title">[title here]</div><div class="image-size">Size: <label>0px &times; 0px</label></div><div class="description">[description]</div></div></div></div>'+
      '<div class="pull-right" style="position:absolute;bottom: 10px;float: right;right:10px;"><button class="btn btn-default btn-prev">Prev</button>&nbsp;<button class="btn btn-default btn-next">Next</button></div></div></div></div></div>';
      $('body').append(modal);

      }
      
    },
    loadImage: function(){
      $('.images-viewer .image').fadeOut('fast',function(){

      $('.images-viewer .image img').attr('src',img.src);
    }).fadeIn('slow');


    },
    loadCaption: function(){

    if(img.title.length > 0){
      $('.images-information .title').html(img.title);
    }else{

      $('.images-information .title').html('[no title]');
    }
    if(img.desc.length > 0){
      $('.images-information .description').html('Description: '+img.desc);
    }else{

      $('.images-information .description').html('[no description]');
    }

    if(img.size.length > 0){
      $('.images-information .image-size').html('Size: '+img.size+' pixels');
    }


    }

  }
  img.init(index);
}


$.fn.loadThumbnail = function(){
    var thumbnail = $(this).find('img'); 
    $(this).html('');
    var i =0;
  $.each(thumbnail,function () {
   

    if (i >= thumbnail.length) {
      return false;
    }else{

      var div = $('<div/>').addClass('img-container').attr('id','img-'+i).data('index',i);
          div.append($(this));
          div.append($('<span/>').text($(this).attr('alt')).addClass('img-title'));

       $('.gallery').append(div);
    }
    i++;
    
  });

} 

