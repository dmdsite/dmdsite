$(document).ready(function(){
    
   
      $("#signup").click(function(){
          location.href = "/add";
      })
      $("#signin").click(function(){
          location.href = "/login";
      })
      $("#services").click(function(){
        location.href = "/index";
      })

      $('.form-signin button').click(function(){
        var Eth_Address=$('#inputEthAddress').val()
        var id=$('#inputEthAddress').val()
        var password=$('#inputEthAddress').val()
        console.log("data 전송")
      })
    
})
