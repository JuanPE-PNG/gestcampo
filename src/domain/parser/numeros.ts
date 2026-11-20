/**
 * Números escritos en palabras.
 *
 * Cubre lo que aparece en el habla real del campo: "45 mil", "dos mil
 * quinientos", "cuarenta y cinco mil", "medio millón".
 */

const VALORES: Record<string, number> = {
  cero: 0,
  un: 1,
  uno: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
  siete: 7,
  ocho: 8,
  nueve: 9,
  diez: 10,
  once: 11,
  doce: 12,
  trece: 13,
  catorce: 14,
  quince: 15,
  dieciseis: 16,
  diecisiete: 17,
  dieciocho: 18,
  diecinueve: 19,
  veinte: 20,
  veintiun: 21,
  veintiuno: 21,
  veintidos: 22,
  veintitres: 23,
  veinticuatro: 24,
  veinticinco: 25,
  veintiseis: 26,
  veintisiete: 27,
  veintiocho: 28,
  veintinueve: 29,
  treinta: 30,
  cuarenta: 40,
  cincuenta: 50,
  sesenta: 60,
  setenta: 70,
  ochenta: 80,
  noventa: 90,
  cien: 100,
  ciento: 100,
  doscientos: 200,
  trescientos: 300,
  cuatrocientos: 400,
  quinientos: 500,
  seiscientos: 600,
  setecientos: 700,
  ochocientos: 800,
  novecientos: 900,
};

const MULTIPLICADORES = new Set(['mil', 'millon', 'millones']);
const ESPECIALES = new Set(['medio']);

/** ¿La palabra puede formar parte de un número escrito? */
export function esPalabraNumerica(palabra: string): boolean {
  return palabra in VALORES || MULTIPLICADORES.has(palabra) || ESPECIALES.has(palabra);
}

/**
 * Convierte una secuencia de palabras a su valor numérico.
 * Devuelve 0 si la secuencia no representa un número.
 *
 * No intenta ser un parser lingüístico completo: cubre la composición
 * aditiva del español ("dos mil quinientos" = 2.000 + 500).
 */
export function valorDeSecuencia(palabras: string[]): number {
  if (
    palabras.length >= 2 &&
    palabras[0] === 'medio' &&
    (palabras[1] === 'millon' || palabras[1] === 'millones')
  ) {
    return 500_000;
  }

  let total = 0;
  let actual = 0;

  for (const palabra of palabras) {
    if (palabra === 'mil') {
      total += (actual === 0 ? 1 : actual) * 1000;
      actual = 0;
      continue;
    }

    if (palabra === 'millon' || palabra === 'millones') {
      total += (actual === 0 ? 1 : actual) * 1_000_000;
      actual = 0;
      continue;
    }

    if (palabra === 'y' || palabra === 'medio') continue;

    const valor = VALORES[palabra];
    if (valor !== undefined) actual += valor;
  }

  return total + actual;
}
