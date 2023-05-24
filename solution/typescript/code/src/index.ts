import app  from './server';

const PORT: number = 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });