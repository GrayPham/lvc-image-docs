# Làm web docs cho một tool mới (theo khung LVC Image Gen)

Tài liệu này hướng dẫn dựng trang hướng dẫn sử dụng cho một tool khác của LVC (ví dụ **LVC Muse**). Trang mới giống hệt trang [imagedoc.lvcmedia.vn](https://imagedoc.lvcmedia.vn):

- Sidebar trái có mục lục, icon, nhóm gập/mở và nút thu gọn.
- Nút sáng/tối, nút đổi ngôn ngữ **VI | EN**, ô tìm kiếm.
- Mỗi tính năng có một khung video YouTube. Quay video xong chỉ cần dán link vào một file.
- Chạy miễn phí trên Cloudflare, gắn tên miền riêng như `musedoc.lvcmedia.vn`.

Không cần viết lại từ đầu. Ta **nhân bản** repo `lvc-image-docs`, thay tên, màu và nội dung.

---

## 1. Chuẩn bị

| Cần có | Ghi chú |
| --- | --- |
| Node.js 22 trở lên | Gõ `node -v` để kiểm tra. |
| Git | Để đẩy code lên GitHub. |
| Tài khoản GitHub | Mỗi tool một repo riêng, ví dụ `lvc-muse-docs`. |
| Tài khoản Cloudflare | Dùng chung tài khoản đang giữ tên miền `lvcmedia.vn`. |
| Mã nguồn của tool cần viết docs | Để quét tính năng và đọc đúng tên nút. |

---

## 2. Nhân bản khung trang

Mở **cmd** rồi chạy lần lượt:

```bat
cd /d F:\LVC_Project2\webdocs
git clone https://github.com/GrayPham/lvc-image-docs.git lvc-muse-docs
cd lvc-muse-docs
rmdir /s /q .git
git init -b main
npm install
npm run dev
```

Mở `http://localhost:4321`. Trang Image Gen hiện lên là khung đã chạy. Sửa file nào thì trình duyệt tự tải lại.

`rmdir /s /q .git` xoá lịch sử của repo cũ, để repo mới bắt đầu sạch.

---

## 3. Bản đồ thư mục

```
lvc-muse-docs/
├─ astro.config.mjs              ← tên trang, tên miền, logo, ngôn ngữ
├─ wrangler.jsonc                ← tên Worker trên Cloudflare
├─ package.json                  ← tên dự án
├─ public/favicon.png            ← icon trên tab trình duyệt
└─ src/
   ├─ assets/logo.png            ← logo trên đầu trang và trang chủ
   ├─ data/
   │  ├─ navigation.mjs          ← MỤC LỤC sidebar (thứ tự bài, icon)
   │  └─ videos.ts               ← LINK VIDEO YouTube cho từng tính năng
   ├─ styles/custom.css          ← màu chủ đạo, màu sidebar
   ├─ components/
   │  ├─ TutorialVideo.astro     ← khung video (không cần sửa)
   │  └─ overrides/
   │     ├─ Sidebar.astro        ← sidebar trái (sửa chữ thương hiệu ở cuối)
   │     ├─ ThemeSelect.astro    ← nút sáng/tối (không cần sửa)
   │     └─ LanguageSelect.astro ← nút VI | EN (không cần sửa)
   └─ content/docs/
      ├─ index.mdx               ← trang chủ tiếng Việt
      ├─ <nhóm>/<bài>.mdx        ← các bài tiếng Việt
      └─ en/                     ← bản tiếng Anh, cùng tên file
```

Sau khi dựng xong, việc thường ngày chỉ đụng tới hai file: **`videos.ts`** (dán link video) và **`navigation.mjs`** (thêm hoặc bớt bài).

---

## 4. Đổi nhận diện sang tool mới

Làm hết danh sách dưới đây trước khi viết nội dung.

| File | Đổi gì |
| --- | --- |
| `package.json` | `"name": "lvc-muse-docs"` |
| `wrangler.jsonc` | `"name": "lvc-muse-docs"` (tên Worker trên Cloudflare) |
| `astro.config.mjs` | `SITE = 'https://musedoc.lvcmedia.vn'`, `title`, `description`, `logo.alt` |
| `src/assets/logo.png` | Logo tool mới, ảnh vuông, nền trong suốt |
| `public/favicon.png` | Icon tool mới, 64×64 hoặc 128×128 |
| `src/data/navigation.mjs` | Toàn bộ mục lục, xem mục 5. Kiểm tra `SUPPORT_LINK` ở cuối file. |
| `src/data/videos.ts` | Xoá hết mã cũ, khai báo mã video mới, để `url: ''` |
| `src/components/overrides/Sidebar.astro` | Dòng `<span class="lvc-nav__brand-sub">LVC Image Gen</span>` → tên tool mới |
| `src/styles/custom.css` | Màu chủ đạo, nếu tool mới có màu khác (xem mục 9) |
| `src/content/docs/` | Xoá các bài cũ, giữ lại `index.mdx` làm mẫu rồi viết lại |
| `README.md` | Thay tên tool và tên miền |

Tìm nhanh chỗ còn sót chữ "Image Gen":

```bat
findstr /s /i /n /c:"Image Gen" src\*.* astro.config.mjs package.json wrangler.jsonc README.md
```

---

## 5. Lên mục lục từ tính năng của tool

### 5.1 Quét tool

Mở mã nguồn tool. Liệt kê mọi tab, mọi nút chính, mọi hộp thoại, kèm **đúng chữ trên giao diện**. Chữ trong bài phải khớp từng ký tự với chữ khách thấy, kể cả emoji (`▶ Bắt đầu`, `➕ Thêm nhân vật`).

Gom thành nhóm theo hành trình của khách:

1. **Bắt đầu**: giới thiệu, cài đặt, đăng nhập bản quyền, cập nhật, làm việc đầu tiên trong 10 phút.
2. **Từng nhóm tính năng chính**: mỗi tab lớn là một bài, tab phức tạp thì tách làm vài bài.
3. **Công cụ & tích hợp**: cài đặt, API, các tiện ích phụ.
4. **Hỗ trợ**: lỗi thường gặp, liên hệ.

### 5.2 Ghi vào `navigation.mjs`

Mỗi bài là một dòng. Thứ tự trong file cũng là thứ tự nút **Trang trước / Trang sau** cuối mỗi bài.

```js
export const navigation = [
	{
		title: 'Bắt đầu',
		en: 'Getting started',
		items: [
			{ label: 'Giới thiệu', en: 'Introduction', link: '/', icon: 'star' },
			{ label: 'Cài đặt tool', en: 'Install the tool', link: '/bat-dau/cai-dat/', icon: 'laptop' },
		],
	},
	{
		title: 'Tạo nội dung',
		en: 'Create',
		items: [
			// Nhóm gập/mở: có `children` thay cho `link`
			{
				label: 'Các chế độ',
				en: 'Modes',
				icon: 'seti:video',
				children: [
					{ label: 'Chế độ A', en: 'Mode A', link: '/tao/che-do-a/' },
					{ label: 'Chế độ B', en: 'Mode B', link: '/tao/che-do-b/' },
				],
			},
		],
	},
];
```

Quy tắc:

- `link` viết **chữ thường, không dấu, nối bằng gạch ngang**, có `/` ở hai đầu, và phải khớp đường dẫn file. Ví dụ `/bat-dau/cai-dat/` ứng với file `src/content/docs/bat-dau/cai-dat.mdx`.
- Bản tiếng Anh tự thêm `/en` ở đầu. Không cần khai báo riêng.
- Tên icon tra ở <https://starlight.astro.build/reference/icons/>. Gõ sai tên icon thì icon không hiện, nên mở trang xem lại sau khi thêm.

---

## 6. Viết một bài

### 6.1 Khung bài mẫu

Mỗi bài là một file `.mdx`. Chép khung này cho mọi bài tính năng:

```mdx
---
title: Tên tính năng
description: Một câu nói tính năng này giúp khách làm được gì.
---

import { Steps, Aside, Tabs, TabItem } from '@astrojs/starlight/components';
import TutorialVideo from '../../../components/TutorialVideo.astro';

Một hai câu: tính năng này dùng để làm gì, khi nào nên dùng.

<TutorialVideo id="ma-video-cua-bai" />

## Làm từng bước

<Steps>

1. Ở thanh bên trái, bấm **Tên tab**.

2. Điền ô **Tên ô**. Chọn **Tên lựa chọn**.

3. Bấm <kbd>▶ Bắt đầu</kbd>. Chờ trạng thái báo **Xong**.

</Steps>

## Tuỳ chọn

| Ô / nút | Làm gì |
| --- | --- |
| **Tên ô** | Giải thích ngắn. |

<Aside type="tip">Mẹo giúp làm nhanh hơn.</Aside>

<Aside type="caution">Điều dễ làm sai và cách tránh.</Aside>
```

Số `../` trong dòng `import TutorialVideo` phụ thuộc độ sâu của file:

| Vị trí file | Đường import |
| --- | --- |
| `docs/index.mdx` | `../../components/TutorialVideo.astro` |
| `docs/nhom/bai.mdx` | `../../../components/TutorialVideo.astro` |
| `docs/en/nhom/bai.mdx` | `../../../../components/TutorialVideo.astro` |

### 6.2 Cách viết cho khách dễ làm theo

- Mỗi bước là **một hành động**. Câu ngắn, bắt đầu bằng động từ: *Bấm*, *Chọn*, *Dán*, *Chờ*.
- Tên tab, tên ô viết **đậm**. Nút bấm đặt trong `<kbd>…</kbd>` để trông giống nút thật.
- Chép đúng chữ trên giao diện, không diễn giải lại.
- Nói rõ **dấu hiệu đã xong** (thông báo gì hiện lên, ô nào đổi màu) để khách biết mình làm đúng.
- Lỗi khách hay gặp thì đưa vào `<Aside type="caution">` ngay trong bài, đồng thời ghi vào trang **Lỗi thường gặp**.
- Không viết tên file nội bộ, tên biến, cổng debug hay chi tiết kỹ thuật khách không cần.
- Ảnh chụp màn hình phải **che email, mật khẩu, cookie, khoá API**. Ảnh để ở `src/assets/` rồi chèn bằng `![mô tả](../../assets/ten-anh.png)`.

### 6.3 Thành phần có sẵn

| Thành phần | Dùng khi |
| --- | --- |
| `<Steps>` | Các bước đánh số |
| `<Aside type="note / tip / caution / danger">` | Ghi chú, mẹo, cảnh báo |
| `<Tabs>` + `<TabItem label="…">` | Cùng một việc có nhiều cách (Windows/Mac, Python/curl) |
| `<Card>`, `<CardGrid>`, `<LinkCard>` | Ô giới thiệu trên trang chủ |
| `<TutorialVideo id="…" />` | Khung video YouTube |

---

## 7. Video hướng dẫn

### 7.1 Khai báo khung video trước, quay sau

Trong `src/data/videos.ts`, mỗi tính năng quan trọng có một mã:

```ts
export const videos = {
	intro: { url: '', title: 'Giới thiệu LVC Muse', en: 'Introducing LVC Muse' },
	install: { url: '', title: 'Cài đặt tool lần đầu', en: 'Installing the tool' },
	'tao-noi-dung': { url: '', title: 'Tạo nội dung hàng loạt', en: 'Creating content in bulk' },
} satisfies Record<string, { url: string; title: string; en: string }>;
```

Trong bài, `<TutorialVideo id="tao-noi-dung" />` gọi đúng mã đó. Khi `url` còn trống, trang hiện khung **"Video hướng dẫn đang được cập nhật"**, nên vẫn đưa trang lên mạng được từ đầu.

Gõ sai mã trong bài thì lúc build báo lỗi, nên không bao giờ lọt khung video hỏng lên mạng.

### 7.2 Quay xong, thay link

1. Đăng video lên YouTube, để **Công khai** hoặc **Không công khai**. Chế độ **Riêng tư** không nhúng được.
2. Mở `src/data/videos.ts`, dán link vào `url` của đúng mã. Kiểu link nào cũng nhận:
   - `https://www.youtube.com/watch?v=XXXXXXXXXXX`
   - `https://youtu.be/XXXXXXXXXXX`
   - `https://www.youtube.com/shorts/XXXXXXXXXXX`
   - hoặc chỉ mã 11 ký tự `XXXXXXXXXXX`
3. Lưu, rồi đẩy lên GitHub (mục 10). Cloudflare tự cập nhật trang sau 1–2 phút.

Bản tiếng Anh dùng chung link. Chỉ dòng chú thích dưới video lấy từ `en`.

---

## 8. Bản tiếng Anh

- Mỗi file trong `src/content/docs/` có một bản cùng tên trong `src/content/docs/en/`.
- Chữ trên giao diện tool vẫn giữ tiếng Việt (vì tool hiện tiếng Việt), kèm nghĩa tiếng Anh trong ngoặc. Ví dụ: **Bắt đầu** (*Start*).
- Bài nào chưa dịch kịp thì cứ để trống. Starlight tự hiện bản tiếng Việt kèm dòng báo "chưa có bản dịch".

---

## 9. Đổi màu theo tool

Mở `src/styles/custom.css`. Có hai khối: `:root` cho giao diện tối, `:root[data-theme='light']` cho giao diện sáng.

| Biến | Ý nghĩa |
| --- | --- |
| `--sl-color-accent` | Màu chủ đạo: link, nút, mục đang chọn |
| `--sl-color-accent-low` / `-high` | Bản nhạt / đậm của màu chủ đạo |
| `--lvc-nav-bg` | Nền sidebar |
| `--lvc-nav-text`, `--lvc-nav-icon` | Chữ và icon trong sidebar |
| `--lvc-nav-active`, `--lvc-nav-active-text` | Nền và chữ của bài đang mở |

Lưu ý khi chọn màu:

- Ở giao diện sáng, nền sidebar phải là **màu rất nhạt cùng tông** với màu chủ đạo. Sidebar đậm cạnh nền trắng rất khó nhìn. Chủ dự án đã phản hồi điểm này.
- Lấy màu chủ đạo từ nút chính trong giao diện tool để trang docs và tool trông cùng một bộ.

---

## 10. Chạy thử và đưa lên mạng

### 10.1 Kiểm tra trên máy

```bat
npm run build
npm run preview
```

`npm run build` phải chạy hết, không báo lỗi. Sau đó mở `http://localhost:4321` và kiểm tra:

- [ ] Bấm qua mọi mục trong sidebar, không có trang 404.
- [ ] Nút sáng/tối đổi được, và giữ lựa chọn sau khi tải lại trang.
- [ ] Nút **VI | EN** giữ đúng bài đang đọc.
- [ ] Ô tìm kiếm tìm ra bài. Ô này chỉ chạy sau `build`, không chạy ở `npm run dev`.
- [ ] Thu nhỏ trình duyệt bằng cỡ điện thoại: menu mở được, chữ không tràn.
- [ ] Không còn chữ "Image Gen" sót lại.

### 10.2 Đẩy lên GitHub

Tạo repo trống `lvc-muse-docs` trên GitHub. **Không** tích *Add a README*. Rồi chạy:

```bat
git add .
git commit -m "Trang tài liệu LVC Muse"
git remote add origin https://github.com/GrayPham/lvc-muse-docs.git
git push -u origin main
```

Gõ đúng tên tài khoản và tên repo vào lệnh `git remote add`. Đừng để nguyên dấu `<…>`: cmd hiểu `<` là lệnh chuyển hướng và báo lỗi.

### 10.3 Nối Cloudflare

1. Vào **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Import a repository** → chọn `lvc-muse-docs`.
2. Điền:

   | Ô | Giá trị |
   | --- | --- |
   | Project name | `lvc-muse-docs` (trùng `name` trong `wrangler.jsonc`) |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Root directory | để trống |

3. Mở **Advanced settings** → **Environment variables**, thêm `NODE_VERSION` = `22`.
4. Bấm **Deploy**. Xong thì có link dạng `lvc-muse-docs.<tên>.workers.dev`.

Cảnh báo về quyền của API token cứ để mặc định. Không cần bật **Access**.

Từ đây, mỗi lần `git push`, Cloudflare tự build và cập nhật trang.

### 10.4 Gắn tên miền riêng

1. Kiểm tra `lvcmedia.vn` nằm trong **cùng tài khoản Cloudflare** (trang chủ dash → **Domains**).
2. **Workers & Pages** → `lvc-muse-docs` → **Settings** → **Domains & Routes** → **+ Add** → **Custom domain**.
3. Gõ `musedoc.lvcmedia.vn` → **Add domain**. Chờ vài phút để có SSL.
4. Đảm bảo `SITE` trong `astro.config.mjs` đúng tên miền này (để sitemap và link chia sẻ đúng).

Nếu báo *record already exists*: vào **DNS** của `lvcmedia.vn`, xoá bản ghi trùng tên rồi thêm lại.

---

## 11. Bẫy đã gặp khi dựng trang Image Gen

Các lỗi này đã được sửa sẵn trong khung. Ghi lại để không ai sửa ngược lại.

| Hiện tượng | Nguyên nhân | Cách đúng |
| --- | --- | --- |
| Bấm nút sáng/tối không đổi gì | Nút có hai bản (đầu trang và menu điện thoại). Gắn sự kiện cho cả hai thì một cú bấm đổi hai lần, về như cũ. | Script trong `ThemeSelect.astro` chỉ gắn vào nút đứng ngay trước nó (`document.currentScript.previousElementSibling`). |
| Thu gọn sidebar làm cột "Trên trang này" bên phải bị bóp | Đã đổi `--sl-sidebar-width` | Chỉ đổi `--sl-content-inline-start` và độ rộng `.sidebar-pane` |
| Build báo lỗi cấu hình `sidebar` | Starlight mới không nhận `autogenerate` kèm `label` | Không sửa `sidebar` trong `astro.config.mjs`. Mục lục chỉ sửa ở `navigation.mjs`. |
| Thêm bài mới nhưng không thấy trên sidebar | Sidebar vẽ từ `navigation.mjs`, không tự quét thư mục | Thêm dòng vào `navigation.mjs` |
| Nút Trang trước / Trang sau sai thứ tự | Thứ tự lấy từ `navigation.mjs` | Đổi thứ tự trong `navigation.mjs` |
| Video không hiện, chỉ có khung "đang cập nhật" | `url` trống, hoặc video để Riêng tư | Dán link, đổi video sang Công khai / Không công khai |

---

## 12. Giao cho Claude Code dựng giúp

Nếu dùng Claude Code, mở thư mục `lvc-muse-docs` đã nhân bản ở mục 2, gửi kèm file này và giao việc như sau:

> Đọc `LAM-WEB-DOCS-CHO-TOOL-MOI.md`. Đây là khung web docs nhân bản từ LVC Image Gen. Dựng lại thành web docs cho tool **LVC Muse**, mã nguồn ở `<đường dẫn thư mục tool>`.
>
> 1. Làm hết danh sách đổi nhận diện ở mục 4. Tên miền là `musedoc.lvcmedia.vn`.
> 2. Quét toàn bộ mã nguồn tool. Lập mục lục theo mục 5, mỗi tính năng quan trọng một bài.
> 3. Viết từng bài theo khung và quy tắc ở mục 6, chép đúng chữ trên giao diện. Mỗi bài tính năng có một `<TutorialVideo>`, khai báo mã trong `videos.ts` với `url: ''`.
> 4. Viết bản tiếng Anh theo mục 8.
> 5. Chạy `npm run build` tới khi không lỗi, rồi kiểm tra theo danh sách ở mục 10.1.
> 6. Không đưa email, mật khẩu, cookie, khoá thật vào bài hay ảnh. Chưa đẩy git khi chưa được hỏi.

Sau khi trang chạy, việc còn lại chỉ là: **quay video → dán link vào `videos.ts` → `git push`**.
