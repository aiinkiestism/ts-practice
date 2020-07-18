var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ExampleSchema = new Schema({
    title: { type: String, required: true },
    genre: [{ type: Schema.ObjectId, ref: 'Genre' }],
});

ExampleSchema
.virtual('url')
.get(function() {
    return '/example/'+this._id;
});

module.exports = mongoose.model('Example', ExampleSchema);
