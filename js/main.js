'use strict'

// Init global variables
// ------------------------------------------------------------------
let isHome = false,
    isPC = false,
    isMB = false,
    isZoom = false,
    isCard = false,
    cent = '',
    topBtn = '';

// ------------------------------------------------------------------
// Pages array of card style
// ---------------------------------
const CARDPAGES = [
    'idea', 'diary', 'joker', 'gtd', 'story',
    'wiki',
    'web-developer-roadmap',
];

// Activate/Deactivate global card style
// isCard = true; CARDPAGES = [];

// Custom some special pages
// ---------------------------------
if([
        '/public/index.html',
        '/public/index',
        '/public/',
        '/index.html',
        '/index',
        '/'
    ].includes(location.pathname)) {
    isHome = true
}

if(isCurPage('joker')) {
    if(sessionStorage.getItem('pw')) {
        console.log('Welcome, Sir.')

    } else {
        let passwd = prompt('Sorry, you have no permissions！')
        if(passwd === 'just go out') {
            console.log('Welcome, Sir.')
            sessionStorage.setItem('pw', true)

        } else {
            window.location.pathname = '/'
        }
    }
}

// Diff PC and Mobile
// ---------------------------------
if(browserRedirect() == 'PC') {
    isPC = true;

} else {
    isMB = true;
}

