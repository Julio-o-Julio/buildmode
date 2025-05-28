export const ExceptionMessage = {
  NotEmpty: (property: string) => `O campo ${property} é obrigatório`,

  String: (property: string) => `O campo ${property} deve ser um texto`,

  Lowercase: (property: string) =>
    `O campo ${property} deve conter apenas letras minúsculas`,

  CleanString: (property: string) =>
    `O campo ${property} não deve conter espaços, números ou acentos`,

  ValidCharacters: (property: string) =>
    `O campo ${property} não deve conter caracteres especiais (apenas _ ou .)`,

  Length: (property: string, min: number, max: number) =>
    min === max
      ? `O campo ${property} deve ter exatamente ${min} caracteres`
      : `O campo ${property} deve ter no mínimo ${min} e no máximo ${max} caracteres`,

  Phone: (property: string) =>
    `O campo ${property} deve ser um número de telefone válido`,
};
