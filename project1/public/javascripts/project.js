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
<<<<<<< HEAD

=======
=======
>>>>>>> parent of 1aeed828... 중복 id 알림
      
    $('.form-signin button').click(function () {
      if($('#password').val()!=$('#confirm_Password').val()){
        window.alert("passwords are not matching")
        return;
      }
<<<<<<< HEAD



=======

    event.preventDefault();
>>>>>>> 1aeed828227a25c41c7f1b531384c236cc182801
=======


>>>>>>> f4efbfc1319e1b14822906e48ea4c7f95b884ef1
>>>>>>> parent of 1aeed828... 중복 id 알림
    $.ajax('/create', {
      'method': 'POST',
      'data': {
        'Eth_Address': $('#inputEthAddress').val(),
        'id': $('#inputId').val(),
        'password': $('#inputPassword').val()
<<<<<<< HEAD
<<<<<<< HEAD

=======
=======
>>>>>>> parent of 1aeed828... 중복 id 알림
          },
      'error': function(err){
        console.log(err);
        console.log(123);
<<<<<<< HEAD
      },
      'success':function(result){
        console.log(result);

      }
=======
      },
      'success': function (data) {
        console.log(data);
        if (!data.check)
          alert("이미 등록된 id입니다")
      },
>>>>>>> 1aeed828227a25c41c7f1b531384c236cc182801
=======
      },
      'success':function(result){
        console.log(result);
>>>>>>> f4efbfc1319e1b14822906e48ea4c7f95b884ef1
      }
>>>>>>> parent of 1aeed828... 중복 id 알림
    })

    // var Eth_Address = $('#inputEthAddress').val()
    // var id = $('#inputEthAddress').val()
    // var password = $('#inputEthAddress').val()

  })
  })
})
