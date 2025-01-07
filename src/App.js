import React, { useState } from "react";
import "./styles.css";

const NotaFiscal = () => {
  const [formData, setFormData] = useState({
    valorVenda: "",
    itens: "",
    irpf: "",
    pis: "",
    cofins: "",
    inss: "",
    issqn: "",
  });

  const [notaFiscal, setNotaFiscal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calcularImpostos = (valor, porcentagem) => {
    return (valor * porcentagem) / 100;
  };

  const gerarNotaFiscal = () => {
    const valorVenda = parseFloat(formData.valorVenda) || 0;

    const impostos = {
      irpf: calcularImpostos(valorVenda, parseFloat(formData.irpf) || 0),
      pis: calcularImpostos(valorVenda, parseFloat(formData.pis) || 0),
      cofins: calcularImpostos(valorVenda, parseFloat(formData.cofins) || 0),
      inss: calcularImpostos(valorVenda, parseFloat(formData.inss) || 0),
      issqn: calcularImpostos(valorVenda, parseFloat(formData.issqn) || 0),
    };

    const totalImpostos =
      impostos.irpf +
      impostos.pis +
      impostos.cofins +
      impostos.inss +
      impostos.issqn;

    const totalLiquido = valorVenda - totalImpostos;

    setNotaFiscal({
      ...formData,
      impostos,
      totalImpostos,
      totalLiquido,
    });
  };

  return (
    <div className="nota-fiscal-container">
      <h1>Gerador de Nota Fiscal de Serviço (NFS-e)</h1>
      <div className="form-container">
        <label>
          Valor da Venda:
          <input
            type="number"
            name="valorVenda"
            value={formData.valorVenda}
            onChange={handleChange}
          />
        </label>
        <label>
          Itens Vendidos:
          <textarea
            name="itens"
            value={formData.itens}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Porcentagem IRPF:
          <input
            type="number"
            name="irpf"
            value={formData.irpf}
            onChange={handleChange}
          />
        </label>
        <label>
          Porcentagem PIS:
          <input
            type="number"
            name="pis"
            value={formData.pis}
            onChange={handleChange}
          />
        </label>
        <label>
          Porcentagem COFINS:
          <input
            type="number"
            name="cofins"
            value={formData.cofins}
            onChange={handleChange}
          />
        </label>
        <label>
          Porcentagem INSS:
          <input
            type="number"
            name="inss"
            value={formData.inss}
            onChange={handleChange}
          />
        </label>
        <label>
          Porcentagem ISSQN:
          <input
            type="number"
            name="issqn"
            value={formData.issqn}
            onChange={handleChange}
          />
        </label>
        <button onClick={gerarNotaFiscal}>Gerar Nota Fiscal</button>
      </div>

      {notaFiscal && (
        <div className="nota-fiscal">
          <h2>Nota Fiscal de Serviço</h2>
          <p>
            <strong>Valor da Venda:</strong> R$ {notaFiscal.valorVenda}
          </p>
          <p>
            <strong>Itens Vendidos:</strong> {notaFiscal.itens}
          </p>
          <p>
            <strong>IRPF:</strong> R$ {notaFiscal.impostos.irpf.toFixed(2)}
          </p>
          <p>
            <strong>PIS:</strong> R$ {notaFiscal.impostos.pis.toFixed(2)}
          </p>
          <p>
            <strong>COFINS:</strong> R$ {notaFiscal.impostos.cofins.toFixed(2)}
          </p>
          <p>
            <strong>INSS:</strong> R$ {notaFiscal.impostos.inss.toFixed(2)}
          </p>
          <p>
            <strong>ISSQN:</strong> R$ {notaFiscal.impostos.issqn.toFixed(2)}
          </p>
          <p>
            <strong>Total de Impostos:</strong> R${" "}
            {notaFiscal.totalImpostos.toFixed(2)}
          </p>
          <p>
            <strong>Total Líquido:</strong> R${" "}
            {notaFiscal.totalLiquido.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotaFiscal;
