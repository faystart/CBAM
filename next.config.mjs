/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 纯静态输出
  images: {
    unoptimized: true, // 静态部署通常需要关闭图片优化服务
  },
};

export default nextConfig;