// Customizations after DOM rendering
// ------------------------------------------------------------------
$(document).ready(() => {
    // Set local variables
    // ---------------------------------
    const TOC = $('#table-of-contents'),
        BODY = $('body'),
        TITLE = $('.title'),
        CONTENT = $('#content');

    BODY.addClass('animated fadeIn slow');          // Add animate effects.
    TITLE.click(toggleColor);                       // Toggle color of site.

    createNavButton();                              // Create nav button.
    topBtn = createTopButton();                     // Create top button.
    $(window).scroll(scrollToTop);                  // Calculate the scroll top distance.

    // Listen touch event in Moblie
    BODY.on('touchstart', touchStart);
    BODY.on('touchend', touchEnd);

    if(TOC) TOC.click(hideDir);                     // Hide directory when click it of Mobile.
    if(isPC && TOC) {                               // Auto adjust TOC width to avoid it hover the main contents.
        let t_w = '' + -parseInt(TOC.width() / $(document).width() * 100) + '%';
        TOC.css('left', t_w)
        TOC.mouseenter(() => TOC.css('left', 0) );
        TOC.mouseleave(() => TOC.css('left', t_w) );
    }

    // Customize home page style
    // ---------------------------------
    if(isHome) {                                    // Hide nav and top button in index page.
        CONTENT.addClass('js-home-content')

        if(TOC)   TOC.css('display', 'none');       // Hide table of contents.
        $('.top-btn').css('display', 'none');       // Hide top button.
        $('.nav-btn').css('display', 'none');       // Hide nav button.

        // Customize posts list showwing
        $('thead').each(function() {
            if(isPC) {
                $(this).parent().hover(function() {
                    $(this).find('tbody').fadeToggle();
                })

            } else {
                $(this).parent().click(function() {
                    $(this).find('tbody').fadeToggle();
                })
            }

            // Show post counts of current category
            let _len = $(this).parent().find('td').length
            let _text = $(this).find('th').text()
            $(this).find('th').html(`${_text} <span style="font-size: 12px; color: #ace; float: right;">(${_len})</span>`)
        })

        // Show/Hide wechat QRcode
        $('#wechat').hide()
        $('.wechat').hover(function() {
            $('#wechat').fadeToggle()
        })

        // Open link in a new tab
        // $('a').each(function() {
        //     $(this).attr('target', '_blank')
        // })
    }

    // Customize annotations
    $('note').each(function() {
        $(this).addClass('js-note')
    })

    $('essay').each(function() {
        $(this).addClass('js-essay')
    })

    // Customize contacts way
    $('.me .contact #weibo').attr('href', '//weibo.com/u/' + USERCONFIG.weibo)
    $('.me #wechat img').attr('src', '/images/' + USERCONFIG.wechat)
    $('.me .contact #email').attr('href', 'mailto:' + USERCONFIG.email)
    $('.me .contact #github').attr('href', (USERCONFIG.gitee || '//github.com/') + USERCONFIG.github)
    $('.me .contact #bilibili').attr('href', '//space.bilibili.com/' + USERCONFIG.bilibili)

    // Customize page footer
    $('.validation').html('<a href="http://beian.miit.gov.cn" target="_blank">' + USERCONFIG.icp + '</a>');   // Update copyright.
    $('.timestamp-wrapper').parent().addClass('gtd-timestamp')
    $('#postamble .date')[1].innerText = 'Updated: ' + $('#postamble .date')[1].innerText.substring(8)
    $('#postamble .author')[0].innerText = 'Author: ' + USERCONFIG.author

    // $('#postamble .date')[0].innerText = 'Created: ' + $('#postamble .date')[0].innerText.substring(5)

    // Listen mousewheel event
    // ---------------------------------
    // Firefox
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    // IE
    window.addEventListener('mousewheel', scrollFunc);
    document.addEventListener('mousewheel', scrollFunc);

    // Add mouse-click animation
    // ---------------------------------
    if(isPC) {
        $(document).click(e => {
            let size = 120                                      // size of water block
            BODY.append("<div class='water-animate'>")          // create a water block

            $('.water-animate')
                .css({                                          // init style
                    position: 'fixed',                          // set position as 'fixed'
                    left: e.clientX,
                    top: e.clientY,
                    borderRadius: size + 'px',
                    border: '2px solid #19f',
                    'z-index': -1
                })
                .stop()                                         // to stop non-end previous animate
                .animate({
                        width: size,
                        height: size,
                        left: e.clientX - size / 2,
                        top: e.clientY - size / 2,
                        opacity: '0'
                    },
                    'slow',
                    () => $('body .water-animate').remove()
                )
        })
    }

    if(isMB) {
        $('#postamble').css('display', 'none')
        $('body').append('<a class="js-footer-slogan" href="http://beian.miit.gov.cn/" target="_blank">' + USERCONFIG.icp +'</a>')
        // $('body').append('<div class="js-footer-slogan">Talk is cheap, show me the code.</div>')
        $('.me #wechat img').width('40%')
    }

    // Show type of code block
    // ---------------------------------
    $('.src').each(function() {
        let str = $(this)[0].className.split(' src-')[1];
        $('<span class="js-code-src">' + str + '</span>').prependTo($(this))
    })

    // Hide line number when copy
    $('pre').each(function() {
        $(this).dblclick(function() {
            let _this = $(this)
            _this.addClass('js-pre-dblclick')

            setTimeout(function() {
                _this.removeClass('js-pre-dblclick')
            }, 5000)
        })
    })

    // Image zoom
    // ---------------------------------
    $('img').each(function(idx, ele) {
        $(this).click(function() {

            if(!isZoom) {
                $('html').append(
                    `
                    <div class='img-wrapper animated pulse faster'>
                        <img class='img-zoom' src=${ele.src} />
                    </div>
                    `
                )

                $('.img-wrapper').click(function() {
                    $('.img-wrapper').remove()
                    isZoom = false
                })

                isZoom = true
            }
        })
    })

    // Beautify item like `Idea`
    // ---------------------------------
    if(isCurPage(CARDPAGES)) {
        $('.outline-2').each(function() {
            $(this).addClass('js-outline-2')
        })

        $('.outline-3').each(function() {
            $(this).addClass('js-outline-3')
        })

    } else {
        if(isCard) {
            $('.outline-2').each(function() {
                $(this).addClass('js-outline-2')
            })

            $('.outline-3').each(function() {
                $(this).addClass('js-outline-3')
            })
        }
    }

    // Beautify navigations
    // ---------------------------------
    if(isCurPage('nav')) {
        BODY.addClass('js-nav-body')

        $('<div class="js-nav-link-container"></div>').insertAfter(TITLE)

        $('td a').each(function(idx, item) {
            $(this).attr('target', '_blank')
            $('.js-nav-link-container').append(item)
        })

        $('.org-ul a').each(function() {
            $(this).attr('target', '_blank')
        })

        let NL = $('.js-nav-link-container a')
        let _len = NL.length,
            _remainder = 0;

        _remainder = _len % 5

        if (_remainder == 0) _remainder = 5;

        for (let i = 0; i < 5 - _remainder; i++) {
            $('.js-nav-link-container').append('<a></a>')
        }

        // Bookmark tips
        $('#content p').addClass('js-nav-bookmarks')
        let _bmLen = $('li').length - 1,
            _tip = '';

        _tip = _bmLen > 20 ? '（🔥太多了，赶快处理吧，亲！）' : '（😤状态还不错！）'
        $('#content p').append(`<span style="float: right;"><progress value="${_bmLen}" max="100"></progress> ${_tip}${_bmLen} 条</span>`)

        $('.org-ul').addClass('js-nav-bookmarks-container')
    }

    // Custom content and postamble margin but home&nav of PC
//     if (isPC && (!isCurPage('nav') && !isHome)) {
//         $('#content').css('margin-left', '10%')
//         $('#postamble').css('margin-left', '10%')
//     }
})

