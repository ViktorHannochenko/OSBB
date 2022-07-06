window.addEventListener('DOMContentLoaded', () => {
    // Меню гамбургер
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        closeElem = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });
    //Лічильник
    // function numberWithCommas(str) {
    //     return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // }

    // function counterAnim(element, duration = 3000) {
    //     const value = element.innerText.replace(/[^\d]/g, '');
    //     let startTimestamp = null;
    //     const step = (timestamp) => {
    //         if (!startTimestamp) startTimestamp = timestamp;
    //         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    //         element.innerText = numberWithCommas(Math.floor(progress * (+value)));

    //         if (progress < 1) {
    //             window.requestAnimationFrame(step);
    //         }
    //     };
    //     window.requestAnimationFrame(step);
    // }
    // function counterInit(selector) {
    //     const counters = document.querySelectorAll(selector);
    //     for (let i = 0; i < counters.length; i++) {
    //         counterAnim(counters[i]);
    //     }
    // }
    // counterInit('.about__item-counter');


});

$(document).ready(function () {
    $('ul.documents__tabs').on('click', 'li:not(.documents__tab_active)', function () {
        $(this)
            .addClass('documents__tab_active').siblings().removeClass('documents__tab_active')
            .closest('div.container').find('div.documents__content').removeClass('documents__content_active').eq($(this).index()).addClass('documents__content_active');
    });

    $('.carousel__inner').slick({
        adaptiveHeight: true,
        speed: 1000,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/leftt_arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.svg"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                dots: false,
                arrows: false,
            }
        }]
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1300) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    function smoothScroll(scroll) {
        $(scroll).click(function () {
            const _href = $(this).attr("href");
            $("html, body").animate({
                scrollTop: $(_href).offset().top + "px"
            });
            return false;
        });
    }
    smoothScroll("a[href=#up]");
    smoothScroll("a[href=#about]");
    smoothScroll("a[href=#board]");
    smoothScroll("a[href=#documents]");
    smoothScroll("a[href=#gallery]");
    smoothScroll("a[href=#contacts]");

    //  Forms
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                },
                text: {
                    required: true,
                    minlength: 20
                },
                checkbox: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "Будь ласка, введіть своє ім'я",
                    minlength: jQuery.validator.format("Напишіть {0} символи!")
                },
                phone: "Будь ласка, введіть свій номер телефону",
                email: {
                    required: "Будь ласка, введіть свою пошту",
                    email: "Невірна адреса пошти"
                },
                text: {
                    required: "Повідомлення має містити щонайменше 20 символів",
                    minlength: jQuery.validator.format("Напишіть мінімум {0} символів!")
                }
            }
        });
    }

    validateForms('#contacts form');
    validateForms('#contacts textarea');

    $('input[name=phone]').mask("+38 (999) 999-99-99");


    $('form').submit(function(e) {
        e.preventDefault();
    
        if (!$(this).valid()) {
            return;
        }
    
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
    
            $('form').trigger('reset');
        });
        return false;
    });

});