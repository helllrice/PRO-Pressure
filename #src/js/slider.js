const slick = 
    $(document).ready(function(){
        $('.slider-block').slick({
            arrow: false,
            prevArrow: '<i class="fas fa-chevron-left"></i>',
            nextArrow: '<i class="fas fa-chevron-right"></i>',
            autoplay: true,
            dots: true,
            dotsClass: 'dots',
        })
        $('.spec-slider').slick({
            arrow: false,
            prevArrow: '<i class="fas fa-chevron-left"></i>',
            nextArrow: '<i class="fas fa-chevron-right"></i>',
            autoplay: true,
        })
    });

export default slick;











