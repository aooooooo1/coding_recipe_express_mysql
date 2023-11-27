import express from "express";
import mysql from "mysql";
const app = express();
// json 데이터 받기 위해
app.use(express.json());

//db 접속 정보
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "user_codingrecipe",
    password: "1234",
    port: "3306",
    database: "db_codingrecipe",
});
db.connect((err) => {
    console.log("db 연결 성공했습니다.");
    console.log("err", err);
});

// 서버포트 : 8000 , localhost:8000
app.listen(8000, () => {
    console.log("8000 서버 호출");
});

//기본주소요청 localhost:8000
app.get("/", () => {
    console.log("기본주소 요청했습니댜.");
});

app.get("/hello", () => {
    console.log("hello 주소 요청함");
});

//쿼리스트링 받기
app.get("/qs", (req) => {
    console.log(req.query);
    console.log(req.query.p1);
    console.log(req.query.p2);
});

app.post("/hello", () => {
    console.log("/hello post 요청");
});

app.post("/post-req", (req) => {
    console.log(req.body);
    console.log(req.body.name);
    const { name, age } = req.body;
    console.log(`name: ${name}, age: ${age}`);
});

app.post("/save", (req) => {
    const { name, capital, population } = req.body;
    console.log(`name: ${name}, capital: ${capital}, populaion: ${population}`);
    const sql =
        "insert into nations_table(name, capital, population) values(?,?,?)";
    db.query(sql, [name, capital, population], (err, results, fields) => {
        console.log("er", err);
        console.log("res", results);
        // console.log("fields", fields);
    });
});

app.get("/list", (req, res) => {
    const sql = 'select * from nations_table';
    db.query(sql, (err, results, fields)=>{
        console.log('========================');
        console.log("er", err);
        console.log("res", results);
        // console.log("fields", fields);
        console.log('========================');
        res.json(results);
    })
});

app.get('/list/:id', (req, res)=>{
    console.log(req.params);
    const id = req.params.id
    const sql = 'select * from nations_table where id=?';
    db.query(sql, [id], (err, results, fields)=>{
        console.log("er", err);
        console.log("res", results);
        if(results.length > 0){
            res.status(200).json(results)
        } else{
            res.status(404).send(`요청하신 id : ${id}의 데이터가 없습니다.`)
        }
    })
});

app.put("/list/:id", (req, res)=>{
    const {id, name, capital, population}= req.body;
    // console.log(`id: ${id} name: ${name}, capital: ${capital}, populaion: ${population}`);
    const sql = "update nations_table set name=?, capital=?, population=? where id=?";
    db.query(sql, [name, capital, population, id], (er, results, fields)=>{
        console.log("er", er);
        console.log("res", results);
        console.log("fields", fields);
        res.status(200);
    })
})

app.delete("/list/:id", (req, res)=>{
    const id = req.params.id
    const sql = "delete from nations_table where id=?";
    db.query(sql, [id], (er, results, fields)=>{
        console.log("er", er);
        console.log("res", results);
    })
})