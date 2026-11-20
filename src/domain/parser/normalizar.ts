/**
 * Normalización y tokenización de mensajes.
 *
 * Se quitan tildes y se pasa a minúsculas, pero **sin colapsar espacios**:
 * así los índices de los tokens siguen coincidiendo con el texto original y
 * las fases siguientes pueden señalar exactamente qué fragmento se interpretó.
 */

export type Token = {
  texto: string;
  inicio: number;
  fin: number;
};

/** Pasa a minúsculas y quita diacríticos conservando la longitud del texto. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Divide el texto en tokens de letras, dígitos, `$`, puntos y comas.
 * Los separadores de puntuación sueltos quedan como tokens propios; el
 * detector de montos los ignora.
 */
export function tokenizar(textoNormalizado: string): Token[] {
  const tokens: Token[] = [];
  const patron = /[a-z0-9$.,]+/g;
  let coincidencia: RegExpExecArray | null;

  while ((coincidencia = patron.exec(textoNormalizado)) !== null) {
    tokens.push({
      texto: coincidencia[0],
      inicio: coincidencia.index,
      fin: coincidencia.index + coincidencia[0].length,
    });
  }

  return tokens;
}
