module.exports.set = app => {
  app.get('/', (req, res) => {
    res.send('Hello world!');
  });
};
