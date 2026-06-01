
export class CalculadoraGanancias {
  static calcularGananciaBs(costoBase) {
    const venta = Number((costoBase * 1.2).toFixed(2));
    const ganancia = Number((venta - costoBase).toFixed(2));

    return {
      costoBase,
      precioVenta: venta,
      ganancia,
      montoLabel: `Costo: ${this.formatearBs(costoBase)} | Venta: ${this.formatearBs(venta)} | Ganancia: ${this.formatearBs(ganancia)}`
    };
  }

  static formatearBs(valor) {
    const rounded = Number(valor.toFixed(2));
    const display = Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2);
    return `${display} Bs.`;
  }
}
