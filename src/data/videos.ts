/**
 * DANH SÁCH VIDEO HƯỚNG DẪN — chỉ cần sửa file này để thay video.
 *
 * Cách thay: dán link YouTube vào ô `url` (giữa hai dấu nháy '').
 * Dán kiểu nào cũng được:
 *   'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
 *   'https://youtu.be/dQw4w9WgXcQ'
 *   'https://www.youtube.com/shorts/dQw4w9WgXcQ'
 *   'dQw4w9WgXcQ'
 * Để trống '' thì trang hiện khung "Video hướng dẫn đang được cập nhật".
 *
 * `title` là dòng chú thích dưới video (tiếng Việt), `en` là bản tiếng Anh. Đừng đổi tên mã bên trái
 * (ví dụ `install`): các trang tài liệu gọi video bằng mã đó.
 */
export const videos = {
	// ── Trang chủ ──
	intro: { url: '', title: 'Giới thiệu LVC Image Gen', en: 'Introducing LVC Image Gen' },

	// ── Bắt đầu ──
	install: { url: '', title: 'Cài đặt tool lần đầu', en: 'Installing the tool' },
	'license-login': { url: '', title: 'Đăng nhập và kích hoạt bản quyền', en: 'Signing in and activating your license' },
	update: { url: '', title: 'Cập nhật tool', en: 'Updating the tool' },
	'quick-start': { url: '', title: 'Làm video đầu tiên trong 10 phút', en: 'Your first video in 10 minutes' },

	// ── Tài khoản ──
	'accounts-overview': { url: '', title: 'Quản lý tài khoản: bật, tắt, kiểm tra', en: 'Managing accounts: enable, disable, check' },
	'accounts-google-auto': { url: '', title: 'Thêm tài khoản Google tự động', en: 'Adding a Google account automatically' },
	'accounts-google-manual': { url: '', title: 'Thêm tài khoản Google thủ công', en: 'Adding a Google account manually' },
	'accounts-google-bulk': { url: '', title: 'Thêm tài khoản Google hàng loạt', en: 'Adding Google accounts in bulk' },
	'accounts-muse': { url: '', title: 'Thêm tài khoản Muse AI', en: 'Adding a Muse AI account' },
	'accounts-chatgpt': { url: '', title: 'Thêm tài khoản ChatGPT', en: 'Adding a ChatGPT account' },

	// ── Tạo ảnh ──
	'create-image': { url: '', title: 'Tạo ảnh hàng loạt', en: 'Creating images in bulk' },
	'replace-character': { url: '', title: 'Thay thế nhân vật trong ảnh', en: 'Replacing characters in images' },

	// ── Làm video ──
	'video-from-subtitle': { url: '', title: 'Làm video từ phụ đề, âm thanh hoặc link', en: 'Making a video from subtitles, audio or a link' },
	'video-queue': { url: '', title: 'Hàng đợi: làm nhiều video qua đêm', en: 'The queue: making many videos overnight' },
	'video-from-script': { url: '', title: 'Làm video từ ý tưởng hoặc truyện', en: 'Making a video from an idea or a story' },
	'cast-page': { url: '', title: 'Nhân vật & bối cảnh: giữ nhân vật nhất quán', en: 'Characters & settings: keeping characters consistent' },

	// ── Công cụ khác ──
	'auto-cap': { url: '', title: 'Auto Cap: ghép dự án CapCut', en: 'Auto Cap: building a CapCut project' },
	'api-server': { url: '', title: 'Bật API Server và gọi API', en: 'Turning on the API Server and calling the API' },
	'ai-assistant': { url: '', title: 'Cho Claude, Cursor điều khiển tool', en: 'Letting Claude or Cursor control the tool' },
	settings: { url: '', title: 'Tab Cài Đặt', en: 'The Settings tab' },

	// ── Hỗ trợ ──
	troubleshooting: { url: '', title: 'Tự xử lý các lỗi thường gặp', en: 'Fixing common errors yourself' },
} satisfies Record<string, { url: string; title: string; en: string }>;