// Resolve current theme color
// ------------------------------------------------------------------
let isDark = 'false';

if (localStorage.getItem('isDark') == 'true') {
    toggleColor();
}

// Utils
// ------------------------------------------------------------------
// Encapsulation darkreader and bind it to title.
// DarkReader - https://github.com/darkreader/darkreader
// ---------------------------------
function toggleColor() {
    if (isDark === 'false') {
        DarkReader.enable({
            brightness: 100,
            contrast: 90,
            sepia: 10
        });

        isDark = 'true';
        localStorage.setItem('isDark', isDark);

    } else {
        DarkReader.disable();

        isDark = 'false';
        localStorage.setItem('isDark', isDark);

        location.reload();
    }
}

// Diff device type
// ---------------------------------
function browserRedirect() {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return 'MB';

    } else {
        return 'PC';
    }
}

// Hide directory when click it
// ---------------------------------
function hideDir() {
    if(isMB) {
        let ele = document.getElementById('table-of-contents');
        let _opacity = getComputedStyle(ele).opacity

        if(_opacity == 1) {
            ele.style.top = '-380px'
            ele.style.opacity = 0;

        } else {
            ele.style.top = '0px'
            ele.style.opacity = 1;
        }
    }
}

// Create a button of scrolling to top
// ---------------------------------
function scrollToTop() {
    let totalH = $(document).height();                      // page height
    let clientH = $(window).height();                       // view height
    let scrollH = $(document).scrollTop();                  // scroll height

    let _cent = parseInt((scrollH / (totalH - clientH)) * 100);
    _cent = ('' + _cent).length < 2 ? '0' + _cent : _cent;
    cent = _cent + '% ↑';
    topBtn.innerHTML = cent;
}

function createTopButton() {
    let _btn = document.createElement('div');
    _btn.innerHTML = 'TOP ↑';
    _btn.setAttribute('class', 'top-btn');
    _btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });    // instant, smooth, auto
    });
    document.body.appendChild(_btn);
    return _btn;
}

// Create nav link, e.g. back Home.
// ---------------------------------
function createNavButton() {
    $('<div></div>')
        .text('IDX ←')
        .addClass('nav-btn')
        .appendTo('body')
        .click(() => {
            location.href = './index.html';
            // history.go(-1);
        });
}

