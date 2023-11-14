/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap:async function (defaultPathMap) {
      return {
        '/':{page:'/login'},
        ...defaultPathMap
      }
  }
}

module.exports = nextConfig
