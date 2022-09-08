const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler")
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 3500;

// middleware
// custom middleware
//app.use((req, res, next) => {
//    console.log(`${req.method} ${req.path} ${req.headers.origin} ${req.url}`)
//   next()
//})

// cors
app.use(cors(corsOptions));
//app.use(cors())

// to get form data
app.use(express.urlencoded({extended: false}));

// for json data
app.use(express.json());

// to serve static files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// routers
app.use("/", require("./routes/root"))
app.use("/subdir", require("./routes/subdir"))
app.use("/employees", require("./routes/api/employees"))

app.all("*", (req, res) => {
    res.status(404);
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if(req.accepts("json")){
        res.json({error: "404 not found"});
    }else{
        res.type("txt").send("404 Not found");
    }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


