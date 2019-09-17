//db 연결
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://DONGOOK:rnlflqhdl@member-ca6rk.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, err => {
    if (err) return console.error(err);
    console.log('mongoose connected!');
    //   User.create({ Eth_address: 'eth_address', id: "id", password: 'password' })
    //     .then(r => console.log(r))
    //     .catch(e => console.error(e))

}
);

var userSchema = new mongoose.Schema({
  Eth_address: {
    type: String,
    unique: true,
    index: true
  },
  id: {
    type: String,
    unique: true,
    index: true
  },
  password: {
    type: String
  }
})
var User = mongoose.model('User', userSchema);