// Buffer é a representação de um espaço na memória usado para transitar dados de maneira muito rápida.

// Os dados armazenados no buffer são processados, manipulados e logo enviados para outro dispositivo ou componente.

// É uma maneira de salvar e ler da memória de forma performática, isso porque os dados são salvos como binários.

const buf = Buffer.from('Hello World');

console.log(buf);
console.log(buf.toJSON());
