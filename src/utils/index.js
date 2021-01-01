module.export = {
    // Diff device type
    browserRedirect() {
        let sUserAgent = navigator.userAgent.toLowerCase();
        let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        let bIsMidp = sUserAgent.match(/midp/i) == "midp";
        let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        let bIsAndroid = sUserAgent.match(/android/i) == "android";
        let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

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
            return "MB";
        } else {
            return "PC";
        }
    },
    // Encapsulation darkreader and bind it to title.
    // DarkReader - https://github.com/darkreader/darkreader
    toggleColor() {
        if (isDark === "false") {
            DarkReader.enable({
                brightness: 100,
                contrast: 90,
                sepia: 10,
            });

            isDark = "true";
            localStorage.setItem("isDark", isDark);
        } else {
            DarkReader.disable();

            isDark = "false";
            localStorage.setItem("isDark", isDark);

            location.reload();
        }
    },

    // If `args` is current page
    // `args` - String or Array
    isCurPage(args) {
        if (typeof args === "string") {
            if (
                [
                    "/public/" + args + ".html",
                    "/public/" + args,
                    "/" + args + ".html",
                    "/" + args,
                ].includes(location.pathname)
            )
                return true;
        } else if (args instanceof Array) {
            let _res = 0;
            args.map((item) => {
                if (
                    [
                        "/public/" + item + ".html",
                        "/public" + item,
                        "/" + item + ".html",
                        "/" + item,
                    ].includes(location.pathname)
                )
                    _res += 1;
            });

            if (_res > 0) return true;
        }
    },
};
