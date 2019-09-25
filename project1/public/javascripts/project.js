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
    if ($('#password').val() != $('#confirm_Password').val()) {
      window.alert('passwords are not matching!!!!!!!!!!!!!!')
      return;
    }

<<<<<<< HEAD
=======
      
    $('.form-signin button').click(function () {
      if($('#password').val()!=$('#confirm_Password').val()){
        window.alert("passwords are not matching")
        return;
      }


>>>>>>> f4efbfc1319e1b14822906e48ea4c7f95b884ef1
    $.ajax('/create', {
      'method': 'POST',
      'data': {
        'Eth_Address': $('#inputEthAddress').val(),
        'id': $('#inputId').val(),
        'password': $('#inputPassword').val()
<<<<<<< HEAD
=======
          },
      'error': function(err){
        console.log(err);
        console.log(123);
      },
      'success':function(result){
        console.log(result);
>>>>>>> f4efbfc1319e1b14822906e48ea4c7f95b884ef1
      }
    })

    // var Eth_Address = $('#inputEthAddress').val()
    // var id = $('#inputEthAddress').val()
    // var password = $('#inputEthAddress').val()

  })
})
