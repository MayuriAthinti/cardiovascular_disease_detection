var MyScroll = "";
(function (window, document, $, undefined) {
    "use strict";
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
        navigator.userAgent
    )
        ? !0
        : !1;
    var Scrollbar = window.Scrollbar;
    var Init = {
        i: function (e) {
            Init.s();
            Init.methods();
        },
        s: function (e) {
            (this._window = $(window)),
                (this._document = $(document)),
                (this._body = $("body")),
                (this._html = $("html"));
        },
        methods: function (e) {
            Init.w();
            Init.BackToTop();
            Init.preloader();
            Init.header();
            Init.slick();
            Init.categoryToggle();
            Init.dropdown();
            Init.filterSearch();
            Init.passwordIcon();
            Init.countdownInit(".countdown", "2024/12/01");
            Init.formWizard();
            Init.formValidation();
            Init.contactForm();
        },
        w: function (e) {
            if (isMobile) {
                $("body").addClass("is-mobile");
            }
        },
        BackToTop: function () {
            $(document).ready(function() {
                var btn = $("#back-to-top");
                
                $(window).on("scroll", function () {
                    if ($(window).scrollTop() > 300) {
                        btn.fadeIn();
                    } else {
                        btn.fadeOut();
                    }
                });
                
                btn.on("click", function (e) {
                    e.preventDefault();
                    $("html, body").animate({ scrollTop: 0 }, "300", function() {
                        btn.fadeOut(); // Hide the button after scrolling to the top
                    });
                });
            });
        },
        preloader: function () {
            setTimeout(function () {
                $("#preloader").hide("slow");
            }, 3000);
        },
        header: function () {
            function dynamicCurrentMenuClass(selector) {
                let FileName = window.location.href.split("/").reverse()[0];
                selector.find("li").each(function () {
                    let anchor = $(this).find("a");
                    if ($(anchor).attr("href") == FileName) {
                        $(this).addClass("current");
                    }
                });
                selector.children("li").each(function () {
                    if ($(this).find(".current").length) {
                        $(this).addClass("current");
                    }
                });
                if ("" == FileName) {
                    selector.find("li").eq(0).addClass("current");
                }
            }
            if ($(".main-menu__list").length) {
                let mainNavUL = $(".main-menu__list");
                dynamicCurrentMenuClass(mainNavUL);
            }
            if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
                let navContent = document.querySelector(".main-menu__nav").innerHTML;
                let mobileNavContainer = document.querySelector(
                    ".mobile-nav__container"
                );
                mobileNavContainer.innerHTML = navContent;
            }
            if ($(".sticky-header__content").length) {
                let navContent = document.querySelector(".main-menu").innerHTML;
                let mobileNavContainer = document.querySelector(
                    ".sticky-header__content"
                );
                mobileNavContainer.innerHTML = navContent;
            }
            if ($(".mobile-nav__container .main-menu__list").length) {
                let dropdownAnchor = $(
                    ".mobile-nav__container .main-menu__list .dropdown > a"
                );
                dropdownAnchor.each(function () {
                    let self = $(this);
                    let toggleBtn = document.createElement("BUTTON");
                    toggleBtn.setAttribute("aria-label", "dropdown toggler");
                    toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
                    self.append(function () {
                        return toggleBtn;
                    });
                    self.find("button").on("click", function (e) {
                        e.preventDefault();
                        let self = $(this);
                        self.toggleClass("expanded");
                        self.parent().toggleClass("expanded");
                        self.parent().parent().children("ul").slideToggle();
                    });
                });
            }
            if ($(".mobile-nav__toggler").length) {
                $(".mobile-nav__toggler").on("click", function (e) {
                    e.preventDefault();
                    $(".mobile-nav__wrapper").toggleClass("expanded");
                    $("body").toggleClass("locked");
                });
            }
            $(window).on("scroll", function () {
                if ($(".stricked-menu").length) {
                    var headerScrollPos = 130;
                    var stricky = $(".stricked-menu");
                    if ($(window).scrollTop() > headerScrollPos) {
                        stricky.addClass("stricky-fixed");
                    } else if ($(this).scrollTop() <= headerScrollPos) {
                        stricky.removeClass("stricky-fixed");
                    }
                }
            });
        },
        slick: function () {
            if ($(".brand-slider").length) {
                $(".brand-slider").slick({
                    infinite: !0,
                    slidesToShow: 6,
                    arrows: !1,
                    autoplay: !0,
                    cssEase: "linear",
                    autoplaySpeed: 0,
                    speed: 8000,
                    pauseOnFocus: !1,
                    pauseOnHover: !1,
                    responsive: [
                        {
                            breakpoint: 1599,
                            settings: 
                            { slidesToShow: 5 
                                
                            }
                        },
                        { breakpoint: 1399, settings: { slidesToShow: 4 } },
                        { breakpoint: 769, settings: { slidesToShow: 3 } },
                        { breakpoint: 576, settings: { slidesToShow: 1 } },
                    ],
                });
            }
            if ($(".testimonials-slider").length) {
                $(".testimonials-slider").slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: !0,
                    autoplay: true,
                    dots: !0,
                    draggable: !0,
                    arrows: !1,
                    lazyLoad: "progressive",
                    speed: 800,
                    autoplaySpeed: 2000,
                    responsive: [
                        { breakpoint: 1025, settings: { slidesToShow: 2 } },
                        { breakpoint: 576, settings: { slidesToShow: 1 } },
                    ],
                });
            }
            $(".btn-prev").click(function () {
                var $this = $(this).attr("data-slide");
                $("." + $this).slick("slickPrev");
            });
            $(".btn-next").click(function () {
                var $this = $(this).attr("data-slide");
                $("." + $this).slick("slickNext");
            });
        },
        categoryToggle: function () {
            if ($(".category-block").length) {
                $(".category-block .title").on("click", function (e) {
                    var count = $(this).data("count");
                    if (
                        $(".category-block.box-" + count + " .content-block").is(":visible")
                    ) {
                        $(".category-block.box-" + count + " i").removeClass(
                            "fa-chevron-up"
                        );
                        $(".category-block.box-" + count + " i").addClass("fa-chevron-down");
                        $(".category-block.box-" + count + " .content-block").hide("slow");
                    } else {
                        $(".category-block.box-" + count + " i").removeClass("fa-chevron-down");
                        $(".category-block.box-" + count + " i").addClass(
                            "fa-chevron-up"
                        );
                        $(".category-block.box-" + count + " .content-block").show("slow");
                    }
                });
            }
            if ($(".customer-container").length) {
                $(".signin-button").click(function () {
                    $(".sign-form").slideToggle();
                });
            }

            // HEADER SEARCH START
            if ($(".logo-icon").length) {
                $('#magnifying-btn').on('click', function (event) {
                    event.stopPropagation();
                    $('.input-search').slideDown('fast');
                });

                $(document).on('click', function (event) {
                    if (!$(event.target).closest('.search-block').length) {
                        $('.input-search').slideUp('fast');
                    }
                });

                $('.search-block').on('click', function (event) {
                    event.stopPropagation();
                });
            }
            // HEADER SEARCH START

        },

        dropdown: function () {
            const selectedAll = document.querySelectorAll(".wrapper-dropdown");

            selectedAll.forEach((selected) => {
                const optionsContainer = selected.children[2];
                const optionsList = selected.querySelectorAll("div.wrapper-dropdown li");

                selected.addEventListener("click", () => {
                    let arrow = selected.children[1];

                    if (selected.classList.contains("active")) {
                        handleDropdown(selected, arrow, false);
                    } else {
                        let currentActive = document.querySelector(".wrapper-dropdown.active");

                        if (currentActive) {
                            let anotherArrow = currentActive.children[1];
                            handleDropdown(currentActive, anotherArrow, false);
                        }

                        handleDropdown(selected, arrow, true);
                    }
                });

                // update the display of the dropdown
                for (let o of optionsList) {
                    o.addEventListener("click", () => {
                        selected.querySelector(".selected-display").innerHTML = o.innerHTML;
                    });
                }
            });

            // check if anything else ofther than the dropdown is clicked
            window.addEventListener("click", function (e) {
                if (e.target.closest(".wrapper-dropdown") === null) {
                    closeAllDropdowns();
                }
            });

            // close all the dropdowns
            function closeAllDropdowns() {
                const selectedAll = document.querySelectorAll(".wrapper-dropdown");
                selectedAll.forEach((selected) => {
                    const optionsContainer = selected.children[2];
                    let arrow = selected.children[1];

                    handleDropdown(selected, arrow, false);
                });
            }

            // open all the dropdowns
            function handleDropdown(dropdown, arrow, open) {
                if (open) {
                    arrow.classList.add("rotated");
                    dropdown.classList.add("active");
                } else {
                    arrow.classList.remove("rotated");
                    dropdown.classList.remove("active");
                }
            }

        },
        filterSearch: function () {
            if ($("#searchInput").length) {
                $("#searchInput").on("keyup", function () {
                    var value = $(this).val().toLowerCase();
                    $(".blogs-block").filter(function () {
                        var hasMatch =
                            $(this).find(".blog-title").text().toLowerCase().indexOf(value) >
                            -1;
                        $(this).toggle(hasMatch);
                    });
                });
            }
        },
        passwordIcon: function () {
            $("#eye , #eye-icon").click(function () {
                if ($(this).hasClass("fa-eye-slash")) {
                    $(this).removeClass("fa-eye-slash");
                    $(this).addClass("fa-eye");
                    $(".password-input").attr("type", "text");
                } else {
                    $(this).removeClass("fa-eye");
                    $(this).addClass("fa-eye-slash");
                    $(".password-input").attr("type", "password");
                }
            });
        },
        countdownInit: function (countdownSelector, countdownTime, countdown) {
            var eventCounter = $(countdownSelector);
            if (eventCounter.length) {
                eventCounter.countdown(countdownTime, function (e) {
                    $(this).html(
                        e.strftime(
                            "<li><h2>%D</h2><h6>Days</h6></li>\
              <li><h2>%H</h2><h6>Hrs</h6></li>\
              <li><h2>%M</h2><h6>Mins</h6></li>\
              <li><h2>%S</h2><h6>Secs</h6></li>"
                        )
                    );
                });
            }
        },
        formWizard: function () {
            jQuery(document).ready(function () {
                // click on next button
                jQuery('.form-wizard-next-btn').click(function () {
                    var parentFieldset = jQuery(this).parents('.wizard-fieldset');
                    var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
                    var next = jQuery(this);
                    var nextWizardStep = true;
                    parentFieldset.find('.wizard-required').each(function () {
                        var thisValue = jQuery(this).val();

                        if (thisValue == "") {
                            jQuery(this).siblings(".wizard-form-error").slideDown();
                            nextWizardStep = false;
                        }
                        else {
                            jQuery(this).siblings(".wizard-form-error").slideUp();
                        }
                    });
                    if (nextWizardStep) {
                        next.parents('.wizard-fieldset').removeClass("show", "400");
                        currentActiveStep.removeClass('active').addClass('activated').next().addClass('active', "400");
                        next.parents('.wizard-fieldset').next('.wizard-fieldset').addClass("show", "400");
                        jQuery(document).find('.wizard-fieldset').each(function () {
                            if (jQuery(this).hasClass('show')) {
                                var formAtrr = jQuery(this).attr('data-tab-content');
                                jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function () {
                                    if (jQuery(this).attr('data-attr') == formAtrr) {
                                        jQuery(this).addClass('active');
                                        var innerWidth = jQuery(this).innerWidth();
                                        var position = jQuery(this).position();
                                        jQuery(document).find('.form-wizard-step-move').css({ "left": position.left, "width": innerWidth });
                                    } else {
                                        jQuery(this).removeClass('active');
                                    }
                                });
                            }
                        });
                    }
                });
                //click on previous button
                jQuery('.form-wizard-previous-btn').click(function () {
                    var counter = parseInt(jQuery(".wizard-counter").text());;
                    var prev = jQuery(this);
                    var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
                    prev.parents('.wizard-fieldset').removeClass("show", "400");
                    prev.parents('.wizard-fieldset').prev('.wizard-fieldset').addClass("show", "400");
                    currentActiveStep.removeClass('active').prev().removeClass('activated').addClass('active', "400");
                    jQuery(document).find('.wizard-fieldset').each(function () {
                        if (jQuery(this).hasClass('show')) {
                            var formAtrr = jQuery(this).attr('data-tab-content');
                            jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function () {
                                if (jQuery(this).attr('data-attr') == formAtrr) {
                                    jQuery(this).addClass('active');
                                    var innerWidth = jQuery(this).innerWidth();
                                    var position = jQuery(this).position();
                                    jQuery(document).find('.form-wizard-step-move').css({ "left": position.left, "width": innerWidth });
                                } else {
                                    jQuery(this).removeClass('active');
                                }
                            });
                        }
                    });
                });
                //click on form submit button
                jQuery(document).on("click", ".form-wizard .form-wizard-submit", function () {
                    var parentFieldset = jQuery(this).parents('.wizard-fieldset');
                    var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
                    parentFieldset.find('.wizard-required').each(function () {
                        var thisValue = jQuery(this).val();
                        if (thisValue == "") {
                            jQuery(this).siblings(".wizard-form-error").slideDown();
                        }
                        else {
                            jQuery(this).siblings(".wizard-form-error").slideUp();
                        }
                    });
                });
                // focus on input field check empty or not
                jQuery(".form-control").on('focus', function () {
                    var tmpThis = jQuery(this).val();
                    if (tmpThis == '') {
                        jQuery(this).parent().addClass("focus-input");
                    }
                    else if (tmpThis != '') {
                        jQuery(this).parent().addClass("focus-input");
                    }
                }).on('blur', function () {
                    var tmpThis = jQuery(this).val();
                    if (tmpThis == '') {
                        jQuery(this).parent().removeClass("focus-input");
                        jQuery(this).siblings('.wizard-form-error').slideDown("3000");
                    }
                    else if (tmpThis != '') {
                        jQuery(this).parent().addClass("focus-input");
                        jQuery(this).siblings('.wizard-form-error').slideUp("3000");
                    }
                });
            });

        },
        formValidation: function () {
            if ($(".contact-form").length) {
                $(".contact-form").validate();
            }
            if ($(".login-form").length) {
                $(".login-form").validate();
            }
        },
        contactForm: function () {
            $(".contact-form").on("submit", function (e) {
                e.preventDefault();
                if ($(".contact-form").valid()) {
                    var _self = $(this);
                    _self
                        .closest("div")
                        .find('button[type="submit"]')
                        .attr("disabled", "disabled");
                    var data = $(this).serialize();
                    $.ajax({
                        url: "./assets/mail/contact.php",
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function (data) {
                            $(".contact-form").trigger("reset");
                            _self.find('button[type="submit"]').removeAttr("disabled");
                            if (data.success) {
                                document.getElementById("message").innerHTML =
                                    "<h4 class='color-primary mt-16 mb-16'>Email Sent Successfully</h4>";
                            } else {
                                document.getElementById("message").innerHTML =
                                    "<h4 class='color-primary mt-16 mb-16'>There is an error</h4>";
                            }
                            $("#messages").show("slow");
                            $("#messages").slideDown("slow");
                            setTimeout(function () {
                                $("#messages").slideUp("hide");
                                $("#messages").hide("slow");
                            }, 4000);
                        },
                    });
                } else {
                    return !1;
                }
            });
        },
    };
    Init.i();
})(window, document, jQuery);
