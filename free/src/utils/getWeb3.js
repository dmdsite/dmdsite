import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
   
   if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      results = {
        web3: web3
      }

      console.log('Injected web3 detected. provider' + web3.currentProvider);
      console.dir(web3.currentProvider);

      resolve(results)
    } else {
      
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var networklocation = 'https://ropsten.infura.io/v3/e7efe1c2d8fd4a79809af8bd597bd7ea';
      var provider = new Web3.providers.HttpProvider(networklocation)
      //var provider = new Web3.providers.HttpProvider('http://127.0.0.1')

      web3 = new Web3(provider)

      results = {
        web3: web3
      }

      console.log('No web3 instance injected, using Local web3.' + networklocation);

      resolve(results)
    }
  })
})

export default getWeb3
