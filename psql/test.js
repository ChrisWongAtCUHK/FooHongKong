let token = process.env.TOKEN;

let { Client } = require("pg");

let client = new Client({
  connectionString: "postgres://fdpojawjsbsgmu:0ff4812a81dd59a47d56a16bae3c4e3ee75a5d297798f29558c94baa5b9582c6@ec2-23-21-96-159.compute-1.amazonaws.com:5432/dbsg8ijn9v3enh",
  ssl: true,
});
try{
  let text = "一";
  client.connect();
  client.query("select * from company;", (err, res) => {
    if (err) throw err;
    let company = [];
    for (let row of res.rows) {
      let person = {};
      for (const prop in row) {
        console.log(`${prop}` + " = " + `${row[prop]}`);
      }
    }
    client.end();
  });
  
}catch(e){
  console.log(e);
}