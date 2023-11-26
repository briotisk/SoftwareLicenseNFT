import { ethers } from 'ethers';

async function getMetaMaskProvider() {

    //verifica se o usuário possui metamask
    if (!window.ethereum) throw new Error(`No MetaMask found!`);
    await window.ethereum.send('eth_requestAccounts');

    //carrega o provider
    const provider = new ethers.BrowserProvider(window.ethereum, "any");

    //Recarrega a aplicação no caso emm que o usuário troca de rede 
    provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) window.location.reload();
    });

    return provider;

}