// Scroll listener
// ---------------------------------
function scrollFunc (e) {
    e = e || window.event;
    if (e.wheelDelta) {         // For IE&Chrome
        if (e.wheelDelta > 0) { // ↑
            _showNav();
            setTimeout(() => { _hideNav(); }, 1000);
        }

        if (e.wheelDelta < 0) { // ↓
            _showNav();
            setTimeout(() => { _hideNav(); }, 1000);
        }

    } else if (e.detail) {      // For Firefox
        if (e.detail > 0) {     // ↑
            _showNav();
            setTimeout(() => { _hideNav(); }, 1000);
        }

        if (e.detail < 0) {     // ↓
            _showNav();
            setTimeout(() => { _hideNav(); }, 1000);
        }
    }
}

// Mobile scroll
let startY = 0;                         // init touch-point coordinates

function touchStart(e) {
    let touch = e.touches[0];           // get the first touch point
    let y = touch.pageY;

    startY = y;                         // set init y point
}

function touchEnd(e) {
    let touch = e.changedTouches[0];    // get the first touch point
    let y = touch.pageY;

    // Judge which direction to move
    if (y - startY < 0) {               // ↑
        _showNav();
        setTimeout(() => { _hideNav() }, 1000);

    } else {                            // ↓
        _showNav();
        setTimeout(() => { _hideNav() }, 1000);
    }
}

// Show/Hide nav buttons
function _showNav() {
    if (isMB) {
        $('.top-btn').css('opacity', '0.9');
        $('.nav-btn').css('opacity', '0.9');

    } else {
        $('.top-btn').addClass('nav-show-hide');
        $('.nav-btn').addClass('nav-show-hide');
    }
}

// Reduce opaciry
function _hideNav() {
    if (isMB) {
        $('.top-btn').css('opacity', '0.1');
        $('.nav-btn').css('opacity', '0.1');

    } else {
        $('.top-btn').removeClass('nav-show-hide');
        $('.nav-btn').removeClass('nav-show-hide');

    }
}

// DIR -- Highlight current headline
// ---------------------------------
// Re-construct <a> of '#table-of-contents'
$(document).ready(function() {
    let _links = $('#text-table-of-contents a')

    _links.each(function() {
        let _class = $(this).attr('href').split('#')[1]
        $(this).addClass('links ' + _class)
    })

    $.each([2, 3, 4, 5, 6], function(index, val) {
        if($('.outline-' + val)) {
            let _outlines = $('.outline-' + val)

            _outlines.each(function() {
                $(this).addClass('outline')
            })
        }
    })
})

// Scroll
$(window).scroll(function () {
    var $sections = $('.outline');              // get all content blocks
    var currentScroll = $(this).scrollTop();    // height of window scroll
    var $currentSection;                        // current content block

    var _arrTop = [];                           // just for getting the distance from the first headline to top

    $sections.each(function () {
        var divPosition = $(this).offset().top;

        _arrTop.push(divPosition)

        if (divPosition - 1 < currentScroll) {
            $currentSection = $(this);
        }

        // Avoid there no block at current height
        if(currentScroll >= _arrTop[0]) {
            let _id = $currentSection.attr('id')

            let _idArr = _id.split('-');
            _id = _idArr[_idArr.length - 1]

            $('.links').removeClass('js-link-active')
            $('.' + _id).addClass('js-link-active')
        }
    })
});

// If `args` is current page
// `args` - String or Array
// ---------------------------------
function isCurPage(args) {
    if(typeof args === 'string') {
        if([
            '/public/' + args + '.html',
            '/public/' + args,
            '/' + args + '.html',
            '/' + args
        ].includes(location.pathname)) return true;

    } else if( args instanceof Array) {
        let _res = 0
        args.map(item => {
            if([
                '/public/' + item + '.html',
                '/public' + item,
                '/' + item + '.html',
                '/' + item
            ].includes(location.pathname)) _res += 1
        })

        if(_res > 0) return true
    }
}
