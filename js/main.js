$(document).ready(function(){


    /* Slow Scroll */
    SmoothScroll({
        // Р’СЂРµРјСЏ СЃРєСЂРѕР»Р»Р° 400 = 0.4 СЃРµРєСѓРЅРґС‹
        animationTime    : 700,
        // Р Р°Р·РјРµСЂ С€Р°РіР° РІ РїРёРєСЃРµР»СЏС… 
        stepSize         : 75,

        // Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё:
        
        // РЈСЃРєРѕСЂРµРЅРёРµ 
        accelerationDelta : 20,  
        // РњР°РєСЃРёРјР°Р»СЊРЅРѕРµ СѓСЃРєРѕСЂРµРЅРёРµ
        accelerationMax   : 2,   

        // РџРѕРґРґРµСЂР¶РєР° РєР»Р°РІРёР°С‚СѓСЂС‹
        keyboardSupport   : true,  
        // РЁР°Рі СЃРєСЂРѕР»Р»Р° СЃС‚СЂРµР»РєР°РјРё РЅР° РєР»Р°РІРёР°С‚СѓСЂРµ РІ РїРёРєСЃРµР»СЏС…
        arrowScroll       : 70,

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm   : true,
        pulseScale       : 4,
        pulseNormalize   : 1,

        // РџРѕРґРґРµСЂР¶РєР° С‚Р°С‡РїР°РґР°
        touchpadSupport   : true,
    })


    /* Offer Parallax */
    var scene = document.getElementById('parallax_scene');
    var parallax = new Parallax(scene);


    /* Menu Active Section */
    $(function() {
      /* Р’С‹РґРµР»РµРЅРёРµ Р°РєС‚РёРІРЅС‹С… РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ */
      var last_id;
      var $top_menu = $('.side_bar__menu');
      var menu_height = $top_menu.outerHeight(true);
      var $menu_items = $top_menu.find('a');
      var $scroll_items = $menu_items.map(function() {
        var item = $($(this).attr('href'));
        if (item.length) {
          return item;
        }
      });

      $(window).scroll(function() {
        var from_top = $(this).scrollTop() + menu_height;
        var mar = parseInt($top_menu.css('margin-bottom'));
        var cur = $scroll_items.map(function() {
          if ($(this).offset().top < from_top + mar) {
            return this;
          }
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : '';
        if (last_id !== id) {
          last_id = id;
          $menu_items.parent()
            .removeClass('side_bar__menu_active_link')
            .end()
            .filter("[href='#" + id + "']")
            .parent()
            .addClass('side_bar__menu_active_link');
        }
      });
    });


    /* Hamburger Menu */
    $(function() {
        $('.check').click(function(){
           $('.side_bar').toggleClass("active");
        });
        $("#menu").on("click","a", function(){
            if($(window).width() <= 1310) {
                $('.side_bar').toggleClass("active");
                $('[name^="menu"]').prop({'checked': false});
            }
        });
    });


    /* Smooth Scroll on click */
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1200);
    });

    $("#offer").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1200);
    });


    /* Copy Server Ip */
    $(function() {
      function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
      }
     
      $(".header__server").on("click", function() {
        copyToClipboard("#server_ip");
        $(".header__server_ip_copy_alert").animate({opacity: 1},'slow');
        $(".header__server_ip_copy_alert").animate({opacity: 0},'slow');
      });
    });


    /* Side Bar Menu Logo */
    var target = $('.about__content_title');
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;
    $(window).scroll(function(){
      var winScrollTop = $(this).scrollTop();
      if(winScrollTop > scrollToElem){
        $(".side_bar__logo").css("transform", "translateX(0%)");
        $(".side_bar__logo").css("opacity", "1");
      }
      else {
       $(".side_bar__logo").css("transform", "translateX(-160%)");
       $(".side_bar__logo").css("opacity", "0");
      }
    });


    /* Server Online */
    var xhr = new XMLHttpRequest();
    var url = "https://api.minetools.eu/ping/mc.vanilca.su";
                  
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var jsonData = JSON.parse(xhr.responseText); 
            showOnline(jsonData);
        }
    };

    xhr.open("GET", url, true);
    xhr.send();

    function showOnline(data) {
        var output = "РћРЅР»Р°Р№РЅ: " + data.players.online + "/" + data.players.max; 
                  
        document.getElementById("server_online").innerHTML = output;
    }


    /* Bottom Alert */
    $(function () {
      $('.bottom_alert_button').click(function() {
        document.getElementById("bottom_alert").style.display = 'none';
      })
    })
    $(window).scroll(function() {
    if ($(this).scrollTop()>900) {
      document.getElementById("bottom_alert").style.bottom = '2%';
    }
    });


    /* FAQ Spoiler */
    $(document).ready(function(){
            $(".faq__content_question_spoiler .block").show();
            $(".close .block").hide();
            $(".faq__content_question_spoiler h2").click(function(){  
                $(this).toggleClass("icon").next().slideToggle(400);
        });         
    });


    /* Animations */
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);


    /* Modal Window */
    var modal = document.getElementById('modal_window');
    var survival = document.getElementById('survival_modal_button');
    var economy = document.getElementById('economy_modal_button');
    var dungeons = document.getElementById('dungeons_modal_button');
    var battlepass = document.getElementById('events_modal_button');
    var agreement = document.getElementById('agreement_modal_button')
    var close = document.getElementsByClassName("close_modal")[0];
    const prevent = ev => ev.preventDefault();

    survival.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("Р’С‹Р¶РёРІР°РЅРёРµ");
        $(".funs__content_overlay_info_box p").html("РќР° РЅР°С€РµРј СЃРµСЂРІРµСЂРµ РІС‹ РјРѕР¶РµС‚Рµ РѕС‚Р»РёС‡РЅРѕ РїСЂРѕРІРµСЃС‚Рё РІСЂРµРјСЏ РЅР° СѓРІР»РµРєР°С‚РµР»СЊРЅРѕРј РІС‹Р¶РёРІР°РЅРёРё.<br><br> РћРїС‚РёРјРёР·РёСЂРѕРІР°РЅРЅС‹Р№ РёРіСЂРѕРІРѕР№ РїСЂРѕС†РµСЃСЃ, РёРЅС‚РµСЂРµСЃРЅС‹Рµ РёРіСЂРѕРІС‹Рµ РјРµС…Р°РЅРёРєРё, РЅРёРєР°РєРёС… РєСЂРµР°С‚РёРІРѕРє, РѕРїРѕРє Рё РїСЂРѕС‡РµРіРѕ РѕС‚СЂРµР±СЊСЏ, РєРѕС‚РѕСЂРѕРµ РёСЃРєР°Р¶Р°РµС‚ РёР·РЅР°С‡Р°Р»СЊРЅС‹Р№ СЃРјС‹СЃР» РІС‹Р¶РёРІР°РЅРёСЏ");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    economy.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("РРєРѕРЅРѕРјРёРєР°");
        $(".funs__content_overlay_info_box p").html("РЎР»Р°Р¶РµРЅРЅР°СЏ СЃРёСЃС‚РµРјР° СЌРєРѕРЅРѕРјРёРєРё. Р’С‹РїРѕР»РЅСЏР№С‚Рµ РєРІРµСЃС‚С‹, С‚РѕСЂРіСѓР№С‚РµСЃСЊ СЃ РёРіСЂРѕРєР°РјРё РІ РјР°РіР°Р·РёРЅРµ Рё РЅР° Р°СѓРєС†РёРѕРЅРµ, Р·Р°СЂР°Р±Р°С‚С‹РІР°Р№С‚Рµ РёРіСЂРѕРІСѓСЋ РІР°Р»СЋС‚Сѓ Рё РєРѕРёРЅС‹.<br><br>Р—Р°СЂР°Р±РѕС‚Р°РЅРЅРѕРµ РјРѕР¶РЅРѕ РїРѕС‚СЂР°С‚РёС‚СЊ РЅР° РїСЂРёРѕР±СЂРµС‚РµРЅРёРµ СЂРµСЃСѓСЂСЃРѕРІ, СѓРЅРёРєР°Р»СЊРЅС‹С… РІРµС‰РµР№ Рё РїСЂРёСЏС‚РЅС‹С… РІРѕР·РјРѕР¶РЅРѕСЃС‚РµР№");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    dungeons.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("Р”Р°РЅР¶Рё");
        $(".funs__content_overlay_info_box p").html("РџРѕСЃРµС‰Р°Р№С‚Рµ РѕРїР°СЃРЅС‹Рµ РґР°РЅР¶Рё, РёР·СѓС‡Р°Р№С‚Рµ РјРµСЃС‚РЅРѕСЃС‚СЊ, РЅР°С…РѕРґРёС‚Рµ Р±РѕС‡РєРё СЃ С†РµРЅРЅС‹Рј Р»СѓС‚РѕРј. Р‘СѓРґСЊС‚Рµ РѕСЃС‚РѕСЂРѕР¶РЅС‹! Р—РґРµСЃСЊ СЃРїР°РІРЅСЏС‚СЃСЏ РјРѕР±С‹, Р° С‚Р°РєР¶Рµ СЂР°Р·СЂРµС€РµРЅРѕ PvP<br><br>Р”РѕСЃС‚СѓРї Рє РґР°РЅР¶Р°Рј РѕС‚РєСЂС‹РІР°РµС‚СЃСЏ РµР¶РµРґРЅРµРІРЅРѕ РІ 20:00 РїРѕ РњРЎРљ. РЎР»РµРґРёС‚Рµ Р·Р° РѕР±СЉСЏРІР»РµРЅРёСЏРјРё РЅР° СЃРµСЂРІРµСЂРµ");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    battlepass.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("Р‘Р°С‚Р» РџР°СЃСЃ");
        $(".funs__content_overlay_info_box p").html("Р’С‹РїРѕР»РЅСЏР№С‚Рµ РµР¶РµРЅРµРґРµР»СЊРЅС‹Рµ Рё РµР¶РµРґРЅРµРІРЅС‹Рµ РєРІРµСЃС‚С‹ В«BattlePassВ» Рё РїСЂРѕРґРІРёРіР°Р№С‚РµСЃСЊ РїРѕ СЃС‚СѓРїРµРЅСЏРј СЃ РїРѕР»РµР·РЅС‹РјРё РЅР°РіСЂР°РґР°РјРё!<br><br>РЎРµР·РѕРЅС‹ СЃ РєРІРµСЃС‚Р°РјРё Р·Р°РїСѓСЃРєР°СЋС‚СЃСЏ СЂРµРіСѓР»СЏСЂРЅРѕ. РЎР»РµРґРёС‚Рµ Р·Р° СЃРѕРѕР±С‰РµСЃС‚РІРѕРј СЃРµСЂРІРµСЂР°!");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    agreement.onclick = function() {
        $(".funs__content_overlay_info_box h2").html("РЎРѕРіР»Р°С€РµРЅРёРµ");
        $(".funs__content_overlay_info_box p").html("РџРѕРєСѓРїРєР° РґРѕРЅР°С‚Р° СЏРІР»СЏРµС‚СЃСЏ РёСЃРєР»СЋС‡РёС‚РµР»СЊРЅРѕ РІР°С€РµР№ РёРЅРёС†РёР°С‚РёРІРѕР№. Р’РѕР·РІСЂР°С‚ РїРѕС‚СЂР°С‡РµРЅРЅС‹С… СЃСЂРµРґСЃС‚РІ РЅРµ РїСЂРµРґРѕСЃС‚Р°РІР»СЏРµС‚СЃСЏ РЅРё РїСЂРё РєР°РєРёС… СѓСЃР»РѕРІРёСЏС…. РџРѕРєСѓРїР°СЏ РґРѕРЅР°С‚ РІС‹ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РїРѕРґРїРёСЃС‹РІР°РµС‚РµСЃСЊ РїРѕРґ РґР°РЅРЅС‹Рј СЃРѕРіР»Р°С€РµРЅРёРµРј.<br><br>РџСЂРё РіСЂСѓР±РѕРј РЅР°СЂСѓС€РµРЅРёРё РїСЂР°РІРёР» (РјРЅРѕРіРѕС‡РёСЃР»РµРЅРЅС‹Рµ РѕСЃРєРѕСЂР±Р»РµРЅРёСЏ, С‡РёС‚С‹, РіСЂРёС„РµСЂСЃС‚РІРѕ Рё С‚.Рї.) РґРѕРЅР°С‚РµСЂ РјРѕР¶РµС‚ Р»РёС€РёС‚СЊСЃСЏ СЃРІРѕРµР№ РїСЂРёРІРёР»РµРіРёРё Р±РµР· РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё РІРѕРІР·СЂР°С‚Р° РїРѕС‚СЂР°С‡РµРЅРЅС‹С… СЃСЂРµРґСЃС‚РІ.");
        $('.funs__content_overlay').fadeIn();
        $(".funs__content_overlay_info").addClass("modal-show-animation");
    }

    close.onclick = function() {
        $('.funs__content_overlay').fadeOut('fast');
        $(".funs__content_overlay_info").removeClass("modal-show-animation");
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            $('.funs__content_overlay').fadeOut('fast');
            $(".funs__content_overlay_info").removeClass("modal-show-animation");
        }
    }


});