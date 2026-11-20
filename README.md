# Trang tài liệu LVC Image Gen

Trang hướng dẫn sử dụng tool LVC Image Gen, làm bằng [Starlight](https://starlight.astro.build).
Mỗi trang là một file `.mdx` (chữ thường + vài khối đặc biệt), sửa bằng VS Code hay Notepad đều được.

## 1. Thay video hướng dẫn

**Chỉ cần sửa một file:** `src/data/videos.ts`.

```ts
install: { url: '', title: 'Cài đặt tool lần đầu' },
```

Dán link YouTube vào giữa hai dấu nháy của `url`:

```ts
install: { url: 'https://youtu.be/abc123XYZ_0', title: 'Cài đặt tool lần đầu' },
```

- Link dạng nào cũng được: `youtube.com/watch?v=…`, `youtu.be/…`, `youtube.com/shorts/…`, hoặc chỉ mã 11 ký tự.
- Để trống `''` thì trang hiện khung “Video hướng dẫn đang được cập nhật”.
- `title` là dòng chú thích dưới video, sửa thoải mái.
- **Đừng đổi tên mã bên trái** (`install`, `create-image`…), các trang gọi video bằng mã đó.

Mỗi mã ứng với trang nào:

| Mã | Trang |
| --- | --- |
| `intro` | Trang chủ |
| `install`, `license-login`, `update`, `quick-start` | Bắt đầu |
| `accounts-overview`, `accounts-google-auto`, `accounts-google-manual`, `accounts-google-bulk`, `accounts-muse`, `accounts-chatgpt` | Tài khoản |
| `create-image`, `replace-character` | Tạo ảnh |
| `video-from-subtitle`, `video-queue`, `video-from-script`, `cast-page` | Làm video |
| `auto-cap`, `api-server`, `ai-assistant`, `settings` | Công cụ khác |
| `troubleshooting` | Lỗi thường gặp |

### Thêm video vào chỗ mới

1. Thêm một dòng mới trong `src/data/videos.ts`, ví dụ `'upscale': { url: '…', title: 'Upscale ảnh' },`
2. Trong trang `.mdx` muốn chèn, đặt dòng: `<TutorialVideo id="upscale" />`
   (đầu trang đó phải có dòng `import TutorialVideo from '…/components/TutorialVideo.astro';` — các trang có sẵn đều đã có).

## 2. Sửa nội dung

Các trang nằm trong `src/content/docs/`:

```
src/content/docs/
├── index.mdx            Trang chủ
├── bat-dau/             Cài đặt, đăng nhập, cập nhật, video đầu tiên
├── tai-khoan/           Google Flow, Muse AI, ChatGPT
├── tao-anh/             Tạo Image, Thay Thế
├── lam-video/           Phụ đề → Video, Hàng đợi, Kịch bản, Nhân vật
├── cong-cu/             Auto Cap, API Server, Trợ lý AI, Cài Đặt
└── ho-tro/              Lỗi thường gặp, Liên hệ
```

- **Sidebar trái** khai ở MỘT file: `src/data/navigation.mjs`. Mỗi nhóm có tiêu đề (chữ in hoa) và danh sách bài, mỗi bài có `label` (tên hiện), `link` (đường dẫn) và `icon`. Đổi thứ tự trong file này là đổi thứ tự trên sidebar và nút Trang trước/sau.
- Thêm trang: tạo file `.mdx` trong thư mục mục đó, rồi thêm một dòng vào `navigation.mjs`, ví dụ `{ label: 'Upscale ảnh', link: '/tao-anh/upscale/', icon: 'seti:image' }`.
- Danh sách tên icon: https://starlight.astro.build/reference/icons/
- Nhãn nút trong tool viết là `<kbd>Bắt đầu</kbd>` để hiện thành hình nút bấm.

### Thêm ảnh chụp màn hình

1. Chép ảnh vào `src/assets/anh/` (tạo thư mục nếu chưa có).
2. Trong trang: `![Mô tả ảnh](../../../assets/anh/ten-anh.png)`

**Nhớ che email, mật khẩu, cookie** trên ảnh chụp trước khi đưa lên.

## Bản tiếng Anh

- Trang tiếng Việt nằm ở `src/content/docs/…`, bản tiếng Anh nằm ở `src/content/docs/en/…` **cùng tên file**. Nút **VI | EN** trên đầu trang chuyển qua lại giữa hai bản của cùng một bài.
- Sửa bài tiếng Việt thì nhớ sửa bài tiếng Anh tương ứng.
- Bài nào chưa có bản tiếng Anh thì trang tiếng Anh tự hiện bản tiếng Việt kèm dòng thông báo.
- Tên mục trên sidebar bản tiếng Anh là trường `en` trong `src/data/navigation.mjs`; chú thích video tiếng Anh là trường `en` trong `src/data/videos.ts`.
- Nhãn nút trong tool vẫn để tiếng Việt (vì giao diện tool là tiếng Việt), kèm nghĩa tiếng Anh trong ngoặc ở lần nhắc đầu.

## 3. Xem thử trên máy

Cần Node.js 22 trở lên. Lần đầu chạy `npm install`.

```bash
npm run dev       # mở http://localhost:4321, sửa file là trang tự cập nhật
npm run build     # dựng bản chính thức vào thư mục dist/
npm run preview   # xem bản đã dựng
```

## 4. Đưa lên Cloudflare Pages

### Cách A — nối GitHub (khuyên dùng, sửa xong tự cập nhật)

1. Đẩy thư mục này lên một repo GitHub.
2. Vào Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, chọn repo.
3. Cài đặt dựng:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Bấm **Save and Deploy**. Từ đó mỗi lần đẩy lên GitHub, trang tự dựng lại.

### Cách B — đẩy thẳng từ máy

```bash
npm run build
npx wrangler pages deploy dist --project-name lvc-image-docs
```

### Gắn tên miền riêng

Trong project Pages → **Custom domains** → thêm ví dụ `docs.lvcmedia.vn`.
Sau đó sửa dòng `const SITE = …` trong `astro.config.mjs` thành tên miền đó rồi dựng lại.
