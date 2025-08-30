import { createReadStream, createWriteStream } from 'node:fs';
import { Transform, Readable, Writable } from 'node:stream';

// Stream de Transformação - converte texto para maiúsculo
class UpperCaseTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    const upperChunk = chunk.toString().toUpperCase();

    // Passa o resultado para o próximo stream
    callback(null, Buffer.from(upperChunk));
  }
}

class TextGeneratorStream extends Readable {
  constructor(text) {
    super();
    this.text = text;
    this.index = 0;
  }

  _read() {
    setTimeout(() => {
      if (this.index >= this.text.length) {
        this.push(null); // Fim do stream
      } else {
        // Envia um caractere por vez
        this.push(this.text[this.index]);
        this.index++;
      }
    }, 200);
  }
}

class WritableTextStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(`Processado: "${chunk.toString()}"`);
    callback();
  }
}

new TextGeneratorStream('Hello World! This is a stream example.')
  .pipe(new UpperCaseTransformStream())
  .pipe(new WritableTextStream());
