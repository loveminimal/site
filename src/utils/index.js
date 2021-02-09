/**
 * 区分设备类型
 * @returns {String} `MB` 移动设备
 * @returns {String} `PC` 电脑
 */
function browserRedirect() {
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

/**
 * 判断是否为当前页面
 * @param {String|Array} args 页面或页面组
 * @returns {Boolean} `true` `false`
 */
function isCurPageFn(args) {
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
/**
 * 判断是否为主页
 * @returns {Boolean} `true` `false`
 */
function isHomeFn() {
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
    } else {
        return false;
    }
}

/**
 * 加密指定页面或页面组
 * @param {String|Array} args 页面或页面组
 */
function toEncryptedPages(args) {
    if (isCurPageFn(args)) {
        if (sessionStorage.getItem('pw')) {
            console.log('Welcome, Sir.');
        } else {
            let passwd = prompt('Sorry, you have no permissions！');
            if (passwd === 'just go out') {
                console.log('Welcome, Sir.');
                sessionStorage.setItem('pw', true);
            } else {
                window.location.pathname = '/';
            }
        }
    }
}

module.exports = { browserRedirect, isCurPageFn, isHomeFn, toEncryptedPages };
