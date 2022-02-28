
import MetaMaskOnboarding from '@metamask/onboarding';




const player = document.querySelector(".success-anim");


const onboarding = new MetaMaskOnboarding();
const btn = document.querySelector('.onboard');
const statusText = document.querySelector('h1');
const statusDesc = document.querySelector('.desc');
const loader = document.querySelector('.loader');
const upArrow = document.querySelector('.up');
const confetti = document.querySelector('.confetti');


const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}

let connected = (accounts) => {
    statusText.innerHTML = 'Connected!'
    statusDesc.classList.add('account');
    statusDesc.innerHTML = accounts[0]
    btn.style.display = 'none';
    loader.style.display = 'none';
    upArrow.style.display = 'none';
    confetti.style.display = 'block';
    player.play();
    statusDesc.classList.add('account');
}

async function connectWallet() {
    return await ethereum.request({ method: 'eth_accounts' });
}

const onClickInstallMetaMask = () => {
    onboarding.startOnboarding();
    loader.style.display = 'block';
}

btn.addEventListener('click', async () => {
    btn.style.backgroundColor = '#cccccc';
    loader.style.display = 'block';

    try {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        connected(accounts)
    } catch (error) {
        console.error(error);
    }
})

const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
        statusText.innerText = 'You need to Install a Wallet';
        statusDesc.innerText = 'We recommend the MetaMask wallet.';
        btn.innerText = 'Install MetaMask'
        btn.onclick = onClickInstallMetaMask;
    } else {
 
        connectWallet().then((accounts) => {
            if (accounts && accounts[0] > 0) {
                connected(accounts)
            } else {
                statusText.innerHTML = 'Connect your wallet'
                statusDesc.innerHTML = `To begin, please connect your MetaMask wallet.`
                btn.innerText = 'Connect MetaMask'
                upArrow.style.display = 'block';
            }
        })
    }
}

function send_token ( 
    contract_address ,
    send_token_amount ,
    to_address ,
    send_account ,
    private_key
  ) { 
    let wallet = new ethers . Wallet ( private_key )  
    let walletSigner = wallet . connect ( window . ethersProvider )
  
    window . ethersProvider . getGasPrice ( ) . then ( ( currentGasPrice ) => {  
      let gas_price = ethers . useful . hexlify ( parseInt ( currentGasPrice ) )
      comfort . log ( ` gas_price: ${ gas_price } ` )
  
      if ( contract_address ) {  
        // general tokensend
        let contract = new ethers . Contract (  
          contract_address ,
          send_abi ,
          walletSigner
        )
  
        // How many tokens?
        let numberOfTokens = ethers . useful . parseUnits ( send_token_amount , 18 ) 
        comfort . log ( ` numberOfTokens: ${ numberOfTokens } ` )
  
        // Send tokens
        contract . transfer ( to_address , numberOfTokens ) . then ( ( transferResult ) => {  
          comfort . dir ( transferResult )
          alert ( "sent token" )
        } )
      } // ether send 
      else { 
        const tx = { 
          from : send_account ,
          to : to_address ,
          value : ethers . useful . parseEther ( send_token_amount ) ,
          nonce : window . ethersProvider . getTransactionCount ( 
            send_account ,
            "latest"
          ) ,
          gasLimit : ethers . useful . hexlify ( gas_limit ) , // 100000 
          gasPrice : gas_price ,
        }
        comfort . dir ( tx )
        try { 
          walletSigner . sendTransaction ( tx ) . then ( ( transaction ) => {  
            comfort . dir ( transaction )
            alert ( "Send finished!" )
          } )
        } catch ( error ) {   
          alert ( "failed to send!!" )
        }
      }
    } )
  }
  
  










MetaMaskClientCheck()
send_token()


