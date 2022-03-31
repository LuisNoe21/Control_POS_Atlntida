const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`
    SELECT
    clientes.cliente AS cliente,
    dispositivo,
    dispositivos.id as id,
    comercio,
    inventario,
    modelo
    FROM dispositivos
    LEFT JOIN clientes
    ON dispositivos.cliente = clientes.id;
      `, (err1, dispositivos) => {
     if (err1) {
      res.json(err1);
     }
     conn.query('SELECT * FROM clientes', (err2, clientes) => {
       if (err2) {
        res.json(err2);
       }
       res.render('dispositivos', {
          data: dispositivos,
          clientes
       });
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO dispositivos set ?', data, (err, dispositivo) => {
      console.log(dispositivo)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM dispositivos WHERE id = ?", [id], (err1, rows1) => {
      conn.query("SELECT * FROM clientes", (err2, rows2) => {
        res.render('dispositivos_edit', {
          data: rows1[0],
          clientes: rows2
        })
      });
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newdispositivo = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE dispositivos set ? where id = ?', [newdispositivo, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM dispositivos WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
