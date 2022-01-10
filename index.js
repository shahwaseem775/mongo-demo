const express =  require('express')
const Joi = require('joi')
const app = express();
app.use(express.json())

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
];
app.get('/',(req,res)=>{
    res.send("hello");
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res)=>{
 const {error} = validateCourse(req.body)
    if(error) return res.status(404).send(error.details[0].message);
    const data =  courses[courses.length - 1]
    const course = {
        id : data.id + 1,
        name : req.body.name,
    }
    courses.push(course)
    res.send(course)
});
 app.get('/api/courses/:id',(req,res)=>{
 const course = courses.find(c => c.id === parseInt(req.params.id))
 if(!course) return res.status(404).send("the course with the given id is not present")
 res.send(course)
});
app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("the course with the given id is not present")
    const index = courses.indexOf(course);
    courses.splice(index,1)
    res.send(courses)
   });
app.put('/api/courses/:id', (req , res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course)return res.status(404).send("the course with the given id is not present")
      const {error} = validateCourse(req.body)
    if(error) return res.status(404).send(error.details[0].message);
    course.name = req.body.name;
    res.send(course);
})
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
  return Joi.validate(course , schema);
}


const port = process.env.PORT || 3000
app.listen(port , ()=> console.log(`listening on port ${port}...`))