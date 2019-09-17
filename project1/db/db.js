//db 연결
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://DONGOOK:rnlflqhdl@member-ca6rk.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, err => {
    if (err) return console.error(err);
    console.log('mongoose connected!');
});
