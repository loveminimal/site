// If `args` is current page
// `args` - String or Array
// ---------------------------------
export function isCurPage(args) {
    if (typeof args === 'string') {
        if (
            [
                '/public/' + args + '.html',
                '/public/' + args,
                '/' + args + '.html',
                '/' + args,
            ].includes(location.pathname)
        )
            return true;
    } else if (args instanceof Array) {
        let _res = 0;
        args.map((item) => {
            if (
                [
                    '/public/' + item + '.html',
                    '/public' + item,
                    '/' + item + '.html',
                    '/' + item,
                ].includes(location.pathname)
            )
                _res += 1;
        });

        if (_res > 0) return true;
    }
}

// Diff device type
// ---------------------------------
export function browserRedirect() {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
    let bIsMidp = sUserAgent.match(/midp/i) == 'midp';
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
    let bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
    let bIsAndroid = sUserAgent.match(/android/i) == 'android';
    let bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
    let bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';

    if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
    ) {
        return 'MB';
    } else {
        return 'PC';
    }
}

export function isHome() {
    if (
        [
            '/public/index.html',
            '/public/index',
            '/public/',
            '/index.html',
            '/index',
            '/',
        ].includes(location.pathname)
    ) {
        return true;
    }
}

/**
 * Beautify item like `Idea`,
 * and you can Activate/Deactivate global card style.
 * @param { Array } CARDPAGES Card pages
 * @param { Boolean } isAllCardStyle Active global site card style
 */
export function initCardStyle(CARDPAGES, isAllCardStyle = false) {
    if (isAllCardStyle) {
        $('.outline-2').each(function () {
            $(this).addClass('js-outline-2');
        });

        $('.outline-3').each(function () {
            $(this).addClass('js-outline-3');
        });

        return;
    }

    if (isCurPage(CARDPAGES)) {
        $('.outline-2').each(function () {
            $(this).addClass('js-outline-2');
        });

        $('.outline-3').each(function () {
            $(this).addClass('js-outline-3');
        });
    }
}
