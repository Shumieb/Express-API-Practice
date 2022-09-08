// Route handlers
app.get("/hello(.html)?", (req, res, next) => {
    console.log("attempted to load hello.html");
    next()
}, (req, res) =>{
    res.send("hello world");
})

const one = (req, res, next) => {
    console.log("one")
    next()
}

const two = (req, res, next) => {
    console.log("two")
    next()
}

const three = (req, res, next) => {
    console.log("three")
    res.send("Finished");
}

app.get("/chain(.html)?", [one, two, three])