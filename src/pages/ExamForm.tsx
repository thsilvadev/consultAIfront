import React, { useState, ChangeEvent, FormEvent } from "react";
import { Upload, Send, User, ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

interface userData {
  nome: string;
  email: string;
  idade: string;
  pesoEmQuilos: string;
  alturaEmCentimetros: string;
  sexo: string;
}

function ExamForm() {
  const [formData, setFormData] = useState<userData>({
    nome: "",
    email: "",
    idade: "",
    pesoEmQuilos: "",
    alturaEmCentimetros: "",
    sexo: "masculino",
  });
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [resposta, setResposta] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setArquivo(file);
        setError("");
        // Criar URL para preview do PDF
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
      } else {
        setError("Por favor, envie apenas arquivos PDF");
        e.target.value = "";
      }
    }
  };

  const handleRemoveFile = () => {
    setArquivo(null);
    setError("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validação do arquivo
    if (!arquivo) {
      setError("É necessário enviar um arquivo antes de continuar.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const reqBody = new FormData();

    // Verifique se arquivo não é null antes de adicionar ao formData
    if (arquivo) {
      reqBody.append("file", arquivo); // Adiciona o arquivo
    } else {
      console.error("Arquivo não fornecido!");
      return; // Sai da função caso não tenha um arquivo
    }
    reqBody.append(
      "user_data",
      JSON.stringify(
        formData
        // Substitua pela variável correspondente
      )
    );

    axios
      .post("http://192.168.0.82:8000/document", reqBody, config)
      .then((res) => {
        if (res) {
          console.log("response received: ", res.data.output);
          const jsonString = res.data.output.message.content
          console.log(jsonString)
       
          setResposta(
            `Paciente ${formData.nome}:\nResposta: ${
              jsonString || "Nenhum arquivo enviado"
            }`
          );
        }
      })
      .catch((err) => {
        console.log("erro brutal: ", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Consulte seu exame
          </h1>
          <p className="mt-2 text-gray-600">
            Preencha seus dados e envie seu documento
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white p-8 rounded-xl shadow-lg"
        >
          {/* Seção 1: Dados Pessoais */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Dados Pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="idade"
                  className="block text-sm font-medium text-gray-700"
                >
                  Idade
                </label>
                <input
                  type="number"
                  id="idade"
                  name="idade"
                  required
                  value={formData.idade}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="pesoEmQuilos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Peso (quilos)
                </label>
                <input
                  type="number"
                  id="pesoEmQuilos"
                  name="pesoEmQuilos"
                  step="0.1"
                  required
                  value={formData.pesoEmQuilos}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="alturaEmCentimetros"
                  className="block text-sm font-medium text-gray-700"
                >
                  Altura (centímetros)
                </label>
                <input
                  type="number"
                  id="alturaEmCentimetros"
                  name="alturaEmCentimetros"
                  step="0.01"
                  required
                  value={formData.alturaEmCentimetros}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="sexo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sexo Atribuído ao Nascimento
                </label>
                <select
                  id="sexo"
                  name="sexo"
                  required
                  value={formData.sexo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seção 2: Upload de Arquivo */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload de Documento
            </h2>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center w-full">
                {arquivo ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 w-full flex-wrap sm:flex-nowrap">
                      {/* File name with overflow handling */}
                      <span className="text-sm text-gray-600 truncate max-w-[70%] sm:max-w-[85%]">
                        {arquivo.name}
                      </span>

                      {/* Remove button always visible */}
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:text-red-700 focus:outline-none flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* PDF Preview */}
                    {previewUrl && (
                      <div className="border rounded-lg overflow-hidden">
                        <iframe
                          src={previewUrl}
                          className="w-full h-[400px]"
                          title="PDF Preview"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="arquivo"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload de arquivo PDF</span>
                      <input
                        id="arquivo"
                        name="arquivo"
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                )}
                <p className="text-xs text-gray-500">PDF até 10MB</p>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="w-4 h-4" />
            Enviar
          </button>
        </form>

        {resposta && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Resposta do Sistema
            </h2>
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
              {resposta}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamForm;
