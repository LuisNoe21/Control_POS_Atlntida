
const controllerm = {};

controllerm.listm = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM clientes', (err, clientes) => {
     if (err) {
      res.json(err);
     }
     res.render('clientes', {
      data: clientes
     });
    });
  });
};

controllerm.savem = (req, res) => {
  const { cliente, telefono } = req.body;
  console.log("datos  ", req.body);
  req.getConnection((err, connection) => {
    const query = connection.query(`
      INSERT INTO
      clientes(cliente, telefono)
      VALUES("${cliente}", "${telefono}")
    `, (err, cliente) => {
        res.redirect('/clientes');
    })
  })
};

controllerm.editm = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM clientes WHERE id = ?", [id], (err, rows) => {
      res.render('cliente_edit', {
        data: rows[0]
      })
    });
  });
};

controllerm.updatem = (req, res) => {
  const { id } = req.params;
  const { cliente, telefono } = req.body;
  console.log(req.body)
  req.getConnection((err, conn) => {

  conn.query(`
    UPDATE clientes
    set
    cliente = "${ cliente }",
    telefono = "${ telefono }"
    where id = ${ id }
    `, (err, rows) => {
      res.redirect('/clientes');
    });
  });
};

controllerm.deletem = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM clientes WHERE id = ?', [id], (err, rows) => {
      res.redirect('/clientes');
    });
  });
}

module.exports = controllerm;
