import DefaultTheme from 'vitepress/theme';
import './style/custom.css';
export default {
    extends: DefaultTheme,
    enhanceApp({ app, router, siteData }) {}
};
