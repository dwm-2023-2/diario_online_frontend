import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export const DiaryPage = () => {
  const { param1 } = useParams();
  const [diario, setDiario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/diarios/diario/${param1}`);
        setDiario(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [param1]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };

  return (
    <div>
      <Header></Header>
      <Section>
        <p>Valor do parâmetro: {param1}</p>
        {diario && (
          <div>
            <p>{diario?.diarioNome}</p>
            <p>{diario?.diarioDescricao}</p>
            <p>{formatDate(diario?.createdAt)}</p>
          </div>
        )}
      </Section>
      <Footer></Footer>
    </div>
  );
};
