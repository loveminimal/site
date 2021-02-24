// Config your info here
export default {
    // 博主
    author: 'Jack Liu',
    // 如 https://weibo.com/u/6867589681
    weibo: '6867589681',
    // 微信二维码，默认位于 `images/` 中
    wechat: 'bg/wechat.jpg',
    email: 'loveminimal@outlook.com',
    // 如 https://github.com/loveminimal
    github: 'loveminimal',
    // 如 https://space.bilibili.com/11608450
    bilibili: '11608450',
    icp: '豫ICP备19025929号',
    // 指定卡片风格页面
    // 当 `activeAll` 为 `true` 时，所有页面激活卡片风格
    card: {
        activeAll: false,
        pages: [
            'idea',
            'diary',
            'joker',
            'gtd',
            'story',
            'wiki',
            'web-developer-roadmap',
        ],
    },
    // 加密的页面
    encrypt: {
        password: '123456',
        pages: ['joker'],
    },
};
