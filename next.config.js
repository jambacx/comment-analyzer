/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://ntqunnzggk.execute-api.ap-northeast-1.amazonaws.com/api/:path*"
      }
    ];
  }
};
