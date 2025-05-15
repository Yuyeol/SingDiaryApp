// 최소한의 필수 PWA 설정만 추가하는 간단한 스크립트
const fs = require("fs");
const path = require("path");

// dist/index.html 파일 읽기
const indexPath = path.join(__dirname, "../dist/index.html");
let htmlContent = fs.readFileSync(indexPath, "utf8");

// PWA 필수 메타 태그 추가
if (!htmlContent.includes("apple-mobile-web-app-capable")) {
  // head 태그 닫기 직전에 메타 태그 추가
  htmlContent = htmlContent.replace(
    "</head>",
    `  <!-- PWA 필수 메타 태그 -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <link rel="manifest" href="/manifest.json" />
</head>`
  );

  // 변경된 내용 저장
  fs.writeFileSync(indexPath, htmlContent);
  console.log("✅ PWA 메타 태그가 추가되었습니다.");
} else {
  console.log("ℹ️ PWA 메타 태그가 이미 존재합니다.");
}
