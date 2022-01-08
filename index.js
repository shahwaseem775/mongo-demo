const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/playground')
.then(()=>{console.log('connected to mongodb database')})
.catch(err => console.error("cloud not connect to MongoDb ..." ,err))

const courseSchema = new mongoose.Schema({
    name:String,
    author : String,
    tags : [String],
    data : {type : Date , default : Date.now},
    isPublished : Boolean
})

const Course = mongoose.model('Course',courseSchema);
async function createCourse(){
const course = new Course({
    name: "Angular Course",
    author : "Muhammad waseem",
    tags : ['Angular','frontend'],
    isPublished : true
})
const result =  await course.save();
console.log(result);
}

async function getCourse(){
    const result = await Course.find();
    console.log(result);
}
getCourse();