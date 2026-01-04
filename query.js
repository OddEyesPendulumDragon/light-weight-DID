const { ethers } = require("ethers");

// 合约配置
const contractAddress = "0xdD521F70125e65fE5d2cf12908A7AB25084c7460";

const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/QByss22_88JrEPO-Bg8n2"; 
const abi = [
    "function didDocuments(string did) public view returns (string)"
];

async function queryDID() {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    try {
        const code = await provider.getCode(contractAddress);
        if (code === "0x") {
            console.error("错误：在 Sepolia 网络上找不到该合约！请检查合约地址是否正确。");
            return;
        }


        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        const didIdentifier = "did:oidc:seq:234567890123456789012345656"; 

        console.log(`正在从 Sepolia 查询: ${didIdentifier}...`);

        const ipfsCID = await contract.didDocuments(didIdentifier);
        
        if (ipfsCID && ipfsCID !== "") {
            console.log("-----------------------------------------");
            console.log("查询成功！");
            console.log(`绑定的 IPFS CID: ${ipfsCID}`);
            console.log(`访问链接: https://ipfs.io/ipfs/${ipfsCID}`);
            console.log("-----------------------------------------");
        } else {
            console.log("未找到绑定信息，该 DID 可能尚未注册。");
        }
    } catch (error) {
        console.error("查询过程中发生错误:", error);
    }
}

queryDID();