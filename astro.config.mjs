// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { SUPPORT_LINK, toStarlightSidebar } from './src/data/navigation.mjs';

// Tên miền chính của trang (gắn ở Worker → Settings → Domains & Routes).
const SITE = 'https://imagedoc.lvcmedia.vn';

export default defineConfig({
	site: SITE,
	integrations: [
		starlight({
			title: 'LVC Image Gen',
			description: 'Hướng dẫn sử dụng LVC Image Gen: tạo ảnh AI, làm video từ phụ đề và kịch bản.',
			logo: { src: './src/assets/logo.png', alt: 'LVC Image Gen' },
			favicon: '/favicon.png',
			defaultLocale: 'root',
			// Tiếng Việt ở gốc (/…), tiếng Anh dưới /en/….
			locales: {
				root: { label: 'Tiếng Việt', lang: 'vi' },
				en: { label: 'English', lang: 'en' },
			},
			customCss: ['./src/styles/custom.css'],
			components: {
				// Sidebar xanh có icon — mục lục ở src/data/navigation.mjs.
				Sidebar: './src/components/overrides/Sidebar.astro',
				// Nút icon sáng/tối và nút VI | EN thay cho hai ô chọn bị cắt chữ.
				ThemeSelect: './src/components/overrides/ThemeSelect.astro',
				LanguageSelect: './src/components/overrides/LanguageSelect.astro',
			},
			social: [{ icon: 'facebook', label: 'Fanpage LVC Media', href: SUPPORT_LINK }],
			lastUpdated: false,
			pagination: true,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			// Chỉ dùng cho nút Trang trước / Trang sau; sidebar tự vẽ ở trên.
			sidebar: toStarlightSidebar(),
		}),
	],
});
