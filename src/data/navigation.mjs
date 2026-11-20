/**
 * MỤC LỤC SIDEBAR — sửa ở đây để thêm, bớt, đổi thứ tự các bài.
 *
 * Mỗi nhóm có `title` (chữ in hoa nhỏ trên sidebar) và `items`.
 * Một mục là { label, en, link, icon } hoặc một nhóm gập/mở:
 * { label, en, icon, children: [{ label, en, link }, …] }.
 *
 * - `label`: tên tiếng Việt; `en`: tên tiếng Anh (trang /en/…).
 * - `link`: đường dẫn bản tiếng Việt; bản tiếng Anh tự thêm /en ở đầu.
 * - `icon`: tên icon có sẵn của Starlight,
 *   xem https://starlight.astro.build/reference/icons/
 *
 * File này dùng cho CẢ sidebar lẫn nút "Trang trước / Trang sau" cuối bài,
 * nên thứ tự ở đây cũng là thứ tự đọc.
 */
export const navigation = [
	{
		title: 'Bắt đầu',
		en: 'Getting started',
		items: [
			{ label: 'Giới thiệu', en: 'Introduction', link: '/', icon: 'star' },
			{ label: 'Cài đặt tool', en: 'Install the tool', link: '/bat-dau/cai-dat/', icon: 'laptop' },
			{ label: 'Đăng nhập bản quyền', en: 'License sign-in', link: '/bat-dau/dang-nhap/', icon: 'padlock' },
			{ label: 'Cập nhật tool', en: 'Update the tool', link: '/bat-dau/cap-nhat/', icon: 'cloud-download' },
			{ label: 'Làm video đầu tiên', en: 'Your first video', link: '/bat-dau/video-dau-tien/', icon: 'rocket' },
		],
	},
	{
		title: 'Tài khoản',
		en: 'Accounts',
		items: [
			{ label: 'Tổng quan & proxy', en: 'Overview & proxy', link: '/tai-khoan/tong-quan/', icon: 'list-format' },
			{
				label: 'Các loại tài khoản',
				en: 'Account types',
				icon: 'approve-check-circle',
				children: [
					{ label: 'Google Flow', en: 'Google Flow', link: '/tai-khoan/google-flow/' },
					{ label: 'Muse AI', en: 'Muse AI', link: '/tai-khoan/muse-ai/' },
					{ label: 'ChatGPT', en: 'ChatGPT', link: '/tai-khoan/chatgpt/' },
				],
			},
		],
	},
	{
		title: 'Tạo ảnh',
		en: 'Create images',
		items: [
			{ label: 'Tạo Image', en: 'Create Image', link: '/tao-anh/tao-image/', icon: 'seti:image' },
			{ label: 'Thay Thế nhân vật', en: 'Replace characters', link: '/tao-anh/thay-the/', icon: 'random' },
		],
	},
	{
		title: 'Làm video',
		en: 'Make videos',
		items: [
			{
				label: 'Phụ đề/âm thanh → Video',
				en: 'Subtitles/audio → Video',
				icon: 'seti:video',
				children: [
					{ label: 'Làm một video', en: 'Make one video', link: '/lam-video/phu-de-am-thanh/' },
					{ label: 'Hàng đợi kịch bản', en: 'Script queue', link: '/lam-video/hang-doi/' },
				],
			},
			{ label: 'Kịch Bản → Video', en: 'Script → Video', link: '/lam-video/kich-ban/', icon: 'pencil' },
			{ label: 'Nhân vật & bối cảnh', en: 'Characters & settings', link: '/lam-video/nhan-vat-canh/', icon: 'heart' },
		],
	},
	{
		title: 'Công cụ & tích hợp',
		en: 'Tools & integrations',
		items: [
			{ label: 'Auto Cap', en: 'Auto Cap', link: '/cong-cu/auto-cap/', icon: 'puzzle' },
			{ label: 'API Server', en: 'API Server', link: '/cong-cu/api-server/', icon: 'server' },
			{ label: 'Trợ lý AI (MCP)', en: 'AI Assistant (MCP)', link: '/cong-cu/tro-ly-ai/', icon: 'comment-alt' },
			{ label: 'Tab Cài Đặt', en: 'Settings tab', link: '/cong-cu/cai-dat/', icon: 'setting' },
		],
	},
	{
		title: 'Hỗ trợ',
		en: 'Support',
		items: [
			{ label: 'Lỗi thường gặp', en: 'Troubleshooting', link: '/ho-tro/loi-thuong-gap/', icon: 'warning' },
			{ label: 'Liên hệ hỗ trợ', en: 'Contact support', link: '/ho-tro/lien-he/', icon: 'phone' },
		],
	},
];

/** Đường dẫn của một bài theo ngôn ngữ ('en' thêm /en ở đầu). */
export function localizedLink(link, locale) {
	return locale === 'en' ? `/en${link}` : link;
}

/** '/bat-dau/cai-dat/' -> 'bat-dau/cai-dat', '/' -> 'index' (slug của Starlight). */
const toSlug = (link) => link.replace(/^\/|\/$/g, '') || 'index';

/**
 * Cùng mục lục, đổi sang dạng `sidebar` của Starlight — chỉ dùng cho nút
 * Trang trước / Trang sau. Dùng `slug` để Starlight tự trỏ đúng bản ngôn ngữ.
 */
export function toStarlightSidebar(nav = navigation) {
	const entry = (item) => ({ slug: toSlug(item.link), label: item.label, translations: { en: item.en } });
	return nav.map((section) => ({
		label: section.title,
		translations: { en: section.en },
		items: section.items.map((item) =>
			item.children
				? { label: item.label, translations: { en: item.en }, items: item.children.map(entry) }
				: entry(item),
		),
	}));
}

export const SUPPORT_LINK = 'https://www.facebook.com/profile.php?id=100092372321965';
