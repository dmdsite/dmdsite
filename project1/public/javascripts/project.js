$(document).ready(function () {


  $("#signup").click(function () {
    location.href = "/add";
  })
  $("#signin").click(function () {
    location.href = "/login";
  })
  $("#again").click(function () {
    location.href = "/add";
  })
 $('.form-signin button').click(function () {
    if ($('#password').val()!=$('#confirm_Password').val()) {
      window.alert("passwords are not matching!!!!!!!")
      return;
    }


     event.preventDefault();

    $.ajax('/create', {
      'method': 'POST',
      'data': {
        'Eth_Address': $('#inputEthAddress').val(),
        'id': $('#inputId').val(),
        'password': $('#inputPassword').val()
       },
      'error': function(err){
        console.log(err);
        console.log(123);
      },
      
      'success' : function (data) {
        console.log(data);
        if (!data.check)
          alert("We alreay have this ID. Please try the other one.")
      },

    })

    // var Eth_Address = $('#inputEthAddress').val()
    // var id = $('#inputEthAddress').val()
    // var password = $('#inputEthAddress').val()

  })
  })

