import pool  from "../../db"

export default async function handler(req, res) {
    let a=req.body.name
    let query=`select display_name from users where display_name ~* '${a}'
     LIMIT 10;`

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    // console.log(results.rows)
    res.status(200).send(results.rows)
  })
}