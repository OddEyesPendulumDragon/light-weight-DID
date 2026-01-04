const { ethers } = require("ethers");

// 替换为你的私钥
const privateKey = "0x7777777777777777777777777777777777777777777777777777777777777777"; 
const wallet = new ethers.Wallet(privateKey);

// 获取未压缩公钥 (65字节，0x04 + 32字节X + 32字节Y)
const signingKey = wallet._signingKey();
const publicKey = signingKey.publicKey;

// 移除 0x04 前缀并拆分 X 和 Y
const xHex = publicKey.substring(4, 68);
const yHex = publicKey.substring(68, 132);

// 转换为 Base64URL 编码
const toBase64Url = (hex) => {
    return Buffer.from(hex, 'hex')
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
};

console.log("X 坐标 (Base64URL):", toBase64Url(xHex));
console.log("Y 坐标 (Base64URL):", toBase64Url(yHex));