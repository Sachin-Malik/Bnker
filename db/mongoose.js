const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGODB_CONNECTION_URL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

console.log('Established connection to database')
