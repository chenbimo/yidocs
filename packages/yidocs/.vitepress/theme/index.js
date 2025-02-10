import DefaultTheme from 'vitepress/theme';
import homeMore from './components/homeMore.vue';
import './style/custom.css';
export default {
    extends: DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.component('homeMore', homeMore);
    }
};
