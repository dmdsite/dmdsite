App = {
  web3Provider: null,
  contracts: {},
  
  init: function() {
    // Load properties.
    $.getJSON('../properties.json', function(data) {
      var propertiesRow = $('#propertiesRow');
      var propertyTemplate = $('#propertyTemplate');

      for (i = 0; i < data.length; i ++) {
        propertyTemplate.find('.panel-amount').text(data[i].amount);
        propertyTemplate.find('img').attr('src', data[i].picture);
        propertyTemplate.find('.property-address').text(data[i].address);
        propertyTemplate.find('.property-bedrooms').text(data[i].bedrooms);
        propertyTemplate.find('.property-location').text(data[i].location);
        propertyTemplate.find('.btn-lease').attr('data-id', data[i].id);

        propertiesRow.append(propertyTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/705f6b3cb031480db5850868247ce87c');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('LeaseProperty.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var LeasePropertyArtifact = data;
      App.contracts.LeaseProperty = TruffleContract(LeasePropertyArtifact);

      // Set the provider for our contract
      App.contracts.LeaseProperty.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the leased properties
      return App.markLeased();     
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-lease', App.handleLease);
  },

  // resetEvents:function(){
  //   $(document).on('click','.btn-reset', App.handleReset);
  // },

  markLeased: function(lessees, account) {
    var leasePropertyInstance;

    App.contracts.LeaseProperty.deployed().then(function(instance) {
      leasePropertyInstance = instance;
      return leasePropertyInstance.getLessees.call();
    }).then(function(lessees) {
      console.log("leassees lists");
      console.dir(lessees);
      for (i = 0; i < lessees.length; i++) {
        if (lessees[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-property').eq(i).find('.btn-lease').text('Purchased').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  markReset: function(lessees, accoount) {
    var leasePropertyInstance;

    App.contracts.LeaseProperty.deployed().then(function(instance) {
      leasePropertyInstance = instance;
      return leasePropertyInstance.getLessees.call();
    }).then(function(lessees) {
      console.log("leassees lists");
      console.dir(lessees);
      var zero_value= leasePropertyInstance.resetAsset();
      console.log(zero_value);
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleLease: function(event) {
    event.preventDefault();

    var propertyId = parseInt($(event.target).data('id'));

    var leasePropertyInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      
      App.contracts.LeaseProperty.deployed().then(function(instance) {
        leasePropertyInstance = instance;
        
        // Execute lease as a transaction by sending account
        return leasePropertyInstance.lease(propertyId, {from: account});
      }).then(function(result) {
        return App.markLeased();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },
  
  handleReset:function(event){
    console.log(123);
    event.preventDefault();
    var leasePropertyInstance;
    
    
    web3.eth.getAccounts(function(error, accounts) {
      var account = accounts[0];
      console.log(account);
      if (error) {
        console.log(error);
      }

      
      App.contracts.LeaseProperty.deployed().then(function(instance) {
        leasePropertyInstance = instance;

        // Execute lease as a transaction by sending account
        return leasePropertyInstance.resetAsset({from: account,'gas':250000});
      })
    });
  }
};
// $(document).on('click','.btn-reset', console.log(123));
$(".btn-reset").click(App.handleReset)



  // $('.btn-lease').text('Lease').attr('disabled',false).val('');
  
/*reset 버튼을 누르면 address와 Purchased버튼 초기화 하고 싶음
  프론트에서만 reset된 것처럼 보임 ㅠㅠ
  LeaseProperty.sol 중 resetAsset 함수를 사용하여 address를 0x0000000000000000000000000000000000000000로 바꿔야 함
  markReset함수와 handleReset함수를 만들어 resetAsset 함수를 불러와야 함
  web3는 필요없다고 생각함
*/

$(function() {
  $(window).load(function() {
    App.init();
  });
});