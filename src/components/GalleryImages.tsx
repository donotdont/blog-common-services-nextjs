import React from 'react';
import Script from 'next/script';

const GalleryImages = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js`}
      />
      <Script
        strategy='lazyOnload'
        src={`https://cdnjs.cloudflare.com/ajax/libs/prettyPhoto/3.1.6/js/jquery.prettyPhoto.min.js`}
      />
      <Script
        strategy='lazyOnload'
        src={`https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.17/jquery.bxslider.min.js`}
      />
      <Script
        strategy='lazyOnload'
        src={`https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/js/lightgallery-all.min.js`}
      />
      <Script
        strategy='lazyOnload'
        src={`https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/js/lightslider.min.js`}
      />

      <Script id='fancybox' strategy='lazyOnload'>
            {`
                $(document).ready(function(){
                  $('.doc-markdown img').parent().not('a').not('li').each(function(i,elm){
                    var $img = $(elm).find('img');
                    if($img.attr('class') != "fancybox" && $img.attr('data-fancybox') != "gallery"){
                      $img.wrap('<a href="' + $img.attr('src').split('?')[0] + '" class="fancybox" data-fancybox="gallery"></a>');
                    }
                    //$img.parent('a.fancybox').fancybox();
                  });
                  //$('.bxslider').bxSlider();
                  //$('.slides').bxSlider();
                
                  if($('.slides').length > 0){
                    $('.slides').lightSlider({
                    gallery: true,
                    item: 1,
                    
                    speed: 400, //ms'
                    auto: true,
                    loop: true,
                    slideEndAnimation: true,
                    pause: 2000,
                    
                    slideMargin: 0,
                    controls: false,
                    thumbItem: $('ul.slides li').length,
                    mode: 'fade',
                    onSliderLoad: function (el) {
                      el.lightGallery({
                          selector: '.slides .lslide'
                      });
                    },
                  });
                  }
                  

                  $('.main > div > div:first a').each((i, obj)=>{
                    if($(obj).attr("href").length > 1 
                       && $(obj).attr("href") != '/' 
                       && !new RegExp(window.location.origin).test($(obj).attr("href"))
                       && !new RegExp("strapi2.common-services.com").test($(obj).attr("href"))
                       ){
                      //console.log($(obj).attr("href"));
                      $(obj).attr("target","_blank");
                    }
                  });
                });
            `}
      </Script>
    </>
  );
};

export default GalleryImages;
