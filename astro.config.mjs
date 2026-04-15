// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.relaycraft.dev',
	output: 'static',
	adapter: vercel({
		webAnalytics: {
			enabled: false,
		},
	}),
	integrations: [
		react(),
		sitemap(),
		starlight({
			title: 'RelayCraft',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				zh: {
					label: '简体中文',
					lang: 'zh',
				},
			},
			components: {
				Footer: './src/components/Footer.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				LanguageSelect: './src/components/LanguageSelect.astro',
				Head: './src/components/Head.astro',
			},
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: false,
			},
			customCss: [
				'./src/styles/custom.css',
			],
			social: [
				{
					label: 'Main Site',
					href: 'https://relaycraft.dev',
					icon: 'rocket',
				},
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/relaycraft/relaycraft'
				}
			],
			sidebar: [
				{
					label: 'Start Here',
					translations: { zh: '快速开始' },
					autogenerate: { directory: 'start-here' },
				},
				{
					label: 'Core Features',
					translations: { zh: '核心功能' },
					autogenerate: { directory: 'core-features' },
				},
				{
					label: 'Guides',
					translations: { zh: '指南' },
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Advanced Usage',
					translations: { zh: '高级用法' },
					autogenerate: { directory: 'advanced-usage' },
				},
				{
					label: 'Reference',
					translations: { zh: '参考' },
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
